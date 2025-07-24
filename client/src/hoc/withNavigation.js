// hoc/withNavigation.js
// クラスコンポーネントと useNavigate を組み合わせるためのカスタムHOC
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * クラスコンポーネント内で `this.props.navigate('/some-path')` のようにルーティングを制御できるようにする
 * navigateフックをラップし、ラップされたクラスコンポーネントにMaps関数をpropsとして注入するHOC
 * @param {React.ComponentType<any>} Component - Maps プロパティを受け取るコンポーネント
 * @returns {React.ComponentType<any>} - Maps プロパティが注入された新しいコンポーネント
 */

export const withNavigation = (Component) => {
  return (props) => {
    // useNavigateを呼び出し、navigate 関数を取得
    const navigate = useNavigate();
    // 元のComponentに Maps プロパティとして渡す
    return <Component {...props} navigate={navigate} />;
  };
};
