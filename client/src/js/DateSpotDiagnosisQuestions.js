import React from "react";
import axios from "axios";

class DateSpotDiagnosisQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionId: "Q1", // 最初の質問ID
      questionsMap: {},        // 質問と結論の情報をIDで管理
      loading: true,
      errorMessage: "",
      nextId:"",
    };
  }

  componentDidMount() {
    axios.get("/api/date-spot/")
      .then(response => {
         console.log("APIから取得したデータ:", response.data);  // ← ここに移動
        const map = {};
        response.data.forEach(item => {
          map[item.questionId] = item;
        });

        this.setState({
          questionsMap: map,
          loading: false,
          currentQuestionId: "Q1" // 最初の質問セット
        });
      })
      .catch(error => {
        this.setState({
          errorMessage: "データの取得に失敗しました。",
          loading: false
        });
        console.error(error);
      });
  }

  handleAnswer = (answer) => {
    const { questionsMap, currentQuestionId } = this.state;
    const currentItem = questionsMap[currentQuestionId];
    if (!currentItem) return;

    // answer は "yes" か "no"
    const nextId = answer === "yes" ? currentItem.yesNextId : currentItem.noNextId;

    if (!nextId) {
      // 次の質問も結論も無い場合は終了（異常系）
      this.setState({ errorMessage: "次の質問が見つかりません。" });
      return;
    }

    this.setState({ currentQuestionId: nextId, errorMessage: "" });
  };

  render() {
    const { loading, errorMessage, questionsMap, currentQuestionId } = this.state;

    if (loading) return <p>Loading...</p>;
    if (errorMessage) return <p style={{color: "red"}}>{errorMessage}</p>;

    const currentItem = questionsMap[currentQuestionId];
    console.log("questionsMap:");
    console.log(questionsMap);    
    if (!currentItem) return <p>質問が見つかりません。</p>;

    // 結論があれば結果画面表示
    if (currentItem.conclusion) {
      return (
        <div>
          <h2>診断結果</h2>
          <p>{currentItem.conclusion}</p>
          {/* 必要ならトップ画面や再挑戦ボタンなど */}
        </div>
      );
    }

    // 質問画面
    return (
      <div>
        <h2>{currentItem.question}</h2>
        <button onClick={() => this.handleAnswer("yes")}>はい</button>
        <button onClick={() => this.handleAnswer("no")}>いいえ</button>
      </div>
    );
  }
}

export default DateSpotDiagnosisQuestions;