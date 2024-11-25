import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellSinglePageComponent } from './sell-single-page.component';

describe('SellSinglePageComponent', () => {
  let component: SellSinglePageComponent;
  let fixture: ComponentFixture<SellSinglePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellSinglePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
