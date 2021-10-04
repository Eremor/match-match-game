import { IRegisterUser } from '../../../modules/iregister-user';
import './popup-register.scss';
import userImage from '../../../images/user.png';
import { BaseComponent } from '../../base-component';
import { Title } from '../../title/title';
import { FormComponent } from '../../form/formComponent';
import { FormItem } from '../../form/form-item/form-item';
import { Wrapper } from '../../wrapper/wrapper';
import { FormInput } from '../../form/form-input/form-input';
import { ListComponent } from '../../list-component/list-component';
import { ImageComponent } from '../../image-component/image-component';
import { Button } from '../../buttons/button';
import { Popup } from '../popup';
import { headerPlayer } from '../../header/header-player';

class RegisterPopup extends BaseComponent {
  private isValid = false;

  public inputList: HTMLInputElement[] = [];

  private readonly registerTitle: Title = new Title(
    ['register__title'],
    'Register new Player'
  );

  private readonly registerUserWrapper: Wrapper = new Wrapper([
    'register__user',
  ]);

  private readonly registerButtons: Wrapper = new Wrapper([
    'register__buttons',
  ]);

  private readonly registerForm: FormComponent = new FormComponent([
    'register__form',
  ]);

  private readonly registerList: ListComponent = new ListComponent([
    'register__list',
  ]);

  private readonly registerImage: ImageComponent = new ImageComponent(
    `${userImage}`,
    'User image',
    ['register__image']
  );

  private readonly addBtn: Button = new Button(
    ['register__btn', 'btn', 'btn--primary', 'btn--add'],
    'Add user'
  );

  private readonly cancelBtn: Button = new Button(
    ['register__btn', 'btn', 'btn--cancel'],
    'Cancel'
  );

  private readonly popup: Popup = Popup.getInstance();

  constructor() {
    super('div', ['popup__content', 'register']);

    this.registerButtons.node.addEventListener('click', this.onClick);
  }

  public render(): void {
    const inputs: string[] = ['text', 'text', 'email'];
    this.addInputList(inputs);
    this.registerUserWrapper.addChildren([
      this.registerList.node,
      this.registerImage.node,
    ]);
    this.registerButtons.addChildren([this.addBtn.node, this.cancelBtn.node]);
    this.registerForm.addChildren([
      this.registerUserWrapper.node,
      this.registerButtons.node,
    ]);
    this.addChildren([this.registerTitle.node, this.registerForm.node]);

    this.popup.render();
    this.popup.addChildren([this.node]);
  }

  public addInputList(inputsType: string[]): void {
    inputsType.forEach((type) => {
      const formItem: FormItem = new FormItem(['register__item']);
      const checkElem: Wrapper = new Wrapper(['register__check']);
      const inputElem: FormInput = new FormInput(`${type}`, true, [
        'register__input',
      ]);
      this.inputList.push(<HTMLInputElement>inputElem.node);
      formItem.addChildren([inputElem.node, checkElem.node]);

      this.registerList.addChildren([formItem.node]);
    });
  }

  private onClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;

    if (target.classList.contains('btn--cancel')) {
      this.popup.hiddenPopup();
      this.registerList.children.forEach((child) => child.remove());
    }

    if (target.classList.contains('btn--add')) {
      if (
        this.inputList[0].value !== '' &&
        this.inputList[1].value !== '' &&
        this.inputList[2].value !== ''
      ) {
        this.isValid = true;
      }

      if (this.isValid) {
        this.registerUser();
        this.popup.hiddenPopup();
        headerPlayer.registerUser(true);
        headerPlayer.handleUserProfile();
      }
    }
  };

  registerUser(): IRegisterUser {
    const userName = `${this.inputList[0].value} ${this.inputList[1].value}`;
    const userEmail = `${this.inputList[2].value}`;

    return { name: userName, email: userEmail };
  }
}

export const registerPopup = new RegisterPopup();
