"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getRandomInt = exports.getRandomTags = exports.main = void 0;
const articlesDb = __importStar(require("../data/articles.js"));
const usersDb = __importStar(require("../data/users.js"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = [];
    const articles = [];
    for (let i = 0; i < 10; i++) {
        users.push(yield usersDb.createUser(`user${i}@email.com`, `user${i}`, `pAssword${i}$!${i}`));
    }
    for (let i = 0; i < 100; i++) {
        articles.push(yield articlesDb.createArticle(`Title #${i}`, `Content of Article #${i}`, (0, exports.getRandomTags)(), users[(0, exports.getRandomInt)(0, users.length)]._id));
    }
    console.log("Done Seeding Database");
});
exports.main = main;
const getRandomTags = () => {
    const tags = ['cs', 'food', 'violin', 'school', 'instructions', 'notes', 'bugfix',
        'idea', 'shower thought', 'misc'];
    let numTags = (0, exports.getRandomInt)(1, 4);
    const output = [];
    for (let i = 0; i < numTags; i++) {
        output.push(tags[(0, exports.getRandomInt)(0, tags.length)]);
    }
    return output;
};
exports.getRandomTags = getRandomTags;
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
exports.getRandomInt = getRandomInt;
(0, exports.main)();
