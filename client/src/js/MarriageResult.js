import React from "react";
import { withNavigation } from "../hoc/withNavigation";
import "../css/Marriage.css";

// http://localhost:3000/marriage-plans/result/

class MarriageResult extends React.Component {
  render() {
    // 親コンポーネントからpropsとしてデータを受け取る
    const { state } = this.props.router.location || {};
    const { startYear, startMonth, proposedPhases } = state || {};

    // proposedPhasesが空の場合、何も表示しない
    if (!proposedPhases || Object.keys(proposedPhases).length === 0) {
      return (
        <div>
          <p>
            プランデータが見つかりませんでした。再度、結婚希望時期を入力してください。
          </p>
          <button onClick={() => this.props.router.navigate("/marriage-plans/")}>
            戻る
          </button>
        </div>
      );
    }

    const { phase1, phase2, phase3, phase4, phase5 } = proposedPhases;

    return (
      <div>
        <div className="marriage-split-container">
          <div className="marriage-left-side">
            <h2>流れ</h2>
            <h4>1. 自己分析・準備</h4>
            <h4>2. お相手探し</h4>
            <h3>3. 仮交際・相性確認</h3>
            <h4>4. 真剣交際・将来共有</h4>
            <h4>5. プロポーズ・成婚準備</h4>

            <br />
          </div>

          {/* <!-- 期間ごとのイベント（仮表示） --> */}
          <div className="marriage-right-side">
            <div className="marriageplan-result-area">
              <h3>
                1. {startYear}年{startMonth}月 ～ {phase1.year}年{phase1.month}
                月：
              </h3>
              <h4>
                結婚観や理想の相手像を明確にするステップです。プロフィール作成など準備をして婚活スタート。
                <br />
                {/* 対応機能：プロフィール登録、理想像登録 */}
              </h4>
            </div>
            <div className="marriageplan-result-area">
              <h3>
                2. {phase1.year}年{phase1.month}月 ～ {phase2.year}年{phase2.month}
                月:
              </h3>
              <h4>
                結婚相談所、パーティーなどを活用して出会い、メッセージのやり取りや初デートで相手を理解していきます。
                <br />
                {/* 対応機能：お相手情報一覧・検索・登録、お相手情報表示 */}
              </h4>
            </div>
            <div className="marriageplan-result-area">
              <h3>
                3. {phase2.year}年{phase2.month}月 ～ {phase3.year}年{phase3.month}
                月:
              </h3>
              <h4>
                複数人と同時に交流を進めながら、共通する価値観やフィーリングを見極めていく段階。将来に向けた判断材料が増えていきます。
                <br />
                {/* 対応機能：お相手印象記録、お相手情報編集 */}
              </h4>
            </div>
            <div className="marriageplan-result-area">
              <h3>
                4. {phase3.year}年{phase3.month}月 ～ {phase4.year}年{phase4.month}
                月：
              </h3>
              <h4>
                結婚を前提に1人のお相手と深く交際。価値観やライフスタイル、将来のビジョンなどを具体的に話し合っていきましょう。
                <br />
                {/* 対応機能：デートスポット提案 */}
              </h4>
            </div>
            <div className="marriageplan-result-area">
              <h3>
                5. {phase4.year}年{phase4.month}月 ～ {phase5.year}年{phase5.month}
                月:
              </h3>
              <h4>
                お互いに結婚の意思を確認したら、プロポーズへ。両家への挨拶や入籍準備など、成婚に向けてステップを進めていきます。
              </h4>
            </div>
          </div>
        </div>
        <button onClick={() => this.props.router.navigate("/marriage-plans/")}>
          戻る
        </button>
      </div>
    );
  }
}

export default withNavigation(MarriageResult);
