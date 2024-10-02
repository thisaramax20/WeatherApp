const searchCity = document.getElementById("txt-city-search");
const btnSearchByCity = document.getElementById("btn-search-by-city");
const btnSearchByLocation = document.getElementById("btn-get-location");
const iconMain = document.getElementById("icon-main");
const txtMainTemperature = document.getElementById("txt-main-temperature");
const txtMainCity = document.getElementById("txt-main-city");
const txtMainTime = document.getElementById("txt-main-time");
const txtShortDescription = document.getElementById("txt-short-description");
const txtSecondaryTemperature = document.getElementById(
  "txt-secondary-temperature"
);
const txtHumidity = document.getElementById("txt-humidity");
const txtWindSpeed = document.getElementById("txt-wind-speed");
const txtTimeAfterFirstThreeHrs = document.getElementById(
  "txt-time-after-first-three-hrs"
);
const txtTemperatureAfterFirstThreeHrs = document.getElementById(
  "txt-temperature-after-first-three hrs"
);
const txtShortDesciptionAfterFirstThreeHrs = document.getElementById(
  "txt-short-description-after-first-three-hrs"
);
const txtTimeAfterSecondThreeHrs = document.getElementById(
  "txt-time-after-second-three-hrs"
);
const txtTemperatureAfterSecondThreeHrs = document.getElementById(
  "txt-temperature-after-second-three-hrs"
);
const txtShortDescriptionAfterSecondThreeHrs = document.getElementById(
  "txt-short-description-after-second-three-hrs"
);
const optionUnits = document.getElementById("units");

let currentCity = "";
let currentTempC = "";
let currentTempF = "";
let currentWindMph = "";
let currentWindKmph = "";
let afterThreeHrsTempC = "";
let afterThreeHrsTempF = "";
let afterSixHrsTempC = "";
let afterSixHrsTempF = "";

optionUnits.addEventListener("change", () => {
  if (optionUnits.value === "far") {
    txtMainTemperature.innerHTML = Math.floor(currentTempF);
    txtSecondaryTemperature.innerText = currentTempF + "F";
    txtWindSpeed.innerHTML = currentWindMph + "mph";
    txtTemperatureAfterFirstThreeHrs.innerHTML = afterThreeHrsTempF + "F";
    txtTemperatureAfterSecondThreeHrs.innerHTML = afterSixHrsTempF + "F";
  }
  if (optionUnits.value === "cel") {
    txtMainTemperature.innerHTML = Math.floor(currentTempC) + "<sup>0</sup>";
    txtSecondaryTemperature.innerHTML = currentTempC + "<sup>0</sup>c";
    txtWindSpeed.innerHTML = currentWindKmph + "kmph";
    txtTemperatureAfterFirstThreeHrs.innerHTML =
      afterThreeHrsTempC + "<sup>0</sup>c";
    txtTemperatureAfterSecondThreeHrs.innerHTML =
      afterSixHrsTempC + "<sup>0</sup>c";
  }
});

const loadData = () => {
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(success, error);
  }
};

btnSearchByLocation.addEventListener("click", () => loadData());

const success = (position) => {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=623575b7442642d4adf5a59cbed8ef1c`
  )
    .then((res) => res.json())
    .then((data) => {
      currentCity = data.results[0].components._normalized_city;
      getWeatherNow(latitude, longitude, "", false, true);
      getWeatherNextThreeHrs(latitude, longitude);
    })
    .catch((err) => console.log(err));
};

const error = (position) =>
  alert("Connection issue... Try compatibility of your browser.");

const fillData = (data, condition1, condition2) => {
  let city = searchCity.value;
  city = city.charAt(0).toUpperCase() + city.slice(1);
  currentTempC = data.current.temp_c;
  currentTempF = data.current.temp_f;
  currentWindKmph = data.current.wind_kph;
  currentWindMph = data.current.wind_mph;
  txtMainTemperature.innerHTML =
    optionUnits.value === "cel"
      ? Math.floor(currentTempC) + "<sup>0</sup>"
      : Math.floor(currentTempF);
  txtMainCity.textContent = condition2
    ? condition1
      ? city
      : currentCity
    : "Colombo";
  txtMainTime.innerText = data.location.localtime;
  iconMain.src = data.current.condition.icon;
  txtShortDescription.innerText = data.current.condition.text;
  txtSecondaryTemperature.innerHTML =
    optionUnits.value === "cel"
      ? currentTempC + "<sup>0</sup>c"
      : currentTempF + "F";
  txtHumidity.innerText = data.current.humidity;
  txtWindSpeed.innerHTML =
    optionUnits.value === "cel"
      ? currentWindKmph + "kmph"
      : currentWindMph + "mph";
};

const getWeatherNow = (
  latitude = "",
  longitude = "",
  city = "",
  condition1 = "",
  condition2 = ""
) => {
  const url =
    city === ""
      ? `https://api.weatherapi.com/v1/current.json?key=e667369cab444fd791725742240210&q=${latitude},${longitude}&aqi=no`
      : `https://api.weatherapi.com/v1/current.json?key=e667369cab444fd791725742240210&q=${city}&aqi=no`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => fillData(data, condition1, condition2))
    .catch((rej) =>
      condition2
        ? alert("Please enter a valid input...")
        : alert("Seems to be a connection issue... Try reloading...")
    );
};

