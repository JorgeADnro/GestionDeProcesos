import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReestablecerContComponent } from './reestablecer-cont.component';

describe('ReestablecerContComponent', () => {
  let component: ReestablecerContComponent;
  let fixture: ComponentFixture<ReestablecerContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReestablecerContComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReestablecerContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
