var oCtrl_MonAppointments;
var oFragments = {};
sap.ui.define(["jquery.sap.global", 
	"sap/ui/core/mvc/Controller", 
	"sap/m/MessageBox", 
	"sap/ui/model/Filter", 
	"sap/ui/model/FilterOperator", 
	"sap/m/ActionSheet",
	"sap/m/Button"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, ActionSheet, Button) {
	var oView;
   	//var oCore;

	return Controller.extend("com.exonmarcelo.geser.webapp.controller.MonitorAppointments", {

		onInit : function(oEvt) {
			oCtrl_MonAppointments = this;
			console.log("init");
			
			oView = oCtrl_MonAppointments.getView();

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

			Utils.fnCreateFilterPanel("APPOINTMENTS", oCtrl_MonAppointments)

			//oCtrl_Menu.fnInsertUserBar(oCtrl_MonAppointments, "idPageMonitorAppointments");
		},
		onBeforeShow:function(oEvt){
			oComponent.fnToggleButtonsTP(true);
			oComponent.fnToggleButtonUser(true);
			oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.9");
			oCtrl_MonAppointments.fnToggleModeAppointments(true);
		},
		onAfterRendering : function(){
			//oCtrl_MonAppointments.byId("idTitleUserBar").setText("Monitor de Clientes");
		},

		onSelectionChangeModeAppointments: function(oEvt){
			var oKey = oEvt.getSource().getSelectedKey();
			if (oKey == "modePlaCal") {
				oCtrl_MonAppointments.fnToggleModeAppointments(true);
			} else {
				oCtrl_MonAppointments.fnToggleModeAppointments(false);
			}
		},

		fnToggleModeAppointments: function(oValue){
			oCtrl_MonAppointments.byId("idPlaCalAppointments").setVisible(oValue);
			oCtrl_MonAppointments.byId("idTableAppointments").setVisible(!oValue);
		},

		handleAppointmentSelect: function(oEvt) {
			oCtrl_Main.handleAppointmentSelect(oEvt);
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
						var oBinding = oCtrl_MonAppointments.byId("idTableCustomers").getBinding("items");
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
			Utils.fnCleanTableFilters(oCtrl_MonAppointments, "idTableCustomers");
		},
		
		onItemPress:function(oEvt){
			/*var sPath = oEvt.getParameter("listItem").getBindingContext("mCatalogs").sPath;
			var oCustomer = oCore.getModel("mCatalogs").getProperty(sPath);
			
			var oModel = oCore.getModel("mCustomerDetail") ;
			oModel.setData(oCustomer);
			oModel.refresh();
			
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_MonAppointments);
			router._oConfig.transition = "slide";
			router.navTo("CustomerDetail",{},false);*/
			oCtrl_Main.handleAppointmentSelect(oEvt);
		},

		onSettingsTableCustomers: function(oEvt){
			var oModel = oCore.getModel("mCatalogs");
			
			var aCampos = [ {key : "dni", text : oCore.getModel("i18n").getProperty("MonitorAppointments.Table.Column.1"),duplicate : false}, 
							{key : "name", text : oCore.getModel("i18n").getProperty("MonitorAppointments.Table.Column.2"),duplicate : true}, 
							{key : "surname", text : oCore.getModel("i18n").getProperty("MonitorAppointments.Table.Column.3"),duplicate : true}
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
					var oTable = oCtrl_MonAppointments.byId("idTableCustomers"),
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
					
					oCtrl_MonAppointments.byId("idCounterCustomers").setText("("+oBinding.aIndices.length+")");
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