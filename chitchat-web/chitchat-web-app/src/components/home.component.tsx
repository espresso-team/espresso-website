import { Component } from "react";
import Footer from "../app/Footer";
import Navbar from "../app/Navbar";
import Cover from "./home/Cover"

export default class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Cover />
        <Footer/>
      </>
    );
  }
}
