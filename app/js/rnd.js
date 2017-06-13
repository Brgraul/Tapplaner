function getRndBias(min, max, bias, influence) {
    var rnd = Math.floor(Math.random() * (max - min + 1)) + min;   // random in range (Including the boundaries)
        mix = Math.random() * influence;                           // random mixer
    return Math.floor(rnd * (1 - mix) + bias * mix);               // mix full range and bias
}

function eventPicker(eventlist, loading, method){
  var count = method.keys(eventlist).length;
  var edisp = getRndBias(0, count, 0, 0.8);
  var picked = eventlist[edisp];
  generateCard(picked, loading);
}

function generateCard(pickedevent, loading){
  document.getElementById("p1").src = pickedevent.profilePicture;
  document.getElementById("p2").href = 'https://www.facebook.com/events/'+pickedevent.id;
  document.getElementById("p3").href = 'http://maps.apple.com/?q='+pickedevent.venue.location.latitude+','+pickedevent.venue.location.longitude;
  document.getElementById("p4").innerHTML = pickedevent.name;
  document.getElementById("p5").innerHTML = pickedevent.venue.name;
  var esdate = new Date(pickedevent.startTime);
  var efdate = new Date(pickedevent.endTime);
  document.getElementById("p6").innerHTML = dater(esdate)+', '+ hourfix(esdate)+':'+minutefix(esdate)+'-'+ hourfix(efdate)+':'+minutefix(efdate);
  loading = false;
}

function nth(d) {
  if(d>3 && d<21) return 'th'; // thanks kennebec
  switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

function dater(d){
  var date = d.getDate(),
  month = "January,February,March,April,May,June,July,August,September,October,November,December"
  .split(",")[d.getMonth()];
  return (date+nth(date) +" "+month)
}

function minutefix(d){
  var minutes = d.getMinutes();
  if(minutes == 0){
    return '00'
  }
  else{
    return minutes
  }
}

function hourfix(d){
  var hour = d.getHours();
  if(hour == 0){
    return '00'
  }
  else{
    return hour
  }
}
