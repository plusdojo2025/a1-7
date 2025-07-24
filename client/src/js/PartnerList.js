import React from "react";
import axios from "axios";
export default class PartnerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: "",
      marriageStart: "",
      mailAddress: "",
      password1: "",
      password2: "",
      errorMessage: "",
    };
  }
  render() {
    return (
      <div>
        <p>わあ</p>
      </div>
    );
  }
}


//sample
// import React, { Component } from 'react';
// import PartnerFormModal from './PartnerFormModal';

// class PartnerList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       partners: [],
//       showModal: false
//     };
//   }

//   componentDidMount() {
//     fetch('/api/partners')
//       .then(res => res.json())
//       .then(data => {
//         this.setState({ partners: data });
//       });
//   }

//   handleRegister = async (newPartner) => {
//     const res = await fetch('/api/partners', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newPartner)
//     });

//     if (res.ok) {
//       const updatedList = await res.json();
//       this.setState({ partners: updatedList });
//     }
//   };

//   render() {
//     return (
//       <div>
//         <button onClick={() => this.setState({ showModal: true })}>＋ お相手追加</button>

//         <ul>
//           {this.state.partners.map(p => (
//             <li key={p.id}>{p.name}（{p.age}歳）</li>
//           ))}
//         </ul>

//         <PartnerFormModal
//           show={this.state.showModal}
//           handleClose={() => this.setState({ showModal: false })}
//           onRegister={this.handleRegister}
//         />
//       </div>
//     );
//   }
// }

// export default PartnerList;