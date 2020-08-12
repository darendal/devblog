import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitchartComponent } from './gitchart.component';

describe('GitchartComponent', () => {
  let component: GitchartComponent;
  let fixture: ComponentFixture<GitchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
