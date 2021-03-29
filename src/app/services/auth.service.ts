import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  isAuthentificated : boolean = false;
  constructor(public auth: AngularFireAuth,
              private router: Router) { }
  login(email: string, password: string)
  {
    return new Promise<void>((resolve,reject)=>
      {
        this.auth.signInWithEmailAndPassword(email,password)
            .then((response: any)=>
            {
              this.router.navigate(['students/liste']);
              sessionStorage.setItem('user',email);
              this.isAuthentificated = true;
              resolve();
            },(error)=>
            {
              reject(error);
            });
      });        
  }
  logout()
  {
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);
    this.isAuthentificated = false;
  }
  isLoggedIn()
  {
    return this.isAuthentificated;
  }
}
