"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.dbConnection = void 0;
const mongodb_1 = require("mongodb");
const settings_js_1 = require("./settings.js");
let _connection = undefined;
let _db = undefined;
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!_connection) {
        _connection = yield mongodb_1.MongoClient.connect(settings_js_1.mongoConfig.serverUrl);
        _db = _connection.db(settings_js_1.mongoConfig.database);
    }
    return _db;
});
exports.dbConnection = dbConnection;
const closeConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield _connection.close();
});
exports.closeConnection = closeConnection;
