import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withNavigation } from "../hoc/withNavigation";

import "../index.css";
import "../App.css";
import "../css/PartnerList.css";
import delIcon from "../assets/images/delete-icon.png";

class PartnerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [], //全件一覧(APIから取得したオリジナルデータ)
      filteredPartners: [], // 検索結果一覧（初期画面では全件表示）
      loading: true,
      errorMessage: null,
      showModal: false,
      birthday: "", // 新規登録用
      age: "", // 新規登録用
      isManualAge: false, // 年齢手動入力フラグ
      searchName: "", // 検索ワード
    };
  }

  componentDidMount() {
    this.fetchPartners();
  }

  fetchPartners = async () => {
    this.setState({ loading: true, errorMessage: null });
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      this.setState({
        error: "認証情報が見つかりません。再ログインしてください。",
        loading: false,
      });
      this.props.router.navigate("/login/");
      return;
    }

    try {
      const response = await axios.get("/api/home/showView/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      this.setState({
        partners: response.data.data,
        filteredPartners: response.data.data, // 初回は全件を表示
        loading: false,
      });
    } catch (error) {
      console.error("パートナーリスト取得失敗:", error);

      if (error.response && error.response.status === 401) {
        this.props.router.navigate("/login/");
      }
      this.setState({
        error: "パートナー情報の取得に失敗しました。",
        loading: false,
      });
    }
  };

  // 画面で何か入力された時に、その値をstateとして保持する
  onInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // お相手をフィルタリングする検索メソッド
  handleSearch = () => {
    const { searchName, partners } = this.state;

    // 検索フォームが空の場合は全件表示
    if (!searchName) {
      this.setState({ filteredPartners: partners });
      return;
    }

    const lowercasedSearchName = searchName.toLowerCase();
    const newFilteredPartners = partners.filter((item) =>
      item.name.toLowerCase().includes(lowercasedSearchName)
    );
    this.setState({ filteredPartners: newFilteredPartners });
  };

  // モーダルウィンドウの表示切り替え
  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      // モーダルを閉じる際にフォームの状態をリセット
      birthday: "",
      age: "",
      isManualAge: false,
    }));
  };

  // 年齢の自動計算
  calculateAge = (birthdayStr) => {
    const today = new Date();
    const birthDate = new Date(birthdayStr);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // 年齢手入力フラグの制御
  handleBirthdayChange = (e) => {
    const birthday = e.target.value;
    if (birthday) {
      const age = this.calculateAge(birthday);
      this.setState({ birthday, age, isManualAge: false });
    } else {
      this.setState({ birthday: "", age: "", isManualAge: true });
    }
  };
  handleAgeChange = (e) => {
    this.setState({ age: e.target.value, isManualAge: true });
  };

  // お相手の新規追加
  submitAddPartner = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newPartnerData = {
      name: formData.get("name"),
      nameRead: formData.get("nameRead"),
      birthday: formData.get("birthday"),
      age: formData.get("age") ? parseInt(formData.get("age"), 10) : null, // 数値に変換、空文字列の場合はnullをセット
      metEvent: formData.get("metEvent"),
      firstMetDay: formData.get("firstMetDay"),
      firstImpression: formData.get("firstImpression"),
    };

    // 年齢が入力されている場合のみバリデーションを実施
    if (
      newPartnerData.age !== null &&
      (isNaN(newPartnerData.age) || newPartnerData.age < 0)
    ) {
      alert("有効な年齢を入力してください。");
      return;
    }

    // 認証状態の確認
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      this.setState({
        error: "認証情報が見つかりません。再ログインしてください。",
        loading: false,
      });
      this.props.router.navigate("/login/");
      return;
    }

    try {
      await axios.post("/api/home/add/", newPartnerData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      this.setState({ showModal: false }); // モーダルを閉じる
      this.fetchPartners(); // リストを再取得して更新
      alert("お相手を登録しました！");
    } catch (error) {
      console.error("新規登録エラー:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`登録に失敗しました: ${error.response.data.message}`);
      } else {
        alert("登録に失敗しました。");
      }
    }
  };

  // お相手の削除
  handleDeletePartner = async (partner) => {
    const confirmation = window.confirm(
      `本当に ${partner.name} さんを削除しますか？`
    ); // 'キャンセル'が押された場合は何もしない

    if (confirmation) {
      // 認証状態の確認
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        this.setState({
          error: "認証情報が見つかりません。再ログインしてください。",
          loading: false,
        });
        this.props.router.navigate("/login/");
        return;
      }

      try {
        // URLパスでお相手IDを送信
        await axios.delete(`/api/home/delete/${partner.id}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        this.fetchPartners(); // リストを再取得して更新
        alert(`${partner.name} さんを削除しました。`);
      } catch (error) {
        console.error("パートナー削除エラー:", error);
        if (error.response && error.response.status === 401) {
          this.props.router.navigate("/login/");
        }
        alert("パートナーの削除に失敗しました。");
      }
    }
  };

  render() {
    const {
      filteredPartners,
      loading,
      errorMessage,
      showModal,
      searchName,
      birthday,
      age,
      isManualAge,
    } = this.state;

    return (
      <div className="partner-list-container">
        {/* ローディング、エラー、データなしのメッセージ */}
        {loading && <p>読み込み中...</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        {/* 検索バー */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="名前で検索"
            value={searchName}
            onChange={(e) => this.setState({ searchName: e.target.value })}
          />
          <button onClick={this.handleSearch}>検索</button>
        </div>

        <button onClick={this.toggleModal} className="add-button">
          + お相手を追加
        </button>

        {/* モーダルウィンドウ(新規追加) */}
        {/* 名前と名前(ふりがな)のみ必須項目 */}
        {showModal && (
          <div id="modal-overlay">
            <div id="modal-content">
              {/* 閉じるボタン */}
              <button onClick={this.toggleModal} className="modal-close-button">
                ×
              </button>

              <h3>お相手新規登録</h3>
              <form onSubmit={this.submitAddPartner}>
                <div className="form-group">
                  <label htmlFor="name">名前</label>
                  <input type="text" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="nameRead">名前(ふりがな)</label>
                  <input type="text" name="nameRead" required />
                </div>
                <div className="form-group">
                  <label htmlFor="birthday">生年月日</label>
                  <input
                    type="date"
                    name="birthday"
                    value={birthday}
                    onChange={this.handleBirthdayChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">年齢</label>
                  <input
                    type="number"
                    name="age"
                    value={age}
                    onChange={this.handleAgeChange}
                    readOnly={!isManualAge && birthday} // 誕生日が入力されている場合はReadOnlyに
                    placeholder={birthday ? "" : "年齢を手入力"}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="metEvent">出会った経緯</label>
                  <select name="metEvent">
                    <option value="">選択してください</option>
                    <option value="お見合い">お見合い</option>
                    <option value="街コン">街コン</option>
                    <option value="合コン">合コン</option>
                    <option value="アプリ">アプリ</option>
                    <option value="友達の紹介">友達の紹介</option>
                    <option value="仕事">仕事</option>
                    <option value="その他">その他</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="firstMetDay">出会った日</label>
                  <input type="date" name="firstMetDay" />
                </div>
                <div className="form-group">
                  <label htmlFor="firstImpression">第一印象</label>
                  <input type="text" name="firstImpression" />
                </div>
                <button type="submit" className="submit-button">
                  登録
                </button>
              </form>
            </div>
          </div>
        )}

        {/* お相手一覧 */}
        <ul>
          {filteredPartners.map((partner) => {
            const lastMetDate = new Date(partner.last_met_day);
            const lastMetStr =
              !partner.last_met_day || isNaN(lastMetDate.getTime())
                ? "不明"
                : lastMetDate.toLocaleDateString("ja-JP");

            return (
              <li key={partner.id} style={{ marginBottom: "1em" }}>
                <Link
                  to={`/partner/${partner.id}/`}
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <div>
                    <span className="partner-link">{partner.name}</span>（
                    {partner.age}歳）
                  </div>
                  {/* <div style={{ fontSize: "0.9em" }}>
                    最後に会った日：{lastMetStr}
                  </div> */}
                </Link>
                {/* 削除ボタン */}
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.preventDefault(); // Linkへの遷移を防ぐ
                    e.stopPropagation(); // イベントの伝播を防ぐ
                    this.handleDeletePartner(partner);
                  }}
                >
                  <img src={delIcon} alt="削除" className="delete-icon" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withNavigation(PartnerList);
