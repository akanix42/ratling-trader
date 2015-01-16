define(function () {
    function CellToCellMovement() {

    }

    CellToCellMovement.prototype.execute = function execute(entity, command) {
        var newTile = entity.tile.getNeighbor(command.direction);
        entity.tile = newTile;
    };

    return CellToCellMovement;
});