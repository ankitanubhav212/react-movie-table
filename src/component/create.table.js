import React, { Component } from 'react';
export class CreateTable extends Component {

    constructor(props) {
        super(props);
        this.state= {
            data:[],
            pageNo:0
        }
    }

    renderRow() {
        return this.props.data.map((row, i) => {
            row = Object.values(row);
            return (
                <tr key={i}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                    <td>{row[4]}</td>
                    <td>{row[5]}</td>
                    <td>{row[6]}</td>
                    <td>{row[7]}</td>
                    <td>{row[8]}</td>
                    <td>{row[9]}</td>
                    <td>{row[10]}</td>
                    <td ><a href={row[11]}>{row[11]}</a></td>
                </tr>

            );
        })
    }

    renderheader() {
        return this.props.header.map((name, i) => {
            return (

                <th key={i}>
                    <div className="dropdown">
                        {name}<div className="dropdown-content">
                            <p id={name} 
                            onClick={(e) => { this.props.callbackSort(e.target.id,'asc') }}>Sort by Asc</p>
                            <p id={name} 
                            onClick={(e) => { this.props.callbackSort(e.target.id,'desc') }}>Sort by Desc</p>
                            <p>
                                <input id={name} placeholder="Search..." 
                                type="text" 
                                onChange={(e) => { this.props.callbackSearch(e.target.id,e.target.value) }}></input>
                            </p>
                        </div>
                    </div>
                </th>
            )
        })
    }
    handleClick(n) {
        const page= this.state.pageNo+n;
        if(page>=0) {
        this.props.callbackChangePage(this.state.pageNo+n);
        this.setState((prevState, props) => ({
            pageNo: prevState.pageNo + n
          }));
        }
    }

    render() {
        return (
            <div>
                <table className="movie-table">
                    <thead>
                        <tr>
                            {this.renderheader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRow()}
                    </tbody>
                </table>
                <div className="container">


                    <button className="pagination"
                     onClick={(e)=> {this.handleClick(-1)}}>❮</button>
                    <button className="pagination" disabled={this.state.next} onClick={(e)=> this.handleClick(1)}>❯</button>



                </div>

            </div>
        )

    }

}