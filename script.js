// Sélecteurs d'éléments
const timerDisplay = document.getElementById('timer-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workBtn = document.getElementById('work-btn');
const breakBtn = document.getElementById('break-btn');
const body = document.body;

// Configurations du temps (en secondes)
const WORK_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

let timeRemaining = WORK_TIME;
let isRunning = false;
let isWorkMode = true;
let intervalId;

// --- Fonctions d'affichage et de contrôle ---

/**
 * Met à jour l'affichage du minuteur.
 * @param {number} time - Le temps restant en secondes.
 */
function updateDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - Pomodoro`;
}

/**
 * Démarre ou met en pause le minuteur.
 */
function startPauseTimer() {
    if (isRunning) {
        // Mettre en pause
        clearInterval(intervalId);
        startPauseBtn.textContent = 'Reprendre';
        isRunning = false;
    } else {
        // Démarrer
        startPauseBtn.textContent = 'Pause';
        isRunning = true;
        
        intervalId = setInterval(() => {
            timeRemaining--;
            updateDisplay(timeRemaining);

            if (timeRemaining <= 0) {
                clearInterval(intervalId);
                handleTimerEnd();
            }
        }, 1000); // Exécuté toutes les secondes
    }
}

/**
 * Gère la fin d'une session (Travail ou Pause).
 */
function handleTimerEnd() {
    isRunning = false;
    startPauseBtn.textContent = 'Démarrer';
    
    // Jouer une notification sonore (simple alerte pour l'exemple)
    alert(isWorkMode ? "C'est la pause !" : "C'est l'heure de travailler !");

    // Basculer automatiquement vers l'autre mode
    isWorkMode = !isWorkMode;
    switchMode(isWorkMode ? 'work' : 'break');
    startPauseTimer(); // Démarrer le nouveau mode immédiatement
}

/**
 * Réinitialise le minuteur au début du mode actuel.
 */
function resetTimer() {
    clearInterval(intervalId);
    isRunning = false;
    
    timeRemaining = isWorkMode ? WORK_TIME : BREAK_TIME;
    updateDisplay(timeRemaining);
    
    startPauseBtn.textContent = 'Démarrer';
}

/**
 * Bascule entre le mode Travail et le mode Pause.
 * @param {string} mode - 'work' ou 'break'.
 */
function switchMode(mode) {
    isWorkMode = (mode === 'work');
    
    // Mise à jour de l'état
    resetTimer(); // Réinitialise l'affichage et l'intervalle
    
    // Mise à jour des boutons actifs et du style du corps
    workBtn.classList.remove('active');
    breakBtn.classList.remove('active');
    
    if (isWorkMode) {
        workBtn.classList.add('active');
        body.classList.remove('break-time');
    } else {
        breakBtn.classList.add('active');
        body.classList.add('break-time');
    }
}

// --- Événements ---
startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', resetTimer);
workBtn.addEventListener('click', () => switchMode('work'));
breakBtn.addEventListener('click', () => switchMode('break'));

// Initialisation au chargement de la page
updateDisplay(WORK_TIME);
