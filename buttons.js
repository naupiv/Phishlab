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

        document.querySelector('header').style.display = 'none';
        document.querySelector('.main-content').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
        document.getElementById('introSection').style.display = 'none';

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
                <div data-suspicious="true">
                    <strong>De:</strong> "Suport Oficial" &lt;support@fakeemail.com&gt;
                </div>
                <div data-suspicious="true">
                    <strong>Assumpte:</strong> Urgent: El teu compte ha estat bloquejat!
                </div>
            </div>
            <div class="email-body">
                <p>Hola, hem detectat <span data-suspicious="true">activitat sospitosa</span> al teu compte. Per evitar que el teu compte sigui suspès, si us plau, fes clic en l'enllaç següent per restablir la teva contrasenya immediatament.</p>
                <p><a href="#" data-suspicious="true">Restablir contrasenya</a></p>
                <p>Gràcies per la teva col·laboració.</p>
            </div>
            <button onclick="validateSelections()">Validar Seleccions</button>
        </div>
    `;
    document.body.appendChild(emailScreen);

    const container = emailScreen.querySelector('.email-container');
    container.addEventListener('click', (event) => {
        if (event.target !== container) {
            event.target.classList.toggle('marked-suspicious');
        }
    });
}

function validateSelections() {
    const correctElements = document.querySelectorAll('[data-suspicious="true"]');
    const markedElements = document.querySelectorAll('.marked-suspicious');

    let correct = 0;
    let incorrect = 0;
    let missed = 0;

    markedElements.forEach(el => {
        if (el.hasAttribute('data-suspicious')) {
            correct++;
        } else {
            incorrect++;
        }
    });

    correctElements.forEach(el => {
        if (!el.classList.contains('marked-suspicious')) {
            missed++;
        }
    });

    alert(`Has marcat correctament ${correct} elements sospitosos.\nHas marcat ${incorrect} elements incorrectes.\nHas oblidat marcar ${missed} elements sospitosos.`);
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
