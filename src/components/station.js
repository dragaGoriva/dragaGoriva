import React from 'react'
import './compCss/station.css'
import GasPrice from './GasPrice';

class Station extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // stationData
  //   // onSelectStation
  //   // selectedId
 
  //   // this.state = {
  //   //   isShow: true,
  //   // };
  // }

  selection = () => {
    this.props.onSelectStation(this.props.stationData)
  }

  render() {

    return (
      <div className="Station" onClick={this.selection} style={this.props.selectedId === this.props.stationData.pk ? {backgroundColor:"#d3d3d3"}: {}}>
        <div id="Name">{this.props.stationData.name} </div>
        <div id="Address">{this.props.stationData.address}</div>
        <div className="prices">
          {Object.keys(this.props.stationData.prices[this.props.stationData.prices.length - 1]).map(key => 
            {
              if(this.props.stationData.prices[this.props.stationData.prices.length - 1][key] != null && key !== "dateRecorded")
                return <GasPrice gasKey={key} price={this.props.stationData.prices[this.props.stationData.prices.length - 1][key]}/>
              return undefined
            }
          )}
        </div>
      </div>
    )
  }
}

export default Station;
