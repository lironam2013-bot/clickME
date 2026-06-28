const btn = document.getElementById("btn");
const bgMusic = document.getElementById("bgMusic");
const screenGlow = document.getElementById("screen-glow");

localStorage.removeItem("skin");

let mp = 0;
let x = 100;
let y = 100;
let targetX = 100;
let targetY = 100;
let mouseX = 0;
let mouseY = 0;

let scared = false;
let score = 0;
let muted = false;

let currentSkin = localStorage.getItem("skin") || "neon";

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

btn.classList.add("skin-" + currentSkin);

function changeSkin(skinName) {
    btn.className = "btn-base"; 
    
    if (skinName !== 'default') {
        btn.classList.add("skin-" + skinName);
    }
    

    document.getElementById("skinBox").classList.remove("open");
    console.log("Skin changed to: " + skinName);
}

document.getElementById("skinButton").addEventListener("click", () => {
    document.getElementById("skinBox").classList.toggle("open");
});

function update() {
    const difficultySelect = document.getElementById("difficultySelect");
    const difficulty = difficultySelect ? difficultySelect.value : "easy";

    const colors = {
        easy: "#2ecc71",
        medium: "#f1c40f",
        hard: "#e67e22",
        expert: "#e74c3c",
        god: "#9b59b6"
    };

    if (screenGlow) {
        const color = colors[difficulty] || "#2ecc71";
        const blur = difficulty === "god" ? "100px" : "60px";
        screenGlow.style.boxShadow = `inset 0 0 ${blur} ${color}`;
        
        const levels = ['menu-easy', 'menu-medium', 'menu-hard', 'menu-expert', 'menu-god'];
        screenGlow.classList.remove(...levels);
        screenGlow.classList.add(`menu-${difficulty}`);
    }

    document.body.className = `menu-${difficulty}`;

    if (bgMusic && !muted) {
        bgMusic.volume = difficulty === "god" ? 0.45 : 0.3;
    }

    const menu = document.getElementById("menu");
    if (menu) {
        const levels = ['menu-easy', 'menu-medium', 'menu-hard', 'menu-expert', 'menu-god'];
        menu.classList.remove(...levels);
        menu.classList.add(`menu-${difficulty}`);
    }

    let dx = mouseX - x;
    let dy = mouseY - y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    btn.style.transition = "none";

    const isBlackout = document.documentElement.style.backgroundColor === "black";
    const isAdvancedMode = ["medium", "hard", "expert", "god"].includes(difficulty);

    if (isAdvancedMode && distance < 250 && !isBlackout) {
        let opacityFactor = 0.05 + (distance / 250) * 0.95;
        btn.style.opacity = opacityFactor;
        
        if (["expert", "god"].includes(difficulty)) {
            btn.style.backgroundColor = "red";
            let safeDistance = distance < 5 ? 5 : distance;
            targetX = x - (dx / safeDistance) * 250;
            targetY = y - (dy / safeDistance) * 250;
        } else {
            btn.style.backgroundColor = ""; 
        }
    } else if (!isBlackout) {
        btn.style.opacity = "1";
        btn.style.backgroundColor = "";
    }

    if ((distance < 80 || distance === 0) && !scared) {
        targetX = Math.random() * (window.innerWidth - btn.offsetWidth);
        targetY = Math.random() * (window.innerHeight - btn.offsetHeight);
        scared = true;

        if (difficulty === "god") {
            document.documentElement.style.backgroundColor = "black";
            document.body.style.backgroundColor = "black";
            btn.style.backgroundColor = "black";
            btn.style.opacity = "0"; 

            setTimeout(() => {
                document.documentElement.style.backgroundColor = "";
                document.body.style.backgroundColor = "";
                btn.style.backgroundColor = "red"; 
                btn.style.opacity = "1";
            }, 450);
        }

        setTimeout(() => { scared = false; }, 300);
    }

    targetX = Math.max(0, Math.min(targetX, window.innerWidth - btn.offsetWidth));
    targetY = Math.max(0, Math.min(targetY, window.innerHeight - btn.offsetHeight));

    x += (targetX - x) * 0.04;
    y += (targetY - y) * 0.04;
    btn.style.left = x + "px";
    btn.style.top = y + "px";

    requestAnimationFrame(update);
}

