import React, { Component } from 'react'
import TournamentGroup from '../components/tournamentGroupComponent'
import Constants from '../constants/constants';
import $ from 'jquery'

class TournamentTour extends Component{

    constructor(props){
        super(props);

        this.state = {
            tour: {},
            data: []
        };
    }

    componentWillMount(){
        this.setState({tour:this.props.tour});
        this.setState({data:this.props.data});
    }

    componentDidMount(){
        let curTour = $(".pre.tournament-tour").get();
        let doubleEl = $(curTour).find(".double-elimination-group");
        let singleEl = $(curTour).find(".single-elimination-group .tournament-match");
        let lineHeight = ($(doubleEl).outerHeight(true) - (singleEl.height() / 2));
        let tourHeaderHeight =  $(".tournament-header").outerHeight();
        let tourNameHeight = $(curTour).find(".tournament-tour-name").outerHeight();

        if(this.state.tour.isPreFinal && this.state.tour.mode === Constants.tournamentType.double){
            let lineMargin = (singleEl.offset().top + (singleEl.height() / 2)) - tourNameHeight - tourHeaderHeight - 28.5;
            $(curTour).find(".tournament-final-relation").css("margin-top", lineMargin);
            $(curTour).find(".tournament-final-relation").css("height", lineHeight);
            $(curTour).find(".tournament-match").css("padding-right", "20px");
        }
        else if(this.state.tour.isFinal){
            let groupMargin = singleEl.offset().top + (lineHeight / 2) + (singleEl.height() / 2) - tourNameHeight - tourHeaderHeight - 75;
            $(".final.tournament-tour").find(".single-elimination-group .tournament-match-group").css("margin-top", groupMargin);
        }
    }

    render() {
           return  <TournamentGroup data={this.state.data} tour={this.state.tour} />
    }
}

export default TournamentTour;