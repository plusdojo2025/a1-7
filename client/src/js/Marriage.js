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
      marriageYear: "",
      marriageMonth: "",
      startYear: "",
      startMonth: "",
      span_id: "",
      span: "",
      percentage: "",
      errorMessage: "",
      proposedPhases: {},
    };
  }

  componentDidMount() {
    const today = new Date();
    console.log("今日の日付:", today);
  }

  onInput = (event) => {
    // let marriageTiming = e.target.marriageTiming;
    this.setState({
      // marriageTiming: event.target.value,
      marriageYear: event.target.value,
      marriageMonth: event.target.value,
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

  // エラーチェック、値をセット
  handlePlan = (event) => {
    event.preventDefault();
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
    this.setState({
      span: plan.span,
      startYear: plan.startYear,
      startMonth: plan.startMonth,
      proposedPhases: plan.phases,
      errorMessage: "",
    });
  };


  render() {
    let { marriageTiming, startYear, startMonth, marriageYear, marriageMonth, span, errorMessage, proposedPhases } = this.state;
    const { phase1, phase2, phase3, phase4, phase5 } = proposedPhases || {};
    // ↓セレクトの中身
    const yearOptions = Array.from({ length: 2100 - 2025 + 1 }, (_, i) => 2025 + i);
    const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
      <div>
        {marriageYear && (
          <div>
            <h4>希望年：</h4>
            <p>{marriageYear}</p>
          </div>
        )}

        {marriageMonth && (
          <div>
            <h4>希望月：</h4>
            <p>{marriageMonth}</p>
          </div>
        )}

        {span && (
          <div>
            <h4>想定期間：</h4>
            <p>{span}</p>
          </div>
        )}

        {Object.keys(this.state.proposedPhases).length > 0 && (
          <div>
            <h4>：</h4>
            <p>
              <h2>流れ</h2>
              <h3>1. 自己分析・準備</h3>
              <h3>2. お相手探し</h3>
              <h3>3. 仮交際・相性確認</h3>
              <h3>4. 真剣交際・将来共有</h3>
              <h3>5. プロポーズ・成婚準備</h3>

              <br />

              {/* <!-- 期間ごとのイベント（仮表示） --> */}
              <h3>{startYear}年 {startMonth}月 ～ {phase1.year}年 {phase1.month}月：</h3>
              <h4>1. 結婚観や理想の相手像を明確にするステップです。プロフィール作成や写真の準備も忘れずに行い、いよいよ婚活をスタートしましょう。
                <br />対応機能：プロフィール登録、理想像登録</h4>

              <h3>{phase1.year}年 {phase1.month}月 ～ {phase2.year}年 {phase2.month}月：</h3>
              <h4>2. 婚活アプリ、結婚相談所、パーティーなどを活用して異性と出会い、メッセージのやり取りや初回デートでお相手を理解していきます。
                <br />対応機能：お相手情報一覧・検索・登録、お相手情報表示</h4>

              <h3>{phase2.year}年 {phase2.month}月 ～ {phase3.year}年 {phase3.month}月：</h3>
              <h4>3. 複数人と同時に交流を進めながら、共通する価値観やフィーリングを見極めていく段階です。将来に向けた判断材料が増えていきます。
                <br />対応機能：お相手印象記録、お相手情報編集</h4>

              <h3>{phase3.year}年 {phase3.month}月 ～ {phase4.year}年 {phase4.month}月：</h3>
              <h4>4. 結婚を前提に1人のお相手と深く交際を重ねます。価値観やライフスタイル、将来のビジョンなどを具体的に話し合っていきましょう。
                <br />対応機能：デートスポット提案</h4>

              <h3>{phase4.year}年 {phase4.month}月 ～ {phase5.year}年 {phase5.month}月：</h3>
              <h4>5. お互いに結婚の意思を確認したら、プロポーズへ。両家への挨拶や入籍準備など、成婚に向けてステップを進めていきます。</h4>
            </p>
          </div>
        )}


        {/* 結婚希望時期を入力 */}
        <h2>結婚希望時期は？</h2>
        <p>（半年以降で設定してください）</p>
        {/* <div th:text="${message}"></div> */}
        <form method="POST">
          {/* <label htmlFor="marriageTiming">結婚希望時期</label>
          <input
            type="date"
            name="marriageTiming"
            id="marriageTiming"
            value={this.state.marriageTiming}
            onChange={this.onInput}
          ></input> */}

          {/* 年と月を入力にする */}
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

          <button onClick={this.handlePlan}>調べる</button>

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