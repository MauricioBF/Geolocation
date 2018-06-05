let marker_list = [];
let aux = 0;
let title_screen = document.querySelector('.div-marker-title');
let title_screen_input = document.querySelector('.div-marker-title input');
let title_screen_end = document.querySelector('#marker-title-end');
let title_screen_cancel = document.querySelector('#marker-title-cancel');
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -32.040579, lng: -52.089248 },
        zoom: 17
    });
    var infoWindow = new google.maps.InfoWindow({ map: map });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Sua localização foi encontrada.');
            map.setCenter(pos);
            var current_location = new google.maps.Marker({
                position: pos,
                map: map,
                icon: 'images/icons/location-icon.png'
            });
        });
    }
    window.onload = function() {
        marker_list = JSON.parse(localStorage.getItem('marker_local_list'));
        let vetor = JSON.parse(localStorage.getItem('marker_local_list'));
        var cont = 0;
        while (cont<vetor.length) {
            addMarker(vetor[cont].lat, vetor[cont].text);
            cont+=1
        }
    };
    google.maps.event.addListener(map, 'click', function (e) {
        title_screen.style.left = '0px'; //True abre - False fecha
        title_screen_end.addEventListener('click', function() {
            var test = e.latLng;
            var marker = new google.maps.Marker({
                position: e.latLng,
                map: map
            });
            var infowindow = new google.maps.InfoWindow({
                content: title_screen_input.value
            });
            marker.addListener('click', function () {
                infowindow.open(marker.get('map'), marker);
            });
            if (aux == 0) {
                marker_list.push({ 'lat': e.latLng, 'text': title_screen_input.value });
                localStorage.setItem('marker_local_list', JSON.stringify(marker_list));
                aux = 1;
            }
            title_screen_input.value = "";
            title_screen.style.left = '-100%';
            location.reload();
        });
        title_screen_cancel.addEventListener('click', function() {
            title_screen_input.value = "";
            title_screen.style.left = '-100%';
        });
        title_screen_input.focus();
        aux = 0;
    });
    function addMarker(location, text) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        var infowindow = new google.maps.InfoWindow({
            content: text
        });
        marker.addListener('click', function () {
            infowindow.open(marker.get('map'), marker);
        });
    }
}
