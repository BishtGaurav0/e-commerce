import Noty from 'noty';  
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/bootstrap-v4.css"; 

export  function showNotification(text, type, timeout) {
    new Noty({
      text: text,
      layout: "topRight",
      theme: "bootstrap-v4",
      type: type,
      timeout: timeout
    }).show();
}