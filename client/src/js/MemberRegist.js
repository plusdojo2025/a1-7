import React from "react";
import axios from "axios";
import { withNavigation } from "../hoc/withNavigation";

class MemberRegist extends React.Component {
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

  addUser = async (e) => {
    e.preventDefault();

    const { birthday, marriageStart, mailAddress, password1, password2 } =
      this.state;
    const { navigate } = this.props; // navigate を props から取得

    // パスワードチェック
    if (password1 !== password2) {
      this.setState({ errorMessage: "パスワードが一致しません" });
      return;
    }

    // ＊ パスワードの文字数などのチェックを追加するならココ ＊

    const data = { birthday, marriageStart, mailAddress, password: password1 };

    try{
      const response = await axios.post("/signup/add/", data);
      console.log("ユーザー登録成功:", response); // デバッグ用

      // SpringBoot からのレスポンスが成功した場合
if (response.status === 200 || response.status === 201) {
        // ユーザー登録成功後、フォームをクリア
        this.setState({
          birthday: "",
          marriageStart: "",
          mailAddress: "",
          password1: "",
          password2: "",
          errorMessage: "",
        });

        // ログイン画面にリダイレクト
        navigate("/login/");
      }

    } catch (error) {
      console.error("登録エラー:",error); // デバッグ用

      let message = "予期せぬエラーが発生しました。";
      // エラーがAxiosのものかどうかを確認
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // サーバーからのエラーレスポンスがある場合
          if (error.response.status === 409) {
            message = "このメールアドレスは既に登録されています。";
            // サーバーが具体的なエラーメッセージを返した場合
          } else if (error.response.data && error.response.data.message) {
            message = error.response.data.message;
          } else {
            message =
              "登録に失敗しました。サーバーエラー: ${error.response.status}";
          }
        } else if (error.request) {
          // リクエストは送信されたが、レスポンスがない場合 (ネットワークエラーなど)
          message =
            "サーバーに接続できませんでした。ネットワーク接続を確認してください。";
        } else {
          // リクエストの設定中に発生したエラーなど
          message = "リクエストエラー: ${error.message}";
        }
      } else {
        // Axios以外の予期せぬエラー
        message = "予期せぬエラーが発生しました: ${error.message}";
      }
      this.setState({ errorMessage: message });
    }
  }
  
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
          />
          <br />

          <label htmlFor="marriageStart">婚活開始</label>
          <input
            type="date"
            name="marriageStart"
            id="marriage_start"
            value={marriageStart}
            onChange={this.onInput}
            required
          />
          <br />

          <label htmlFor="mailAddress">メールアドレス</label>
          <br />
          <input
            type="text"
            name="mailAddress"
            id="mail_address"
            value={mailAddress}
            onChange={this.onInput}
            required
          />
          <br />

          <label htmlFor="password1">パスワード</label>
          <br />
          <input
            type="password"
            name="password1"
            id="password1"
            value={password1}
            onChange={this.onInput}
            required
          />
          <br />

          <label htmlFor="password2">パスワード（確認用）</label>
          <br />
          <input
            type="password"
            name="password2"
            id="password2"
            value={password2}
            onChange={this.onInput}
            required
          />
          <br />

          <input type="submit" name="submit" value="登録" />
        </form>

        {errorMessage && (
          <p id="errorMessage" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
}

// withNavigation でラップしてエクスポート
export default withNavigation(MemberRegist);
