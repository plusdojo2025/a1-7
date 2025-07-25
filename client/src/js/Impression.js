import React from "react";
import axios from "axios";

export default class Impression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullItemsList: [], // 印象ログ全件一覧(APIから取得したオリジナルデータ)
      filteredItems: [], // 検索結果一覧（初期画面では全件表示）

      recordDate: "", // 日付
      impression: "", // 印象内容
      imageData: "", // 画像データ本体

      searchTerm: "", // 検索クエリ
      errorMessage: "",
      error: null, // エラーハンドリング用
      loading: true, // ローディング状態
      showModal: false, // モーダル表示用
    };
  }

  // マウント後に自動で動作する
  componentDidMount() {
    const { partnerProfilesId } = this.props;

    // axios.get()で ImpressionController から json を受け取り、fullItemsList と filteredItems にセット
    axios
      .get("/impressions/${partnerProfilesId}/")
      .then((response) => {
        console.log(response.data);
        this.setState({
          fullItemsList: response.data, // 全件リストを保存
          filteredItems: response.data, // 初期表示では全件を表示
          loading: false, // データ取得完了にローディングを終了
        });
      })
      // エラーハンドリング
      .catch((error) => {
        console.error("データの取得中にエラーが発生しました:", error);
        this.setState({
          error: error, // エラー情報を state に保存
          loading: false, // エラーが発生した場合もローディングを終了
        });
      });
  }

  // searchTerm のstate値を更新
  // onInput = (e) => {
  //   const { value } = e.target;
  //   this.setState({ searchTerm: value });
  // };

  // 追加
  handleInputChange = (e) => {
  const { name, value } = e.target;
  this.setState({ [name]: value });
};


  // 印象ログをフィルタリングするメソッド
  filterItems = () => {
    const { searchTerm, fullItemsList } = this.state;
    // 検索フォームが空の場合は全件表示
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


  // ↓追加部分
  //モーダルウィンドウの表示メソッド
  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal
    });
  }

  // 画像のアップロード処理
  handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({ imageData: reader.result.split(',')[1] }); // base64 文字列のみ
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 登録処理
  registerImpression = () => {
    const { recordDate, impression, imageData } = this.state;
    const { partnerProfilesId } = this.props;

    const data = {
      partnerProfilesId,
      recordDate,
      impression,
      imageData
    };

    axios.post("/impressions/add/", data)
      .then(() => {
        alert("登録完了");
        this.toggleModal();
        this.componentDidMount(); // 再取得
      })
      .catch(error => {
        console.error("登録失敗", error);
      });
  };

  // リセット処理
  resetForm = () => {
    this.setState({
      recordDate: "",
      impression: "",
      imageData: ""
    });
  };

  render() {
    const { searchTerm, filteredItems, loading, error } = this.state;

    if (loading) {
      return <div>データを読み込み中...</div>;
    }

    if (error) {
      return <div>データの読み込みに失敗しました: {error.message}</div>;
    }

    return (
      <div>
        {/* 検索フォーム */}
        <div className="search-box">
          <input type="text" name="searchTerm" value={this.state.searchTerm} onChange={this.handleInputChange} />
          <button
            type="button"
            className="search-button"
            onClick={this.filterItems}
          >
            検索
          </button>
        </div>

        {/* モーダルウィンドウ */}
        <div>
          {this.state.showModal && (
            <div id="modal">
              <h2>新規記録</h2>

              <form>
                <div>
                  <label>
                    日付：
                    <input type="date" name="recordDate" value={this.state.recordDate} onChange={this.handleInputChange} />
                  </label>
                </div>

                <div>
                  <label>
                    画像：
                    <input type="file" accept="image/*" onChange={this.handleImageUpload} />
                  </label>
                </div>

                <div>
                  <label>
                    印象：
                   <textarea name="impression" value={this.state.impression} onChange={this.handleInputChange} />
                  </label>
                </div>
                
                <div>
                  <button type="button" onClick={this.registerImpression}>登録</button>
                  <button type="button" onClick={this.resetForm}>リセット</button>
                  <button type="button" onClick={this.toggleModal}>閉じる</button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* 印象登録ボタン */}
        <div>
          <button onClick={this.toggleModal}>新規記録</button>
        </div>

        {/* 印象ログ表示部 */}
        <div>
          {filteredItems.length > 0 ? (
            <ul>
              {filteredItems.map((log) => (
                <li key={log.id}>
                  <p>日付：{log.recordDate}</p>
                  <p>印象：{log.impression}</p>
                  {log.imageData && (
                    <img
                      src={`data:${log.mimeType || "image/png"};base64,${log.imageData
                        }`}
                      alt="印象画像"
                      style={{
                        width: "100px",
                        height: "auto",
                        maxWidth: "200px",
                        display: "block",
                      }}
                    />
                  )}
                  {/* アクションボタン */}
                  <button onClick={() => this.handleEdit(log.id)}>編集</button>
                  <button onClick={() => this.handleDelete(log.id)}>
                    削除
                  </button>
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
