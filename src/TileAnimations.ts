class TileAnimations extends pc.ScriptType {
    initialize(): void {
        this.app.on(constants.ANIM_TILE_DROP, this.dropTile, this);
        this.app.on(constants.ANIM_TILE_DESTROY, this.destroyTile, this);
    }

    dropTile(tile: pc.Entity, dropTo: pc.Vec3, onComplete: () => void) {
        gameModel.droppingAnimationsCount++;

        tile.tween(tile.getLocalPosition())
            .to(dropTo, 0.33, customEasing.BounceOut)
            .start();

        // Squash animation on bounce
        tile.tween(tile.getLocalScale())
            .to(new pc.Vec3(1, 1, 0.6), 0.25, customEasing.BounceOut)
            .delay(0.15)
            .repeat(2)
            .yoyo(true)
            .onComplete(() => {
                gameModel.droppingAnimationsCount--;
                onComplete();
    
                if(gameModel.droppingAnimationsCount === 0) {
                    this.app.fire(constants.ANIM_DROPS_FINISHED);
                }
            })
            .start();
    }

    destroyTile(tile: pc.Entity, onComplete: () => void): void {
        let tilePos = tile.getLocalPosition();
        const tilePlane = tile.findByName('Plane');

        if(tilePlane !== null) {
            tilePlane.setLocalPosition(0, 0, 0);
            tile.setLocalPosition(tilePos.add(new pc.Vec3(0, 0.5, 0)));
        }

        gameModel.destroyingAnimCount++;
        tile.tween(tilePos)
        .to(new pc.Vec3(tilePos.x, tilePos.y, tilePos.z + 3), 0.25, pc.CircularOut)
        .onComplete(() => {
            tile.tween(tilePos)
            .to(new pc.Vec3(tilePos.x, -5, tilePos.z), 0.25, pc.CircularOut)
            .onComplete(() => {
                gameModel.destroyingAnimCount--;
                onComplete();

                if(gameModel.destroyingAnimCount === 0) {
                    this.app.fire(constants.ANIM_DESTROYING_FINISHED);
                }
            })
            .start();
        })
        .start();
    }
}

pc.registerScript(TileAnimations);