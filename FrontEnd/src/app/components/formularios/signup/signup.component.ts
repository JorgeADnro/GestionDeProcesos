import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteServices } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formulario: FormGroup;
  pacienteService = inject(PacienteServices)
  router = inject(Router);
  loader = true;
  siteKey: string = "6Lf2774pAAAAACmp4Ko2AygVn7T9CbmjL2ZJNNfB";
  protected aFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.formulario = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]]
    });

    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.formulario.valid) {
      const response = await this.pacienteService.singup(this.formulario.value);
      this.router.navigate(['/Inicio']);
    } else {
      console.log("El formulario no es válido. Por favor, corrige los campos.");
    }
  }

  passwordValidator(control: FormControl) {
    // Validación de contraseña: al menos 8 caracteres, máximo 16, al menos una mayúscula, una minúscula, un número y un carácter especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(control.value) ? null : { invalidPassword: true };
  }
}
