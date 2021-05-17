var oCtrl_Login;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Button"
], function(Controller) {
	"use strict";

	return Controller.extend("com.exonmarcelo.geser.webapp.controller.Login", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.exonmarcelo.geser.webapp.view.Content1
		 */
		onInit: function() {
			oCtrl_Login = this;
			var oView = this.getView();

			oView.addEventDelegate({
				// not added the controller as delegate to avoid controller functions with similar names as the events
				onBeforeShow : jQuery.proxy(function(oEvt) {
					this.onBeforeShow(oEvt);
				}, this),
				/*onAfterShow : jQuery.proxy(function(oEvt) {
					this.onAfterShow(oEvt);
				}, this),
				onAfterHide : jQuery.proxy(function(oEvt) {
					this.onAfterHide(oEvt);
				}, this)*/
			});
		},

		onBeforeShow:function(oEvt){
			oComponent.fnToggleButtonsTP(false);
			oComponent.fnToggleButtonUser(false);
			oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title");
		},

		onPressLogin : function () {
			oCtrl_Login.getOwnerComponent().getRouter().navTo("Main");
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.exonmarcelo.geser.webapp.view.Content1
		 */
		onBeforeRendering: function() {
			oComponent.fnToggleButtonsTP(false);
			oComponent.fnToggleButtonUser(false);
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.exonmarcelo.geser.webapp.view.Content1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.exonmarcelo.geser.webapp.view.Content1
		 */
		//	onExit: function() {
		//
		//	}

	});

});