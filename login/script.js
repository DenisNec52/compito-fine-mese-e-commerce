// Get DOM elements
const checkbox = document.getElementById('reg-log');
const loginForm = document.querySelector('.card-front form');
const registerForm = document.querySelector('.card-back form');

// Toggle between login and register on checkbox change
checkbox.addEventListener('change', () => {
  if(checkbox.checked) {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  } else {
    loginForm.style.display = 'block'; 
    registerForm.style.display = 'none';
  }
});

// Login form submit handler
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  
  const email = document.getElementById('logemail-login').value;
  const password = document.getElementById('logpass-login').value;
  
  // Login logic
  localStorage.setItem('userEmail', email);
  
  alert('Login successful!');
});

// Register form submit handler  
registerForm.addEventListener('submit', e => {
  e.preventDefault();

  const fullName = document.getElementById('logname').value;
  const email = document.getElementById('logemail').value;
  const password = document.getElementById('logpass').value;

  // Register logic
  localStorage.setItem('userEmail', email);
  
  alert('Registration successful!');
});
