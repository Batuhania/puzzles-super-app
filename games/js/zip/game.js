// --- 1. CONSTANTS & HELPERS (Moved from puzzle.js) ---
const GRID_SIZE = 5;

// Check if two cells are adjacent (orthogonally)
function isAdjacent(idx1, idx2) {
    const row1 = Math.floor(idx1 / GRID_SIZE);
    const col1 = idx1 % GRID_SIZE;
    const row2 = Math.floor(idx2 / GRID_SIZE);
    const col2 = idx2 % GRID_SIZE;

    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);

    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

// --- 2. ERROR LOGGING ---
function logDebug(msg) {
    console.log('[Zip]', msg);
    const errEl = document.getElementById('error-log');
    if (errEl && msg.includes('Error')) {
        errEl.classList.remove('hidden');
        errEl.textContent += msg + '\n';
    }
}

window.onerror = function (msg, url, line) {
    logDebug(`Global Error: ${msg} @ line ${line}`);
};

// --- 3. GENERATOR LOGIC (Internal) ---
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
        // Shuffle
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
        // Warnsdorff's heuristic
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

    // Try multiple start points
    for (let i = 0; i < 50; i++) {
        const startIdx = Math.floor(Math.random() * totalCells);
        if (backtrack(startIdx)) {
            return path.map(idx => ({
                row: Math.floor(idx / GRID_SIZE),
                col: idx % GRID_SIZE,
                index: idx
            }));
        }
        path.length = 0;
        visited.clear();
    }
    return null;
}

function generatePuzzleSyncSafe() {
    const fullPath = generateHamiltonianPath();
    if (!fullPath) throw new Error("Yol üretilemedi. Tekrar deneniyor...");

    // Basic Clues: Start & End
    const clueIndices = new Set([0, fullPath.length - 1]);

    // Add random intermediates
    let safety = 0;
    while (clueIndices.size < 7 && safety < 100) {
        clueIndices.add(Math.floor(Math.random() * fullPath.length));
        safety++;
    }

    const sortedPathIndices = Array.from(clueIndices).sort((a, b) => a - b);
    const numbers = sortedPathIndices.map((pathIdx, i) => ({
        index: fullPath[pathIdx].index,
        value: i + 1 // Sequential: 1, 2, 3...
    }));

    return { numbers };
}


// --- 4. GAME ENGINE ---
const gameState = {
    path: [],
    elapsedSeconds: 0,
    cells: [],
    numbers: []
};

let timerInterval = null;
let isTimerRunning = false;
let isDrawing = false;
let isGenerating = false;

// DOM Elements
const getEl = (id) => document.getElementById(id);
let gridEl, loadingEl, statsCellsEl, statsTimeEl, newPuzzleBtn, resetBtn, winOverlay;

function initDOM() {
    gridEl = getEl('grid');
    loadingEl = getEl('loading');
    statsCellsEl = document.querySelector('[data-bind="cellsVisited"]');
    statsTimeEl = document.querySelector('[data-bind="formattedTime"]');
    newPuzzleBtn = getEl('new-puzzle');
    resetBtn = getEl('reset');
    winOverlay = getEl('win-overlay');

    if (!gridEl) {
        logDebug("CRITICAL: Grid element not found!");
        return false;
    }

    // Attach Events
    if (newPuzzleBtn) newPuzzleBtn.onclick = requestNewPuzzle;
    if (resetBtn) resetBtn.onclick = () => {
        gameState.path = [];
        resetTimer();
        renderFullGrid();
    };

    const ovNewBtn = getEl('overlay-new-puzzle');
    if (ovNewBtn) ovNewBtn.onclick = () => {
        if (winOverlay) {
            winOverlay.classList.add('hidden');
            winOverlay.classList.remove('flex');
        }
        requestNewPuzzle();
    };

    const ovExitBtn = getEl('overlay-exit');
    if (ovExitBtn) ovExitBtn.onclick = () => {
        if (winOverlay) {
            winOverlay.classList.add('hidden');
            winOverlay.classList.remove('flex');
        }
    };

    attachGridEvents();
    return true;
}

function requestNewPuzzle() {
    if (isGenerating) return;
    isGenerating = true;

    if (loadingEl) loadingEl.style.display = 'block';
    if (newPuzzleBtn) newPuzzleBtn.disabled = true;

    // Use a short timeout to let the UI update and ensure browser rendering isn't blocked
    setTimeout(() => {
        try {
            logDebug("Generating puzzle...");
            const result = generatePuzzleSyncSafe();
            onPuzzleGenerated(result);
            logDebug("Puzzle size: " + result.numbers.length + " clues");
        } catch (error) {
            logDebug("Gen Error: " + error.message);
            isGenerating = false;
            // Retry automatically once
            setTimeout(requestNewPuzzle, 100);
        }
    }, 50);
}

