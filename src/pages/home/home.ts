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
        let latLng = new google.maps.LatLng();

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
}