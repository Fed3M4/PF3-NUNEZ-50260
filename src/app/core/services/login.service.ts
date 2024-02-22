import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userNameSubject = new BehaviorSubject<string>('');

  constructor() {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      this.userNameSubject.next(storedUserName);
    }
  }

  setUserName(userName: string): void {
    localStorage.setItem('userName', userName);
    this.userNameSubject.next(userName);
  }

  getUserName(): Observable<string> {
    return this.userNameSubject.asObservable();
  }
}