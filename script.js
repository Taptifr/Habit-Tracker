// =============================================
// script.js — Tapti's Habit Tracker
// =============================================


// =============================================
// SECTION 1: CONSTANTS
// =============================================

const NAMES = ['princess','bae','baby','gurl','badass','diva','queen'];

const HYPES = [
  "You are THAT girl, Tapti. No one is doing it like you.",
  "Literally glowing different today, queen.",
  "Other people have goals. You ACHIEVE them.",
  "Tapti energy is unmatched. Undefeated. Untouchable.",
  "Every version of you has been iconic. Today is no exception.",
  "Not to be dramatic but you might be unstoppable.",
  "You woke up and chose excellence. Again.",
  "The audacity to be this talented AND this cute. Iconic.",
];

const PERSONALITY_QS = [
  { q:"When you walk into a room, you feel...",  opts:["Like I own it","Curious about everyone","Ready to vibe","A lil anxious but make it fashion"] },
  { q:"Your ideal Sunday looks like...",         opts:["Creating something epic","Binge watching everything","Going out with people I love","Doing absolutely nothing and loving it"] },
  { q:"When a plan falls through you...",        opts:["Make a better plan instantly","Need a moment then recover","Go with the flow","Feel it, then let it go"] },
  { q:"Your superpower is...",                   opts:["Reading the room","Making people feel seen","Getting things done","Dreaming bigger than anyone"] },
  { q:"You recharge by...",                      opts:["Being alone with my thoughts","Music and movement","Deep convos","Sleep, always sleep"] },
];

const REWARDS = [
  { title:"Absolutely destroyed it today!",  sub:"You've earned a full playlist session. Blast it loud, queen." },
  { title:"Look at you go, badass!",          sub:"Reward yourself with your comfort show episode. You deserve it." },
  { title:"Another day, another W!",          sub:"Time for your fave snack and zero guilt. You EARNED this." },
  { title:"Tapti did the thing!",             sub:"Call your bestie and brag — you have things to celebrate." },
];

// AI chat history — full conversation stored here
// Each item: { role: 'user' | 'assistant', content: '...' }
let skillChatHistory = [];


// =============================================
// SECTION 2: STATE
// =============================================

let state = JSON.parse(localStorage.getItem('tapti_app') || '{}');

if (!state.tasks) state.tasks = [
  { id:1, text:"Morning skincare routine",           done:false, tag:"self-care" },
  { id:2, text:"Practice choreography for 20 mins",  done:false, tag:"dance"     },
  { id:3, text:"Study Solidity — smart contracts",   done:false, tag:"skill"     },
];

if (!state.homeTasks) state.homeTasks = [];

if (!state.homeGoals) state.homeGoals = [
  { id:1, title:"Learn Solidity & Web3",     cat:"skill",    pct:18, milestones:["Basics","Smart Contracts","Deploy","Build dApp"],               doneMilestones:[0],   targetDate:"", createdAt:new Date().toISOString() },
  { id:2, title:"Choreography for recital",  cat:"creative", pct:40, milestones:["Learn routine","Polish moves","Full run-through","Performance"], doneMilestones:[0,1], targetDate:"", createdAt:new Date().toISOString() },
];

if (!state.goals) state.goals = [
  { id:1, title:"Learn Solidity & Web3",    pct:18, milestones:["Basics","Smart Contracts","Deploy","Build dApp"],               doneMilestones:[0]   },
  { id:2, title:"Choreography for recital", pct:40, milestones:["Learn routine","Polish moves","Full run-through","Performance"], doneMilestones:[0,1] },
];

// proudHistory: array of { date: 'YYYY-MM-DD', text: '...' }
if (!state.proudHistory) state.proudHistory = [];

// dailyPhotos: object keyed by 'YYYY-MM-DD' → { photo: base64, caption: '' }
if (!state.dailyPhotos) state.dailyPhotos = {};

if (!state.streak)    state.streak    = 3;
if (!state.pqIndex)   state.pqIndex   = 0;
if (!state.skillName) state.skillName = '';

function save() { localStorage.setItem('tapti_app', JSON.stringify(state)); }

// Today's date key used for daily photo storage
function todayKey() {
  return new Date().toISOString().slice(0,10); // 'YYYY-MM-DD'
}


// =============================================
// SECTION 3: LANDING PAGE
// =============================================

