import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './services/authGuard.service';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./authenticate/authenticate.module')
      .then(m => m.AuthenticateModule), canActivate:[AuthGuard]
  },
  {
    path: 'authenticate', loadChildren: () => import('./authenticate/authenticate.module')
      .then(m => m.AuthenticateModule), canActivate:[AuthGuard]
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },

  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
