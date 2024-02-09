import { SelectorViewModel } from './selector';
import { IDraggingEventArgs, ISizeChangeEventArgs, IRotationEventArgs, ISelectionChangeEventArgs, IDragEnterEventArgs, IHistoryChangeArgs, TextStyleModel, DiagramBeforeMenuOpenEventArgs, IScrollChangeEventArgs } from '@syncfusion/ej2-diagrams';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { ChangeEventArgs as DropDownChangeEventArgs, MultiSelectChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ChangeEventArgs as NumericChangeEventArgs, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { ChangeEventArgs as CheckBoxChangeEventArgs, ChangeArgs as ButtonChangeArgs } from '@syncfusion/ej2-buttons';
import { ClickEventArgs as ToolbarClickEventArgs } from '@syncfusion/ej2-navigations';
import { TooltipEventArgs } from '@syncfusion/ej2-popups';
import { PageCreation } from '../scripts/pages';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
export declare class DiagramClientSideEvents {
    private selectedItem;
    page: PageCreation;
    ddlTextPosition: DropDownListComponent;
    constructor(selectedItem: SelectorViewModel, page: PageCreation);
    selectionChange(args: ISelectionChangeEventArgs): void;
    private multipleSelectionSettings;
    private singleSelectionSettings;
    collectionChange(args: ISelectionChangeEventArgs): void;
    nodePositionChange(args: IDraggingEventArgs): void;
    nodeSizeChange(args: ISizeChangeEventArgs): void;
    scrollChange(args: IScrollChangeEventArgs): void;
    nodeRotationChange(args: IRotationEventArgs): void;
    diagramContextMenuClick(args: MenuEventArgs): void;
    diagramContextMenuOpen(args: DiagramBeforeMenuOpenEventArgs): void;
    dragEnter(args: IDragEnterEventArgs): void;
    historyChange(args: IHistoryChangeArgs): void;
}
export declare class DiagramPropertyBinding {
    private selectedItem;
    page: PageCreation;
    constructor(selectedItem: SelectorViewModel, page: PageCreation);
    pageBreaksChange(args: CheckBoxChangeEventArgs): void;
    paperListChange(args: DropDownChangeEventArgs): void;
    pageDimensionChange(args: NumericChangeEventArgs): void;
    pageOrientationChange(args: ButtonChangeArgs): void;
    pageBackgroundChange1(args: ColorPickerEventArgs): void;
    textPositionChange(args: DropDownChangeEventArgs): void;
    toolbarTextStyleChange(args: ToolbarClickEventArgs): void;
    toolbarTextSubAlignChange(args: ToolbarClickEventArgs): void;
    toolbarTextAlignChange(args: ToolbarClickEventArgs): void;
    textPropertyChange(propertyName: string, propertyValue: Object): void;
    updateTextProperties(propertyName: string, propertyValue: Object, annotation: TextStyleModel): void;
    private updateToolbarState;
}
export declare class MindMapPropertyBinding {
    private selectedItem;
    constructor(selectedItem: SelectorViewModel);
    mindmapTextStyleChange(args: ToolbarClickEventArgs): void;
    updateMindMapTextStyle(propertyName: string, propertyValue: Object): void;
    mindmapPatternChange(args: MouseEvent): void;
}
export declare class OrgChartPropertyBinding {
    private selectedItem;
    constructor(selectedItem: SelectorViewModel);
    orgDropDownChange(args: DropDownChangeEventArgs): void;
    orgMultiSelectChange(args: MultiSelectChangeEventArgs): void;
    orgChartSpacingChange(args: NumericChangeEventArgs): void;
    orgChartAligmentChange(args: ToolbarClickEventArgs): void;
    layoutOrientationChange(args: MouseEvent): void;
    layoutPatternChange(args: MouseEvent): void;
    getTooltipContent(args: TooltipEventArgs): string;
}
