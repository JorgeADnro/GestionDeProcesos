import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteServices } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reestablecer-cont',
  templateUrl: './reestablecer-cont.component.html',
  styleUrls: ['./reestablecer-cont.component.css'] 
})
export class ReestablecerContComponent {
  loader = true;
  formulario: FormGroup;

  constructor(private pacienteService: PacienteServices, private router: Router,private formBuilder: FormBuilder) {
    this.formulario = new FormGroup({
      email: new FormControl()
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  async submitForm() {
    try {
      const response = await this.pacienteService.restablecerPassword(this.formulario.value);
      this.showCorrectPopup();
    } catch (error) {
      console.error(error);
    }
  }
  

  showCorrectPopup() {
    Swal.fire({
      title: "Listo!",
      text: "Revisa tu correo para recuperar tu contraseña!",
      icon: "success"
    });
  }
}
