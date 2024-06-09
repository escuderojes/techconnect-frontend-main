import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRecluComponent } from './profile-reclu.component';

describe('ProfileRecluComponent', () => {
  let component: ProfileRecluComponent;
  let fixture: ComponentFixture<ProfileRecluComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileRecluComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileRecluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
