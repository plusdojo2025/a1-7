import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import '../css/PartnerDisplay.css';
import { withNavigation } from "../hoc/withNavigation";

class PartnerDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.chartInstance = null;

    this.state = {
      // お相手の基本情報（名前、年齢など）
      partnerDetail: {
        name: "",
        age: "",
        birthday: "",
        firstMetDay: "",
        metEvent: "",
        firstImpression: "",
      },

      // JSON文字列として取得し、後でパース
      idealJson: "{}",
      partnerJson: "{}",
      userJson: "{}",

      // パース後のオブジェクト（直接使用する）
      detailedIdealScores: {},
      detailedPartnerScores: {},
      partnerFlags: {},
      idealFlags: {},

      loading: true,
      error: null,
    };

    // 〇×比較の項目固定
    this.flagKeys = [
      "連れ子の有無",
      "転勤の有無",
      "運転免許",
      "両親との同棲希望",
      "共働き",
    ];
  }

  //---------ダミーデータ---------//
  //   componentDidMount() {
  //   const dummyIdealJson = JSON.stringify({
  //     家事スキル: 4,
  //     コミュ力: 5,
  //     経済力: 3,
  //     容姿: 2,
  //     気遣い: 4,
  //   });

  //   const dummyPartnerJson = JSON.stringify({
  //     家事スキル: 3,
  //     コミュ力: 4,
  //     経済力: 4,
  //     容姿: 2,
  //     気遣い: 3,
  //   });

  //   const dummyUserJson = JSON.stringify({
  //     家事スキル: 5,
  //     コミュ力: 3,
  //     経済力: 2,
  //     容姿: 3,
  //     気遣い: 4,
  //   });

  //   const dummyFlags = {
  //     "連れ子の有無": 2,
  //     "転勤の有無": 1,
  //     "運転免許": 1,
  //     "両親との同棲希望": 3,
  //     "共働き": 1,
  //     "子供希望": 1,
  //   };

  //   this.setState({
  //     partnerDetail: {
  //       name: "山田太郎",
  //       age: 30,
  //       birthday: "1993-03-10",
  //       firstMetDay: "2024-01-01",
  //       metEvent: "友人の紹介",
  //       firstImpression: "優しそうだった",
  //     },
  //     idealJson: dummyIdealJson,
  //     partnerJson: dummyPartnerJson,
  //     userJson: dummyUserJson,
  //     detailedIdealScores: dummyIdealJson,
  //     detailedPartnerScores: dummyPartnerJson,
  //     idealFlags: dummyFlags,
  //     partnerFlags: dummyFlags,
  //     userFlags: dummyFlags,
  //     loading: false,
  //   }, () => {
  //     this.drawChart(); // チャート描画
  //   });
  // }


  componentDidMount() {
    this.fetchPartnerDetail();
  }

  componentDidUpdate(prevProps, prevState) {
    // URLのIDが変わった場合
    const currentPartnerId = this.props.router.params.id;
    const prevPartnerId = prevProps.router.params.id;

    // URLのIDが変わった場合はデータを再取得
    if (currentPartnerId !== prevPartnerId) {
      this.fetchPartnerDetail();
    }

    // fetchPartnerDetail内でsetStateのコールバックとしてdrawChartを呼ぶようにしたので、ここでのJSON変更による再描画は不要になった。
    // fetchPartnerDetailはID変更時にも呼ばれるため、state更新時にdrawChartが実行される。

    // JSONデータが更新された場合のみチャートを再描画
    // else if (
    //   prevState.idealJson !== this.state.idealJson ||
    //   prevState.partnerJson !== this.state.partnerJson ||
    //   prevState.userJson !== this.state.userJson
    // ) {
    //   this.drawChart();
    // }
  }

  fetchPartnerDetail = async () => {
    const { id } = this.props.router.params; // URLからIDを取得
    const accessToken = localStorage.getItem("accessToken");

    if (!id) {
      this.setState({ error: "お相手IDが見つかりません。", loading: false });
      return;
    }
    if (!accessToken) {
      this.setState({
        error: "認証情報がありません。ログインしてください。",
        loading: false,
      });
      this.props.router.navigate("/login/");
      return;
    }

    this.setState({ loading: true, error: null }); // ローディング状態を開始

    try {
      const response = await axios.get(`/partner/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const partnerData = response.data;// ここで受け渡している

      // データが存在しない場合のデフォルト値を設定
      const defaultData = {
        name: "N/A", age: "N/A", birthday: "N/A",
        firstMetDay: "N/A", metEvent: "N/A", firstImpression: "N/A",
        idealScoresJson: "{}", partnerScoresJson: "{}", userScoresJson: "{}",
        partnerFlags: {}, idealFlags: {}, userFlags: {},
      };

      // partnerDataが存在しない、またはnullの場合はデフォルト値で初期化
      const currentPartnerData = partnerData;

      // JSON文字列をパースしてstateに保存
      const idealJson = partnerData.radarChart.ideal || {};
      const partnerJson = partnerData.radarChart.partner || {};
      const userJson = partnerData.radarChart.user || {}; // 自己評価スコア

      const detailedIdealScores = partnerData.detailedScores.ideal || {};
      const detailedPartnerScores = partnerData.detailedScores.partner || {};

      // フラグデータが直接オブジェクトとして返されることを想定
      const idealFlags = partnerData.flags.ideal || {}; // 理想の相手のフラグ   
      const partnerFlags = partnerData.flags.partner || {};



      this.setState(
        {
          partnerDetail: { // 基本情報をまとめて更新
            name: currentPartnerData.profile.name,
            age: currentPartnerData.profile.age,
            birthday: currentPartnerData.profile.birthday,
            firstMetDay: currentPartnerData.profile.firstMetDay,
            metEvent: currentPartnerData.profile.metEvent,
            firstImpression: currentPartnerData.profile.firstImpression,
          },

          idealJson: idealJson,
          partnerJson: partnerJson,
          userJson: userJson,

          // 各種詳細スコアとフラグをパースして state に保持
          detailedIdealScores: detailedIdealScores,
          detailedPartnerScores: detailedPartnerScores,

          idealFlags: idealFlags,
          partnerFlags: partnerFlags,

          loading: false,
        },
        () => {
          // stateが更新された後にチャートを描画
          this.drawChart();
        }
      );
    } catch (error) {
      console.error("Failed to fetch partner detail:", error);
      let errorMessage = "お相手詳細の取得に失敗しました。";
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = "認証切れです。再ログインしてください。";
            this.props.router.navigate("/login/");
          } else if (error.response.status === 404) {
            errorMessage = "指定されたお相手は見つかりませんでした。";
          } else {
            errorMessage = `エラー: ${error.response.status} - ${error.response.data.message || error.message
              }`;
          }
        } else if (error.request) {
          errorMessage =
            "サーバーからの応答がありません。ネットワークを確認してください。";
        }
      }
      this.setState({ error: errorMessage, loading: false });
    }
  };

  // お相手情報編集画面に遷移
  handleEditClick = () => {
    const { id } = this.props.router.params;
    if (id) {
      this.props.router.navigate(`/partner/${id}/edit/`);
    } else {
      console.error("Partner ID is missing for navigation.");
      // Optionally, show an alert to the user or redirect to a default page
    }
  };

  // 印象記録画面に遷移
  handleImpressionClick = () => {
    const { id } = this.props.router.params;
    if (id) {
      this.props.router.navigate(`/partner/${id}/impressions/`);
    } else {
      console.error("Partner ID is missing for navigation.");
      // Optionally, show an alert to the user or redirect to a default page
    }
  };

  drawChart() {
    const { idealJson, partnerJson, userJson } = this.state;

    // JSON文字列が未定義またはnullの場合は描画しない
    if (!idealJson || !partnerJson || !userJson) {
      console.warn("Chart data (JSON props) is not yet available.");
      // 既存のチャートがあれば破棄
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
      return;
    }

    let idealObj, partnerObj, userObj;
    try {
      idealObj = idealJson;
      partnerObj = partnerJson;
      userObj = userJson;
    } catch (e) {
      console.error("Failed to parse JSON for chart:", e);
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
      return;
    }

    // 理想のスコアオブジェクトのキーからラベルを取得
    const labels = Object.keys(idealObj);

    // データが空の場合のハンドリング
    if (labels.length === 0) {
      console.warn("No data labels available for chart. Chart not drawn.");
      return;
    }

    // 既存のチャートインスタンスがあれば破棄
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const data = {
      labels,
      datasets: [
        {
          label: "理想",
          data: Object.values(idealObj),
          fill: true,
          backgroundColor: "rgba(0, 128, 0, 0.3)",
          borderColor: "green",
          borderWidth: 2,
          pointRadius: 5,
        },
        {
          label: "お相手",
          data: Object.values(partnerObj),
          fill: true,
          backgroundColor: "rgba(216, 30, 5, 0.3)",
          borderColor: "rgb(216, 30, 5)",
          borderWidth: 2,
          pointRadius: 5,
        },
        {
          label: "あなた",
          data: Object.values(userObj),
          fill: true,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderColor: "black",
          borderWidth: 2,
          pointRadius: 5,
        },
      ],
    };

    const config = {
      type: "radar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
              color: "#333",
              font: { size: 12 },
            },
            grid: {
              color: "#ccc",
            },
            angleLines: {
              color: "#aaa",
            },
            pointLabels: {
              font: {
                size: 13,
                weight: "bold",
              },
              color: "#222",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (ctx) {
                return `${ctx.dataset.label}: ${ctx.formattedValue}`;
              },
            },
          },
        },
      },
    };


    const ctx = this.chartRef.current;
    if (ctx) {
      this.chartInstance = new Chart(ctx.getContext("2d"), config);
    } else {
      console.warn("Chart canvas reference is not available when drawing chart.");
    }
  }


  // 〇×表示用
  displayFlag(val) {
    switch (val) {
      case 0:
        return "未設定";
      case 1:
        return "×";
      case 2:
        return "どちらでもよい";
      case 3:
        return "〇";
      default:
        return "不明";
    }
  }

  FivePointRating({ partnerScore, idealScore, label, leftLabel, rightLabel }) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 10,
          maxWidth: 700,
          margin: "0 auto",
          fontSize: 14,
        }}
      >
        <div style={{ width: 100 }}>{label}</div>
        <div style={{ width: 60, textAlign: "right", fontSize: 12 }}>
          {leftLabel}
        </div>

        {/* スケール部分 */}
        <div style={{ display: "flex", margin: "0 10px" }}>
          {[...Array(5)].map((_, i) => {
            let bgColor = "white"; // デフォルトは白
            if (idealScore === i + 1) bgColor = "#008000"; // 理想 → 緑
            if (partnerScore === i + 1) bgColor = "#d81e05"; // 相手 → 赤
            if (idealScore === i + 1 && partnerScore === i + 1)
              bgColor = "purple"; // 両方一致したら紫などにしてもOK

            return (
              <div
                key={i}
                style={{
                  width: 22,
                  height: 22,
                  border: "2px solid #444",
                  margin: "0 2px",
                  borderRadius: 4,
                  backgroundColor: bgColor,
                }}
              />
            );
          })}
        </div>

        <div style={{ width: 60, fontSize: 12 }}>{rightLabel}</div>
      </div>
    );
  }






  render() {
    const {
      partnerDetail, // 新しいオブジェクトから情報を取得
      detailedIdealScores,
      detailedPartnerScores,
      // idealJson,
      // partnerJson,
      // userJson,
      partnerFlags,
      idealFlags,
    } = this.state;
    const { navigate } = this.props.router;

    const labelMap = {// 5段階表示用
      "連絡頻度": { left: "少なめ", right: "多め" },
      "性格": { left: "内向的", right: "外交的" },
      "金銭感覚": { left: "節約家", right: "浪費家" },
      "主体性": { left: "受動的", right: "主体的" },
      "婚活真剣度": { left: "低め", right: "高め" },
      "喫煙": { left: "まったく吸わない", right: "よく吸う" },
      "飲酒": { left: "まったく飲まない", right: "よく飲む" },
      "ギャンブル": { left: "まったくしない", right: "よくする" },
    };


    return (
      <div style={{ fontFamily: "Arial, sans-serif", margin: 20 }}>
        <header className="partner-header">
          <div className="partner-name-section">
            <div className="furigana">{partnerDetail.nameRead}</div>
            <h1 className="partner-name">{partnerDetail.name}さんのプロフィール</h1>
            <div className="partner-age">{partnerDetail.age}歳</div>
          </div>

          <div className="partner-details-2col">
            <div className="column">
              <div className="detail-item">生年月日：{partnerDetail.birthday}</div>
              <div className="detail-item">出会った日：{partnerDetail.firstMetDay}</div>
            </div>
            <div className="column">
              <div className="detail-item">出会った経緯：{partnerDetail.metEvent}</div>
              <div className="detail-item">第一印象：{partnerDetail.firstImpression}</div>
            </div>
          </div>
        </header>






        <div className="partner-buttons">
          <button onClick={this.handleEditClick}>編集</button>
          <button onClick={this.handleImpressionClick}>印象記録</button>
        </div>

        <div className="chart-container">
          <canvas ref={this.chartRef} id="radarChart"></canvas>
        </div>

        <div className="legend-names">
          <span className="legend-you">あなた</span>
          <span className="legend-ideal">理想</span>
          <span className="legend-partner">お相手</span>
        </div>


        {/* 5段階評価比較 */}
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            maxWidth: 700,
            margin: "20px auto",
          }}
        >
          <tbody>
            {Object.keys(detailedIdealScores).map((key) => {
              const labels = labelMap[key] || { left: "", right: "" };

              return (
                <this.FivePointRating
                  key={key}
                  label={key}
                  idealScore={detailedIdealScores[key]}
                  partnerScore={detailedPartnerScores[key]}
                  leftLabel={labels.left}
                  rightLabel={labels.right}
                />
              );
            })}


          </tbody>

        </table>

        {/* 〇×比較 */}
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            maxWidth: 700,
            margin: "20px auto",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>項目</th>
              <th style={{ ...thStyle, color: "#008000" }}>理想</th>
              <th style={{ ...thStyle, color: "#d81e05" }}>お相手</th>
            </tr>
          </thead>
          <tbody>
            {this.flagKeys.map((key) => (
              <tr key={key}>
                <td style={tdStyle}>{key}</td>

                <td style={{ ...tdStyle, color: "#008000" }}>
                  {this.displayFlag(
                    this.state.idealFlags.hasOwnProperty(key)
                      ? this.state.idealFlags[key]
                      : undefined
                  )}
                </td>

                <td style={{ ...tdStyle, color: "#d81e05" }}>
                  {this.displayFlag(
                    this.state.partnerFlags.hasOwnProperty(key)
                      ? this.state.partnerFlags[key]
                      : undefined
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    );
  }
}

const thStyle = {
  border: "1px solid #999",
  padding: "6px 8px",
  textAlign: "center",
  backgroundColor: "#f0f0f0",
};

const tdStyle = {
  border: "1px solid #999",
  padding: "6px 8px",
  textAlign: "center",
};

// withNavigation でラップしてエクスポート
export default withNavigation(PartnerDisplay);
