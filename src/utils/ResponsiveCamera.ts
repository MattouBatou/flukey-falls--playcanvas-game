class ResponsiveCamera extends pc.ScriptType {

    initialize() {
        this.checkAspectRatio();

        this.app.on(constants.ACTION_ORIENTATION_CHANGE, this.checkAspectRatio, this);
    }

    checkAspectRatio() {
        if(!this.entity.camera) return;

        this.entity.camera.horizontalFov = !gameModel.landscape;
    }
}

pc.registerScript(ResponsiveCamera);