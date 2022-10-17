import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostMainPageComponent } from './postMainPage/postMainPage.component';
import { PostRoutingModule } from './postRouting.module';
import { EditPostComponent } from './editPost/editPost.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPostComponent } from './addPost/addPost.component';
import { EditCommentComponent } from './editComment/editComment.component';



@NgModule({
  declarations: [
    PostMainPageComponent,
    EditPostComponent,
    AddPostComponent,
    EditCommentComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PostModule { }
