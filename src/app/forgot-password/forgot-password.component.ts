import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from 'src/models/Email';
import { AlertNotificationService } from 'src/services/alert-notification.service';
import { EmployeeService } from 'src/services/employee.service';
import { MailService } from 'src/services/mail.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
 employee:any;
 form:FormGroup;
 invalid=false;
  constructor( private employeeService : EmployeeService,private formBuilder: FormBuilder,private mailService:MailService,private alertNotification:AlertNotificationService) { }

 
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      workEmail: ["", Validators.required,Validators.email],
      
     
     
    })
  }
  get AddFormControl() {
    return this.form.controls;
  }
  async resetpassword(){
 
  
   let obj={...this.form.value};
   await this.employeeService.forgotPassword(obj.workEmail)
   .then((data)=>this.employee=data)
   .catch(err=>{
      this.invalid=true;

   })
   
   let Mail = {
    ToEmail:this.employee.workEmail,
     Subject: `Forgot your password? We can help.`,
    Body:`Hello ${this.employee.firstName}`
    } as Email;
  this.mailService.sendMail(Mail).then(()=>{
  this.alertNotification.showNotification("check our gmail","OK");
 });
}
}
