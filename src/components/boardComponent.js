import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import history from '../history.js'
import Tournament from './tournamentComponent'
import Form from './formComponent'
import NotFound from './notFoundComponent'
import RouteConstants from '../constants/routes'
import Extensions from '../extensions'
import '../styles/board.css'

class Board extends Component {

    constructor(props){
        super(props);
        this.routs = RouteConstants.routes;
        Extensions.registerExtensions();
    }

    render(){
        return (
            <div className="tournament-board">
                <Router history={history}>
                    <Switch>
                        <Route exact path={this.routs.home} component={Form}/>
                        <Route path={this.routs.tournament} component={Tournament}/>
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Board;