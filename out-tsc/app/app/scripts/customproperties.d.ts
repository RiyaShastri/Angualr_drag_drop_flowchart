import { NodeModel } from '@syncfusion/ej2-diagrams';
import { SelectorViewModel } from './selector';
import { Dialog } from '@syncfusion/ej2-angular-popups';
export declare class CustomProperties {
    selectedItem: SelectorViewModel;
    customPropertyDialog: Dialog;
    deleteField: string;
    constructor(selectedItem: SelectorViewModel, customPropertyDialog: Dialog);
    getPropertyDialogContent(addInfo: Object): void;
    private triggerEvents;
    private clonePropInfoTemplate;
    private valueChange;
    private removeField;
    private showConfirmationDialog;
    removeProperty(args: MouseEvent): void;
    private createSpaceElement;
    private clonePropTemplate;
    private addCustomProperty;
    setTooltip(node: NodeModel, content: string): void;
}
