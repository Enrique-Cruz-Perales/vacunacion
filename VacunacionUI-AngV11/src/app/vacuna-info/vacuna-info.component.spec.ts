import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunaInfoComponent } from './vacuna-info.component';

describe('VacunaInfoComponent', () => {
  let component: VacunaInfoComponent;
  let fixture: ComponentFixture<VacunaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
