import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { App } from '../src/App';
import { MessageClient } from '../src/MessageClient';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it(`Creates and retrieves messages`, async () => {
    const messages: Array<string> = [];

    const messageClient: MessageClient = {
      create: async (newMessage: string) => {
        messages.push(newMessage);
      },
      get: async () =>
        messages.map((message) => ({
          id: 'someId',
          liked: false,
          message,
        })),
      like() {
        return Promise.resolve(undefined);
      },
    };

    const app = await shallow(<App messageClient={messageClient} />);

    app.find('.new-message').simulate('change', { target: { value: 'Hello Saturn!' } });
    app.find('.create-new-message').simulate('click');

    app.find('.new-message').simulate('change', { target: { value: 'Hello Jupiter!' } });
    app.find('.create-new-message').simulate('click');

    await runAllPromises();
    expect(app.find('.message').at(0).text()).toEqual('Hello Saturn!');
    expect(app.find('.message').at(1).text()).toEqual('Hello Jupiter!');
  });

  it(`Like a message`, async () => {
    let message = {
      id: 'someId',
      message: 'someMessage',
      liked: false,
    };
    const messageClient: MessageClient = {
      create: async () => {},
      get: async () => [message],
      like: async () => {
        message = {
          ...message,
          liked: true,
        };
      },
    };

    const app = await shallow(<App messageClient={messageClient} />);

    await runAllPromises();
    expect(app.find('.liked').text()).toEqual('');

    app.find('.like-message').simulate('click');

    await runAllPromises();
    expect(app.find('.liked').text()).toEqual('👍');
  });
});

const runAllPromises = () => {
  return new Promise((resolve) => {
    setImmediate(() => {
      resolve(undefined);
    });
  });
};
