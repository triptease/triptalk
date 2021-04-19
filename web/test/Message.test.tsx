import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { App, MessageClient } from '../src/App';

Enzyme.configure({ adapter: new Adapter() });

describe('Message', () => {
  it('Creates and retrieves a message', async () => {
    const messageClient: MessageClient = { get: async () => 'Hello World!' };

    let app: ReactWrapper;

    await act(async () => {
      app = await mount(<App messageClient={messageClient}/>);
    })

    expect(app!.find('.message').text()).toEqual('Hello World!');
  });
});
