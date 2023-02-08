import {MessagesType} from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const NoTasksTextType = {
  [MessagesType.EVERYTHING]: 'Click New Event to create your first point',
  [MessagesType.FUTURE]: 'There are no future events now',
  [MessagesType.ERROR]: 'Can\'t load information from server. Try later'
};

function createNoPointTemplate (filterType) {
  const text = NoTasksTextType[filterType];
  return (
    `<p class="trip-events__msg">
    ${text}
    </p>`
  );
}

export default class NoPointView extends AbstractView {

  #messageType = null;

  constructor({messageType}) {
    super();
    this.#messageType = messageType;
  }

  get template() {
    return createNoPointTemplate(this.#messageType);
  }
}
