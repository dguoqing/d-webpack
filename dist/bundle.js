(function (modules) { var installedModules = {}; function __webpack_require__(moduleId) { if (installedModules[moduleId]) { return installedModules[moduleId].exports; } var module =
(installedModules[moduleId] = { i: moduleId, l: false, exports: {}, }); modules[moduleId].call( module.exports, module, module.exports, __webpack_require__ ); module.l = true; return module.exports; }
return __webpack_require__((__webpack_require__.s = "./src/index.js")); }) ({  "./src/index.js": (function (module, exports, __webpack_require__) { eval( `let str = __webpack_require__("./src/a.js");

__webpack_require__("./src/assets/base.less");

console.log(str);`
); }),  "./src/a.js": (function (module, exports, __webpack_require__) { eval( `let b = __webpack_require__("./src/componemt/b.js");

module.exports = b + 'a';`
); }),  "./src/componemt/b.js": (function (module, exports, __webpack_require__) { eval( `module.exports = 'b';`
); }),  "./src/assets/base.less": (function (module, exports, __webpack_require__) { eval( `let style = document.createElement('style');
style.innerHTML = "body {\\n  background: #0099ff;\\n}\\n";
document.head.appendChild(style);`
); }),  });