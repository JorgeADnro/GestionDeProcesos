import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { Ciudad } from 'src/app/models/ciudad';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PacienteServices } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-pacientes',
  templateUrl: './registrar-pacientes.component.html',
  styleUrls: ['./registrar-pacientes.component.css']
})
export class RegistrarPacientesComponent {

  pacienteForm: FormGroup;
  loader = true;
  id: string | null;
  private fileTmp: any;
  fileTypes: { [key: string]: string } = {};

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public sanitizer: DomSanitizer,
    private _pacienteService: PacienteServices,
    private aRoute: ActivatedRoute) {
    this.fileTmp = {};
    this.pacienteForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      apeP: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      apeM: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      calle: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      no: ['', Validators.required],
      col: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      ciudad: ['', [Validators.required]],
      cp: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      numTelCa: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      numTelAsp: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      numTelMaPa: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      mail: ['', [Validators.required, Validators.email]],
      coment: ['', Validators.required],
      fechReg: ['', Validators.required],
      foto: ['', Validators.required],
      cert: ['', Validators.required],
      compDom: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');

    this.fileTypes['foto'] = 'image/jpeg';
    this.fileTypes['cert'] = 'application/pdf';
    this.fileTypes['compDom'] = 'application/pdf';
  }
  ngOnInit(): void {
    this.obtenerPacientes();
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  getFile($event: any, fieldName: string): void {
    const [file] = $event.target.files;

    // Asegúrate de que fileTypes[fieldName] exista antes de intentar leerlo
    if (!this.fileTypes[fieldName]) {
      console.error(`Tipo de archivo para ${fieldName} no está configurado.`);
      return;
    }

    // Crea un nuevo Blob con el mismo contenido y establece el nuevo tipo
    const modifiedBlob = new Blob([file], { type: this.fileTypes[fieldName] });

    // Asegúrate de que fileTmp[fieldName] exista antes de intentar asignarle propiedades
    if (!this.fileTmp[fieldName]) {
      this.fileTmp[fieldName] = {};
    }

    this.fileTmp[fieldName].fileRaw = modifiedBlob;
    this.fileTmp[fieldName].fileType = this.fileTypes[fieldName];
  }

  sendFiles(): void {

    const body = new FormData();

    body.append('nom', this.pacienteForm.get('nom')?.value);
    body.append('apeP', this.pacienteForm.get('apeP')?.value);
    body.append('apeM', this.pacienteForm.get('apeM')?.value);
    body.append('calle', this.pacienteForm.get('calle')?.value);
    body.append('no', this.pacienteForm.get('no')?.value);
    body.append('col', this.pacienteForm.get('col')?.value);
    body.append('ciudad', this.pacienteForm.get('ciudad')?.value);
    body.append('numTelCa', this.pacienteForm.get('numTelCa')?.value);
    body.append('cp', this.pacienteForm.get('cp')?.value);
    body.append('numTelAsp', this.pacienteForm.get('numTelAsp')?.value);
    body.append('numTelMaPa', this.pacienteForm.get('numTelMaPa')?.value);
    body.append('mail', this.pacienteForm.get('mail')?.value);
    body.append('coment', this.pacienteForm.get('apeMPa')?.value);
    body.append('foto', this.fileTmp['foto'].fileRaw, this.fileTmp['foto'].fileType);
    body.append('cert', this.fileTmp['cert'].fileRaw, this.fileTmp['cert'].fileType);

    this._pacienteService.guardarPaciente(body).subscribe(res => {
      if (res) {
        Swal.fire('Se ha registrado el oftalmólogo!', res.message, 'success');
        setTimeout(() => {
          this.router.navigate(['/VerProfesionales']);
        }, 2000);
      }
    });


  }

  getBufferImageSrc(buffer: ArrayBuffer): SafeUrl {
    const blob = new Blob([buffer]);
    const imageUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getSanitizedImageUrl(base64String: string, imageType: string): SafeUrl {
    const imageUrl = `data:image/${imageType};base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }


  listPaciente: Paciente[] = [];


  obtenerPacientes() {
    this._pacienteService.getPacientes().subscribe(data => {
      console.log(data);
      this.listPaciente = data;
    }, error => {
      console.log(error);
    })
  }

  listCiudad: any[] = [
    { nom: 'Dolores Hidalgo' },
    { nom: 'Guanajuato' },
    { nom: 'Celaya' },
    { nom: 'Ciudad de México' },
    { nom: 'Monterrey' },
    { nom: 'Guadalajara' }
  ];

  capitalizeFirstLetter(controlName: string, event: any) {
    const inputValue = event.target.value;
    if (inputValue.length > 0) {
      const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      const control = this.pacienteForm.get(controlName);
      if (control) {
        control.setValue(capitalizedValue);
      }
    }
  }
}
