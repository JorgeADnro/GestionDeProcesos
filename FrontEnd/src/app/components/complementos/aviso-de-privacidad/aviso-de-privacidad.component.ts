import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-aviso-de-privacidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aviso-de-privacidad.component.html',
  styleUrl: './aviso-de-privacidad.component.css'
})
export class AvisoDePrivacidadComponent {

  loader = true;

  ngOnInit():void {
    setTimeout(()=>{
      this.loader = false;
    }, 2000);
  }

}
