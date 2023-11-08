import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInizializationComponent } from './game-inizialization.component';

describe('GameInizializationComponent', () => {
  let component: GameInizializationComponent;
  let fixture: ComponentFixture<GameInizializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameInizializationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameInizializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
