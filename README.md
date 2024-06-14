A personalised Playcanvas Typescript template using playcanvas-sync and includes typings for Playcanvas tween package. ___Only compatible with the Playcanvas Asset store tween package.___

This is a modified version of [playcanvas-editor-ts-template](https://github.com/playcanvas/playcanvas-editor-ts-template).

types/tween.d.ts is a modified version of https://github.com/playcanvas/playcanvas-tween/blob/main/index.d.ts and would need to be updated accordingly.

1. Copy `.pcconfig` to your root user directory (Mac: `/Users/<username>`, Windows: `C:/User/<username>`).

2. Copy `pcconfig.template.json` and rename to `pcconfig.json` and fill out the properties: 
   * `PLAYCANVAS_API_KEY` - [Instructions to create an API key](https://developer.playcanvas.com/en/user-manual/api/#authorization)
   * `PLAYCANVAS_BRANCH_ID` - [Where to find the project ID](https://developer.playcanvas.com/en/user-manual/api/#project_id)
   * `PLAYCANVAS_PROJECT_ID` - [Where to find the branch ID](https://developer.playcanvas.com/en/user-manual/api/#branch_id)
3. run `npm install`
4. run `npm run watch-push:debug`.
5. This will watch the `src` folder for changes, compile into `build/main.bundle.js` and if successful, upload to your playcanvas.com project.

Please note, if you are adding new `pc.ScriptTypes` or attributes to existing ones, you will need to manually parse the script after upload in the PlayCanvas Editor. [Please read](https://github.com/playcanvas/playcanvas-sync#adding-new-files-as-script-components) this for more details.

See [playcanvas-editor-ts-template](https://github.com/playcanvas/playcanvas-editor-ts-template) for more details.