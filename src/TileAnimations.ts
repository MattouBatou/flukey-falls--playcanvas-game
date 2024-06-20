class TileAnimations extends pc.ScriptType {
    comboTextEntity: pc.Entity;

    initialize(): void {
        this.app.on(constants.ANIM_TILE_DROP, this.dropTile, this);
        this.app.on(constants.ANIM_TILE_DESTROY, this.destroyTile, this);
        this.app.on(constants.ANIM_SHOW_COMBO, this.showCombo, this);
        this.app.on(constants.ANIM_HIDE_COMBO, this.hideCombo, this);
        this.app.on(constants.ANIM_INC_COMBO, this.increasedCombo, this);
    }

    destroyTile(tile: pc.Entity, tileIndex: number, onComplete: () => void): void {
        const { DESTROY_TILE_POS_Z_DURATION, DESTROY_TILE_POS_Z_DELAY, DESTROY_TILE_POS_Y_DURATION } = constants;
        let tilePos = tile.getLocalPosition();

        gameModel.destroyingAnimCount++;
        tile.tween(tilePos)
            .to(new pc.Vec3(tilePos.x, tilePos.y, tilePos.z + 3), DESTROY_TILE_POS_Z_DURATION, pc.CircularOut)
            .delay(DESTROY_TILE_POS_Z_DELAY * tileIndex)
            .onComplete(() => {
                tile.tween(tilePos)
                    .to(new pc.Vec3(tilePos.x, -5, tilePos.z), DESTROY_TILE_POS_Y_DURATION, pc.CircularOut)
                    .onComplete(() => {
                        gameModel.destroyingAnimCount--;

                        if(gameModel.destroyingAnimCount === 0) {
                            onComplete();
                            this.app.fire(constants.ANIM_DESTROYING_FINISHED);
                        }
                    })
                    .start();
            })
            .start();
    }

    dropTile(tile: pc.Entity, dropTo: pc.Vec3, tileIndex: number, isPlayerTileDrop: boolean, onComplete: () => void) {
        const { DROP_TILE_POS_DURATION, DROP_TILE_POS_DELAY, DROP_TILE_SCALE_AMOUNT, DROP_TILE_SCALE_DURATION, DROP_TILE_SCALE_DELAY } = constants;
        
        gameModel.droppingAnimationsCount++;
        tile.tween(tile.getLocalPosition())
            .to(dropTo, DROP_TILE_POS_DURATION, customEasing.BounceOut)
            .delay(DROP_TILE_POS_DELAY * tileIndex)
            .start();

        // Squash animation on bounce
        tile.tween(tile.getLocalScale())
            .to(new pc.Vec3(1, 1, DROP_TILE_SCALE_AMOUNT), DROP_TILE_SCALE_DURATION, pc.CircularInOut)
            .delay(DROP_TILE_SCALE_DELAY + (DROP_TILE_POS_DELAY * tileIndex))
            .repeat(2)
            .yoyo(true)
            .onComplete(() => {
                gameModel.droppingAnimationsCount--;
    
                if(gameModel.droppingAnimationsCount === 0 && !isPlayerTileDrop) {
                    onComplete();
                    this.app.fire(constants.ANIM_DROPS_FINISHED);
                }
                else if(isPlayerTileDrop) {
                    onComplete();
                }
            })
            .start();
    }

    showCombo() {
        const { SHOW_COMBO_DURATION } = constants;
        const comboTextPos = this.comboTextEntity.getLocalPosition();
        this.comboTextEntity.tween(comboTextPos)
                            .to(new pc.Vec3(comboTextPos.x, constants.COMBO_TEXT_Y_END, comboTextPos.z), 
                                            SHOW_COMBO_DURATION, customEasing.BounceOut)
                            .start();
    }

    hideCombo() {
        const { HIDE_COMBO_DURATION } = constants;
        const comboTextPos = this.comboTextEntity.getLocalPosition();
        this.comboTextEntity.tween(comboTextPos)
                            .to(new pc.Vec3(comboTextPos.x, constants.COMBO_TEXT_Y_START, comboTextPos.z), 
                                            HIDE_COMBO_DURATION, pc.CircularOut)
                            .onComplete(() => {
                                this.comboTextEntity.setLocalScale(1, 1, 1);
                            })
                            .start();
    }

    increasedCombo() {
        const { INC_COMBO_DURATION, INC_COMBO_FINAL_DELAY, INC_COMBO_SCALE_AMOUNT_OVERSHOOT, INC_COMBO_SCALE_AMOUNT_FINAL } = constants;
        const comboTextScale = this.comboTextEntity.getLocalScale();
        const originalComboTextScale = this.comboTextEntity.getLocalScale().clone();
        this.comboTextEntity.tween(comboTextScale)
                            .to(new pc.Vec3(comboTextScale.x + INC_COMBO_SCALE_AMOUNT_OVERSHOOT, 
                                            comboTextScale.y + INC_COMBO_SCALE_AMOUNT_OVERSHOOT, 
                                            comboTextScale.z + INC_COMBO_SCALE_AMOUNT_OVERSHOOT), 
                                            INC_COMBO_DURATION, pc.ElasticInOut)
                            .onComplete(() => {
                                this.comboTextEntity.tween(comboTextScale)
                                .to(new pc.Vec3(originalComboTextScale.x + INC_COMBO_SCALE_AMOUNT_FINAL, 
                                                originalComboTextScale.y + INC_COMBO_SCALE_AMOUNT_FINAL, 
                                                originalComboTextScale.z + INC_COMBO_SCALE_AMOUNT_FINAL), 
                                                INC_COMBO_DURATION, pc.ElasticInOut)
                                .delay(INC_COMBO_FINAL_DELAY)
                                .start();
                            })
                            .start();
    }
}

pc.registerScript(TileAnimations);
TileAnimations.attributes.add('screenEntity', { type: 'entity' });
TileAnimations.attributes.add('comboTextEntity', { type: 'entity' });