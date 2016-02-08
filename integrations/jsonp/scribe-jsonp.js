var ScribeJsonpTracker = function(config) {
  if (!(this instanceof ScribeJsonpTracker)) 
    return new ScribeJsonpTracker(config);
  this.config = config;
};

ScribeJsonpTracker.prototype.tracker = function(info) {
  var sanitizePath = function(path) {
    return path.replace(/\/+/g, '/');
  };
  info.path = sanitizePath(this.config.rootPath + '/' + info.path);
  info.path += "?data=" + JSON.stringify(info.value);
  console.log(info.path);
  this.jsonp(info.path, function(data) {
     alert(data);
  });
};

ScribeJsonpTracker.prototype.jsonp = function(url, callback) {
  var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  window[callbackName] = function(data) {
    delete window[callbackName];
    document.body.removeChild(script);
    callback(data);
  };

  var script = document.createElement('script');
  script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
  document.body.appendChild(script);
};