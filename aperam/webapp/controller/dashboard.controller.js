sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("com.aperam.aperam.controller.dashboard", {
        onInit: function () {

        },
        onSearch: function () {
            // Get values from the input fields
            var projectNumberValue = this.byId("projectNumberInput").getValue();
            // Create filters based on input values
            var filters = [];
            if (projectNumberValue) {
                filters.push(new sap.ui.model.Filter("ProjectNumber", sap.ui.model.FilterOperator.Contains, projectNumberValue));
            }
            // Apply filters to the table binding
            var oTable = this.byId("idProductsTable");
            var oBinding = oTable.getBinding("items");
            oBinding.filter(filters);
        },
        onItemPress: function (oEvent) {
            // Get the selected item
            var oSelectedItem = oEvent.getSource().getSelectedItem();
            var oBindingContext = oSelectedItem.getBindingContext("product");
            
            // Get the selected project number
            var sProjectNumber = oBindingContext.getProperty("ProjectNumber");

            // Navigate to the ProjectDetail page with the project number as a parameter
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("projectDetail", {
                ProjectNumber: sProjectNumber
            });
        },
        onCreateproduct:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("capex");
        },
        
    });
});
