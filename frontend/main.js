const BASE_URL = 'http://127.0.0.1:8000';

// Simple redirect function
function redirectToDashboard() {
  window.location.href = 'dashboard.html';
}

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.applyTheme();
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
    this.updateThemeIcon();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  updateThemeIcon() {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
      icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }
}

// Loading Manager
class LoadingManager {
  static show() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.remove('hidden');
  }

  static hide() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.add('hidden');
  }
}

// Notification System
class NotificationManager {
  static show(element, message, type = 'info') {
    if (!element) return;
    
    element.textContent = message;
    element.className = `message ${type} fade-in`;
    
    // Auto-hide success messages
    if (type === 'success') {
      setTimeout(() => {
        element.textContent = '';
        element.className = 'message';
      }, 5000);
    }
  }

  static clear(element) {
    if (!element) return;
    element.textContent = '';
    element.className = 'message';
  }
}

// API Client
class ApiClient {
  static async request(path, options = {}) {
    try {
      LoadingManager.show();
      
      const url = `${BASE_URL}${path}`;
      if (!url.startsWith(BASE_URL)) {
        throw new Error('Invalid URL');
      }
      
      const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      });
      
      const text = await response.text();
      let data;
      
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = text;
      }
      
      return { ok: response.ok, status: response.status, data };
    } catch (error) {
      console.error('API Error:', error);
      return { ok: false, status: 0, data: { detail: 'Network error occurred' } };
    } finally {
      LoadingManager.hide();
    }
  }
}

// Auth Manager
class AuthManager {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
  }

  async checkAuthStatus() {
    const response = await ApiClient.request('/user/me');
    this.isAuthenticated = response.ok;
    this.user = response.ok ? response.data : null;
    this.updateUI();
    return this.isAuthenticated;
  }

  updateUI() {
    const statusEl = document.getElementById('loginStatus');
    const logoutBtn = document.getElementById('logoutBtn');
    const dashboard = document.getElementById('dashboard');
    const authSection = document.querySelector('.auth-section');
    const btnProtected = document.getElementById('btnProtected');
    const btnProfile = document.getElementById('btnProfile');
    
    if (statusEl) {
      statusEl.textContent = this.isAuthenticated 
        ? `Welcome, ${this.user?.username || 'User'}!` 
        : 'Not logged in';
      statusEl.className = this.isAuthenticated 
        ? 'status-badge success' 
        : 'status-badge';
    }
    
    if (logoutBtn) logoutBtn.hidden = !this.isAuthenticated;
    if (btnProtected) btnProtected.disabled = !this.isAuthenticated;
    if (btnProfile) btnProfile.disabled = !this.isAuthenticated;
    
    // Show/hide sections based on auth status
    if (dashboard && authSection) {
      if (this.isAuthenticated) {
        authSection.style.display = 'none';
        dashboard.hidden = false;
        dashboard.classList.add('fade-in');
      } else {
        authSection.style.display = 'block';
        dashboard.hidden = true;
      }
    }
  }

  async login(credentials) {
    const response = await ApiClient.request('/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    if (response.ok) {
      await this.checkAuthStatus();
    }
    
    return response;
  }

  async signup(userData) {
    return await ApiClient.request('/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async logout() {
    // Clear any client-side auth state
    this.isAuthenticated = false;
    this.user = null;
    this.updateUI();
    
    // Optional: Call logout endpoint if implemented
    try {
      await ApiClient.request('/logout', { method: 'POST' });
    } catch (error) {
      console.log('Logout endpoint not available');
    }
  }

  async accessProtected() {
    return await ApiClient.request('/protected');
  }

  async getProfile() {
    return await ApiClient.request('/user/me');
  }
}

// Form Manager
class FormManager {
  static setupForm(formId, onSubmit) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Basic validation
      if (!FormManager.validateForm(data)) return;
      
