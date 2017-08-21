let Extensions = (function () {

    let registerExtensions = () =>{
        extensions.forEach((ext) => {
            ext();
        });
    };

    let arrayExtensions = () => {
        Object.defineProperty(Array.prototype, 'copy', {
            enumerable: false,
            get: function() {
                return this.map((p) =>{
                    return JSON.parse(JSON.stringify(p));
                });
            }
        });

    };

    let extensions = [arrayExtensions];

    return {
        registerExtensions: registerExtensions
    }
})();

export default Extensions;