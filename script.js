// script.js — Aura Habit Tracker
// 



// SECTION 1: THEME DEFINITIONS
// Each theme has full config: colors for confetti,
// greeting names, hype messages, mind questions,
// vibe label, reward messages


const THEMES = {
  nonchalant: {
    id: 'nonchalant',
    name: 'Nonchalant Diva',
    desc: 'Deep navy monochrome',
    attr: 'default',          // data-theme value (empty = :root)
    dotColors: ['#1c1c3a','#6366f1'],
    dotColors2: ['#818cf8','#a855f7','#3b82f6'],
    confetti: ['#6366f1','#818cf8','#a855f7','#3b82f6','#f0f0ff','#14b8a6'],
    names: { female:['princess','bae','diva','queen','baddie'], male:['king','bro','legend','chief'], other:['star','icon','legend'] },
    hypes: {
      female: [
        "You are THAT girl. No one is doing it like you.",
        "Literally glowing different today, queen.",
        "Other people have goals. You ACHIEVE them.",
        "Untouchable. Undefeated. Iconic.",
        "Not to be dramatic but you might be unstoppable.",
        "You woke up and chose excellence. Again.",
        "What's your secret sauce? Because it's working.",
        " You are the vibe. Keep it going, honey.",
        "You didn't come this far to only come this far.",
        "The glow up is continuous. Today is proof.",
        "Discipline made you dangerous, consistency made you untouchable.",     
        //  this actually make you feel good about yourself. 
        //  the queen one might be a lil cringe but works too
      ],
      male: [
        "You're built different, king. Keep going.",
        "Every rep, every page, every step — it compounds.",
        "Legend behaviour. Keep it up.",
        "You showed up today. That's already more than most.",
      ],
      other: [
        "You are exactly who you're becoming. Keep going.",
        "Every day you choose yourself. That's the move.",
        "Unstoppable. Unique. Unapologetically you.",
      ]
    },
    mindQuestions: {
      female: ["Hey girl, what's on your mind today?","What are we conquering today, queen?","What's the plan, diva?","What do you want to get done today, bae?"],
      male:   ["What's the mission today, king?","What are we building today?","What's getting done today?","Today's focus is..."],
      other:  ["What's on the agenda today?","What are we tackling today?","What's your focus today?"]
    },
    greetingSubs: {
      female: "Rise and shine — the world needs your energy today",
      male:   "Let's get it. Today is yours to own.",
      other:  "A new day, a new chance to build your empire."
    },
    rewardSubs: {
      female: ["Go blast your fav playlist — you earned it, bae.","Reward yourself with your comfort show, queen.","Fave snack, zero guilt. You EARNED this.","Call your bestie and brag. You have things to celebrate.","Your ritual tonight: whatever that makes you happy.", "Resr is the part of the process. Take it seriously tonight.", "Sit by the balcony/window and romatacize life for a bit", "You did great today. Now do something that makes you feel great too.", " You showed up fully today. Honour that with full rest and self-care."],
      male:   ["Recovery mode: gaming, food, whatever recharges you.","You put in the work. Rest is earned.","Treat yourself, king. You delivered today.","Drop the grind. Tonight is yours.", "Open old chats/photos and just reminicse", "Step outside for fresh air and just exist for a bit."],
      other:  ["Do exactly what makes you happy right now.","Rest, recharge, celebrate — you deserve it.","You showed up fully today. Honour that.", " Whatever your version of treating yourself is, do that. You earned it.", "Take a moment to just appreciate how well you did today.", "Rewatch a comfort movie or random Youtube rabbit hole.", "Order your favourite food and eat it like its's a celebration."],
    }
  },

  baddie: {
    id: 'baddie',
    name: 'Baddie',
    desc: 'Dark , rich jewel tones',
    attr: 'baddie',
    dotColors: ['#130e13','#a855f7'],
    dotColors2: ['#c084fc','#ec4899','#7c3aed'],
    confetti: ['#a855f7','#ec4899','#c084fc','#7c3aed','#fdf0ff','#e11d7a'],
    names: { female:['baddie','it girl','that girl','icon','boss'], male:['boss','legend','icon','G'], other:['icon','legend','that one'] },
    hypes: {
      female: [
        "The audacity to be this unbothered AND this iconic.",
        "Dark, mysterious, and absolutely winning. That's you.",
        "Main character energy is not a vibe, it's a lifestyle.",
        "Rich girl behaviour starts with the mindset. You have it.",
        "You didn't come this far to only come this far, baddie.",
        "The glow up is continuous. Today is proof.",
        "You are a force of nature. Embrace it.",
        " The grind never looked this good. Keep going, hun.",
        " You're not in a competition , you're in a league of your own.",
      ],
      male: ["Boss moves only. That's your whole personality.","Power, purpose, progress. You're all three.","The grind never looked this good.", "You are a force. Own it.","Legacy in the making. Keep going."],
      other: ["Iconic. Always. In every form.","Dark horse energy — quietly winning at everything.","The vision is yours. The execution is flawless."]
    },
    mindQuestions: {
      female: ["What's on the agenda, baddie?","What are we manifesting today, it girl?","What's the power move today?","Tell me the vision for today."],
      male:   ["What's the boss move today?","What are we building, king?","Today's power play is...","What's getting dominated today?"],
      other:  ["What's the vision today, icon?","What are we creating today?","What's on today's list, legend?"]
    },
    greetingSubs: {
      female: "Dark, unbothered, and absolutely unstoppable.",
      male:   "Power up. Today belongs to you.",
      other:  "Quiet power. Loud results."
    },
    rewardSubs: {
      female: ["Dark chocolate, silk playlist, and zero apologies.","Tonight you dress up for yourself. Slay the mirror, baddie.","Watch something that matches your energy. You're at a 10.","Your ritual: skincare, playlist, decompress. You earned the luxury."],
      male:   ["Stack recovered = stack rebuilt tomorrow. Rest up, boss.","Your version of self-care tonight. Earn it fully.","Top tier performance today. Top tier recovery tonight."],
      other:  ["Your ritual tonight. Do it unapologetically.","Rest like the icon you are.","Tonight is entirely yours. Own it."]
    }
  },

  whimsy: {
    id: 'whimsy',
    name: 'Cute Whimsy',
    desc: 'Soft pinks, pastel magic',
    attr: 'whimsy',
    dotColors: ['#fff5f9','#f472b6'],
    dotColors2: ['#fb7bb8','#e879f9','#fbbf24'],
    confetti: ['#f472b6','#fb7bb8','#e879f9','#fbbf24','#a78bfa','#34d399','#fff5f9'],
    names: { female:['sunshine','angel','sweetie','cutie','darling'], male:['sunshine','buddy','champ','star'], other:['sunshine','star','petal','sparkle'] },
    hypes: {
      female: [
        "You are literally the cutest AND most hardworking person ever 🌸",
        "Today is going to be magical because you're in it! ✨",
        "You're doing SO well, sunshine! Keep being amazing!",
        "Every tiny step you take is actually giant. Believe it!",
        "The universe is rooting for you today, angel! 🌙",
        "You make the world softer and brighter just by being you.",
      ],
      male: ["You've got this! Every step counts, sunshine! 🌟","Your effort today is tomorrow's result. Keep going!","So proud of you for showing up! You're amazing!"],
      other: ["You're exactly where you need to be, star ✨","Every little effort counts and yours are beautiful!","Today is a gift and you're going to make it magical!"]
    },
    mindQuestions: {
      female: ["Hi sunshine! What's on the to-do list today? 🌸","What little wins are we going for today, angel?","What makes today beautiful and productive? ✨","Hey cutie, what's the plan? 🌷"],
      male:   ["Hey sunshine, what's on the list today? 🌟","What are we going for today, champ?","What's making today great?"],
      other:  ["Hello star! What's on the to-do list today? 🌸","What's making today special and productive?","What little wins are we celebrating today? ✨"]
    },
    greetingSubs: {
      female: "Today is going to be amazing — you're going to make it so! 🌷",
      male:   "Rise and shine! Today has so much good in store for you! 🌟",
      other:  "Good things are coming your way today! 🌈"
    },
    rewardSubs: {
      female: ["Hot chocolate, fluffy blanket, favourite show. You EARNED cute cozy time! 🍫","You did so well! Treat yourself to your fave little pleasure tonight 🌸","Face mask, fuzzy socks, playlist — you are SO loved! ✨","Dance to your feel-good song RIGHT NOW. You absolutely deserve it! 🎵"],
      male:   ["Rest and recharge — you earned every moment of downtime! 🌟","Snack + game + relax. Perfect recovery combo. You did great today!","Tonight is yours. Do whatever makes you happiest!"],
      other:  ["Cozy time is officially earned! Enjoy every second ✨","You showed up beautifully today. Celebrate with your fave thing! 🌷","Rest, recharge, and bask in how well you did today 🌈"]
    }
  },

  minimal: {
    id: 'minimal',
    name: 'Minimal Dark',
    desc: 'Clean black & green',
    attr: 'minimal',
    dotColors: ['#0a0a0a','#22c55e'],
    dotColors2: ['#4ade80','#0ea5e9','#7c3aed'],
    confetti: ['#22c55e','#4ade80','#0ea5e9','#7c3aed','#f5f5f5','#f59e0b'],
    names: { female:['champion','warrior','legend'], male:['king','legend','warrior','G'], other:['legend','warrior','champion'] },
    hypes: {
      female: ["You're built for this. No doubt.","Execute. Don't hesitate.","Consistent > Motivated. You're consistent."],
      male:   ["Execute. No excuses, no exceptions.","Built different. Proven daily.","The work is the answer. You showed up.","Discipline over motivation. You have both."],
      other:  ["Show up. Do the work. That's the whole code.","Execution is everything. You're executing.","The process is the prize."]
    },
    mindQuestions: {
      female: ["What's getting done today?","Today's non-negotiables are...","What's the priority today, champion?"],
      male:   ["What's the mission today?","Today's non-negotiables are...","What's getting executed today?","Today's target:"],
      other:  ["What's on the agenda?","Priority for today:","What's getting done?"]
    },
    greetingSubs: {
      female: "Show up, execute, repeat.",
      male:   "Lock in. Today's yours.",
      other:  "Show up. Execute. Win."
    },
    rewardSubs: {
      female: ["Recovery is part of the process. Rest fully tonight.","You executed today. Honour that with actual rest.","The work is done. Now fully decompress."],
      male:   ["Recovery mode: sleep, food, whatever restores you.","The work was done. Now rest properly.","You locked in today. Recovery is next.","Rest hard. You worked hard."],
      other:  ["You executed. Now recover fully.","Rest is part of the process. Take it seriously tonight.","Done for today. Recovery starts now."]
    }
  },

  sport: {
    id: 'sport',
    name: 'Sport Mode',
    desc: 'Deep blue, high energy',
    attr: 'sport',
    dotColors: ['#030912','#3b82f6'],
    dotColors2: ['#60a5fa','#1d4ed8','#f59e0b'],
    confetti: ['#3b82f6','#60a5fa','#f59e0b','#1d4ed8','#e8f4ff','#22c55e'],
    names: { female:['champion','warrior','legend'], male:['champion','G','warrior','legend','king'], other:['champion','warrior','legend'] },
    hypes: {
      female: ["Champions train when others sleep. You're training.","Every rep counts. Every day counts. Keep going, warrior.","You're not tired. You're building character."],
      male:   ["Champions don't quit. Neither do you.","Every session counts. Stack them, king.","Pain is temporary. Results are permanent.","Your future self is watching. Make them proud."],
      other:  ["Champions show up regardless. That's you.","The scoreboard is yours to own. Keep going.","Warrior mindset, every single day."]
    },
    mindQuestions: {
      female: ["What's today's training plan, champion?","What are we winning at today?","What's the game plan, warrior?"],
      male:   ["What's today's game plan, king?","What are we training/building today?","Today's challenge is...","What's the mission, champion?"],
      other:  ["What's today's play, champion?","What are we conquering today?","Today's objective:"]
    },
    greetingSubs: {
      female: "Game on. Lace up and execute.",
      male:   "Game on. Go get it, champion.",
      other:  "Game on. You're ready."
    },
    rewardSubs: {
      female: ["Active recovery. Stretch, hydrate, and rest.","Fuel well tonight. You earned proper recovery.","Champions rest well. That's next."],
      male:   ["Recovery mode: fuel, hydrate, sleep. You earned it.","Active recovery tonight. You put in the work.","Every champion rests. Your turn.","Eat well, sleep hard. That's the recovery protocol."],
      other:  ["Recovery protocol: food, hydration, rest. You earned it.","You played well today. Recover fully.","Rest is training too. Take it seriously."]
    }
  }
};

