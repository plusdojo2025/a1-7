import React from "react";
import '../css/Users.css';


export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childWish: '0',
            liveWithParents: '0',
            dualIncome: '0',
            homeSkill: '3',
            communication: '3',
            economicPower: '3',
            appearance: '3',
            consideration: '3',
            idealHomeSkill: '3',
            idealCommunication: '3',
            idealEconomicPower: '3',
            idealAppearance: '3',
            idealConsideration: '3',
            idealContactFreq: '3',
            idealPersonality: '3',
            idealFinancialSense: '3',
            idealInitiative: '3',
            idealMarriageIntent: '3',
            idealSmoker: '3',
            idealAlcohol: '3',
            idealGamble: '3',
            idealDriverLicense: '0',
            idealTransferable: '0',
            idealHasDivorce: '0',
            idealHasChildren: '0',
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

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
                        <select name="childWish" value={this.state.childWish} onChange={this.handleChange}>
                            <option value="0">未設定</option>
                            <option value="1">はい</option>
                            <option value="2">どちらでもよい</option>
                            <option value="3">いいえ</option>
                        </select>
                        <br />
                        <h3>両親との同棲希望か</h3>
                        <select name="liveWithParents" value={this.state.liveWithParents} onChange={this.handleChange}>
                            <option value="0">未設定</option>
                            <option value="1">はい</option>
                            <option value="2">どちらでもよい</option>
                            <option value="3">いいえ</option>
                        </select>
                        <br />
                        <h3>共働き希望か</h3>
                        <select name="dualIncome" value={this.state.dualIncome} onChange={this.handleChange}>
                            <option value="0">未設定</option>
                            <option value="1">はい</option>
                            <option value="2">どちらでもよい</option>
                            <option value="3">いいえ</option>
                        </select>
                        <br />
                        <div>
                            <div>
                                <p>家事スキル</p>
                                <div className="rating star">
                                    <input
                                        type="radio"
                                        id="skill5"
                                        name="homeSkill"
                                        value="5"
                                        style={{ display: 'none' }}
                                        checked={this.state.homeSkill === '5'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="skill5" title="5 stars">★</label>

                                    <input
                                        type="radio"
                                        id="skill4"
                                        name="homeSkill"
                                        value="4"
                                        style={{ display: 'none' }}
                                        checked={this.state.homeSkill === '4'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="skill4" title="4 stars">★</label>

                                    <input
                                        type="radio"
                                        id="skill3"
                                        name="homeSkill"
                                        value="3"
                                        style={{ display: 'none' }}
                                        checked={this.state.homeSkill === '3'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="skill3" title="3 stars">★</label>

                                    <input
                                        type="radio"
                                        id="skill2"
                                        name="homeSkill"
                                        value="2"
                                        style={{ display: 'none' }}
                                        checked={this.state.homeSkill === '2'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="skill2" title="2 stars">★</label>

                                    <input
                                        type="radio"
                                        id="skill1"
                                        name="homeSkill"
                                        value="1"
                                        style={{ display: 'none' }}
                                        checked={this.state.homeSkill === '1'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="skill1" title="1 star">★</label>
                                </div>
                            </div>

                            <div>
                                <p>コミュ力</p>
                                <div className="rating star">
                                    <input
                                        type="radio"
                                        id="comm5"
                                        name="communication"
                                        value="5"
                                        style={{ display: 'none' }}
                                        checked={this.state.communication === '5'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="comm5" title="5 stars">★</label>

                                    <input
                                        type="radio"
                                        id="comm4"
                                        name="communication"
                                        value="4"
                                        style={{ display: 'none' }}
                                        checked={this.state.communication === '4'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="comm4" title="4 stars">★</label>

                                    <input
                                        type="radio"
                                        id="comm3"
                                        name="communication"
                                        value="3"
                                        style={{ display: 'none' }}
                                        checked={this.state.communication === '3'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="comm3" title="3 stars">★</label>

                                    <input
                                        type="radio"
                                        id="comm2"
                                        name="communication"
                                        value="2"
                                        style={{ display: 'none' }}
                                        checked={this.state.communication === '2'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="comm2" title="2 stars">★</label>

                                    <input
                                        type="radio"
                                        id="comm1"
                                        name="communication"
                                        value="1"
                                        style={{ display: 'none' }}
                                        checked={this.state.communication === '1'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="comm1" title="1 star">★</label>
                                </div>
                            </div>

                            <div>
                                <p>経済力</p>
                                <div className="rating star">
                                    <input
                                        type="radio"
                                        id="eco5"
                                        name="economicPower"
                                        value="5"
                                        style={{ display: 'none' }}
                                        checked={this.state.economicPower === '5'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="eco5" title="5 stars">★</label>

                                    <input
                                        type="radio"
                                        id="eco4"
                                        name="economicPower"
                                        value="4"
                                        style={{ display: 'none' }}
                                        checked={this.state.economicPower === '4'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="eco4" title="4 stars">★</label>

                                    <input
                                        type="radio"
                                        id="eco3"
                                        name="economicPower"
                                        value="3"
                                        style={{ display: 'none' }}
                                        checked={this.state.economicPower === '3'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="eco3" title="3 stars">★</label>

                                    <input
                                        type="radio"
                                        id="eco2"
                                        name="economicPower"
                                        value="2"
                                        style={{ display: 'none' }}
                                        checked={this.state.economicPower === '2'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="eco2" title="2 stars">★</label>

                                    <input
                                        type="radio"
                                        id="eco1"
                                        name="economicPower"
                                        value="1"
                                        style={{ display: 'none' }}
                                        checked={this.state.economicPower === '1'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="eco1" title="1 star">★</label>
                                </div>
                            </div>

                            <p>容姿</p>
                            <div className="rating star">
                                <input
                                    type="radio"
                                    id="appear5"
                                    name="appearance"
                                    value="5"
                                    style={{ display: 'none' }}
                                    checked={this.state.appearance === '5'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="appear5" title="5 stars">★</label>

                                <input
                                    type="radio"
                                    id="appear4"
                                    name="appearance"
                                    value="4"
                                    style={{ display: 'none' }}
                                    checked={this.state.appearance === '4'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="appear4" title="4 stars">★</label>

                                <input
                                    type="radio"
                                    id="appear3"
                                    name="appearance"
                                    value="3"
                                    style={{ display: 'none' }}
                                    checked={this.state.appearance === '3'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="appear3" title="3 stars">★</label>

                                <input
                                    type="radio"
                                    id="appear2"
                                    name="appearance"
                                    value="2"
                                    style={{ display: 'none' }}
                                    checked={this.state.appearance === '2'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="appear2" title="2 stars">★</label>

                                <input
                                    type="radio"
                                    id="appear1"
                                    name="appearance"
                                    value="1"
                                    style={{ display: 'none' }}
                                    checked={this.state.appearance === '1'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="appear1" title="1 star">★</label>
                            </div>

                            <p>気遣い</p>
                            <div className="rating star">
                                <input
                                    type="radio"
                                    id="consider5"
                                    name="consideration"
                                    value="5"
                                    style={{ display: 'none' }}
                                    checked={this.state.consideration === '5'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="consider5" title="5 stars">★</label>

                                <input
                                    type="radio"
                                    id="consider4"
                                    name="consideration"
                                    value="4"
                                    style={{ display: 'none' }}
                                    checked={this.state.consideration === '4'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="consider4" title="4 stars">★</label>

                                <input
                                    type="radio"
                                    id="consider3"
                                    name="consideration"
                                    value="3"
                                    style={{ display: 'none' }}
                                    checked={this.state.consideration === '3'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="consider3" title="3 stars">★</label>

                                <input
                                    type="radio"
                                    id="consider2"
                                    name="consideration"
                                    value="2"
                                    style={{ display: 'none' }}
                                    checked={this.state.consideration === '2'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="consider2" title="2 stars">★</label>

                                <input
                                    type="radio"
                                    id="consider1"
                                    name="consideration"
                                    value="1"
                                    style={{ display: 'none' }}
                                    checked={this.state.consideration === '1'}
                                    onChange={this.handleChange}
                                />
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
                                <input
                                    type="radio"
                                    id="idealSkill5"
                                    name="idealHomeSkill"
                                    value="5"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealHomeSkill === '5'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealSkill5" title="5 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealSkill4"
                                    name="idealHomeSkill"
                                    value="4"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealHomeSkill === '4'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealSkill4" title="4 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealSkill3"
                                    name="idealHomeSkill"
                                    value="3"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealHomeSkill === '3'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealSkill3" title="3 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealSkill2"
                                    name="idealHomeSkill"
                                    value="2"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealHomeSkill === '2'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealSkill2" title="2 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealSkill1"
                                    name="idealHomeSkill"
                                    value="1"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealHomeSkill === '1'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealSkill1" title="1 star">★</label>
                            </div>

                            <p>コミュ力</p>
                            <div className="rating star">
                                <input
                                    type="radio"
                                    id="idealComm5"
                                    name="idealCommunication"
                                    value="5"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealCommunication === '5'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealComm5" title="5 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealComm4"
                                    name="idealCommunication"
                                    value="4"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealCommunication === '4'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealComm4" title="4 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealComm3"
                                    name="idealCommunication"
                                    value="3"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealCommunication === '3'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealComm3" title="3 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealComm2"
                                    name="idealCommunication"
                                    value="2"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealCommunication === '2'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealComm2" title="2 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealComm1"
                                    name="idealCommunication"
                                    value="1"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealCommunication === '1'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealComm1" title="1 star">★</label>
                            </div>

                            <p>経済力</p>
                            <div className="rating star">
                                <input
                                    type="radio"
                                    id="idealPower5"
                                    name="idealEconomicPower"
                                    value="5"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealEconomicPower === '5'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealPower5" title="5 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealPower4"
                                    name="idealEconomicPower"
                                    value="4"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealEconomicPower === '4'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealPower4" title="4 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealPower3"
                                    name="idealEconomicPower"
                                    value="3"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealEconomicPower === '3'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealPower3" title="3 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealPower2"
                                    name="idealEconomicPower"
                                    value="2"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealEconomicPower === '2'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealPower2" title="2 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealPower1"
                                    name="idealEconomicPower"
                                    value="1"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealEconomicPower === '1'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealPower1" title="1 star">★</label>
                            </div>

                            <p>容姿</p>
                            <div className="rating star">
                                <input
                                    type="radio"
                                    id="idealAppear5"
                                    name="idealAppearance"
                                    value="5"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealAppearance === '5'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealAppear5" title="5 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealAppear4"
                                    name="idealAppearance"
                                    value="4"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealAppearance === '4'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealAppear4" title="4 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealAppear3"
                                    name="idealAppearance"
                                    value="3"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealAppearance === '3'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealAppear3" title="3 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealAppear2"
                                    name="idealAppearance"
                                    value="2"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealAppearance === '2'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealAppear2" title="2 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealAppear1"
                                    name="idealAppearance"
                                    value="1"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealAppearance === '1'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealAppear1" title="1 star">★</label>
                            </div>

                            <p>気遣い</p>
                            <div className="rating star">
                                <input
                                    type="radio"
                                    id="idealConsider5"
                                    name="idealConsideration"
                                    value="5"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealConsideration === '5'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealConsider5" title="5 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealConsider4"
                                    name="idealConsideration"
                                    value="4"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealConsideration === '4'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealConsider4" title="4 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealConsider3"
                                    name="idealConsideration"
                                    value="3"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealConsideration === '3'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealConsider3" title="3 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealConsider2"
                                    name="idealConsideration"
                                    value="2"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealConsideration === '2'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealConsider2" title="2 stars">★</label>

                                <input
                                    type="radio"
                                    id="idealConsider1"
                                    name="idealConsideration"
                                    value="1"
                                    style={{ display: 'none' }}
                                    checked={this.state.idealConsideration === '1'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="idealConsider1" title="1 star">★</label>
                            </div>


                            <div className="rating-block">
                                <p>連絡頻度</p>
                                <div className="rating-row">
                                    <span className="label-left">少なめ</span>
                                    <div className="rating circle">
                                        <input
                                            type="radio"
                                            id="idealContact5"
                                            name="idealContactFreq"
                                            value="5"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealContactFreq === '5'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealContact5" title="5 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealContact4"
                                            name="idealContactFreq"
                                            value="4"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealContactFreq === '4'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealContact4" title="4 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealContact3"
                                            name="idealContactFreq"
                                            value="3"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealContactFreq === '3'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealContact3" title="3 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealContact2"
                                            name="idealContactFreq"
                                            value="2"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealContactFreq === '2'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealContact2" title="2 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealContact1"
                                            name="idealContactFreq"
                                            value="1"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealContactFreq === '1'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealContact1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">多め</span>
                                </div>

                                <p>性格</p>
                                <div className="rating-row">
                                    <span className="label-left">内向的</span>
                                    <div className="rating circle">
                                        <input
                                            type="radio"
                                            id="idealPerson5"
                                            name="idealPersonality"
                                            value="5"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealPersonality === '5'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealPerson5" title="5 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealPerson4"
                                            name="idealPersonality"
                                            value="4"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealPersonality === '4'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealPerson4" title="4 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealPerson3"
                                            name="idealPersonality"
                                            value="3"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealPersonality === '3'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealPerson3" title="3 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealPerson2"
                                            name="idealPersonality"
                                            value="2"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealPersonality === '2'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealPerson2" title="2 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealPerson1"
                                            name="idealPersonality"
                                            value="1"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealPersonality === '1'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealPerson1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">外交的</span>
                                </div>

                                <p>金銭感覚</p>
                                <div className="rating-row">
                                    <span className="label-left">節約家</span>
                                    <div className="rating circle">
                                        <input
                                            type="radio"
                                            id="idealFinan5"
                                            name="idealFinancialSense"
                                            value="5"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealFinancialSense === '5'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealFinan5" title="5 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealFinan4"
                                            name="idealFinancialSense"
                                            value="4"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealFinancialSense === '4'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealFinan4" title="4 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealFinan3"
                                            name="idealFinancialSense"
                                            value="3"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealFinancialSense === '3'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealFinan3" title="3 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealFinan2"
                                            name="idealFinancialSense"
                                            value="2"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealFinancialSense === '2'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealFinan2" title="2 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealFinan1"
                                            name="idealFinancialSense"
                                            value="1"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealFinancialSense === '1'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealFinan1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">浪費家</span>
                                </div>

                                <p>主体性</p>
                                <div className="rating-row">
                                    <span className="label-left">受動的</span>
                                    <div className="rating circle">
                                        <input
                                            type="radio"
                                            id="idealInitia5"
                                            name="idealInitiative"
                                            value="5"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealInitiative === '5'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealInitia5" title="5 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealInitia4"
                                            name="idealInitiative"
                                            value="4"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealInitiative === '4'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealInitia4" title="4 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealInitia3"
                                            name="idealInitiative"
                                            value="3"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealInitiative === '3'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealInitia3" title="3 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealInitia2"
                                            name="idealInitiative"
                                            value="2"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealInitiative === '2'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealInitia2" title="2 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealInitia1"
                                            name="idealInitiative"
                                            value="1"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealInitiative === '1'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealInitia1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">主体的</span>
                                </div>

                                <p>婚活真剣度</p>
                                <div className="rating-row">
                                    <span className="label-left">低め</span>
                                    <div className="rating circle">
                                        <input
                                            type="radio"
                                            id="idealMarr5"
                                            name="idealMarriageIntent"
                                            value="5"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealMarriageIntent === '5'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealMarr5" title="5 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealMarr4"
                                            name="idealMarriageIntent"
                                            value="4"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealMarriageIntent === '4'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealMarr4" title="4 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealMarr3"
                                            name="idealMarriageIntent"
                                            value="3"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealMarriageIntent === '3'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealMarr3" title="3 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealMarr2"
                                            name="idealMarriageIntent"
                                            value="2"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealMarriageIntent === '2'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealMarr2" title="2 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealMarr1"
                                            name="idealMarriageIntent"
                                            value="1"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealMarriageIntent === '1'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealMarr1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">高め</span>
                                </div>


                                <p>喫煙</p>
                                <div className="rating-row">
                                    <span className="label-left">まったく吸わない</span>
                                    <div className="rating circle">
                                        <input
                                            type="radio"
                                            id="idealSmo5"
                                            name="idealSmoker"
                                            value="5"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealSmoker === '5'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealSmo5" title="5 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealSmo4"
                                            name="idealSmoker"
                                            value="4"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealSmoker === '4'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealSmo4" title="4 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealSmo3"
                                            name="idealSmoker"
                                            value="3"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealSmoker === '3'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealSmo3" title="3 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealSmo2"
                                            name="idealSmoker"
                                            value="2"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealSmoker === '2'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealSmo2" title="2 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealSmo1"
                                            name="idealSmoker"
                                            value="1"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealSmoker === '1'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealSmo1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">よく吸う</span>
                                </div>

                                <p>飲酒</p>
                                <div className="rating-row">
                                    <span className="label-left">まったく飲まない</span>
                                    <div className="rating circle">
                                        <input
                                            type="radio"
                                            id="idealAlc5"
                                            name="idealAlcohol"
                                            value="5"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealAlcohol === '5'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealAlc5" title="5 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealAlc4"
                                            name="idealAlcohol"
                                            value="4"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealAlcohol === '4'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealAlc4" title="4 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealAlc3"
                                            name="idealAlcohol"
                                            value="3"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealAlcohol === '3'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealAlc3" title="3 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealAlc2"
                                            name="idealAlcohol"
                                            value="2"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealAlcohol === '2'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealAlc2" title="2 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealAlc1"
                                            name="idealAlcohol"
                                            value="1"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealAlcohol === '1'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealAlc1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">よく飲む</span>
                                </div>

                                <p>ギャンブル</p>
                                <div className="rating-row">
                                    <span className="label-left">まったくしない</span>
                                    <div className="rating circle">
                                        <input
                                            type="radio"
                                            id="idealGam5"
                                            name="idealGamble"
                                            value="5"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealGamble === '5'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealGam5" title="5 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealGam4"
                                            name="idealGamble"
                                            value="4"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealGamble === '4'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealGam4" title="4 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealGam3"
                                            name="idealGamble"
                                            value="3"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealGamble === '3'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealGam3" title="3 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealGam2"
                                            name="idealGamble"
                                            value="2"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealGamble === '2'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealGam2" title="2 stars">〇</label>

                                        <input
                                            type="radio"
                                            id="idealGam1"
                                            name="idealGamble"
                                            value="1"
                                            style={{ display: 'none' }}
                                            checked={this.state.idealGamble === '1'}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="idealGam1" title="1 star">〇</label>
                                    </div>
                                    <span className="label-right">よくする</span>
                                </div>

                                <h3>運転免許</h3>
                                <select
                                    name="idealDriverLicense"
                                    value={this.state.idealDriverLicense}
                                    onChange={this.handleChange}
                                >
                                    <option value="0">未設定</option>
                                    <option value="1">はい</option>
                                    <option value="2">どちらでもよい</option>
                                    <option value="3">いいえ</option>
                                </select>

                                <h3>転勤の有無</h3>
                                <select
                                    name="idealTransferable"
                                    value={this.state.idealTransferable}
                                    onChange={this.handleChange}
                                >
                                    <option value="0">未設定</option>
                                    <option value="1">はい</option>
                                    <option value="2">どちらでもよい</option>
                                    <option value="3">いいえ</option>
                                </select>

                                <h3>既婚歴</h3>
                                <select
                                    name="idealHasDivorce"
                                    value={this.state.idealHasDivorce}
                                    onChange={this.handleChange}
                                >
                                    <option value="0">未設定</option>
                                    <option value="1">はい</option>
                                    <option value="2">どちらでもよい</option>
                                    <option value="3">いいえ</option>
                                </select>

                                <h3>子供の有無</h3>
                                <select
                                    name="idealHasChildren"
                                    value={this.state.idealHasChildren}
                                    onChange={this.handleChange}
                                >
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