const btnFuture = document.getElementById("btn-future");
const btnPast = document.getElementById("btn-past");
const futureContainer = document.getElementById("future");
const pastContainer = document.getElementById("past");
const btnNextDays = document.getElementById("btn-future-days");
const btnNextMonths = document.getElementById("btn-future-months");
const btnPastDays = document.getElementById("btn-past-days");
const btnPastMonths = document.getElementById("btn-past-months");
const txtDate1 = document.getElementById("date1");
const txtDate2 = document.getElementById("date2");
const txtDate3 = document.getElementById("date3");
const txtDate4 = document.getElementById("date4");
const txtSecondaryTemperature1 = document.getElementById(
  "txt-secondary-temperature1"
);
const txtHumidity1 = document.getElementById("txt-humidity1");
const txtWindSpeed1 = document.getElementById("txt-wind-speed1");
const txtSecondaryTemperature2 = document.getElementById(
  "txt-secondary-temperature2"
);
const txtHumidity2 = document.getElementById("txt-humidity2");
const txtWindSpeed2 = document.getElementById("txt-wind-speed2");
const txtSecondaryTemperature3 = document.getElementById(
  "txt-secondary-temperature3"
);
const txtHumidity3 = document.getElementById("txt-humidity3");
const txtWindSpeed3 = document.getElementById("txt-wind-speed3");
const txtSecondaryTemperature4 = document.getElementById(
  "txt-secondary-temperature4"
);
const txtHumidity4 = document.getElementById("txt-humidity4");
const txtWindSpeed4 = document.getElementById("txt-wind-speed4");
const searchCity = document.getElementById("txt-city-search");
const btnSearchByCity = document.getElementById("btn-search-by-city");
const btnSearchByLocation = document.getElementById("btn-get-location");

const optionUnits = document.getElementById("units");
const txtMainCity = document.getElementById("txt-main-city");

let currentTempC1 = "";
let currentTempF1 = "";
let currentWindMph1 = "";
let currentWindKmph1 = "";
let currentTempC2 = "";
let currentTempF2 = "";
let currentWindMph2 = "";
let currentWindKmph2 = "";
let currentTempC3 = "";
let currentTempF3 = "";
let currentWindMph3 = "";
let currentWindKmph3 = "";
let currentTempC4 = "";
let currentTempF4 = "";
let currentWindMph4 = "";
let currentWindKmph4 = "";
let currentCity = "";
let isFutureDays = false;
let isFutureMonths = false;
let isPastdays = false;
let isPastMonths = false;

btnFuture.addEventListener("click", () => {
  futureContainer.style.display = "block";
  pastContainer.style.display = "none";
});

btnPast.addEventListener("click", () => {
  futureContainer.style.display = "none";
  pastContainer.style.display = "block";
});

const loadData = () => {
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(success, error);
  }
};

btnSearchByLocation.addEventListener("click", () => {
  if (!isFutureDays && !isFutureMonths && !isPastMonths && !isPastdays) {
    alert("Please select an option which data you want to view...");
    return;
  } else {
    loadData();
  }
});

