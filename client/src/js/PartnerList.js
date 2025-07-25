import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withNavigation } from "../hoc/withNavigation";

class PartnerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [],
      loading: true,
      errorMessage: null,
    };
  }

  componentDidMount() {
    this.fetchPartners();
  }

  fetchPartners = async () => {
    this.setState({ loading: true, error: null });
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      this.setState({
        error: "認証情報が見つかりません。再ログインしてください。",
        loading: false,
      });
      this.props.navigate("/login/"); // ログイン画面へリダイレクト
      return;
    }

    try {
      const response = await axios.get("/api/home/showView/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      this.setState({
        partners: response.data.data,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch partners:", error); // デバック用

      if (error.response && error.response.status === 401) {
        this.props.navigate("/login/");
      }
      this.setState({
        error: "パートナー情報の取得に失敗しました。",
        loading: false,
      });
    }
  };

  render() {
    const { partners, loading, error } = this.state;
    return (
      <div>
        <ul>
          {partners.map((partner) => (
            <li key={partner.id}>
              {/* 各パートナーの詳細表示へのリンク */}
              <Link to={`/partner/${partner.id}/`}> 
                {partner.name} ({partner.age}歳)
              </Link>
            </li>
          ))}
        </ul>
        
      </div>
    );
  }
}

export default withNavigation(PartnerList);
