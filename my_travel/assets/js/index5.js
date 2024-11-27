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

const apiUrl = 'https://672ca4801600dda5a9f949f2.mockapi.io/index';
const attractionsList = document.getElementById('attractions-list');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('search-input');
const sortBy = document.getElementById('sort-by');
const filterBy = document.getElementById('filter-by');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

let currentPage = 1;
const itemsPerPage = 6;
let totalItems = 0;

function showLoader() {
    if (loader) {
        loader.style.display = 'block';
    }
}

function hideLoader() {
    if (loader) {
        loader.style.display = 'none';
    }
}

async function fetchAttractions(query = '', sortBy = '', filterBy = '', page = 1) {
    showLoader();
    try {
        let url = `${apiUrl}?search=${query}&page=${page}&limit=${itemsPerPage}`;
        if (sortBy) {
            url += `&sortBy=${sortBy}`;
        }
        if (filterBy === 'highest') {
            url += '&order=desc';
        } else if (filterBy === 'lowest') {
            url += '&order=asc';
        }
        const response = await fetch(url);
        const data = await response.json();
        totalItems = data.totalItems || data.length;
        return data.items || data;
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    } finally {
        hideLoader();
    }
}

function displayAttractions(attractions) {
    if (attractionsList) {
        attractionsList.innerHTML = '';
        attractions.forEach(attraction => {
            const card = document.createElement('div');
            card.className = 'attraction-card';
            card.innerHTML = `
                <img src="${attraction.photos}" alt="${attraction.name}">
                <h2>${attraction.name}</h2>
            `;
            card.addEventListener('click', () => showModal(attraction));
            attractionsList.appendChild(card);
        });
    }
}

function showModal(attraction) {
    const modal = document.getElementById('modal');
    const maps = document.getElementById('maps');
    const image = document.getElementById('image');
    const modalImage = document.getElementById('modal-image');
    const modalName = document.getElementById('modal-name');
    const modalDescription = document.getElementById('modal-description');
    const modalText = document.getElementById(`text`);
    const modalVisitors = document.getElementById('modal-visitors');
    const closeBtn = document.querySelector('.close');

    modalImage.src = attraction.photos;
    modalName.innerText = attraction.name;
    modalVisitors.innerText = `Количество посетителей: ${attraction.visitors}`;
    modalVisitors.src = attraction.maps;
    modalText.innerText = `${attraction.text}`;
    modalVisitors.src = attraction.image;
    modalDescription.innerText = `Описание: ${attraction.info}`;
    // modalVisitors.innerText = `${attraction.image}`;

    maps.src = attraction.maps 
    image.src = attraction.image

    modal.style.display = 'block';

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function updatePagination() {
    if (pageInfo) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        pageInfo.innerText = `${currentPage} из ${totalPages}`;
        if (prevPageButton) {
            prevPageButton.disabled = currentPage === 1;
        }
        if (nextPageButton) {
            nextPageButton.disabled = currentPage === totalPages;
        }
    }
}

async function init() {
    const attractions = await fetchAttractions();
    displayAttractions(attractions);
    updatePagination();
}

async function updateAttractions() {
    const query = searchInput ? searchInput.value.trim() : '';
    const sortValue = sortBy ? sortBy.value : '';
    const filterValue = filterBy ? filterBy.value : '';
    const attractions = await fetchAttractions(query, sortValue, filterValue, currentPage);

    let filteredAttractions = attractions;
    if (filterValue === 'highest') {
        filteredAttractions = attractions.filter(attraction => attraction.visitors >= 500);
    } else if (filterValue === 'lowest') {
        filteredAttractions = attractions.filter(attraction => attraction.visitors < 500);
    }

    displayAttractions(filteredAttractions);
    updatePagination();
}

if (searchInput) {
    searchInput.addEventListener('input', () => {
        currentPage = 1;
        updateAttractions();
    });
}

if (sortBy) {
    sortBy.addEventListener('change', updateAttractions);
}

if (filterBy) {
    filterBy.addEventListener('change', updateAttractions);
}

if (prevPageButton) {
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateAttractions();
        }
    });
}

if (nextPageButton) {
    nextPageButton.addEventListener('click', () => {
        currentPage++;
        updateAttractions();
    });
}

init();

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
  