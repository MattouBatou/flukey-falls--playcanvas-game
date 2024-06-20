// global game functions
const getBoardSlotPosition: GameModel['getBoardSlotPosition'] = (row, col) => {
    if(!gameModel.boardSlotPositions) {
        console.error("boardSlots on gameModel has not yet been initialised");
    };

    return gameModel.boardSlotPositions[row][col];
}

const gameModel: GameModel = {
    // Game scoring
    comboCount: 1,
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
    END_OF_MATCH_SEQUENCE_DELAY_SHORT: 150,
    END_OF_MATCH_SEQUENCE_DELAY_LONG: 750,

    // Animations
    //// Tiles
    ANIM_TILE_DROP: 'TileAnimations:Drop',
    ANIM_TILE_DESTROY: 'TileAnimations:Destroy',
    ANIM_DROPS_FINISHED: 'TileAnimations:AnimDropsFinished',
    ANIM_DESTROYING_FINISHED: 'TileAnimations:AnimDestroyingFinished',
    ANIM_SHOW_COMBO: 'TileAnimations:ShowCombo',
    ANIM_HIDE_COMBO: 'TileAnimations:HideCombo',
    ANIM_INC_COMBO: 'TileAnimations:IncreasedCombo',
    COMBO_TEXT_Y_END: -70,
    COMBO_TEXT_Y_START: -200,
    SHOW_COMBO_DURATION: 0.25,
    HIDE_COMBO_DURATION: 0.25,
    INC_COMBO_DURATION: 0.5,
    INC_COMBO_FINAL_DELAY: 0.25,
    INC_COMBO_SCALE_AMOUNT_OVERSHOOT: 0.2,
    INC_COMBO_SCALE_AMOUNT_FINAL: 0.1,
    DESTROY_TILE_POS_Z_DURATION: 0.25,
    DESTROY_TILE_POS_Z_DELAY: 0.25,
    DESTROY_TILE_POS_Y_DURATION: 0.25,
    DROP_TILE_POS_DURATION: 0.33,
    DROP_TILE_POS_DELAY: 0.15,
    DROP_TILE_SCALE_AMOUNT: 0.75,
    DROP_TILE_SCALE_DURATION: 0.15,
    DROP_TILE_SCALE_DELAY: 0.15,
}

// Custom easing functions
const tileBounceOut: EasingFunc = function (k: number) {
    const bounciness = 18;
    return 1 - Math.abs(Math.cos(k * bounciness * (Math.PI/25))) * (1-k);
};

const customEasing = {
    BounceOut: tileBounceOut
};