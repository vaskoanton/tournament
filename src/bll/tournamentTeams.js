import Helpers from '../helpers'

export default class TournamentTeams{

    tournamentTeams = [];
    maxNumberOfTeams = 0;
    minNumberOfTeams = 0;

    constructor(tournament, maxNumberOfTeams, minNumberOfTeams){
        this.tournamentTeams = tournament.teams;
        this.maxNumberOfTeams = maxNumberOfTeams;
        this.minNumberOfTeams = minNumberOfTeams;
    }

    calculateTeamsCount(){
        let teams = this.tournamentTeams;
        let minNumberOfTeams = this.minNumberOfTeams;
        let n = 2;

        while(minNumberOfTeams <= this.maxNumberOfTeams){
            minNumberOfTeams = Math.pow(2, n);
            if(minNumberOfTeams >= teams){
                teams = minNumberOfTeams;
                break;
            }
            else n++;
        }

        return teams;
    }

    prepareTournamentTeams(){
        let players = [];
        let teams = this.calculateTeamsCount();

        for(let i = 1; i <= teams; i++) {
            let teamWinner = Helpers.getRandomBoolean();

            players.push({
                id: i,
                name: '',
                isWinner: teamWinner
            });

            players[i - 1].name =  this.tournamentTeams >= i ? `Team ${i}` : '';

            if(i % 2 === 0 && i > 0){

                if(players[i - 1].name === "" && players[i - 2].name !== ""){
                    players[i - 2].isWinner = true;
                    players[i - 1].isWinner = false;
                }
                else players[i - 1].isWinner = !players[i - 2].isWinner;
            }

        }

        return players;
    }
}