import React from "react";
import axios from "axios";

export default class Impression extends React.Component {
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
        <form method="POST" action="/home/">
          <input type="text" />
          <br />
          <input type="password" />
          <br />
          <input type="submit" name="submit" value="ログイン" />
          <input type="reset" name="reset" value="リセット" />
        </form>

        <p id="errormessage"></p>
        <a href="./signup/">新規登録はこちら</a>
      </div>
    );
  }
}
