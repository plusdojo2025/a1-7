import React from "react";
import axios from "axios";
// withNavigation をインポートしてクラスコンポーネントに navigate を渡す
import { withNavigation } from "../hoc/withNavigation";

// default export は withNavigation で行う（コード末尾参照）
class Login extends React.Component {
  constructor(props) {
    super(props);
    // 初期値を設定
    this.state = {
      mailAddress: "",
      password: "",
      errorMessage: "",
      loading: false, // ローディング状態
    };
  }

  // 入力値が変更されたときに state を更新するメソッド
  onInput = (e) => {
    // イベントが発生したDOM要素 e.target の name属性 と 現在の入力値value を取得
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
    const { navigate, onLoginSuccess } = this.props; // ルーティング機能にアクセス

    try {
      // 1. バックエンドAPIへのリクエスト
      const data = { mailAddress, password };
      const response = await axios.post("/login/", data);

      // ２．ログイン成功時の処理
      console.log("ログイン成功:", response.data); // デバッグ用
      // 親コンポーネントにログイン成功を通知する（認証状態を更新するため）
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      // お相手一覧画面に遷移（this.props.navigate を使用）
      navigate("/home/");

      // ３．ログイン失敗時の処理
    } catch (error) {
      console.error("ログインエラー:", error);

      let message = "予期せぬエラーが発生しました。";
      // エラーがAxiosのものかどうかを確認
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // サーバーからのエラーレスポンスがある場合
          if (error.response.status === 401) {
            message = "メールアドレスまたはパスワードが間違っています。";
            // サーバーが具体的なエラーメッセージを返した場合
          } else if (error.response.data && error.response.data.message) {
            message = error.response.data.message;
          } else {
            message =
              "ログインに失敗しました。ステータスコード: ${error.response.status}";
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
    } finally {
      // ４．ローディング終了
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
          <label
            htmlFor="mail_address" // ※ input の id と一致させる
          >
            メールアドレス
          </label>
          <br />
          <input
            type="text"
            name="mailAddress"
            id="mail_address"
            value={mailAddress}
            onChange={this.onInput}
            required // 入力必須に
          />
          <br />

          <label htmlFor="password">パスワード</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.onInput}
            required
          />
          <br />

          {/* エラーメッセージがある場合のみ表示 */}
          {errorMessage && (
            <p id="errorMessage" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}

          <input
            type="reset"
            name="reset"
            value="リセット"
            onClick={this.handleReset}
          />
          <input
            type="submit"
            name="submit"
            value={loading ? "ログイン中..." : "ログイン"}
            disabled={loading} // フォーム送信中にボタンを無効化
          />
        </form>

        <a href="/signup/">新規登録はこちら</a>
      </div>
    );
  }
}

// withNavigation でラップしてエクスポート
export default withNavigation(Login);
