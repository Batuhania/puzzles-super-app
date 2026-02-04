// ===== CONFETTI CELEBRATION EFFECT =====
// Usage: confetti.launch() - triggers confetti animation

const confetti = {
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8', '#a29bfe', '#00b894', '#e17055'],

    launch(count = 100) {
        // Create container
        const container = document.createElement('div');
        container.className = 'confetti-container';
        document.body.appendChild(container);

        // Generate confetti pieces
        for (let i = 0; i < count; i++) {
            const confettiPiece = document.createElement('div');

            // Random shape
            const shapes = ['circle', 'square', 'triangle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            confettiPiece.className = `confetti ${shape}`;

            // Random color
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            confettiPiece.style.backgroundColor = color;
            confettiPiece.style.color = color; // For triangle

            // Random position
            confettiPiece.style.left = `${Math.random() * 100}%`;
            confettiPiece.style.top = `${-20 - Math.random() * 100}px`;

            // Random size
            const size = 8 + Math.random() * 12;
            if (shape !== 'triangle') {
                confettiPiece.style.width = `${size}px`;
                confettiPiece.style.height = `${size}px`;
            }

            // Random animation delay
            confettiPiece.style.animationDelay = `${Math.random() * 0.5}s`;

            // Random horizontal drift
            confettiPiece.style.setProperty('--drift', `${(Math.random() - 0.5) * 200}px`);

            container.appendChild(confettiPiece);
        }

        // Cleanup after animation
        setTimeout(() => {
            container.remove();
        }, 4000);
    },

    // Quick burst for small celebrations
    burst(count = 50) {
        this.launch(count);
    },

    // Big celebration
    celebrate() {
        this.launch(150);
        setTimeout(() => this.launch(100), 500);
        setTimeout(() => this.launch(75), 1000);
    }
};

// Make globally available
window.confetti = confetti;
