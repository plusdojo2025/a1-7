// クラスコンポーネントと useNavigate を組み合わせるためのカスタムHOC

import React from 'react';
import { useNavigate } from 'react-router-dom';

// navigateフックをラップし、クラスコンポーネントにnavigateプロパティとして渡す
const withNavigation = (Component) => {
  return (props) => {
    // useNavigateを呼び出し、
    const navigate = useNavigate();
    // 元のComponentにnavigateプロパティとして渡す
    return <Component {...props} navigate={navigate} />;
  };
};

export default withNavigation;