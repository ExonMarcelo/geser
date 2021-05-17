jQuery.sap.declare("util.Formatter");jQuery.sap.require("sap.ui.core.format.DateFormat");sDateFormat_1=sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:"dd/MM/yyyy HH:mm"});util.Formatter={serviceState:function(e){var a=e.toLowerCase();switch(a){case"pendiente":return 1;case"aprobada":return 6;case"pospuesta":case"cancelada":case"rechazada":return 3;case"atendida":return 7;default:return 9}},serviceStateColor:function(e){var a=e.toLowerCase();switch(a){case"pendiente":return"#ffb200";case"aprobada":return"#007db2";case"pospuesta":case"cancelada":case"rechazada":return"#c14646";case"atendida":return"#168282"}},listServicesInColumn:function(e){var a="";e.forEach(e=>{a+="- "+e.description+"\n"});return a},listServicesInList:function(e){var a="";e.forEach(e=>{a+=e.description+", "});return a.slice(a[0],a.length-2)},dateInFormatJS:function(e){return e==""?new Date:new Date(e)}};