      await onSubmit(data, form);
    });
  }

  static validateForm(data) {
    for (const [key, value] of Object.entries(data)) {
      if (!value.trim()) {
        alert(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
        return false;
      }
    }
    
    // Email validation
    if (data.email && !FormManager.isValidEmail(data.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    
    // Password validation
    if (data.password && data.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return false;
    }
    
    return true;
  }

  static isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static resetForm(form) {
    if (form) {
      form.reset();
      // Clear any validation states
      const inputs = form.querySelectorAll('input');
      inputs.forEach(input => {
        input.classList.remove('error', 'success');
      });
    }
  }
}

// Card Switcher
class CardSwitcher {
  static switch(showCardId, hideCardId) {
    const showCard = document.getElementById(showCardId);
    const hideCard = document.getElementById(hideCardId);
    
    if (hideCard) {
      hideCard.style.opacity = '0';
      hideCard.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        hideCard.classList.add('hidden');
        
        if (showCard) {
          showCard.classList.remove('hidden');
          showCard.style.opacity = '0';
          showCard.style.transform = 'translateX(20px)';
          
          setTimeout(() => {
            showCard.style.opacity = '1';
            showCard.style.transform = 'translateX(0)';
          }, 50);
        }
      }, 300);
    }
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize managers
  const themeManager = new ThemeManager();
  const authManager = new AuthManager();
  
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => themeManager.toggle());
    themeManager.updateThemeIcon();
  }

  // Auth form switching
  const showSignup = document.getElementById('showSignup');
  const showLogin = document.getElementById('showLogin');
  
  if (showSignup) {
    showSignup.addEventListener('click', (e) => {
      e.preventDefault();
      CardSwitcher.switch('signupCard', 'loginCard');
    });
  }
  
  if (showLogin) {
    showLogin.addEventListener('click', (e) => {
      e.preventDefault();
      CardSwitcher.switch('loginCard', 'signupCard');
    });
  }

  // Setup forms
  // Simple login form handler
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const data = {
        username: formData.get('username'),
        password: formData.get('password')
      };
      
      const messageEl = document.getElementById('loginMsg');
      
      try {
        const response = await fetch(`${BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (response.ok) {
          const result = await response.json();
          localStorage.setItem('token', result.access_token);
          messageEl.textContent = 'Login successful! Redirecting...';
          messageEl.className = 'message success';
          setTimeout(() => {
            window.location.href = 'home.html';
          }, 1000);
        } else {
          const errorData = await response.json();
          messageEl.textContent = errorData.detail || 'Login failed';
          messageEl.className = 'message error';
        }
      } catch (error) {
        messageEl.textContent = 'Network error occurred';
        messageEl.className = 'message error';
      }
    });
  }

  // Simple signup form handler
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(signupForm);
      const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
      };
      
      const messageEl = document.getElementById('signupMsg');
      
      try {
        const response = await fetch(`${BASE_URL}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (response.ok) {
          messageEl.textContent = 'Account created! You can now sign in.';
          messageEl.className = 'message success';
          signupForm.reset();
          setTimeout(() => {
            CardSwitcher.switch('loginCard', 'signupCard');
          }, 2000);
        } else {
          const errorData = await response.json();
          messageEl.textContent = errorData.detail || 'Signup failed';
          messageEl.className = 'message error';
        }
      } catch (error) {
        messageEl.textContent = 'Network error occurred';
        messageEl.className = 'message error';
      }
    });
  }

  // Logout functionality
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await authManager.logout();
      NotificationManager.show(
        document.getElementById('loginMsg'), 
        'You have been logged out successfully.', 
        'success'
      );
    });
  }

  // Dashboard actions
  const btnProtected = document.getElementById('btnProtected');
  if (btnProtected) {
    btnProtected.addEventListener('click', async () => {
      const response = await authManager.accessProtected();
      const messageEl = document.getElementById('protectedMsg');
      
      if (response.ok) {
        NotificationManager.show(
          messageEl, 
          response.data?.message || 'Access granted to protected resource!', 
          'success'
        );
      } else {
        NotificationManager.show(
          messageEl, 
          response.data?.detail || 'Access denied. Please log in.', 
          'error'
        );
      }
    });
  }

  const btnProfile = document.getElementById('btnProfile');
  if (btnProfile) {
    btnProfile.addEventListener('click', async () => {
      const response = await authManager.getProfile();
      const messageEl = document.getElementById('profileMsg');
      
      if (response.ok) {
        const user = response.data;
        NotificationManager.show(
          messageEl, 
          `Profile: ${user.username} (${user.email})`, 
          'success'
        );
      } else {
        NotificationManager.show(
          messageEl, 
          response.data?.detail || 'Failed to load profile.', 
          'error'
        );
      }
    });
  }

  // Initialize auth status
  authManager.checkAuthStatus();

  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Add loading states to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      if (!this.disabled) {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      }
    });
  });
});