var derby, isProduction;

derby = require('derby');

isProduction = derby.util.isProduction;

module.exports = function(root) {
  var staticPages;
  staticPages = derby.createStatic(root);
  return function(err, req, res, next) {
    var message, status;
    if (err == null) {
      return next();
    }
    console.log(err.stack ? err.stack : err);
    message = err.message || err.toString();
    status = parseInt(message);
    if (status === 404) {
      return staticPages.render('404', res, {
        url: req.url
      }, 404);
    } else {
      return res.send((400 <= status && status < 600) ? status : 500);
    }
  };
};
