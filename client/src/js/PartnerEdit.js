import React from "react";
import axios from "axios";
// withNavigation をインポートしてクラスコンポーネントに navigate を渡す
import { withNavigation } from "../hoc/withNavigation";

class PartnerEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partner: {},
      message: "",
    };
  }

  componentDidMount() {
    this.fetchPartnerData();
  }

  // 初期表示用に相手情報を取得
  fetchPartnerData = () => {
    const { partnerId } = this.props;
    axios
      .get(`/api/partner/${partnerId}`)
      .then((response) => this.setState({ partner: response.data }))
      .catch((error) => {
        console.error(error);
        this.setState({ error: "お相手情報の読み込みに失敗しました。" });
      });
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { partnerId } = this.props;
    axios
      .post(`/api/partner/${partnerId}/update`, this.state.partner)
      .then(() => this.setState({ message: "お相手情報を更新しました。" }))
      .catch((err) => console.error(err));
  };

  handleReset = () => {
    this.fetchPartnerData();
    this.setState({ message: "" });
  };

  render() {
    const { partner, message } = this.state;
    const starRatingFields = [
      { key: "homeSkill", label: "家事スキル" },
      { key: "communication", label: "コミュ力" },
      { key: "economicPower", label: "経済力" },
      { key: "appearance", label: "容姿" },
      { key: "consideration", label: "気遣い" },
    ];
    const regularRatingFields = [
      { key: "contactFreq", label: "連絡頻度" },
      { key: "personality", label: "性格" },
      { key: "financialSense", label: "金銭感覚" },
      { key: "initiative", label: "主体性" },
      { key: "marriageIntent", label: "婚活真剣度" },
      { key: "smoker", label: "喫煙" },
      { key: "alcohol", label: "飲酒" },
      { key: "gamble", label: "ギャンブル" },
    ];

    return (
      <div>
        <h1>{partner.name}さんのプロフィール編集</h1>
        {message && <div style={{ color: "green" }}>{message}</div>}

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              名前:
              <input
                type="text"
                name="name"
                value={partner.name || ""}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              ふりがな:
              <input
                type="text"
                name="nameRead"
                value={partner.nameRead || ""}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              年齢:
              <input
                type="number"
                name="age"
                value={partner.age || ""}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              生年月日:
              <input
                type="date"
                name="birthday"
                value={partner.birthday || ""}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              出会った日:
              <input
                type="date"
                name="firstMetDay"
                value={partner.firstMetDay || ""}
                onChange={this.handleChange}
              />
            </label>
            <br />
          </div>

          <hr />

          <p>スペック</p>
          {starRatingFields.map((field) => (
            <div key={field.key}>
              <p>{field.label}</p>
              <div className="rating star">
                {[1, 2, 3, 4, 5].map((v) => (
                  <label key={`${field.key}-${v}`}>
                    <input
                      type="radio"
                      id={`${field.key}${v}`}
                      name={field.key}
                      value={v}
                      style={{ display: "none" }} // 星評価のinputを非表示
                      checked={Number(partner[field.key]) === v}
                      onChange={this.handleChange}
                    />
                    <label htmlFor={`${field.key}${v}`} title={`${v} stars`}>
                      ★
                    </label>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <hr />

          {regularRatingFields.map((field) => (
            <div key={field.key}>
              <p>{field.label}</p>
              {[1, 2, 3, 4, 5].map((v) => (
                <label key={v}>
                  <input
                    type="radio"
                    name={field.key}
                    value={v}
                    checked={Number(partner[field.key]) === v}
                    onChange={this.handleChange}
                  />
                  {v}
                </label>
              ))}
            </div>
          ))}

          <hr />

          <div>
            <label>
              連れ子の有無:
              <select
                name="hasChildren"
                value={partner.hasChildren || 0}
                onChange={this.handleChange}
              >
                <option value={0}>未設定</option>
                <option value={1}>なし</option>
                <option value={2}>あり</option>
              </select>
            </label>
            <br />

            <label>
              転勤の有無:
              <select
                name="transferable"
                value={partner.transferable || 0}
                onChange={this.handleChange}
              >
                <option value={0}>未設定</option>
                <option value={1}>なし</option>
                <option value={2}>あり</option>
              </select>
            </label>
            <br />

            <label>
              運転免許:
              <select
                name="driverLicense"
                value={partner.driverLicense || 0}
                onChange={this.handleChange}
              >
                <option value={0}>未設定</option>
                <option value={1}>なし</option>
                <option value={2}>あり</option>
              </select>
            </label>
            <br />

            <label>
              両親との同棲希望:
              <select
                name="liveWithParents"
                value={partner.liveWithParents || 0}
                onChange={this.handleChange}
              >
                <option value={0}>未設定</option>
                <option value={1}>希望しない</option>
                <option value={2}>希望する</option>
              </select>
            </label>
            <br />

            <label>
              共働き希望:
              <select
                name="dualIncome"
                value={partner.dualIncome || 0}
                onChange={this.handleChange}
              >
                <option value={0}>未設定</option>
                <option value={1}>希望しない</option>
                <option value={2}>希望する</option>
              </select>
            </label>
            <br />
          </div>

          <hr />

          <button type="submit">更新</button>
          <button type="button" onClick={this.handleReset}>
            元に戻す
          </button>
        </form>
      </div>
    );
  }
}

// withNavigation でラップしてエクスポート
export default withNavigation(PartnerEdit);
