import React, { FunctionComponent, useEffect, useState } from 'react';

export type MessageClient = { get: () => Promise<string> };

type Props = {
  messageClient: MessageClient
}

export const App: FunctionComponent<Props> = ({ messageClient }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    messageClient.get().then(setMessage);
  });

  return <div className='message'>{message}</div>;
};
