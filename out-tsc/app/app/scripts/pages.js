import { Button } from '@syncfusion/ej2-buttons';
import { SnapConstraints } from '@syncfusion/ej2-diagrams';
import { MindMapUtilityMethods, MindMap } from './mindmap';
import { OrgChartUtilityMethods, OrgChartData } from './orgchart';
var PageOptions = (function () {
    function PageOptions() {
    }
    return PageOptions;
}());
export { PageOptions };
var PageCreation = (function () {
    function PageCreation(selectedItem) {
        this.pageOptionList = [];
        this.pageSwitch = false;
        this.selectedItem = selectedItem;
    }
    PageCreation.prototype.generatePageButtons = function (pages) {
        var pageOptionElement = document.getElementById('pageOptionList');
        var pageContainerWidth = pageOptionElement.parentElement.getBoundingClientRect().width - 1;
        var buttonWidth = 75;
        if (pages.length * buttonWidth > pageContainerWidth) {
            buttonWidth = (pageContainerWidth - 32) / pages.length;
        }
        while (pageOptionElement.hasChildNodes()) {
            pageOptionElement.removeChild(pageOptionElement.lastChild);
        }
        for (var i = 0; i < pages.length; i++) {
            var pageOption = pages[i];
            var buttonElement_1 = document.createElement('button');
            buttonElement_1.setAttribute('id', pageOption.name);
            buttonElement_1.setAttribute('style', 'width:' + buttonWidth + 'px');
            buttonElement_1.setAttribute('title', pageOption.text);
            buttonElement_1.onclick = this.showPageData.bind(this);
            pageOptionElement.appendChild(buttonElement_1);
            var pageButton_1 = new Button({
                content: pageOption.text
            });
            pageButton_1.appendTo(buttonElement_1);
            if (this.activePage.name === pageOption.name) {
                buttonElement_1.classList.add('db-active-page');
            }
        }
        var buttonElement = document.createElement('button');
        buttonElement.setAttribute('id', 'addNewPage');
        pageOptionElement.appendChild(buttonElement);
        buttonElement.setAttribute('style', 'width:32px');
        buttonElement.onclick = this.addNewPage.bind(this);
        var pageButton = new Button({
            iconCss: 'sf-icon-Plus'
        });
        pageButton.appendTo(buttonElement);
    };
    PageCreation.prototype.showPageData = function (evt) {
        var target = evt.target;
        var page1 = this.findPage(target.id);
        if (page1 != null) {
            if (this.activePage) {
                var button = document.getElementById(this.activePage.name);
                if (button.classList.contains('db-active-page')) {
                    button.classList.remove('db-active-page');
                }
                this.saveDiagramSettings();
            }
            this.activePage = page1;
            this.pageSwitch = true;
            this.loadDiagramSettings();
            this.pageSwitch = false;
        }
        target.classList.add('db-active-page');
    };
    PageCreation.prototype.findPage = function (id) {
        for (var i = 0; i < this.pageOptionList.length; i++) {
            if (this.pageOptionList[i].name === id) {
                return this.pageOptionList[i];
            }
        }
        return null;
    };
    PageCreation.prototype.addNewPage = function () {
        if (this.activePage) {
            this.saveDiagramSettings();
            this.selectedItem.selectedDiagram.clear();
        }
        if (this.selectedItem.diagramType === 'MindMap') {
            MindMapUtilityMethods.createEmptyMindMap();
            this.selectedItem.selectedDiagram.doLayout();
        }
        else if (this.selectedItem.diagramType === 'OrgChart') {
            OrgChartUtilityMethods.createEmptyOrgChart();
            this.selectedItem.selectedDiagram.doLayout();
        }
        this.activePage = new PageOptions();
        this.activePage.name = 'page' + (this.pageOptionList.length + 1);
        this.activePage.text = 'Page' + (this.pageOptionList.length + 1);
        this.pageOptionList.push(this.activePage);
        this.generatePageButtons(this.pageOptionList);
    };
    PageCreation.prototype.savePage = function () {
        var pageData = {};
        this.saveDiagramSettings();
        pageData.pageOptionList = this.pageOptionList;
        pageData.activePage = this.activePage.name;
        pageData.diagramType = this.selectedItem.diagramType;
        console.log(pageData);
        return JSON.stringify(pageData);
    };
    PageCreation.prototype.PageSave = function () {
        var pageData = {};
        this.saveDiagramSettings();
        pageData.pageOptionList = this.pageOptionList;
        pageData.activePage = this.activePage.name;
        pageData.diagramType = this.selectedItem.diagramType;
        return JSON.stringify(pageData);
    };
    PageCreation.prototype.loadPage = function (savedData) {
        var pageData = JSON.parse(savedData);
        this.pageOptionList = pageData.pageOptionList;
        this.activePage = this.findPage(pageData.activePage.toString());
        this.selectedItem.diagramType = pageData.diagramType.toString();
        this.generatePageButtons(this.pageOptionList);
    };
    PageCreation.prototype.saveDiagramSettings = function () {
        this.activePage.diagram = JSON.parse(this.selectedItem.selectedDiagram.saveDiagram());
        if (this.selectedItem.diagramType === 'MindMap') {
            this.activePage.mindmapTemplateType = MindMapUtilityMethods.templateType;
        }
    };
    PageCreation.prototype.loadDiagramSettings = function () {
        var diagram = this.selectedItem.selectedDiagram;
        document.getElementsByClassName('sidebar')[0].className = 'sidebar show-overview';
        this.selectedItem.isLoading = true;
        diagram.loadDiagram(JSON.stringify(this.activePage.diagram));
        diagram.clearSelection();
        this.selectedItem.isLoading = false;
        document.getElementsByClassName('sidebar')[0].className = 'sidebar';
        if (this.selectedItem.diagramType === 'MindMap') {
            MindMapUtilityMethods.templateType = this.activePage.mindmapTemplateType;
            if (!this.pageSwitch && !this.selectedItem.isTemplateLoad) {
                MindMapUtilityMethods.selectedItem = this.selectedItem;
                var map = new MindMap(this.selectedItem);
                map.createMindMap(false);
            }
            document.getElementById('diagram').querySelector('#closeIconDiv').onclick =
                MindMapUtilityMethods.onHideNodeClick.bind(MindMapUtilityMethods);
        }
        if (this.selectedItem.diagramType === 'OrgChart') {
            if (!this.pageSwitch && !this.selectedItem.isTemplateLoad) {
                OrgChartUtilityMethods.selectedItem = this.selectedItem;
                var org = new OrgChartData(this.selectedItem);
                org.createOrgChart(false);
            }
            document.getElementById('diagram').querySelector('#closeIconDiv').onclick =
                OrgChartUtilityMethods.onHideNodeClick.bind(OrgChartUtilityMethods);
        }
        var btnView = document.getElementById('btnViewMenu');
        btnView = btnView.ej2_instances[0];
        if (diagram.rulerSettings) {
            btnView.items[5].iconCss = diagram.rulerSettings.showRulers ? 'sf-icon-Selection' : '';
            var containerDiv = document.getElementById('diagramContainerDiv');
            if (!diagram.rulerSettings.showRulers) {
                containerDiv.classList.remove('db-show-ruler');
            }
            else {
                if (!containerDiv.classList.contains('db-show-ruler')) {
                    containerDiv.classList.add('db-show-ruler');
                }
            }
        }
        if (diagram.snapSettings) {
            btnView.items[6].iconCss = (diagram.snapSettings.constraints & SnapConstraints.SnapToObject) ? 'sf-icon-Selection' : '';
            btnView.items[7].iconCss = (diagram.snapSettings.constraints & SnapConstraints.ShowLines) ? 'sf-icon-Selection' : '';
            btnView.items[9].iconCss = (diagram.snapSettings.constraints & SnapConstraints.SnapToLines) ? 'sf-icon-Selection' : '';
        }
    };
    return PageCreation;
}());
export { PageCreation };
//# sourceMappingURL=pages.js.map