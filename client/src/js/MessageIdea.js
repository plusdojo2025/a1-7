import React from "react";
import axios from "axios";
import '../css/MessageIdea.css';
import { withNavigation } from "../hoc/withNavigation";

// http://localhost:3000/messages/ideas/

class MessageIdea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      partnersId: "",
      mood: "",
      matter: "",
      prompt: "",
      commandSentence: "",
      errorMessage: "",
      partnerList: null, // APIから取得したパートナーデータを格納 (初期値はnull)
      loading: true,
    };
  }

  componentDidMount() {
    // JWTをlocalStorageから取得
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // トークンがなければログインページへリダイレクト
      this.setState({
        errorMessage: "認証が必要です。ログインしてください。",
        loading: false,
      });
      this.props.router.navigate("/login/");
      return;
    }

    axios
      .get("/api/messages/partners/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("APIから取得したデータ:", response.data);
        const fetchedPartners = response.data.data;

        this.setState({
          partnerList: fetchedPartners,
          loading: false,
          errorMessage: "",
        });
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitMessageIdea = async (event) => {
    event.preventDefault();

    let { partnersId, mood, matter } = this.state;
    if (!partnersId || !mood || !matter) {
      let message = "未選択の項目があります";
      this.setState({ errorMessage: message });
      // event.preventDefault();
      return;
    }

    // 命令文、プロンプトを作成
    let generatedCommand = `『${partnersId}』さん宛に、『${mood}』な雰囲気で『${matter}』ためのメッセージを考えて。`;
    let generatedPrompt = `あなたは婚活アプリです。以下に入力する内容で、ユーザーのメッセージ作成をサポートしてください。${partnersId}さん宛に、${mood}な雰囲気で「${matter}」という用件のメッセージを考えて。`;

    await new Promise((resolve) => {
      this.setState(
        {
          commandSentence: generatedCommand,
          prompt: generatedPrompt,
          // prompt: response.data.prompt,
          errorMessage: "",
        },
        resolve
      );
    });

    // JWTをlocalStorageから取得
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      this.setState({ errorMessage: "認証が必要です。ログインしてください。" });
      this.props.router.navigate("/login/");
      return;
    }

    // 送信できるようになったらコメント解除
    const postData = {
      partnersId: partnersId,
      mood: mood,
      matter: matter,
      commandSentence: generatedCommand, // 生成したローカル変数を使用
      prompt: generatedPrompt,
    };
    axios
      .post("/api/messages/ideas/", postData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        this.setState({
          // 必要に応じて、ここでバックエンドからの返答をStateにセットする
          // 例: this.setState({ aiGeneratedMessage: response.data.message });
          // commandSentence: generatedCommand,
          // prompt: response.data.prompt,
          errorMessage: "",
        });
        console.log("API呼び出し成功", response);
      })
      .catch((error) => {
        console.log("API呼び出し失敗", error);
      });
  };

  render() {
    let {
      partnerList,
      partnersId,
      mood,
      matter,
      commandSentence,
      prompt,
      errorMessage,
      loading,
    } = this.state;

    // 1. ローディング中の表示
    if (loading) {
      return <p>パートナーデータを読み込み中...</p>;
    }

    // 2. エラーメッセージがある場合の表示
    if (errorMessage) {
      return (
        <p id="errorMessage" style={{ color: "red" }}>
          {errorMessage}
        </p>
      );
    }

    // 3. パートナーリストがまだ存在しない（null）か、空の配列の場合の表示
    if (!partnerList || partnerList.length === 0) {
      return <p>利用可能なパートナーが見つかりませんでした。</p>;
    }

    const partnerOptions = partnerList.map((partner) => (
      <option key={partner.id} value={partner.name}>
        {partner.name}
      </option>
    ));

    return (
      <div>
        <h2>メッセージ提案</h2>

        {/* 命令文表示エリア */}
        {commandSentence && (
          <div>
            {/* <h4>命令文：</h4> */}
            <p className="output-command-sentence">{commandSentence}</p>
          </div>
        )}

        {/* プロンプト表示エリア */}
        {prompt && (
          <div className="output-prompt-container">
            {/* <h4>プロンプト：</h4> */}
            <p className="output-prompt">{prompt}</p>

            {/* 📋 コピー機能付きボタンを追加 */}
            <button className="copy-prompt-button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(prompt);
                  alert("プロンプトをコピーしました！");
                } catch (err) {
                  console.error("コピー失敗:", err);
                }
              }}
            >
              プロンプトをコピー
            </button>
          </div>
        )}

        <form method="POST">
          {/* 宛先セレクト */}
          {/* <input
            type="text"
            name="partnersId"
            id="partnersId"
            value={partnersId}
            onChange={this.handleChange}
          ></input> */}
          {/* <select name="partnersId" id="partnersId" value={partnersId} onChange={this.handleChange}>
                        
                        <option value=""></option>
                        <option value="佐藤 健">佐藤 健</option>
                    </select> */}
          {/* <br></br> */}
          <div className="input-command-container">
            <div className="input-message-box">
              <select
                name="partnersId"
                id="partnersId"
                value={partnersId}
                onChange={this.handleChange}
              >
                <option value="">お相手</option>
                {partnerOptions} {/* ここで map したオプションを表示 */}
              </select>
            </div>
            <label className="message-idea-label" htmlFor="partnersId">さん宛に</label>
            <br></br>
          </div>


          {/* 雰囲気セレクト */}
          {/* <input type="text" name="mood" id="mood" value={mood} onChange={this.handleChange}></input> */}
          <div className="input-command-container">
            <div className="input-message-box">
              <select
                name="mood"
                id="mood"
                value={mood}
                onChange={this.handleChange}
              >
                <option value="">雰囲気</option>
                <option value="まじめ">まじめ</option>
                <option value="さわやか">さわやか</option>
                <option value="フレンドリー">フレンドリー</option>
                <option value="素直に">素直</option>
                <option value="大人っぽく">大人っぽく</option>
                <option value="積極的">積極的</option>
                <option value="礼儀正しく">礼儀正しく</option>
              </select>
            </div>
              <label className="message-idea-label" htmlFor="mood">な雰囲気で</label>
            <br></br>
          </div>

          {/* 用件セレクト */}
          {/* <input type="text" name="matter" id="matter" value={matter} onChange={this.handleChange}></input> */}
          <div className="input-command-container">
            <div className="input-message-box">
              <select
                name="matter"
                id="matter"
                value={matter}
                onChange={this.handleChange}
              >
                <option value="">用件</option>
                <option value="2人きりのデートに誘う（初めて）">
                  2人きりのデートに誘う（初めて）
                </option>
                <option value="会ったことない相手をデートに誘う">
                  会ったことない相手をデートに誘う
                </option>
                <option value="マッチ後初メッセージを送る">
                  マッチ後初メッセージを送る
                </option>
                <option value="デート後のお礼のメッセージを送る">
                  デート後のお礼のメッセージを送る
                </option>
                <option value="2回目のデートを提案する">
                  2回目のデートを提案する
                </option>
                <option value="ご飯に誘う">ご飯に誘う</option>
                <option value="休日の予定を聞く">休日の予定を聞く</option>
                <option value="電話のお誘いをする">電話のお誘いをする</option>
                <option value="気になる気持ちを伝える">
                  気になる気持ちを伝える
                </option>
                <option value="励ます・力になる">
                  励ます・力になる
                </option>
              </select>
            </div>

            <label className="message-idea-label" htmlFor="matter">ためのメッセージを考えて</label>
            <br></br>
          </div>

          <button className="create-message-button"
            onClick={this.submitMessageIdea}
            disabled={!partnersId || !mood || !matter}
          >
            作成
          </button>

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

export default withNavigation(MessageIdea);