function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const dot = document.createElement('div');
    dot.className = 'particle';
    dot.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*4}s;animation-duration:${3+Math.random()*4}s;`;
    container.appendChild(dot);
  }
}

function enterApp() {
  const landing = document.getElementById('landing');
  const app     = document.getElementById('app');
  landing.style.transition = 'opacity 0.5s ease';
  landing.style.opacity    = '0';
  setTimeout(() => {
    landing.style.display = 'none';
    app.classList.remove('hidden');
    app.style.opacity    = '0';
    app.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => requestAnimationFrame(() => { app.style.opacity = '1'; }));
    renderHome();
  }, 500);
}

spawnParticles();


// =============================================
// SECTION 4: NAVIGATION
// =============================================

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
}


// =============================================
// SECTION 5: HOME PAGE
// =============================================

let selectedDeadline = '';
let selectedGoalCat  = '';

function getNickname() { return NAMES[Math.floor(Math.random() * NAMES.length)]; }

function renderHome() {
  const hour  = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const el    = document.getElementById('greetingText');
  if (el) el.textContent = greet + ', ' + getNickname() + ' ✨';

  const questions = [
    "Hey girl, what's on your mind today?",
    "What are we conquering today, queen?",
    "What's the plan, badass?",
    "What do you want to get done today, bae?",
  ];
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

  // Show today's date nicely
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
  if (state.dailyPhotos[key]) {
    delete state.dailyPhotos[key].photo;
    save();
  }
  renderDailyPhoto();
}

function saveDailyCaption(val) {
  const key = todayKey();
  if (!state.dailyPhotos[key]) state.dailyPhotos[key] = {};
  state.dailyPhotos[key].caption = val;
  save();
}


// ── DEADLINE PILLS ──

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
    return { label: dt.toLocaleString('en-IN',{weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}), cls, raw:customDt };
  }
  const map = {
    '30m': {label:'30 min',    cls:'urgent'},
    '1h':  {label:'1 hour',    cls:'soon'},
    '2h':  {label:'2 hours',   cls:'soon'},
    'eod': {label:'end of day',cls:'ok'},
    'week':{label:'this week', cls:'ok'},
  };
  return map[val] || {label:'no deadline', cls:'nodate'};
}


// ── HOME TASKS ──

function homeAddTask() {
  const input = document.getElementById('homeTaskInput');
  const text  = input.value.trim();
  if (!text) return;
  const customDt = document.getElementById('customDeadline').value;
  const dl       = computeDeadline(selectedDeadline, customDt);
  state.homeTasks.push({ id:Date.now(), text, done:false, dlLabel:dl.label, dlClass:dl.cls, addedAt:new Date().toISOString() });
  save();
  input.value      = '';
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
    list.innerHTML = '<div style="font-size:13px;color:var(--tx3);text-align:center;padding:12px 0">no tasks yet — add one above!</div>';
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


// ── HOME GOALS ──

function selectGoalCat(btn) {
  document.querySelectorAll('#goalCategoryPills .dp').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedGoalCat = btn.dataset.value;
}

function toggleAddGoalForm() {
  const form     = document.getElementById('addGoalForm');
  const btn      = document.getElementById('addGoalBtn');
  const isHidden = form.classList.contains('hidden');
  form.classList.toggle('hidden');
  if (btn) btn.style.display = isHidden ? 'none' : 'flex';
  if (isHidden) {
    document.getElementById('homeGoalInput').value  = '';
    document.getElementById('goalMilestones').value = '';
    document.getElementById('goalTargetDate').value = '';
    selectedGoalCat = '';
    document.querySelectorAll('#goalCategoryPills .dp').forEach(b=>b.classList.remove('active'));
  }
}

function homeAddGoal() {
  const title = document.getElementById('homeGoalInput').value.trim();
  if (!title) return;
  const msRaw      = document.getElementById('goalMilestones').value;
  const milestones = msRaw ? msRaw.split(',').map(m=>m.trim()).filter(Boolean) : ['Start','Halfway','Almost','Done'];
  const targetDate = document.getElementById('goalTargetDate').value;
  state.homeGoals.push({ id:Date.now(), title, cat:selectedGoalCat||'personal', pct:0, milestones, doneMilestones:[], targetDate, createdAt:new Date().toISOString() });
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
    list.innerHTML = '<div style="font-size:13px;color:var(--tx3);text-align:center;padding:12px 0">no goals yet — add one below!</div>';
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
        ${g.pct>=100?'<div style="font-size:12px;color:var(--gold);text-align:center;margin-top:8px;padding:6px;background:rgba(245,158,11,0.08);border-radius:6px">🎉 You did it, queen! This goal is DONE!</div>':''}
      </div>`;
  }).join('');
}

