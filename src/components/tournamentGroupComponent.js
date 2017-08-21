import React, { Component } from 'react';
import Common from '../common.js';
import Constants from '../constants/constants';
import $ from 'jquery';

class TourGroup extends Component{

    constructor(props){
        super(props);

        this.state = {
            matches: [],
            tour: {},
            groupClassName: '',
            relationClassName: ''
        };
    }

    componentWillMount(){
        this.setState({matches:this.props.data});
        this.setState({tour:this.props.tour});

        this.setState({groupClassName:this.getGroupClassName(this.props.tour.className)});
        this.setState({relationClassName:this.getRelationClassName(this.props.tour.className)});
        this.setState({tourClassName:this.getTournamentClassName(this.props.tour.className)});
    }

    componentDidMount(){
            let tour = $("." + this.props.tour.className);
            let singleRelation = tour.find(".tournament-single-relation").get();

            if(singleRelation.length > 0){
                tour.parent().css("padding-right",0);
            }
    }

    getRelation(){

        if(this.isRelationVisible()){
            return (
                <div className="tournament-group-relation">
                    <div className={this.state.relationClassName} />
                    <div className="tournament-participant-relation-line" />
                </div>
            );
        }
        else if(this.isSingleRelationVisible()) {
            return  <div className='tournament-single-relation' />
        }
    }

    getGroupClassName(className) {
        return `${className} tournament-match-group-items`;
    }

    getRelationClassName(className){
        return `${className} tournament-participant-relation`;
    }

    getTournamentClassName(className){
        return `${className} tournament-match-group`;
    }

    getParticipantClassName(team){
        return team.isWinner ? 'winner tournament-participant' : 'tournament-participant';
    }

    isRelationVisible(){
        let tour = this.state.tour;
        return (this.state.matches[0].length > 1 && !tour.isPreFinal && !tour.isFinal) || (tour.mode === Constants.tournamentType.single && tour.isPreFinal);
    }

    isSingleRelationVisible(){
        return Common.getNodeTeamsCount(this.state.matches) === 2 && !this.state.tour.isPreFinal && !this.state.tour.isFinal;
    }

    render(){
        return (
            <div className="tournament-matches">
                {
                    this.state.matches.map((group, i) => {
                        return (
                            <div key={i} className={this.state.tourClassName}>
                                <div className={this.state.groupClassName}>
                                    {group.map((match, i) => {
                                        return (
                                            <div className="tournament-match" key={i}>
                                                <div className="tournament-match-id">
                                                    <span>{match.id}</span>
                                                </div>
                                                <div className="tournament-participants">
                                                    <div className="tournament-participants-group">
                                                        {
                                                            match.teams.map((team, i) => {
                                                                return (
                                                                    <div key={i} className={this.getParticipantClassName(team)}>
                                                                        <div className="tournament-participant-label">
                                                                            <span>{team.id}</span>
                                                                        </div>
                                                                        <div className="tournament-participant-name">
                                                                            <span>{team.name}</span>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                    }
                                </div>
                                {
                                    this.getRelation(this.state.relationClassName)
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default TourGroup;