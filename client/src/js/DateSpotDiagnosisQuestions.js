import React from "react";
import axios from "axios";
import { withNavigation } from "../hoc/withNavigation";
import '../css/DateSpotDiagnosis.css';

// ↓ページURL
// http://localhost:3000/date-spot/questions/

class DateSpotDiagnosisQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionId: "Q1", // 最初の質問ID
      questionsMap: {},        // 質問と結論の情報をIDで管理
      loading: true,
      errorMessage: "",
      nextId:"",
      history:[],
    };
  }

  componentDidMount() {
    this.setState({ loading: true, errorMessage: "" }); // ロード状態を設定
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        // トークンがなければログインページへリダイレクト
        this.setState({
          errorMessage: "認証が必要です。ログインしてください。",
          loading: false // ローディングを解除
        });
        this.props.router.navigate("/login/");
        return; // リクエストを停止
      }

    axios.get("/api/date-spot/", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
      .then(response => {
         console.log("APIから取得したデータ:", response.data); 
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
    const { questionsMap, currentQuestionId, history } = this.state;
    const currentItem = questionsMap[currentQuestionId];
    if (!currentItem) return;

    // answer は "yes" か "no"
    const nextId = answer === "yes" ? currentItem.yesNextId : currentItem.noNextId;

    if (!nextId) {
      // 次の質問も結論も無い場合は終了（異常系）
      this.setState({ errorMessage: "次の質問が見つかりません。" });
      return;
    }

    this.setState({ currentQuestionId: nextId, errorMessage: "",
      history: [...history, currentQuestionId],
     });
  };

  handleBack = () => {
    const { history } = this.state;

    if (history.length === 0) return; //履歴が空なら何もしない

    const previousId = history[history.length -1];
    const newHistory = history.slice(0, history.length -1); // 最後のIDを削除

    this.setState({
      currentQuestionId: previousId,
      history: newHistory,
      errorMessage: "",
    });
  };

  render() {
    const { loading, errorMessage, questionsMap, currentQuestionId, history } = this.state;

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
          <p>{currentItem.conclusion}がおすすめです！
          </p>
            <div>
              {currentItem.description.split('\n').map((line,index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
        </div>
      );
    }

    // 質問画面
    return (
      <div className="main-card">
        <h2>{currentItem.question}</h2>
        {/* YES, NO ボタンをまとめるラッパー */}
        <div className="answer-buttons">
          <button onClick={() => this.handleAnswer("yes")}>YES</button>
          <button onClick={() => this.handleAnswer("no")}>No</button>
        </div>

        {history.length > 0 && (
          <button onClick={this.handleBack} disabled={history.length === 0} className="back-button">←前の質問に戻る
          </button>
        )}
      </div>
    );
  }
}


export default withNavigation(DateSpotDiagnosisQuestions);