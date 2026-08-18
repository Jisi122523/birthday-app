// ========================= //
// MAIN APPLICATION LOGIC //
// ========================= //

class BirthdayApp {
    constructor() {
        this.isPlayingMusic = false;
        this.audioElement = null;
        this.init();
    }

    init() {
        console.log('🎉 Birthday App Initializing...');
        
        // Setup music system
        this.setupMusic();
        
        // Setup other features
        this.setupSpecialEffects();
        this.setupAccessibility();
        
        // Show music notification
        this.showMusicNotification();
        
        console.log('✅ Birthday App Ready!');
    }

    // ========================= //
    // MUSIC SYSTEM //
    // ========================= //
    setupMusic() {
        const musicButton = document.getElementById('musicButton');
        
        if (musicButton) {
            musicButton.addEventListener('click', () => this.toggleMusic());
        }

        // Create audio element (in case you want to add music later)
        this.createAudioElement();
    }

    createAudioElement() {
        // Check if there's a music file in assets/music
        // If yes, create an audio element and attach it
        this.audioElement = document.createElement('audio');
        this.audioElement.id = 'bgMusic';
        this.audioElement.loop = true;
        this.audioElement.volume = 0.3;
        
        // Load music file
        this.audioElement.src = 'assets/music/birthday.mp3';
        
        document.body.appendChild(this.audioElement);
    }

    toggleMusic() {
        const musicButton = document.getElementById('musicButton');
        
        if (!this.audioElement || !this.audioElement.src) {
            // No music file available
            if (musicButton) {
                musicButton.style.animation = 'shake 0.3s ease-out';
                musicButton.title = 'Music file not found';
            }
            return;
        }

        if (this.isPlayingMusic) {
            // Stop music
            this.audioElement.pause();
            this.isPlayingMusic = false;
            if (musicButton) {
                musicButton.style.opacity = '0.5';
                musicButton.title = '🔇 Music: Off';
                musicButton.classList.remove('music-playing');
            }
        } else {
            // Play music
            const playPromise = this.audioElement.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        this.isPlayingMusic = true;
                        if (musicButton) {
                            musicButton.style.opacity = '1';
                            musicButton.title = '🔊 Music: On';
                            musicButton.classList.add('music-playing');
                        }
                        // Hide notification when music is turned on
                        this.hideMusicNotification();
                    })
                    .catch(error => {
                        console.log('Audio playback failed:', error);
                        if (musicButton) {
                            musicButton.title = 'Playback failed - browser may block autoplay';
                        }
                    });
            }
        }
    }

    // ========================= //
    // MUSIC NOTIFICATION //
    // ========================= //
    showMusicNotification() {
        const notification = document.getElementById('musicNotification');
        const closeBtn = document.getElementById('closeNotification');
        
        if (notification) {
            notification.classList.remove('hidden');
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideMusicNotification());
        }
    }

    hideMusicNotification() {
        const notification = document.getElementById('musicNotification');
        if (notification) {
            notification.style.animation = 'slideOutUp 0.3s ease-out forwards';
            setTimeout(() => {
                notification.classList.add('hidden');
                notification.style.animation = '';
            }, 300);
        }
    }

    // ========================= //
    // SPECIAL EFFECTS //
    // ========================= //
    setupSpecialEffects() {
        // Add confetti when reaching the birthday screen
        document.addEventListener('click', (e) => {
            const nextButton = e.target.closest('.next-button');
            if (nextButton) {
                const nextScreen = nextButton.getAttribute('data-next');
                
                // Confetti on birthday screen
                if (nextScreen === 'birthday') {
                    setTimeout(() => {
                        effects.createConfetti();
                    }, 300);
                }
            }
        });

        // Add heartbeat to hearts
        this.addHeartbeatAnimation();
    }

    addHeartbeatAnimation() {
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => {
            heart.classList.add('animate-heartbeat');
        });
    }

    // ========================= //
    // ACCESSIBILITY //
    // ========================= //
    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Arrow right or space to go next
            if (e.key === 'ArrowRight' || e.key === ' ') {
                const nextButton = document.querySelector('.next-button');
                if (nextButton) {
                    e.preventDefault();
                    nextButton.click();
                }
            }
            
            // Arrow left or backspace to go back
            if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
                const backButton = document.getElementById('backButton');
                if (backButton) {
                    e.preventDefault();
                    backButton.click();
                }
            }
        });

        // Ensure buttons are keyboard accessible
        document.querySelectorAll('button').forEach(btn => {
            if (!btn.hasAttribute('type')) {
                btn.setAttribute('type', 'button');
            }
        });
    }

    // ========================= //
    // UTILITY FUNCTIONS //
    // ========================= //

    /**
     * Preload images for smooth loading
     */
    preloadImages() {
        const imageElements = document.querySelectorAll('img');
        imageElements.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const preloadImg = new Image();
                preloadImg.src = src;
            }
        });
    }

    /**
     * Check browser compatibility
     */
    checkCompatibility() {
        const hasLocalStorage = typeof(Storage) !== 'undefined';
        const hasVideo = document.createElement('video').canPlayType;
        
        if (!hasLocalStorage) {
            console.warn('LocalStorage not available - some features may not work');
        }
        
        if (!hasVideo) {
            console.warn('Video playback not supported');
        }
    }

    /**
     * Save progress to localStorage (optional)
     */
    saveProgress() {
        const currentScreen = navigator?.getCurrentScreen();
        if (currentScreen && typeof(Storage) !== 'undefined') {
            localStorage.setItem('birthdayAppProgress', currentScreen);
        }
    }

    /**
     * Load progress from localStorage (optional)
     */
    loadProgress() {
        if (typeof(Storage) !== 'undefined') {
            const savedScreen = localStorage.getItem('birthdayAppProgress');
            if (savedScreen && navigator) {
                navigator.showScreen(savedScreen);
            }
        }
    }

    /**
     * Full screen mode (optional)
     */
    enterFullscreen() {
        const elem = document.querySelector('.app');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }

    /**
     * Print a heartfelt message to console
     */
    printWelcomeMessage() {
        console.clear();
        console.log(
            '%c🎂 Happy Birthday, Joyjoy! 🎂',
            'font-size: 20px; color: #9b59b6; font-weight: bold;'
        );
        console.log(
            '%c❤️ This app was made with love, just for you.',
            'font-size: 14px; color: #d8b4e8;'
        );
        console.log(
            '%c✨ Enjoy every moment! ✨',
            'font-size: 14px; color: #9b59b6;'
        );
    }
}

// ========================= //
// INITIALIZATION //
// ========================= //

let app;

// Initialize when everything is ready
function initializeApp() {
    console.log('DOM Content Loaded - Starting initialization...');
    
    // Wait for navigator and effects to be ready
    if (navigator && effects) {
        app = new BirthdayApp();
        app.printWelcomeMessage();
        app.checkCompatibility();
        app.preloadImages();
    } else {
        // Retry if components aren't ready
        setTimeout(initializeApp, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Auto-save progress periodically
setInterval(() => {
    if (app) {
        app.saveProgress();
    }
}, 5000);

// ========================= //
// WINDOW UNLOAD HANDLING //
// ========================= //
window.addEventListener('beforeunload', () => {
    if (app) {
        app.saveProgress();
    }
});
