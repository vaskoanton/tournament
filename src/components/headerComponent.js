import React, { Component } from 'react';
import TournamentData from '../storage';
import RoutesConstants from '../constants/routes';
import history from '../history.js';
import '../styles/header.css';


class Header extends Component{

    constructor(props){
        super(props);

        this.routes = RoutesConstants.routes;
        this.state = {
            tournament: {
                name: ''
            },
            exitButtonStyle: {}
        };
    }

    componentWillMount(){
        let tournament = TournamentData.getTournament();

        if(tournament){
            this.setState({tournament: tournament});
        }

        TournamentData.changeListener((data) => {
            if(data){
                this.setState({tournament: data});
            }
            else{
                let tournament = this.state.tournament;
                tournament.name = "";
                this.setState({
                    tournament: tournament
                });
            }
            this.updateExitButtonVisibility();
        });

        this.updateExitButtonVisibility();
    }

    redirectToHome(){
        TournamentData.removeTournament();
    }

    updateExitButtonVisibility() {
        let isExitButtonVisible = TournamentData.isAlive()
            && ((history.location.pathname === this.routes.tournament) || (history.location.pathname === this.routes.home));

        if(isExitButtonVisible) this.setState({exitButtonStyle: {display : 'block'}});
        else this.setState({exitButtonStyle: {display : 'none'}});
    }

    render(){
        return (
            <div className="tournament-header">
                <div className="tournament-label">
                    <span>{this.state.tournament.name} tournament</span>
                </div>
                <div className="tournament-header-controls">
                    <a href={this.routes.home} onClick={this.redirectToHome} style={this.state.exitButtonStyle}>Exit</a>
                </div>
            </div>
        );
    }
}

export default Header;