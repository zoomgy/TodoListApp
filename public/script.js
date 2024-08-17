const weeks = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
var weekday = weeks[d.getDay()];
var date = d.getDate();
var date = weekday + " " + date;
console.log(date);
document.querySelector(".date").innerHTML = date;