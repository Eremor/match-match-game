import { BaseComponent } from '../base-component';
import { ListComponent } from '../list-component/list-component';
import { NavItem } from './nav-item/nav-item';
import './navigation.scss';

export class Nav extends BaseComponent {
  private readonly itemAbout: NavItem = new NavItem('About game', '#about');

  private readonly itemScore: NavItem = new NavItem('Best score', '#score');

  private readonly itemSetting: NavItem = new NavItem(
    'Game settings',
    '#settings'
  );

  private readonly list: ListComponent = new ListComponent(['nav__list']);

  constructor() {
    super('nav', ['nav']);

    this.node.addEventListener('click', this.changeActiveLink, false);
  }

  public render(): void {
    this.list.addChildren([
      this.itemAbout.node,
      this.itemScore.node,
      this.itemSetting.node,
    ]);

    this.addChildren([this.list.node]);

    this.initActiveLink();
  }

  private changeActiveLink = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;

    if (target.classList.contains('nav__item')) {
      if (target.classList.contains('nav__item--active')) return;

      this.list.children.forEach((link: Element) => {
        link.classList.remove('nav__item--active');
      });

      target.classList.add('nav__item--active')!;
      window.location.hash = target.getAttribute('route')!;
    }
  };

  private initActiveLink(): void {
    let { hash } = window.location;
    if (hash === '') hash = '#about';

    this.list.children.forEach((link: Element) => {
      if (link.getAttribute('route') === hash) {
        link.classList.add('nav__item--active');
      }
    });
  }
}
