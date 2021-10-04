import { BaseComponent } from '../../base-component';

export class NavItem extends BaseComponent {
  constructor(content: string, hash: string) {
    super('li', ['nav__item'], content);
    this.node.setAttribute('route', hash);
  }
}
