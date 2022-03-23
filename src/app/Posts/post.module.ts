import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { RouterModule, Routes } from '@angular/router';
import { PostService } from 'src/services/post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { DialogModalPostComponent } from './dialog-modal-post/dialog-modal-post.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PostsComponent },


]


@NgModule({
  declarations: [PostsComponent, DialogModalPostComponent],
  entryComponents: [
    DialogModalPostComponent,

  ],
  imports: [

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [PostService]
})
export class PostModule { }
