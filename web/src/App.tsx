import React, { ChangeEvent, PureComponent } from 'react';
import { Message, MessageClient, UUID } from './MessageClient';

type Props = {
  messageClient: MessageClient;
};

type State = {
  newMessage: string;
  messages: Array<Message>;
};

export class App extends PureComponent<Props, State> {
  readonly state: State = {
    newMessage: '',
    messages: [],
  };

  async componentDidMount() {
    await this.getMessages();
  }

  onNewMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newMessage: event.target.value,
    });
  };

  onCreateNewMessageClick = async () => {
    await this.props.messageClient.create(this.state.newMessage);
    await this.getMessages();
  };

  private async getMessages() {
    const messages = await this.props.messageClient.get();
    this.setState({ messages });
  }

  private onLikeMessageClick = (messageId: UUID) => async () => {
    await this.props.messageClient.like(messageId);
    await this.getMessages();
  };

  render() {
    return (
      <>
        <input type="text" className="new-message" onChange={this.onNewMessageChange} />
        <button className="create-new-message" onClick={this.onCreateNewMessageClick}>
          Create new message
        </button>
        <ol style={{ lineHeight: '3em' }}>
          {this.state.messages
            .sort((left, right) => (left.message > right.message ? 1 : -1))
            .map((message) => (
              <li key={message.id}>
                <button
                  className="like-message"
                  onClick={this.onLikeMessageClick(message.id)}
                  style={{ marginRight: '15px' }}
                >
                  Like
                </button>
                <span className="liked" style={{ display: 'inline-block', width: '50px' }}>
                  {message.liked && '👍'}
                </span>
                <span className="message">{message.message}</span>
              </li>
            ))}
        </ol>
      </>
    );
  }
}
