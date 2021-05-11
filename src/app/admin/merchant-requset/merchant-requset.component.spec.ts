import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantRequsetComponent } from './merchant-requset.component';

describe('MerchantRequsetComponent', () => {
  let component: MerchantRequsetComponent;
  let fixture: ComponentFixture<MerchantRequsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantRequsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantRequsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
