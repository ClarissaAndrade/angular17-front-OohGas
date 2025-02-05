import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererEditComponent } from './deliverer-edit.component';

describe('DelivererEditComponent', () => {
  let component: DelivererEditComponent;
  let fixture: ComponentFixture<DelivererEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelivererEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelivererEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
