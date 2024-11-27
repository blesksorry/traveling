document.getElementById('burger').addEventListener('click', function() {
  document.getElementById('navList').classList.toggle('active');
});

document.addEventListener('click', function(event) {
  const navList = document.getElementById('navList');
  const burger = document.getElementById('burger');

  if (!navList.contains(event.target) && !burger.contains(event.target)) {
      navList.classList.remove('active');
  }
});

document.getElementById('openModalBtn').addEventListener('click', function() {
    document.getElementById('registrationModal').style.display = 'block';
});

document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('registrationModal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('registrationModal')) {
        document.getElementById('registrationModal').style.display = 'none';
    }
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Пароли не совпадают');
        return;
    }

    console.log('Данные для отправки:', {
        firstName,
        lastName,
        email,
        password
    });

    alert('Регистрация успешна!');
    document.getElementById('registrationModal').style.display = 'none';
});

function showLoadingIcon() {
	document.getElementById('loading-icon').style.display = 'block';
  }
  
  function hideLoadingIcon() {
	document.getElementById('loading-icon').style.display = 'none';
  }
  
  window.addEventListener('beforeunload', function(event) {
	showLoadingIcon();
  });
  
  window.addEventListener('load', function() {
	hideLoadingIcon();
  });
  