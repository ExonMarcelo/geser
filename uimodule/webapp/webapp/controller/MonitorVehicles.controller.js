var oCtrl_MonVehicles;
var oFragments = {};
sap.ui.define(["jquery.sap.global", 
	"sap/ui/core/mvc/Controller", 
	"sap/m/MessageBox", 
	"sap/ui/model/Filter", 
	"sap/ui/model/FilterOperator"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator) {
	var oView;
   	//var oCore;

	return Controller.extend("com.exonmarcelo.geser.webapp.controller.MonitorVehicles", {

		onInit : function(oEvt) {
			oCtrl_MonVehicles = this;
			console.log("init");
			
			oView = oCtrl_MonVehicles.getView();

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

			Utils.fnCreateFilterPanel("VEHICLES", oCtrl_MonVehicles);

			//oCtrl_Menu.fnInsertUserBar(oCtrl_MonVehicles, "idPageMonitorCustomers");
		},
		onBeforeShow:function(oEvt){
			oComponent.fnToggleButtonsTP(true);
			oComponent.fnToggleButtonUser(true);
			oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.5");
		},
		onAfterRendering : function(){
			//oCtrl_MonVehicles.byId("idTitleUserBar").setText("Monitor de Clientes");
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
						var oBinding = oCtrl_MonVehicles.byId("idTableCustomers").getBinding("items");
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
			Utils.fnCleanTableFilters(oCtrl_MonVehicles, "idTableCustomers");
		},
		
		
		
		onItemPress:function(oEvt){
			var sPath = oEvt.getParameter("listItem").getBindingContext("mCatalogs").sPath;
			var oVehicle = oCore.getModel("mCatalogs").getProperty(sPath);
			
			var oModel = oCore.getModel("mVehicleDetail") ;
			oModel.setData(oVehicle);
			oModel.refresh();
			
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_MonVehicles);
			router._oConfig.transition = "slide";
			router.navTo("VehicleDetail",{},false);
		},

		onSettingsTableVehicles: function(oEvt){
			var oModel = oCore.getModel("mCatalogs");
			
			var aCampos = [ {key : "plate", text : oCore.getModel("i18n").getProperty("MonitorVehicles.Table.Column.2"),duplicate : false}, 
							{key : "brand", text : oCore.getModel("i18n").getProperty("MonitorVehicles.Table.Column.3"),duplicate : true}, 
							{key : "cylinder", text : oCore.getModel("i18n").getProperty("MonitorVehicles.Table.Column.4"),duplicate : true}
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
						case "brand":
							oModelLocal.getData().BRANDS = aDataDistinct;
							break
						case "cylinder" :
							oModelLocal.getData().CYLINDERS = aDataDistinct;
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
						case "brand":
							collection = "mLocalFilters>/BRANDS";
							break
						case "cylinder" :
							collection = "mLocalFilters>/CYLINDERS" ;
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
					var oTable = oCtrl_MonVehicles.byId("idTableCustomers"),
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
					
					oCtrl_MonVehicles.byId("idCounterVehicles").setText("("+oBinding.aIndices.length+")");
					//console.log(oEvent.getParameters().filterString);
				},
				sortItems: aSortItems,
									
				filterItems: aVSFItems
				
			});
			
			viewSettings.open();
        },

		onNewVehicle: function(oEvt){
			Utils.fnDialogNewVehicle();
        },
        
        onSelectCustomer: function(oEvt){
            var oModel = oCore.getModel("mCatalogs");
            //var oInputTipoUsuario = oEvt.getSource();
            
            var oList= new sap.m.StandardListItem({	
                title:"{mCatalogs>dni}",
                description:"{mCatalogs>fullname}"
            });
            
            var oSelectDialog=new sap.m.SelectDialog({
                noDataText:"{i18n>SelectDialog.noDataText}",	
                title:"{i18n>MonitorVehicles.SelectDialog.Title}",
                    confirm:function(oEvt)
                    {
                        var oSelectedItem = oEvt.getParameter("selectedItem")

                        if (oSelectedItem) {
                            
                            //alert("Enviar al servicio: "+oSelectedItem.getTitle());
                            //var sPath = oEvt.getParameter("selectedItem").getBindingContext("mCatalogs").getPath();
                            //oCtrl_DetalleEmpresa.onNuevoAsociado(sPath);

                            oCtrl_MonVehicles.onNewVehicle();
                            //invocar al servicio
                            /*var oData = {
                                "id_idioma": oCore.User.Language.toUpperCase(),
                                "id_tipo_usuario":oSelectedItem.getTitle(),
                                "id_usuario":0
                            }
                            oCtrl_Datos_Maestros.oServ_Permisos(oData);*/
                        }
                        if (!oSelectedItem) {
                            //oInputTipoUsuario.resetProperty("");
                        }
                    },
                    search:function(oEvt)
                    {
                        var sValue = oEvt.getParameter("value");
                        var oFilterFullName = new Filter("fullname", sap.ui.model.FilterOperator.Contains, sValue);
                        var oFilterDNI = new Filter("dni", sap.ui.model.FilterOperator.Contains, sValue);
                        var oModelFilter = new sap.ui.model.Filter([oFilterFullName, oFilterDNI]);
                        var oBinding = oEvt.getSource().getBinding("items");
                        oBinding.filter(oModelFilter, false);
                    }
            });
            
            oSelectDialog.setModel(oModel,"mCatalogs");
            oSelectDialog.bindAggregation("items","mCatalogs>/CUSTOMERS",oList);
            
            oSelectDialog.open();
            /*function openDialog(){
                oSelectDialog.open();
            };
            oCtrl_DetalleEmpresa.oServ_PersonasParaAsociar(openDialog);
            */
        },
	});
});