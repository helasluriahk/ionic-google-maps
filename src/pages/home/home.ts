import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    // akses geolocation
    this.geolocation.getCurrentPosition()
      .then((position) => {               // resolve
        // posisi latitude dan longitude
        let latLng = new google.maps.LatLng(
          //position.coords.latitude,
          //position.coords.longitude
          -6.893426, 107.602941
        );
        
        // option map yang dibuka
        let mapOptions = {
          center: latLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        // eksekusi
        this.map = new google.maps.Map(
          this.mapElement.nativeElement, mapOptions
        );
      }, (error) => {                 // reject
        console.log(error);
      });
  }

  // membuat marker pada map
  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    let content = "<h3>Information!</h3>";
    this.addInfoWindow(marker, content);
  }

  // buat info window
  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}