class BoardManager extends pc.ScriptType {
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

        this.app.on(constants.BOARD_SET_PLAYER_TILE_TO_EMPTY_SLOT, this.setPlayerTileToEmptySlot, this);
    }

    // Get world positions for all the slots from the slots entity.
    // This allows a designer to place the slots anywhere and the code shouldn't need updating.
    createSlots(): void {
        if(gameModel.boardSlotPositions.length > 0) {
            console.error("gameModel.boardSlotsPositions already contains array elements.");
        }

        const offsetPos = new pc.Vec3(0, -0.5, 0);

        for(let row = 0; row < this.boardSlotsEntity.children.length; row++) {
            gameModel.boardSlotPositions.push([]);
            gameModel.boardSlots.push([]);
            const rowEntity = this.boardSlotsEntity.children[row];
            const columnCount = rowEntity.children.length;

            for(let col = 0; col < columnCount; col++) {
                const slot = rowEntity.children[col];
                gameModel.boardSlotPositions[row].push(slot.getPosition().add(offsetPos));
                gameModel.boardSlots[row].push(null);
            }
        }
    }

    // finds the first empty slot at the given column index and 
    // sets the passed in Vec3 to the position in world coords of that slot.
    setPlayerTileToEmptySlot() {
        // check boardSlots for first free element in column
        for(let row = gameModel.boardSlots.length-1; row >= 0; row--) {
            if(gameModel.boardSlots[row][gameModel.currentBoardColumnIndex] === null) {
                gameModel.boardSlots[row][gameModel.currentBoardColumnIndex] = gameModel.playerTile;
                gameModel.currentEmptySlotPos.copy(gameModel.boardSlotPositions[row][gameModel.currentBoardColumnIndex]);
                gameModel.currentColumnHasEmptySlot = true;
                return;
            }
        }

        // no empty slots left in the column
        gameModel.currentColumnHasEmptySlot = false;
    }
}

pc.registerScript(BoardManager);
BoardManager.attributes.add('playerTileSpawnPosEntity', { type: 'entity' });
BoardManager.attributes.add('boardSlotsEntity', { type: 'entity' });
BoardManager.attributes.add('gameBoard', { type: 'entity' });