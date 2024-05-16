import { Injectable } from '@angular/core';
import { BluetoothSerial, ConnectionState } from 'bluetooth-serial';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {
  private message = "";

  receiveData(data:String){
    console.log(data);
    this.message += data;
    if(this.message.indexOf("\n") != this.message.length-1) return;
    this.execCommand();
    this.message = "";}

  execCommand(){
    if (this.message.indexOf("SOMECOMMAND ") == 0)
      BluetoothSerial.write({data:"Ok cool we got the great message that you sent, much live, bye."});
    else if (this.message.indexOf("OTHERCOMMAND ") == 0){
      var hello = JSON.parse(this.message.substring("OTHERCOMMAND ".length));
      hello.hello;
    }
    
      BluetoothSerial.write({data:"Ok cool we got the great message that you sent, much live, bye."});
  }

  async initBTconn(){
    if (!await this.checkExistingBluetooth()) this.openBluetoothConn();}

  async boot() {
    // BluetoothSerial.addListener("connectionChange", async ()=>{
    //   if(!await BluetoothSerial.isConnected()) await this.checkExistingBluetooth();});

    BluetoothSerial.addListener('data', (data) => this.receiveData(data.data));

    BluetoothSerial.addListener('connectionChange', 
    (state) => {
      if(state.state == ConnectionState.CONNECTED) BluetoothSerial.write({data: "\n.INIT_OK\n"});
      if(state.state == ConnectionState.NONE) BluetoothSerial.listen();
    });

    BluetoothSerial.listen();

      //    asyncScheduler.schedule(async function(st){
    //     this.schedule(st, 1000);
    //     if(await BluetoothSerial.isConnected() && (await BluetoothSerial.available()).available != 0) 
    //       console.log( (await BluetoothSerial.read()).data, st);}, 1000, 3); 
  }
    
  readbitch() {
    // BackgroundRunner.dispatchEvent({
    //   label: 'io.ionic.starter.check',
    //   event: 'hello',
    //   details: {data: "Welp"},
    // }).then((ppp:any)=>{console.log(ppp.res);
    // });

    BluetoothSerial.write({data: "\nINIT_OK\n"});
    // console.log((await BluetoothSerial.read()).data);
  }

  async checkExistingBluetooth(){
    (await BluetoothSerial.list()).devices.forEach(
      async (device) => {
        if(device.name?.indexOf("BHS000")==0) await BluetoothSerial.connect({address: device.address});});
    return (await BluetoothSerial.isConnected()).isConnected;}

  openBluetoothConn() {
    BluetoothSerial.addListener('discoverUnpaired', 
      (unpaired) => {unpaired.devices.forEach( 
        (device)=>{
          if(device.name?.indexOf("BHS000")==0) BluetoothSerial.connect({address: device.address});});});
    BluetoothSerial.discoverUnpaired();}

  constructor() {this.boot();}

}
