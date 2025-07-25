import React from "react";
import axios from "axios";

export default class Phase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phases: [],
            isExpanded: {}
        };
    }


    toggleExpand = (id) => {
        this.setState((prevState) => ({
            isExpanded: {
                ...prevState.isExpanded,
                [id]: !prevState.isExpanded[id],
            }
        }));
    };

    render() {
        const { phases, isExpanded } = this.state;

        return (
            <div>
                <h2>恋愛フェーズ一覧</h2>

                {phases.map((phase) => (
                    <div key={phase.id}>
                        <div >
                            <strong>{phase.phase}</strong>
                            <button onClick={() => this.toggleExpand(phase.id)}>
                                {isExpanded[phase.id] ? "▶ 閉じる" : "▼詳細"}
                            </button>
                        </div>

                        {isExpanded[phase.id] && (
                            <div>
                                <div>進捗率: {phase.achievementRate}%</div>
                                <div>フェーズステータス: {phase.phaseStatus}</div>
                                <div>総ポイント: {phase.totalPoint}</div>
                                <div>サブタイトル: {phase.subTitle}</div>
                                
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }
}
