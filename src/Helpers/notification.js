import Noty from 'noty';  

export  function showNotification(text, type, timeout) {
    new Noty({
      text: text,
      type:type,
      timeout:timeout
    }).show();
  }