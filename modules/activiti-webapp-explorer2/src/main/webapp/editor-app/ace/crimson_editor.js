define(function(require, exports, module) {
    exports.isDark = false;
    exports.cssText = require("../requirejs/text!./crimson_editor.css");

    exports.cssClass = "ace-crimson-editor";

    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
});