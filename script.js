const player = document.getElementById("player");
const levelText = document.getElementById("level");
const scoreText = document.getElementById("score");

let level = 1;
let score = 0;
let jumping = false;

const levels = [];

for(let i = 1; i <= 50; i++){
    levels.push({
        speed: 3 + i * 0.2,
        obstacleRate: Math.max(400, 1800 - i * 25),
        targetScore: i * 100
    });
}

function jump(){

    if(jumping) return;

    jumping = true;
    let height = 0;

    const up = setInterval(() => {
        height += 5;
        player.style.bottom = height + "px";

        if(height >= 120){
            clearInterval(up);

            const down = setInterval(() => {
                height -= 5;
                player.style.bottom = height + "px";

                if(height <= 0){
                    clearInterval(down);
                    jumping = false;
                }
            },10);

        }

    },10);
}

document.addEventListener("keydown", e=>{
    if(e.code === "Space"){
        jump();
    }
});

function createObstacle(){

    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");

    obstacle.style.left = "1000px";

    document.getElementById("game").appendChild(obstacle);

    let pos = 1000;
    const speed = levels[level-1].speed;

    const move = setInterval(()=>{

        pos -= speed;
        obstacle.style.left = pos + "px";

        const playerBottom =
            parseInt(player.style.bottom) || 0;

        if(
            pos < 160 &&
            pos > 80 &&
            playerBottom < 60
        ){
            alert("You crashed! Restarting level.");
            location.reload();
        }

        if(pos < -50){
            clearInterval(move);
            obstacle.remove();

            score += 10;
            scoreText.textContent = score;

            if(score >= levels[level-1].targetScore){

                if(level < 50){
                    level++;
                    levelText.textContent = level;
                }else{
                    alert("YOU BEAT ALL 50 LEVELS!");
                }
            }
        }

    },10);
}

setInterval(()=>{
    createObstacle();
}, levels[level-1]?.obstacleRate || 1000);
