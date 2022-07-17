import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatModalComponent } from './seat-modal.component';

describe('SeatModalComponent', () => {
  let component: SeatModalComponent;
  let fixture: ComponentFixture<SeatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
