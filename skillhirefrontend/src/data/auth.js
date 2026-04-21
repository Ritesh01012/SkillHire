const API_URL = 'http://localhost:5000/api/auth';

export function isLoggedIn() {
  return localStorage.getItem('userToken') !== null
}

export function getCurrentUser() {
  const user = localStorage.getItem('currentUser')
  return user ? JSON.parse(user) : null
}

export async function login(email, password, role) {
  // Clear any existing session first
  logout();
  
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, role })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  const user = {
    email: data.user.email,
    role: data.user.role,
    name: data.user.name,
    token: data.token
  };

  localStorage.setItem('userToken', user.token);
  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
}

export async function signup(name, email, password, role) {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password, role })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Signup failed');
  }

  const user = {
    email: data.user.email,
    role: data.user.role,
    name: data.user.name,
    token: data.token
  };

  localStorage.setItem('userToken', user.token);
  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem('userToken')
  localStorage.removeItem('currentUser')
}

export function getUserRole() {
  const user = getCurrentUser()
  return user ? user.role : null
}
