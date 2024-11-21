import { Component } from '@angular/core';
import { InactivityService } from 'src/app/services/inactivity-service.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  loader = true;
  constructor(private inactivityService: InactivityService) {} 

  ngOnInit():void {
    setTimeout(()=>{
      this.loader = false;
    }, 2000);
    this.inactivityService.startTimer();
  }
}
