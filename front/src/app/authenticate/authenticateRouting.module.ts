import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlayoutComponent } from './alayout/alayout.component';

const routes: Routes = [
  {
    path: '', component: AlayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: '', loadChildren: () => import('./post/post.module')
          .then(m => m.PostModule)
      },
      {
        path: 'post', loadChildren: () => import('./post/post.module')
          .then(m => m.PostModule)
      },
      {
        path: 'user', loadChildren: () => import('./user/user.module')
          .then(m => m.UserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticateRoutingModule { }
