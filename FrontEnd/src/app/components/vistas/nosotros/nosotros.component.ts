import { Component } from '@angular/core';
import { InactivityService } from 'src/app/services/inactivity-service.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent {

  loader = true;

  constructor(private inactivityService: InactivityService) {} 

  ngOnInit():void {
    setTimeout(()=>{
      this.loader = false;
    }, 2000);
    this.inactivityService.startTimer();
  }

}