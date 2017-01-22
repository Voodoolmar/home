
declare module Pickmeup {

	interface JQueryPickmeupOptions {
	}

	interface PickmeupStatic {
	}

	interface PickmeupStaticDefaults {
	}

	interface PickmeupDefaults {
	}

	interface JQueryStatic {
		pickmeup: PickmeupStatic;
	}

	interface JQuery {
		pickmeup(options?: JQueryPickmeupOptions): JQuery;
	}
}

declare module "pickmeup" {
    export = Pickmeup;
}
