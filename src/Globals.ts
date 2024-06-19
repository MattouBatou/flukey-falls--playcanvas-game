// global game functions
const getBoardSlotPosition: GameModel['getBoardSlotPosition'] = (row, col) => {
    if(!gameModel.boardSlotPositions) {
        console.error("boardSlots on gameModel has not yet been initialised");
    };

    return gameModel.boardSlotPositions[row][col];
}

const gameModel: GameModel = {
    comboCount: 0,
    currentGameScore: 0,
    highScore: 0,
    currentBoardColumnIndex: 0,
    currentColumnHasEmptySlot: true,
    landscape: true, 
    currentEmptySlotPos: new pc.Vec3(),
    playerTileSpawnPos: new pc.Vec3(),
    gameBoardPos: new pc.Vec3(),
    gameBoardScale: new pc.Vec3(),
    playerTile: null,
    boardSlotPositions: [],
    boardSlots: [],
    getBoardSlotPosition,
};

const constants = {
    ACTION_ORIENTATION_CHANGE: 'orientationChange',
    // Game State Actions
    ACTION_SPAWN_NEW_PLAYER_TILE: 'SpawnNewPlayerTile',
    BOARD_SET_PLAYER_TILE_TO_EMPTY_SLOT: 'BoardManager:SetPlayerTileToEmptySlot',

    // Mouse Events
    MOUSE_LEFT_CLICK: 'MouseLeftClick',
    // Game Events
    MOVE_PLAYER_TILE_TO_GAME_BOARD_COLUMN: 'GameInput:MoveTileToBoardColumn',
    PLACE_PLAYER_TILE: 'GameInput:PlacePlayerTile'
}

// Custom easing functions
const tileBounceOut: EasingFunc = function (k: number) {
    if (k < (1 / 2.75)) {
        return 7.5625 * k * k;
    } else if (k < (2 / 2.75)) {
        return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
    } else if (k < (2.5 / 2.75)) {
        return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
    }
    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
};

const tileBounceOut2: EasingFunc = function (k: number) {
    const bounces = 20;
    return 1 - Math.abs(Math.cos(k * bounces * (Math.PI/25))) * (1-k);
};

const customEasing = {
    BounceOut: tileBounceOut2
};