// ========================= //
// DATA & CONTENT STORAGE //
// ========================= //

const APP_DATA = {
    // ========================= //
    // THINGS I LOVE ABOUT YOU //
    // ========================= //
    loveMessages: {
        sweet: `You have the sweetest heart.<br><br>The way you care so gently about everything makes my heart melt. Your sweetness is like a breath of fresh air in my life. ❤️`,
        
        caring: `Your compassion is boundless.<br><br>You care about me, about others, about making the world a little better. That's truly special and rare. I'm lucky to have someone who cares so deeply. 🤍`,
        
        funny: `You make me laugh every single day.<br><br>Your sense of humor, your funny stories, those silly moments we share - they're the highlights of my day. Keep making me laugh, lablab. 😂`,
        
        smart: `You're incredibly intelligent.<br><br>The way you think, problem-solve, and see through things amazes me. Your mind is beautiful and sharp. I love talking to you about everything. 🧠`,
        
        loving: `Your love is unconditional.<br><br>The way you love without reservation, without limits - it teaches me what real love looks like. You love with your whole heart, and I'm so grateful for that. ❤️`
    },

    // ========================= //
    // OPEN WHEN... LETTERS //
    // ========================= //
    openWhenLetters: {
        miss: `<strong>When You Miss Me 💌</strong><br><br>
            Hey lablab,<br><br>
            I miss you too. Every moment without you feels a little longer, a little quieter. But you know what? Missing you just means how much you mean to me.<br><br>
            Remember all our good moments? Our food trips, our late-night talks, our sleepy cuddles? Those don't disappear just because we're apart. They're in my heart, always.<br><br>
            Soon we'll be together again. And until then, I'm here for you, in this app, in my thoughts, in my heart.<br><br>
            I love you. 💜`,

        sad: `<strong>When You're Sad 🌧️</strong><br><br>
            My love,<br><br>
            It's okay to feel sad. Even the strongest people have difficult days. And that's okay.<br><br>
            But remember - you're not alone in this. I'm here with you. Your sadness is valid, and I want you to know that it's okay to cry, to feel, to let it out.<br><br>
            Think about the things you love: your passion, your dreams, your family, and yes... us. Better days are coming. They always do.<br><br>
            If you need to talk, I'm listening. If you need space, I understand. Whatever you need, I'm here.<br><br>
            You're stronger than you think. 💜`,

        angry: `<strong>When You're Angry 😤</strong><br><br>
            Hey,<br><br>
            You have every right to feel angry. Don't suppress it - let it out safely. Anger is just another emotion, and it's telling you something important.<br><br>
            But remember this: your anger doesn't define you. You're kind, you're thoughtful, and one moment of anger doesn't change that.<br><br>
            Take a deep breath. Go for a walk. Listen to your favorite song. Do something that makes you feel calm and centered.<br><br>
            And remember - I'm on your side. Always. We'll work through this together, whatever it is.<br><br>
            I love you, even on your hardest days. 💜`,

        sleep: `<strong>When You Can't Sleep 🌙</strong><br><br>
            My dear,<br><br>
            If you're reading this at 3 AM, I know how you're feeling. The thoughts racing, the restlessness, the quiet of the night that feels too loud.<br><br>
            But here's what I want you to know: You're safe. You're loved. And everything will be okay.<br><br>
            Try some deep breathing. In through your nose, out through your mouth. Think of happy moments - our memories, our laughs, our dreams for the future. Let your mind wander to peaceful places.<br><br>
            And if sleep doesn't come, that's okay too. Just rest your body. Tomorrow is a new day.<br><br>
            Sweet dreams, my love. I'm thinking of you. 💜`,

        love: `<strong>When You Need Love ❤️</strong><br><br>
            Joyjoy,<br><br>
            You are so loved. Let me count the ways:<br><br>
            You're loved for who you are - not for what you do or what you achieve.<br>
            You're loved on your best days and your worst days.<br>
            You're loved when you're strong and when you're vulnerable.<br>
            You're loved with my whole heart, completely and unconditionally.<br><br>
            Whenever you need to feel that love, remember: I'm here. This app is here. 30 beautiful months of us are here. And there are so many more to come.<br><br>
            You are enough. You have always been enough. 💜`
    },

    // ========================= //
    // OUR FUTURE DREAMS //
    // ========================= //
    futureDreams: {
        home: `<strong>🏡 Our Home</strong><br><br>I dream of building a home with you. Not just a house, but a place filled with love, laughter, and comfort. A space that's uniquely ours. I can see it already. 💜`,
        
        food: `<strong>🍜 Food Trips</strong><br><br>Endless food trips together! Trying new restaurants, discovering hidden gems, late-night snacks, cooking together. Food tastes better when I'm with you. Let's make this a lifetime adventure. 🍜`,
        
        rides: `<strong>🚗 Rides Together</strong><br><br>Long drives with good music and better company. Just you and me, the open road, and all our dreams ahead. Some of my best memories are our motor rides. 🏍️`,
        
        family: `<strong>👨‍👩‍👧 Our Family</strong><br><br>I dream of building a beautiful family with you. Creating traditions, making memories, and raising happy, loved children. A family full of warmth and joy. 💕`,
        
        success: `<strong>💰 Success Together</strong><br><br>I see us both achieving our dreams. Both successful, both happy, supporting each other every step of the way. Let's make it happen, together. 💪`,
        
        adventure: `<strong>✈️ Adventures Everywhere</strong><br><br>Travel, explore, discover new places, experience new cultures - all with you. I want to see the world with you by my side. Let's make those memories. 🌍`
    },

    // ========================= //
    // QUIZ QUESTIONS //
    // ========================= //
    quiz: [
        {
            question: "Where did we meet?",
            answers: [
                { text: "Online app", correct: true },
                { text: "School", correct: false },
                { text: "Somewhere else", correct: false }
            ],
            feedback: {
                correct: "Correct! Through random connection, we found something special. 💜",
                incorrect: "Not quite! We met through an online app, remember? 💭"
            }
        },
        {
            question: "How long have we been together?",
            answers: [
                { text: "30 months", correct: true },
                { text: "2 years", correct: false },
                { text: "1 year", correct: false }
            ],
            feedback: {
                correct: "Yes! 30 beautiful months of us! 💜",
                incorrect: "It's 30 months - 2 and a half beautiful years! 📅"
            }
        },
        {
            question: "What's my favorite thing about you?",
            answers: [
                { text: "Everything", correct: true },
                { text: "Your looks", correct: false },
                { text: "Your achievements", correct: false }
            ],
            feedback: {
                correct: "Correct! I love everything about you. 💜",
                incorrect: "It's everything about you! Your heart, your soul, your spirit! 💕"
            }
        }
    ],

    // ========================= //
    // MESSAGE TEMPLATES //
    // ========================= //
    messages: {
        welcome: "I made something special just for you.",
        letter1: "I know I can't be there with you in person today, so I made this little world for you instead. Every tap is a little piece of my heart.",
        gift: "You found a gift. But there's only one way to find out what's inside.",
        storyIntro: "We met through an online app. Who would've thought one random connection would become something this important to me?",
        timeline: "30 Months of Us ❤️",
        memories: "Food trips. Rides. Sleeping together. The little moments that became our memories.",
        thankYou: "Thank you for 30 beautiful months of love, laughter, and endless memories."
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APP_DATA;
}
