import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlayoutComponent } from './alayout/alayout.component';
import { AheaderComponent } from './aheader/aheader.component';
import { AuthenticateRoutingModule } from './authenticateRouting.module';


@NgModule({
  declarations: [
    AlayoutComponent,
    AheaderComponent
  ],
  imports: [
    CommonModule,
    AuthenticateRoutingModule
  ]
})
export class AuthenticateModule { }
