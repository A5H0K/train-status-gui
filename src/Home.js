import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { Col, Row, Container ,Button} from 'react-bootstrap';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            stationList : null,
            trainList : null,
            listByStation : null,
            displayMessage : ''
        }
    }

    componentDidMount=()=>{
       // this.fetchTrainList();
        this.fetchStationList();
    }

    fetchStationList=()=>{
        var obj = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Origin': ''
            }
          };

        fetch("http://localhost:8080/train/status-service/listAllStations", obj)
        .then(res => res.json())
        .then(
          (result) => {
  
            console.log("The response :: ", result);
            this.setState({
                stationList: result
            });
            console.log("Printing the State ", this.state.stationList);
          },
          (error) => {
            console.log('Printing the error ', error);
          }
        );
    }
    
    fetchTrainList=()=>{

        var obj = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Origin': ''
            }
          };

        fetch("http://localhost:8080/train/status-service/listAllTrains", obj)
        .then(res => res.json())
        .then(
          (result) => {
  
            console.log("The response :: ", result);
            this.setState({
                trainList: result
            });
            console.log("Printing the State ", this.state.trainList);
          },
          (error) => {
            console.log('Printing the error ', error);
          }
        )
    }

    getTrainsByStation = (id) => {

        var obj = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': ''
          }
        };
    
        fetch("http://localhost:8080/train/status-service/findByStation?stationName=" + id, obj)
          .then(res => res.json())
          .then(
            (result) => {
    
              console.log("The response :: ", result);
              this.setState({
                listByStation: result
              });

              if(result.length==0){
                this.setState({displayMessage : 'No Scheduled Trains for the Selected Station..'});
              }
              console.log("Printing the State ", this.state);
            },
            (error) => {
              console.log('Printing the error ', error);
            }
          )
      }

    render(){
        return(<div>

<Container>
  <Row>
    <Col xs={3}>
        {this.state.stationList && this.state.stationList.length>0?
        <div>
        <h2>Stations</h2>
        <Table style={{ cursor: "pointer" }}>
        <tbody>

          {this.state.stationList.map((row, index) => {
            return (
              <tr href="#" key={row.stationCode} onClick={() => this.getTrainsByStation(row.stationCode)}>
                {/* <td>{row.stationName}</td> */}
                <td> <Button variant="primary" size="lg" block>
                {row.stationName}
                 </Button></td>
              </tr>
            );
          })}
        </tbody>
</Table></div>:<div></div>}
      
    </Col>
    <Col xs={9}>
        {this.state.listByStation && this.state.listByStation.length>0?
        <div>
             <Table bordered hover style={{  }}>
        <thead>
            <th>Train code</th>
            <th>Train Name</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Current Location</th>
        </thead>
        <tbody>

          {this.state.listByStation.map((row, index) => {
            return (
              <tr>
                <td>{row.trainCode}</td>
                <td>{row.trainName}</td>
                <td>{row.source}</td>
                <td>{row.destination}</td>
                <td>{row.currentLocation}</td>
              </tr>
            );
          })}
        </tbody>
</Table>
        </div> : <div><h2>{this.state.displayMessage}</h2></div>}
    </Col>
    {/* <Col md="auto">Variable width content</Col> */}
  </Row>
</Container>

                </div>);
    }

}

export default Home;