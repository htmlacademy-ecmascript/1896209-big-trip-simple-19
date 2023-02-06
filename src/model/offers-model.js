import { offersByType } from '../mock/mock-point.js';

export default class OffersModel {
  #offersByType = [...offersByType];

  get offers() {
    return [...this.#offersByType];
  }

  getByType(type) {
    return this.#offersByType.find((offer) => offer.type === type)?.offers;
  }

  getByTypeAndId(id, type) {
    return this.getByType(type)?.find((offer) => offer.id === id);
  }

}
