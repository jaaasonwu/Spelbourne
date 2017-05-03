define(['angularAMD'],function (angularAMD) {
    angularAMD.filter('resultFilter', function(){
        return function(items, type, date, skill){
            var result = [];
            angular.forEach(items, function(item){
                if (type === 'Any' || item.sportType === type){
                    if (date === null || item.startDate === date){
                        if (skill === 'Any' || item.skillLevel === skill){
                            result.push(item);
                        }
                    }
                }
            });
            return result;
        }
    })
});