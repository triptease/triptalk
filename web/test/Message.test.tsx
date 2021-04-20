import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { App, MessageClient } from '../src/App';

Enzyme.configure({ adapter: new Adapter() });

describe('Message', () => {
  it('Creates and retrieves a message', async () => {
    const messageClient: MessageClient = { get: async () => 'Hello World!' };

    const app = await shallow(<App messageClient={messageClient} />);

    expect(app.find('.message').text()).toEqual('Hello World!');
  });
});
