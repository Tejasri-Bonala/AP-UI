sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	var CController = Controller.extend("com.aperam.aperam.blocks.Comments", {
		onParentBlockModeChange: function (sMode) {
			// this.oParentBlock is available here
		}
	});

	return CController;
});
