import * as tslib_1 from "tslib";
import { Diagram, Node, ToolBase } from '@syncfusion/ej2-diagrams';
import { MindMapUtilityMethods } from './mindmap';
import { OrgChartUtilityMethods } from './orgchart';
var CustomDiagram = (function (_super) {
    tslib_1.__extends(CustomDiagram, _super);
    function CustomDiagram() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedItem = null;
        return _this;
    }
    CustomDiagram.prototype.getTool = function (action) {
        if (action === 'leftHandle') {
            var leftTool = new LeftExtendTool(this.commandHandler);
            leftTool.selectedItem = this.selectedItem;
            return leftTool;
        }
        else if (action === 'rightHandle') {
            var rightTool = new RightExtendTool(this.commandHandler);
            rightTool.selectedItem = this.selectedItem;
            return rightTool;
        }
        else if (action === 'removeHandle') {
            var removeTool = new RemoveTool(this.commandHandler);
            removeTool.selectedItem = this.selectedItem;
            return removeTool;
        }
        else if (action === 'orgAddHandle') {
            var orgAddTool = new OrgAddHandleTool(this.commandHandler);
            orgAddTool.selectedItem = this.selectedItem;
            return orgAddTool;
        }
        else if (action === 'orgRemoveHandle') {
            var orgRemoveTool = new OrgRemoveHandleTool(this.commandHandler);
            orgRemoveTool.selectedItem = this.selectedItem;
            return orgRemoveTool;
        }
        else if (action === 'orgEditHandle') {
            var orgEditTool = new OrgEditHandleTool(this.commandHandler);
            orgEditTool.selectedItem = this.selectedItem;
            return orgEditTool;
        }
        else {
            return _super.prototype.getTool.call(this, action);
        }
    };
    return CustomDiagram;
}(Diagram));
export { CustomDiagram };
var LeftExtendTool = (function (_super) {
    tslib_1.__extends(LeftExtendTool, _super);
    function LeftExtendTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedItem = null;
        return _this;
    }
    LeftExtendTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        _super.prototype.mouseDown.call(this, args);
    };
    LeftExtendTool.prototype.mouseUp = function (args) {
        if (this.inAction) {
            var selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    MindMapUtilityMethods.addNode('Left');
                }
            }
        }
        _super.prototype.mouseUp.call(this, args);
    };
    return LeftExtendTool;
}(ToolBase));
var RightExtendTool = (function (_super) {
    tslib_1.__extends(RightExtendTool, _super);
    function RightExtendTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedItem = null;
        return _this;
    }
    RightExtendTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        _super.prototype.mouseDown.call(this, args);
    };
    RightExtendTool.prototype.mouseUp = function (args) {
        if (this.inAction) {
            var selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    MindMapUtilityMethods.addNode('Right');
                }
            }
        }
        _super.prototype.mouseUp.call(this, args);
    };
    return RightExtendTool;
}(ToolBase));
var RemoveTool = (function (_super) {
    tslib_1.__extends(RemoveTool, _super);
    function RemoveTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedItem = null;
        return _this;
    }
    RemoveTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        _super.prototype.mouseDown.call(this, args);
    };
    RemoveTool.prototype.mouseUp = function (args) {
        if (this.inAction) {
            var selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    MindMapUtilityMethods.removeChild();
                }
            }
        }
        _super.prototype.mouseUp.call(this, args);
    };
    return RemoveTool;
}(ToolBase));
var OrgAddHandleTool = (function (_super) {
    tslib_1.__extends(OrgAddHandleTool, _super);
    function OrgAddHandleTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedItem = null;
        return _this;
    }
    OrgAddHandleTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        _super.prototype.mouseDown.call(this, args);
    };
    OrgAddHandleTool.prototype.mouseUp = function (args) {
        if (this.inAction) {
            var selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    OrgChartUtilityMethods.addChild(this.selectedItem.selectedDiagram.selectedItems.nodes[0].id);
                }
            }
        }
        _super.prototype.mouseUp.call(this, args);
    };
    return OrgAddHandleTool;
}(ToolBase));
var OrgRemoveHandleTool = (function (_super) {
    tslib_1.__extends(OrgRemoveHandleTool, _super);
    function OrgRemoveHandleTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedItem = null;
        return _this;
    }
    OrgRemoveHandleTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        _super.prototype.mouseDown.call(this, args);
    };
    OrgRemoveHandleTool.prototype.mouseUp = function (args) {
        if (this.inAction) {
            var selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    OrgChartUtilityMethods.removeChild();
                }
            }
        }
        _super.prototype.mouseUp.call(this, args);
    };
    return OrgRemoveHandleTool;
}(ToolBase));
var OrgEditHandleTool = (function (_super) {
    tslib_1.__extends(OrgEditHandleTool, _super);
    function OrgEditHandleTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedItem = null;
        return _this;
    }
    OrgEditHandleTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        _super.prototype.mouseDown.call(this, args);
    };
    OrgEditHandleTool.prototype.mouseUp = function (args) {
        if (this.inAction) {
            var selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    OrgChartUtilityMethods.showCustomProperty();
                }
            }
        }
        _super.prototype.mouseUp.call(this, args);
    };
    return OrgEditHandleTool;
}(ToolBase));
//# sourceMappingURL=userhandles.js.map