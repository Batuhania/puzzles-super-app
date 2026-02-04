// ===== BULMACA SUPER APP - Main Dashboard =====
// Updated to use the new StatsManager system

// Card animations only - Stats are handled by inline StatsManager in index.html
document.addEventListener('DOMContentLoaded', () => {
    // Add entry animation delay to cards
    const cards = document.querySelectorAll('.game-card');
    cards.forEach((card, i) => {
        card.style.animation = `fadeInUp 0.5s ${i * 0.1}s backwards`;
    });
});
