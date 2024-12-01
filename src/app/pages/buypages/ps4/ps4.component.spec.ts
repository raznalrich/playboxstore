import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ps4Component } from './ps4.component';

describe('Ps4Component', () => {
  let component: Ps4Component;
  let fixture: ComponentFixture<Ps4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ps4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ps4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
