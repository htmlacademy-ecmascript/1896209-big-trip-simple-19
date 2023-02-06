import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizePointDateTimeFrom, humanizePointDateTimeTo} from '../utils.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function renderOfferForType(offer, checked) {
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${checked ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-luggage-1">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`;
}

function getEventTypeItem (type) {
  return `<div class="event__type-item">
      <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">${type}</label>
    </div>`;
}

function createPictureTemplate(picture) {
  return `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;}

function createDestinationTemplate(destinations){
  return ` <option value="${destinations.name}"></option>`;
}

function createEditFormTemplate (state, offersByType, destinations) {
  const offersTemplate = offersByType.find((offers) => state.type === offers.type)
    .offers
    .map((offers) => renderOfferForType(offers, state.offers.some((pointOffer) => pointOffer.id === offers.id)))
    .join('\n');
  const eventTypeTemplate = offersByType.map((offer) => offer.type).map((type)=> getEventTypeItem(type)).join('\n');

  const picturesTemplate = state.destinations.pictures.map((picture) => createPictureTemplate(picture)).join('\n');

  const destinationsTemplate = destinations.map((destination) => createDestinationTemplate(destination)).join('\n');

  return (
    `<li class = "trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${state.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${eventTypeTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${state.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${state.destinations.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationsTemplate}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointDateTimeFrom(state.dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-2">To</label>
        <input class="event__input  event__input--time" id="event-end-time-2" type="text" name="event-end-time" value="${humanizePointDateTimeTo(state.dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${state.basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${offersTemplate}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${state.destinations.description}</p>
      </section>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${picturesTemplate}
        </div>
      </div>


    </section>
  </form>
    </li>`
  );
}

export default class EditFormView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #destinations = null;
  #offersByType = null;
  #datepicker = null;

  constructor({point, offersByType, destinations, onFormSubmit}) {
    super();
    this._setState(this.#parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#destinations = destinations;
    this.#offersByType = offersByType;

    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  get template() {
    return createEditFormTemplate(this._state, this.#offersByType, this.#destinations);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#parseStateToPoint(this._state));
  };

  #handleEventInput = (evt) => {
    const destValue = evt.target.value;
    const currentDestination = this.#destinations.find((el) => el.name.toLowerCase() === destValue.toLowerCase());
    if (currentDestination) {
      this.updateElement({
        destinations: currentDestination
      });
    }
  };

  _restoreHandlers = () => {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleFormSubmit);
    const eventsNodeList = this.element.querySelectorAll('.event__type-input');
    Array.from(eventsNodeList)
      .forEach((el) => {
        el.addEventListener('change', this.#eventChangeHandler);
      });
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#handleEventInput);

    this.#setDatepicker();
  };

  #parseStateToPoint(state) {
    return {...state};
  }

  #parsePointToState(point) {
    return {...point};
  }

  #eventChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value
    });
  };

  #dueDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #setDatepicker() {
    if (this._state.isDateFrom) {
      this.#datepicker = flatpickr(
        this.element.querySelector('.event__input--time'),
        {
          dateFormat: 'j F',
          defaultDate: this._state.dateFrom,
          onChange: this.#dueDateChangeHandler,
        },
      );
    }
  }

}
