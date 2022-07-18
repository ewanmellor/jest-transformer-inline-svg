"use strict";
exports.__esModule = true;
var path = require('path');
function escapeFileName(str) {
    var ext = path.extname(str);
    return "svg-".concat(path.basename(str, ext))
        .split(/\W+/)
        .map(function (x) { return "".concat(x.charAt(0).toUpperCase()).concat(x.slice(1)); })
        .join('');
}
var transform = function (src, filePath) {
    var ext = path.extname(filePath);
    if (ext !== '.svg' && ext !== '.inline-svg') {
        return src;
    }
    var name = escapeFileName(filePath);
    return {
        code: "\nconst React = require('react');\nfunction ".concat(name, "(props) {\n  return React.createElement(\n    'svg', \n    Object.assign({}, props, {'data-file-name': ").concat(name, ".name})\n  );\n}\nmodule.exports = ").concat(name, ";\n")
    };
};
exports["default"] = {
    process: transform
};