// Which vibes to show per gender
const GENDER_VIBES = {
  female:    ['nonchalant','baddie','whimsy'],
  male:      ['minimal','sport','nonchalant'],
  nonbinary: ['nonchalant','whimsy','minimal'],
  other:     ['nonchalant','minimal','whimsy'],
};



// SECTION 2: STATE


let state = JSON.parse(localStorage.getItem('aura_app') || '{}');

// Onboarding + profile
if (!state.profile) state.profile = {
  name: '',
  gender: '',
  vibe: '',
  theme: 'nonchalant',
  pronouns: '',
  bio: '',
  photo: '',
  interests: [],
  onboarded: false,
};

// App data
if (!state.tasks)       state.tasks       = [];
if (!state.homeTasks)   state.homeTasks   = [];
if (!state.homeGoals)   state.homeGoals   = [];
if (!state.goals)       state.goals       = [];
if (!state.proudHistory)state.proudHistory= [];
if (!state.dailyPhotos) state.dailyPhotos = {};
if (!state.streak)      state.streak      = 0;
if (!state.pqIndex)     state.pqIndex     = 0;
if (!state.skillName)   state.skillName   = '';
if (!state.pqAnswers)   state.pqAnswers   = [];   // for personality learning
if (!state.taskPatterns)state.taskPatterns= [];   // for personality learning

