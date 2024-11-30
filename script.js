const wordElement = document.getElementById("moveable");
const body = document.body;
const messageElement = document.getElementById("message");
const learnMoreBtn = document.getElementById("learnMoreBtn");
const centerBtn = document.getElementById("centerBtn");
centerBtn.addEventListener("click", centerWord);
learnMoreBtn.addEventListener("click", () => {
    window.location.href = "learn-more.html";
});

let isMoving = false;

function setRandomPosition() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const wordWidth = wordElement.offsetWidth;
    const wordHeight = wordElement.offsetHeight;

    // Define the center area to avoid
    const centerMargin = 100; // Adjust this value to change the size of the center area
    const centerX = windowWidth / 2;
    const centerY = windowHeight / 2;

    let x, y;
    do {
        x = Math.random() * (windowWidth - wordWidth);
        y = Math.random() * (windowHeight - wordHeight);
    } while (
        x > centerX - centerMargin - wordWidth/2 && 
        x < centerX + centerMargin - wordWidth/2 && 
        y > centerY - centerMargin - wordHeight/2 && 
        y < centerY + centerMargin - wordHeight/2
    );

    wordElement.style.left = `${x}px`;
    wordElement.style.top = `${y}px`;
}

wordElement.addEventListener("mousedown", (event) => {
    isMoving = true;
    const offsetX = event.clientX - wordElement.getBoundingClientRect().left;
    const offsetY = event.clientY - wordElement.getBoundingClientRect().top;

    const onMouseMove = (moveEvent) => {
        if (isMoving) {
            const x = moveEvent.clientX - offsetX;
            const y = moveEvent.clientY - offsetY;
            wordElement.style.left = `${x}px`;
            wordElement.style.top = `${y}px`;
            checkPosition();
        }
    };

    const onMouseUp = () => {
        isMoving = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});

function centerWord() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const wordWidth = wordElement.offsetWidth;
    const wordHeight = wordElement.offsetHeight;

    wordElement.style.left = `${centerX - wordWidth / 2}px`;
    wordElement.style.top = `${centerY - wordHeight / 2}px`;
    checkPosition();
}

function checkPosition() {
    const rect = wordElement.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const tolerance = 10; // Pixels of tolerance for centering

    if (Math.abs(rect.left + rect.width / 2 - centerX) < tolerance &&
        Math.abs(rect.top + rect.height / 2 - centerY) < tolerance) {
        body.style.backgroundColor = "green";
        messageElement.textContent = "You learned what a centered div looks like!";
    } else {
        body.style.backgroundColor = "red";
        messageElement.textContent = "Try to center the word 'here' (Click and Drag)";
    }
}

// Set initial random position
setRandomPosition();

// Initial check
checkPosition();

// Check on window resize
window.addEventListener("resize", () => {
    setRandomPosition();
    checkPosition();
});