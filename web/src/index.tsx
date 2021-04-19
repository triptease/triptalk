import * as React from 'react';
import { render } from 'react-dom';

import { App, MessageClient } from './App';

const messageClient: MessageClient = {
  get: () => fetch('http://localhost:5002/message', { method: 'GET' }).then((response) => response.text()),
};

render(<App messageClient={messageClient} />, document.getElementById('root'));
