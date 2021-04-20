import React, { ChangeEvent, PureComponent } from 'react';
import { Message, MessageClient } from './MessageClient';

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
    await this.getMessage();
  }

  onNewMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newMessage: event.target.value,
    });
  };

  onCreateNewMessageClick = async () => {
    await this.props.messageClient.create(this.state.newMessage);
    await this.getMessage();
  };

  private async getMessage() {
    const messages = await this.props.messageClient.get();

    this.setState({ messages });
  }

  render() {
    return (
      <>
        <input type="text" className="new-message" onChange={this.onNewMessageChange} />
        <button className="create-new-message" onClick={this.onCreateNewMessageClick}>
          Create new message
        </button>
        <ol>
          {this.state.messages.map((message) => (
            <li key={message.id} className="message">
              {message.message}
            </li>
          ))}
        </ol>
      </>
    );
  }
}
