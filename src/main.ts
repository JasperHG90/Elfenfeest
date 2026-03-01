import './style.css';

const MAGIC_CODE = 'ELFENFEEST';
const SESSION_KEY = 'elfenfeest-unlocked';

// DOM elements
const gateScreen = document.getElementById('gate-screen')!;
const gate = document.getElementById('gate')!;
const codeInput = document.getElementById('magic-code') as HTMLInputElement;
const codeError = document.getElementById('code-error')!;
const invitation = document.getElementById('invitation')!;
const burstContainer = document.getElementById('burst-sparkles')!;
const scrollHint = document.getElementById('scroll-hint')!;

// ===== STAR GENERATOR (shared background) =====
function createStars() {
  const container = document.getElementById('shared-bg-stars')!;
  const count = 60 + Math.floor(Math.random() * 40);

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = 1 + Math.random() * 3;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 50}%`;
    star.style.animationDuration = `${2 + Math.random() * 4}s`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    container.appendChild(star);
  }
}

// ===== GLOWING FLOWERS =====
function createGlowFlowers() {
  const container = document.getElementById('glow-flowers')!;
  const colors = ['#c77dff', '#52b788', '#fde68a', '#f48fb1', '#80cbc4'];
  const count = 20 + Math.floor(Math.random() * 15);

  for (let i = 0; i < count; i++) {
    const flower = document.createElement('div');
    flower.className = 'glow-flower';
    const size = 3 + Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;
    flower.style.left = `${5 + Math.random() * 90}%`;
    flower.style.bottom = `${Math.random() * 60}%`;
    flower.style.background = color;
    flower.style.boxShadow = `0 0 ${size * 2}px ${size}px ${color}40`;
    flower.style.animationDuration = `${2 + Math.random() * 3}s`;
    flower.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(flower);
  }
}

// ===== SPARKLE GENERATOR =====
function createSparkles() {
  const container = document.getElementById('sparkles')!;
  const count = 15 + Math.floor(Math.random() * 10);

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.bottom = `${Math.random() * 20}%`;
    sparkle.style.animationDuration = `${3 + Math.random() * 5}s`;
    sparkle.style.animationDelay = `${Math.random() * 5}s`;
    sparkle.style.width = sparkle.style.height = `${2 + Math.random() * 4}px`;
    container.appendChild(sparkle);
  }
}

// ===== FIREFLY GENERATOR =====
function createFireflies() {
  const container = document.getElementById('fireflies')!;
  const count = 6 + Math.floor(Math.random() * 4);

  for (let i = 0; i < count; i++) {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefly.style.left = `${10 + Math.random() * 80}%`;
    firefly.style.top = `${10 + Math.random() * 70}%`;
    firefly.style.animationDuration = `${4 + Math.random() * 4}s, ${2 + Math.random() * 3}s`;
    firefly.style.animationDelay = `${Math.random() * 4}s, ${Math.random() * 2}s`;
    container.appendChild(firefly);
  }
}

// ===== GATE FAIRY SPRITES (Tinkerbell style) =====
function createGateElfSvg(hue: number, pose: 'wave' | 'beckon' | 'point'): string {
  const skinTone = '#fde0b0';
  const dressColor = `hsl(${hue}, 55%, 45%)`;
  const dressHighlight = `hsl(${hue}, 60%, 60%)`;
  const wingColor = `hsl(${hue + 60}, 70%, 80%)`;
  const wingEdge = `hsl(${hue + 60}, 50%, 65%)`;
  const hairColor = `hsl(${hue + 30}, 40%, 30%)`;

  // Different arm positions for each pose
  let arms = '';
  if (pose === 'wave') {
    arms = `<line x1="15" y1="27" x2="6" y2="17" stroke="${skinTone}" stroke-width="2" stroke-linecap="round"/>
            <circle cx="5" cy="16" r="1.5" fill="${skinTone}"/>
            <line x1="25" y1="27" x2="30" y2="33" stroke="${skinTone}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (pose === 'beckon') {
    arms = `<line x1="15" y1="27" x2="7" y2="21" stroke="${skinTone}" stroke-width="2" stroke-linecap="round"/>
            <circle cx="6" cy="20" r="1.5" fill="${skinTone}"/>
            <line x1="25" y1="27" x2="33" y2="21" stroke="${skinTone}" stroke-width="2" stroke-linecap="round"/>
            <circle cx="34" cy="20" r="1.5" fill="${skinTone}"/>`;
  } else {
    arms = `<line x1="15" y1="27" x2="9" y2="34" stroke="${skinTone}" stroke-width="2" stroke-linecap="round"/>
            <line x1="25" y1="27" x2="33" y2="37" stroke="${skinTone}" stroke-width="2" stroke-linecap="round"/>
            <circle cx="34" cy="37" r="1.5" fill="${skinTone}"/>`;
  }

  return `<svg width="60" height="60" viewBox="0 0 40 52" xmlns="http://www.w3.org/2000/svg">
    <!-- Pixie dust glow -->
    <circle cx="20" cy="26" r="24" fill="hsl(${hue}, 60%, 70%)" opacity="0.08"/>
    <circle cx="20" cy="26" r="16" fill="#f4c542" opacity="0.06"/>
    <!-- Butterfly wings (upper pair) -->
    <path d="M18,22 Q4,8 8,20 Q6,28 18,26 Z" fill="${wingColor}" opacity="0.55" stroke="${wingEdge}" stroke-width="0.4"/>
    <path d="M22,22 Q36,8 32,20 Q34,28 22,26 Z" fill="${wingColor}" opacity="0.55" stroke="${wingEdge}" stroke-width="0.4"/>
    <!-- Wing veins (upper) -->
    <path d="M17,23 Q10,14 9,20" fill="none" stroke="${wingEdge}" stroke-width="0.3" opacity="0.5"/>
    <path d="M23,23 Q30,14 31,20" fill="none" stroke="${wingEdge}" stroke-width="0.3" opacity="0.5"/>
    <!-- Butterfly wings (lower pair, smaller) -->
    <path d="M18,26 Q6,30 10,28 Q8,35 18,30 Z" fill="${wingColor}" opacity="0.4" stroke="${wingEdge}" stroke-width="0.3"/>
    <path d="M22,26 Q34,30 30,28 Q32,35 22,30 Z" fill="${wingColor}" opacity="0.4" stroke="${wingEdge}" stroke-width="0.3"/>
    <!-- Slender body/torso -->
    <ellipse cx="20" cy="28" rx="3" ry="5" fill="${skinTone}"/>
    <!-- Leaf dress -->
    <path d="M15,27 Q14,34 16,38 Q20,40 24,38 Q26,34 25,27 Q22,30 20,31 Q18,30 15,27 Z" fill="${dressColor}"/>
    <path d="M16,29 Q20,33 24,29" fill="none" stroke="${dressHighlight}" stroke-width="0.5" opacity="0.6"/>
    <path d="M15.5,32 Q20,36 24.5,32" fill="none" stroke="${dressHighlight}" stroke-width="0.4" opacity="0.4"/>
    <!-- Leaf dress petal tips -->
    <path d="M16,38 Q14,41 16,40" fill="${dressColor}"/>
    <path d="M24,38 Q26,41 24,40" fill="${dressColor}"/>
    <!-- Arms -->
    ${arms}
    <!-- Legs (trailing behind in flight) -->
    <line x1="18" y1="37" x2="16" y2="45" stroke="${skinTone}" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="22" y1="37" x2="24" y2="45" stroke="${skinTone}" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Tiny shoes -->
    <circle cx="15.5" cy="45.5" r="1.2" fill="${dressColor}"/>
    <circle cx="24.5" cy="45.5" r="1.2" fill="${dressColor}"/>
    <!-- Head -->
    <circle cx="20" cy="19" r="6" fill="${skinTone}"/>
    <!-- Hair bun (Tinkerbell style) -->
    <circle cx="20" cy="13.5" r="4" fill="${hairColor}"/>
    <ellipse cx="20" cy="11" rx="2.5" ry="2" fill="${hairColor}"/>
    <!-- Side hair wisps -->
    <path d="M14,18 Q12,15 14,14" fill="none" stroke="${hairColor}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M26,18 Q28,15 26,14" fill="none" stroke="${hairColor}" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Eyes -->
    <ellipse cx="17.5" cy="19" rx="1.3" ry="1.5" fill="#2c5f3a"/>
    <ellipse cx="22.5" cy="19" rx="1.3" ry="1.5" fill="#2c5f3a"/>
    <circle cx="17.8" cy="18.5" r="0.5" fill="#fff"/>
    <circle cx="22.8" cy="18.5" r="0.5" fill="#fff"/>
    <!-- Eyelashes -->
    <line x1="15.8" y1="17.8" x2="15" y2="17" stroke="#333" stroke-width="0.4"/>
    <line x1="24.2" y1="17.8" x2="25" y2="17" stroke="#333" stroke-width="0.4"/>
    <!-- Smile -->
    <path d="M18,21.5 Q20,23.5 22,21.5" fill="none" stroke="#c07060" stroke-width="0.7" stroke-linecap="round"/>
    <!-- Blush -->
    <ellipse cx="16" cy="21" rx="1.5" ry="0.8" fill="#f4a0a0" opacity="0.3"/>
    <ellipse cx="24" cy="21" rx="1.5" ry="0.8" fill="#f4a0a0" opacity="0.3"/>
    <!-- Pixie dust sparkles -->
    <circle cx="8" cy="14" r="0.8" fill="#f4c542" opacity="0.7"/>
    <circle cx="33" cy="16" r="0.6" fill="#f4c542" opacity="0.6"/>
    <circle cx="6" cy="24" r="0.5" fill="#fde68a" opacity="0.5"/>
    <circle cx="35" cy="22" r="0.7" fill="#fde68a" opacity="0.6"/>
  </svg>`;
}

