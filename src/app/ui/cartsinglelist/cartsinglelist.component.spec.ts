import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartsinglelistComponent } from './cartsinglelist.component';

describe('CartsinglelistComponent', () => {
  let component: CartsinglelistComponent;
  let fixture: ComponentFixture<CartsinglelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartsinglelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartsinglelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
