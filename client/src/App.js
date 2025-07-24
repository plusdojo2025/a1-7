// BrowserRouter, Routes, Route は、通常、アプリケーションのトップレベルのコンポーネントで設定するため、
// 子コンポーネント自体がこれらのコンポーネントを直接インポートする必要はない
import { BrowserRouter, Routes, Route, Link, Navigate, useParams } from "react-router-dom";

// PrivateRoute コンポーネント
import PrivateRoute from "./hoc/PrivateRoute";
// useState と useEffect をインポート
import React, { useState, useEffect } from "react";

import "./App.css";

// 各コンポーネントのインポート
import Login from "./js/Login";
import MemberRegist from "./js/MemberRegist";
import PartnerList from "./js/PartnerList";
import Users from "./js/Users";
import PartnerDisplay from "./js/PartnerDisplay";
import PartnerEdit from "./js/PartnerEdit";
import Impression from "./js/Impression";
import Phase from "./js/Phase";
import DateSpot from "./js/DateSpotDiagnosis";
import DateSpotQuestions from "./js/DateSpotDiagnosisQuestions";
import DateSpotResult from "./js/DateSpotDiagnosisResult";
import Marriage from "./js/Marriage";
import MarriageResult from "./js/MarriageResult";
import MessageIdea from "./js/MessageIdea";
import MessageCorrect from "./js/MessageCorrect";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // * あとで false に戻す *

  // アプリケーション起動時に認証状態をチェック
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* ルートの定義 */}
        <BrowserRouter>
          <Routes>
            {/* 公開ルート */}
            {/* index アクセス時に、ログイン済みなら /home/ へ、未ログインなら /login/ へ飛ばす */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/home/" replace />
                ) : (
                  <Navigate to="/login/" replace />
                )
              }
            />

            <Route
              path="/login/"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="/signup/" element={<MemberRegist />} />

            {/* 保護されたルート(ログインが必要) */}
            <Route
              path="/home/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <PartnerList />
                </PrivateRoute>
              }
            />
            <Route
              path="/users/:id/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="/partner/:id/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <PartnerDisplay />
                </PrivateRoute>
              }
            />
            <Route
              path="/partner/:id/edit/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <PartnerEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/partner/:id/impressions/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Impression />
                </PrivateRoute>
              }
            />
            <Route
              path="/phases/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Phase />
                </PrivateRoute>
              }
            />
            <Route
              path="/date-spot/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <DateSpot />
                </PrivateRoute>
              }
            />
            <Route
              path="/date-spot/questions/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <DateSpotQuestions />
                </PrivateRoute>
              }
            />
            <Route
              path="/date-spot/result/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <DateSpotResult />
                </PrivateRoute>
              }
            />
            <Route
              path="/marriage-plans/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Marriage />
                </PrivateRoute>
              }
            />
            <Route
              path="/marriage-plans/result/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <MarriageResult />
                </PrivateRoute>
              }
            />
            <Route
              path="/messages/ideas/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <MessageIdea />
                </PrivateRoute>
              }
            />
            <Route
              path="/messages/correct/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <MessageCorrect />
                </PrivateRoute>
              }
            />

            {/* 存在しないパスへのアクセス (404 Not Found) */}
            <Route path="*" element={<h2>404 Not Found</h2>} />
          </Routes>
        </BrowserRouter>

        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
