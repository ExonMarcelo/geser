Utils = {
	fnCreateDialogFilter : function(oSettings) {
		var oCheckBox = new sap.m.CheckBox({
			text : oSettings.conditionText,
			selected : (oSettings.conditionIsMandatory != undefined) ? oSettings.conditionIsMandatory : false
		});
		var oDialog = new sap.m.Dialog({
			title : oSettings.title,
			stretch : (sap.ui.Device.system.desktop === true) ? false : true,
			// contentWidth: "40em",
			content : [ oCheckBox, new sap.m.VBox({
				items : [ new sap.ui.layout.form.SimpleForm({
					editable : true,
					layout : "ResponsiveGridLayout",
					labelSpanXL : 3,
					labelSpanL : 3,
					labelSpanM : 3,
					labelSpanS : 12,
					adjustLabelSpan : false,
					emptySpanXL : 4,
					emptySpanL : 4,
					emptySpanM : 4,
					emptySpanS : 0,
					columnsXL : 2,
					columnsL : 1,
					columnsM : 1,
					singleContainerFullSize : false,
					content : oSettings.content
				}) ]
			}) ],
			buttons : [ new sap.m.Button({
				text : oSettings.filterButtonText,
				press : function() {
					if (oCheckBox.getSelected()) {
						if (oSettings.fnDBFilter) {
							oSettings.fnDBFilter()
						}
					} else {
						if (oSettings.fnLocalFilter) {
							oSettings.fnLocalFilter()
						}
					}
					oDialog.close();
				}
			}), new sap.m.Button({
				text : oSettings.cancelButtonText,
				press : function() {
					if (oSettings.fnCancelFilter) {
						oSettings.fnCancelFilter()
					}
					oDialog.close();
				}
			}), ],
			afterClose : function() {
				oDialog.destroy();
			}
		});

		oDialog.open();
	},
	fnCleanTableFilters : function(oController, sIdTable) {
		var oBinding = oController.byId(sIdTable).getBinding("items");
		oBinding.filter([], false);
	},
	/*fnShowMessage : function(oSettings) {
		swal({
			title : oSettings.title,
			text : oSettings.text,
			icon : oSettings.icon,
			button : oSettings.buttonText,
			closeOnClickOutside: false,
			closeOnEsc: false,
		}).then(oSettings.callback);
	},
	fnShowConfirmMessage : function(oSettings) {
		//var oFunc = oSettings.fnConfirm
		swal({
			title : oSettings.title,
			text : oSettings.text,
			icon : oSettings.icon,
			buttons : [ oSettings.textCancel, oSettings.textConfirm ],
			dangerMode : true,
			closeOnClickOutside: false,
			closeOnEsc: false,
		}).then(function(willDelete) {
			if (willDelete) {
				oSettings.fnConfirm();
			} else {
				oSettings.fnCancel();
			}
		});
	},*/

	fnDialogNewVehicle: function(oEvt){
		var oDialog = new sap.m.Dialog({
			title : "Nuevo Vehículo",
			stretch : (sap.ui.Device.system.desktop === true) ? false : true,
			icon:"sap-icon://add-document",
			// contentWidth: "40em",
			content : [ new sap.m.VBox({
				items : [ new sap.ui.layout.form.SimpleForm({
					editable : true,
					layout : "ResponsiveGridLayout",
					labelSpanXL : 3,
					labelSpanL : 3,
					labelSpanM : 3,
					labelSpanS : 12,
					adjustLabelSpan : false,
					emptySpanXL : 4,
					emptySpanL : 4,
					emptySpanM : 4,
					emptySpanS : 0,
					columnsXL : 2,
					columnsL : 1,
					columnsM : 1,
					singleContainerFullSize : false,
					content : [
						new sap.m.Label({text:"N° Placa"}),
						new sap.m.Input({value:"", maxLength:10}),
						new sap.m.Label({text:"N° Motor"}),
						new sap.m.Input({value:"", maxLength:50}),
						new sap.m.Label({text:"Marca"}),
						new sap.m.Input({value:"", maxLength:50}),
						new sap.m.Label({text:"Cilindraje"}),
						new sap.m.Input({value:"", maxLength:50}),
						new sap.m.Label({text:"Tipo"}),
						new sap.m.ComboBox({}),
						new sap.m.Label({text:"Color"}),
						new sap.m.Input({value:"", maxLength:50})
					]
				}) ]
			}) ],
			buttons : [ new sap.m.Button({
				text : "Grabar",
				press : function() {
					oDialog.close();
				}
			}), new sap.m.Button({
				text : "Cancelar",
				press : function() {
					oDialog.close();
				}
			}), ],
			afterClose : function() {
				oDialog.destroy();
			}
		});

		oDialog.open();
	},

	fnDialogWithSimpleForm: function(oSettings){
		var oDialog = new sap.m.Dialog({
			title : oSettings.title,
			stretch : (sap.ui.Device.system.desktop === true) ? false : true,
			icon: oSettings.icon,
			// contentWidth: "40em",
			content : [ new sap.m.VBox({
				items : [ new sap.ui.layout.form.SimpleForm({
					editable : true,
					layout : "ResponsiveGridLayout",
					labelSpanXL : 3,
					labelSpanL : 3,
					labelSpanM : 3,
					labelSpanS : 12,
					adjustLabelSpan : false,
					emptySpanXL : 4,
					emptySpanL : 4,
					emptySpanM : 4,
					emptySpanS : 0,
					columnsXL : 2,
					columnsL : 1,
					columnsM : 1,
					singleContainerFullSize : false,
					content : oSettings.content
				}) ]
			}) ],
			buttons : [ new sap.m.Button({
				text : oSettings.textButtonOK,
				press : function() {
					if (oSettings.fnButtonOK) {
						oSettings.fnButtonOK();
					}
					oDialog.close();
				}
			}), new sap.m.Button({
				text : oSettings.textButtonCancel,
				press : function() {
					if (oSettings.fnButtonCancel) {
						oSettings.fnButtonCancel();
					}
					oDialog.close();
				}
			}), ],
			afterClose : function() {
				oDialog.destroy();
			}
		}).addStyleClass(oSettings.sClassDialog);

		oDialog.open();
	},

	fnReadTranslate: function(oText) {
		return sap.ui.getCore().getModel("i18n").getProperty(oText);
	},

	fnNewControlSheet: function(sAux){
		//If sAux is true, it's being called from the vehicle detail view
		if (sAux) {
			//create service card automatically
			oBusyDialog.open();
			setTimeout(function(){
				//navigate Service Card detail view
				var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_VehicleDetail);
				router._oConfig.transition = "slide";
				router.navTo("ControlSheetDetail",{},false);

				oBusyDialog.close();
			}, 1000);
		}else{
			//first, show selectDialog with vehicles list
		}
	},

	fnCreateFilterPanel: function(oKeyFilter, oController, oIconTabBar) {

		var oFilterPanel = new controls.P13nFilterPanelVRD({
				maxIncludes : -1,
				maxExcludes : -1,
				layoutMode : ""
		});
		
		oFilterPanel.bindItems("mFilt>/"+oKeyFilter, new sap.m.P13nItem({
				columnKey 	: "{mFilt>zcolumnKey}",
				text 		: "{mFilt>ztext}",
				tooltip 	: "{mFilt>ztooltip}",
				type 		: "{mFilt>ztype}",
				maxLength	: "{mFilt>zmaxLength}",
				precision	: "{mFilt>zprecision}",
				scale		: "{mFilt>zscale}",
				isDefault 	: "{mFilt>zisDefault}",
				values 		: "{mFilt>zvalues}"
		}));
		
		oFilterPanel.bindFilterItems("mFiltItems>/"+oKeyFilter, new sap.m.P13nFilterItem({
				key 		: "{mFiltItems>zzkey}",
				exclude 	: "{mFiltItems>zexclude}",
				columnKey 	: "{mFiltItems>zcolumnKey}",
				operation 	: "{mFiltItems>zoperation}",
				value1 		: "{mFiltItems>zvalue1}",
				value2 		: "{mFiltItems>zvalue2}"
		}));
		
		oFilterPanel.setIncludeOperations([ sap.m.P13nConditionOperation.EQ,
											sap.m.P13nConditionOperation.Contains ], "string");							
		
		oFilterPanel.setIncludeOperations([ sap.m.P13nConditionOperation.EQ ], "date");
		
		var moFilt = new sap.ui.model.json.JSONModel();
		moFilt.setData( jQuery.extend(true, {}, oCore.getModel("mFilt").getData()) );
		var moFiltItems = new sap.ui.model.json.JSONModel();
		moFiltItems.setData( jQuery.extend(true, {}, oCore.getModel("mFiltItems").getData()) );
		
		oFilterPanel.setModel(moFilt, "mFilt");
		oFilterPanel.setModel(moFiltItems, "mFiltItems");
		
		var btn1= new sap.m.Button({
			icon:"sap-icon://search",
			text : Utils.fnReadTranslate("FilterPanel.Button.1"),
			press:function(oEvt){
				Utils.onSearch(oEvt, oController, oFilterPanel);
			}
		}).bindProperty("text", "i18n>FilterPanel.Button.1");
	
		var btn2= new sap.m.Button({
			icon:"sap-icon://reset",
			text : Utils.fnReadTranslate("FilterPanel.Button.2"),
			press:function(oEvt){
				Utils.onReset(oEvt, oController);
			}
		}).bindProperty("text", "i18n>FilterPanel.Button.2");
		
		// Buscar // Reset
		//oFilterPanel.setButtonsToolbar(btn1, btn2);
		
		var oPanel = new sap.m.Panel({
			headerToolbar: new sap.m.Toolbar({
				content:[
					//new sap.m.Title({text:Utils.fnReadTranslate("FilterPanel.Title")}).bindProperty("text", "i18n>FilterPanel.Title"),
					new sap.m.Title({text:"Filtros"}),
					new sap.m.ToolbarSpacer(),
					btn1,
					btn2
				]
			}),
			expandable:true,
			expanded: (sap.ui.Device.system.desktop)? true : false,
			content: oFilterPanel
		});

		if(oIconTabBar != undefined){
			//Si es que el filter panel se renderiza en un IconTabBar
			var oControl = oController.byId(oIconTabBar);
			if(oControl.getContent().length > 1){
				oControl.removeContent(0)
			}
			oControl.insertContent(oPanel, 0);
		
		}else{
			oController.getView().getContent()[0].insertContent(oPanel, 0);
		}
	},

	onSearch: function(oEvt, oController, oFilterPanel){
		alert("Search")
		/*	
		oBusyDialog.open();
		var Parameters  = oFilterPanel.getConditions();
		var oFilters = [];
		
		for(var i=0; i<Parameters.length; i++){
			if(Parameters[i].value1 != ""){
				oFilters.push({
					campo: Parameters[i].keyField,
					operador: Parameters[i].operation,
					valor1: Parameters[i].value1,
					valor2: Parameters[i].value2,
					tipo: Parameters[i].typeField,
					//rows: oFilterPanel.getLimitRows()
				})
			}
		}
		oBusyDialog.close();
		oFilters = { "value" : JSON.stringify([ { "filters": oFilters, "cantidad_max" : oFilterPanel.getLimitRows(), "idioma":  oCore.User.Language.toUpperCase() }] )};
		oController.oServ_Cabeceras(oFilters);
		*/
	},

	
	onReset: function(oEvt, oController, oWorkTo){
		alert("Reset")
		/*oBusyDialog.open();
		
		var oAmbito = oController.getView().getId().replace("idR", "");
		
		if(oAmbito == "MonitorTickets"){
			var oControl = oController.getView().byId("idIconTabBarTickets").removeContent(0);
			oC_Modulo_Copernico.f_createFilterPanel("TICKETS", oCtrl_MonitorTickets, "idIconTabBarTickets");
			oController.getView().byId("idCountTableTicketsCab").setText("(0)");
			oController.getView().byId("idIconTabBarTickets").setCount("");
			oController.getView().byId("idTMonitorTickets").setGrowingThreshold(5);
			
			var oModel = "mTicketsCab";
			oCore.getModel(oModel).setProperty("/TICKETSCAB", []);
		}
		else if(oAmbito == "MonitorTR"){
			var oControl = oController.getView().byId("idIconTabBarTRs").removeContent(0);
			oC_Modulo_Copernico.f_createFilterPanel("TR", oCtrl_MonitorTR, "idIconTabBarTRs");
			oController.getView().byId("idCountTableTR").setText("(0)");
			oController.getView().byId("idIconTabBarTRs").setCount("");
			
			var oModel = "mTR";
			oCore.getModel(oModel).setProperty("/", {});
		}
		else{
			if(oWorkTo==undefined)
				oWorkTo = oController.getView().byId("idIconTabBar" + oAmbito).getSelectedKey();
			
			var oPath 	= oWorkTo.toUpperCase();
			
			var oControl = oController.getView().byId("idIconTabBar" + oWorkTo).removeContent(0);
			oC_Modulo_Copernico.f_createFilterPanel(oPath, oController, "idIconTabBar" + oWorkTo);
			oController.getView().byId("idCountTable" + oWorkTo).setText("(0)");
			oController.getView().byId("idIconTabBar" + oWorkTo).setCount("");
			oController.getView().byId("idTable" + oWorkTo).setGrowingThreshold(5);
			
			if(oAmbito == "Aprobaciones"){
				var oModel = "mActividadesAprobadas";
				oCore.getModel(oModel).setProperty("/ACTIVAPROBADAS", []);
			}else{
				var oModel = "m"+oAmbito;
				oCore.getModel(oModel).setProperty("/"+oPath, []);
			}
			
		}
		
		oBusyDialog.close();
		// Destruimos el antiguo Filter Panel
		setTimeout(function(){
		  oControl.destroy();
		}, 250);*/
	},

	fnDeleteDupilcateObjects: function(arr, prop) {
		var newArray = [];
		var lookup  = {};
	
		for (var i in arr) {
			lookup[arr[i][prop]] = arr[i];
		}
	
		for (i in lookup) {
			newArray.push(lookup[i]);
		}
	
		return newArray;
   },

   fnShowMessage: function(oSettings){
	   /*var oSettings = {
		   sIcon : "",
		   sMessage : "",
		   fnButtonOK : function(){}
	   }*/
		new sap.m.MessageBox.show(
			oSettings.sMessage,{
				icon: oSettings.sIcon,
				styleClass: "ResponsiveDialog",
				title: "Mensaje de Aplicación",
				actions: [sap.m.MessageBox.Action.OK],
				onClose: function(oAction){
					if(oAction=="OK"){
						if(oSettings.fnButtonOK) oSettings.fnButtonOK();
					}
				}
			}	
		);
	},

	fnShowConfirmationMessage :  function(oSettings) {
		/*var oSettings = {
			sMessage : "",
			fnButtonOK : function(){},
			fnButtonNOT : function(){}
		}*/
		new sap.m.MessageBox.show(
			oSettings.sMessage, {
				icon: "WARNING",
				styleClass: "ResponsiveDialog",
				title: "Mensaje de Confirmación",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function(oAction) {
					if(oAction=="YES"){
						if(oSettings.fnButtonOK) oSettings.fnButtonOK();
					}
					if(oAction == "NO"){
						if(oSettings.fnButtonNOT) oSettings.fnButtonNOT();
					}
				}
			}
		);
	},
};