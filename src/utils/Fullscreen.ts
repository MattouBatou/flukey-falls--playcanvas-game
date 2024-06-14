class Fullscreen extends pc.ScriptType {
    public entity: pc.Entity;
    pressedState: boolean = false;

    initialize(): void {
        if(this.entity.button){
            this.entity?.button.on('click', (event) => {
                if(!this.pressedState) {
                    pc.app?.graphicsDevice.canvas.requestFullscreen();
                }
                else {
                    document.exitFullscreen();
                }

                this.pressedState = !this.pressedState;
            }, this);
        }

        const tween = this.entity.tween(this.entity.getPosition()).to(new pc.Vec3(100, 0, 0), 1.0, pc.Linear)
    }
};

pc.registerScript(Fullscreen);
