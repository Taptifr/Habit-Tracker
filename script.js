// =============================================
// script.js
// All the logic and behaviour for Tapti's Hype Tracker
//
// This file controls: what happens when you click
// things, how data is saved and loaded, how pages
// switch, how tasks/goals update, and all the
// hype messages and quiz questions.
// =============================================
 
 
// =============================================
// SECTION 1: DATA — all text content for the app
// These are constant arrays — they never change
// =============================================
 
// All the nicknames for Tapti — one is randomly
// picked each time the greeting is shown
const NAMES = ['princess', 'bae', 'baby', 'gurl', 'badass', 'diva', 'queen'];
 
// Hype messages shown when the hype pill is tapped
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
 
// Personality discovery questions for the Discover tab
// Each has a question (q) and 4 answer options (opts)
const PERSONALITY_QS = [
  {
    q: "When you walk into a room, you feel...",
    opts: ["Like I own it", "Curious about everyone", "Ready to vibe", "A lil anxious but make it fashion"]
  },
  {
    q: "Your ideal Sunday looks like...",
    opts: ["Creating something epic", "Binge watching everything", "Going out with people I love", "Doing absolutely nothing and loving it"]
  },
  {
    q: "When a plan falls through you...",
    opts: ["Make a better plan instantly", "Need a moment then recover", "Go with the flow", "Feel it, then let it go"]
  },
  {
    q: "Your superpower is...",
    opts: ["Reading the room", "Making people feel seen", "Getting things done", "Dreaming bigger than anyone"]
  },
  {
    q: "You recharge by...",
    opts: ["Being alone with my thoughts", "Music and movement", "Deep convos", "Sleep, always sleep"]
  },
];
 
// =============================================
// AI SKILL QUIZ — conversation history
// We keep the full back-and-forth with Claude
// so it remembers what was asked before and
// builds on your answers intelligently.
// Each entry is { role: 'user'|'assistant', content: '...' }
// =============================================
let skillChatHistory = [];
 
// End-of-day reward messages — one is randomly picked
// when you tap "claim your reward"
const REWARDS = [
  {
    title: "Absolutely destroyed it today!",
    sub: "You've earned a full playlist session. Blast it loud, queen."
  },
  {
    title: "Look at you go, badass!",
    sub: "Reward yourself with your comfort show episode. You deserve it."
  },
  {
    title: "Another day, another W!",
    sub: "Time for your fave snack and zero guilt. You EARNED this."
  },
  {
    title: "Tapti did the thing!",
    sub: "Call your bestie and brag — you have things to celebrate."
  },
];
 
 
// =============================================
// SECTION 2: STATE — the app's live data
//
// "state" is a JavaScript object that holds
// everything: your tasks, goals, streak, skill,
// photo, answers — all of it.
//
// We try to load it from localStorage first.
// If nothing is saved yet, we use defaults.
// =============================================
 
let state = JSON.parse(localStorage.getItem('tapti_app') || '{}');
 
// Default tasks shown when app is opened for the first time
if (!state.tasks) state.tasks = [
  { id: 1, text: "Morning skincare routine",            done: false, tag: "self-care" },
  { id: 2, text: "Practice choreography for 20 mins",  done: false, tag: "dance"     },
  { id: 3, text: "Study Solidity — smart contracts",   done: false, tag: "skill"     },
];
 
// Default long-term goals
if (!state.goals) state.goals = [
  {
    id: 1,
    title: "Learn Solidity & Web3",
    pct: 18,
    milestones: ["Basics", "Smart Contracts", "Deploy", "Build dApp"],
    doneMilestones: [0]          // index 0 = "Basics" is already done
  },
  {
    id: 2,
    title: "Choreography for recital",
    pct: 40,
    milestones: ["Learn routine", "Polish moves", "Full run-through", "Performance"],
    doneMilestones: [0, 1]       // first two milestones done
  },
];
 
