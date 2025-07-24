import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DateStart() {
    // エラーメッセージをクリアし、ローディングを開始
    this.setState({
      errorMessage: "",
      loading: true,
    });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const qstart = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/result/"); // 「結果」ページに遷移
    } catch (error) {
      console.error("エラー:", error);
    } finally {
      setLoading(false);
    }
  };

  qstart = () => {
    this.setState({ loading: true });
    this.props.navigate("/DateDiagnosisQuestions");
  };


  return (
    <div>
      <p>おすすめのデートスポットを提案します</p>
      <p>デートスポット診断</p>
      <button onClick={qstart} disabled={loading}>
        {loading ? "起動中..." : "スタート"}
      </button>
    </div>
  );
}
