import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContextMenuModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule, RadioButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule, SliderModule, UploaderModule, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { httpFactory } from '@angular/http/src/http_module';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';



@NgModule({
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
    providers: []
})

export class AppModule {
}