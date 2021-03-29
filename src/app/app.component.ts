import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  title = 'gestion-lycee';
  constructor(public auth: AuthService){}
  disconnect()
  {
   this.auth.logout();
  }
}
