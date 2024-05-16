import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class RegisterPage {

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-z]{2,4}$"),]),
    product_id: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$"),]),});
  get email() {return this.form.get('email');}
  get product_id() {return this.form.get('product_id');}

  errMessage = "" ;

  public async onSubmit() {
    if (this.form.valid) {
      this.errMessage = "";
      let res = await this.server.register(this.form.value.email!, this.form.value.product_id!);
      if (res != "Registration Complete") this.errMessage = res;
      else console.log("GOING TO CONSOLE");}
    else {
      if (this.form.controls.email.errors?.['required'] && this.form.controls.product_id.errors?.['required']) this.errMessage = "Fields are empty";
      else if (this.form.controls.email.errors?.['pattern'] && this.form.controls.product_id.errors?.['pattern']) this.errMessage = "Invalid Credentials";
      else if (this.form.controls.email.errors?.['pattern']) this.errMessage = "Invalid email address";
      else if (this.form.controls.product_id.errors?.['required']) this.errMessage = "Product ID is required";
      else if (this.form.controls.email.errors?.['required']) this.errMessage = "Email is required";
      else if (this.form.controls.product_id.errors?.['pattern']) this.errMessage = "Invalid Product ID";}
  }

  constructor(public server : ServerService) {}
}
