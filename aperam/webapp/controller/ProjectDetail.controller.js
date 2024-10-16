sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("com.aperam.aperam.controller.ProjectDetail", {

        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("projectDetail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            // Get the project number from the route
            var sProjectNumber = oEvent.getParameter("arguments").ProjectNumber;

            // Find the corresponding project data in the product model
            var oModel = this.getView().getModel("product");
            var aProducts = oModel.getProperty("/ProductCollection");
            
            // Search for the product with the matching ProjectNumber
            var oSelectedProduct = aProducts.find(function (product) {
                return product.ProjectNumber === sProjectNumber;
            });

            // If found, bind the view to the selected product
            if (oSelectedProduct) {
                var oView = this.getView();
                oView.setModel(new sap.ui.model.json.JSONModel(oSelectedProduct), "selectedProject");
                oView.bindElement({
                    path: "/",
                    model: "selectedProject"
                });
            }
        }
        
    });
});