function save() { localStorage.setItem('aura_app', JSON.stringify(state)); }

function todayKey() { return new Date().toISOString().slice(0,10); }

// Get current theme config
function T() { return THEMES[state.profile.theme] || THEMES.nonchalant; }

// Get gender-appropriate array from theme config
function byGender(obj) {
  const g = state.profile.gender || 'other';
  return obj[g] || obj['other'] || obj['female'] || [];
}

function getNickname() {
  const names = byGender(T().names);
  const name  = state.profile.name || '';
  const nick  = names[Math.floor(Math.random() * names.length)];
  return name ? name : nick;
}



// SECTION 3: ONBOARDING


let obSelectedGender  = '';
let obSelectedVibe    = '';
let obSelectedInterests = [];
let obPhotoData       = '';

function obNext(step) {
  // Validate step 2 (name)
  if (step === 3) {
    const name = document.getElementById('ob-name').value.trim();
    if (!name) {
      document.getElementById('ob-name').focus();
      document.getElementById('ob-name').style.borderColor = '#ef4444';
      setTimeout(() => { document.getElementById('ob-name').style.borderColor = ''; }, 1500);
      return;
    }
  }
  document.querySelectorAll('.ob-step').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('ob-step-' + step);
  if (el) el.classList.add('active');
}

function selectGender(card) {
  document.querySelectorAll('.ob-gender-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  obSelectedGender = card.dataset.gender;
  buildVibeCards(obSelectedGender);
  document.getElementById('ob-vibe-section').classList.remove('hidden');
}

function buildVibeCards(gender) {
  const vibes   = GENDER_VIBES[gender] || GENDER_VIBES.other;
  const grid    = document.getElementById('ob-vibe-grid');
  grid.innerHTML = vibes.map(id => {
    const t = THEMES[id];
    const preview = t.dotColors2.map(c => `<div class="tp-dot" style="background:${c};color:${c}"></div>`).join('');
    return `<div class="ob-vibe-card" data-vibe="${id}" onclick="selectVibe(this)"
              style="background:${t.dotColors[0]};border-color:${t.dotColors[1]}33">
      <div class="ob-vibe-dot" style="background:${t.dotColors[1]};box-shadow:0 0 12px ${t.dotColors[1]}88"></div>
      <div class="ob-vibe-name" style="color:${t.dotColors2[0]}">${t.name}</div>
      <div class="ob-vibe-desc" style="color:${t.dotColors2[1]}99">${t.desc}</div>
    </div>`;
  }).join('');
  obSelectedVibe = '';
  const nextBtn = document.getElementById('ob-gender-next');
  nextBtn.style.opacity = '0.4';
  nextBtn.style.pointerEvents = 'none';
}

function selectVibe(card) {
  document.querySelectorAll('.ob-vibe-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  card.style.borderWidth = '2px';
  card.style.boxShadow = `0 0 20px ${THEMES[card.dataset.vibe]?.dotColors[1]}66`;
  obSelectedVibe = card.dataset.vibe;
  const nextBtn = document.getElementById('ob-gender-next');
  nextBtn.style.opacity = '1';
  nextBtn.style.pointerEvents = 'auto';
}

function toggleInterest(el) {
  el.classList.toggle('chosen');
  const v = el.dataset.val;
  const idx = obSelectedInterests.indexOf(v);
  if (idx > -1) obSelectedInterests.splice(idx, 1);
  else          obSelectedInterests.push(v);
}

function setOnboardingPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    obPhotoData = e.target.result;
    const img = document.getElementById('ob-photo-preview');
    img.src = obPhotoData;
    img.style.display = 'block';
    document.getElementById('ob-photo-placeholder').style.display = 'none';
    document.getElementById('ob-photo-ring').style.border = '3px solid #6366f1';
  };
  reader.readAsDataURL(file);
}

function finishOnboarding() {
  const name = document.getElementById('ob-name').value.trim() || 'You';
  state.profile.name      = name;
  state.profile.gender    = obSelectedGender  || 'other';
  state.profile.vibe      = obSelectedVibe    || 'nonchalant';
  state.profile.theme     = obSelectedVibe    || 'nonchalant';
  state.profile.interests = obSelectedInterests;
  state.profile.photo     = obPhotoData;
  state.profile.onboarded = true;

  // Seed some default tasks and goals based on interests
  if (state.homeTasks.length === 0 && state.profile.interests.includes('skills')) {
    state.homeTasks.push({ id:Date.now(), text:"Start learning a new skill today", done:false, dlLabel:"end of day", dlClass:"ok", addedAt:new Date().toISOString() });
  }
  if (state.homeGoals.length === 0) {
    state.homeGoals.push({ id:Date.now()+1, title:"My first big goal", cat:"personal", pct:0, milestones:["Start","Progress","Almost","Done"], doneMilestones:[], targetDate:"", createdAt:new Date().toISOString() });
  }

  save();
  applyTheme(state.profile.theme);

  document.getElementById('onboarding').classList.add('hidden');
  showLanding();
}



// SECTION 4: THEME ENGINE


function applyTheme(themeId) {
  const t = THEMES[themeId] || THEMES.nonchalant;
  state.profile.theme = themeId;
  save();

  const attr = t.attr;
  if (attr === 'default' || !attr) {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', attr);
  }

  // Update logo orb color dynamically
  document.querySelectorAll('.logo-orb, .ob-logo-orb').forEach(orb => {
    orb.style.background = t.dotColors[1];
    orb.style.boxShadow  = `0 0 16px ${t.dotColors[1]}bb, 0 0 32px ${t.dotColors[1]}55`;
  });

  // Update preview card accent
  updateLandingForUser();
}



// SECTION 5: LANDING PAGE


