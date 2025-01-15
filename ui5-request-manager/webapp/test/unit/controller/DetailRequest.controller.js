sap.ui.define([
    "comcompanyui5requestmanager/ui5-request-manager/controller/DetailRequest.controller"
], function (DetailRequestController) {
    "use strict";

    QUnit.module("DetailRequest Controller", {
        beforeEach: function () {
            this.oController = new DetailRequestController();
        },
        afterEach: function () {
            this.oController.destroy();
        }
    });

    QUnit.test("Should navigate to Edit view on onEdit", function (assert) {
        // Arrange
        var oRouterStub = {
            navTo: sinon.stub()
        };
        sinon.stub(sap.ui.core.UIComponent, "getRouterFor").returns(oRouterStub);

        var oModel = new sap.ui.model.json.JSONModel({
            id: "1",
            requestName: "Test Request"
        });
        this.oController.getView = sinon.stub().returns({
            getModel: sinon.stub().withArgs("selectedRequest").returns(oModel)
        });

        // Act
        this.oController.onEdit();

        // Assert
        assert.ok(oRouterStub.navTo.calledOnce, "Router navigation was called");
        assert.ok(oRouterStub.navTo.calledWith("edit", { id: "1" }), "Navigation to edit with correct ID");

        // Cleanup
        sap.ui.core.UIComponent.getRouterFor.restore();
    });

    QUnit.test("Should handle back navigation on onNavBack", function (assert) {
        // Arrange
        var oHistoryStub = sinon.stub(sap.ui.core.routing.History.getInstance(), "getPreviousHash").returns(undefined);
        var oRouterStub = {
            navTo: sinon.stub()
        };
        sinon.stub(sap.ui.core.UIComponent, "getRouterFor").returns(oRouterStub);

        // Act
        this.oController.onNavBack();

        // Assert
        assert.ok(oRouterStub.navTo.calledOnce, "Router navigation was called when there is no history");
        assert.ok(oRouterStub.navTo.calledWith("main", {}, true), "Navigation to main view");

        // Cleanup
        sap.ui.core.routing.History.getInstance.restore();
        sap.ui.core.UIComponent.getRouterFor.restore();
    });
});
