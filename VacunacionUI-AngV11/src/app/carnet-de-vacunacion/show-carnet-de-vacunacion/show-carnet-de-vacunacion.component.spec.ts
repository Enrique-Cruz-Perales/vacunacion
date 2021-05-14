import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCarnetDeVacunacionComponent } from './show-carnet-de-vacunacion.component';

describe('ShowCarnetDeVacunacionComponent', () => {
  let component: ShowCarnetDeVacunacionComponent;
  let fixture: ComponentFixture<ShowCarnetDeVacunacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCarnetDeVacunacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCarnetDeVacunacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
