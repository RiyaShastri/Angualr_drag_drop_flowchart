import { CommonKeyboardCommands } from './commoncommands';
var CustomContextMenuItems = (function () {
    function CustomContextMenuItems() {
        this.items = [
            {
                text: 'Duplicate', id: 'duplicate'
            },
        ];
    }
    CustomContextMenuItems.prototype.getHiddenMenuItems = function (diagram) {
        var hiddenItems = [];
        hiddenItems.push('duplicate');
        if (diagram.selectedItems.nodes.length > 0 || diagram.selectedItems.connectors.length > 0) {
            hiddenItems.splice(hiddenItems.indexOf('duplicate'), 1);
        }
        if (diagram.selectedItems.nodes.length === 1 && diagram.selectedItems.connectors.length === 0) {
            var node = diagram.selectedItems.nodes[0];
            if (node.shape && node.shape.type === 'Bpmn') {
                var bpmnShape = node.shape;
                if (bpmnShape.shape === 'Event') {
                }
            }
        }
        return hiddenItems;
    };
    CustomContextMenuItems.prototype.updateBpmnShape = function (diagram, item) {
        var itemText = item.text.replace(/[' ']/g, '').replace(/[-]/g, '');
        if (itemText === 'Duplicate') {
            CommonKeyboardCommands.duplicateSelectedItems();
        }
        else if (diagram.selectedItems.nodes.length === 1 && diagram.selectedItems.connectors.length === 0) {
            var node = diagram.selectedItems.nodes[0];
            if (node.shape && node.shape.type === 'Bpmn') {
                var bpmnShape = node.shape;
                if (item.id.startsWith('eventType')) {
                    bpmnShape.event.event = itemText;
                }
                else if (item.id.startsWith('triggerType')) {
                    bpmnShape.event.trigger = itemText;
                }
                else if (item.id.startsWith('taskType')) {
                    bpmnShape.activity.subProcess = {};
                }
            }
        }
    };
    return CustomContextMenuItems;
}());
export { CustomContextMenuItems };
//# sourceMappingURL=customcontextmenuitems.js.map