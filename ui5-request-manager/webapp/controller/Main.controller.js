sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
], function (Controller, JSONModel, MessageToast, History, UIComponent) {
    "use strict";

    return Controller.extend("com.company.ui5.requestmanager.ui5requestmanager.controller.Main", {
        /**
         * Called when the controller is instantiated.
         */
        onInit: function () {
            // Example JSON Model for mock data
            var oModel = new sap.ui.model.json.JSONModel({
                requests: [
                    {
                        id: "1",
                        requestName: "New Office Chairs",
                        requestDescription: "Purchase of ergonomic office chairs",
                        createdBy: "John Doe",
                        createdDate: "2025-01-01",
                        priority: "High",
                        status: "Pending"
                    },
                    {
                        id: "2",
                        requestName: "IT Support",
                        requestDescription: "Setup new laptops for HR department",
                        createdBy: "Jane Smith",
                        createdDate: "2025-01-02",
                        priority: "Medium",
                        status: "Approved"
                    },
                    {
                        id: "3",
                        requestName: "Office Renovation",
                        requestDescription: "Redesign the main office space",
                        createdBy: "Michael Johnson",
                        createdDate: "2025-01-03",
                        priority: "Low",
                        status: "Rejected"
                    }
                ]
            });

            // Set the model to the view
            this.getView().setModel(oModel);

        },

        /**
         * Event handler for selecting a request from the list.
         */
        onRequestSelect: function (oEvent) {
            // Get the selected item
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext();
            var sRequestId = oContext.getProperty("id");

            // Navigate to the Detail view with the selected request ID
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("detail", {
                id: sRequestId
            });
        },

        /**
         * Event handler for navigating back (if applicable).
         */
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("main", {}, true);
            }
        }
    });
});
