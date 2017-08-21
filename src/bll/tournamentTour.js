import Constants from '../constants/constants'

export default class TournamentTour{

    generateTours(tournament, matches){
        let tours = [];
        let toursNumber = 0;

        this.tournamentTypes = Constants.tournamentType;
        this.tournamentTours = Constants.tournamentTours;

        if(tournament.type === this.tournamentTypes.double) toursNumber = matches.length;
        else toursNumber = matches.length - 1;

        for(let i = 0; i < toursNumber; i++){
            tours.push({
                id: i,
                name: `Tour  ${i + 1}`,
                className: Object.values(this.tournamentTours)[i],
                isGrouped: true,
                mode: tournament.type,
                isFinal: i === (toursNumber - 1),
                isPreFinal: i === (toursNumber - 2),
            });
        }

        return tours;
    }
}