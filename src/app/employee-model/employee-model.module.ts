import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EmployeeModel {
  id:number=0;
  firstName:string='';
  lastName:string='';
  email:string='';
  mobil:string='';
  salary:string=''
 }
