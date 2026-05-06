import { Component, Input, OnDestroy, OnInit } from '@angular/core';

interface Slide {
  image: string;
  title?: string;
}

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() slides: Slide[] = [];
  @Input() autoPlay = true;
  @Input() autoPlaySpeed = 5000;

  currentIndex = 0;
  timeoutId: any;

  ngOnInit(): void {
    if (this.autoPlay) {
      this.startAutoPlay();
    }

    this.slides = [
      {
        image: 'images/welcome.png',
        title: 'welcome',
      },
      {
        image: 'images/discount-off.png',
        title: 'welcome',
      },
      {
        image: 'images/fidelity.png',
        title: 'welcome',
      }
    ]
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.stopAutoPlay();
    this.timeoutId = setInterval(() => this.nextSlide(), this.autoPlaySpeed);
  }

  stopAutoPlay(): void {
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
    }
  }

  nextSlide(): void {
    if (this.slides.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide(): void {
    if (this.slides.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }
}
