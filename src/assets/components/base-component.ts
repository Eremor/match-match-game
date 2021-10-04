export class BaseComponent {
  public readonly node: HTMLElement;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    classes: string[] = [],
    content = ''
  ) {
    this.node = document.createElement(tag);
    this.node.classList.add(...classes);
    this.node.textContent = content;
  }

  public addChildren(children: HTMLElement[]): void {
    children.forEach((child: HTMLElement) => {
      this.node.appendChild(child);
    });
  }
}
