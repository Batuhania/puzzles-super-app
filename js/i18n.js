/**
 * Internationalization (i18n) System
 * Bulmaca Super App / Puzzles Super App
 */

const translations = {
    tr: {
        // App Header
        app_title: '🧩 Bulmacalar',
        app_subtitle: 'Popüler zeka oyunları bir arada',

        // Stats Bar
        stat_games: 'Oyun',
        stat_wins: 'Kazanma',
        stat_streak: 'Seri',

        // Daily Banner
        daily_badge: '⭐ BUGÜNÜN ÖNE ÇIKANI',
        daily_title: '📅 Günün Bulmacası',
        daily_hint: '💡 Tüm oyunların kendi günlük bulmacası var!',
        daily_waiting: '⏳ Bekliyor',
        daily_solved: '✅ Çözüldü',

        // Buttons
        btn_profile: 'Profil',
        btn_random: '🎲 Rastgele',
        btn_daily: '📅 Günlük',
        btn_reset: 'Sıfırla',
        btn_new_game: 'Yeni Oyun',
        btn_next: 'Sonraki Bölüm 👉',
        btn_save_exit: '💾 Kaydet ve Ana Menüye Dön',
        btn_keep_playing: 'Devam Et',
        btn_tutorial: '❓ Nasıl Oynanır',
        btn_close: 'Kapat',

        // Win Modal
        win_title: 'Tebrikler! 🎉',
        win_message: 'Bölümü tamamladın.',
        congrats: 'Tebrikler!',
        game_over: 'Oyun Bitti!',
        you_win: 'KAZANDIN!',
        you_lose: 'KAYBETTİN!',

        // Labels
        label_cell: 'Hücre',
        label_time: 'Süre',
        label_moves: 'Hamle',
        label_score: 'Skor',
        label_best: 'En İyi',
        label_mistakes: 'Hata',

        // Profile Modal
        profile_title: 'Oyuncu Profili',
        profile_total_wins: 'Toplam Kazanma',
        profile_best_streak: 'En İyi Seri',
        profile_badges: 'Rozetler',
        profile_stats: 'İstatistikler',

        // Game Names
        game_zip: 'Zip',
        game_queens: 'Queens',
        game_sudoku: 'Sudoku',
        game_nonogram: 'Nonogram',
        game_binary: 'Binary',
        game_wordle: 'Wordle',
        game_2048: '2048',
        game_minesweeper: 'Mayın Tarlası',
        game_memory: 'Hafıza',
        game_slider: 'Slaydır',
        game_lightsout: 'Işıklar',
        game_mastermind: 'Şifre Kırıcı',
        game_floodit: 'Renk Taşkını',
        game_kakuro: 'Kakuro',
        game_kenken: 'KenKen',
        game_futoshiki: 'Futoshiki',

        // Game Descriptions
        game_zip_desc: 'Sayıları sırayla bağla',
        game_queens_desc: 'Vezirleri stratejik yerleştir',
        game_sudoku_desc: 'Klasik sayı bulmacası',
        game_nonogram_desc: 'Kare karalamaca',
        game_binary_desc: '0 ve 1 mantığı',
        game_wordle_desc: 'Kelime tahmin et',
        game_2048_desc: 'Karoları birleştir',
        game_minesweeper_desc: 'Mayınlardan kaç',
        game_memory_desc: 'Kart eşleştirme',
        game_slider_desc: '15 Yapboz',
        game_lightsout_desc: 'Hepsini söndür',
        game_mastermind_desc: 'Gizli kodu çöz',
        game_floodit_desc: 'Tek renk yap',
        game_kakuro_desc: 'Matematik bulmaca',
        game_kenken_desc: 'Kafes matematik',
        game_futoshiki_desc: 'Eşitsizlik bulmaca',

        // Tutorials - Zip
        tut_zip_1: 'Sayıları <strong>1\'den başlayarak</strong> sırasıyla birleştir.',
        tut_zip_2: 'Sadece <strong>yatay veya dikey</strong> komşu karelere gidebilirsin.',
        tut_zip_3: 'Tüm kareleri doldurarak hedefe ulaş!',

        // Tutorials - Wordle
        tut_wordle_1: '5 harfli gizli kelimeyi <strong>6 denemede</strong> bul.',
        tut_wordle_2: '<span style="color:#538d4e">Yeşil:</span> Harf ve yeri doğru.',
        tut_wordle_3: '<span style="color:#b59f3b">Sarı:</span> Harf kelimede var ama yeri yanlış.',
        tut_wordle_4: '<span style="color:#3a3a3c">Gri:</span> Harf kelimede yok.',

        // Tutorials - Sudoku
        tut_sudoku_1: '9x9 ızgarayı <strong>1-9 arası</strong> rakamlarla doldur.',
        tut_sudoku_2: 'Her satır, her sütun ve her 3x3 kutuda rakamlar <strong>birer kez</strong> yer almalı.',
        tut_sudoku_3: 'Rakam tekrarı yasak!',

        // Tutorials - 2048
        tut_2048_1: 'Yön tuşları veya kaydırma ile taşları hareket ettir.',
        tut_2048_2: 'Aynı sayıya sahip taşlar çarpışınca <strong>birleşir ve toplanır</strong> (2+2=4).',
        tut_2048_3: '<strong>2048</strong> taşına ulaşarak oyunu kazan!',

        // Tutorials - Minesweeper
        tut_minesweeper_1: 'Karelere tıklayarak içlerini aç.',
        tut_minesweeper_2: 'Sayılar, o kareye komşu olan <strong>mayın sayısını</strong> gösterir.',
        tut_minesweeper_3: 'Mayın olduğunu düşündüğün yere <strong>Bayrak (🚩)</strong> koy.',
        tut_minesweeper_4: 'Mayına basarsan oyun biter!',

        // Daily Badge Text
        daily_puzzle_badge: '📅 GÜNLÜK BULMACA',

        // Game UI - Common
        label_queen: 'Vezir',
        label_queens: 'Vezirler',
        hint_click_queen: '👆 Tıkla: Vezir koy',
        hint_dblclick_x: '❌ Çift Tıkla: \'X\' koy',
        hint_flag: 'Bayrak koymak için butona bas veya sağ tıkla',
        hint_click_card: 'Kartlara tıklayarak ters çevir',
        btn_next_level: 'Sonraki Bölüm',
        btn_save_exit: '💾 Kaydet ve Ana Menüye Dön',
        btn_home: 'Ana Menü',
        btn_play_again: 'Tekrar Oyna',
        btn_understood: 'Anladım',
        tutorial_title: 'Nasıl Oynanır?',
        random_mode: 'RASTGELE MOD',
        random_puzzle: 'RASTGELE BULMACA',

        // Win/Lose messages
        congrats: 'Tebrikler!',
        well_done: 'Harika!',
        sorry: 'MAALESEF',
        moves_exceeded: 'Hamle sayısını aştın.',
        completed_in: 'hamlede tamamladın.',

        // Misc
        loading: 'Yükleniyor...',
        back: '←',

        // Surgical Pass Keys
        diff_easy: 'Kolay',
        diff_medium: 'Orta',
        diff_hard: 'Zor',
        label_mistakes: 'Hata',
        msg_too_many_mistakes: 'Çok fazla hata yaptın.',
        label_daily_challenge: 'GÜNLÜK ZORLU',
        btn_restart: 'Yeniden Başlat',
        binary_rules: '1. Yan yana en fazla iki aynı rakam.<br>2. Eşit sayıda 0 ve 1.',
        game_lightsout: 'Işıklar Söndür',
        game_mastermind: 'Şifre Kırıcı',
        lightsout_goal: 'Hedef: Tüm ışıkları söndür!',
        lightsout_hint: 'Bir ışığa tıklamak onu ve komşularını tersine çevirir.',
        btn_new_game: 'Yeni Oyun',
        label_attempts: 'Hak',
        msg_attempts_over: 'Deneme hakkın bitti.',
        btn_check: 'DENE',
        theme_store_title: '🎨 Tema Mağazası',
        profile_title: 'Oyuncu Profili',
        btn_reset_data: 'Tüm Kayıtları Sıfırla',
        no_data_text: 'Henüz oyun verisi yok.<br>Hadi bir oyun kazan!',
        link_play_zip: 'Zip oyna →',
        ach_first_win_name: 'İlk Zafer',
        ach_first_win_desc: 'İlk oyununu kazan',
        ach_five_wins_name: 'Beşli',
        ach_five_wins_desc: '5 oyun kazan',
        ach_ten_wins_name: 'On Numara',
        ach_ten_wins_desc: '10 oyun kazan',
        ach_daily_done_name: 'Günlük Şampiyon',
        ach_daily_done_desc: 'Günün bulmacasını tamamla',
        ach_streak_3_name: 'Serici',
        ach_streak_3_desc: '3 günlük seri yap',
        ach_all_games_name: 'Koleksiyoncu',
        ach_all_games_desc: 'Her oyunu en az 1 kez kazan',
        label_achievements: '🏆 Başarımlar',
        label_total_wins: 'Zafer',
        label_rate: 'Oran',
        label_best_score: 'En İyi: ',
        msg_new_win: 'Yeni Zafer Kaydedildi!',
        msg_streak: 'Seri: ',
        msg_daily_complete: 'GÜNÜN BULMACASI TAMAMLANDI!',
        label_days: 'gün',
        confirm_reset: 'Tüm kayıtlar silinsin mi?',
        theme_default: 'Mor Gece',
        theme_ocean: 'Okyanus',
        theme_emerald: 'Zümrüt',
        theme_sunset: 'Gün Batımı',
        theme_rose: 'Gül',
        theme_gold: 'Altın'
    },

    en: {
        // App Header
        app_title: '🧩 Puzzles',
        app_subtitle: 'Popular brain games in one place',

        // Stats Bar
        stat_games: 'Games',
        stat_wins: 'Wins',
        stat_streak: 'Streak',

        // Daily Banner
        daily_badge: '⭐ TODAY\'S FEATURED',
        daily_title: '📅 Daily Puzzle',
        daily_hint: '💡 Each game has its own daily puzzle!',
        daily_waiting: '⏳ Waiting',
        daily_solved: '✅ Solved',

        // Buttons
        btn_profile: 'Profile',
        btn_random: '🎲 Random',
        btn_daily: '📅 Daily',
        btn_reset: 'Reset',
        btn_new_game: 'New Game',
        btn_next: 'Next Level 👉',
        btn_save_exit: '💾 Save & Return to Menu',
        btn_keep_playing: 'Keep Playing',
        btn_tutorial: '❓ How to Play',
        btn_close: 'Close',

        // Win Modal
        win_title: 'Congratulations! 🎉',
        win_message: 'You completed the level.',
        congrats: 'Congratulations!',
        game_over: 'Game Over!',
        you_win: 'YOU WON!',
        you_lose: 'YOU LOST!',

        // Labels
        label_cell: 'Cell',
        label_time: 'Time',
        label_moves: 'Moves',
        label_score: 'Score',
        label_best: 'Best',
        label_mistakes: 'Mistakes',

        // Profile Modal
        profile_title: 'Player Profile',
        profile_total_wins: 'Total Wins',
        profile_best_streak: 'Best Streak',
        profile_badges: 'Badges',
        profile_stats: 'Statistics',

        // Game Names
        game_zip: 'Zip',
        game_queens: 'Queens',
        game_sudoku: 'Sudoku',
        game_nonogram: 'Nonogram',
        game_binary: 'Binary',
        game_wordle: 'Wordle',
        game_2048: '2048',
        game_minesweeper: 'Minesweeper',
        game_memory: 'Memory',
        game_slider: 'Slider',
        game_lightsout: 'Lights Out',
        game_mastermind: 'Mastermind',
        game_floodit: 'Flood It',
        game_kakuro: 'Kakuro',
        game_kenken: 'KenKen',
        game_futoshiki: 'Futoshiki',

        // Game Descriptions
        game_zip_desc: 'Connect numbers in order',
        game_queens_desc: 'Place queens strategically',
        game_sudoku_desc: 'Classic number puzzle',
        game_nonogram_desc: 'Grid shading puzzle',
        game_binary_desc: '0 and 1 logic',
        game_wordle_desc: 'Guess the word',
        game_2048_desc: 'Merge the tiles',
        game_minesweeper_desc: 'Avoid the mines',
        game_memory_desc: 'Match the cards',
        game_slider_desc: '15 Puzzle',
        game_lightsout_desc: 'Turn off all lights',
        game_mastermind_desc: 'Crack the code',
        game_floodit_desc: 'Flood the board',
        game_kakuro_desc: 'Math crossword',
        game_kenken_desc: 'Cage math puzzle',
        game_futoshiki_desc: 'Inequality puzzle',

        // Tutorials - Zip
        tut_zip_1: 'Connect numbers in order <strong>starting from 1</strong>.',
        tut_zip_2: 'You can only move <strong>horizontally or vertically</strong>.',
        tut_zip_3: 'Fill the entire grid to win!',

        // Tutorials - Wordle
        tut_wordle_1: 'Guess the 5-letter hidden word in <strong>6 tries</strong>.',
        tut_wordle_2: '<span style="color:#538d4e">Green:</span> Correct letter, correct spot.',
        tut_wordle_3: '<span style="color:#b59f3b">Yellow:</span> Correct letter, wrong spot.',
        tut_wordle_4: '<span style="color:#3a3a3c">Gray:</span> Letter not in word.',

        // Tutorials - Sudoku
        tut_sudoku_1: 'Fill the 9x9 grid with digits <strong>1-9</strong>.',
        tut_sudoku_2: 'Each row, column, and 3x3 box must contain each digit <strong>exactly once</strong>.',
        tut_sudoku_3: 'No repeats allowed!',

        // Tutorials - 2048
        tut_2048_1: 'Use arrow keys or swipe to move tiles.',
        tut_2048_2: 'Tiles with the same number <strong>merge</strong> when they touch (2+2=4).',
        tut_2048_3: 'Reach the <strong>2048</strong> tile to win!',

        // Tutorials - Minesweeper
        tut_minesweeper_1: 'Click squares to reveal them.',
        tut_minesweeper_2: 'Numbers show how many <strong>mines</strong> are adjacent to that square.',
        tut_minesweeper_3: 'Place a <strong>Flag (🚩)</strong> where you think a mine is hiding.',
        tut_minesweeper_4: 'If you click a mine, game over!',

        // Tutorials - Slider
        tut_slider_1: 'Slide tiles by clicking on numbers adjacent to the empty space.',
        tut_slider_2: 'Goal is to order numbers <strong>from 1 to 15</strong>.',
        tut_slider_3: 'Start from top-left: 1, 2, 3, 4...',

        // Tutorials - Binary
        tut_binary_1: 'Fill all squares with <strong>0</strong> (Blue) or <strong>1</strong> (Pink).',
        tut_binary_2: 'No more than <strong>two</strong> of the same number can be next to each other.',
        tut_binary_3: 'Example: 001 is okay, but 000 is WRONG.',
        tut_binary_4: 'There must be an <strong>equal number</strong> of 0s and 1s in each row and column.',

        // Tutorials - Nonogram
        tut_nonogram_1: 'Numbers show <strong>how many consecutive filled squares</strong> are in that line.',
        tut_nonogram_2: 'Example "2 1": Two filled squares, at least one empty space, then one filled square.',
        tut_nonogram_3: 'Click to fill squares.',
        tut_nonogram_4: 'Use \'Cross\' mode to mark known empty spaces.',

        // Tutorials - Memory
        tut_memory_1: 'Click cards to flip them.',
        tut_memory_2: 'Find <strong>two matches</strong> to keep them open.',
        tut_memory_3: 'If they don\'t match, they flip back.',
        tut_memory_4: 'Try to match all cards in fewest moves!',

        // Tutorials - Mastermind
        tut_mastermind_1: 'Find the 4-color secret code.',
        tut_mastermind_2: 'Select colors and press <strong>Try</strong>.',
        tut_mastermind_3: '<strong>Black Peg:</strong> Correct color and position.',
        tut_mastermind_4: '<strong>White Peg:</strong> Correct color but wrong position.',

        // Tutorials - LightsOut
        tut_lightsout_1: 'Clicking a light toggles it and its <strong>neighbors</strong> (up, down, left, right).',
        tut_lightsout_2: 'Lights turn On/Off.',
        tut_lightsout_3: 'Goal: <strong>Turn off all lights</strong>.',

        // Tutorials - KenKen
        tut_kenken_1: 'Numbers must <strong>not repeat</strong> in rows or columns.',
        tut_kenken_2: 'Observe the cages (thick borders).',
        tut_kenken_3: 'Numbers in a cage must reach the <strong>target number</strong> using the operation.',
        tut_kenken_4: 'Example: "6×" means 2 and 3 (2×3=6).',

        // Tutorials - Kakuro
        tut_kakuro_1: 'Enter 1-9 in white cells.',
        tut_kakuro_2: '<strong>Yellow number:</strong> Sum of cells to the right.',
        tut_kakuro_3: '<strong>Blue number:</strong> Sum of cells below.',
        tut_kakuro_4: 'Numbers <strong>cannot repeat</strong> in a group.',
        tut_kakuro_5: 'Fill all cells correctly to win!',

        // Tutorials - FloodIt
        tut_floodit_1: 'Start from the top-left corner.',
        tut_floodit_2: 'Expand your area by clicking color buttons.',
        tut_floodit_3: 'Goal: Flood the entire board with <strong class="text-primary">one color</strong>.',
        tut_floodit_4: 'You have <strong>25 moves</strong>. Think carefully!',

        // Tutorials - Futoshiki
        tut_futoshiki_1: 'Numbers must <strong>not repeat</strong> in rows or columns.',
        tut_futoshiki_2: 'Watch for <strong>&lt;</strong> and <strong>&gt;</strong> signs between cells.',
        tut_futoshiki_3: 'Follow the inequality rules.',
        tut_futoshiki_4: 'Example: 2 &lt; 4 is correct, 4 &lt; 2 is wrong.',

        // Tutorials - Queens
        tut_queens_1: 'Place 1 Queen (👑) in each <strong>row</strong>, <strong>column</strong>, and <strong>colored region</strong>.',
        tut_queens_2: 'Queens cannot touch, <strong>even diagonally</strong>.',
        tut_queens_3: 'Click square: Place Queen.',
        tut_queens_4: 'Double click: Place \'X\' (Mark as empty).',

        // Daily Badge Text
        daily_puzzle_badge: '📅 DAILY PUZZLE',

        // Game UI - Common
        label_queen: 'Queen',
        label_queens: 'Queens',
        hint_click_queen: '👆 Click: Place queen',
        hint_dblclick_x: '❌ Double-click: Place \'X\'',
        hint_flag: 'Press button or right-click to place flag',
        hint_click_card: 'Click cards to flip them',
        btn_next_level: 'Next Level',
        btn_save_exit: '💾 Save & Return to Menu',
        btn_home: 'Home',
        btn_play_again: 'Play Again',
        btn_understood: 'Got it',
        tutorial_title: 'How to Play?',
        random_mode: 'RANDOM MODE',
        random_puzzle: 'RANDOM PUZZLE',

        // Win/Lose messages
        congrats: 'Congratulations!',
        well_done: 'Well Done!',
        sorry: 'SORRY',
        moves_exceeded: 'You exceeded the move limit.',
        completed_in: 'moves to complete.',

        // Misc
        loading: 'Loading...',
        back: '←',

        // Surgical Pass Keys
        diff_easy: 'Easy',
        diff_medium: 'Medium',
        diff_hard: 'Hard',
        label_mistakes: 'Mistakes',
        msg_too_many_mistakes: 'You made too many mistakes.',
        label_daily_challenge: 'DAILY CHALLENGE',
        btn_restart: 'Restart',
        binary_rules: '1. Max two same digits in a row.<br>2. Equal count of 0s and 1s.',
        game_lightsout: 'Lights Out',
        game_mastermind: 'Mastermind',
        lightsout_goal: 'Goal: Turn off all the lights!',
        lightsout_hint: 'Clicking a light toggles it and its neighbors.',
        btn_new_game: 'New Game',
        label_attempts: 'Turns',
        msg_attempts_over: 'Out of turns.',
        btn_check: 'CHECK',
        theme_store_title: '🎨 Theme Store',
        profile_title: 'Player Profile',
        btn_reset_data: 'Reset All Data',
        no_data_text: 'No game data yet.<br>Go win a game!',
        link_play_zip: 'Play Zip →',
        ach_first_win_name: 'First Victory',
        ach_first_win_desc: 'Win your first game',
        ach_five_wins_name: 'High Five',
        ach_five_wins_desc: 'Win 5 games',
        ach_ten_wins_name: 'Perfect Ten',
        ach_ten_wins_desc: 'Win 10 games',
        ach_daily_done_name: 'Daily Champion',
        ach_daily_done_desc: 'Complete the daily puzzle',
        ach_streak_3_name: 'Streaker',
        ach_streak_3_desc: 'Reach a 3-day streak',
        ach_all_games_name: 'Collector',
        ach_all_games_desc: 'Win every game at least once',
        label_achievements: '🏆 Achievements',
        label_total_wins: 'Wins',
        label_rate: 'Rate',
        label_best_score: 'Best: ',
        msg_new_win: 'New Victory Recorded!',
        msg_streak: 'Streak: ',
        msg_daily_complete: 'DAILY PUZZLE COMPLETED!',
        label_days: 'days',
        confirm_reset: 'Delete all records?',
        theme_default: 'Purple Night',
        theme_ocean: 'Ocean',
        theme_emerald: 'Emerald',
        theme_sunset: 'Sunset',
        theme_rose: 'Rose',
        theme_gold: 'Gold'
    }
};

