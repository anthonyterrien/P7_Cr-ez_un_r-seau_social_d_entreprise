import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ICredential } from '../../../models/user';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: ICredential = {
    pseudo: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {}

  onSubmit(): void{
    console.log(this.form)
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenService.saveToken(data.access_token)
      },
      err => console.log(err)
    )
  }
}
