import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeePayService } from 'src/services/employee-pay.service';
import { EmployeeService } from 'src/services/employee.service';


@Component({
  selector: 'app-add-employee-pay',
  templateUrl: './add-employee-pay.component.html',
  styleUrls: ['./add-employee-pay.component.scss']
})
export class AddEmployeePayComponent implements OnInit {
  form: FormGroup;
  invalid=false;
  years = ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];
  mounths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  employees:any;
  constructor(private employeePay: EmployeePayService, private employee: EmployeeService,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<AddEmployeePayComponent>) { }

  ngOnInit(): void {
    this.initform();
    this.GetEmployees();
  }
  initform(): void {
    this.form = this.formBuilder.group({
      year: ["", Validators.required],
      mounth: ["", Validators.required],
      idEmployee: ["", Validators.required],
      status:["Not payed",Validators.required],
      prime: [0],
      ticketPassGift: [0],
      mealTicket: [0],
      fixedSalary: [0, Validators.required]
    });

  }
  onsubmit() {

    this.employeePay.saveEmp(this.form.value)
      .then((data) => {
        this.form.reset();
        this.dialog.close('Save');
       }).catch((err)=>{
        this.invalid=true;
       });
}
  
  GetEmployees(): void {
       this.employee.GetALL()
      .then((data) => {
       this.employees=data;
      
      });


  }
  get AddFormControl() {
    return this.form.controls;
  }

}
