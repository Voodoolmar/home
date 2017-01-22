// Type definitions for PhantomJS bridge for NodeJS
// Project: https://github.com/sgentle/phantomjs-node
// Definitions by: horiuchi <https://github.com/horiuchi/>, Random <https://github.com/llRandom/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "phantom-render-stream" {
    interface Phantom {
        (): any;
        new (): any;
    }

    var Phantom: Phantom;
    export = Phantom
}