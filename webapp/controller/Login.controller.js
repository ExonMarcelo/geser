var oCtrl_Login;sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/Button"],function(o){"use strict";return o.extend("com.exonmarcelo.geser.webapp.controller.Login",{onInit:function(){oCtrl_Login=this;var o=this.getView();o.addEventDelegate({onBeforeShow:jQuery.proxy(function(o){this.onBeforeShow(o)},this)})},onBeforeShow:function(o){oComponent.fnToggleButtonsTP(false);oComponent.fnToggleButtonUser(false);oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title")},onPressLogin:function(){oCtrl_Login.getOwnerComponent().getRouter().navTo("Main")},onBeforeRendering:function(){oComponent.fnToggleButtonsTP(false);oComponent.fnToggleButtonUser(false)}})});