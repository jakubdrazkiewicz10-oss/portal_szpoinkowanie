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

// Link do playlisty YouTube
const playlistUrl = "https://youtube.com/playlist?list=PLA6GejD7yDqk&si=otPsOsl8nXZw2jzt";

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

    const newMusicBtn = document.getElementById('musicFolderBtn');
    if (newMusicBtn) {
        newMusicBtn.addEventListener('click', showMusicPlayer);
    }
}

// Widok Odtwarzacza Muzycznego z playlistą
function showMusicPlayer() {
    windowTitle.innerHTML = "🎵 Szpoinkowanie - Odtwarzacz Muzyczny";
    addressPath.textContent = "Mój Komputer > Szpoinkowanie > Muzyka";
    if (backBtn) {
        backBtn.style.display = "inline-block";
    }

    windowBody.innerHTML = `
        <div style="width: 100%; display: flex; flex-direction: column; gap: 15px; padding: 10px;">
            <div style="background: #e6e6e6; padding: 10px; border-radius: 5px; border: 1px solid #ccc;">
                <h3 style="margin: 0 0 5px 0; font-size: 14px;">🎛️ Vista Media Player (Playlista Redakcyjna)</h3>
                <p style="margin: 0; font-size: 12px; color: #555;">Kliknij utwór, aby otworzyć playlistę:</p>
            </div>

            <a href="${playlistUrl}" target="_blank" class="folder-item" style="width: 100px;">
                <img src="muzyka.png" alt="Ripsquad - 2007" class="folder-img">
                <span>Ripsquad - 2007</span>
            </a>

            <a href="${playlistUrl}" target="_blank" class="folder-item" style="width: 100px;">
                <img src="muzyka.png" alt="hewra - waza" class="folder-img">
                <span>hewra - waza</span>
            </a>
        </div>
    `;
}

if (musicFolderBtn) {
    musicFolderBtn.addEventListener('click', showMusicPlayer);
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
