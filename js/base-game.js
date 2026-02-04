/**
 * Base Game Class
 * Provides common functionality for all games in the Bulmaca Super App.
 */
class BaseGame {
    constructor(gameId) {
        this.gameId = gameId;
        this.level = 1;
        this.sessionWins = window.sessionWins || 0;
        this.isDaily = false;

        // Bind common UI elements
        this.bindCommonUI();
    }

    /**
     * Initialize common UI handlers
     */
    bindCommonUI() {
        // Setup back button confirmation if needed? 
        // Currently handled by direct link.
    }

    /**
     * Start a new game
     * @param {string} mode - 'random' or 'daily'
     */
    newGame(mode) {
        this.isDaily = (mode === 'daily');
        this.updateModeUI(mode);

        if (this.isDaily) {
            const seed = SeededRandom.getDailySeed();
            this.rng = new SeededRandom(seed);
            this.showDailyBadge(seed);
        } else {
            this.rng = new SeededRandom(Date.now()); // Or use Math.random
            this.hideDailyBadge();
        }

        this.init();
    }

    /**
     * Update Mode Buttons UI
     */
    updateModeUI(mode) {
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        const btn = document.getElementById(`btn-${mode}`);
        if (btn) btn.classList.add('active');
    }

    showDailyBadge(seed) {
        const badge = document.getElementById('daily-badge');
        if (badge) {
            badge.style.display = 'inline-flex';
            // Assuming getText is available globally or we use window.i18n
            const text = window.i18n ? window.i18n.t('daily_puzzle_badge') : 'GÜNLÜK BULMACA';
            badge.textContent = `📅 ${text} #${seed % 1000}`;
        }
    }

    hideDailyBadge() {
        const badge = document.getElementById('daily-badge');
        if (badge) badge.style.display = 'none';
    }

    /**
     * Standard Win Handler
     */
    onWin(stats = {}) {
        this.sessionWins++;
        window.sessionWins = this.sessionWins;

        // Play Effects
        if (window.SoundManager) window.SoundManager.play('win');
        if (window.confetti) window.confetti.celebrate();

        // Save Stats
        if (window.StatsManager) {
            window.StatsManager.recordWin(this.gameId, stats.time);
        }

        // Show Modal
        this.showWinModal();
    }

    showWinModal() {
        const overlay = document.getElementById('overlay') || document.getElementById('winOverlay');
        if (overlay) overlay.classList.add('show');
    }

    /**
     * Save and Exit to Main Menu
     */
    saveAndExit() {
        const dailyParam = this.isDaily ? '&daily=true' : '';
        const timeParam = this.time || 0;
        window.location.href = `../index.html?save=${this.gameId}&wins=${this.sessionWins}&time=${timeParam}${dailyParam}`;
    }

    /**
     * Abstract init method - must be implemented by subclass
     */
    init() {
        console.warn('init() method not implemented by game class');
    }
}

// Expose globally
window.BaseGame = BaseGame;
