import React , { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
const useStyles = theme =>({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: '#ffffff',
      height:'300px',
      backgroundColor:'#583d72',
      fontWeight:'300'
    }
  });

 class Home extends Component {
    constructor(props) {
      super(props)
      this.state = {
        lists:[],
        data:{}
      }
    }

    
    componentDidMount(){
      axios.get('https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true')
      .then((response)=> response.data)
      .then((res) =>{
        let {regionData} = res;
        this.setState({
          lists: regionData,
          data:res
        });
      });
    }
    
    
    render() {
      const {classes} = this.props;
      return (
        <div>
          <img src="https://civilresolutionbc.ca/wp-content/uploads/2020/03/covid-19.png" alt="Covid" style={{width:'100px',display:'inline'}} /><h1 style={{fontWeight:'300'}}>COVID19-App</h1>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4} md={4} style={{fontWeight:'300'}}><h3 style={{color:'red'}}>Total Active Cases: {this.state.data.activeCases}</h3></Grid>
            <Grid item xs={12} lg={4} md={4} style={{fontWeight:'300'}}><h3 style={{color:'red'}}>New Active Cases: {this.state.data.activeCasesNew}</h3></Grid>
            <Grid item xs={12} lg={4} md={4} style={{fontWeight:'300'}}><h3 style={{color:'red'}}>No. of Deaths: {this.state.data.deaths}</h3></Grid>
            <Grid item xs={12} lg={4} md={4} style={{fontWeight:'300'}}><h3 style={{color:'green'}}>Total Recovered: {this.state.data.recovered}</h3></Grid>
            <Grid item xs={12} lg={4} md={4} style={{fontWeight:'300'}}><h3 style={{color:'green'}}>New Recovered: {this.state.data.recoveredNew}</h3> </Grid>
          </Grid>
     
          <Grid container spacing={2}>
           {this.state.lists.map((x,index)=> {
             return(
                  <Grid key={index} item xs={12} lg={4} md={4}>
                <Paper className={classes.paper} id="paper">
                <h4>{x.region}</h4>
                  <Grid container spacing={1}>
                  <Grid item xs={6} lg={6} md={6}><h5>Total Infected: {x.totalInfected}</h5></Grid>
                  <Grid item xs={6} lg={6} md={6}><h5>New Infected: {x.newInfected}</h5></Grid>
                  <Grid item xs={6} lg={6} md={6}><h5>Recovered: {x.recovered}</h5></Grid>
                  <Grid item xs={6} lg={6} md={6}><h5>New Recovered: {x.newRecovered}</h5></Grid>
                  <Grid item xs={6} lg={6} md={6}><h5>Deceased: {x.deceased}</h5></Grid>
                  </Grid>
                </Paper>
                </Grid>
             );
           })}  
            </Grid>
        </div>
      );
    }
  }
  
 export default  withStyles(useStyles) (Home)

  




