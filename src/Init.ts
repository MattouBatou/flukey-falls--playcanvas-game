(function() {
    // Initialisation Code: Will run without being attached to any entity.
    pc.app?.mouse.disableContextMenu();

    window.addEventListener('orientationchange', calculateDimensions, false);
    window.addEventListener('resize', calculateDimensions, false);
})();

function calculateDimensions() {
    const width = pc.app?.graphicsDevice?.width;
    const height = pc.app?.graphicsDevice?.height;

    if(!width || !height) return;

    if(width > height) {
        _globalStore.landscape = true;
    }
    else {
        _globalStore.landscape = false;
    }

    console.log("orientation change!!!!")
    pc.app?.fire(constants.ACTION_ORIENTATION_CHANGE);
}