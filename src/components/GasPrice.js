import React from 'react'

class GasPrice extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // gasKey
  //   // price

  //   // this.state = {
  //   //   isShow: true,
  //   // };
  // }

  render() {

    const names = {
      95: "NMB-95",
      dizel: "Dizel",
      98: "NMB-98",
      100: "NMB-100",
      dizelpremium: "Dizel Premium",
      avtoplinlpg: "Avtoplin LPG",
      KOEL: "Ekstra lahko kurilno olje",
      }

    return (
      <div className="gasPrice">
        <div id="price">{this.props.price}</div>
        <div id="key">{names[this.props.gasKey.replace("-", "")]}</div>
      </div>
    )
  }
}

export default GasPrice;
