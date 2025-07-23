import React from "react";
import axios from "axios";
// withRouter をインポートしてクラスコンポーネントに navigate を渡す
import { withRouter } from "../hoc/withRouter";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mailAddress: "",
      password: "",
      errorMessage: "",
      loading: false, // ローディング状態
    };
  }

  // 入力値が変更されたときにステートを更新
  onInput = (e) => {
    // 入力値が変更された要素のname属性と入力値valueを取得
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  // ログインフォーム送信時のハンドラ
  handleLogin = async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信を防ぐ

    // エラーメッセージをクリアし、ローディングを開始
    this.setState({
      errorMessage: "",
      loading: true,
    });

    const { mailAddress, password } = this.state;
    
    const { navigate, onLoginSuccess } = this.props; // this.props.navigate でルーティング機能にアクセス

    try {
      // 1. バックエンドAPIへのリクエスト
      const data = { mailAddress, password };
      const response = await axios.post("/", data);

      // ログイン成功時の処理
      console.log("ログイン成功:", response.data);
      // 親コンポーネントにログイン成功を通知する（例:認証状態を更新するため）
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      // お相手一覧画面に遷移
      navigate("/home/"); // this.props.navigate を使用（37行目）

      // ログイン失敗時の処理
    } catch (error) {
      console.error("ログインエラー:", error);

      let message = "予期せぬエラーが発生しました。";
      if (error.response) {
        // サーバーからのエラーレスポンスがある場合
        if (error.response.status === 401) {
          message = "メールアドレスまたはパスワードが間違っています。";
        // サーバーが具体的なエラーメッセージを返した場合
        } else if (error.response.data && error.response.data.message) {
          message = error.response.data.message;
        } else {
          message = "ログインに失敗しました。サーバーエラーです。";
        }
      } else if (error.request) {
        // リクエストは送信されたが、レスポンスがない場合 (ネットワークエラーなど)
        message = "サーバーに接続できませんでした。ネットワーク接続を確認してください。";
      }
      this.setState({ errorMessage: message });

    } finally {
      // ローディング終了
      this.setState({ loading: false });
    }
  };

  // フォームのリセットハンドラ
  handleReset = () => {
        this.setState({
      mailAddress: "",
      password: "",
      errorMessage: "",
    });
  };

  render() {
    const { mailAddress, password, errorMessage, loading } = this.state;
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <label htmlFor="mail_address">メールアドレス</label><br/>
          <input
            type="text"
            name="mailAddress"
            id="mail_address"
            value={mailAddress}
            onChange={this.onInput}
            required // 入力必須に
          /><br/>

          <label htmlFor="password">パスワード</label><br/>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.onInput}
            required
          /><br/>

          {errorMessage && ( // エラーメッセージがある場合のみ表示
            <p id="errorMessage" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}

          <input type="reset" name="reset" value="リセット" onClick={this.handleReset}/>
          <input
            type="submit"
            name="submit"
            value={loading ? "ログイン中..." : "ログイン"}
            // フォーム送信中にボタンを無効化
            disabled={loading}
          />
        </form>

        <a href="./signup/">新規登録はこちら</a>
      </div>
    );
  }
}