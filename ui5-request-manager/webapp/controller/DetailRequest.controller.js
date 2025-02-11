sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
], function (Controller, MessageToast, History, UIComponent) {
    "use strict";

    return Controller.extend("com.company.ui5.requestmanager.ui5requestmanager.controller.DetailRequest", {
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
            oRouter.getRoute("detail").attachPatternMatched(this._onRouteMatched, this);
        },

        /**
         * Called when the route is matched to this view.
         * Retrieves the request ID and binds the data to the view.
         */
        _onRouteMatched: function (oEvent) {
            var sRequestId = oEvent.getParameter("arguments").id;

            // Verifica que el modelo existe y tiene datos
            var oModel = this.getView().getModel();
            if (!oModel || !oModel.getProperty("/requests")) {
                console.error("The model or /requests property is not defined.");
                MessageToast.show("Data is not available.");
                return;
            }

            // Busca la solicitud por ID
            var aRequests = oModel.getProperty("/requests");
            var oRequest = aRequests.find(function (request) {
                return request.id === sRequestId;
            });

            if (oRequest) {
                // Vincula el modelo de la solicitud seleccionada
                var oSelectedRequestModel = new sap.ui.model.json.JSONModel(oRequest);
                this.getView().setModel(oSelectedRequestModel, "selectedRequest");
            } else {
                MessageToast.show("Request not found.");
            }
        },

        /**
         * Event handler for the 'Edit' button.
         * Navigates to an edit page or enables editing in this view.
         */
        onEdit: function () {
            // Obtén el modelo de la solicitud seleccionada
            var oModel = this.getView().getModel("selectedRequest");
            if (!oModel) {
                sap.m.MessageToast.show("No data available for editing.");
                return;
            }

            // Obtén el ID de la solicitud
            var sRequestId = oModel.getProperty("/id");

            // Navega a la vista de edición
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("edit", {
                id: sRequestId
            });
        },

        /**
         * Event handler for the 'Back' button.
         * Navigates to the previous page or the main view.
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
