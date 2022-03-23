import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/Helper/MyErrorStateMatcher ';
import { RoleService } from 'src/services/role.service';
@Component({
  selector: 'app-dialog-modal-role',
  templateUrl: './dialog-modal-role.component.html',
  styleUrls: ['./dialog-modal-role.component.scss']
})
export class DialogModalRoleComponent implements OnInit {
  public titre = "ADD New Role";
  form: FormGroup;
  response: any;
  matcher: any;
  roles: any;
  action: string = "save";
  hide = true;

  constructor(
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<DialogModalRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.initform();
    console.log(this.editData);
    if (this.editData) {
      this.titre = "Update Role"
      this.action = "edit";
      this.form.controls["name"].setValue(this.editData.name);

    }
    this.GetAllRoles();
  }
  GetAllRoles() {
    this.roleService.GetALL().then((data) => {
      this.roles = data;
      console.log(this.roles);
    }
    )
  }
  initform(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],

    });
    this.matcher = new MyErrorStateMatcher();

  }

  onsubmit() {
    if (!this.editData) {
      console.log(this.form.value);
      const saveRole = { ...this.form.value }

      //.then na3mlouha wa9t c'et bon il resultat fil resolve w nhebou ya3mel 7aja o5ra , 
      this.roleService.saveRole(saveRole)
        .then((data) => {
          console.log(data);
          this.form.reset();
          this.dialog.close('Save');



        });


    }
    else {
      this.edit();
    }

  }
  edit() {
    let id = this.editData.id;
    console.log(id);
    const EditRole = { ...this.form.value, id }
    this.roleService.EditRole(EditRole)
      .then((data) => {
        console.log(data);
        this.form.reset();
        this.dialog.close('Update');


      });
  }

}
