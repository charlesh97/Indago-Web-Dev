import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User, Device } from '../../data/db.interfaces';

import {MapInfoWindow, MapMarker} from '@angular/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //Unused / temporary TODO DELETE
  private itemsCollection : AngularFirestoreCollection<string>;
  private uid : string = 'vYwiwD9NWVQwXvtJXFgbk89waP42';

  // Google Cloud JSON objects
  user : Observable<User>;
  device : Observable<Device>;

  // UI linked variables set by cloud data
  bleEnable : boolean = false;
  lowPowerEnable : boolean = false;
  gpsFreq : number;
  uploadPeriod : bigint;
  readyToDisplay : boolean = false;

  // Google Maps
  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
  center = {lat: 24, lng: 12};
  markerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 15;
  //display?: google.maps.LatLngLiteral;

  constructor(private afs: AngularFirestore) {
    //deviceList = afs.collection<string>('')
    var doc = afs.collection('users').doc<User>(this.uid);
    this.user = doc.valueChanges(); //subscribe to the document with the array
  }

  ngOnInit(): void {
  }

  deviceChanged($event){
    console.log($event.value);
    var doc = this.afs.collection('device-database').doc<Device>($event.value);
    this.device = doc.valueChanges();
    doc.get().subscribe(x => {
      var data : Device = x.data();
      this.bleEnable = data.bleEnable;
      this.lowPowerEnable = data.lowPowerEnable;
      this.gpsFreq = data.gpsFreq;
      this.uploadPeriod = data.uploadPeriod;
      this.readyToDisplay = true;  

      var coord = new google.maps.LatLng(data.currentLat, data.currentLong);
      this.center = {lat: data.currentLat, lng: data.currentLong};
      this.markerPositions = [];
      this.markerPositions.push(coord.toJSON());

      //TODO: If the data is undefined then display an error 
      //and don't display data
    });
  }

  trackingEnableToggle($event){
    // Push tracking enable to the cloud
  }

  bleEnableToggle($event){
    // Push ble to the cloud
  }

  lowPowerToggle($event){
    // Push power mode to the cloud
  }

  uploadPeriodChange($event){
    //Push upload period back to the cloud
  }

  trackingPeriodChange($event){
    //Push tracking period to the cloud
  }

  /***** Google Maps Interactions *****/
  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }
  /************************************/
}
