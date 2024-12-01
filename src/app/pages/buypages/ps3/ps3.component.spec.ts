import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ps3Component } from './ps3.component';

describe('Ps3Component', () => {
  let component: Ps3Component;
  let fixture: ComponentFixture<Ps3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ps3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ps3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
