"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const assignedItemController_1 = require("../AssignedItem/Controller/assignedItemController");
const router = express_1.default.Router();
router.get('/:empId', assignedItemController_1.getAssignedItems);
exports.default = router;
