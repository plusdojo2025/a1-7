import React from "react";
import axios from "axios";
export default class PartnerEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: "",
      marriageStart: "",
      mailAddress: "",
      password1: "",
      password2: "",
      errorMessage: "",
    };
  }
  render() {
    return (
      <div>
        <p>わあ</p>
      </div>
    );
  }
}