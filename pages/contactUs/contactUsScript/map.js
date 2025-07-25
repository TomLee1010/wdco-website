var map = L.map('map').setView([22.3367, 114.1473], 19);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([22.3367, 114.1473]).addTo(map);
map.setMinZoom(10);

marker.bindPopup('NCB Innovation Centre, 888 Lai Chi Kok Road, Kowloon, Hong Kong<br><a href="https://www.google.com/maps/dir/22.3529265,114.0960895/AdTech+Innovation+Limited,+NCB+INNOVATION+CENTRE,+UNIT+A2-A6,+9%2FF,+888+Lai+Chi+Kok+Rd,+Lai+Chi+Kok/@22.3478254,114.0803098,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x49d5bd0a6e53ff27:0xc3bf189eb2a4e475!2m2!1d114.145836!2d22.335433?entry=ttu">Direction</a>').openPopup();