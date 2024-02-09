import { SelectorViewModel } from './selector';
export declare class PageOptions {
    name: string;
    diagram?: any;
    text: string;
    templateDiagramType: string;
    mindmapTemplateType: string;
    orgChartTemplateType: string;
}
export declare class PageCreation {
    pageOptionList: PageOptions[];
    activePage: PageOptions;
    selectedItem: SelectorViewModel;
    pageSwitch: boolean;
    constructor(selectedItem: SelectorViewModel);
    generatePageButtons(pages: PageOptions[]): void;
    showPageData(evt: MouseEvent): void;
    findPage(id: string): PageOptions;
    addNewPage(): void;
    savePage(): string;
    PageSave(): string;
    loadPage(savedData: string): void;
    saveDiagramSettings(): void;
    loadDiagramSettings(): void;
}
