import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMenuModule} from 'ng-zorro-antd/menu';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import { LoginComponent } from './components/auth/login/login.component';
import { SubscribeStudentComponent } from './components/management/subscribe-student/subscribe-student.component';
import { ListStudentComponent } from './components/management/list-student/list-student.component';
import { HeaderComponent } from './components/header/header.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SingleStudentComponent } from './components/management/single-student/single-student.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ListClassComponent } from './components/management/list-class/list-class.component';
import { ToastrModule } from 'ngx-toastr'
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { SingleClasseComponent } from './components/management/single-classe/single-classe.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { StatistiquesComponent } from './components/stats/statistiques/statistiques.component'
import { NgApexchartsModule } from "ng-apexcharts";
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubscribeStudentComponent,
    ListStudentComponent,
    HeaderComponent,
    SingleStudentComponent,
    ListClassComponent,
    SingleClasseComponent,
    StatistiquesComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    NgApexchartsModule,
    WavesModule,
    MDBBootstrapModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NzIconModule,
    NzStatisticModule,
    NzModalModule,
    NzSelectModule,
    NzTabsModule,
    NzSkeletonModule,
    NzDescriptionsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCardModule,
    NzLayoutModule,
    NzFormModule,
    AngularFireDatabaseModule,
    NzMenuModule,
    NzInputNumberModule,
    NzToolTipModule,
    AngularFireAuthModule,
    NzGridModule,
    NzBreadCrumbModule,
    NzTableModule,
    ToastrModule.forRoot(),
    NzDatePickerModule,
    NzAlertModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
