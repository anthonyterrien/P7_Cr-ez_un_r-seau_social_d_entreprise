import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, IUserForUpdate } from '../../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-userEdit',
  templateUrl: './userEdit.component.html',
  styleUrls: ['./userEdit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: IUser = {
    id: 0,
    lastName: '',
    firstName: '',
    pseudo: '',
    email: '',
    password: '',
    role: '',
    updatedAt: '',
    createdAt: '',
    deletedAt: null,
  };
  userForUpdate: IUserForUpdate = {
    lastName: '',
    firstName: '',
    pseudo: '',
    email: '',
    password: '',
  }

  constructor(
    private activated: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    let uid = this.activated.snapshot.paramMap.get('uid')
    await this.userService.getUser(uid).toPromise()
  }

  async onSubmit() {
    console.log(this.user)
    await this.router.navigate(['/authenticate']);
  }

}
