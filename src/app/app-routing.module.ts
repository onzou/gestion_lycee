import { AuthGuardService } from './services/auth-guard.service';
import { StatistiquesComponent } from './components/stats/statistiques/statistiques.component';
import { SingleClasseComponent } from './components/management/single-classe/single-classe.component';
import { ListClassComponent } from './components/management/list-class/list-class.component';
import { SingleStudentComponent } from './components/management/single-student/single-student.component';
import { ListStudentComponent } from './components/management/list-student/list-student.component';
import { SubscribeStudentComponent } from './components/management/subscribe-student/subscribe-student.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = 
[
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "students/inscription", 
    component: SubscribeStudentComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: "students/liste",
    component: ListStudentComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: "students/details/:id/:classe",
    component: SingleStudentComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: "auth/login",
    component: LoginComponent
  },
  {
    path: "classes/details/:id/:nom",
    component: SingleClasseComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: "classes/liste",
    component: ListClassComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: "stats",
    component: StatistiquesComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
