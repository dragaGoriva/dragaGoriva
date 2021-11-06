import React from 'react'

class GasPrice extends React.Component {
  constructor(props) {
    super(props);
    // gasKey
    // price
 
    // this.state = {
    //   isShow: true,
    // };
  }

  render() {

    return (
      <div className="gasPrice">
        <div id="price">{this.props.price}</div>
        <div id="key">{this.props.gasKey}</div>
      </div>
    )
  }
}

export default GasPrice;
