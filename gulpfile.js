const { series, watch } = require("gulp");

// Pull in each task
const fonts = require("./gulp-tasks/fonts.js");
const sass = require("./gulp-tasks/sass.js");

// Set each directory and contents that we want to watch and
// assign the relevant task. `ignoreInitial` set to true will
// prevent the task being run when we run `gulp watch`, but it
// will run when a file changes.
const watcher = () => {
	watch("./src/scss/**/*.scss", { ignoreInitial: true }, sass);
};

exports.default = series(fonts, sass);

// This is our watcher task that instructs gulp to watch directories and
// act accordingly
exports.watch = watcher;
