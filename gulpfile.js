const { parallel } = require("gulp");

const fonts = require("./gulp-tasks/fonts.js");

exports.default = parallel(fonts);
