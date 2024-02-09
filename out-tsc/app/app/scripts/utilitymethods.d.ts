import { NodeModel, PointModel, ConnectorModel, Diagram, TextStyleModel, TextAlign, HorizontalAlignment, VerticalAlignment } from '@syncfusion/ej2-diagrams';
import { SelectorViewModel } from './selector';
import { Dialog } from '@syncfusion/ej2-angular-popups';
import { Toolbar } from '@syncfusion/ej2-angular-navigations';
import { PageCreation } from './pages';
export declare class PaperSize {
    pageWidth: number;
    pageHeight: number;
}
export declare class UtilityMethods {
    page: PageCreation;
    tempDialog: Dialog;
    toolbarEditor: Toolbar;
    bindNodeProperties(node: NodeModel, selectedItem: SelectorViewModel): void;
    bindMindMapProperties(node: NodeModel, selectedItem: SelectorViewModel): void;
    bindTextProperties(text: TextStyleModel, selectedItem: SelectorViewModel): void;
    updateTextAlign(textAlign: TextAlign): void;
    updateHorVertAlign(horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment): void;
    bindConnectorProperties(connector: ConnectorModel, selectedItem: SelectorViewModel): void;
    getHexColor(colorStr: string): string;
    getOffset(position: string): PointModel;
    getPosition(offset: PointModel): string;
    hideElements(elementType: string, diagram?: Diagram): void;
    objectTypeChange(objectType: string): void;
    getDefaultDiagramTemplates1(selectedItem: SelectorViewModel, tempCount?: number, backgroundColor?: string, parentId?: string): void;
    generateDiagramTemplates(tempCount: number, backgroundColor: string, parentId: string, selectedItem: SelectorViewModel): HTMLDivElement;
    triggerTemplateEvent(selectedItem: SelectorViewModel): void;
    flowChartImage: {
        [key: string]: string;
    }[];
    mindMapImage: {
        [key: string]: string;
    }[];
    orgChartImage: {
        [key: string]: string;
    }[];
    bpmnImage: {
        [key: string]: string;
    }[];
    getImageSource(diagramType: string, index: number): {
        [key: string]: string;
    };
    readTextFile(file: string, selectedItem: SelectorViewModel): void;
    generateDiagram(selectedItem: SelectorViewModel, evt: MouseEvent): void;
    private hideMenuItems;
    currentDiagramVisibility(diagramname: string, selectedItem: SelectorViewModel): void;
    showDiagramTemplates(selectedItem: SelectorViewModel, evt: MouseEvent): void;
    enableToolbarItems(selectedItems: Object[]): void;
    enableMenuItems(itemText: string, selectedItem: SelectorViewModel): boolean;
    enableArrangeMenuItems(selectedItem: SelectorViewModel): void;
    fillColorCode: string[];
    borderColorCode: string[];
    getPaperSize(paperName: string): PaperSize;
    updateLayout(selectedItem: SelectorViewModel, bindBindingFields?: boolean, imageField?: boolean): void;
}
