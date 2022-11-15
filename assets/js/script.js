var citySearchFrm = $("form");
var currentDayDisp = $("#current-day-display");
var forecastCards = $(".card");
const apiKey = "934e2a893482bf1e8b8f916e9379281e";

citySearchFrm.children("button").click(handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault();
    var textInput = $("input[type=text]");
    var city = textInput.val();
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=934e2a893482bf1e8b8f916e9379281e";
    var geocodes = await fetch(requestUrl).then(function (response) {
        return response.json();
    });

    if (geocodes.length === 0) {
        console.log("here");
    } else {
        console.log(geocodes);
    }
}

async function getGeoCodes(city) {
    return geocodes;
}

function displayWeather(lat, lon) {}
