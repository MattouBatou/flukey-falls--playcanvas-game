class GameControls extends pc.ScriptType {
    mainCamera: pc.Entity;
    mainCameraPosition: pc.Vec3;
    targetPlane: pc.Entity;
    lastWorldPointerPos: pc.Vec3;
    currentMousePos: pc.Vec2;

    initialize(): void {
        this.mainCamera = (this.app.root.findByName('Camera') as pc.Entity);

        
        if(!this.mainCamera || !this.mainCamera.camera) {
            console.error(`A main camera called "Camera" is needed for GameControls to function.`);
        }

        if(!this.targetPlane || this.targetPlane === null) {
            console.error('No target plane was passed in');

        }

        if(this.targetPlane.render && this.targetPlane.render !== null) this.targetPlane.render.hide();

        this.lastWorldPointerPos = new pc.Vec3();
        this.currentMousePos = new pc.Vec2();

        this.mainCameraPosition = this.mainCamera.getPosition().clone();

        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        
        if(this.app.touch) {
            this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        }

        this.app.on(constants.MOVE_PLAYER_TILE_TO_GAME_BOARD_COLUMN, this.movePlayerTileToGameboardColumn, this);
        this.app.on(constants.PLACE_PLAYER_TILE, this.placePlayerTile, this);
    }

    private onMouseMove(e: pc.MouseEvent): void {
        this.currentMousePos.set(e.x, e.y);

        if(gameModel.inputEnabled) {
            this.app.fire(constants.MOVE_PLAYER_TILE_TO_GAME_BOARD_COLUMN, this.getWorldPointerPos(this.currentMousePos.x, this.currentMousePos.y), false);
        }

        e.event.preventDefault();
    }

    private onMouseDown(e: pc.MouseEvent): void {
        if(gameModel.inputEnabled && e.button === pc.MOUSEBUTTON_LEFT) {
            this.app.fire(constants.MOVE_PLAYER_TILE_TO_GAME_BOARD_COLUMN, this.getWorldPointerPos(this.currentMousePos.x, this.currentMousePos.y), true);
        }
    }

   private onTouchStart(e: pc.TouchEvent): void {
        const touch = e.event.touches[0];
        const touchX = touch.clientX;
        const touchY = touch.clientY;

        if(gameModel.inputEnabled) {
            this.app.fire(constants.MOVE_PLAYER_TILE_TO_GAME_BOARD_COLUMN, this.getWorldPointerPos(touchX, touchY), true);
            
        }

        e.event.preventDefault();
    }

    private movePlayerTileToGameboardColumn(mousePos: pc.Vec3, placeTile: boolean): void {
        if(!gameModel.playerTile) return;

        const clampX = pc.math.clamp(mousePos.x, gameModel.gameBoardPos.x - (gameModel.gameBoardScale.x/2), gameModel.gameBoardPos.x+(gameModel.gameBoardScale.x/2)-0.00000001);
        const snappedX = Math.round(clampX);
        gameModel.playerTile.setPosition(snappedX, gameModel.playerTileSpawnPos.y, gameModel.playerTileSpawnPos.z);

        const topBoardSlotsRow = gameModel.boardSlotPositions[0];
        for(let boardColumnIndex = 0; boardColumnIndex < topBoardSlotsRow.length; boardColumnIndex++) {
            const column = topBoardSlotsRow[boardColumnIndex];
            if(placeTile && column.x === snappedX) {
                this.app.fire(constants.PLACE_PLAYER_TILE, boardColumnIndex);
                break;
            }
        }
    }

    private placePlayerTile(boardColumnIndex: number): void {
        if(!gameModel.playerTile) return;

        gameModel.inputEnabled = false;

        this.app.fire(constants.BOARD_SET_PLAYER_TILE_TO_EMPTY_SLOT, boardColumnIndex);

        if(!gameModel.currentColumnHasEmptySlot) {
            // do some negative feedback animation to block player from placing block 
            // in a space that would result in game over.
            gameModel.inputEnabled = true;
            return;
        }

        this.app.fire(constants.ANIM_TILE_DROP, gameModel.playerTile, gameModel.currentEmptySlotPos,
            () =>  {
                // Start the checks for any matching tiles on the board
                this.app.fire(constants.CHECK_FOR_MATCHES, true);
            }
        );
    }

    private getWorldPointerPos(x: number, y: number): pc.Vec3 {
        if(!this.mainCamera || !this.mainCamera.camera || !this.app.systems.rigidbody) return pc.Vec3.ZERO;
        
        const cameraFrom  = this.mainCamera.camera.screenToWorld(x, y, this.mainCamera.camera.nearClip);
        const cameraTo  = this.mainCamera.camera.screenToWorld(x, y, this.mainCamera.camera.farClip);

        const result = this.app.systems.rigidbody.raycastFirst(cameraFrom, cameraTo);

        const intersectPoint = result ? result.point : this.lastWorldPointerPos;

        this.lastWorldPointerPos.set(intersectPoint.x, intersectPoint.y, intersectPoint.z);

        return intersectPoint;
    }
}

pc.registerScript(GameControls);
GameControls.attributes.add('targetPlane', { type: 'entity' });