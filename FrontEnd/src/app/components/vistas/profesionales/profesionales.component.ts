import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Paciente } from 'src/app/models/paciente';
import { PacienteServices } from 'src/app/services/paciente.service';
import { ToastrService } from 'ngx-toastr';
import { InactivityService } from 'src/app/services/inactivity-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent {

  loading = true;
  loader = true;
  errorLoading: boolean = false;
  userRole: string | null = null;
  isAdmin2 = false;

  ngOnInit(): void {
    this.obtenerPacientes();
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    this.userRole = localStorage.getItem('userRole');
    this.isAdmin();
    this.inactivityService.startTimer();
  }

  constructor(private _pacienteService: PacienteServices,
    private toastr: ToastrService,
    public sanitizer: DomSanitizer,
    private inactivityService: InactivityService) {
  }

  listPaciente: Paciente[] = [];

  obtenerPacientes() {
    this._pacienteService.getPacientes().subscribe(data => {
      console.log(data);
      this.listPaciente = data;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = true;
      this.errorLoading = true;
    });
  }

  isAdmin() {
    if (this.userRole === "admin") {
      this.isAdmin2 = true;
      console.log(this.isAdmin2);
    }
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

  eliminarPaciente(id: any) {
    console.log('ID a eliminar:', id); // Agregar esta línea para verificar el ID
    Swal.fire({
      title: "Estás seguro?",
      text: "No podrás recuperar estos datos!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._pacienteService.eliminarPaciente(id).subscribe(data => {
          this.obtenerPacientes();
        }, error => {
          console.log(error);
        });
      }
    });
  }
  openPdf(pdfBase64: String) {
    const pdfWindow = window.open("");
    if (pdfWindow) {
      pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64," + String(pdfBase64) + "'></iframe>");
    } else {
      console.error("No se pudo abrir la ventana del navegador para mostrar el PDF.");
    }
  }

}
