class SpawnManager extends pc.ScriptType {
    tileTemplates: pc.Asset[];

    initialize(): void {
        if(this.tileTemplates.length === 0) {
            console.error("Add some tile template assets to the tileTemplates array.");
        }

        this.app.on(constants.ACTION_SPAWN_NEW_PLAYER_TILE, this.spawnNewPlayerTile, this);
        this.on('destroy', () => {
            this.app.off(constants.ACTION_SPAWN_NEW_PLAYER_TILE, this.spawnNewPlayerTile, this);
        });

        this.app.fire(constants.ACTION_SPAWN_NEW_PLAYER_TILE);
    }

    private getRandomTileTemplateInstance(): pc.Entity {
        const randIndex = Math.round(pc.math.random(0, this.tileTemplates.length-1));
        const templateAsset: pc.Asset = this.tileTemplates[randIndex];
        const tileInstance: pc.Entity = templateAsset.resource.instantiate();
        this.app.root.addChild(tileInstance);

        return tileInstance;
    }

    private spawnNewPlayerTile(): void {
        gameModel.playerTile = this.getRandomTileTemplateInstance();
        gameModel.playerTile.setPosition(gameModel.playerTileSpawnPos);
    }
}

pc.registerScript(SpawnManager);
SpawnManager.attributes.add('tileTemplates', { type: 'asset', array: true });