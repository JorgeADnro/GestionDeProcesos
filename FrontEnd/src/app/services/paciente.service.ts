import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, from } from 'rxjs';
import { Paciente } from '../models/paciente';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class PacienteServices {

  private baseUrl: string;
  router = inject(Router);


  constructor(private http:HttpClient) { 
      this.baseUrl = 'http://localhost:9090/api'
   }

  getPacientes(): Observable<any>{
    return this.http.get<any[]>(this.baseUrl + '/pac', this.createHeaders());
  }

  getCiudades(): Observable<any>{
    return this.http.get<any[]>(this.baseUrl + '/pac/ciu');
  }

  guardarPaciente(aspirante: FormData): Observable<any> {
    return this.http.post(this.baseUrl + '/pac', aspirante);
  }

  eliminarPaciente(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/pac/' + id);
  }

  obtenerPaciente(id: string): Observable<any>{
    return this.http.get(this.baseUrl + '/pac' + id);
  }

  singup(formValue: any){
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}/usersReg/registerReg`, formValue)
    )
  }

  login(formValue: any){
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}/usersReg/loginReg`, formValue)
    )
  }

  verify(formValue: any){
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}/usersReg/verify`, formValue)
    )
  }

  logout(): Observable<any> {
    return from(
      this.http.post<any>(`${this.baseUrl}/usersReg/logout`, {})
    ).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        this.router.navigate(['/login']);
      })
    );
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
  }

  restablecerPassword(formValue: any) {
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}/forgot-password`, formValue)
    )
  }

}

