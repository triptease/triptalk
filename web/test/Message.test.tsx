import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { App } from '../src/App';
import { MessageClient } from '../src/MessageClient';

Enzyme.configure({ adapter: new Adapter() });

describe('Message', () => {
  it(`Creates and retrieves a message`, async () => {
    let message: string = 'no message';

    const messageClient: MessageClient = {
      create: async (newMessage: string) => {
        message = newMessage;
      },
      get: async () => message,
    };

    const app = await shallow(<App messageClient={messageClient} />);

    app.find('.new-message').simulate('change', { target: { value: 'Hello Mars!' } });
    app.find('.create-new-message').simulate('click');

    await runAllPromises();
    expect(app.find('.message').text()).toEqual('Hello Mars!');
  });
});

const runAllPromises = () => {
  return new Promise((resolve) => {
    setImmediate(() => {
      resolve(undefined);
    });
  });
};