if (!state.streak)    state.streak    = 3;    // start with a 3-day streak
if (!state.pqIndex)   state.pqIndex   = 0;    // which personality question is next
if (!state.skillName) state.skillName = '';   // no skill set yet
 
 
// =============================================
// SECTION 3: SAVE FUNCTION
//
// Called whenever state changes.
// Converts the state object to a JSON string
// and saves it in the browser's localStorage.
// =============================================
 
function save() {
  localStorage.setItem('tapti_app', JSON.stringify(state));
}
 
 
// =============================================
// SECTION 4: NAVIGATION
//
// All 5 pages exist in the HTML at all times.
// This function hides all of them, then shows
// only the one you tapped. It also re-renders
// the content of that page every time you visit it.
// =============================================
 
function showPage(id, btn) {
  // Remove "active" from all pages and nav buttons
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'));
 
  // Show the selected page and highlight its nav button
  document.getElementById(id).classList.add('active');
  if (btn) btn.classList.add('active');
 
  // Re-render the correct page's content
  if (id === 'home')     renderHome();
  if (id === 'today')    renderToday();
  if (id === 'goals')    renderGoals();
  if (id === 'discover') renderDiscover();
  if (id === 'eod')      renderEod();
}
 
 
// =============================================
// SECTION 5: HOME PAGE
// =============================================
 
// Returns a random nickname from the NAMES array
function getNickname() {
  return NAMES[Math.floor(Math.random() * NAMES.length)];
}
 
// Builds the home page content fresh each time you visit
function renderHome() {
  // Greet based on time of day
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const nick = getNickname();
  document.getElementById('greetingText').textContent = greet + ', ' + nick + ' ✨';
 
  // Update the 3 stat numbers
  document.getElementById('streakNum').textContent       = state.streak;
  document.getElementById('completedToday').textContent  = state.tasks.filter(t => t.done).length;
  document.getElementById('totalGoals').textContent      = state.goals.length;
 
  // Show the first 2 pending tasks as a preview
  const preview = document.getElementById('todayPreview');
  const pending  = state.tasks.filter(t => !t.done).slice(0, 2);
  preview.innerHTML = pending.map(t => `
    <div class="task-card">
      <div class="task-check"></div>
      <div class="task-text">${t.text}</div>
      <span class="task-tag">${t.tag || 'task'}</span>
    </div>
  `).join('');
}
 
// Shows a random hype message when the pill is tapped,
// then resets back to "tap for a hype hit" after 3.5s
function rotateHype(el) {
  el.textContent  = HYPES[Math.floor(Math.random() * HYPES.length)];
  el.style.color  = 'var(--accent2)';
  setTimeout(() => {
    el.textContent = 'tap for a hype hit';
    el.style.color = 'var(--accent)';
  }, 3500);
}
 
// Called when a photo file is selected.
// FileReader converts the image to a base64 string
// so it can be stored in localStorage as text.
function setPhoto(input) {
  const file = input.files[0];
  if (!file) return;
 
  const reader = new FileReader();
  reader.onload = e => {
    // Show the image in the avatar circle
    const img = document.getElementById('avatarImg');
    img.src           = e.target.result;
    img.style.display = 'block';
    document.getElementById('avatarPlaceholder').style.display = 'none';
 
    // Save the base64 string so it persists on refresh
    state.photo = e.target.result;
    save();
  };
  reader.readAsDataURL(file);   // this triggers reader.onload above
}
 
 
// =============================================
// SECTION 6: TODAY PAGE
// =============================================
 
function renderToday() {
  // Show today's full date (e.g. "Tuesday, 14 April")
  const d = new Date();
  document.getElementById('todayDate').textContent = d.toLocaleDateString('en-IN', {
    weekday: 'long', month: 'long', day: 'numeric'
  });
 
  // Calculate how many tasks are done vs total
  const done  = state.tasks.filter(t => t.done).length;
  const total = state.tasks.length;
 
  // Update progress text ("2 / 3 done")
  document.getElementById('taskProgress').textContent =
    done + ' / ' + total + ' done';
 
  // Update the progress bar width as a percentage
  document.getElementById('dayProgBar').style.width =
    (total ? Math.round(done / total * 100) : 0) + '%';
 
  // Render each task as a clickable card
  // We use .map() to convert each task object into an HTML string
  // then .join('') to combine them all into one string
  const list = document.getElementById('taskList');
  list.innerHTML = state.tasks.map((t, i) => `
    <div class="task-card${t.done ? ' done' : ''}" onclick="toggleTask(${i})">
      <div class="task-check">
        ${t.done
          ? '<svg width="12" height="12" fill="none" stroke="#0d0b1a" stroke-width="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>'
          : ''}
      </div>
      <div class="task-text">${t.text}</div>
      <span class="task-tag">${t.tag || 'task'}</span>
    </div>
  `).join('');
}
 
