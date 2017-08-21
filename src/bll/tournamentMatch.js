export default class TournamentMatch{

    updateMatchWinners(losers){
        for (let j = 1; j <= losers.length; j++) {
            if(losers[j - 1].name !== "") {
                losers[j - 1].name = losers[j - 1].isWinner ? `Winner Team ${losers[j - 1].id}` : `Loser Team ${losers[j - 1].id}`;
            }

            if (j % 2 === 0) {
                if(losers[j - 1].name === "" && losers[j - 2].name !== ""){
                    losers[j - 2].isWinner = true;
                    losers[j - 1].isWinner = false;
                }
                else if(losers[j - 1].name !== "" && losers[j - 2].name === ""){
                    losers[j - 2].isWinner = false;
                    losers[j - 1].isWinner = true;
                }
                else losers[j - 1].isWinner = !losers[j - 2].isWinner;
            }
        }

        return losers;
    }

    getMatchWinners(match){
        return match.filter((p) => {
            return p.isWinner;
        });
    }

}