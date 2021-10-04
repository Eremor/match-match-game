import './main.scss';
import { App } from './app';
import { database } from './assets/services/database';

const app = new App(document.body);

window.onload = () => {
  database.init('Eremor');
};

window.addEventListener('DOMContentLoaded', () => {
  app.render();
});
