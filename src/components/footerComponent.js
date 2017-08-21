import React, { Component } from 'react';
import TournamentData from '../storage';
import Constants from '../constants/constants';
import '../styles/footer.css';

class Footer extends Component{

    constructor(){
        super();

        this.state = {
            tournamentMode: ''
        };
    }

    componentDidMount(){
        let tournament = TournamentData.getTournament();

        if(tournament){
            this.setState({
                tournamentMode: tournament.type === Constants.tournamentType.single? "Tournament - Single Elimination Mode" : "Tournament - Double Elimination Mode"
            });
        }

        TournamentData.changeListener((data) => {
            if(data){
                this.setState({
                    tournamentMode: data.type === Constants.tournamentType.single? "Tournament - Single Elimination Mode" : "Tournament - Double Elimination Mode"
                });
            }
        });


    }

    render(){
        return (
            <div className="tournament-footer">
                <div className="tournament-footer-label">
                    <span>{this.state.tournamentMode}</span>
                </div>
            </div>
        );
    }
}

export default Footer;