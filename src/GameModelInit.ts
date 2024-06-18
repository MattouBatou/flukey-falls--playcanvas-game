class GameModelInit extends pc.ScriptType {
    playerTileSpawnPosEntity: pc.Entity;
    boardSlotsEntity: pc.Entity;
    gameBoard: pc.Entity;

    initialize(): void {
        if(!this.boardSlotsEntity) {
            console.error("Please add board slots entity.");
        }

        gameModel.playerTileSpawnPos = this.playerTileSpawnPosEntity ? this.playerTileSpawnPosEntity.getPosition() : pc.Vec3.ZERO;
        gameModel.gameBoardPos = this.gameBoard.getPosition();
        gameModel.gameBoardScale = this.gameBoard.getScale();

        this.createSlots();
    }

    // Get world positions for all the slots from the slots entity.
    // This allows a designer to place the slots anywhere and the code shouldn't need updating.
    createSlots(): void {
        if(gameModel.boardSlots.length > 0) {
            console.error("gameModel.boardSlots already contains array elements.");
        }

        const offsetPos = new pc.Vec3(0, -0.5, 0);

        for(let row = 0; row < this.boardSlotsEntity.children.length; row++) {
            gameModel.boardSlots.push([]);
            const rowEntity = this.boardSlotsEntity.children[row];
            const columnCount = rowEntity.children.length;

            for(let col = 0; col < columnCount; col++) {
                const slot = rowEntity.children[col];
                gameModel.boardSlots[row].push(slot.getPosition().add(offsetPos));
            }
        }
    }
}

pc.registerScript(GameModelInit);
GameModelInit.attributes.add('playerTileSpawnPosEntity', { type: 'entity' });
GameModelInit.attributes.add('boardSlotsEntity', { type: 'entity' });
GameModelInit.attributes.add('gameBoard', { type: 'entity' });