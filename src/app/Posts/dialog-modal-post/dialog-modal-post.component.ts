import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-dialog-modal-post',
  templateUrl: './dialog-modal-post.component.html',
  styleUrls: ['./dialog-modal-post.component.scss']
})
export class DialogModalPostComponent implements OnInit {
  public titre = "ADD New Post";
  form: FormGroup;
  response: any;
  matcher: any;
  posts: any;
  action: string = "save";
  hide = true;
  invalid=false;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<DialogModalPostComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.initform();
    console.log(this.editData);
    if (this.editData) {
      this.titre = "Update Post"
      this.action = "edit";
      this.form.controls["shortDescription"].setValue(this.editData.shortDescription);
      this.form.controls["longDescription"].setValue(this.editData.longDescription);


    }
    this.GetAllPosts();
  }
  GetAllPosts() {
    this.postService.GetALL().then((data) => {
      this.posts = data;
     
    }
    )
  }
  initform(): void {
    this.form = this.formBuilder.group({
      longDescription: ["", Validators.required],
      shortDescription: ["", Validators.required]

    });
  }

  get AddFormControl() {
    return this.form.controls;
  }

  onsubmit() {
    if (!this.editData) {
      console.log(this.form.value);
      const savePost = { ...this.form.value } 
      this.postService.savePost(savePost)
        .then((data) => {
        
          this.form.reset();
          this.dialog.close('Save');
         }).catch(err=>{
           this.invalid=true;
         })


    }
    else {
      this.edit();
    }

  }
  edit() {
    let id = this.editData.id;
    console.log(id);
    const EditPost = { ...this.form.value, id }
    this.postService.EditPost(EditPost)
      .then((data) => {
        console.log(data);
        this.form.reset();
        this.dialog.close('Update');


      });
  }


}
