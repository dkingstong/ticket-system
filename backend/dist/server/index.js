"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("./config/express.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var port = process.env.PORT || 4000;
_express["default"].listen(port, function () {
  console.log('Listening on port ' + port);
});
var _default = exports["default"] = _express["default"];