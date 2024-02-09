import { SelectorViewModel } from './selector';
import { FlowShapes, BasicShapes } from '@syncfusion/ej2-diagrams';
export declare class DiagramTheme {
    private nodeOldStyles;
    private connectorOldStyles;
    private isThemeApplied;
    selectedItem: SelectorViewModel;
    constructor(selectedItem: SelectorViewModel);
    colorList: {
        [key: string]: Object;
    }[];
    getShapeType(shapeType: FlowShapes | BasicShapes): string;
    getShapeStyle(shapeType: string, themeStyle: {
        [key: string]: string;
    }[]): {
        [key: string]: string;
    };
    getThemeStyle(themeName: string): {
        [key: string]: Object;
    };
    themeMouseOver(args: MouseEvent): void;
    applyOldStyle(): void;
    themeClick(args: MouseEvent): void;
    setNodeOldStyles(): void;
    applyStyle(themeName: string): void;
}
