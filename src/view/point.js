import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDate, humanizePointTimeFrom, humanizePointTimeTo} from '../utils/utils.js';

function renderOfferItem(offer) {
  // eslint-disable-next-line no-console
  console.log(offer);
  return `<li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</li>`;
}

function createPointTemplate (point) {
  const {dateFrom, dateTo} = point;
  const date = humanizePointDate(dateFrom);
  const dateTimeFrom = humanizePointTimeFrom(dateFrom);
  const dateTimeTo = humanizePointTimeTo(dateTo);
  // eslint-disable-next-line no-console
  console.log(point);
  const offersTemplate = point.offers.map(renderOfferItem).join('\n');
  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${date}">${date}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${point.type} ${point.destinations.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateTimeFrom}">${dateTimeFrom}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTimeTo}">${dateTimeTo}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersTemplate}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}

export default class PointView extends AbstractView {
  #handleEditClick = null;
  #point = null;

  constructor({point, onEditClick}) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  #editClickHandler = () => {
    this.#handleEditClick();
  };
}
