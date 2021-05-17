jQuery.sap.declare("util.Formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");

sDateFormat_1 = sap.ui.core.format.DateFormat.getDateTimeInstance({
  pattern: "dd/MM/yyyy HH:mm"
});

util.Formatter = {
  serviceState: function(sStateValue) {
    var sStateValueToLower = sStateValue.toLowerCase();
    switch (sStateValueToLower) {
      case "pendiente":
        return 1;
      case "aprobada":
        return 6;
      case "pospuesta":
      case "cancelada":
      case "rechazada":
        return 3;
      case "atendida":
        return 7;
      default:
        return 9;
    }
  },

  serviceStateColor: function(sStateValue) {
    var sStateValueToLower = sStateValue.toLowerCase();
    switch (sStateValueToLower) {
      case "pendiente":
        return "#ffb200";
      case "aprobada":
        return "#007db2";
      case "pospuesta":
      case "cancelada":
      case "rechazada":
        return "#c14646";
      case "atendida":
        return "#168282";
    }
  },

  listServicesInColumn: function(aServices){
    var sList = "";
    aServices.forEach(service => {
      sList +=  "- "+ service.description +"\n";
    });
    return sList;
  },

  listServicesInList: function(aServices){
    var sList = "";
    aServices.forEach(service => {
      sList +=  service.description +", ";
    });
    return sList.slice(sList[0], sList.length -2);
  },

  dateInFormatJS: function(sDate){
    return (sDate == "")? new Date() : new Date(sDate);
  },

};
