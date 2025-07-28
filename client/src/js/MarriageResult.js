import React from "react";
import axios from "axios";
import { withNavigation } from "../hoc/withNavigation";

// http://localhost:3000/marriage-plans/result/

class MarriageResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Marriage.js から渡されるデータの初期値
            span: null,
            percentage: null,
            proposedPhases: {},

            marriageTiming: "",
            marriageYear: "",
            marriageMonth: "",

            startYear: Response.data.startYear,
            startMonth: Response.data.startMonth,


            span_id: "",
            span: "",
            percentage: "",
            errorMessage: "",
        };

    }

    

    componentDidMount() {
        // Marriage.js から navigate の state 経由でデータを受け取る
        if (this.props.router.location.state && this.props.router.location.state.planData) {
            const planData = this.props.router.location.state.planData;
            this.setState({
                span: planData.span,
                percentage: planData.percentage,
                proposedPhases: planData.proposedPhases || {},
                errorMessage: planData.message && !planData.success ? planData.message : "", // エラーメッセージがあれば表示
            });
        } else {
            // データがない場合（例: 直接このURLにアクセスした場合）の処理
            this.setState({
                errorMessage: "婚活計画データが見つかりませんでした。再度、計画を入力してください。",
            });
            // または、入力画面に戻す
            // this.props.router.navigate("/marriage-plans");
        }
    }
   
    render() {
        const {startYear, startMonth , span, percentage, proposedPhases, errorMessage } = this.state;

        // 各フェーズの情報を取得
        const phase1 = proposedPhases.phase1 || {};
        const phase2 = proposedPhases.phase2 || {};
        const phase3 = proposedPhases.phase3 || {};
        const phase4 = proposedPhases.phase4 || {};
        const phase5 = proposedPhases.phase5 || {};

        return (
            <div>
                {/* ↓おおまかな流れ　左半分に表示 */}
                <h2>流れ</h2>
                <h3>お相手探し</h3>
                <h3>ファーストコンタクト</h3>
                <h3>交際</h3>
                <h3>真剣交際</h3>
                <h3>ゴール</h3>

                {/* 期間ごとのイベント */}
                {/* 計算から期間を算出 */}
                <h3>{startYear}年 {startMonth}月 ～ {phase1.year}年 {phase1.month}月：</h3>
                <h4>プロフィール完成、活動開始</h4>
                <h3>{phase1.year}年 {phase1.month}月 ～ {phase2.year}年 {phase2.month}月：</h3>                
                <h4>初対面、メッセージのやり取りを開始</h4>
                <h3>{phase2.year}年 {phase2.month}月 ～ {phase3.year}年 {phase3.month}月：</h3>                
                <h4>交際開始、共通価値観の確認</h4>
                <h3>{phase3.year}年 {phase3.month}月 ～ {phase4.year}年 {phase4.month}月：</h3>                
                <h4>交際安定、将来の話を始める</h4>
                <h3>{phase4.year}年 {phase4.month}月 ～ {phase5.year}年 {phase5.month}月：</h3>                
                <h4>両家挨拶、式場予約</h4>

                <h3>希望時期：{phase5.year}年 {phase5.month}月</h3>
                <h3>想定期間：{span}ヶ月</h3>

            </div>
        );
    }
}

export default withNavigation(MarriageResult);