import { Diagram, CommandManagerModel, Node, UserHandleModel, TreeInfo, SubTreeOrientation, SubTreeAlignments } from '@syncfusion/ej2-diagrams';
import { SelectorViewModel } from './selector';
import { Dialog } from '@syncfusion/ej2-angular-popups';
import { CustomProperties } from './customproperties';
export declare class OrgChartData {
    private selectedItem;
    constructor(selectedItem1: SelectorViewModel);
    getCommandSettings(): CommandManagerModel;
    private spaceOrgChart;
    private undoOrgChart;
    private redoOrgChart;
    private addChild;
    private editChild;
    private addRightChild;
    changeChildParent(): void;
    private removeChild;
    private navigateLeftChild;
    private navigateRightChild;
    private navigateTopChild;
    private navigateBottomChild;
    private navigateChild;
    private getMinDistanceNode;
    private getSameLevelNodes;
    private getConnector;
    private getNode;
    createOrgChart(isNew: boolean): void;
    doLayoutSettings(diagram: Diagram): void;
    private canExecute;
}
export declare abstract class OrgChartUtilityMethods {
    static fileType: string;
    static uploadDialog: Dialog;
    static customPropertyDialog: Dialog;
    static isUploadSuccess: boolean;
    static selectedItem: SelectorViewModel;
    static columnsList: string[];
    static orgDataSource: Object[];
    static orgChart: OrgChartData;
    static customProperty: CustomProperties;
    static showUploadDialog(): void;
    static readFile(event: ProgressEvent): void;
    static validateParentChildRelation(): boolean;
    static showCustomProperty(): void;
    static removeChild(): void;
    private static removeSubChild;
    static getParentChildValues(): {
        [key: string]: string[];
    };
    static addChild(sourceId: string): void;
    private static getNode;
    private static bindFields;
    static createEmptyOrgChart(): void;
    static onHideNodeClick(): void;
    static getShortCutString(): string;
    static applyDataSource(): void;
    static subTreeOrientation: SubTreeOrientation;
    static subTreeAlignments: SubTreeAlignments;
    static getLayoutInfo(node: Node, options: TreeInfo): void;
    private static getDataSourceColumns;
    private static setConnectorDefaults;
    private static setNodeDefaults;
    static convertCsvToJson(csvText: string): Object[];
    static convertXmlToJson(element: Element): Object[];
    static convertChildXmlToJson(element: Element, parentId: string, dataSource: Object[]): void;
    static generateRowData(element: Element, id: string, parentId?: string): {
        [key: string]: Object;
    };
    static shortCutkeys: {
        [key: string]: Object;
    }[];
    static handle: UserHandleModel[];
}
