import React from "react";
import axios from "axios";

export default class MemberRegist extends React.Component {
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

  onInput = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  addUser = (e) => {
    e.preventDefault();

    const { birthday, marriageStart, mailAddress, password1, password2 } =
      this.state;

    // パスワードチェック
    if (password1 !== password2) {
      this.setState({ errorMessage: "パスワードが一致しません" });
      return;
    }

    // ＊ パスワードの文字数などのチェックを追加するならココ ＊

    const data = { birthday, marriageStart, mailAddress, password: password1 };

    try {
      axios.post("/signup/add/", data).then((response) => {
        console.log(response);
        // ユーザー登録成功後、フォームをクリア
        this.setState({
          birthday: "",
          marriageStart: "",
          mailAddress: "",
          password1: "",
          password2: "",
          errorMessage: "",
        });
      });
    } catch (error) {
      console.error(error);
      this.setState({
        errorMessage: "登録に失敗しました。もう一度お試しください。",
      });
    }
  };

  render() {
    const {
      birthday,
      marriageStart,
      mailAddress,
      password1,
      password2,
      errorMessage,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.addUser}>
          <label htmlFor="birthday">生年月日</label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            value={birthday}
            onChange={this.onInput}
            required
          /><br/>

          <label htmlFor="marriageStart">婚活開始</label>
          <input
            type="date"
            name="marriageStart"
            id="marriage_start"
            value={marriageStart}
            onChange={this.onInput}
            required
          /><br/>

          <label htmlFor="mailAddress">メールアドレス</label><br/>
          <input
            type="text"
            name="mailAddress"
            id="mail_address"
            value={mailAddress}
            onChange={this.onInput}
            required
          /><br/>

          <label htmlFor="password1">パスワード</label><br/>
          <input
            type="password"
            name="password1"
            id="password1"
            value={password1}
            onChange={this.onInput}
            required
          /><br/>

          <label htmlFor="password2">パスワード（確認用）</label><br/>
          <input
            type="password"
            name="password2"
            id="password2"
            value={password2}
            onChange={this.onInput}
            required
          /><br/>

          <input type="submit" name="submit" value="登録" />
        </form>

        <p id="errorMessage" style={{ color: "red" }}>
          {this.state.errorMessage}
        </p>
      </div>
    );
  }
}
