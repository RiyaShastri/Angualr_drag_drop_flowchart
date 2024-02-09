import { Button } from '@syncfusion/ej2-buttons';
var DiagramBuilderLayer = (function () {
    function DiagramBuilderLayer(selectedItem, layerDialog) {
        this.isEditing = false;
        this.layerCount1 = 0;
        this.selectedItem = selectedItem;
        this.layerDialog = layerDialog;
    }
    DiagramBuilderLayer.prototype.getLayers = function () {
        return this.selectedItem.selectedDiagram.layers.sort(function (a, b) {
            return a.zIndex - b.zIndex;
        });
    };
    DiagramBuilderLayer.prototype.getLayerDialogContent = function () {
        var layerDialogContent = document.createElement('div');
        var layers = this.getLayers();
        if (layers.length > 0) {
            var orderType = 'None';
            for (var i = layers.length - 1; i >= 0; i--) {
                if (layers.length > 1) {
                    if (i === layers.length - 1) {
                        orderType = 'Backward';
                    }
                    else if (i === 0) {
                        orderType = 'Forward';
                    }
                    else {
                        orderType = 'Both';
                    }
                }
                layerDialogContent.appendChild(this.cloneLayerTemplate(layers[i], orderType, i));
            }
            if (layers.length === 1) {
                this.removeLayer.disabled = true;
            }
            else {
                this.removeLayer.disabled = false;
            }
        }
        this.layerDialog.content = layerDialogContent.outerHTML;
        this.triggerEvents();
    };
    DiagramBuilderLayer.prototype.cloneLayerTemplate = function (layer, orderType, index) {
        var layerTemplate = document.getElementsByClassName('db-layer-template')[0].cloneNode(true);
        layerTemplate.style.display = '';
        if (this.getActiveLayer(layer)) {
            layerTemplate.className = 'db-layer-template active';
        }
        var layerNameElement = layerTemplate.getElementsByClassName('db-layer-name')[0];
        layerNameElement.innerHTML = layer.addInfo.name;
        layerNameElement.className = 'db-layer-name ' + layer.id;
        layerNameElement.parentNode.style.width = 'calc(100% - ' + 88 + 'px)';
        return layerTemplate;
    };
    DiagramBuilderLayer.prototype.triggerEvents = function () {
        var visibleElements = document.getElementsByClassName('db-layer-visible');
        var lockElements = document.getElementsByClassName('db-layer-lock');
        var layers = this.getLayers();
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var visibleLayer = new Button({
                iconCss: layer.visible ? 'sf-icon-View' : 'sf-icon-Invisible',
                cssClass: layer.id
            });
            var visibleElement = visibleElements[layers.length - i];
            visibleLayer.appendTo(visibleElement);
            visibleElement.onclick = this.changeLayerVisibility.bind(this);
            if (!layer.visible) {
                visibleElement.parentElement.className = 'db-layer-content-btn db-layer-invisible';
            }
            var lockElement = lockElements[layers.length - i];
            var lockLayer = new Button({
                iconCss: layer.lock ? 'sf-icon-Lock' : 'sf-icon-Unlock',
                cssClass: layer.id,
            });
            lockLayer.appendTo(lockElement);
            lockElement.onclick = this.changeLayerSelection.bind(this);
        }
        var layerNameElements = document.getElementsByClassName('db-layer-name');
        for (var i = 0; i < layerNameElements.length; i++) {
            var layerNameElement = layerNameElements[i];
            layerNameElement.parentElement.onclick = this.setActiveLayer.bind(this);
            layerNameElement.parentElement.ondblclick = this.btnRenameLayer.bind(this);
            layerNameElement.parentElement.children[1].addEventListener('focusout', this.renameLayer.bind(this));
            layerNameElement.parentElement.children[1].addEventListener('keydown', this.renameLayerKeyDown.bind(this));
        }
    };
    DiagramBuilderLayer.prototype.renameLayerKeyDown = function (args) {
        if (args.which === 13) {
            this.renameLayer(args);
        }
    };
    DiagramBuilderLayer.prototype.getLayerBottomPanel = function () {
        var bottomPanel = '<div class="db-layer-bottom-panel">' +
            '<div class="row" style="margin-top: 6px;">' +
            '<div class="col-xs-2">' +
            '<button id="btnAdd" style="right:16px;position:absolute"></button>' +
            '</div>' +
            '<div class="col-xs-2">' +
            '<button id="btnDuplicate" style="right:14px;position:absolute"></button>' +
            '</div>' +
            '<div class="col-xs-2">' +
            '<button id="btnRemove" style="right:12px;position:absolute"></button>' +
            '</div>' +
            '<div class="col-xs-2">' +
            '<button id="btnCloseLayer" style="right:10px;position:absolute"></button>' +
            '</div>' +
            '</div>' +
            '</div>';
        return bottomPanel;
    };
    DiagramBuilderLayer.prototype.initLayerBottomPanel = function () {
        this.removeLayer = new Button({ iconCss: 'sf-icon-Delete' });
        this.removeLayer.appendTo('#btnRemove');
        document.getElementById('btnRemove').onclick = this.btnRemoveLayer.bind(this);
        var duplicateLayer = new Button({ iconCss: 'sf-icon-Copy' });
        duplicateLayer.appendTo('#btnDuplicate');
        document.getElementById('btnDuplicate').onclick = this.btnDuplicateLayer.bind(this);
        var addLayer = new Button({ iconCss: 'sf-icon-Plus' });
        addLayer.appendTo('#btnAdd');
        document.getElementById('btnAdd').onclick = this.btnAddLayer.bind(this);
        var closeLayer = new Button({ iconCss: 'sf-icon-Close' });
        closeLayer.appendTo('#btnCloseLayer');
        document.getElementById('btnCloseLayer').onclick = this.btnCloseDialog.bind(this);
    };
    DiagramBuilderLayer.prototype.changeLayerSelection = function (args) {
        var element = args.target;
        var layerName = element.className.replace('db-layer-lock e-control e-btn ', '').replace(' e-icon-btn', '').replace(' e-ripple', '');
        var layer = this.findLayer(layerName);
        layer.lock = !layer.lock;
        element.ej2_instances[0].iconCss = layer.lock ? 'sf-icon-Lock' : 'sf-icon-Unlock';
        this.selectedItem.selectedDiagram.dataBind();
    };
    DiagramBuilderLayer.prototype.changeLayerVisibility = function (args) {
        var element = args.target;
        var layerName = element.className.replace('db-layer-visible e-control e-btn ', '').replace(' e-icon-btn', '').replace(' e-ripple', '');
        var layer = this.findLayer(layerName);
        layer.visible = !layer.visible;
        element.ej2_instances[0].iconCss = layer.visible ? 'sf-icon-View' : 'sf-icon-Invisible';
        element.parentElement.className = layer.visible ? 'db-layer-content-btn' : 'db-layer-content-btn db-layer-invisible';
        this.selectedItem.selectedDiagram.dataBind();
    };
    DiagramBuilderLayer.prototype.changeLayerZorder = function (args) {
        var element = args.target;
        var layerName = element.className.replace('db-layer-order-second e-control e-btn ', '').replace(' e-icon-btn', '').replace(' e-ripple', '');
        layerName = layerName.replace('db-layer-order-first e-control e-btn ', '').replace(' e-ripple', '');
        if (element.innerText.toLowerCase() === 'forward') {
            this.selectedItem.selectedDiagram.bringLayerForward(layerName);
        }
        else {
            this.selectedItem.selectedDiagram.sendLayerBackward(layerName);
        }
        this.getLayerDialogContent();
    };
    DiagramBuilderLayer.prototype.setActiveLayer = function (args) {
        if (!this.isEditing) {
            var target = args.target;
            this.selectedItem.selectedDiagram.setActiveLayer(target.children[0].className.replace('db-layer-name ', ''));
            var elements = document.getElementsByClassName('db-layer-template active');
            if (elements.length > 0) {
                elements[0].className = 'db-layer-template';
            }
            target.parentElement.parentElement.className = 'db-layer-template active';
        }
    };
    DiagramBuilderLayer.prototype.btnRenameLayer = function (args) {
        if (!this.isEditing) {
            var target = args.target;
            target.classList.add('db-layer-editing');
            var inputElement = target.children[1];
            inputElement.focus();
            inputElement.value = target.children[0].innerHTML;
            this.isEditing = true;
        }
    };
    DiagramBuilderLayer.prototype.renameLayer = function (args) {
        var target = args.target;
        var addInfo = this.selectedItem.selectedDiagram.activeLayer.addInfo;
        target.parentElement.children[0].innerHTML = addInfo.name = target.value;
        target.parentElement.classList.remove('db-layer-editing');
        this.isEditing = false;
    };
    DiagramBuilderLayer.prototype.btnRemoveLayer = function (args) {
        var activeLayerIndex = this.getLayers().indexOf(this.selectedItem.selectedDiagram.activeLayer);
        this.selectedItem.selectedDiagram.removeLayer(this.selectedItem.selectedDiagram.activeLayer.id);
        if (activeLayerIndex - 1 < 0) {
            this.selectedItem.selectedDiagram.setActiveLayer(this.getLayers()[0].id);
        }
        else {
            this.selectedItem.selectedDiagram.setActiveLayer(this.getLayers()[activeLayerIndex - 1].id);
        }
        this.getLayerDialogContent();
    };
    DiagramBuilderLayer.prototype.btnCloseDialog = function () {
        this.layerDialog.hide();
        var btnWindow = document.getElementById('btnWindowMenu');
        btnWindow.ej2_instances[0].items[3].iconCss = '';
    };
    DiagramBuilderLayer.prototype.btnDuplicateLayer = function () {
        var name = this.selectedItem.selectedDiagram.activeLayer.addInfo.name;
        this.selectedItem.selectedDiagram.cloneLayer(this.selectedItem.selectedDiagram.activeLayer.id);
        this.selectedItem.selectedDiagram.layers[this.selectedItem.selectedDiagram.layers.length - 1].addInfo = {
            'name': name + ' Copy'
        };
        this.getLayerDialogContent();
    };
    DiagramBuilderLayer.prototype.btnAddLayer = function () {
        var layer = {
            id: 'Untitled_Layer' + this.layerCount1,
            addInfo: {
                'name': 'Untitled_Layer' + this.layerCount1
            }
        };
        this.selectedItem.selectedDiagram.addLayer(layer);
        this.getLayerDialogContent();
        this.layerCount1++;
    };
    DiagramBuilderLayer.prototype.getActiveLayer = function (layer) {
        if (layer.id === this.selectedItem.selectedDiagram.activeLayer.id) {
            return layer;
        }
        return null;
    };
    DiagramBuilderLayer.prototype.findLayer = function (layerName) {
        var layers = this.getLayers();
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].id === layerName) {
                return layers[i];
            }
        }
        return null;
    };
    return DiagramBuilderLayer;
}());
export { DiagramBuilderLayer };
//# sourceMappingURL=layers.js.map