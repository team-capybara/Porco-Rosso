import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock: MockAdapter = new MockAdapter(axios, { delayResponse: 2000 });

mock.onGet('/moims/newPhoto/true').reply(200, {
  isNew: true,
});

mock.onGet('/moims/newPhoto/false').reply(200, {
  isNew: false,
});
