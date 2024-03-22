import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList } from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';

import { BluetoothSerial } from 'bluetooth-serial';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MessageComponent],
})
export class HomePage{
  private data = inject(DataService);
  public testtt = "ldld ";
  public devvv!:any;

  async boot() {
    BluetoothSerial.addListener("connectionChange", async (g)=>{
      if(await BluetoothSerial.isConnected()) BluetoothSerial.write({data: " kkkHELLLOOOOOOO\n"});});
    if (!await this.checkExistingBluetooth()) this.openBluetoothConn();}

  async checkExistingBluetooth(){
    (await BluetoothSerial.list()).devices.forEach(
      (device) => {
        if(device.name == "RNBT-925B") BluetoothSerial.connect( {address: device.address});});
    return (await BluetoothSerial.isConnected()).isConnected;}

  openBluetoothConn() {
    BluetoothSerial.addListener('discoverUnpaired', 
      (unpaired) => {unpaired.devices.forEach( 
        (device)=>{
          if(device.name == "RNBT-925B") BluetoothSerial.connect({address: device.address});});});
    BluetoothSerial.discoverUnpaired();}

  constructor() {this.boot();}


  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
}