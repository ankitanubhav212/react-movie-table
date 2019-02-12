import React, { Component } from 'react';
import { movies } from '../../src/data'
import  {CreateTable}  from './create.table';
import axios from 'axios'

export class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            filteredData:[],
            headers:[],
            pageNo:0
        }
    }

    componentDidMount() {
      const moviesList = movies;
      const headers = Object.keys(moviesList[0]);
      console.log(headers);
      let data=[]; 
      moviesList.forEach((obj) => data.push(Object.values(obj)));
      this.setState({
          data: data,
          headers:headers
      })
    }
    
    handleSort(key,sort) {
        // function for dynamic sorting
    function compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA < varB) {
        comparison = 1;
      } else if (varA > varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  } 
    const movies = this.state.data;
    movies.sort(compareValues(key,sort));
    this.setState({filteredData:movies});
    }

    handleSearch(key,value) {
        const movies=this.state.data.filter(movie => movie[key].trim().toLowerCase().match(value.toLowerCase()));  
        this.setState({filteredData:movies});  
    }

    pageChange(n){
      if(n>=0) {
        console.log(this.state.pageNo+1);
        const movie=[];
        const pageSize = 10;
        const start = 10 * n;
        for(var i=start; i<pageSize+start; i++) {
          movie.push(this.state.data[i]);
        }
        this.setState({
          filteredData: movie
        })
        
      } 
    }

    render() {
        
        return(
            <div className = "container">
                <CreateTable callbackSort={(e,sort)=>{this.handleSort(e,sort)}}
                            callbackSearch={(key,value)=>{this.handleSearch(key,value)}} 
                            data={this.state.filteredData} 
                            header={this.state.headers}
                            page={this.state.pageNo}
                            callbackChangePage={(n)=>this.pageChange(n)}/>  
            </div>
           
        )
    }

}