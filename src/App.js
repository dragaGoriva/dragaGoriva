import React from 'react'
// import ReactDOM from 'react-dom'
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { Line } from 'react-chartjs-2';
import './App.css';
import datas from './jsonDataAll.json';
import names from './stationNames.json';
import Station from './components/station';

import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      selected: datas.results[0],
      selectedId: datas.results[0].pk,
      stationName: [],
      fuelType: [],
      myPos: undefined,
      distanceValue: 0,
      allData: undefined
    };
  }

  componentDidMount() {
    if(this.state.allData === undefined) {
      fetch("https://raw.githubusercontent.com/dragaGoriva/dragaGoriva/main/src/jsonDataAll.json").then(res => {
        // console.log("res", res.json());
        // this.setState({allData: res.json()});
        return res.json();
      }).then(myJson => {
        this.setState({allData: myJson});
        this.setState({ selected: myJson.results[0] })
        this.setState({ selectedId: myJson.results[0] }.pk)
      })
    }
  }

  handleSearchChange(e) {
    let value = e.target.value
    this.setState({
      searchString: value
    });
  }

  handleChange(e, d) {
    let arr = this.state.stationName;
    let value = d.props.value;
    console.log(arr.indexOf(value))
    if (arr.indexOf(value) === -1)
      arr.push(value)
    else
      arr.splice(arr.indexOf(value), 1)
    console.log(arr)

    this.setState({
      stationName: arr
    })
  }

  handleChangeFuel(e, d) {
    let arr = this.state.fuelType;
    let value = d.props.value;
    console.log(arr.indexOf(value))
    if (arr.indexOf(value) === -1)
      arr.push(value)
    else
      arr.splice(arr.indexOf(value), 1)
    console.log(arr)

    this.setState({
      fuelType: arr
    })
  }

  handleChangeDistance(e) {
    this.setState({
      distanceValue: e.target.value
    })
  }

  getGeoLocation = () => {
    let lat = undefined
    let lng = undefined
    console.log("aa")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos.coords.latitude)
        console.log(pos.coords.longitude)
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
        this.setState({
          myPos: [lat, lng]
        })
      })
    }
  }

  clearGeo = () => {
    this.setState({
      myPos: undefined
    })
  }

  selectStation = (data) => {
    console.log("data", data)
    this.setState({
      selected: data,
      selectedId: data.pk
    });
  }

  CalculateDistance(lat2, long2) {
    let lat1 = this.state.myPos[0];
    let long1 = this.state.myPos[1];
    let dist = this.state.distanceValue;

    // Translate to a distance
    var distance = Math.sin(lat1 * Math.PI) * Math.sin(lat2 * Math.PI) + Math.cos(lat1 * Math.PI) * Math.cos(lat2 * Math.PI) * Math.cos(Math.abs(long1 - long2) * Math.PI);
    // Return the distance in miles
    //return Math.acos(distance) * 3958.754;

    // Return the distance in meters
    // console.log(dist);
    // console.log(Math.acos(distance) * 6370981.162);
    return Math.acos(distance) * 6370981.162 / 100 < dist;
  } // CalculateDistance

  render() {

    const gasNames = [
      {
        name: "NMB-95",
        key: "95"
      },
      {
        name: "Dizel",
        key: "dizel"
      },
      {
        name: "NMB-98",
        key: "98"
      },
      {
        name: "NMB-100",
        key: "100"
      },
      {
        name: "Dizel Premium",
        key: "dizel-premium"
      },
      {
        name: "Avtoplin LPG",
        key: "avtoplin-lpg"
      },
      {
        name: "Ekstra lahko kurilno olje",
        key: "KOEL"
      },
    ]

    const distance = [
      {
        key: 9999999999999,
        name: "Prikaži vse"
      },
      {
        key: 1000,
        name: "1 km"
      },
      {
        key: 5000,
        name: "5 km"
      },
      {
        key: 10000,
        name: "10 km"
      },
      {
        key: 15000,
        name: "15 km"
      },
      {
        key: 20000,
        name: "20 km"
      },
      {
        key: 50000,
        name: "50 km"
      },
      {
        key: 100000,
        name: "100 km"
      }
    ]

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
    
    let data = this.state.allData !== undefined ? this.state.allData.results.filter((d, i) => {
      let hasThisFuel = [false];
      if (this.state.fuelType.length > 0) {
        hasThisFuel = this.state.fuelType.map((f, i) => {
          if (d.prices[d.prices.length - 1][f] != null) {
            return true
          }
        });
      }
      hasThisFuel = hasThisFuel.includes(true);
      // console.log("hasThisFuel", hasThisFuel)
      if (this.state.myPos !== undefined) {
        console.log(this.CalculateDistance(d.lat, d.lng))
      }
      // console.log("loc", this.state.myPos)
      return (d.name.toLocaleLowerCase().includes(this.state.searchString.toLocaleLowerCase()) ||
        d.address.toLocaleLowerCase().includes(this.state.searchString.toLocaleLowerCase())) &&
        (this.state.stationName.length > 0 ? this.state.stationName.indexOf(d.franchise) !== -1 : true) &&
        (this.state.fuelType.length > 0 ? hasThisFuel : true) &&
        (this.state.myPos !== undefined ? this.CalculateDistance(d.lat, d.lng) : true)
    }) : undefined;


    return (
      <div className="App">
        <div className="leftSide">
          <div className="leftSearch">
            <TextField id="standard-basic" label="Išči" variant="outlined" style={{ margin: "8px", background: "white" }} onChange={(e) => this.handleSearchChange(e)} />

            <FormControl sx={{ m: 1 }} style={{ background: "white" }}>
              <InputLabel id="demo-multiple-checkbox-label" shrink={this.state.stationName.length > 0 ? true : false}>Prodajalec</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                fullWidth
                value={this.state.stationName}
                onChange={(e, d) => this.handleChange(e, d)}
                input={<OutlinedInput label="Prodajalec" notched={this.state.stationName.length > 0 ? true : false} />}
                renderValue={(selected) => {
                  let arr = [];
                  selected.forEach(s => {
                    let sName = names.find(n => n.pk === s);
                    arr.push(sName.name)
                  })
                  return arr.join(", ")
                }}
                MenuProps= {{
                  style: {
                    maxHeight: "70vh",
                  }
                }}
              >
                {names.map((name) => (
                  <MenuItem key={name.name} value={name.pk}>
                    <Checkbox checked={this.state.stationName.indexOf(name.pk) > -1} />
                    <ListItemText primary={name.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1 }} style={{ background: "white" }}>
              <InputLabel id="demo-multiple-checkbox-label" shrink={this.state.fuelType.length > 0 ? true : false}>Tip goriva</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                fullWidth
                value={this.state.fuelType}
                onChange={(e, d) => this.handleChangeFuel(e, d)}
                input={<OutlinedInput label="Prodajalec" notched={this.state.fuelType.length > 0 ? true : false} />}
                renderValue={(selected) => {
                  let arr = [];
                  selected.forEach(s => {
                    let sName = gasNames.find(n => n.key === s);
                    arr.push(sName.name)
                  })
                  return arr.join(", ")
                }}
              >
                {gasNames.map((name) => (
                  <MenuItem key={name.name} value={name.key}>
                    <Checkbox checked={this.state.fuelType.indexOf(name.key) > -1} />
                    <ListItemText primary={name.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ margin: "0px auto", display: "flex", alignItems: "center" }}>
              {/* <TextField id="standard-basic" variant="outlined" value={this.state.myPos !== undefined ? this.state.myPos : ""} disabled fullWidth /> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Oddaljenost</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.distanceValue}
                  label="Oddaljenost"
                  onChange={(e) => this.handleChangeDistance(e)}
                >
                  {distance.map((d) => (
                    <MenuItem value={d.key}>{d.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {this.state.myPos !== undefined ? <Button variant="contained" onClick={this.clearGeo} color="error" style={{ margin: "12px" }}>Počisti</Button> : <Button variant="contained" onClick={this.getGeoLocation} style={{ margin: "12px" }}>Moja lokacija</Button>}
            </div>
            <div style={{ marginBottom: "8px" }}></div>

          </div>
          <div className="StationWrap">
            {data !== undefined ? data.map((b, index) => {
              return <Station stationData={b} onSelectStation={this.selectStation} selectedId={this.state.selectedId} />
            }) : <div></div>}
          </div>
        </div>
        <div className="chart">
            <div>{this.state.selected.name}</div>
            {this.state.allData === undefined ? <div></div> : <Line data={dataChart} options={options} />}
        </div>
      </div>
    )
  }
}

export default App;
