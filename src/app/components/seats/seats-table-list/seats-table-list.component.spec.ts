import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsTableListComponent } from './seats-table-list.component';

describe('SeatsTableListComponent', () => {
  let component: SeatsTableListComponent;
  let fixture: ComponentFixture<SeatsTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatsTableListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatsTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
