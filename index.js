var $tbody = document.querySelector("#myTableBody");
var $fetchBtn = document.querySelector("#get");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $pager = document.querySelector("#myPager");
var count = 0;

$fetchBtn.addEventListener("click", renderTableRow)
$searchBtn.addEventListener("click", handleSearchButtonClick);

var filteredSightings = dataSet;

$.fn.pageMe = function(opts){
  var $this = this,
      defaults = {
          perPage: 7,
          showPrevNext: false,
          hidePageNumbers: false
      },
      settings = $.extend(defaults, opts);

  var listElement = $this;
  var perPage = settings.perPage; 
  var children = listElement.children();
  var pager = $('.pager');

  if (typeof settings.childSelector!="undefined") {
      children = listElement.find(settings.childSelector);
  }

  if (typeof settings.pagerSelector!="undefined") {
      pager = $(settings.pagerSelector);
  }

  var numItems = children.size();
  var numPages = Math.ceil(numItems/perPage);

  pager.data("curr",0);

  if (settings.showPrevNext){
      $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
  }

  var curr = 0;
  while(numPages > curr && (settings.hidePageNumbers==false)){
      $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
      curr++;
  }

  if (settings.showPrevNext){
      $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
  }

  pager.find('.page_link:first').addClass('active');
  pager.find('.prev_link').hide();
  if (numPages<=1) {
      pager.find('.next_link').hide();
  }
  pager.children().eq(1).addClass("active");

  children.hide();
  children.slice(0, perPage).show();

  pager.find('li .page_link').click(function(){
      var clickedPage = $(this).html().valueOf()-1;
      goTo(clickedPage,perPage);
      return false;
  });
  pager.find('li .prev_link').click(function(){
      previous();
      return false;
  });
  pager.find('li .next_link').click(function(){
      next();
      return false;
  });

  function previous(){
      var goToPage = parseInt(pager.data("curr")) - 1;
      goTo(goToPage);
  }

  function next(){
      goToPage = parseInt(pager.data("curr")) + 1;
      goTo(goToPage);
  }

  function goTo(page){
      var startAt = page * perPage,
          endOn = startAt + perPage;

      children.css('display','none').slice(startAt, endOn).show();

      if (page>=1) {
          pager.find('.prev_link').show();
      }
      else {
          pager.find('.prev_link').hide();
      }

      if (page<(numPages-1)) {
          pager.find('.next_link').show();
      }
      else {
          pager.find('.next_link').hide();
      }

      pager.data("curr",page);
      pager.children().removeClass("active");
      pager.children().eq(page+1).addClass("active");

  }
};

function renderTableRow() {
  if ($dateInput.value != '' || $cityInput.value != '' || $stateInput.value != '' || $countryInput.value != '' || $shapeInput.value != '') {
    $tbody.innerHTML = "";
    $pager.innerHTML = "";
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
  $pager.innerHTML = "";
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
  $('#myTableBody').pageMe({pagerSelector:'#myPager',showPrevNext:true,hidePageNumbers:false,perPage:50});
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