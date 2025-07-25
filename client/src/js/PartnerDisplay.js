import React from "react";
import Chart from "chart.js/auto";

export default class PartnerDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.chartInstance = null;

    // 〇×比較の項目固定
    this.flagKeys = [
      "連れ子の有無",
      "転勤の有無",
      "運転免許",
      "両親との同棲希望",
      "共働き",
      "子供希望"
    ];
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.idealJson !== this.props.idealJson ||
      prevProps.partnerJson !== this.props.partnerJson ||
      prevProps.userJson !== this.props.userJson
    ) {
      this.drawChart();
    }
  }

  drawChart() {
    const { idealJson, partnerJson, userJson } = this.props;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const idealObj = JSON.parse(idealJson);
    const partnerObj = JSON.parse(partnerJson);
    const userObj = JSON.parse(userJson);

    const labels = Object.keys(idealObj);

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
          pointRadius: 5
        },
        {
          label: "お相手",
          data: Object.values(partnerObj),
          fill: true,
          backgroundColor: "rgba(216, 30, 5, 0.3)",
          borderColor: "rgb(216, 30, 5)",
          borderWidth: 2,
          pointRadius: 5
        },
        {
          label: "あなた",
          data: Object.values(userObj),
          fill: true,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderColor: "black",
          borderWidth: 2,
          pointRadius: 5
        }
      ]
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
                size: 14
              }
            }
          }
        },
        plugins: { legend: { position: "top" } },
        responsive: true,
        maintainAspectRatio: false
      }
    };

    const ctx = this.chartRef.current.getContext("2d");
    this.chartInstance = new Chart(ctx, config);
  }

  // 〇×表示用
  displayFlag(val) {
    switch (val) {
      case 0:
        return "未設定";
      case 1:
        return "〇";
      case 2:
        return "どちらでもよい";
      case 3:
        return "×";
      default:
        return "不明";
    }
  }

  render() {
    const {
      partnerName,
      partnerAge,
      partnerBirthday,
      partnerFirstMetDay,
      partnerMetEvent,
      partnerFirstImpression,
      detailedIdealScores,
      detailedPartnerScores,
      partnerFlags,
      idealFlags,
      userFlags
    } = this.props;

    return (
      <div style={{ fontFamily: "Arial, sans-serif", margin: 20 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ border: "1px solid #000", padding: "5px 10px" }}>ロゴ</div>
          <div>
            <div style={{ fontWeight: "bold" }}>{partnerName}さんのプロフィール</div>
            <hr />
            <div style={{ marginBottom: 4 }}>
              <span>年齢：{partnerAge}歳</span> &nbsp;&nbsp;
              <span>生年月日：{partnerBirthday}</span> &nbsp;&nbsp;
              <span>出会った日：{partnerFirstMetDay}</span>
            </div>
            <div>
              出会った経緯：<span>{partnerMetEvent}</span>
            </div>
            <div>
              第一印象：<span>{partnerFirstImpression}</span>
            </div>
          </div>
          <div style={{ fontWeight: "bold", fontSize: 24, cursor: "pointer" }}>≡</div>
        </header>

        <h1 style={{ color: "#d81e05" }}>お相手評価シート</h1>

        <div
          id="chartContainer"
          style={{ width: 600, maxWidth: "90vw", margin: "20px auto", height: 400 }}
        >
          <canvas ref={this.chartRef} id="radarChart"></canvas>
        </div>

        <div
          id="names"
          style={{ textAlign: "center", marginTop: -40, marginBottom: 20, fontWeight: "bold" }}
        >
          <span style={{ color: "#000", margin: "0 20px" }}>あなた</span>
          <span style={{ color: "#008000", margin: "0 20px" }}>理想</span>
          <span style={{ color: "#d81e05", margin: "0 20px" }}>お相手</span>
        </div>

        {/* 5段階評価比較 */}
        <h2 style={{ maxWidth: 700, margin: "40px auto 10px", color: "#d81e05" }}>
          詳細スコア比較（5段階評価）
        </h2>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            maxWidth: 700,
            margin: "20px auto"
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
            {Object.entries(detailedIdealScores).map(([key, val]) => (
              <tr key={key}>
                <td style={tdStyle}>{key}</td>
                <td style={tdStyle}>{val}</td>
                <td style={tdStyle}>{detailedPartnerScores[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 〇×比較 */}
        <h2 style={{ maxWidth: 700, margin: "40px auto 10px", color: "#d81e05" }}>
          詳細スコア比較（〇×比較）
        </h2>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            maxWidth: 700,
            margin: "20px auto"
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>項目</th>
              <th style={{ ...thStyle, color: "#d81e05" }}>お相手</th>
              <th style={{ ...thStyle, color: "#008000" }}>理想</th>
            </tr>
          </thead>
          <tbody>
            {this.flagKeys.map((key) => (
              <tr key={key}>
                <td style={tdStyle}>{key}</td>
                <td style={{ ...tdStyle, color: "#d81e05" }}>
                  {this.displayFlag(partnerFlags[key])}
                </td>
                <td style={{ ...tdStyle, color: "#008000" }}>
                  {["子供希望", "両親との同棲希望", "共働き"].includes(key)
                    ? this.displayFlag(userFlags[key])
                    : this.displayFlag(idealFlags[key])}
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
  backgroundColor: "#f0f0f0"
};

const tdStyle = {
  border: "1px solid #999",
  padding: "6px 8px",
  textAlign: "center"
};
