import { Node, Connector, ShapeAnnotation, PathAnnotation } from '@syncfusion/ej2-diagrams';
import { MindMapUtilityMethods } from './mindmap';
import { OrgChartUtilityMethods } from './orgchart';
var DiagramClientSideEvents = (function () {
    function DiagramClientSideEvents(selectedItem, page) {
        this.selectedItem = selectedItem;
        this.page = page;
    }
    DiagramClientSideEvents.prototype.selectionChange = function (args) {
        var diagram = this.selectedItem.selectedDiagram;
        if (this.selectedItem.preventSelectionChange || this.selectedItem.isLoading) {
            return;
        }
        if (args.state === 'Changed') {
            if (this.selectedItem.diagramType === 'MindMap') {
                if (args.newValue.length === 1) {
                    var node = args.newValue[0];
                    diagram.selectedItems.userHandles[0].visible = false;
                    diagram.selectedItems.userHandles[1].visible = false;
                    diagram.selectedItems.userHandles[2].visible = false;
                    if (node.id !== 'textNode' && !(node instanceof Connector)) {
                        var addInfo = node.addInfo;
                        if (node.id === 'rootNode') {
                            diagram.selectedItems.userHandles[0].visible = true;
                            diagram.selectedItems.userHandles[1].visible = true;
                        }
                        else if (addInfo.orientation.toString() === 'Left') {
                            diagram.selectedItems.userHandles[0].visible = true;
                            diagram.selectedItems.userHandles[2].visible = true;
                            diagram.selectedItems.userHandles[2].side = 'Left';
                        }
                        else {
                            diagram.selectedItems.userHandles[1].visible = true;
                            diagram.selectedItems.userHandles[2].visible = true;
                            diagram.selectedItems.userHandles[2].side = 'Right';
                        }
                        this.selectedItem.utilityMethods.bindMindMapProperties(node, this.selectedItem);
                    }
                }
            }
            else if (this.selectedItem.diagramType === 'OrgChart') {
                if (args.newValue.length === 1) {
                    var node = args.newValue[0];
                    diagram.selectedItems.userHandles[0].visible = false;
                    diagram.selectedItems.userHandles[1].visible = false;
                    diagram.selectedItems.userHandles[2].visible = false;
                    if (node.id !== 'textNode' && node instanceof Node) {
                        diagram.selectedItems.userHandles[0].visible = true;
                        diagram.selectedItems.userHandles[1].visible = true;
                        diagram.selectedItems.userHandles[2].visible = true;
                    }
                }
            }
            else {
                var selectedItems = this.selectedItem.selectedDiagram.selectedItems.nodes;
                selectedItems = selectedItems.concat(this.selectedItem.selectedDiagram.selectedItems.connectors);
                this.selectedItem.utilityMethods.enableToolbarItems(selectedItems);
                var nodeContainer = document.getElementById('nodePropertyContainer');
                nodeContainer.classList.remove('multiple');
                nodeContainer.classList.remove('connector');
                if (selectedItems.length > 1) {
                    this.multipleSelectionSettings(selectedItems);
                }
                else if (selectedItems.length === 1) {
                    this.singleSelectionSettings(selectedItems[0]);
                }
                else {
                    this.selectedItem.utilityMethods.objectTypeChange('diagram');
                }
            }
        }
    };
    DiagramClientSideEvents.prototype.multipleSelectionSettings = function (selectedItems) {
        this.selectedItem.utilityMethods.objectTypeChange('None');
        var showConnectorPanel = false, showNodePanel = false;
        var showTextPanel = false, showConTextPanel = false;
        var nodeContainer = document.getElementById('nodePropertyContainer');
        for (var i = 0; i < selectedItems.length; i++) {
            var object = selectedItems[i];
            if (object instanceof Node && (!showNodePanel || !showTextPanel)) {
                showNodePanel = true;
                showTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
            else if (object instanceof Connector && (!showConnectorPanel || !showConTextPanel)) {
                showConnectorPanel = true;
                showConTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
        }
        var selectItem1 = this.selectedItem.selectedDiagram.selectedItems;
        if (showNodePanel) {
            nodeContainer.style.display = '';
            nodeContainer.classList.add('multiple');
            if (showConnectorPanel) {
                nodeContainer.classList.add('connector');
            }
            this.selectedItem.utilityMethods.bindNodeProperties(selectItem1.nodes[0], this.selectedItem);
        }
        if (showConnectorPanel && !showNodePanel) {
            document.getElementById('connectorPropertyContainer').style.display = '';
            this.selectedItem.utilityMethods.bindConnectorProperties(selectItem1.connectors[0], this.selectedItem);
        }
        if (showTextPanel || showConTextPanel) {
            document.getElementById('textPropertyContainer').style.display = '';
            if (showTextPanel && showConTextPanel) {
                document.getElementById('textPositionDiv').style.display = 'none';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            }
            else {
                document.getElementById('textPositionDiv').style.display = '';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
                if (showConTextPanel) {
                    this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getConnectorTextPositions();
                }
                else {
                    this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getNodeTextPositions();
                }
                this.ddlTextPosition.dataBind();
            }
        }
    };
    DiagramClientSideEvents.prototype.singleSelectionSettings = function (selectedObject) {
        var object = null;
        if (selectedObject instanceof Node) {
            this.selectedItem.utilityMethods.objectTypeChange('node');
            object = selectedObject;
            this.selectedItem.utilityMethods.bindNodeProperties(object, this.selectedItem);
        }
        else if (selectedObject instanceof Connector) {
            this.selectedItem.utilityMethods.objectTypeChange('connector');
            object = selectedObject;
            this.selectedItem.utilityMethods.bindConnectorProperties(object, this.selectedItem);
        }
        if (object.shape && object.shape.type === 'Text') {
            document.getElementById('textPropertyContainer').style.display = '';
            document.getElementById('toolbarTextAlignmentDiv').style.display = 'none';
            document.getElementById('textPositionDiv').style.display = 'none';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            this.selectedItem.utilityMethods.bindTextProperties(object.style, this.selectedItem);
        }
        else if (object.annotations.length > 0 && object.annotations[0].content) {
            document.getElementById('textPropertyContainer').style.display = '';
            var annotation = null;
            document.getElementById('toolbarTextAlignmentDiv').style.display = '';
            document.getElementById('textPositionDiv').style.display = '';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
            this.selectedItem.utilityMethods.bindTextProperties(object.annotations[0].style, this.selectedItem);
            this.selectedItem.utilityMethods.updateHorVertAlign(object.annotations[0].horizontalAlignment, object.annotations[0].verticalAlignment);
            if (object.annotations[0] instanceof ShapeAnnotation) {
                annotation = object.annotations[0];
                this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getNodeTextPositions();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition = null;
                this.ddlTextPosition.dataBind();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition = this.selectedItem.utilityMethods.getPosition(annotation.offset);
                this.ddlTextPosition.dataBind();
            }
            else if (object.annotations[0] instanceof PathAnnotation) {
                annotation = object.annotations[0];
                this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getConnectorTextPositions();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition = null;
                this.ddlTextPosition.dataBind();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition = annotation.alignment;
                this.ddlTextPosition.dataBind();
            }
        }
    };
    DiagramClientSideEvents.prototype.collectionChange = function (args) {
        if (args.state === 'Changed') {
            this.selectedItem.isModified = true;
        }
    };
    DiagramClientSideEvents.prototype.nodePositionChange = function (args) {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.offsetX = (Math.round(args.newValue.offsetX * 100) / 100);
        this.selectedItem.nodeProperties.offsetY = (Math.round(args.newValue.offsetY * 100) / 100);
        if (args.state === 'Completed') {
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
    };
    DiagramClientSideEvents.prototype.nodeSizeChange = function (args) {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.width = (Math.round(args.newValue.width * 100) / 100);
        this.selectedItem.nodeProperties.height = (Math.round(args.newValue.height * 100) / 100);
        if (args.state === 'Completed') {
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
    };
    DiagramClientSideEvents.prototype.scrollChange = function (args) {
        this.selectedItem.scrollSettings.currentZoom = (args.newValue.CurrentZoom * 100).toFixed() + '%';
    };
    DiagramClientSideEvents.prototype.nodeRotationChange = function (args) {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.rotateAngle = (Math.round(args.newValue.rotateAngle * 100) / 100);
        this.selectedItem.preventPropertyChange = false;
        if (args.state === 'Completed') {
            this.selectedItem.isModified = true;
        }
    };
    DiagramClientSideEvents.prototype.diagramContextMenuClick = function (args) {
        var diagram = this.selectedItem.selectedDiagram;
        this.selectedItem.customContextMenu.updateBpmnShape(diagram, args.item);
        var text = args.item.text;
        if (text === 'Group' || text === 'Un Group' || text === 'Undo' || text === 'Redo' || text === 'Select All') {
            this.selectedItem.isModified = true;
        }
    };
    DiagramClientSideEvents.prototype.diagramContextMenuOpen = function (args) {
        var diagram = this.selectedItem.selectedDiagram;
        args.hiddenItems = args.hiddenItems.concat(this.selectedItem.customContextMenu.getHiddenMenuItems(diagram));
    };
    DiagramClientSideEvents.prototype.dragEnter = function (args) {
        var obj = args.element;
        var ratio = 100 / obj.width;
        obj.width = 100;
        obj.height *= ratio;
    };
    DiagramClientSideEvents.prototype.historyChange = function (args) {
        var diagram = this.selectedItem.selectedDiagram;
        var toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        toolbarContainer.classList.remove('db-undo');
        toolbarContainer.classList.remove('db-redo');
        if (diagram.historyManager.undoStack.length > 0) {
            toolbarContainer.classList.add('db-undo');
        }
        if (diagram.historyManager.redoStack.length > 0) {
            toolbarContainer.classList.add('db-redo');
        }
    };
    return DiagramClientSideEvents;
}());
export { DiagramClientSideEvents };
var DiagramPropertyBinding = (function () {
    function DiagramPropertyBinding(selectedItem, page) {
        this.selectedItem = selectedItem;
        this.page = page;
    }
    DiagramPropertyBinding.prototype.pageBreaksChange = function (args) {
        if (args.event) {
            this.selectedItem.pageSettings.pageBreaks = args.checked;
            this.selectedItem.selectedDiagram.pageSettings.showPageBreaks = args.checked;
        }
    };
    DiagramPropertyBinding.prototype.paperListChange = function (args) {
        if (args.element) {
            var diagram = this.selectedItem.selectedDiagram;
            document.getElementById('pageDimension').style.display = 'none';
            document.getElementById('pageOrientation').style.display = '';
            this.selectedItem.pageSettings.paperSize = args.value;
            var paperSize = this.selectedItem.utilityMethods.getPaperSize(this.selectedItem.pageSettings.paperSize);
            var pageWidth = paperSize.pageWidth;
            var pageHeight = paperSize.pageHeight;
            if (pageWidth && pageHeight) {
                if (this.selectedItem.pageSettings.isPortrait) {
                    if (pageWidth > pageHeight) {
                        var temp = pageWidth;
                        pageWidth = pageHeight;
                        pageHeight = temp;
                    }
                }
                else {
                    if (pageHeight > pageWidth) {
                        var temp = pageHeight;
                        pageHeight = pageWidth;
                        pageWidth = temp;
                    }
                }
                diagram.pageSettings.width = pageWidth;
                diagram.pageSettings.height = pageHeight;
                this.selectedItem.pageSettings.pageWidth = pageWidth;
                this.selectedItem.pageSettings.pageHeight = pageHeight;
                diagram.dataBind();
            }
            else {
                document.getElementById('pageOrientation').style.display = 'none';
                document.getElementById('pageDimension').style.display = '';
            }
        }
    };
    DiagramPropertyBinding.prototype.pageDimensionChange = function (args) {
        if (args.event) {
            var pageWidth = Number(this.selectedItem.pageSettings.pageWidth);
            var pageHeight = Number(this.selectedItem.pageSettings.pageHeight);
            var target = args.event.target;
            if (target.tagName.toLowerCase() === 'span') {
                target = target.parentElement.children[0];
            }
            var diagram = this.selectedItem.selectedDiagram;
            if (target.id === 'pageWidth') {
                pageWidth = Number(target.value);
            }
            else {
                pageHeight = Number(target.value);
            }
            if (pageWidth && pageHeight) {
                if (pageWidth > pageHeight) {
                    this.selectedItem.pageSettings.isPortrait = false;
                    this.selectedItem.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = 'Landscape';
                }
                else {
                    this.selectedItem.pageSettings.isPortrait = true;
                    this.selectedItem.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = 'Portrait';
                }
                this.selectedItem.pageSettings.pageWidth = diagram.pageSettings.width = pageWidth;
                this.selectedItem.pageSettings.pageHeight = diagram.pageSettings.height = pageHeight;
                diagram.dataBind();
            }
        }
    };
    DiagramPropertyBinding.prototype.pageOrientationChange = function (args) {
        if (args.event) {
            var pageWidth = Number(this.selectedItem.pageSettings.pageWidth);
            var pageHeight = Number(this.selectedItem.pageSettings.pageHeight);
            var target = args.event.target;
            var diagram = this.selectedItem.selectedDiagram;
            switch (target.id) {
                case 'pagePortrait':
                    this.selectedItem.pageSettings.isPortrait = true;
                    this.selectedItem.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = 'Portrait';
                    break;
                case 'pageLandscape':
                    this.selectedItem.pageSettings.isPortrait = false;
                    this.selectedItem.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = 'Landscape';
                    break;
            }
            diagram.dataBind();
            this.selectedItem.pageSettings.pageWidth = diagram.pageSettings.width;
            this.selectedItem.pageSettings.pageHeight = diagram.pageSettings.height;
        }
    };
    DiagramPropertyBinding.prototype.pageBackgroundChange1 = function (args) {
        if (args.currentValue) {
            var diagram = this.selectedItem.selectedDiagram;
            diagram.pageSettings.background = {
                color: args.currentValue.rgba
            };
            diagram.dataBind();
        }
    };
    DiagramPropertyBinding.prototype.textPositionChange = function (args) {
        if (args.value !== null) {
            this.textPropertyChange('textPosition', args.value);
        }
    };
    DiagramPropertyBinding.prototype.toolbarTextStyleChange = function (args) {
        this.textPropertyChange(args.item.tooltipText, false);
    };
    DiagramPropertyBinding.prototype.toolbarTextSubAlignChange = function (args) {
        var propertyName = args.item.tooltipText.replace(/[' ']/g, '');
        this.textPropertyChange(propertyName, propertyName);
    };
    DiagramPropertyBinding.prototype.toolbarTextAlignChange = function (args) {
        var propertyName = args.item.tooltipText.replace('Align ', '');
        this.textPropertyChange(propertyName, propertyName);
    };
    DiagramPropertyBinding.prototype.textPropertyChange = function (propertyName, propertyValue) {
        if (!this.selectedItem.preventPropertyChange) {
            var diagram = this.selectedItem.selectedDiagram;
            var selectedObjects = diagram.selectedItems.nodes;
            selectedObjects = selectedObjects.concat(diagram.selectedItems.connectors);
            propertyName = propertyName.toLowerCase();
            if (selectedObjects.length > 0) {
                for (var i = 0; i < selectedObjects.length; i++) {
                    var node = selectedObjects[i];
                    if (node instanceof Node || node instanceof Connector) {
                        if (node.annotations.length > 0) {
                            for (var j = 0; j < node.annotations.length; j++) {
                                var annotation = null;
                                if (node.annotations[j] instanceof ShapeAnnotation) {
                                    annotation = node.annotations[j];
                                    if (propertyName === 'textposition') {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.offset = this.selectedItem.utilityMethods.getOffset(propertyValue);
                                    }
                                }
                                else if (node.annotations[j] instanceof PathAnnotation) {
                                    annotation = node.annotations[j];
                                    if (propertyName === 'textposition') {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.alignment = this.selectedItem.textProperties.textPosition;
                                    }
                                }
                                if (propertyName === 'left' || propertyName === 'right' || propertyName === 'center') {
                                    annotation.horizontalAlignment = propertyValue;
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else if (propertyName === 'top' || propertyName === 'bottom') {
                                    annotation.verticalAlignment = propertyValue;
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else if (propertyName === 'middle') {
                                    annotation.verticalAlignment = 'Center';
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else {
                                    this.updateTextProperties(propertyName, propertyValue, annotation.style);
                                }
                            }
                        }
                        else if (node.shape && node.shape.type === 'Text') {
                            this.updateTextProperties(propertyName, propertyValue, node.style);
                        }
                    }
                }
                diagram.dataBind();
                this.selectedItem.isModified = true;
            }
        }
    };
    DiagramPropertyBinding.prototype.updateTextProperties = function (propertyName, propertyValue, annotation) {
        switch (propertyName) {
            case 'bold':
                annotation.bold = !annotation.bold;
                this.updateToolbarState('toolbarTextStyle', annotation.bold, 0);
                break;
            case 'italic':
                annotation.italic = !annotation.italic;
                this.updateToolbarState('toolbarTextStyle', annotation.italic, 1);
                break;
            case 'underline':
                this.selectedItem.textProperties.textDecoration = !this.selectedItem.textProperties.textDecoration;
                annotation.textDecoration = annotation.textDecoration === 'None' || !annotation.textDecoration ? 'Underline' : 'None';
                this.updateToolbarState('toolbarTextStyle', this.selectedItem.textProperties.textDecoration, 2);
                break;
            case 'aligntextleft':
            case 'aligntextright':
            case 'aligntextcenter':
                annotation.textAlign = propertyValue.toString().replace('AlignText', '');
                this.selectedItem.utilityMethods.updateTextAlign(annotation.textAlign);
                break;
        }
    };
    DiagramPropertyBinding.prototype.updateToolbarState = function (toolbarName, isSelected, index) {
        var toolbarTextStyle = document.getElementById(toolbarName);
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            var cssClass = toolbarTextStyle.items[index].cssClass;
            toolbarTextStyle.items[index].cssClass = isSelected ? cssClass + ' tb-item-selected' : cssClass.replace(' tb-item-selected', '');
            toolbarTextStyle.dataBind();
        }
    };
    return DiagramPropertyBinding;
}());
export { DiagramPropertyBinding };
var MindMapPropertyBinding = (function () {
    function MindMapPropertyBinding(selectedItem) {
        this.selectedItem = selectedItem;
    }
    MindMapPropertyBinding.prototype.mindmapTextStyleChange = function (args) {
        this.updateMindMapTextStyle(args.item.tooltipText.toLowerCase(), false);
    };
    MindMapPropertyBinding.prototype.updateMindMapTextStyle = function (propertyName, propertyValue) {
        var diagram = this.selectedItem.selectedDiagram;
        if (diagram.nodes.length > 0) {
            for (var i = 0; i < diagram.nodes.length; i++) {
                var node = diagram.nodes[i];
                if (node.addInfo && node.annotations.length > 0) {
                    var annotation = node.annotations[0].style;
                    var addInfo = node.addInfo;
                    var levelType = this.selectedItem.mindmapSettings.levelType;
                    if ('Level' + addInfo.level === levelType || addInfo.level === levelType) {
                        switch (propertyName) {
                            case 'bold':
                                annotation.bold = !annotation.bold;
                                break;
                            case 'italic':
                                annotation.italic = !annotation.italic;
                                break;
                            case 'underline':
                                annotation.textDecoration = annotation.textDecoration === 'None' || !annotation.textDecoration ? 'Underline' : 'None';
                                break;
                        }
                    }
                }
                diagram.dataBind();
                this.selectedItem.isModified = true;
            }
        }
    };
    MindMapPropertyBinding.prototype.mindmapPatternChange = function (args) {
        var target = args.target;
        var diagram = this.selectedItem.selectedDiagram;
        diagram.historyManager.startGroupAction();
        for (var i = 0; i < this.selectedItem.selectedDiagram.nodes.length; i++) {
            var node = this.selectedItem.selectedDiagram.nodes[i];
            if (node.id !== 'textNode') {
                if (target.className === 'mindmap-pattern-style mindmap-pattern1') {
                    if (node.id === 'rootNode') {
                        node.height = 50;
                    }
                    else {
                        node.height = 20;
                    }
                }
                else {
                    node.height = 50;
                }
            }
            this.selectedItem.selectedDiagram.dataBind();
        }
        for (var i = 0; i < this.selectedItem.selectedDiagram.connectors.length; i++) {
            var connector = this.selectedItem.selectedDiagram.connectors[i];
            switch (target.className) {
                case 'mindmap-pattern-style mindmap-pattern1':
                    connector.type = 'Bezier';
                    MindMapUtilityMethods.templateType = 'template1';
                    break;
                case 'mindmap-pattern-style mindmap-pattern2':
                    connector.type = 'Bezier';
                    MindMapUtilityMethods.templateType = 'template4';
                    break;
                case 'mindmap-pattern-style mindmap-pattern3':
                    connector.type = 'Orthogonal';
                    MindMapUtilityMethods.templateType = 'template2';
                    break;
                case 'mindmap-pattern-style mindmap-pattern4':
                    connector.type = 'Straight';
                    MindMapUtilityMethods.templateType = 'template3';
                    break;
            }
            this.selectedItem.selectedDiagram.dataBind();
        }
        diagram.historyManager.endGroupAction();
        this.selectedItem.selectedDiagram.doLayout();
        this.selectedItem.isModified = true;
    };
    return MindMapPropertyBinding;
}());
export { MindMapPropertyBinding };
var OrgChartPropertyBinding = (function () {
    function OrgChartPropertyBinding(selectedItem) {
        this.selectedItem = selectedItem;
    }
    OrgChartPropertyBinding.prototype.orgDropDownChange = function (args) {
        if (args.element) {
            var value = args.value ? args.value.toString() : '';
            if (args.element.id === 'employeeId') {
                this.selectedItem.orgDataSettings.id = value;
            }
            else if (args.element.id === 'superVisorId') {
                this.selectedItem.orgDataSettings.parent = value;
            }
            else if (args.element.id === 'orgNameField') {
                this.selectedItem.orgDataSettings.nameField = value;
            }
            else if (args.element.id === 'orgImageField') {
                this.selectedItem.orgDataSettings.imageField = value;
            }
        }
    };
    OrgChartPropertyBinding.prototype.orgMultiSelectChange = function (args) {
        if (args.element) {
            if (args.element.id === 'orgAdditionalField') {
                this.selectedItem.orgDataSettings.additionalFields = args.value;
            }
            else if (args.element.id === 'orgBindingFields') {
                this.selectedItem.orgDataSettings.bindingFields = args.value;
            }
        }
    };
    OrgChartPropertyBinding.prototype.orgChartSpacingChange = function (args) {
        if (args.event) {
            var target = args.event.target;
            if (target.tagName.toLowerCase() === 'span') {
                target = target.parentElement.children[0];
            }
            if (target.id === 'orgHorizontalSpacing') {
                this.selectedItem.selectedDiagram.layout.horizontalSpacing = args.value;
            }
            else {
                this.selectedItem.selectedDiagram.layout.verticalSpacing = args.value;
            }
        }
    };
    OrgChartPropertyBinding.prototype.orgChartAligmentChange = function (args) {
        var diagram = this.selectedItem.selectedDiagram;
        var commandType = args.item.tooltipText.replace(/[' ']/g, '').toLowerCase();
        switch (commandType) {
            case 'alignleft':
                diagram.layout.horizontalAlignment = 'Left';
                break;
            case 'alignright':
                diagram.layout.horizontalAlignment = 'Right';
                break;
            case 'aligncenter':
                diagram.layout.horizontalAlignment = 'Center';
                break;
            case 'aligntop':
                diagram.layout.verticalAlignment = 'Top';
                break;
            case 'alignmiddle':
                diagram.layout.verticalAlignment = 'Center';
                break;
            case 'alignbottom':
                diagram.layout.verticalAlignment = 'Bottom';
                break;
        }
        this.selectedItem.isModified = true;
    };
    OrgChartPropertyBinding.prototype.layoutOrientationChange = function (args) {
        var target = args.target;
        switch (target.className) {
            case 'org-pattern-style org-pattern-1 vertical-alternate':
                OrgChartUtilityMethods.subTreeAlignments = 'Alternate';
                OrgChartUtilityMethods.subTreeOrientation = 'Vertical';
                break;
            case 'org-pattern-style org-pattern-2 vertical-left':
                OrgChartUtilityMethods.subTreeAlignments = 'Left';
                OrgChartUtilityMethods.subTreeOrientation = 'Vertical';
                break;
            case 'org-pattern-style org-pattern-3 vertical-right':
                OrgChartUtilityMethods.subTreeAlignments = 'Right';
                OrgChartUtilityMethods.subTreeOrientation = 'Vertical';
                break;
            case 'org-pattern-style org-pattern-4 horizontal-center':
                OrgChartUtilityMethods.subTreeAlignments = 'Center';
                OrgChartUtilityMethods.subTreeOrientation = 'Horizontal';
                break;
            case 'org-pattern-style org-pattern-5 horizontal-right':
                OrgChartUtilityMethods.subTreeAlignments = 'Right';
                OrgChartUtilityMethods.subTreeOrientation = 'Horizontal';
                break;
            case 'org-pattern-style org-pattern-6 horizontal-left':
                OrgChartUtilityMethods.subTreeAlignments = 'Left';
                OrgChartUtilityMethods.subTreeOrientation = 'Horizontal';
                break;
        }
        this.selectedItem.selectedDiagram.doLayout();
        this.selectedItem.isModified = true;
    };
    OrgChartPropertyBinding.prototype.layoutPatternChange = function (args) {
        var target = args.target;
        var bindingFields = target.id === 'orgPattern2' || target.id === 'orgPattern4' ? true : false;
        var imageField = target.id === 'orgPattern3' || target.id === 'orgPattern4' ? true : false;
        this.selectedItem.utilityMethods.updateLayout(this.selectedItem, bindingFields, imageField);
    };
    OrgChartPropertyBinding.prototype.getTooltipContent = function (args) {
        if (args.target) {
            if (args.target.classList.contains('db-employee-id')) {
                return 'Defines a unique column from the data source.';
            }
            else if (args.target.classList.contains('db-supervisor-id')) {
                return 'Defines a column that is used to identify the person to whom the employee reports to.';
            }
            else if (args.target.classList.contains('db-nameField-id')) {
                return 'Defines a column that has an employee name, and it appears at the top of the shapes.';
            }
            else if (args.target.classList.contains('db-bindingField-id')) {
                return 'Defines columns that have employees’ contact information, and appear after the employees’ names in the shape.';
            }
            else if (args.target.classList.contains('db-imageField-id')) {
                return 'Defines a column that has the picture of an employee.';
            }
            else if (args.target.classList.contains('db-additionalField-id')) {
                return 'Defines columns that should be displayed through a tooltip.';
            }
        }
        return '';
    };
    return OrgChartPropertyBinding;
}());
export { OrgChartPropertyBinding };
//# sourceMappingURL=events.js.map