function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  container.innerHTML = '';
  const t = T();
  for (let i = 0; i < 50; i++) {
    const dot = document.createElement('div');
    dot.className = 'particle';
    dot.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*4}s;animation-duration:${3+Math.random()*4}s;background:${t.particle_color||'rgba(99,102,241,0.5)'};`;
    container.appendChild(dot);
  }
}

function updateLandingForUser() {
  const name = state.profile.name || 'You';
  const el = document.getElementById('hero-name');
  if (el) el.textContent = name;
  const pn = document.getElementById('preview-name');
  if (pn) pn.textContent = name;
  const pl = document.getElementById('preview-avatar-letter');
  if (pl) pl.textContent = name[0]?.toUpperCase() || 'U';

  // Personalise hero text by gender/vibe
  const t = T();
  const g = state.profile.gender || 'other';
  const lines = { female:['Your habits.','Your rules.','Your empire.'], male:['Your habits.','Your rules.','Your legacy.'], nonbinary:['Your habits.','Your rules.','Your world.'], other:['Your habits.','Your rules.','Your story.'] };
  const chosen = lines[g] || lines.other;
  const l1 = document.getElementById('hero-line-1');
  const l2 = document.getElementById('hero-line-2');
  const l3 = document.getElementById('hero-line-3');
  if (l1) l1.textContent = chosen[0];
  if (l2) l2.textContent = chosen[1];
  if (l3) l3.textContent = chosen[2];
}

function showLanding() {
  updateLandingForUser();
  spawnParticles();
  document.getElementById('landing').classList.remove('hidden');
  startLandingCanvas();
}

// Canvas animated dots / neural network effect on landing
function startLandingCanvas() {
  const canvas = document.getElementById('landingCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const nodes = [];
  const t = T();
  const col = t.dotColors2[0] || '#818cf8';

  for (let i = 0; i < 60; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    });
  }

  function drawNodes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    });
    // draw connecting lines between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i+1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = col;
          ctx.globalAlpha = (1 - dist/120) * 0.25;
          ctx.lineWidth   = 0.8;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, 2, 0, Math.PI*2);
      ctx.fillStyle = col;
      ctx.globalAlpha = 0.35;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawNodes);
  }
  drawNodes();
}

function enterApp() {
  const landing = document.getElementById('landing');
  const app     = document.getElementById('app');
  landing.style.transition = 'opacity 0.5s ease';
  landing.style.opacity = '0';
  setTimeout(() => {
    landing.style.display = 'none';
    app.classList.remove('hidden');
    app.style.opacity = '0';
    app.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => requestAnimationFrame(() => { app.style.opacity = '1'; }));
    applyTheme(state.profile.theme);
    initAppUI();
    renderHome();
  }, 500);
}



// SECTION 6: APP INIT + NAVIGATION


function initAppUI() {
  // Set avatar
  const photo = state.profile.photo;
  if (photo) {
    ['avatarImg','homeAvatarImg','profilePhotoImg'].forEach(id => {
      const img = document.getElementById(id);
      if (img) { img.src = photo; img.style.display = 'block'; }
    });
    ['avatarInitial','homeAvatarInitial','profilePhotoInitial'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  } else {
    const letter = (state.profile.name || 'U')[0].toUpperCase();
    ['avatarInitial','homeAvatarInitial','profilePhotoInitial'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = letter;
    });
  }

  document.getElementById('topbarStreak').textContent = state.streak;

  // Build profile theme picker
  buildProfileThemePicker();
  buildProfileInsights();
  renderProfileStats();

  // Fill profile fields
  const pname = document.getElementById('profileName');
  if (pname) pname.value = state.profile.name || '';
  const ppron = document.getElementById('profilePronouns');
  if (ppron) ppron.value = state.profile.pronouns || '';
  const pbio = document.getElementById('profileBio');
  if (pbio)  pbio.value = state.profile.bio || '';

  document.getElementById('profileNameDisplay').textContent = state.profile.name || '—';
  const vb = document.getElementById('profileVibeBadge');
  if (vb) vb.textContent = T().name;
}

function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (btn) btn.classList.add('active');
  if (id === 'home')     renderHome();
  if (id === 'today')    renderToday();
  if (id === 'goals')    renderGoals();
  if (id === 'discover') renderDiscover();
  if (id === 'eod')      renderEod();
  if (id === 'profile')  renderProfile();
}



// SECTION 7: HOME PAGE


let selectedDeadline = '';
let selectedGoalCat  = '';

function renderHome() {
  const hour  = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const name  = state.profile.name || getNickname();
  const el    = document.getElementById('greetingText');
  if (el) el.textContent = greet + ', ' + name + ' ✨';

  const gsub = document.getElementById('greetingSub');
  if (gsub) gsub.textContent = byGender(T().greetingSubs);

  const questions = byGender(T().mindQuestions);
  const mq = document.getElementById('mindQuestion');
  if (mq) mq.textContent = questions[Math.floor(hour / 6) % questions.length];

  const setStat = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  setStat('streakNum',      state.streak);
  setStat('completedToday', state.homeTasks.filter(t=>t.done).length);
  setStat('totalGoals',     state.homeGoals.length);
  setStat('goalCountBadge', state.homeGoals.length);
  setStat('topbarStreak',   state.streak);

  renderDailyPhoto();
  renderHomeTaskList();
  renderHomeGoals();
  renderPersonalityInsight();
}

// ── DAILY PHOTO ──

function renderDailyPhoto() {
  const key     = todayKey();
  const entry   = state.dailyPhotos[key];
  const preview = document.getElementById('dailyPhotoPreview');
  const ph      = document.getElementById('dailyPhotoPlaceholder');
  const rm      = document.getElementById('dailyPhotoRemove');
  const cap     = document.getElementById('dailyCaption');
  const dateLbl = document.getElementById('dailyPhotoDate');
  if (dateLbl) dateLbl.textContent = new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});
  if (entry && entry.photo) {
    preview.src = entry.photo;
    preview.classList.remove('hidden');
    ph.classList.add('hidden');
    rm.classList.remove('hidden');
    if (cap) cap.value = entry.caption || '';
  } else {
    preview.classList.add('hidden');
    ph.classList.remove('hidden');
    rm.classList.add('hidden');
    if (cap) cap.value = '';
  }
}

function setDailyPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const key = todayKey();
    if (!state.dailyPhotos[key]) state.dailyPhotos[key] = {};
    state.dailyPhotos[key].photo = e.target.result;
    save();
    renderDailyPhoto();
  };
  reader.readAsDataURL(file);
}

function removeDailyPhoto() {
  const key = todayKey();
  if (state.dailyPhotos[key]) delete state.dailyPhotos[key].photo;
  save();
  renderDailyPhoto();
}

function saveDailyCaption(val) {
  const key = todayKey();
  if (!state.dailyPhotos[key]) state.dailyPhotos[key] = {};
  state.dailyPhotos[key].caption = val;
  save();
}

//  DEADLINE 

function selectDeadline(btn) {
  document.querySelectorAll('#deadlinePills .dp').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedDeadline = btn.dataset.value;
  document.getElementById('customDeadline').value = '';
}

function computeDeadline(val, customDt) {
  if (customDt) {
    const dt   = new Date(customDt);
    const mins = Math.round((dt - new Date()) / 60000);
    const cls  = mins < 60 ? 'urgent' : mins < 180 ? 'soon' : 'ok';
    return { label:dt.toLocaleString('en-IN',{weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}), cls };
  }
  const map = { '30m':{label:'30 min',cls:'urgent'},'1h':{label:'1 hour',cls:'soon'},'2h':{label:'2 hours',cls:'soon'},'eod':{label:'end of day',cls:'ok'},'week':{label:'this week',cls:'ok'} };
  return map[val] || {label:'no deadline',cls:'nodate'};
}

function homeAddTask() {
  const input = document.getElementById('homeTaskInput');
  const text  = input.value.trim();
  if (!text) return;
  const dl = computeDeadline(selectedDeadline, document.getElementById('customDeadline').value);
  state.homeTasks.push({ id:Date.now(), text, done:false, dlLabel:dl.label, dlClass:dl.cls, addedAt:new Date().toISOString() });
  // Track for personality learning
  state.taskPatterns.push({ text, date:todayKey() });
  if (state.taskPatterns.length > 100) state.taskPatterns = state.taskPatterns.slice(-100);
  save();
  input.value = '';
  selectedDeadline = '';
  document.getElementById('customDeadline').value = '';
  document.querySelectorAll('#deadlinePills .dp').forEach(b => b.classList.remove('active'));
  renderHomeTaskList();
  document.getElementById('completedToday').textContent = state.homeTasks.filter(t=>t.done).length;
}

function renderHomeTaskList() {
  const list = document.getElementById('homeTaskList');
  if (!list) return;
  if (state.homeTasks.length === 0) {
    list.innerHTML = `<div style="font-size:13px;color:var(--tx3);text-align:center;padding:12px 0">no tasks yet — add one above!</div>`;
    document.getElementById('homeDayProgressWrap').classList.add('hidden');
    return;
  }
  list.innerHTML = state.homeTasks.map((t,i) => `
    <div class="htask${t.done?' done':''}" onclick="homeToggleTask(${i})">
      <div class="htask-check">${t.done?'✓':''}</div>
      <div class="htask-text">${t.text}</div>
      <span class="htask-tag tag-${t.dlClass}">${t.dlLabel}</span>
      <button class="htask-del" onclick="event.stopPropagation();homeDeleteTask(${i})">✕</button>
    </div>`).join('');
  const done  = state.homeTasks.filter(t=>t.done).length;
  const total = state.homeTasks.length;
  document.getElementById('homeDayProgressWrap').classList.remove('hidden');
  document.getElementById('homeDayProgressText').textContent = done+'/'+total+' done';
  document.getElementById('homeDayProgressBar').style.width  = (total?Math.round(done/total*100):0)+'%';
}

function homeToggleTask(i) {
  state.homeTasks[i].done = !state.homeTasks[i].done;
  save();
  renderHomeTaskList();
  document.getElementById('completedToday').textContent = state.homeTasks.filter(t=>t.done).length;
}

function homeDeleteTask(i) {
  state.homeTasks.splice(i,1);
  save();
  renderHomeTaskList();
  document.getElementById('completedToday').textContent = state.homeTasks.filter(t=>t.done).length;
}

// ── GOALS ──

function selectGoalCat(btn) {
  document.querySelectorAll('#goalCategoryPills .dp').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedGoalCat = btn.dataset.value;
}

function toggleAddGoalForm() {
  const form = document.getElementById('addGoalForm');
  const btn  = document.getElementById('addGoalBtn');
  const isHidden = form.classList.contains('hidden');
  form.classList.toggle('hidden');
  if (btn) btn.style.display = isHidden ? 'none' : 'flex';
  if (isHidden) {
    ['homeGoalInput','goalMilestones'].forEach(id => { const e = document.getElementById(id); if(e) e.value=''; });
    const td = document.getElementById('goalTargetDate'); if(td) td.value='';
    selectedGoalCat = '';
    document.querySelectorAll('#goalCategoryPills .dp').forEach(b=>b.classList.remove('active'));
  }
}

function homeAddGoal() {
  const title = document.getElementById('homeGoalInput').value.trim();
  if (!title) return;
  const msRaw = document.getElementById('goalMilestones').value;
  const milestones = msRaw ? msRaw.split(',').map(m=>m.trim()).filter(Boolean) : ['Start','Halfway','Almost','Done'];
  state.homeGoals.push({ id:Date.now(), title, cat:selectedGoalCat||'personal', pct:0, milestones, doneMilestones:[], targetDate:document.getElementById('goalTargetDate').value, createdAt:new Date().toISOString() });
  save();
  toggleAddGoalForm();
  document.getElementById('totalGoals').textContent    = state.homeGoals.length;
  document.getElementById('goalCountBadge').textContent = state.homeGoals.length;
  renderHomeGoals();
}

function renderHomeGoals() {
  const list = document.getElementById('homeGoalsList');
  if (!list) return;
  if (state.homeGoals.length === 0) {
    list.innerHTML = `<div style="font-size:13px;color:var(--tx3);text-align:center;padding:12px 0">no goals yet — add one below!</div>`;
    return;
  }
  list.innerHTML = state.homeGoals.map((g,gi) => {
    const dateStr = g.targetDate
      ? 'target: '+new Date(g.targetDate+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})
      : 'no target date';
    return `
      <div class="hgoal">
        <div class="hgoal-top">
          <div class="hgoal-title">${g.title}</div>
          <span class="hgoal-cat cat-${g.cat}">${g.cat}</span>
          <div class="hgoal-pct">${g.pct}%</div>
        </div>
        <div class="prog-track" style="margin-bottom:0"><div class="prog-fill" style="width:${g.pct}%"></div></div>
        <div class="hgoal-milestones">
          ${g.milestones.map((m,mi)=>`<span class="ms${g.doneMilestones.includes(mi)?' done':''}" onclick="homeToggleMs(${gi},${mi})">${m}</span>`).join('')}
        </div>
        <div class="hgoal-footer">
          <span class="hgoal-date">${dateStr}</span>
          <button class="hgoal-del" onclick="homeDeleteGoal(${gi})">remove</button>
        </div>
        ${g.pct>=100?`<div style="font-size:12px;color:var(--gold);text-align:center;margin-top:8px;padding:6px;background:rgba(245,158,11,0.08);border-radius:6px">🎉 You did it! This goal is DONE!</div>`:''}
      </div>`;
  }).join('');
}

function homeToggleMs(gi, mi) {
  const g = state.homeGoals[gi];
  const idx = g.doneMilestones.indexOf(mi);
  if (idx>-1) g.doneMilestones.splice(idx,1); else g.doneMilestones.push(mi);
  g.pct = Math.round(g.doneMilestones.length/g.milestones.length*100);
  save();
  renderHomeGoals();
}

function homeDeleteGoal(gi) {
  state.homeGoals.splice(gi,1);
  save();
  document.getElementById('totalGoals').textContent    = state.homeGoals.length;
  document.getElementById('goalCountBadge').textContent = state.homeGoals.length;
  renderHomeGoals();
}

//  HYPE 
function rotateHype(el) {
  const hypes = byGender(T().hypes);
  const msg   = hypes[Math.floor(Math.random()*hypes.length)];
  el.querySelector('span') ? el.querySelector('span').textContent = msg : el.textContent = msg;
  el.style.color = 'var(--accent2)';
  setTimeout(() => {
    if (el.querySelector('span')) el.querySelector('span').textContent = 'hype me up';
    el.style.color = '';
  }, 3500);
}



// SECTION 8: PERSONALITY LEARNING ENGINE
// Reads patterns in tasks, PQ answers, goals
// and generates a personalised insight after 7+ interactions


function recordPQAnswer(answer) {
  state.pqAnswers.push({ answer, date:todayKey() });
  if (state.pqAnswers.length > 50) state.pqAnswers = state.pqAnswers.slice(-50);
  save();
}

function renderPersonalityInsight() {
  const card = document.getElementById('insightCard');
  const text = document.getElementById('insightText');
  if (!card || !text) return;

  const totalInteractions = state.pqAnswers.length + state.taskPatterns.length;
  if (totalInteractions < 5) { card.classList.add('hidden'); return; }

  // Simple pattern analysis
  const taskTexts = state.taskPatterns.map(t=>t.text.toLowerCase()).join(' ');
  const answerTexts = state.pqAnswers.map(a=>a.answer.toLowerCase()).join(' ');
  const combined = taskTexts + ' ' + answerTexts;

  const traits = [];
  if (/sleep|rest|relax|break|nap/.test(combined))      traits.push('a natural recharger who values rest');
  if (/learn|study|read|skill|code|book/.test(combined)) traits.push('a lifelong learner always leveling up');
  if (/create|art|music|dance|design|write/.test(combined)) traits.push('a creative spirit with serious talent');
  if (/gym|workout|run|exercise|fitness/.test(combined)) traits.push('someone who moves their body and loves it');
  if (/friends|social|people|talk|connect/.test(combined)) traits.push('someone who thrives in connection');
  if (/goal|plan|achieve|finish|complete/.test(combined)) traits.push('a goal-oriented achiever through and through');
  if (/morning|early|routine|habit/.test(combined))      traits.push('a routine builder who knows their rhythm');

  if (traits.length === 0) { card.classList.add('hidden'); return; }

  const nick = state.profile.name || getNickname();
  const chosen = traits.slice(0,2);
  const insight = `Based on your week so far, ${nick}, you're showing up as ${chosen.join(' and ')}. The patterns don't lie — your aura is ${totalInteractions >= 14 ? 'crystal clear' : 'coming into focus'}.`;

  text.textContent = insight;
  card.classList.remove('hidden');
}



// SECTION 9: TODAY PAGE


function renderToday() {
  const d = new Date();
  document.getElementById('todayDate').textContent = d.toLocaleDateString('en-IN',{weekday:'long',month:'long',day:'numeric'});
  const done  = state.tasks.filter(t=>t.done).length;
  const total = state.tasks.length;
  document.getElementById('taskProgress').textContent = done+'/'+total;
  document.getElementById('dayProgBar').style.width = (total?Math.round(done/total*100):0)+'%';
  document.getElementById('taskList').innerHTML = state.tasks.map((t,i)=>`
    <div class="task-item${t.done?' done':''}" onclick="toggleTask(${i})">
      <div class="task-item-check">${t.done?'✓':''}</div>
      <div class="task-item-text">${t.text}</div>
      <span class="task-item-tag">${t.tag||'task'}</span>
    </div>`).join('');
}

function toggleTask(i) { state.tasks[i].done = !state.tasks[i].done; save(); renderToday(); }

function addTask() {
  const v = document.getElementById('newTaskInput').value.trim();
  if (!v) return;
  state.tasks.push({id:Date.now(),text:v,done:false,tag:'task'});
  save();
  document.getElementById('newTaskInput').value = '';
  renderToday();
}



// SECTION 10: GOALS PAGE


function renderGoals() {
  document.getElementById('goalsList').innerHTML = state.goals.map((g,gi)=>`
    <div class="goal-card-item">
      <div class="hgoal-top">
        <div class="hgoal-title">${g.title}</div>
        <div class="hgoal-pct">${g.pct}%</div>
      </div>
      <div class="prog-track" style="margin-bottom:8px"><div class="prog-fill" style="width:${g.pct}%"></div></div>
      <div class="hgoal-milestones">
        ${g.milestones.map((m,mi)=>`<span class="ms${g.doneMilestones.includes(mi)?' done':''}" onclick="toggleGoalMs(${gi},${mi})">${m}</span>`).join('')}
      </div>
    </div>`).join('') || `<div style="font-size:13px;color:var(--tx3);text-align:center;padding:12px 0">no goals yet — add one below!</div>`;
}

function toggleGoalMs(gi, mi) {
  const g = state.goals[gi];
  const idx = g.doneMilestones.indexOf(mi);
  if(idx>-1) g.doneMilestones.splice(idx,1); else g.doneMilestones.push(mi);
  g.pct = Math.round(g.doneMilestones.length/g.milestones.length*100);
  save(); renderGoals();
}

function addGoal() {
  const v = document.getElementById('newGoalInput').value.trim();
  if (!v) return;
  state.goals.push({id:Date.now(),title:v,pct:0,milestones:['Start','Progress','Almost','Done'],doneMilestones:[]});
  save();
  document.getElementById('newGoalInput').value = '';
  renderGoals();
}



// SECTION 11: DISCOVER PAGE


let skillChatHistory = [];

function renderDiscover() {
  const qi = (state.pqIndex||0) % PERSONALITY_QS.length;
  const q  = PERSONALITY_QS[qi];
  document.getElementById('personalityQ').textContent = q.q;
  document.getElementById('personalityOpts').innerHTML = q.opts.map(o=>`
    <button class="pq-opt" onclick="answerPersonality(this,'${o.replace(/'/g,"&#39;")}')">
      ${o}
    </button>`).join('');
  document.getElementById('pAnswer').classList.add('hidden');

  if (state.skillName) {
    document.getElementById('skillName').value = state.skillName;
    document.getElementById('skillQuizArea').classList.remove('hidden');
    document.getElementById('skillResetBtn').classList.remove('hidden');
    renderSkillChat();
    if (skillChatHistory.length === 0) askClaude();
  }
}

const PERSONALITY_QS = [
  { q:"When you walk into a room, you feel...",  opts:["Like I own it","Curious about everyone","Ready to vibe","A lil anxious but make it fashion"] },
  { q:"Your ideal Sunday looks like...",         opts:["Creating something epic","Binge watching everything","Going out with people I love","Doing absolutely nothing and loving it"] },
  { q:"When a plan falls through you...",        opts:["Make a better plan instantly","Need a moment then recover","Go with the flow","Feel it, then let it go"] },
  { q:"Your superpower is...",                   opts:["Reading the room","Making people feel seen","Getting things done","Dreaming bigger than anyone"] },
  { q:"You recharge by...",                      opts:["Being alone with my thoughts","Music and movement","Deep convos","Sleep, always sleep"] },
  { q:"Your approach to mornings is...",         opts:["Structured ritual","Go with how I feel","Chaos but I make it work","Still figuring it out"] },
  { q:"Your biggest flex is...",                 opts:["I actually finish things","I never stop learning","People feel good around me","I always find a way"] },
];

function answerPersonality(btn, ans) {
  document.querySelectorAll('.pq-opt').forEach(b=>b.classList.remove('picked'));
  btn.classList.add('picked');
  const msg = document.getElementById('pAnswer');
  const nick = state.profile.name || getNickname();
  msg.textContent = `Love that for you, ${nick}. Keep exploring yourself. 💜`;
  msg.classList.remove('hidden');
  state.pqIndex = (state.pqIndex||0) + 1;
  recordPQAnswer(ans);
}


// ── AI SKILL COACH ──

function setSkill() {
  const v = document.getElementById('skillName').value.trim();
  if (!v) return;
  if (state.skillName !== v) { skillChatHistory = []; state.skillName = v; save(); }
  document.getElementById('skillQuizArea').classList.remove('hidden');
  document.getElementById('skillResetBtn').classList.remove('hidden');
  renderSkillChat();
  if (skillChatHistory.length === 0) askClaude();
}

function renderSkillChat() {
  const box = document.getElementById('skillChatBox');
  if (!box) return;
  box.innerHTML = skillChatHistory.map(msg => {
    const isUser = msg.role === 'user';
    return `<div class="chat-bubble-wrap ${isUser?'user':'bot'}">
      <div class="chat-bubble">${msg.content.replace(/\n/g,'<br/>')}</div>
    </div>`;
  }).join('');
  box.scrollTop = box.scrollHeight;
}

async function askClaude() {
  setThinking(true);
  const name   = state.profile.name || 'the user';
  const theme  = T().name;
  const system = `You are ${name}'s personal AI skill coach and study buddy — smart, warm, and encouraging. Think of yourself like a brilliant tutor who also genuinely cares about ${name}'s progress.