// Current language (default: Turkish)
let currentLang = localStorage.getItem('lang') || 'tr';

/**
 * Get translation for a key
 */
function t(key) {
    return translations[currentLang]?.[key] || translations['tr']?.[key] || key;
}

/**
 * Apply translations to all elements with data-i18n attribute
 */
function applyLanguage(lang) {
    if (lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
    }

    // Update document lang attribute
    document.documentElement.lang = currentLang;

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang]?.[key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    // Update all elements with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang]?.[key]) {
            el.placeholder = translations[currentLang][key];
        }
    });

    // Update all elements with data-i18n-title
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (translations[currentLang]?.[key]) {
            el.title = translations[currentLang][key];
        }
    });

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update page title if on main page
    if (document.querySelector('.app-title')) {
        document.title = currentLang === 'tr' ? 'Bulmacalar - Super App' : 'Puzzles - Super App';
    }

    // Refresh dashboard if available (for dynamic content like daily banner)
    if (typeof updateDashboard === 'function') {
        updateDashboard();
    }
}

/**
 * Set language and apply
 */
function setLanguage(lang) {
    applyLanguage(lang);
    if (window.SoundManager) SoundManager.play('click');
}

/**
 * Get current language
 */
function getLang() {
    return currentLang;
}

// Auto-apply on load
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);
});

// Export for global use
window.i18n = {
    t,
    apply: applyLanguage,
    set: setLanguage,
    get: getLang,
    translations
};

// Global Alias for ease of use in games
window.getText = t;
