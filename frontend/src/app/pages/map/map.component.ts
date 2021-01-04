import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ipInfo } from "src/app/models/ipinfo";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
  selector: "app-map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}
  public ipData: ipInfo;
  public cUser: User;
  ngOnInit() {
    this.cUser = this.authService.GetUser();
    this.http.get("https://ipinfo.io/?token=" + environment.IpInfoKey).subscribe(data => {

      this.ipData = data as ipInfo;

      var coord = this.ipData.loc.split(',');

      var myLatlng = new google.maps.LatLng(coord[0], coord[1]);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: true,
            styles: [{
                "elementType": "geometry",
                "stylers": [{
                  "color": "#1d2c4d"
                }]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#8ec3b9"
                }]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [{
                  "color": "#1a3646"
                }]
              },
              {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [{
                  "color": "#4b6878"
                }]
              },
              {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#64779e"
                }]
              },
              {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [{
                  "color": "#4b6878"
                }]
              },
              {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [{
                  "color": "#334e87"
                }]
              },
              {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#023e58"
                }]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#283d6a"
                }]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#6f9ba5"
                }]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [{
                  "color": "#1d2c4d"
                }]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                  "color": "#023e58"
                }]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#3C7680"
                }]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#304a7d"
                }]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#98a5be"
                }]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                  "color": "#1d2c4d"
                }]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#2c6675"
                }]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                  "color": "#9d2a80"
                }]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                  "color": "#9d2a80"
                }]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#b0d5ce"
                }]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [{
                  "color": "#023e58"
                }]
              },
              {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#98a5be"
                }]
              },
              {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [{
                  "color": "#1d2c4d"
                }]
              },
              {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [{
                  "color": "#283d6a"
                }]
              },
              {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#3a4762"
                }]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#0e1626"
                }]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#4e6d70"
                }]
              }
            ]
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: "Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    });


  }


}
