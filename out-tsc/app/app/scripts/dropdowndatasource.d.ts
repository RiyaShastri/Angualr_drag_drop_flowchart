import { ItemModel } from '@syncfusion/ej2-splitbuttons';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
export declare class DropDownDataSources {
    fileMenuItems: ItemModel[];
    editMenuItems: ItemModel[];
    viewMenuItems: ItemModel[];
    arrangeMenuItems: MenuItemModel[];
    windowMenuItems: ItemModel[];
    helpMenuItems: ItemModel[];
    getFileMenuItems(): ItemModel[];
    getEditMenuItems(): ItemModel[];
    getViewMenuItems(): ItemModel[];
    getArrangeMenuItems(): MenuItemModel[];
    getWindowMenuItems(): ItemModel[];
    getHelpMenuItems(): ItemModel[];
    fileFormats: {
        [key: string]: Object;
    }[];
    diagramRegions: {
        [key: string]: Object;
    }[];
    importFormat: {
        [key: string]: Object;
    }[];
    borderStyles: {
        [key: string]: Object;
    }[];
    fontFamilyList: {
        [key: string]: Object;
    }[];
    decoratorList: {
        [key: string]: Object;
    }[];
    lineTypes: {
        [key: string]: Object;
    }[];
    gradientDirections: {
        [key: string]: Object;
    }[];
    drawShapesList: ItemModel[];
    drawConnectorsList: ItemModel[];
    orderCommandsList: ItemModel[];
    mindmapLevels: {
        [key: string]: Object;
    }[];
    zoomMenuItems: ItemModel[];
    paperList: {
        [key: string]: Object;
    }[];
}
