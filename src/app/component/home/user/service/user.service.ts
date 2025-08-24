import { Injectable, signal, PLATFORM_ID, Inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedInUser, LoginToken, User } from '../../types/user';
import { toObservable } from '@angular/core/rxjs-interop';
import { clear } from 'console';
import { isPlatformBrowser } from '@angular/common';
@Injectable()
export class UserService {
  private isAuthenticated = signal<boolean>(false);
  private LoggedInUserDetails = signal<LoggedInUser>({} as LoggedInUser);
  private autoExpireTimer : any;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
     if (isPlatformBrowser(this.platformId)) {
    this.loadToken();
  }
  }
  createUser(user: User): Observable<any> {
    const url = 'http://localhost:5000/user/sign-up';
    return this.http.post(url, user);
  }

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated();
  }

  // Returning as Observable
  get isUserAuthenticated$(): Observable<boolean> {
    return toObservable(this.isAuthenticated);
  }

  // Returning as Observable
  get loggedInUser$(): Observable<LoggedInUser> {
    return toObservable(this.LoggedInUserDetails);
  }

  login(email: string, password: string): Observable<any> {
    const url = 'http://localhost:5000/user/login';
    return this.http.post(url, { email: email, password: password });
  }

  saveTokenInStorage(loginToken: LoginToken) {
    loginToken.expires = 10;
    localStorage.setItem('access_token', loginToken.token);
    localStorage.setItem(
      'expires',
      new Date(Date.now() + loginToken.expires * 1000).toISOString()
    );

    // Saving all the user details to avoid calling api every time
    localStorage.setItem('name', loginToken.user.name);
    localStorage.setItem('email', loginToken.user.email);
    localStorage.setItem('address', loginToken.user.address);
    localStorage.setItem('state', loginToken.user.state);
    localStorage.setItem('city', loginToken.user.city);
    localStorage.setItem('pin', loginToken.user.pin);
    localStorage.setItem('phNumber', loginToken.user.phNumber);

    // Updating signal for user Authentication true
    this.autoLogoutTimer(loginToken.expires * 1000);
    this.isAuthenticated.set(true);
    this.LoggedInUserDetails.set(loginToken.user);
  }


  clearLocalStorage() {
    localStorage.clear();
    this.LoggedInUserDetails.set({} as LoggedInUser);
    this.isAuthenticated.set(false);
    clearTimeout(this.autoExpireTimer);
  }

  // To retain the state of login after refresh
  loadToken() {
    if (!isPlatformBrowser(this.platformId)) return;
    const token = localStorage.getItem('access_token');
    const expires = localStorage.getItem('expires');

    if (!token || !expires) return;

    const expiresIn = new Date(expires).getTime() - Date.now();
    if (expiresIn > 0) {
      const user = {
        name: localStorage.getItem('name') || '',
        email: localStorage.getItem('email') || '',
        address: localStorage.getItem('address') || '',
        state: localStorage.getItem('state') || '',
        city: localStorage.getItem('city') || '',
        pin: localStorage.getItem('pin') || '',
        phNumber: localStorage.getItem('phNumber') || '',
      };
      this.isAuthenticated.set(true);
      this.LoggedInUserDetails.set(user);
      this.autoLogoutTimer(expiresIn);
    } else {
      this.clearLocalStorage();
    }
  }

  private autoLogoutTimer(timeInMs: number) : void {
    this.autoExpireTimer = setTimeout(()=> {
      this.clearLocalStorage()
  }, timeInMs);
}

}
