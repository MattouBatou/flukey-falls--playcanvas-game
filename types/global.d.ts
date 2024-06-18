import * as pc from 'playcanvas'
declare global {
    type Quat = pc.Quat;
    type Vec4 = pc.Vec4;
    type Vec3 = pc.Vec3;
    type Vec2 = pc.Vec2;
    type EasingFunc = (t: number) => number;
    type GameModel = {
        comboCount: number,
        currentGameScore: number,
        highScore: number,
        currentBoardColumnIndex: number,
        landscape: boolean,
        playerTile: pc.Entity | null,
        boardSlots: pc.Vec3[][],
        playerTileSpawnPos: pc.Vec3;
        gameBoardPos: pc.Vec3,
        gameBoardScale: pc.Vec3,
        getBoardSlotPosition: (row: number, col: number) => pc.Vec3,
    }
    type CustomEasingFunctions = {
        BounceOut: EasingFunc
    }
}