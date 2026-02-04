/**
 * Bulmaca Super App - Global Statistics Manager
 * Handles saving/loading progress for all games using LocalStorage.
 */

const StatsManager = {
    KEY: 'bulmaca_super_app_stats_v1',

    // Default structure for a new game entry
    defaultEntry: {
        played: 0,
        solved: 0,
        bestTime: null, // Seconds
        lastPlayed: null // ISO Date String
    },

    // Load all stats from storage
    load() {
        try {
            const data = localStorage.getItem(this.KEY);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error('Stats Save Error:', e);
            return {};
        }
    },

    // Save all stats to storage
    save(data) {
        try {
            localStorage.setItem(this.KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Stats Write Error:', e);
        }
    },

    /**
     * Records a game completion.
     * @param {string} gameId - e.g., 'zip', 'sudoku'
     * @param {number} timeInSeconds - Time taken to solve (optional)
     */
    recordWin(gameId, timeInSeconds) {
        const stats = this.load();

        // Initialize if not exists
        if (!stats[gameId]) {
            stats[gameId] = { ...this.defaultEntry };
        }

        const entry = stats[gameId];
        entry.solved++;
        entry.played++; // Assuming every win was a play, can track starts separately if needed
        entry.lastPlayed = new Date().toISOString();

        // Update Best Time (Lower is better)
        if (timeInSeconds) {
            if (entry.bestTime === null || timeInSeconds < entry.bestTime) {
                entry.bestTime = timeInSeconds;
            }
        }

        this.save(stats);
        // win recorded
        return entry;
    },

    /**
     * Get stats for specific game
     */
    get(gameId) {
        const stats = this.load();
        return stats[gameId] || { ...this.defaultEntry };
    },

    /**
     * Get aggregate stats
     */
    getTotalSolved() {
        const stats = this.load();
        return Object.values(stats).reduce((acc, curr) => acc + (curr.solved || 0), 0);
    },

    /**
     * Format seconds to MM:SS
     */
    formatTime(seconds) {
        if (seconds === null || seconds === undefined) return '-';
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }
};

// Expose globally
window.StatsManager = StatsManager;
