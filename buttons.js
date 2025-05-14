function startNewGame() {
    const nom = document.createElement("div");
    nom.id = "nom";
    nom.innerHTML = `
        <div id="formContainer">
            <input type="text" id="nickname" placeholder="Introdueix el teu Nickname" required>
            <button onclick="startGame()">Començar Joc</button>
        </div>
        <div id="message"></div>
    `;
    document.body.appendChild(nom);
}

function showMessage(message, isSuccess = true) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = isSuccess ? "success-message" : "error-message";
}

function startGame() {
    const nickname = document.getElementById("nickname").value;
    if (nickname) {
        continueGame(nickname);
    } else {
        showMessage("Nom no registrat, si us plau, registra l'usuari.", false);
    }
}

function continueGame(nickname) {
    const playerData = localStorage.getItem(nickname);
    if (playerData) {
        showMessage("Benvingut de nou, " + nickname + "! Carregant la teva última partida...", true);
        const savedGame = JSON.parse(playerData);
        initializeGame(savedGame);
    } else {
        showMessage("Benvingut, " + nickname + "! Comencem un nou joc!", true);
        const newPlayerData = {
            nickname: nickname,
            score: 0,
            level: 1,
            lives: 3,
        };
        localStorage.setItem(nickname, JSON.stringify(newPlayerData));
        initializeGame(newPlayerData);
    }

    const nom = document.getElementById("nom");
    if (nom) {
        nom.remove();
    }
}

function initializeGame(playerData) {
    console.log("Iniciant partida per:", playerData);
}

function resetGame() {
    const nickname = document.getElementById("nickname").value;
    if (nickname) {
        localStorage.removeItem(nickname);
        showMessage("Partida esborrada. Començant un nou joc.", true);
        startNewGame();
    } else {
        showMessage("Si us plau, introdueix un nickname.", false);
    }
}
