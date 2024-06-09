import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagMainRecluComponent } from './pag-main-reclu.component';

describe('PagMainRecluComponent', () => {
  let component: PagMainRecluComponent;
  let fixture: ComponentFixture<PagMainRecluComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagMainRecluComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagMainRecluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
