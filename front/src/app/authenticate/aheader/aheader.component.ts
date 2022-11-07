import { Component, OnInit } from '@angular/core';
import { ITokenUser } from '../../../models/user';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-aheader',
  templateUrl: './aheader.component.html',
  styleUrls: ['./aheader.component.scss']
})
export class AheaderComponent implements OnInit {
  user: ITokenUser = {
    id: 0,
    role: '',
    lastName: '',
    firstName: '',
    email: ''
  }
  constructor(private tokenService: TokenService,) { }

  ngOnInit(): void {
    this.user = this.tokenService.getPayload()
    console.log(this.user)
  }

  logout(): void{
    this.tokenService.clearToken()
  }

}
