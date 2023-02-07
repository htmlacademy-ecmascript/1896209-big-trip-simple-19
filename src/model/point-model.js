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
    return copiedPoints;
  }

  updatePoint(updateType, update) {
    if (!this.#points.has(update.id)) {
      throw new Error('Can\'t update unexisting point');
    }
    this.#points.set(update.id, update);
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points.set(update.id, update);
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    if (!this.#points.has(update.id)) {
      throw new Error('Can\'t delete unexisting point');
    }
    this.#points.delete(update.id);
    this._notify(updateType);
  }
}
