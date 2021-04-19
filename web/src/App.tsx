import React, { FunctionComponent, useEffect, useState } from 'react';

export const App: FunctionComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5002/message', { method: 'GET' }).then((response) => response.text().then(setMessage));
  });

  return <div>{message}</div>;
};
