var $tbody = document.querySelector("tbody");
var $fetchBtn = document.querySelector("#get");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var count = 0;

$fetchBtn.addEventListener("click", renderTableRow)
$searchBtn.addEventListener("click", handleSearchButtonClick);

var filteredSightings = dataSet;

function renderTableRow() {
  if ($dateInput.value != '' || $cityInput.value != '' || $stateInput.value != '' || $countryInput.value != '' || $shapeInput.value != '') {
    $tbody.innerHTML = "";
    document.getElementById("date").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("country").value = "";
    document.getElementById("shape").value = "";
  }

  var sighting = filteredSightings[count];
  var fields = Object.keys(sighting);
  
  var $row = $tbody.insertRow($tbody.rows.length);
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    var $cell = $row.insertCell(i);
    $cell.innerText = sighting[field];
  }

  return count++;
}

function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredSightings.length; i++) {

    var sighting = filteredSightings[i];
    var fields = Object.keys(sighting);

    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {

      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }
}


function handleSearchButtonClick() {

  filteredSightings = dataSet;
  var filterDate = $dateInput.value.trim();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  if (filterDate != '') {
    filteredSightings = filteredSightings.filter(function(sighting) {
      var sightingDate = sighting.datetime;

      return sightingDate === filterDate;
    });
  }

  if (filterCity != '') {
    filteredSightings = filteredSightings.filter(function(sighting) {
      var sightingCity = sighting.city.toLowerCase();

      return sightingCity === filterCity;
    });
  }

  if (filterState != '') {
    filteredSightings = filteredSightings.filter(function(sighting) {
      var sightingState = sighting.state;

      return sightingState === filterState;
    });
  }

  if (filterCountry != '') {
    filteredSightings = filteredSightings.filter(function(sighting) {
      var sightingCountry = sighting.country;

      return sightingCountry === filterCountry;
    });
  }

  if (filterShape != '') {
    filteredSightings = filteredSightings.filter(function(sighting) {
      var sightingShape = sighting.shape;

      return sightingShape === filterShape;
    });
  }

  if (filterDate != '' || filterCity != '' || filterState != '' || filterCountry != '' || filterShape != '') {
    renderTable();
  }
}