const getWeatherNextThreeHrs = (latitude = "", longitude = "", city = "") => {
  const url =
    city === ""
      ? `https://api.weatherapi.com/v1/forecast.json?key=e667369cab444fd791725742240210&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`
      : `https://api.weatherapi.com/v1/forecast.json?key=e667369cab444fd791725742240210&q=${city}&days=1&aqi=no&alerts=no`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const time = "" + data.location.localtime;
      const afterThreeHrsTime = parseInt(time.substring(11, 13)) + 3;
      const modifiedTimeAfterThreeHrs =
        afterThreeHrsTime < 10
          ? "0" + afterThreeHrsTime + ":00"
          : afterThreeHrsTime + ":00";
      const finalDateTimeAfterThreeHrs =
        time.substring(0, 11) + modifiedTimeAfterThreeHrs;

      const afterSixHrsTime = parseInt(time.substring(11, 13)) + 6;
      const modifiedTimeAfterSixHrs =
        afterSixHrsTime < 10
          ? "0" + afterSixHrsTime + ":00"
          : afterSixHrsTime + ":00";
      const finalDateTimeAfterSixHrs =
        time.substring(0, 11) + modifiedTimeAfterSixHrs;

      data.forecast.forecastday[0].hour.forEach((element) => {
        if (element.time === finalDateTimeAfterThreeHrs) {
          afterThreeHrsTempC = element.temp_c;
          afterThreeHrsTempF = element.temp_f;
          txtTimeAfterFirstThreeHrs.innerText = modifiedTimeAfterThreeHrs;
          txtShortDesciptionAfterFirstThreeHrs.innerText =
            element.condition.text;
          txtTemperatureAfterFirstThreeHrs.innerHTML =
            optionUnits.value === "cel"
              ? afterThreeHrsTempC + "<sup>0</sup>c"
              : afterThreeHrsTempF + "F";
        }
        if (element.time === finalDateTimeAfterSixHrs) {
          afterSixHrsTempC = element.temp_c;
          afterSixHrsTempF = element.temp_f;
          txtTimeAfterSecondThreeHrs.innerText = modifiedTimeAfterSixHrs;
          txtShortDescriptionAfterSecondThreeHrs.innerText =
            element.condition.text;
          txtTemperatureAfterSecondThreeHrs.innerHTML =
            optionUnits.value === "cel"
              ? afterSixHrsTempC + "<sup>0</sup>c"
              : afterSixHrsTempF + "F";
        }
      });
    })
    .catch((rej) => console.log(rej));
};

const onLoad = () => {
  getWeatherNow("", "", "Colombo", true, false);
  getWeatherNextThreeHrs("", "", "Colombo");
  txtMainCity.innerText = "Colombo";
};

onLoad();

btnSearchByCity.addEventListener("click", () => {
  getWeatherNow("", "", searchCity.value, true, true);
  getWeatherNextThreeHrs("", "", searchCity.value);
});
searchCity.addEventListener("keyup", (key) => {
  if (key.key === "Enter") {
    getWeatherNow("", "", searchCity.value, true, true);
    getWeatherNextThreeHrs("", "", searchCity.value);
  } else {
    return;
  }
});
