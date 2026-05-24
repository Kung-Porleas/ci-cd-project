import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

export interface SlideItem {
  image: string;
  title?: string;
  description?: string;
}


@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Slider {
    // @Input() slides: SlideItem[] = [];
      slides: SlideItem[] = [
    {
      image: 'https://picsum.photos/id/1015/800/400',
      title: 'Mountain',
      description: 'Beautiful view',
    },
    {
      image: 'https://picsum.photos/id/1016/800/400',
      title: 'Ocean',
      description: 'Relaxing waves',
    },
    {
      image: 'https://picsum.photos/id/1018/800/400',
      title: 'Forest',
      description: 'Nature vibes',
    },
  ];
}
