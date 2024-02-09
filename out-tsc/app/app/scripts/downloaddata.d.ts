import { ChangeArgs } from '@syncfusion/ej2-buttons';
import { SelectorViewModel } from './selector';
export declare class DownloadExampleFiles {
    private selectedItem;
    constructor(selectedItem: SelectorViewModel);
    private data;
    downloadCSV(): void;
    downloadJSON(): void;
    downloadXML(): void;
    downloadFormatChange(args: ChangeArgs): void;
    downloadExampleFiles(args: MouseEvent): void;
}