// Flips a task between done and not done when clicked
// The ! (not) operator reverses a true/false value
function toggleTask(i) {
  state.tasks[i].done = !state.tasks[i].done;
  save();
  renderToday();
  // Also update the "done today" count on the home page
  document.getElementById('completedToday').textContent =
    state.tasks.filter(t => t.done).length;
}
 
// Adds a brand new task from the text input
function addTask() {
  const v = document.getElementById('newTaskInput').value.trim();
  if (!v) return;                // do nothing if input is empty
 
  state.tasks.push({
    id:   Date.now(),            // unique ID using current timestamp
    text: v,
    done: false,
    tag:  'task'
  });
  save();
  document.getElementById('newTaskInput').value = '';  // clear the input
  renderToday();
}
 
 
// =============================================
// SECTION 7: GOALS PAGE
// =============================================
 
function renderGoals() {
  const gl = document.getElementById('goalsList');
 
  // Build each goal card with its milestone pills
  gl.innerHTML = state.goals.map((g, gi) => `
    <div class="goal-card">
      <div class="goal-header">
        <div class="goal-title">${g.title}</div>
        <div class="goal-pct">${g.pct}%</div>
      </div>
      <div class="prog-bar-wrap">
        <div class="prog-bar" style="width:${g.pct}%"></div>
      </div>
      <div class="goal-meta">milestones</div>
      <div class="milestone-row">
        ${g.milestones.map((m, mi) => `
          <span class="milestone${g.doneMilestones.includes(mi) ? ' done' : ''}"
                onclick="toggleMilestone(${gi}, ${mi})">
            ${m}
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');
}
 
// Marks a milestone as done or un-done when clicked
function toggleMilestone(gi, mi) {
  const g   = state.goals[gi];
  const idx = g.doneMilestones.indexOf(mi);
 
  if (idx > -1) {
    g.doneMilestones.splice(idx, 1);  // remove from done list
  } else {
    g.doneMilestones.push(mi);         // add to done list
  }
 
  // Recalculate the percentage based on done milestones
  g.pct = Math.round(g.doneMilestones.length / g.milestones.length * 100);
  save();
  renderGoals();
}
 
// Adds a brand new long-term goal
function addGoal() {
  const v = document.getElementById('newGoalInput').value.trim();
  if (!v) return;
 
  state.goals.push({
    id:             Date.now(),
    title:          v,
    pct:            0,
    milestones:     ['Start', 'Progress', 'Almost', 'Done'],  // default milestones
    doneMilestones: []
  });
  save();
  document.getElementById('newGoalInput').value = '';
  document.getElementById('totalGoals').textContent = state.goals.length;
  renderGoals();
}
 
 
// =============================================
// SECTION 8: DISCOVER PAGE
// =============================================
 
function renderDiscover() {
  // Pick the next personality question in rotation
  // The % (modulo) operator wraps back to 0 when we reach the end
  const qi = (state.pqIndex || 0) % PERSONALITY_QS.length;
  const q  = PERSONALITY_QS[qi];
 
  document.getElementById('personalityQ').textContent = q.q;
 
  // Render each answer as a clickable button
  const opts = document.getElementById('personalityOpts');
  opts.innerHTML = q.opts.map(o => `
    <button class="quiz-opt" onclick="answerPersonality(this, '${o.replace(/'/g, "&#39;")}')">
      ${o}
    </button>
  `).join('');
 
  document.getElementById('pAnswer').classList.remove('show');
 
  // If a skill is already saved, pre-fill the input,
  // show the quiz area, show the reset button, and
  // render whatever conversation history exists
  if (state.skillName) {
    document.getElementById('skillName').value = state.skillName;
    document.getElementById('skillQuizArea').classList.remove('hidden');
    document.getElementById('skillResetBtn').classList.remove('hidden');
    renderSkillChat();
    // If no messages yet (e.g. first visit), kick off the first question
    if (skillChatHistory.length === 0) {
      askClaudeForQuestion();
    }
  }
}
 
// Called when a personality answer option is clicked
function answerPersonality(btn, ans) {
  // Remove "selected" from all options, then add it to the clicked one
  document.querySelectorAll('#personalityOpts .quiz-opt')
    .forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
 
  // Show the response message
  const msg = document.getElementById('pAnswer');
  msg.textContent = 'Love that for you, queen. Keep exploring yourself.';
  msg.classList.add('show');
 
  // Advance to the next question for next time
  state.pqIndex = (state.pqIndex || 0) + 1;
  save();
}
 
// =============================================
// SECTION 8b: AI SKILL QUIZ — Claude-powered
// =============================================
 
// Saves the skill name and kicks off the AI quiz
function setSkill() {
  const v = document.getElementById('skillName').value.trim();
  if (!v) return;
 
  // If the skill name changed, reset the conversation
  if (state.skillName !== v) {
    skillChatHistory = [];
    state.skillName  = v;
    save();
  }
 
  document.getElementById('skillQuizArea').classList.remove('hidden');
  document.getElementById('skillResetBtn').classList.remove('hidden');
  renderSkillChat();
 
  // If no conversation yet, ask Claude for the first question
  if (skillChatHistory.length === 0) {
    askClaudeForQuestion();
  }
}
 
// Renders all the chat bubbles from skillChatHistory
// Claude's messages = left-aligned purple
// Tapti's messages  = right-aligned dark
function renderSkillChat() {
  const box = document.getElementById('skillChatBox');
  if (!box) return;
 
  box.innerHTML = skillChatHistory.map(msg => {
    const isUser = msg.role === 'user';
    return `
      <div style="
        display: flex;
        justify-content: ${isUser ? 'flex-end' : 'flex-start'};
        margin-bottom: 10px;
      ">
        <div style="
          max-width: 82%;
          padding: 10px 14px;
          border-radius: ${isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px'};
          background: ${isUser ? 'rgba(192,132,252,0.2)' : 'var(--surface2)'};
          border: 1px solid ${isUser ? 'var(--accent)' : 'var(--border)'};
          font-size: 13px;
          color: var(--text);
          line-height: 1.5;
        ">
          ${msg.content}
        </div>
      </div>
    `;
  }).join('');
 
  // Auto-scroll to the latest message
  box.scrollTop = box.scrollHeight;
}
 
// Calls the Claude API to get the next question.
// Passes the full conversation history so Claude
// remembers everything that was said before and
// can ask smarter, more specific follow-up questions.
async function askClaudeForQuestion() {
  showSkillThinking(true);
 
  // The system prompt tells Claude exactly how to behave:
  // - What skill it's quizzing on
  // - The tone (hype, warm, Tapti-specific)
  // - The format (one question at a time, no lists)
  const systemPrompt = `You are a warm, hype-girl learning coach for Tapti, a young woman learning "${state.skillName}". 
Your job is to quiz her on what she's learning — ask ONE short, clear question at a time about ${state.skillName}.
Start simple and get progressively deeper based on her answers.
After she answers, give brief encouraging feedback (1-2 sentences, hype her up!), then ask your next question.
Keep questions practical and specific to ${state.skillName}.
Use casual, warm language. Call her "bae" or "queen" occasionally.
Never ask multiple questions at once. Never use bullet points or numbered lists.
If her answer shows confusion, gently clarify before moving on.`;
 
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 300,
        system:     systemPrompt,
        // Send the full conversation history every time
        // so Claude has full context of what was discussed
        messages:   skillChatHistory.length > 0
          ? skillChatHistory
          : [{ role: 'user', content: `I'm learning ${state.skillName}. Please ask me your first question to check my understanding.` }]
      })
    });
 
    const data  = await response.json();
    // Extract the text from Claude's response
    const reply = data.content.map(c => c.text || '').join('').trim();
 
    // Add Claude's question to the conversation history
    skillChatHistory.push({ role: 'assistant', content: reply });
    save();
 
  } catch (err) {
    // Show a friendly error if the API call fails
    skillChatHistory.push({
      role:    'assistant',
      content: 'Hmm, my brain glitched for a sec bae. Hit "next question" to try again!'
    });
  }
 
  showSkillThinking(false);
  renderSkillChat();
}
 