function createGateElves() {
  const leftSprite = document.querySelector('.gate-elf__sprite--wave')!;
  const rightSprite = document.querySelector('.gate-elf__sprite--beckon')!;
  const centerSprite = document.querySelector('.gate-elf__sprite--point')!;

  leftSprite.innerHTML = createGateElfSvg(280, 'wave');
  rightSprite.innerHTML = createGateElfSvg(140, 'beckon');
  centerSprite.innerHTML = createGateElfSvg(40, 'point');
}

// ===== FLYING FAIRY SVG (Tinkerbell/Disney style) =====
function createElfSvg(size: number, hue: number): string {
  const skinTone = '#fde0b0';
  const dressColor = `hsl(${hue}, 55%, 45%)`;
  const dressHighlight = `hsl(${hue}, 60%, 60%)`;
  const wingColor = `hsl(${hue + 60}, 70%, 80%)`;
  const wingEdge = `hsl(${hue + 60}, 50%, 65%)`;
  const hairColor = `hsl(${hue + 30}, 40%, 30%)`;

  return `<svg width="${size}" height="${size}" viewBox="0 0 40 44" xmlns="http://www.w3.org/2000/svg">
    <!-- Pixie dust glow -->
    <circle cx="20" cy="22" r="20" fill="hsl(${hue}, 60%, 70%)" opacity="0.1"/>
    <circle cx="20" cy="22" r="12" fill="#f4c542" opacity="0.06"/>
    <!-- Butterfly wings (upper pair) -->
    <path d="M18,18 Q3,4 7,16 Q4,24 18,22 Z" fill="${wingColor}" opacity="0.5" stroke="${wingEdge}" stroke-width="0.4"/>
    <path d="M22,18 Q37,4 33,16 Q36,24 22,22 Z" fill="${wingColor}" opacity="0.5" stroke="${wingEdge}" stroke-width="0.4"/>
    <!-- Wing veins -->
    <path d="M17,19 Q9,10 8,16" fill="none" stroke="${wingEdge}" stroke-width="0.3" opacity="0.45"/>
    <path d="M16,21 Q10,18 7,20" fill="none" stroke="${wingEdge}" stroke-width="0.2" opacity="0.3"/>
    <path d="M23,19 Q31,10 32,16" fill="none" stroke="${wingEdge}" stroke-width="0.3" opacity="0.45"/>
    <path d="M24,21 Q30,18 33,20" fill="none" stroke="${wingEdge}" stroke-width="0.2" opacity="0.3"/>
    <!-- Lower wings (smaller) -->
    <path d="M18,22 Q6,26 9,24 Q7,31 18,26 Z" fill="${wingColor}" opacity="0.35" stroke="${wingEdge}" stroke-width="0.3"/>
    <path d="M22,22 Q34,26 31,24 Q33,31 22,26 Z" fill="${wingColor}" opacity="0.35" stroke="${wingEdge}" stroke-width="0.3"/>
    <!-- Slender torso -->
    <ellipse cx="20" cy="24" rx="2.5" ry="4" fill="${skinTone}"/>
    <!-- Leaf dress -->
    <path d="M16,23 Q15,29 17,33 Q20,35 23,33 Q25,29 24,23 Q22,26 20,27 Q18,26 16,23 Z" fill="${dressColor}"/>
    <path d="M16.5,25 Q20,28.5 23.5,25" fill="none" stroke="${dressHighlight}" stroke-width="0.4" opacity="0.5"/>
    <path d="M16,28 Q20,31 24,28" fill="none" stroke="${dressHighlight}" stroke-width="0.3" opacity="0.35"/>
    <!-- Leaf petal tips on dress -->
    <path d="M17,33 Q15,35.5 17,35" fill="${dressColor}"/>
    <path d="M23,33 Q25,35.5 23,35" fill="${dressColor}"/>
    <!-- Arms (extended in flight) -->
    <line x1="16" y1="23" x2="10" y2="19" stroke="${skinTone}" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="24" y1="23" x2="30" y2="19" stroke="${skinTone}" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Trailing legs -->
    <line x1="18.5" y1="32" x2="17" y2="39" stroke="${skinTone}" stroke-width="1.3" stroke-linecap="round"/>
    <line x1="21.5" y1="32" x2="23" y2="39" stroke="${skinTone}" stroke-width="1.3" stroke-linecap="round"/>
    <!-- Tiny shoes -->
    <ellipse cx="16.5" cy="39.5" rx="1.2" ry="0.8" fill="${dressColor}"/>
    <ellipse cx="23.5" cy="39.5" rx="1.2" ry="0.8" fill="${dressColor}"/>
    <!-- Head -->
    <circle cx="20" cy="15" r="5.5" fill="${skinTone}"/>
    <!-- Hair bun -->
    <circle cx="20" cy="10" r="3.5" fill="${hairColor}"/>
    <ellipse cx="20" cy="8" rx="2" ry="1.5" fill="${hairColor}"/>
    <!-- Side hair -->
    <path d="M14.5,14 Q13,12 14.5,10.5" fill="none" stroke="${hairColor}" stroke-width="1.3" stroke-linecap="round"/>
    <path d="M25.5,14 Q27,12 25.5,10.5" fill="none" stroke="${hairColor}" stroke-width="1.3" stroke-linecap="round"/>
    <!-- Eyes -->
    <ellipse cx="18" cy="15" rx="1.1" ry="1.3" fill="#2c5f3a"/>
    <ellipse cx="22" cy="15" rx="1.1" ry="1.3" fill="#2c5f3a"/>
    <circle cx="18.3" cy="14.5" r="0.4" fill="#fff"/>
    <circle cx="22.3" cy="14.5" r="0.4" fill="#fff"/>
    <!-- Smile -->
    <path d="M18.5,17.5 Q20,19 21.5,17.5" fill="none" stroke="#c07060" stroke-width="0.6" stroke-linecap="round"/>
    <!-- Pixie dust trail sparkles -->
    <circle cx="15" cy="36" r="0.7" fill="#f4c542" opacity="0.7"/>
    <circle cx="25" cy="38" r="0.5" fill="#fde68a" opacity="0.6"/>
    <circle cx="13" cy="32" r="0.6" fill="#f4c542" opacity="0.5"/>
    <circle cx="28" cy="34" r="0.4" fill="#fde68a" opacity="0.4"/>
  </svg>`;
}

