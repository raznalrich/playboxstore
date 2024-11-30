import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderproductlistComponent } from './orderproductlist.component';

describe('OrderproductlistComponent', () => {
  let component: OrderproductlistComponent;
  let fixture: ComponentFixture<OrderproductlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderproductlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderproductlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
