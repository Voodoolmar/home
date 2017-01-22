// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


(function() {
  'use strict';

  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader'),
    container: document.querySelector('.main'),
    data: {}
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  document.getElementById('butRefresh').addEventListener('click', function() {
    // Refresh all of the forecasts
    app.getData();
  });

  document.getElementById('butAdd').addEventListener('click', function() {
    // Open/show the add new city dialog
    app.toggleAddDialog(true);
  });


  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  // Toggles the visibility of the add new city dialog.
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  // Updates a weather card with the latest weather forecast. If the card
  // doesn't already exist, it's cloned from the template.
  app.updateData = function(data) {
    localStorage.appData = data;

    // var dataLastUpdated = new Date(data.created);
    // var sunrise = data.channel.astronomy.sunrise;
    // var sunset = data.channel.astronomy.sunset;
    // var current = data.channel.item.condition;
    // var humidity = data.channel.atmosphere.humidity;
    // var wind = data.channel.wind;

    // var card = app.visibleCards[data.key];
    // if (!card) {
    //   card = app.cardTemplate.cloneNode(true);
    //   card.classList.remove('cardTemplate');
    //   card.querySelector('.location').textContent = data.label;
    //   card.removeAttribute('hidden');
    //   app.container.appendChild(card);
    //   app.visibleCards[data.key] = card;
    // }

    // // Verifies the data provide is newer than what's already visible
    // // on the card, if it's not bail, if it is, continue and update the
    // // time saved in the card
    // var cardLastUpdatedElem = card.querySelector('.card-last-updated');
    // var cardLastUpdated = cardLastUpdatedElem.textContent;
    // if (cardLastUpdated) {
    //   cardLastUpdated = new Date(cardLastUpdated);
    //   // Bail if the card has more recent data then the data
    //   if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
    //     return;
    //   }
    // }
    // cardLastUpdatedElem.textContent = data.created;

    // card.querySelector('.description').textContent = current.text;
    // card.querySelector('.date').textContent = current.date;
    // card.querySelector('.current .icon').classList.add(app.getIconClass(current.code));
    // card.querySelector('.current .temperature .value').textContent =
    //   Math.round(current.temp);
    // card.querySelector('.current .sunrise').textContent = sunrise;
    // card.querySelector('.current .sunset').textContent = sunset;
    // card.querySelector('.current .humidity').textContent =
    //   Math.round(humidity) + '%';
    // card.querySelector('.current .wind .value').textContent =
    //   Math.round(wind.speed);
    // card.querySelector('.current .wind .direction').textContent = wind.direction;
    // var nextDays = card.querySelectorAll('.future .oneday');
    // var today = new Date();
    // today = today.getDay();
    // for (var i = 0; i < 7; i++) {
    //   var nextDay = nextDays[i];
    //   var daily = data.channel.item.forecast[i];
    //   if (daily && nextDay) {
    //     nextDay.querySelector('.date').textContent =
    //       app.daysOfWeek[(i + today) % 7];
    //     nextDay.querySelector('.icon').classList.add(app.getIconClass(daily.code));
    //     nextDay.querySelector('.temp-high .value').textContent =
    //       Math.round(daily.high);
    //     nextDay.querySelector('.temp-low .value').textContent =
    //       Math.round(daily.low);
    //   }
    // }
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };


  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  /*
   * Gets a forecast for a specific city and updates the card with the data.
   * getForecast() first checks if the weather data is in the cache. If so,
   * then it gets that data and populates the card with the cached data.
   * Then, getForecast() goes to the network for fresh data. If the network
   * request goes through, then the card gets updated a second time with the
   * freshest data.
   */
  app.getData = function() {
    var url = 'http://192.168.1.200';
    // Fetch the latest data.
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var response = JSON.parse(request.response);
          var results = response;
          app.updateData(results);
        }
      }
    };
    request.open('GET', url);
    request.send();
  };

  // TODO add saveSelectedCities function here
  // Save list of cities to localStorage.
  app.saveSelectedCities = function() {
    var selectedCities = JSON.stringify(app.selectedCities);
    localStorage.selectedCities = selectedCities;
  };


  // TODO uncomment line below to test app with fake data
  // app.updateForecastCard(initialWeatherForecast);

  /************************************************************************
   *
   * Code required to start the app
   *
   * NOTE: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/

  // TODO add startup code here
  app.data = localStorage.appData;
  if (app.data) {
    app.data = JSON.parse(app.data);
  }
  

  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
