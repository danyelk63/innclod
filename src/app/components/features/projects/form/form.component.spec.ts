import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormComponent } from './form.component';

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
