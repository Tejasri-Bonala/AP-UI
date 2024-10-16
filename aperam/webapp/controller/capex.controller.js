sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("com.aperam.aperam.controller.capex", {
            onInit: function () {

            },
            onCancelPress: function () {
                // Get the view
                this.getView().byId("projectNumber1").setValue();
                this.getView().byId("ctoLabel1").setValue();
                this.getView().byId("projectMaturity1").setValue();
                this.getView().byId("title1").setValue();
                this.getView().byId("accountingType1").setValue();
                this.getView().byId("currency1").setValue();
                this.getView().byId("forex1").setValue();
                this.getView().byId("perimeter1").setValue();
                this.getView().byId("plant1").setValue();
                this.getView().byId("capex1").setValue();
                this.getView().byId("opex1").setValue();
                this.getView().byId("lease1").setValue();
                this.getView().byId("categories1").setValue();
                this.getView().byId("yearN1").setValue();
                this.getView().byId("forecastCurrentYear").setValue();
                this.getView().byId("forecastYearN1").setValue();
                this.getView().byId("forecastYearN2").setValue();
                this.getView().byId("irr1").setValue();
                this.getView().byId("promisedGainYearN").setValue();
                this.getView().byId("promisedGainYearN3").setValue();
                this.getView().byId("promisedGainYearN2").setValue();
                this.getView().byId("comments1").setValue();
                this.getView().byId("feedInput").setValue();
            },
            // _getBaseUrlOfProcess: function () {
            //     const appId = this.getOwnerComponent().getManifestEntry("/sap.app/id")
            //     const appPath = appId.replaceAll(".", "/")
            //     const appModulePath = jQuery.sap.getModulePath(appPath);
            //     return appModulePath + "/com.sap.spa.processautomation"
            // },
            // onSubmitPress: function () {
            //     const url = "/com.aperam.workflowuimodule/bpmworkflowruntime/v1/xsrf-token";
            //     let payload = {
            //         "definitionId": "eu10.aarini-development.aperam4.capexprocess",
            //         "context": {
            //             PROJECT_NUMBER: this.getView().byId("projectNumber1").getValue(),
            //             CAPEX: this.getView().byId("capex1").getValue(),
            //             OPEX: this.getView().byId("opex1").getValue(),
            //             YEAR: this.getView().byId("yearN1").getValue(),
            //             PLANT: this.getView().byId("plant1").getValue()
            //         }
            //     };

            //     $.ajax({
            //         url: url, 
            //         method: "POST",
            //         contentType: "application/json",
            //         data: JSON.stringify(payload),
            //         success: function (response) {
            //             sap.m.MessageBox.success("Workflow started successfully!");
            //         },
            //         error: function (error) {
            //             sap.m.MessageBox.error("Failed to start the workflow.");
            //         }
            //     });
            // }
            onSubmitPress: function () {
                var workflowStartPayload = {
                    definitionId: "eu10.aarini-development.aperam4.capexprocess",
                    context: {
                        PROJECT_NUMBER: this.getView().byId("projectNumber1").getValue(),
                        CAPEX: this.getView().byId("capex1").getValue(),
                        OPEX: this.getView().byId("opex1").getValue(),
                        YEAR: this.getView().byId("yearN1").getValue(),
                        PLANT: this.getView().byId("plant1").getValue()
                    }
                };
            
                // AJAX call to start the workflow instance directly
                $.ajax({
                    url: "/com.aperam.workflowuimodule/bpmworkflowruntime/v1/workflow-instances",
                    method: "POST",
                    contentType: "application/json",
                    headers: {
                        "X-CSRF-Token": "Fetch"  // Requesting the CSRF token
                    },
                    data: JSON.stringify(workflowStartPayload),
                    success: function () {
                        sap.m.MessageBox.information("The workflow has successfully started");
                    },
                    error: function (error) {
                        sap.m.MessageBox.error("Failed to start the workflow. Please try again.");
                        console.error("Workflow start error:", error);
                    }
                });
            }
            
        });
    });
