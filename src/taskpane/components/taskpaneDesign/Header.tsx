// @ts-ignore
import * as React from "react";
import "./Header.scss";

export interface HeaderProps {}

export default class Header extends React.Component<HeaderProps, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="header">
        <h1>SchoolExam</h1>
      </section>
    );
  }
}
