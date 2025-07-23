import React from "react";
import axios from "axios";

export default class MessageCorrect extends React.Component {
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

    render() {
        return (
            <div>
                <p>メッセージ添削</p>
            </div>
        );
    }


}