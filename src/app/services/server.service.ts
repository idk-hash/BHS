import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private _url!:string;

  constructor() { this.connectToServer(); }

  private async connectToServer() {
    this._url = (await CapacitorHttp.get({url: 'https://api.allorigins.win/get?url=https://pastebin.com/raw/YjYEUC6K'})).data.contents}

  private set url(newUrl : string) {
    CapacitorHttp.get({url: newUrl})
    .then(
      (res)=>{ 
        if (res.data.contents != "Server is running") 
          console.error("500 Internal Server Error : Server Offline")
        else {
          console.log("200 Connected to Server : URL successfully retrieved");
          this._url = newUrl;}})
    .catch(
      (e)=>{
        console.error("404 Bad Gateway : Could not connect to server \n", e);})}

  public get url() { return this._url; }

  public register (_email:string, _product_id:string) { // MUST CHANGE LOCALHOST IN PROD
    return CapacitorHttp.post({url: this._url+'/register', data: {email: _email, product_id: _product_id}, headers: {'Content-Type':'application/json'}})   
    .then(
      (res)=>{
        switch(res.data) {
          case "Invalid Product ID":
            console.error("Invalid Product ID");
            return "Invalid Product ID";
          case "Registration Complete":
            console.log("Registration Complete");
            return "Registration Complete";
          case "Product already registered":
              console.log("Product already registered");
              return "Product already registered";
          default:
            console.error("Unkown Error");
            return "Unkown Error";}})
    .catch(
      (e)=>{
        console.error("404 Bad Gateway : Could not connect to server \n", e);
        return "Could not connect to server";})}

  public login (_password:string, _product_id:string) { // MUST CHANGE LOCALHOST IN PROD
          return CapacitorHttp.post({url: this._url+'/login', data: {password: _password, product_id: _product_id}, headers: {'Content-Type':'application/json'}})   
          .then(
            (res)=>{
              switch(res.data) {
                case "Invalid":
                  console.error("Invalid Credentials");
                  return "Invalid Credentials";
                case "Success":
                  console.log("Login Successful");
                  return "Login Successful";
                case "Product Unregistered":
                  console.log("Product Unregistered");
                  return "Product Unregistered";
                default:
                  console.error("Unkown Error");
                  return "Unkown Error";}})
          .catch(
            (e)=>{
              console.error("404 Bad Gateway : Could not connect to server \n", e);
              return "Could not connect to server";})}
}
