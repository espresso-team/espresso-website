import { Component } from "react";

type Props = {};

type State = {
  content: string;
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (
      <div>
        <header>
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}