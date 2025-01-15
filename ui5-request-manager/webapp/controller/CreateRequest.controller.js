sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.company.ui5.requestmanager.ui5requestmanager.controller.CreateRequest", {
        onSubmit: function () {
            MessageToast.show("Request submitted successfully!");
        }
    });
});
