import TournamentTeams from './tournamentTeams'
import TournamentMatch from './tournamentMatch'
class TournamentTree {

    tournamentTeams = {};
    tournamentMatch = {};

    constructor(tournament, maxNumberOfTeams, minNumberOfTeams) {
        this.tournamentTeams = new TournamentTeams(tournament, maxNumberOfTeams, minNumberOfTeams);
        this.tournamentMatch = new TournamentMatch();
    }

    getSingleEliminationTree() {
        let tours = [];
        let counter = 0;
        let items = this.tournamentTeams.prepareTournamentTeams();
        let wins = [];

        while (items.length !== 1) {
            wins = [];
            if (counter >= 1) {

                wins = items.filter((p) => {
                    return p.isWinner;
                });

                wins = this.tournamentMatch.updateMatchWinners(wins.copy);
            } else wins = items.slice();

            tours.push(wins.slice());
            items = wins.slice();
            counter++;
        }

        return tours;
    }

    getDoubleEliminationTree(matches) {
        let tours = [];
        let loosedMatches = [];
        let loserBuffer = [];
        let losers = [];
        let arr = [];

        for (let match of matches) {
            loosedMatches.push(match.filter((m) => {
                return !m.isWinner;
            }));
        }

        for (let i = 0; i < matches.length; i++) {
            if (i >= 1) {
                let prevLosers = loserBuffer.pop();
                let singleElLosers = this.getSingleEliminationTournamentLosers(matches[i]);

                arr = [];
                if (prevLosers) {

                    losers = this.tournamentMatch.getMatchWinners(prevLosers.left).copy;

                    for (let j = 0; j < losers.length; j++) {
                        if (j <= (losers.length / 2) - 1) {
                            let right = singleElLosers.right.shift();
                            if (right) arr.push(losers[j], right);
                        } else {
                            let left = singleElLosers.left.shift();
                            if (left) arr.push(losers[j], left);
                        }
                    }

                    losers = this.tournamentMatch.updateMatchWinners(arr.slice());

                    if (losers.length === 0) continue;

                    let data = {
                        left: losers,
                        right: this.getRightNode(losers)
                    };

                    loserBuffer.push(data);
                    tours.push(data);
                }

            } else {
                losers = loosedMatches[0].filter((p) => {
                    return !p.isWinner;
                });

                losers = this.tournamentMatch.updateMatchWinners(losers.copy);

                let data = {
                    left: losers,
                    right: []
                };

                tours.push(data);
                loserBuffer.push(data);
            }
        }

        return tours;
    }

    getRightNode(losers) {
        let winners = this.tournamentMatch.getMatchWinners(losers);
        return this.tournamentMatch.updateMatchWinners(winners.copy);
    }

    getFinalTree(matches, doubleTournamentMatches) {

        let singleElLastMatchWinner = matches[matches.length - 1][0];
        let doubleElLastMatchWinner = doubleTournamentMatches[doubleTournamentMatches.length - 1].left[0][0].teams.filter((p) => {
            return p.isWinner;
        })[0];

        let result = [singleElLastMatchWinner, doubleElLastMatchWinner];

        result = result.map((p) => {
            return JSON.parse(JSON.stringify(p));
        });

        return [this.tournamentMatch.updateMatchWinners(result)];
    }

    getSingleEliminationTournamentLosers(match) {
        let singleEliminationMatchLosers = match.filter((team) => {
            return !team.isWinner;
        });

        return {
            left: singleEliminationMatchLosers.slice(0, singleEliminationMatchLosers.length / 2),
            right: singleEliminationMatchLosers.slice(singleEliminationMatchLosers.length / 2, singleEliminationMatchLosers.length),
        }
    }
}

export default TournamentTree;