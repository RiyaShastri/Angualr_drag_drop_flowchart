import { ContextMenuItemModel, Diagram } from '@syncfusion/ej2-diagrams';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
export declare class CustomContextMenuItems {
    items: ContextMenuItemModel[];
    getHiddenMenuItems(diagram: Diagram): string[];
    updateBpmnShape(diagram: Diagram, item: MenuItemModel): void;
}
