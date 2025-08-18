import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../types/user';
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  createUser(user: User): Observable<any> {
    const url = 'http://localhost:5000/user';
    return this.http.post(url, user);
  }
}
