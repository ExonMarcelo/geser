var oCtrl_ServiceDetail;var oFragments={};sap.ui.define(["jquery.sap.global","sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,a,r,l){var o;return t.extend("com.exonmarcelo.geser.webapp.controller.ServiceDetail",{_oCustomerCloned:{},onInit:function(t){oCtrl_ServiceDetail=this;console.log("init");o=oCtrl_ServiceDetail.getView();o.addEventDelegate({onBeforeShow:e.proxy(function(e){this.onBeforeShow(e)},this)})},onBeforeShow:function(e){oComponent.fnToggleButtonsTP(true);oComponent.fnToggleButtonUser(true);oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.10");oCtrl_ServiceDetail.fnToggleButtons(true);oCtrl_ServiceDetail.fnBindDataToModel()},onAfterRendering:function(){},fnToggleButtons:function(e){oCtrl_ServiceDetail.byId("edit").setVisible(e);oCtrl_ServiceDetail.byId("save").setVisible(!e);oCtrl_ServiceDetail.byId("delete").setVisible(e);oCtrl_ServiceDetail.byId("cancel").setVisible(!e);oCtrl_ServiceDetail.byId("idServiceFormDisplay").setVisible(e);oCtrl_ServiceDetail.byId("idServiceFormEdit").setVisible(!e)},fnBindDataToModel:function(e){var t={service_id:1,service_description:"Cambio de Anillos",plate:"AB - 12345",image:"",start_date:"07/06/2019 10:30",end_date:"",status:"En Desamblado",cost:"S/. 60.00",STAGES_HISTORY:[{id_estatus:"INT",status:"Internado",start_date:"07/06/2019 10:30",end_date:"07/06/2019 10:40",observation:""},{id_estatus:"DES",status:"En Desamblado",start_date:"07/06/2019 10:40",end_date:"",observation:"Una varilla del motor su hilo estaba dañado"}],SPARE_PARTS:[{id_spare_parts:1,description:"Anillos JP",brand:"Honda",cost:"S/. 50.00",observation:""},{id_spare_parts:2,description:"Empaquetaduras cabezal CG-125",brand:"Honda",cost:"S/. 30.00",observation:""},{id_spare_parts:3,description:"Válvula de Adminsión CG-125",brand:"Honda",cost:"S/. 25.00",observation:""},{id_spare_parts:4,description:"Válvula de Escape CG-125",brand:"Honda",cost:"S/. 25.00",observation:""},{id_spare_parts:5,description:"Bujía",brand:"Honda",cost:"S/. 10.00",observation:""}],LATHE_SERVICES:[{id_external_service:1,description:"Encamisetado de Cilindro",category_service:"TORNO",id_external_workshop:1,lathe_workshop:"Torno Siancas",cost:"S/90.00",observation:"Estaba en 100cc se encamiseto a STD"},{id_external_service:2,description:"Asiento de Válvulas",category_service:"TORNO",id_external_workshop:1,lathe_workshop:"Torno Siancas",cost:"S/20.00",observation:""},{id_external_service:3,description:"Guias de Válvulas",category_service:"TORNO",id_external_workshop:1,lathe_workshop:"Torno Siancas",cost:"S/40.00",observation:""}],OTHER_EXTERNAL_SERVICES:[{id_external_service:4,description:"Limpieza de Escape",category_service:"Soldadura",id_external_workshop:1,external_workshop:"Taller de Soldaura Florito",cost:"S/20.00",observation:"El escape botaba humo"}]};var a=oCore.getModel("mServiceDetail");a.setData(t);a.refresh()},onPressEdit:function(t){var a=oCore.getModel("mCustomerDetail").getData();oCtrl_ServiceDetail._oCustomerCloned=e.extend(true,{},a);oCtrl_ServiceDetail.fnToggleButtons(false)},onPressSave:function(e){var t={sIcon:"SUCCESS",sMessage:"Cliente modificado con éxito",fnButtonOK:function(){oCtrl_ServiceDetail.fnToggleButtons(true);console.log("refresh data")}};Utils.fnShowMessage(t)},onPressDelete:function(){var e={sMessage:"¿Desea eliminar este registro?",fnButtonOK:function(){console.log("removed record")},fnButtonNOT:function(){console.log("canceled action")}};Utils.fnShowConfirmationMessage(e)},onPressCancel:function(e){oCore.getModel("mCustomerDetail").setData(oCtrl_ServiceDetail._oCustomerCloned);oCore.getModel("mCustomerDetail").refresh();oCtrl_ServiceDetail.fnToggleButtons(true)},onNewControlSheet:function(e){Utils.fnNewControlSheet(true)},onItemPressControlSheets:function(e){var t=sap.ui.core.UIComponent.getRouterFor(oCtrl_ServiceDetail);t._oConfig.transition="slide";t.navTo("ControlSheetDetail",{},false)},onAddSparePart:function(e){oComponent.fnCleanModel("mSparePartDetail");var t=sap.ui.Device.system.desktop?"sapUiSizeCompact":"sapUiSmallMarginBottom";var a={title:Utils.fnReadTranslate("ServiceDetail.DialogAddSparePart.Title"),icon:"sap-icon://add-equipment",content:[new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddSparePart.Form.Label.1.Text")}),new sap.m.Input({value:"{mSparePartDetail>/description_spare_part}",showValueHelp:true,valueHelpOnly:true,valueHelpRequest:oCtrl_ServiceDetail.onSelectSparePart}).addStyleClass(t),new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddSparePart.Form.Label.2.Text")}),new sap.m.Text({text:"{mSparePartDetail>/brand}"}),new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddSparePart.Form.Label.3.Text")}),new sap.m.Text({text:"{mSparePartDetail>/base_price}"}),new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddSparePart.Form.Label.4.Text")}),new sap.m.Input({value:"{mSparePartDetail>/real_price}"}).addStyleClass(t)],textButtonOK:Utils.fnReadTranslate("Button.Add"),fnButtonOK:function(){},textButtonCancel:Utils.fnReadTranslate("Button.Cancel"),fnButtonCancel:undefined,sClassDialog:t};Utils.fnDialogWithSimpleForm(a)},onSelectSparePart:function(e){var t=oCore.getModel("mGlobal");var a=e.getSource();var l=new sap.m.StandardListItem({title:"{mGlobal>brand}",description:"{mGlobal>description}",icon:"{mGlobal>image}",info:"{mGlobal>price}"});var o=new sap.m.SelectDialog({noDataText:"{i18n>SelectDialog.noDataText}",title:"{i18n>ServiceDetail.SelectDialogSparePart.Title}",confirm:function(e){var t=e.getParameter("selectedItem");if(t){var r=e.getParameter("selectedItem").getBindingContext("mGlobal").getPath();var l=oCore.getModel("mGlobal").getProperty(r);var o=oCore.getModel("mSparePartDetail");var i=o.getData();i.description_spare_part=l.description;i.brand=l.brand;i.base_price=l.price;i.real_price=l.price;o.refresh()}if(!t){a.resetProperty("")}},search:function(e){var t=e.getParameter("value");var a=new r("description",sap.ui.model.FilterOperator.Contains,t);var l=new r("brand",sap.ui.model.FilterOperator.Contains,t);var o=new sap.ui.model.Filter([a,l]);var i=e.getSource().getBinding("items");i.filter(o,false)}});o.setModel(t,"mGlobal");o.bindAggregation("items","mGlobal>/SPARE_PARTS",l);o.open()},onAddLatheService:function(e){oComponent.fnCleanModel("mLatheServiceDetail");var t=sap.ui.Device.system.desktop?"sapUiSizeCompact":"sapUiSmallMarginBottom";var a={title:Utils.fnReadTranslate("ServiceDetail.DialogAddLatheService.Title"),icon:"sap-icon://add-equipment",content:[new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddLatheService.Form.Label.1.Text")}),new sap.m.Input({value:"{mLatheServiceDetail>/description_lathe_service}",showValueHelp:true,valueHelpOnly:true,valueHelpRequest:oCtrl_ServiceDetail.onSelectLatheService}).addStyleClass(t),new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddLatheService.Form.Label.2.Text")}),new sap.m.Input({value:"{mLatheServiceDetail>/lathe_workshop}",showValueHelp:true,valueHelpOnly:true,valueHelpRequest:oCtrl_ServiceDetail.onSelectLatheWorkshop}).addStyleClass(t),new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddLatheService.Form.Label.3.Text")}),new sap.m.Text({text:"{mLatheServiceDetail>/base_price}"}),new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddLatheService.Form.Label.4.Text")}),new sap.m.Input({value:"{mLatheServiceDetail>/real_price}"}).addStyleClass(t),new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddLatheService.Form.Label.5.Text")}),new sap.m.TextArea({value:"{mLatheServiceDetail>/comment}"}).addStyleClass(t)],textButtonOK:Utils.fnReadTranslate("Button.Add"),fnButtonOK:function(){},textButtonCancel:Utils.fnReadTranslate("Button.Cancel"),fnButtonCancel:undefined,sClassDialog:t};Utils.fnDialogWithSimpleForm(a)},onSelectLatheService:function(e){var t=oCore.getModel("mGlobal");var a=e.getSource();var l=new sap.m.StandardListItem({title:"{mGlobal>description}",info:"{mGlobal>price}"});var o=new sap.m.SelectDialog({noDataText:"{i18n>SelectDialog.noDataText}",title:"{i18n>ServiceDetail.SelectDialogLatheService.Title}",confirm:function(e){var t=e.getParameter("selectedItem");if(t){var r=e.getParameter("selectedItem").getBindingContext("mGlobal").getPath();var l=oCore.getModel("mGlobal").getProperty(r);var o=oCore.getModel("mLatheServiceDetail");var i=o.getData();i.description_lathe_service=l.description;i.base_price=l.price;i.real_price=l.price;o.refresh()}if(!t){a.resetProperty("")}},search:function(e){var t=e.getParameter("value");var a=new r("description",sap.ui.model.FilterOperator.Contains,t);var l=new sap.ui.model.Filter([a]);var o=e.getSource().getBinding("items");o.filter(l,false)}});o.setModel(t,"mGlobal");o.bindAggregation("items","mGlobal>/LATHE_SERVICES",l);o.open()},onSelectLatheWorkshop:function(e){var t=oCore.getModel("mGlobal");var a=e.getSource();var l=new sap.m.StandardListItem({title:"{mGlobal>name}",description:"{mGlobal>owner} - {mGlobal>address}"});var o=new sap.m.SelectDialog({noDataText:"{i18n>SelectDialog.noDataText}",title:"{i18n>ServiceDetail.SelectDialogLatheWorkshop.Title}",confirm:function(e){var t=e.getParameter("selectedItem");if(t){var r=e.getParameter("selectedItem").getBindingContext("mGlobal").getPath();var l=oCore.getModel("mGlobal").getProperty(r);var o=oCore.getModel("mLatheServiceDetail");var i=o.getData();i.lathe_workshop=l.name;i.owner=l.owner;o.refresh()}if(!t){a.resetProperty("")}},search:function(e){var t=e.getParameter("value");var a=new r("name",sap.ui.model.FilterOperator.Contains,t);var l=new r("owner",sap.ui.model.FilterOperator.Contains,t);var o=new sap.ui.model.Filter([a,l]);var i=e.getSource().getBinding("items");i.filter(o,false)}});o.setModel(t,"mGlobal");o.bindAggregation("items","mGlobal>/LATHE_WORKSHOPS",l);o.open()},onAddOtherExternalService:function(e){oComponent.fnCleanModel("mExternalServiceDetail");var t=sap.ui.Device.system.desktop?"sapUiSizeCompact":"sapUiSmallMarginBottom";var a={title:Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Title"),icon:"sap-icon://add-equipment",content:[new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Form.Label.1.Text")}),new sap.m.Input({value:"{mExternalServiceDetail>/description_service}",showValueHelp:true,valueHelpOnly:true,valueHelpRequest:oCtrl_ServiceDetail.onSelectExternalService}).addStyleClass(t),new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Form.Label.2.Text")}),new sap.m.Input({value:"{mExternalServiceDetail>/workshop}",showValueHelp:true,valueHelpOnly:true,valueHelpRequest:oCtrl_ServiceDetail.onSelectExternalWorkshop}).addStyleClass(t),new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Form.Label.3.Text")}),new sap.m.Text({text:"{mExternalServiceDetail>/category}"}),new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Form.Label.4.Text")}),new sap.m.Text({text:"{mExternalServiceDetail>/base_price}"}),new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Form.Label.5.Text")}),new sap.m.Input({value:"{mExternalServiceDetail>/real_price}"}).addStyleClass(t),new sap.m.Label({text:Utils.fnReadTranslate("ServiceDetail.DialogAddExternalService.Form.Label.6.Text")}),new sap.m.TextArea({value:"{mExternalServiceDetail>/comment}"}).addStyleClass(t)],textButtonOK:Utils.fnReadTranslate("Button.Add"),fnButtonOK:function(){},textButtonCancel:Utils.fnReadTranslate("Button.Cancel"),fnButtonCancel:undefined,sClassDialog:t};Utils.fnDialogWithSimpleForm(a)},onSelectExternalService:function(e){var t=oCore.getModel("mGlobal");var a=e.getSource();var l=new sap.m.StandardListItem({title:"{mGlobal>category}",description:"{mGlobal>description}",info:"{mGlobal>price}"});var o=new sap.m.SelectDialog({noDataText:"{i18n>SelectDialog.noDataText}",title:"{i18n>ServiceDetail.SelectDialogExternalService.Title}",confirm:function(e){var t=e.getParameter("selectedItem");if(t){var r=e.getParameter("selectedItem").getBindingContext("mGlobal").getPath();var l=oCore.getModel("mGlobal").getProperty(r);var o=oCore.getModel("mExternalServiceDetail");var i=o.getData();i.description_service=l.description;i.category=l.category;i.base_price=l.price;i.real_price=l.price;o.refresh()}if(!t){a.resetProperty("")}},search:function(e){var t=e.getParameter("value");var a=new r("description",sap.ui.model.FilterOperator.Contains,t);var l=new r("category",sap.ui.model.FilterOperator.Contains,t);var o=new sap.ui.model.Filter([a,l]);var i=e.getSource().getBinding("items");i.filter(o,false)}});o.setModel(t,"mGlobal");o.bindAggregation("items","mGlobal>/EXTERNAL_SERVICES",l);o.open()},onSelectExternalWorkshop:function(e){var t=oCore.getModel("mGlobal");var a=e.getSource();var l=new sap.m.StandardListItem({title:"{mGlobal>name}",description:"{mGlobal>owner} - {mGlobal>address}"});var o=new sap.m.SelectDialog({noDataText:"{i18n>SelectDialog.noDataText}",title:"{i18n>ServiceDetail.SelectDialogExternalWorkshop.Title}",confirm:function(e){var t=e.getParameter("selectedItem");if(t){var r=e.getParameter("selectedItem").getBindingContext("mGlobal").getPath();var l=oCore.getModel("mGlobal").getProperty(r);var o=oCore.getModel("mExternalServiceDetail");var i=o.getData();i.workshop=l.name;i.owner=l.owner;o.refresh()}if(!t){a.resetProperty("")}},search:function(e){var t=e.getParameter("value");var a=new r("name",sap.ui.model.FilterOperator.Contains,t);var l=new r("owner",sap.ui.model.FilterOperator.Contains,t);var o=new sap.ui.model.Filter([a,l]);var i=e.getSource().getBinding("items");i.filter(o,false)}});o.setModel(t,"mGlobal");o.bindAggregation("items","mGlobal>/EXTERNAL_WORKSHOPS",l);o.open()}})});