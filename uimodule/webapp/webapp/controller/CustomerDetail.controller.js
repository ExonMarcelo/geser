var oCtrl_CustomerDetail;
var oFragments = {};
sap.ui.define(["jquery.sap.global", 
	"sap/ui/core/mvc/Controller", 
	"sap/m/MessageBox", 
	"sap/ui/model/Filter", 
	"sap/ui/model/FilterOperator"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator) {
	var oView;
   	//var oCore;

	return Controller.extend("com.exonmarcelo.geser.webapp.controller.CustomerDetail", {
		_oCustomerCloned:{},
		onInit : function(oEvt) {
			oCtrl_CustomerDetail = this;
			console.log("init");
			//oCore = sap.ui.getCore();
			oView = oCtrl_CustomerDetail.getView();

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
			
			//oCtrl_Menu.fnInsertUserBar(oCtrl_CustomerDetail, "idPageCustomerDetail");
		},
		onBeforeShow:function(oEvt){
			oComponent.fnToggleButtonsTP(true);
			oComponent.fnToggleButtonUser(true);
			oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.4");

			oCtrl_CustomerDetail.fnToggleButtons(true);
			oCtrl_CustomerDetail.fnToggleModeVehicles(true);
			oCtrl_CustomerDetail.fnCreateVBoxWithImage();
		},
		onAfterRendering : function(){
			//oCtrl_CustomerDetail.byId("idTitleUserBar").setText("Detalle de Cliente");
		},
		fnToggleButtons:function(oValue){
			oCtrl_CustomerDetail.byId("edit").setVisible(oValue);
			oCtrl_CustomerDetail.byId("save").setVisible(!oValue);
			oCtrl_CustomerDetail.byId("delete").setVisible(oValue);
			oCtrl_CustomerDetail.byId("cancel").setVisible(!oValue);

			oCtrl_CustomerDetail.byId("idCustomerFormDisplay").setVisible(oValue);
			oCtrl_CustomerDetail.byId("idCustomerFormEdit").setVisible(!oValue);
		},
		onPressEdit:function(oEvt){
			var oCustomer = oCore.getModel("mCustomerDetail").getData();
			oCtrl_CustomerDetail._oCustomerCloned = jQuery.extend(true, {}, oCustomer);
			oCtrl_CustomerDetail.fnToggleButtons(false);
		},
		onPressSave:function(oEvt){
			var oSettings = {
				sIcon : "SUCCESS",
				sMessage : Utils.fnReadTranslate("CustomerDetail.Message.Edit"),
				fnButtonOK : function(){
					oCtrl_ServCardDetail.fnToggleButtons(true);
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
			oCore.getModel("mCustomerDetail").setData(oCtrl_CustomerDetail._oCustomerCloned);
			oCore.getModel("mCustomerDetail").refresh();
			oCtrl_CustomerDetail.fnToggleButtons(true);
		},

		onPressAvatar: function(oEvt){
			var sPath = oEvt.getSource().getParent().getCustomData()[0].getValue();
			alert("click on avatar: "+sPath);
		},
		
		fnCreateVBoxWithImage:function(aData){
			var aData=[
				{
					image:"https://image.flaticon.com/icons/svg/1168/1168000.svg",
					plate:"EM-1234"
				},
				{
					image:"https://image.flaticon.com/icons/svg/296/296210.svg",
					plate:"EM-456"
				},
				{
					image:"https://image.flaticon.com/icons/svg/1205/1205960.svg",
					plate:"EM-847"
				},
				{
					image:"https://image.flaticon.com/icons/svg/226/226569.svg",
					plate:"EM-949"
				}
			];

			var oGrid = oCtrl_CustomerDetail.byId("gridImgsVehicles");
			oGrid.destroyContent();

			for (var i = 0; i < aData.length; i++) {
				var oVBox = new sap.m.VBox({
					alignItems:"Center",
					items:[
						new sap.f.Avatar({
							src: aData[i].image,
							displaySize:"M", 
							press: oCtrl_CustomerDetail.onPressAvatar
						}),
						new sap.m.Text({text: aData[i].plate})
					],
					customData:[
						new sap.ui.core.CustomData({key:"path", value:"oModel/"+i})
					]
				}).addStyleClass("emjMarginBottom10");

				oGrid.addContent(oVBox);
				
			}
			
		},

		onSelectionChangeModeVehicles: function(oEvt){
			var oKey = oEvt.getSource().getSelectedKey();
			if (oKey == "modeImage") {
				oCtrl_CustomerDetail.fnToggleModeVehicles(true);
			} else {
				oCtrl_CustomerDetail.fnToggleModeVehicles(false);
			}
		},

		fnToggleModeVehicles: function(oValue){
			oCtrl_CustomerDetail.byId("gridImgsVehicles").setVisible(oValue);
			oCtrl_CustomerDetail.byId("tableVehiclesOnCustDetail").setVisible(!oValue);
		},

		onNewVehicle: function(oEvt){
			Utils.fnDialogNewVehicle();
		}

	});
});