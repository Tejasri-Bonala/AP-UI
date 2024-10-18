sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    var CController = Controller.extend("com.aperam.aperam.blocknonedit.Workflow", {
        onParentBlockModeChange: function (sMode) {
            // this.oParentBlock is available here
        },

        // Function to map project status to ProcessFlowNode state
        mapStatusToState: function (status) {
            switch (status) {
                case "Draft":
                    return "Neutral";
                case "Site Validated":
                    return "Positive";
                case "Division Validated":
                    return "Critical";
                case "Corporate Validated":
                    return "Planned";
                case "Validated":
                    return "Positive";
                case "Publish":
                    return "Negative";
                default:
                    return "Neutral"; // Default state if status doesn't match any case
            }
        }
    });

    return CController;
});
