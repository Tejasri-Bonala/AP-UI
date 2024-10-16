sap.ui.define([
    "sap/uxap/BlockBase"
], function(BlockBase) {
    "use strict";

    return BlockBase.extend("com.aperam.aperam.Comments", {  
        metadata: {
            views: {
                Collapsed: {
                    viewName: "com.aperam.aperam.blocks.Comments",
                    type: "XML"
                },
                Expanded: {
                    viewName: "com.aperam.aperam.blocks.Comments", 
                    type: "XML"
                }
            }
        }
    });
});
