import { Component, ElementRef, Input, OnInit,ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  lat: number;
  lng: number;
  map: GoogleMap;
  @ViewChild('map')mapRef: ElementRef;

  @Input() coords:string;

  constructor() { 
  }

  ngOnInit() {

    console.log("ngOnInit");

    const latLng = this.coords.split(',');
    this.lat = Number(latLng[0]);
    this.lng = Number(latLng[1]);
    
  }

  ngAfterViewInit() { 

    this.maps();
    
  }


  async maps(){
    console.log("Entro a maps");
    
    const newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: this.mapRef.nativeElement, // reference to the capacitor-google-map element
      apiKey: environment.mapsKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: this.lat,
          lng: this.lng,
        },
        zoom: 8, // The initial zoom level to be rendered by the map
      },
    });
  }

}