const success = (position) => {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=623575b7442642d4adf5a59cbed8ef1c`
  )
    .then((res) => res.json())
    .then((data) => {
      currentCity = data.results[0].components._normalized_city;
      txtMainCity.innerText = currentCity;
      if (isFutureDays) {
        getFutureDaysWeather(latitude, longitude, "");
        txtMainCity.innerText += "- For future days";
      }
      if (isFutureMonths) {
        getFutureMonthsWeather(latitude, longitude, "");
        txtMainCity.innerText += "- For future months";
      }
      if (isPastMonths) {
        getPastMonthsWeather(latitude, longitude, "");
        txtMainCity.innerText += "- For past months";
      }
      if (isPastdays) {
        getPastDaysWeather(latitude, longitude, "");
        txtMainCity.innerText += "- For past days";
      }
    })
    .catch((err) => console.log(err));
};

const error = (position) =>
  alert("Connection issue... Try compatibility of your browser.");

const getFutureDaysWeather = (latitude = "", longitude = "", city = "") => {
  const url =
    city === ""
      ? `https://api.weatherapi.com/v1/forecast.json?key=b95153893d2f41028ae105558242608&q=${latitude},${longitude}&days=5&aqi=no&alerts=no`
      : `https://api.weatherapi.com/v1/forecast.json?key=b95153893d2f41028ae105558242608&q=${city}&days=5&aqi=no&alerts=no`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      currentTempC1 = data.forecast.forecastday[1].day.avgtemp_c;
      currentTempF1 = data.forecast.forecastday[1].day.avgtemp_f;
      currentTempC2 = data.forecast.forecastday[2].day.avgtemp_c;
      currentTempF1 = data.forecast.forecastday[2].day.avgtemp_f;
      currentTempC3 = data.forecast.forecastday[3].day.avgtemp_c;
      currentTempF3 = data.forecast.forecastday[3].day.avgtemp_c;
      currentTempC4 = data.forecast.forecastday[4].day.avgtemp_c;
      currentTempF4 = data.forecast.forecastday[4].day.avgtemp_c;
      currentWindKmph1 = data.forecast.forecastday[1].day.maxwind_kph;
      currentWindKmph2 = data.forecast.forecastday[2].day.maxwind_kph;
      currentWindKmph3 = data.forecast.forecastday[3].day.maxwind_kph;
      currentWindKmph4 = data.forecast.forecastday[4].day.maxwind_kph;
      currentWindMph1 = data.forecast.forecastday[1].day.maxwind_mph;
      currentWindMph2 = data.forecast.forecastday[2].day.maxwind_mph;
      currentWindMph3 = data.forecast.forecastday[3].day.maxwind_mph;
      currentWindMph4 = data.forecast.forecastday[4].day.maxwind_mph;
      txtDate1.innerText = data.forecast.forecastday[1].date;
      txtSecondaryTemperature1.innerHTML = currentTempC1 + "<sup>0</sup>c";
      txtHumidity1.innerHTML = data.forecast.forecastday[0].day.avghumidity;
      txtWindSpeed1.innerHTML = currentWindKmph1 + "<br/>kmph";
      txtDate2.innerText = data.forecast.forecastday[2].date;
      txtSecondaryTemperature2.innerHTML = currentTempC2 + "<sup>0</sup>c";
      txtHumidity2.innerHTML = data.forecast.forecastday[2].day.avghumidity;
      txtWindSpeed2.innerHTML = currentWindKmph2 + "<br/>kmph";
      txtDate3.innerText = data.forecast.forecastday[3].date;
      txtSecondaryTemperature3.innerHTML = currentTempC3 + "<sup>0</sup>c";
      txtHumidity3.innerHTML = data.forecast.forecastday[3].day.avghumidity;
      txtWindSpeed3.innerHTML = currentWindKmph3 + "<br/>kmph";
      txtDate4.innerText = data.forecast.forecastday[4].date;
      txtSecondaryTemperature4.innerHTML = currentTempC4 + "<sup>0</sup>c";
      txtHumidity4.innerHTML = data.forecast.forecastday[4].day.avghumidity;
      txtWindSpeed4.innerHTML = currentWindKmph4 + "<br/>kmph";
    })
    .catch((rej) => console.log(rej));
};

