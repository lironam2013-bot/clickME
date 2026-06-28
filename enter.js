
const bgMusic = document.getElementById("bgMusic")
bgMusic.volume = 0.3
let muted = false

document.addEventListener("click", function startMusic() {
    bgMusic.play().then(() => {
       
        document.removeEventListener("click", startMusic);
    }).catch(error => {
        console.log("you found me!");
    });
}, { once: true }); 




function login(){
location.href = "cm.html"
}


function mute() {
    const btn = document.getElementById("mute");

    if (!muted) {
        bgMusic.volume = 0;
        muted = true;
        btn.classList.add("muted");
        btn.textContent = "🔇";
    } else {
        bgMusic.volume = 0.3;
        muted = false;
        btn.classList.remove("muted");
        btn.textContent = "🔊";
    }
}
    
    
