import React from "react";
import axios from "axios";

// http://localhost:3000/marriage-plans/result/

export default class MarriageResult extends React.Component {
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
    render() {
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
                <h3>　月～　月：</h3>
                <h4>プロフィール完成、活動開始</h4>
                <h3>　月～　月：</h3>
                <h4>初対面、メッセージのやり取りを開始</h4>
                <h3>　月～　月：</h3>
                <h4>交際開始、共通価値観の確認</h4>
                <h3>　月～　月：</h3>
                <h4>交際安定、将来の話を始める</h4>
                <h3>　月～　月：</h3>
                <h4>両家挨拶、式場予約</h4>

            </div>
        );
    }
}