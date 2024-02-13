import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  private userNameSubject = new BehaviorSubject<string>('');

  setUserName(userName: string) {
    this.userNameSubject.next(userName);
  }

  getUserName(): Observable<string> {
    return this.userNameSubject.asObservable();
  }
}
