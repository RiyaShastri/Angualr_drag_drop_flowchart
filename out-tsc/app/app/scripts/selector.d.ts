import { Node, TextStyleModel } from '@syncfusion/ej2-diagrams';
import { UtilityMethods } from './utilitymethods';
import { CustomContextMenuItems } from './customcontextmenuitems';
import { CustomDiagram } from './userhandles';
export declare class NodeProperties {
    private m_offsetX;
    offsetX: number;
    private m_offsetY;
    offsetY: number;
    private m_width;
    width: number;
    private m_height;
    height: number;
    private m_rotateAngle;
    rotateAngle: number;
    private m_fillColor;
    fillColor: string;
    private m_strokeColor;
    strokeColor: string;
    private m_strokeStyle;
    strokeStyle: string;
    private m_strokeWidth;
    strokeWidth: number;
    private m_opacity;
    opacity: number;
    opacityText: string;
    tooltip: string;
    private m_aspectRatio;
    aspectRatio: boolean;
    private m_gradient;
    gradient: boolean;
    private m_gradientDirection;
    gradientDirection: string;
    private m_gradientColor;
    gradientColor: string;
    propertyChange: Function;
    triggerPropertyChange(propertyName: string, propertyValue: Object): void;
    getGradient(node: Node): void;
    getGradientDirectionValue(direction: string): {
        [key: string]: number;
    };
    private getColor;
}
export declare class ConnectorProperties {
    private m_lineColor;
    lineColor: string;
    private m_lineWidth;
    lineWidth: number;
    private m_lineStyle;
    lineStyle: string;
    private m_lineType;
    lineType: string;
    private m_lineJump;
    lineJump: boolean;
    private m_lineJumpSize;
    lineJumpSize: number;
    private m_sourceType;
    sourceType: string;
    private m_targetType;
    targetType: string;
    private m_sourceSize;
    sourceSize: number;
    private m_targetSize;
    targetSize: number;
    private m_opacity;
    opacity: number;
    opacityText: string;
    propertyChange: Function;
    triggerPropertyChange(propertyName: string, propertyValue: Object): void;
}
export declare class TextProperties {
    private m_textPosition;
    textPosition: string;
    private m_fontFamily;
    fontFamily: string;
    private m_fontSize;
    fontSize: number;
    private m_fontColor;
    fontColor: string;
    private m_opacity;
    opacity: number;
    opacityText: string;
    textDecoration: boolean;
    bold: boolean;
    italic: boolean;
    textAlign: string;
    horizontalAlign: string;
    verticalAlign: string;
    textPositionDataSource: {
        [key: string]: Object;
    }[];
    getNodeTextPositions(): {
        [key: string]: Object;
    }[];
    getConnectorTextPositions(): {
        [key: string]: Object;
    }[];
    propertyChange: Function;
    triggerPropertyChange(propertyName: string, propertyValue: Object): void;
}
export declare class ExportSettings {
    private m_fileName;
    fileName: string;
    private m_format;
    format: string;
    private m_region;
    region: string;
}
export declare class PrintSettings {
    private m_region;
    region: string;
    private m_pageWidth;
    pageWidth: number;
    private m_pageHeight;
    pageHeight: number;
    private m_isPortrait;
    isPortrait: boolean;
    private m_isLandscape;
    isLandscape: boolean;
    private m_multiplePage;
    multiplePage: boolean;
    private m_paperSize;
    paperSize: string;
}
export declare class PageSettings {
    pageWidth: number;
    pageHeight: number;
    showPageBreaks: boolean;
    backgroundColor: string;
    isPortrait: boolean;
    isLandscape: boolean;
    paperSize: string;
    pageBreaks: boolean;
}
export declare class ScrollSettings {
    currentZoom: string;
}
export declare class MindMapSettings {
    private m_levelType;
    levelType: string;
    private m_fill;
    fill: string;
    private m_stroke;
    stroke: string;
    private m_strokeStyle;
    strokeStyle: string;
    private m_strokeWidth;
    strokeWidth: number;
    private m_opacity;
    opacity: number;
    opacityText: string;
    private m_fontFamily;
    fontFamily: string;
    private m_fontSize;
    fontSize: number;
    private m_fontColor;
    fontColor: string;
    private m_textOpacity;
    textOpacity: number;
    textOpacityText: string;
    propertyChange: Function;
    triggerPropertyChange(propertyName: string, propertyValue: Object): void;
}
export declare class OrgDataSettings {
    dataSourceColumns: {
        [key: string]: Object;
    }[];
    id: string;
    parent: string;
    nameField: string;
    bindingFields: string[];
    imageField: string;
    additionalFields: string[];
    fileformat: string;
    extensionType: string;
    buttonContent: string;
}
export declare class SelectorViewModel {
    selectedDiagram: CustomDiagram;
    currentDiagramName: string;
    preventPropertyChange: boolean;
    diagramType: string;
    isModified: boolean;
    uniqueId: string;
    preventSelectionChange: boolean;
    pasteData: Object[];
    isLoading: boolean;
    isTemplateLoad: boolean;
    nodeProperties: NodeProperties;
    textProperties: TextProperties;
    connectorProperties: ConnectorProperties;
    exportSettings: ExportSettings;
    printSettings: PrintSettings;
    pageSettings: PageSettings;
    utilityMethods: UtilityMethods;
    mindmapSettings: MindMapSettings;
    orgDataSettings: OrgDataSettings;
    scrollSettings: ScrollSettings;
    customContextMenu: CustomContextMenuItems;
    randomIdGenerator(): string;
    getAbsolutePath(): string;
    constructor();
    nodePropertyChange(args: {
        [key: string]: Object;
    }): void;
    connectorPropertyChange(args: {
        [key: string]: Object;
    }): void;
    textPropertyChange(args: {
        [key: string]: Object;
    }): void;
    updateTextProperties(propertyName: string, annotation: TextStyleModel): void;
    mindMapPropertyChange(args: {
        [key: string]: Object;
    }): void;
    updateMindMapTextStyle(node: Node, propertyName: string): void;
    getColor(colorName: string): string;
}
