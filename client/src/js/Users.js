import React from "react";
import '../css/Users.css';


export default class Users extends React.Component {
    showTab = (tabNo) => {
        document.getElementById("tab1").style.display = tabNo === 1 ? "block" : "none";
        document.getElementById("tab2").style.display = tabNo === 2 ? "block" : "none";
    };

    render() {
        return (
            <div>
                <form method="POST" action="/Users/new/">
                    <button type="button" onClick={() => this.showTab(1)}>ユーザー情報</button>
                    <button type="button" onClick={() => this.showTab(2)}>理想像設定</button>


                    <div id="tab1" style={{ display: "block" }}>
                        <h1>基本情報</h1>
                        <br />
                        <h3>子供が欲しいか</h3>
                        <select name="wantChildren">
                            <option value="0">未設定</option>
                            <option value="1">はい</option>
                            <option value="2">どちらでもよい</option>
                            <option value="3">いいえ</option>
                        </select>
                        <br />
                        <h3>両親との同棲希望か</h3>
                        <select name="liveWithParents">
                            <option value="0">未設定</option>
                            <option value="1">はい</option>
                            <option value="2">どちらでもよい</option>
                            <option value="3">いいえ</option>
                        </select>
                        <br />
                        <h3>共働き希望か</h3>
                        <select name="dualIncome">
                            <option value="0">未設定</option>
                            <option value="1">はい</option>
                            <option value="2">どちらでもよい</option>
                            <option value="3">いいえ</option>
                        </select>
                        <br />
                        <h1>自己評価</h1>
                        <br />
                        <div>
                            <p>家事スキル</p>
                            <div className="rating star">
                                <input type="radio" id="skill5" name="home_skill" value="5" style={{ display: 'none' }} />
                                <label htmlFor="skill5" title="5 stars">★</label>

                                <input type="radio" id="skill4" name="home_skill" value="4" style={{ display: 'none' }} />
                                <label htmlFor="skill4" title="4 stars">★</label>

                                <input type="radio" id="skill3" name="home_skill" value="3" defaultChecked
                                    style={{ display: 'none' }} />
                                <label htmlFor="skill3" title="3 stars">★</label>

                                <input type="radio" id="skill2" name="home_skill" value="2" style={{ display: 'none' }} />
                                <label htmlFor="skill2" title="2 stars">★</label>

                                <input type="radio" id="skill1" name="home_skill" value="1" style={{ display: 'none' }} />
                                <label htmlFor="skill1" title="1 star">★</label>
                            </div>
                            <p>コミュ力</p>
                            <div className="rating star">
                                <input type="radio" id="comm5" name="communication" value="5" style={{ display: 'none' }} />
                                <label htmlFor="comm5" title="5 stars">★</label>

                                <input type="radio" id="comm4" name="communication" value="4" style={{ display: 'none' }} />
                                <label htmlFor="comm4" title="4 stars">★</label>

                                <input type="radio" id="comm3" name="communication" value="3" defaultChecked style={{ display: 'none' }} />
                                <label htmlFor="comm3" title="3 stars">★</label>

                                <input type="radio" id="comm2" name="communication" value="2" style={{ display: 'none' }} />
                                <label htmlFor="comm2" title="2 stars">★</label>

                                <input type="radio" id="comm1" name="communication" value="1" style={{ display: 'none' }} />
                                <label htmlFor="comm1" title="1 star">★</label>
                            </div>
                            <p>経済力</p>
                            <div className="rating star">
                                <input type="radio" id="power5" name="economic_power" value="5" style={{ display: 'none' }} />
                                <label htmlFor="power5" title="5 stars">★</label>

                                <input type="radio" id="power4" name="economic_power" value="4" style={{ display: 'none' }} />
                                <label htmlFor="power4" title="4 stars">★</label>

                                <input type="radio" id="power3" name="economic_power" value="3" defaultChecked style={{ display: 'none' }} />
                                <label htmlFor="power3" title="3 stars">★</label>

                                <input type="radio" id="power2" name="economic_power" value="2" style={{ display: 'none' }} />
                                <label htmlFor="power2" title="2 stars">★</label>

                                <input type="radio" id="power1" name="economic_power" value="1" style={{ display: 'none' }} />
                                <label htmlFor="power1" title="1 star">★</label>
                            </div>
                            <p>容姿</p>
                            <div className="rating star">
                                <input type="radio" id="appear5" name="appearance" value="5" style={{ display: 'none' }} />
                                <label htmlFor="appear5" title="5 stars">★</label>

                                <input type="radio" id="appear4" name="appearance" value="4" style={{ display: 'none' }} />
                                <label htmlFor="appear4" title="4 stars">★</label>

                                <input type="radio" id="appear3" name="appearance" value="3" defaultChecked style={{ display: 'none' }} />
                                <label htmlFor="appear3" title="3 stars">★</label>

                                <input type="radio" id="appear2" name="appearance" value="2" style={{ display: 'none' }} />
                                <label htmlFor="appear2" title="2 stars">★</label>

                                <input type="radio" id="appear1" name="appearance" value="1" style={{ display: 'none' }} />
                                <label htmlFor="appear1" title="1 star">★</label>
                            </div>
                            <p>気遣い</p>
                            <div className="rating star">
                                <input type="radio" id="consider5" name="consideration" value="5" style={{ display: 'none' }} />
                                <label htmlFor="consider5" title="5 stars">★</label>

                                <input type="radio" id="consider4" name="consideration" value="4" style={{ display: 'none' }} />
                                <label htmlFor="consider4" title="4 stars">★</label>

                                <input type="radio" id="consider3" name="consideration" value="3" defaultChecked style={{ display: 'none' }} />
                                <label htmlFor="consider3" title="3 stars">★</label>

                                <input type="radio" id="consider2" name="consideration" value="2" style={{ display: 'none' }} />
                                <label htmlFor="consider2" title="2 stars">★</label>

                                <input type="radio" id="consider1" name="consideration" value="1" style={{ display: 'none' }} />
                                <label htmlFor="consider1" title="1 star">★</label>
                            </div>
                        </div>
                        <div className="buttons">
                            <button type="reset">元に戻す</button>
                            <button type="submit">更新</button>
                        </div>
                    </div>

                    <div id="tab2" style={{ display: "none" }}>
                        <h1>理想スペック</h1>
                        <div>
                            <p>家事スキル</p>
                            <div className="rating star">
                                <input type="radio" id="ideal_skill5" name="ideal_home_skill" value="5" style={{ display: 'none' }} />
                                <label htmlFor="ideal_skill5" title="5 stars">★</label>

                                <input type="radio" id="ideal_skill4" name="ideal_home_skill" value="4" style={{ display: 'none' }} />
                                <label htmlFor="ideal_skill4" title="4 stars">★</label>

                                <input type="radio" id="ideal_skill3" name="ideal_home_skill" value="3" defaultChecked
                                    style={{ display: 'none' }} />
                                <label htmlFor="ideal_skill3" title="3 stars">★</label>

                                <input type="radio" id="ideal_skill2" name="ideal_home_skill" value="2" style={{ display: 'none' }} />
                                <label htmlFor="ideal_skill2" title="2 stars">★</label>

                                <input type="radio" id="ideal_skill1" name="ideal_home_skill" value="1" style={{ display: 'none' }} />
                                <label htmlFor="ideal_skill1" title="1 star">★</label>
                            </div>
                            <p>コミュ力</p>
                            <div className="rating star">
                                <input type="radio" id="ideal_comm5" name="ideal_communication" value="5" style={{ display: 'none' }} />
                                <label htmlFor="comm5" title="5 stars">★</label>

                                <input type="radio" id="ideal_comm4" name="ideal_communication" value="4" style={{ display: 'none' }} />
                                <label htmlFor="ideal_comm4" title="4 stars">★</label>

                                <input type="radio" id="comm3" name="ideal_communication" value="3" defaultChecked style={{ display: 'none' }} />
                                <label htmlFor="ideal_comm3" title="3 stars">★</label>

                                <input type="radio" id="comm2" name="ideal_communication" value="2" style={{ display: 'none' }} />
                                <label htmlFor="ideal_comm2" title="2 stars">★</label>

                                <input type="radio" id="comm1" name="ideal_communication" value="1" style={{ display: 'none' }} />
                                <label htmlFor="ideal_comm1" title="1 star">★</label>
                            </div>
                            <p>経済力</p>
                            <div className="rating star">
                                <input type="radio" id="ideal_power5" name="ideal_economic_power" value="5" style={{ display: 'none' }} />
                                <label htmlFor="ideal_power5" title="5 stars">★</label>

                                <input type="radio" id="power4" name="ideal_economic_power" value="4" style={{ display: 'none' }} />
                                <label htmlFor="ideal_power4" title="4 stars">★</label>

                                <input type="radio" id="ideal_power3" name="ideal_economic_power" value="3" defaultChecked style={{ display: 'none' }} />
                                <label htmlFor="ideal_power3" title="3 stars">★</label>

                                <input type="radio" id="ideal_power2" name="ideal_economic_power" value="2" style={{ display: 'none' }} />
                                <label htmlFor="ideal_power2" title="2 stars">★</label>

                                <input type="radio" id="power1" name="ideal_economic_power" value="1" style={{ display: 'none' }} />
                                <label htmlFor="ideal_power1" title="1 star">★</label>
                            </div>
                            <p>容姿</p>
                            <div className="rating star">
                                <input type="radio" id="ideal_appear5" name="ideal_appearance" value="5" style={{ display: 'none' }} />
                                <label htmlFor="ideal_appear5" title="5 stars">★</label>

                                <input type="radio" id="ideal_appear4" name="ideal_appearance" value="4" style={{ display: 'none' }} />
                                <label htmlFor="ideal_appear4" title="4 stars">★</label>

                                <input type="radio" id="ideal_appear3" name="ideal_appearance" value="3" defaultChecked style={{ display: 'none' }} />
                                <label htmlFor="ideal_appear3" title="3 stars">★</label>

                                <input type="radio" id="ideal_appear2" name="ideal_appearance" value="2" style={{ display: 'none' }} />
                                <label htmlFor="ideal_appear2" title="2 stars">★</label>

                                <input type="radio" id="ideal_appear1" name="ideal_appearance" value="1" style={{ display: 'none' }} />
                                <label htmlFor="ideal_appear1" title="1 star">★</label>
                            </div>
                            <p>気遣い</p>
                            <div className="rating star">
                                <input type="radio" id="ideal_consider5" name="ideal_consideration" value="5" style={{ display: 'none' }} />
                                <label htmlFor="ideal_consider5" title="5 stars">★</label>

                                <input type="radio" id="ideal_consider4" name="ideal_consideration" value="4" style={{ display: 'none' }} />
                                <label htmlFor="ideal_consider4" title="4 stars">★</label>

                                <input type="radio" id="ideal_consider3" name="ideal_consideration" value="3" defaultChecked style={{ display: 'none' }} />
                                <label htmlFor="ideal_consider3" title="3 stars">★</label>

                                <input type="radio" id="ideal_consider2" name="ideal_consideration" value="2" style={{ display: 'none' }} />
                                <label htmlFor="ideal_consider2" title="2 stars">★</label>

                                <input type="radio" id="ideal_consider1" name="ideal_consideration" value="1" style={{ display: 'none' }} />
                                <label htmlFor="ideal_consider1" title="1 star">★</label>
                            </div>

                            <div className="rating-block">
                                <p>連絡頻度</p>
                                <div className="rating-row">
                                    <span class="label-left">少なめ</span>
                                    <div className="rating circle">
                                        <input type="radio" id="ideal_contact5" name="ideal_contact_freq" value="5" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_contact5" title="5 stars">〇</label>

                                        <input type="radio" id="ideal_contact4" name="ideal_contact_freq" value="4" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_contact4" title="4 stars">〇</label>

                                        <input type="radio" id="ideal_contact3" name="ideal_contact_freq" value="3" defaultChecked style={{ display: 'none' }} />
                                        <label htmlFor="ideal_contact3" title="3 stars">〇</label>

                                        <input type="radio" id="ideal_contact2" name="ideal_contact_freq" value="2" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_contact2" title="2 stars">〇</label>

                                        <input type="radio" id="ideal_contact1" name="ideal_contact_freq" value="1" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_contact1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">多め</span>
                                </div>
                                <p>性格</p>
                                <div className="rating-row">
                                    <span class="label-left">内向的</span>
                                    <div className="rating circle">
                                        <input type="radio" id="ideal_person5" name="ideal_personality" value="5" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_person5" title="5 stars">〇</label>

                                        <input type="radio" id="ideal_person4" name="ideal_personality" value="4" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_person4" title="4 stars">〇</label>

                                        <input type="radio" id="ideal_person3" name="ideal_personality" value="3" defaultChecked style={{ display: 'none' }} />
                                        <label htmlFor="ideal_person3" title="3 stars">〇</label>

                                        <input type="radio" id="ideal_person2" name="ideal_personality" value="2" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_person2" title="2 stars">〇</label>

                                        <input type="radio" id="ideal_person1" name="ideal_personality" value="1" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_person1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">外交的</span>
                                </div>
                                <p>金銭感覚</p>
                                <div className="rating-row">
                                    <span class="label-left">節約家</span>
                                    <div className="rating circle">
                                        <input type="radio" id="ideal_finan5" name="ideal_financial_sense" value="5" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_finan5" title="5 stars">〇</label>

                                        <input type="radio" id="ideal_finan4" name="ideal_financial_sense" value="4" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_finan4" title="4 stars">〇</label>

                                        <input type="radio" id="ideal_finan3" name="ideal_financial_sense" value="3" defaultChecked style={{ display: 'none' }} />
                                        <label htmlFor="ideal_finan3" title="3 stars">〇</label>

                                        <input type="radio" id="ideal_finan2" name="ideal_financial_sense" value="2" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_finan2" title="2 stars">〇</label>

                                        <input type="radio" id="ideal_finan1" name="ideal_financial_sense" value="1" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_finan1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">浪費家</span>
                                </div>
                                <p>主体性</p>
                                <div className="rating-row">
                                    <span class="label-left">受動的</span>
                                    <div className="rating circle">
                                        <input type="radio" id="ideal_initia5" name="ideal_initiative" value="5" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_initia5" title="5 stars">〇</label>

                                        <input type="radio" id="ideal_initia4" name="ideal_initiative" value="4" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_initia4" title="4 stars">〇</label>

                                        <input type="radio" id="ideal_initia3" name="ideal_initiative" value="3" defaultChecked style={{ display: 'none' }} />
                                        <label htmlFor="ideal_initia3" title="3 stars">〇</label>

                                        <input type="radio" id="ideal_initia2" name="ideal_initiative" value="2" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_initia2" title="2 stars">〇</label>

                                        <input type="radio" id="ideal_initia1" name="ideal_initiative" value="1" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_initia1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">主体的</span>
                                </div>
                                <p>婚活真剣度</p>
                                <div className="rating-row">
                                    <span class="label-left">低め</span>
                                    <div className="rating circle">
                                        <input type="radio" id="ideal_marr5" name="ideal_marriage_intent" value="5" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_marr5" title="5 stars">〇</label>

                                        <input type="radio" id="ideal_marr4" name="ideal_marriage_intent" value="4" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_marr4" title="4 stars">〇</label>

                                        <input type="radio" id="ideal_marr3" name="ideal_marriage_intent" value="3" defaultChecked style={{ display: 'none' }} />
                                        <label htmlFor="ideal_marr3" title="3 stars">〇</label>

                                        <input type="radio" id="ideal_marr2" name="ideal_marriage_intent" value="2" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_marr2" title="2 stars">〇</label>

                                        <input type="radio" id="ideal_marr1" name="ideal_marriage_intent" value="1" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_marr1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">高め</span>
                                </div>
                                <p>喫煙</p>
                                <div className="rating-row">
                                    <span class="label-left">まったく吸わない</span>
                                    <div className="rating circle">
                                        <input type="radio" id="ideal_smo5" name="ideal_smoker" value="5" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_smo5" title="5 stars">〇</label>

                                        <input type="radio" id="ideal_smo4" name="ideal_smoker" value="4" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_smo4" title="4 stars">〇</label>

                                        <input type="radio" id="ideal_smo3" name="ideal_smoker" value="3" defaultChecked style={{ display: 'none' }} />
                                        <label htmlFor="ideal_smo3" title="3 stars">〇</label>

                                        <input type="radio" id="ideal_smo2" name="ideal_smoker" value="2" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_smo2" title="2 stars">〇</label>

                                        <input type="radio" id="ideal_smo1" name="ideal_smoker" value="1" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_smo1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">よく吸う</span>
                                </div>
                                <p>飲酒</p>
                                <div className="rating-row">
                                    <span class="label-left">まったく飲まない</span>
                                    <div className="rating circle">
                                        <input type="radio" id="ideal_alc5" name="ideal_alcohol" value="5" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_alc5" title="5 stars">〇</label>

                                        <input type="radio" id="ideal_alc4" name="ideal_alcohol" value="4" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_alc4" title="4 stars">〇</label>

                                        <input type="radio" id="ideal_alc3" name="ideal_alcohol" value="3" defaultChecked style={{ display: 'none' }} />
                                        <label htmlFor="ideal_alc3" title="3 stars">〇</label>

                                        <input type="radio" id="ideal_alc2" name="ideal_alcohol" value="2" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_alc2" title="2 stars">〇</label>

                                        <input type="radio" id="ideal_alc1" name="ideal_alcohol" value="1" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_alc1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">よく飲む</span>
                                </div>
                                <p>ギャンブル</p>
                                <div className="rating-row">
                                    <span class="label-left">まったくしない</span>
                                    <div className="rating circle">
                                        <input type="radio" id="ideal_gam5" name="ideal_gamble" value="5" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_gam5" title="5 stars">〇</label>

                                        <input type="radio" id="ideal_gam4" name="ideal_gamble" value="4" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_gam4" title="4 stars">〇</label>

                                        <input type="radio" id="ideal_gam3" name="ideal_gamble" value="3" defaultChecked style={{ display: 'none' }} />
                                        <label htmlFor="ideal_gam3" title="3 stars">〇</label>

                                        <input type="radio" id="ideal_gam2" name="ideal_gamble" value="2" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_gam2" title="2 stars">〇</label>

                                        <input type="radio" id="ideal_gam1" name="ideal_gamble" value="1" style={{ display: 'none' }} />
                                        <label htmlFor="ideal_gam1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">よくする</span>
                                </div>
                                <h3>運転免許</h3>
                                <select name="ideal_driver_license">
                                    <option value="0">未設定</option>
                                    <option value="1">はい</option>
                                    <option value="2">どちらでもよい</option>
                                    <option value="3">いいえ</option>
                                </select>
                                <h3>転勤の有無</h3>
                                <select name="ideal_transferable">
                                    <option value="0">未設定</option>
                                    <option value="1">はい</option>
                                    <option value="2">どちらでもよい</option>
                                    <option value="3">いいえ</option>
                                </select>
                                <h3>既婚歴</h3>
                                <select name="ideal_has_divorce">
                                    <option value="0">未設定</option>
                                    <option value="1">はい</option>
                                    <option value="2">どちらでもよい</option>
                                    <option value="3">いいえ</option>
                                </select>
                                <h3>子供の有無</h3>
                                <select name="ideal_has_children">
                                    <option value="0">未設定</option>
                                    <option value="1">はい</option>
                                    <option value="2">どちらでもよい</option>
                                    <option value="3">いいえ</option>
                                </select>
                                <div className="buttons">
                                    <button type="reset">元に戻す</button>
                                    <button type="submit">更新</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}