var oCtrl_Catalogos;
var oFragments = {};
sap.ui.define(["jquery.sap.global", 
	"sap/ui/core/mvc/Controller", 
	"sap/m/MessageBox", 
	"sap/ui/model/Filter", 
	"sap/ui/model/FilterOperator"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, UserBarController) {
	var oView;
   	//var oCore;

	return Controller.extend("com.exonmarcelo.geser.webapp.controller.Catalogs", {

		onInit : function(oEvt) {
			oCtrl_Catalogos = this;
			console.log("init");
			oView = oCtrl_Catalogos.getView();

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

			//oCtrl_Menu.fnInsertUserBar(oCtrl_Catalogos, "idPageCatalogs");
		},
		onBeforeShow:function(oEvt){
			oComponent.fnToggleButtonsTP(true);
			oComponent.fnToggleButtonUser(true);
			oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.2");
		},
		onAfterRendering : function(){
			//oCtrl_Catalogos.byId("idTitleUserBar").setText("Catalogos");
		},
		/*onBack:function(){
			window.history.go(-1);
		},
		onHome: function (oEvt) {
			var oRouter = sap.ui.core.routing.Router.getRouter('app');
			oRouter.navTo("_menu", {}, false);
		},*/
		onSelectTile:function(oEvt){
			var oId = oEvt.getSource().getId()
			oId = oId.split("--")[1];
			
			switch (oId) {
			case "idSTCustomers":
				oCtrl_Catalogos.getOwnerComponent().getRouter().navTo("MonitorCustomers");
				break;
			case "idSTVehicles":
				oCtrl_Catalogos.getOwnerComponent().getRouter().navTo("MonitorVehicles");
				break;
			case "idSTPersonal":
				oCtrl_Catalogos.getOwnerComponent().getRouter().navTo("MonitorPersonal");
				break;

			case "idSTServices":
				oCtrl_Catalogos.getOwnerComponent().getRouter().navTo("MonitorServices");
				break;

			case "idSTSparePart":
				oCtrl_Catalogos.getOwnerComponent().getRouter().navTo("MonitorSpares");
				break;

			default:
				Utils.fnShowMessage({
					sIcon: "WARNING",
					sMessage: Utils.fnReadTranslate("Table.Records.Text")
				})
				break;
			}
			
		}
	});
});