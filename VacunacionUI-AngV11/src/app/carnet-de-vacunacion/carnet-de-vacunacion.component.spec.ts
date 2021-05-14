import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetDeVacunacionComponent } from './carnet-de-vacunacion.component';

describe('CarnetDeVacunacionComponent', () => {
  let component: CarnetDeVacunacionComponent;
  let fixture: ComponentFixture<CarnetDeVacunacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarnetDeVacunacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnetDeVacunacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
