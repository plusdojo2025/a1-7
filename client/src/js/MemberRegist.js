import React from "react";
import axios from "axios";

export default class MemberRegist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      birthday: "",
      marriage_start: "",
      mail_address: "",
      password1: "",
      password2: "",
      errorMessage: "",
    };
  }

  onInput = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
      errorMessage: "",
    });
  }

  addUser = (e) => {
    e.preventDefault();

    const { birthday, marriage_start, mail_address, password1, password2 } = this.state;

    // パスワードチェック
    if (password1 !== password2) {
      this.setState({ errorMessage: "パスワードが一致しません" });
      return;
    }

    const data = { birthday, marriage_start, mail_address, password: password1 };

    //axiosだとpostが記述しやすい
    axios.post("http://localhost:8000/signup/add/", data)
      .then(response => {
        console.log(response);
        this.setState({
          birthday: "",
          marriage_start: "",
          mail_address: "",
          password1: "",
          password2: "",
          errorMessage: "登録が完了しました！",
        });
        //追加したら再読み込みする。
        this.componentDidMount();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errorMessage: "登録に失敗しました。もう一度お試しください。" });
      });
  };


  render() {
    const { birthday, marriage_start, mail_address, password1, password2 } = this.state;
    return (
      <div>
        <form onSubmit={this.addUser}>
          <label htmlFor="birthday">生年月日</label>
          <input type="date" name="birthday" id="birthday" value={birthday} onChange={this.onInput} />

          <label htmlFor="marriage_start">婚活開始</label>
          <input type="date" name="marriage_start" id="marriage_start" value={marriage_start} onChange={this.onInput} />

          <label htmlFor="mail_address">メールアドレス</label>
          <input type="text" name="mail_address" id="mail_address" value={mail_address} onChange={this.onInput} />

          <label htmlFor="password1">パスワード</label>
          <input type="password" name="password1" id="password1" value={password1} onChange={this.onInput} />

          <label htmlFor="password2">パスワード（確認用）</label>
          <input type="password" name="password2" id="password2" value={password2} onChange={this.onInput} />

          <input type="submit" name="submit" value="登録" />
        </form>

        <p id="errormessage"></p>
      </div>
    );
  };
}
