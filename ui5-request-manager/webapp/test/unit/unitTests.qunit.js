/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"comcompanyui5requestmanager/ui5-request-manager/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});