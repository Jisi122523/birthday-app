// ========================= //
// NAVIGATION SYSTEM //
// ========================= //

class Navigator {
    constructor() {
        this.currentScreen = 'welcome';
        this.screenHistory = ['welcome'];
        this.screenOrder = [
            'welcome',
            'letter',
            'gift',
            'photo',
            'story',
            'timeline',
            'memories',
            'love',
            'open-when',
            'quiz',
            'future',
            'cake',
            'video',
            'birthday',
            'final-letter',
            'ending'
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showScreen('welcome');
    }

    setupEventListeners() {
        // Back button
        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', () => this.goBack());
        }

        // Next buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('next-button')) {
                // Special handling for quiz screen
                if (this.currentScreen === 'quiz' && effects) {
                    effects.proceedToNextQuestion();
                } else {
                    const nextScreen = e.target.getAttribute('data-next');
                    if (nextScreen) {
                        this.goToScreen(nextScreen);
                    }
                }
            }
        });
    }

    /**
     * Show a specific screen
     */
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show the target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
            
            // Scroll to top
            targetScreen.scrollTop = 0;

            // Trigger any screen-specific initialization
            this.onScreenEnter(screenId);
        }
    }

    /**
     * Navigate to a screen and add to history
     */
    goToScreen(screenId) {
        if (screenId && document.getElementById(screenId)) {
            this.screenHistory.push(screenId);
            this.showScreen(screenId);
        }
    }

    /**
     * Go back to previous screen
     */
    goBack() {
        const currentScreen = this.getCurrentScreen();
        
        // Special handling for quiz: check if we should go to previous question
        if (currentScreen === 'quiz' && effects && typeof effects.goToPreviousQuestion === 'function') {
            const wentToPreviousQuestion = effects.goToPreviousQuestion();
            if (wentToPreviousQuestion) {
                return; // Stayed in quiz, just went to previous question
            }
        }
        
        // Normal back navigation
        if (this.screenHistory.length > 1) {
            this.screenHistory.pop();
            const previousScreen = this.screenHistory[this.screenHistory.length - 1];
            this.showScreen(previousScreen);
        }
    }

    /**
     * Called when entering a screen - used for screen-specific logic
     */
    onScreenEnter(screenId) {
        // Reset quiz when first entering quiz screen
        if (screenId === 'quiz' && effects) {
            effects.currentQuizIndex = 0;
            effects.loadQuizQuestion();
        }
        
        // Reset memory gallery when entering memories screen
        if (screenId === 'memories' && effects) {
            effects.currentMemoryIndex = 0;
            const imageElement = document.getElementById('memoryImageElement');
            const counterElement = document.getElementById('imageCounter');
            if (imageElement) {
                imageElement.src = `assets/images/image${effects.memoryImages[0]}.jpg`;
            }
            if (counterElement) {
                counterElement.textContent = '1 of 5';
            }
        }
    }

    /**
     * Get current screen ID
     */
    getCurrentScreen() {
        return this.currentScreen;
    }

    /**
     * Check if on the final screen
     */
    isOnFinalScreen() {
        return this.currentScreen === 'ending';
    }

    /**
     * Reset navigation to start
     */
    reset() {
        this.currentScreen = 'welcome';
        this.screenHistory = ['welcome'];
        this.showScreen('welcome');
    }
}

// Create global navigator instance
let navigator;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        navigator = new Navigator();
    });
} else {
    navigator = new Navigator();
}
