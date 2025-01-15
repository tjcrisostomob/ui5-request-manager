sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui5-request-manager.controller.CreateRequest", {
        onSubmit: function () {
            MessageToast.show("Request submitted successfully!");
        }
    });
});
