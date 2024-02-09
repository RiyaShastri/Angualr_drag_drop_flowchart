import { Diagram, ToolBase } from '@syncfusion/ej2-diagrams';
import { SelectorViewModel } from './selector';
export declare class CustomDiagram extends Diagram {
    selectedItem: SelectorViewModel;
    getTool(action: string): ToolBase;
}
