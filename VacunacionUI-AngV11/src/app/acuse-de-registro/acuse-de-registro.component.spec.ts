import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuseDeRegistroComponent } from './acuse-de-registro.component';

describe('AcuseDeRegistroComponent', () => {
  let component: AcuseDeRegistroComponent;
  let fixture: ComponentFixture<AcuseDeRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcuseDeRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcuseDeRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
