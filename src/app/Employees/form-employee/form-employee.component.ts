
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from 'src/services/departement.service';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {
  response: any;
  form: any;
  item1: any;
  currentid: any;
  dep: any;

  constructor(private ms: EmployeeService, private router: Router, private acivateRoute: ActivatedRoute, private dialog: MatDialog) { }
  initform(item: any): void {
    //item? .attribut : yefhem ken si item.attribut fih valeur ye5ouha sinon ye5ou null
    this.form = new FormGroup({
      firstName: new FormControl(item?.firstName, [Validators.required]),
      lastName: new FormControl(item?.lastName, [Validators.required]),
      personnelEmail: new FormControl(item?.personnelEmail, [Validators.required]),
      personnelPhone: new FormControl(item?.personnelPhone, [Validators.required]),
      adress: new FormControl(item?.adress, [Validators.required]),
      password: new FormControl(item?.password, [Validators.required]),
      diplome: new FormControl(item?.diplome, [Validators.required]),
      birthDate: new FormControl(item?.birthDate, [Validators.required]),
      gender: new FormControl(item?.gender, [Validators.required]),
      city: new FormControl(item?.city, [Validators.required]),
      region: new FormControl(item?.region, [Validators.required]),
      contry: new FormControl(item?.contry, [Validators.required]),
      postalCode: new FormControl(item?.postalCode, [Validators.required]),
      Cin: new FormControl(item?.cin, [Validators.required]),
      workEmail: new FormControl(item?.workEmail, [Validators.required]),
      workPhone: new FormControl(item?.workPhone, [Validators.required]),
      cnssNumber: new FormControl(item?.cnssNumber, [Validators.required]),
      hoursPerWeek: new FormControl(item?.hoursPerWeek, [Validators.required]),
      contratType: new FormControl(item?.contratType, [Validators.required]),
      imageUrl: new FormControl(item?.imageUrl, [Validators.required]),
      idRole: new FormControl(item?.idRole, [Validators.required])
    })

  }
  public uploadFinished = (event: any) => {
    this.response = event.toString();
    console.log(this.response.toString());
  }

  onsubmit() {
    console.log(this.form.value);
    const saveEmp = { ...this.item1, ...this.form.value }
    //:ma3neha kol element fil item1 twali bil element ili ktebtou jdid fil form
    saveEmp.imageUrl = this.response
    //.then na3mlouha wa9t c'et bon il resultat fil resolve w nhebou ya3mel 7aja o5ra , 
    this.ms.saveEmp(saveEmp)
      .then((data) => {
        console.log(data);
        console.log(data.imageUrl);
        this.router.navigate(['./Employees/employees'])


      })

  }


  ngOnInit(): void {
    /*this.ms1.GetALL().then(
      (data) => {
        this.dep = data;
        console.log(this.dep)
      }
    )*/
    this.currentid = this.acivateRoute.snapshot.params.id;//récupéer l'id il mawjoud fil url
    // if truely testiha bil  !! 
    if (!!this.currentid) {
      // je suis dans edit 
      //mech tjib il membre à modifier w t9olou jibli il formulaire fih les données de ce member
      this.ms.getEmpById(this.currentid).then(
        (item) => {
          this.item1 = item; this.initform(this.item1);
          console.log(item);
        }
      );


    }

    else {
      //je suis dans add
      this.initform(null);
    }
    this.initform(null);


  }

}


