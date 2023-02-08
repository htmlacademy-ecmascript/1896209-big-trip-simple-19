import { mockPoints } from '../mock/mock-point.js';
import DestinationsModel from '../model/destination-model.js';
import OffersModel from './offers-model.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {

  #points = [...mockPoints];

  #destinationModel = new DestinationsModel();

  #offersModel = new OffersModel();

  get points() {
    const copiedPoints = [...this.#points];
    copiedPoints.forEach((point) => {
      point.destinations = this.#destinationModel.getById(point.destinations);
      point.offers = [...point.offers.map((offer) => this.#offersModel.getByTypeAndId(offer, point.type))];
    });
    this.#points = [...copiedPoints]
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }
    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType);
  }
}
