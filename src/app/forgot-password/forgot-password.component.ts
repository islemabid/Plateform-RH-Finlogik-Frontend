import { Component, OnInit } from '@angular/core';
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
 email:string;
  constructor( private employeeService : EmployeeService,private mailService:MailService,private alertNotification:AlertNotificationService) { }

 
  ngOnInit(): void {
  
  }
  async resetpassword(){
   
   await this.employeeService.forgotPassword(this.email).then((data)=>this.employee=data);
   
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
