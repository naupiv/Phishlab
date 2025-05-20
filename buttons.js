function startNewGame() {
    const nicknameForm = document.createElement('div');
    nicknameForm.id = 'nicknameForm';
    nicknameForm.innerHTML = `
        <input type="text" id="nickname" placeholder="Introdueix el teu Nickname" required>
        <button onclick="startGame()">Començar Joc</button>
    `;
    document.body.appendChild(nicknameForm);
}

function startGame() {
    const nickname = document.getElementById("nickname").value;
    if (nickname) {
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("score", 0);
        localStorage.setItem("lives", 3);

        document.getElementById("nicknameDisplay").innerText = "Nick: " + nickname;
        document.getElementById("scoreDisplay").innerText = localStorage.getItem("score");
        document.getElementById("livesDisplay").innerText = localStorage.getItem("lives");

        // Amagar la pantalla d'inici
        document.querySelector('header').style.display = 'none';
        document.querySelector('.main-content').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
        document.getElementById('introSection').style.display = 'none'; // Amagar la secció d'introducció
        
        // Mostrar la pantalla del joc
        document.getElementById('gameScreen').style.display = 'flex';

        // Esperar 20 segons i després mostrar el correu electrònic
        setTimeout(function() {
            document.getElementById('gameScreen').style.display = 'none';
            showPhishingEmail();
        }, 20000);  // 20000 mil·lisegons = 20 segons
    } else {
        alert("Si us plau, introdueix un nickname.");
    }
}

function showPhishingEmail() {
    const emailScreen = document.createElement('div');
    emailScreen.id = 'emailScreen';
    emailScreen.innerHTML = `
        <div class="email-container">
            <div class="email-header">
                <div class="email-from">
                    <strong>De:</strong> "Suport Oficial" <support@fakeemail.com>
                </div>
                <div class="email-subject">
                    <strong>Assumpte:</strong> Urgent: El teu compte ha estat bloquejat!
                </div>
                <div class="email-date">
                    12 maig 2025
                </div>
            </div>
            <div class="email-body">
                <p>Hola, hem detectat activitat sospitosa al teu compte. Per evitar que el teu compte sigui suspès, si us plau, fes clic en l'enllaç següent per restablir la teva contrasenya immediatament.</p>
                <p><a href="#">Restablir contrasenya</a></p>
                <p>Gràcies per la teva col·laboració.</p>
            </div>
            <button onclick="continueGame()">Continuar Joc</button>
        </div>
    `;
    document.body.appendChild(emailScreen);
}

function continueGame() {
    alert("Funcionalitat de continuar joc encara no implementada.");
}

function viewPlayerHistory() {
    alert("Funcionalitat d'historial del jugador encara no implementada.");
}

function resetGame() {
    const nickname = localStorage.getItem("nickname");
    if (nickname) {
        localStorage.clear();
        alert("Partida esborrada. Començant un nou joc.");
        location.reload();
    } else {
        alert("No hi ha cap partida per esborrar.");
    }
}
