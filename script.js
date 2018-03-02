var api = "https://fcc-weather-api.glitch.me/api/current?";
var tempUnit = "F";
var currentTempInF, lat, lon;

$(document).ready(function() {
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(function(position) {
			lat = "lat=" + position.coords.latitude;
			lon = "lon=" + position.coords.longitude;
			var urlString = api + lat + "&" + lon;
			$.ajax({
				url: urlString,
				success: function(result) {
					$("#city").text(result.name + ", ");
					$("#country").text(result.sys.country);
					currentTempInCelsius = Math.round(result.main.temp * 1.8 + 32);
					$("#temp").text(currentTempInCelsius + "\xB0");
					$("#tempunit").text(tempUnit);
					var capWeather = result.weather[0].description.split(' ').map(function(word) {
						return word.replace(word[0], word[0].toUpperCase());
					}).join(' ');
					$("#weather").text(capWeather);
					genIcon(result.weather[0].main);
				}
			});
		});
	} else {
		console.log("Geolocation is not supported by this browser.");
	}
	$("#tempunit").click(function() {
		var currentTempUnit = $("#tempunit").text();
		if (currentTempUnit == "F") {
			$("#tempunit").text("C");
			var celTemp = Math.round((parseInt($("#temp").text()) - 32) / 1.8);
			$("#temp").text(celTemp + "\xB0");
		} else {
			$("#tempunit").text("F");
			var farenTemp = Math.round(parseInt($("#temp").text()) * 1.8 + 32);
			$("#temp").text(farenTemp + "\xB0");
		}
	});
});

function genIcon(weather) {
  var weather = weather.toLowerCase()
  switch (weather) {
    case 'drizzle':
      createIcon("wi-showers", "#40a4df")
      break;
    case 'clouds':
      createIcon("wi-cloudy", "#d3d3d3")
      break;
    case 'rain':
      createIcon("wi-rain", "#034aec")
      break;
    case 'snow':
      createIcon("wi-snow", "#fffafa")
      break;
    case 'clear':
      createIcon("wi-day-sunny", "#fcd440")
      break;
    case 'thunderstorm':
      createIcon("wi-thunderstorm", "#fdd023")
      break;
    default:
      $("#icon").addClass("wi-alien", "#a0d29e");
  }
}

function createIcon(weather, color) {
  $("#icon").addClass(weather).css("color", color);
}