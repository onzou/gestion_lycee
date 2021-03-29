import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  validateForm!: FormGroup;
  errorMessage: string;
  constructor(private auth: AuthService,
              private router: Router) {}
  ngOnInit(): void 
  {
    if(sessionStorage.getItem('user')!=null)
      this.router.navigate(['students/liste']);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  login(credentials): void 
  {
    this.auth.login(credentials.email,credentials.password)
        .then((response)=>
        {
          this.router.navigate(['students/liste']);
        }).catch((error)=>
        {
          this.errorMessage = "Email ou mot de passe incorrect";
        });
  }
}
