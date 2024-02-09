import * as tslib_1 from "tslib";
import { Node, NodeConstraints, Connector, ConnectorConstraints } from '@syncfusion/ej2-diagrams';
import { UtilityMethods } from './utilitymethods';
import { CustomContextMenuItems } from './customcontextmenuitems';
import { Input } from '@angular/core';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { MindMapUtilityMethods } from './mindmap';
var NodeProperties = (function () {
    function NodeProperties() {
        this.m_offsetX = 0;
        this.m_offsetY = 0;
        this.m_width = 0;
        this.m_height = 0;
        this.m_rotateAngle = 0;
        this.m_fillColor = '#ffffff';
        this.m_strokeColor = '#000000';
        this.m_strokeStyle = 'None';
        this.m_strokeWidth = 1;
        this.m_opacity = 0;
        this.opacityText = '0%';
        this.m_aspectRatio = false;
        this.m_gradient = false;
        this.m_gradientDirection = 'South';
        this.m_gradientColor = '#ffffff';
    }
    Object.defineProperty(NodeProperties.prototype, "offsetX", {
        get: function () {
            return this.m_offsetX;
        },
        set: function (offsetX) {
            if (this.m_offsetX !== offsetX) {
                this.m_offsetX = offsetX;
                this.triggerPropertyChange('offsetX', offsetX);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeProperties.prototype, "offsetY", {
        get: function () {
            return this.m_offsetY;
        },
        set: function (offsetY) {
            if (this.m_offsetY !== offsetY) {
                this.m_offsetY = offsetY;
                this.triggerPropertyChange('offsetY', offsetY);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeProperties.prototype, "width", {
        get: function () {
            return this.m_width;
        },
        set: function (width) {
            if (this.m_width !== width) {
                this.m_width = width || 3;
                this.triggerPropertyChange('width', width);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeProperties.prototype, "height", {
        get: function () {
            return this.m_height;
        },
        set: function (height) {
            if (this.m_height !== height) {
                this.m_height = height || 3;
                this.triggerPropertyChange('height', height);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeProperties.prototype, "rotateAngle", {
        get: function () {
            return this.m_rotateAngle;
        },
        set: function (rotateAngle) {
            if (this.m_rotateAngle !== rotateAngle) {
                this.m_rotateAngle = rotateAngle;
                this.triggerPropertyChange('rotateAngle', rotateAngle);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeProperties.prototype, "fillColor", {
        get: function () {
            return this.m_fillColor;
        },
        set: function (fillColor) {
            if (this.m_fillColor !== fillColor) {
                this.m_fillColor = fillColor;
                this.triggerPropertyChange('fillColor', fillColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeProperties.prototype, "strokeColor", {
        get: function () {
            return this.m_strokeColor;
        },
        set: function (strokeColor) {
            if (this.m_strokeColor !== strokeColor) {
                this.m_strokeColor = strokeColor;
                this.triggerPropertyChange('strokeColor', strokeColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeProperties.prototype, "strokeStyle", {
        get: function () {
            return this.m_strokeStyle;
        },
        set: function (strokeStyle) {
            if (this.m_strokeStyle !== strokeStyle) {
                this.m_strokeStyle = strokeStyle;
                this.triggerPropertyChange('strokeStyle', strokeStyle);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeProperties.prototype, "strokeWidth", {
        get: function () {
            return this.m_strokeWidth;
        },
        set: function (strokeWidth) {
            if (this.m_strokeWidth !== strokeWidth) {
                this.m_strokeWidth = strokeWidth;
                this.triggerPropertyChange('strokeWidth', strokeWidth);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeProperties.prototype, "opacity", {
        get: function () {
            return this.m_opacity;
        },
        set: function (opacity) {
            if (this.m_opacity !== opacity) {
                this.m_opacity = opacity;
                this.triggerPropertyChange('opacity', opacity);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeProperties.prototype, "aspectRatio", {
        get: function () {
            return this.m_aspectRatio;
        },
        set: function (aspectRatio) {
            if (this.m_aspectRatio !== aspectRatio) {
                this.m_aspectRatio = aspectRatio;
                this.triggerPropertyChange('aspectRatio', aspectRatio);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeProperties.prototype, "gradient", {
        get: function () {
            return this.m_gradient;
        },
        set: function (gradient) {
            if (this.m_gradient !== gradient) {
                this.m_gradient = gradient;
                var gradientElement = document.getElementById('gradientStyle');
                if (gradient) {
                    gradientElement.className = 'row db-prop-row db-gradient-style-show';
                }
                else {
                    gradientElement.className = 'row db-prop-row db-gradient-style-hide';
                }
                this.triggerPropertyChange('gradient', gradient);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeProperties.prototype, "gradientDirection", {
        get: function () {
            return this.m_gradientDirection;
        },
        set: function (gradientDirection) {
            if (this.m_gradientDirection !== gradientDirection) {
                this.m_gradientDirection = gradientDirection;
                this.triggerPropertyChange('gradient', true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeProperties.prototype, "gradientColor", {
        get: function () {
            return this.m_gradientColor;
        },
        set: function (gradientColor) {
            if (this.m_gradientColor !== gradientColor) {
                this.m_gradientColor = gradientColor;
                this.triggerPropertyChange('gradient', true);
            }
        },
        enumerable: true,
        configurable: true
    });
    NodeProperties.prototype.triggerPropertyChange = function (propertyName, propertyValue) {
        if (!isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName: propertyName, propertyValue: propertyValue });
        }
    };
    NodeProperties.prototype.getGradient = function (node) {
        var gradientValue = this.getGradientDirectionValue(this.gradientDirection);
        node.style.gradient = {
            type: 'Linear',
            x1: gradientValue.x1, x2: gradientValue.x2, y1: gradientValue.y1, y2: gradientValue.y2,
            stops: [
                { color: node.style.fill, offset: 0 },
                { color: this.getColor(this.gradientColor), offset: 1 }
            ]
        };
    };
    NodeProperties.prototype.getGradientDirectionValue = function (direction) {
        var gradientValue = {};
        var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
        if (direction === 'West') {
            x1 = 100;
        }
        else if (direction === 'South') {
            y2 = 100;
        }
        else if (direction === 'East') {
            x2 = 100;
        }
        else {
            y1 = 100;
        }
        gradientValue = { x1: x1, y1: y1, x2: x2, y2: y2 };
        return gradientValue;
    };
    NodeProperties.prototype.getColor = function (colorName) {
        if (window.navigator.msSaveBlob && colorName.length === 9) {
            return colorName.substring(0, 7);
        }
        return colorName;
    };
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "offsetX", null);
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "offsetY", null);
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "width", null);
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "height", null);
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "rotateAngle", null);
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "fillColor", null);
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "strokeColor", null);
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "strokeStyle", null);
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "strokeWidth", null);
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "opacity", null);
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "aspectRatio", null);
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "gradient", null);
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "gradientDirection", null);
    tslib_1.__decorate([
        Input()
    ], NodeProperties.prototype, "gradientColor", null);
    return NodeProperties;
}());
export { NodeProperties };
var ConnectorProperties = (function () {
    function ConnectorProperties() {
        this.m_lineColor = '#ffffff';
    }
    Object.defineProperty(ConnectorProperties.prototype, "lineColor", {
        get: function () {
            return this.m_lineColor;
        },
        set: function (lineColor) {
            if (this.m_lineColor !== lineColor) {
                this.m_lineColor = lineColor;
                this.triggerPropertyChange('lineColor', lineColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorProperties.prototype, "lineWidth", {
        get: function () {
            return this.m_lineWidth;
        },
        set: function (lineWidth) {
            if (this.m_lineWidth !== lineWidth) {
                this.m_lineWidth = lineWidth;
                this.triggerPropertyChange('lineWidth', lineWidth);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorProperties.prototype, "lineStyle", {
        get: function () {
            return this.m_lineStyle;
        },
        set: function (lineStyle) {
            if (this.m_lineStyle !== lineStyle) {
                this.m_lineStyle = lineStyle;
                this.triggerPropertyChange('lineStyle', lineStyle);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorProperties.prototype, "lineType", {
        get: function () {
            return this.m_lineType;
        },
        set: function (lineType) {
            if (this.m_lineType !== lineType) {
                this.m_lineType = lineType;
                this.triggerPropertyChange('lineType', lineType);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorProperties.prototype, "lineJump", {
        get: function () {
            return this.m_lineJump;
        },
        set: function (lineJump) {
            if (this.m_lineJump !== lineJump) {
                this.m_lineJump = lineJump;
                if (lineJump) {
                    document.getElementById('lineJumpSizeDiv').style.display = '';
                }
                else {
                    document.getElementById('lineJumpSizeDiv').style.display = 'none';
                }
                this.triggerPropertyChange('lineJump', lineJump);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorProperties.prototype, "lineJumpSize", {
        get: function () {
            return this.m_lineJumpSize;
        },
        set: function (lineJumpSize) {
            if (this.m_lineJumpSize !== lineJumpSize) {
                this.m_lineJumpSize = lineJumpSize;
                this.triggerPropertyChange('lineJumpSize', lineJumpSize);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorProperties.prototype, "sourceType", {
        get: function () {
            return this.m_sourceType;
        },
        set: function (sourceType) {
            if (this.m_sourceType !== sourceType) {
                this.m_sourceType = sourceType;
                this.triggerPropertyChange('sourceType', sourceType);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorProperties.prototype, "targetType", {
        get: function () {
            return this.m_targetType;
        },
        set: function (targetType) {
            if (this.m_targetType !== targetType) {
                this.m_targetType = targetType;
                this.triggerPropertyChange('targetType', targetType);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorProperties.prototype, "sourceSize", {
        get: function () {
            return this.m_sourceSize;
        },
        set: function (sourceSize) {
            if (this.m_sourceSize !== sourceSize) {
                this.m_sourceSize = sourceSize;
                this.triggerPropertyChange('sourceSize', sourceSize);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorProperties.prototype, "targetSize", {
        get: function () {
            return this.m_targetSize;
        },
        set: function (targetSize) {
            if (this.m_targetSize !== targetSize) {
                this.m_targetSize = targetSize;
                this.triggerPropertyChange('targetSize', targetSize);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorProperties.prototype, "opacity", {
        get: function () {
            return this.m_opacity;
        },
        set: function (opacity) {
            if (this.m_opacity !== opacity) {
                this.m_opacity = opacity;
                this.triggerPropertyChange('opacity', opacity);
            }
        },
        enumerable: true,
        configurable: true
    });
    ConnectorProperties.prototype.triggerPropertyChange = function (propertyName, propertyValue) {
        if (!isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName: propertyName, propertyValue: propertyValue });
        }
    };
    tslib_1.__decorate([
        Input()
    ], ConnectorProperties.prototype, "lineColor", null);
    tslib_1.__decorate([
        Input()
    ], ConnectorProperties.prototype, "lineWidth", null);
    tslib_1.__decorate([
        Input()
    ], ConnectorProperties.prototype, "lineStyle", null);
    tslib_1.__decorate([
        Input()
    ], ConnectorProperties.prototype, "lineType", null);
    tslib_1.__decorate([
        Input()
    ], ConnectorProperties.prototype, "lineJump", null);
    tslib_1.__decorate([
        Input()
    ], ConnectorProperties.prototype, "lineJumpSize", null);
    tslib_1.__decorate([
        Input()
    ], ConnectorProperties.prototype, "sourceType", null);
    tslib_1.__decorate([
        Input()
    ], ConnectorProperties.prototype, "targetType", null);
    tslib_1.__decorate([
        Input()
    ], ConnectorProperties.prototype, "sourceSize", null);
    tslib_1.__decorate([
        Input()
    ], ConnectorProperties.prototype, "targetSize", null);
    tslib_1.__decorate([
        Input()
    ], ConnectorProperties.prototype, "opacity", null);
    return ConnectorProperties;
}());
export { ConnectorProperties };
var TextProperties = (function () {
    function TextProperties() {
        this.m_textPosition = '';
        this.m_fontFamily = 'Arial';
        this.m_fontColor = '#ffffff';
        this.textPositionDataSource = this.getNodeTextPositions();
    }
    Object.defineProperty(TextProperties.prototype, "textPosition", {
        get: function () {
            return this.m_textPosition;
        },
        set: function (textPosition) {
            if (this.m_textPosition !== textPosition) {
                this.m_textPosition = textPosition;
                this.triggerPropertyChange('textPosition', textPosition);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextProperties.prototype, "fontFamily", {
        get: function () {
            return this.m_fontFamily;
        },
        set: function (fontFamily) {
            if (this.m_fontFamily !== fontFamily) {
                this.m_fontFamily = fontFamily;
                this.triggerPropertyChange('fontFamily', fontFamily);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextProperties.prototype, "fontSize", {
        get: function () {
            return this.m_fontSize;
        },
        set: function (fontSize) {
            if (this.m_fontSize !== fontSize) {
                this.m_fontSize = fontSize;
                this.triggerPropertyChange('fontSize', fontSize);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextProperties.prototype, "fontColor", {
        get: function () {
            return this.m_fontColor;
        },
        set: function (fontColor) {
            if (this.m_fontColor !== fontColor) {
                this.m_fontColor = fontColor;
                this.triggerPropertyChange('fontColor', fontColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextProperties.prototype, "opacity", {
        get: function () {
            return this.m_opacity;
        },
        set: function (opacity) {
            if (this.m_opacity !== opacity) {
                this.m_opacity = opacity;
                this.triggerPropertyChange('opacity', opacity);
            }
        },
        enumerable: true,
        configurable: true
    });
    TextProperties.prototype.getNodeTextPositions = function () {
        return [
            { text: 'TopLeft', value: 'TopLeft' }, { text: 'TopCenter', value: 'TopCenter' },
            { text: 'TopRight', value: 'TopRight' }, { text: 'MiddleLeft', value: 'MiddleLeft' },
            { text: 'Center', value: 'Center' }, { text: 'MiddleRight', value: 'MiddleRight' },
            { text: 'BottomLeft', value: 'BottomLeft' }, { text: 'BottomCenter', value: 'BottomCenter' },
            { text: 'BottomRight', value: 'BottomRight' },
        ];
    };
    TextProperties.prototype.getConnectorTextPositions = function () {
        return [
            { text: 'Before', value: 'Before' }, { text: 'Center', value: 'Center' },
            { text: 'After', value: 'After' },
        ];
    };
    TextProperties.prototype.triggerPropertyChange = function (propertyName, propertyValue) {
        if (!isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName: propertyName, propertyValue: propertyValue });
        }
    };
    tslib_1.__decorate([
        Input()
    ], TextProperties.prototype, "textPosition", null);
    tslib_1.__decorate([
        Input()
    ], TextProperties.prototype, "fontFamily", null);
    tslib_1.__decorate([
        Input()
    ], TextProperties.prototype, "fontSize", null);
    tslib_1.__decorate([
        Input()
    ], TextProperties.prototype, "fontColor", null);
    tslib_1.__decorate([
        Input()
    ], TextProperties.prototype, "opacity", null);
    return TextProperties;
}());
export { TextProperties };
var ExportSettings = (function () {
    function ExportSettings() {
        this.m_fileName = 'Diagram';
        this.m_format = 'JPG';
        this.m_region = 'PageSettings';
    }
    Object.defineProperty(ExportSettings.prototype, "fileName", {
        get: function () {
            return this.m_fileName;
        },
        set: function (fileName) {
            this.m_fileName = fileName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportSettings.prototype, "format", {
        get: function () {
            return this.m_format;
        },
        set: function (format) {
            this.m_format = format;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportSettings.prototype, "region", {
        get: function () {
            return this.m_region;
        },
        set: function (region) {
            this.m_region = region;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input()
    ], ExportSettings.prototype, "fileName", null);
    tslib_1.__decorate([
        Input()
    ], ExportSettings.prototype, "format", null);
    tslib_1.__decorate([
        Input()
    ], ExportSettings.prototype, "region", null);
    return ExportSettings;
}());
export { ExportSettings };
var PrintSettings = (function () {
    function PrintSettings() {
        this.m_region = 'PageSettings';
        this.m_pageWidth = 0;
        this.m_pageHeight = 0;
        this.m_isPortrait = true;
        this.m_isLandscape = false;
        this.m_multiplePage = false;
        this.m_paperSize = 'Letter';
    }
    Object.defineProperty(PrintSettings.prototype, "region", {
        get: function () {
            return this.m_region;
        },
        set: function (region) {
            this.m_region = region;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "pageWidth", {
        get: function () {
            return this.m_pageWidth;
        },
        set: function (pageWidth) {
            this.m_pageWidth = pageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "pageHeight", {
        get: function () {
            return this.m_pageHeight;
        },
        set: function (pageHeight) {
            this.m_pageHeight = pageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "isPortrait", {
        get: function () {
            return this.m_isPortrait;
        },
        set: function (isPortrait) {
            this.m_isPortrait = isPortrait;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "isLandscape", {
        get: function () {
            return this.m_isLandscape;
        },
        set: function (isLandscape) {
            this.m_isLandscape = isLandscape;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "multiplePage", {
        get: function () {
            return this.m_multiplePage;
        },
        set: function (multiplePage) {
            this.m_multiplePage = multiplePage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "paperSize", {
        get: function () {
            return this.m_paperSize;
        },
        set: function (paperSize) {
            this.m_paperSize = paperSize;
            document.getElementById('printCustomSize').style.display = 'none';
            document.getElementById('printOrientation').style.display = 'none';
            if (paperSize === 'Custom') {
                document.getElementById('printCustomSize').style.display = '';
            }
            else {
                document.getElementById('printOrientation').style.display = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input()
    ], PrintSettings.prototype, "region", null);
    tslib_1.__decorate([
        Input()
    ], PrintSettings.prototype, "pageWidth", null);
    tslib_1.__decorate([
        Input()
    ], PrintSettings.prototype, "pageHeight", null);
    tslib_1.__decorate([
        Input()
    ], PrintSettings.prototype, "isPortrait", null);
    tslib_1.__decorate([
        Input()
    ], PrintSettings.prototype, "isLandscape", null);
    tslib_1.__decorate([
        Input()
    ], PrintSettings.prototype, "multiplePage", null);
    tslib_1.__decorate([
        Input()
    ], PrintSettings.prototype, "paperSize", null);
    return PrintSettings;
}());
export { PrintSettings };
var PageSettings = (function () {
    function PageSettings() {
        this.pageWidth = 1056;
        this.pageHeight = 816;
        this.backgroundColor = '#ffffff';
        this.isPortrait = false;
        this.isLandscape = true;
        this.paperSize = 'Letter';
        this.pageBreaks = false;
    }
    return PageSettings;
}());
export { PageSettings };
var ScrollSettings = (function () {
    function ScrollSettings() {
        this.currentZoom = '100%';
    }
    return ScrollSettings;
}());
export { ScrollSettings };
var MindMapSettings = (function () {
    function MindMapSettings() {
        this.m_levelType = 'Level0';
        this.m_fill = 'white';
        this.m_stroke = 'white';
        this.m_strokeStyle = 'None';
        this.m_strokeWidth = 1;
        this.m_fontFamily = 'Arial';
        this.m_fontColor = '#ffffff';
    }
    Object.defineProperty(MindMapSettings.prototype, "levelType", {
        get: function () {
            return this.m_levelType;
        },
        set: function (levelType) {
            if (this.m_levelType !== levelType) {
                this.m_levelType = levelType;
                this.triggerPropertyChange('levelType', levelType);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "fill", {
        get: function () {
            return this.m_fill;
        },
        set: function (fill) {
            if (this.m_fill !== fill) {
                this.m_fill = fill;
                this.triggerPropertyChange('fill', fill);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "stroke", {
        get: function () {
            return this.m_stroke;
        },
        set: function (stroke) {
            if (this.m_stroke !== stroke) {
                this.m_stroke = stroke;
                this.triggerPropertyChange('stroke', stroke);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "strokeStyle", {
        get: function () {
            return this.m_strokeStyle;
        },
        set: function (strokeStyle) {
            if (this.m_strokeStyle !== strokeStyle) {
                this.m_strokeStyle = strokeStyle;
                this.triggerPropertyChange('strokeStyle', strokeStyle);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "strokeWidth", {
        get: function () {
            return this.m_strokeWidth;
        },
        set: function (strokeWidth) {
            if (this.m_strokeWidth !== strokeWidth) {
                this.m_strokeWidth = strokeWidth;
                this.triggerPropertyChange('strokeWidth', strokeWidth);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "opacity", {
        get: function () {
            return this.m_opacity;
        },
        set: function (opacity) {
            if (this.m_opacity !== opacity) {
                this.m_opacity = opacity;
                this.triggerPropertyChange('opacity', opacity);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "fontFamily", {
        get: function () {
            return this.m_fontFamily;
        },
        set: function (fontFamily) {
            if (this.m_fontFamily !== fontFamily) {
                this.m_fontFamily = fontFamily;
                this.triggerPropertyChange('fontFamily', fontFamily);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "fontSize", {
        get: function () {
            return this.m_fontSize;
        },
        set: function (fontSize) {
            if (this.m_fontSize !== fontSize) {
                this.m_fontSize = fontSize;
                this.triggerPropertyChange('fontSize', fontSize);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "fontColor", {
        get: function () {
            return this.m_fontColor;
        },
        set: function (fontColor) {
            if (this.m_fontColor !== fontColor) {
                this.m_fontColor = fontColor;
                this.triggerPropertyChange('fontColor', fontColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "textOpacity", {
        get: function () {
            return this.m_textOpacity;
        },
        set: function (textOpacity) {
            if (this.m_textOpacity !== textOpacity) {
                this.m_textOpacity = textOpacity;
                this.triggerPropertyChange('textOpacity', textOpacity);
            }
        },
        enumerable: true,
        configurable: true
    });
    MindMapSettings.prototype.triggerPropertyChange = function (propertyName, propertyValue) {
        if (!isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName: propertyName, propertyValue: propertyValue });
        }
    };
    tslib_1.__decorate([
        Input()
    ], MindMapSettings.prototype, "levelType", null);
    tslib_1.__decorate([
        Input()
    ], MindMapSettings.prototype, "fill", null);
    tslib_1.__decorate([
        Input()
    ], MindMapSettings.prototype, "stroke", null);
    tslib_1.__decorate([
        Input()
    ], MindMapSettings.prototype, "strokeStyle", null);
    tslib_1.__decorate([
        Input()
    ], MindMapSettings.prototype, "strokeWidth", null);
    tslib_1.__decorate([
        Input()
    ], MindMapSettings.prototype, "opacity", null);
    tslib_1.__decorate([
        Input()
    ], MindMapSettings.prototype, "fontFamily", null);
    tslib_1.__decorate([
        Input()
    ], MindMapSettings.prototype, "fontSize", null);
    tslib_1.__decorate([
        Input()
    ], MindMapSettings.prototype, "fontColor", null);
    tslib_1.__decorate([
        Input()
    ], MindMapSettings.prototype, "textOpacity", null);
    return MindMapSettings;
}());
export { MindMapSettings };
var OrgDataSettings = (function () {
    function OrgDataSettings() {
        this.dataSourceColumns = [];
        this.id = '';
        this.parent = '';
        this.nameField = '';
        this.bindingFields = [];
        this.imageField = '';
        this.additionalFields = [];
        this.fileformat = '';
        this.extensionType = '.json';
        this.buttonContent = 'Download Example CSV';
    }
    return OrgDataSettings;
}());
export { OrgDataSettings };
var SelectorViewModel = (function () {
    function SelectorViewModel() {
        this.currentDiagramName = '';
        this.preventPropertyChange = false;
        this.isModified = false;
        this.uniqueId = null;
        this.preventSelectionChange = false;
        this.pasteData = [];
        this.isLoading = false;
        this.isTemplateLoad = false;
        this.nodeProperties = new NodeProperties();
        this.textProperties = new TextProperties();
        this.connectorProperties = new ConnectorProperties();
        this.exportSettings = new ExportSettings();
        this.printSettings = new PrintSettings();
        this.pageSettings = new PageSettings();
        this.utilityMethods = new UtilityMethods();
        this.mindmapSettings = new MindMapSettings();
        this.orgDataSettings = new OrgDataSettings();
        this.scrollSettings = new ScrollSettings();
        this.customContextMenu = new CustomContextMenuItems();
        this.nodeProperties.propertyChange = this.nodePropertyChange.bind(this);
        this.connectorProperties.propertyChange = this.connectorPropertyChange.bind(this);
        this.textProperties.propertyChange = this.textPropertyChange.bind(this);
        this.mindmapSettings.propertyChange = this.mindMapPropertyChange.bind(this);
    }
    SelectorViewModel.prototype.randomIdGenerator = function () {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    };
    SelectorViewModel.prototype.getAbsolutePath = function () {
        return window.location.pathname;
    };
    SelectorViewModel.prototype.nodePropertyChange = function (args) {
        if (!this.preventPropertyChange) {
            var diagram = this.selectedDiagram;
            if (diagram) {
                if (diagram.selectedItems.nodes.length > 0) {
                    var selectedNodes = this.selectedDiagram.selectedItems.nodes;
                    for (var i = 0; i < selectedNodes.length; i++) {
                        var node = selectedNodes[i];
                        switch (args.propertyName.toString().toLowerCase()) {
                            case 'fillcolor':
                                node.style.fill = this.getColor(this.nodeProperties.fillColor);
                                if (this.nodeProperties.gradient) {
                                    this.nodeProperties.getGradient(node);
                                }
                                break;
                            case 'strokecolor':
                                node.style.strokeColor = this.getColor(this.nodeProperties.strokeColor);
                                break;
                            case 'strokewidth':
                                node.style.strokeWidth = this.nodeProperties.strokeWidth;
                                break;
                            case 'strokestyle':
                                node.style.strokeDashArray = this.nodeProperties.strokeStyle;
                                break;
                            case 'offsetx':
                                node.offsetX = this.nodeProperties.offsetX;
                                break;
                            case 'offsety':
                                node.offsetY = this.nodeProperties.offsetY;
                                break;
                            case 'width':
                                node.width = this.nodeProperties.width;
                                break;
                            case 'height':
                                node.height = this.nodeProperties.height;
                                break;
                            case 'rotateangle':
                                node.rotateAngle = this.nodeProperties.rotateAngle;
                                break;
                            case 'opacity':
                                node.style.opacity = this.nodeProperties.opacity / 100;
                                this.nodeProperties.opacityText = this.nodeProperties.opacity + '%';
                                break;
                            case 'gradient':
                                if (!this.nodeProperties.gradient) {
                                    node.style.gradient.type = 'None';
                                }
                                else {
                                    this.nodeProperties.getGradient(node);
                                }
                                break;
                            case 'aspectratio':
                                node.constraints = node.constraints ^ NodeConstraints.AspectRatio;
                                break;
                        }
                    }
                    this.isModified = true;
                }
                if (diagram.connectors.length > 0) {
                    var selectedNodes = diagram.selectedItems.connectors;
                    for (var i = 0; i < selectedNodes.length; i++) {
                        switch (args.propertyName.toString().toLowerCase()) {
                            case 'strokecolor':
                                this.connectorProperties.lineColor = this.getColor(this.nodeProperties.strokeColor);
                                break;
                            case 'strokewidth':
                                this.connectorProperties.lineWidth = this.nodeProperties.strokeWidth;
                                break;
                            case 'strokestyle':
                                this.connectorProperties.lineStyle = this.nodeProperties.strokeStyle;
                                break;
                            case 'opacity':
                                this.connectorProperties.opacity = this.nodeProperties.opacity;
                                break;
                        }
                    }
                    this.isModified = true;
                }
                diagram.dataBind();
            }
        }
    };
    SelectorViewModel.prototype.connectorPropertyChange = function (args) {
        if (!this.preventPropertyChange) {
            var diagram = this.selectedDiagram;
            if (diagram && diagram.selectedItems.connectors.length > 0) {
                var selectedNodes = diagram.selectedItems.connectors;
                for (var i = 0; i < selectedNodes.length; i++) {
                    var connector = selectedNodes[i];
                    switch (args.propertyName.toString().toLowerCase()) {
                        case 'linecolor':
                            connector.style.strokeColor = this.getColor(this.connectorProperties.lineColor);
                            connector.sourceDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                            connector.targetDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                            break;
                        case 'linewidth':
                            connector.style.strokeWidth = this.connectorProperties.lineWidth;
                            if (connector.sourceDecorator.style) {
                                connector.sourceDecorator.style.strokeWidth = connector.style.strokeWidth;
                            }
                            else {
                                connector.sourceDecorator.style = { strokeWidth: connector.style.strokeWidth };
                            }
                            if (connector.targetDecorator.style) {
                                connector.targetDecorator.style.strokeWidth = connector.style.strokeWidth;
                            }
                            else {
                                connector.targetDecorator.style = { strokeWidth: connector.style.strokeWidth };
                            }
                            break;
                        case 'linestyle':
                            connector.style.strokeDashArray = this.connectorProperties.lineStyle;
                            break;
                        case 'linetype':
                            connector.type = this.connectorProperties.lineType;
                            break;
                        case 'sourcetype':
                            connector.sourceDecorator.shape = this.connectorProperties.sourceType;
                            break;
                        case 'targettype':
                            connector.targetDecorator.shape = this.connectorProperties.targetType;
                            break;
                        case 'sourcesize':
                            connector.sourceDecorator.width = connector.sourceDecorator.height = this.connectorProperties.sourceSize;
                            break;
                        case 'targetsize':
                            connector.targetDecorator.width = connector.targetDecorator.height = this.connectorProperties.targetSize;
                            break;
                        case 'opacity':
                            connector.style.opacity = this.connectorProperties.opacity / 100;
                            connector.targetDecorator.style.opacity = connector.style.opacity;
                            connector.sourceDecorator.style.opacity = connector.style.opacity;
                            this.connectorProperties.opacityText = this.connectorProperties.opacity + '%';
                            break;
                        case 'linejump':
                            if (this.connectorProperties.lineJump) {
                                connector.constraints = connector.constraints | ConnectorConstraints.Bridging;
                            }
                            else {
                                connector.constraints = connector.constraints & ~ConnectorConstraints.Bridging;
                            }
                            break;
                        case 'linejumpsize':
                            connector.bridgeSpace = this.connectorProperties.lineJumpSize;
                            break;
                    }
                }
                diagram.dataBind();
                this.isModified = true;
            }
        }
    };
    SelectorViewModel.prototype.textPropertyChange = function (args) {
        if (!this.preventPropertyChange) {
            var diagram = this.selectedDiagram;
            if (diagram) {
                var selectedObjects = diagram.selectedItems.nodes;
                selectedObjects = selectedObjects.concat(diagram.selectedItems.connectors);
                var propertyName = args.propertyName.toString().toLowerCase();
                if (selectedObjects.length > 0) {
                    for (var i = 0; i < selectedObjects.length; i++) {
                        var node = selectedObjects[i];
                        if (node instanceof Node || node instanceof Connector) {
                            if (node.annotations.length > 0) {
                                for (var j = 0; j < node.annotations.length; j++) {
                                    var annotation = node.annotations[j].style;
                                    this.updateTextProperties(propertyName, annotation);
                                }
                            }
                            else if (node.shape && node.shape.type === 'Text') {
                                this.updateTextProperties(propertyName, node.style);
                            }
                        }
                    }
                    diagram.dataBind();
                    this.isModified = true;
                }
            }
        }
    };
    SelectorViewModel.prototype.updateTextProperties = function (propertyName, annotation) {
        switch (propertyName) {
            case 'fontfamily':
                annotation.fontFamily = this.textProperties.fontFamily;
                break;
            case 'fontsize':
                annotation.fontSize = this.textProperties.fontSize;
                break;
            case 'fontcolor':
                annotation.color = this.getColor(this.textProperties.fontColor);
                break;
            case 'opacity':
                annotation.opacity = this.textProperties.opacity / 100;
                this.textProperties.opacityText = this.textProperties.opacity + '%';
                break;
        }
    };
    SelectorViewModel.prototype.mindMapPropertyChange = function (args) {
        if (!this.preventPropertyChange) {
            var diagram = this.selectedDiagram;
            if (diagram && diagram.nodes.length > 0) {
                for (var i = 0; i < diagram.nodes.length; i++) {
                    var node = diagram.nodes[i];
                    if (node.addInfo) {
                        var addInfo = node.addInfo;
                        var levelType = this.mindmapSettings.levelType;
                        if ('Level' + addInfo.level === levelType || addInfo.level === levelType) {
                            switch (args.propertyName.toString().toLowerCase()) {
                                case 'fill':
                                    node.style.fill = this.getColor(this.mindmapSettings.fill);
                                    break;
                                case 'stroke':
                                    node.style.strokeColor = this.getColor(this.mindmapSettings.stroke);
                                    if (node.inEdges.length > 0) {
                                        var connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]);
                                        connector.style.strokeColor = node.style.strokeColor;
                                    }
                                    break;
                                case 'strokewidth':
                                    node.style.strokeWidth = this.mindmapSettings.strokeWidth;
                                    if (node.inEdges.length > 0) {
                                        var connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]);
                                        connector.style.strokeWidth = this.mindmapSettings.strokeWidth;
                                    }
                                    break;
                                case 'strokestyle':
                                    node.style.strokeDashArray = this.mindmapSettings.strokeStyle;
                                    if (node.inEdges.length > 0) {
                                        var connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]);
                                        connector.style.strokeDashArray = this.mindmapSettings.strokeStyle;
                                    }
                                    break;
                                case 'opacity':
                                    node.style.opacity = this.mindmapSettings.opacity / 100;
                                    this.mindmapSettings.opacityText = this.mindmapSettings.opacity + '%';
                                    break;
                                default:
                                    this.updateMindMapTextStyle(node, args.propertyName.toString().toLowerCase());
                                    break;
                            }
                        }
                    }
                    diagram.dataBind();
                    this.isModified = true;
                }
            }
        }
    };
    SelectorViewModel.prototype.updateMindMapTextStyle = function (node, propertyName) {
        var diagram = this.selectedDiagram;
        if (node.addInfo && node.annotations.length > 0) {
            var annotation = node.annotations[0].style;
            switch (propertyName) {
                case 'fontfamily':
                    annotation.fontFamily = this.mindmapSettings.fontFamily;
                    break;
                case 'fontsize':
                    annotation.fontSize = this.mindmapSettings.fontSize;
                    break;
                case 'fontcolor':
                    annotation.color = this.getColor(this.mindmapSettings.fontColor);
                    break;
                case 'textopacity':
                    annotation.opacity = this.mindmapSettings.textOpacity / 100;
                    this.mindmapSettings.textOpacityText = this.mindmapSettings.textOpacity + '%';
                    break;
            }
        }
        diagram.dataBind();
        this.isModified = true;
    };
    SelectorViewModel.prototype.getColor = function (colorName) {
        if (window.navigator.msSaveBlob && colorName.length === 9) {
            return colorName.substring(0, 7);
        }
        return colorName;
    };
    return SelectorViewModel;
}());
export { SelectorViewModel };
//# sourceMappingURL=selector.js.map