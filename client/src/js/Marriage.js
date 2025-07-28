import React from "react";
import axios from "axios";
import { withNavigation } from "../hoc/withNavigation";

// ↓ページURL
// http://localhost:3000/marriage-plans/

class Marriage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marriageTiming: "",
      span_id: "",
      span: "",
      percentage: "",
      errorMessage: "",
    };
  }

  componentDidMount() {
    const today = new Date();
    console.log("今日の日付:", today);
  }

  onInput = (event) => {
    // let marriageTiming = e.target.marriageTiming;
    this.setState({
      marriageTiming: event.target.value,
      errorMessage: "", // 入力があったらエラーメッセージをクリア
    });
  };

  submitPlan = async (event) => {
    event.preventDefault(); // イベントのデフォルト動作を停止

    // 今日の日付を再取得する
    const today = new Date();

    const { marriageTiming } = this.state;
    let message = "";

    // １．バリデーションチェック
    // １－１．結婚希望時期未入力の場合
    if (!marriageTiming) {
      message = "結婚希望時期を入力してください";
      this.setState({ errorMessage: message });
      return; // 処理を中断
    }

    // １－２．結婚希望時期が半年以降でない場合
    // marriageTimingは "YYYY-MM-DD" 形式の文字列なので、Dateオブジェクトに変換
    const selectedDate = new Date(marriageTiming);

    // 半年後の日付を計算
    const sixMonthsLater = new Date(today);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    if (selectedDate < sixMonthsLater) {
      message = "半年以降で入力してください";
      this.setState({ errorMessage: message });
      return; // 処理を中断
    }

    // ２．バックエンドAPIへのリクエスト送信処理
    const { navigate } = this.props.router; // ルーティング機能にアクセス

    const postData = {
      marriageTimingLcD: marriageTiming,
    };

    try {
      // JWTをlocalStorageから取得 (ログイン時に保存したと仮定)
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        // トークンがなければログインページへリダイレクト
        this.setState({
          errorMessage: "認証が必要です。ログインしてください。",
        });
        navigate("/login/");
        return;
      }
      const response = await axios.post(
        "/api/marriage-plans/result/",
        postData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("成功", response.data);

      this.setState({
        span: response.data.span,
        percentage: response.data.percentage,
        proposedPhases: response.data.proposedPhases, // フェーズ情報を格納するオブジェクト
        errorMessage: "",
    });

      navigate("/marriage-plans/result/", { state: { planData: response.data } }); // 結果画面に遷移
    } catch (error) {
      console.log("失敗", error);
      // this.setState({errorMessage})
      // let message = "結婚希望時期を入力してください";
      // this.setState({ errorMessage: message });
    }
  };

  render() {
    let { marriageTiming, errorMessage } = this.state;
    return (
      <div>
        <h2>結婚希望時期は？</h2>
        <p>（半年以降で設定してください）</p>
        {/* <div th:text="${message}"></div> */}
        <form method="POST">
          <label htmlFor="marriageTiming">結婚希望時期</label>
          <input
            type="date"
            name="marriageTiming"
            id="marriageTiming"
            value={this.state.marriageTiming}
            onChange={this.onInput}
          ></input>

          <button onClick={this.submitPlan}>調べる</button>

          {/* エラーメッセージがある場合のみ表示 */}
          {errorMessage && (
            <p id="errorMessage" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    );
  }
}

export default withNavigation(Marriage);
