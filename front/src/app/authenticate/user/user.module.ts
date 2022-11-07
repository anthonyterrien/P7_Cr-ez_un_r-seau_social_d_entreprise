import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './userRouting.module';
import { UserEditComponent } from './userEdit/userEdit.component';


@NgModule({
  declarations: [
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
