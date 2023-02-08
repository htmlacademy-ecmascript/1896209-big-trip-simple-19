import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizePointDateTimeFrom, humanizePointDateTimeTo} from '../utils/utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function renderOfferForType(offer, checked) {
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id}" type="checkbox" name="event-offer-luggage" ${checked ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
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

function createOffersContainer(offersTemplate) {
  return `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
    ${offersTemplate}
  </div>
</section>`;
}

function createDestinationContainer(destination) {
  const picturesTemplate = destination
    .pictures
    .map((picture) => createPictureTemplate(picture))
    .join('\n');
  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${destination.description}</p>
</section>
<div class="event__photos-container">
  <div class="event__photos-tape">
    ${picturesTemplate}
  </div>`;
}

function createEditFormTemplate (state, offersByType, destinations) {
  const offers = offersByType.find((offer) => state.type === offer.type).offers;
  let offersTemplate = '';
  if (offers.length > 0) {
    const offersTemplateList = offers.map((offer) => renderOfferForType(offer, state.offers.some((pointOffer) => pointOffer.id === offer.id)))
      .join('\n');
    offersTemplate = createOffersContainer(offersTemplateList);
  }
  const eventTypeTemplate = offersByType.map((offer) => offer.type).map((type) => getEventTypeItem(type)).join('\n');
  let selectedDestination = null;
  if (state.destination) {
    selectedDestination = destinations.find((destination) => destination.id === state.destination.id);
  }
  const destinationsTemplate = destinations.map((destination) => createDestinationTemplate(destination)).join('\n');
  const selectedDestinationTemplate = selectedDestination ? createDestinationContainer(selectedDestination) : '';
  const destinationName = selectedDestination ? selectedDestination.name : '';
  // eslint-disable-next-line no-console
  console.log(state);

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
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
    ${offersTemplate}
    ${selectedDestinationTemplate}
      </section>
  </form>
    </li>`
  );
}

export default class EditFormView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleSubmit = null;
  #destinations = null;
  #offersByType = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  //is for edit isForEdit
  constructor({point, offersByType, destinations, onFormSubmit, onDeleteClick, onSubmit}) {
    super();
    const newState = point ? this.#parsePointToState(point) : this.#createStateNewForm();
    this._setState(newState);
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
    this.#handleSubmit = onSubmit;

    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    this.#datepickerFrom.destroy();
    this.#datepickerFrom = null;

    this.#datepickerTo.destroy();
    this.#datepickerTo = null;
  }

  get template() {
    return createEditFormTemplate(this._state, this.#offersByType, this.#destinations);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const point = this.#parseStateToPoint();
    this.#handleSubmit(point);
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
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  };

  #parseStateToPoint(state) {
    return {...state};
  }

  #parsePointToState(point) {
    return {...point};
  }

  #createStateNewForm() {
    return {
      type: 'bus',
      offers: [],
      start: new Date(),
      end: new Date(),
      isSaving: false,
      isDisabled: false
    };
  }

  #eventChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditFormView.#parseStateToPoint(this._state));
  };

  #dueDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #setDatepickerFrom() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'j/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        onChange: ([userDate]) => {
          const newState = {from: userDate};
          if(userDate > this._state.dateTo){
            newState.to = userDate;
          }
          this.updateElement(newState);
        }
      }
    );
  }

  #setDatepickerTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-2'),
      {
        dateFormat: 'j/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: ([userDate]) => {
          this.updateElement({
            to: userDate,
          });
        }
      });
  }

}