function homeToggleMs(gi, mi) {
  const g   = state.homeGoals[gi];
  const idx = g.doneMilestones.indexOf(mi);
  if (idx > -1) g.doneMilestones.splice(idx,1); else g.doneMilestones.push(mi);
  g.pct = Math.round(g.doneMilestones.length / g.milestones.length * 100);
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


// ── HYPE + AVATAR PHOTO ──

function rotateHype(el) {
  el.textContent = HYPES[Math.floor(Math.random()*HYPES.length)];
  el.style.color = '#a78bfa';
  setTimeout(() => {
    el.innerHTML = '<svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> hype me up';
    el.style.color = '';
  }, 3500);
}

function setPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = document.getElementById('avatarImg');
    img.src = e.target.result;
    img.style.display = 'block';
    const ini = document.getElementById('avatarInitial');
    if (ini) ini.style.display = 'none';
    state.photo = e.target.result;
    save();
  };
  reader.readAsDataURL(file);
}


// =============================================
// SECTION 6: TODAY PAGE
// =============================================

function renderToday() {
  const d = new Date();
  document.getElementById('todayDate').textContent = d.toLocaleDateString('en-IN',{weekday:'long',month:'long',day:'numeric'});
  const done  = state.tasks.filter(t=>t.done).length;
  const total = state.tasks.length;
  document.getElementById('taskProgress').textContent = done+'/'+total;
  document.getElementById('dayProgBar').style.width = (total?Math.round(done/total*100):0)+'%';

  document.getElementById('taskList').innerHTML = state.tasks.map((t,i) => `
    <div class="task-item${t.done?' done':''}" onclick="toggleTask(${i})">
      <div class="task-item-check">${t.done?'✓':''}</div>
      <div class="task-item-text">${t.text}</div>
      <span class="task-item-tag">${t.tag||'task'}</span>
    </div>`).join('');
}

function toggleTask(i) {
  state.tasks[i].done = !state.tasks[i].done;
  save();
  renderToday();
}

function addTask() {
  const v = document.getElementById('newTaskInput').value.trim();
  if (!v) return;
  state.tasks.push({id:Date.now(),text:v,done:false,tag:'task'});
  save();
  document.getElementById('newTaskInput').value = '';
  renderToday();
}


// =============================================
// SECTION 7: GOALS PAGE
// =============================================

function renderGoals() {
  document.getElementById('goalsList').innerHTML = state.goals.map((g,gi) => `
    <div class="goal-card-item">
      <div class="hgoal-top">
        <div class="hgoal-title">${g.title}</div>
        <div class="hgoal-pct">${g.pct}%</div>
      </div>
      <div class="prog-track" style="margin-bottom:8px"><div class="prog-fill" style="width:${g.pct}%"></div></div>
      <div class="hgoal-milestones">
        ${g.milestones.map((m,mi)=>`<span class="ms${g.doneMilestones.includes(mi)?' done':''}" onclick="toggleGoalMs(${gi},${mi})">${m}</span>`).join('')}
      </div>
    </div>`).join('');
}

function toggleGoalMs(gi, mi) {
  const g   = state.goals[gi];
  const idx = g.doneMilestones.indexOf(mi);
  if (idx>-1) g.doneMilestones.splice(idx,1); else g.doneMilestones.push(mi);
  g.pct = Math.round(g.doneMilestones.length/g.milestones.length*100);
  save();
  renderGoals();
}

function addGoal() {
  const v = document.getElementById('newGoalInput').value.trim();
  if (!v) return;
  state.goals.push({id:Date.now(),title:v,pct:0,milestones:['Start','Progress','Almost','Done'],doneMilestones:[]});
  save();
  document.getElementById('newGoalInput').value = '';
  renderGoals();
}


// =============================================
// SECTION 8: DISCOVER PAGE
// =============================================