function onPuzzleGenerated(result) {
    isGenerating = false;
    if (loadingEl) loadingEl.style.display = 'none';
    if (newPuzzleBtn) newPuzzleBtn.disabled = false;

    // Reset State
    gameState.path = [];
    resetTimer();
    gameState.numbers = result.numbers;

    gameState.cells = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
        id: i, index: i, value: null
    }));

    result.numbers.forEach(({ index, value }) => {
        gameState.cells[index].value = value;
    });

    renderFullGrid();
    updateStats();
}

function getNumberAtIndex(idx) {
    const numObj = gameState.numbers.find(n => n.index === idx);
    return numObj ? numObj.value : null;
}

function getNextExpectedNumber() {
    let next = 1;
    gameState.path.forEach(idx => {
        const num = getNumberAtIndex(idx);
        if (num === next) next++;
    });
    return next;
}

function canAddToPath(idx) {
    const cellClue = getNumberAtIndex(idx);
    const expected = getNextExpectedNumber();
    if (cellClue !== null) return cellClue === expected;
    return true;
}

function addToPath(index) {
    gameState.path.push(index);
    updateCellVisuals(index);
    if (gameState.path.length > 1) {
        updateCellVisuals(gameState.path[gameState.path.length - 2]);
    }
    updateStats();
    checkWin();
}

function truncatePath(targetIndex) {
    const targetPos = gameState.path.indexOf(targetIndex);
    if (targetPos === -1) return;
    const removed = gameState.path.slice(targetPos + 1);
    gameState.path = gameState.path.slice(0, targetPos + 1);
    updateCellVisuals(targetIndex);
    removed.forEach(idx => updateCellVisuals(idx));
    updateStats();
}

function checkWin() {
    const maxClue = Math.max(...gameState.numbers.map(n => n.value));
    if (gameState.path.length === GRID_SIZE * GRID_SIZE) {
        const lastIdx = gameState.path[gameState.path.length - 1];
        const lastNum = getNumberAtIndex(lastIdx);
        if (lastNum === maxClue) {
            stopTimer();
            setTimeout(() => {
                if (winOverlay) {
                    winOverlay.classList.remove('hidden');
                    winOverlay.classList.add('flex');
                }
            }, 300);
        }
    }
}

// --- RENDERER ---
function renderFullGrid() {
    if (!gridEl) return;
    gridEl.innerHTML = '';

    // Explicit grid layout failsafe
    gridEl.style.display = 'grid';
    gridEl.style.gridTemplateColumns = 'repeat(5, 1fr)';
    gridEl.style.gap = '2px';

    gameState.cells.forEach(cell => {
        const cellEl = document.createElement('div');
        // Inline styles for absolute reliability
        cellEl.style.cssText = `
            position: relative;
            background-color: rgba(40, 45, 65, 0.9);
            border-radius: 6px;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            user-select: none;
        `;
        cellEl.className = 'zip-cell-new';
        cellEl.dataset.index = cell.index;

        cellEl.innerHTML = `
            <div class="path-dot" style="width:12px; height:12px; background:rgba(255,255,255,0.3); border-radius:50%; position:absolute; z-index:1;"></div>
            <div class="connector-top" style="position:absolute; background:#3b82f6; width:8px; height:50%; top:0; left:calc(50% - 4px); display:none;"></div>
            <div class="connector-bottom" style="position:absolute; background:#3b82f6; width:8px; height:50%; bottom:0; left:calc(50% - 4px); display:none;"></div>
            <div class="connector-left" style="position:absolute; background:#3b82f6; width:50%; height:8px; left:0; top:calc(50% - 4px); display:none;"></div>
            <div class="connector-right" style="position:absolute; background:#3b82f6; width:50%; height:8px; right:0; top:calc(50% - 4px); display:none;"></div>
            ${cell.value ? `<span style="font-size:1.25rem; font-weight:bold; color:white; z-index:10;">${cell.value}</span>` : ''}
        `;

        gridEl.appendChild(cellEl);
    });
}

