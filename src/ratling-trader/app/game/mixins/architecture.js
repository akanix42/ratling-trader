define(function (require) {

    return Architecture;

    function Architecture() {

        return {events: isWalkable};

        //        function architecture(sourceEntity) {
        //
        //            return {
        //                isWalkable: isWalkable
        //            };

        function isWalkable(sourceEntity) {
            return sourceEntity.getData().isWalkable;
        }

        //        }
    }
});