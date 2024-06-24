import App from './App';
import * as React from 'react';
import { MessageClientHttp } from './MessageClientHttp';
import { createRoot } from 'react-dom/client';

const messageClient = new MessageClientHttp('http://localhost:5002');

const root = createRoot(document.getElementById('root')!);
root.render(<App messageClient={messageClient} />);