function updateCellVisuals(index) {
    const cellEl = gridEl.children[index];
    if (!cellEl) return;

    const pathIdx = gameState.path.indexOf(index);
    const isInPath = pathIdx !== -1;

    if (isInPath) {
        cellEl.style.backgroundColor = '#3b82f6'; // Blue
        cellEl.querySelector('.path-dot').style.backgroundColor = '#fff';
    } else {
        cellEl.style.backgroundColor = 'rgba(40, 45, 65, 0.9)'; // Dark
        cellEl.querySelector('.path-dot').style.backgroundColor = 'rgba(255,255,255,0.3)';
    }

    const top = cellEl.querySelector('.connector-top');
    const bottom = cellEl.querySelector('.connector-bottom');
    const left = cellEl.querySelector('.connector-left');
    const right = cellEl.querySelector('.connector-right');

    top.style.display = 'none';
    bottom.style.display = 'none';
    left.style.display = 'none';
    right.style.display = 'none';

    if (isInPath) {
        const prevIdx = pathIdx > 0 ? gameState.path[pathIdx - 1] : null;
        const nextIdx = pathIdx < gameState.path.length - 1 ? gameState.path[pathIdx + 1] : null;

        [prevIdx, nextIdx].forEach(neighborIdx => {
            if (neighborIdx === null || neighborIdx === undefined) return;
            const row = Math.floor(index / GRID_SIZE);
            const col = index % GRID_SIZE;
            const nRow = Math.floor(neighborIdx / GRID_SIZE);
            const nCol = Math.floor(neighborIdx % GRID_SIZE);

            if (nRow < row) top.style.display = 'block';
            if (nRow > row) bottom.style.display = 'block';
            if (nCol < col) left.style.display = 'block';
            if (nCol > col) right.style.display = 'block';
        });
    }
}

function updateStats() {
    if (statsCellsEl) statsCellsEl.textContent = gameState.path.length;
}

// --- TIMER ---
function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    timerInterval = setInterval(() => {
        gameState.elapsedSeconds++;
        const s = gameState.elapsedSeconds;
        if (statsTimeEl) statsTimeEl.textContent = `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
    }, 1000);
}
function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
    isTimerRunning = false;
}
function resetTimer() {
    stopTimer();
    gameState.elapsedSeconds = 0;
    if (statsTimeEl) statsTimeEl.textContent = '00:00';
}

// --- INPUT EVENTS ---
function handleInput(index) {
    if (gameState.path.length === 0) {
        if (getNumberAtIndex(index) === 1) {
            startTimer();
            addToPath(index);
            isDrawing = true;
        }
        return;
    }
    if (gameState.path.includes(index)) {
        truncatePath(index);
        isDrawing = true;
        return;
    }
    const lastIndex = gameState.path[gameState.path.length - 1];
    if (isAdjacent(lastIndex, index) && canAddToPath(index)) {
        addToPath(index);
        isDrawing = true;
    } else {
        if (getNumberAtIndex(index) === 1) {
            gameState.path = [];
            resetTimer();
            startTimer();
            addToPath(index);
            isDrawing = true;
            renderFullGrid();
        }
    }
}

function attachGridEvents() {
    if (!gridEl) return;

    // Mouse
    gridEl.onmousedown = (e) => {
        e.preventDefault();
        const cell = e.target.closest('.zip-cell-new');
        if (cell) handleInput(parseInt(cell.dataset.index));
    };
    gridEl.onmousemove = (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        const cell = e.target.closest('.zip-cell-new');
        if (!cell) return;
        const idx = parseInt(cell.dataset.index);

        if (gameState.path.includes(idx)) {
            if (gameState.path.length > 1 && idx === gameState.path[gameState.path.length - 2]) truncatePath(idx);
        } else {
            const last = gameState.path[gameState.path.length - 1];
            if (isAdjacent(last, idx) && canAddToPath(idx)) addToPath(idx);
        }
    };
    document.onmouseup = () => isDrawing = false;

    // Touch
    gridEl.ontouchstart = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target) {
            const cell = target.closest('.zip-cell-new');
            if (cell) handleInput(parseInt(cell.dataset.index));
        }
    };
    gridEl.ontouchmove = (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (!target) return;
        const cell = target.closest('.zip-cell-new');
        if (!cell) return;

        const idx = parseInt(cell.dataset.index);
        if (gameState.path.includes(idx)) {
            if (gameState.path.length > 1 && idx === gameState.path[gameState.path.length - 2]) truncatePath(idx);
        } else {
            const last = gameState.path[gameState.path.length - 1];
            if (isAdjacent(last, idx) && canAddToPath(idx)) addToPath(idx);
        }
    };
    document.ontouchend = () => isDrawing = false;
}


// --- BOOTSTRAP ---
// Try to init immediately, or wait for DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (initDOM()) requestNewPuzzle();
    });
} else {
    // DOM already ready
    if (initDOM()) requestNewPuzzle();
}
