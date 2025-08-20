// Sneaker data: temporary test SVG with 5 sections
const sneakers = [
    {
        name: 'WaterMelon',
        svg: `<svg width="200" height="200" viewBox="0 0 200 200">
            <rect id="section1" x="10" y="10" width="60" height="60" stroke="#333" fill="#fff"/>
            <rect id="section2" x="80" y="10" width="60" height="60" stroke="#333" fill="#fff"/>
            <rect id="section3" x="10" y="80" width="60" height="60" stroke="#333" fill="#fff"/>
            <rect id="section4" x="80" y="80" width="60" height="60" stroke="#333" fill="#fff"/>
            <rect id="section5" x="45" y="145" width="60" height="40" stroke="#333" fill="#fff"/>
        </svg>`,
        colors: {
            section1: '#FF3B3F',
            section2: '#FF9966',
            section3: '#FFFFFF',
            section4: '#66CC66',
            section5: '#FFCC33'
        }
    }
];

let currentSneaker = 0;
let currentColor = null;
let freeMode = false;
let userColors = {};

const svgContainer = document.getElementById('sneaker-display');
const palette = document.getElementById('palette');
const colorwayName = document.getElementById('colorway-name');
const progressEl = document.getElementById('progress');
const messageEl = document.getElementById('message');

// Load sneaker SVG and setup sections
function loadSneaker(index) {
    const sneaker = sneakers[index];
    colorwayName.textContent = sneaker.name;
    userColors = {};
    progressEl.textContent = `0/${Object.keys(sneaker.colors).length}`;
    messageEl.textContent = '';

    // Insert temporary SVG
    svgContainer.innerHTML = sneaker.svg;

    Object.keys(sneaker.colors).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (!section) return;
        section.style.cursor = 'pointer';
        section.addEventListener('click', () => {
            if (!currentColor) return;
            section.style.fill = currentColor;
            if (!freeMode) {
                userColors[sectionId] = currentColor;
                checkProgress();
            }
        });
    });

    // Setup palette
    palette.innerHTML = '';
    Object.values(sneaker.colors).forEach(color => {
        const btn = document.createElement('button');
        btn.style.backgroundColor = color;
        btn.addEventListener('click', () => {
            currentColor = color;
        });
        palette.appendChild(btn);
    });
}

// Check progress
function checkProgress() {
    const sneaker = sneakers[currentSneaker];
    const total = Object.keys(sneaker.colors).length;
    let correct = 0;
    Object.entries(sneaker.colors).forEach(([sectionId, color]) => {
        if (userColors[sectionId] === color) correct++;
    });
    progressEl.textContent = `${correct}/${total}`;
    if (correct === total) {
        messageEl.textContent = 'Great Job!';
        setTimeout(() => {
            messageEl.textContent = '';
        }, 1500);
    }
}

// Event listeners
document.getElementById('restart').addEventListener('click', () => loadSneaker(currentSneaker));
document.getElementById('free-mode').addEventListener('click', () => {
    freeMode = !freeMode;
    messageEl.textContent = freeMode ? 'Free Mode ON' : '';
});

// Initial load
loadSneaker(currentSneaker);
