let Common = (function () {

    let getNodeTeamsCount = (node) => {
        let count = 0;

        for(let i in node){
            let nodeItem = node[i];
            for(let e in nodeItem){
                let element = nodeItem[e];

                count += element.teams.length;
            }
        }

        return count;
    };


    return {
        getNodeTeamsCount: getNodeTeamsCount
    }
})();

export default Common;