function createFlyingElves() {
  const container = document.getElementById('flying-elves')!;
  const elfCount = 12 + Math.floor(Math.random() * 4);
  const hues = [280, 140, 200, 320, 40, 180, 260, 100, 300, 160, 220, 60, 340, 80, 250, 170];

  for (let i = 0; i < elfCount; i++) {
    const elf = document.createElement('div');
    const reverse = Math.random() > 0.5;
    elf.className = `flying-elf${reverse ? ' flying-elf--reverse' : ''}`;

    // Make elves larger (40-55px) for visibility
    const size = 40 + Math.floor(Math.random() * 16);
    const hue = hues[i % hues.length];
    const duration = 14 + Math.random() * 16;
    const bobDuration = 2 + Math.random() * 2;
    const delay = Math.random() * -duration; // Negative delay = start mid-animation

    // Spread elves across the full viewport height (top portion)
    const yStart = 5 + Math.random() * 55;
    const yMid = yStart + (Math.random() - 0.5) * 25;
    const yEnd = 5 + Math.random() * 55;

    elf.style.setProperty('--elf-y-start', `${yStart}vh`);
    elf.style.setProperty('--elf-y-mid', `${yMid}vh`);
    elf.style.setProperty('--elf-y-end', `${yEnd}vh`);
    elf.style.animationDuration = `${duration}s`;
    elf.style.animationDelay = `${delay}s`;
    // Higher opacity for visibility
    elf.style.opacity = `${0.7 + Math.random() * 0.3}`;

    const inner = document.createElement('div');
    inner.className = 'flying-elf__inner';
    inner.style.animationDuration = `${bobDuration}s`;
    inner.style.animationDelay = `${Math.random() * bobDuration}s`;
    inner.innerHTML = createElfSvg(size, hue);

    elf.appendChild(inner);
    container.appendChild(elf);
  }

  // Add a few hovering elves near the gate area
  const hoverPositions = [
    { x: '20vw', y: '30vh' },
    { x: '75vw', y: '25vh' },
    { x: '15vw', y: '55vh' },
    { x: '80vw', y: '50vh' },
  ];

  hoverPositions.forEach((pos, i) => {
    const elf = document.createElement('div');
    elf.className = 'flying-elf flying-elf--hover';

    const size = 45 + Math.floor(Math.random() * 10);
    const hue = hues[(i + 5) % hues.length];
    const duration = 6 + Math.random() * 4;
    const bobDuration = 2.5 + Math.random() * 1.5;

    elf.style.setProperty('--hover-x', pos.x);
    elf.style.setProperty('--hover-y', pos.y);
    elf.style.animationDuration = `${duration}s`;
    elf.style.animationDelay = `${Math.random() * -duration}s`;
    elf.style.opacity = `${0.75 + Math.random() * 0.25}`;

    const inner = document.createElement('div');
    inner.className = 'flying-elf__inner';
    inner.style.animationDuration = `${bobDuration}s`;
    inner.style.animationDelay = `${Math.random() * bobDuration}s`;
    inner.innerHTML = createElfSvg(size, hue);

    elf.appendChild(inner);
    container.appendChild(elf);
  });

  // Sparkle trails - periodically spawn trail particles at elf positions
  let trailInterval: ReturnType<typeof setInterval> | undefined;
  trailInterval = setInterval(() => {
    // Stop trail generation if gate screen is hidden
    if (gateScreen.classList.contains('hidden')) {
      if (trailInterval !== undefined) {
        clearInterval(trailInterval);
      }
      return;
    }

    const elves = container.querySelectorAll('.flying-elf');
    elves.forEach((elf) => {
      if (Math.random() > 0.35) return; // Only some elves trail each tick
      const rect = elf.getBoundingClientRect();
      if (rect.left < -50 || rect.left > window.innerWidth + 50) return;

      const trail = document.createElement('div');
      trail.className = 'elf-trail';
      trail.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 10}px`;
      trail.style.top = `${rect.top + rect.height / 2 + (Math.random() - 0.5) * 10}px`;
      trail.style.position = 'fixed';

      // Vary trail colors
      const trailColors = ['#fde68a', '#c77dff', '#52b788', '#f4c542'];
      trail.style.background = trailColors[Math.floor(Math.random() * trailColors.length)];
      trail.style.boxShadow = `0 0 6px 2px ${trail.style.background}60`;

      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 1000);
    });
  }, 180);
}

// ===== PIRATE SHIP FAIRY DUST =====
function startShipDust() {
  const dustContainer = document.getElementById('ship-dust');
  if (!dustContainer) return;
  const colors = ['#f4c542', '#fde68a', '#c77dff', '#fff5cc'];

  setInterval(() => {
    // Only generate dust when the ship is visible
    const ship = document.getElementById('pirate-ship');
    if (!ship) return;
    const rect = ship.getBoundingClientRect();
    if (rect.left < -200 || rect.left > window.innerWidth + 200) return;

    for (let i = 0; i < 2; i++) {
      const particle = document.createElement('div');
      particle.className = 'ship-dust-particle';
      const size = 2 + Math.random() * 4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = color;
      particle.style.boxShadow = `0 0 ${size * 2}px ${size}px ${color}50`;
      particle.style.left = `${20 + Math.random() * 60}%`;
      particle.style.bottom = `${Math.random() * 20}%`;
      particle.style.animationDuration = `${0.8 + Math.random() * 0.6}s`;
      dustContainer.appendChild(particle);
      setTimeout(() => particle.remove(), 1500);
    }
  }, 200);
}

// ===== INVITATION BACKGROUND STARS & FLOWERS =====
function createInviteBgFlowers() {
  const container = document.getElementById('invite-bg-flowers');
  if (!container) return;
  const colors = ['#c77dff', '#52b788', '#fde68a', '#f48fb1', '#80cbc4'];
  const count = 15 + Math.floor(Math.random() * 10);
  for (let i = 0; i < count; i++) {
    const flower = document.createElement('div');
    flower.className = 'glow-flower';
    const size = 2 + Math.random() * 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;
    flower.style.left = `${5 + Math.random() * 90}%`;
    flower.style.bottom = `${Math.random() * 60}%`;
    flower.style.background = color;
    flower.style.boxShadow = `0 0 ${size * 2}px ${size}px ${color}40`;
    flower.style.animationDuration = `${2 + Math.random() * 3}s`;
    flower.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(flower);
  }
}

// ===== INVITATION SPARKLES (persistent floating sparkles across invitation) =====
function createInviteSparkles() {
  const container = document.getElementById('invite-sparkles')!;
  const count = 30 + Math.floor(Math.random() * 15);
  const colors = ['#f4c542', '#fde68a', '#c77dff', '#52b788', '#fff5cc', '#f48fb1'];

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'invite-sparkle';
    const size = 2 + Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * -duration;
    const driftX = (Math.random() - 0.5) * 80;
    const driftXEnd = (Math.random() - 0.5) * 60;

    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.background = color;
    sparkle.style.boxShadow = `0 0 ${size * 2}px ${size}px ${color}50`;
    sparkle.style.animationDuration = `${duration}s`;
    sparkle.style.animationDelay = `${delay}s`;
    sparkle.style.setProperty('--drift-x', `${driftX}px`);
    sparkle.style.setProperty('--drift-x-end', `${driftXEnd}px`);

    container.appendChild(sparkle);
  }
}

// ===== INVITATION FLOATING FAIRIES =====
function createInviteFairies() {
  const container = document.getElementById('invite-fairies')!;
  const count = 4 + Math.floor(Math.random() * 3);
  const hues = [120, 280, 200, 320, 40, 160, 260];

  for (let i = 0; i < count; i++) {
    const fairy = document.createElement('div');
    fairy.className = 'invite-fairy';

    const size = 28 + Math.floor(Math.random() * 12);
    const hue = hues[i % hues.length];
    const duration = 15 + Math.random() * 10;
    const bobDuration = 2 + Math.random() * 1.5;

    // Generate 4 waypoints for the fairy's path
    const x1 = 5 + Math.random() * 85;
    const y1 = 10 + Math.random() * 75;
    const x2 = 5 + Math.random() * 85;
    const y2 = 10 + Math.random() * 75;
    const x3 = 5 + Math.random() * 85;
    const y3 = 10 + Math.random() * 75;
    const x4 = 5 + Math.random() * 85;
    const y4 = 10 + Math.random() * 75;

    fairy.style.setProperty('--fairy-x1', `${x1}vw`);
    fairy.style.setProperty('--fairy-y1', `${y1}vh`);
    fairy.style.setProperty('--fairy-x2', `${x2}vw`);
    fairy.style.setProperty('--fairy-y2', `${y2}vh`);
    fairy.style.setProperty('--fairy-x3', `${x3}vw`);
    fairy.style.setProperty('--fairy-y3', `${y3}vh`);
    fairy.style.setProperty('--fairy-x4', `${x4}vw`);
    fairy.style.setProperty('--fairy-y4', `${y4}vh`);
    fairy.style.animationDuration = `${duration}s`;
    fairy.style.animationDelay = `${Math.random() * -duration}s`;
    fairy.style.opacity = `${0.5 + Math.random() * 0.3}`;

    const inner = document.createElement('div');
    inner.className = 'invite-fairy__inner';
    inner.style.animationDuration = `${bobDuration}s`;
    inner.style.animationDelay = `${Math.random() * bobDuration}s`;
    inner.innerHTML = createElfSvg(size, hue);

    fairy.appendChild(inner);
    container.appendChild(fairy);
  }
}

// ===== HERO FAIRY DUST =====
function createHeroFairyDust() {
  const container = document.querySelector('.hero__fairy-dust');
  if (!container) return;

  const count = 25 + Math.floor(Math.random() * 15);
  const colors = ['#f4c542', '#fde68a', '#fff5cc', '#c77dff', '#52b788'];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'fairy-dust-particle';
    const size = 2 + Math.random() * 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = 3 + Math.random() * 4;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${10 + Math.random() * 80}%`;
    particle.style.top = `${20 + Math.random() * 40}%`;
    particle.style.background = color;
    particle.style.boxShadow = `0 0 ${size * 2}px ${size}px ${color}40`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${Math.random() * duration}s`;
    particle.style.setProperty('--dust-dy', `${-15 - Math.random() * 25}px`);
    particle.style.setProperty('--dust-dx', `${(Math.random() - 0.5) * 40}px`);

    container.appendChild(particle);
  }
}

// ===== BURST SPARKLES =====
function createBurstSparkles() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const colors = ['#f4c542', '#fde68a', '#fff5cc', '#c77dff', '#52b788'];

  for (let i = 0; i < 40; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'burst-sparkle';

    const angle = (Math.PI * 2 * i) / 40 + (Math.random() - 0.5) * 0.5;
    const distance = 100 + Math.random() * 250;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    sparkle.style.left = `${centerX}px`;
    sparkle.style.top = `${centerY}px`;
    sparkle.style.setProperty('--tx', `${tx}px`);
    sparkle.style.setProperty('--ty', `${ty}px`);
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.width = sparkle.style.height = `${4 + Math.random() * 8}px`;
    sparkle.style.animationDelay = `${Math.random() * 0.3}s`;
    sparkle.style.boxShadow = `0 0 6px 2px ${sparkle.style.background}`;

    burstContainer.appendChild(sparkle);
  }

  // Clean up after animation
  setTimeout(() => {
    burstContainer.innerHTML = '';
  }, 2000);
}

// ===== GATE UNLOCK =====
function unlockGates() {
  // Disable input
  codeInput.disabled = true;
  codeError.textContent = '';

  // Open the gates
  gate.classList.add('gates-open');

  // Burst sparkles after a short delay
  setTimeout(createBurstSparkles, 800);

  // Transition to invitation after gate animation
  setTimeout(() => {
    gateScreen.classList.add('hidden');
    invitation.setAttribute('aria-hidden', 'false');

    // Trigger the visible class after a frame so the transition plays
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        invitation.classList.add('visible');
        // Spawn magical invitation effects
        createInviteBgFlowers();
        createInviteSparkles();
        createInviteFairies();
        createHeroFairyDust();
        startShipDust();
        startPirateBubbleRotation();
      });
    });
  }, 2500);

  // Save to session storage
  sessionStorage.setItem(SESSION_KEY, 'true');
}

// ===== WRONG CODE FEEDBACK =====
function shakeInput() {
  const wrapper = codeInput.closest('.code-input__field-wrapper')!;
  wrapper.classList.add('shake');
  codeError.textContent = 'Probeer het nog eens...';

  wrapper.addEventListener(
    'animationend',
    () => wrapper.classList.remove('shake'),
    { once: true }
  );
}

// ===== CODE VALIDATION =====
function handleInput() {
  const value = codeInput.value.trim().toUpperCase();

  if (value === MAGIC_CODE) {
    unlockGates();
    return;
  }

  // Only shake if the input length matches the code length (user finished typing)
  if (value.length >= MAGIC_CODE.length) {
    shakeInput();
  }
}

// ===== SCROLL ANIMATIONS =====
function setupScrollReveal() {
  const sections = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ===== SCROLL HINT =====
function setupScrollHint() {
  scrollHint.addEventListener('click', () => {
    const activitiesSection = document.querySelector('.section--activities');
    activitiesSection?.scrollIntoView({ behavior: 'smooth' });
  });
}

// ===== CHECK SESSION =====
function checkSession() {
  if (sessionStorage.getItem(SESSION_KEY) === 'true') {
    // Skip gate animation, go straight to invitation
    gateScreen.classList.add('hidden');
    invitation.setAttribute('aria-hidden', 'false');
    invitation.classList.add('visible');

    // Still reveal sections that are in view
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('visible');
    });

    // Spawn magical invitation effects
    createInviteBgFlowers();
    createInviteSparkles();
    createInviteFairies();
    createHeroFairyDust();
    startShipDust();
    startPirateBubbleRotation();

    return true;
  }
  return false;
}

// ===== ROTATING PIRATE SPEECH BUBBLES =====
function startPirateBubbleRotation() {
  const texts = [
    'ARRR!',
    'Geef me het elfenstof, maatje!',
    'Kom hier jij!',
    'Bijna... ik heb \'m bijna!',
  ];
  const bubble1 = document.querySelector('.pirate-bubble--1 p');
  const bubble2 = document.querySelector('.pirate-bubble--2 p');
  if (!bubble1 || !bubble2) return;

  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % texts.length;
    bubble1.textContent = texts[idx];
    bubble2.textContent = texts[(idx + 2) % texts.length];
  }, 4000);
}

// ===== INIT =====
function init() {
  // Stars are in the shared background - always create them
  createStars();

  const alreadyUnlocked = checkSession();

  if (!alreadyUnlocked) {
    createGlowFlowers();
    createSparkles();
    createFireflies();
    createFlyingElves();
    createGateElves();

    // Listen for input
    codeInput.addEventListener('input', handleInput);

    // Also handle Enter key
    codeInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleInput();
      }
    });

    // Focus the input
    codeInput.focus();
  }

  // Set up scroll features for after unlock
  setupScrollReveal();
  setupScrollHint();
}

init();
