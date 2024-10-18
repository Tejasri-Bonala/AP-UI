sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    var CController = Controller.extend("com.aperam.aperam.blocknonedit.Custom", {
        determineFieldVisibility: function(accountingType, fieldType) {
            switch (accountingType) {
                case "Capex":
                    return fieldType === "Capex";
                case "Opex":
                    return fieldType === "Opex";
                case "Lease":
                    return fieldType === "Lease";
                case "Capex/Opex":
                    return fieldType === "Capex" || fieldType === "Opex";
                default:
                    return false;
            }
        },
        
        onInit: function () {
            // Initialize your model or any required setup here.
        },

        onParentBlockModeChange: function (sMode) {
            // this.oParentBlock is available here
        }
    });

    return CController;
});
