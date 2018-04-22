var weatherJS = (function() {
  
    var module = {

      storage : null,
      weatherLocation : null,
      weather : null,
      ui : null,

      getWeather: function(){
        module.weather.getWeather()
          .then(results => {
            module.ui.paint(results);
          })
          .catch(err => console.log(err));
      },

      getLocation: function(e) {
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        module.weather.changeLocation(city, state);
        module.storage.setLocationData(city, state);
        module.getWeather();
        $('#locModal').modal('hide');
        e.preventDefault();
      },
  
      addListeners: function() {
        document.getElementById('w-change-btn').addEventListener('click', module.getLocation);
        document.addEventListener('DOMContentLoaded', module.getWeather);
      },
  
      initUI: function() {
        const sto = new Storage();
        const weLoc = sto.getLocationData();
        const we = new Weather(weLoc.city, weLoc.state);
        const uiEl = new UI();
        module.storage = sto;
        module.weatherLocation = weLoc;
        module.weather = we;
        module.ui = uiEl;
        module.addListeners();
      },
  
      init: function() {
        module.initUI();
        console.log('- weatherJS initialized');
      }
    };
  
    return {
      init: module.init
    };
  
  })();
  
  document.addEventListener('DOMContentLoaded', weatherJS.init());
  