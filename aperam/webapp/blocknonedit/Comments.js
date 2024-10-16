sap.ui.define([
    "sap/uxap/BlockBase"
], function(BlockBase) {
    "use strict";

    return BlockBase.extend("com.aperam.aperam.blocknonedit.Comments", {  
        metadata: {
            views: {
                Collapsed: {
                    viewName: "com.aperam.aperam.blocknonedit.Comments",
                    type: "XML"
                },
                Expanded: {
                    viewName: "com.aperam.aperam.blocknonedit.Comments", 
                    type: "XML"
                }
            }
        }
    });
});