const getFutureMonthsWeather = (latitude, longitude, city) => {
  const nowMonth = new Date().getMonth();
  const nowYear = new Date().getFullYear();

  let next1 = "";
  let next2 = "";
  let next3 = "";
  let next4 = "";

  next1 +=
    nowMonth + 3 < 10
      ? nowYear + "-0" + (nowMonth + 3) + "-01"
      : nowYear + 1 + "-01-01";
  next2 +=
    nowMonth + 4 < 10
      ? nowYear + "-0" + nowMonth + 4 + "-01"
      : nowYear + 1 + "-02-01";
  next3 +=
    nowMonth + 5 < 10
      ? nowYear + "-0" + nowMonth + 5 + "-01"
      : nowYear + 1 + "-03-01";
  next4 +=
    nowMonth + 6 < 10
      ? nowYear + "-0" + nowMonth + 6 + "-01"
      : nowYear + 1 + "-04-01";

  const url1 =
    city === ""
      ? `https://api.weatherapi.com/v1/future.json?key=b95153893d2f41028ae105558242608&q=${latitude},${longitude}&dt=${next1}`
      : `https://api.weatherapi.com/v1/future.json?key=b95153893d2f41028ae105558242608&q=${city}&dt=${next1}`;
  fetch(url1)
    .then((res) => res.json())
    .then((data) => {
      loadFirstContainer(data);
    })
    .catch((rej) => console.log(rej));
  const url2 =
    city === ""
      ? `https://api.weatherapi.com/v1/future.json?key=b95153893d2f41028ae105558242608&q=${latitude},${longitude}&dt=${next2}`
      : `https://api.weatherapi.com/v1/future.json?key=b95153893d2f41028ae105558242608&q=${city}&dt=${next2}`;
  fetch(url2)
    .then((res) => res.json())
    .then((data) => {
      loadSecondContainer(data);
    })
    .catch((rej) => console.log(rej));
  const url3 =
    city === ""
      ? `https://api.weatherapi.com/v1/future.json?key=b95153893d2f41028ae105558242608&q=${latitude},${longitude}&dt=${next3}`
      : `https://api.weatherapi.com/v1/future.json?key=b95153893d2f41028ae105558242608&q=${city}&dt=${next3}`;
  fetch(url3)
    .then((res) => res.json())
    .then((data) => {
      loadThirdContainer(data);
    })
    .catch((rej) => console.log(rej));
  const url4 =
    city === ""
      ? `https://api.weatherapi.com/v1/future.json?key=b95153893d2f41028ae105558242608&q=${latitude},${longitude}&dt=${next4}`
      : `https://api.weatherapi.com/v1/future.json?key=b95153893d2f41028ae105558242608&q=${city}&dt=${next4}`;
  fetch(url4)
    .then((res) => res.json())
    .then((data) => {
      loadFourthContainer(data);
    })
    .catch((rej) => console.log(rej));
};
const getPastMonthsWeather = (latitude, longitude, city) => {
  const nowMonth = new Date().getMonth();
  const nowYear = new Date().getFullYear();

  let next1 = "";
  let next2 = "";
  let next3 = "";
  let next4 = "";

  next1 +=
    nowMonth - 1 <= 0
      ? nowYear - 1 + "-12" + "-01"
      : nowMonth - 1 < 10
      ? nowYear + "-0" + (nowMonth - 1) + "-01"
      : nowYear + "-" + nowMonth - 1 + "-01";
  next2 +=
    nowMonth - 2 <= 0
      ? nowYear - 1 + "-11" + "-01"
      : nowMonth - 2 < 10
      ? nowYear + "-0" + (nowMonth - 2) + "-01"
      : nowYear + "-" + nowMonth - 2 + "-01";
  next3 +=
    nowMonth - 3 <= 0
      ? nowYear - 1 + "-10" + "-01"
      : nowMonth - 3 < 10
      ? nowYear + "-0" + (nowMonth - 3) + "-01"
      : nowYear + "-" + nowMonth - 3 + "-01";
  next4 +=
    nowMonth - 4 <= 0
      ? nowYear - 1 + "-09" + "-01"
      : nowMonth - 4 < 10
      ? nowYear + "-0" + (nowMonth - 4) + "-01"
      : nowYear + "-" + nowMonth - 4 + "-01";

  const url1 =
    city === ""
      ? `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${latitude},${longitude}&dt=${next1}`
      : `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${city}&dt=${next1}`;
  fetch(url1)
    .then((res) => res.json())
    .then((data) => {
      loadFirstContainer(data);
    })
    .catch((rej) => console.log(rej));
  const url2 =
    city === ""
      ? `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${latitude},${longitude}&dt=${next2}`
      : `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${city}&dt=${next2}`;
  fetch(url2)
    .then((res) => res.json())
    .then((data) => {
      loadSecondContainer(data);
    })
    .catch((rej) => console.log(rej));
  const url3 =
    city === ""
      ? `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${latitude},${longitude}&dt=${next3}`
      : `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${city}&dt=${next3}`;
  fetch(url3)
    .then((res) => res.json())
    .then((data) => {
      loadThirdContainer(data);
    })
    .catch((rej) => console.log(rej));
  const url4 =
    city === ""
      ? `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${latitude},${longitude}&dt=${next4}`
      : `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${city}&dt=${next4}`;
  fetch(url4)
    .then((res) => res.json())
    .then((data) => {
      loadFourthContainer(data);
    })
    .catch((rej) => console.log(rej));
};

