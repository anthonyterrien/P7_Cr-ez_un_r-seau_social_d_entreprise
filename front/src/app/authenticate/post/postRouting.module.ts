import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostMainPageComponent } from './postMainPage/postMainPage.component';
import { EditPostComponent } from './editPost/editPost.component';
import { AddPostComponent } from './addPost/addPost.component';
import { EditCommentComponent } from './editComment/editComment.component';

const routes: Routes = [
  { path: '', component: PostMainPageComponent },
  { path: 'edit/:id', component: EditPostComponent },
  { path: 'edit/comment/:id', component: EditCommentComponent },
  { path: 'add', component: AddPostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