${name} is currently working on: "${state.skillName || 'a new skill'}".
Their vibe/theme: ${theme}.

Your role:
- Chat naturally like a tutor/mentor would — not just a quiz bot
- Ask one focused question at a time to test understanding, then build on their answer
- Give real feedback: celebrate what's right, gently correct mistakes, explain clearly
- Suggest what to study or practice next based on their answers
- Match your energy to their theme: ${theme.includes('Whimsy') ? 'warm, encouraging, supportive' : theme.includes('Baddie') ? 'confident, sharp, powerful' : theme.includes('Sport') ? 'direct, energetic, competitive' : 'focused, clear, motivating'}
- Be genuinely helpful — if they ask a question, answer it fully
- Keep it conversational, never robotic`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system,
        messages: skillChatHistory.length > 0
          ? skillChatHistory
          : [{ role:'user', content:`Hi! I want to learn about ${state.skillName}. Let's get started!` }]
      })
    });

    if (!response.ok) throw new Error('API ' + response.status);

    const data  = await response.json();
    const reply = data.content.map(c=>c.text||'').join('').trim();

    if (reply) {
      if (skillChatHistory.length === 0) {
        skillChatHistory.push({ role:'user', content:`Hi! I want to learn about ${state.skillName}. Let's get started!` });
      }
      skillChatHistory.push({ role:'assistant', content:reply });
      save();
    }
  } catch (err) {
    console.error('Claude error:', err);
    skillChatHistory.push({ role:'assistant', content:`Hey! I couldn't connect right now. Make sure you're running this through VS Code Live Server (not file://) — that's usually what causes this. Try again in a sec! 💜` });
  }

  setThinking(false);
  renderSkillChat();
}

