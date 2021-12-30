import Noty from 'noty';  
import "../../node_modules/noty/lib/noty.css";  


export  function showNotification(text, type, timeout) {
    new Noty({
      text: text,
      type:type,
      timeout:timeout
    }).show();
  }