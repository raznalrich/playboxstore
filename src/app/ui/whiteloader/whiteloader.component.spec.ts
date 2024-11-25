import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteloaderComponent } from './whiteloader.component';

describe('WhiteloaderComponent', () => {
  let component: WhiteloaderComponent;
  let fixture: ComponentFixture<WhiteloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiteloaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
