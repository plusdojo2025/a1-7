import React from "react";

export default class Login extends React.Component {
// const Login = () => {
//   const users = "ユーザー一覧";
render() {
  return (
    <div>
      {/* <div>{users}</div> */}

      <form method="POST" action="/home/">
        <input type="text" /><br />
        <input type="password" /><br />
        <input type="submit" name="submit" value="ログイン" />
        <input type="reset" name="reset" value="リセット" />
      </form>

      <p id="errormessage"></p>
      <a href="./signup/">新規登録はこちら</a>
    </div>
  );
  };
 };


// export default Login;