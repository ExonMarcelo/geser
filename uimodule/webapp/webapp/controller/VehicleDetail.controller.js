var oCtrl_VehicleDetail;
var oFragments = {};
sap.ui.define(["jquery.sap.global", 
	"sap/ui/core/mvc/Controller", 
	"sap/m/MessageBox", 
	"sap/ui/model/Filter", 
	"sap/ui/model/FilterOperator"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator) {
	var oView;
   	//var oCore;

	return Controller.extend("com.exonmarcelo.geser.webapp.controller.VehicleDetail", {
		_oCustomerCloned:{},
		onInit : function(oEvt) {
			oCtrl_VehicleDetail = this;
			console.log("init");
			//oCore = sap.ui.getCore();
			oView = oCtrl_VehicleDetail.getView();

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
			
			//oCtrl_Menu.fnInsertUserBar(oCtrl_VehicleDetail, "idPageCustomerDetail");
		},
		onBeforeShow:function(oEvt){
			oComponent.fnToggleButtonsTP(true);
			oComponent.fnToggleButtonUser(true);
			oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.6");

			oCtrl_VehicleDetail.fnToggleButtons(true);
		},
		onAfterRendering : function(){
			//oCtrl_VehicleDetail.byId("idTitleUserBar").setText("Detalle de Cliente");
		},
		fnToggleButtons:function(oValue){
			oCtrl_VehicleDetail.byId("edit").setVisible(oValue);
			oCtrl_VehicleDetail.byId("save").setVisible(!oValue);
			oCtrl_VehicleDetail.byId("delete").setVisible(oValue);
			oCtrl_VehicleDetail.byId("cancel").setVisible(!oValue);

			oCtrl_VehicleDetail.byId("idVehicleFormDisplay").setVisible(oValue);
			oCtrl_VehicleDetail.byId("idVehicleFormEdit").setVisible(!oValue);
		},
		onPressEdit:function(oEvt){
			var oCustomer = oCore.getModel("mCustomerDetail").getData();
			oCtrl_VehicleDetail._oCustomerCloned = jQuery.extend(true, {}, oCustomer);
			oCtrl_VehicleDetail.fnToggleButtons(false);
		},
		onPressSave:function(oEvt){
			var oSettings = {
				sIcon : "SUCCESS",
				sMessage : "Cliente modificado con éxito",
				fnButtonOK : function(){
					oCtrl_VehicleDetail.fnToggleButtons(true);
					console.log("refresh data")
				}
			};
			Utils.fnShowMessage(oSettings);
		},
		onPressDelete: function(){
			var oSettings = {
				sMessage : "¿Desea eliminar este registro?",
				fnButtonOK : function(){ console.log("removed record") },
				fnButtonNOT : function(){ console.log("canceled action") }
			}
			Utils.fnShowConfirmationMessage(oSettings);
		},
		onPressCancel:function(oEvt){
			oCore.getModel("mCustomerDetail").setData(oCtrl_VehicleDetail._oCustomerCloned);
			oCore.getModel("mCustomerDetail").refresh();
			oCtrl_VehicleDetail.fnToggleButtons(true);
		},

		onNewControlSheet: function(oEvt){
			Utils.fnNewControlSheet(true);
		},

		onItemPressControlSheets: function(oEvt){
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_VehicleDetail);
			router._oConfig.transition = "slide";
			router.navTo("ControlSheetDetail",{},false);
		}

	});
});