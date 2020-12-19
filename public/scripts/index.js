const mymap = L.map("mapid").setView([-22.9183567, -47.0912157], 12);

const requestURL = "http://localhost:3000/mocks/locations.json";
const request = new XMLHttpRequest();

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = () => {
  const gymHighlights = document.querySelector(".gym__highlights--imgs");

  const gyms = request.response;
  const threeRamdomNumbers = [];

  while (threeRamdomNumbers.length != 3) {
    const randomNumbers = Math.floor(Math.random() * gyms.length - 1) + 1;
    if (threeRamdomNumbers.indexOf(randomNumbers) === -1) {
      threeRamdomNumbers.push(randomNumbers);
    }
  }

  gyms.map((gym, index) => {
    L.marker([gym.latitude, gym.longitude])
      .bindPopup(
        `<h2>${gym.name}</h2>
           <img class="gym__imgs" src="${gym.img}" alt="${gym.name} image">
           <p>${gym.street}, ${gym.number} - ${gym.neighborhood}, ${gym.city}</p>
           <p>${gym.cep}</p>
           <p>${gym.infoHour}</p>
          `
      )
      .addTo(mymap);
    if (threeRamdomNumbers.includes(index)) {
      gymHighlights.innerHTML += `<img class="gym__imgs" src="${gym.img}" alt="${gym.name}" width="200px"></img>`;
    }
  });
};

const layer = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
  }
);

mymap.addLayer(layer);

function getState(gymId) {
  const index = favorites.indexOf(gymId);
  const existsInLocalStorage = index != -1;

  return { index, existsInLocalStorage };
}

function favoriteGym(gymId) {
  const { existsInLocalStorage, index } = getState(gymId);
  const setFavorites = () =>
    localStorage.setItem("favorites", JSON.stringify(favorites));
  const favoriteBtn = document.querySelector(`#favorite-btn-${gymId}`);

  if (existsInLocalStorage) {
    favorites.splice(index, 1);
    setFavorites();
    console.log(contentFavoriteBtn(gymId));
    favoriteBtn.innerHTML = contentFavoriteBtn(gymId);
  } else {
    favorites.push(gymId);
    setFavorites();
    favoriteBtn.innerHTML = contentFavoriteBtn(gymId);
  }
}

function contentFavoriteBtn(gymId) {
  const { existsInLocalStorage } = getState(gymId);
  return existsInLocalStorage ? "Favoritado" : "Adicionar aos favoritos";
}

function searchGym() {
  const gymList = document.querySelector(".gym__search--list");

  //clearInnerHTML
  gymList.innerHTML = "";

  const valueSearch = document.getElementById("search").value;

  const gyms = request.response;
  gyms.map((gym) => {
    const innerFavoriteBtn = contentFavoriteBtn(gym.id);

    if (valueSearch != "") {
      if (
        gym.name.includes(valueSearch) ||
        gym.street.includes(valueSearch) ||
        gym.neighborhood.includes(valueSearch) ||
        gym.city.includes(valueSearch)
      ) {
        return (gymList.innerHTML += `
        <div class="gym__search--component" id="gym-${gym.id}">
          <img class="gym__imgs" src="${gym.img}" alt="${gym.name} image" width="200px">
          <div class="gym__search--component-content">
            <h2>${gym.name}</h2>
            <p>${gym.street}, ${gym.number} - ${gym.neighborhood}, ${gym.city}</p>
            <p>${gym.cep}</p>
            <p>${gym.infoHour}</p>
            <button class="gym__search--component-btn" id="favorite-btn-${gym.id}" onclick="favoriteGym(${gym.id})">${innerFavoriteBtn}</button>
          </div>
        </div>
        `);
      }
    }
  });
}
