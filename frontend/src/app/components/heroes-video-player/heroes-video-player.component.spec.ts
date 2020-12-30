import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesVideoPlayerComponent } from './heroes-video-player.component';

describe('HeroesVideoPlayerComponent', () => {
  let component: HeroesVideoPlayerComponent;
  let fixture: ComponentFixture<HeroesVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesVideoPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
