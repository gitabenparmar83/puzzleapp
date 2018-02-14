import React, { Component } from 'react';
import './App.css';

import Puzzle from './puzzle';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalBox: 3
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let total = Number(event.target.value);
        if (!total || (total >= 2 && total <= 8)) {
            this.setState({
                totalBox: total,
            });
        }

    };

    render() {
        return (
            <div className='puzzle-wrp'>
                <div className="App-header">
                    <center>
                        <label>Puzzle size : </label>
                        <input type="number" value={this.state.totalBox} items={this.state.items} onChange={this.handleChange}/>
                    </center>
                </div>
                <div className="main-container" style={{ width: this.state.totalBox * 62 }}>
                    <Puzzle totalBox={this.state.totalBox} />
                </div>
            </div>
        );
    }
}

export default App;
