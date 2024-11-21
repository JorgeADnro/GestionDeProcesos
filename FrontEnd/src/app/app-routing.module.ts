import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarPacientesComponent } from './components/formularios/registrar-pacientes/registrar-pacientes.component';
import { IndexComponent } from './components/vistas/index/index.component'
import { ProfesionalesComponent } from './components/vistas/profesionales/profesionales.component';
import { PreciosComponent } from './components/vistas/precios/precios.component';
import { LoginComponent } from './components/formularios/login/login.component';
import { SignupComponent } from './components/formularios/signup/signup.component';
import { NotFoundComponent } from './components/complementos/not-found/not-found.component';
import { RoleGuard } from './components/complementos/RoleGuard';
import { DeniedComponent } from './components/complementos/denied/denied.component';
import { MapaComponent } from './components/vistas/mapa/mapa.component';
import { NosotrosComponent } from './components/vistas/nosotros/nosotros.component';
import { AvisoDePrivacidadComponent } from './components/complementos/aviso-de-privacidad/aviso-de-privacidad.component';
import { ReestablecerContComponent } from './components/formularios/reestablecer-cont/reestablecer-cont.component';
import { VerifyComponent } from './components/formularios/verify/verify.component';

const routes: Routes = [
  {path: 'Inicio', component: IndexComponent, data: {
    breadcrumb: 'Inicio'
  }},
  {path: 'RegistrarPaciente', canActivate: [RoleGuard], data: { 'expectedRoles': ['admin'], breadcrumb: 'Registro' }, component: RegistrarPacientesComponent},
  {path: 'VerProfesionales', canActivate: [RoleGuard], component: ProfesionalesComponent},
  {path: 'Precios', component: PreciosComponent, data: {breadcrumb: 'Inicio / Precios'}},
  {path: 'Login', component: LoginComponent , data: {breadcrumb: 'Login'}},
  {path: 'Signup', component: SignupComponent, data: {breadcrumb: 'Singup'}},
  {path: 'Denegado', component: DeniedComponent, data: {breadcrumb: 'Inicio / Denegado'}},
  {path: 'Mapa', component: MapaComponent, data: {breadcrumb: 'Inicio / Mapa'}},
  {path: 'Nosotros', component: NosotrosComponent, data: {breadcrumb: 'Inicio / Nosotros'}},
  {path: 'Policy',component: AvisoDePrivacidadComponent, data: {breadcrumb: 'Aviso de privacidad'}},
  {path: 'restablecer',component: ReestablecerContComponent, data: {breadcrumb: 'Login / Restablecer '}},
  {path: 'Verify',component: VerifyComponent, data: {breadcrumb: 'Login / Verify '}},
  {path: '**',component: NotFoundComponent, data: {breadcrumb: ''}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
