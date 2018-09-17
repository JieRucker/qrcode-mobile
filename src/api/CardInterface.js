import BaseModule from './BaseModule';

class CardInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.authUrl
    };
    super(options)
  }

  //
  getCard(data = {}) {
    // return this.post(`/module/getCard`, data)
    return this.get(`../../static/server/card.json`, data)
  }

}

export default new CardInterface()
