import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.scss']
})
export class UpdateProfilComponent implements OnInit {
 currentid:string;
 item1:any;
 form:FormGroup;
  formBuilder: any;
  constructor(private acivateRoute: ActivatedRoute,private employeeService: EmployeeService,private router:Router) { }

  ngOnInit(): void {
    this.currentid = this.acivateRoute.snapshot.params.id;
  
    if (!!this.currentid) {
     
      this.employeeService.getEmpById(this.currentid).then(
        (item) => {
          this.item1 = item; 
          this.initform(this.item1);
         
        }
      );


    }
  }
  update(){
    const saveprofil = { ...this.item1, ...this.form.value }
    console.log(saveprofil);
    this.employeeService.EditEmp(saveprofil)
      .then((data) => {
        
        this.router.navigate(['./profil'])


      })

  }
    
  
  initform(item: any): void {

       this.form =new FormGroup({
        firstName:new FormControl (item?.firstName, [Validators.required]),
        lastName:new FormControl (item?.lastName, [Validators.required]),
        personnelEmail:new FormControl (item?.personnelEmail, [Validators.required]),
        personnelPhone:new FormControl (item?.personnelPhone, [Validators.required]),
        adress:new FormControl (item?.adress, [Validators.required]),
        password:new FormControl (item?.password, [Validators.required]),
        diplome:new FormControl (item?.diplome, [Validators.required]),
        birthDate:new FormControl (item?.birthDate, [Validators.required]),
        gender: new FormControl (item?.gender, [Validators.required]),
        city: new FormControl (item?.city, [Validators.required]),
        region:new FormControl (item?.region, [Validators.required]),
        contry:new FormControl (item?.contry, [Validators.required]),
        postalCode: new FormControl (item?.postalCode, [Validators.required]),
        Cin:new FormControl (item?.cin, [Validators.required]),
        workEmail: new FormControl (item?.workEmail, [Validators.required]),
        workPhone: new FormControl (item?.workPhone, [Validators.required]),
        cnssNumber: new FormControl (item?.cnssNumber,[ Validators.required]),
        hoursPerWeek:new FormControl (item?.hoursPerWeek, [Validators.required]),
        imageUrl:new FormControl ( item?.imageUrl, [Validators.required]),
        idRole:new FormControl (item?.idRole, [Validators.required]),
        idPost:new FormControl ( item?.post.id, [Validators.required]),
        idContrat:new FormControl ( item?.contrat.id, [Validators.required]),
        idDepartement:new FormControl ( item?.idDepartement, [Validators.required]),
        endDate: new FormControl (item?.endDate),



    })
    
  }
}
