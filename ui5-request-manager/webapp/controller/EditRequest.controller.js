sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
], function (Controller, MessageToast, History, UIComponent) {
    "use strict";

    return Controller.extend("com.company.ui5.requestmanager.ui5requestmanager.controller.EditRequest", {
        /**
         * Called when the controller is instantiated.
         */
        onInit: function () {
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
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("edit").attachPatternMatched(this._onRouteMatched, this);
        },

        /**
         * Called when the route is matched.
         */
        _onRouteMatched: function (oEvent) {
            var sRequestId = oEvent.getParameter("arguments").id;

            // Obtén el modelo de solicitudes y encuentra la solicitud por ID
            var oModel = this.getView().getModel();
            var aRequests = oModel.getProperty("/requests");
            var oRequest = aRequests.find(function (request) {
                return request.id === sRequestId;
            });

            if (oRequest) {
                var oSelectedRequestModel = new sap.ui.model.json.JSONModel(oRequest);
                this.getView().setModel(oSelectedRequestModel, "selectedRequest");
            } else {
                MessageToast.show("Request not found.");
            }
        },

        /**
         * Handles saving the changes.
         */
        onSave: function () {
            MessageToast.show("Changes saved successfully.");
            this._navBack();
        },

        /**
         * Handles canceling the changes.
         */
        onCancel: function () {
            MessageToast.show("Edit canceled.");
            this._navBack();
        },

        /**
         * Navigates back to the previous page.
         */
        _navBack: function () {
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
