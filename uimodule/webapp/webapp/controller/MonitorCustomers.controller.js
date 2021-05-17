var oCtrl_MonCustumers;
var oFragments = {};
sap.ui.define(["jquery.sap.global", 
	"sap/ui/core/mvc/Controller", 
	"sap/m/MessageBox", 
	"sap/ui/model/Filter", 
	"sap/ui/model/FilterOperator"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator) {
	var oView;
   	//var oCore;

	return Controller.extend("com.exonmarcelo.geser.webapp.controller.MonitorCustomers", {

		onInit : function(oEvt) {
			oCtrl_MonCustumers = this;
			console.log("init");
			
			oView = oCtrl_MonCustumers.getView();

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

			Utils.fnCreateFilterPanel("CUSTOMERS", oCtrl_MonCustumers)

			//oCtrl_Menu.fnInsertUserBar(oCtrl_MonCustumers, "idPageMonitorCustomers");
		},
		onBeforeShow:function(oEvt){
			oComponent.fnToggleButtonsTP(true);
			oComponent.fnToggleButtonUser(true);
			oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.3");
		},
		onAfterRendering : function(){
			//oCtrl_MonCustumers.byId("idTitleUserBar").setText("Monitor de Clientes");
		},
		fnFilter:function(oEvt){
			var oSettings = {
				title:"Filtros",
				conditionText:"Filtrar desde BD",
				conditionIsMandatory:true,
				content: [
					new sap.m.Label({text:"DNI"}),
					new sap.m.Input({value:"", maxLength:8}),
					new sap.m.Label({text:"Nombre"}),
					new sap.m.Input({value:"", maxLength:50}),
					new sap.m.Label({text:"Apellido"}),
					new sap.m.Input({value:"", maxLength:50})
				],
				filterButtonText:"Aplicar",
				cancelButtonText:"Cancelar",
				fnLocalFilter:function(){
					var aFilters = [
						new Filter("dni", sap.ui.model.FilterOperator.Contains, oSettings.content[1].getValue()),
						new Filter("name", sap.ui.model.FilterOperator.Contains, oSettings.content[3].getValue()),
						new Filter("surname", sap.ui.model.FilterOperator.Contains, oSettings.content[5].getValue())
					];
					var aFiltersToSend=[];
					for (var i = 0; i < aFilters.length; i++) {
						if(aFilters[i].oValue1 != ""){
							aFiltersToSend.push(aFilters[i]);
						}
					}
					if(aFiltersToSend.length > 0){
						var oModelFilter = new sap.ui.model.Filter(aFiltersToSend);
						var oBinding = oCtrl_MonCustumers.byId("idTableCustomers").getBinding("items");
						oBinding.filter(oModelFilter, false);
					}
					
					//console.log(oSettings.content[1].getValue());
					console.log("local filter")
				},
				fnDBFilter:function(){
					console.log("DB filter")
				},
				fnCancelFilter:function(){
					console.log("canceled filter")
				},
			};
			
			Utils.fnCreateDialogFilter(oSettings);
		},
		
		fnCleanFilters:function(){
			Utils.fnCleanTableFilters(oCtrl_MonCustumers, "idTableCustomers");
		},
		
		fnNewCustomer:function(){

			oComponent.fnCleanModel("mCustomerDetail");
			var sClass = (sap.ui.Device.system.desktop)?"sapUiSizeCompact":"sapUiSmallMarginBottom";

			oSettingsForm = {
				title: Utils.fnReadTranslate("MonitorCustomers.DialogNewCustomer.Title"),
				icon: "https://image.flaticon.com/icons/svg/1134/1134821.svg",
				content:[
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorCustomers.DialogNewCustomer.Label.1.Text")}),
					new sap.m.Input({value:"{mCustomerDetail>/dni}", maxLength:8}),
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorCustomers.DialogNewCustomer.Label.2.Text")}),
					new sap.m.Input({value:"{mCustomerDetail>/name}", maxLength:50}),
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorCustomers.DialogNewCustomer.Label.3.Text")}),
					new sap.m.Input({value:"{mCustomerDetail>/surname}", maxLength:50}),
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorCustomers.DialogNewCustomer.Label.4.Text")}),
					new sap.m.ComboBox(),
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorCustomers.DialogNewCustomer.Label.5.Text")}),
					new sap.m.DatePicker({}),
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorCustomers.DialogNewCustomer.Label.6.Text")}),
					new sap.m.Input({value:"{mCustomerDetail>/email}", maxLength:50}),
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorCustomers.DialogNewCustomer.Label.7.Text")}),
					new sap.m.Input({value:"{mCustomerDetail>/phone}", maxLength:50}),
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorCustomers.DialogNewCustomer.Label.8.Text")}),
					new sap.m.Input({value:"{mCustomerDetail>/mobile_phone}", maxLength:50})
				],
				textButtonOK: Utils.fnReadTranslate("Button.Save"),
				fnButtonOK: function(){
					var oSettings = {
						sIcon : "SUCCESS",
						sMessage : Utils.fnReadTranslate("MonitorCustomers.Message.NewCustomer.Success"),
						fnButtonOK : function(){
							var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_MonCustumers);
							router._oConfig.transition = "slide";
							router.navTo("CustomerDetail",{},false);
							console.log("refresh data");
						}
					};
					Utils.fnShowMessage(oSettings);
				},
				textButtonCancel: Utils.fnReadTranslate("Button.Cancel"),
				fnButtonCancel: undefined,
				sClassDialog: sClass
			};

			Utils.fnDialogWithSimpleForm(oSettingsForm);

			
		},
		
		onItemPress:function(oEvt){
			var sPath = oEvt.getParameter("listItem").getBindingContext("mCatalogs").sPath;
			var oCustomer = oCore.getModel("mCatalogs").getProperty(sPath);
			
			var oModel = oCore.getModel("mCustomerDetail") ;
			oModel.setData(oCustomer);
			oModel.refresh();
			
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_MonCustumers);
			router._oConfig.transition = "slide";
			router.navTo("CustomerDetail",{},false);
		},

		onSettingsTableCustomers: function(oEvt){
			var oModel = oCore.getModel("mCatalogs");
			
			var aCampos = [ {key : "dni", text : oCore.getModel("i18n").getProperty("MonitorCustomers.Table.Column.1"),duplicate : false}, 
							{key : "name", text : oCore.getModel("i18n").getProperty("MonitorCustomers.Table.Column.2"),duplicate : true}, 
							{key : "surname", text : oCore.getModel("i18n").getProperty("MonitorCustomers.Table.Column.3"),duplicate : true}
							];
			
			var aVSFItems = [], aSortItems =[];
			
			
			for (var i = 0; i < aCampos.length; i++) {
				if(!aCampos[i].duplicate){
					var itemTemplate = new sap.m.ViewSettingsItem({text:"{mCatalogs>"+aCampos[i].key+"}", key:"{mCatalogs>"+aCampos[i].key+"}"});
					
					var viewSettingsFilterItem = new sap.m.ViewSettingsFilterItem({
						text: aCampos[i].text,
						key: aCampos[i].key,
						multiSelect:false
					});
					
					viewSettingsFilterItem.setModel(oModel,"mCatalogs");
					viewSettingsFilterItem.bindAggregation("items","mCatalogs>/CUSTOMERS",itemTemplate);
					
					aVSFItems.push(viewSettingsFilterItem);
				}else{
					
					var oDataModel = oCore.getModel("mCatalogs").getData().CUSTOMERS;
					var aDataDistinct = Utils.fnDeleteDupilcateObjects(oDataModel, aCampos[i].key)
					
					var oModelLocal = oCore.getModel("mLocalFilters");
					
					switch (aCampos[i].key){
						case "name":
							oModelLocal.getData().NAMES = aDataDistinct;
							break
						case "surname" :
							oModelLocal.getData().SURNAMES = aDataDistinct;
							break;
					};

					oModelLocal.refresh();
					
					var itemTemplate_2 = new sap.m.ViewSettingsItem({text:"{mLocalFilters>"+aCampos[i].key+"}", key:"{mLocalFilters>"+aCampos[i].key+"}"});
					
					var viewSettingsFilterItem_2 = new sap.m.ViewSettingsFilterItem({
						text: aCampos[i].text,
						key: aCampos[i].key,
						multiSelect:false
					});
					
					viewSettingsFilterItem_2.setModel(oModelLocal,"mLocalFilters");
					
					var collection = "";
					switch(aCampos[i].key){
						case "name":
							collection = "mLocalFilters>/NAMES";
							break
						case "surname" :
							collection = "mLocalFilters>/SURNAMES" ;
							break;
					};
					viewSettingsFilterItem_2.bindAggregation("items", collection, itemTemplate_2);
					
					aVSFItems.push(viewSettingsFilterItem_2);
				}

				//fill array of sortItems
				aSortItems.push(
					new sap.m.ViewSettingsItem({text: aCampos[i].text, key: aCampos[i].key})
				);
				
			}
			//select first item of sortItems
			if (aSortItems.length > 0) {
				aSortItems[0].setSelected(true);	
			}
			
			var viewSettings = new sap.m.ViewSettingsDialog({
				title: Utils.fnReadTranslate("Button.SettingsTable.Text"),
				filterSearchOperator:"Contains",
				confirm: function(oEvent){
					var oTable = oCtrl_MonCustumers.byId("idTableCustomers"),
						mParams = oEvent.getParameters(),
						oBinding = oTable.getBinding("items"),
						sPath,
						bDescending,
						aSorters = [],
						aFilters = [];

					sPath = mParams.sortItem.getKey();
					bDescending = mParams.sortDescending;
					aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));

					// apply the selected sort and group settings
					oBinding.sort(aSorters);
					
					//Para filtros locales
					
					mParams.filterItems.forEach(function(oItem) {
						var oValue = oItem.getKey(),
							oKey = oItem.getParent().getKey(),
							oFilter = new Filter(oKey, "EQ", oValue);
						aFilters.push(oFilter);
					});

					// apply filter settings
					oBinding.filter(aFilters);
					
					oCtrl_MonCustumers.byId("idCounterCustomers").setText("("+oBinding.aIndices.length+")");
					//console.log(oEvent.getParameters().filterString);
				},
				sortItems: aSortItems,
				/*[
					new sap.m.ViewSettingsItem({text: oCore.getModel("i18n").getProperty("Detalle.Empresa.Table.CUSTOMERS.Settings.1"), key:"nro_empleado", selected:true}),
					new sap.m.ViewSettingsItem({text: oCore.getModel("i18n").getProperty("Detalle.Empresa.Table.CUSTOMERS.Settings.2"), key:"nombre"}),
					new sap.m.ViewSettingsItem({text: oCore.getModel("i18n").getProperty("Detalle.Empresa.Table.CUSTOMERS.Settings.3"), key:"apellido"}),
					new sap.m.ViewSettingsItem({text: oCore.getModel("i18n").getProperty("Detalle.MonitorEmpleado.Table.Column.2"), key:"descripcion_puesto"}),
				],*/
									
				filterItems: aVSFItems
				
			});
			
			viewSettings.open();
		},
	});
});