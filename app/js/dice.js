var face=1;

var show = function() {
  document.getElementById("cube1").setAttribute('class', 'show'+face);
  document.getElementById("cube2").setAttribute('class', 'show'+face);
  if(face==6) {
    face=1;
  } else {
    face++;
  }
};

var timer=setInterval("show()", 1500);
