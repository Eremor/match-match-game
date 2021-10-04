import { BaseComponent } from '../base-component';

export class ListComponent extends BaseComponent {
  private itemList: HTMLCollection;

  constructor(classes?: string[]) {
    super('ul', classes);

    this.itemList = this.node?.children;
  }

  public get children(): Element[] {
    const items: Element[] = Array.from(this.itemList);
    return items;
  }
}
