let Helpers = (function () {

    let getRandomBoolean = () => {
        return !!parseInt(Math.random() * 2, 10);
    };

    return {
        getRandomBoolean: getRandomBoolean
    }
})();

export default Helpers;