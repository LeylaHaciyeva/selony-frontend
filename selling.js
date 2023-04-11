

let week = document.querySelector(".week")
let day = document.querySelector(".day")
let hour = document.querySelector(".hour")
let minute = document.querySelector(".minute")
let second = document.querySelector(".second")

var sonzaman = new Date("Fri May 20, 2023 23:58:31").getTime();

var x = setInterval(function () {

  var now = new Date().getTime();

  var ferq = sonzaman - now;
  var weeks = Math.floor(ferq / (7 * 24 * 60 * 60 * 1000))
  var days = Math.floor((ferq % (7 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000))
  var hours = Math.floor((ferq % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((ferq % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((ferq % (1000 * 60)) / 1000);
  week.innerHTML = weeks + `<br>` + `<p>week</p>`
  day.innerHTML = days + `<br>` + `<p>day</p>`
  hour.innerHTML = hours + `<br>` + `<p>hr</p>`
  minute.innerHTML = minutes + `<br>` + `<p>min</p>`
  second.innerHTML = seconds + `<br>` + `<p>sec</p>`



  if (ferq < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

