import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjectEmployeesComponent } from './prject-employees.component';

describe('PrjectEmployeesComponent', () => {
  let component: PrjectEmployeesComponent;
  let fixture: ComponentFixture<PrjectEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrjectEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrjectEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
