sap.ui.define([
    "sap/uxap/BlockBase"
], function(BlockBase) {
    "use strict";

    return BlockBase.extend("com.aperam.aperam.blocks.Workflow", {  
        metadata: {
            views: {
                Collapsed: {
                    viewName: "com.aperam.aperam.blocks.Workflow",
                    type: "XML"
                },
                Expanded: {
                    viewName: "com.aperam.aperam.blocks.Workflow", 
                    type: "XML"
                }
            }
        }
    });
});
