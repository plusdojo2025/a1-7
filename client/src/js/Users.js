import React from "react";
import axios from "axios";
import "../css/Users.css";
import { withNavigation } from "../hoc/withNavigation";
import StarRating from "./StarRating";
import RadioRating from "./RadioRating";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      currentTab: 1,
      childWish: "0",
      liveWithParents: "0",
      dualIncome: "0",
      homeSkill: "3",
      communication: "3",
      economicPower: "3",
      appearance: "3",
      consideration: "3",
      idealHomeSkill: "3",
      idealCommunication: "3",
      idealEconomicPower: "3",
      idealAppearance: "3",
      idealConsideration: "3",
      idealContactFreq: "3",
      idealPersonality: "3",
      idealFinancialSense: "3",
      idealInitiative: "3",
      idealMarriageIntent: "3",
      idealSmoker: "3",
      idealAlcohol: "3",
      idealGamble: "3",
      idealDriverLicense: "0",
      idealTransferable: "0",
      idealHasDivorce: "0",
      idealHasChildren: "0",
    };
    // APIから取得したオリジナルのデータを保持するプロパティ（リセット用）
    this.initialStateFromApi = {};
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
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
    this.setState({ loading: true, errorMessage: "" });
    try {
      const response = await axios.get("/api/user/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("APIから取得したデータ:", response.data);
      const fetchedData = response.data.data;

      // APIから取得したデータでstateを更新
      this.setState((prevState) => {
        const newState = { ...prevState };
        for (const key in fetchedData) {
          if (Object.prototype.hasOwnProperty.call(newState, key)) {
            newState[key] = String(fetchedData[key]);
          }
        }
        // ローディングとエラーメッセージの状態を更新
        newState.loading = false;
        newState.errorMessage = "";

        this.initialStateFromApi = { ...newState }; // 更新後のstateを初期値として保存
        return newState;
      });
    } catch (error) {
      console.error("API呼び出しエラー:", error);
      this.setState({
        errorMessage:
          "データの取得に失敗しました。時間をおいて再度お試しください。",
        loading: false,
      });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleReset = (showConfirmation = true) => {
    if (showConfirmation) {
      const confirmReset = window.confirm(
        "このタブの入力内容をリセットしますか？"
      );
      if (!confirmReset) return;

      // APIから取得した初期値に戻す
      const fieldsToReset = {};
      if (this.state.currentTab === 1) {
        // ユーザー情報タブの項目をリセット
        [
          "childWish",
          "liveWithParents",
          "dualIncome",
          "homeSkill",
          "communication",
          "economicPower",
          "appearance",
          "consideration",
        ].forEach((key) => {
          fieldsToReset[key] = this.initialStateFromApi[key] || "0";
        });
      } else if (this.state.currentTab === 2) {
        // 理想像設定タブの項目をリセット
        [
          "idealHomeSkill",
          "idealCommunication",
          "idealEconomicPower",
          "idealAppearance",
          "idealConsideration",
          "idealContactFreq",
          "idealPersonality",
          "idealFinancialSense",
          "idealInitiative",
          "idealMarriageIntent",
          "idealSmoker",
          "idealAlcohol",
          "idealGamble",
          "idealDriverLicense",
          "idealTransferable",
          "idealHasDivorce",
          "idealHasChildren",
        ].forEach((key) => {
          fieldsToReset[key] = this.initialStateFromApi[key] || "3";
          if (
            [
              "idealDriverLicense",
              "idealTransferable",
              "idealHasDivorce",
              "idealHasChildren",
            ].includes(key)
          ) {
            fieldsToReset[key] = this.initialStateFromApi[key] || "0";
          }
        });
      }
      this.setState(fieldsToReset);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const confirmSubmit = window.confirm("更新内容を確定しますか？");
    if (!confirmSubmit) {
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      this.setState({
        errorMessage: "認証が必要です。ログインしてください。",
      });
      this.props.router.navigate("/login/");
      return;
    }
    this.setState({ loading: true, errorMessage: "" });

    const currentUserId = localStorage.getItem("id");

    try {
      // 現在のstateの全データを送信
      const dataToSend = { ...this.state };
      dataToSend.id = parseInt(this.state.id, 10);

      // 不要なstateプロパティを削除
      delete dataToSend.currentTab;
      delete dataToSend.loading;
      delete dataToSend.errorMessage;
      delete dataToSend.fetchedData;

      const response = await axios.post("/api/user/update/", dataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("更新成功:", response.data);
      alert("情報が正常に更新されました。");
      // フォーム送信成功後、initialStateFromApiを現在のstateで更新
      this.initialStateFromApi = {
        ...this.state,
        loading: false,
        errorMessage: "",
      };
    } catch (error) {
      console.error("更新エラー:", error);
      this.setState({
        errorMessage: "情報の更新に失敗しました。",
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  showTab = (tabNo) => {
    const { currentTab } = this.state;

    if (currentTab !== tabNo) {
      const confirmSwitch = window.confirm(
        "このタブを切り替えると、現在の入力内容はリセットされます。よろしいですか？"
      );
      if (!confirmSwitch) return;

      // handleResetを呼び出す際に、確認ダイアログをスキップする
      this.handleReset(false);

      this.setState({ currentTab: tabNo });
    }
  };

  render() {
    const {
      currentTab,
      childWish,
      liveWithParents,
      dualIncome,
      homeSkill,
      communication,
      economicPower,
      appearance,
      consideration,
      idealHomeSkill,
      idealCommunication,
      idealEconomicPower,
      idealAppearance,
      idealConsideration,
      idealContactFreq,
      idealPersonality,
      idealFinancialSense,
      idealInitiative,
      idealMarriageIntent,
      idealSmoker,
      idealAlcohol,
      idealGamble,
      idealDriverLicense,
      idealTransferable,
      idealHasDivorce,
      idealHasChildren,
      loading,
      errorMessage,
    } = this.state;

    // ローディング中の表示
    if (loading) {
      return (
        <div className="form-container">
          <p>読み込み中...</p>
        </div>
      );
    }

    // エラーメッセージの表示
    if (errorMessage) {
      return (
        <div className="form-container">
          <p className="error-message">{errorMessage}</p>
          <button onClick={this.fetchUserData}>再試行</button>
        </div>
      );
    }

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="tabs">
            <button
              type="button"
              className={`tab-button ${
                this.state.currentTab === 1 ? "active" : ""
              }`}
              onClick={() => this.showTab(1)}
            >
              ユーザー情報
            </button>
            <button
              type="button"
              className={`tab-button ${
                this.state.currentTab === 2 ? "active" : ""
              }`}
              onClick={() => this.showTab(2)}
            >
              理想像設定
            </button>
          </div>

          {this.state.currentTab === 1 && (
            <div id="tab1" style={{ display: "block" }}>
              <div className="basic-info-box">
                <h1>基本情報</h1>
                <div className="form-inline">
                  <label>子供が欲しいか</label>
                  <select
                    name="childWish"
                    value={childWish}
                    onChange={this.handleChange}
                  >
                    <option value="0">未設定</option>
                    <option value="1">はい</option>
                    <option value="2">どちらでもよい</option>
                    <option value="3">いいえ</option>
                  </select>
                </div>

                <div className="form-inline">
                  <label>両親との同棲希望か</label>
                  <select
                    name="liveWithParents"
                    value={liveWithParents}
                    onChange={this.handleChange}
                  >
                    <option value="0">未設定</option>
                    <option value="1">はい</option>
                    <option value="2">どちらでもよい</option>
                    <option value="3">いいえ</option>
                  </select>
                </div>

                <div className="form-inline">
                  <label>共働き希望か</label>
                  <select
                    name="dualIncome"
                    value={dualIncome}
                    onChange={this.handleChange}
                  >
                    <option value="0">未設定</option>
                    <option value="1">はい</option>
                    <option value="2">どちらでもよい</option>
                    <option value="3">いいえ</option>
                  </select>
                </div>
              </div>

              <div className="basic-info-box">
                <h1>自己評価</h1>

                <StarRating
                  label="家事スキル"
                  name="homeSkill"
                  value={homeSkill}
                  onChange={this.handleChange}
                />
                <StarRating
                  label="コミュ力"
                  name="communication"
                  value={communication}
                  onChange={this.handleChange}
                />
                <StarRating
                  label="経済力"
                  name="economicPower"
                  value={economicPower}
                  onChange={this.handleChange}
                />
                <StarRating
                  label="容姿"
                  name="appearance"
                  value={appearance}
                  onChange={this.handleChange}
                />
                <StarRating
                  label="気遣い"
                  name="consideration"
                  value={consideration}
                  onChange={this.handleChange}
                />
              </div>
              <div className="buttons">
                <button type="button" onClick={this.handleReset}>
                  元に戻す
                </button>
                <button type="submit">更新</button>
              </div>
            </div>
          )}
          {this.state.currentTab === 2 && (
            <div id="tab2">
              <div className="basic-info-box">
                <h1>理想スペック</h1>
                {/* StarRatingコンポーネントを使用 */}
                <StarRating
                  label="家事スキル"
                  name="idealHomeSkill"
                  value={idealHomeSkill}
                  onChange={this.handleChange}
                />
                <StarRating
                  label="コミュ力"
                  name="idealCommunication"
                  value={idealCommunication}
                  onChange={this.handleChange}
                />
                <StarRating
                  label="経済力"
                  name="idealEconomicPower"
                  value={idealEconomicPower}
                  onChange={this.handleChange}
                />
                <StarRating
                  label="容姿"
                  name="idealAppearance"
                  value={idealAppearance}
                  onChange={this.handleChange}
                />
                <StarRating
                  label="気遣い"
                  name="idealConsideration"
                  value={idealConsideration}
                  onChange={this.handleChange}
                />

                <hr className="section-divider" />

                {/* RadioRatingコンポーネントを使用 */}
                <RadioRating
                  label="連絡頻度"
                  name="idealContactFreq"
                  value={idealContactFreq}
                  onChange={this.handleChange}
                  minLabel="少なめ"
                  maxLabel="多め"
                />
                <RadioRating
                  label="性格"
                  name="idealPersonality"
                  value={idealPersonality}
                  onChange={this.handleChange}
                  minLabel="内向的"
                  maxLabel="外交的"
                />
                <RadioRating
                  label="金銭感覚"
                  name="idealFinancialSense"
                  value={idealFinancialSense}
                  onChange={this.handleChange}
                  minLabel="節約家"
                  maxLabel="浪費家"
                />
                <RadioRating
                  label="主体性"
                  name="idealInitiative"
                  value={idealInitiative}
                  onChange={this.handleChange}
                  minLabel="受動的"
                  maxLabel="主体的"
                />
                <RadioRating
                  label="婚活真剣度"
                  name="idealMarriageIntent"
                  value={idealMarriageIntent}
                  onChange={this.handleChange}
                  minLabel="低め"
                  maxLabel="高め"
                />
                <RadioRating
                  label="喫煙"
                  name="idealSmoker"
                  value={idealSmoker}
                  onChange={this.handleChange}
                  minLabel="まったく吸わない"
                  maxLabel="よく吸う"
                />
                <RadioRating
                  label="飲酒"
                  name="idealAlcohol"
                  value={idealAlcohol}
                  onChange={this.handleChange}
                  minLabel="まったく飲まない"
                  maxLabel="よく飲む"
                />
                <RadioRating
                  label="ギャンブル"
                  name="idealGamble"
                  value={idealGamble}
                  onChange={this.handleChange}
                  minLabel="まったくしない"
                  maxLabel="よくする"
                />

                <hr className="section-divider" />

                <div className="form-two-column">
                  <div className="form-column">
                    <h3>運転免許</h3>
                    <select
                      name="idealDriverLicense"
                      value={idealDriverLicense}
                      onChange={this.handleChange}
                    >
                      <option value="0">未設定</option>
                      <option value="1">はい</option>
                      <option value="2">どちらでもよい</option>
                      <option value="3">いいえ</option>
                    </select>

                    <h3>転勤の有無</h3>
                    <select
                      name="idealTransferable"
                      value={idealTransferable}
                      onChange={this.handleChange}
                    >
                      <option value="0">未設定</option>
                      <option value="1">はい</option>
                      <option value="2">どちらでもよい</option>
                      <option value="3">いいえ</option>
                    </select>
                  </div>

                  <div className="form-column">
                    <h3>既婚歴</h3>
                    <select
                      name="idealHasDivorce"
                      value={idealHasDivorce}
                      onChange={this.handleChange}
                    >
                      <option value="0">未設定</option>
                      <option value="1">はい</option>
                      <option value="2">どちらでもよい</option>
                      <option value="3">いいえ</option>
                    </select>

                    <h3>子供の有無</h3>
                    <select
                      name="idealHasChildren"
                      value={idealHasChildren}
                      onChange={this.handleChange}
                    >
                      <option value="0">未設定</option>
                      <option value="1">はい</option>
                      <option value="2">どちらでもよい</option>
                      <option value="3">いいえ</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button type="button" onClick={this.handleReset}>
                  元に戻す
                </button>
                <button type="submit">更新</button>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}
export default withNavigation(Users);
