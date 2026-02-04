/**
 * Seeded Random Number Generator
 * Uses Mulberry32 algorithm for fast, deterministic results.
 */
class SeededRandom {
    constructor(seed) {
        if (typeof seed === 'string') {
            this.seed = this._hashString(seed);
        } else {
            this.seed = seed >>> 0;
        }
    }

    // MurmurHash3 mix function for string hashing
    _hashString(str) {
        let h = 1779033703 ^ str.length;
        for (let i = 0; i < str.length; i++) {
            h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
            h = h << 13 | h >>> 19;
        }
        return (function () {
            h = Math.imul(h ^ (h >>> 16), 2246822507);
            h = Math.imul(h ^ (h >>> 13), 3266489909);
            return (h ^= h >>> 16) >>> 0;
        })();
    }

    /** Mulberry32 algorithm */
    next() {
        this.seed += 0x6D2B79F5;
        let t = this.seed;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

    /** Range (inclusive) */
    nextInt(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    // Pick random element from array
    pick(array) {
        if (!array || array.length === 0) return null;
        return array[this.nextInt(0, array.length - 1)];
    }

    // Shuffle array (Fisher-Yates)
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(this.next() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Static helper to get today's seed (YYYYMMDD)
    static getDailySeed() {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return parseInt(`${year}${month}${day}`);
    }
}

window.SeededRandom = SeededRandom;
