import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVacunaInfoComponent } from './show-vacuna-info.component';

describe('ShowVacunaInfoComponent', () => {
  let component: ShowVacunaInfoComponent;
  let fixture: ComponentFixture<ShowVacunaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVacunaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVacunaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