const getPastDaysWeather = (latitude, longitude, city) => {
  const nowMonth = new Date().getMonth();
  const nowYear = new Date().getFullYear();
  const nowDay = new Date().getDate();

  let next1 = "";
  let next2 = "";
  let next3 = "";
  let next4 = "";

  if (nowDay - 1 <= 0) {
    if (nowMonth - 1 < 10) {
      next1 += nowYear + "-0" + (nowMonth - 1) + "-28";
    } else {
      next1 += nowYear + "-" + (nowMonth - 1) + "-28";
    }
  } else {
    if (nowMonth - 1 < 10) {
      next1 += nowYear + "-0" + (nowMonth - 1);
      if (nowDay < 10) {
        next1 += "-0" + (nowDay - 1);
      } else {
        next1 += "-" + (nowDay - 1);
      }
    } else {
      next1 += nowYear + "-" + (nowMonth - 10);
      if (nowDay < 10) {
        next1 += "-0" + (nowDay - 1);
      } else {
        next1 += "-" + (nowDay - 1);
      }
    }
  }

  if (nowDay - 2 <= 0) {
    if (nowMonth - 1 < 10) {
      next2 += nowYear + "-0" + (nowMonth - 1) + "-28";
    } else {
      next2 += nowYear + "-" + (nowMonth - 1) + "-28";
    }
  } else {
    if (nowMonth - 1 < 10) {
      next2 += nowYear + "-0" + (nowMonth - 1);
      if (nowDay < 10) {
        next2 += "-0" + (nowDay - 2);
      } else {
        next2 += "-" + (nowDay - 2);
      }
    } else {
      next2 += nowYear + "-" + (nowMonth - 10);
      if (nowDay < 10) {
        next2 += "-0" + (nowDay - 2);
      } else {
        next2 += "-" + (nowDay - 2);
      }
    }
  }

  if (nowDay - 3 <= 0) {
    if (nowMonth - 1 < 10) {
      next3 += nowYear + "-0" + (nowMonth - 1) + "-28";
    } else {
      next3 += nowYear + "-" + (nowMonth - 1) + "-28";
    }
  } else {
    if (nowMonth - 1 < 10) {
      next3 += nowYear + "-0" + (nowMonth - 1);
      if (nowDay < 10) {
        next3 += "-0" + (nowDay - 3);
      } else {
        next3 += "-" + (nowDay - 3);
      }
    } else {
      next3 += nowYear + "-" + (nowMonth - 10);
      if (nowDay < 10) {
        next3 += "-0" + (nowDay - 3);
      } else {
        next3 += "-" + (nowDay - 3);
      }
    }
  }

  if (nowDay - 4 <= 0) {
    if (nowMonth - 1 < 10) {
      next4 += nowYear + "-0" + (nowMonth - 1) + "-28";
    } else {
      next4 += nowYear + "-" + (nowMonth - 1) + "-28";
    }
  } else {
    if (nowMonth - 1 < 10) {
      next4 += nowYear + "-0" + (nowMonth - 1);
      if (nowDay < 10) {
        next4 += "-0" + (nowDay - 4);
      } else {
        next4 += "-" + (nowDay - 4);
      }
    } else {
      next4 += nowYear + "-" + (nowMonth - 10);
      if (nowDay < 10) {
        next4 += "-0" + (nowDay - 4);
      } else {
        next4 += "-" + (nowDay - 4);
      }
    }
  }

  const url1 =
    city === ""
      ? `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${latitude},${longitude}&dt=${next1}`
      : `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${city}&dt=${next1}`;
  fetch(url1)
    .then((res) => res.json())
    .then((data) => {
      loadFirstContainer(data);
    })
    .catch((rej) => console.log(rej));
  const url2 =
    city === ""
      ? `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${latitude},${longitude}&dt=${next2}`
      : `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${city}&dt=${next2}`;
  fetch(url2)
    .then((res) => res.json())
    .then((data) => {
      loadSecondContainer(data);
    })
    .catch((rej) => console.log(rej));
  const url3 =
    city === ""
      ? `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${latitude},${longitude}&dt=${next3}`
      : `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${city}&dt=${next3}`;
  fetch(url3)
    .then((res) => res.json())
    .then((data) => {
      loadThirdContainer(data);
    })
    .catch((rej) => console.log(rej));
  const url4 =
    city === ""
      ? `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${latitude},${longitude}&dt=${next4}`
      : `https://api.weatherapi.com/v1/history.json?key=b95153893d2f41028ae105558242608&q=${city}&dt=${next4}`;
  fetch(url4)
    .then((res) => res.json())
    .then((data) => {
      loadFourthContainer(data);
    })
    .catch((rej) => console.log(rej));
};

