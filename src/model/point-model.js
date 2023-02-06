import { mockPoints } from '../mock/mock-point.js';
import DestinationsModel from '../model/destination-model.js';
import OffersModel from './offers-model.js';

export default class PointsModel {

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
}
