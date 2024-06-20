// global game functions
const getBoardSlotPosition: GameModel['getBoardSlotPosition'] = (row, col) => {
    if(!gameModel.boardSlotPositions) {
        console.error("boardSlots on gameModel has not yet been initialised");
    };

    return gameModel.boardSlotPositions[row][col];
}

const gameModel: GameModel = {
    // Game scoring
    comboCount: 0,
    currentGameScore: 0,
    highScore: 0,

    // Device
    landscape: true,
    
    // Board state
    currentColumnHasEmptySlot: true,
    currentEmptySlotPos: new pc.Vec3(),
    boardSlotPositions: [],
    boardSlots: [],

    // Layout / view
    gameBoardPos: new pc.Vec3(),
    gameBoardScale: new pc.Vec3(),

    // Player tile
    playerTile: null,
    playerTileSpawnPos: new pc.Vec3(),
    tileNames: ['Tile_1', 'Tile_2', 'Tile_3', 'Tile_4', 'Tile_5', 'Tile_6', 'Tile_7', 'Tile_Solid'], 

    // Input
    inputEnabled: true,

    // Animations
    destroyingAnimCount: 0,
    droppingAnimationsCount: 0,

    // Global functions
    getBoardSlotPosition,
};

const constants = {
    // Device Actions
    ACTION_ORIENTATION_CHANGE: 'orientationChange',
    // Game State Actions
    ACTION_SPAWN_NEW_PLAYER_TILE: 'SpawnNewPlayerTile',
    BOARD_SET_PLAYER_TILE_TO_EMPTY_SLOT: 'BoardManager:SetPlayerTileToEmptySlot',

    // Mouse Events
    MOUSE_LEFT_CLICK: 'MouseLeftClick',
    // Game Input Actions
    MOVE_PLAYER_TILE_TO_GAME_BOARD_COLUMN: 'GameInput:MoveTileToBoardColumn',
    PLACE_PLAYER_TILE: 'GameInput:PlacePlayerTile',

    // Checking Matches Actions
    CHECK_FOR_MATCHES: 'TileMatcher:CheckForMatches',

    // Game values
    SOLID_TILE_ID: 8,

    // Animations
    //// Tiles
    ANIM_TILE_DROP: 'TileAnimations:Drop',
    ANIM_TILE_DESTROY: 'TileAnimations:Destroy',
    ANIM_DROPS_FINISHED: 'TileAnimations:AnimDropsFinished',
    ANIM_DESTROYING_FINISHED: 'TileAnimations:AnimDestroyingFinished',
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