async function submitSkillAnswer() {
  const input = document.getElementById('skillAnswerInput');
  const v     = input.value.trim();
  if (!v) return;
  skillChatHistory.push({ role:'user', content:v });
  input.value = '';
  renderSkillChat();
  save();
  await askClaude();
}

function setThinking(show) {
  const el  = document.getElementById('skillThinking');
  const btn = document.getElementById('skillSubmitBtn');
  if (el)  el.classList.toggle('hidden', !show);
  if (btn) btn.disabled = show;
}

function resetSkillChat() {
  skillChatHistory = [];
  save();
  renderSkillChat();
  askClaude();
}



// SECTION 12: END OF DAY PAGE


function renderEod() {
  const name = state.profile.name || getNickname();
  const eodTitle = document.getElementById('eodTitle');
  if (eodTitle) eodTitle.textContent = `End of day, ${name}`;

  const done    = state.tasks.filter(t=>t.done);
  const pending = state.tasks.filter(t=>!t.done);
  document.getElementById('eodRecap').innerHTML = `
    <div style="font-size:12px;color:var(--green);margin-bottom:8px">${done.length} completed today</div>
    ${done.map(t=>`<div class="recap-item done-item"><div class="recap-check">✓</div><span>${t.text}</span></div>`).join('')}
    ${pending.length?`<div style="font-size:12px;color:var(--tx3);margin:8px 0 6px">${pending.length} still pending</div>`:''}
    ${pending.map(t=>`<div class="recap-item"><div class="recap-check"></div><span>${t.text}</span></div>`).join('')}
  `;

  const rb = document.getElementById('rewardBtnLabel');
  if (rb) {
    const nick = getNickname();
    rb.textContent = `Claim your reward, ${nick}`;
  }
}

