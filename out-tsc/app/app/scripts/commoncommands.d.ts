import { SelectorViewModel } from './selector';
import { PageCreation } from '../scripts/pages';
import { CommandModel, NodeModel, ConnectorModel } from '@syncfusion/ej2-diagrams';
export declare abstract class CommonKeyboardCommands {
    static selectedItem: SelectorViewModel;
    static page: PageCreation;
    static isOpen: boolean;
    static newDiagram(): void;
    static openDiagram(): void;
    static saveDiagram(): void;
    static zoomIn(): void;
    static zoomOut(): void;
    static download(data: string, filename: string): void;
    static openUploadBox(isOpen: boolean, extensionType: string): void;
    static addCommonCommands(commands: CommandModel[]): CommandModel[];
    static canExecute(): boolean;
    static cloneSelectedItems(): (NodeModel | ConnectorModel)[];
    static duplicateSelectedItems(): void;
}
