import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMerchantsComponent } from './all-merchants.component';

describe('AllMerchantsComponent', () => {
  let component: AllMerchantsComponent;
  let fixture: ComponentFixture<AllMerchantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMerchantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
