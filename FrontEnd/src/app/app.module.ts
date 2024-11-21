import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RegistrarPacientesComponent } from './components/formularios/registrar-pacientes/registrar-pacientes.component';
import { LoginComponent } from './components/formularios/login/login.component';
import { SignupComponent } from './components/formularios/signup/signup.component';
import { IndexComponent } from './components/vistas/index/index.component';
import { NavbarComponent } from './components/complementos/navbar/navbar.component';
import { FooterComponent } from './components/complementos/footer/footer.component';
import { ProfesionalesComponent } from './components/vistas/profesionales/profesionales.component';
import { PreciosComponent } from './components/vistas/precios/precios.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NgxPayPalModule } from 'ngx-paypal';
import { NotFoundComponent } from './components/complementos/not-found/not-found.component';
import { RoleGuard } from './components/complementos/RoleGuard';
import { DeniedComponent } from './components/complementos/denied/denied.component';
import { SearchComponent } from './components/complementos/search/search.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MapaComponent } from './components/vistas/mapa/mapa.component';
import { NosotrosComponent } from './components/vistas/nosotros/nosotros.component';
import {MatIconModule} from '@angular/material/icon';
import { ReestablecerContComponent } from './components/formularios/reestablecer-cont/reestablecer-cont.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyComponent } from './components/formularios/verify/verify.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarPacientesComponent,
    LoginComponent,
    SignupComponent,
    IndexComponent,
    NavbarComponent,
    FooterComponent,
    ProfesionalesComponent,
    PreciosComponent,
    NotFoundComponent,
    DeniedComponent,
    SearchComponent,
    MapaComponent,
    NosotrosComponent,
    ReestablecerContComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module,
    BreadcrumbModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
