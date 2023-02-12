import { Component } from "react";
import Footer from "../app/Footer";
import Game from "./pk/Game"

type Props = {};

type State = {
  content: string;
}

export default class Pk extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "pk page"
    };
  }

  render() {
    return (
      <>

        <Game userId={"test1"}/>
        <Footer />
      </>
    );
  }
}