import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsRequsetsComponent } from './merchants-requsets.component';

describe('MerchantsRequsetsComponent', () => {
  let component: MerchantsRequsetsComponent;
  let fixture: ComponentFixture<MerchantsRequsetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantsRequsetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsRequsetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
