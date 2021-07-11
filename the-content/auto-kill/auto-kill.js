$(document).ready(function(){

function block() {
  console.log("Trying to censor based on location")
  var flag = false;
  $.get("https://api.ipify.org/", function(ipAddress, status){
    console.log("ipAddress: " + ipAddress + "\nstatus: " + status)
    if(status == "success") {
      $.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent('http://ipinfo.io/'+ipAddress+'/json'), function (data) {
          var country = JSON.parse(data.contents).country
          console.log("country: " + country);
          //if country India hide appstore
          if(country.toUpperCase() != 'in'.toUpperCase()) {
            console.log('Country is not India')
            flag = true
            $(".not-india").removeClass('d-none');
          } else {
            $(".india").removeClass('d-none'); 
          }
          $('#status').delay(350).fadeOut('slow');
          $('#preloader').delay(350).fadeOut('slow');
      });
    }
  });
}

$(window).on('load', function () {
  block()
});

});

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function autoKill(url) {
  monitoredWindow = window.open(url, '_blank');
  sleep(2500);
  console.log("Shutting the website"+ url +" down.");
  monitoredWindow.close() ;
}