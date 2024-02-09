import { Keys, KeyModifiers } from '@syncfusion/ej2-diagrams';
var CommonKeyboardCommands = (function () {
    function CommonKeyboardCommands() {
    }
    CommonKeyboardCommands.newDiagram = function () {
        this.page.addNewPage();
    };
    CommonKeyboardCommands.openDiagram = function () {
        this.openUploadBox(true, '.json');
    };
    CommonKeyboardCommands.saveDiagram = function () {
        this.download(this.page.savePage(), document.getElementById('diagramName').innerHTML);
    };
    CommonKeyboardCommands.zoomIn = function () {
        var diagram = this.selectedItem.selectedDiagram;
        diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
    };
    CommonKeyboardCommands.zoomOut = function () {
        var diagram = this.selectedItem.selectedDiagram;
        diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
    };
    CommonKeyboardCommands.download = function (data, filename) {
        var dataStr = data;
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([dataStr], { type: ' ,' });
            window.navigator.msSaveOrOpenBlob(blob, filename + '.json');
        }
        else {
            dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(dataStr);
            var a = document.createElement('a');
            a.href = dataStr;
            a.download = filename + '.json';
            document.body.appendChild(a);
            a.click();
        }
    };
    CommonKeyboardCommands.openUploadBox = function (isOpen, extensionType) {
        var defaultUpload = document.getElementById('defaultfileupload');
        defaultUpload = defaultUpload.ej2_instances[0];
        defaultUpload.clearAll();
        this.selectedItem.orgDataSettings.extensionType = defaultUpload.allowedExtensions = extensionType;
        defaultUpload.dataBind();
        this.isOpen = isOpen;
        document.getElementsByClassName('e-file-select-wrap')[0].children[0].click();
    };
    CommonKeyboardCommands.addCommonCommands = function (commands) {
        commands.push({
            gesture: { key: Keys.N, keyModifiers: KeyModifiers.Shift }, canExecute: this.canExecute,
            execute: this.newDiagram.bind(this), name: 'New'
        });
        commands.push({
            gesture: { key: Keys.O, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
            execute: this.openDiagram.bind(this), name: 'Open'
        });
        commands.push({
            gesture: { key: Keys.S, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
            execute: this.saveDiagram.bind(this), name: 'Save'
        });
        commands.push({
            gesture: { key: Keys.Plus, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
            execute: this.zoomIn.bind(this), name: 'ZoomIn'
        });
        commands.push({
            gesture: { key: Keys.Minus, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
            execute: this.zoomOut.bind(this), name: 'ZoomOut'
        });
        return commands;
    };
    CommonKeyboardCommands.canExecute = function () {
        return true;
    };
    CommonKeyboardCommands.cloneSelectedItems = function () {
        var diagram = this.selectedItem.selectedDiagram;
        var selectedItems1 = diagram.selectedItems.nodes;
        selectedItems1 = selectedItems1.concat(diagram.selectedItems.connectors);
        return selectedItems1;
    };
    CommonKeyboardCommands.duplicateSelectedItems = function () {
        this.selectedItem.selectedDiagram.paste(this.cloneSelectedItems());
    };
    return CommonKeyboardCommands;
}());
export { CommonKeyboardCommands };
//# sourceMappingURL=commoncommands.js.map