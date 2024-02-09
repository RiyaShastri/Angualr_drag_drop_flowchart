import { Diagram, CommandManagerModel, NodeModel, ConnectorModel, Node, Connector, ShapeAnnotationModel, UserHandleModel } from '@syncfusion/ej2-diagrams';
import { SelectorViewModel } from './selector';
export declare class MindMap {
    private selectedItem;
    constructor(selectedItem: SelectorViewModel);
    getCommandSettings(): CommandManagerModel;
    private preventExecute;
    private canExecute;
    private undoMindMap;
    private redoMindMap;
    private addChild;
    private addRightChild;
    private addSibilingChildTop;
    private addSibilingChildBottom;
    private removeChild;
    private navigateLeftChild;
    private navigateRightChild;
    private navigateTopChild;
    private navigateBottomChild;
    private expandCollapse;
    private editNode;
    private navigateChild;
    private getSameLevelNodes;
    private getMinDistanceNode;
    createMindMap(isNew: boolean): void;
    updateMindMap(): void;
    getShortCutKeys(shortcutKeys: {
        [key: string]: Object;
    }[]): ShapeAnnotationModel[];
}
export declare abstract class MindMapUtilityMethods {
    static selectedItem: SelectorViewModel;
    private static lastFillIndex;
    static templateType: string;
    static createEmptyMindMap(): NodeModel;
    static onHideNodeClick(): void;
    static getShortCutString(): string;
    static getMindMapShape(parentNode: NodeModel): {
        [key: string]: Object;
    };
    static addNode(orientation: string): void;
    static addSibilingChild(position: string): void;
    static getConnector(connectors: ConnectorModel[], name: string): Connector;
    static getNode(nodes: NodeModel[], name: string): Node;
    static removeChild(): void;
    private static removeSubChild;
    static setConnectorDefault(diagram: Diagram, orientation: string, connector: ConnectorModel, sourceID: string, targetID: string): ConnectorModel;
    static shortCutkeys: {
        [key: string]: Object;
    }[];
    static handle: UserHandleModel[];
}
