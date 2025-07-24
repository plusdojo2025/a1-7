import React from "react";
import axios from "axios";
// withNavigation をインポートしてクラスコンポーネントに navigate を渡す
import { withNavigation } from "../hoc/withNavigation";

class PartnerEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partner: 1,
      message: ''
    };
  }

  componentDidMount() {
    this.useEffect();
  }

  // 初期表示用に相手情報を取得
  useEffect = () => {
    const { partnerId } = this.props;
    axios.get(`/api/partner/${partnerId}`)
      .then(response => this.setState({ partner: response.data }))
      .catch(error => console.error(error));
  }

  handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? (value !== '' ? Number(value) : '') : value;
    this.setState(prevState => ({
      partner: {
        ...prevState.partner,
        [name]: parsedValue
      }
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { partnerId } = this.props;
    axios.post(`/api/partner/${partnerId}/update`, this.state.partner)
      .then(() => this.setState({ message: 'お相手情報を更新しました。' }))
      .catch(err => console.error(err));
  }

  handleReset = () => {
    this.useEffect();
    this.setState({ message: '' });
  }

  render() {
    const { partner, message } = this.state;
    return (
      <div>
        <h1>{partner.name}さんのプロフィール編集</h1>
        {message && <div style={{ color: 'green' }}>{message}</div>}

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              名前:
              <input type="text" name="name" value={partner.name || ''} onChange={this.handleChange} />
            </label><br />
            <label>
              ふりがな:
              <input type="text" name="nameRead" value={partner.nameRead || ''} onChange={this.handleChange} />
            </label><br />
            <label>
              年齢:
              <input type="number" name="age" value={partner.age || ''} onChange={this.handleChange} />
            </label><br />
            <label>
              生年月日:
              <input type="date" name="birthday" value={partner.birthday || ''} onChange={this.handleChange} />
            </label><br />
            <label>
              出会った日:
              <input type="date" name="firstMetDay" value={partner.firstMetDay || ''} onChange={this.handleChange} />
            </label><br />
          </div>

          <hr />

          
            <p>スペック</p>
 <p>家事スキル</p>
                                <div className="rating star">
                                    <input
                                        type="radio"
                                        id="skill5"
                                        name="homeSkill"
                                        value="5"
                                        style={{ display: 'none' }}
                                        checked={this.state.homeSkill === '5'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="skill5" title="5 stars">★</label>

                                    <input
                                        type="radio"
                                        id="skill4"
                                        name="homeSkill"
                                        value="4"
                                        style={{ display: 'none' }}
                                        checked={this.state.homeSkill === '4'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="skill4" title="4 stars">★</label>

                                    <input
                                        type="radio"
                                        id="skill3"
                                        name="homeSkill"
                                        value="3"
                                        style={{ display: 'none' }}
                                        checked={this.state.homeSkill === '3'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="skill3" title="3 stars">★</label>

                                    <input
                                        type="radio"
                                        id="skill2"
                                        name="homeSkill"
                                        value="2"
                                        style={{ display: 'none' }}
                                        checked={this.state.homeSkill === '2'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="skill2" title="2 stars">★</label>

                                    <input
                                        type="radio"
                                        id="skill1"
                                        name="homeSkill"
                                        value="1"
                                        style={{ display: 'none' }}
                                        checked={this.state.homeSkill === '1'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="skill1" title="1 star">★</label>
          </div>

          <hr />

          {['連絡頻度', '性格', '金銭感覚', '主体性', '婚活真剣度', '喫煙', '飲酒', 'ギャンブル'].map(key => (
            <div key={key}>
              <p>{key}</p>
              {[1, 2, 3, 4, 5].map(v => (
                <label key={v}>
                  <input type="radio"
                    name={key}
                    value={v}
                    checked={partner[key] === v}
                    onChange={this.handleChange} />
                  {v}
                </label>
              ))}
            </div>
          ))}

          <hr />

          <div>
            <label>
              連れ子の有無:
              <select name="hasChildren" value={partner.hasChildren || 0} onChange={this.handleChange}>
                <option value={0}>未設定</option>
                <option value={1}>なし</option>
                <option value={2}>あり</option>
              </select>
            </label><br />

            <label>
              転勤の有無:
              <select name="transferable" value={partner.transferable || 0} onChange={this.handleChange}>
                <option value={0}>未設定</option>
                <option value={1}>なし</option>
                <option value={2}>あり</option>
              </select>
            </label><br />

            <label>
              運転免許:
              <select name="driverLicense" value={partner.driverLicense || 0} onChange={this.handleChange}>
                <option value={0}>未設定</option>
                <option value={1}>なし</option>
                <option value={2}>あり</option>
              </select>
            </label><br />

            <label>
              両親との同棲希望:
              <select name="liveWithParents" value={partner.liveWithParents || 0} onChange={this.handleChange}>
                <option value={0}>未設定</option>
                <option value={1}>希望しない</option>
                <option value={2}>希望する</option>
              </select>
            </label><br />

            <label>
              共働き希望:
              <select name="dualIncome" value={partner.dualIncome || 0} onChange={this.handleChange}>
                <option value={0}>未設定</option>
                <option value={1}>希望しない</option>
                <option value={2}>希望する</option>
              </select>
            </label><br />
          </div>

          <hr />

          <button type="submit">更新</button>
          <button type="button" onClick={this.handleReset}>元に戻す</button>
        </form>
      </div>
    );
  };
}

// withNavigation でラップしてエクスポート
export default withNavigation(PartnerEdit);