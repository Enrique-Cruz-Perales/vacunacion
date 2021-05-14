import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCarnetDeVacunacionComponent } from './add-edit-carnet-de-vacunacion.component';

describe('AddEditCarnetDeVacunacionComponent', () => {
  let component: AddEditCarnetDeVacunacionComponent;
  let fixture: ComponentFixture<AddEditCarnetDeVacunacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCarnetDeVacunacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCarnetDeVacunacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
