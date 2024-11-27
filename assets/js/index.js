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
  
