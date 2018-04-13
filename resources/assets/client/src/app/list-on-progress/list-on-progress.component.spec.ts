import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOnProgressComponent } from './list-on-progress.component';

describe('ListOnProgressComponent', () => {
  let component: ListOnProgressComponent;
  let fixture: ComponentFixture<ListOnProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOnProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOnProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
