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

const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

function showSlide(index) {
    const offset = -index * 100;
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slides.length - 1;
    }
    showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    showSlide(currentIndex);
});

setInterval(() => {
    nextBtn.click();
}, 7000);

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