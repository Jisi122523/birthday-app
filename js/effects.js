// ========================= //
// INTERACTIVE EFFECTS //
// ========================= //

class Effects {
    constructor() {
        this.revealedTiles = new Set();
        this.quizAnswered = false;
        this.currentQuizIndex = 0;
        this.memoryImages = [2, 3, 5, 6, 7];
        this.currentMemoryIndex = 0;
        this.init();
    }

    init() {
        this.setupRevealButtons();
        this.setupNoteButtons();
        this.setupFutureButtons();
        this.setupQuizButtons();
        this.setupMemoryGallery();
        this.loadQuizQuestion();
    }

    // ========================= //
    // MEMORY GALLERY //
    // ========================= //
    setupMemoryGallery() {
        // Find the next memory button and add click handler
        const memoriesSection = document.getElementById('memories');
        if (memoriesSection) {
            const nextButton = memoriesSection.querySelector('.next-button');
            if (nextButton) {
                // Store original click handler
                const originalHandler = nextButton.onclick;
                nextButton.addEventListener('click', (e) => {
                    // Check if we should cycle through memories first
                    if (this.currentMemoryIndex < this.memoryImages.length - 1) {
                        e.stopPropagation();
                        this.cycleMemory();
                    }
                });
            }
        }
    }

    cycleMemory() {
        this.currentMemoryIndex++;
        const imageNum = this.memoryImages[this.currentMemoryIndex];
        const imageElement = document.getElementById('memoryImageElement');
        const counterElement = document.getElementById('imageCounter');
        
        if (imageElement) {
            imageElement.src = `assets/images/image${imageNum}.jpg`;
            imageElement.style.animation = 'none';
            setTimeout(() => {
                imageElement.style.animation = 'fadeIn 0.6s ease-in-out';
            }, 10);
        }
        
        if (counterElement) {
            counterElement.textContent = `${this.currentMemoryIndex + 1} of ${this.memoryImages.length}`;
        }
    }

