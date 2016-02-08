var ScribeAjaxTracker = function(config) {
  if (!(this instanceof ScribeAjaxTracker)) 
    return new ScribeAjaxTracker(config);
  this.config = config;
};

ScribeAjaxTracker.prototype.tracker = function(info) {
  var sanitizePath = function(path) {
    return path.replace(/\/+/g, '/');
  };
  info.path = sanitizePath(this.config.rootPath + '/' + info.path);
  this.send(info.path, JSON.stringify(info.value), function(){
    console.log("success");
  });
};

ScribeAjaxTracker.prototype.send = ( function() {
  var xhr;
  var versions = ["MSXML2.XmlHttp.5.0", 
                  "MSXML2.XmlHttp.4.0",
                  "MSXML2.XmlHttp.3.0", 
                  "MSXML2.XmlHttp.2.0",
                  "Microsoft.XmlHttp"];
  if(typeof XMLHttpRequest !== 'undefined') 
    xhr = new XMLHttpRequest();
  else
   for(var i = 0, len = versions.length; i < len; i++) {
    try {
      xhr = new ActiveXObject(versions[i]);
      break;
    }
    catch(e){}
   } // end for
   
  //actual ajax function returned after setup of xhr object
  return function _ajax(url, data, callback) {
    xhr.onreadystatechange = function() {
      if(xhr.readyState < 4) return; 
      if(xhr.status !== 200) return;
      if(xhr.readyState === 4) callback(xhr);        
    }
     
    xhr.open('Post', url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(data);
  }
} )();