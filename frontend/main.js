const TOKEN_KEY = 'tokenhaven_token';
const BASE_KEY = 'fastapi_base_url';

function getBaseUrl(){
  return localStorage.getItem(BASE_KEY) || 'http://127.0.0.1:8000';
}

function getToken(){
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token){
  if(token){ localStorage.setItem(TOKEN_KEY, token); }
  else{ localStorage.removeItem(TOKEN_KEY); }
}

async function request(path, options = {}){
  const res = await fetch(`${getBaseUrl()}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
  });
  const text = await res.text();
  try{ return { ok: res.ok, status: res.status, data: JSON.parse(text) }; }
  catch{ return { ok: res.ok, status: res.status, data: text }; }
}

function show(outEl, obj){
  outEl.textContent = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2);
}

document.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.getElementById('loginStatus');
  const logoutBtn = document.getElementById('logoutBtn');

  // Signup
  const signupForm = document.getElementById('signupForm');
  const signupMsg = document.getElementById('signupMsg');
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData(signupForm);
    const payload = {
      username: form.get('username'),
      email: form.get('email'),
      password: form.get('password'),
    };
    const res = await request('/signup', { method: 'POST', body: JSON.stringify(payload) });
    if(res.ok){
      signupMsg.textContent = 'Account created. You can now log in.';
      signupMsg.className = 'msg success';
      signupForm.reset();
    } else {
      signupMsg.textContent = res.data?.detail || 'Could not create account.';
      signupMsg.className = 'msg error';
    }
  });

  // Login
  const loginForm = document.getElementById('loginForm');
  const loginMsg = document.getElementById('loginMsg');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData(loginForm);
    const payload = {
      username: form.get('username'),
      password: form.get('password'),
    };
    const res = await request('/login', { method: 'POST', body: JSON.stringify(payload) });
    if(res.ok && res.data && res.data.access_token){
      setToken(res.data.access_token);
      window.location.href = 'PortfolioAyush.html';
      return;
    } else {
      loginMsg.textContent = res.data?.detail || 'Invalid username or password.';
      loginMsg.className = 'msg error';
    }
  });
  logoutBtn.addEventListener('click', () => { setToken(null); updateLoginState(); });

  // Protected
  const btnProtected = document.getElementById('btnProtected');
  const protectedMsg = document.getElementById('protectedMsg');
  btnProtected.addEventListener('click', async () => {
    const res = await request('/protected', { method: 'GET' });
    if(res.ok){
      protectedMsg.textContent = res.data?.message || 'Success.';
      protectedMsg.className = 'msg success';
    } else {
      protectedMsg.textContent = res.data?.detail || 'Please log in to view this.';
      protectedMsg.className = 'msg error';
    }
  });

  // Profile
  const btnProfile = document.getElementById('btnProfile');
  const profileMsg = document.getElementById('profileMsg');
  btnProfile.addEventListener('click', async () => {
    if(!getToken()){
      profileMsg.textContent = 'Please log in to view this.';
      profileMsg.className = 'msg error';
      return;
    }
    window.location.href = 'PortfolioAyush.html';
  });

  function updateLoginState(){
    const loggedIn = !!getToken();
    statusEl.textContent = loggedIn ? 'Logged in.' : 'Not logged in.';
    logoutBtn.hidden = !loggedIn;
    document.getElementById('btnProtected').disabled = !loggedIn;
    document.getElementById('btnProfile').disabled = !loggedIn;
  }

  updateLoginState();
});


