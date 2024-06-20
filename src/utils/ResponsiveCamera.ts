class ResponsiveCamera extends pc.ScriptType {

    initialize() {
        this.checkAspectRatio();

        this.app.on(constants.ACTION_ORIENTATION_CHANGE, this.checkAspectRatio, this);
    }

    checkAspectRatio() {
        if(!this.entity.camera) return;

        this.entity.camera.horizontalFov = !gameModel.landscape;

        if(!gameModel.landscape) {
            this.entity.camera.fov = 30;
        }
        else {
            this.entity.camera.fov = 45;
        }
    }
}

pc.registerScript(ResponsiveCamera);