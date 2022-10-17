import { Component, OnInit } from '@angular/core';
import { ICredential, ISignup } from '../../../models/user';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: ISignup = {
    lastName: '',
    firstName: '',
    pseudo: '',
    email: '',
    password: ''
  }
  login: ICredential = {
    pseudo: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.authService.signup(this.form).subscribe(
      data => {
        this.login.pseudo = this.form.pseudo
        this.login.password = this.form.password
        this.authService.login(this.login).subscribe(
          data => {
            this.tokenService.saveToken(data.access_token)
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }
}