const loadFourthContainer = (data) => {
  currentTempC4 = data.forecast.forecastday[0].day.avgtemp_c;
  currentTempF4 = data.forecast.forecastday[0].day.avgtemp_f;
  currentWindKmph4 = data.forecast.forecastday[0].day.maxwind_kph;
  currentWindMph4 = data.forecast.forecastday[0].day.maxwind_mph;

  txtDate4.innerText = data.forecast.forecastday[0].date;
  txtSecondaryTemperature4.innerHTML = currentTempC4 + "<sup>0</sup>c";
  txtHumidity4.innerHTML = data.forecast.forecastday[0].day.avgtemp_c;
  txtWindSpeed4.innerHTML = currentWindKmph4 + "<br/>kmph";
};
const loadThirdContainer = (data) => {
  currentTempC3 = data.forecast.forecastday[0].day.avgtemp_c;
  currentTempF3 = data.forecast.forecastday[0].day.avgtemp_f;
  currentWindKmph3 = data.forecast.forecastday[0].day.maxwind_kph;
  currentWindMph3 = data.forecast.forecastday[0].day.maxwind_mph;

  txtDate3.innerText = data.forecast.forecastday[0].date;
  txtSecondaryTemperature3.innerHTML = currentTempC3 + "<sup>0</sup>c";
  txtHumidity3.innerHTML = data.forecast.forecastday[0].day.avgtemp_c;
  txtWindSpeed3.innerHTML = currentWindKmph3 + "<br/>kmph";
};
const loadSecondContainer = (data) => {
  currentTempC2 = data.forecast.forecastday[0].day.avgtemp_c;
  currentTempF2 = data.forecast.forecastday[0].day.avgtemp_f;
  currentWindKmph2 = data.forecast.forecastday[0].day.maxwind_kph;
  currentWindMph2 = data.forecast.forecastday[0].day.maxwind_mph;

  txtDate2.innerText = data.forecast.forecastday[0].date;
  txtSecondaryTemperature2.innerHTML = currentTempC2 + "<sup>0</sup>c";
  txtHumidity2.innerHTML = data.forecast.forecastday[0].day.avgtemp_c;
  txtWindSpeed2.innerHTML = currentWindKmph2 + "<br/>kmph";
};
const loadFirstContainer = (data) => {
  currentTempC1 = data.forecast.forecastday[0].day.avgtemp_c;
  currentTempF1 = data.forecast.forecastday[0].day.avgtemp_f;
  currentWindKmph1 = data.forecast.forecastday[0].day.maxwind_kph;
  currentWindMph1 = data.forecast.forecastday[0].day.maxwind_mph;

  txtDate1.innerText = data.forecast.forecastday[0].date;
  txtSecondaryTemperature1.innerHTML = currentTempC1 + "<sup>0</sup>c";
  txtHumidity1.innerHTML = data.forecast.forecastday[0].day.avgtemp_c;
  txtWindSpeed1.innerHTML = currentWindKmph1 + "<br/>kmph";
};

