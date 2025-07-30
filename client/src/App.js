// BrowserRouter, Routes, Route は、通常、アプリケーションのトップレベルのコンポーネントで設定するため、
// 子コンポーネント自体がこれらのコンポーネントを直接インポートする必要はない
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useLocation, // ハンバガ用
} from "react-router-dom";

// PrivateRoute コンポーネント
import PrivateRoute from "./hoc/PrivateRoute";
// useState と useEffect をインポート
import React, { useState, useEffect } from "react";

import "./index.css";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false); // * あとで false に戻す * //
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ここ（初期画面はハンバガ閉じているのでfalse）
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(true); // サブメニュー用（提案の3つ）

  const location = useLocation(); // ここ
  // アプリケーション起動時に認証状態をチェック
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // * トークンの有効期限をチェックをするならここでtry-catch * //
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    //  location が変わったらメニュー閉じる（他ページに遷移したら勝手にメニューが閉じる）
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // ローカルストレージからトークンを削除
    // 未認証状態になり、PrivateRoute で自動的にログイン画面へ遷移
    setIsAuthenticated(false);
  };

  // URLパラメータにIDを要する（ useParams を使用する）コンポーネントのためのラッパー
  const PartnerDisplayWrapper = () => {
    const { id } = useParams(); // URLパスから id を取得
    return <PartnerDisplay partnerId={id} />; // PartnerDisplay に partnerId として渡す
  };

  const PartnerEditWrapper = () => {
    const { id } = useParams();
    return <PartnerEdit partnerId={id} />;
  };

  const ImpressionWrapper = () => {
    const { id } = useParams();
    return <Impression partnerId={id} />;
  };

  const PhaseWrapper = () => {
    const { id } = useParams();
    return <Phase partnerId={id} />;
  };

  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <header className="App-header">
        {/* 認証済みの場合のみ表示される、共通コンテンツ */}
        {isAuthenticated && (
          <nav>
            <div className="common-header">
            {/* ハンバーガーアイコン */}
              <button className="hamburger" onClick={() => setIsMenuOpen(true)}>
                ☰
              </button>
            </div>

            {/* スライドメニュー */}
            <div className={`slide-menu ${isMenuOpen ? "open" : ""}`}>
              <button
                className="close-button"
                onClick={() => setIsMenuOpen(false)}
              >
                ✖
              </button>
              <nav className="menu-links">
                <Link to="/home/">お相手一覧</Link>
                <Link to="/user/edit/">ユーザー設定</Link>
                {/* サブメニュー（提案） */}
                <h1
                  onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                  className="submenu-title"
                >
                  提案
                </h1>
                {isSubMenuOpen && (
                  <div className="submenu">
                    <Link to="/date-spot/">デートスポット</Link>
                    <Link to="/marriage-plans/">婚活プラン</Link>
                    <Link to="/messages/ideas/">メッセージ</Link>
                  </div>
                )}
                {/* サブここまで */}
                <button className="logout-button" onClick={handleLogout}>
                  ログアウト
                </button>
              </nav>
            </div>
          </nav>
        )}

        {/* ルートの定義 */}
        <Routes>
          {/* 公開ルート */}
          {/* index アクセス時に、ログイン済みなら /home/:userId へ、未ログインなら /login/ へ飛ばす */}
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
            path="/user/edit/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Users />
              </PrivateRoute>
            }
          />
          {/* useParams を使用するコンポーネントはラッパー経由で渡す */}
          <Route
            path="/partner/:id/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PartnerDisplayWrapper />
              </PrivateRoute>
            }
          />
          <Route
            path="/partner/:id/edit/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PartnerEditWrapper />
              </PrivateRoute>
            }
          />
          <Route
            path="/partner/:id/impressions/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ImpressionWrapper />
              </PrivateRoute>
            }
          />
          <Route
            path="/partner/:id/phases/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PhaseWrapper />
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
      </header>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
