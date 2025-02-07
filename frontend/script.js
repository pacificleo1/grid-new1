document.getElementById("startGame").addEventListener("click", () => {
    const playerName = document.getElementById("playerName").value;
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);
    
    if (playerName.length < 3 || playerName.length > 40) {
        alert("Name must be between 3 and 40 characters.");
        return;
    }

    fetch("http://127.0.0.1:8000/start-game/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ player_name: playerName, rows, cols })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            generateGrid(rows, cols);
        }
    });
});

function generateGrid(rows, cols) {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${cols}, 50px)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 50px)`;

    for (let i = 0; i < rows * cols; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => {
            cell.textContent = "O";
        });
        grid.appendChild(cell);
    }
}
