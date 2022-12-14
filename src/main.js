import FilterListView from './view/filter-list.js';
import SortListView from './view/sort-list.js';
import CreationFormView from './view/creation-form.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: siteMainElement});

render(new FilterListView(), siteHeaderElement);
render(new SortListView(), siteMainElement);
render(new CreationFormView(), siteMainElement);

boardPresenter.init();

