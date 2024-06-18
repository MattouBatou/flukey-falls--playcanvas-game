(function() {
    // Initialisation Code: Will run without being attached to any entity.
    pc.app?.mouse.disableContextMenu();

    window.addEventListener('orientationchange', calculateDimensions, false);
    window.addEventListener('resize', calculateDimensions, false);
    calculateDimensions();
})();

function calculateDimensions() {
    const width = pc.app?.graphicsDevice?.width;
    const height = pc.app?.graphicsDevice?.height;

    if(!width || !height) return;

    if(width > height) {
        gameModel.landscape = true;
    }
    else {
        gameModel.landscape = false;
    }
    
    pc.app?.fire(constants.ACTION_ORIENTATION_CHANGE);
}