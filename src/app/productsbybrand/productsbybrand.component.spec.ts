import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsbybrandComponent } from './productsbybrand.component';

describe('ProductsbybrandComponent', () => {
  let component: ProductsbybrandComponent;
  let fixture: ComponentFixture<ProductsbybrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsbybrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsbybrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
