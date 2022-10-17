import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IDataUser, ISingleUser } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IDataUser>{
    return this.http.get<IDataUser>(environment.base_url_users + '/all')
  }

  getUser(uid: number | string | null): Observable<ISingleUser>{
    return this.http.get<ISingleUser>(environment.base_url_users + '/' + uid)
  }
}
