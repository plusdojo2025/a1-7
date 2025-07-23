import React from "react";
import axios from "axios";

// http://localhost:3000/messages/ideas/

export default class MessageIdea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            partnersId: "",
            mood: "",
            matter: "",
            prompt: "",
            commandSentence: "",
        };
    }

    handleChange = (event) => {
        const { name, value} = event.target;
        this.setState({[name]:value});
    }

    submitMessageIdea = (event) => {
        event.preventDefault();

        let { partnersId, mood, matter, errorMessage, } = this.state;
        if (partnersId === "" || mood === "" || matter === "") {
            let message = "未選択の項目があります";
            this.setState({ errorMessage: message });
            // event.preventDefault();
        }

        axios
            .post("", {
                partnersId: this.state.partnersId,
                mood: this.state.mood,
                matter: this.state.matter,
            })
            .then((response) => {
                console.log("成功", response);
            })
            .catch((error) => {
                console.log("失敗", error);
            })

    }




    render() {
        let { partnersId, mood, matter, commandSentence, prompt , errorMessage, } = this.state;
        return (
            <div>
                <h2>メッセージ提案</h2>

                {/* 命令文表示エリア */}
                <p>命令文表示エリア</p>
                <input type="text" name="commandSentence" id="commandSentence" value={commandSentence}></input>
                <p></p>
                <br></br>

                {/* プロンプト表示エリア */}
                <p>プロンプト表示エリア</p>
                <input type="text" name="prompt" id="prompt" value={prompt}></input>
                <p></p>
                <br></br>


                <form method="POST">
                    {/* 宛先セレクト */}
                    <input type="text" name="partnersId" id="partnersId" value={partnersId} onChange={this.handleChange}></input>
                    <label htmlFor="partnersId">さん宛に</label>
                    <br></br>

                    {/* 雰囲気セレクト */}
                    <input type="text" name="mood" id="mood" value={mood} onChange={this.handleChange}></input>
                    <label htmlFor="mood">な雰囲気で</label>
                    <br></br>

                    {/* 用件セレクト */}
                    <input type="text" name="matter" id="matter" value={matter} onChange={this.handleChange}></input>
                    <label htmlFor="matter">ためのメッセージを考えて</label>
                    <br></br>

                    <button onClick={this.submitMessageIdea}>作成</button>

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