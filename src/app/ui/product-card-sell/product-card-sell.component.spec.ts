import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardSellComponent } from './product-card-sell.component';

describe('ProductCardSellComponent', () => {
  let component: ProductCardSellComponent;
  let fixture: ComponentFixture<ProductCardSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardSellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
