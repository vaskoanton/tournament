import React, { Component } from 'react'
import TournamentData from '../storage'
import Constants from '../constants/constants'
import TournamentTourComponent from '../components/tournamentTourComponent'
import TournamentDoubleTourComponent from '../components/tournamentDoubleTourComponent'
import TournamentTree from '../bll/tournamentTree'
import TournamentTeams from '../bll/tournamentTeams'
import TournamentGroup from '../bll/tournamentGroup'
import TournamentTour from '../bll/tournamentTour'
import '../styles/tournament.css'

class Tournament extends Component{

    tournament = {};
    tournamentTree = {};
    tournamentTeams = {};
    tournamentGroup = {};
    tournamentTour = {};
    tournamentTypes = Constants.tournamentType;
    tournamentSettings = Constants.tournamentSettings;

    constructor(props) {
        super(props);

        this.state = {
            tours: [],
            matches: [],
            groups: [],
            finalGroup: [],
            doubleEliminationGroups: []
        };
    }

    componentWillMount(){
        if(!TournamentData.isAlive()) {
            this.props.history.push("/");
        }
        else{
            this.tournament  = TournamentData.getTournament();
            this.tournamentGroup = new TournamentGroup();
            this.tournamentTour = new TournamentTour();
            this.tournamentTree = new TournamentTree(this.tournament, this.tournamentSettings.maxTeams, this.tournamentSettings.minTeams);
            this.tournamentTeams = new TournamentTeams(this.tournament, this.tournamentSettings.maxTeams, this.tournamentSettings.minTeams);
        }
    }

    componentDidMount() {
        if(TournamentData.isAlive()) {
            let matches = this.tournamentTree.getSingleEliminationTree();
            this.setState({matches: matches});

            let groups = this.tournamentGroup.generateTournamentGroups(matches);

            if (this.tournament.type === this.tournamentTypes.double) {
                let doubleTournamentMatches = this.prepareDoubleTournamentMatches(matches);
                let finalMatch = this.tournamentTree.getFinalTree(matches, doubleTournamentMatches);
                let finalMatchGroups = this.tournamentGroup.generateTournamentGroups(finalMatch, this.tournamentTeams.calculateTeamsCount() - 1)[0];

                this.setState({groups: groups});
                this.setState({finalGroup: finalMatchGroups});
                this.setState({doubleEliminationGroups: doubleTournamentMatches}, () => {
                    this.setState({tours: this.tournamentTour.generateTours(this.tournament, this.state.matches)});
                });

            }
            else {
                this.setState({groups: groups}, () => {
                    this.setState({tours: this.tournamentTour.generateTours(this.tournament, this.state.matches)});
                });
            }
        }
    }

    prepareDoubleTournamentMatches(matches){
        let doubleTournamentMatches = this.tournamentTree.getDoubleEliminationTree(matches);
        let leftLast = 0;
        let rightLast = 0;

        for(let match of doubleTournamentMatches){
            let leftLength = (match.left.length / 2);
            let rightLength = (match.right.length / 2);

            //Divide participants on two parts.
            match.left = this.tournamentGroup.generateTournamentGroups([match.left], leftLast)[0];
            match.right = this.tournamentGroup.generateTournamentGroups([match.right], rightLast)[0];

            //Increment match number
            leftLast = leftLast + (leftLength + rightLength);
            rightLast =  rightLength > 0 ? leftLast + (rightLength):leftLast + (leftLength + rightLength);
        }

        return doubleTournamentMatches;
    }

    getTourClassName(tour){
        if(tour.isPreFinal) return "pre tournament-tour";
        else if(tour.isFinal) return "final tournament-tour";
        else return "tournament-tour";
    }

    isFinalMatchVisible(tour){
        return tour.id === this.state.tours.length - 1;
    }

    isFinalRelationVisible(tour){
        return tour.id === this.state.tours.length - 2;
    }

    getTour(tour){
        if(this.tournament.type === this.tournamentTypes.double)
        {
            tour.className = tour.isFinal ? "final": tour.className;

            return (
                <div className="tournament-type">
                    <div className="single-elimination-group">
                        <TournamentTourComponent data={this.state.groups[tour.id]} tour={tour}/>
                    </div>
                    {
                        this.isFinalMatchVisible(tour) ?
                        <div>
                            <TournamentTourComponent data={this.state.finalGroup} tour={tour}/>
                        </div> : ''
                    }

                    <div className="double-elimination-group">
                        <TournamentDoubleTourComponent data={this.state.doubleEliminationGroups} tour={tour} />
                    </div>

                    {
                      this.isFinalRelationVisible(tour) ? <div className="tournament-final-relation" /> : ''
                    }
                </div>
            );
        }

        return (
            <div className="tournament-type">
                <div className="single-elimination-group">
                    <TournamentTourComponent data={this.state.groups[tour.id]} tour={tour}/>
                </div>
            </div>
        );
    }

    render(){
        return (
            <div className="tournament-grid" id="style-1">

                {
                    this.state.tours.map((tour, i) => {
                        return (
                            <div className={this.getTourClassName(tour)} key={i}>
                                <div className="tournament-tour-name">
                                    <span>{tour.name}</span>
                                </div>
                                {
                                    this.getTour(tour)
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Tournament;