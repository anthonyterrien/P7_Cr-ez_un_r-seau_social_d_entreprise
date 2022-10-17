import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICredential, ISignup } from '../../models/user';
import { IToken } from '../../models/token';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: ICredential): Observable<IToken>{
    return this.http.post<IToken>(environment.base_url_users + '/login', credentials)
  }

  signup(signup: ISignup): Observable<ISignup>{
    return this.http.put<ISignup>(environment.base_url_users, signup)
  }
}
