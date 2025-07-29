import React from "react";
import axios from "axios";
// withNavigation をインポートしてクラスコンポーネントに navigate を渡す
import { withNavigation } from "../hoc/withNavigation";
import StarRating from "./StarRating";
import RadioRating from "./RadioRating";
import '../css/PartnerEdit.css';



class PartnerEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partner: {},
      errorMessage: "",
      loading: true,
    };
    // APIから取得したオリジナルのデータを保持するプロパティ（リセット用）
    this.initialPartnerState = {};
  }

  componentDidMount() {
    const partnerId = this.props.router.params.id;
    if (partnerId) {
      this.fetchPartnerData(partnerId);
    } else {
      this.setState({
        errorMessage: "お相手IDが見つかりませんでした。URLを確認してください。",
        loading: false,
      });
    }
  }

  // 初期表示用にAPIから相手情報を取得(idを引数として受け取る)
  fetchPartnerData = async (id) => {

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
      const response = await axios.get(`/api/partner/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      this.setState({
        partner: response.data,
        loading: false,
        errorMessage: "",
      });

      this.initialPartnerState = { ...response.data }; // 成功時に initialPartnerState を更新
      console.log("お相手データ取得成功:", response.data);

    } catch (error) {
      console.error("お相手情報の読み込みエラー:", error);
      let message = "お相手情報の読み込みに失敗しました。";

      this.setState({
        errorMessage: message,
        loading: false,
      });
    }
  };

  handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue =
      type === "number" ? (value !== "" ? Number(value) : "") : value;
    this.setState((prevState) => ({
      partner: {
        ...prevState.partner,
        [name]: parsedValue,
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    // 更新前の確認ダイアログ
    const confirmSubmit = window.confirm("お相手情報を更新しますか？");
    if (!confirmSubmit) {
      return; // キャンセルされたら処理を中断
    }

    const { id } = this.props.router.params;
    this.setState({ loading: true, errorMessage: "", message: "" }); // 送信前に状態をリセット

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

    try {
      const response = await axios.post(
        `/api/partner/${id}/update/`,
        this.state.partner,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      this.setState({
        message: "お相手情報を更新しました。",
        errorMessage: "", // 成功時はエラーをクリア
        loading: false,
      });
      this.initialPartnerState = { ...this.state.partner }; // 更新成功後に初期状態を更新
      console.log("お相手情報更新成功:", response.data);
    } catch (error) {
      console.error("お相手情報の更新エラー:", error);
      let message = "お相手情報の更新に失敗しました。";

      this.setState({
        errorMessage: message,
        message: "", // エラー時は成功メッセージをクリア
        loading: false,
      });
    }
  };

  handleReset = () => {
    const confirmReset = window.confirm("入力内容をリセットしますか？");
    if (!confirmReset) {
      return;
    }
    this.setState({
      partner: { ...this.initialPartnerState }, // 保持している初期値にリセット
      message: "入力内容をリセットしました。",
      errorMessage: "",
    });
  };

  render() {
    const { partner, message, errorMessage, loading } = this.state;
    const starRatingFields = [
      //// StarRating に渡すフィールド定義
      { key: "homeSkill", label: "家事スキル" },
      { key: "communication", label: "コミュ力" },
      { key: "economicPower", label: "経済力" },
      { key: "appearance", label: "容姿" },
      { key: "consideration", label: "気遣い" },
    ];
    const regularRatingFields = [
      // RadioRating に渡すフィールド定義
      {
        key: "contactFreq",
        label: "連絡頻度",
        minLabel: "少なめ",
        maxLabel: "多め",
      },
      {
        key: "personality",
        label: "性格",
        minLabel: "内向的",
        maxLabel: "外交的",
      },
      {
        key: "financialSense",
        label: "金銭感覚",
        minLabel: "節約家",
        maxLabel: "浪費家",
      },
      {
        key: "initiative",
        label: "主体性",
        minLabel: "受動的",
        maxLabel: "主体的",
      },
      {
        key: "marriageIntent",
        label: "婚活真剣度",
        minLabel: "低め",
        maxLabel: "高め",
      },
      {
        key: "smoker",
        label: "喫煙",
        minLabel: "まったく吸わない",
        maxLabel: "よく吸う",
      },
      {
        key: "alcohol",
        label: "飲酒",
        minLabel: "まったく飲まない",
        maxLabel: "よく飲む",
      },
      {
        key: "gamble",
        label: "ギャンブル",
        minLabel: "まったくしない",
        maxLabel: "よくする",
      },
    ];

    // ローディング中の表示
    if (loading) {
      return <div className="loading-message">読み込み中...</div>;
    }

    // エラーメッセージの表示
    // ローディングが完了し、かつエラーメッセージがある場合のみ表示
    if (errorMessage && !loading) {
      return <div className="error-message">{errorMessage}</div>;
    }

    return (
      <div className="partner-edit-container">
        <h1>{partner.name}さんのプロフィール編集</h1>
        {message && <div style={{ color: "green" }}>{message}</div>}

        <form onSubmit={this.handleSubmit} className="form-container-3col">
          {/* 左カラム */}
          <div className="column left-column">
            <div className="form-row">
              <label>
                <input
                  type="text"
                  name="name"
                  value={partner.name}
                  onChange={this.handleChange}
                  className="form-input"
                  placeholder="名前"
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                <input
                  type="text"
                  name="nameRead"
                  value={partner.nameRead || ""}
                  onChange={this.handleChange}
                  className="form-input"
                  placeholder="ふりがな"
                />
              </label>

            </div>
          </div>

          {/* 中央カラム */}
          <div className="column center-column">
            <div className="form-row age-row">
              <div className="age-input-wrapper">
                <label>
                  <input
                    type="number"
                    name="age"
                    value={partner.age || ""}
                    onChange={this.handleChange}
                    min="0"
                  />
                </label>
                <span className="age-unit">歳</span>
              </div>

            </div>

          </div>

          {/* 右カラム */}
          <div className="column right-column">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="birthday">
                  <input
                    id="birthday"
                    type="date"
                    name="birthday"
                    value={partner.birthday || ""}
                    onChange={this.handleChange}
                    className="form-input"
                  />
                </label>

              </div>

            </div>
            <div className="form-row">
              <div className="form-group">
              <label className="form-label" htmlFor="firstMetDay">
                <input
                  id="firstMetDay"
                  type="date"
                  name="firstMetDay"
                  value={partner.firstMetDay || ""}
                  onChange={this.handleChange}
                  className="form-input"
                />
              </label>
            </div>
            </div>
          </div>
        </form>

        <form onSubmit={this.handleSpecSubmit} className="basic-info-box">

          <hr className="divider" />

          <p>スペック</p>
          {/* StarRating コンポーネントを使用 */}
          <div className="section">
            {starRatingFields.map((field) => (
              <div key={field.key}>
                <p>{field.label}</p>
                <div className="rating star">
                  <StarRating
                    key={field.key}
                    label={field.label}
                    name={field.key}
                    value={partner[field.key]}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* RadioRating コンポーネントを使用 */}
          <div className="section">
            {regularRatingFields.map((field) => (
              <div key={field.key} style={{ display: 'inline-flex' }}>
                <RadioRating
                  key={field.key}
                  label={field.label}
                  name={field.key}
                  value={partner[field.key]} // partner オブジェクトから値を渡す
                  onChange={this.handleChange}
                  minLabel={field.minLabel}
                  maxLabel={field.maxLabel}
                />
              </div>
            ))}
          </div>

          <hr className="divider" />

          <div className="section select-grid">
            <div className="form-group">
              <label>
                連れ子の有無:
                <select
                  name="hasChildren"
                  value={partner.hasChildren || 0}
                  onChange={this.handleChange}
                >
                  <option value={0}>未設定</option>
                  <option value={1}>なし</option>
                  <option value={2}>どちらでもよい</option>
                  <option value={3}>あり</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                転勤の有無:
                <select
                  name="transferable"
                  value={partner.transferable || 0}
                  onChange={this.handleChange}
                >
                  <option value={0}>未設定</option>
                  <option value={1}>なし</option>
                  <option value={2}>どちらでもよい</option>
                  <option value={3}>あり</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                運転免許:
                <select
                  name="driverLicense"
                  value={partner.driverLicense || 0}
                  onChange={this.handleChange}
                >
                  <option value={0}>未設定</option>
                  <option value={1}>なし</option>
                  <option value={2}>どちらでもよい</option>
                  <option value={3}>あり</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                両親との同棲希望:
                <select
                  name="liveWithParents"
                  value={partner.liveWithParents || 0}
                  onChange={this.handleChange}
                >
                  <option value={0}>未設定</option>
                  <option value={1}>なし</option>
                  <option value={2}>どちらでもよい</option>
                  <option value={3}>あり</option>
                </select>
              </label>
            </div>
          </div>

          <hr className="divider" />
          {/* アクションボタン */}
          <div className="form-actions">
            <button type="submit">更新</button>
            <button type="button" onClick={this.handleReset}>
              元に戻す
            </button>
          </div>
        </form >
      </div >
    );
  }
}

// withNavigation でラップしてエクスポート
export default withNavigation(PartnerEdit);
