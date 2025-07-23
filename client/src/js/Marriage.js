import React from "react";
import axios from "axios";

export default class Marriage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marriage_timing: "",
            //   span_id: "",
            //   span: "",
            //   percentage: "",
            error_message: "",
        };
    }

    onInput = (e) => {
        // let marriageTiming = e.target.marriageTiming;
        this.setState({
            marriage_timing: e.target.value,
            errorMessage: "", // 入力があったらエラーメッセージをクリア
        });
    };

    submitPlan = () => {
        // window.alert("調べました");
        axios 
        .post("/marriage_plans/proposal/", {
            marriage_timing: this.state.marriage_timing,
        })
        .then((response) => {
            console.log("成功", response);
        })
        .catch((error) => {
            console.log("失敗", error);
            // this.setState({errorMessage})
        })
    };

    render() {
        return (
            <div>
                <h2>結婚希望時期は？</h2>
                <p>（半年以降で設定してください）</p>
                {/* <div th:text="${message}"></div> */}
                <form method="POST" action="/marriage_plans/proposal/">
                    <label htmlFor="marriage_timing">結婚希望時期（半年以降で入力）</label>
                    <input type="date" name="marriage_timing" id="marriage_timing" value={this.state.marriage_timing} onChange={this.onInput}></input>

                    <button onClick={this.submitPlan}>調べる</button>
                    

                </form>
            </div>
        );
    }


}