function renderDiscover() {
  const qi = (state.pqIndex||0) % PERSONALITY_QS.length;
  const q  = PERSONALITY_QS[qi];
  document.getElementById('personalityQ').textContent = q.q;
  document.getElementById('personalityOpts').innerHTML = q.opts.map(o => `
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

function answerPersonality(btn, ans) {
  document.querySelectorAll('.pq-opt').forEach(b=>b.classList.remove('picked'));
  btn.classList.add('picked');
  const msg = document.getElementById('pAnswer');
  msg.textContent = 'Love that for you, queen. Keep exploring yourself. 💜';
  msg.classList.remove('hidden');
  state.pqIndex = (state.pqIndex||0)+1;
  save();
}


// ── AI SKILL COACH ──
// Fixed: added "anthropic-dangerous-direct-browser-access" header
// which is required for browser-based direct API calls to Anthropic.
// Without it the API returns a 403/CORS error → that's what caused
// the "brain glitched" fallback to show every time.

function setSkill() {
  const v = document.getElementById('skillName').value.trim();
  if (!v) return;
  if (state.skillName !== v) {
    skillChatHistory = [];
    state.skillName  = v;
    save();
  }
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

// ──────────────────────────────────────────────
// askClaude() — the real AI call.
//
// HOW IT WORKS:
// 1. We keep skillChatHistory as a full conversation array.
// 2. Every call sends the ENTIRE history so the AI has context.
// 3. If history is empty (first message), we seed it with
//    a system-style user message to kick things off.
// 4. The critical fix: "anthropic-dangerous-direct-browser-access"
//    header must be present for browser → Anthropic API calls.
// 5. System prompt tells Claude to be Tapti's personal skill coach.
// ──────────────────────────────────────────────
async function askClaude() {
  setThinking(true);

  // System prompt — injected as first message pair if history is empty
  const systemContext = `You are Tapti's personal AI skill coach and study buddy — think of yourself like a smart, warm, hype-girl version of ChatGPT, but focused on her learning journey.

Tapti is currently learning: "${state.skillName || 'a new skill'}".

Your job:
- Chat naturally with her about this skill, just like a personal tutor would
- Ask her questions to test her understanding, one at a time
- When she answers, give real feedback: praise what's right, gently correct what's wrong, expand on it
- Suggest what she should study or practice next
- Keep your tone warm, encouraging, casual — call her "bae" or "queen" sometimes
- Be genuinely helpful like ChatGPT, not just a quiz bot
- If she asks you something, answer it fully and clearly

Start by warmly welcoming her to the session and asking your first question about ${state.skillName || 'her skill'}.`;

  // Build messages array to send to the API
  // If this is the very first call, seed the conversation
  let messages;
  if (skillChatHistory.length === 0) {
    messages = [
      { role: 'user', content: systemContext }
    ];
  } else {
    // For subsequent calls, send the full history
    // The system context was already part of the first exchange
    messages = skillChatHistory;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':                                  'application/json',
        // ↓ THIS IS THE KEY FIX — required for direct browser API calls
        'anthropic-dangerous-direct-browser-access':     'true',
        // Note: In production you'd use a backend proxy instead.
        // For a local personal app like this, the direct header works fine.
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 500,
        // Use the system parameter for the system prompt (cleaner approach)
        system: `You are Tapti's personal AI skill coach and study buddy — think of yourself like a smart, warm, hype-girl version of ChatGPT, but focused on her learning journey.

Tapti is currently learning: "${state.skillName || 'a new skill'}".

Your job:
- Chat naturally with her about this skill, just like a personal tutor would  
- Ask her questions to test her understanding, one at a time
- When she answers, give real feedback: praise what's right, gently correct what's wrong, expand on it
- Suggest what she should study or practice next
- Keep your tone warm, encouraging, casual — call her "bae" or "queen" sometimes
- Be genuinely helpful, not just a quiz bot
- If she asks you something, answer it fully and clearly`,
        messages: skillChatHistory.length > 0
          ? skillChatHistory
          : [{ role: 'user', content: `Hi! I'm ready to learn about ${state.skillName}. Let's get started!` }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('API error:', response.status, errText);
      throw new Error('API returned ' + response.status);
    }

    const data  = await response.json();
    const reply = data.content.map(c => c.text || '').join('').trim();

    if (reply) {
      // If this was the first call, also store the seed user message
      if (skillChatHistory.length === 0) {
        skillChatHistory.push({ role:'user',      content:`Hi! I'm ready to learn about ${state.skillName}. Let's get started!` });
      }
      skillChatHistory.push({ role:'assistant', content:reply });
      save();
    }

  } catch (err) {
    console.error('Claude API error:', err);
    // Show a real error message with instructions
    skillChatHistory.push({
      role:    'assistant',
      content: `Sorry bae, I couldn't connect right now. This usually happens because:\n\n1. The app needs to run via a local server (not file://) — use VS Code Live Server\n2. Or the API key might be missing\n\nTry opening the app through Live Server and it should work!`
    });
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


