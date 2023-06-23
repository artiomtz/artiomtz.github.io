// JS file - Artiom Tsimkin

// Title type-writer
var i = 0;
var txt1 = "Welcome :)";
var txt2 = "Artiom Tsimkin";
var speed1 = 150;
var speed2 = 50;
var url = document.URL;

// background animation
function BackAnimation() {
  var pathEls = document.querySelectorAll("path");
  for (var i = 0; i < pathEls.length; i++) {
    var pathEl = pathEls[i];
    var offset = anime.setDashoffset(pathEl);

    pathEl.setAttribute("stroke-dashoffset", offset);
    anime({
      targets: pathEl,
      strokeDashoffset: [offset, 0],
      duration: anime.random(2000, 4000),
      delay: anime.random(1000, 5000),
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
      autoplay: true,
    });
  }
}

// wait for home to load
function waitLoad() {
  //check browser
  var isChromium = window.chrome;
  var winNav = window.navigator;
  var vendorName = winNav.vendor;
  var isOpera = typeof window.opr !== "undefined";
  var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
  var isIOSChrome = winNav.userAgent.match("CriOS");

  if (isIOSChrome) {
    // is Google Chrome on IOS - not alert
  } else if (
    isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false
  ) {
    // is Google Chrome - not alert
  } else {
    // not Google Chrome
    alert("Keep calm and use Chrome.");
  }

  // run background animation
  BackAnimation();

  //type title
  var delayInMilliseconds = 3000; // delay
  setTimeout(function () {
    //code to be executed after delay
    type1();
  }, delayInMilliseconds);

  mapboxgl.accessToken =
    "pk." +
    "eyJ1IjoiYXJ0aW9tdHoiLCJhIjoi" +
    "Y2xpNTdtaTUwMGJzcjNlcGg1Z2J3Z" +
    "jI4cyJ9.Eh195q6LoTu6KsZhgr8psg";

  var map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/streets-v9",
    center: [-80.541, 43.468], // starting position
    zoom: 13, // starting zoom
  });
  map.addControl(new mapboxgl.NavigationControl()); // Add zoom and rotation controls to the map.
}

// type welcome
function type1() {
  if (i < txt1.length) {
    setTimeout(type1, speed1);
    document.getElementById("top").innerHTML += txt1.charAt(i);
    i++;
  } else {
    i += 3;
    var delayInMilliseconds = 2000; // delay between titles
    setTimeout(function () {
      type2(); //code to be executed after delay
    }, delayInMilliseconds);
  }
}

// delete welcome
function type2() {
  if (i > 0) {
    setTimeout(type2, speed2);
    document.getElementById("top").innerHTML = document
      .getElementById("top")
      .innerHTML.substring(0, i - 1);
    i--;
  } else {
    //i+=3;
    var delayInMilliseconds = 1000; // delay between titles
    setTimeout(function () {
      type3(); //code to be executed after delay
    }, delayInMilliseconds);
  }
}

// type my name
function type3() {
  if (i < txt2.length) {
    setTimeout(type3, speed1);
    document.getElementById("top").innerHTML += txt2.charAt(i);
    i++;
  }
}

// scroll bar on project page
function scrollProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 90;
  document.getElementById("myBar").style.width = scrolled + "%";
}

// copy button
function copytext(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
  alert("Copied :)");
}

// clean url after link clicks in Resume
window.addEventListener("hashchange", function () {
  window.history.replaceState(null, null, url);
});

// scroll bar on project page
window.onscroll = function () {
  scrollProgress();
};
