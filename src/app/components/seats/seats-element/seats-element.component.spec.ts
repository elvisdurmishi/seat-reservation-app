import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsElementComponent } from './seats-element.component';

describe('SeatsElementComponent', () => {
  let component: SeatsElementComponent;
  let fixture: ComponentFixture<SeatsElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatsElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatsElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
