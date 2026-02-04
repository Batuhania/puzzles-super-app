import { GRID_SIZE } from './puzzle.js';

// --- Pure Random Generation (Instant) ---

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
        // Shuffle for randomness
        for (let i = neighbors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [neighbors[i], neighbors[j]] = [neighbors[j], neighbors[i]];
        }
        return neighbors;
    }

    // Warnsdorff's heuristic for Hamiltonian Path
    function backtrack(currentIdx) {
        path.push(currentIdx);
        visited.add(currentIdx);

        if (path.length === totalCells) return true;

        const neighbors = getNeighbors(currentIdx);
        // Sort by degree (number of available neighbors)
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

    // Try random start points
    for (let i = 0; i < 10; i++) {
        const startIdx = Math.floor(Math.random() * totalCells);
        if (backtrack(startIdx)) {
            // Success! Return structured path
            return path.map(idx => ({
                row: Math.floor(idx / GRID_SIZE),
                col: idx % GRID_SIZE,
                index: idx
            }));
        }
        // Reset for next attempt
        path.length = 0;
        visited.clear();
    }
    return null; // Should rarely happen for 5x5
}

export function generatePuzzleSync() {
    console.log('[Generator] Generating Instant Puzzle...');

    // 1. Generate Path
    const fullPath = generateHamiltonianPath();
    if (!fullPath) {
        throw new Error("Path generation failed. Please try again.");
    }

    // 2. Select Clues (Start, End, and ~5 random intermediates)
    const clueIndices = new Set();
    clueIndices.add(0); // Start (1)
    clueIndices.add(fullPath.length - 1); // End (25)

    // Add intermediate clues
    const intermediateCount = 5;
    let safety = 0;
    while (clueIndices.size < intermediateCount + 2 && safety < 50) {
        const randIdx = Math.floor(Math.random() * fullPath.length);
        // Avoid adding clues too close to each other (optional polish)
        clueIndices.add(randIdx);
        safety++;
    }

    // 3. Map to Value Objects
    // Fix: Zip puzzle uses sequential numbers (1, 2, 3...), NOT path indices (1, 7, 15...)
    const sortedPathIndices = Array.from(clueIndices).sort((a, b) => a - b);
    const numbers = sortedPathIndices.map((pathIdx, i) => ({
        index: fullPath[pathIdx].index,
        value: i + 1
    }));

    console.log('[Generator] Success!', numbers);

    return {
        numbers: numbers,
        solution: fullPath.map(p => p.index),
        clueCount: numbers.length
    };
}
