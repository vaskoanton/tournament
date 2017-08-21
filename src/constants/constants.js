function tournamentTypes() {
    const types = {
        single: 'single',
        double: 'double'
    };

    return types;
}

function tournamentSettings() {
    const settings = {
        maxTeams: 128,
        minTeams: 4,
        toursNumber: 5,
        nextTourMatchNumber: 32
    };

    return settings;
}

function tournamentTours() {
    const tours = {
        first: 'first',
        second: 'second',
        third: 'third',
        fourth: 'fourth',
        fifth: 'fifth',
        sixth: 'sixth',
        seventh: 'seventh'
    };

    return tours;
}

module.exports = Object.freeze({
    tournamentType: tournamentTypes(),
    tournamentSettings: tournamentSettings(),
    tournamentTours: tournamentTours()
});