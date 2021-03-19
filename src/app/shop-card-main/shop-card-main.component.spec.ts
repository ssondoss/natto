import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCardMainComponent } from './shop-card-main.component';

describe('ShopCardMainComponent', () => {
  let component: ShopCardMainComponent;
  let fixture: ComponentFixture<ShopCardMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCardMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
