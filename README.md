# Flukey Falls Game

A drop7-like made with Playcanvas editor.

Drop7 games used for reference:
* The last working Drop7 apk played via Bluestacks running Android Nougat.
* https://play.google.com/store/apps/details?id=com.nb.drop.the.number.seven&hl=en_GB
* https://play.google.com/store/apps/datasafety?id=com.SpilledShrimpSoup.PileNumbers
* https://oddlord.itch.io/drop7-clone
* https://www.lexaloffle.com/bbs/?pid=35706

Drop7 articles used for game design reference:
* https://dl.acm.org/doi/pdf/10.5555/1980722.1980725

Playcanvas project page: https://playcanvas.com/project/1228443/overview/flukey-falls
Playcanvas published build: https://playcanv.as/p/3Up6UGYj/

## Game features Implemented:
* Drop a tile on the grid.
* Tiles stack on top of each other when placed in the same column.
* Tiles matching where, if any tile's number value, in a row or column of contiguous tiles, matches the amount of contiguous tiles it is a part of; That tile (or multiple tiles in the same contiguous series that have the same number value) is destroyed.
* After tiles are destroyed, any tiles above destroyed tiles, drop down to fill it's space.
* When tiles are destroyed, points are awarded for each destroyed tile.
* Combo system that recognises when subsequent matches are made after tiles have moved to the fill the spaces left by destroyed tiles.
* Combo multiplier is added to the score - calculation taken from https://github.com/oddlord/html5-js-drop7/blob/master/js/drop7.es6
* Used Playcanvas-tween asset store package for all animations.
* No use of the update methods, only tweens and actions for controlling game state flow.
* Player controls for mouse and touch screens.
* Some responsive logic to give a good view on portrait mobile.
