import React from 'react'
// import ReactDOM from 'react-dom'
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { Line } from 'react-chartjs-2';
import logo from './logo.svg';
import './App.css';
import datas from './jsonDataAll.json';
import Station from './components/station';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      selected: datas.results[0]
    };

    // this.searchString = this.searchString.bind(this);
  }

  handleSearchChange(e) {
    let value = e.target.value
    this.setState({
      searchString: value
    });
  }

  selectStation = (data) => {
    this.setState({
      selected: data
    });
  }

  render() {
    let dataChart = {
      labels: this.state.selected.prices.map(a => a.dateRecorded),
      datasets: [
        {
          label: 'Bencin 95',
          data: this.state.selected.prices.map(a => a["95"]),
          fill: false,
          backgroundColor: 'red',
          borderColor: 'red',
        },
        {
          label: 'Bencin 100',
          data: this.state.selected.prices.map(a => a["100"]),
          fill: false,
          backgroundColor: "blue",
          borderColor: 'blue',
        },
        {
          label: 'dizel',
          data: this.state.selected.prices.map(a => a["dizel"]),
          fill: false,
          backgroundColor: 'green',
          borderColor: 'green',
        }
      ],
    };
    
    const options = {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    };

    let data = datas.results.filter((d, i) => {
      return d.name.toLocaleLowerCase().includes(this.state.searchString.toLocaleLowerCase()) || d.address.toLocaleLowerCase().includes(this.state.searchString.toLocaleLowerCase());
    })

    return (
      <div className="App">
        <div className="search">
        <input type="text" onChange={(e) => this.handleSearchChange(e)}/>
        <div style={{maxHeight:"90vh", overflow: "scroll", width:"400px"}}>
        {data.map((b, index) => {
          return <Station stationData={b} onSelectStation={this.selectStation}/>
        })}
        </div>
        </div>
        <div className="chart" style={{width:"100%"}}>
          <div>{this.state.selected.name}</div>
          <Line data={dataChart} options={options} />
        </div>
      </div>
    )
  }
}

export default App;
