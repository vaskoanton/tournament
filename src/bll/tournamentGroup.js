export default class TournamentGroup{

    generateTournamentGroups(matches, id = 0){
        let groups = [];

        for(let index in matches){
            let match = matches[index];

            if(index >= 1){
                id = (matches[index - 1].length / 2) + id;
            }

            groups.push(this.createBracketGroup(match, id));
        }
        return groups;
    }

    createBracketGroup(winners, matchId){
        let arr = [];
        let groups = [];
        let result = [];
        let groupIndex = 0;

        for(let i = 1; i <= winners.length; i++){
            if(winners[i - 1]) {
                arr.push(winners[i - 1]);
            }

            if(i % 2 === 0 ){
                matchId++;
                groups[groupIndex] = {
                    id: matchId,
                    teams: arr
                };
                groupIndex++;
                arr = [];
            }
        }

        if(groups.length > 1){
            let prev = 0;
            for(let i = 1; i <= groups.length; i++){
                if(i % 2 === 0) {
                    result.push(groups.slice(prev, i));
                    prev = i;
                }
            }
        }
        else{
            result.push(groups.slice(0, 2));
        }

        return result;
    };

}