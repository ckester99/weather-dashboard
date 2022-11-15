var citySearchFrm = $("form");
var currentDayDisp = $("#current-day-display");
var forecastCards = $(".card");
const apiKey = "934e2a893482bf1e8b8f916e9379281e";

citySearchFrm.children("button").click(handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault();
    var textInput = $("input[type=text]");
    var city = textInput.val();
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
    var geocodes = await fetch(requestUrl).then(function (response) {
        return response.json();
    });

    if (geocodes.length === 0) {
        console.log("here");
    } else {
        searchWeather(geocodes[0]["name"], geocodes[0]["lat"], geocodes[0]["lon"]);
    }
}

async function searchWeather(city, lat, lon) {
    console.log(lat);
    console.log(lon);
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

    var curWeather = await fetch(requestUrl).then(function (response) {
        return response.json();
    });
    currentDayDisp.children("h2").html(city + " (" + dayjs().format("M/D/YYYY") + ")");
    var dayIcon = currentDayDisp.children("img");
    dayIcon.attr("src", "http://openweathermap.org/img/wn/" + curWeather.weather[0].icon + "@2x.png");
    dayIcon.attr("alt", "Weather Icon");
    dayIcon.attr("width", "70px");
    console.log(currentDayDisp.children("p"));
    $(currentDayDisp.children("p")[0]).text("Temp: " + curWeather.main.temp + " °F");
    $(currentDayDisp.children("p")[1]).text("Wind: " + curWeather.wind.speed + " MPH");
    $(currentDayDisp.children("p")[2]).text("Humidity: " + curWeather.main.humidity + " %");

    requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    var forecast = await fetch(requestUrl).then(function (response) {
        return response.json();
    });
    forecast = forecast.list;
    console.log(forecast);
    console.log(forecast.length);
    for (var i = 0; i < forecastCards.length; i++) {
        $(forecastCards[i])
            .children("h3")
            .text("(" + dayjs.unix(forecast[i * 8 + 7].dt).format("M/D/YYYY") + ")");
        var dayIcon = $(forecastCards[i]).children("img");
        dayIcon.attr("src", "http://openweathermap.org/img/wn/" + forecast[i * 8 + 7].weather[0].icon + "@2x.png");
        dayIcon.attr("alt", "Weather Icon");
        dayIcon.attr("width", "50px");
        $($(forecastCards[i]).children("p")[0]).text("Temp: " + forecast[i * 8 + 7].main.temp + " °F");
        $($(forecastCards[i]).children("p")[1]).text("Wind: " + forecast[i * 8 + 7].wind.speed + " MPH");
        $($(forecastCards[i]).children("p")[2]).text("Humidity: " + forecast[i * 8 + 7].main.humidity + " %");
    }

    console.log(dayjs.unix(curWeather.dt));
}
