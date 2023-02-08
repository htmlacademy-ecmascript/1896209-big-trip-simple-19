import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'EVERYTHING',
  [FilterType.FUTURE]: 'FUTURE',
};

function createNoPointTemplate(filterType) {
  const noTaskTextValue = NoTasksTextType[filterType];

  return (
    `<p class="trip-events__msg">
    ${noTaskTextValue}
    </p>`
  );
}
export default class NoPointView extends AbstractView{

  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
