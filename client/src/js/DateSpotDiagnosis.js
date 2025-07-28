
import React from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// ページURL（http://localhost:3000/date-spot/）

// 🚩 React Router v6 用の withRouter を自作
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

class Date extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: "",
    };
  }

  qstart = async (event) => {
    event.preventDefault(); // イベントのデフォルト動作を停止
    
    this.setState({ loading: true, errorMessage: "" });
    try {
      // JWTをlocalStorageから取得
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        // トークンがなければログインページへリダイレクト
        this.setState({
          errorMessage: "認証が必要です。ログインしてください。",
        });
        this.props.router.navigate("/login/");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      // 🚩 router.navigate に変更（React Router v6）
      this.props.router.navigate("/date-spot/questions/");
    } catch (error) {
      console.error("エラー:", error);
      this.setState({ errorMessage: "エラーが発生しました。" });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, errorMessage } = this.state;

    return (
      <div>
        <p>おすすめのデートスポットを提案します</p>
        <p>デートスポット診断</p>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button onClick={this.qstart} disabled={loading}>
          {loading ? "Loading..." : "スタート"}
        </button>
      </div>
    );
  }
}

// 🚩 クラスコンポーネント用に withRouter でラップ
export default withRouter(Date);