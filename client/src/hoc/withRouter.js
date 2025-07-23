import React from 'react';
import { useNavigate } from 'react-router-dom';

// クラスコンポーネントと useNavigate を組み合わせるための
// withRouter HOCを模倣したラッパー関数
export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    return <Component navigate={navigate} {...props} />;
  };
  return Wrapper;
};