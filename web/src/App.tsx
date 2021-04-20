import React, { ChangeEvent, PureComponent } from 'react';

export type MessageClient = {
  get: () => Promise<string>;
  create: (newMessage: string) => Promise<void>;
};

type Props = {
  messageClient: MessageClient;
};

type State = {
  newMessage: string;
  message: string;
};

export class App extends PureComponent<Props, State> {
  state = {
    newMessage: '',
    message: '',
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
    const message = await this.props.messageClient.get();

    this.setState({ message });
  }

  render() {
    return (
      <>
        <input type="text" className="new-message" onChange={this.onNewMessageChange} />
        <button className="create-new-message" onClick={this.onCreateNewMessageClick}>
          Create new message
        </button>
        <div className="message">{this.state.message}</div>
      </>
    );
  }
}
