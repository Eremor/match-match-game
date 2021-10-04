import { BaseComponent } from '../base-component';
import { Logo } from '../logo/logo';
import { Nav } from '../navigation/navigation';
import { Wrapper } from '../wrapper/wrapper';
import { headerPlayer } from './header-player';
import './header.scss';

export class Header extends BaseComponent {
  private readonly wrapper: Wrapper = new Wrapper([
    'wrapper',
    'header__wrapper',
  ]);

  private readonly logo: Logo = new Logo();

  private readonly nav: Nav = new Nav();

  constructor() {
    super('header', ['header']);
  }

  public render(): void {
    this.addChildren([this.wrapper.node]);

    this.logo.render();
    headerPlayer.render();
    this.nav.render();
    this.wrapper.addChildren([
      this.logo.node,
      this.nav.node,
      headerPlayer.node,
    ]);
  }
}
