import React from "react";
import axios from "axios";
import { withNavigation } from "../hoc/withNavigation";
import '../css/Impression.css';

class Impression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullItemsList: [],
      filteredItems: [],
      recordDate: "",
      impression: "",
      imageData: "",
      searchTerm: "",
      errorMessage: "",
      loading: true,
      showModal: false,
    };
  }

  componentDidMount() {
    if (
      this.props.router &&
      this.props.router.params &&
      this.props.router.params.id
    ) {
      this.fetchImpressions(this.props.router.params.id);
    } else {
      this.setState({
        errorMessage: "パートナーIDが取得できませんでした。",
        loading: false,
      });
    }
  }

  fetchImpressions = async (partnerProfilesId) => {
    this.setState({ loading: true, errorMessage: null });
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      this.setState({
        errorMessage: "認証情報が見つかりません。再ログインしてください。",
        loading: false,
      });
      this.props.router.navigate("/login/");
      return;
    }

    try {
      const response = await axios.get(
        `/api/impressions/${partnerProfilesId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      this.setState({
        fullItemsList: response.data,
        filteredItems: response.data,
        loading: false,
      });
    } catch (error) {
      console.error("印象ログの取得中にエラーが発生しました:", error);
      if (error.response && error.response.status === 401) {
        this.props.router.navigate("/login/");
      }
      this.setState({
        errorMessage: "印象ログの取得に失敗しました。",
        loading: false,
      });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  filterItems = () => {
    const { searchTerm, fullItemsList } = this.state;
    if (!searchTerm) {
      this.setState({ filteredItems: fullItemsList });
      return;
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const newFilteredItems = fullItemsList.filter((item) =>
      item.impression.toLowerCase().includes(lowercasedSearchTerm)
    );
    this.setState({ filteredItems: newFilteredItems });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
    if (this.state.showModal) {
      this.resetForm();
    }
  };

  handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({ imageData: reader.result.split(",")[1] });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  addImpression = () => {
    const { recordDate, impression, imageData, imageMimeType } = this.state;
    const partnerProfilesId = this.props.router.params.id;

    const data = {
      partnerProfilesId,
      recordDate,
      impression,
      imageData,
      imageMimeType,
    };

    if (!recordDate || !impression) {
      alert("日付と印象内容は必須です。");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      this.setState({
        errorMessage: "認証情報が見つかりません。再ログインしてください。",
      });
      this.props.router.navigate("/login/");
      return;
    }

    try {
      axios.post("/api/impressions/add/", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      alert("印象記録を登録しました。");
      this.toggleModal();
      this.componentDidMount();
    } catch (error) {
      console.error("印象記録の登録に失敗しました。", error);
      if (error.response && error.response.status === 401) {
        this.props.router.navigate("/login/");
      }
      this.setState({ errorMessage: "印象記録の登録に失敗しました。" });
    }
  };

  resetForm = () => {
    this.setState({
      recordDate: "",
      impression: "",
      imageData: "",
      imageMimeType: "",
    });
  };

  handleEdit = (id) => {
    alert(`編集：${id}（実装してください）`);
  };

  handleDelete = (id) => {
    alert(`削除：${id}（実装してください）`);
  };

  render() {
    const { searchTerm, filteredItems, loading, error } = this.state;

    if (loading) return <div>データを読み込み中...</div>;
    if (error) return <div>データの読み込みに失敗しました: {error.message}</div>;

    return (
      <div>
        <div className="search-box">
          <input
            type="text"
            name="searchTerm"
            value={searchTerm}
            onChange={this.handleInputChange}
          />
          <button type="button" className="search-button" onClick={this.filterItems}>
            検索
          </button>
        </div>

        {this.state.showModal && (
          <div id="modal">
            <h2>新規記録</h2>
            <form>
              <label>
                日付：
                <input
                  type="date"
                  name="recordDate"
                  value={this.state.recordDate}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                画像：
                <input type="file" accept="image/*" onChange={this.handleImageUpload} />
              </label>
              <label>
                印象：
                <textarea
                  name="impression"
                  value={this.state.impression}
                  onChange={this.handleInputChange}
                />
              </label>
              <button type="button" onClick={this.addImpression}>
                登録
              </button>
              <button type="button" onClick={this.resetForm}>
                リセット
              </button>
              <button type="button" onClick={this.toggleModal}>
                閉じる
              </button>
            </form>
          </div>
        )}

        <button onClick={this.toggleModal}>新規記録</button>

        <div>
          {filteredItems.length > 0 ? (
            <ul className="impression-list">
              {filteredItems.map((log) => (
                <li key={log.id} className="impression-card">
                  <div className="impression-row">
                    <div className="impression-text">
                      <p><strong>日付：</strong>{log.recordDate}</p>
                      <p><strong>印象：</strong>{log.impression}</p>
                    </div>
                    {log.imageData && (
                      <div className="impression-image">
                        <img
                          src={`data:${log.mimeType || "image/png"};base64,${log.imageData}`}
                          alt="印象画像"
                        />
                      </div>
                    )}
                  </div>
                  <div className="impression-actions">
                    <button onClick={() => this.handleEdit(log.id)}>編集</button>
                    <button onClick={() => this.handleDelete(log.id)}>削除</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>データが見つかりませんでした。</p>
          )}
        </div>
      </div>
    );
  }
}

export default withNavigation(Impression);
