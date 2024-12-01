import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellordersComponent } from './sellorders.component';

describe('SellordersComponent', () => {
  let component: SellordersComponent;
  let fixture: ComponentFixture<SellordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellordersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
