import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellordersproductlistComponent } from './sellordersproductlist.component';

describe('SellordersproductlistComponent', () => {
  let component: SellordersproductlistComponent;
  let fixture: ComponentFixture<SellordersproductlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellordersproductlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellordersproductlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
