// JS file - Artiom Tsimkin

// Title type-writer
var i = 0;
var txt1 = 'Welcome :)';
var txt2 = 'Artiom Tsimkin';
var speed1 = 150;
var speed2 = 50;


// wait for home to load
function waitLoad() {
	
	BackAnimation();

	//check browser
	var isChromium = window.chrome;
	var winNav = window.navigator;
	var vendorName = winNav.vendor;
	var isOpera = typeof window.opr !== "undefined";
	var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
	var isIOSChrome = winNav.userAgent.match("CriOS");

	if (isIOSChrome) {
	   // is Google Chrome on IOS - not alert
	} else if(
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
	
	
	//type title
	var delayInMilliseconds = 3000; // delay
	setTimeout(function() {
	//code to be executed after delay
	type1();
	}, delayInMilliseconds);
	
	
	
	
		var mymap = L.map('mapid').setView([43.468889,-80.54], 15);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYXJ0aW9tdHoiLCJhIjoiY2pxNXMwODliMjd3bzQzc2I2dXIyZ3B1dSJ9.iRENPZbY6-feUHjiWjcf8Q'
}).addTo(mymap);

}


// background animation
function BackAnimation() {
	var pathEls = document.querySelectorAll('path');
	for (var i = 0; i < pathEls.length; i++) {
		var pathEl = pathEls[i];
		var offset = anime.setDashoffset(pathEl);
		
		pathEl.setAttribute('stroke-dashoffset', offset);
		anime({
		targets: pathEl,
		strokeDashoffset: [offset, 0],
		duration: anime.random(1500, 4000),
		delay: anime.random(1000, 2000),
		loop: true,
		direction: 'alternate',
		easing: 'easeInOutSine',
		autoplay: true
		});
	}
}

		
// type welcome
function type1() {
	if (i < txt1.length) {
		setTimeout(type1, speed1);
		document.getElementById("top").innerHTML += txt1.charAt(i);
		i++;
	}
	else {
		i+=3;
		var delayInMilliseconds = 2000; // delay between titles
		setTimeout(function() {
		  type2(); //code to be executed after delay
		}, delayInMilliseconds);
	}
}


// delete welcome
function type2() {
	if (i > 0) {
		setTimeout(type2, speed2);
		document.getElementById("top").innerHTML = document.getElementById("top").innerHTML.substring(0, i - 1);
		i--;
	}
	else {
		//i+=3;
		var delayInMilliseconds = 1000; // delay between titles
		setTimeout(function() {
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
window.onscroll = function() {scrollProgress()};
function scrollProgress() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
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


// map
////////function myMap() {
//	var mapProp= {
//		center:new google.maps.LatLng(43.468889,-80.54),
//		zoom:14,
//	};
//	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	
	
	

//}