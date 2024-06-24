import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MessageClient } from 'MessageClient';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import { Visibility } from '@triptalk/shared';

describe('App', () => {
  it(`Creates and retrieves messages`, async () => {
    const messages: Array<string> = [];

    const messageClient: MessageClient = {
      create: async (newMessage: string) => {
        messages.push(newMessage);
      },
      get: async () =>
        messages.map((message) => ({
          id: `someId-${Math.floor(Math.random() * 100)}`,
          liked: false,
          message,
          visibility: Visibility.PUBLIC,
        })),
      like() {
        return Promise.resolve(undefined);
      },
    };

    render(<App messageClient={messageClient} />);

    await userEvent.type(screen.getByRole('textbox'), 'Hello Saturn!');
    await userEvent.click(screen.getByText('Create new message'));

    await userEvent.type(screen.getByRole('textbox'), 'Hello Jupiter!');
    await userEvent.click(screen.getByText('Create new message'));

    await waitFor(() => {
      expect(screen.queryByText('Hello Saturn!')).toBeInTheDocument();
      expect(screen.queryByText('Hello Jupiter!')).toBeInTheDocument();
    });
  });

  it(`Like a message`, async () => {
    let message = {
      id: 'someId',
      message: 'someMessage',
      liked: false,
      visibility: Visibility.PUBLIC,
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

    render(<App messageClient={messageClient} />);

    await waitFor(() => {
      expect(screen.getByText('someMessage')).toBeInTheDocument();
      expect(screen.queryByText('👍')).not.toBeInTheDocument();
    });

    await userEvent.click(screen.getByLabelText('like-message'));

    await waitFor(() => expect(screen.getByText('👍')).toBeInTheDocument());
  });
});
