"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tickets = _interopRequireDefault(require("./tickets.js"));
var _users = _interopRequireDefault(require("./users.js"));
var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routes = (0, _express.Router)();
routes.use('/tickets', _tickets["default"]);
routes.use('/users', _users["default"]);
var _default = exports["default"] = routes;