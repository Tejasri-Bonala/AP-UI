sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/format/DateFormat",
    "sap/base/Log"
], function (Controller, JSONModel, MessageBox, DateFormat, Log) {
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
            var oDate = new Date();
            var oYear = oDate.getFullYear();
            var oModel = new sap.ui.model.json.JSONModel({
                currentYear: oYear.toString()
            });
            this.getView().setModel(oModel);
        },
        _getFormData: function () {
            // Collect form data from input fields
            return {
                projectNumber: this.getView().byId("projectNumber1").getValue(),
                cto_label: this.getView().byId("ctoLabel1").getSelectedKey(),
                project_maturity: this.getView().byId("projectMaturity1").getValue(),
                title: this.getView().byId("title1").getValue(),
                accounting_type: this.getView().byId("accountingType1").getSelectedKey(),
                currency: this.getView().byId("currency1").getSelectedKey(),
                forex: this.getView().byId("forex1").getValue(),
                perimeter: this.getView().byId("perimeter1").getValue(),
                plant: this.getView().byId("plant1").getValue(),
                capex: this.getView().byId("capex1").getValue(),
                opex: this.getView().byId("opex1").getValue(),
                lease: this.getView().byId("lease1").getValue(),
                categories: this.getView().byId("categories1").getSelectedKey(),
                year: this.getView().byId("year").getValue(),
                // comments: this.getView().byId("comment1").getValue()
                comments: {
                    text: this.getView().byId("comment1").getValue(), 
                    author: "User", 
                    date: new Date().toISOString() 
                }
            };
        },        

        onSubmitPress: function () {
            var model = this.getView().getModel();
            var formData = this._getFormData();
            var that = this; // Store reference to 'this'

            model.setProperty("/initialContext", formData);

            var data = {
                "definitionId": "eu10.aarini-development.aperam4.capexprocess",
                "context": formData
            };

            // AJAX request to submit data
            $.ajax({
                url: this._getWorkflowRuntimeBaseURL() + "/workflow-instances",
                method: "POST",
                contentType: "application/json",
                headers: {
                    "X-CSRF-Token": this._fetchToken()
                },
                data: JSON.stringify(data),
                success: function (result) {
                    model.setProperty("/apiResponse", JSON.stringify(result, null, 4));

                    // Show success message box
                    MessageBox.success("Workflow submitted successfully!", {
                        title: "Success",
                        onClose: function () {
                            var oView = that.getView(); // Use 'that' for correct context
                            var oComponent = that.getOwnerComponent();
                            var oRouter = oComponent.getRouter(); // Get the router

                            // Prepare data for ProductCollection
                            var oData = {
                                "Plant": oView.byId("plant1").getValue(),
                                "ProjectNumber": oView.byId("projectNumber1").getValue(),
                                "Title": oView.byId("title1").getValue(),
                                "Status": "Draft",
                                "Capex": oView.byId("capex1").getValue(),
                                "Currency": oView.byId("currency1").getValue(),
                                "Categories": oView.byId("categories1").getValue(),
                                "DateOfModification": new Date().toISOString().slice(0, 10),
                                "CTOLabel": oView.byId("ctoLabel1").getSelectedKey(),
                                "ProjectMaturity": oView.byId("projectMaturity1").getValue(),
                                "AccountingType": oView.byId("accountingType1").getSelectedKey(),
                                "Forex": oView.byId("forex1").getValue(),
                                "Perimeter": oView.byId("perimeter1").getValue(),
                                "Opex": oView.byId("opex1").getValue(),
                                "Lease": oView.byId("lease1").getValue(),
                                "YearN": oView.byId("year").getValue(),
                                "ForecastCurrentYear": oView.byId("forecastCurrentYear").getValue(),
                                "IRR": oView.byId("irr1").getValue(),
                                "PromisedGainYearN": oView.byId("promisedGainYearN").getValue(),
                                "Comments": oView.byId("comment1").getValue()
                            };

                            // Update ProductCollection model
                            var oModel = oComponent.getModel("product");
                            var aProductCollection = oModel.getProperty("/ProductCollection") || [];
                            aProductCollection.push(oData);
                            oModel.setProperty("/ProductCollection", aProductCollection);

                            // Navigate to the dashboard
                            oRouter.navTo("Routedashboard");

                            // Call the cancel function
                            that.onCancelPress();
                        }.bind(that) // Bind 'that' to preserve context
                    });
                },
                error: function (request) {
                    var response;
                    try {
                        response = JSON.parse(request.responseText);
                    } catch (e) {
                        response = { message: "An unknown error occurred." };
                    }
                    model.setProperty("/apiResponse", JSON.stringify(response, null, 4));

                    // Show error message box
                    MessageBox.error("Failed to submit workflow. Please try again.", {
                        title: "Error",
                        details: response.message || response // Display error details
                    });
                }
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
        },
        onCancelPress: function () {
            var inputIds = [
                "projectNumber1", "ctoLabel1", "projectMaturity1", "title1",
                "accountingType1", "currency1", "forex1", "perimeter1",
                "plant1", "capex1", "opex1", "lease1",
                "categories1", "yearN1", "forecastCurrentYear",
                "forecastYearN1", "forecastYearN2", "irr1",
                "promisedGainYearN", "promisedGainYearN3", "promisedGainYearN2",
                "comments1", "feedInput"
            ];

            inputIds.forEach(function (id) {
                this.getView().byId(id).setValue("");
            }, this); // Bind 'this' to maintain context
        },
        onPost: function (oEvent) {
            var oFormat = DateFormat.getDateTimeInstance({ style: "medium" });
            var oDate = new Date();
            var sDate = oFormat.format(oDate);
            var sValue = oEvent.getParameter("value");

            // create new entry
            var oEntry = {
                Author: "User",
                Type: "Reply",
                Date: "" + sDate,
                Text: sValue
            };

            // get the Feed model
            var oModel = this.getView().getModel("Feed");

            if (oModel) {
                var aEntries = oModel.getData().EntryCollection || [];
                aEntries.unshift(oEntry);
                oModel.setData({
                    EntryCollection: aEntries
                });
            } else {
                console.error("Feed model not found");
            }
        }


    });
});