function selectMood(btn, mood) {
  document.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('chosen'));
  btn.classList.add('chosen');
  state.lastMood = mood;
  save();
}

function saveProudEntry() {
  const text = (document.getElementById('proudOf').value || '').trim();
  if (!text) return;
  const key   = todayKey();
  const today = new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  state.proudHistory = state.proudHistory.filter(e=>e.date!==key);
  state.proudHistory.unshift({ date:key, dateLabel:today, text });
  if (state.proudHistory.length > 90) state.proudHistory = state.proudHistory.slice(0,90);
  save();
}

function toggleProudHistory() {
  const panel = document.getElementById('proudHistoryPanel');
  const isHidden = panel.classList.contains('hidden');
  panel.classList.toggle('hidden');
  if (isHidden) renderProudHistory();
}

function renderProudHistory() {
  const list = document.getElementById('proudHistoryList');
  if (!state.proudHistory || state.proudHistory.length === 0) {
    list.innerHTML = `<div class="proud-history-empty">no entries yet — start writing! ✨</div>`;
    return;
  }
  list.innerHTML = state.proudHistory.map(e=>`
    <div class="proud-entry">
      <div class="proud-entry-date">${e.dateLabel||e.date}</div>
      <div class="proud-entry-text">${e.text}</div>
    </div>`).join('');
}


//  CONFETTI :3

let confettiAnimId = null;

function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx    = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  const colours = T().confetti || ['#6366f1','#a855f7','#ec4899','#f59e0b','#22c55e','#3b82f6'];
  const pieces  = [];

  for (let i = 0; i < 180; i++) {
    pieces.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height - canvas.height,
      w:     5 + Math.random() * 9,
      h:     3 + Math.random() * 5,
      color: colours[Math.floor(Math.random() * colours.length)],
      vx:    (Math.random()-0.5)*4,
      vy:    2+Math.random()*4,
      spin:  (Math.random()-0.5)*0.3,
      angle: Math.random()*Math.PI*2,
      alpha: 1,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    });
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let alive = 0;
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.angle += p.spin; p.vy += 0.08;
      if (p.y > canvas.height*0.85) p.alpha -= 0.025;
      if (p.alpha <= 0) return;
      alive++;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.w/2, 0, Math.PI*2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      }
      ctx.restore();
    });
    if (alive > 0) confettiAnimId = requestAnimationFrame(draw);
    else { canvas.style.display='none'; ctx.clearRect(0,0,canvas.width,canvas.height); }
  }

  if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
  draw();
  setTimeout(() => {
    if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
    canvas.style.display = 'none';
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }, 4500);
}

