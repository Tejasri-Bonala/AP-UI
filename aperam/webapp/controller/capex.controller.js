sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/base/Log"
], function (Controller, JSONModel, Log) {
    "use strict";

    return Controller.extend("com.aperam.aperam.controller.capex", {
        onInit: function () {
            // Initialize the model with empty data
            var initialModel = new JSONModel({
                initialContext: {
                    PROJECT_NUMBER: "",
                    CTO_LABEL: "",
                    PROJECT_MATURITY: "",
                    TITLE: "",
                    ACCOUNTING_TYPE: "",
                    CURRENCY: "",
                    FOREX: "",
                    PERIMETER: "",
                    PLANT: "",
                    CAPEX: "",
                    OPEX: "",
                    LEASE: "",
                    CATEGORIES: "",
                    YEAR: "",
                    COMMENTS: ""
                },                
                apiResponse: ""
            });
            this.getView().setModel(initialModel);
        },

        _getFormData: function () {
            // Collect form data from input fields
            return {
                PROJECT_NUMBER: this.getView().byId("projectNumber1").getValue(),
                CTO_LABEL: this.getView().byId("ctoLabel1").getSelectedKey(),
                PROJECT_MATURITY: this.getView().byId("projectMaturity1").getValue(),
                TITLE: this.getView().byId("title1").getValue(),
                ACCOUNTING_TYPE: this.getView().byId("accountingType1").getSelectedKey(),
                CURRENCY: this.getView().byId("currency1").getValue(),
                FOREX: this.getView().byId("forex1").getValue(),
                PERIMETER: this.getView().byId("perimeter1").getValue(),
                PLANT: this.getView().byId("plant1").getValue(),
                CAPEX: this.getView().byId("capex1").getValue(),
                OPEX: this.getView().byId("opex1").getValue(),
                LEASE: this.getView().byId("lease1").getValue(),
                CATEGORIES: this.getView().byId("categories1").getValue(),
                YEAR: this.getView().byId("year").getValue(),
                COMMENTS: this.getView().byId("comments1").getValue()
            };
        },

        onSubmitPress: function () {
            // Get the model and set the initialContext with the form data
            var model = this.getView().getModel();
            var formData = this._getFormData();

            model.setProperty("/initialContext", formData);

            var data = {
                "definitionId": "eu10.aarini-development.aperam4.capexprocess",
                "context": formData
            };

            // Make the AJAX request to submit data
            $.ajax({
                url: this._getWorkflowRuntimeBaseURL() + "/workflow-instances",
                method: "POST",
                contentType: "application/json",
                headers: {
                    "X-CSRF-Token": this._fetchToken()
                },
                data: JSON.stringify(data),
                success: function (result, xhr, data) {
                    model.setProperty(
                        "/apiResponse",
                        JSON.stringify(result, null, 4)
                    );
                },
                error: function (request, status, error) {
                    var response = JSON.parse(request.responseText);
                    model.setProperty(
                        "/apiResponse",
                        JSON.stringify(response, null, 4)
                    );
                },
            });
        },

        _fetchToken: function () {
            var fetchedToken;

            jQuery.ajax({
                url: this._getWorkflowRuntimeBaseURL() + "/xsrf-token",
                method: "GET",
                async: false,
                headers: {
                    "X-CSRF-Token": "Fetch",
                },
                success(result, xhr, data) {
                    fetchedToken = data.getResponseHeader("X-CSRF-Token");
                },
            });
            return fetchedToken;
        },
        _getWorkflowRuntimeBaseURL: function () {
            var appId = this.getOwnerComponent().getManifestEntry("sap.app").id;
            var appPath = appId.replace(/\./g, "/");
            var appModulePath = sap.ui.require.toUrl(appPath);
            return appModulePath + "/bpmworkflowruntime/v1";
        },
        onAccountingTypeChange: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            var sSelectedKey = oSelectedItem ? oSelectedItem.getKey() : null;

            // Update the model property for selectedAccountingType
            this.getView().getModel().setProperty("/selectedAccountingType", sSelectedKey);
        }

    });
});