function msg() {
    const chr = [
    "nice... i guess.",
    "its still easy.",
    "relax its just a button",
    "i felt bad for you so... here you go",
    "not impressive at all",
    "button is tired of you",
    "congrats for getting better by 1 skill point",
    "you are not special",
    "that was just a fluke...",
    "very bad performance",
    "you're improving… very slowly… painfully slowly",
    "very bad gaming skills, very good skill issues. i felt pity.",
    "don't get cocky",
    "you clicked it? lucky.",
    "the button slipped",
    "don't get used to it",
    "you won the battle, not the war.",
    "even a broken clock is right 2 times a day.",
    "go touch grass or something",
    "okay, mr. professional clicker",
    "did you trip and fall on the button?",
    "i'll allow it. this time.",
    "the button let its guard down",
    "one hit does not make you a legend",
    "even a blind squirrel finds a nut sometimes",
    "wow. groundbreaking. a hit.",
    "the button is filing a complaint",
    "barely. but sure, take the win",
    "i'm still not impressed, but okay",
    "the bar was on the floor and you still tripped over it",
    "a hit?! quick, someone screenshot this",
    "the button blinked, that's all that happened",
    "don't tell your friends, they won't believe you",
    "i'm proud of you. slightly. barely.",
    "the button is reconsidering its life choices",
    "that was 10% skill, 90% luck",
    "is this what winning feels like? cute.",
    "the button felt that one. it's fine though.",
    "finally. only took you forever",
    "a win is a win, even a sad little one",
    "the button respects you now. a little.",
    "someone alert the press, a hit occurred",
    "i'll mark this down as a fluke for now",
    "you actually hit it? plot twist",
    "the button's ego took a small hit",
    "keep this energy. or don't, whatever",
    "miracles do happen, apparently",
    "the button didn't see that coming, ngl",
    "okay that one was actually decent",
    "don't let it go to your head"
];;
    return chr[Math.floor(Math.random() * chr.length)];
}


update();

function win() {
    score++;
    document.getElementById("text").textContent = score;
    document.getElementById("cheer").textContent = msg();

    if (score === 100) {
        showPopup("ok, ok. you win. you are better then i thought.");
    } else if (score === 50) {
        showPopup("half way! im impressed.");
    } else if (score === 1) {
        showPopup("well, well, well. your first point.");
    } else if (score > 0 && score % 100 === 0) {
        showPopup("100 past sience my last one");  
    }
}

btn.addEventListener("click", () => {
    win();
});

const missMessages = [
    "got ya",
    "skill issue?",
    "too slow",
    "lol nope",
    "in a blink of an eye...",
    "hahaha",
    "too easy!",
    "try again lol",
    "imagine hitting",
    "noob",
    "you had ONE job",
    "you missed reality",
    "that was painful to watch...",
    "even the button is disappointed",
    "apologies to the mouse",
    "im pretty sure you aimed at the void",
    "that miss was personal",
    "you lost to a button lol",
    "too slow",
    "skill issue detected",
    "not even close",
    "are you aiming with your eyes closed?",
    "i almost felt bad for you",
    "even the cursor is embarrassed",
    "you were THIS close. just kidding",
    "the button is invincible at this point",
    "your accuracy is a work of fiction.",
    "i bet you can't beat a snail in a race",
    "call your big bro to help you out.",
    "i can beat you with my eyes closed.",
    "if we play tag, you will be it forever",
    "at this point, the button thinks he is him",
    "the button just leveled up from dodging you",
    "this is becoming a personality trait",
    "your mouse deserves a raise for trying",
    "missed it by a country mile",
    "the button saw you coming from a mile away",
    "404: hit not found",
    "you blinked and so did your chances",
    "legendary whiff",
    "the button is writing its memoir about this",
    "that click went straight to nowhere",
    "i've seen better aim in the dark",
    "the button dodges better than you click",
    "ouch, right in the ego",
    "even your keyboard is judging you now",
    "this button has trust issues because of you"
];
function randomMsg() {
    return missMessages[Math.floor(Math.random() * missMessages.length)];
}

document.addEventListener("click", (e) => {
   
    if (!btn.contains(e.target) && !e.target.closest('#menu') && !e.target.closest('#menuToggle') && !e.target.closest('#difficultyBtn') && !e.target.closest('#skinBox') && !e.target.closest('#mute') && !e.target.closest('.popup')) {
        document.getElementById("cheer").textContent = randomMsg();
    }
});

function showPopup(text) {
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popupText");
    popupText.textContent = text;
    popup.classList.add("show");
}

function closePopup() {
    document.getElementById("popup").classList.remove("show");
}


function toggleMenu(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
    const toggleIcon = document.getElementById("menuToggle");
    toggleIcon.classList.toggle("open");
}


document.addEventListener("click", (e) => {
    const menu = document.getElementById("menu");
    if (menu && !menu.classList.contains("hidden") && !menu.contains(e.target) && !e.target.closest("#menuToggle") && !e.target.closest("#difficultyBtn")) {
        menu.classList.add("hidden");
        document.getElementById("menuToggle").classList.remove("open");
    }
});


document.addEventListener("click", function startMusic() {
    if (bgMusic) {
        bgMusic.play().then(() => {
            document.removeEventListener("click", startMusic);
        }).catch(error => {
            console.log("מחכה לאינטראקציה של המשתמש...");
        });
    }
}, { once: true }); 

function mute() {
    const muteBtn = document.getElementById("mute");
    if (!muted) {
        if(bgMusic) bgMusic.volume = 0;
        muted = true;
        muteBtn.classList.add("muted");
        muteBtn.textContent = "🔇";
    } else {
        const difficultySelect = document.getElementById("difficultySelect");
        const difficulty = difficultySelect ? difficultySelect.value : "easy";
        if(bgMusic) bgMusic.volume = difficulty === "god" ? 0.45 : 0.3;
        muted = false;
        muteBtn.classList.remove("muted");
        muteBtn.textContent = "🔊";
    }
}