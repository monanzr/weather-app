// dark/light

const day = document.querySelector(".theme__day");
const night = document.querySelector(".theme__night");
const themeLink = document.querySelector(".theme__link");

day.addEventListener("click", function() {
    document.querySelector("html").classList.add("light");
    night.classList.remove('active')
    day.classList.add('active')
});

night.addEventListener("click", function() {
    document.querySelector("html").classList.remove("light");
    day.classList.remove('active')
    night.classList.add('active')
});

// search

const searchBtnIcon = document.querySelector('.searchIcon__btn')
const search = document.querySelector('.search')
const searchBox = document.querySelector('.search__box')
const searchBtn = document.querySelector('.search__btn')
const closeBtn = document.querySelector('.close__btn')
const searchInput = document.querySelector('.search__input')


searchBtnIcon.addEventListener('click', () => { 
    search.classList.add('open')
    searchBox.style.display = 'flex'
    closeBtn.style.display = 'block'
})

closeBtn.addEventListener('click', () => { 
    search.classList.remove('open')
    searchBox.style.display = 'none'
    closeBtn.style.display = 'none'
})

// weather

let weather = {
    apiKey: "447a4c3224ceac720e791fc6aac736d9",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&appid="
            + this.apiKey
            + "&units=metric"
        )
        .then((Response) => Response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon } = data.weather[0];
        const { temp, humidity} = data.main;
        const { all } = data.clouds;
        const { speed } = data.wind
        document.querySelector('.loaction__name').innerText = name;
        document.querySelector('.icon').src = "img/" + icon + ".png"
        document.querySelector('.temperature__value').innerText = temp;
        document.querySelector('.cloudiness__value').innerText = all;
        document.querySelector('.wind__value').innerText = speed;
        document.querySelector('.humidity__value').innerText = humidity;
    },
    search: function() {
        this.fetchWeather(searchInput.value)
    }
};

searchBtn.addEventListener('click', () => {
    weather.search()
    search.classList.remove('open')
    searchBox.style.display = 'none'
    closeBtn.style.display = 'none'
})

searchInput.addEventListener('keyup', (event) => {
    if(event.key == "Enter") {
        weather.search()
        search.classList.remove('open')
        searchBox.style.display = 'none'
        closeBtn.style.display = 'none'
    }
})

weather.fetchWeather('Tehran')