const levels = [
    {
        id: 1,
        difficulty: "Fàcil",
        emailContent: `
            <div class="email-header">
                <div data-suspicious="true">
                    <strong>De:</strong> "Suport Oficial" &lt;support@fakeemail.com&gt;
                </div>
                <div data-suspicious="true">
                    <strong>Assumpte:</strong> Urgent: El teu compte ha estat bloquejat!
                </div>
            </div>
            <div class="email-body">
                <p>Hola, hem detectat <span data-suspicious="true">activitat sospitosa</span> al teu compte. Per evitar que el teu compte sigui suspès, fes clic en l'enllaç següent per restablir la teva contrasenya.</p>
                <p><a href="#" data-suspicious="true">Restablir contrasenya</a></p>
            </div>
        `,
    },
    {
        id: 2,
        difficulty: "Mitjà",
        emailContent: `
            <div class="email-header">
                <div>
                    <strong>De:</strong> "Seguretat Bancària" &lt;secure@bank-alerts.com&gt;
                </div>
                <div>
                    <strong>Assumpte:</strong> Confirmació necessària per un ingrés recent
                </div>
            </div>
            <div class="email-body">
                <p>Benvolgut client, hem detectat un ingrés inusual de <span data-suspicious="true">2000 €</span>. Si no reconeixes aquest ingrés, fes clic en l'enllaç per informar-nos.</p>
                <p><a href="#" data-suspicious="true">Informar</a></p>
                <p><span data-suspicious="true">Aquest missatge s'ha enviat automàticament.</span></p>
            </div>
        `,
    },
    {
        id: 3,
        difficulty: "Difícil",
        emailContent: `
            <div class="email-header">
                <div>
                    <strong>De:</strong> "Company" &lt;noreply@trustworthy.com&gt;
                </div>
                <div>
                    <strong>Assumpte:</strong> Actualització dels nostres termes i condicions
                </div>
            </div>
            <div class="email-body">
                <p>Benvolgut usuari, hem actualitzat recentment els nostres termes i condicions. <span data-suspicious="true">És important que acceptis aquests canvis</span> per continuar utilitzant el servei.</p>
                <p>Fes clic aquí per revisar els canvis: <a href="#" data-suspicious="true">Revisar</a></p>
                <p>Aquest missatge és confidencial. Si has rebut aquest correu per error, si us plau, <a href="#">contacta amb nosaltres.</a></p>
            </div>
        `,
    },
];

function startNewGame() {
    let nicknameForm = document.getElementById("nicknameForm");
    if (!nicknameForm) {
        nicknameForm = document.createElement("div");
        nicknameForm.id = "nicknameForm";
        nicknameForm.style.textAlign = "center";
        nicknameForm.style.marginTop = "40px";
        nicknameForm.innerHTML = `
            <input type="text" id="nickname" placeholder="Introdueix el teu Nickname" required style="padding:8px 12px; font-size:16px; border-radius:4px; border:1px solid #ccc; margin-right:10px;">
            <button onclick="startGame()" style="padding:10px 20px; font-size:16px; border:none; border-radius:4px; background-color:#007bff; color:white; cursor:pointer; transition:background-color 0.3s ease;">Començar Joc</button>
        `;
        document.body.appendChild(nicknameForm);
    }
    nicknameForm.style.display = "block";
}

function startGame() {
    const nicknameInput = document.getElementById("nickname");
    const nickname = nicknameInput.value.trim();

    if (nickname) {
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("score", 0);
        localStorage.setItem("lives", 3);

        showNicknameBanner(nickname);
    } else {
        alert("Si us plau, introdueix un nickname.");
    }
}

function showNicknameBanner(nickname) {
    const banner = document.getElementById("nicknameBanner");
    if (!banner) return;

    const nicknameForm = document.getElementById("nicknameForm");
    if (nicknameForm) nicknameForm.style.display = "none";

    banner.textContent = `Benvingut, ${nickname}!`;
    banner.style.display = "block";

    setTimeout(() => {
        banner.style.display = "none";
        showLevelScreen(1);
    }, 2000);
}

