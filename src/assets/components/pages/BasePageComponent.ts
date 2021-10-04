import { BasePage } from './BasePage';

export class BasePageComponent extends BasePage {
  public readonly node: HTMLElement = document.createElement('section');

  private readonly parentNode: HTMLElement | null =
    document.querySelector('main');

  constructor(classes: string[]) {
    super();
    this.node.classList.add(...classes);
  }

  public render = (): void => {
    this.parentNode?.appendChild(this.node);
  };
}
