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

// Otwieranie głównego okna
function openPortalWindow() {
    myWindow.style.display = 'flex';
    startMenu.style.display = 'none';
}

if (openWindowBtn) openWindowBtn.addEventListener('click', openPortalWindow);
if (openSzpoinkowanieBtn) openSzpoinkowanieBtn.addEventListener('click', openPortalWindow);
if (openFromStart) openFromStart.addEventListener('click', openPortalWindow);

if (trashBtn) {
    trashBtn.addEventListener('click', () => { alert("Kosz jest pusty."); });
}

if (closeWindowBtn) {
    closeWindowBtn.addEventListener('click', () => { myWindow.style.display = 'none'; });
}

// Menu Start
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

// ====================================================
// LOGIKA WIDGETU WMP (WINDOWS MEDIA PLAYER & YOUTUBE API)
// ====================================================
const wmpWidget = document.getElementById('wmpWidget');
const musicAppBtn = document.getElementById('musicAppBtn');
const musicFolderBtn = document.getElementById('musicFolderBtn');
const closeWmpBtn = document.getElementById('closeWmpBtn');

const wmpPlayBtn = document.getElementById('wmpPlayBtn');
const wmpStopBtn = document.getElementById('wmpStopBtn');
const wmpPrevBtn = document.getElementById('wmpPrevBtn');
const wmpNextBtn = document.getElementById('wmpNextBtn');

const wmpTitle = document.getElementById('wmpTitle');
const wmpArtist = document.getElementById('wmpArtist');
const wmpProgress = document.getElementById('wmpProgress');
const wmpVolume = document.getElementById('wmpVolume');

let ytPlayer;
let isPlaying = false;
let updateTimer;

// Inicjalizacja Odtwarzacza YouTube IFrame
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        playerVars: {
            'listType': 'playlist',
            'list': 'PLA6GejD7yDqk',
            'autoplay': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    wmpTitle.textContent = "Gotowy do odtwarzania";
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        wmpPlayBtn.textContent = "⏸";
        updateTrackInfo();
        startProgressLoop();
    } else {
        isPlaying = false;
        wmpPlayBtn.textContent = "▶";
        clearInterval(updateTimer);
    }
}

function updateTrackInfo() {
    if (ytPlayer && ytPlayer.getVideoData) {
        const data = ytPlayer.getVideoData();
        wmpTitle.textContent = data.title || "Nieznany utwór";
        wmpArtist.textContent = data.author || "Szpoinkowanie Radio";
    }
}

function startProgressLoop() {
    clearInterval(updateTimer);
    updateTimer = setInterval(() => {
        if (ytPlayer && ytPlayer.getCurrentTime && ytPlayer.getDuration) {
            const currentTime = ytPlayer.getCurrentTime();
            const duration = ytPlayer.getDuration();
            if (duration > 0) {
                wmpProgress.value = (currentTime / duration) * 100;
            }
        }
    }, 1000);
}

// Obsługa przycisków
function openWmp() {
    wmpWidget.style.display = 'flex';
    if (ytPlayer && !isPlaying) {
        ytPlayer.playVideo();
    }
}

if (musicAppBtn) musicAppBtn.addEventListener('click', openWmp);
if (musicFolderBtn) musicFolderBtn.addEventListener('click', openWmp);

if (closeWmpBtn) {
    closeWmpBtn.addEventListener('click', () => {
        wmpWidget.style.display = 'none';
        if (ytPlayer) ytPlayer.pauseVideo();
    });
}

if (wmpPlayBtn) {
    wmpPlayBtn.addEventListener('click', () => {
        if (isPlaying) {
            ytPlayer.pauseVideo();
        } else {
            ytPlayer.playVideo();
        }
    });
}

if (wmpStopBtn) {
    wmpStopBtn.addEventListener('click', () => {
        if (ytPlayer) {
            ytPlayer.stopVideo();
            wmpProgress.value = 0;
            wmpTitle.textContent = "Zatrzymano";
        }
    });
}

if (wmpNextBtn) {
    wmpNextBtn.addEventListener('click', () => {
        if (ytPlayer) ytPlayer.nextVideo();
    });
}

if (wmpPrevBtn) {
    wmpPrevBtn.addEventListener('click', () => {
        if (ytPlayer) ytPlayer.previousVideo();
    });
}

// Suwak głośności
if (wmpVolume) {
    wmpVolume.addEventListener('input', (e) => {
        if (ytPlayer) {
            ytPlayer.setVolume(e.target.value);
        }
    });
}

// Przewijanie utworów suwakiem
if (wmpProgress) {
    wmpProgress.addEventListener('input', (e) => {
        if (ytPlayer && ytPlayer.getDuration) {
            const duration = ytPlayer.getDuration();
            const seekTo = (e.target.value / 100) * duration;
            ytPlayer.seekTo(seekTo, true);
        }
    });
}

// Zegar systemowy
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (clockEl) clockEl.textContent = timeString;
}

updateClock();
setInterval(updateClock, 1000);
