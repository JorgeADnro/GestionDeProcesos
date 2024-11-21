import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteServices } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'] 
})
export class VerifyComponent {
  loader = true;
  formulario: FormGroup;

  constructor(private pacienteService: PacienteServices, private router: Router,private formBuilder: FormBuilder) {
    this.formulario = new FormGroup({
      code: new FormControl()
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  async onSubmit() {
    try {
      const response = await this.pacienteService.verify(this.formulario.value);
      if (!response.error) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('userRole', response.userRole);
        this.showCorrectPopup();
        this.router.navigate(['/Inicio']).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
      } else {
        
      }
    } catch (error) {
      console.error(error);
      this.showErrorPopup();
    }
  }

  showCorrectPopup() {
    Swal.fire({
      title: "Bienvenido!",
      text: "Haz iniciado sesión correctamente!",
      icon: "success"
    });
  }

  showErrorPopup() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El código parece ser incorrecto!"
    });
  }
}
