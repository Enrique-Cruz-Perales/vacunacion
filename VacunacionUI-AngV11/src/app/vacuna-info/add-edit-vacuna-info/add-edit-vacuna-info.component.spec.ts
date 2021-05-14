import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVacunaInfoComponent } from './add-edit-vacuna-info.component';

describe('AddEditVacunaInfoComponent', () => {
  let component: AddEditVacunaInfoComponent;
  let fixture: ComponentFixture<AddEditVacunaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditVacunaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditVacunaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
