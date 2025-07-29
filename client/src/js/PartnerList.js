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
      showModal: false,
      birthday:"",
      age:"",
      isManualAge: false,
      searchName: "",
    };
  }

  calculateAge = (birthdayStr) => {
    const today = new Date();
    const birthDate = new Date(birthdayStr);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  handleBirthdayChange = (e) => {
    const birthday = e.target.value;
    if (birthday) {
      const age = this.calculateAge(birthday);
      this.setState({ birthday, age, isManualAge: false });
    } else {
      this.setState({ birthday: "", age: "", isManualAge: true});
    }
  };

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

  handleSearch = async () => {
    const { searchName } = this.state;
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get("/home/partners/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          name: searchName,
        },
      });

      this.setState({ partners: response.data.data });
    } catch (error) {
      console.error("検索エラー", error);
      alert("検索に失敗しました");
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal
    }));
  };

  handleAddPartner = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPartner = {
      name: formData.get("name"),
      age: parseInt(formData.get("age"),10),
    };

    const accessToken = localStorage.getItem("accessToken");

    try {
      await axios.post("/api/partners/",newPartner, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
      });

      this.setState({ showModal: false});
      this.fetchPartners();
    } catch (error) {
      console.error("新規登録エラー:", error);
      alert("登録に失敗しました");
    }
  };

  handleBirthdayChange = (e) => {
    const birthday = e.target.value;
    if (birthday) {
      const age = this.calculateAge(birthday);
      this.setState({ birthday, age, isManualAge: false});
    } else {
      this.setState({ birthday:"", age:"", isManualAge: true});
    }
  };

  handleAgeChange = (e) => {
    this.setState({ age: e.target.value, isManualAge: true});
  };

  render() {
    const { partners, loading, error, showModal } = this.state;

    return (
    <div>
      <button onClick={this.toggleModal}>
        + お相手を追加
      </button>

      {/* 検索バー */}
      <div>
        <input type="text" placeholder="名前で検索" value={this.state.searchName} onChange={(e) => this.setState({ searchName: e.target.value })}/>

        <button onClick={this.handleSearch}>検索</button>
      </div>

      {/* モーダル表示 */}
      {showModal && (
        <div>
        <button onClick={this.toggleModal}>×</button>
        <h3>お相手新規登録</h3>
        <form onSubmit={this.handleAddPartner}>
          <div>
            <label>名前：</label>
            <input type="text" name="name" required />
          </div>
          <div>
            <label>名前(ふりがな)：</label>
            <input type="text" name="nameRead" required />
          </div>
          <div>
            <label>生年月日：</label>
            <input type="date" name="birthday" value={this.state.birthday} onChange={this.handleBirthdayChange} required />
          </div>
          <div>
            <label>年齢：</label>
            <input type="text" name="age" value={this.state.age} onChange={this.handleAgeChange} readOnly={!this.state.isManualAge} placeholder={this.state.birthday ?"" : "年齢を手入力"} required />
          </div>
          <div>
            <label>出会った経緯：</label>
            <select name="metEvent" required>
              <option value="">選択してください</option>
              <option value="matchmaking">お見合い</option>
              <option value="machikon">街コン</option>
              <option value="goukon">合コン</option>
              <option value="app">アプリ</option>
              <option value="friend">友達の紹介</option>
              <option value="work">仕事</option>
              <option value="other">その他</option>
            </select>
          </div>
          <div>
            <label>出会った日：</label>
            <input type="date" name="firstMetDay" required />
          </div>
          <div>
            <label>第一印象：</label>
            <input type="text" name="firstImpression" required />
          </div>
          <div>
            <button type="submit">登録</button>  
          </div>
        </form>
      </div>
      )}

{/* お相手一覧 */}
      <ul>
        {partners.map((partner) => {
          const lastMetDate = new Date(partner.last_met_day);
          const lastMetStr = !partner.last_met_day || isNaN(lastMetDate.getTime())
            ? "日付不明"
            : lastMetDate.toLocaleDateString("ja-JP");

          return (
            <li key={partner.id} style={{ marginBottom: "1em" }}>
              <Link to={`/partner/${partner.id}/`} style={{ textDecoration: "none", color: "inherit" }}>
                <div>{partner.name} ({partner.age}歳)</div>
                <div style={{ fontSize: "0.9em", color: "#555" }}>
                  最後に会った日 {lastMetStr}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


//元の文
//     return (
//       <div>
//         <ul>
//           {partners.map((partner) => (
//             <li key={partner.id}>
//               {/* 各パートナーの詳細表示へのリンク */}
//               <Link to={`/partner/${partner.id}/`}> 
//                 {partner.name} ({partner.age}歳) {new Date(partner.first_met_day).toLocaleDateString("ja-JP")}
//               </Link>
//             </li>
//           ))}
//         </ul>
        
//       </div>
//     );
//   }
// }

//最新完成    
// return (
//   <div>
//     <ul>
//       {partners.map((partner) => {
//         console.log("first_met_day raw:", partner.first_met_day);
//         const date = new Date(partner.first_met_day);
//         console.log("parsed date:", date);

//         return (
//           <li key={partner.id}>
//             <Link to={`/partner/${partner.id}/`}>
//               {partner.name} ({partner.age}歳){" "}
//               {isNaN(date.getTime()) ? "?" : date.toLocaleDateString("ja-JP")}
//             </Link>
//           </li>
//         );
//       })}
//     </ul>
//   </div>
//   );
// }
}

export default withNavigation(PartnerList);
