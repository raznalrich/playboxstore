import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ps5gamesComponent } from './ps5games.component';

describe('Ps5gamesComponent', () => {
  let component: Ps5gamesComponent;
  let fixture: ComponentFixture<Ps5gamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ps5gamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ps5gamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
