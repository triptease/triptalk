import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Message, MessageClient, UUID } from './MessageClient';

type Props = {
  messageClient: MessageClient;
};

const App = ({ messageClient }: Props) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const getMessages = useCallback(async () => {
    const messages = await messageClient.get();
    setMessages(messages);
  }, []);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const onNewMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const onCreateNewMessageClick = async () => {
    await messageClient.create(newMessage);
    await getMessages();
    setNewMessage('');
  };

  const onLikeMessageClick = (messageId: UUID) => async () => {
    await messageClient.like(messageId);
    await getMessages();
  };

  return (
    <>
      <div className="row">
        <input type="text" value={newMessage} onChange={onNewMessageChange} />
        <button onClick={onCreateNewMessageClick}>Create new message</button>
      </div>

      <ol style={{ lineHeight: '3em' }} role="list">
        {messages
          .sort((left, right) => (left.id > right.id ? 1 : -1))
          .map((message) => (
            <li key={message.id}>
              <button
                aria-label="like-message"
                onClick={onLikeMessageClick(message.id)}
                style={{ marginRight: '15px' }}
              >
                Like
              </button>
              <span style={{ display: 'inline-block', width: '50px' }}>{message.liked && '👍'}</span>
              <span>{message.message}</span>
            </li>
          ))}
      </ol>
    </>
  );
};

export default App;
