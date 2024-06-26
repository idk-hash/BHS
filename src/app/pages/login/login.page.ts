import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CapacitorHttp } from '@capacitor/core';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})

export class LoginPage /*implements OnInit*/ {

  form = new FormGroup({
    password: new FormControl('', [
      Validators.required,]),
    product_id: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$"),]),});
  get password() {return this.form.get('password');}
  get product_id() {return this.form.get('product_id');}

  errMessage = "" ;

  public async onSubmit() {
    if (this.form.valid) {
      this.errMessage = "";
      let res = await this.server.login(this.form.value.password!, this.form.value.product_id!);
      if(res != "Login Successful") this.errMessage = res;
      else console.log("GOING TO CONSOLE");}
    else {
      if (this.form.controls.password.errors?.['required'] && this.form.controls.product_id.errors?.['required']) this.errMessage = "Fields are empty";
      else if (this.form.controls.password.errors?.['pattern'] && this.form.controls.product_id.errors?.['pattern']) this.errMessage = "Invalid Credentials";
      else if (this.form.controls.password.errors?.['pattern']) this.errMessage = "Invalid password address";
      else if (this.form.controls.product_id.errors?.['required']) this.errMessage = "Product ID is required";
      else if (this.form.controls.password.errors?.['required']) this.errMessage = "Password is required";
      else if (this.form.controls.product_id.errors?.['pattern']) this.errMessage = "Invalid Product ID";}
  }

  constructor(public server : ServerService) {}
}