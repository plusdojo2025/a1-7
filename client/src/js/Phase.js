import React from "react";

export default class Phase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            achievementRate: '0', // 進捗率
            phaseStatus: '0', // フェーズステータス
            totalPoint: '0', // 総ポイント
            phase: "", // フェーズ名
            sub_Title: "", // サブタイトル
            isExpanded: false, // 展開状態
        };
    }


    componentDidMount() {
        fetch('/api/getPhase')
            .then(response => response.json())
            .then(data => {

                this.setState({
                    phase: data.phase,
                    achievementRate: data.achievementRate,
                    phaseStatus: data.phaseStatus,
                    totalPoint: data.totalPoint,
                    sub_Title: data.sub_Title,
                });
            })
            .catch(error => {
                console.error('データ取得エラー:', error);
            });
    }


    togglePhase = () => {
        this.setState(prevState => ({
            isExpanded: !prevState.isExpanded,
        }));
    };

    render() {
        return (
            <div>
                <div>
                    {/* フェーズ名とボタン */}
                    <div>
                        <div>{this.state.phase || "ロード中..."}</div>  {/* もしデータがまだ取得されていない場合は "ロード中..." と表示 */}
                        <button onClick={this.togglePhase}>
                            {this.state.isExpanded ? '▼' : '▶'}
                        </button>
                    </div>
               


                {/* 展開状態に応じて中身を表示/非表示 */}
                {this.state.isExpanded && (
                    <div>
                        <div>進捗率: {this.state.achievementRate}</div>
                        <div>フェーズステータス: {this.state.phaseStatus}</div>
                        <div>総ポイント: {this.state.totalPoint}</div>
                        <div>サブタイトル: {this.state.sub_Title}</div>
                    </div>
                )}
            </div>
      </div >
    );
    }
}