function claimReward() {
  saveProudEntry();
  const area = document.getElementById('rewardArea');
  area.classList.remove('hidden');
  const rewards = byGender(T().rewardSubs);
  const r = rewards[Math.floor(Math.random()*rewards.length)];
  const titles = ['You crushed it today!','Another W for the books!','That\'s called showing up!','You\'re the whole package.'];
  document.getElementById('rewardTitle').textContent = titles[Math.floor(Math.random()*titles.length)];
  document.getElementById('rewardSub').textContent   = r;
  state.streak = (state.streak||0)+1;
  ['streakNum','topbarStreak'].forEach(id => { const e=document.getElementById(id); if(e) e.textContent=state.streak; });
  save();
  launchConfetti();
  area.scrollIntoView({ behavior:'smooth', block:'nearest' });
}



// SECTION 13: PROFILE PAGE


function renderProfile() {
  const p = state.profile;
  const pname = document.getElementById('profileName');
  if (pname) pname.value = p.name || '';
  const ppron = document.getElementById('profilePronouns');
  if (ppron) ppron.value = p.pronouns || '';
  const pbio = document.getElementById('profileBio');
  if (pbio)  pbio.value = p.bio || '';
  document.getElementById('profileNameDisplay').textContent = p.name || '—';
  const vb = document.getElementById('profileVibeBadge');
  if (vb) vb.textContent = T().name;
  buildProfileThemePicker();
  buildProfileInsights();
  renderProfileStats();
}

function buildProfileThemePicker() {
  const picker = document.getElementById('profileThemePicker');
  if (!picker) return;
  const vibes = GENDER_VIBES[state.profile.gender || 'other'] || Object.keys(THEMES);
  picker.innerHTML = vibes.map(id => {
    const t = THEMES[id];
    const isActive = state.profile.theme === id;
    const preview  = t.dotColors2.map(c=>`<div class="tp-dot" style="background:${c};color:${c}"></div>`).join('');
    return `<div class="theme-option${isActive?' active':''}" onclick="switchTheme('${id}')"
              style="${isActive?`border-color:${t.dotColors[1]};box-shadow:0 0 16px ${t.dotColors[1]}44`:``}">
      <div class="theme-preview" style="background:${t.dotColors[0]};border-radius:8px">
        ${preview}
      </div>
      <div class="theme-name">${t.name}</div>
      <div class="theme-desc">${t.desc}</div>
      ${isActive?`<div style="font-size:10px;color:${t.dotColors[1]};margin-top:4px;font-weight:600">● active</div>`:''}
    </div>`;
  }).join('');
}

function switchTheme(id) {
  applyTheme(id);
  buildProfileThemePicker();
  const vb = document.getElementById('profileVibeBadge');
  if (vb) vb.textContent = T().name;
}

function buildProfileInsights() {
  const el = document.getElementById('profileInsights');
  if (!el) return;
  const totalInteractions = state.pqAnswers.length + state.taskPatterns.length;
  if (totalInteractions < 3) {
    el.innerHTML = `<div class="insight-empty">Use the app for a few days and your personality patterns will appear here ✨</div>`;
    return;
  }
  const combined = state.taskPatterns.map(t=>t.text.toLowerCase()).join(' ') + ' ' + state.pqAnswers.map(a=>a.answer.toLowerCase()).join(' ');
  const tags = [];
  if (/learn|study|skill|read|code|book/.test(combined))    tags.push(['Learner','📚']);
  if (/create|art|music|dance|design|write/.test(combined)) tags.push(['Creative','🎨']);
  if (/gym|workout|run|exercise|fitness/.test(combined))    tags.push(['Active','💪']);
  if (/friends|social|people|talk/.test(combined))          tags.push(['Social','🫂']);
  if (/goal|plan|achieve|complete/.test(combined))          tags.push(['Goal-driven','🎯']);
  if (/sleep|rest|relax/.test(combined))                    tags.push(['Recharger','🌙']);
  if (/morning|routine|habit/.test(combined))               tags.push(['Routine-builder','⏰']);

  if (tags.length === 0) {
    el.innerHTML = `<div class="insight-empty">Keep using the app to reveal your patterns ✨</div>`;
    return;
  }

  el.innerHTML = tags.map(([label, icon]) => `
    <div class="insight-tag">
      <span class="it-label">${icon} Trait</span>
      <span class="it-value">${label}</span>
    </div>`).join('') +
    `<div class="insight-tag">
      <span class="it-label">📊 Data</span>
      <span class="it-value">${totalInteractions} interactions tracked</span>
    </div>`;
}

function renderProfileStats() {
  const grid = document.getElementById('profileStatsGrid');
  if (!grid) return;
  const totalTasks     = state.homeTasks.length + state.tasks.length;
  const completedTasks = state.homeTasks.filter(t=>t.done).length + state.tasks.filter(t=>t.done).length;
  const totalGoals     = state.homeGoals.length + state.goals.length;
  grid.innerHTML = [
    [state.streak,              'Day streak'],
    [completedTasks,            'Tasks done'],
    [totalGoals,                'Active goals'],
    [state.proudHistory.length, 'Proud entries'],
    [state.pqAnswers.length,    'Q\'s answered'],
    [Object.keys(state.dailyPhotos).length, 'Daily photos'],
  ].map(([num,lbl])=>`
    <div class="profile-stat-item">
      <div class="psi-num">${num}</div>
      <div class="psi-lbl">${lbl}</div>
    </div>`).join('');
}

function saveProfile() {
  state.profile.name     = document.getElementById('profileName').value.trim() || state.profile.name;
  state.profile.pronouns = document.getElementById('profilePronouns').value.trim();
  state.profile.bio      = document.getElementById('profileBio').value.trim();
  save();
  // Refresh displays
  document.getElementById('profileNameDisplay').textContent = state.profile.name || '—';
  ['avatarInitial','homeAvatarInitial','profilePhotoInitial'].forEach(id => {
    const e = document.getElementById(id);
    if (e && !state.profile.photo) e.textContent = (state.profile.name||'U')[0].toUpperCase();
  });
  // Small confirmation
  const btn = document.querySelector('#profile .btn-primary');
  if (btn) { btn.textContent = 'Saved ✓'; setTimeout(() => btn.textContent = 'Save changes', 1500); }
}

function setProfilePhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    state.profile.photo = e.target.result;
    save();
    initAppUI();
  };
  reader.readAsDataURL(file);
}

function updateProfileName(val) {
  // Live preview
  document.getElementById('profileNameDisplay').textContent = val || '—';
}



// SECTION 14: INIT — decide what to show first


function setPhoto(input) { setProfilePhoto(input); }

// On load: check if onboarded
if (!state.profile.onboarded) {
  // First visit — show onboarding
  document.getElementById('onboarding').classList.remove('hidden');
  // Spawn particles in onboarding background
  const obPart = document.getElementById('ob-particles');
  if (obPart) {
    for (let i = 0; i < 30; i++) {
      const dot = document.createElement('div');
      dot.className = 'particle';
      dot.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*4}s;animation-duration:${3+Math.random()*4}s;`;
      obPart.appendChild(dot);
    }
  }
} else {
  // Returning user — apply their theme, show landing
  applyTheme(state.profile.theme || 'nonchalant');
  showLanding();
}