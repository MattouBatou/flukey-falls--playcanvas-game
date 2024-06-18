class SpawnManager extends pc.ScriptType {
    tileTemplates: pc.Asset[];
    boardSlotsEntity: pc.Entity;
    boardSlots: pc.Vec3[][];
    playerTileSpawnPos: pc.Entity;

    initialize(): void {
        if(this.tileTemplates.length === 0) {
            console.error("Add some tile template assets to the tileTemplates array.");
        }

        if(!this.boardSlotsEntity) {
            console.error("Please add board slots entity.");
        }

        this.boardSlots = [];
        this.createSlots();

        this.spawnNewPlayerTile();
    }

    createSlots(): void {
        for(let row = 0; row < this.boardSlotsEntity.children.length; row++) {
            this.boardSlots.push([]);
            const rowEntity = this.boardSlotsEntity.children[row];
            const columnCount = rowEntity.children.length;

            for(let col = 0; col < columnCount; col++) {
                const slot = rowEntity.children[col];
                this.boardSlots[row].push(slot.getPosition());
            }
        }
    }

    getSlotPosition(row: number, col: number): pc.Vec3 {
        return this.boardSlots[row][col];
    }

    getRandomTileTemplateInstance(): pc.Entity {
        const randIndex = Math.round(pc.math.random(0, this.tileTemplates.length-2));
        const templateAsset: pc.Asset = this.tileTemplates[randIndex];
        const tileInstance: pc.Entity = templateAsset.resource.instantiate();
        this.app.root.addChild(tileInstance);

        return tileInstance;
    }

    spawnNewPlayerTile(): void {
        const tileInstance: pc.Entity = this.getRandomTileTemplateInstance();
        tileInstance.setPosition(this.playerTileSpawnPos.getPosition());
    }
}

pc.registerScript(SpawnManager);
SpawnManager.attributes.add('playerTileSpawnPos', { type: 'entity' });
SpawnManager.attributes.add('boardSlotsEntity', { type: 'entity' });
SpawnManager.attributes.add('tileTemplates', { type: 'asset', array: true });