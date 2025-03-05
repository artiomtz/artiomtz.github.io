// JS file - Artiom Tsimkin

const url = document.URL;
const titleText1 = 'Welcome :)';
const titleText2 = 'Artiom Tsimkin';
const typeSpeed1 = 150;
const typeSpeed2 = 50;
let typeCount = 0;

// Wait for page to load
window.onload = function () {
    checkBrowser();
    setBackgroundAnimation();
    initMap();
    setTimeout(typeWelcome, 3000);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
};

// Clean URL after hash change
window.addEventListener('hashchange', () => {
    history.replaceState(null, null, url);
});

// Check browser
function checkBrowser() {
    const ua = navigator.userAgent;
    const isChromium = !!window.chrome;
    const isOpera = typeof window.opr !== 'undefined';
    const isIEedge = ua.includes('Edge');
    const isIOSChrome = /CriOS/.test(ua);

    if (!(isIOSChrome || (isChromium && !isOpera && !isIEedge))) {
        alert('Please use a different browser');
    }
}

// Background animation
function setBackgroundAnimation() {
    document.querySelectorAll('path').forEach((pathEl) => {
        const offset = anime.setDashoffset(pathEl);
        pathEl.setAttribute('stroke-dashoffset', offset);
        anime({
            targets: pathEl,
            strokeDashoffset: [offset, 0],
            duration: anime.random(2000, 4000),
            delay: anime.random(1000, 5000),
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });
    });
}

// Scroll progress bar
window.onscroll = function () {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 90;
    document.getElementById('myBar').style.width = `${scrolled}%`;
};

// Set copy button
function copyText(selector) {
    const element = document.querySelector(selector);
    if (element) {
        navigator.clipboard
            .writeText(element.textContent.trim())
            .then(() => {
                alert('Copied :)');
            })
            .catch(() => console.error('Error copying text'));
    } else {
        console.error('Copy button not found');
    }
}

// Initialize Mapbox
function initMap() {
    const part1 = 'cGs' + 'uZX' + 'lKMUlq';
    const part2 = 'b2lZWEowY' + 'Vc5dGRIb' + '2lMQ0po';
    const part3 = 'SWpvaVkyeHB' + 'OVGR0' + 'yvrv'.toUpperCase();
    const part4 = ['d01HSnpjak5s', 'Y0dnMVoySjNaakk0', 'Y3lKOS'].join('');
    const part5 = ['5FaDE5NXE2TG9U', 'dTZLc1', 'poZ3I4cHNn'].join('');
    const encodedValue = part1 + part2 + part3 + part4 + part5;

    mapboxgl.accessToken = atob(encodedValue);
    const map = new mapboxgl.Map({
        container: 'map',
        zoom: 13,
        center: [-80.541, 43.468],
        style: 'mapbox://styles/mapbox/streets-v9',
    });
    map.addControl(new mapboxgl.NavigationControl());
}

// Type Welcome animation
function typeWelcome() {
    if (typeCount < titleText1.length) {
        setTimeout(typeWelcome, typeSpeed1);
        document.getElementById('top').textContent += titleText1.charAt(typeCount);
        typeCount++;
    } else {
        setTimeout(eraseWelcome, 2000);
    }
}

// Erase Welcome animation
function eraseWelcome() {
    if (typeCount > 0) {
        setTimeout(eraseWelcome, typeSpeed2);
        document.getElementById('top').textContent = titleText1.substring(0, typeCount - 1);
        typeCount--;
    } else {
        setTimeout(typeName, 1000);
    }
}

// Type name animation
function typeName() {
    if (typeCount < titleText2.length) {
        setTimeout(typeName, typeSpeed1);
        document.getElementById('top').textContent += titleText2.charAt(typeCount);
        typeCount++;
    }
}
