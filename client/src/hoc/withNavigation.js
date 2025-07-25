// hoc/withNavigation.js
// クラスコンポーネントと useNavigate を組み合わせるためのカスタムHOC
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * クラスコンポーネント内で `this.props.navigate('/some-path')` のようにルーティングを制御できるようにする
 * navigateフックをラップし、ラップされたクラスコンポーネントにMaps関数をpropsとして注入するHOC
 * @param {React.ComponentType<any>} Component - Maps プロパティを受け取るコンポーネント
 * @returns {React.ComponentType<any>} - Maps プロパティが注入された新しいコンポーネント
 */

export const withNavigation = (Component) => {
  return (props) => {
    // useNavigateとuseParamsを呼び出し、必要な関数やオブジェクトを取得
    const navigate = useNavigate();
    const params = useParams();
    // 元のComponentに navigate と params を含む router という名前のプロパティとして渡す
    return <Component {...props} router={{ navigate, params }} />;
  };
};
