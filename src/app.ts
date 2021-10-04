import { Header } from './assets/components/header/header';
import { Router } from './assets/services/router';

export class App {
  private readonly header: Header = new Header();

  private readonly main: HTMLElement = document.createElement('main');

  private readonly router: Router = new Router(this.main);

  constructor(private readonly rootElement: HTMLElement) {}

  public render(): void {
    this.header.render();
    this.rootElement.appendChild(this.header.node);
    this.rootElement.appendChild(this.main);

    this.router.onRoute();
  }
}
