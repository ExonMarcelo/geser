var oCtrl_MonVehicles;var oFragments={};sap.ui.define(["jquery.sap.global","sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,o,n,a){var l;return t.extend("com.exonmarcelo.geser.webapp.controller.MonitorVehicles",{onInit:function(t){oCtrl_MonVehicles=this;console.log("init");l=oCtrl_MonVehicles.getView();l.addEventDelegate({onBeforeShow:e.proxy(function(e){this.onBeforeShow(e)},this)});Utils.fnCreateFilterPanel("VEHICLES",oCtrl_MonVehicles)},onBeforeShow:function(e){oComponent.fnToggleButtonsTP(true);oComponent.fnToggleButtonUser(true);oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.5")},onAfterRendering:function(){},fnFilter:function(e){var t={title:"Filtros",conditionText:"Filtrar desde BD",conditionIsMandatory:true,content:[new sap.m.Label({text:"DNI"}),new sap.m.Input({value:"",maxLength:8}),new sap.m.Label({text:"Nombre"}),new sap.m.Input({value:"",maxLength:50}),new sap.m.Label({text:"Apellido"}),new sap.m.Input({value:"",maxLength:50})],filterButtonText:"Aplicar",cancelButtonText:"Cancelar",fnLocalFilter:function(){var e=[new n("dni",sap.ui.model.FilterOperator.Contains,t.content[1].getValue()),new n("name",sap.ui.model.FilterOperator.Contains,t.content[3].getValue()),new n("surname",sap.ui.model.FilterOperator.Contains,t.content[5].getValue())];var o=[];for(var a=0;a<e.length;a++){if(e[a].oValue1!=""){o.push(e[a])}}if(o.length>0){var l=new sap.ui.model.Filter(o);var i=oCtrl_MonVehicles.byId("idTableCustomers").getBinding("items");i.filter(l,false)}console.log("local filter")},fnDBFilter:function(){console.log("DB filter")},fnCancelFilter:function(){console.log("canceled filter")}};Utils.fnCreateDialogFilter(t)},fnCleanFilters:function(){Utils.fnCleanTableFilters(oCtrl_MonVehicles,"idTableCustomers")},onItemPress:function(e){var t=e.getParameter("listItem").getBindingContext("mCatalogs").sPath;var o=oCore.getModel("mCatalogs").getProperty(t);var n=oCore.getModel("mVehicleDetail");n.setData(o);n.refresh();var a=sap.ui.core.UIComponent.getRouterFor(oCtrl_MonVehicles);a._oConfig.transition="slide";a.navTo("VehicleDetail",{},false)},onSettingsTableVehicles:function(e){var t=oCore.getModel("mCatalogs");var o=[{key:"plate",text:oCore.getModel("i18n").getProperty("MonitorVehicles.Table.Column.2"),duplicate:false},{key:"brand",text:oCore.getModel("i18n").getProperty("MonitorVehicles.Table.Column.3"),duplicate:true},{key:"cylinder",text:oCore.getModel("i18n").getProperty("MonitorVehicles.Table.Column.4"),duplicate:true}];var a=[],l=[];for(var i=0;i<o.length;i++){if(!o[i].duplicate){var r=new sap.m.ViewSettingsItem({text:"{mCatalogs>"+o[i].key+"}",key:"{mCatalogs>"+o[i].key+"}"});var s=new sap.m.ViewSettingsFilterItem({text:o[i].text,key:o[i].key,multiSelect:false});s.setModel(t,"mCatalogs");s.bindAggregation("items","mCatalogs>/CUSTOMERS",r);a.push(s)}else{var c=oCore.getModel("mCatalogs").getData().CUSTOMERS;var g=Utils.fnDeleteDupilcateObjects(c,o[i].key);var m=oCore.getModel("mLocalFilters");switch(o[i].key){case"brand":m.getData().BRANDS=g;break;case"cylinder":m.getData().CYLINDERS=g;break}m.refresh();var u=new sap.m.ViewSettingsItem({text:"{mLocalFilters>"+o[i].key+"}",key:"{mLocalFilters>"+o[i].key+"}"});var d=new sap.m.ViewSettingsFilterItem({text:o[i].text,key:o[i].key,multiSelect:false});d.setModel(m,"mLocalFilters");var f="";switch(o[i].key){case"brand":f="mLocalFilters>/BRANDS";break;case"cylinder":f="mLocalFilters>/CYLINDERS";break}d.bindAggregation("items",f,u);a.push(d)}l.push(new sap.m.ViewSettingsItem({text:o[i].text,key:o[i].key}))}if(l.length>0){l[0].setSelected(true)}var p=new sap.m.ViewSettingsDialog({title:Utils.fnReadTranslate("Button.SettingsTable.Text"),filterSearchOperator:"Contains",confirm:function(e){var t=oCtrl_MonVehicles.byId("idTableCustomers"),o=e.getParameters(),a=t.getBinding("items"),l,i,r=[],s=[];l=o.sortItem.getKey();i=o.sortDescending;r.push(new sap.ui.model.Sorter(l,i));a.sort(r);o.filterItems.forEach(function(e){var t=e.getKey(),o=e.getParent().getKey(),a=new n(o,"EQ",t);s.push(a)});a.filter(s);oCtrl_MonVehicles.byId("idCounterVehicles").setText("("+a.aIndices.length+")")},sortItems:l,filterItems:a});p.open()},onNewVehicle:function(e){Utils.fnDialogNewVehicle()},onSelectCustomer:function(e){var t=oCore.getModel("mCatalogs");var o=new sap.m.StandardListItem({title:"{mCatalogs>dni}",description:"{mCatalogs>fullname}"});var a=new sap.m.SelectDialog({noDataText:"{i18n>SelectDialog.noDataText}",title:"{i18n>MonitorVehicles.SelectDialog.Title}",confirm:function(e){var t=e.getParameter("selectedItem");if(t){oCtrl_MonVehicles.onNewVehicle()}if(!t){}},search:function(e){var t=e.getParameter("value");var o=new n("fullname",sap.ui.model.FilterOperator.Contains,t);var a=new n("dni",sap.ui.model.FilterOperator.Contains,t);var l=new sap.ui.model.Filter([o,a]);var i=e.getSource().getBinding("items");i.filter(l,false)}});a.setModel(t,"mCatalogs");a.bindAggregation("items","mCatalogs>/CUSTOMERS",o);a.open()}})});