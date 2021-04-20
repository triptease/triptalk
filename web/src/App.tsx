import React, { PureComponent } from 'react';

export type MessageClient = { get: () => Promise<string> };

type Props = {
  messageClient: MessageClient
}

type State = {
  message: string
}

export class App extends PureComponent<Props, State> {
  state = {
    message: ''
  }

  async componentDidMount() {
    const message = await this.props.messageClient.get();

    this.setState({ message });
  }

  render() {
    return <div className='message'>{this.state.message}</div>;
  }
}