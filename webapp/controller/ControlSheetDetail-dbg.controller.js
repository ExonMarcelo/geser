var oCtrl_ControlSheetDetail;
var oFragments = {};
sap.ui.define(["jquery.sap.global", 
	"sap/ui/core/mvc/Controller", 
	"sap/m/MessageBox", 
	"sap/ui/model/Filter", 
	"sap/ui/model/FilterOperator"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator) {
	var oView;
   	//var oCore;

	return Controller.extend("com.exonmarcelo.geser.webapp.controller.ControlSheetDetail", {
		_oControlSheetCloned:{},
		onInit : function(oEvt) {
			oCtrl_ControlSheetDetail = this;
			console.log("init");
			//oCore = sap.ui.getCore();
			oView = oCtrl_ControlSheetDetail.getView();

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
			
			//oCtrl_Menu.fnInsertUserBar(oCtrl_ControlSheetDetail, "idPageCustomerDetail");
		},
		onBeforeShow:function(oEvt){
			oComponent.fnToggleButtonsTP(true);
			oComponent.fnToggleButtonUser(true);
			oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.7");

			oCtrl_ControlSheetDetail.fnToggleButtons(true);

			oCtrl_ControlSheetDetail.fnBindingDataToModel();
		},
		onAfterRendering : function(){
			//oCtrl_ControlSheetDetail.byId("idTitleUserBar").setText("Detalle de Cliente");
		},
		fnToggleButtons:function(oValue){
			oCtrl_ControlSheetDetail.byId("edit").setVisible(oValue);
			oCtrl_ControlSheetDetail.byId("save").setVisible(!oValue);
			oCtrl_ControlSheetDetail.byId("delete").setVisible(oValue);
			oCtrl_ControlSheetDetail.byId("cancel").setVisible(!oValue);

			oCtrl_ControlSheetDetail.byId("idControlSheetFormDisplay").setVisible(oValue);
			oCtrl_ControlSheetDetail.byId("idControlSheetFormEdit").setVisible(!oValue);
		},
		onPressEdit:function(oEvt){
			var oCustomer = oCore.getModel("mControlSheetDetail").getData();
			oCtrl_ControlSheetDetail._oControlSheetCloned = jQuery.extend(true, {}, oCustomer);
			oCtrl_ControlSheetDetail.fnToggleButtons(false);
		},
		onPressSave:function(oEvt){
			var oSettings = {
				sIcon : "SUCCESS",
				sMessage : Utils.fnReadTranslate("CustomerDetail.Message.Edit"),
				fnButtonOK : function(){
					oCtrl_ControlSheetDetail.fnToggleButtons(true);
					console.log("refresh data")
				}
			}
			Utils.fnShowMessage(oSettings);
		},
		onPressDelete: function(){
			var oSettings = {
				sMessage : Utils.fnReadTranslate("Message.Delete.Record"),
				fnButtonOK : function(){ console.log("removed record") },
				fnButtonNOT : function(){ console.log("canceled action") }
			}
			Utils.fnShowConfirmationMessage(oSettings);
		},
		onPressCancel:function(oEvt){
			oCore.getModel("mControlSheetDetail").setData(oCtrl_ControlSheetDetail._oControlSheetCloned);
			oCore.getModel("mControlSheetDetail").refresh();
			oCtrl_ControlSheetDetail.fnToggleButtons(true);
		},

		onAddService: function(oEvt){
			
		},

		fnBindingDataToModel: function(){
			var oControlSheet = {
				card_number : "27042019124211",
				start_date : "27/04/2019", 
				end_date : "27/04/2019",
				reason	: "Cambio de Anillos Preventivo",
				total_price : "S/. 50.00",
				SERVICES: [
					{
						id:"1",
						description: "Cambio de Anillos",
						price: "S/. 50.00"
					}
				]  
			};

			var oModel = oCore.getModel("mControlSheetDetail");
			oModel.setData(oControlSheet);
			oModel.refresh();
		},

		onItemPressServices: function(oEvt){
			var sPath = oEvt.getParameter("listItem").getBindingContext("mControlSheetDetail").sPath;
			var oCustomer = oCore.getModel("mControlSheetDetail").getProperty(sPath);
			
			var oModel = oCore.getModel("mServiceDetail") ;
			oModel.setData(oCustomer);
			oModel.refresh();
			
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_ControlSheetDetail);
			router._oConfig.transition = "slide";
			router.navTo("ServiceDetail",{},false);
		}

	});
});