import { GRID_SIZE, isAdjacent } from './puzzle.js';

// Solver to check if puzzle has unique solution
function solvePuzzle(puzzleNumbers) {
    const totalCells = GRID_SIZE * GRID_SIZE;
    let solutionCount = 0;
    const solutions = [];

    function getNumberAtIdx(idx) {
        const n = puzzleNumbers.find(n => n.index === idx);
        return n ? n.value : null;
    }

    function solve(currentPath, visited, nextNum) {
        if (solutionCount >= 5) return;

        if (currentPath.length === totalCells) {
            solutionCount++;
            solutions.push([...currentPath]);
            return;
        }

        const lastIdx = currentPath[currentPath.length - 1];

        for (let idx = 0; idx < totalCells; idx++) {
            if (visited.has(idx)) continue;
            if (!isAdjacent(lastIdx, idx)) continue;

            const cellNum = getNumberAtIdx(idx);

            if (cellNum !== null && cellNum !== nextNum) continue;

            visited.add(idx);
            currentPath.push(idx);
            solve(currentPath, visited, cellNum === nextNum ? nextNum + 1 : nextNum);
            currentPath.pop();
            visited.delete(idx);
        }
    }

    const startCell = puzzleNumbers.find(n => n.value === 1);
    if (!startCell) return { count: 0, solutions: [] };

    const visited = new Set([startCell.index]);
    solve([startCell.index], visited, 2);

    return { count: solutionCount, solutions: solutions };
}

function generateHamiltonianPath() {
    const totalCells = GRID_SIZE * GRID_SIZE;
    const path = [];
    const visited = new Set();

    function getNeighbors(idx) {
        const neighbors = [];
        const row = Math.floor(idx / GRID_SIZE);
        const col = idx % GRID_SIZE;
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        for (const [dr, dc] of dirs) {
            const r = row + dr;
            const c = col + dc;
            if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
                neighbors.push(r * GRID_SIZE + c);
            }
        }
        for (let i = neighbors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [neighbors[i], neighbors[j]] = [neighbors[j], neighbors[i]];
        }
        return neighbors;
    }

    function backtrack(currentIdx) {
        path.push(currentIdx);
        visited.add(currentIdx);

        if (path.length === totalCells) return true;

        const neighbors = getNeighbors(currentIdx);
        neighbors.sort((a, b) => {
            const aCount = getNeighbors(a).filter(n => !visited.has(n)).length;
            const bCount = getNeighbors(b).filter(n => !visited.has(n)).length;
            return aCount - bCount;
        });

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                if (backtrack(neighbor)) return true;
            }
        }

        path.pop();
        visited.delete(currentIdx);
        return false;
    }

    const startIdx = Math.floor(Math.random() * totalCells);
    if (backtrack(startIdx)) {
        return path.map(idx => ({
            row: Math.floor(idx / GRID_SIZE),
            col: idx % GRID_SIZE,
            index: idx
        }));
    }
    return null;
}

function generatePuzzle() {
    const totalCells = GRID_SIZE * GRID_SIZE;
    const maxAttempts = 50;
    let attempts = 0;

    console.log('[Worker] Starting puzzle generation...');

    while (attempts < maxAttempts) {
        const fullPath = generateHamiltonianPath();
        if (!fullPath) {
            attempts++;
            continue;
        }

        const revealedIndices = new Set();
        const clueConfig = {
            25: { intermediate: 4 },
            36: { intermediate: 6 },
            49: { intermediate: 8 },
            64: { intermediate: 10 }
        };

        const config = clueConfig[totalCells] || { intermediate: 6 };
        const intermediateCount = config.intermediate;

        function placeCluesSmartly(path, count) {
            const clues = [0, path.length - 1];
            while (clues.length < count) {
                let bestIdx = -1;
                let bestScore = -Infinity;

                for (let i = 1; i < path.length - 1; i++) {
                    if (clues.includes(i)) continue;
                    let minManhattanDist = Infinity;
                    let minPathDist = Infinity;

                    for (let clueIdx of clues) {
                        const clueCell = path[clueIdx];
                        const currentCell = path[i];
                        const manhattanDist = Math.abs(currentCell.row - clueCell.row) +
                            Math.abs(currentCell.col - clueCell.col);
                        minManhattanDist = Math.min(minManhattanDist, manhattanDist);
                        const pathDist = Math.abs(i - clueIdx);
                        minPathDist = Math.min(minPathDist, pathDist);
                    }
                    const score = minManhattanDist + (minPathDist / path.length) * 0.15;
                    if (score > bestScore) {
                        bestScore = score;
                        bestIdx = i;
                    }
                }
                if (bestIdx !== -1) clues.push(bestIdx);
                else break;
            }
            return clues;
        }

        const clueIndices = placeCluesSmartly(fullPath, intermediateCount + 2);
        clueIndices.forEach(idx => revealedIndices.add(idx));

        function createPuzzleFromIndices(indicesSet) {
            const sortedPathIndices = Array.from(indicesSet).sort((a, b) => a - b);
            return sortedPathIndices.map((pathIdx, i) => ({
                index: fullPath[pathIdx].index,
                value: i + 1
            }));
        }

        let numbers = createPuzzleFromIndices(revealedIndices);
        let result = solvePuzzle(numbers);

        const maxFixAttempts = 15;
        let fixAttempts = 0;

        while (result.count > 1 && fixAttempts < maxFixAttempts) {
            const sol1 = fullPath.map(p => p.index);
            const sol2 = result.solutions[0].toString() === sol1.toString() ? result.solutions[1] : result.solutions[0];
            if (!sol2) break;

            let diffIdx = -1;
            for (let i = 0; i < totalCells; i++) {
                if (sol1[i] !== sol2[i]) {
                    diffIdx = i;
                    break;
                }
            }

            if (diffIdx !== -1 && !revealedIndices.has(diffIdx)) {
                revealedIndices.add(diffIdx);
                numbers = createPuzzleFromIndices(revealedIndices);
            }
            result = solvePuzzle(numbers);
            fixAttempts++;
        }

        if (result.count > 1 && fixAttempts >= maxFixAttempts) {
            const extraPositions = [Math.floor(totalCells / 3), Math.floor(totalCells * 2 / 3)];
            for (const pos of extraPositions) {
                if (!revealedIndices.has(pos)) revealedIndices.add(pos);
            }
            numbers = createPuzzleFromIndices(revealedIndices);
            result = solvePuzzle(numbers);
        }

        if (result.count === 1) {
            return {
                numbers,
                solution: result.solutions[0],
                clueCount: numbers.length,
                attempts: attempts + 1
            };
        }
        attempts++;
    }
    return null;
}

// Vanilla Worker Messaging
self.onmessage = function (e) {
    if (e.data.type === 'generate') {
        const result = generatePuzzle();
        self.postMessage({ type: 'generate_result', result });
    }
};
