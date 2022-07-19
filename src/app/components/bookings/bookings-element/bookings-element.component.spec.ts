import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsElementComponent } from './bookings-element.component';

describe('BookingsElementComponent', () => {
  let component: BookingsElementComponent;
  let fixture: ComponentFixture<BookingsElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
