import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Obtener los roles esperados de los datos de la ruta
    const expectedRoles = route.data['expectedRoles'] as string[] | undefined;

    // Verificar si se proporcionaron roles esperados
    if (!expectedRoles || expectedRoles.length === 0) {
      // Si no se proporcionaron roles esperados, permitir el acceso
      return of(true);
    }

    // Obtener el rol actual del usuario desde el localStorage
    const userRole = localStorage.getItem('userRole');

    // Verificar si el usuario tiene al menos uno de los roles permitidos
    if (!userRole || !expectedRoles.includes(userRole)) {
      // Si el usuario no tiene ningún rol permitido, redirigirlo a una página de acceso denegado o a otra ruta
      this.router.navigate(['/Denegado']); // Cambia '/denied' por la ruta adecuada
      return of(false);
    }
    
    return of(true);
  }
}
