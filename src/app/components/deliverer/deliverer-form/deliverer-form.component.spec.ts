import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererFormComponent } from './deliverer-form.component';

describe('DelivererFormComponent', () => {
  let component: DelivererFormComponent;
  let fixture: ComponentFixture<DelivererFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelivererFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelivererFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
