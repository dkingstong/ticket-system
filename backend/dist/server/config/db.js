"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var pgAddress = 'postgresql://localhost:5432/denniskingston';
var sequelize = new _sequelize["default"](pgAddress, {
  logging: true
});
var _default = exports["default"] = sequelize;