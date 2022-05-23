import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
 form:FormGroup;
 email:string;

  constructor( private acivateRoute: ActivatedRoute, private formBuilder: FormBuilder,private employeeService : EmployeeService,private route : Router) { }

  ngOnInit(): void {
    this.email = this.acivateRoute.snapshot.params.email;
    this.form = this.formBuilder.group({
      workEmail: [this.email, Validators.required],
      password:["", Validators.required],
     
     
    })
  }
  reset(){
    this.employeeService.EditPassword(this.form.value).then((data)=>this.route.navigate(['login']));
  }

}
