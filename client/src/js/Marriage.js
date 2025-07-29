import React from "react";
import { withNavigation } from "../hoc/withNavigation";
import "../css/Marriage.css";

// ↓ページURL
// http://localhost:3000/marriage-plans/

class Marriage extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    this.state = {
      marriageTiming: "",
      marriageYear: currentYear.toString(),
      marriageMonth: currentMonth.toString(),
      startYear: "",
      startMonth: "",
      span_id: "",
      span: "",
      percentage: "",
      errorMessage: "",
    };
  }

  onInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errorMessage: "", // 入力があったらエラーメッセージをクリア
    });
  };

  createMarriagePlan(marriageYear, marriageMonth) {
    const today = new Date();
    const inputDate = new Date(marriageYear, marriageMonth - 1); // 月は 0-indexed
    const span = this.calculateMonthSpan(today, inputDate);

    const response = {
      success: false,
      startYear: today.getFullYear(),
      startMonth: today.getMonth() + 1,
      message: "",
      // phase1: { year: 2025, month: 9 } // 仮固定。必要なら動的に計算できます。
    };

    if (span < 6) {
      response.message = "半年以降で入力してください";
      return response;
    }

    response.success = true;
    return response;
  }

  calculateMonthSpan(fromDate, toDate) {
    const yearsDiff = toDate.getFullYear() - fromDate.getFullYear();
    const monthsDiff = toDate.getMonth() - fromDate.getMonth();
    return yearsDiff * 12 + monthsDiff;

  }

  // 婚活プラン計算
  calculateMarriagePhases(marriageYear, marriageMonth) {
    const today = new Date();
    const inputDate = new Date(marriageYear, marriageMonth - 1); // 0-indexed

    const span = this.calculateMonthSpan(today, inputDate) + 1;
    const startYear = today.getFullYear();
    const startMonth = today.getMonth() + 1;

    const phaseWeights = [0.1, 0.2, 0.2, 0.4, 0.1]; // 固定比重：計5フェーズ
    const remainder = span % 5;  //あまり計算
    let currentYear = startYear;
    let currentMonth = startMonth;

    // phase初期化
    const phases = {};

    for (let i = 0; i < phaseWeights.length; i++) {
      let monthsToAdd = Math.floor(span * phaseWeights[i]);

      // 端数調整：フェーズ4 に足す
      if (remainder > 0 && i === 3) {
        monthsToAdd += remainder;
      }

      // 越年判定
      let nextMonth = currentMonth + monthsToAdd;
      while (nextMonth > 12) {
        nextMonth -= 12;
        currentYear++;
      }

      // phaseごとの年、月を設定
      phases[`phase${i + 1}`] = {
        year: currentYear,
        month: nextMonth
      };

      // 婚活終了時期調整
      if (i === 3 && marriageMonth < nextMonth) {
        phases[`phase${i + 1}`].year = marriageYear;
        phases[`phase${i + 1}`].month = marriageMonth;
      }
      if (i === 4 && marriageMonth !== nextMonth) {
        phases[`phase${i + 1}`].year = marriageYear;
        phases[`phase${i + 1}`].month = marriageMonth;
      }


      // 次フェーズ用に更新
      currentMonth = nextMonth;
    }

    return {
      span,
      startYear,
      startMonth,
      phases
    };
  }

  // プラン計算メソッド
  handlePlan = (event) => {
    event.preventDefault();
    // エラーチェック、値をセット
    const { marriageYear, marriageMonth } = this.state;
    if (!marriageYear || !marriageMonth) {
      this.setState({ errorMessage: "年と月を選択してください。" });
      return;
    }
    const plan = this.calculateMarriagePhases(Number(marriageYear), Number(marriageMonth));

    if (plan.span < 6) {
      this.setState({ errorMessage: "半年以降で入力してください。" });
      return;
    }

    // 計算が成功したら、結果画面に遷移し、計算結果をstateとして渡す
    this.props.router.navigate("/marriage-plans/result/", {
    state: {
        startYear: plan.startYear,
        startMonth: plan.startMonth,
        proposedPhases: plan.phases,
        span: plan.span, // 必要であればspanも渡す
      },
    });
  }

  render() {
    const { marriageYear, marriageMonth, errorMessage } = this.state;
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 2100 - currentYear + 1 }, (_, i) => currentYear + i);
    const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
      <div>
        {/* 結婚希望時期を入力 */}
        <h2>結婚希望時期は？</h2>
        <span>（半年以降で設定してください）</span>

        <form method="POST">
          {/* 年と月を入力にする */}
          <div className="input-marriage-timing">
          <select
            name="marriageYear"
            id="marriageYear"
            value={marriageYear}
            onChange={(e) => this.setState({ marriageYear: e.target.value })}
          >
            <option value="">選択してください</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}年</option>
            ))}
          </select>
          <label htmlFor="marriageYear"></label>

          <select
            name="marriageMonth"
            id="marriageMonth"
            value={marriageMonth}
            onChange={(e) => this.setState({ marriageMonth: e.target.value })}
          >
            <option value="">選択してください</option>
            {monthOptions.map((m) => (
              <option key={m} value={m}>{m}月</option>
            ))}
          </select>
          <label htmlFor="marriageMonth"></label>
          </div>

          <button onClick={this.handlePlan} className="marriage-check-button">調べる</button>

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