import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { formatUnit, createElement, closest } from '@syncfusion/ej2-base';
import { Diagram, NodeConstraints, ConnectorConstraints, DiagramTools, SnapConstraints, UndoRedo, DiagramContextMenu, Snapping, BpmnDiagrams, HierarchicalTree, PrintAndExport, MindMap as MindMapTree, DataBinding, Overview, ConnectorBridging, LayoutAnimation, SymbolPalette, Keys, KeyModifiers, SelectorConstraints } from '@syncfusion/ej2-diagrams';
import { PageCreation } from '../scripts/pages';
import { SelectorViewModel } from '../scripts/selector';
import { generatePalette } from '../scripts/palettes';
import { CustomDiagram } from '../scripts/userhandles';
import { OrgChartUtilityMethods } from '../scripts/orgchart';
import { CustomProperties } from '../scripts/customproperties';
import { DiagramBuilderLayer } from '../scripts/layers';
import { DropDownDataSources } from '../scripts/dropdowndatasource';
import { DownloadExampleFiles } from '../scripts/downloaddata';
import { DiagramTheme } from '../scripts/themes';
import { CommonKeyboardCommands } from '../scripts/commoncommands';
import { DiagramClientSideEvents, DiagramPropertyBinding, MindMapPropertyBinding, OrgChartPropertyBinding } from '../scripts/events';
Diagram.Inject(UndoRedo, DiagramContextMenu, Snapping, DataBinding);
Diagram.Inject(PrintAndExport, BpmnDiagrams, HierarchicalTree, MindMapTree, ConnectorBridging, LayoutAnimation);
SymbolPalette.Inject(BpmnDiagrams);
var HomeComponent = (function () {
    function HomeComponent(ApiService) {
        this.ApiService = ApiService;
        this.post = [];
        this.animationSettings = { effect: 'None' };
        this.dropdownListFields = { text: 'text', value: 'value' };
        this.dialogAnimationSettings = { effect: 'None' };
        this.dlgTarget = document.body;
        this.exportingButtons = this.getDialogButtons('export');
        this.printingButtons = this.getDialogButtons('print');
        this.saveButtons = this.getDialogButtons('save');
        this.tooltipButtons = this.getDialogButtons('tooltip');
        this.hyperlinkButtons = this.getDialogButtons('hyperlink');
        this.deleteConfirmationButtons = this.getDialogButtons('deleteconfirmation');
        this.uploadButtons = this.getUploadButtons();
        this.dialogPosition = { X: 100, Y: 100 };
        this.dialogVisibility = false;
        this.isModalDialog = false;
        this.themesdialogPosition = { X: 'right', Y: 112 };
        this.tooltipPosition = 'RightCenter';
        this.path = {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        };
        this.dropDownDataSources = new DropDownDataSources();
        this.selectedItem = new SelectorViewModel();
        this.page = new PageCreation(this.selectedItem);
        this.customProperty = new CustomProperties(this.selectedItem, this.customPropertyDialog);
        this.diagramLayer = new DiagramBuilderLayer(this.selectedItem, this.layerDialog);
        this.diagramEvents = new DiagramClientSideEvents(this.selectedItem, this.page);
        this.diagramPropertyBinding = new DiagramPropertyBinding(this.selectedItem, this.page);
        this.mindmapPropertyBinding = new MindMapPropertyBinding(this.selectedItem);
        this.orgChartPropertyBinding = new OrgChartPropertyBinding(this.selectedItem);
        this.diagramThemes = new DiagramTheme(this.selectedItem);
        this.layerFooterTemplate = this.diagramLayer.getLayerBottomPanel();
        this.initLayerPanel = false;
        this.pasteData = false;
        this.registerBrowseEvent = false;
        this.handle = [
            {
                name: 'cloneHandle', pathColor: 'white', backgroundColor: 'black',
                pathData: 'M 41.44 44.46 L 41.44 85.14 L 85.37 85.14 L 85.37 44.46 z M 26.82 25.63 L 100 25.63 L 100 100 L 26.82 100 z' +
                    'M 0 0 L 65.85 0 L 65.85 12.75 L 12.54 12.75 L 12.54 73.33 L 0 73.33 L 0 12.75 L 0 6.39 z',
                side: 'Left', offset: 1, horizontalAlignment: 'Center', verticalAlignment: 'Center'
            },
            {
                name: 'linkHandle', pathColor: 'white', backgroundColor: 'black',
                pathData: 'M 61.24 100 L 61.24 61.92 L 0 61.92 L 0 32.92 L 61.24 32.92 L 61.24 0 L 100 49.99 z',
                visible: true, offset: 1, side: 'Right', horizontalAlignment: 'Center', verticalAlignment: 'Center'
            },
        ];
    }
    HomeComponent.prototype.ngAfterViewInit = function () {
        generatePalette();
        this.generateDiagram();
        this.page.addNewPage();
        this.diagramEvents.ddlTextPosition = this.ddlTextPosition;
        this.customProperty.customPropertyDialog = this.customPropertyDialog;
        this.diagramLayer.layerDialog = this.layerDialog;
        this.downloadFile = new DownloadExampleFiles(this.selectedItem);
        this.selectedItem.utilityMethods.page = this.page;
        this.selectedItem.utilityMethods.tempDialog = this.openTemplateDialog;
        this.selectedItem.utilityMethods.toolbarEditor = this.toolbarEditor;
        OrgChartUtilityMethods.uploadDialog = this.fileUploadDialog;
        OrgChartUtilityMethods.customPropertyDialog = this.customPropertyDialog;
        CommonKeyboardCommands.selectedItem = this.selectedItem;
        CommonKeyboardCommands.page = this.page;
        document.getElementById('btnHideToolbar').onclick = this.hideMenuBar.bind(this);
        document.getElementById('diagramContainerDiv').onmouseleave = this.diagramThemes.setNodeOldStyles.bind(this.diagramThemes);
        document.onmouseover = this.menumouseover.bind(this);
        var context = this;
        setTimeout(function () { context.loadPage(); }, 2000);
        window.onbeforeunload = this.closeWindow.bind(this);
    };
    HomeComponent.prototype.closeWindow = function (evt) {
        var message = 'Are you sure you want to close?';
        if (evt && this.selectedItem.isModified) {
            evt.returnValue = message;
            return evt;
        }
        return null;
    };
    HomeComponent.prototype.themeDialogCreated = function (args) {
        var themeDialogContent = document.getElementById('themeDialogContent');
        themeDialogContent.onmouseover = this.diagramThemes.themeMouseOver.bind(this.diagramThemes);
        themeDialogContent.onclick = this.diagramThemes.themeClick.bind(this.diagramThemes);
        themeDialogContent.onmouseleave = this.diagramThemes.applyOldStyle.bind(this.diagramThemes);
    };
    HomeComponent.prototype.tooltipCreated = function (args) {
        this.tooltip.target = '.db-info-style';
    };
    HomeComponent.prototype.renameDiagram = function (args) {
        document.getElementsByClassName('db-diagram-name-container')[0].classList.add('db-edit-name');
        var element = document.getElementById('diagramEditable');
        element.value = document.getElementById('diagramName').innerHTML;
        element.focus();
    };
    HomeComponent.prototype.diagramNameChange = function (args) {
        document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
        document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    };
    HomeComponent.prototype.diagramNameKeyDown = function (args) {
        if (args.which === 13) {
            document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
            document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
        }
    };
    HomeComponent.prototype.loadPage = function () {
        document.getElementsByClassName('diagrambuilder-container')[0].style.display = '';
        this.selectedItem.selectedDiagram.updateViewPort();
        this.overview = new Overview({ width: '255px', height: '200px', sourceID: 'diagram' });
        this.overview.appendTo('#overview');
        document.getElementById('overviewspan').onclick = this.overviewSpanClick.bind(this);
        document.getElementsByClassName('sidebar')[0].className = 'sidebar';
        document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
        this.openTemplateDialog.show();
        this.selectedItem.utilityMethods.getDefaultDiagramTemplates1(this.selectedItem);
    };
    HomeComponent.prototype.overviewSpanClick = function (args) {
        var target = args.target;
        var element = document.getElementsByClassName('sidebar')[0];
        if (element.classList.contains('show-overview')) {
            element.classList.remove('show-overview');
            target.className = 'db-overview';
        }
        else {
            element.classList.add('show-overview');
            target.className = 'db-overview active';
            this.overview.refresh();
        }
    };
    HomeComponent.prototype.menumouseover = function (args) {
        var target = args.target;
        if (target && (target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu' ||
            target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active')) {
            if (this.buttonInstance && this.buttonInstance.id !== target.id) {
                if (this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                    this.buttonInstance.toggle();
                    var buttonElement = document.getElementById(this.buttonInstance.element.id);
                    buttonElement.classList.remove('e-btn-hover');
                }
            }
            var button1 = target.ej2_instances[0];
            this.buttonInstance = button1;
            if (button1.getPopUpElement().classList.contains('e-popup-close')) {
                button1.toggle();
                if (button1.element.id === 'btnArrangeMenu') {
                    this.selectedItem.utilityMethods.enableArrangeMenuItems(this.selectedItem);
                }
                var buttonElement = document.getElementById(this.buttonInstance.element.id);
                buttonElement.classList.add('e-btn-hover');
            }
        }
        else {
            if (closest(target, '.e-dropdown-popup') === null && closest(target, '.e-dropdown-btn') === null) {
                if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                    this.buttonInstance.toggle();
                    var buttonElement = document.getElementById(this.buttonInstance.element.id);
                    buttonElement.classList.remove('e-btn-hover');
                }
            }
        }
    };
    HomeComponent.prototype.hideMenuBar = function () {
        var expandcollapseicon = document.getElementById('btnHideToolbar');
        var button1 = expandcollapseicon.ej2_instances[0];
        if (button1.iconCss.indexOf('sf-icon-Collapse tb-icons') > -1) {
            button1.iconCss = 'sf-icon-DownArrow2 tb-icons';
        }
        else {
            button1.iconCss = 'sf-icon-Collapse tb-icons';
        }
        this.selectedItem.utilityMethods.hideElements('hide-menubar', this.selectedItem.selectedDiagram);
        this.selectedItem.selectedDiagram.refresh();
    };
    HomeComponent.prototype.arrangeContextMenuBeforeOpen = function (args) {
        this.selectedItem.utilityMethods.enableArrangeMenuItems(this.selectedItem);
    };
    HomeComponent.prototype.arrangeMenuBeforeOpen = function (args) {
        args.element.children[0].style.display = 'block';
        if (args.event && closest(args.event.target, '.e-dropdown-btn') !== null) {
            args.cancel = true;
        }
    };
    HomeComponent.prototype.arrangeMenuBeforeClose = function (args) {
        if (args.event && closest(args.event.target, '.e-dropdown-btn') !== null) {
            args.cancel = true;
        }
        if (!args.element) {
            args.cancel = true;
        }
    };
    HomeComponent.prototype.arrangeContextMenuOpen = function (args) {
        if (args.element.classList.contains('e-menu-parent')) {
            var popup = document.querySelector('#btnArrangeMenu-popup');
            args.element.style.left = formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
            args.element.style.top = formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
        }
    };
    HomeComponent.prototype.getUploadButtons = function () {
        var buttons = [];
        buttons.push({
            click: this.btnCancelClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true }
        });
        buttons.push({
            click: this.btnUploadNext.bind(this), buttonModel: { content: 'Next', cssClass: 'e-flat e-db-primary', isPrimary: true },
        });
        return buttons;
    };
    HomeComponent.prototype.getDialogButtons = function (dialogType) {
        var buttons = [];
        switch (dialogType) {
            case 'export':
                buttons.push({
                    click: this.btnExportClick.bind(this), buttonModel: { content: 'Export', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'print':
                buttons.push({
                    click: this.btnPrintClick.bind(this), buttonModel: { content: 'Print', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'save':
                buttons.push({
                    click: this.btnSave.bind(this), buttonModel: { content: 'Drive', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'tooltip':
                buttons.push({
                    click: this.btnTooltip.bind(this), buttonModel: { content: 'Apply', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'hyperlink':
                buttons.push({
                    click: this.btnHyperLink.bind(this), buttonModel: { content: 'Apply', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'deleteconfirmation':
                buttons.push({
                    click: this.btnDeleteConfirmation.bind(this), buttonModel: { content: 'Ok', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
        }
        buttons.push({
            click: this.btnCancelClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true },
        });
        return buttons;
    };
    HomeComponent.prototype.btnDeleteConfirmation = function (args) {
        this.customProperty.removeProperty(args);
    };
    HomeComponent.prototype.btnUploadNext = function (args) {
        var target = args.target;
        var buttonInstance = target.ej2_instances[0];
        var uploadDialogContent = document.getElementById('uploadDialogContent');
        if (OrgChartUtilityMethods.isUploadSuccess) {
            if (uploadDialogContent.className === 'db-upload-content firstPage') {
                if (OrgChartUtilityMethods.fileType === 'xml') {
                    this.fileUploadDialog.header = ' Define Employee Information';
                    uploadDialogContent.className = 'db-upload-content thirdPage';
                    buttonInstance.content = 'Finish';
                }
                else {
                    this.fileUploadDialog.header = ' Define Employee - Supervisor Relationship';
                    uploadDialogContent.className = 'db-upload-content secondPage';
                }
            }
            else if (uploadDialogContent.className === 'db-upload-content secondPage') {
                var id = this.selectedItem.orgDataSettings.id;
                var parent_1 = this.selectedItem.orgDataSettings.parent;
                if (id && parent_1) {
                    if (!OrgChartUtilityMethods.validateParentChildRelation()) {
                        alert('We haven"t found the parent child relationship between the chosen fields');
                    }
                    else {
                        this.fileUploadDialog.header = ' Define Employee Information';
                        uploadDialogContent.className = 'db-upload-content thirdPage';
                        buttonInstance.content = 'Finish';
                    }
                }
                else {
                    alert('EmployeeId and SupervisorId can"t be empty');
                }
            }
            else {
                var nameField = this.selectedItem.orgDataSettings.nameField;
                if (nameField) {
                    uploadDialogContent.className = 'db-upload-content firstPage';
                    buttonInstance.content = 'Next';
                    OrgChartUtilityMethods.applyDataSource();
                    this.defaultupload.clearAll();
                }
                else {
                    alert('Name field can"t be empty');
                }
            }
        }
    };
    HomeComponent.prototype.btnCancelClick = function (args) {
        var ss = args.target;
        var key = ss.offsetParent.id;
        switch (key) {
            case 'exportDialog':
                this.exportDialog.hide();
                break;
            case 'printDialog':
                this.printDialog.hide();
                break;
            case 'saveDialog':
                this.saveDialog.hide();
                break;
            case 'customPropertyDialog':
                this.customPropertyDialog.hide();
                break;
            case 'tooltipDialog':
                this.tooltipDialog.hide();
                break;
            case 'hyperlinkDialog':
                this.hyperlinkDialog.hide();
                break;
            case 'deleteConfirmationDialog':
                this.deleteConfirmationDialog.hide();
                break;
            case 'fileUploadDialog':
                this.fileUploadDialog.hide();
                OrgChartUtilityMethods.isUploadSuccess = false;
                break;
        }
    };
    HomeComponent.prototype.btnHyperLink = function () {
        var node = this.selectedItem.selectedDiagram.selectedItems.nodes[0];
        if (node.annotations.length > 0) {
            node.annotations[0].hyperlink.link = document.getElementById('hyperlink').value;
            node.annotations[0].hyperlink.content = document.getElementById('hyperlinkText').value;
            this.selectedItem.selectedDiagram.dataBind();
        }
        else {
            var annotation = {
                hyperlink: {
                    content: document.getElementById('hyperlinkText').value,
                    link: document.getElementById('hyperlink').value
                }
            };
            this.selectedItem.selectedDiagram.addLabels(node, [annotation]);
        }
        this.hyperlinkDialog.hide();
    };
    HomeComponent.prototype.btnTooltip = function () {
        var diagram = this.selectedItem.selectedDiagram;
        if (this.selectedItem.selectedDiagram.selectedItems.nodes.length > 0) {
            var node = this.selectedItem.selectedDiagram.selectedItems.nodes[0];
            this.customProperty.setTooltip(node, document.getElementById('objectTooltip').value);
            this.selectedItem.nodeProperties.tooltip = node.tooltip.content;
            diagram.dataBind();
        }
        this.tooltipDialog.hide();
    };
    HomeComponent.prototype.btnSave = function () {
        this.initClient();
    };
    HomeComponent.prototype.saveDiagramSettings = function () {
        throw new Error("Method not implemented.");
    };
    HomeComponent.prototype.initClient = function () {
        var _this = this;
        var SCOPES = [
            'https://www.googleapis.com/auth/drive'
        ].join(' ');
        return new Promise(function (resolve, reject) {
            gapi.load('client:auth2', function () {
                return gapi.client.init({
                    apiKey: 'AIzaSyDBg6zSDCn6o0XSoiA2nIUyPg6THLzp9T4',
                    clientId: '880562233769-tc1s0ibm4is83r0q8ddihi84vj91nm4b.apps.googleusercontent.com',
                    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                    scope: SCOPES
                }).then(function () {
                    _this.googleAuth = gapi.auth2.getAuthInstance();
                    console.log(_this.googleAuth);
                    setTimeout(function () {
                        _this.signIn();
                    }, 3000);
                    resolve();
                });
            });
        });
    };
    HomeComponent.prototype.getfile = function () {
        var accessToken = gapi.auth.getToken().access_token;
        this.ApiService.getFiles().subscribe(function (Response) {
            console.log(Response);
        });
    };
    HomeComponent.prototype.upload = function () {
        var filename = document.getElementById('saveFileName').value;
        var dataStr = CommonKeyboardCommands.page.savePage();
        var file = new Blob([dataStr], { type: 'application/json' });
        var metadata = {
            name: filename,
            mimeType: 'application/json',
        };
        var accessToken = gapi.auth.getToken().access_token;
        var form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', file);
        var xhr = new XMLHttpRequest();
        xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        xhr.responseType = 'json';
        xhr.onload = function () {
            console.log(xhr.response.id);
        };
        xhr.send(form);
        this.saveDialog.hide();
    };
    Object.defineProperty(HomeComponent.prototype, "isSignedIn", {
        get: function () {
            return this.googleAuth.isSignedIn.get();
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.signIn = function () {
        var _this = this;
        return this.googleAuth.signIn({
            prompt: 'consent'
        }).then(function (googleUser) {
            var data = googleUser.getBasicProfile();
            if (data != null) {
                _this.getfile();
            }
        });
    };
    HomeComponent.prototype.btnImportClick = function (args) {
        if (!this.registerBrowseEvent) {
            this.defaultupload.dropArea = document.getElementById('dropRegion');
            document.getElementById('browseFile').onclick = function () {
                document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
                return false;
            };
            this.registerBrowseEvent = true;
        }
        this.selectedItem.orgDataSettings.extensionType = '.csv';
        CommonKeyboardCommands.isOpen = false;
        this.defaultupload.clearAll();
        var uploadDialogContent = document.getElementById('uploadDialogContent');
        uploadDialogContent.className = 'db-upload-content firstPage';
        OrgChartUtilityMethods.showUploadDialog();
    };
    HomeComponent.prototype.btnExportClick = function () {
        var diagram = this.selectedItem.selectedDiagram;
        diagram.exportDiagram({
            fileName: this.selectedItem.exportSettings.fileName,
            format: this.selectedItem.exportSettings.format,
            region: this.selectedItem.exportSettings.region
        });
        this.exportDialog.hide();
    };
    HomeComponent.prototype.btnPrintClick = function () {
        var pageWidth = this.selectedItem.printSettings.pageWidth;
        var pageHeight = this.selectedItem.printSettings.pageHeight;
        var paperSize = this.selectedItem.utilityMethods.getPaperSize(this.selectedItem.printSettings.paperSize);
        if (paperSize.pageHeight && paperSize.pageWidth) {
            pageWidth = paperSize.pageWidth;
            pageHeight = paperSize.pageHeight;
        }
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
        var diagram = this.selectedItem.selectedDiagram;
        diagram.print({
            region: this.selectedItem.printSettings.region, pageHeight: pageHeight, pageWidth: pageWidth,
            multiplePage: !this.selectedItem.printSettings.multiplePage,
            pageOrientation: this.selectedItem.printSettings.isPortrait ? 'Portrait' : 'Landscape'
        });
        this.printDialog.hide();
    };
    HomeComponent.prototype.drawShapeChange = function (args) {
        var diagram = this.selectedItem.selectedDiagram;
        if (args.item.text === 'Rectangle') {
            diagram.drawingObject = { shape: { type: 'Basic', shape: 'Rectangle' }, style: { strokeWidth: 2 } };
        }
        else if (args.item.text === 'Ellipse') {
            diagram.drawingObject = { shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeWidth: 2 } };
        }
        else if (args.item.text === 'Polygon') {
            diagram.drawingObject = { shape: { type: 'Basic', shape: 'Polygon' }, style: { strokeWidth: 2 } };
        }
        diagram.tool = DiagramTools.ContinuousDraw;
        this.removeSelectedToolbarItem();
        document.getElementById('btnDrawShape').classList.add('tb-item-selected');
    };
    HomeComponent.prototype.drawConnectorChange = function (args) {
        var diagram = this.selectedItem.selectedDiagram;
        if (args.item.text === 'Straight Line') {
            diagram.drawingObject = { type: 'Straight', style: { strokeWidth: 2 } };
        }
        else if (args.item.text === 'Orthogonal Line') {
            diagram.drawingObject = { type: 'Orthogonal', style: { strokeWidth: 2 } };
        }
        else if (args.item.text === 'Bezier') {
            diagram.drawingObject = { type: 'Bezier', style: { strokeWidth: 2 } };
        }
        diagram.tool = DiagramTools.ContinuousDraw;
        diagram.clearSelection();
        this.removeSelectedToolbarItem();
        document.getElementById('btnDrawConnector').classList.add('tb-item-selected');
    };
    HomeComponent.prototype.orderCommandsChange = function (args) {
        var diagram = this.selectedItem.selectedDiagram;
        if (args.item.text === 'Send To Back') {
            this.sendToBack();
        }
        else if (args.item.text === 'Bring To Front') {
            this.bringToFront();
        }
        else if (args.item.text === 'Bring Forward') {
            this.selectedItem.isModified = true;
            diagram.moveForward();
        }
        else if (args.item.text === 'Send Backward') {
            this.selectedItem.isModified = true;
            diagram.sendBackward();
        }
    };
    HomeComponent.prototype.zoomChange = function (args) {
        var diagram = this.selectedItem.selectedDiagram;
        if (args.item.text === 'Custom') {
            var ss = '';
        }
        else if (args.item.text === 'Fit To Screen') {
            this.selectedItem.scrollSettings.currentZoom = 'Fit ...';
            diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
        }
        else {
            var currentZoom = diagram.scrollSettings.currentZoom;
            var zoom = {};
            switch (args.item.text) {
                case '400%':
                    zoom.zoomFactor = (4 / currentZoom) - 1;
                    break;
                case '300%':
                    zoom.zoomFactor = (3 / currentZoom) - 1;
                    break;
                case '200%':
                    zoom.zoomFactor = (2 / currentZoom) - 1;
                    break;
                case '150%':
                    zoom.zoomFactor = (1.5 / currentZoom) - 1;
                    break;
                case '100%':
                    zoom.zoomFactor = (1 / currentZoom) - 1;
                    break;
                case '75%':
                    zoom.zoomFactor = (0.75 / currentZoom) - 1;
                    break;
                case '50%':
                    zoom.zoomFactor = (0.5 / currentZoom) - 1;
                    break;
                case '25%':
                    zoom.zoomFactor = (0.25 / currentZoom) - 1;
                    break;
                case 'custom':
                    break;
            }
            this.selectedItem.scrollSettings.currentZoom = args.item.text;
            diagram.zoomTo(zoom);
        }
    };
    HomeComponent.prototype.beforeItemRender = function (args) {
        var shortCutText = this.getShortCutKey(args.item.text);
        if (shortCutText) {
            var shortCutSpan = createElement('span');
            var text = args.item.text;
            shortCutSpan.textContent = shortCutText;
            shortCutSpan.style.pointerEvents = 'none';
            args.element.appendChild(shortCutSpan);
            shortCutSpan.setAttribute('class', 'db-shortcut');
        }
        var status = this.selectedItem.utilityMethods.enableMenuItems(args.item.text, this.selectedItem);
        if (status) {
            args.element.classList.add('e-disabled');
        }
        else {
            if (args.element.classList.contains('e-disabled')) {
                args.element.classList.remove('e-disabled');
            }
        }
    };
    HomeComponent.prototype.getShortCutKey = function (menuItem) {
        var shortCutKey = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
        switch (menuItem) {
            case 'New':
                shortCutKey = 'Shift' + '+N';
                break;
            case 'Open':
                shortCutKey = shortCutKey + '+O';
                break;
            case 'Save':
                shortCutKey = shortCutKey + '+S';
                break;
            case 'Undo':
                shortCutKey = shortCutKey + '+Z';
                break;
            case 'Redo':
                shortCutKey = shortCutKey + '+Y';
                break;
            case 'Cut':
                shortCutKey = shortCutKey + '+X';
                break;
            case 'Copy':
                shortCutKey = shortCutKey + '+C';
                break;
            case 'Paste':
                shortCutKey = shortCutKey + '+V';
                break;
            case 'Delete':
                shortCutKey = 'Delete';
                break;
            case 'Duplicate':
                shortCutKey = shortCutKey + '+D';
                break;
            case 'Select All':
                shortCutKey = shortCutKey + '+A';
                break;
            case 'Zoom In':
                shortCutKey = shortCutKey + '++';
                break;
            case 'Zoom Out':
                shortCutKey = shortCutKey + '+-';
                break;
            case 'Group':
                shortCutKey = shortCutKey + '+G';
                break;
            case 'Ungroup':
                shortCutKey = shortCutKey + '+U';
                break;
            case 'Send To Back':
                shortCutKey = shortCutKey + '+Shift+B';
                break;
            case 'Bring To Front':
                shortCutKey = shortCutKey + '+Shift+F';
                break;
            default:
                shortCutKey = '';
                break;
        }
        return shortCutKey;
    };
    HomeComponent.prototype.contextMenuClick = function (args) {
        var buttonElement = document.getElementsByClassName('e-btn-hover')[0];
        if (buttonElement) {
            buttonElement.classList.remove('e-btn-hover');
        }
        var diagram = this.selectedItem.selectedDiagram;
        var commandType = '';
        if (args.element.innerText.indexOf('Ctrl') !== -1) {
            commandType = args.element.innerText.substring(0, args.element.innerText.indexOf('Ctrl')).trim();
        }
        else {
            commandType = args.element.innerText.trim();
        }
        commandType = commandType.replace(/[' ']/g, '');
        switch (commandType.toLowerCase()) {
            case 'left':
            case 'right':
            case 'top':
            case 'bottom':
            case 'middle':
            case 'center':
                this.selectedItem.isModified = true;
                diagram.align(args.item.text);
                break;
            case 'horizontally':
                this.distribute('RightToLeft');
                break;
            case 'vertically':
                this.distribute('BottomToTop');
                break;
            case 'width':
                this.selectedItem.isModified = true;
                diagram.sameSize('Width');
                break;
            case 'height':
                this.selectedItem.isModified = true;
                diagram.sameSize('Height');
                break;
            case 'bothwidthandheight':
                this.selectedItem.isModified = true;
                diagram.sameSize('Size');
                break;
            case 'sendtoback':
                this.sendToBack();
                break;
            case 'bringtofront':
                this.bringToFront();
                break;
            case 'bringforward':
                this.selectedItem.isModified = true;
                diagram.moveForward();
                break;
            case 'sendbackward':
                this.selectedItem.isModified = true;
                diagram.sendBackward();
                break;
            case 'lock':
            case 'unlock':
                this.lockObject();
                break;
            case 'group':
                this.group();
                break;
            case 'ungroup':
                this.ungroup();
                break;
        }
    };
    HomeComponent.prototype.menuClick = function (args) {
        var buttonElement = document.getElementsByClassName('e-btn-hover')[0];
        if (buttonElement) {
            buttonElement.classList.remove('e-btn-hover');
        }
        var diagram = this.selectedItem.selectedDiagram;
        var commandType = args.item.text.replace(/[' ']/g, '');
        switch (commandType.toLowerCase()) {
            case 'new':
                CommonKeyboardCommands.newDiagram();
                break;
            case 'open':
                CommonKeyboardCommands.openUploadBox(true, '.json');
                break;
            case 'save':
                this.saveDialog.show();
                break;
            case 'saveas':
                document.getElementById('saveFileName').value = document.getElementById('diagramName').innerHTML;
                this.saveDialog.show();
                break;
            case 'print':
                this.selectedItem.printSettings.pageHeight = this.selectedItem.pageSettings.pageHeight;
                this.selectedItem.printSettings.pageWidth = this.selectedItem.pageSettings.pageWidth;
                this.selectedItem.printSettings.paperSize = this.selectedItem.pageSettings.paperSize;
                this.selectedItem.printSettings.isPortrait = this.selectedItem.pageSettings.isPortrait;
                this.selectedItem.printSettings.isLandscape = !this.selectedItem.pageSettings.isPortrait;
                this.printDialog.show();
                break;
            case 'export':
                this.exportDialog.show();
                break;
            case 'showguides':
                diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.SnapToObject;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            case 'showgrid':
                diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.ShowLines;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                var container = document.getElementsByClassName('db-current-diagram-container')[0];
                if (!args.item.iconCss) {
                    container.classList.add('db-hide-grid');
                }
                else {
                    container.classList.remove('db-hide-grid');
                }
                break;
            case 'snaptogrid':
                diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.SnapToLines;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            case 'fittoscreen':
                diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
                break;
            case 'showrulers':
                this.selectedItem.selectedDiagram.rulerSettings.showRulers = !this.selectedItem.selectedDiagram.rulerSettings.showRulers;
                if (this.selectedItem.selectedDiagram.rulerSettings.showRulers) {
                    this.selectedItem.selectedDiagram.rulerSettings.dynamicGrid = false;
                }
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                container = document.getElementsByClassName('db-current-diagram-container')[0];
                if (!args.item.iconCss) {
                    container.classList.remove('db-show-ruler');
                }
                else {
                    container.classList.add('db-show-ruler');
                }
                break;
            case 'zoomin':
                diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
                this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'zoomout':
                diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
                this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'showtoolbar':
                this.selectedItem.utilityMethods.hideElements('hide-toolbar', this.selectedItem.selectedDiagram);
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            case 'showstencil':
                this.selectedItem.utilityMethods.hideElements('hide-palette', this.selectedItem.selectedDiagram);
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            case 'showproperties':
                this.selectedItem.utilityMethods.hideElements('hide-properties', this.selectedItem.selectedDiagram);
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            case 'showlayers':
                this.showHideLayers();
                break;
            case 'themes':
                this.showHideThemes();
                break;
            case 'showpager':
                this.selectedItem.utilityMethods.hideElements('hide-pager', this.selectedItem.selectedDiagram);
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            default:
                this.executeEditMenu(diagram, commandType);
                break;
        }
        diagram.dataBind();
    };
    HomeComponent.prototype.executeEditMenu = function (diagram, commandType) {
        var key = '';
        switch (commandType.toLowerCase()) {
            case 'undo':
                this.undo();
                if (this.selectedItem.diagramType === 'MindMap' || this.selectedItem.diagramType === 'OrgChart') {
                    diagram.doLayout();
                }
                break;
            case 'redo':
                this.redo();
                break;
            case 'cut':
                this.cutObjects();
                break;
            case 'copy':
                this.copyObjects();
                break;
            case 'paste':
                this.pasteObjects();
                break;
            case 'delete':
                this.delete();
                break;
            case 'duplicate':
                CommonKeyboardCommands.duplicateSelectedItems();
                break;
            case 'selectall':
                this.selectAll();
                break;
            case 'edittooltip':
                this.selectedItem.isModified = true;
                if (diagram.selectedItems.nodes.length > 0) {
                    this.tooltipDialog.show();
                }
                break;
        }
    };
    HomeComponent.prototype.generateDiagram = function () {
        var diagram = new CustomDiagram({
            width: '100%', height: '100%',
            snapSettings: {
                horizontalGridlines: {
                    lineIntervals: [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75],
                    lineColor: '#EEEEEE'
                },
                verticalGridlines: {
                    lineIntervals: [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75],
                    lineColor: '#EEEEEE'
                },
                constraints: (SnapConstraints.All & ~SnapConstraints.SnapToLines)
            },
            pageSettings: {
                background: { color: 'white' }, width: 816, height: 1056, multiplePage: true, margin: { left: 5, top: 5 },
                orientation: 'Landscape'
            },
            scrollSettings: { canAutoScroll: true, scrollLimit: 'Infinity', minZoom: 0.25, maxZoom: 30 },
            selectedItems: { constraints: SelectorConstraints.All & ~SelectorConstraints.ToolTip },
            getNodeDefaults: this.setNodeDefaults,
            getConnectorDefaults: this.setConnectorDefaults,
            commandManager: this.getCommandSettings(),
            backgroundColor: 'transparent',
            selectionChange: this.diagramEvents.selectionChange.bind(this.diagramEvents),
            positionChange: this.diagramEvents.nodePositionChange.bind(this.diagramEvents),
            sizeChange: this.diagramEvents.nodeSizeChange.bind(this.diagramEvents),
            rotateChange: this.diagramEvents.nodeRotationChange.bind(this.diagramEvents),
            collectionChange: this.diagramEvents.collectionChange.bind(this),
            contextMenuOpen: this.diagramEvents.diagramContextMenuOpen.bind(this.diagramEvents),
            contextMenuClick: this.diagramEvents.diagramContextMenuClick.bind(this.diagramEvents),
            dragEnter: this.diagramEvents.dragEnter.bind(this.diagramEvents),
            historyChange: this.diagramEvents.historyChange.bind(this.diagramEvents),
            scrollChange: this.diagramEvents.scrollChange.bind(this.diagramEvents),
            contextMenuSettings: {
                show: true,
                items: this.selectedItem.customContextMenu.items
            },
        });
        diagram.appendTo('#diagram');
        this.selectedItem.selectedDiagram = diagram;
        diagram.selectedItem = this.selectedItem;
        diagram.layers[0].addInfo = { 'name': 'Layer0' };
    };
    HomeComponent.prototype.setNodeDefaults = function (node, diagram) {
        var node1 = {
            style: { strokeWidth: 2 }
        };
        return node1;
    };
    HomeComponent.prototype.setConnectorDefaults = function (connector, diagram) {
        var connector1 = {
            annotations: [
                { content: '', style: { fill: '#ffffff' } }
            ],
            style: { strokeWidth: 2 }
        };
        return connector1;
    };
    HomeComponent.prototype.toolbarInsertClick = function (args) {
        var diagram = this.selectedItem.selectedDiagram;
        var commandType = args.item.tooltipText.replace(/[' ']/g, '');
        if (diagram.selectedItems.nodes.length > 0) {
            switch (commandType.toLowerCase()) {
                case 'insertlink':
                    document.getElementById('hyperlink').value = '';
                    document.getElementById('hyperlinkText').value = '';
                    if (diagram.selectedItems.nodes[0].annotations.length > 0) {
                        var annotation = diagram.selectedItems.nodes[0].annotations[0];
                        if (annotation.hyperlink.link || annotation.content) {
                            document.getElementById('hyperlink').value = annotation.hyperlink.link;
                            document.getElementById('hyperlinkText').value = annotation.hyperlink.content || annotation.content;
                        }
                    }
                    this.hyperlinkDialog.show();
                    break;
                case 'insertimage':
                    CommonKeyboardCommands.openUploadBox(false, '.jpg,.png,.bmp');
                    break;
            }
        }
    };
    HomeComponent.prototype.toolbarEditorClick = function (args) {
        var diagram = this.selectedItem.selectedDiagram;
        var commandType = args.item.tooltipText.replace(/[' ']/g, '').toLowerCase();
        switch (commandType) {
            case 'undo':
                this.undo();
                break;
            case 'redo':
                this.redo();
                break;
            case 'zoomin':
                diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
                this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'zoomout':
                diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
                this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'pantool':
                diagram.tool = DiagramTools.ZoomPan;
                diagram.clearSelection();
                this.selectedItem.utilityMethods.objectTypeChange('diagram');
                break;
            case 'pointer':
                diagram.drawingObject = {};
                diagram.tool = DiagramTools.SingleSelect | DiagramTools.MultipleSelect;
                break;
            case 'texttool':
                diagram.drawingObject = { shape: { type: 'Text' }, style: { strokeColor: 'none', fill: 'none' } };
                diagram.tool = DiagramTools.ContinuousDraw;
                break;
            case 'delete':
                this.delete();
                break;
            case 'lock':
                this.lockObject();
                break;
            case 'fillcolor':
                this.showColorPicker('nodeFillColor', 'tb-item-fill');
                break;
            case 'bordercolor':
                if (this.selectedItem.selectedDiagram.selectedItems.nodes.length > 0) {
                    this.showColorPicker('nodeStrokeColor', 'tb-item-stroke');
                }
                else {
                    this.showColorPicker('lineColor', 'tb-item-stroke');
                }
                break;
            case 'group':
                this.group();
                break;
            case 'ungroup':
                this.ungroup();
                break;
            case 'alignleft':
            case 'alignright':
            case 'aligntop':
            case 'alignbottom':
            case 'alignmiddle':
            case 'aligncenter':
                this.selectedItem.isModified = true;
                var alignType = commandType.replace('align', '');
                var alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
                diagram.align(alignType1);
                break;
            case 'distributeobjectshorizontally':
                this.distribute('RightToLeft');
                break;
            case 'distributeobjectsvertically':
                this.distribute('BottomToTop');
                break;
            case 'showlayers':
                this.showHideLayers();
                break;
            case 'themes':
                this.showHideThemes();
                break;
        }
        if (commandType === 'pantool' || commandType === 'pointer' || commandType === 'texttool') {
            if (args.item.cssClass.indexOf('tb-item-selected') === -1) {
                this.removeSelectedToolbarItem();
                args.item.cssClass += ' tb-item-selected';
            }
        }
    };
    HomeComponent.prototype.showColorPicker = function (propertyName, toolbarName) {
        var fillElement = document.getElementById(propertyName).parentElement.getElementsByClassName('e-dropdown-btn')[0];
        fillElement.click();
        var popupElement = document.getElementById(fillElement.id + '-popup');
        var bounds = document.getElementsByClassName(toolbarName)[0].getBoundingClientRect();
        popupElement.style.left = bounds.left + 'px';
        popupElement.style.top = (bounds.top + 40) + 'px';
    };
    HomeComponent.prototype.showHideLayers = function () {
        var btnWindow = document.getElementById('btnWindowMenu');
        var iconCss = btnWindow.ej2_instances[0].items[3].iconCss;
        if (!this.initLayerPanel) {
            this.diagramLayer.initLayerBottomPanel();
            this.initLayerPanel = true;
        }
        if (iconCss) {
            this.layerDialog.hide();
        }
        else {
            this.diagramLayer.getLayerDialogContent();
            this.layerDialog.show();
        }
        btnWindow.ej2_instances[0].items[3].iconCss = iconCss ? '' : 'sf-icon-Selection';
    };
    HomeComponent.prototype.showHideThemes = function () {
        var btnWindow = document.getElementById('btnWindowMenu');
        var iconCss = btnWindow.ej2_instances[0].items[5].iconCss;
        if (iconCss) {
            this.themeDialog.hide();
        }
        else {
            this.themeDialog.show();
        }
        btnWindow.ej2_instances[0].items[5].iconCss = iconCss ? '' : 'sf-icon-Selection';
    };
    HomeComponent.prototype.closeThemeDialog = function (args) {
        var btnWindow = document.getElementById('btnWindowMenu');
        btnWindow.ej2_instances[0].items[5].iconCss = '';
    };
    HomeComponent.prototype.removeSelectedToolbarItem = function () {
        for (var i = 0; i < this.toolbarEditor.items.length; i++) {
            var item = this.toolbarEditor.items[i];
            if (item.cssClass.indexOf('tb-item-selected') !== -1) {
                item.cssClass = item.cssClass.replace(' tb-item-selected', '');
            }
        }
        this.toolbarEditor.dataBind();
        document.getElementById('btnDrawShape').classList.remove('tb-item-selected');
        document.getElementById('btnDrawConnector').classList.remove('tb-item-selected');
    };
    HomeComponent.prototype.lockObject = function () {
        this.selectedItem.isModified = true;
        var diagram = this.selectedItem.selectedDiagram;
        for (var i = 0; i < diagram.selectedItems.nodes.length; i++) {
            var node = diagram.selectedItems.nodes[i];
            if (node.constraints & NodeConstraints.Drag) {
                node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select;
            }
            else {
                node.constraints = NodeConstraints.Default;
            }
        }
        for (var i = 0; i < diagram.selectedItems.connectors.length; i++) {
            var connector = diagram.selectedItems.connectors[i];
            if (connector.constraints & ConnectorConstraints.Drag) {
                connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select;
            }
            else {
                connector.constraints = ConnectorConstraints.Default;
            }
        }
        diagram.dataBind();
    };
    HomeComponent.prototype.onUploadSuccess = function (args) {
        document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
        if (args.operation !== 'remove') {
            var file1 = args.file;
            var file = file1.rawFile;
            OrgChartUtilityMethods.fileType = file1.type.toString();
            var reader = new FileReader();
            if (OrgChartUtilityMethods.fileType.toLowerCase() === 'jpg' || OrgChartUtilityMethods.fileType.toLowerCase() === 'png') {
                reader.readAsDataURL(file);
                reader.onloadend = this.setImage.bind(this);
            }
            else {
                reader.readAsText(file);
                if (OrgChartUtilityMethods.fileType === 'json' && CommonKeyboardCommands.isOpen) {
                    reader.onloadend = this.loadDiagram.bind(this);
                }
                else {
                    OrgChartUtilityMethods.isUploadSuccess = true;
                    reader.onloadend = OrgChartUtilityMethods.readFile.bind(OrgChartUtilityMethods);
                }
            }
            CommonKeyboardCommands.isOpen = false;
        }
    };
    HomeComponent.prototype.onUploadFailure = function (args) {
        document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
    };
    HomeComponent.prototype.onUploadFileSelected = function (args) {
        document.getElementsByClassName('sb-content-overlay')[0].style.display = '';
    };
    HomeComponent.prototype.setImage = function (event) {
        var node = this.selectedItem.selectedDiagram.selectedItems.nodes[0];
        node.shape = { type: 'Image', source: event.target.result, align: 'None' };
    };
    HomeComponent.prototype.loadDiagram = function (event) {
        this.page.loadPage(event.target.result.toString());
        this.page.loadDiagramSettings();
        this.fileUploadDialog.hide();
    };
    HomeComponent.prototype.onTooltipBeforeRender = function (args) {
        if (args.target) {
            this.tooltip.content = this.orgChartPropertyBinding.getTooltipContent(args);
        }
    };
    HomeComponent.prototype.getCommandSettings = function () {
        var commandManager = {
            commands: [
                {
                    gesture: { key: Keys.D, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: CommonKeyboardCommands.duplicateSelectedItems.bind(CommonKeyboardCommands), name: 'Duplicate'
                },
                {
                    gesture: { key: Keys.B, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }, canExecute: this.canExecute,
                    execute: this.sendToBack.bind(this), name: 'SendToBack'
                },
                {
                    gesture: { key: Keys.F, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }, canExecute: this.canExecute,
                    execute: this.bringToFront.bind(this), name: 'BringToFront'
                },
                {
                    gesture: { key: Keys.G, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.group.bind(this), name: 'Group'
                },
                {
                    gesture: { key: Keys.U, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.ungroup.bind(this), name: 'Ungroup'
                },
                {
                    gesture: { key: Keys.X, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.cutObjects.bind(this), name: 'cutObjects'
                },
                {
                    gesture: { key: Keys.C, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.copyObjects.bind(this), name: 'copyObjects'
                },
                {
                    gesture: { key: Keys.V, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.pasteObjects.bind(this), name: 'pasteObjects'
                },
                {
                    gesture: { key: Keys.Z, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.undo.bind(this), name: 'undo'
                },
                {
                    gesture: { key: Keys.Y, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.redo.bind(this), name: 'redo'
                },
                {
                    gesture: { key: Keys.Delete, keyModifiers: KeyModifiers.None }, canExecute: this.canExecute,
                    execute: this.delete.bind(this), name: 'delete'
                },
                {
                    gesture: { key: Keys.A, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.selectAll.bind(this), name: 'selectAll'
                }
            ]
        };
        commandManager.commands = CommonKeyboardCommands.addCommonCommands(commandManager.commands);
        return commandManager;
    };
    HomeComponent.prototype.cutObjects = function () {
        this.selectedItem.pasteData = CommonKeyboardCommands.cloneSelectedItems();
        this.selectedItem.selectedDiagram.cut();
    };
    HomeComponent.prototype.copyObjects = function () {
        this.selectedItem.pasteData = CommonKeyboardCommands.cloneSelectedItems();
    };
    HomeComponent.prototype.pasteObjects = function () {
        var diagram = this.selectedItem.selectedDiagram;
        if (this.selectedItem.pasteData.length > 0) {
            diagram.paste(this.selectedItem.pasteData);
        }
    };
    HomeComponent.prototype.sendToBack = function () {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.sendToBack();
    };
    HomeComponent.prototype.bringToFront = function () {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.bringToFront();
    };
    HomeComponent.prototype.group = function () {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.group();
    };
    HomeComponent.prototype.ungroup = function () {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.unGroup();
    };
    HomeComponent.prototype.undo = function () {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.undo();
    };
    HomeComponent.prototype.redo = function () {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.redo();
    };
    HomeComponent.prototype.delete = function () {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.remove();
    };
    HomeComponent.prototype.selectAll = function () {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.selectAll();
    };
    HomeComponent.prototype.distribute = function (value) {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.distribute(value);
    };
    HomeComponent.prototype.canExecute = function () {
        return true;
    };
    tslib_1.__decorate([
        ViewChild('printDialog')
    ], HomeComponent.prototype, "printDialog", void 0);
    tslib_1.__decorate([
        ViewChild('exportDialog')
    ], HomeComponent.prototype, "exportDialog", void 0);
    tslib_1.__decorate([
        ViewChild('fileUploadDialog')
    ], HomeComponent.prototype, "fileUploadDialog", void 0);
    tslib_1.__decorate([
        ViewChild('openTemplateDialog')
    ], HomeComponent.prototype, "openTemplateDialog", void 0);
    tslib_1.__decorate([
        ViewChild('saveDialog')
    ], HomeComponent.prototype, "saveDialog", void 0);
    tslib_1.__decorate([
        ViewChild('customPropertyDialog')
    ], HomeComponent.prototype, "customPropertyDialog", void 0);
    tslib_1.__decorate([
        ViewChild('layerDialog')
    ], HomeComponent.prototype, "layerDialog", void 0);
    tslib_1.__decorate([
        ViewChild('tooltipDialog')
    ], HomeComponent.prototype, "tooltipDialog", void 0);
    tslib_1.__decorate([
        ViewChild('hyperlinkDialog')
    ], HomeComponent.prototype, "hyperlinkDialog", void 0);
    tslib_1.__decorate([
        ViewChild('themeDialog')
    ], HomeComponent.prototype, "themeDialog", void 0);
    tslib_1.__decorate([
        ViewChild('deleteConfirmationDialog')
    ], HomeComponent.prototype, "deleteConfirmationDialog", void 0);
    tslib_1.__decorate([
        ViewChild('btnHelpMenu')
    ], HomeComponent.prototype, "btnHelpMenu", void 0);
    tslib_1.__decorate([
        ViewChild('toolbarEditor')
    ], HomeComponent.prototype, "toolbarEditor", void 0);
    tslib_1.__decorate([
        ViewChild('btnDrawShape')
    ], HomeComponent.prototype, "btnDrawShape", void 0);
    tslib_1.__decorate([
        ViewChild('btnDrawConnector')
    ], HomeComponent.prototype, "btnDrawConnector", void 0);
    tslib_1.__decorate([
        ViewChild('defaultupload')
    ], HomeComponent.prototype, "defaultupload", void 0);
    tslib_1.__decorate([
        ViewChild('tooltip')
    ], HomeComponent.prototype, "tooltip", void 0);
    tslib_1.__decorate([
        ViewChild('btnDownloadFile')
    ], HomeComponent.prototype, "btnDownloadFile", void 0);
    tslib_1.__decorate([
        ViewChild('ddlTextPosition')
    ], HomeComponent.prototype, "ddlTextPosition", void 0);
    HomeComponent = tslib_1.__decorate([
        Component({
            selector: 'main-section',
            templateUrl: 'home.component.html',
            encapsulation: ViewEncapsulation.None
        })
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map