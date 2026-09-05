// --- LOGIKA PULPITU I OKIEN ---
const openWindowBtn = document.getElementById('openWindowBtn');
const openSzpoinkowanieBtn = document.getElementById('openSzpoinkowanieBtn');
const trashBtn = document.getElementById('trashBtn');

const closeWindowBtn = document.getElementById('closeWindowBtn');
const myWindow = document.getElementById('myWindow');

const startBtn = document.getElementById('startBtn');
const startMenu = document.getElementById('startMenu');
const openFromStart = document.getElementById('openFromStart');

const clockEl = document.getElementById('taskbar-clock');

// Elementy nawigacji w oknie
const windowBody = document.getElementById('windowBody');
const windowTitle = document.getElementById('windowTitle');
const addressPath = document.getElementById('addressPath');
const backBtn = document.getElementById('backBtn');
const musicFolderBtn = document.getElementById('musicFolderBtn');

// 1. Otwieranie głównego okna
function openPortalWindow() {
    myWindow.style.display = 'flex';
    startMenu.style.display = 'none';
    showRootFolder();
}

if (openWindowBtn) openWindowBtn.addEventListener('click', openPortalWindow);
if (openSzpoinkowanieBtn) openSzpoinkowanieBtn.addEventListener('click', openPortalWindow);
if (openFromStart) openFromStart.addEventListener('click', openPortalWindow);

if (trashBtn) {
    trashBtn.addEventListener('click', () => {
        alert("Kosz jest pusty.");
    });
}

// 2. Zamykanie okna
if (closeWindowBtn) {
    closeWindowBtn.addEventListener('click', () => {
        myWindow.style.display = 'none';
    });
}

// 3. Obsługa menu Start
if (startBtn && startMenu) {
    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startMenu.style.display = (startMenu.style.display === 'flex') ? 'none' : 'flex';
    });

    document.addEventListener('click', (e) => {
        if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
            startMenu.style.display = 'none';
        }
    });
}

// --- SYSTEM NAWIGACJI W EKSPLORATORZE ---

// Widok folderu głównego (Szpoinkowanie)
function showRootFolder() {
    windowTitle.innerHTML = "📁 Szpoinkowanie - Folder Główny";
    addressPath.textContent = "Mój Komputer > Szpoinkowanie";
    if (backBtn) backBtn.style.display = "none";

    windowBody.innerHTML = `
        <div class="folder-item" onclick="alert('Otwieranie folderu Felietony...')">
            <img src="szpoinkowanie-icon.png" alt="Felietony" class="folder-img">
            <span>1) Felietony</span>
        </div>
        <div class="folder-item" onclick="alert('Otwieranie folderu Publikacje...')">
            <img src="szpoinkowanie-icon.png" alt="Publikacje" class="folder-img">
            <span>2) Publikacje</span>
        </div>
        <div class="folder-item" onclick="alert('Otwieranie sekcji Gry...')">
            <img src="gry.png" alt="Gry" class="folder-img">
            <span>3) Gry</span>
        </div>
        <div class="folder-item" id="musicFolderBtn">
            <img src="muzyka.png" alt="Muzyka" class="folder-img">
            <span>4) Muzyka</span>
        </div>
    `;

    // Ponowne przypisanie zdarzenia do dynamicznie wygenerowanego folderu muzyki
    const newMusicBtn = document.getElementById('musicFolderBtn');
    if (newMusicBtn) {
        newMusicBtn.addEventListener('click', showMusicFolder);
    }
}

// Widok podfolderu Muzyka z plikiem Ripsquad - 2007
function showMusicFolder() {
    windowTitle.innerHTML = "📁 Szpoinkowanie - Muzyka";
    addressPath.textContent = "Mój Komputer > Szpoinkowanie > Muzyka";
    if (backBtn) backBtn.style.display = "inline-block";

    windowBody.innerHTML = `
        <a href="https://www.youtube.com/watch?v=1IrByTEiuYk&list=RD1IrByTEiuYk&start_radio=1" target="_blank" class="folder-item">
            <img src="muzyka.png" alt="Ripsquad - 2007" class="folder-img">
            <span>Ripsquad - 2007</span>
        </a>
    `;
}

if (musicFolderBtn) {
    musicFolderBtn.addEventListener('click', showMusicFolder);
}

if (backBtn) {
    backBtn.addEventListener('click', showRootFolder);
}

// 4. DZIAŁAJĄCY ZEGAR SYSTEMOWY
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (clockEl) {
        clockEl.textContent = timeString;
    }
}

updateClock();
setInterval(updateClock, 1000);
