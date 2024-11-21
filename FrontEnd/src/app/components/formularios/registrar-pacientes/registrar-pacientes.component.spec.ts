import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPacientesComponent } from './registrar-pacientes.component';

describe('RegistrarPacientesComponent', () => {
  let component: RegistrarPacientesComponent;
  let fixture: ComponentFixture<RegistrarPacientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarPacientesComponent]
    });
    fixture = TestBed.createComponent(RegistrarPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
