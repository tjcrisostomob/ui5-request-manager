sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press",
    "sap/ui/test/matchers/Properties",
    "comcompanyui5requestmanager/ui5-request-manager/test/integration/arrangements/Startup",
    "comcompanyui5requestmanager/ui5-request-manager/test/integration/NavigationJourney"
], function (Opa5, Press, Properties, Startup, NavigationJourney) {
    "use strict";

    Opa5.extendConfig({
        arrangements: new Startup(),
        viewNamespace: "sap.ui5-request-manager.view.",
        autoWait: true
    });

    Opa5.createPageObjects({
        onTheDetailRequestPage: {
            actions: {
                iPressOnEdit: function () {
                    return this.waitFor({
                        id: "btnEditRequest",
                        actions: new Press(),
                        errorMessage: "Edit button not found"
                    });
                }
            },
            assertions: {
                iShouldSeeEditPage: function () {
                    return this.waitFor({
                        controlType: "sap.m.Page",
                        matchers: new Properties({ title: "Edit Request" }),
                        success: function () {
                            Opa5.assert.ok(true, "Navigated to the Edit Request page");
                        },
                        errorMessage: "Did not navigate to the Edit Request page"
                    });
                }
            }
        }
    });

    Opa5.createPageObjects({
        onTheEditRequestPage: {
            actions: {
                iPressSave: function () {
                    return this.waitFor({
                        id: "btnSaveRequest",
                        actions: new Press(),
                        errorMessage: "Save button not found"
                    });
                }
            },
            assertions: {
                iShouldNavigateBack: function () {
                    return this.waitFor({
                        controlType: "sap.m.Page",
                        matchers: new Properties({ title: "Request Details" }),
                        success: function () {
                            Opa5.assert.ok(true, "Navigated back to the Request Details page");
                        },
                        errorMessage: "Did not navigate back to the Request Details page"
                    });
                }
            }
        }
    });

    QUnit.module("DetailRequest Integration Journey");

    QUnit.test("Should navigate to Edit Request page and back", function (assert) {
        var done = assert.async();

        Opa5.emptyQueue();

        Opa5.getHashChanger().setHash("/detail/1");

        Opa5.getTestHarness().start().then(function () {
            onTheDetailRequestPage.iPressOnEdit();
            onTheDetailRequestPage.iShouldSeeEditPage();
            onTheEditRequestPage.iPressSave();
            onTheEditRequestPage.iShouldNavigateBack();
            done();
        });
    });
});