function showLevelScreen(levelId) {
    const level = levels.find((l) => l.id === levelId);

    if (level) {
        const score = parseInt(localStorage.getItem("score")) || 0;
        const lives = parseInt(localStorage.getItem("lives")) || 3;

        const gameScreen = document.createElement("div");
        gameScreen.id = "gameScreen";
        gameScreen.innerHTML = `
            <div style="text-align: center; color: white;">
                <h1>Nivell ${levelId}</h1>
                <p>Dificultat: ${level.difficulty}</p>
                <p>Vides: ${lives}</p>
                <p>Puntuació: ${score}</p>
                <button onclick="showPhishingEmail(${levelId})" style="margin-top: 20px; padding:10px 20px; background-color:#007bff; color:white; border:none; border-radius:4px; cursor:pointer;">Iniciar Nivell</button>
            </div>
        `;

        document.body.innerHTML = "";
        document.body.appendChild(gameScreen);

        setTimeout(() => {
            showPhishingAlertScreen(levelId);
        }, 2000);

    } else {
        alert("Tots els nivells completats!");
    }
}
function showPhishingAlertScreen(levelId) {
    const alertScreen = document.createElement("div");
    alertScreen.id = "phishingAlertScreen";
    alertScreen.style.backgroundColor = "#ff4d4d";
    alertScreen.style.color = "white";
    alertScreen.style.textAlign = "center";
    alertScreen.style.padding = "20px";
    alertScreen.style.fontFamily = "Arial, sans-serif";
    alertScreen.style.position = "absolute";
    alertScreen.style.top = "0";
    alertScreen.style.left = "0";
    alertScreen.style.width = "100%";
    alertScreen.style.height = "100%";
    alertScreen.style.display = "flex";
    alertScreen.style.flexDirection = "column";
    alertScreen.style.justifyContent = "center";
    alertScreen.style.alignItems = "center";

    alertScreen.innerHTML = `
        <h1 style="font-size: 48px; font-weight: bold; font-family: 'Impact', sans-serif; color: black; text-transform: uppercase; margin-bottom: 20px;">
            ALERTA PHISHING
        </h1>
        <h2 style="font-size: 24px; font-weight: bold; color: black; margin-bottom: 20px;">
            Consells per detectar phishing
        </h2>
        <ul style="text-align: left; max-width: 600px; font-size: 18px; color: black; background-color: white; padding: 20px; border-radius: 10px;">
            <li>Fixat en l’adreça de correu del remitent (pot semblar legítima però tenir errors).</li>
            <li>Mira si l’assumpte genera urgència o amenaça.</li>
            <li>Enllaços que no tenen sentit o que porten a llocs desconeguts.</li>
            <li>Texts amb faltes d’ortografia o errors gramaticals.</li>
            <li>Missatges que et demanen informació personal o contrasenyes.</li>
        </ul>
        <button onclick="showPhishingEmail(${levelId})" style="margin-top: 30px; padding: 10px 20px; font-size: 18px; font-weight: bold; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease;">
            Continuar
        </button>
    `;

    document.body.innerHTML = ""; 
    document.body.appendChild(alertScreen);
}

function showPhishingEmail(levelId) {
    const level = levels.find((l) => l.id === levelId);

    if (level) {
        const emailScreen = document.createElement("div");
        emailScreen.id = "emailScreen";
        emailScreen.innerHTML = `
            <div class="email-container" style="color: black;">
                ${level.emailContent}
                <button onclick="validateSelections(${levelId})" style="margin-top:10px; padding:8px 16px;">Validar Seleccions</button>
            </div>
        `;
        document.body.innerHTML = "";
        document.body.appendChild(emailScreen);

        const container = emailScreen.querySelector(".email-container");
        container.addEventListener("click", (event) => {
            if (event.target !== container) {
                event.target.classList.toggle("marked-suspicious");
            }
        });
    } else {
        alert("No hi ha més nivells disponibles.");
    }
}

function validateSelections(levelId) {
    const correctElements = document.querySelectorAll('[data-suspicious="true"]');
    const markedElements = document.querySelectorAll(".marked-suspicious");

    let correct = 0;
    let incorrect = 0;

    markedElements.forEach((el) => {
        if (el.hasAttribute("data-suspicious")) {
            correct++;
        } else {
            incorrect++;
        }
    });

    const missing = correctElements.length - correct;

    let score = parseInt(localStorage.getItem("score")) || 0;
    let lives = parseInt(localStorage.getItem("lives")) || 3;

    score += (correct * 10);
    score -= (missing * 5);

    lives -= incorrect;

    if (score < 0) score = 0;
    if (lives < 0) lives = 0;

    localStorage.setItem("score", score);
    localStorage.setItem("lives", lives);

    alert(`Resultats:\n- Correctes: ${correct}\n- Incorrectes (perd una vida): ${incorrect}\n- Falten per marcar (resta 5 punts cadascun): ${missing}\n\nPuntuació actual: ${score}\nVides restants: ${lives}`);

    if (lives === 0) {
        alert("Has perdut totes les vides. Joc acabat!");
        resetGame();
        return;
    }

    if (correct === correctElements.length && incorrect === 0) {
        alert(`Molt bé! Has completat el nivell ${levelId}.`);
        const nextLevel = levelId + 1;
        localStorage.setItem("lastLevel", nextLevel);
        showLevelScreen(nextLevel);
    } else {
        alert("Intenta-ho de nou!");
        showPhishingEmail(levelId);
    }
}

function resetGame() {
    localStorage.clear();
    alert("Partida esborrada. Començant un nou joc.");
    location.reload();
}

function continueGame() {
    const nickname = localStorage.getItem("nickname");
    if (nickname) {
        const score = parseInt(localStorage.getItem("score")) || 0;
        const lives = parseInt(localStorage.getItem("lives")) || 3;
        const lastLevel = parseInt(localStorage.getItem("lastLevel")) || 1; // Recuperem l'últim nivell jugat

        alert(`Continuant partida de ${nickname}.\nPuntuació: ${score}\nVides: ${lives}\nÚltim nivell jugat: ${lastLevel}`);
        showLevelScreen(lastLevel); // Comença des de l'últim nivell jugat
    } else {
        alert("No hi ha cap partida per continuar. Comença una nova.");
        startNewGame();
    }
}

function viewPlayerHistory() {
    alert("Historial de jugadors no implementat encara.");
}
