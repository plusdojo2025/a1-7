import React from "react";
import axios from "axios";

// ↓ページURL
// http://localhost:3000/marriage-plans/

export default class Marriage extends React.Component {
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

    submitPlan = (event) => {
        // 今日の日付を取得
        const today = new Date();

        // 結婚希望時期未入力の場合
        let { marriageTiming, errorMessage } = this.state;
        if (marriageTiming == "") {
            let message = "結婚希望時期を入力してください";
            this.setState({ errorMessage: message });
            event.preventDefault();
        }

        // 結婚希望時期が半年以降でない場合
        if (marriageTiming - today < 182) {
            let message = "半年以降で入力してください";
            this.setState({ errorMessage: message });
            event.preventDefault();
        }

        // 送信処理
        axios
            .post("/marriage_plans/proposal/", {
                marriageTiming: this.state.marriageTiming,
            })
            .then((response) => {
                console.log("成功", response);
            })
            .catch((error) => {
                console.log("失敗", error);
                // this.setState({errorMessage})
                // let message = "結婚希望時期を入力してください";
                // this.setState({ errorMessage: message });

            })
    };

    render() {
        let { marriageTiming, errorMessage } = this.state;
        return (
            <div>
                <h2>結婚希望時期は？</h2>
                <p>（半年以降で設定してください）</p>
                {/* <div th:text="${message}"></div> */}
                <form method="POST" >
                    <label htmlFor="marriageTiming">結婚希望時期</label>
                    <input type="date" name="marriageTiming" id="marriageTiming" value={this.state.marriageTiming} onChange={this.onInput}></input>

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
