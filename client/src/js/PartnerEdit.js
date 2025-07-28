import React from "react";
import axios from "axios";
import '../css/PartnerEdit.css';
import { withNavigation } from "../hoc/withNavigation";

const starRatingFields = [
  { key: "homeSkill", label: "家事スキル" },
  { key: "communication", label: "コミュ力" },
  { key: "economicPower", label: "経済力" },
  { key: "appearance", label: "容姿" },
  { key: "consideration", label: "気遣い" },
];

const regularRatingFields = [
  {
    key: 'contactFreq',
    label: '連絡頻度',
    leftLabel: '少なめ',
    rightLabel: '多め',
  },
  {
    key: 'personality',
    label: '性格',
    leftLabel: '内向的',
    rightLabel: '外交的',
  },
  {
    key: 'financialSense',
    label: '金銭感覚',
    leftLabel: '節約家',
    rightLabel: '浪費家',
  },
  {
    key: 'initiative',
    label: '主体性',
    leftLabel: '受動的',
    rightLabel: '主体的',
  },
  {
    key: 'marriageIntent',
    label: '婚活真剣度',
    leftLabel: '低め',
    rightLabel: '高め',
  },

];

class PartnerEdit extends React.Component {
  constructor(props) {
    super(props);

  
    const defaultRating = '3';
    const initialSpecData = {};

    starRatingFields.forEach(field => {
      initialSpecData[field.key] = defaultRating;
    });
    regularRatingFields.forEach(field => {
      initialSpecData[field.key] = defaultRating;
    });

    this.state = {
      partner: {},        
      specData: initialSpecData,   
      initialSpecData: initialSpecData,
      message: "",
      error: "",
    };
  }


  componentDidMount() {
    this.fetchPartnerData();
  }

  fetchPartnerData = () => {
    const { id } = this.props;
    axios.get(`/api/partner/${id}/edit`)
      .then((response) => {
        const data = response.data;

    
        const newSpecData = { ...this.state.specData };
        starRatingFields.forEach(field => {
          if (data[field.key] != null && data[field.key] !== 0) {
            newSpecData[field.key] = String(data[field.key]);
          }
        });
        regularRatingFields.forEach(field => {
          if (data[field.key] != null && data[field.key] !== 0) {
            newSpecData[field.key] = String(data[field.key]);
          }
        });

        this.setState({
          partner: data,
          specData: newSpecData,
          initialSpecData: newSpecData,
          error: "",
        });
      })
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

  handleSpecReset = () => {
    this.setState((prev) => ({
      specData: { ...prev.initialSpecData },
      message: "",
      error: ""
    }));
  };

  handleSpecSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props;
    axios
      .post(`/api/partner/${id}/updateSpecOnly`, this.state.specData)
      .then(() => {
        this.setState({ message: "スペック情報を更新しました。" });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ error: "スペック情報の更新に失敗しました。" });
      });
  };


  handleSpecChange = (e) => {
    const { name, value, type } = e.target;
    const parsed = type === "number" ? (value !== "" ? Number(value) : "") : value;

    this.setState((prev) => ({
      specData: {
        ...prev.specData,
        [name]: parsed,
      }
    }));
  };

  render() {
    const { partner, message, error } = this.state;

    return (
      <div>
        <h1>{partner.name ? `${partner.name}さんのプロフィール編集` : "プロフィール編集"}</h1>
        {message && <div style={{ color: "green" }}>{message}</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}

        <form onSubmit={this.handleSubmit} className="form-container-3col">
          {/* 左：名前・ふりがな */}
          <div className="column left-column">
            <div className="form-row">
              <input
                type="text"
                name="name"
                value={partner.name || ""}
                onChange={this.handleChange}
                className="form-input"
                placeholder="名前"
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="nameRead"
                value={partner.nameRead || ""}
                onChange={this.handleChange}
                className="form-input"
                placeholder="ふりがな"
              />
            </div>
          </div>

          {/* 中央：年齢 */}
          <div className="column center-column">
            <div className="form-row age-row">
              <div className="age-input-wrapper">
                <input
                  type="number"
                  name="age"
                  value={partner.age || ""}
                  onChange={this.handleChange}
                  className="form-input age-input"
                  placeholder="年齢"
                  min="0"
                />
                <span className="age-unit">歳</span>
              </div>
            </div>
          </div>

          {/* 右：生年月日・出会った日 */}
          <div className="column right-column">
            <div className="form-row">
              <label className="form-label" htmlFor="birthday"></label>
              <input
                id="birthday"
                type="date"
                name="birthday"
                value={partner.birthday || ""}
                onChange={this.handleChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label className="form-label" htmlFor="firstMetDay"></label>
              <input
                id="firstMetDay"
                type="date"
                name="firstMetDay"
                value={partner.firstMetDay || ""}
                onChange={this.handleChange}
                className="form-input"
              />
            </div>
          </div>
        </form>
        <form onSubmit={this.handleSpecSubmit} className="basic-info-box">
          <h1>スペック</h1>

          {/* 星評価 */}
          {starRatingFields.map((field) => (
            <div key={field.key}>
              <p>{field.label}</p>
              <div className="rating star">
                {[1, 2, 3, 4, 5].map((v) => (
                  <React.Fragment key={`${field.key}-${v}`}>
                    <input
                      type="radio"
                      id={`${field.key}${v}`}
                      name={field.key}
                      value={v}
                      style={{ display: "none" }}
                      checked={Number(this.state.specData[field.key]) === v}
                      onChange={this.handleSpecChange}
                    />
                    <label htmlFor={`${field.key}${v}`} title={`${v} stars`}>
                      ★
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}

          <hr />
          {regularRatingFields.map((field) => (
            <div key={field.key} className="rating-block">
              <p className="rating-title">{field.label}</p>
              <div className="rating-row">
                <span className="label-left">{field.leftLabel}</span>
                <div className="rating circle">
                  {[5, 4, 3, 2, 1].map((v) => {
                    const id = `${field.key}${v}`;
                    return (
                      <React.Fragment key={v}>
                        <input
                          type="radio"
                          id={id}
                          name={field.key}
                          value={v}
                          style={{ display: 'none' }}
                          checked={Number(this.state.specData[field.key]) === v}
                          onChange={this.handleSpecChange}
                        />
                        <label htmlFor={id} title={`${v} stars`}>〇</label>
                      </React.Fragment>
                    );
                  })}
                </div>
                <span className="label-right">{field.rightLabel}</span>
              </div>
            </div>
          ))}


          <hr />

          {/* セレクト */}
          {[
            { key: "driverLicense", label: "運転免許" },
            { key: "hasChildren", label: "既婚歴" },
            { key: "transferable", label: "転勤の有無" },
            { key: "dualIncome", label: "子供の有無" },
          ].map((field) => (
            <label key={field.key}>
              {field.label}
              <select
                name={field.key}
                value={this.state.specData[field.key] || 0}
                onChange={this.handleSpecChange}
              >
                <option value={0}>未設定</option>
                <option value={1}>なし</option>
                <option value={2}>どちらでもよい</option>
                <option value={3}>あり</option>
              </select>
            </label>
          ))}

          {/* ボタン */}
          <div className="buttons">
            <button type="button" onClick={this.handleSpecReset}>元に戻す</button>
            <button type="submit">更新</button>
          </div>
        </form>

      </div>
    );
  }
}

export default withNavigation(PartnerEdit);
