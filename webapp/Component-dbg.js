var oComponent;
var oCore;
var oBusyDialog;
sap.ui.define([
	"sap/ui/core/UIComponent"
], function(UIComponent) {
	"use strict";

	return UIComponent.extend("com.exonmarcelo.geser.webapp.Component", {

		metadata: {
			//manifest: "json"
			rootView: {
				"viewName": "com.exonmarcelo.geser.webapp.view.App",
				"type": "XML",
				"async": true
			},
			routing: {
				config: {
					routerClass: "sap.m.routing.Router",
					viewPath: "com.exonmarcelo.geser.webapp.view",
					controlId: "rootControl",
					controlAggregation: "pages",
					viewType: "XML",
					async: true
				},
				routes: [
					
					{
						name: "Login",
						pattern: "",
						view: "Login",
						viewId: "ViewLogin"
					},
					{
						name: "Main",
						pattern: "Main",
						view: "Main",
						viewId: "ViewMain"
					},
					{
						name: "Catalogs",
						pattern: "Catalogs",
						view: "Catalogs",
						viewId: "ViewCatalogs"
					},
					{
						name: "MonitorCustomers",
						pattern: "MonitorCustomers",
						view: "MonitorCustomers",
						viewId: "ViewMonitorCustomers"
					},
					{
						name: "CustomerDetail",
						pattern: "CustomerDetail",
						view: "CustomerDetail",
						viewId: "ViewCustomerDetail"
					},
					{
						name: "MonitorVehicles",
						pattern: "MonitorVehicles",
						view: "MonitorVehicles",
						viewId: "ViewMonitorVehicles"
					},
					{
						name: "VehicleDetail",
						pattern: "VehicleDetail",
						view: "VehicleDetail",
						viewId: "ViewVehicleDetail"
					},
					{
						name: "ControlSheetDetail",
						pattern: "ControlSheetDetail",
						view: "ControlSheetDetail",
						viewId: "ViewControlSheetDetail"
					},
					{
						name: "MonitoringServices",
						pattern: "MonitoringServices",
						view: "MonitorMonitoringServices",
						viewId: "ViewMonitoringServices"
					},
					{
						name: "MonitorAppointments",
						pattern: "MonitorAppointments",
						view: "MonitorAppointments",
						viewId: "ViewMonitorAppointments"
					},
					{
						name: "ServiceDetail",
						pattern: "ServiceDetail",
						view: "ServiceDetail",
						viewId: "ViewServiceDetail"
					},
					{
						name: "MonitorPersonal",
						pattern: "MonitorPersonal",
						view: "MonitorPersonal",
						viewId: "ViewMonitorPersonal"
					},
					{
						name: "PersonalDetail",
						pattern: "PersonalDetail",
						view: "PersonalDetail",
						viewId: "ViewPersonalDetail"
					},
					{
						name: "MonitorServices",
						pattern: "MonitorServices",
						view: "MonitorServices",
						viewId: "ViewMonitorServices"
					},
					{
						name: "MonitorSpares",
						pattern: "MonitorSpares",
						view: "MonitorSpares",
						viewId: "ViewMonitorSpares"
					},
				]
			}
			
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {

			oComponent = this;
			oCore = sap.ui.getCore();
			oBusyDialog = new sap.m.BusyDialog();

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			var aDataModels = [
				{alias:"mUser", url:"", dataFromFunction: undefined},
				{alias:"mMain", url:"./public/json/main.json", dataFromFunction: undefined},
				{alias:"mMonitoringDetail", url:"", dataFromFunction: undefined},
				{alias:"mAppointmentDetail", url:"", dataFromFunction: undefined},
				{alias:"mCatalogs", url:"./public/json/catalogs.json", dataFromFunction: undefined},
				{alias:"mCustomerDetail", url:"", dataFromFunction: undefined},
				{alias:"mFilt", url:"", dataFromFunction: oFilters.returnData},
				{alias:"mFiltItems", url:"", dataFromFunction: oFiltersItems.returnData},
				{alias:"mLocalFilters", url:"", dataFromFunction: undefined},
				{alias:"mVehicleDetail", url:"", dataFromFunction: undefined},
				{alias:"mControlSheetDetail", url:"", dataFromFunction: undefined},
				{alias:"mMonitor", url:"./public/json/monitors.json", dataFromFunction: undefined},
				{alias:"mServiceDetail", url:"", dataFromFunction: undefined},
				{alias:"mGlobal", url:"./public/json/global.json", dataFromFunction: undefined},
				{alias:"mSparePartDetail", url:"", dataFromFunction: undefined},
				{alias:"mLatheServiceDetail", url:"", dataFromFunction: undefined},
				{alias:"mExternalServiceDetail", url:"", dataFromFunction: undefined},
				{alias:"mPersonalDetail", url:"", dataFromFunction: undefined},
				{alias:"mCatServiceDetail", url:"", dataFromFunction: undefined},
				{alias:"mCatSpareDetail", url:"", dataFromFunction: undefined}
			];

			oComponent.fnCreateModels(aDataModels);

			//bind i18n model to component
			var sLangu = sap.ui.getCore().getConfiguration().getLanguage().toLowerCase(); // "es-Es";  idioma espaÃ±ol
			sLangu = sLangu.split("-")[0];
			//recursos del modelo
			oI18nModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl : "public/i18n/i18n.properties",
				bundleLocale: sLangu
			});
			oComponent.setModel(oI18nModel,"i18n");
			
			var router = this.getRouter();
			this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
			router.initialize();
		},
		fnCreateModels: function(aData){
			aData.forEach(function(element){
				var oJsonModel = (element.url !== "") ? new sap.ui.model.json.JSONModel(element.url) : new sap.ui.model.json.JSONModel();
				if (element.dataFromFunction != undefined) {
					var oData = element.dataFromFunction();
					oJsonModel.setData(oData);
				}
				oCore.setModel(oJsonModel, element.alias);
				oComponent.setModel(oJsonModel, element.alias);
			});
		},

		fnCleanModel: function(sAliasModel){
			oCore.getModel(sAliasModel).setData({});
			oCore.getModel(sAliasModel).refresh();
		},

		fnToggleButtonsTP: function(oValue){
			oCore.byId("btnBack").setVisible(oValue);
			oCore.byId("btnHome").setVisible(oValue);
		},

		fnToggleButtonUser: function(oValue){
			oCore.byId("btnUser").setVisible(oValue);
		},

		fnChangeTitleApp: function(oValue){
			var oText = Utils.fnReadTranslate(oValue);
			oCore.byId("titleApp").setText(oText);
		}

	});

});