import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
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

          idealFlags:idealFlags,
          partnerFlags:partnerFlags,

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
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: { stepSize: 1 },
            pointLabels: {
              font: {
                size: 14,
              },
            },
          },
        },
        plugins: { legend: { position: "top" } },
        responsive: true,
        maintainAspectRatio: false,
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

  // 5段階評価の□を横に並べて色付けするコンポーネント
  FivePointRating({ partnerScore, idealScore, label, leftLabel, rightLabel }) {
    const boxes = (score, color) =>
      [...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 20,
            height: 20,
            margin: "0 2px",
            border: "1px solid #999",
            backgroundColor: i < score ? color : "transparent",
          }}
        />
      ));

    return (
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8, maxWidth: 700, margin: "10px auto" }}>
        <div style={{ width: 120 }}>{label}</div>
        <div style={{ width: 50, textAlign: "right", fontSize: 12 }}>{leftLabel}</div>

        <div style={{ margin: "0 10px" }}>
          {boxes(partnerScore, "#d81e05")} {/* お相手は赤 */}
        </div>

        <div style={{ margin: "0 10px" }}>
          {boxes(idealScore, "#008000")} {/* 理想は緑 */}
        </div>

        <div style={{ width: 50, fontSize: 12 }}>{rightLabel}</div>
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

    return (
      <div style={{ fontFamily: "Arial, sans-serif", margin: 20 }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: "bold" }}>
              {partnerDetail.name}さんのプロフィール
            </div>
            <hr />
            <div style={{ marginBottom: 4 }}>
              <span>年齢：{partnerDetail.age}歳</span> &nbsp;&nbsp;
              <span>生年月日：{partnerDetail.birthday}</span> &nbsp;&nbsp;
              <span>出会った日：{partnerDetail.firstMetDay}</span>
            </div>
            <div>
              出会った経緯：<span>{partnerDetail.metEvent}</span>
            </div>
            <div>
              第一印象：<span>{partnerDetail.firstImpression}</span>
            </div>
          </div>
        </header>
        <button onClick={this.handleEditClick}>編集</button>

        <h1 style={{ color: "#d81e05" }}>お相手評価シート</h1>

        <div
          id="chartContainer"
          style={{
            width: 600,
            maxWidth: "90vw",
            margin: "20px auto",
            height: 400,
          }}
        >
          <canvas ref={this.chartRef} id="radarChart"></canvas>
        </div>

        <div
          id="names"
          style={{
            textAlign: "center",
            marginTop: -40,
            marginBottom: 20,
            fontWeight: "bold",
          }}
        >
          <span style={{ color: "#000", margin: "0 20px" }}>あなた</span>
          <span style={{ color: "#008000", margin: "0 20px" }}>理想</span>
          <span style={{ color: "#d81e05", margin: "0 20px" }}>お相手</span>
        </div>

        {/* 5段階評価比較 */}
        <h2
          style={{ maxWidth: 700, margin: "40px auto 10px", color: "#d81e05" }}
        >
          詳細スコア比較（5段階評価）
        </h2>
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
              <th style={thStyle}>理想</th>
              <th style={thStyle}>お相手</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(detailedIdealScores || {}).map(([key, val]) => (
              <tr key={key}>
                <td style={tdStyle}>{key}</td>
                <td style={tdStyle}>{val}</td>
                <td style={tdStyle}>{detailedPartnerScores[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 〇×比較 */}
        <h2
          style={{ maxWidth: 700, margin: "40px auto 10px", color: "#d81e05" }}
        >
          詳細スコア比較（〇×比較）
        </h2>
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
                  {this.displayFlag(idealFlags[key])}
                </td>
                <td style={{ ...tdStyle, color: "#d81e05" }}>
                  {["子供希望", "両親との同棲希望", "共働き"].includes(key)
                    ? this.displayFlag(idealFlags[key])
                    : this.displayFlag(partnerFlags[key])}
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