btnNextMonths.addEventListener("click", () => {
  isFutureMonths = true;
  isFutureDays = false;
  isPastMonths - false;
  isPastdays = false;
});

btnNextDays.addEventListener("click", () => {
  isFutureDays = true;
  isFutureMonths = false;
  isPastMonths = false;
  isPastdays = false;
});

btnPastMonths.addEventListener("click", () => {
  isFutureDays = false;
  isFutureMonths = false;
  isPastMonths = true;
  isPastdays = false;
});

btnPastDays.addEventListener("click", () => {
  isFutureDays = false;
  isFutureMonths = false;
  isPastMonths = false;
  isPastdays = true;
});

btnSearchByCity.addEventListener("click", () => {
  if (!isFutureDays && !isFutureMonths && !isPastMonths && !isPastdays) {
    alert("Please select an option which data you want to view...");
    return;
  } else {
    currentCity = searchCity.value;
    txtMainCity.innerText =
      currentCity.charAt(0).toUpperCase() + currentCity.slice(1);
    if (isFutureDays) {
      getFutureDaysWeather("", "", currentCity);
      txtMainCity.innerText += "- For future days";
    }
    if (isFutureMonths) {
      getFutureMonthsWeather("", "", currentCity);
      txtMainCity.innerText += "- For future months";
    }
    if (isPastMonths) {
      getPastMonthsWeather("", "", currentCity);
      txtMainCity.innerText += "- For past months";
    }
    if (isPastdays) {
      getPastDaysWeather("", "", currentCity);
      txtMainCity.innerText += "- For past days";
    }
  }
});
searchCity.addEventListener("keyup", (key) => {
  if (key.key === "Enter") {
    if (!isFutureDays && !isFutureMonths && !isPastMonths && !isPastdays) {
      alert("Please select an option which data you want to view...");
      return;
    } else {
      currentCity = searchCity.value;
      txtMainCity.innerText =
        currentCity.charAt(0).toUpperCase() + currentCity.slice(1);
      if (isFutureDays) {
        getFutureDaysWeather("", "", currentCity);
        txtMainCity.innerText += "- For future days";
      }
      if (isFutureMonths) {
        getFutureMonthsWeather("", "", currentCity);
        txtMainCity.innerText += "- For future months";
      }
      if (isPastMonths) {
        getPastMonthsWeather("", "", currentCity);
        txtMainCity.innerText += "- For past months";
      }
      if (isPastdays) {
        getPastDaysWeather("", "", currentCity);
        txtMainCity.innerText += "- For past days";
      }
    }
  } else {
    return;
  }
});

optionUnits.addEventListener("change", () => {
  if (optionUnits.value === "far") {
    txtSecondaryTemperature4.innerHTML = currentTempF4 + "F";
    txtWindSpeed4.innerHTML = currentWindMph4 + "<br/>mph";
    txtSecondaryTemperature3.innerHTML = currentTempF3 + "F";
    txtWindSpeed3.innerHTML = currentWindMph3 + "<br/>mph";
    txtSecondaryTemperature2.innerHTML = currentTempF2 + "F";
    txtWindSpeed2.innerHTML = currentWindMph2 + "<br/>mph";
    txtSecondaryTemperature1.innerHTML = currentTempF1 + "F";
    txtWindSpeed1.innerHTML = currentWindMph1 + "<br/>mph";
  }
  if (optionUnits.value === "cel") {
    txtSecondaryTemperature4.innerHTML = currentTempC4 + "<sup>0</sup>c";
    txtWindSpeed4.innerHTML = currentWindKmph4 + "<br/>kmph";
    txtSecondaryTemperature3.innerHTML = currentTempC3 + "<sup>0</sup>c";
    txtWindSpeed3.innerHTML = currentWindKmph3 + "<br/>kmph";
    txtSecondaryTemperature2.innerHTML = currentTempC2 + "<sup>0</sup>c";
    txtWindSpeed2.innerHTML = currentWindKmph2 + "<br/>kmph";
    txtSecondaryTemperature1.innerHTML = currentTempC1 + "<sup>0</sup>c";
    txtWindSpeed1.innerHTML = currentWindKmph1 + "<br/>kmph";
  }
});