    // ========================= //
    // THINGS I LOVE BUTTONS //
    // ========================= //
    setupRevealButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('reveal-button')) {
                this.revealLoveMessage(e.target);
            }
        });
    }

    revealLoveMessage(button) {
        const messageKey = button.getAttribute('data-message');
        const messageContent = APP_DATA.loveMessages[messageKey];
        
        if (messageContent) {
            // Toggle reveal state
            if (this.revealedTiles.has(messageKey)) {
                button.classList.remove('revealed');
                this.revealedTiles.delete(messageKey);
                document.getElementById('loveMessage').innerHTML = 'Tap each one.';
            } else {
                button.classList.add('revealed');
                this.revealedTiles.add(messageKey);
                document.getElementById('loveMessage').innerHTML = messageContent;
                button.style.animation = 'none';
                setTimeout(() => {
                    button.style.animation = 'scaleIn 0.4s ease-out';
                }, 10);
            }
        }
    }

    // ========================= //
    // OPEN WHEN... LETTERS //
    // ========================= //
    setupNoteButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('note-button')) {
                this.revealOpenWhenLetter(e.target);
            }
        });
    }

    revealOpenWhenLetter(button) {
        const noteKey = button.getAttribute('data-note');
        const letterContent = APP_DATA.openWhenLetters[noteKey];
        
        if (letterContent) {
            // Toggle reveal state
            if (this.revealedTiles.has(`note-${noteKey}`)) {
                button.classList.remove('revealed');
                this.revealedTiles.delete(`note-${noteKey}`);
                document.getElementById('noteMessage').innerHTML = '';
            } else {
                // Hide previously revealed notes
                document.querySelectorAll('.note-button.revealed').forEach(btn => {
                    btn.classList.remove('revealed');
                });
                this.revealedTiles.clear();
                
                button.classList.add('revealed');
                this.revealedTiles.add(`note-${noteKey}`);
                document.getElementById('noteMessage').innerHTML = letterContent;
                
                // Add animation
                button.style.animation = 'none';
                setTimeout(() => {
                    button.style.animation = 'flipCard 0.6s ease-out';
                }, 10);
            }
        }
    }

    // ========================= //
    // OUR FUTURE BUTTONS //
    // ========================= //
    setupFutureButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('future-button')) {
                this.revealFutureDream(e.target);
            }
        });
    }

    revealFutureDream(button) {
        const futureKey = button.getAttribute('data-future');
        const dreamContent = APP_DATA.futureDreams[futureKey];
        
        if (dreamContent) {
            // Toggle reveal state
            if (this.revealedTiles.has(`future-${futureKey}`)) {
                button.classList.remove('revealed');
                this.revealedTiles.delete(`future-${futureKey}`);
                document.getElementById('futureMessage').innerHTML = '';
            } else {
                // Hide previously revealed dreams
                document.querySelectorAll('.future-button.revealed').forEach(btn => {
                    btn.classList.remove('revealed');
                });
                this.revealedTiles.clear();
                
                button.classList.add('revealed');
                this.revealedTiles.add(`future-${futureKey}`);
                document.getElementById('futureMessage').innerHTML = dreamContent;
                
                // Add animation
                button.style.animation = 'none';
                setTimeout(() => {
                    button.style.animation = 'slideInUp 0.6s ease-out';
                }, 10);
            }
        }
    }

    // ========================= //
    // QUIZ SYSTEM //
    // ========================= //
    loadQuizQuestion() {
        // Reset quiz state for this question
        this.quizAnswered = false;
        
        // Get current question
        const quiz = APP_DATA.quiz;
        if (!quiz || !quiz[this.currentQuizIndex]) {
            console.log('Quiz complete!');
            return;
        }

        const question = quiz[this.currentQuizIndex];
        const totalQuestions = quiz.length;
        
        // Update question text
        document.getElementById('quizQuestion').innerHTML = `<br><br>${question.question}`;
        
        // Render answer buttons
        const container = document.getElementById('quizAnswersContainer');
        container.innerHTML = '';
        
        question.answers.forEach(answer => {
            const btn = document.createElement('button');
            btn.className = 'choice-button';
            btn.textContent = answer.text;
            btn.disabled = false;
            container.appendChild(btn);
        });

        // Update progress
        const progressText = `Question ${this.currentQuizIndex + 1} of ${totalQuestions}`;
        document.getElementById('quizProgress').innerHTML = progressText;
        
        // Clear previous result
        document.getElementById('quizResult').innerHTML = '';
    }

    /**
     * Go to previous quiz question
     * Returns true if went to previous question, false if already at first question
     */
    goToPreviousQuestion() {
        if (this.currentQuizIndex > 0) {
            this.currentQuizIndex--;
            this.loadQuizQuestion();
            return true;
        }
        return false;
    }

    setupQuizButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('choice-button')) {
                this.handleQuizAnswer(e.target);
            }
        });
    }

    handleQuizAnswer(button) {
        // Prevent multiple answers
        if (this.quizAnswered) return;

        // Determine correctness by consulting APP_DATA for the current question
        const question = APP_DATA.quiz && APP_DATA.quiz[this.currentQuizIndex] ? APP_DATA.quiz[this.currentQuizIndex] : null;
        const btnText = button.textContent.trim();
        let isCorrect = false;

        if (question && Array.isArray(question.answers)) {
            const matched = question.answers.find(a => a.text.trim() === btnText);
            if (matched) {
                isCorrect = !!matched.correct;
            }
        }

        // Disable all choice buttons
        document.querySelectorAll('.choice-button').forEach(btn => {
            btn.disabled = true;
        });

        if (isCorrect) {
            button.classList.add('correct-answer');
            button.style.animation = 'pulse 0.6s ease-out';
            const feedbackMsg = question?.feedback?.correct || 'Correct! ✓';
            document.getElementById('quizResult').innerHTML = feedbackMsg;
            document.getElementById('quizResult').style.color = '#2ecc71';
        } else {
            button.classList.add('incorrect-answer');
            button.style.animation = 'shake 0.5s ease-out';
            const feedbackMsg = question?.feedback?.incorrect || 'Try again!';
            document.getElementById('quizResult').innerHTML = feedbackMsg;
            document.getElementById('quizResult').style.color = '#e74c3c';
        }

        this.quizAnswered = true;
    }

    /**
     * Proceed to next quiz question or leave quiz
     */
    proceedToNextQuestion() {
        if (this.currentQuizIndex < APP_DATA.quiz.length - 1) {
            // More questions remain
            this.currentQuizIndex++;
            this.loadQuizQuestion();
        } else {
            // Quiz complete - trigger navigation to next screen (future)
            if (navigator) {
                navigator.goToScreen('future');
            }
        }
    }

    // ========================= //
    // PARTICLE EFFECTS //
    // ========================= //
    createConfetti(x = window.innerWidth / 2, y = window.innerHeight / 2) {
        const colors = ['#9b59b6', '#d8b4e8', '#e8cff0', '#ff69b4', '#ff1493'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            
            const angle = (Math.random() * 2 * Math.PI);
            const velocity = 5 + Math.random() * 10;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 5;
            
            document.body.appendChild(confetti);
            
            let posX = x;
            let posY = y;
            let velX = vx;
            let velY = vy;
            
            const animate = () => {
                posX += velX;
                posY += velY;
                velY += 0.2; // gravity
                
                confetti.style.left = posX + 'px';
                confetti.style.top = posY + 'px';
                confetti.style.opacity = Math.max(0, 1 - (posY - y) / 300);
                
                if (posY < window.innerHeight) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            };
            
            animate();
        }
    }

    // ========================= //
    // SHAKE EFFECT //
    // ========================= //
    shakeElement(element, intensity = 10, duration = 500) {
        const originalStyle = element.style.transform;
        const startTime = Date.now();
        
        const shake = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const scale = (1 - progress) * intensity;
            
            element.style.transform = `translate(${(Math.random() - 0.5) * scale}px, ${(Math.random() - 0.5) * scale}px)`;
            
            if (progress < 1) {
                requestAnimationFrame(shake);
            } else {
                element.style.transform = originalStyle;
            }
        };
        
        shake();
    }

    // ========================= //
    // FLOAT ANIMATION //
    // ========================= //
    addFloatAnimation(element) {
        element.style.animation = 'float 3s ease-in-out infinite';
    }

    // ========================= //
    // PULSE ANIMATION //
    // ========================= //
    pulseElement(element) {
        element.style.animation = 'pulse 0.6s ease-out';
    }

    // ========================= //
    // RESET //
    // ========================= //
    reset() {
        this.revealedTiles.clear();
        this.quizAnswered = false;
        this.currentQuizIndex = 0;
        this.currentMemoryIndex = 0;
    }
}

// Create global effects instance
let effects;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        effects = new Effects();
    });
} else {
    effects = new Effects();
}
