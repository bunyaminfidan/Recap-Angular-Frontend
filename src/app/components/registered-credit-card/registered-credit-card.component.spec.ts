import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCreditCardComponent } from './registered-credit-card.component';

describe('RegisteredCreditCardComponent', () => {
  let component: RegisteredCreditCardComponent;
  let fixture: ComponentFixture<RegisteredCreditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredCreditCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
