import { BaseComponent } from '../base-component';

export class ImageComponent extends BaseComponent {
  constructor(url: string, alt: string, classes?: string[]) {
    super('img', classes);

    const img = this.node as HTMLImageElement;
    img.src = url;
    img.alt = alt;
  }
}
