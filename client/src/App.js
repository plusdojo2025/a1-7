// BrowserRouter, Routes, Route は、通常、アプリケーションのトップレベルのコンポーネントで設定するため、
// 子コンポーネント自体がこれらのコンポーネントを直接インポートする必要はない
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

// PrivateRoute コンポーネント
import PrivateRoute from "./hoc/PrivateRoute";
// useState と useEffect をインポート
import React, { useState, useEffect } from "react";

// import logo from './logo.svg';
import "./App.css";

import Login from "./js/Login";
import MemberRegist from "./js/MemberRegist";
import PartnerList from "./js/PartnerList";
import Users from "./js/Users";
import PartnerDisplay from "./js/PartnerDisplay";
import PartnerEdit from "./js/PartnerEdit";
import Impression from "./js/Impression";
import Phase from "./js/Phase";
// DateはJavaScriptの組み込みオブジェクトと衝突するため変更
import DatePlan from "./js/Date";
import DatePlanQuestions from "./js/DateDiagnosisQuestions";
import DatePlanResult from "./js/DateDiagnosisResult";
import Marriage from "./js/Marriage";
import MarriageResult from "./js/MarriageResult";
import MessageIdea from "./js/MessageIdea";
import MessageCorrect from "./js/MessageCorrect";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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
            <Route path="/login/signup/" element={<MemberRegist />} />

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
              path="/partners/:id/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <PartnerDisplay />
                </PrivateRoute>
              }
            />
            <Route
              path="/partners/:id/edit/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <PartnerEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/partners/:id/impressions/"
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
              path="/dates/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <DatePlan />
                </PrivateRoute>
              }
            />
            <Route
              path="/dates/questions/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <DatePlanQuestions />
                </PrivateRoute>
              }
            />
            <Route
              path="/dates/result/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <DatePlanResult />
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
