sap.ui.define([
    "sap/uxap/BlockBase"
], function(BlockBase) {
    "use strict";

    return BlockBase.extend("com.aperam.aperam.blocknonedit.Custom", {  
        metadata: {
            views: {
                Collapsed: {
                    viewName: "com.aperam.aperam.blocknonedit.Custom",
                    type: "XML"
                },
                Expanded: {
                    viewName: "com.aperam.aperam.blocknonedit.Custom", 
                    type: "XML"
                }
            }
        }
    });
});
