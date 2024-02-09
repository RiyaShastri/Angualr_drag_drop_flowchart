import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule, RadioButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule, SliderModule, UploaderModule, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            imports: [
                FormsModule, HttpClientModule, NumericTextBoxModule, DropDownButtonModule, ContextMenuModule, SliderModule,
                ToolbarModule, DropDownListModule, ButtonModule, RadioButtonModule, UploaderModule,
                DialogModule, CheckBoxModule, MultiSelectModule, TooltipModule, ColorPickerModule, BrowserModule,
            ],
            declarations: [
                AppComponent,
                HomeComponent
            ],
            bootstrap: [AppComponent],
            providers: [AppService]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map