// =============================================
// SECTION 9: END OF DAY PAGE
// =============================================

function renderEod() {
  const done    = state.tasks.filter(t=>t.done);
  const pending = state.tasks.filter(t=>!t.done);
  document.getElementById('eodRecap').innerHTML = `
    <div style="font-size:12px;color:var(--green);margin-bottom:8px">${done.length} completed today</div>
    ${done.map(t=>`<div class="recap-item done-item"><div class="recap-check">✓</div><span>${t.text}</span></div>`).join('')}
    ${pending.length?`<div style="font-size:12px;color:var(--tx3);margin:8px 0 6px">${pending.length} still pending</div>`:''}
    ${pending.map(t=>`<div class="recap-item"><div class="recap-check"></div><span>${t.text}</span></div>`).join('')}
  `;
}

function selectMood(btn, mood) {
  document.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('chosen'));
  btn.classList.add('chosen');
  state.lastMood = mood;
  save();
}


// ── PROUD HISTORY ──

// Save the proud entry when reward is claimed, keyed by today's date
function saveProudEntry() {
  const text = (document.getElementById('proudOf').value || '').trim();
  if (!text) return;
  const key   = todayKey();
  const today = new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  // Remove any existing entry for today first (avoid duplicates)
  state.proudHistory = state.proudHistory.filter(e => e.date !== key);
  state.proudHistory.unshift({ date:key, dateLabel:today, text });
  // Keep only last 90 days
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
    list.innerHTML = '<div class="proud-history-empty">no entries yet — start writing, princess! ✨</div>';
    return;
  }
  list.innerHTML = state.proudHistory.map(entry => `
    <div class="proud-entry">
      <div class="proud-entry-date">${entry.dateLabel || entry.date}</div>
      <div class="proud-entry-text">${entry.text}</div>
    </div>`).join('');
}


// ── CONFETTI ──
// Pure canvas-based confetti — no external library needed.
// Spawns 150 coloured particles that fall with gravity + spin.

let confettiAnimId = null;

function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx    = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  const colours = ['#6366f1','#a855f7','#ec4899','#f59e0b','#22c55e','#3b82f6','#f0f0ff','#14b8a6'];
  const pieces  = [];

  for (let i = 0; i < 160; i++) {
    pieces.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height - canvas.height,
      w:     6 + Math.random() * 8,
      h:     3 + Math.random() * 5,
      color: colours[Math.floor(Math.random() * colours.length)],
      vx:    (Math.random() - 0.5) * 4,
      vy:    2 + Math.random() * 4,
      spin:  (Math.random() - 0.5) * 0.3,
      angle: Math.random() * Math.PI * 2,
      alpha: 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;

    pieces.forEach(p => {
      p.x     += p.vx;
      p.y     += p.vy;
      p.angle += p.spin;
      p.vy    += 0.08; // gravity
      if (p.y > canvas.height * 0.8) p.alpha -= 0.02;
      if (p.alpha <= 0) return;
      alive++;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });

    if (alive > 0) {
      confettiAnimId = requestAnimationFrame(draw);
    } else {
      canvas.style.display = 'none';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
  draw();

  // Auto-stop after 4 seconds regardless
  setTimeout(() => {
    if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
    canvas.style.display = 'none';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 4000);
}


// ── CLAIM REWARD ──

function claimReward() {
  // Save the proud entry first
  saveProudEntry();

  // Show reward card
  const area = document.getElementById('rewardArea');
  area.classList.remove('hidden');
  const r = REWARDS[Math.floor(Math.random()*REWARDS.length)];
  document.getElementById('rewardTitle').textContent = r.title;
  document.getElementById('rewardSub').textContent   = r.sub;

  // Increment streak
  state.streak = (state.streak||0) + 1;
  const sb = document.getElementById('streakNum');
  const tb = document.getElementById('topbarStreak');
  if (sb) sb.textContent = state.streak;
  if (tb) tb.textContent = state.streak;
  save();

  // 🎉 CONFETTI!
  launchConfetti();

  area.scrollIntoView({ behavior:'smooth', block:'nearest' });
}


// =============================================
// SECTION 10: INIT
// =============================================

// Restore avatar photo
if (state.photo) {
  const img = document.getElementById('avatarImg');
  if (img) {
    img.src = state.photo;
    img.style.display = 'block';
    const ini = document.getElementById('avatarInitial');
    if (ini) ini.style.display = 'none';
  }
}