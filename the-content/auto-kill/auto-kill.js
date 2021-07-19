$(document).ready(function(){

function getData(ajaxurl) { 
  return $.ajax({
    url: ajaxurl,
    type: 'GET',
  });
};

async function block() {
  console.log("Trying to censor based on location")
  var ipAddress = await getData("https://api.ipify.org/");
  console.log("ipAddress: " + ipAddress)
  var countryData = await getData('https://api.allorigins.win/get?url=' + encodeURIComponent('http://ipinfo.io/'+ipAddress+'/json'));
  console.log(countryData);
  var country = JSON.parse(countryData.contents).country
  console.log("country: " + country);
  //if country India hide appstore
  if(country.toUpperCase() != 'in'.toUpperCase()) {
    console.log('Country is not India')
    $(".not-india").removeClass('d-none');
  } else {
    console.log('Country is not India')
    $(".india").removeClass('d-none'); 
  }
  $('#status').delay(350).fadeOut('slow');
  return $('#preloader').delay(350).fadeOut('slow').promise();
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function autoKill() {
  var promise = block();
  promise.then(function(){
    console.log('auto kill start')
    sleep(7500).then(()=> {
      alert("Auto killing the page now :(");
      document.getElementsByTagName('body')[0].remove();
    })
  })
}

$(window).on('load', function () {
  autoKill()
});

});