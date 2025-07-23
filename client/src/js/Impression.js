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
    };
  }

  // マウント後に自動で動作する
  componentDidMount() {
    const { partnerProfilesId } = this.props;

    // axios.get()で ImpressionController から json を受け取り、fullItemsList と filteredItems にセット
    axios
      .get("/impressions/${partnerProfilesId}")
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
  onInput = (e) => {
    const { value } = e.target;
    this.setState({ searchTerm: value });
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
          <input type="text" value={searchTerm} onChange={this.onInput} />
          <button
            type="button"
            className="search-button"
            onClick={this.filterItems}
          >
            検索
          </button>
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
                      src={`data:${log.mimeType || "image/png"};base64,${
                        log.imageData
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
                  <button onClick={() => this.handleDelete(log.id)}>削除</button>
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
