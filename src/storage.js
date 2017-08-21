let TournamentData = (function () {

    let settings = {
        changeListener: []
    };

    const key = 'tournament';

    let getTournament = () => {
        return JSON.parse(localStorage.getItem(key, 'tournament'));
    };

    let setTournament = (tour) => {
       if(tour === null && tour === undefined) return;
        localStorage.setItem(key,JSON.stringify(tour));
        settings.changeListener.forEach((func) => {
            func(tour);
        });
    };

    let removeTournament = () => {
        localStorage.removeItem(key);
        settings.changeListener.forEach((func) => {
            func(null);
        });
    };

    let changeListener = (callback) =>{
        settings.changeListener.push(callback);
    };

    return {
        getTournament: getTournament,
        setTournament: setTournament,
        removeTournament: removeTournament,
        changeListener: changeListener,
        isAlive: () => {
            return getTournament() !== null;
        }
    }
})();

export default TournamentData;