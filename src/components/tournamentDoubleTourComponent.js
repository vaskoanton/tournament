import React, { Component } from 'react';
import Constants from '../constants/constants'
import TournamentTour from '../components/tournamentTourComponent';
import Common from '../common.js';

class TournamentDoubleTour extends Component{

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

    getTourComponent(){
        let tourData = this.state.data[this.state.tour.id];
        let firstTour = Object.create(this.state.tour);
        let secondTour = Object.create(this.state.tour);
        let tourClassNames = Constants.tournamentTours;

        if(!tourData) return <TournamentTour data={[]} tour={this.state.tour} />;

        switch(this.state.tour.className){
            case tourClassNames.second: {
                firstTour.className = 'first-double';
                secondTour.className = 'second-double';
                return this.getTournamentTourTree(tourData, firstTour, secondTour);
            }
            case tourClassNames.third:{
                firstTour.className = 'third-double';
                secondTour.className = 'fourth-double';
                return this.getTournamentTourTree(tourData, firstTour, secondTour);
            }
            case tourClassNames.fourth:{
                firstTour.className = 'fifth-double';
                secondTour.className ='sixth-double';
                if(Common.getNodeTeamsCount(tourData.left) >= 4 && Common.getNodeTeamsCount(tourData.right) >= 2){
                    firstTour.className = 'fifth-double-group';
                    secondTour.className ='sixth-double-group';
                }
                return this.getTournamentTourTree(tourData, firstTour, secondTour);
            }
            case tourClassNames.fifth:{
                if(Common.getNodeTeamsCount(tourData.left) === 2) firstTour.className = 'seventh-double-group';
                else firstTour.className = 'seventh-double';

                secondTour.className = 'eighth-double';
                return this.getTournamentTourTree(tourData, firstTour, secondTour);
            }
            case tourClassNames.sixth:{
                if(Common.getNodeTeamsCount(tourData.left) === 2) firstTour.className = 'ninth-double-group';
                else firstTour.className = 'ninth-double';

                secondTour.className = 'tenth-double';
                return this.getTournamentTourTree(tourData, firstTour, secondTour);
            }
            case tourClassNames.seventh: {
                firstTour.className = 'eleventh-double';
                return  <TournamentTour data={tourData.left} tour={firstTour} />;
            }
            default: return <TournamentTour data={tourData.left} tour={this.state.tour} />;
        }
    }

    getTournamentTourTree(tourData, firstTour, secondTour){
        let left = tourData.left[0];
        let right = tourData.right[0];

        if(left.length > 0 && right.length > 0){
            return  (
                <div className="tournament-double-elimination-group">
                    <TournamentTour data={tourData.left} tour={firstTour}/>
                    <TournamentTour data={tourData.right} tour={secondTour}/>
                </div>
            );
        }
        else if(left.length > 0 && right.length=== 0){
            return  (
                <div className="tournament-double-elimination-group">
                    <TournamentTour data={tourData.left} tour={firstTour}/>
                </div>
            );
        }
    }

    render(){
        return this.getTourComponent();
    }
}

export default TournamentDoubleTour;