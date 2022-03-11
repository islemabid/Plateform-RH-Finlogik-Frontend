import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from 'src/services/departement.service';

@Component({
  selector: 'app-form-departement',
  templateUrl: './form-departement.component.html',
  styleUrls: ['./form-departement.component.css']
})
export class FormDepartementComponent implements OnInit {


  form: any;
  item1: any;
  currentid: any;
  dep: any;

  constructor(private ms: DepartementService, private router: Router, private acivateRoute: ActivatedRoute, private dialog: MatDialog) { }
  initform(item: any): void {

    //item? .attribut : yefhem ken si item.attribut fih valeur ye5ouha sinon ye5ou null
    this.form = new FormGroup({
      name: new FormControl(item?.name, [Validators.required]),
      description: new FormControl(item?.description, [Validators.required]),






    })

  }

  onsubmit() {

    console.log(this.form.value);
    const save = { ...this.item1, ...this.form.value }
    //:ma3neha kol element fil item1 twali bil element ili ktebtou jdid fil form

    //.then na3mlouha wa9t c'et bon il resultat fil resolve w nhebou ya3mel 7aja o5ra , 
    this.ms.saveDep(save)
      .then((data) => {

        this.router.navigate(['./Departements/departements'])


      })

  }


  ngOnInit(): void {

    this.currentid = this.acivateRoute.snapshot.params.id;//récupéer l'id il mawjoud fil url
    // if truely testiha bil  !! 
    if (!!this.currentid) {
      // je suis dans edit 
      //mech tjib il membre à modifier w t9olou jibli il formulaire fih les données de ce member
      this.ms.getDepById(this.currentid).then(
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
