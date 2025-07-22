import React from "react";

const MemberRegist = () => {
  return (
    <div>
      <form method="post" action="/signup/add/">
        <label htmlFor="birthday">生年月日</label>
        <input type="date" name="birthday" id="birthday" />

        <label htmlFor="marriage_start">婚活開始</label>
        <input type="date" name="marriage_start" id="marriage_start" />

        <label htmlFor="mail_address">メールアドレス</label>
        <input type="text" name="mail_address" id="mail_address" />

        <label htmlFor="password1">パスワード</label>
        <input type="password" name="password1" id="password1" />

        <label htmlFor="password2">パスワード（確認用）</label>
        <input type="password" name="password" id="password2" />

        <input type="submit" name="submit" value="登録" />
      </form>

      <p id="errormessage"></p>
    </div>
  );
};

export default MemberRegist;