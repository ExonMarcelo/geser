var oCtrl_ServiceDetail;
var oFragments = {};
sap.ui.define(["jquery.sap.global", 
	"sap/ui/core/mvc/Controller", 
	"sap/m/MessageBox", 
	"sap/ui/model/Filter", 
	"sap/ui/model/FilterOperator"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator) {
	var oView;
   	//var oCore;

	return Controller.extend("com.exonmarcelo.geser.webapp.controller.ServiceDetail", {
		_oCustomerCloned:{},
		onInit : function(oEvt) {
			oCtrl_ServiceDetail = this;
			console.log("init");
			//oCore = sap.ui.getCore();
			oView = oCtrl_ServiceDetail.getView();

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
			
			//oCtrl_Menu.fnInsertUserBar(oCtrl_ServiceDetail, "idPageCustomerDetail");
		},
		onBeforeShow:function(oEvt){
			oComponent.fnToggleButtonsTP(true);
			oComponent.fnToggleButtonUser(true);
			oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.10");

			oCtrl_ServiceDetail.fnToggleButtons(true);
			
			//binding data to the model
			oCtrl_ServiceDetail.fnBindDataToModel();
		},
		onAfterRendering : function(){
			//oCtrl_ServiceDetail.byId("idTitleUserBar").setText("Detalle de Cliente");
		},
		fnToggleButtons:function(oValue){
			oCtrl_ServiceDetail.byId("edit").setVisible(oValue);
			oCtrl_ServiceDetail.byId("save").setVisible(!oValue);
			oCtrl_ServiceDetail.byId("delete").setVisible(oValue);
			oCtrl_ServiceDetail.byId("cancel").setVisible(!oValue);

			oCtrl_ServiceDetail.byId("idServiceFormDisplay").setVisible(oValue);
			oCtrl_ServiceDetail.byId("idServiceFormEdit").setVisible(!oValue);
		},
		fnBindDataToModel:function(oEvt){
			var oService={
				service_id:1,
				service_description:"Cambio de Anillos",
				plate: "AB - 12345",
				image:"",
				start_date:"07/06/2019 10:30",
				end_date:"",
				status:"En Desamblado",
				cost:"S/. 60.00",
				STAGES_HISTORY:[
					{
						id_estatus:"INT",
						status:"Internado",
						start_date:"07/06/2019 10:30",
						end_date:"07/06/2019 10:40",
						observation:"",
					},
					{
						id_estatus:"DES",
						status:"En Desamblado",
						start_date:"07/06/2019 10:40",
						end_date:"",
						observation:"Una varilla del motor su hilo estaba dañado",
					}
				],
				SPARE_PARTS:[
					{
						id_spare_parts:1,
						description:"Anillos JP",
						brand:"Honda",
						cost:"S/. 50.00",
						observation:""
					},
					{
						id_spare_parts:2,
						description:"Empaquetaduras cabezal CG-125",
						brand:"Honda",
						cost:"S/. 30.00",
						observation:""
					},
					{
						id_spare_parts:3,
						description:"Válvula de Adminsión CG-125",
						brand:"Honda",
						cost:"S/. 25.00",
						observation:""
					},
					{
						id_spare_parts:4,
						description:"Válvula de Escape CG-125",
						brand:"Honda",
						cost:"S/. 25.00",
						observation:""
					},
					{
						id_spare_parts:5,
						description:"Bujía",
						brand:"Honda",
						cost:"S/. 10.00",
						observation:""
					}
				],
				LATHE_SERVICES:[
					{
						id_external_service:1,
						description:"Encamisetado de Cilindro",
						category_service:"TORNO",
						id_external_workshop:1,
						lathe_workshop:"Torno Siancas",
						cost:"S/90.00",
						observation:"Estaba en 100cc se encamiseto a STD"
					},
					{
						id_external_service:2,
						description:"Asiento de Válvulas",
						category_service:"TORNO",
						id_external_workshop:1,
						lathe_workshop:"Torno Siancas",
						cost:"S/20.00",
						observation:""
					},
					{
						id_external_service:3,
						description:"Guias de Válvulas",
						category_service:"TORNO",
						id_external_workshop:1,
						lathe_workshop:"Torno Siancas",
						cost:"S/40.00",
						observation:""
					}
				],
				OTHER_EXTERNAL_SERVICES:[
					{
						id_external_service:4,
						description:"Limpieza de Escape",
						category_service:"Soldadura",
						id_external_workshop:1,
						external_workshop:"Taller de Soldaura Florito",
						cost:"S/20.00",
						observation:"El escape botaba humo"
					}
				]
			}

			var oModel = oCore.getModel("mServiceDetail");
			oModel.setData(oService);
			oModel.refresh();
		},
		onPressEdit:function(oEvt){
			var oCustomer = oCore.getModel("mCustomerDetail").getData();
			oCtrl_ServiceDetail._oCustomerCloned = jQuery.extend(true, {}, oCustomer);
			oCtrl_ServiceDetail.fnToggleButtons(false);
		},
		onPressSave:function(oEvt){
			var oSettings = {
				sIcon : "SUCCESS",
				sMessage : "Cliente modificado con éxito",
				fnButtonOK : function(){
					oCtrl_ServiceDetail.fnToggleButtons(true);
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
			oCore.getModel("mCustomerDetail").setData(oCtrl_ServiceDetail._oCustomerCloned);
			oCore.getModel("mCustomerDetail").refresh();
			oCtrl_ServiceDetail.fnToggleButtons(true);
		},

		onNewControlSheet: function(oEvt){
			Utils.fnNewControlSheet(true);
		},

		onItemPressControlSheets: function(oEvt){
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_ServiceDetail);
			router._oConfig.transition = "slide";
			router.navTo("ControlSheetDetail",{},false);
		},

		/*******************************************************************************/
		/*            					ADD SPARE PART             				       */
		/*******************************************************************************/
		onAddSparePart: function(oEvt) {
			oComponent.fnCleanModel("mSparePartDetail");
			var sClass = (sap.ui.Device.system.desktop)?"sapUiSizeCompact":"sapUiSmallMarginBottom";

			var oSettingsForm = {
				title: Utils.fnReadTranslate("ServiceDetail.DialogAddSparePart.Title"),
				icon: "sap-icon://add-equipment",
				content:[
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddSparePart.Form.Label.1.Text")}),
					new sap.m.Input({
						value:"{mSparePartDetail>/description_spare_part}",
						showValueHelp: true,
						valueHelpOnly: true,
						valueHelpRequest: oCtrl_ServiceDetail.onSelectSparePart
					}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddSparePart.Form.Label.2.Text")}),
					new sap.m.Text({ text: "{mSparePartDetail>/brand}"}),
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddSparePart.Form.Label.3.Text")}),
					new sap.m.Text({ text: "{mSparePartDetail>/base_price}"}),
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddSparePart.Form.Label.4.Text")}),
					new sap.m.Input({
						value:"{mSparePartDetail>/real_price}"
					}).addStyleClass(sClass),
					

				],
				textButtonOK: Utils.fnReadTranslate("Button.Add"),
				fnButtonOK: function(){
				},
				textButtonCancel: Utils.fnReadTranslate("Button.Cancel"),
				fnButtonCancel: undefined,
				sClassDialog: sClass
			};

			Utils.fnDialogWithSimpleForm(oSettingsForm);
		},

		onSelectSparePart: function(oEvt){
			var oModel = oCore.getModel("mGlobal");
            var oInput = oEvt.getSource();
            
            var oList= new sap.m.StandardListItem({	
              	title:"{mGlobal>brand}",
				description:"{mGlobal>description}",
				icon:"{mGlobal>image}",
				info:"{mGlobal>price}"
            });
            
            var oSelectDialog=new sap.m.SelectDialog({
                noDataText:"{i18n>SelectDialog.noDataText}",	
                title:"{i18n>ServiceDetail.SelectDialogSparePart.Title}",
                    confirm:function(oEvt)
                    {
                        var oSelectedItem = oEvt.getParameter("selectedItem")

                        if (oSelectedItem) {
                            var sPath = oEvt.getParameter("selectedItem").getBindingContext("mGlobal").getPath();
							var oRegister = oCore.getModel("mGlobal").getProperty(sPath);

							var oModelSP = oCore.getModel("mSparePartDetail")
							var oDataSparePart = oModelSP.getData();
							oDataSparePart.description_spare_part = oRegister.description;
							oDataSparePart.brand = oRegister.brand;
							oDataSparePart.base_price = oRegister.price;
							oDataSparePart.real_price = oRegister.price;
							oModelSP.refresh();

							//oInput.setValue(oRegister.plate);
                            //oCtrl_MonVehicles.onNewVehicle();
                            //invocar al servicio
                            /*var oData = {
                                "id_idioma": oCore.User.Language.toUpperCase(),
                                "id_tipo_usuario":oSelectedItem.getTitle(),
                                "id_usuario":0
                            }
                            oCtrl_Datos_Maestros.oServ_Permisos(oData);*/
                        }
                        if (!oSelectedItem) {
                            oInput.resetProperty("");
                        }
                    },
                    search:function(oEvt)
                    {
                        var sValue = oEvt.getParameter("value");
                        var oFilterDesc = new Filter("description", sap.ui.model.FilterOperator.Contains, sValue);
                        var oFilterBrand = new Filter("brand", sap.ui.model.FilterOperator.Contains, sValue);
                        var oModelFilter = new sap.ui.model.Filter([oFilterDesc, oFilterBrand]);
                        var oBinding = oEvt.getSource().getBinding("items");
                        oBinding.filter(oModelFilter, false);
                    }
            });
            
            oSelectDialog.setModel(oModel,"mGlobal");
            oSelectDialog.bindAggregation("items","mGlobal>/SPARE_PARTS",oList);
            
            oSelectDialog.open();
            /*function openDialog(){
                oSelectDialog.open();
            };
            oCtrl_DetalleEmpresa.oServ_PersonasParaAsociar(openDialog);
            */
		},
		/*******************************************************************************/
		/*            					ADD LATHE SERVICE           				   */
		/*******************************************************************************/
		onAddLatheService: function(oEvt){
			oComponent.fnCleanModel("mLatheServiceDetail");
			var sClass = (sap.ui.Device.system.desktop)?"sapUiSizeCompact":"sapUiSmallMarginBottom";

			var oSettingsForm = {
				title: Utils.fnReadTranslate("ServiceDetail.DialogAddLatheService.Title"),
				icon: "sap-icon://add-equipment",
				content:[
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddLatheService.Form.Label.1.Text")}),
					new sap.m.Input({
						value:"{mLatheServiceDetail>/description_lathe_service}",
						showValueHelp: true,
						valueHelpOnly: true,
						valueHelpRequest: oCtrl_ServiceDetail.onSelectLatheService
					}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddLatheService.Form.Label.2.Text")}),
					new sap.m.Input({
						value:"{mLatheServiceDetail>/lathe_workshop}",
						showValueHelp: true,
						valueHelpOnly: true,
						valueHelpRequest: oCtrl_ServiceDetail.onSelectLatheWorkshop
					}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddLatheService.Form.Label.3.Text")}),
					new sap.m.Text({ text: "{mLatheServiceDetail>/base_price}"}),
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddLatheService.Form.Label.4.Text")}),
					new sap.m.Input({
						value:"{mLatheServiceDetail>/real_price}"
					}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddLatheService.Form.Label.5.Text")}),
					new sap.m.TextArea({
						value:"{mLatheServiceDetail>/comment}"
					}).addStyleClass(sClass),					

				],
				textButtonOK: Utils.fnReadTranslate("Button.Add"),
				fnButtonOK: function(){
				},
				textButtonCancel: Utils.fnReadTranslate("Button.Cancel"),
				fnButtonCancel: undefined,
				sClassDialog: sClass
			};

			Utils.fnDialogWithSimpleForm(oSettingsForm);
		},

		onSelectLatheService: function(oEvt){
			var oModel = oCore.getModel("mGlobal");
            var oInput = oEvt.getSource();
            
            var oList= new sap.m.StandardListItem({	
				title:"{mGlobal>description}",
				info:"{mGlobal>price}"
            });
            
            var oSelectDialog=new sap.m.SelectDialog({
                noDataText:"{i18n>SelectDialog.noDataText}",	
                title:"{i18n>ServiceDetail.SelectDialogLatheService.Title}",
                    confirm:function(oEvt)
                    {
                        var oSelectedItem = oEvt.getParameter("selectedItem")

                        if (oSelectedItem) {
                            var sPath = oEvt.getParameter("selectedItem").getBindingContext("mGlobal").getPath();
							var oRegister = oCore.getModel("mGlobal").getProperty(sPath);

							var oModelLS = oCore.getModel("mLatheServiceDetail")
							var oDataLatheService = oModelLS.getData();
							oDataLatheService.description_lathe_service = oRegister.description;
							oDataLatheService.base_price = oRegister.price;
							oDataLatheService.real_price = oRegister.price;
							oModelLS.refresh();

							//oInput.setValue(oRegister.plate);
                            //oCtrl_MonVehicles.onNewVehicle();
                            //invocar al servicio
                            /*var oData = {
                                "id_idioma": oCore.User.Language.toUpperCase(),
                                "id_tipo_usuario":oSelectedItem.getTitle(),
                                "id_usuario":0
                            }
                            oCtrl_Datos_Maestros.oServ_Permisos(oData);*/
                        }
                        if (!oSelectedItem) {
                            oInput.resetProperty("");
                        }
                    },
                    search:function(oEvt)
                    {
                        var sValue = oEvt.getParameter("value");
                        var oFilterDesc = new Filter("description", sap.ui.model.FilterOperator.Contains, sValue);
                        //var oFilterBrand = new Filter("brand", sap.ui.model.FilterOperator.Contains, sValue);
                        var oModelFilter = new sap.ui.model.Filter([oFilterDesc]);
                        var oBinding = oEvt.getSource().getBinding("items");
                        oBinding.filter(oModelFilter, false);
                    }
            });
            
            oSelectDialog.setModel(oModel,"mGlobal");
            oSelectDialog.bindAggregation("items","mGlobal>/LATHE_SERVICES",oList);
            
            oSelectDialog.open();
            /*function openDialog(){
                oSelectDialog.open();
            };
            oCtrl_DetalleEmpresa.oServ_PersonasParaAsociar(openDialog);
            */
		},

		onSelectLatheWorkshop: function(oEvt){
			var oModel = oCore.getModel("mGlobal");
            var oInput = oEvt.getSource();
            
            var oList= new sap.m.StandardListItem({	
				title:"{mGlobal>name}",
				description:"{mGlobal>owner} - {mGlobal>address}"
            });
            
            var oSelectDialog=new sap.m.SelectDialog({
                noDataText:"{i18n>SelectDialog.noDataText}",	
                title:"{i18n>ServiceDetail.SelectDialogLatheWorkshop.Title}",
                    confirm:function(oEvt)
                    {
                        var oSelectedItem = oEvt.getParameter("selectedItem")

                        if (oSelectedItem) {
                            var sPath = oEvt.getParameter("selectedItem").getBindingContext("mGlobal").getPath();
							var oRegister = oCore.getModel("mGlobal").getProperty(sPath);

							var oModelLS = oCore.getModel("mLatheServiceDetail")
							var oDataLatheService = oModelLS.getData();
							oDataLatheService.lathe_workshop = oRegister.name;
							oDataLatheService.owner = oRegister.owner;
							oModelLS.refresh();

							//oInput.setValue(oRegister.plate);
                            //oCtrl_MonVehicles.onNewVehicle();
                            //invocar al servicio
                            /*var oData = {
                                "id_idioma": oCore.User.Language.toUpperCase(),
                                "id_tipo_usuario":oSelectedItem.getTitle(),
                                "id_usuario":0
                            }
                            oCtrl_Datos_Maestros.oServ_Permisos(oData);*/
                        }
                        if (!oSelectedItem) {
                            oInput.resetProperty("");
                        }
                    },
                    search:function(oEvt)
                    {
                        var sValue = oEvt.getParameter("value");
                        var oFilterName = new Filter("name", sap.ui.model.FilterOperator.Contains, sValue);
                        var oFilterOwner = new Filter("owner", sap.ui.model.FilterOperator.Contains, sValue);
                        var oModelFilter = new sap.ui.model.Filter([oFilterName, oFilterOwner]);
                        var oBinding = oEvt.getSource().getBinding("items");
                        oBinding.filter(oModelFilter, false);
                    }
            });
            
            oSelectDialog.setModel(oModel,"mGlobal");
            oSelectDialog.bindAggregation("items","mGlobal>/LATHE_WORKSHOPS",oList);
            
            oSelectDialog.open();
            /*function openDialog(){
                oSelectDialog.open();
            };
            oCtrl_DetalleEmpresa.oServ_PersonasParaAsociar(openDialog);
            */
		},

		/*******************************************************************************/
		/*            				ADD OTHER EXTERNAL SERVICE             			   */
		/*******************************************************************************/
		onAddOtherExternalService: function(oEvt){
			oComponent.fnCleanModel("mExternalServiceDetail");
			var sClass = (sap.ui.Device.system.desktop)?"sapUiSizeCompact":"sapUiSmallMarginBottom";

			var oSettingsForm = {
				title: Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Title"),
				icon: "sap-icon://add-equipment",
				content:[
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Form.Label.1.Text")}),
					new sap.m.Input({
						value:"{mExternalServiceDetail>/description_service}",
						showValueHelp: true,
						valueHelpOnly: true,
						valueHelpRequest: oCtrl_ServiceDetail.onSelectExternalService
					}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Form.Label.2.Text")}),
					new sap.m.Input({
						value:"{mExternalServiceDetail>/workshop}",
						showValueHelp: true,
						valueHelpOnly: true,
						valueHelpRequest: oCtrl_ServiceDetail.onSelectExternalWorkshop
					}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Form.Label.3.Text")}),
					new sap.m.Text({ text: "{mExternalServiceDetail>/category}"}),
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Form.Label.4.Text")}),
					new sap.m.Text({ text: "{mExternalServiceDetail>/base_price}"}),
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Form.Label.5.Text")}),
					new sap.m.Input({
						value:"{mExternalServiceDetail>/real_price}"
					}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Form.Label.6.Text")}),
					new sap.m.TextArea({
						value:"{mExternalServiceDetail>/comment}"
					}).addStyleClass(sClass),					

				],
				textButtonOK: Utils.fnReadTranslate("Button.Add"),
				fnButtonOK: function(){
				},
				textButtonCancel: Utils.fnReadTranslate("Button.Cancel"),
				fnButtonCancel: undefined,
				sClassDialog: sClass
			};

			Utils.fnDialogWithSimpleForm(oSettingsForm);
		},

		onSelectExternalService: function(oEvt){
			var oModel = oCore.getModel("mGlobal");
            var oInput = oEvt.getSource();
            
            var oList= new sap.m.StandardListItem({	
				title:"{mGlobal>category}",
				description:"{mGlobal>description}",
				info:"{mGlobal>price}"
            });
            
            var oSelectDialog=new sap.m.SelectDialog({
                noDataText:"{i18n>SelectDialog.noDataText}",	
                title:"{i18n>ServiceDetail.SelectDialogExternalService.Title}",
                    confirm:function(oEvt)
                    {
                        var oSelectedItem = oEvt.getParameter("selectedItem")

                        if (oSelectedItem) {
                            var sPath = oEvt.getParameter("selectedItem").getBindingContext("mGlobal").getPath();
							var oRegister = oCore.getModel("mGlobal").getProperty(sPath);

							var oModelES = oCore.getModel("mExternalServiceDetail")
							var oDataExternalService = oModelES.getData();
							oDataExternalService.description_service = oRegister.description;
							oDataExternalService.category = oRegister.category;
							oDataExternalService.base_price = oRegister.price;
							oDataExternalService.real_price = oRegister.price;
							oModelES.refresh();

							//oInput.setValue(oRegister.plate);
                            //oCtrl_MonVehicles.onNewVehicle();
                            //invocar al servicio
                            /*var oData = {
                                "id_idioma": oCore.User.Language.toUpperCase(),
                                "id_tipo_usuario":oSelectedItem.getTitle(),
                                "id_usuario":0
                            }
                            oCtrl_Datos_Maestros.oServ_Permisos(oData);*/
                        }
                        if (!oSelectedItem) {
                            oInput.resetProperty("");
                        }
                    },
                    search:function(oEvt)
                    {
                        var sValue = oEvt.getParameter("value");
                        var oFilterDesc = new Filter("description", sap.ui.model.FilterOperator.Contains, sValue);
                        var oFilterCategory = new Filter("category", sap.ui.model.FilterOperator.Contains, sValue);
                        var oModelFilter = new sap.ui.model.Filter([oFilterDesc, oFilterCategory]);
                        var oBinding = oEvt.getSource().getBinding("items");
                        oBinding.filter(oModelFilter, false);
                    }
            });
            
            oSelectDialog.setModel(oModel,"mGlobal");
            oSelectDialog.bindAggregation("items","mGlobal>/EXTERNAL_SERVICES", oList);
            
            oSelectDialog.open();
            /*function openDialog(){
                oSelectDialog.open();
            };
            oCtrl_DetalleEmpresa.oServ_PersonasParaAsociar(openDialog);
            */
		},

		onSelectExternalWorkshop: function(oEvt){
			var oModel = oCore.getModel("mGlobal");
            var oInput = oEvt.getSource();
            
            var oList= new sap.m.StandardListItem({	
				title:"{mGlobal>name}",
				description:"{mGlobal>owner} - {mGlobal>address}"
            });
            
            var oSelectDialog=new sap.m.SelectDialog({
                noDataText:"{i18n>SelectDialog.noDataText}",	
                title:"{i18n>ServiceDetail.SelectDialogExternalWorkshop.Title}",
                    confirm:function(oEvt)
                    {
                        var oSelectedItem = oEvt.getParameter("selectedItem")

                        if (oSelectedItem) {
                            var sPath = oEvt.getParameter("selectedItem").getBindingContext("mGlobal").getPath();
							var oRegister = oCore.getModel("mGlobal").getProperty(sPath);

							var oModelES = oCore.getModel("mExternalServiceDetail")
							var oDataExternalService = oModelES.getData();
							oDataExternalService.workshop = oRegister.name;
							oDataExternalService.owner = oRegister.owner;
							oModelES.refresh();

							//oInput.setValue(oRegister.plate);
                            //oCtrl_MonVehicles.onNewVehicle();
                            //invocar al servicio
                            /*var oData = {
                                "id_idioma": oCore.User.Language.toUpperCase(),
                                "id_tipo_usuario":oSelectedItem.getTitle(),
                                "id_usuario":0
                            }
                            oCtrl_Datos_Maestros.oServ_Permisos(oData);*/
                        }
                        if (!oSelectedItem) {
                            oInput.resetProperty("");
                        }
                    },
                    search:function(oEvt)
                    {
                        var sValue = oEvt.getParameter("value");
                        var oFilterName = new Filter("name", sap.ui.model.FilterOperator.Contains, sValue);
                        var oFilterOwner = new Filter("owner", sap.ui.model.FilterOperator.Contains, sValue);
                        var oModelFilter = new sap.ui.model.Filter([oFilterName, oFilterOwner]);
                        var oBinding = oEvt.getSource().getBinding("items");
                        oBinding.filter(oModelFilter, false);
                    }
            });
            
            oSelectDialog.setModel(oModel,"mGlobal");
            oSelectDialog.bindAggregation("items","mGlobal>/EXTERNAL_WORKSHOPS",oList);
            
            oSelectDialog.open();
            /*function openDialog(){
                oSelectDialog.open();
            };
            oCtrl_DetalleEmpresa.oServ_PersonasParaAsociar(openDialog);
            */
		}
	});
});