// Called when Tapti submits her answer to a question
async function submitSkillAnswer() {
  const input = document.getElementById('skillAnswerInput');
  const v     = input.value.trim();
  if (!v) return;
 
  // Add Tapti's answer to the conversation history
  skillChatHistory.push({ role: 'user', content: v });
  input.value = '';
  renderSkillChat();
  save();
 
  // Now ask Claude to respond to that answer + ask the next question
  await askClaudeForQuestion();
}
 
// Shows or hides the "Claude is thinking..." indicator
function showSkillThinking(show) {
  const el = document.getElementById('skillThinking');
  if (el) el.style.display = show ? 'flex' : 'none';
 
  // Disable the submit button while waiting
  const btn = document.getElementById('skillSubmitBtn');
  if (btn) btn.disabled = show;
}
 
// Clears the conversation and starts a fresh quiz session
function resetSkillChat() {
  skillChatHistory = [];
  save();
  renderSkillChat();
  askClaudeForQuestion();
}
 
 
// =============================================
// SECTION 9: END OF DAY PAGE
// =============================================
 
function renderEod() {
  const done    = state.tasks.filter(t =>  t.done);
  const pending = state.tasks.filter(t => !t.done);
  const recap   = document.getElementById('eodRecap');
 
  // Build the recap HTML showing done vs pending tasks
  recap.innerHTML = `
    <div style="font-size:13px;color:var(--green);margin-bottom:6px">
      ${done.length} completed today
    </div>
    ${done.map(t => `
      <div class="task-card done" style="cursor:default">
        <div class="task-check">
          <svg width="12" height="12" fill="none" stroke="#0d0b1a" stroke-width="3" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div class="task-text">${t.text}</div>
      </div>
    `).join('')}
    ${pending.length
      ? `<div style="font-size:13px;color:var(--muted);margin:8px 0 6px">
           ${pending.length} still pending (no stress, tomorrow is also a day)
         </div>`
      : ''}
    ${pending.map(t => `
      <div class="task-card" style="cursor:default">
        <div class="task-check"></div>
        <div class="task-text">${t.text}</div>
      </div>
    `).join('')}
  `;
}
 
// Highlights the selected mood emoji
function selectMood(btn, mood) {
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.lastMood = mood;
  save();
}
 
// Shows the reward card when "claim your reward" is clicked
function claimReward() {
  const area = document.getElementById('rewardArea');
  area.classList.remove('hidden');
 
  // Pick a random reward message
  const r = REWARDS[Math.floor(Math.random() * REWARDS.length)];
  document.getElementById('rewardTitle').textContent = r.title;
  document.getElementById('rewardSub').textContent   = r.sub;
 
  // Increment the day streak
  state.streak = (state.streak || 0) + 1;
  document.getElementById('streakNum').textContent = state.streak;
  save();
 
  // Smoothly scroll down to show the reward card
  area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
 
 
// =============================================
// SECTION 10: INITIALISATION
// Runs once when the page first loads
// =============================================
 
// If a photo was saved before, restore it immediately
if (state.photo) {
  const img = document.getElementById('avatarImg');
  img.src           = state.photo;
  img.style.display = 'block';
  document.getElementById('avatarPlaceholder').style.display = 'none';
}
 
// Render the home page as the starting view
renderHome();
 