import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// withNavigation をインポートしてクラスコンポーネントに navigate を渡す
import { withNavigation } from "../hoc/withNavigation";
import '../css/Login.css';

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
    const { navigate } = this.props.router; // ルーティング機能にアクセス
    const { onLoginSuccess } = this.props;

    try {
      // 1. バックエンドAPIへのリクエスト
      const data = { mailAddress, password };
      // LoginControllerにデータをPOSTして、@PostMapping("/login/")が付与されているloginメソッドを実行
      const response = await axios.post("/api/login/", data);

      // ２．ログイン成功時の処理
      console.log("ログイン成功:", response.data); // デバッグ用

      // JWTアクセストークンをlocalStorageに保存
      const accessToken = response.data.accessToken;
      if (accessToken) {
        // userId はバックエンドで認証情報から取得するため、React上では保存不要
        localStorage.setItem("accessToken", accessToken);
      } else {
        // トークンが返ってこない場合のエラー処理
        throw new Error("アクセストークンがレスポンスに含まれていません。");
      }

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
          // サーバーからのエラーレスポンスがある（ログインAPIは通常、認証失敗時に401を返す）
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
      this.setState({ errorMessage: message }); // エラーメッセージをセット
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
          </label>
          <br />
          <input
            type="text"
            name="mailAddress"
            id="mail_address"
            value={mailAddress}
            onChange={this.onInput}
            placeholder="メールアドレス"
            required // 入力必須に
          />
          

          <label htmlFor="password"></label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.onInput}
            placeholder="パスワード"
            required
          />
      

          {/* エラーメッセージがある場合のみ表示 */}
          {errorMessage && (
            <p id="errorMessage" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}

          <div className="reset-button">
            <input
              type="reset"
              name="reset"
              value="リセット"
              onClick={this.handleReset}
            />
          </div>

       
          <input
            type="submit"
            name="submit"
            value={loading ? "ログイン中..." : "ログイン"}
            disabled={loading} // フォーム送信中にボタンを無効化
          />
        </form>
        <br/>

        <Link to="/signup/">新規登録はこちら</Link>
      </div>
    );
  }
}

// withNavigation でラップしてエクスポート
export default withNavigation(Login);
