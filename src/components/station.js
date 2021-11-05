import React from 'react'

class Station extends React.Component {
  constructor(props) {
    super(props);
    //stationData
    //onSelectStation
 
    // this.state = {
    //   isShow: true,
    // };
  }

  selection = () => {
    this.props.onSelectStation(this.props.stationData)
  }

  render() {

    return (
      <div className="Station" onClick={this.selection}>
        <div id="Name">{this.props.stationData.name} </div>
        <div id="Address">{this.props.stationData.address}</div>
      </div>
    )
  }
}

export default Station;
