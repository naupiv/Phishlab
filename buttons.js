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

        setTimeout(function() {
            document.getElementById('gameScreen').style.display = 'none';
            showPhishingEmail();
        }, 5000); 
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
                <div class="email-from suspicious" onclick="toggleSuspicious(this)">
                    <strong>De:</strong> "Suport Oficial" <support@fakeemail.com>
                </div>
                <div class="email-subject suspicious" onclick="toggleSuspicious(this)">
                    <strong>Assumpte:</strong> Urgent: El teu compte ha estat bloquejat!
                </div>
            </div>
            <div class="email-body">
                <p>Hola, hem detectat <span class="suspicious" onclick="toggleSuspicious(this)">activitat sospitosa</span> al teu compte. Per evitar que el teu compte sigui suspès, si us plau, fes clic en l'enllaç següent per restablir la teva contrasenya immediatament.</p>
                <p><a href="#" class="suspicious" onclick="toggleSuspicious(this)">Restablir contrasenya</a></p>
                <p>Gràcies per la teva col·laboració.</p>
            </div>
            <button onclick="validateSelections()">Validar Seleccions</button>
        </div>
    `;
    document.body.appendChild(emailScreen);
}

// Funció per canviar l'estil al clicar i marcar/desmarcar
function toggleSuspicious(element) {
    element.classList.toggle('marked-suspicious');
}

// Funció per validar les seleccions fetes
function validateSelections() {
    // Selecciona tots els elements sospitosos predefinits
    const correctSuspicious = document.querySelectorAll('.suspicious');

    // Selecciona tots els elements marcats com a sospitosos
    const marked = document.querySelectorAll('.marked-suspicious');

    // Comptador d'encerts
    let correctCount = 0;

    marked.forEach(el => {
        if (el.classList.contains('suspicious')) {
            correctCount++;
        }
    });

    // Mostra el resultat
    if (correctCount === correctSuspicious.length) {
        alert("Perfecte! Has identificat tots els elements sospitosos.");
    } else {
        alert(`Has identificat ${correctCount} de ${correctSuspicious.length} correctament. Torna-ho a intentar.`);
    }
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