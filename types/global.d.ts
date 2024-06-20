import * as pc from 'playcanvas'
declare global {
    type Quat = pc.Quat;
    type Vec4 = pc.Vec4;
    type Vec3 = pc.Vec3;
    type Vec2 = pc.Vec2;
    type EasingFunc = (t: number) => number;
    type TileAliases = 'Tile_1' | 'Tile_2' | 'Tile_3' | 'Tile_4' | 'Tile_5' | 'Tile_6' | 'Tile_7' | 'Tile_Solid'
    type BoardRowOrColumn = Array<pc.Entity | null>;
    type BoardSlots = Array<BoardRowOrColumn>;
    type GameModel = {
        // Game scoring
        comboCount: number,
        currentGameScore: number,
        highScore: number,

        // Device
        landscape: boolean,

        // Board state
        currentColumnHasEmptySlot: boolean,
        currentEmptySlotPos: pc.Vec3,
        boardSlotPositions: pc.Vec3[][],
        boardSlots: BoardSlots,

        // Layout / view
        gameBoardPos: pc.Vec3,
        gameBoardScale: pc.Vec3,

        // Player tile
        playerTile: pc.Entity | null,
        playerTileSpawnPos: pc.Vec3,
        tileNames: TileAliases[],

        // Input
        inputEnabled: boolean,

        // Animations
        destroyingAnimCount: number, // currently running destroy animations count.
        droppingAnimationsCount: number, // currently running dropping animations count.

        // Global functions
        getBoardSlotPosition: (row: number, col: number) => pc.Vec3,
    };

    // TileMatcher Types
    type TileWithGridCoords = { 
        tile: pc.Entity, 
        rowIndex: number, 
        colIndex: number, 
        isRowMatch: boolean, // used to trigger board row highlight animation.
        isColumnMatch: boolean // used to trigger board column highlight animation.
    };

    type CustomEasingFunctions = {
        BounceOut: EasingFunc,
    };
}