import { About } from '../components/pages/about/about-page';
import { GamePage } from '../components/pages/game/game-page';
import { Score } from '../components/pages/score/score-page';
import { settings } from '../components/pages/settings/settings-page';

type IRouter = {
  name: string;
  component: () => void;
};

export class Router {
  private readonly aboutPage: About = new About();

  private readonly routing: IRouter[] = [
    {
      name: 'about',
      component: (): void => {
        this.clearPage();

        this.parentElement.appendChild(this.aboutPage.node);
        this.aboutPage.render();
      },
    },
    {
      name: 'score',
      component: (): void => {
        this.clearPage();

        const scorePage: Score = new Score();
        this.parentElement.appendChild(scorePage.node);
        scorePage.render();
      },
    },
    {
      name: 'settings',
      component: (): void => {
        this.clearPage();

        this.parentElement.append(settings.node);
        settings.render();
      },
    },
    {
      name: 'game',
      component: (): void => {
        this.clearPage();

        const gamePage: GamePage = new GamePage();
        this.parentElement.append(gamePage.node);
        gamePage.render();
      },
    },
  ];

  private readonly defaultRoute: IRouter = {
    name: '',
    component: (): void => {
      this.parentElement.appendChild(this.aboutPage.node);
      this.aboutPage.render();
    },
  };

  constructor(private readonly parentElement: HTMLElement) {
    window.onpopstate = (): void => {
      this.onRoute();
    };
  }

  public onRoute(): void {
    const currentRouteName: string = window.location.hash.slice(1);
    const currentRoute: IRouter | undefined = this.routing.find(
      (p) => p.name === currentRouteName
    );

    (currentRoute || this.defaultRoute).component();
  }

  private clearPage(): void {
    if (this.parentElement.lastChild !== null) {
      this.parentElement.removeChild(this.parentElement.lastChild);
    }
  }
}
