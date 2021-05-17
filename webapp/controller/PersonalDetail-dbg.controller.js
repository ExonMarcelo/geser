var oCtrl_PersonalDetail;
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
		_oPersonalCloned:{},
		_sActionRol: "",
		onInit : function(oEvt) {
			oCtrl_PersonalDetail = this;
			console.log("init");
			//oCore = sap.ui.getCore();
			oView = oCtrl_PersonalDetail.getView();

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
			
			//oCtrl_Menu.fnInsertUserBar(oCtrl_PersonalDetail, "idPageCustomerDetail");
		},
		onBeforeShow:function(oEvt){
			oComponent.fnToggleButtonsTP(true);
			oComponent.fnToggleButtonUser(true);
			oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.12");

			oCtrl_PersonalDetail.fnToggleButtons(true);
			oCtrl_PersonalDetail.fnToggleFormInfoPersonal(true);
			//oCtrl_PersonalDetail.fnToggleFormUser(true);
			oCtrl_PersonalDetail.fnShowContentInSectionAccess();
		},
		onAfterRendering : function(){
			//oCtrl_PersonalDetail.byId("idTitleUserBar").setText("Detalle de Cliente");
		},
		fnShowContentInSectionAccess: function(){
			sUser = oCore.getModel("mPersonalDetail").getData().user;
			if (sUser == undefined || sUser =="") {
				oCtrl_PersonalDetail.fnToggleContentInSectionAccess(true);
				//oCtrl_PersonalDetail.fnShowFormInfoPersonal();
			}else{
				oCtrl_PersonalDetail.fnToggleContentInSectionAccess(false);
				//oCtrl_PersonalDetail.fnShowFormInfoPersonal();
			}
			
		},
		fnShowFormInfoPersonal: function(){
			oCtrl_PersonalDetail.fnToggleContentInSectionAccess(false);
				oCtrl_PersonalDetail.fnToggleFormInfoPersonal(true);
		},
		fnToggleContentInSectionAccess: function(oValue){
			oCtrl_PersonalDetail.byId("idVBoxWarningUser").setVisible(oValue);
			oCtrl_PersonalDetail.byId("idFormDisplayEditUser").setVisible(!oValue);	
		},
		fnToggleButtons:function(oValue){
			oCtrl_PersonalDetail.byId("edit").setVisible(oValue);
			oCtrl_PersonalDetail.byId("save").setVisible(!oValue);
			oCtrl_PersonalDetail.byId("delete").setVisible(oValue);
			oCtrl_PersonalDetail.byId("cancel").setVisible(!oValue);

			oCtrl_PersonalDetail.fnToggleFormInfoPersonal(oValue);
		},
		fnToggleFormInfoPersonal: function(oValue){
			oCtrl_PersonalDetail.byId("idEmployeeFormDisplay").setVisible(oValue);
			oCtrl_PersonalDetail.byId("idEmployeeFormEdit").setVisible(!oValue);
		},
		fnToggleFormUser: function(oValue){
			oCtrl_PersonalDetail.byId("idUserFormDisplay").setVisible(oValue);
			oCtrl_PersonalDetail.byId("idUserFormEdit").setVisible(!oValue);
		},
		onPressEdit:function(oEvt){
			var oCustomer = oCore.getModel("mPersonalDetail").getData();
			oCtrl_PersonalDetail._oPersonalCloned = jQuery.extend(true, {}, oCustomer);
			oCtrl_PersonalDetail.fnToggleButtons(false);
		},
		onPressSave:function(oEvt){
			var oSettings = {
				sIcon : "SUCCESS",
				sMessage : "Cliente modificado con éxito",
				fnButtonOK : function(){
					oCtrl_PersonalDetail.fnToggleButtons(true);
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
			oCore.getModel("mPersonalDetail").setData(oCtrl_PersonalDetail._oPersonalCloned);
			oCore.getModel("mPersonalDetail").refresh();
			oCtrl_PersonalDetail.fnToggleButtons(true);
		},

		onNewControlSheet: function(oEvt){
			Utils.fnNewControlSheet(true);
		},

		onItemPressControlSheets: function(oEvt){
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_PersonalDetail);
			router._oConfig.transition = "slide";
			router.navTo("ControlSheetDetail",{},false);
		},
		onAddUser: function(oEvt){
			//oComponent.fnCleanModel("mPersonalDetail");
			var sClass = (sap.ui.Device.system.desktop)?"sapUiSizeCompact":"sapUiSmallMarginBottom";

			var oSettingsForm = {
				title: Utils.fnReadTranslate("PersonalDetail.ObjectPageLayout.Sections.ObjectPageSection.Access.Button.1.Text"),
				icon: "sap-icon://account",
				content:[
					new sap.m.Label({text: Utils.fnReadTranslate("PersonalDetail.ObjectPageLayout.Sections.ObjectPageSection.Access.FormElement.1.Label")}),
					new sap.m.Input({value: "{mPersonalDetail>/user}"}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("PersonalDetail.ObjectPageLayout.Sections.ObjectPageSection.Access.FormElement.2.Label")}),
					new sap.m.Input({value: "{mPersonalDetail>/password}", type:"Password"}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("PersonalDetail.ObjectPageLayout.Sections.ObjectPageSection.Access.FormElement.3.Label")}),
					new sap.m.Input({value: "{mPersonalDetail>/confirm_password}", type:"Password"}).addStyleClass(sClass)
				],
				textButtonOK: Utils.fnReadTranslate("Button.Save"),
				fnButtonOK: function(){
					var oSettings = {
						sIcon : "SUCCESS",
						sMessage : "Usuario agregado con éxito.",
						fnButtonOK : function(){
							oCtrl_PersonalDetail.fnShowFormInfoPersonal();
							oCtrl_PersonalDetail.fnToggleFormUser(true);
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
		onChangeUser: function(){
			oCtrl_PersonalDetail.fnToggleFormUser(false);
		},
		onSaveUser: function(){
			var oSettings = {
				sIcon : "SUCCESS",
				sMessage : "Usuario modificado con éxito.",
				fnButtonOK : function(){
					oCtrl_PersonalDetail.fnToggleFormUser(true);
				}
			};
			Utils.fnShowMessage(oSettings);
			
		},
		onCancelChangeUser: function(){
			oCtrl_PersonalDetail.fnToggleFormUser(true);
		},

		onAddRole: function(oEvt){
			var sClass = (sap.ui.Device.system.desktop)?"sapUiSizeCompact":"sapUiSmallMarginBottom";

			var oSettingsForm = {
				title: Utils.fnReadTranslate("PersonalDetail.DialogAddRole.Title"),
				icon: "sap-icon://role",
				content:[
					new sap.m.Label({text: Utils.fnReadTranslate("PersonalDetail.DialogAddRole.Label.1.Text")}),
					new sap.m.Input({
						value: "{mPersonalDetail>/rolePersonal/role_description}",
						showValueHelp: true,
						valueHelpOnly: true,
						valueHelpRequest: oCtrl_PersonalDetail.onSelectRole
					}).addStyleClass(sClass)
				],
				textButtonOK: Utils.fnReadTranslate("Button.Save"),
				fnButtonOK: function(){
					var oSettings = {
						sIcon : "SUCCESS",
						sMessage : "Rol agregado con éxito.",
						fnButtonOK : function(){
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

		onSelectRole: function(oEvt){
			var oModel = oCore.getModel("mCatalogs");
            var oInput = oEvt.getSource();
            
            var oList= new sap.m.StandardListItem({	
            	title:"{mCatalogs>description}"
            });
            
            var oSelectDialog=new sap.m.SelectDialog({
                noDataText:"{i18n>SelectDialog.noDataText}",	
                title:"{i18n>PersonalDetail.SelectDialog.Roles.Title}",
                    confirm:function(oEvt)
                    {
                        var oSelectedItem = oEvt.getParameter("selectedItem")

                        if (oSelectedItem) {
                            
                            //alert("Enviar al servicio: "+oSelectedItem.getTitle());
                            var sPath = oEvt.getParameter("selectedItem").getBindingContext("mCatalogs").getPath();
                            //oCtrl_DetalleEmpresa.onNuevoAsociado(sPath);
							var oRegister = oCore.getModel("mCatalogs").getProperty(sPath);

							var oModel = oCore.getModel("mPersonalDetail");
							var oDataModel = oModel.getData();
							oDataModel.rolePersonal = {};
							oDataModel.rolePersonal.role_description = oRegister.description;
							oModel.refresh();


							//oInput.setValue(oRegister.description);
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
                        var oFilter = new Filter("descripction", sap.ui.model.FilterOperator.Contains, sValue);
                        //var oFilterPlate = new Filter("plate", sap.ui.model.FilterOperator.Contains, sValue);
                        var oModelFilter = new sap.ui.model.Filter([oFilter]);
                        var oBinding = oEvt.getSource().getBinding("items");
                        oBinding.filter(oModelFilter, false);
                    }
            });
            
            oSelectDialog.setModel(oModel,"mCatalogs");
            oSelectDialog.bindAggregation("items","mCatalogs>/ROLES",oList);
            
            oSelectDialog.open();
            /*function openDialog(){
                oSelectDialog.open();
            };
            oCtrl_DetalleEmpresa.oServ_PersonasParaAsociar(openDialog);
            */
		},
		onPressEditRole: function(oEvt){

			var sPath = oEvt.getSource().getBindingInfo("text").binding.getContext().getPath();
			var oRole = oCore.getModel("mCatalogs").getProperty(sPath);

			var oModel = oCore.getModel("mPersonalDetail");
			var oDataModel = oModel.getData();
			oDataModel.rolePersonal = {};
			oDataModel.rolePersonal.role_description = oRole.description;
			oModel.refresh();

			var sClass = (sap.ui.Device.system.desktop)?"sapUiSizeCompact":"sapUiSmallMarginBottom";

			var oSettingsForm = {
				title: Utils.fnReadTranslate("PersonalDetail.DialogEditRole.Title"),
				icon: "sap-icon://role",
				content:[
					new sap.m.Label({text: Utils.fnReadTranslate("PersonalDetail.DialogEditRole.Label.1.Text")}),
					new sap.m.Input({
						value: "{mPersonalDetail>/rolePersonal/role_description}",
						showValueHelp: true,
						valueHelpOnly: true,
						valueHelpRequest: oCtrl_PersonalDetail.onSelectRole
					}).addStyleClass(sClass)
				],
				textButtonOK: Utils.fnReadTranslate("Button.Save"),
				fnButtonOK: function(){
					var oSettings = {
						sIcon : "SUCCESS",
						sMessage : "Rol modificado con éxito.",
						fnButtonOK : function(){
						}
					};
					Utils.fnShowMessage(oSettings);
				},
				textButtonCancel: Utils.fnReadTranslate("Button.Cancel"),
				fnButtonCancel: undefined,
				sClassDialog: sClass
			};

			Utils.fnDialogWithSimpleForm(oSettingsForm);
		}

	});
});