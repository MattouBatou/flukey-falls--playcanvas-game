class ResponsiveCamera extends pc.ScriptType {

    initialize() {
        this.checkAspectRatio();

        this.app.on(constants.ACTION_ORIENTATION_CHANGE, this.checkAspectRatio, this);
    }

    checkAspectRatio() {
        console.log("check aspect ratio");
        if(!this.entity.camera) return;

        const width = this.app.graphicsDevice.width;
        const height = this.app.graphicsDevice.height;

        this.entity.camera.horizontalFov = height > width;
    }
}

pc.registerScript(ResponsiveCamera);