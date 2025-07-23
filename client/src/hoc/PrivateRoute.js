import React from 'react';
import { Navigate } from 'react-router-dom';

// children として受け取ったコンポーネントに対して「認証チェックとリダイレクト」というロジックを付与するラッパー関数
const PrivateRoute = ({ children, isAuthenticated }) => {
  // isAuthenticated が true なら、子コンポーネント（保護されたページ）を表示
  // isAuthenticated が false なら、/login ページにリダイレクト
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;