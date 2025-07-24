
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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

  qstart = async () => {
    this.setState({ loading: true, errorMessage: "" });
    try {
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