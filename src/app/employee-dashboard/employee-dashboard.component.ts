import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { EmployeeModel } from '../employee-model/employee-model.module';
ApiService
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  constructor(private _ApiService:ApiService) { }
  employeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData:any;
  showAdd !:boolean;
  showUpdate !:boolean

  formValue =new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null),
    mobil: new FormControl(null),
    salary: new FormControl(null)

  })

  ngOnInit(): void {
    this.getAllEmployee()
  }

  ClickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;

  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobil=this.formValue.value.mobil;
    this.employeeModelObj.salary=this.formValue.value.salary;
    this._ApiService.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      alert("Employee Added Successfuly");
      this.formValue.reset();
      let ref=document.getElementById("cancle");
      ref?.click();
      this.getAllEmployee()
      
    },
    error=>{
      alert("Something went error")
    })


  }

  getAllEmployee(){
    this._ApiService.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;

    })
  }
 deleteEmployeeDetails(row:any){
   this._ApiService.deleteEmployee(row.id)
   .subscribe(res=>{
     alert("Employee Deleted")
     this.getAllEmployee()
   })
 }

 onEdit(row:any){
   this.showAdd=false;
   this.showUpdate=true
   this.employeeModelObj.id=row.id;
   this.formValue.controls['firstName'].setValue(row.firstName);
   this.formValue.controls['lastName'].setValue(row.lastName);
   this.formValue.controls['email'].setValue(row.email);
   this.formValue.controls['mobil'].setValue(row.mobil);
   this.formValue.controls['salary'].setValue(row.salary);

 }
 updateEmployeeDetails(){
  this.employeeModelObj.firstName=this.formValue.value.firstName;
  this.employeeModelObj.lastName=this.formValue.value.lastName;
  this.employeeModelObj.email=this.formValue.value.email;
  this.employeeModelObj.mobil=this.formValue.value.mobil;
  this.employeeModelObj.salary=this.formValue.value.salary;
  this._ApiService.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
  .subscribe(res=>{
    alert("Updated Successfully")
    this.formValue.reset();
    let ref=document.getElementById("cancle");
    ref?.click();
    this.getAllEmployee()
  })

 }

}
