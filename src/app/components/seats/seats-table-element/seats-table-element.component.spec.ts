import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsTableElementComponent } from './seats-table-element.component';

describe('SeatsTableElementComponent', () => {
  let component: SeatsTableElementComponent;
  let fixture: ComponentFixture<SeatsTableElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatsTableElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatsTableElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
