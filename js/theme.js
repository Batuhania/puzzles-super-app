/**
 * Theme Store - Color Theme Management
 * Bulmaca Super App
 */

const THEMES = [
    { id: 'default', name: 'Mor Gece', color: '#6366f1', icon: '🟣' },
    { id: 'ocean', name: 'Okyanus', color: '#0ea5e9', icon: '🔵' },
    { id: 'emerald', name: 'Zümrüt', color: '#10b981', icon: '🟢' },
    { id: 'sunset', name: 'Gün Batımı', color: '#f97316', icon: '🟠' },
    { id: 'rose', name: 'Gül', color: '#f43f5e', icon: '🔴' },
    { id: 'gold', name: 'Altın', color: '#eab308', icon: '🟡' }
];

// Current theme
let currentTheme = 'default';

/**
 * Load saved theme (Color + Dark Mode)
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('appTheme') || 'default';
    applyTheme(savedTheme);
    initDarkMode();
}

/**
 * Initialize Dark Mode based on localStorage or System Pref
 */
function initDarkMode() {
    const saved = localStorage.getItem('theme');
    const html = document.documentElement;
    const btn = document.querySelector('.theme-toggler');

    // Check saved or system preference
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        if (btn) btn.textContent = '☀️';
    } else {
        html.classList.remove('dark');
        if (btn) btn.textContent = '🌙';
    }
}

/**
 * Toggle Dark/Light Mode
 */
function toggleDarkMode() {
    const html = document.documentElement;
    const btn = document.querySelector('.theme-toggler');

    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        if (btn) btn.textContent = '🌙';
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        if (btn) btn.textContent = '☀️';
    }
}

/**
 * Apply theme to document
 */
function applyTheme(themeId) {
    // Validate theme exists
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) themeId = 'default';

    // Remove all existing theme classes
    const classes = document.documentElement.classList;
    const toRemove = [];
    classes.forEach(cls => {
        if (cls.startsWith('theme-')) {
            toRemove.push(cls);
        }
    });
    toRemove.forEach(cls => classes.remove(cls));

    // Add new theme class
    document.documentElement.classList.add(`theme-${themeId}`);
    currentTheme = themeId;
    localStorage.setItem('appTheme', themeId);

    // Update CSS custom property directly for immediate effect
    const themeObj = THEMES.find(t => t.id === themeId);
    if (themeObj) {
        document.documentElement.style.setProperty('--primary', themeObj.color);
        document.documentElement.style.setProperty('--primary-glow', themeObj.color + '40');
    }

    // Update active state in UI if modal is open
    updateThemeCards();
}

/**
 * Update theme card active states
 */
function updateThemeCards() {
    document.querySelectorAll('.theme-card').forEach(card => {
        if (card.dataset.theme === currentTheme) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

/**
 * Open Theme Store Modal
 */
function openThemeStore() {
    const modal = document.getElementById('themeModal');
    if (modal) {
        renderThemeCards();
        modal.classList.add('show');
        if (window.SoundManager) window.SoundManager.play('click');
    }
}

/**
 * Close Theme Store Modal
 */
function closeThemeStore() {
    const modal = document.getElementById('themeModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

/**
 * Render theme cards in the modal
 */
function renderThemeCards() {
    const container = document.getElementById('themesGrid');
    if (!container) return;

    container.innerHTML = THEMES.map(theme => `
        <div class="theme-card ${theme.id === currentTheme ? 'active' : ''}" 
             data-theme="${theme.id}"
             style="background: ${theme.color}"
             onclick="selectTheme('${theme.id}')">
            <span class="theme-icon">${theme.icon}</span>
            <span class="theme-name">${window.i18n ? window.i18n.t('theme_' + theme.id) : theme.name}</span>
            ${theme.id === currentTheme ? '<span class="theme-check">✓</span>' : ''}
        </div>
    `).join('');
}

/**
 * Select a theme
 */
function selectTheme(themeId) {
    applyTheme(themeId);
    renderThemeCards();
    if (window.SoundManager) window.SoundManager.play('move');
}

// Initialize immediately to prevent FOUC
initDarkMode();

// Auto-load full theme details on page load
document.addEventListener('DOMContentLoaded', loadTheme);

// Export for use in other scripts
window.ThemeStore = {
    load: loadTheme,
    apply: applyTheme,
    open: openThemeStore,
    close: closeThemeStore,
    themes: THEMES,
    current: () => currentTheme,
    toggleMode: toggleDarkMode
};
