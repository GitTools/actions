module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tasks/gitreleasemanager/setup.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/inversify/lib/annotation/decorator_utils.js":
/*!******************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/decorator_utils.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
function tagParameter(annotationTarget, propertyName, parameterIndex, metadata) {
    var metadataKey = METADATA_KEY.TAGGED;
    _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex);
}
exports.tagParameter = tagParameter;
function tagProperty(annotationTarget, propertyName, metadata) {
    var metadataKey = METADATA_KEY.TAGGED_PROP;
    _tagParameterOrProperty(metadataKey, annotationTarget.constructor, propertyName, metadata);
}
exports.tagProperty = tagProperty;
function _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex) {
    var paramsOrPropertiesMetadata = {};
    var isParameterDecorator = (typeof parameterIndex === "number");
    var key = (parameterIndex !== undefined && isParameterDecorator) ? parameterIndex.toString() : propertyName;
    if (isParameterDecorator && propertyName !== undefined) {
        throw new Error(ERROR_MSGS.INVALID_DECORATOR_OPERATION);
    }
    if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
        paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
    }
    var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
    if (!Array.isArray(paramOrPropertyMetadata)) {
        paramOrPropertyMetadata = [];
    }
    else {
        for (var _i = 0, paramOrPropertyMetadata_1 = paramOrPropertyMetadata; _i < paramOrPropertyMetadata_1.length; _i++) {
            var m = paramOrPropertyMetadata_1[_i];
            if (m.key === metadata.key) {
                throw new Error(ERROR_MSGS.DUPLICATED_METADATA + " " + m.key.toString());
            }
        }
    }
    paramOrPropertyMetadata.push(metadata);
    paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
    Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
}
function _decorate(decorators, target) {
    Reflect.decorate(decorators, target);
}
function _param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
}
function decorate(decorator, target, parameterIndex) {
    if (typeof parameterIndex === "number") {
        _decorate([_param(parameterIndex, decorator)], target);
    }
    else if (typeof parameterIndex === "string") {
        Reflect.decorate([decorator], target, parameterIndex);
    }
    else {
        _decorate([decorator], target);
    }
}
exports.decorate = decorate;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/inject.js":
/*!*********************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/inject.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var error_msgs_1 = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
var LazyServiceIdentifer = (function () {
    function LazyServiceIdentifer(cb) {
        this._cb = cb;
    }
    LazyServiceIdentifer.prototype.unwrap = function () {
        return this._cb();
    };
    return LazyServiceIdentifer;
}());
exports.LazyServiceIdentifer = LazyServiceIdentifer;
function inject(serviceIdentifier) {
    return function (target, targetKey, index) {
        if (serviceIdentifier === undefined) {
            throw new Error(error_msgs_1.UNDEFINED_INJECT_ANNOTATION(target.name));
        }
        var metadata = new metadata_1.Metadata(METADATA_KEY.INJECT_TAG, serviceIdentifier);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.inject = inject;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/injectable.js":
/*!*************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/injectable.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERRORS_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
function injectable() {
    return function (target) {
        if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
            throw new Error(ERRORS_MSGS.DUPLICATED_INJECTABLE_DECORATOR);
        }
        var types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
        Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);
        return target;
    };
}
exports.injectable = injectable;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/multi_inject.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/multi_inject.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function multiInject(serviceIdentifier) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.MULTI_INJECT_TAG, serviceIdentifier);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.multiInject = multiInject;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/named.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/named.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function named(name) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, name);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.named = named;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/optional.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/optional.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function optional() {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.OPTIONAL_TAG, true);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.optional = optional;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/post_construct.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/post_construct.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERRORS_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
function postConstruct() {
    return function (target, propertyKey, descriptor) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.POST_CONSTRUCT, propertyKey);
        if (Reflect.hasOwnMetadata(METADATA_KEY.POST_CONSTRUCT, target.constructor)) {
            throw new Error(ERRORS_MSGS.MULTIPLE_POST_CONSTRUCT_METHODS);
        }
        Reflect.defineMetadata(METADATA_KEY.POST_CONSTRUCT, metadata, target.constructor);
    };
}
exports.postConstruct = postConstruct;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/tagged.js":
/*!*********************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/tagged.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function tagged(metadataKey, metadataValue) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(metadataKey, metadataValue);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.tagged = tagged;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/target_name.js":
/*!**************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/target_name.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function targetName(name) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.NAME_TAG, name);
        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
    };
}
exports.targetName = targetName;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/unmanaged.js":
/*!************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/unmanaged.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function unmanaged() {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.UNMANAGED_TAG, true);
        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
    };
}
exports.unmanaged = unmanaged;


/***/ }),

/***/ "./node_modules/inversify/lib/bindings/binding.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/bindings/binding.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var Binding = (function () {
    function Binding(serviceIdentifier, scope) {
        this.id = id_1.id();
        this.activated = false;
        this.serviceIdentifier = serviceIdentifier;
        this.scope = scope;
        this.type = literal_types_1.BindingTypeEnum.Invalid;
        this.constraint = function (request) { return true; };
        this.implementationType = null;
        this.cache = null;
        this.factory = null;
        this.provider = null;
        this.onActivation = null;
        this.dynamicValue = null;
    }
    Binding.prototype.clone = function () {
        var clone = new Binding(this.serviceIdentifier, this.scope);
        clone.activated = false;
        clone.implementationType = this.implementationType;
        clone.dynamicValue = this.dynamicValue;
        clone.scope = this.scope;
        clone.type = this.type;
        clone.factory = this.factory;
        clone.provider = this.provider;
        clone.constraint = this.constraint;
        clone.onActivation = this.onActivation;
        clone.cache = this.cache;
        return clone;
    };
    return Binding;
}());
exports.Binding = Binding;


/***/ }),

/***/ "./node_modules/inversify/lib/bindings/binding_count.js":
/*!**************************************************************!*\
  !*** ./node_modules/inversify/lib/bindings/binding_count.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BindingCount = {
    MultipleBindingsAvailable: 2,
    NoBindingsAvailable: 0,
    OnlyOneBindingAvailable: 1
};
exports.BindingCount = BindingCount;


/***/ }),

/***/ "./node_modules/inversify/lib/constants/error_msgs.js":
/*!************************************************************!*\
  !*** ./node_modules/inversify/lib/constants/error_msgs.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
exports.DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
exports.NULL_ARGUMENT = "NULL argument";
exports.KEY_NOT_FOUND = "Key Not Found";
exports.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
exports.CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
exports.NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
exports.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
exports.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
exports.UNDEFINED_INJECT_ANNOTATION = function (name) {
    return "@inject called with undefined this could mean that the class " + name + " has " +
        "a circular dependency problem. You can use a LazyServiceIdentifer to  " +
        "overcome this limitation.";
};
exports.CIRCULAR_DEPENDENCY = "Circular dependency found:";
exports.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
exports.INVALID_BINDING_TYPE = "Invalid binding type:";
exports.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
exports.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
exports.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
exports.INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " +
    "used as service identifier";
exports.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " +
    "must be applied to the parameters of a class constructor or a class property.";
exports.ARGUMENTS_LENGTH_MISMATCH = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "The number of constructor arguments in the derived class " +
        (values[0] + " must be >= than the number of constructor arguments of its base class.");
};
exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " +
    "must be an object.";
exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " +
    "be a string ('singleton' or 'transient').";
exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must " +
    "be a boolean";
exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must " +
    "be a boolean";
exports.MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
exports.POST_CONSTRUCT_ERROR = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "@postConstruct error in class " + values[0] + ": " + values[1];
};
exports.CIRCULAR_DEPENDENCY_IN_FACTORY = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "It looks like there is a circular dependency " +
        ("in one of the '" + values[0] + "' bindings. Please investigate bindings with") +
        ("service identifier '" + values[1] + "'.");
};
exports.STACK_OVERFLOW = "Maximum call stack size exceeded";


/***/ }),

/***/ "./node_modules/inversify/lib/constants/literal_types.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/lib/constants/literal_types.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BindingScopeEnum = {
    Request: "Request",
    Singleton: "Singleton",
    Transient: "Transient"
};
exports.BindingScopeEnum = BindingScopeEnum;
var BindingTypeEnum = {
    ConstantValue: "ConstantValue",
    Constructor: "Constructor",
    DynamicValue: "DynamicValue",
    Factory: "Factory",
    Function: "Function",
    Instance: "Instance",
    Invalid: "Invalid",
    Provider: "Provider"
};
exports.BindingTypeEnum = BindingTypeEnum;
var TargetTypeEnum = {
    ClassProperty: "ClassProperty",
    ConstructorArgument: "ConstructorArgument",
    Variable: "Variable"
};
exports.TargetTypeEnum = TargetTypeEnum;


/***/ }),

/***/ "./node_modules/inversify/lib/constants/metadata_keys.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/lib/constants/metadata_keys.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NAMED_TAG = "named";
exports.NAME_TAG = "name";
exports.UNMANAGED_TAG = "unmanaged";
exports.OPTIONAL_TAG = "optional";
exports.INJECT_TAG = "inject";
exports.MULTI_INJECT_TAG = "multi_inject";
exports.TAGGED = "inversify:tagged";
exports.TAGGED_PROP = "inversify:tagged_props";
exports.PARAM_TYPES = "inversify:paramtypes";
exports.DESIGN_PARAM_TYPES = "design:paramtypes";
exports.POST_CONSTRUCT = "post_construct";


/***/ }),

/***/ "./node_modules/inversify/lib/container/container.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/container/container.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var binding_1 = __webpack_require__(/*! ../bindings/binding */ "./node_modules/inversify/lib/bindings/binding.js");
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_reader_1 = __webpack_require__(/*! ../planning/metadata_reader */ "./node_modules/inversify/lib/planning/metadata_reader.js");
var planner_1 = __webpack_require__(/*! ../planning/planner */ "./node_modules/inversify/lib/planning/planner.js");
var resolver_1 = __webpack_require__(/*! ../resolution/resolver */ "./node_modules/inversify/lib/resolution/resolver.js");
var binding_to_syntax_1 = __webpack_require__(/*! ../syntax/binding_to_syntax */ "./node_modules/inversify/lib/syntax/binding_to_syntax.js");
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
var container_snapshot_1 = __webpack_require__(/*! ./container_snapshot */ "./node_modules/inversify/lib/container/container_snapshot.js");
var lookup_1 = __webpack_require__(/*! ./lookup */ "./node_modules/inversify/lib/container/lookup.js");
var Container = (function () {
    function Container(containerOptions) {
        var options = containerOptions || {};
        if (typeof options !== "object") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT);
        }
        if (options.defaultScope === undefined) {
            options.defaultScope = literal_types_1.BindingScopeEnum.Transient;
        }
        else if (options.defaultScope !== literal_types_1.BindingScopeEnum.Singleton &&
            options.defaultScope !== literal_types_1.BindingScopeEnum.Transient &&
            options.defaultScope !== literal_types_1.BindingScopeEnum.Request) {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
        }
        if (options.autoBindInjectable === undefined) {
            options.autoBindInjectable = false;
        }
        else if (typeof options.autoBindInjectable !== "boolean") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE);
        }
        if (options.skipBaseClassChecks === undefined) {
            options.skipBaseClassChecks = false;
        }
        else if (typeof options.skipBaseClassChecks !== "boolean") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK);
        }
        this.options = {
            autoBindInjectable: options.autoBindInjectable,
            defaultScope: options.defaultScope,
            skipBaseClassChecks: options.skipBaseClassChecks
        };
        this.id = id_1.id();
        this._bindingDictionary = new lookup_1.Lookup();
        this._snapshots = [];
        this._middleware = null;
        this.parent = null;
        this._metadataReader = new metadata_reader_1.MetadataReader();
    }
    Container.merge = function (container1, container2) {
        var container = new Container();
        var bindingDictionary = planner_1.getBindingDictionary(container);
        var bindingDictionary1 = planner_1.getBindingDictionary(container1);
        var bindingDictionary2 = planner_1.getBindingDictionary(container2);
        function copyDictionary(origin, destination) {
            origin.traverse(function (key, value) {
                value.forEach(function (binding) {
                    destination.add(binding.serviceIdentifier, binding.clone());
                });
            });
        }
        copyDictionary(bindingDictionary1, bindingDictionary);
        copyDictionary(bindingDictionary2, bindingDictionary);
        return container;
    };
    Container.prototype.load = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        var getHelpers = this._getContainerModuleHelpersFactory();
        for (var _a = 0, modules_1 = modules; _a < modules_1.length; _a++) {
            var currentModule = modules_1[_a];
            var containerModuleHelpers = getHelpers(currentModule.id);
            currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction);
        }
    };
    Container.prototype.loadAsync = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var getHelpers, _a, modules_2, currentModule, containerModuleHelpers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        getHelpers = this._getContainerModuleHelpersFactory();
                        _a = 0, modules_2 = modules;
                        _b.label = 1;
                    case 1:
                        if (!(_a < modules_2.length)) return [3, 4];
                        currentModule = modules_2[_a];
                        containerModuleHelpers = getHelpers(currentModule.id);
                        return [4, currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    Container.prototype.unload = function () {
        var _this = this;
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        var conditionFactory = function (expected) { return function (item) {
            return item.moduleId === expected;
        }; };
        modules.forEach(function (module) {
            var condition = conditionFactory(module.id);
            _this._bindingDictionary.removeByCondition(condition);
        });
    };
    Container.prototype.bind = function (serviceIdentifier) {
        var scope = this.options.defaultScope || literal_types_1.BindingScopeEnum.Transient;
        var binding = new binding_1.Binding(serviceIdentifier, scope);
        this._bindingDictionary.add(serviceIdentifier, binding);
        return new binding_to_syntax_1.BindingToSyntax(binding);
    };
    Container.prototype.rebind = function (serviceIdentifier) {
        this.unbind(serviceIdentifier);
        return this.bind(serviceIdentifier);
    };
    Container.prototype.unbind = function (serviceIdentifier) {
        try {
            this._bindingDictionary.remove(serviceIdentifier);
        }
        catch (e) {
            throw new Error(ERROR_MSGS.CANNOT_UNBIND + " " + serialization_1.getServiceIdentifierAsString(serviceIdentifier));
        }
    };
    Container.prototype.unbindAll = function () {
        this._bindingDictionary = new lookup_1.Lookup();
    };
    Container.prototype.isBound = function (serviceIdentifier) {
        var bound = this._bindingDictionary.hasKey(serviceIdentifier);
        if (!bound && this.parent) {
            bound = this.parent.isBound(serviceIdentifier);
        }
        return bound;
    };
    Container.prototype.isBoundNamed = function (serviceIdentifier, named) {
        return this.isBoundTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.isBoundTagged = function (serviceIdentifier, key, value) {
        var bound = false;
        if (this._bindingDictionary.hasKey(serviceIdentifier)) {
            var bindings = this._bindingDictionary.get(serviceIdentifier);
            var request_1 = planner_1.createMockRequest(this, serviceIdentifier, key, value);
            bound = bindings.some(function (b) { return b.constraint(request_1); });
        }
        if (!bound && this.parent) {
            bound = this.parent.isBoundTagged(serviceIdentifier, key, value);
        }
        return bound;
    };
    Container.prototype.snapshot = function () {
        this._snapshots.push(container_snapshot_1.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware));
    };
    Container.prototype.restore = function () {
        var snapshot = this._snapshots.pop();
        if (snapshot === undefined) {
            throw new Error(ERROR_MSGS.NO_MORE_SNAPSHOTS_AVAILABLE);
        }
        this._bindingDictionary = snapshot.bindings;
        this._middleware = snapshot.middleware;
    };
    Container.prototype.createChild = function (containerOptions) {
        var child = new Container(containerOptions || this.options);
        child.parent = this;
        return child;
    };
    Container.prototype.applyMiddleware = function () {
        var middlewares = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middlewares[_i] = arguments[_i];
        }
        var initial = (this._middleware) ? this._middleware : this._planAndResolve();
        this._middleware = middlewares.reduce(function (prev, curr) { return curr(prev); }, initial);
    };
    Container.prototype.applyCustomMetadataReader = function (metadataReader) {
        this._metadataReader = metadataReader;
    };
    Container.prototype.get = function (serviceIdentifier) {
        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
    };
    Container.prototype.getTagged = function (serviceIdentifier, key, value) {
        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
    };
    Container.prototype.getNamed = function (serviceIdentifier, named) {
        return this.getTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.getAll = function (serviceIdentifier) {
        return this._get(true, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
    };
    Container.prototype.getAllTagged = function (serviceIdentifier, key, value) {
        return this._get(false, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
    };
    Container.prototype.getAllNamed = function (serviceIdentifier, named) {
        return this.getAllTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.resolve = function (constructorFunction) {
        var tempContainer = this.createChild();
        tempContainer.bind(constructorFunction).toSelf();
        return tempContainer.get(constructorFunction);
    };
    Container.prototype._getContainerModuleHelpersFactory = function () {
        var _this = this;
        var setModuleId = function (bindingToSyntax, moduleId) {
            bindingToSyntax._binding.moduleId = moduleId;
        };
        var getBindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _bind = _this.bind.bind(_this);
                var bindingToSyntax = _bind(serviceIdentifier);
                setModuleId(bindingToSyntax, moduleId);
                return bindingToSyntax;
            };
        };
        var getUnbindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _unbind = _this.unbind.bind(_this);
                _unbind(serviceIdentifier);
            };
        };
        var getIsboundFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _isBound = _this.isBound.bind(_this);
                return _isBound(serviceIdentifier);
            };
        };
        var getRebindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _rebind = _this.rebind.bind(_this);
                var bindingToSyntax = _rebind(serviceIdentifier);
                setModuleId(bindingToSyntax, moduleId);
                return bindingToSyntax;
            };
        };
        return function (mId) { return ({
            bindFunction: getBindFunction(mId),
            isboundFunction: getIsboundFunction(mId),
            rebindFunction: getRebindFunction(mId),
            unbindFunction: getUnbindFunction(mId)
        }); };
    };
    Container.prototype._get = function (avoidConstraints, isMultiInject, targetType, serviceIdentifier, key, value) {
        var result = null;
        var defaultArgs = {
            avoidConstraints: avoidConstraints,
            contextInterceptor: function (context) { return context; },
            isMultiInject: isMultiInject,
            key: key,
            serviceIdentifier: serviceIdentifier,
            targetType: targetType,
            value: value
        };
        if (this._middleware) {
            result = this._middleware(defaultArgs);
            if (result === undefined || result === null) {
                throw new Error(ERROR_MSGS.INVALID_MIDDLEWARE_RETURN);
            }
        }
        else {
            result = this._planAndResolve()(defaultArgs);
        }
        return result;
    };
    Container.prototype._planAndResolve = function () {
        var _this = this;
        return function (args) {
            var context = planner_1.plan(_this._metadataReader, _this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
            context = args.contextInterceptor(context);
            var result = resolver_1.resolve(context);
            return result;
        };
    };
    return Container;
}());
exports.Container = Container;


/***/ }),

/***/ "./node_modules/inversify/lib/container/container_module.js":
/*!******************************************************************!*\
  !*** ./node_modules/inversify/lib/container/container_module.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var ContainerModule = (function () {
    function ContainerModule(registry) {
        this.id = id_1.id();
        this.registry = registry;
    }
    return ContainerModule;
}());
exports.ContainerModule = ContainerModule;
var AsyncContainerModule = (function () {
    function AsyncContainerModule(registry) {
        this.id = id_1.id();
        this.registry = registry;
    }
    return AsyncContainerModule;
}());
exports.AsyncContainerModule = AsyncContainerModule;


/***/ }),

/***/ "./node_modules/inversify/lib/container/container_snapshot.js":
/*!********************************************************************!*\
  !*** ./node_modules/inversify/lib/container/container_snapshot.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContainerSnapshot = (function () {
    function ContainerSnapshot() {
    }
    ContainerSnapshot.of = function (bindings, middleware) {
        var snapshot = new ContainerSnapshot();
        snapshot.bindings = bindings;
        snapshot.middleware = middleware;
        return snapshot;
    };
    return ContainerSnapshot;
}());
exports.ContainerSnapshot = ContainerSnapshot;


/***/ }),

/***/ "./node_modules/inversify/lib/container/lookup.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/container/lookup.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var Lookup = (function () {
    function Lookup() {
        this._map = new Map();
    }
    Lookup.prototype.getMap = function () {
        return this._map;
    };
    Lookup.prototype.add = function (serviceIdentifier, value) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        if (value === null || value === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        var entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            entry.push(value);
            this._map.set(serviceIdentifier, entry);
        }
        else {
            this._map.set(serviceIdentifier, [value]);
        }
    };
    Lookup.prototype.get = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        var entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            return entry;
        }
        else {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }
    };
    Lookup.prototype.remove = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        if (!this._map.delete(serviceIdentifier)) {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }
    };
    Lookup.prototype.removeByCondition = function (condition) {
        var _this = this;
        this._map.forEach(function (entries, key) {
            var updatedEntries = entries.filter(function (entry) { return !condition(entry); });
            if (updatedEntries.length > 0) {
                _this._map.set(key, updatedEntries);
            }
            else {
                _this._map.delete(key);
            }
        });
    };
    Lookup.prototype.hasKey = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        return this._map.has(serviceIdentifier);
    };
    Lookup.prototype.clone = function () {
        var copy = new Lookup();
        this._map.forEach(function (value, key) {
            value.forEach(function (b) { return copy.add(key, b.clone()); });
        });
        return copy;
    };
    Lookup.prototype.traverse = function (func) {
        this._map.forEach(function (value, key) {
            func(key, value);
        });
    };
    return Lookup;
}());
exports.Lookup = Lookup;


/***/ }),

/***/ "./node_modules/inversify/lib/inversify.js":
/*!*************************************************!*\
  !*** ./node_modules/inversify/lib/inversify.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keys = __webpack_require__(/*! ./constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
exports.METADATA_KEY = keys;
var container_1 = __webpack_require__(/*! ./container/container */ "./node_modules/inversify/lib/container/container.js");
exports.Container = container_1.Container;
var literal_types_1 = __webpack_require__(/*! ./constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
exports.BindingScopeEnum = literal_types_1.BindingScopeEnum;
exports.BindingTypeEnum = literal_types_1.BindingTypeEnum;
exports.TargetTypeEnum = literal_types_1.TargetTypeEnum;
var container_module_1 = __webpack_require__(/*! ./container/container_module */ "./node_modules/inversify/lib/container/container_module.js");
exports.AsyncContainerModule = container_module_1.AsyncContainerModule;
exports.ContainerModule = container_module_1.ContainerModule;
var injectable_1 = __webpack_require__(/*! ./annotation/injectable */ "./node_modules/inversify/lib/annotation/injectable.js");
exports.injectable = injectable_1.injectable;
var tagged_1 = __webpack_require__(/*! ./annotation/tagged */ "./node_modules/inversify/lib/annotation/tagged.js");
exports.tagged = tagged_1.tagged;
var named_1 = __webpack_require__(/*! ./annotation/named */ "./node_modules/inversify/lib/annotation/named.js");
exports.named = named_1.named;
var inject_1 = __webpack_require__(/*! ./annotation/inject */ "./node_modules/inversify/lib/annotation/inject.js");
exports.inject = inject_1.inject;
exports.LazyServiceIdentifer = inject_1.LazyServiceIdentifer;
var optional_1 = __webpack_require__(/*! ./annotation/optional */ "./node_modules/inversify/lib/annotation/optional.js");
exports.optional = optional_1.optional;
var unmanaged_1 = __webpack_require__(/*! ./annotation/unmanaged */ "./node_modules/inversify/lib/annotation/unmanaged.js");
exports.unmanaged = unmanaged_1.unmanaged;
var multi_inject_1 = __webpack_require__(/*! ./annotation/multi_inject */ "./node_modules/inversify/lib/annotation/multi_inject.js");
exports.multiInject = multi_inject_1.multiInject;
var target_name_1 = __webpack_require__(/*! ./annotation/target_name */ "./node_modules/inversify/lib/annotation/target_name.js");
exports.targetName = target_name_1.targetName;
var post_construct_1 = __webpack_require__(/*! ./annotation/post_construct */ "./node_modules/inversify/lib/annotation/post_construct.js");
exports.postConstruct = post_construct_1.postConstruct;
var metadata_reader_1 = __webpack_require__(/*! ./planning/metadata_reader */ "./node_modules/inversify/lib/planning/metadata_reader.js");
exports.MetadataReader = metadata_reader_1.MetadataReader;
var id_1 = __webpack_require__(/*! ./utils/id */ "./node_modules/inversify/lib/utils/id.js");
exports.id = id_1.id;
var decorator_utils_1 = __webpack_require__(/*! ./annotation/decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
exports.decorate = decorator_utils_1.decorate;
var constraint_helpers_1 = __webpack_require__(/*! ./syntax/constraint_helpers */ "./node_modules/inversify/lib/syntax/constraint_helpers.js");
exports.traverseAncerstors = constraint_helpers_1.traverseAncerstors;
exports.taggedConstraint = constraint_helpers_1.taggedConstraint;
exports.namedConstraint = constraint_helpers_1.namedConstraint;
exports.typeConstraint = constraint_helpers_1.typeConstraint;
var serialization_1 = __webpack_require__(/*! ./utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
exports.getServiceIdentifierAsString = serialization_1.getServiceIdentifierAsString;
var binding_utils_1 = __webpack_require__(/*! ./utils/binding_utils */ "./node_modules/inversify/lib/utils/binding_utils.js");
exports.multiBindToService = binding_utils_1.multiBindToService;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/context.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/planning/context.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var Context = (function () {
    function Context(container) {
        this.id = id_1.id();
        this.container = container;
    }
    Context.prototype.addPlan = function (plan) {
        this.plan = plan;
    };
    Context.prototype.setCurrentRequest = function (currentRequest) {
        this.currentRequest = currentRequest;
    };
    return Context;
}());
exports.Context = Context;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/metadata.js":
/*!*********************************************************!*\
  !*** ./node_modules/inversify/lib/planning/metadata.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var Metadata = (function () {
    function Metadata(key, value) {
        this.key = key;
        this.value = value;
    }
    Metadata.prototype.toString = function () {
        if (this.key === METADATA_KEY.NAMED_TAG) {
            return "named: " + this.value.toString() + " ";
        }
        else {
            return "tagged: { key:" + this.key.toString() + ", value: " + this.value + " }";
        }
    };
    return Metadata;
}());
exports.Metadata = Metadata;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/metadata_reader.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/planning/metadata_reader.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var MetadataReader = (function () {
    function MetadataReader() {
    }
    MetadataReader.prototype.getConstructorMetadata = function (constructorFunc) {
        var compilerGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, constructorFunc);
        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED, constructorFunc);
        return {
            compilerGeneratedMetadata: compilerGeneratedMetadata,
            userGeneratedMetadata: userGeneratedMetadata || {}
        };
    };
    MetadataReader.prototype.getPropertiesMetadata = function (constructorFunc) {
        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED_PROP, constructorFunc) || [];
        return userGeneratedMetadata;
    };
    return MetadataReader;
}());
exports.MetadataReader = MetadataReader;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/plan.js":
/*!*****************************************************!*\
  !*** ./node_modules/inversify/lib/planning/plan.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Plan = (function () {
    function Plan(parentContext, rootRequest) {
        this.parentContext = parentContext;
        this.rootRequest = rootRequest;
    }
    return Plan;
}());
exports.Plan = Plan;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/planner.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/planning/planner.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_count_1 = __webpack_require__(/*! ../bindings/binding_count */ "./node_modules/inversify/lib/bindings/binding_count.js");
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./node_modules/inversify/lib/utils/exceptions.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
var context_1 = __webpack_require__(/*! ./context */ "./node_modules/inversify/lib/planning/context.js");
var metadata_1 = __webpack_require__(/*! ./metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var plan_1 = __webpack_require__(/*! ./plan */ "./node_modules/inversify/lib/planning/plan.js");
var reflection_utils_1 = __webpack_require__(/*! ./reflection_utils */ "./node_modules/inversify/lib/planning/reflection_utils.js");
var request_1 = __webpack_require__(/*! ./request */ "./node_modules/inversify/lib/planning/request.js");
var target_1 = __webpack_require__(/*! ./target */ "./node_modules/inversify/lib/planning/target.js");
function getBindingDictionary(cntnr) {
    return cntnr._bindingDictionary;
}
exports.getBindingDictionary = getBindingDictionary;
function _createTarget(isMultiInject, targetType, serviceIdentifier, name, key, value) {
    var metadataKey = isMultiInject ? METADATA_KEY.MULTI_INJECT_TAG : METADATA_KEY.INJECT_TAG;
    var injectMetadata = new metadata_1.Metadata(metadataKey, serviceIdentifier);
    var target = new target_1.Target(targetType, name, serviceIdentifier, injectMetadata);
    if (key !== undefined) {
        var tagMetadata = new metadata_1.Metadata(key, value);
        target.metadata.push(tagMetadata);
    }
    return target;
}
function _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target) {
    var bindings = getBindings(context.container, target.serviceIdentifier);
    var activeBindings = [];
    if (bindings.length === binding_count_1.BindingCount.NoBindingsAvailable &&
        context.container.options.autoBindInjectable &&
        typeof target.serviceIdentifier === "function" &&
        metadataReader.getConstructorMetadata(target.serviceIdentifier).compilerGeneratedMetadata) {
        context.container.bind(target.serviceIdentifier).toSelf();
        bindings = getBindings(context.container, target.serviceIdentifier);
    }
    if (!avoidConstraints) {
        activeBindings = bindings.filter(function (binding) {
            var request = new request_1.Request(binding.serviceIdentifier, context, parentRequest, binding, target);
            return binding.constraint(request);
        });
    }
    else {
        activeBindings = bindings;
    }
    _validateActiveBindingCount(target.serviceIdentifier, activeBindings, target, context.container);
    return activeBindings;
}
function _validateActiveBindingCount(serviceIdentifier, bindings, target, container) {
    switch (bindings.length) {
        case binding_count_1.BindingCount.NoBindingsAvailable:
            if (target.isOptional()) {
                return bindings;
            }
            else {
                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
                var msg = ERROR_MSGS.NOT_REGISTERED;
                msg += serialization_1.listMetadataForTarget(serviceIdentifierString, target);
                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
                throw new Error(msg);
            }
        case binding_count_1.BindingCount.OnlyOneBindingAvailable:
            if (!target.isArray()) {
                return bindings;
            }
        case binding_count_1.BindingCount.MultipleBindingsAvailable:
        default:
            if (!target.isArray()) {
                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
                var msg = ERROR_MSGS.AMBIGUOUS_MATCH + " " + serviceIdentifierString;
                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
                throw new Error(msg);
            }
            else {
                return bindings;
            }
    }
}
function _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, parentRequest, target) {
    var activeBindings;
    var childRequest;
    if (parentRequest === null) {
        activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, null, target);
        childRequest = new request_1.Request(serviceIdentifier, context, null, activeBindings, target);
        var thePlan = new plan_1.Plan(context, childRequest);
        context.addPlan(thePlan);
    }
    else {
        activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target);
        childRequest = parentRequest.addChildRequest(target.serviceIdentifier, activeBindings, target);
    }
    activeBindings.forEach(function (binding) {
        var subChildRequest = null;
        if (target.isArray()) {
            subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target);
        }
        else {
            if (binding.cache) {
                return;
            }
            subChildRequest = childRequest;
        }
        if (binding.type === literal_types_1.BindingTypeEnum.Instance && binding.implementationType !== null) {
            var dependencies = reflection_utils_1.getDependencies(metadataReader, binding.implementationType);
            if (!context.container.options.skipBaseClassChecks) {
                var baseClassDependencyCount = reflection_utils_1.getBaseClassDependencyCount(metadataReader, binding.implementationType);
                if (dependencies.length < baseClassDependencyCount) {
                    var error = ERROR_MSGS.ARGUMENTS_LENGTH_MISMATCH(reflection_utils_1.getFunctionName(binding.implementationType));
                    throw new Error(error);
                }
            }
            dependencies.forEach(function (dependency) {
                _createSubRequests(metadataReader, false, dependency.serviceIdentifier, context, subChildRequest, dependency);
            });
        }
    });
}
function getBindings(container, serviceIdentifier) {
    var bindings = [];
    var bindingDictionary = getBindingDictionary(container);
    if (bindingDictionary.hasKey(serviceIdentifier)) {
        bindings = bindingDictionary.get(serviceIdentifier);
    }
    else if (container.parent !== null) {
        bindings = getBindings(container.parent, serviceIdentifier);
    }
    return bindings;
}
function plan(metadataReader, container, isMultiInject, targetType, serviceIdentifier, key, value, avoidConstraints) {
    if (avoidConstraints === void 0) { avoidConstraints = false; }
    var context = new context_1.Context(container);
    var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value);
    try {
        _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, null, target);
        return context;
    }
    catch (error) {
        if (exceptions_1.isStackOverflowExeption(error)) {
            if (context.plan) {
                serialization_1.circularDependencyToException(context.plan.rootRequest);
            }
        }
        throw error;
    }
}
exports.plan = plan;
function createMockRequest(container, serviceIdentifier, key, value) {
    var target = new target_1.Target(literal_types_1.TargetTypeEnum.Variable, "", serviceIdentifier, new metadata_1.Metadata(key, value));
    var context = new context_1.Context(container);
    var request = new request_1.Request(serviceIdentifier, context, null, [], target);
    return request;
}
exports.createMockRequest = createMockRequest;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/queryable_string.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/lib/planning/queryable_string.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var QueryableString = (function () {
    function QueryableString(str) {
        this.str = str;
    }
    QueryableString.prototype.startsWith = function (searchString) {
        return this.str.indexOf(searchString) === 0;
    };
    QueryableString.prototype.endsWith = function (searchString) {
        var reverseString = "";
        var reverseSearchString = searchString.split("").reverse().join("");
        reverseString = this.str.split("").reverse().join("");
        return this.startsWith.call({ str: reverseString }, reverseSearchString);
    };
    QueryableString.prototype.contains = function (searchString) {
        return (this.str.indexOf(searchString) !== -1);
    };
    QueryableString.prototype.equals = function (compareString) {
        return this.str === compareString;
    };
    QueryableString.prototype.value = function () {
        return this.str;
    };
    return QueryableString;
}());
exports.QueryableString = QueryableString;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/reflection_utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/lib/planning/reflection_utils.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inject_1 = __webpack_require__(/*! ../annotation/inject */ "./node_modules/inversify/lib/annotation/inject.js");
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
exports.getFunctionName = serialization_1.getFunctionName;
var target_1 = __webpack_require__(/*! ./target */ "./node_modules/inversify/lib/planning/target.js");
function getDependencies(metadataReader, func) {
    var constructorName = serialization_1.getFunctionName(func);
    var targets = getTargets(metadataReader, constructorName, func, false);
    return targets;
}
exports.getDependencies = getDependencies;
function getTargets(metadataReader, constructorName, func, isBaseClass) {
    var metadata = metadataReader.getConstructorMetadata(func);
    var serviceIdentifiers = metadata.compilerGeneratedMetadata;
    if (serviceIdentifiers === undefined) {
        var msg = ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
        throw new Error(msg);
    }
    var constructorArgsMetadata = metadata.userGeneratedMetadata;
    var keys = Object.keys(constructorArgsMetadata);
    var hasUserDeclaredUnknownInjections = (func.length === 0 && keys.length > 0);
    var iterations = (hasUserDeclaredUnknownInjections) ? keys.length : func.length;
    var constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
    var propertyTargets = getClassPropsAsTargets(metadataReader, func);
    var targets = constructorTargets.concat(propertyTargets);
    return targets;
}
function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
    var targetMetadata = constructorArgsMetadata[index.toString()] || [];
    var metadata = formatTargetMetadata(targetMetadata);
    var isManaged = metadata.unmanaged !== true;
    var serviceIdentifier = serviceIdentifiers[index];
    var injectIdentifier = (metadata.inject || metadata.multiInject);
    serviceIdentifier = (injectIdentifier) ? (injectIdentifier) : serviceIdentifier;
    if (serviceIdentifier instanceof inject_1.LazyServiceIdentifer) {
        serviceIdentifier = serviceIdentifier.unwrap();
    }
    if (isManaged) {
        var isObject = serviceIdentifier === Object;
        var isFunction = serviceIdentifier === Function;
        var isUndefined = serviceIdentifier === undefined;
        var isUnknownType = (isObject || isFunction || isUndefined);
        if (!isBaseClass && isUnknownType) {
            var msg = ERROR_MSGS.MISSING_INJECT_ANNOTATION + " argument " + index + " in class " + constructorName + ".";
            throw new Error(msg);
        }
        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier);
        target.metadata = targetMetadata;
        return target;
    }
    return null;
}
function getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations) {
    var targets = [];
    for (var i = 0; i < iterations; i++) {
        var index = i;
        var target = getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata);
        if (target !== null) {
            targets.push(target);
        }
    }
    return targets;
}
function getClassPropsAsTargets(metadataReader, constructorFunc) {
    var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
    var targets = [];
    var keys = Object.keys(classPropsMetadata);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var targetMetadata = classPropsMetadata[key];
        var metadata = formatTargetMetadata(classPropsMetadata[key]);
        var targetName = metadata.targetName || key;
        var serviceIdentifier = (metadata.inject || metadata.multiInject);
        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ClassProperty, targetName, serviceIdentifier);
        target.metadata = targetMetadata;
        targets.push(target);
    }
    var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;
    if (baseConstructor !== Object) {
        var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor);
        targets = targets.concat(baseTargets);
    }
    return targets;
}
function getBaseClassDependencyCount(metadataReader, func) {
    var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
    if (baseConstructor !== Object) {
        var baseConstructorName = serialization_1.getFunctionName(baseConstructor);
        var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
        var metadata = targets.map(function (t) {
            return t.metadata.filter(function (m) {
                return m.key === METADATA_KEY.UNMANAGED_TAG;
            });
        });
        var unmanagedCount = [].concat.apply([], metadata).length;
        var dependencyCount = targets.length - unmanagedCount;
        if (dependencyCount > 0) {
            return dependencyCount;
        }
        else {
            return getBaseClassDependencyCount(metadataReader, baseConstructor);
        }
    }
    else {
        return 0;
    }
}
exports.getBaseClassDependencyCount = getBaseClassDependencyCount;
function formatTargetMetadata(targetMetadata) {
    var targetMetadataMap = {};
    targetMetadata.forEach(function (m) {
        targetMetadataMap[m.key.toString()] = m.value;
    });
    return {
        inject: targetMetadataMap[METADATA_KEY.INJECT_TAG],
        multiInject: targetMetadataMap[METADATA_KEY.MULTI_INJECT_TAG],
        targetName: targetMetadataMap[METADATA_KEY.NAME_TAG],
        unmanaged: targetMetadataMap[METADATA_KEY.UNMANAGED_TAG]
    };
}


/***/ }),

/***/ "./node_modules/inversify/lib/planning/request.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/planning/request.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var Request = (function () {
    function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
        this.id = id_1.id();
        this.serviceIdentifier = serviceIdentifier;
        this.parentContext = parentContext;
        this.parentRequest = parentRequest;
        this.target = target;
        this.childRequests = [];
        this.bindings = (Array.isArray(bindings) ? bindings : [bindings]);
        this.requestScope = parentRequest === null
            ? new Map()
            : null;
    }
    Request.prototype.addChildRequest = function (serviceIdentifier, bindings, target) {
        var child = new Request(serviceIdentifier, this.parentContext, this, bindings, target);
        this.childRequests.push(child);
        return child;
    };
    return Request;
}());
exports.Request = Request;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/target.js":
/*!*******************************************************!*\
  !*** ./node_modules/inversify/lib/planning/target.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var metadata_1 = __webpack_require__(/*! ./metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var queryable_string_1 = __webpack_require__(/*! ./queryable_string */ "./node_modules/inversify/lib/planning/queryable_string.js");
var Target = (function () {
    function Target(type, name, serviceIdentifier, namedOrTagged) {
        this.id = id_1.id();
        this.type = type;
        this.serviceIdentifier = serviceIdentifier;
        this.name = new queryable_string_1.QueryableString(name || "");
        this.metadata = new Array();
        var metadataItem = null;
        if (typeof namedOrTagged === "string") {
            metadataItem = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, namedOrTagged);
        }
        else if (namedOrTagged instanceof metadata_1.Metadata) {
            metadataItem = namedOrTagged;
        }
        if (metadataItem !== null) {
            this.metadata.push(metadataItem);
        }
    }
    Target.prototype.hasTag = function (key) {
        for (var _i = 0, _a = this.metadata; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.key === key) {
                return true;
            }
        }
        return false;
    };
    Target.prototype.isArray = function () {
        return this.hasTag(METADATA_KEY.MULTI_INJECT_TAG);
    };
    Target.prototype.matchesArray = function (name) {
        return this.matchesTag(METADATA_KEY.MULTI_INJECT_TAG)(name);
    };
    Target.prototype.isNamed = function () {
        return this.hasTag(METADATA_KEY.NAMED_TAG);
    };
    Target.prototype.isTagged = function () {
        return this.metadata.some(function (m) {
            return (m.key !== METADATA_KEY.INJECT_TAG) &&
                (m.key !== METADATA_KEY.MULTI_INJECT_TAG) &&
                (m.key !== METADATA_KEY.NAME_TAG) &&
                (m.key !== METADATA_KEY.UNMANAGED_TAG) &&
                (m.key !== METADATA_KEY.NAMED_TAG);
        });
    };
    Target.prototype.isOptional = function () {
        return this.matchesTag(METADATA_KEY.OPTIONAL_TAG)(true);
    };
    Target.prototype.getNamedTag = function () {
        if (this.isNamed()) {
            return this.metadata.filter(function (m) { return m.key === METADATA_KEY.NAMED_TAG; })[0];
        }
        return null;
    };
    Target.prototype.getCustomTags = function () {
        if (this.isTagged()) {
            return this.metadata.filter(function (m) {
                return (m.key !== METADATA_KEY.INJECT_TAG) &&
                    (m.key !== METADATA_KEY.MULTI_INJECT_TAG) &&
                    (m.key !== METADATA_KEY.NAME_TAG) &&
                    (m.key !== METADATA_KEY.UNMANAGED_TAG) &&
                    (m.key !== METADATA_KEY.NAMED_TAG);
            });
        }
        return null;
    };
    Target.prototype.matchesNamedTag = function (name) {
        return this.matchesTag(METADATA_KEY.NAMED_TAG)(name);
    };
    Target.prototype.matchesTag = function (key) {
        var _this = this;
        return function (value) {
            for (var _i = 0, _a = _this.metadata; _i < _a.length; _i++) {
                var m = _a[_i];
                if (m.key === key && m.value === value) {
                    return true;
                }
            }
            return false;
        };
    };
    return Target;
}());
exports.Target = Target;


/***/ }),

/***/ "./node_modules/inversify/lib/resolution/instantiation.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/resolution/instantiation.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var error_msgs_1 = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
function _injectProperties(instance, childRequests, resolveRequest) {
    var propertyInjectionsRequests = childRequests.filter(function (childRequest) {
        return (childRequest.target !== null &&
            childRequest.target.type === literal_types_1.TargetTypeEnum.ClassProperty);
    });
    var propertyInjections = propertyInjectionsRequests.map(resolveRequest);
    propertyInjectionsRequests.forEach(function (r, index) {
        var propertyName = "";
        propertyName = r.target.name.value();
        var injection = propertyInjections[index];
        instance[propertyName] = injection;
    });
    return instance;
}
function _createInstance(Func, injections) {
    return new (Func.bind.apply(Func, [void 0].concat(injections)))();
}
function _postConstruct(constr, result) {
    if (Reflect.hasMetadata(METADATA_KEY.POST_CONSTRUCT, constr)) {
        var data = Reflect.getMetadata(METADATA_KEY.POST_CONSTRUCT, constr);
        try {
            result[data.value]();
        }
        catch (e) {
            throw new Error(error_msgs_1.POST_CONSTRUCT_ERROR(constr.name, e.message));
        }
    }
}
function resolveInstance(constr, childRequests, resolveRequest) {
    var result = null;
    if (childRequests.length > 0) {
        var constructorInjectionsRequests = childRequests.filter(function (childRequest) {
            return (childRequest.target !== null && childRequest.target.type === literal_types_1.TargetTypeEnum.ConstructorArgument);
        });
        var constructorInjections = constructorInjectionsRequests.map(resolveRequest);
        result = _createInstance(constr, constructorInjections);
        result = _injectProperties(result, childRequests, resolveRequest);
    }
    else {
        result = new constr();
    }
    _postConstruct(constr, result);
    return result;
}
exports.resolveInstance = resolveInstance;


/***/ }),

/***/ "./node_modules/inversify/lib/resolution/resolver.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/resolution/resolver.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./node_modules/inversify/lib/utils/exceptions.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
var instantiation_1 = __webpack_require__(/*! ./instantiation */ "./node_modules/inversify/lib/resolution/instantiation.js");
var invokeFactory = function (factoryType, serviceIdentifier, fn) {
    try {
        return fn();
    }
    catch (error) {
        if (exceptions_1.isStackOverflowExeption(error)) {
            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY_IN_FACTORY(factoryType, serviceIdentifier.toString()));
        }
        else {
            throw error;
        }
    }
};
var _resolveRequest = function (requestScope) {
    return function (request) {
        request.parentContext.setCurrentRequest(request);
        var bindings = request.bindings;
        var childRequests = request.childRequests;
        var targetIsAnArray = request.target && request.target.isArray();
        var targetParentIsNotAnArray = !request.parentRequest ||
            !request.parentRequest.target ||
            !request.target ||
            !request.parentRequest.target.matchesArray(request.target.serviceIdentifier);
        if (targetIsAnArray && targetParentIsNotAnArray) {
            return childRequests.map(function (childRequest) {
                var _f = _resolveRequest(requestScope);
                return _f(childRequest);
            });
        }
        else {
            var result = null;
            if (request.target.isOptional() && bindings.length === 0) {
                return undefined;
            }
            var binding_1 = bindings[0];
            var isSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Singleton;
            var isRequestSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Request;
            if (isSingleton && binding_1.activated) {
                return binding_1.cache;
            }
            if (isRequestSingleton &&
                requestScope !== null &&
                requestScope.has(binding_1.id)) {
                return requestScope.get(binding_1.id);
            }
            if (binding_1.type === literal_types_1.BindingTypeEnum.ConstantValue) {
                result = binding_1.cache;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Function) {
                result = binding_1.cache;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Constructor) {
                result = binding_1.implementationType;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.DynamicValue && binding_1.dynamicValue !== null) {
                result = invokeFactory("toDynamicValue", binding_1.serviceIdentifier, function () { return binding_1.dynamicValue(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Factory && binding_1.factory !== null) {
                result = invokeFactory("toFactory", binding_1.serviceIdentifier, function () { return binding_1.factory(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Provider && binding_1.provider !== null) {
                result = invokeFactory("toProvider", binding_1.serviceIdentifier, function () { return binding_1.provider(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Instance && binding_1.implementationType !== null) {
                result = instantiation_1.resolveInstance(binding_1.implementationType, childRequests, _resolveRequest(requestScope));
            }
            else {
                var serviceIdentifier = serialization_1.getServiceIdentifierAsString(request.serviceIdentifier);
                throw new Error(ERROR_MSGS.INVALID_BINDING_TYPE + " " + serviceIdentifier);
            }
            if (typeof binding_1.onActivation === "function") {
                result = binding_1.onActivation(request.parentContext, result);
            }
            if (isSingleton) {
                binding_1.cache = result;
                binding_1.activated = true;
            }
            if (isRequestSingleton &&
                requestScope !== null &&
                !requestScope.has(binding_1.id)) {
                requestScope.set(binding_1.id, result);
            }
            return result;
        }
    };
};
function resolve(context) {
    var _f = _resolveRequest(context.plan.rootRequest.requestScope);
    return _f(context.plan.rootRequest);
}
exports.resolve = resolve;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_in_syntax.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_in_syntax.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var binding_when_on_syntax_1 = __webpack_require__(/*! ./binding_when_on_syntax */ "./node_modules/inversify/lib/syntax/binding_when_on_syntax.js");
var BindingInSyntax = (function () {
    function BindingInSyntax(binding) {
        this._binding = binding;
    }
    BindingInSyntax.prototype.inRequestScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Request;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingInSyntax.prototype.inSingletonScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingInSyntax.prototype.inTransientScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Transient;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    return BindingInSyntax;
}());
exports.BindingInSyntax = BindingInSyntax;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js":
/*!************************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_in_syntax_1 = __webpack_require__(/*! ./binding_in_syntax */ "./node_modules/inversify/lib/syntax/binding_in_syntax.js");
var binding_on_syntax_1 = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/inversify/lib/syntax/binding_on_syntax.js");
var binding_when_syntax_1 = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/inversify/lib/syntax/binding_when_syntax.js");
var BindingInWhenOnSyntax = (function () {
    function BindingInWhenOnSyntax(binding) {
        this._binding = binding;
        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
        this._bindingInSyntax = new binding_in_syntax_1.BindingInSyntax(binding);
    }
    BindingInWhenOnSyntax.prototype.inRequestScope = function () {
        return this._bindingInSyntax.inRequestScope();
    };
    BindingInWhenOnSyntax.prototype.inSingletonScope = function () {
        return this._bindingInSyntax.inSingletonScope();
    };
    BindingInWhenOnSyntax.prototype.inTransientScope = function () {
        return this._bindingInSyntax.inTransientScope();
    };
    BindingInWhenOnSyntax.prototype.when = function (constraint) {
        return this._bindingWhenSyntax.when(constraint);
    };
    BindingInWhenOnSyntax.prototype.whenTargetNamed = function (name) {
        return this._bindingWhenSyntax.whenTargetNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenTargetIsDefault = function () {
        return this._bindingWhenSyntax.whenTargetIsDefault();
    };
    BindingInWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
        return this._bindingWhenSyntax.whenInjectedInto(parent);
    };
    BindingInWhenOnSyntax.prototype.whenParentNamed = function (name) {
        return this._bindingWhenSyntax.whenParentNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenParentTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
    };
    BindingInWhenOnSyntax.prototype.onActivation = function (handler) {
        return this._bindingOnSyntax.onActivation(handler);
    };
    return BindingInWhenOnSyntax;
}());
exports.BindingInWhenOnSyntax = BindingInWhenOnSyntax;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_on_syntax.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_on_syntax.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_when_syntax_1 = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/inversify/lib/syntax/binding_when_syntax.js");
var BindingOnSyntax = (function () {
    function BindingOnSyntax(binding) {
        this._binding = binding;
    }
    BindingOnSyntax.prototype.onActivation = function (handler) {
        this._binding.onActivation = handler;
        return new binding_when_syntax_1.BindingWhenSyntax(this._binding);
    };
    return BindingOnSyntax;
}());
exports.BindingOnSyntax = BindingOnSyntax;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_to_syntax.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_to_syntax.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var binding_in_when_on_syntax_1 = __webpack_require__(/*! ./binding_in_when_on_syntax */ "./node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js");
var binding_when_on_syntax_1 = __webpack_require__(/*! ./binding_when_on_syntax */ "./node_modules/inversify/lib/syntax/binding_when_on_syntax.js");
var BindingToSyntax = (function () {
    function BindingToSyntax(binding) {
        this._binding = binding;
    }
    BindingToSyntax.prototype.to = function (constructor) {
        this._binding.type = literal_types_1.BindingTypeEnum.Instance;
        this._binding.implementationType = constructor;
        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toSelf = function () {
        if (typeof this._binding.serviceIdentifier !== "function") {
            throw new Error("" + ERROR_MSGS.INVALID_TO_SELF_VALUE);
        }
        var self = this._binding.serviceIdentifier;
        return this.to(self);
    };
    BindingToSyntax.prototype.toConstantValue = function (value) {
        this._binding.type = literal_types_1.BindingTypeEnum.ConstantValue;
        this._binding.cache = value;
        this._binding.dynamicValue = null;
        this._binding.implementationType = null;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toDynamicValue = function (func) {
        this._binding.type = literal_types_1.BindingTypeEnum.DynamicValue;
        this._binding.cache = null;
        this._binding.dynamicValue = func;
        this._binding.implementationType = null;
        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toConstructor = function (constructor) {
        this._binding.type = literal_types_1.BindingTypeEnum.Constructor;
        this._binding.implementationType = constructor;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toFactory = function (factory) {
        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
        this._binding.factory = factory;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toFunction = function (func) {
        if (typeof func !== "function") {
            throw new Error(ERROR_MSGS.INVALID_FUNCTION_BINDING);
        }
        var bindingWhenOnSyntax = this.toConstantValue(func);
        this._binding.type = literal_types_1.BindingTypeEnum.Function;
        return bindingWhenOnSyntax;
    };
    BindingToSyntax.prototype.toAutoFactory = function (serviceIdentifier) {
        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
        this._binding.factory = function (context) {
            var autofactory = function () { return context.container.get(serviceIdentifier); };
            return autofactory;
        };
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toProvider = function (provider) {
        this._binding.type = literal_types_1.BindingTypeEnum.Provider;
        this._binding.provider = provider;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toService = function (service) {
        this.toDynamicValue(function (context) { return context.container.get(service); });
    };
    return BindingToSyntax;
}());
exports.BindingToSyntax = BindingToSyntax;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_when_on_syntax.js":
/*!*********************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_when_on_syntax.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_on_syntax_1 = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/inversify/lib/syntax/binding_on_syntax.js");
var binding_when_syntax_1 = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/inversify/lib/syntax/binding_when_syntax.js");
var BindingWhenOnSyntax = (function () {
    function BindingWhenOnSyntax(binding) {
        this._binding = binding;
        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    BindingWhenOnSyntax.prototype.when = function (constraint) {
        return this._bindingWhenSyntax.when(constraint);
    };
    BindingWhenOnSyntax.prototype.whenTargetNamed = function (name) {
        return this._bindingWhenSyntax.whenTargetNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenTargetIsDefault = function () {
        return this._bindingWhenSyntax.whenTargetIsDefault();
    };
    BindingWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
        return this._bindingWhenSyntax.whenInjectedInto(parent);
    };
    BindingWhenOnSyntax.prototype.whenParentNamed = function (name) {
        return this._bindingWhenSyntax.whenParentNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenParentTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
    };
    BindingWhenOnSyntax.prototype.onActivation = function (handler) {
        return this._bindingOnSyntax.onActivation(handler);
    };
    return BindingWhenOnSyntax;
}());
exports.BindingWhenOnSyntax = BindingWhenOnSyntax;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_when_syntax.js":
/*!******************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_when_syntax.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_on_syntax_1 = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/inversify/lib/syntax/binding_on_syntax.js");
var constraint_helpers_1 = __webpack_require__(/*! ./constraint_helpers */ "./node_modules/inversify/lib/syntax/constraint_helpers.js");
var BindingWhenSyntax = (function () {
    function BindingWhenSyntax(binding) {
        this._binding = binding;
    }
    BindingWhenSyntax.prototype.when = function (constraint) {
        this._binding.constraint = constraint;
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetNamed = function (name) {
        this._binding.constraint = constraint_helpers_1.namedConstraint(name);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetIsDefault = function () {
        this._binding.constraint = function (request) {
            var targetIsDefault = (request.target !== null) &&
                (!request.target.isNamed()) &&
                (!request.target.isTagged());
            return targetIsDefault;
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetTagged = function (tag, value) {
        this._binding.constraint = constraint_helpers_1.taggedConstraint(tag)(value);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenInjectedInto = function (parent) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.typeConstraint(parent)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenParentNamed = function (name) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.namedConstraint(name)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenParentTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.taggedConstraint(tag)(value)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorNamed = function (name) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorNamed = function (name) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    return BindingWhenSyntax;
}());
exports.BindingWhenSyntax = BindingWhenSyntax;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/constraint_helpers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/constraint_helpers.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var traverseAncerstors = function (request, constraint) {
    var parent = request.parentRequest;
    if (parent !== null) {
        return constraint(parent) ? true : traverseAncerstors(parent, constraint);
    }
    else {
        return false;
    }
};
exports.traverseAncerstors = traverseAncerstors;
var taggedConstraint = function (key) { return function (value) {
    var constraint = function (request) {
        return request !== null && request.target !== null && request.target.matchesTag(key)(value);
    };
    constraint.metaData = new metadata_1.Metadata(key, value);
    return constraint;
}; };
exports.taggedConstraint = taggedConstraint;
var namedConstraint = taggedConstraint(METADATA_KEY.NAMED_TAG);
exports.namedConstraint = namedConstraint;
var typeConstraint = function (type) { return function (request) {
    var binding = null;
    if (request !== null) {
        binding = request.bindings[0];
        if (typeof type === "string") {
            var serviceIdentifier = binding.serviceIdentifier;
            return serviceIdentifier === type;
        }
        else {
            var constructor = request.bindings[0].implementationType;
            return type === constructor;
        }
    }
    return false;
}; };
exports.typeConstraint = typeConstraint;


/***/ }),

/***/ "./node_modules/inversify/lib/utils/binding_utils.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/utils/binding_utils.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.multiBindToService = function (container) {
    return function (service) {
        return function () {
            var types = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                types[_i] = arguments[_i];
            }
            return types.forEach(function (t) { return container.bind(t).toService(service); });
        };
    };
};


/***/ }),

/***/ "./node_modules/inversify/lib/utils/exceptions.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/utils/exceptions.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
function isStackOverflowExeption(error) {
    return (error instanceof RangeError ||
        error.message === ERROR_MSGS.STACK_OVERFLOW);
}
exports.isStackOverflowExeption = isStackOverflowExeption;


/***/ }),

/***/ "./node_modules/inversify/lib/utils/id.js":
/*!************************************************!*\
  !*** ./node_modules/inversify/lib/utils/id.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var idCounter = 0;
function id() {
    return idCounter++;
}
exports.id = id;


/***/ }),

/***/ "./node_modules/inversify/lib/utils/serialization.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/utils/serialization.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
function getServiceIdentifierAsString(serviceIdentifier) {
    if (typeof serviceIdentifier === "function") {
        var _serviceIdentifier = serviceIdentifier;
        return _serviceIdentifier.name;
    }
    else if (typeof serviceIdentifier === "symbol") {
        return serviceIdentifier.toString();
    }
    else {
        var _serviceIdentifier = serviceIdentifier;
        return _serviceIdentifier;
    }
}
exports.getServiceIdentifierAsString = getServiceIdentifierAsString;
function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
    var registeredBindingsList = "";
    var registeredBindings = getBindings(container, serviceIdentifier);
    if (registeredBindings.length !== 0) {
        registeredBindingsList = "\nRegistered bindings:";
        registeredBindings.forEach(function (binding) {
            var name = "Object";
            if (binding.implementationType !== null) {
                name = getFunctionName(binding.implementationType);
            }
            registeredBindingsList = registeredBindingsList + "\n " + name;
            if (binding.constraint.metaData) {
                registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData;
            }
        });
    }
    return registeredBindingsList;
}
exports.listRegisteredBindingsForServiceIdentifier = listRegisteredBindingsForServiceIdentifier;
function alreadyDependencyChain(request, serviceIdentifier) {
    if (request.parentRequest === null) {
        return false;
    }
    else if (request.parentRequest.serviceIdentifier === serviceIdentifier) {
        return true;
    }
    else {
        return alreadyDependencyChain(request.parentRequest, serviceIdentifier);
    }
}
function dependencyChainToString(request) {
    function _createStringArr(req, result) {
        if (result === void 0) { result = []; }
        var serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier);
        result.push(serviceIdentifier);
        if (req.parentRequest !== null) {
            return _createStringArr(req.parentRequest, result);
        }
        return result;
    }
    var stringArr = _createStringArr(request);
    return stringArr.reverse().join(" --> ");
}
function circularDependencyToException(request) {
    request.childRequests.forEach(function (childRequest) {
        if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
            var services = dependencyChainToString(childRequest);
            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY + " " + services);
        }
        else {
            circularDependencyToException(childRequest);
        }
    });
}
exports.circularDependencyToException = circularDependencyToException;
function listMetadataForTarget(serviceIdentifierString, target) {
    if (target.isTagged() || target.isNamed()) {
        var m_1 = "";
        var namedTag = target.getNamedTag();
        var otherTags = target.getCustomTags();
        if (namedTag !== null) {
            m_1 += namedTag.toString() + "\n";
        }
        if (otherTags !== null) {
            otherTags.forEach(function (tag) {
                m_1 += tag.toString() + "\n";
            });
        }
        return " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + m_1;
    }
    else {
        return " " + serviceIdentifierString;
    }
}
exports.listMetadataForTarget = listMetadataForTarget;
function getFunctionName(v) {
    if (v.name) {
        return v.name;
    }
    else {
        var name_1 = v.toString();
        var match = name_1.match(/^function\s*([^\s(]+)/);
        return match ? match[1] : "Anonymous function: " + name_1;
    }
}
exports.getFunctionName = getFunctionName;


/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var util = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

module.exports = util.assign(
    {
        'default': Format.RFC3986,
        formatters: {
            RFC1738: function (value) {
                return replace.call(value, percentTwenties, '+');
            },
            RFC3986: function (value) {
                return String(value);
            }
        }
    },
    Format
);


/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset, 'value');
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
            val = val.split(',');
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats['default'];
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = obj.join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key') : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key');
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value'))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),

/***/ "./node_modules/reflect-metadata/Reflect.js":
/*!**************************************************!*\
  !*** ./node_modules/reflect-metadata/Reflect.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof global === "object" ? global :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                return 1 /* Null */;
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = /** @class */ (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return /** @class */ (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return /** @class */ (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return /** @class */ (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect || (Reflect = {}));


/***/ }),

/***/ "./node_modules/semver-compare/index.js":
/*!**********************************************!*\
  !*** ./node_modules/semver-compare/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function cmp (a, b) {
    var pa = a.split('.');
    var pb = b.split('.');
    for (var i = 0; i < 3; i++) {
        var na = Number(pa[i]);
        var nb = Number(pb[i]);
        if (na > nb) return 1;
        if (nb > na) return -1;
        if (!isNaN(na) && isNaN(nb)) return 1;
        if (isNaN(na) && !isNaN(nb)) return -1;
    }
    return 0;
};


/***/ }),

/***/ "./node_modules/semver/semver.js":
/*!***************************************!*\
  !*** ./node_modules/semver/semver.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var R = 0

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*'
var NUMERICIDENTIFIERLOOSE = R++
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')'

var MAINVERSIONLOOSE = R++
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')'

var PRERELEASEIDENTIFIERLOOSE = R++
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))'

var PRERELEASELOOSE = R++
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?'

src[FULL] = '^' + FULLPLAIN + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?'

var LOOSE = R++
src[LOOSE] = '^' + LOOSEPLAIN + '$'

var GTLT = R++
src[GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
var XRANGEIDENTIFIER = R++
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*'

var XRANGEPLAIN = R++
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?'

var XRANGEPLAINLOOSE = R++
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?'

var XRANGE = R++
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$'
var XRANGELOOSE = R++
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
var COERCE = R++
src[COERCE] = '(?:^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++
src[LONETILDE] = '(?:~>?)'

var TILDETRIM = R++
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+'
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

var TILDE = R++
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$'
var TILDELOOSE = R++
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++
src[LONECARET] = '(?:\\^)'

var CARETTRIM = R++
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+'
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g')
var caretTrimReplace = '$1^'

var CARET = R++
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$'
var CARETLOOSE = R++
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$'
var COMPARATOR = R++
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$'

var HYPHENRANGELOOSE = R++
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
var STAR = R++
src[STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[LOOSE] : re[FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compare(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.rcompare(a, b, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1]
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY) {
    return true
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return thisComparators.every(function (thisComparator) {
      return range.set.some(function (rangeComparators) {
        return rangeComparators.every(function (rangeComparator) {
          return thisComparator.intersects(rangeComparator, options)
        })
      })
    })
  })
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[TILDELOOSE] : re[TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[CARETLOOSE] : re[CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[XRANGELOOSE] : re[XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '')
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  var match = version.match(re[COERCE])

  if (match == null) {
    return null
  }

  return parse(match[1] +
    '.' + (match[2] || '0') +
    '.' + (match[3] || '0'))
}


/***/ }),

/***/ "./node_modules/tunnel/index.js":
/*!**************************************!*\
  !*** ./node_modules/tunnel/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/tunnel */ "./node_modules/tunnel/lib/tunnel.js");


/***/ }),

/***/ "./node_modules/tunnel/lib/tunnel.js":
/*!*******************************************!*\
  !*** ./node_modules/tunnel/lib/tunnel.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var net = __webpack_require__(/*! net */ "net");
var tls = __webpack_require__(/*! tls */ "tls");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var events = __webpack_require__(/*! events */ "events");
var assert = __webpack_require__(/*! assert */ "assert");
var util = __webpack_require__(/*! util */ "util");


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false
  });
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode === 200) {
      assert.equal(head.length, 0);
      debug('tunneling connection has established');
      self.sockets[self.sockets.indexOf(placeholder)] = socket;
      cb(socket);
    } else {
      debug('tunneling socket could not be established, statusCode=%d',
            res.statusCode);
      var error = new Error('tunneling socket could not be established, ' +
                            'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
    }
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ "./node_modules/typed-rest-client/HttpClient.js":
/*!******************************************************!*\
  !*** ./node_modules/typed-rest-client/HttpClient.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = __webpack_require__(/*! url */ "url");
const http = __webpack_require__(/*! http */ "http");
const https = __webpack_require__(/*! https */ "https");
const util = __webpack_require__(/*! ./Util */ "./node_modules/typed-rest-client/Util.js");
let fs;
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
const HttpRedirectCodes = [HttpCodes.MovedPermanently, HttpCodes.ResourceMoved, HttpCodes.SeeOther, HttpCodes.TemporaryRedirect, HttpCodes.PermanentRedirect];
const HttpResponseRetryCodes = [HttpCodes.BadGateway, HttpCodes.ServiceUnavailable, HttpCodes.GatewayTimeout];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let buffer = Buffer.alloc(0);
            const encodingCharset = util.obtainContentCharset(this);
            // Extract Encoding from header: 'content-encoding'
            // Match `gzip`, `gzip, deflate` variations of GZIP encoding
            const contentEncoding = this.message.headers['content-encoding'] || '';
            const isGzippedEncoded = new RegExp('(gzip$)|(gzip, *deflate)').test(contentEncoding);
            this.message.on('data', function (data) {
                const chunk = (typeof data === 'string') ? Buffer.from(data, encodingCharset) : data;
                buffer = Buffer.concat([buffer, chunk]);
            }).on('end', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    if (isGzippedEncoded) { // Process GZipped Response Body HERE
                        const gunzippedBody = yield util.decompressGzippedContent(buffer, encodingCharset);
                        resolve(gunzippedBody);
                    }
                    resolve(buffer.toString(encodingCharset));
                });
            }).on('error', function (err) {
                reject(err);
            });
        }));
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = url.parse(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
var EnvironmentVariables;
(function (EnvironmentVariables) {
    EnvironmentVariables["HTTP_PROXY"] = "HTTP_PROXY";
    EnvironmentVariables["HTTPS_PROXY"] = "HTTPS_PROXY";
    EnvironmentVariables["NO_PROXY"] = "NO_PROXY";
})(EnvironmentVariables || (EnvironmentVariables = {}));
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        let no_proxy = process.env[EnvironmentVariables.NO_PROXY];
        if (no_proxy) {
            this._httpProxyBypassHosts = [];
            no_proxy.split(',').forEach(bypass => {
                this._httpProxyBypassHosts.push(new RegExp(bypass, 'i'));
            });
        }
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            this._httpProxy = requestOptions.proxy;
            if (requestOptions.proxy && requestOptions.proxy.proxyBypassHosts) {
                this._httpProxyBypassHosts = [];
                requestOptions.proxy.proxyBypassHosts.forEach(bypass => {
                    this._httpProxyBypassHosts.push(new RegExp(bypass, 'i'));
                });
            }
            this._certConfig = requestOptions.cert;
            if (this._certConfig) {
                // If using cert, need fs
                fs = __webpack_require__(/*! fs */ "fs");
                // cache the cert content into memory, so we don't have to read it from disk every time
                if (this._certConfig.caFile && fs.existsSync(this._certConfig.caFile)) {
                    this._ca = fs.readFileSync(this._certConfig.caFile, 'utf8');
                }
                if (this._certConfig.certFile && fs.existsSync(this._certConfig.certFile)) {
                    this._cert = fs.readFileSync(this._certConfig.certFile, 'utf8');
                }
                if (this._certConfig.keyFile && fs.existsSync(this._certConfig.keyFile)) {
                    this._key = fs.readFileSync(this._certConfig.keyFile, 'utf8');
                }
            }
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error("Client has already been disposed.");
            }
            let parsedUrl = url.parse(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            let maxTries = (this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1) ? this._maxRetries + 1 : 1;
            let numTries = 0;
            let response;
            while (numTries < maxTries) {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (let i = 0; i < this.handlers.length; i++) {
                        if (this.handlers[i].canHandleAuthentication(response)) {
                            authenticationHandler = this.handlers[i];
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1
                    && this._allowRedirects
                    && redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers["location"];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    let parsedRedirectUrl = url.parse(redirectUrl);
                    if (parsedUrl.protocol == 'https:' && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
                        throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            }
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        let isDataString = typeof (data) === 'string';
        if (typeof (data) === 'string') {
            info.options.headers["Content-Length"] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', (sock) => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof (data) === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof (data) !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers["user-agent"] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers && !this._isPresigned(url.format(requestUrl))) {
            this.handlers.forEach((handler) => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _isPresigned(requestUrl) {
        if (this.requestOptions && this.requestOptions.presignedUrlPatterns) {
            const patterns = this.requestOptions.presignedUrlPatterns;
            for (let i = 0; i < patterns.length; i++) {
                if (requestUrl.match(patterns[i])) {
                    return true;
                }
            }
        }
        return false;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxy = this._getProxy(parsedUrl);
        let useProxy = proxy.proxyUrl && proxy.proxyUrl.hostname && !this._isMatchInBypassProxyList(parsedUrl);
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __webpack_require__(/*! tunnel */ "./node_modules/tunnel/index.js");
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    proxyAuth: proxy.proxyAuth,
                    host: proxy.proxyUrl.hostname,
                    port: proxy.proxyUrl.port
                },
            };
            let tunnelAgent;
            const overHttps = proxy.proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, { rejectUnauthorized: false });
        }
        if (usingSsl && this._certConfig) {
            agent.options = Object.assign(agent.options || {}, { ca: this._ca, cert: this._cert, key: this._key, passphrase: this._certConfig.passphrase });
        }
        return agent;
    }
    _getProxy(parsedUrl) {
        let usingSsl = parsedUrl.protocol === 'https:';
        let proxyConfig = this._httpProxy;
        // fallback to http_proxy and https_proxy env
        let https_proxy = process.env[EnvironmentVariables.HTTPS_PROXY];
        let http_proxy = process.env[EnvironmentVariables.HTTP_PROXY];
        if (!proxyConfig) {
            if (https_proxy && usingSsl) {
                proxyConfig = {
                    proxyUrl: https_proxy
                };
            }
            else if (http_proxy) {
                proxyConfig = {
                    proxyUrl: http_proxy
                };
            }
        }
        let proxyUrl;
        let proxyAuth;
        if (proxyConfig) {
            if (proxyConfig.proxyUrl.length > 0) {
                proxyUrl = url.parse(proxyConfig.proxyUrl);
            }
            if (proxyConfig.proxyUsername || proxyConfig.proxyPassword) {
                proxyAuth = proxyConfig.proxyUsername + ":" + proxyConfig.proxyPassword;
            }
        }
        return { proxyUrl: proxyUrl, proxyAuth: proxyAuth };
    }
    _isMatchInBypassProxyList(parsedUrl) {
        if (!this._httpProxyBypassHosts) {
            return false;
        }
        let bypass = false;
        this._httpProxyBypassHosts.forEach(bypassHost => {
            if (bypassHost.test(parsedUrl.href)) {
                bypass = true;
            }
        });
        return bypass;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ "./node_modules/typed-rest-client/Util.js":
/*!************************************************!*\
  !*** ./node_modules/typed-rest-client/Util.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const qs = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
const url = __webpack_require__(/*! url */ "url");
const path = __webpack_require__(/*! path */ "path");
const zlib = __webpack_require__(/*! zlib */ "zlib");
/**
 * creates an url from a request url and optional base url (http://server:8080)
 * @param {string} resource - a fully qualified url or relative path
 * @param {string} baseUrl - an optional baseUrl (http://server:8080)
 * @param {IRequestOptions} options - an optional options object, could include QueryParameters e.g.
 * @return {string} - resultant url
 */
function getUrl(resource, baseUrl, queryParams) {
    const pathApi = path.posix || path;
    let requestUrl = '';
    if (!baseUrl) {
        requestUrl = resource;
    }
    else if (!resource) {
        requestUrl = baseUrl;
    }
    else {
        const base = url.parse(baseUrl);
        const resultantUrl = url.parse(resource);
        // resource (specific per request) elements take priority
        resultantUrl.protocol = resultantUrl.protocol || base.protocol;
        resultantUrl.auth = resultantUrl.auth || base.auth;
        resultantUrl.host = resultantUrl.host || base.host;
        resultantUrl.pathname = pathApi.resolve(base.pathname, resultantUrl.pathname);
        if (!resultantUrl.pathname.endsWith('/') && resource.endsWith('/')) {
            resultantUrl.pathname += '/';
        }
        requestUrl = url.format(resultantUrl);
    }
    return queryParams ?
        getUrlWithParsedQueryParams(requestUrl, queryParams) :
        requestUrl;
}
exports.getUrl = getUrl;
/**
 *
 * @param {string} requestUrl
 * @param {IRequestQueryParams} queryParams
 * @return {string} - Request's URL with Query Parameters appended/parsed.
 */
function getUrlWithParsedQueryParams(requestUrl, queryParams) {
    const url = requestUrl.replace(/\?$/g, ''); // Clean any extra end-of-string "?" character
    const parsedQueryParams = qs.stringify(queryParams.params, buildParamsStringifyOptions(queryParams));
    return `${url}${parsedQueryParams}`;
}
/**
 * Build options for QueryParams Stringifying.
 *
 * @param {IRequestQueryParams} queryParams
 * @return {object}
 */
function buildParamsStringifyOptions(queryParams) {
    let options = {
        addQueryPrefix: true,
        delimiter: (queryParams.options || {}).separator || '&',
        allowDots: (queryParams.options || {}).shouldAllowDots || false,
        arrayFormat: (queryParams.options || {}).arrayFormat || 'repeat',
        encodeValuesOnly: (queryParams.options || {}).shouldOnlyEncodeValues || true
    };
    return options;
}
/**
 * Decompress/Decode gzip encoded JSON
 * Using Node.js built-in zlib module
 *
 * @param {Buffer} buffer
 * @param {string} charset? - optional; defaults to 'utf-8'
 * @return {Promise<string>}
 */
function decompressGzippedContent(buffer, charset) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            zlib.gunzip(buffer, function (error, buffer) {
                if (error) {
                    reject(error);
                }
                resolve(buffer.toString(charset || 'utf-8'));
            });
        }));
    });
}
exports.decompressGzippedContent = decompressGzippedContent;
/**
 * Obtain Response's Content Charset.
 * Through inspecting `content-type` response header.
 * It Returns 'utf-8' if NO charset specified/matched.
 *
 * @param {IHttpClientResponse} response
 * @return {string} - Content Encoding Charset; Default=utf-8
 */
function obtainContentCharset(response) {
    // Find the charset, if specified.
    // Search for the `charset=CHARSET` string, not including `;,\r\n`
    // Example: content-type: 'application/json;charset=utf-8'
    // |__ matches would be ['charset=utf-8', 'utf-8', index: 18, input: 'application/json; charset=utf-8']
    // |_____ matches[1] would have the charset :tada: , in our example it's utf-8
    // However, if the matches Array was empty or no charset found, 'utf-8' would be returned by default.
    const contentType = response.message.headers['content-type'] || '';
    const matches = contentType.match(/charset=([^;,\r\n]+)/i);
    return (matches && matches[1]) ? matches[1] : 'utf-8';
}
exports.obtainContentCharset = obtainContentCharset;


/***/ }),

/***/ "./src/agent/mock/build-agent.ts":
/*!***************************************!*\
  !*** ./src/agent/mock/build-agent.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
let BuildAgent = class BuildAgent {
    get agentName() {
        console.log("getAgentName");
        return "Mock";
    }
    find(toolName, versionSpec, arch) {
        console.log("find");
        return "find";
    }
    cacheDir(sourceDir, tool, version, arch) {
        console.log("cacheDir");
        return Promise.resolve("cacheDir");
    }
    createTempDir() {
        console.log("createTempDir");
        return Promise.resolve("createTempDir");
    }
    debug(message) {
        console.log("debug");
    }
    setFailed(message, done) {
        console.log("setFailed");
    }
    setSucceeded(message, done) {
        console.log("setSucceeded");
    }
    exportVariable(name, val) {
        console.log("exportVariable");
    }
    getVariable(name) {
        console.log("getVariable");
        return "getVariable";
    }
    addPath(inputPath) {
        console.log("addPath");
    }
    which(tool, check) {
        console.log("which");
        return Promise.resolve("which");
    }
    exec(exec, args) {
        return Promise.resolve({
            code: 0,
            error: null,
            stderr: "result.stderr",
            stdout: "result.stdout",
        });
    }
    getSourceDir() {
        console.log("getSourceDir");
        return "getSourceDir";
    }
    setOutput(name, value) {
        console.log("setOutput");
    }
    getInput(input, required) {
        console.log("getInput");
        return "getInput";
    }
    getListInput(input, required) {
        console.log("getListInput");
        return ["getInput"];
    }
    getBooleanInput(input, required) {
        console.log("getBooleanInput");
        return false;
    }
    isValidInputFile(input, file) {
        console.log("isValidInputFile");
        return false;
    }
    fileExists(file) {
        console.log("fileExists");
        return false;
    }
    directoryExists(file) {
        console.log("directoryExists");
        return false;
    }
};
BuildAgent = __decorate([
    inversify_1.injectable()
], BuildAgent);
exports.BuildAgent = BuildAgent;


/***/ }),

/***/ "./src/core/dotnet-tool.ts":
/*!*********************************!*\
  !*** ./src/core/dotnet-tool.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const os = __importStar(__webpack_require__(/*! os */ "os"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const http = __importStar(__webpack_require__(/*! typed-rest-client/HttpClient */ "./node_modules/typed-rest-client/HttpClient.js"));
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const models_1 = __webpack_require__(/*! ./models */ "./src/core/models.ts");
let DotnetTool = class DotnetTool {
    constructor(buildAgent, versionManager) {
        this.buildAgent = buildAgent;
        this.versionManager = versionManager;
        this.httpClient = new http.HttpClient("dotnet");
    }
    disableTelemetry() {
        this.buildAgent.exportVariable("DOTNET_CLI_TELEMETRY_OPTOUT", "1");
    }
    execute(cmd, args) {
        console.log(`Command: ${cmd} ${args.join(' ')}`);
        return this.buildAgent.exec(cmd, args);
    }
    toolInstall(toolName, versionSpec, checkLatest, includePre) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("");
            console.log("--------------------------");
            console.log(`Installing ${toolName} version ` + versionSpec);
            console.log("--------------------------");
            if (this.versionManager.isExplicitVersion(versionSpec)) {
                checkLatest = false; // check latest doesn't make sense when explicit version
            }
            let toolPath;
            if (!checkLatest) {
                //
                // Let's try and resolve the version spec locally first
                //
                toolPath = this.buildAgent.find(toolName, versionSpec);
            }
            if (!toolPath) {
                let version;
                if (this.versionManager.isExplicitVersion(versionSpec)) {
                    //
                    // Explicit version was specified. No need to query for list of versions.
                    //
                    version = versionSpec;
                }
                else {
                    //
                    // Let's query and resolve the latest version for the versionSpec.
                    // If the version is an explicit version (1.1.1 or v1.1.1) then no need to query.
                    // If your tool doesn't offer a mechanism to query,
                    // then it can only support exact version inputs.
                    //
                    version = yield this.queryLatestMatch(toolName, versionSpec, includePre);
                    if (!version) {
                        throw new Error(`Unable to find ${toolName} version '${versionSpec}'.`);
                    }
                    //
                    // Check the cache for the resolved version.
                    //
                    toolPath = this.buildAgent.find(toolName, version);
                }
                if (!toolPath) {
                    //
                    // Download, extract, cache
                    //
                    toolPath = yield this.acquireTool(toolName, version);
                }
            }
            //
            // Prepend the tools path. This prepends the PATH for the current process and
            // instructs the agent to prepend for each task that follows.
            //
            this.buildAgent.debug(`toolPath: ${toolPath}`);
            if (os.platform() !== "win32") {
                const dotnetRoot = path.dirname(fs.readlinkSync(yield this.buildAgent.which("dotnet")));
                this.buildAgent.exportVariable("DOTNET_ROOT", dotnetRoot);
            }
            this.buildAgent.addPath(toolPath);
            return toolPath;
        });
    }
    queryLatestMatch(toolName, versionSpec, includePrerelease) {
        return __awaiter(this, void 0, void 0, function* () {
            this.buildAgent.debug(`querying tool versions for ${toolName}${versionSpec ? `@${versionSpec}` : ""} ${includePrerelease ? "including pre-releases" : ""}`);
            const downloadPath = `https://api-v2v3search-0.nuget.org/query?q=${encodeURIComponent(toolName.toLowerCase())}&prerelease=${includePrerelease ? "true" : "false"}&semVerLevel=2.0.0`;
            const res = yield this.httpClient.get(downloadPath);
            if (!res || res.message.statusCode !== 200) {
                return null;
            }
            const body = yield res.readBody();
            const data = JSON.parse(body).data;
            const versions = data[0].versions.map((x) => x.version);
            if (!versions || !versions.length) {
                return null;
            }
            this.buildAgent.debug(`got versions: ${versions.join(", ")}`);
            return this.versionManager.evaluateVersions(versions, versionSpec);
        });
    }
    acquireTool(toolName, version) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempDirectory = yield this.buildAgent.createTempDir();
            let args = ["tool", "install", toolName, "--tool-path", tempDirectory];
            if (version) {
                version = this.versionManager.cleanVersion(version);
                args = args.concat(["--version", version]);
            }
            const result = yield this.execute("dotnet", args);
            const status = result.code === 0 ? "success" : "failure";
            const message = result.code === 0 ? result.stdout : result.stderr;
            this.buildAgent.debug(`tool install result: ${status} ${message}`);
            if (result.code) {
                throw new Error("Error installing tool");
            }
            return yield this.buildAgent.cacheDir(tempDirectory, toolName, version);
        });
    }
};
DotnetTool = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(models_1.TYPES.IBuildAgent)),
    __param(1, inversify_1.inject(models_1.TYPES.IVersionManager)),
    __metadata("design:paramtypes", [Object, Object])
], DotnetTool);
exports.DotnetTool = DotnetTool;


/***/ }),

/***/ "./src/core/ioc.ts":
/*!*************************!*\
  !*** ./src/core/ioc.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const versionManager_1 = __webpack_require__(/*! ./versionManager */ "./src/core/versionManager.ts");
const models_1 = __webpack_require__(/*! ./models */ "./src/core/models.ts");
const build_agent_1 = __webpack_require__(/*! ../agent/mock/build-agent */ "./src/agent/mock/build-agent.ts");
const container = new inversify_1.Container();
container.bind(models_1.TYPES.IVersionManager).to(versionManager_1.VersionManager);
container.bind(models_1.TYPES.IBuildAgent).to(build_agent_1.BuildAgent);
exports.default = container;


/***/ }),

/***/ "./src/core/models.ts":
/*!****************************!*\
  !*** ./src/core/models.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = {
    IBuildAgent: Symbol.for("BuildAgent"),
    IDotnetTool: Symbol.for("DotnetTool"),
    IGitVersionTool: Symbol.for("GitVersionTool"),
    IGitReleaseManagerTool: Symbol.for("GitReleaseManagerTool"),
    IVersionManager: Symbol.for("VersionManager"),
};
var SetupFields;
(function (SetupFields) {
    SetupFields["includePrerelease"] = "includePrerelease";
    SetupFields["versionSpec"] = "versionSpec";
})(SetupFields = exports.SetupFields || (exports.SetupFields = {}));
;


/***/ }),

/***/ "./src/core/settings.ts":
/*!******************************!*\
  !*** ./src/core/settings.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __webpack_require__(/*! ./models */ "./src/core/models.ts");
class Settings {
    static getSetupSettings(buildAgent) {
        const versionSpec = buildAgent.getInput(models_1.SetupFields.versionSpec);
        const includePrerelease = buildAgent.getBooleanInput(models_1.SetupFields.includePrerelease);
        return {
            versionSpec,
            includePrerelease
        };
    }
}
exports.Settings = Settings;


/***/ }),

/***/ "./src/core/versionManager.ts":
/*!************************************!*\
  !*** ./src/core/versionManager.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const semver_compare_1 = __importDefault(__webpack_require__(/*! semver-compare */ "./node_modules/semver-compare/index.js"));
const semver = __importStar(__webpack_require__(/*! semver */ "./node_modules/semver/semver.js"));
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const models_1 = __webpack_require__(/*! ./models */ "./src/core/models.ts");
let VersionManager = class VersionManager {
    constructor(buildAgent) {
        this.buildAgent = buildAgent;
    }
    isExplicitVersion(versionSpec) {
        const c = semver.clean(versionSpec);
        this.buildAgent.debug("isExplicit: " + c);
        const valid = semver.valid(c) != null;
        this.buildAgent.debug("explicit? " + valid);
        return valid;
    }
    evaluateVersions(versions, versionSpec) {
        let version;
        this.buildAgent.debug("evaluating " + versions.length + " versions");
        versions = versions.sort(semver_compare_1.default);
        for (let i = versions.length - 1; i >= 0; i--) {
            const potential = versions[i];
            const satisfied = semver.satisfies(potential, versionSpec);
            if (satisfied) {
                version = potential;
                break;
            }
        }
        if (version) {
            this.buildAgent.debug("matched: " + version);
        }
        else {
            this.buildAgent.debug("match not found");
        }
        return version;
    }
    cleanVersion(version) {
        this.buildAgent.debug("cleaning: " + version);
        return semver.clean(version);
    }
};
VersionManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(models_1.TYPES.IBuildAgent)),
    __metadata("design:paramtypes", [Object])
], VersionManager);
exports.VersionManager = VersionManager;


/***/ }),

/***/ "./src/tasks/gitreleasemanager/main.ts":
/*!*********************************************!*\
  !*** ./src/tasks/gitreleasemanager/main.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __webpack_require__(/*! ../../core/models */ "./src/core/models.ts");
const tool_1 = __webpack_require__(/*! ../../tools/gitreleasemanager/tool */ "./src/tools/gitreleasemanager/tool.ts");
const settings_1 = __webpack_require__(/*! ../../core/settings */ "./src/core/settings.ts");
const settings_2 = __webpack_require__(/*! ../../tools/gitreleasemanager/settings */ "./src/tools/gitreleasemanager/settings.ts");
const ioc_1 = __importDefault(__webpack_require__(/*! ../../core/ioc */ "./src/core/ioc.ts"));
ioc_1.default.bind(models_1.TYPES.IGitReleaseManagerTool).to(tool_1.GitReleaseManagerTool);
const gitReleaseManagerTool = ioc_1.default.get(models_1.TYPES.IGitReleaseManagerTool);
const buildAgent = ioc_1.default.get(models_1.TYPES.IBuildAgent);
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            gitReleaseManagerTool.disableTelemetry();
            const settings = settings_1.Settings.getSetupSettings(buildAgent);
            yield gitReleaseManagerTool.install(settings.versionSpec, settings.includePrerelease);
            buildAgent.setSucceeded("GitVersionManager installed successfully", true);
        }
        catch (error) {
            buildAgent.setFailed(error.message, true);
        }
    });
}
exports.setup = setup;
function create() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            gitReleaseManagerTool.disableTelemetry();
            const settings = settings_2.Settings.getCreateSettings(buildAgent);
            yield gitReleaseManagerTool.create(settings);
            buildAgent.setSucceeded("GitVersionManager created release successfully", true);
        }
        catch (error) {
            buildAgent.setFailed(error.message, true);
        }
    });
}
exports.create = create;
function discard() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            gitReleaseManagerTool.disableTelemetry();
            const settings = settings_2.Settings.getDiscardSettings(buildAgent);
            yield gitReleaseManagerTool.discard(settings);
            buildAgent.setSucceeded("GitVersionManager discarded release successfully", true);
        }
        catch (error) {
            buildAgent.setFailed(error.message, true);
        }
    });
}
exports.discard = discard;


/***/ }),

/***/ "./src/tasks/gitreleasemanager/setup.ts":
/*!**********************************************!*\
  !*** ./src/tasks/gitreleasemanager/setup.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js");
const main_1 = __webpack_require__(/*! ./main */ "./src/tasks/gitreleasemanager/main.ts");
main_1.setup();


/***/ }),

/***/ "./src/tools/gitreleasemanager/models.ts":
/*!***********************************************!*\
  !*** ./src/tools/gitreleasemanager/models.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CommonFields;
(function (CommonFields) {
    CommonFields["repository"] = "repository";
    CommonFields["owner"] = "owner";
    CommonFields["token"] = "token";
})(CommonFields = exports.CommonFields || (exports.CommonFields = {}));
var CreateFields;
(function (CreateFields) {
    CreateFields["milestone"] = "milestone";
    CreateFields["releaseName"] = "releaseName";
    CreateFields["inputFileName"] = "inputFileName";
    CreateFields["isPreRelease"] = "isPreRelease";
    CreateFields["commit"] = "commit";
    CreateFields["targetDirectory"] = "targetDirectory";
    CreateFields["assets"] = "assets";
})(CreateFields = exports.CreateFields || (exports.CreateFields = {}));
var DiscardFields;
(function (DiscardFields) {
    DiscardFields["milestone"] = "milestone";
    DiscardFields["targetDirectory"] = "targetDirectory";
})(DiscardFields = exports.DiscardFields || (exports.DiscardFields = {}));


/***/ }),

/***/ "./src/tools/gitreleasemanager/settings.ts":
/*!*************************************************!*\
  !*** ./src/tools/gitreleasemanager/settings.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __webpack_require__(/*! ./models */ "./src/tools/gitreleasemanager/models.ts");
class Settings {
    static getCreateSettings(buildAgent) {
        const milestone = buildAgent.getInput(models_1.CreateFields.milestone);
        const releaseName = buildAgent.getInput(models_1.CreateFields.releaseName);
        const inputFileName = buildAgent.getInput(models_1.CreateFields.inputFileName);
        const isPreRelease = buildAgent.getBooleanInput(models_1.CreateFields.isPreRelease);
        const commit = buildAgent.getInput(models_1.CreateFields.commit);
        const targetDirectory = buildAgent.getInput(models_1.CreateFields.targetDirectory);
        const assets = buildAgent.getListInput(models_1.CreateFields.assets);
        const commonSettings = Settings.getCommonSettings(buildAgent);
        return Object.assign(Object.assign({}, commonSettings), { milestone,
            releaseName,
            inputFileName,
            isPreRelease,
            commit,
            targetDirectory,
            assets });
    }
    static getDiscardSettings(buildAgent) {
        const milestone = buildAgent.getInput(models_1.DiscardFields.milestone);
        const targetDirectory = buildAgent.getInput(models_1.CreateFields.targetDirectory);
        const commonSettings = Settings.getCommonSettings(buildAgent);
        return Object.assign(Object.assign({}, commonSettings), { milestone,
            targetDirectory });
    }
    static getCommonSettings(buildAgent) {
        const owner = buildAgent.getInput(models_1.CommonFields.owner, true);
        const repository = buildAgent.getInput(models_1.CommonFields.repository, true);
        const token = buildAgent.getInput(models_1.CommonFields.token, true);
        return {
            owner,
            repository,
            token
        };
    }
}
exports.Settings = Settings;


/***/ }),

/***/ "./src/tools/gitreleasemanager/tool.ts":
/*!*********************************************!*\
  !*** ./src/tools/gitreleasemanager/tool.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(/*! path */ "path");
const models_1 = __webpack_require__(/*! ../../core/models */ "./src/core/models.ts");
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const dotnet_tool_1 = __webpack_require__(/*! ../../core/dotnet-tool */ "./src/core/dotnet-tool.ts");
let GitReleaseManagerTool = class GitReleaseManagerTool extends dotnet_tool_1.DotnetTool {
    constructor(buildAgent, versionManager) {
        super(buildAgent, versionManager);
    }
    install(versionSpec, includePrerelease) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.toolInstall("GitReleaseManager.Tool", versionSpec, false, includePrerelease);
        });
    }
    create(settings) {
        const args = this.getCreateArguments(settings);
        return this.execute("dotnet-gitreleasemanager", args);
    }
    discard(settings) {
        const args = this.getDiscardArguments(settings);
        return this.execute("dotnet-gitreleasemanager", args);
    }
    getCommonArguments(settings) {
        const args = [];
        args.push("--owner", settings.owner);
        args.push("--repository", settings.repository);
        args.push("--token", settings.token);
        return args;
    }
    getDiscardArguments(settings) {
        const args = ['discard', ...this.getCommonArguments(settings)];
        if (settings.milestone) {
            args.push("--milestone", settings.milestone);
        }
        settings.targetDirectory = this.getRepoDir(settings.targetDirectory);
        args.push("--targetDirectory", settings.targetDirectory);
        return args;
    }
    getCreateArguments(settings) {
        const args = ['create', ...this.getCommonArguments(settings)];
        if (settings.milestone) {
            args.push("--milestone", settings.milestone);
        }
        if (settings.releaseName) {
            args.push("--name", settings.releaseName);
        }
        if (settings.commit) {
            args.push("--targetcommitish", settings.commit);
        }
        settings.targetDirectory = this.getRepoDir(settings.targetDirectory);
        args.push("--targetDirectory", settings.targetDirectory);
        if (settings.inputFileName) {
            if (this.buildAgent.fileExists(settings.inputFileName)) {
                args.push("--inputFilePath", settings.inputFileName);
            }
            else {
                throw new Error("GitReleaseManager inputFilePath not found at " + settings.inputFileName);
            }
        }
        if (settings.isPreRelease) {
            args.push("--pre");
        }
        if (settings.assets && settings.assets.length > 0) {
            settings.assets = settings.assets.map(asset => {
                return path.join(settings.targetDirectory, asset);
            });
            args.push("--assets", settings.assets.join(","));
        }
        return args;
    }
    getRepoDir(targetPath) {
        let workDir;
        const srcDir = this.buildAgent.getSourceDir();
        if (!targetPath) {
            workDir = srcDir;
        }
        else {
            if (this.buildAgent.directoryExists(targetPath)) {
                workDir = path.join(srcDir, targetPath);
            }
            else {
                throw new Error("Directory not found at " + targetPath);
            }
        }
        return workDir.replace(/\\/g, "/");
    }
};
GitReleaseManagerTool = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(models_1.TYPES.IBuildAgent)),
    __param(1, inversify_1.inject(models_1.TYPES.IVersionManager)),
    __metadata("design:paramtypes", [Object, Object])
], GitReleaseManagerTool);
exports.GitReleaseManagerTool = GitReleaseManagerTool;


/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi9kZWNvcmF0b3JfdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi9pbmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi9pbmplY3RhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vbXVsdGlfaW5qZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vbmFtZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi9vcHRpb25hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL3Bvc3RfY29uc3RydWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vdGFnZ2VkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vdGFyZ2V0X25hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi91bm1hbmFnZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYmluZGluZ3MvYmluZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9iaW5kaW5ncy9iaW5kaW5nX2NvdW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnN0YW50cy9lcnJvcl9tc2dzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnRhaW5lci9jb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvY29udGFpbmVyL2NvbnRhaW5lcl9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvY29udGFpbmVyL2NvbnRhaW5lcl9zbmFwc2hvdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9jb250YWluZXIvbG9va3VwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2ludmVyc2lmeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9jb250ZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL21ldGFkYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL21ldGFkYXRhX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9wbGFuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3BsYW5uZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvcGxhbm5pbmcvcXVlcnlhYmxlX3N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9yZWZsZWN0aW9uX3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvcGxhbm5pbmcvdGFyZ2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3Jlc29sdXRpb24vaW5zdGFudGlhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9yZXNvbHV0aW9uL3Jlc29sdmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX2luX3N5bnRheC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9zeW50YXgvYmluZGluZ19pbl93aGVuX29uX3N5bnRheC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9zeW50YXgvYmluZGluZ19vbl9zeW50YXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvc3ludGF4L2JpbmRpbmdfdG9fc3ludGF4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX3doZW5fb25fc3ludGF4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX3doZW5fc3ludGF4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9jb25zdHJhaW50X2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvdXRpbHMvYmluZGluZ191dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi91dGlscy9leGNlcHRpb25zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3V0aWxzL2lkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3V0aWxzL3NlcmlhbGl6YXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9mb3JtYXRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXMvbGliL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWZsZWN0LW1ldGFkYXRhL1JlZmxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NlbXZlci1jb21wYXJlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZW12ZXIvc2VtdmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90dW5uZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3R1bm5lbC9saWIvdHVubmVsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90eXBlZC1yZXN0LWNsaWVudC9IdHRwQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90eXBlZC1yZXN0LWNsaWVudC9VdGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9hZ2VudC9tb2NrL2J1aWxkLWFnZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2RvdG5ldC10b29sLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2lvYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9tb2RlbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvdmVyc2lvbk1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rhc2tzL2dpdHJlbGVhc2VtYW5hZ2VyL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rhc2tzL2dpdHJlbGVhc2VtYW5hZ2VyL3NldHVwLnRzIiwid2VicGFjazovLy8uL3NyYy90b29scy9naXRyZWxlYXNlbWFuYWdlci9tb2RlbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rvb2xzL2dpdHJlbGVhc2VtYW5hZ2VyL3NldHRpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy90b29scy9naXRyZWxlYXNlbWFuYWdlci90b29sLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzc2VydFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV2ZW50c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwib3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidGxzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXJsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXRpbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInpsaWJcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNB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TDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixvQkFBb0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0UmE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsRUFBRTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0Esa0RBQWtELEVBQUU7QUFDcEQ7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLE9BQU8sV0FBVyxhQUFhO0FBQ2pEOztBQUVBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzT0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxtREFBbUQ7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFLDZCQUE2QixnQkFBZ0Isa0JBQWtCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDRDQUE0QztBQUMzRTtBQUNBLG1DQUFtQyx3QkFBd0Isa0JBQWtCLEVBQUU7QUFDL0UsbUNBQW1DLHlCQUF5QixFQUFFLEVBQUU7QUFDaEU7QUFDQSx1Q0FBdUMsOEJBQThCO0FBQ3JFLHVDQUF1QyxtQkFBbUIsRUFBRTtBQUM1RDtBQUNBLHVDQUF1QyxxREFBcUQ7QUFDNUYsdUNBQXVDLGlCQUFpQixFQUFFO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQywyQ0FBMkM7QUFDM0MsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLDJDQUEyQztBQUMzQyw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUdBQXVHO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLDJDQUEyQztBQUMzQyw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0Y7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkMsMkNBQTJDO0FBQzNDLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQywyQ0FBMkM7QUFDM0MsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLDJDQUEyQztBQUMzQyw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQywyQ0FBMkM7QUFDM0MsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkMsMkNBQTJDO0FBQzNDLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQywyQ0FBMkM7QUFDM0MsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCx1QkFBdUI7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsMEJBQTBCO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLG9CQUFvQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDLDBCQUEwQjs7Ozs7Ozs7Ozs7O0FDMW1DM0I7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNaQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvQ0FBb0M7QUFDeEQsMEJBQTBCLG9DQUFvQztBQUM5RCwwQkFBMEIsb0NBQW9DO0FBQzlEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHFCQUFxQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0Y7QUFDaEY7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0EsK0VBQStFO0FBQy9FO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQTtBQUNBLDhFQUE4RTtBQUM5RTtBQUNBO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsMEJBQTBCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFT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K0I7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsaUMiLCJmaWxlIjoiZ2l0cmVsZWFzZW1hbmFnZXIvc2V0dXAvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdGFza3MvZ2l0cmVsZWFzZW1hbmFnZXIvc2V0dXAudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFUlJPUl9NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbmZ1bmN0aW9uIHRhZ1BhcmFtZXRlcihhbm5vdGF0aW9uVGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIHBhcmFtZXRlckluZGV4LCBtZXRhZGF0YSkge1xuICAgIHZhciBtZXRhZGF0YUtleSA9IE1FVEFEQVRBX0tFWS5UQUdHRUQ7XG4gICAgX3RhZ1BhcmFtZXRlck9yUHJvcGVydHkobWV0YWRhdGFLZXksIGFubm90YXRpb25UYXJnZXQsIHByb3BlcnR5TmFtZSwgbWV0YWRhdGEsIHBhcmFtZXRlckluZGV4KTtcbn1cbmV4cG9ydHMudGFnUGFyYW1ldGVyID0gdGFnUGFyYW1ldGVyO1xuZnVuY3Rpb24gdGFnUHJvcGVydHkoYW5ub3RhdGlvblRhcmdldCwgcHJvcGVydHlOYW1lLCBtZXRhZGF0YSkge1xuICAgIHZhciBtZXRhZGF0YUtleSA9IE1FVEFEQVRBX0tFWS5UQUdHRURfUFJPUDtcbiAgICBfdGFnUGFyYW1ldGVyT3JQcm9wZXJ0eShtZXRhZGF0YUtleSwgYW5ub3RhdGlvblRhcmdldC5jb25zdHJ1Y3RvciwgcHJvcGVydHlOYW1lLCBtZXRhZGF0YSk7XG59XG5leHBvcnRzLnRhZ1Byb3BlcnR5ID0gdGFnUHJvcGVydHk7XG5mdW5jdGlvbiBfdGFnUGFyYW1ldGVyT3JQcm9wZXJ0eShtZXRhZGF0YUtleSwgYW5ub3RhdGlvblRhcmdldCwgcHJvcGVydHlOYW1lLCBtZXRhZGF0YSwgcGFyYW1ldGVySW5kZXgpIHtcbiAgICB2YXIgcGFyYW1zT3JQcm9wZXJ0aWVzTWV0YWRhdGEgPSB7fTtcbiAgICB2YXIgaXNQYXJhbWV0ZXJEZWNvcmF0b3IgPSAodHlwZW9mIHBhcmFtZXRlckluZGV4ID09PSBcIm51bWJlclwiKTtcbiAgICB2YXIga2V5ID0gKHBhcmFtZXRlckluZGV4ICE9PSB1bmRlZmluZWQgJiYgaXNQYXJhbWV0ZXJEZWNvcmF0b3IpID8gcGFyYW1ldGVySW5kZXgudG9TdHJpbmcoKSA6IHByb3BlcnR5TmFtZTtcbiAgICBpZiAoaXNQYXJhbWV0ZXJEZWNvcmF0b3IgJiYgcHJvcGVydHlOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuSU5WQUxJRF9ERUNPUkFUT1JfT1BFUkFUSU9OKTtcbiAgICB9XG4gICAgaWYgKFJlZmxlY3QuaGFzT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIGFubm90YXRpb25UYXJnZXQpKSB7XG4gICAgICAgIHBhcmFtc09yUHJvcGVydGllc01ldGFkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YShtZXRhZGF0YUtleSwgYW5ub3RhdGlvblRhcmdldCk7XG4gICAgfVxuICAgIHZhciBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YSA9IHBhcmFtc09yUHJvcGVydGllc01ldGFkYXRhW2tleV07XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhKSkge1xuICAgICAgICBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YSA9IFtdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YV8xID0gcGFyYW1PclByb3BlcnR5TWV0YWRhdGE7IF9pIDwgcGFyYW1PclByb3BlcnR5TWV0YWRhdGFfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBtID0gcGFyYW1PclByb3BlcnR5TWV0YWRhdGFfMVtfaV07XG4gICAgICAgICAgICBpZiAobS5rZXkgPT09IG1ldGFkYXRhLmtleSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLkRVUExJQ0FURURfTUVUQURBVEEgKyBcIiBcIiArIG0ua2V5LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhLnB1c2gobWV0YWRhdGEpO1xuICAgIHBhcmFtc09yUHJvcGVydGllc01ldGFkYXRhW2tleV0gPSBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YTtcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKG1ldGFkYXRhS2V5LCBwYXJhbXNPclByb3BlcnRpZXNNZXRhZGF0YSwgYW5ub3RhdGlvblRhcmdldCk7XG59XG5mdW5jdGlvbiBfZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0KSB7XG4gICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQpO1xufVxuZnVuY3Rpb24gX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfTtcbn1cbmZ1bmN0aW9uIGRlY29yYXRlKGRlY29yYXRvciwgdGFyZ2V0LCBwYXJhbWV0ZXJJbmRleCkge1xuICAgIGlmICh0eXBlb2YgcGFyYW1ldGVySW5kZXggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgX2RlY29yYXRlKFtfcGFyYW0ocGFyYW1ldGVySW5kZXgsIGRlY29yYXRvcildLCB0YXJnZXQpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgcGFyYW1ldGVySW5kZXggPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgUmVmbGVjdC5kZWNvcmF0ZShbZGVjb3JhdG9yXSwgdGFyZ2V0LCBwYXJhbWV0ZXJJbmRleCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBfZGVjb3JhdGUoW2RlY29yYXRvcl0sIHRhcmdldCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWNvcmF0ZSA9IGRlY29yYXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXJyb3JfbXNnc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yX3V0aWxzXCIpO1xudmFyIExhenlTZXJ2aWNlSWRlbnRpZmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMYXp5U2VydmljZUlkZW50aWZlcihjYikge1xuICAgICAgICB0aGlzLl9jYiA9IGNiO1xuICAgIH1cbiAgICBMYXp5U2VydmljZUlkZW50aWZlci5wcm90b3R5cGUudW53cmFwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2IoKTtcbiAgICB9O1xuICAgIHJldHVybiBMYXp5U2VydmljZUlkZW50aWZlcjtcbn0oKSk7XG5leHBvcnRzLkxhenlTZXJ2aWNlSWRlbnRpZmVyID0gTGF6eVNlcnZpY2VJZGVudGlmZXI7XG5mdW5jdGlvbiBpbmplY3Qoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICBpZiAoc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yX21zZ3NfMS5VTkRFRklORURfSU5KRUNUX0FOTk9UQVRJT04odGFyZ2V0Lm5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuSU5KRUNUX1RBRywgc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQcm9wZXJ0eSh0YXJnZXQsIHRhcmdldEtleSwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuaW5qZWN0ID0gaW5qZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRVJST1JTX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xuZnVuY3Rpb24gaW5qZWN0YWJsZSgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBpZiAoUmVmbGVjdC5oYXNPd25NZXRhZGF0YShNRVRBREFUQV9LRVkuUEFSQU1fVFlQRVMsIHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUlNfTVNHUy5EVVBMSUNBVEVEX0lOSkVDVEFCTEVfREVDT1JBVE9SKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdHlwZXMgPSBSZWZsZWN0LmdldE1ldGFkYXRhKE1FVEFEQVRBX0tFWS5ERVNJR05fUEFSQU1fVFlQRVMsIHRhcmdldCkgfHwgW107XG4gICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoTUVUQURBVEFfS0VZLlBBUkFNX1RZUEVTLCB0eXBlcywgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9O1xufVxuZXhwb3J0cy5pbmplY3RhYmxlID0gaW5qZWN0YWJsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yX3V0aWxzXCIpO1xuZnVuY3Rpb24gbXVsdGlJbmplY3Qoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuTVVMVElfSU5KRUNUX1RBRywgc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQcm9wZXJ0eSh0YXJnZXQsIHRhcmdldEtleSwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMubXVsdGlJbmplY3QgPSBtdWx0aUluamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yX3V0aWxzXCIpO1xuZnVuY3Rpb24gbmFtZWQobmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4KSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcsIG5hbWUpO1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQcm9wZXJ0eSh0YXJnZXQsIHRhcmdldEtleSwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMubmFtZWQgPSBuYW1lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yX3V0aWxzXCIpO1xuZnVuY3Rpb24gb3B0aW9uYWwoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoTUVUQURBVEFfS0VZLk9QVElPTkFMX1RBRywgdHJ1ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1BhcmFtZXRlcih0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgsIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1Byb3BlcnR5KHRhcmdldCwgdGFyZ2V0S2V5LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5vcHRpb25hbCA9IG9wdGlvbmFsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRVJST1JTX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG5mdW5jdGlvbiBwb3N0Q29uc3RydWN0KCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcikge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuUE9TVF9DT05TVFJVQ1QsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgaWYgKFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoTUVUQURBVEFfS0VZLlBPU1RfQ09OU1RSVUNULCB0YXJnZXQuY29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JTX01TR1MuTVVMVElQTEVfUE9TVF9DT05TVFJVQ1RfTUVUSE9EUyk7XG4gICAgICAgIH1cbiAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShNRVRBREFUQV9LRVkuUE9TVF9DT05TVFJVQ1QsIG1ldGFkYXRhLCB0YXJnZXQuY29uc3RydWN0b3IpO1xuICAgIH07XG59XG5leHBvcnRzLnBvc3RDb25zdHJ1Y3QgPSBwb3N0Q29uc3RydWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbnZhciBkZWNvcmF0b3JfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcl91dGlsc1wiKTtcbmZ1bmN0aW9uIHRhZ2dlZChtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4KSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUGFyYW1ldGVyKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUHJvcGVydHkodGFyZ2V0LCB0YXJnZXRLZXksIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLnRhZ2dlZCA9IHRhZ2dlZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yX3V0aWxzXCIpO1xuZnVuY3Rpb24gdGFyZ2V0TmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoTUVUQURBVEFfS0VZLk5BTUVfVEFHLCBuYW1lKTtcbiAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUGFyYW1ldGVyKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCwgbWV0YWRhdGEpO1xuICAgIH07XG59XG5leHBvcnRzLnRhcmdldE5hbWUgPSB0YXJnZXROYW1lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JfdXRpbHNcIik7XG5mdW5jdGlvbiB1bm1hbmFnZWQoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoTUVUQURBVEFfS0VZLlVOTUFOQUdFRF9UQUcsIHRydWUpO1xuICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgfTtcbn1cbmV4cG9ydHMudW5tYW5hZ2VkID0gdW5tYW5hZ2VkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgQmluZGluZyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmluZGluZyhzZXJ2aWNlSWRlbnRpZmllciwgc2NvcGUpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlSWRlbnRpZmllciA9IHNlcnZpY2VJZGVudGlmaWVyO1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uSW52YWxpZDtcbiAgICAgICAgdGhpcy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHsgcmV0dXJuIHRydWU7IH07XG4gICAgICAgIHRoaXMuaW1wbGVtZW50YXRpb25UeXBlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWNoZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmFjdG9yeSA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvdmlkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLm9uQWN0aXZhdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuZHluYW1pY1ZhbHVlID0gbnVsbDtcbiAgICB9XG4gICAgQmluZGluZy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbG9uZSA9IG5ldyBCaW5kaW5nKHRoaXMuc2VydmljZUlkZW50aWZpZXIsIHRoaXMuc2NvcGUpO1xuICAgICAgICBjbG9uZS5hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgY2xvbmUuaW1wbGVtZW50YXRpb25UeXBlID0gdGhpcy5pbXBsZW1lbnRhdGlvblR5cGU7XG4gICAgICAgIGNsb25lLmR5bmFtaWNWYWx1ZSA9IHRoaXMuZHluYW1pY1ZhbHVlO1xuICAgICAgICBjbG9uZS5zY29wZSA9IHRoaXMuc2NvcGU7XG4gICAgICAgIGNsb25lLnR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgIGNsb25lLmZhY3RvcnkgPSB0aGlzLmZhY3Rvcnk7XG4gICAgICAgIGNsb25lLnByb3ZpZGVyID0gdGhpcy5wcm92aWRlcjtcbiAgICAgICAgY2xvbmUuY29uc3RyYWludCA9IHRoaXMuY29uc3RyYWludDtcbiAgICAgICAgY2xvbmUub25BY3RpdmF0aW9uID0gdGhpcy5vbkFjdGl2YXRpb247XG4gICAgICAgIGNsb25lLmNhY2hlID0gdGhpcy5jYWNoZTtcbiAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmc7XG59KCkpO1xuZXhwb3J0cy5CaW5kaW5nID0gQmluZGluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEJpbmRpbmdDb3VudCA9IHtcbiAgICBNdWx0aXBsZUJpbmRpbmdzQXZhaWxhYmxlOiAyLFxuICAgIE5vQmluZGluZ3NBdmFpbGFibGU6IDAsXG4gICAgT25seU9uZUJpbmRpbmdBdmFpbGFibGU6IDFcbn07XG5leHBvcnRzLkJpbmRpbmdDb3VudCA9IEJpbmRpbmdDb3VudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EVVBMSUNBVEVEX0lOSkVDVEFCTEVfREVDT1JBVE9SID0gXCJDYW5ub3QgYXBwbHkgQGluamVjdGFibGUgZGVjb3JhdG9yIG11bHRpcGxlIHRpbWVzLlwiO1xuZXhwb3J0cy5EVVBMSUNBVEVEX01FVEFEQVRBID0gXCJNZXRhZGF0YSBrZXkgd2FzIHVzZWQgbW9yZSB0aGFuIG9uY2UgaW4gYSBwYXJhbWV0ZXI6XCI7XG5leHBvcnRzLk5VTExfQVJHVU1FTlQgPSBcIk5VTEwgYXJndW1lbnRcIjtcbmV4cG9ydHMuS0VZX05PVF9GT1VORCA9IFwiS2V5IE5vdCBGb3VuZFwiO1xuZXhwb3J0cy5BTUJJR1VPVVNfTUFUQ0ggPSBcIkFtYmlndW91cyBtYXRjaCBmb3VuZCBmb3Igc2VydmljZUlkZW50aWZpZXI6XCI7XG5leHBvcnRzLkNBTk5PVF9VTkJJTkQgPSBcIkNvdWxkIG5vdCB1bmJpbmQgc2VydmljZUlkZW50aWZpZXI6XCI7XG5leHBvcnRzLk5PVF9SRUdJU1RFUkVEID0gXCJObyBtYXRjaGluZyBiaW5kaW5ncyBmb3VuZCBmb3Igc2VydmljZUlkZW50aWZpZXI6XCI7XG5leHBvcnRzLk1JU1NJTkdfSU5KRUNUQUJMRV9BTk5PVEFUSU9OID0gXCJNaXNzaW5nIHJlcXVpcmVkIEBpbmplY3RhYmxlIGFubm90YXRpb24gaW46XCI7XG5leHBvcnRzLk1JU1NJTkdfSU5KRUNUX0FOTk9UQVRJT04gPSBcIk1pc3NpbmcgcmVxdWlyZWQgQGluamVjdCBvciBAbXVsdGlJbmplY3QgYW5ub3RhdGlvbiBpbjpcIjtcbmV4cG9ydHMuVU5ERUZJTkVEX0lOSkVDVF9BTk5PVEFUSU9OID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gXCJAaW5qZWN0IGNhbGxlZCB3aXRoIHVuZGVmaW5lZCB0aGlzIGNvdWxkIG1lYW4gdGhhdCB0aGUgY2xhc3MgXCIgKyBuYW1lICsgXCIgaGFzIFwiICtcbiAgICAgICAgXCJhIGNpcmN1bGFyIGRlcGVuZGVuY3kgcHJvYmxlbS4gWW91IGNhbiB1c2UgYSBMYXp5U2VydmljZUlkZW50aWZlciB0byAgXCIgK1xuICAgICAgICBcIm92ZXJjb21lIHRoaXMgbGltaXRhdGlvbi5cIjtcbn07XG5leHBvcnRzLkNJUkNVTEFSX0RFUEVOREVOQ1kgPSBcIkNpcmN1bGFyIGRlcGVuZGVuY3kgZm91bmQ6XCI7XG5leHBvcnRzLk5PVF9JTVBMRU1FTlRFRCA9IFwiU29ycnksIHRoaXMgZmVhdHVyZSBpcyBub3QgZnVsbHkgaW1wbGVtZW50ZWQgeWV0LlwiO1xuZXhwb3J0cy5JTlZBTElEX0JJTkRJTkdfVFlQRSA9IFwiSW52YWxpZCBiaW5kaW5nIHR5cGU6XCI7XG5leHBvcnRzLk5PX01PUkVfU05BUFNIT1RTX0FWQUlMQUJMRSA9IFwiTm8gc25hcHNob3QgYXZhaWxhYmxlIHRvIHJlc3RvcmUuXCI7XG5leHBvcnRzLklOVkFMSURfTUlERExFV0FSRV9SRVRVUk4gPSBcIkludmFsaWQgcmV0dXJuIHR5cGUgaW4gbWlkZGxld2FyZS4gTWlkZGxld2FyZSBtdXN0IHJldHVybiFcIjtcbmV4cG9ydHMuSU5WQUxJRF9GVU5DVElPTl9CSU5ESU5HID0gXCJWYWx1ZSBwcm92aWRlZCB0byBmdW5jdGlvbiBiaW5kaW5nIG11c3QgYmUgYSBmdW5jdGlvbiFcIjtcbmV4cG9ydHMuSU5WQUxJRF9UT19TRUxGX1ZBTFVFID0gXCJUaGUgdG9TZWxmIGZ1bmN0aW9uIGNhbiBvbmx5IGJlIGFwcGxpZWQgd2hlbiBhIGNvbnN0cnVjdG9yIGlzIFwiICtcbiAgICBcInVzZWQgYXMgc2VydmljZSBpZGVudGlmaWVyXCI7XG5leHBvcnRzLklOVkFMSURfREVDT1JBVE9SX09QRVJBVElPTiA9IFwiVGhlIEBpbmplY3QgQG11bHRpSW5qZWN0IEB0YWdnZWQgYW5kIEBuYW1lZCBkZWNvcmF0b3JzIFwiICtcbiAgICBcIm11c3QgYmUgYXBwbGllZCB0byB0aGUgcGFyYW1ldGVycyBvZiBhIGNsYXNzIGNvbnN0cnVjdG9yIG9yIGEgY2xhc3MgcHJvcGVydHkuXCI7XG5leHBvcnRzLkFSR1VNRU5UU19MRU5HVEhfTUlTTUFUQ0ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhbHVlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gXCJUaGUgbnVtYmVyIG9mIGNvbnN0cnVjdG9yIGFyZ3VtZW50cyBpbiB0aGUgZGVyaXZlZCBjbGFzcyBcIiArXG4gICAgICAgICh2YWx1ZXNbMF0gKyBcIiBtdXN0IGJlID49IHRoYW4gdGhlIG51bWJlciBvZiBjb25zdHJ1Y3RvciBhcmd1bWVudHMgb2YgaXRzIGJhc2UgY2xhc3MuXCIpO1xufTtcbmV4cG9ydHMuQ09OVEFJTkVSX09QVElPTlNfTVVTVF9CRV9BTl9PQkpFQ1QgPSBcIkludmFsaWQgQ29udGFpbmVyIGNvbnN0cnVjdG9yIGFyZ3VtZW50LiBDb250YWluZXIgb3B0aW9ucyBcIiArXG4gICAgXCJtdXN0IGJlIGFuIG9iamVjdC5cIjtcbmV4cG9ydHMuQ09OVEFJTkVSX09QVElPTlNfSU5WQUxJRF9ERUZBVUxUX1NDT1BFID0gXCJJbnZhbGlkIENvbnRhaW5lciBvcHRpb24uIERlZmF1bHQgc2NvcGUgbXVzdCBcIiArXG4gICAgXCJiZSBhIHN0cmluZyAoJ3NpbmdsZXRvbicgb3IgJ3RyYW5zaWVudCcpLlwiO1xuZXhwb3J0cy5DT05UQUlORVJfT1BUSU9OU19JTlZBTElEX0FVVE9fQklORF9JTkpFQ1RBQkxFID0gXCJJbnZhbGlkIENvbnRhaW5lciBvcHRpb24uIEF1dG8gYmluZCBpbmplY3RhYmxlIG11c3QgXCIgK1xuICAgIFwiYmUgYSBib29sZWFuXCI7XG5leHBvcnRzLkNPTlRBSU5FUl9PUFRJT05TX0lOVkFMSURfU0tJUF9CQVNFX0NIRUNLID0gXCJJbnZhbGlkIENvbnRhaW5lciBvcHRpb24uIFNraXAgYmFzZSBjaGVjayBtdXN0IFwiICtcbiAgICBcImJlIGEgYm9vbGVhblwiO1xuZXhwb3J0cy5NVUxUSVBMRV9QT1NUX0NPTlNUUlVDVF9NRVRIT0RTID0gXCJDYW5ub3QgYXBwbHkgQHBvc3RDb25zdHJ1Y3QgZGVjb3JhdG9yIG11bHRpcGxlIHRpbWVzIGluIHRoZSBzYW1lIGNsYXNzXCI7XG5leHBvcnRzLlBPU1RfQ09OU1RSVUNUX0VSUk9SID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YWx1ZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIFwiQHBvc3RDb25zdHJ1Y3QgZXJyb3IgaW4gY2xhc3MgXCIgKyB2YWx1ZXNbMF0gKyBcIjogXCIgKyB2YWx1ZXNbMV07XG59O1xuZXhwb3J0cy5DSVJDVUxBUl9ERVBFTkRFTkNZX0lOX0ZBQ1RPUlkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhbHVlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gXCJJdCBsb29rcyBsaWtlIHRoZXJlIGlzIGEgY2lyY3VsYXIgZGVwZW5kZW5jeSBcIiArXG4gICAgICAgIChcImluIG9uZSBvZiB0aGUgJ1wiICsgdmFsdWVzWzBdICsgXCInIGJpbmRpbmdzLiBQbGVhc2UgaW52ZXN0aWdhdGUgYmluZGluZ3Mgd2l0aFwiKSArXG4gICAgICAgIChcInNlcnZpY2UgaWRlbnRpZmllciAnXCIgKyB2YWx1ZXNbMV0gKyBcIicuXCIpO1xufTtcbmV4cG9ydHMuU1RBQ0tfT1ZFUkZMT1cgPSBcIk1heGltdW0gY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBCaW5kaW5nU2NvcGVFbnVtID0ge1xuICAgIFJlcXVlc3Q6IFwiUmVxdWVzdFwiLFxuICAgIFNpbmdsZXRvbjogXCJTaW5nbGV0b25cIixcbiAgICBUcmFuc2llbnQ6IFwiVHJhbnNpZW50XCJcbn07XG5leHBvcnRzLkJpbmRpbmdTY29wZUVudW0gPSBCaW5kaW5nU2NvcGVFbnVtO1xudmFyIEJpbmRpbmdUeXBlRW51bSA9IHtcbiAgICBDb25zdGFudFZhbHVlOiBcIkNvbnN0YW50VmFsdWVcIixcbiAgICBDb25zdHJ1Y3RvcjogXCJDb25zdHJ1Y3RvclwiLFxuICAgIER5bmFtaWNWYWx1ZTogXCJEeW5hbWljVmFsdWVcIixcbiAgICBGYWN0b3J5OiBcIkZhY3RvcnlcIixcbiAgICBGdW5jdGlvbjogXCJGdW5jdGlvblwiLFxuICAgIEluc3RhbmNlOiBcIkluc3RhbmNlXCIsXG4gICAgSW52YWxpZDogXCJJbnZhbGlkXCIsXG4gICAgUHJvdmlkZXI6IFwiUHJvdmlkZXJcIlxufTtcbmV4cG9ydHMuQmluZGluZ1R5cGVFbnVtID0gQmluZGluZ1R5cGVFbnVtO1xudmFyIFRhcmdldFR5cGVFbnVtID0ge1xuICAgIENsYXNzUHJvcGVydHk6IFwiQ2xhc3NQcm9wZXJ0eVwiLFxuICAgIENvbnN0cnVjdG9yQXJndW1lbnQ6IFwiQ29uc3RydWN0b3JBcmd1bWVudFwiLFxuICAgIFZhcmlhYmxlOiBcIlZhcmlhYmxlXCJcbn07XG5leHBvcnRzLlRhcmdldFR5cGVFbnVtID0gVGFyZ2V0VHlwZUVudW07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTkFNRURfVEFHID0gXCJuYW1lZFwiO1xuZXhwb3J0cy5OQU1FX1RBRyA9IFwibmFtZVwiO1xuZXhwb3J0cy5VTk1BTkFHRURfVEFHID0gXCJ1bm1hbmFnZWRcIjtcbmV4cG9ydHMuT1BUSU9OQUxfVEFHID0gXCJvcHRpb25hbFwiO1xuZXhwb3J0cy5JTkpFQ1RfVEFHID0gXCJpbmplY3RcIjtcbmV4cG9ydHMuTVVMVElfSU5KRUNUX1RBRyA9IFwibXVsdGlfaW5qZWN0XCI7XG5leHBvcnRzLlRBR0dFRCA9IFwiaW52ZXJzaWZ5OnRhZ2dlZFwiO1xuZXhwb3J0cy5UQUdHRURfUFJPUCA9IFwiaW52ZXJzaWZ5OnRhZ2dlZF9wcm9wc1wiO1xuZXhwb3J0cy5QQVJBTV9UWVBFUyA9IFwiaW52ZXJzaWZ5OnBhcmFtdHlwZXNcIjtcbmV4cG9ydHMuREVTSUdOX1BBUkFNX1RZUEVTID0gXCJkZXNpZ246cGFyYW10eXBlc1wiO1xuZXhwb3J0cy5QT1NUX0NPTlNUUlVDVCA9IFwicG9zdF9jb25zdHJ1Y3RcIjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0geVtvcFswXSAmIDIgPyBcInJldHVyblwiIDogb3BbMF0gPyBcInRocm93XCIgOiBcIm5leHRcIl0pICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYmluZGluZ18xID0gcmVxdWlyZShcIi4uL2JpbmRpbmdzL2JpbmRpbmdcIik7XG52YXIgRVJST1JfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhX3JlYWRlcl8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhX3JlYWRlclwiKTtcbnZhciBwbGFubmVyXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvcGxhbm5lclwiKTtcbnZhciByZXNvbHZlcl8xID0gcmVxdWlyZShcIi4uL3Jlc29sdXRpb24vcmVzb2x2ZXJcIik7XG52YXIgYmluZGluZ190b19zeW50YXhfMSA9IHJlcXVpcmUoXCIuLi9zeW50YXgvYmluZGluZ190b19zeW50YXhcIik7XG52YXIgaWRfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9pZFwiKTtcbnZhciBzZXJpYWxpemF0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvc2VyaWFsaXphdGlvblwiKTtcbnZhciBjb250YWluZXJfc25hcHNob3RfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lcl9zbmFwc2hvdFwiKTtcbnZhciBsb29rdXBfMSA9IHJlcXVpcmUoXCIuL2xvb2t1cFwiKTtcbnZhciBDb250YWluZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lcihjb250YWluZXJPcHRpb25zKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gY29udGFpbmVyT3B0aW9ucyB8fCB7fTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcIiArIEVSUk9SX01TR1MuQ09OVEFJTkVSX09QVElPTlNfTVVTVF9CRV9BTl9PQkpFQ1QpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRTY29wZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvcHRpb25zLmRlZmF1bHRTY29wZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlRyYW5zaWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLmRlZmF1bHRTY29wZSAhPT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uU2luZ2xldG9uICYmXG4gICAgICAgICAgICBvcHRpb25zLmRlZmF1bHRTY29wZSAhPT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uVHJhbnNpZW50ICYmXG4gICAgICAgICAgICBvcHRpb25zLmRlZmF1bHRTY29wZSAhPT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uUmVxdWVzdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIgKyBFUlJPUl9NU0dTLkNPTlRBSU5FUl9PUFRJT05TX0lOVkFMSURfREVGQVVMVF9TQ09QRSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuYXV0b0JpbmRJbmplY3RhYmxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuYXV0b0JpbmRJbmplY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuYXV0b0JpbmRJbmplY3RhYmxlICE9PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIgKyBFUlJPUl9NU0dTLkNPTlRBSU5FUl9PUFRJT05TX0lOVkFMSURfQVVUT19CSU5EX0lOSkVDVEFCTEUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnNraXBCYXNlQ2xhc3NDaGVja3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3B0aW9ucy5za2lwQmFzZUNsYXNzQ2hlY2tzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuc2tpcEJhc2VDbGFzc0NoZWNrcyAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiICsgRVJST1JfTVNHUy5DT05UQUlORVJfT1BUSU9OU19JTlZBTElEX1NLSVBfQkFTRV9DSEVDSyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgYXV0b0JpbmRJbmplY3RhYmxlOiBvcHRpb25zLmF1dG9CaW5kSW5qZWN0YWJsZSxcbiAgICAgICAgICAgIGRlZmF1bHRTY29wZTogb3B0aW9ucy5kZWZhdWx0U2NvcGUsXG4gICAgICAgICAgICBza2lwQmFzZUNsYXNzQ2hlY2tzOiBvcHRpb25zLnNraXBCYXNlQ2xhc3NDaGVja3NcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkgPSBuZXcgbG9va3VwXzEuTG9va3VwKCk7XG4gICAgICAgIHRoaXMuX3NuYXBzaG90cyA9IFtdO1xuICAgICAgICB0aGlzLl9taWRkbGV3YXJlID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVJlYWRlciA9IG5ldyBtZXRhZGF0YV9yZWFkZXJfMS5NZXRhZGF0YVJlYWRlcigpO1xuICAgIH1cbiAgICBDb250YWluZXIubWVyZ2UgPSBmdW5jdGlvbiAoY29udGFpbmVyMSwgY29udGFpbmVyMikge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IENvbnRhaW5lcigpO1xuICAgICAgICB2YXIgYmluZGluZ0RpY3Rpb25hcnkgPSBwbGFubmVyXzEuZ2V0QmluZGluZ0RpY3Rpb25hcnkoY29udGFpbmVyKTtcbiAgICAgICAgdmFyIGJpbmRpbmdEaWN0aW9uYXJ5MSA9IHBsYW5uZXJfMS5nZXRCaW5kaW5nRGljdGlvbmFyeShjb250YWluZXIxKTtcbiAgICAgICAgdmFyIGJpbmRpbmdEaWN0aW9uYXJ5MiA9IHBsYW5uZXJfMS5nZXRCaW5kaW5nRGljdGlvbmFyeShjb250YWluZXIyKTtcbiAgICAgICAgZnVuY3Rpb24gY29weURpY3Rpb25hcnkob3JpZ2luLCBkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgb3JpZ2luLnRyYXZlcnNlKGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoYmluZGluZykge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5hZGQoYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllciwgYmluZGluZy5jbG9uZSgpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvcHlEaWN0aW9uYXJ5KGJpbmRpbmdEaWN0aW9uYXJ5MSwgYmluZGluZ0RpY3Rpb25hcnkpO1xuICAgICAgICBjb3B5RGljdGlvbmFyeShiaW5kaW5nRGljdGlvbmFyeTIsIGJpbmRpbmdEaWN0aW9uYXJ5KTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1vZHVsZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG1vZHVsZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZ2V0SGVscGVycyA9IHRoaXMuX2dldENvbnRhaW5lck1vZHVsZUhlbHBlcnNGYWN0b3J5KCk7XG4gICAgICAgIGZvciAodmFyIF9hID0gMCwgbW9kdWxlc18xID0gbW9kdWxlczsgX2EgPCBtb2R1bGVzXzEubGVuZ3RoOyBfYSsrKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudE1vZHVsZSA9IG1vZHVsZXNfMVtfYV07XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyTW9kdWxlSGVscGVycyA9IGdldEhlbHBlcnMoY3VycmVudE1vZHVsZS5pZCk7XG4gICAgICAgICAgICBjdXJyZW50TW9kdWxlLnJlZ2lzdHJ5KGNvbnRhaW5lck1vZHVsZUhlbHBlcnMuYmluZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLnVuYmluZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLmlzYm91bmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy5yZWJpbmRGdW5jdGlvbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUubG9hZEFzeW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbW9kdWxlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgbW9kdWxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBnZXRIZWxwZXJzLCBfYSwgbW9kdWxlc18yLCBjdXJyZW50TW9kdWxlLCBjb250YWluZXJNb2R1bGVIZWxwZXJzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SGVscGVycyA9IHRoaXMuX2dldENvbnRhaW5lck1vZHVsZUhlbHBlcnNGYWN0b3J5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IDAsIG1vZHVsZXNfMiA9IG1vZHVsZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKF9hIDwgbW9kdWxlc18yLmxlbmd0aCkpIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50TW9kdWxlID0gbW9kdWxlc18yW19hXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMgPSBnZXRIZWxwZXJzKGN1cnJlbnRNb2R1bGUuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBjdXJyZW50TW9kdWxlLnJlZ2lzdHJ5KGNvbnRhaW5lck1vZHVsZUhlbHBlcnMuYmluZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLnVuYmluZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLmlzYm91bmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy5yZWJpbmRGdW5jdGlvbildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hKys7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDFdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBtb2R1bGVzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBtb2R1bGVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbmRpdGlvbkZhY3RvcnkgPSBmdW5jdGlvbiAoZXhwZWN0ZWQpIHsgcmV0dXJuIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5tb2R1bGVJZCA9PT0gZXhwZWN0ZWQ7XG4gICAgICAgIH07IH07XG4gICAgICAgIG1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgICAgICB2YXIgY29uZGl0aW9uID0gY29uZGl0aW9uRmFjdG9yeShtb2R1bGUuaWQpO1xuICAgICAgICAgICAgX3RoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LnJlbW92ZUJ5Q29uZGl0aW9uKGNvbmRpdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHZhciBzY29wZSA9IHRoaXMub3B0aW9ucy5kZWZhdWx0U2NvcGUgfHwgbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uVHJhbnNpZW50O1xuICAgICAgICB2YXIgYmluZGluZyA9IG5ldyBiaW5kaW5nXzEuQmluZGluZyhzZXJ2aWNlSWRlbnRpZmllciwgc2NvcGUpO1xuICAgICAgICB0aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5hZGQoc2VydmljZUlkZW50aWZpZXIsIGJpbmRpbmcpO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfdG9fc3ludGF4XzEuQmluZGluZ1RvU3ludGF4KGJpbmRpbmcpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5yZWJpbmQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgdGhpcy51bmJpbmQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5iaW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5yZW1vdmUoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5DQU5OT1RfVU5CSU5EICsgXCIgXCIgKyBzZXJpYWxpemF0aW9uXzEuZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZyhzZXJ2aWNlSWRlbnRpZmllcikpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnVuYmluZEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkgPSBuZXcgbG9va3VwXzEuTG9va3VwKCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmlzQm91bmQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgdmFyIGJvdW5kID0gdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuaGFzS2V5KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKCFib3VuZCAmJiB0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgYm91bmQgPSB0aGlzLnBhcmVudC5pc0JvdW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm91bmQ7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmlzQm91bmROYW1lZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgbmFtZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNCb3VuZFRhZ2dlZChzZXJ2aWNlSWRlbnRpZmllciwgTUVUQURBVEFfS0VZLk5BTUVEX1RBRywgbmFtZWQpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5pc0JvdW5kVGFnZ2VkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciBib3VuZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuaGFzS2V5KHNlcnZpY2VJZGVudGlmaWVyKSkge1xuICAgICAgICAgICAgdmFyIGJpbmRpbmdzID0gdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgIHZhciByZXF1ZXN0XzEgPSBwbGFubmVyXzEuY3JlYXRlTW9ja1JlcXVlc3QodGhpcywgc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgYm91bmQgPSBiaW5kaW5ncy5zb21lKGZ1bmN0aW9uIChiKSB7IHJldHVybiBiLmNvbnN0cmFpbnQocmVxdWVzdF8xKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFib3VuZCAmJiB0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgYm91bmQgPSB0aGlzLnBhcmVudC5pc0JvdW5kVGFnZ2VkKHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm91bmQ7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnNuYXBzaG90ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zbmFwc2hvdHMucHVzaChjb250YWluZXJfc25hcHNob3RfMS5Db250YWluZXJTbmFwc2hvdC5vZih0aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5jbG9uZSgpLCB0aGlzLl9taWRkbGV3YXJlKSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzbmFwc2hvdCA9IHRoaXMuX3NuYXBzaG90cy5wb3AoKTtcbiAgICAgICAgaWYgKHNuYXBzaG90ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLk5PX01PUkVfU05BUFNIT1RTX0FWQUlMQUJMRSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkgPSBzbmFwc2hvdC5iaW5kaW5ncztcbiAgICAgICAgdGhpcy5fbWlkZGxld2FyZSA9IHNuYXBzaG90Lm1pZGRsZXdhcmU7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmNyZWF0ZUNoaWxkID0gZnVuY3Rpb24gKGNvbnRhaW5lck9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGNoaWxkID0gbmV3IENvbnRhaW5lcihjb250YWluZXJPcHRpb25zIHx8IHRoaXMub3B0aW9ucyk7XG4gICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuYXBwbHlNaWRkbGV3YXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbWlkZGxld2FyZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG1pZGRsZXdhcmVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluaXRpYWwgPSAodGhpcy5fbWlkZGxld2FyZSkgPyB0aGlzLl9taWRkbGV3YXJlIDogdGhpcy5fcGxhbkFuZFJlc29sdmUoKTtcbiAgICAgICAgdGhpcy5fbWlkZGxld2FyZSA9IG1pZGRsZXdhcmVzLnJlZHVjZShmdW5jdGlvbiAocHJldiwgY3VycikgeyByZXR1cm4gY3VycihwcmV2KTsgfSwgaW5pdGlhbCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmFwcGx5Q3VzdG9tTWV0YWRhdGFSZWFkZXIgPSBmdW5jdGlvbiAobWV0YWRhdGFSZWFkZXIpIHtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFSZWFkZXIgPSBtZXRhZGF0YVJlYWRlcjtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXQoZmFsc2UsIGZhbHNlLCBsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uVmFyaWFibGUsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0VGFnZ2VkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXQoZmFsc2UsIGZhbHNlLCBsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uVmFyaWFibGUsIHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0TmFtZWQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIG5hbWVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRhZ2dlZChzZXJ2aWNlSWRlbnRpZmllciwgTUVUQURBVEFfS0VZLk5BTUVEX1RBRywgbmFtZWQpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldCh0cnVlLCB0cnVlLCBsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uVmFyaWFibGUsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0QWxsVGFnZ2VkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXQoZmFsc2UsIHRydWUsIGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bS5WYXJpYWJsZSwgc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXRBbGxOYW1lZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgbmFtZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsVGFnZ2VkKHNlcnZpY2VJZGVudGlmaWVyLCBNRVRBREFUQV9LRVkuTkFNRURfVEFHLCBuYW1lZCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbiAoY29uc3RydWN0b3JGdW5jdGlvbikge1xuICAgICAgICB2YXIgdGVtcENvbnRhaW5lciA9IHRoaXMuY3JlYXRlQ2hpbGQoKTtcbiAgICAgICAgdGVtcENvbnRhaW5lci5iaW5kKGNvbnN0cnVjdG9yRnVuY3Rpb24pLnRvU2VsZigpO1xuICAgICAgICByZXR1cm4gdGVtcENvbnRhaW5lci5nZXQoY29uc3RydWN0b3JGdW5jdGlvbik7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9nZXRDb250YWluZXJNb2R1bGVIZWxwZXJzRmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHNldE1vZHVsZUlkID0gZnVuY3Rpb24gKGJpbmRpbmdUb1N5bnRheCwgbW9kdWxlSWQpIHtcbiAgICAgICAgICAgIGJpbmRpbmdUb1N5bnRheC5fYmluZGluZy5tb2R1bGVJZCA9IG1vZHVsZUlkO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0QmluZEZ1bmN0aW9uID0gZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9iaW5kID0gX3RoaXMuYmluZC5iaW5kKF90aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgYmluZGluZ1RvU3ludGF4ID0gX2JpbmQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIHNldE1vZHVsZUlkKGJpbmRpbmdUb1N5bnRheCwgbW9kdWxlSWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5nVG9TeW50YXg7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0VW5iaW5kRnVuY3Rpb24gPSBmdW5jdGlvbiAobW9kdWxlSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3VuYmluZCA9IF90aGlzLnVuYmluZC5iaW5kKF90aGlzKTtcbiAgICAgICAgICAgICAgICBfdW5iaW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHZhciBnZXRJc2JvdW5kRnVuY3Rpb24gPSBmdW5jdGlvbiAobW9kdWxlSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2lzQm91bmQgPSBfdGhpcy5pc0JvdW5kLmJpbmQoX3RoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfaXNCb3VuZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0UmViaW5kRnVuY3Rpb24gPSBmdW5jdGlvbiAobW9kdWxlSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3JlYmluZCA9IF90aGlzLnJlYmluZC5iaW5kKF90aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgYmluZGluZ1RvU3ludGF4ID0gX3JlYmluZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgc2V0TW9kdWxlSWQoYmluZGluZ1RvU3ludGF4LCBtb2R1bGVJZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdUb1N5bnRheDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobUlkKSB7IHJldHVybiAoe1xuICAgICAgICAgICAgYmluZEZ1bmN0aW9uOiBnZXRCaW5kRnVuY3Rpb24obUlkKSxcbiAgICAgICAgICAgIGlzYm91bmRGdW5jdGlvbjogZ2V0SXNib3VuZEZ1bmN0aW9uKG1JZCksXG4gICAgICAgICAgICByZWJpbmRGdW5jdGlvbjogZ2V0UmViaW5kRnVuY3Rpb24obUlkKSxcbiAgICAgICAgICAgIHVuYmluZEZ1bmN0aW9uOiBnZXRVbmJpbmRGdW5jdGlvbihtSWQpXG4gICAgICAgIH0pOyB9O1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZ2V0ID0gZnVuY3Rpb24gKGF2b2lkQ29uc3RyYWludHMsIGlzTXVsdGlJbmplY3QsIHRhcmdldFR5cGUsIHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgICAgICB2YXIgZGVmYXVsdEFyZ3MgPSB7XG4gICAgICAgICAgICBhdm9pZENvbnN0cmFpbnRzOiBhdm9pZENvbnN0cmFpbnRzLFxuICAgICAgICAgICAgY29udGV4dEludGVyY2VwdG9yOiBmdW5jdGlvbiAoY29udGV4dCkgeyByZXR1cm4gY29udGV4dDsgfSxcbiAgICAgICAgICAgIGlzTXVsdGlJbmplY3Q6IGlzTXVsdGlJbmplY3QsXG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIHNlcnZpY2VJZGVudGlmaWVyOiBzZXJ2aWNlSWRlbnRpZmllcixcbiAgICAgICAgICAgIHRhcmdldFR5cGU6IHRhcmdldFR5cGUsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuX21pZGRsZXdhcmUpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX21pZGRsZXdhcmUoZGVmYXVsdEFyZ3MpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkIHx8IHJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLklOVkFMSURfTUlERExFV0FSRV9SRVRVUk4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fcGxhbkFuZFJlc29sdmUoKShkZWZhdWx0QXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuX3BsYW5BbmRSZXNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gcGxhbm5lcl8xLnBsYW4oX3RoaXMuX21ldGFkYXRhUmVhZGVyLCBfdGhpcywgYXJncy5pc011bHRpSW5qZWN0LCBhcmdzLnRhcmdldFR5cGUsIGFyZ3Muc2VydmljZUlkZW50aWZpZXIsIGFyZ3Mua2V5LCBhcmdzLnZhbHVlLCBhcmdzLmF2b2lkQ29uc3RyYWludHMpO1xuICAgICAgICAgICAgY29udGV4dCA9IGFyZ3MuY29udGV4dEludGVyY2VwdG9yKGNvbnRleHQpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc29sdmVyXzEucmVzb2x2ZShjb250ZXh0KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGFpbmVyO1xufSgpKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gQ29udGFpbmVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaWRfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9pZFwiKTtcbnZhciBDb250YWluZXJNb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lck1vZHVsZShyZWdpc3RyeSkge1xuICAgICAgICB0aGlzLmlkID0gaWRfMS5pZCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5ID0gcmVnaXN0cnk7XG4gICAgfVxuICAgIHJldHVybiBDb250YWluZXJNb2R1bGU7XG59KCkpO1xuZXhwb3J0cy5Db250YWluZXJNb2R1bGUgPSBDb250YWluZXJNb2R1bGU7XG52YXIgQXN5bmNDb250YWluZXJNb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFzeW5jQ29udGFpbmVyTW9kdWxlKHJlZ2lzdHJ5KSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZF8xLmlkKCk7XG4gICAgICAgIHRoaXMucmVnaXN0cnkgPSByZWdpc3RyeTtcbiAgICB9XG4gICAgcmV0dXJuIEFzeW5jQ29udGFpbmVyTW9kdWxlO1xufSgpKTtcbmV4cG9ydHMuQXN5bmNDb250YWluZXJNb2R1bGUgPSBBc3luY0NvbnRhaW5lck1vZHVsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIENvbnRhaW5lclNuYXBzaG90ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250YWluZXJTbmFwc2hvdCgpIHtcbiAgICB9XG4gICAgQ29udGFpbmVyU25hcHNob3Qub2YgPSBmdW5jdGlvbiAoYmluZGluZ3MsIG1pZGRsZXdhcmUpIHtcbiAgICAgICAgdmFyIHNuYXBzaG90ID0gbmV3IENvbnRhaW5lclNuYXBzaG90KCk7XG4gICAgICAgIHNuYXBzaG90LmJpbmRpbmdzID0gYmluZGluZ3M7XG4gICAgICAgIHNuYXBzaG90Lm1pZGRsZXdhcmUgPSBtaWRkbGV3YXJlO1xuICAgICAgICByZXR1cm4gc25hcHNob3Q7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGFpbmVyU25hcHNob3Q7XG59KCkpO1xuZXhwb3J0cy5Db250YWluZXJTbmFwc2hvdCA9IENvbnRhaW5lclNuYXBzaG90O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRVJST1JfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBMb29rdXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExvb2t1cCgpIHtcbiAgICAgICAgdGhpcy5fbWFwID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBMb29rdXAucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcDtcbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCB2YWx1ZSkge1xuICAgICAgICBpZiAoc2VydmljZUlkZW50aWZpZXIgPT09IG51bGwgfHwgc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuTlVMTF9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLk5VTExfQVJHVU1FTlQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMuX21hcC5nZXQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAoZW50cnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZW50cnkucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl9tYXAuc2V0KHNlcnZpY2VJZGVudGlmaWVyLCBlbnRyeSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAuc2V0KHNlcnZpY2VJZGVudGlmaWVyLCBbdmFsdWVdKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgaWYgKHNlcnZpY2VJZGVudGlmaWVyID09PSBudWxsIHx8IHNlcnZpY2VJZGVudGlmaWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLk5VTExfQVJHVU1FTlQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMuX21hcC5nZXQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAoZW50cnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGVudHJ5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuS0VZX05PVF9GT1VORCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllciA9PT0gbnVsbCB8fCBzZXJ2aWNlSWRlbnRpZmllciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5OVUxMX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX21hcC5kZWxldGUoc2VydmljZUlkZW50aWZpZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5LRVlfTk9UX0ZPVU5EKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS5yZW1vdmVCeUNvbmRpdGlvbiA9IGZ1bmN0aW9uIChjb25kaXRpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fbWFwLmZvckVhY2goZnVuY3Rpb24gKGVudHJpZXMsIGtleSkge1xuICAgICAgICAgICAgdmFyIHVwZGF0ZWRFbnRyaWVzID0gZW50cmllcy5maWx0ZXIoZnVuY3Rpb24gKGVudHJ5KSB7IHJldHVybiAhY29uZGl0aW9uKGVudHJ5KTsgfSk7XG4gICAgICAgICAgICBpZiAodXBkYXRlZEVudHJpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9tYXAuc2V0KGtleSwgdXBkYXRlZEVudHJpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX21hcC5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLmhhc0tleSA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICBpZiAoc2VydmljZUlkZW50aWZpZXIgPT09IG51bGwgfHwgc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuTlVMTF9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC5oYXMoc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvcHkgPSBuZXcgTG9va3VwKCk7XG4gICAgICAgIHRoaXMuX21hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChiKSB7IHJldHVybiBjb3B5LmFkZChrZXksIGIuY2xvbmUoKSk7IH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLnRyYXZlcnNlID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgdGhpcy5fbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIGZ1bmMoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIExvb2t1cDtcbn0oKSk7XG5leHBvcnRzLkxvb2t1cCA9IExvb2t1cDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGtleXMgPSByZXF1aXJlKFwiLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbmV4cG9ydHMuTUVUQURBVEFfS0VZID0ga2V5cztcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lci9jb250YWluZXJcIik7XG5leHBvcnRzLkNvbnRhaW5lciA9IGNvbnRhaW5lcl8xLkNvbnRhaW5lcjtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbmV4cG9ydHMuQmluZGluZ1Njb3BlRW51bSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtO1xuZXhwb3J0cy5CaW5kaW5nVHlwZUVudW0gPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtO1xuZXhwb3J0cy5UYXJnZXRUeXBlRW51bSA9IGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bTtcbnZhciBjb250YWluZXJfbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9jb250YWluZXIvY29udGFpbmVyX21vZHVsZVwiKTtcbmV4cG9ydHMuQXN5bmNDb250YWluZXJNb2R1bGUgPSBjb250YWluZXJfbW9kdWxlXzEuQXN5bmNDb250YWluZXJNb2R1bGU7XG5leHBvcnRzLkNvbnRhaW5lck1vZHVsZSA9IGNvbnRhaW5lcl9tb2R1bGVfMS5Db250YWluZXJNb2R1bGU7XG52YXIgaW5qZWN0YWJsZV8xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi9pbmplY3RhYmxlXCIpO1xuZXhwb3J0cy5pbmplY3RhYmxlID0gaW5qZWN0YWJsZV8xLmluamVjdGFibGU7XG52YXIgdGFnZ2VkXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL3RhZ2dlZFwiKTtcbmV4cG9ydHMudGFnZ2VkID0gdGFnZ2VkXzEudGFnZ2VkO1xudmFyIG5hbWVkXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL25hbWVkXCIpO1xuZXhwb3J0cy5uYW1lZCA9IG5hbWVkXzEubmFtZWQ7XG52YXIgaW5qZWN0XzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL2luamVjdFwiKTtcbmV4cG9ydHMuaW5qZWN0ID0gaW5qZWN0XzEuaW5qZWN0O1xuZXhwb3J0cy5MYXp5U2VydmljZUlkZW50aWZlciA9IGluamVjdF8xLkxhenlTZXJ2aWNlSWRlbnRpZmVyO1xudmFyIG9wdGlvbmFsXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL29wdGlvbmFsXCIpO1xuZXhwb3J0cy5vcHRpb25hbCA9IG9wdGlvbmFsXzEub3B0aW9uYWw7XG52YXIgdW5tYW5hZ2VkXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL3VubWFuYWdlZFwiKTtcbmV4cG9ydHMudW5tYW5hZ2VkID0gdW5tYW5hZ2VkXzEudW5tYW5hZ2VkO1xudmFyIG11bHRpX2luamVjdF8xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi9tdWx0aV9pbmplY3RcIik7XG5leHBvcnRzLm11bHRpSW5qZWN0ID0gbXVsdGlfaW5qZWN0XzEubXVsdGlJbmplY3Q7XG52YXIgdGFyZ2V0X25hbWVfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vdGFyZ2V0X25hbWVcIik7XG5leHBvcnRzLnRhcmdldE5hbWUgPSB0YXJnZXRfbmFtZV8xLnRhcmdldE5hbWU7XG52YXIgcG9zdF9jb25zdHJ1Y3RfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vcG9zdF9jb25zdHJ1Y3RcIik7XG5leHBvcnRzLnBvc3RDb25zdHJ1Y3QgPSBwb3N0X2NvbnN0cnVjdF8xLnBvc3RDb25zdHJ1Y3Q7XG52YXIgbWV0YWRhdGFfcmVhZGVyXzEgPSByZXF1aXJlKFwiLi9wbGFubmluZy9tZXRhZGF0YV9yZWFkZXJcIik7XG5leHBvcnRzLk1ldGFkYXRhUmVhZGVyID0gbWV0YWRhdGFfcmVhZGVyXzEuTWV0YWRhdGFSZWFkZXI7XG52YXIgaWRfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2lkXCIpO1xuZXhwb3J0cy5pZCA9IGlkXzEuaWQ7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL2RlY29yYXRvcl91dGlsc1wiKTtcbmV4cG9ydHMuZGVjb3JhdGUgPSBkZWNvcmF0b3JfdXRpbHNfMS5kZWNvcmF0ZTtcbnZhciBjb25zdHJhaW50X2hlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL3N5bnRheC9jb25zdHJhaW50X2hlbHBlcnNcIik7XG5leHBvcnRzLnRyYXZlcnNlQW5jZXJzdG9ycyA9IGNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycztcbmV4cG9ydHMudGFnZ2VkQ29uc3RyYWludCA9IGNvbnN0cmFpbnRfaGVscGVyc18xLnRhZ2dlZENvbnN0cmFpbnQ7XG5leHBvcnRzLm5hbWVkQ29uc3RyYWludCA9IGNvbnN0cmFpbnRfaGVscGVyc18xLm5hbWVkQ29uc3RyYWludDtcbmV4cG9ydHMudHlwZUNvbnN0cmFpbnQgPSBjb25zdHJhaW50X2hlbHBlcnNfMS50eXBlQ29uc3RyYWludDtcbnZhciBzZXJpYWxpemF0aW9uXzEgPSByZXF1aXJlKFwiLi91dGlscy9zZXJpYWxpemF0aW9uXCIpO1xuZXhwb3J0cy5nZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nID0gc2VyaWFsaXphdGlvbl8xLmdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmc7XG52YXIgYmluZGluZ191dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHMvYmluZGluZ191dGlsc1wiKTtcbmV4cG9ydHMubXVsdGlCaW5kVG9TZXJ2aWNlID0gYmluZGluZ191dGlsc18xLm11bHRpQmluZFRvU2VydmljZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgQ29udGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dChjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgfVxuICAgIENvbnRleHQucHJvdG90eXBlLmFkZFBsYW4gPSBmdW5jdGlvbiAocGxhbikge1xuICAgICAgICB0aGlzLnBsYW4gPSBwbGFuO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuc2V0Q3VycmVudFJlcXVlc3QgPSBmdW5jdGlvbiAoY3VycmVudFJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UmVxdWVzdCA9IGN1cnJlbnRSZXF1ZXN0O1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRleHQ7XG59KCkpO1xuZXhwb3J0cy5Db250ZXh0ID0gQ29udGV4dDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBNZXRhZGF0YSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWV0YWRhdGEoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBNZXRhZGF0YS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmtleSA9PT0gTUVUQURBVEFfS0VZLk5BTUVEX1RBRykge1xuICAgICAgICAgICAgcmV0dXJuIFwibmFtZWQ6IFwiICsgdGhpcy52YWx1ZS50b1N0cmluZygpICsgXCIgXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJ0YWdnZWQ6IHsga2V5OlwiICsgdGhpcy5rZXkudG9TdHJpbmcoKSArIFwiLCB2YWx1ZTogXCIgKyB0aGlzLnZhbHVlICsgXCIgfVwiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTWV0YWRhdGE7XG59KCkpO1xuZXhwb3J0cy5NZXRhZGF0YSA9IE1ldGFkYXRhO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIE1ldGFkYXRhUmVhZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXRhZGF0YVJlYWRlcigpIHtcbiAgICB9XG4gICAgTWV0YWRhdGFSZWFkZXIucHJvdG90eXBlLmdldENvbnN0cnVjdG9yTWV0YWRhdGEgPSBmdW5jdGlvbiAoY29uc3RydWN0b3JGdW5jKSB7XG4gICAgICAgIHZhciBjb21waWxlckdlbmVyYXRlZE1ldGFkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YShNRVRBREFUQV9LRVkuUEFSQU1fVFlQRVMsIGNvbnN0cnVjdG9yRnVuYyk7XG4gICAgICAgIHZhciB1c2VyR2VuZXJhdGVkTWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKE1FVEFEQVRBX0tFWS5UQUdHRUQsIGNvbnN0cnVjdG9yRnVuYyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21waWxlckdlbmVyYXRlZE1ldGFkYXRhOiBjb21waWxlckdlbmVyYXRlZE1ldGFkYXRhLFxuICAgICAgICAgICAgdXNlckdlbmVyYXRlZE1ldGFkYXRhOiB1c2VyR2VuZXJhdGVkTWV0YWRhdGEgfHwge31cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE1ldGFkYXRhUmVhZGVyLnByb3RvdHlwZS5nZXRQcm9wZXJ0aWVzTWV0YWRhdGEgPSBmdW5jdGlvbiAoY29uc3RydWN0b3JGdW5jKSB7XG4gICAgICAgIHZhciB1c2VyR2VuZXJhdGVkTWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKE1FVEFEQVRBX0tFWS5UQUdHRURfUFJPUCwgY29uc3RydWN0b3JGdW5jKSB8fCBbXTtcbiAgICAgICAgcmV0dXJuIHVzZXJHZW5lcmF0ZWRNZXRhZGF0YTtcbiAgICB9O1xuICAgIHJldHVybiBNZXRhZGF0YVJlYWRlcjtcbn0oKSk7XG5leHBvcnRzLk1ldGFkYXRhUmVhZGVyID0gTWV0YWRhdGFSZWFkZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBQbGFuID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQbGFuKHBhcmVudENvbnRleHQsIHJvb3RSZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucGFyZW50Q29udGV4dCA9IHBhcmVudENvbnRleHQ7XG4gICAgICAgIHRoaXMucm9vdFJlcXVlc3QgPSByb290UmVxdWVzdDtcbiAgICB9XG4gICAgcmV0dXJuIFBsYW47XG59KCkpO1xuZXhwb3J0cy5QbGFuID0gUGxhbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGJpbmRpbmdfY291bnRfMSA9IHJlcXVpcmUoXCIuLi9iaW5kaW5ncy9iaW5kaW5nX2NvdW50XCIpO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBleGNlcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvZXhjZXB0aW9uc1wiKTtcbnZhciBzZXJpYWxpemF0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvc2VyaWFsaXphdGlvblwiKTtcbnZhciBjb250ZXh0XzEgPSByZXF1aXJlKFwiLi9jb250ZXh0XCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi9tZXRhZGF0YVwiKTtcbnZhciBwbGFuXzEgPSByZXF1aXJlKFwiLi9wbGFuXCIpO1xudmFyIHJlZmxlY3Rpb25fdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3JlZmxlY3Rpb25fdXRpbHNcIik7XG52YXIgcmVxdWVzdF8xID0gcmVxdWlyZShcIi4vcmVxdWVzdFwiKTtcbnZhciB0YXJnZXRfMSA9IHJlcXVpcmUoXCIuL3RhcmdldFwiKTtcbmZ1bmN0aW9uIGdldEJpbmRpbmdEaWN0aW9uYXJ5KGNudG5yKSB7XG4gICAgcmV0dXJuIGNudG5yLl9iaW5kaW5nRGljdGlvbmFyeTtcbn1cbmV4cG9ydHMuZ2V0QmluZGluZ0RpY3Rpb25hcnkgPSBnZXRCaW5kaW5nRGljdGlvbmFyeTtcbmZ1bmN0aW9uIF9jcmVhdGVUYXJnZXQoaXNNdWx0aUluamVjdCwgdGFyZ2V0VHlwZSwgc2VydmljZUlkZW50aWZpZXIsIG5hbWUsIGtleSwgdmFsdWUpIHtcbiAgICB2YXIgbWV0YWRhdGFLZXkgPSBpc011bHRpSW5qZWN0ID8gTUVUQURBVEFfS0VZLk1VTFRJX0lOSkVDVF9UQUcgOiBNRVRBREFUQV9LRVkuSU5KRUNUX1RBRztcbiAgICB2YXIgaW5qZWN0TWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShtZXRhZGF0YUtleSwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgIHZhciB0YXJnZXQgPSBuZXcgdGFyZ2V0XzEuVGFyZ2V0KHRhcmdldFR5cGUsIG5hbWUsIHNlcnZpY2VJZGVudGlmaWVyLCBpbmplY3RNZXRhZGF0YSk7XG4gICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciB0YWdNZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKGtleSwgdmFsdWUpO1xuICAgICAgICB0YXJnZXQubWV0YWRhdGEucHVzaCh0YWdNZXRhZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBfZ2V0QWN0aXZlQmluZGluZ3MobWV0YWRhdGFSZWFkZXIsIGF2b2lkQ29uc3RyYWludHMsIGNvbnRleHQsIHBhcmVudFJlcXVlc3QsIHRhcmdldCkge1xuICAgIHZhciBiaW5kaW5ncyA9IGdldEJpbmRpbmdzKGNvbnRleHQuY29udGFpbmVyLCB0YXJnZXQuc2VydmljZUlkZW50aWZpZXIpO1xuICAgIHZhciBhY3RpdmVCaW5kaW5ncyA9IFtdO1xuICAgIGlmIChiaW5kaW5ncy5sZW5ndGggPT09IGJpbmRpbmdfY291bnRfMS5CaW5kaW5nQ291bnQuTm9CaW5kaW5nc0F2YWlsYWJsZSAmJlxuICAgICAgICBjb250ZXh0LmNvbnRhaW5lci5vcHRpb25zLmF1dG9CaW5kSW5qZWN0YWJsZSAmJlxuICAgICAgICB0eXBlb2YgdGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgbWV0YWRhdGFSZWFkZXIuZ2V0Q29uc3RydWN0b3JNZXRhZGF0YSh0YXJnZXQuc2VydmljZUlkZW50aWZpZXIpLmNvbXBpbGVyR2VuZXJhdGVkTWV0YWRhdGEpIHtcbiAgICAgICAgY29udGV4dC5jb250YWluZXIuYmluZCh0YXJnZXQuc2VydmljZUlkZW50aWZpZXIpLnRvU2VsZigpO1xuICAgICAgICBiaW5kaW5ncyA9IGdldEJpbmRpbmdzKGNvbnRleHQuY29udGFpbmVyLCB0YXJnZXQuc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH1cbiAgICBpZiAoIWF2b2lkQ29uc3RyYWludHMpIHtcbiAgICAgICAgYWN0aXZlQmluZGluZ3MgPSBiaW5kaW5ncy5maWx0ZXIoZnVuY3Rpb24gKGJpbmRpbmcpIHtcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IHJlcXVlc3RfMS5SZXF1ZXN0KGJpbmRpbmcuc2VydmljZUlkZW50aWZpZXIsIGNvbnRleHQsIHBhcmVudFJlcXVlc3QsIGJpbmRpbmcsIHRhcmdldCk7XG4gICAgICAgICAgICByZXR1cm4gYmluZGluZy5jb25zdHJhaW50KHJlcXVlc3QpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFjdGl2ZUJpbmRpbmdzID0gYmluZGluZ3M7XG4gICAgfVxuICAgIF92YWxpZGF0ZUFjdGl2ZUJpbmRpbmdDb3VudCh0YXJnZXQuc2VydmljZUlkZW50aWZpZXIsIGFjdGl2ZUJpbmRpbmdzLCB0YXJnZXQsIGNvbnRleHQuY29udGFpbmVyKTtcbiAgICByZXR1cm4gYWN0aXZlQmluZGluZ3M7XG59XG5mdW5jdGlvbiBfdmFsaWRhdGVBY3RpdmVCaW5kaW5nQ291bnQoc2VydmljZUlkZW50aWZpZXIsIGJpbmRpbmdzLCB0YXJnZXQsIGNvbnRhaW5lcikge1xuICAgIHN3aXRjaCAoYmluZGluZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgYmluZGluZ19jb3VudF8xLkJpbmRpbmdDb3VudC5Ob0JpbmRpbmdzQXZhaWxhYmxlOlxuICAgICAgICAgICAgaWYgKHRhcmdldC5pc09wdGlvbmFsKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXJTdHJpbmcgPSBzZXJpYWxpemF0aW9uXzEuZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZyhzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IEVSUk9SX01TR1MuTk9UX1JFR0lTVEVSRUQ7XG4gICAgICAgICAgICAgICAgbXNnICs9IHNlcmlhbGl6YXRpb25fMS5saXN0TWV0YWRhdGFGb3JUYXJnZXQoc2VydmljZUlkZW50aWZpZXJTdHJpbmcsIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgbXNnICs9IHNlcmlhbGl6YXRpb25fMS5saXN0UmVnaXN0ZXJlZEJpbmRpbmdzRm9yU2VydmljZUlkZW50aWZpZXIoY29udGFpbmVyLCBzZXJ2aWNlSWRlbnRpZmllclN0cmluZywgZ2V0QmluZGluZ3MpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlIGJpbmRpbmdfY291bnRfMS5CaW5kaW5nQ291bnQuT25seU9uZUJpbmRpbmdBdmFpbGFibGU6XG4gICAgICAgICAgICBpZiAoIXRhcmdldC5pc0FycmF5KCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIGNhc2UgYmluZGluZ19jb3VudF8xLkJpbmRpbmdDb3VudC5NdWx0aXBsZUJpbmRpbmdzQXZhaWxhYmxlOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaWYgKCF0YXJnZXQuaXNBcnJheSgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nID0gc2VyaWFsaXphdGlvbl8xLmdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBFUlJPUl9NU0dTLkFNQklHVU9VU19NQVRDSCArIFwiIFwiICsgc2VydmljZUlkZW50aWZpZXJTdHJpbmc7XG4gICAgICAgICAgICAgICAgbXNnICs9IHNlcmlhbGl6YXRpb25fMS5saXN0UmVnaXN0ZXJlZEJpbmRpbmdzRm9yU2VydmljZUlkZW50aWZpZXIoY29udGFpbmVyLCBzZXJ2aWNlSWRlbnRpZmllclN0cmluZywgZ2V0QmluZGluZ3MpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdzO1xuICAgICAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIF9jcmVhdGVTdWJSZXF1ZXN0cyhtZXRhZGF0YVJlYWRlciwgYXZvaWRDb25zdHJhaW50cywgc2VydmljZUlkZW50aWZpZXIsIGNvbnRleHQsIHBhcmVudFJlcXVlc3QsIHRhcmdldCkge1xuICAgIHZhciBhY3RpdmVCaW5kaW5ncztcbiAgICB2YXIgY2hpbGRSZXF1ZXN0O1xuICAgIGlmIChwYXJlbnRSZXF1ZXN0ID09PSBudWxsKSB7XG4gICAgICAgIGFjdGl2ZUJpbmRpbmdzID0gX2dldEFjdGl2ZUJpbmRpbmdzKG1ldGFkYXRhUmVhZGVyLCBhdm9pZENvbnN0cmFpbnRzLCBjb250ZXh0LCBudWxsLCB0YXJnZXQpO1xuICAgICAgICBjaGlsZFJlcXVlc3QgPSBuZXcgcmVxdWVzdF8xLlJlcXVlc3Qoc2VydmljZUlkZW50aWZpZXIsIGNvbnRleHQsIG51bGwsIGFjdGl2ZUJpbmRpbmdzLCB0YXJnZXQpO1xuICAgICAgICB2YXIgdGhlUGxhbiA9IG5ldyBwbGFuXzEuUGxhbihjb250ZXh0LCBjaGlsZFJlcXVlc3QpO1xuICAgICAgICBjb250ZXh0LmFkZFBsYW4odGhlUGxhbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhY3RpdmVCaW5kaW5ncyA9IF9nZXRBY3RpdmVCaW5kaW5ncyhtZXRhZGF0YVJlYWRlciwgYXZvaWRDb25zdHJhaW50cywgY29udGV4dCwgcGFyZW50UmVxdWVzdCwgdGFyZ2V0KTtcbiAgICAgICAgY2hpbGRSZXF1ZXN0ID0gcGFyZW50UmVxdWVzdC5hZGRDaGlsZFJlcXVlc3QodGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyLCBhY3RpdmVCaW5kaW5ncywgdGFyZ2V0KTtcbiAgICB9XG4gICAgYWN0aXZlQmluZGluZ3MuZm9yRWFjaChmdW5jdGlvbiAoYmluZGluZykge1xuICAgICAgICB2YXIgc3ViQ2hpbGRSZXF1ZXN0ID0gbnVsbDtcbiAgICAgICAgaWYgKHRhcmdldC5pc0FycmF5KCkpIHtcbiAgICAgICAgICAgIHN1YkNoaWxkUmVxdWVzdCA9IGNoaWxkUmVxdWVzdC5hZGRDaGlsZFJlcXVlc3QoYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllciwgYmluZGluZywgdGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nLmNhY2hlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ViQ2hpbGRSZXF1ZXN0ID0gY2hpbGRSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChiaW5kaW5nLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uSW5zdGFuY2UgJiYgYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBkZXBlbmRlbmNpZXMgPSByZWZsZWN0aW9uX3V0aWxzXzEuZ2V0RGVwZW5kZW5jaWVzKG1ldGFkYXRhUmVhZGVyLCBiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSk7XG4gICAgICAgICAgICBpZiAoIWNvbnRleHQuY29udGFpbmVyLm9wdGlvbnMuc2tpcEJhc2VDbGFzc0NoZWNrcykge1xuICAgICAgICAgICAgICAgIHZhciBiYXNlQ2xhc3NEZXBlbmRlbmN5Q291bnQgPSByZWZsZWN0aW9uX3V0aWxzXzEuZ2V0QmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50KG1ldGFkYXRhUmVhZGVyLCBiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGRlcGVuZGVuY2llcy5sZW5ndGggPCBiYXNlQ2xhc3NEZXBlbmRlbmN5Q291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gRVJST1JfTVNHUy5BUkdVTUVOVFNfTEVOR1RIX01JU01BVENIKHJlZmxlY3Rpb25fdXRpbHNfMS5nZXRGdW5jdGlvbk5hbWUoYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXBlbmRlbmNpZXMuZm9yRWFjaChmdW5jdGlvbiAoZGVwZW5kZW5jeSkge1xuICAgICAgICAgICAgICAgIF9jcmVhdGVTdWJSZXF1ZXN0cyhtZXRhZGF0YVJlYWRlciwgZmFsc2UsIGRlcGVuZGVuY3kuc2VydmljZUlkZW50aWZpZXIsIGNvbnRleHQsIHN1YkNoaWxkUmVxdWVzdCwgZGVwZW5kZW5jeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0QmluZGluZ3MoY29udGFpbmVyLCBzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgIHZhciBiaW5kaW5ncyA9IFtdO1xuICAgIHZhciBiaW5kaW5nRGljdGlvbmFyeSA9IGdldEJpbmRpbmdEaWN0aW9uYXJ5KGNvbnRhaW5lcik7XG4gICAgaWYgKGJpbmRpbmdEaWN0aW9uYXJ5Lmhhc0tleShzZXJ2aWNlSWRlbnRpZmllcikpIHtcbiAgICAgICAgYmluZGluZ3MgPSBiaW5kaW5nRGljdGlvbmFyeS5nZXQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb250YWluZXIucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGJpbmRpbmdzID0gZ2V0QmluZGluZ3MoY29udGFpbmVyLnBhcmVudCwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH1cbiAgICByZXR1cm4gYmluZGluZ3M7XG59XG5mdW5jdGlvbiBwbGFuKG1ldGFkYXRhUmVhZGVyLCBjb250YWluZXIsIGlzTXVsdGlJbmplY3QsIHRhcmdldFR5cGUsIHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlLCBhdm9pZENvbnN0cmFpbnRzKSB7XG4gICAgaWYgKGF2b2lkQ29uc3RyYWludHMgPT09IHZvaWQgMCkgeyBhdm9pZENvbnN0cmFpbnRzID0gZmFsc2U7IH1cbiAgICB2YXIgY29udGV4dCA9IG5ldyBjb250ZXh0XzEuQ29udGV4dChjb250YWluZXIpO1xuICAgIHZhciB0YXJnZXQgPSBfY3JlYXRlVGFyZ2V0KGlzTXVsdGlJbmplY3QsIHRhcmdldFR5cGUsIHNlcnZpY2VJZGVudGlmaWVyLCBcIlwiLCBrZXksIHZhbHVlKTtcbiAgICB0cnkge1xuICAgICAgICBfY3JlYXRlU3ViUmVxdWVzdHMobWV0YWRhdGFSZWFkZXIsIGF2b2lkQ29uc3RyYWludHMsIHNlcnZpY2VJZGVudGlmaWVyLCBjb250ZXh0LCBudWxsLCB0YXJnZXQpO1xuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChleGNlcHRpb25zXzEuaXNTdGFja092ZXJmbG93RXhlcHRpb24oZXJyb3IpKSB7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5wbGFuKSB7XG4gICAgICAgICAgICAgICAgc2VyaWFsaXphdGlvbl8xLmNpcmN1bGFyRGVwZW5kZW5jeVRvRXhjZXB0aW9uKGNvbnRleHQucGxhbi5yb290UmVxdWVzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuZXhwb3J0cy5wbGFuID0gcGxhbjtcbmZ1bmN0aW9uIGNyZWF0ZU1vY2tSZXF1ZXN0KGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gbmV3IHRhcmdldF8xLlRhcmdldChsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uVmFyaWFibGUsIFwiXCIsIHNlcnZpY2VJZGVudGlmaWVyLCBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShrZXksIHZhbHVlKSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgY29udGV4dF8xLkNvbnRleHQoY29udGFpbmVyKTtcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyByZXF1ZXN0XzEuUmVxdWVzdChzZXJ2aWNlSWRlbnRpZmllciwgY29udGV4dCwgbnVsbCwgW10sIHRhcmdldCk7XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG59XG5leHBvcnRzLmNyZWF0ZU1vY2tSZXF1ZXN0ID0gY3JlYXRlTW9ja1JlcXVlc3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBRdWVyeWFibGVTdHJpbmcgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFF1ZXJ5YWJsZVN0cmluZyhzdHIpIHtcbiAgICAgICAgdGhpcy5zdHIgPSBzdHI7XG4gICAgfVxuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nKSA9PT0gMDtcbiAgICB9O1xuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbiAoc2VhcmNoU3RyaW5nKSB7XG4gICAgICAgIHZhciByZXZlcnNlU3RyaW5nID0gXCJcIjtcbiAgICAgICAgdmFyIHJldmVyc2VTZWFyY2hTdHJpbmcgPSBzZWFyY2hTdHJpbmcuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgICAgIHJldmVyc2VTdHJpbmcgPSB0aGlzLnN0ci5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRzV2l0aC5jYWxsKHsgc3RyOiByZXZlcnNlU3RyaW5nIH0sIHJldmVyc2VTZWFyY2hTdHJpbmcpO1xuICAgIH07XG4gICAgUXVlcnlhYmxlU3RyaW5nLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnN0ci5pbmRleE9mKHNlYXJjaFN0cmluZykgIT09IC0xKTtcbiAgICB9O1xuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKGNvbXBhcmVTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyID09PSBjb21wYXJlU3RyaW5nO1xuICAgIH07XG4gICAgUXVlcnlhYmxlU3RyaW5nLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgIH07XG4gICAgcmV0dXJuIFF1ZXJ5YWJsZVN0cmluZztcbn0oKSk7XG5leHBvcnRzLlF1ZXJ5YWJsZVN0cmluZyA9IFF1ZXJ5YWJsZVN0cmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGluamVjdF8xID0gcmVxdWlyZShcIi4uL2Fubm90YXRpb24vaW5qZWN0XCIpO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBzZXJpYWxpemF0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvc2VyaWFsaXphdGlvblwiKTtcbmV4cG9ydHMuZ2V0RnVuY3Rpb25OYW1lID0gc2VyaWFsaXphdGlvbl8xLmdldEZ1bmN0aW9uTmFtZTtcbnZhciB0YXJnZXRfMSA9IHJlcXVpcmUoXCIuL3RhcmdldFwiKTtcbmZ1bmN0aW9uIGdldERlcGVuZGVuY2llcyhtZXRhZGF0YVJlYWRlciwgZnVuYykge1xuICAgIHZhciBjb25zdHJ1Y3Rvck5hbWUgPSBzZXJpYWxpemF0aW9uXzEuZ2V0RnVuY3Rpb25OYW1lKGZ1bmMpO1xuICAgIHZhciB0YXJnZXRzID0gZ2V0VGFyZ2V0cyhtZXRhZGF0YVJlYWRlciwgY29uc3RydWN0b3JOYW1lLCBmdW5jLCBmYWxzZSk7XG4gICAgcmV0dXJuIHRhcmdldHM7XG59XG5leHBvcnRzLmdldERlcGVuZGVuY2llcyA9IGdldERlcGVuZGVuY2llcztcbmZ1bmN0aW9uIGdldFRhcmdldHMobWV0YWRhdGFSZWFkZXIsIGNvbnN0cnVjdG9yTmFtZSwgZnVuYywgaXNCYXNlQ2xhc3MpIHtcbiAgICB2YXIgbWV0YWRhdGEgPSBtZXRhZGF0YVJlYWRlci5nZXRDb25zdHJ1Y3Rvck1ldGFkYXRhKGZ1bmMpO1xuICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllcnMgPSBtZXRhZGF0YS5jb21waWxlckdlbmVyYXRlZE1ldGFkYXRhO1xuICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllcnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbXNnID0gRVJST1JfTVNHUy5NSVNTSU5HX0lOSkVDVEFCTEVfQU5OT1RBVElPTiArIFwiIFwiICsgY29uc3RydWN0b3JOYW1lICsgXCIuXCI7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbiAgICB2YXIgY29uc3RydWN0b3JBcmdzTWV0YWRhdGEgPSBtZXRhZGF0YS51c2VyR2VuZXJhdGVkTWV0YWRhdGE7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YSk7XG4gICAgdmFyIGhhc1VzZXJEZWNsYXJlZFVua25vd25JbmplY3Rpb25zID0gKGZ1bmMubGVuZ3RoID09PSAwICYmIGtleXMubGVuZ3RoID4gMCk7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAoaGFzVXNlckRlY2xhcmVkVW5rbm93bkluamVjdGlvbnMpID8ga2V5cy5sZW5ndGggOiBmdW5jLmxlbmd0aDtcbiAgICB2YXIgY29uc3RydWN0b3JUYXJnZXRzID0gZ2V0Q29uc3RydWN0b3JBcmdzQXNUYXJnZXRzKGlzQmFzZUNsYXNzLCBjb25zdHJ1Y3Rvck5hbWUsIHNlcnZpY2VJZGVudGlmaWVycywgY29uc3RydWN0b3JBcmdzTWV0YWRhdGEsIGl0ZXJhdGlvbnMpO1xuICAgIHZhciBwcm9wZXJ0eVRhcmdldHMgPSBnZXRDbGFzc1Byb3BzQXNUYXJnZXRzKG1ldGFkYXRhUmVhZGVyLCBmdW5jKTtcbiAgICB2YXIgdGFyZ2V0cyA9IGNvbnN0cnVjdG9yVGFyZ2V0cy5jb25jYXQocHJvcGVydHlUYXJnZXRzKTtcbiAgICByZXR1cm4gdGFyZ2V0cztcbn1cbmZ1bmN0aW9uIGdldENvbnN0cnVjdG9yQXJnc0FzVGFyZ2V0KGluZGV4LCBpc0Jhc2VDbGFzcywgY29uc3RydWN0b3JOYW1lLCBzZXJ2aWNlSWRlbnRpZmllcnMsIGNvbnN0cnVjdG9yQXJnc01ldGFkYXRhKSB7XG4gICAgdmFyIHRhcmdldE1ldGFkYXRhID0gY29uc3RydWN0b3JBcmdzTWV0YWRhdGFbaW5kZXgudG9TdHJpbmcoKV0gfHwgW107XG4gICAgdmFyIG1ldGFkYXRhID0gZm9ybWF0VGFyZ2V0TWV0YWRhdGEodGFyZ2V0TWV0YWRhdGEpO1xuICAgIHZhciBpc01hbmFnZWQgPSBtZXRhZGF0YS51bm1hbmFnZWQgIT09IHRydWU7XG4gICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXJzW2luZGV4XTtcbiAgICB2YXIgaW5qZWN0SWRlbnRpZmllciA9IChtZXRhZGF0YS5pbmplY3QgfHwgbWV0YWRhdGEubXVsdGlJbmplY3QpO1xuICAgIHNlcnZpY2VJZGVudGlmaWVyID0gKGluamVjdElkZW50aWZpZXIpID8gKGluamVjdElkZW50aWZpZXIpIDogc2VydmljZUlkZW50aWZpZXI7XG4gICAgaWYgKHNlcnZpY2VJZGVudGlmaWVyIGluc3RhbmNlb2YgaW5qZWN0XzEuTGF6eVNlcnZpY2VJZGVudGlmZXIpIHtcbiAgICAgICAgc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllci51bndyYXAoKTtcbiAgICB9XG4gICAgaWYgKGlzTWFuYWdlZCkge1xuICAgICAgICB2YXIgaXNPYmplY3QgPSBzZXJ2aWNlSWRlbnRpZmllciA9PT0gT2JqZWN0O1xuICAgICAgICB2YXIgaXNGdW5jdGlvbiA9IHNlcnZpY2VJZGVudGlmaWVyID09PSBGdW5jdGlvbjtcbiAgICAgICAgdmFyIGlzVW5kZWZpbmVkID0gc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIGlzVW5rbm93blR5cGUgPSAoaXNPYmplY3QgfHwgaXNGdW5jdGlvbiB8fCBpc1VuZGVmaW5lZCk7XG4gICAgICAgIGlmICghaXNCYXNlQ2xhc3MgJiYgaXNVbmtub3duVHlwZSkge1xuICAgICAgICAgICAgdmFyIG1zZyA9IEVSUk9SX01TR1MuTUlTU0lOR19JTkpFQ1RfQU5OT1RBVElPTiArIFwiIGFyZ3VtZW50IFwiICsgaW5kZXggKyBcIiBpbiBjbGFzcyBcIiArIGNvbnN0cnVjdG9yTmFtZSArIFwiLlwiO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRhcmdldCA9IG5ldyB0YXJnZXRfMS5UYXJnZXQobGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLkNvbnN0cnVjdG9yQXJndW1lbnQsIG1ldGFkYXRhLnRhcmdldE5hbWUsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgdGFyZ2V0Lm1ldGFkYXRhID0gdGFyZ2V0TWV0YWRhdGE7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gZ2V0Q29uc3RydWN0b3JBcmdzQXNUYXJnZXRzKGlzQmFzZUNsYXNzLCBjb25zdHJ1Y3Rvck5hbWUsIHNlcnZpY2VJZGVudGlmaWVycywgY29uc3RydWN0b3JBcmdzTWV0YWRhdGEsIGl0ZXJhdGlvbnMpIHtcbiAgICB2YXIgdGFyZ2V0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlcmF0aW9uczsgaSsrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGk7XG4gICAgICAgIHZhciB0YXJnZXQgPSBnZXRDb25zdHJ1Y3RvckFyZ3NBc1RhcmdldChpbmRleCwgaXNCYXNlQ2xhc3MsIGNvbnN0cnVjdG9yTmFtZSwgc2VydmljZUlkZW50aWZpZXJzLCBjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YSk7XG4gICAgICAgIGlmICh0YXJnZXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRzO1xufVxuZnVuY3Rpb24gZ2V0Q2xhc3NQcm9wc0FzVGFyZ2V0cyhtZXRhZGF0YVJlYWRlciwgY29uc3RydWN0b3JGdW5jKSB7XG4gICAgdmFyIGNsYXNzUHJvcHNNZXRhZGF0YSA9IG1ldGFkYXRhUmVhZGVyLmdldFByb3BlcnRpZXNNZXRhZGF0YShjb25zdHJ1Y3RvckZ1bmMpO1xuICAgIHZhciB0YXJnZXRzID0gW107XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhjbGFzc1Byb3BzTWV0YWRhdGEpO1xuICAgIGZvciAodmFyIF9pID0gMCwga2V5c18xID0ga2V5czsgX2kgPCBrZXlzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzXzFbX2ldO1xuICAgICAgICB2YXIgdGFyZ2V0TWV0YWRhdGEgPSBjbGFzc1Byb3BzTWV0YWRhdGFba2V5XTtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gZm9ybWF0VGFyZ2V0TWV0YWRhdGEoY2xhc3NQcm9wc01ldGFkYXRhW2tleV0pO1xuICAgICAgICB2YXIgdGFyZ2V0TmFtZSA9IG1ldGFkYXRhLnRhcmdldE5hbWUgfHwga2V5O1xuICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXIgPSAobWV0YWRhdGEuaW5qZWN0IHx8IG1ldGFkYXRhLm11bHRpSW5qZWN0KTtcbiAgICAgICAgdmFyIHRhcmdldCA9IG5ldyB0YXJnZXRfMS5UYXJnZXQobGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLkNsYXNzUHJvcGVydHksIHRhcmdldE5hbWUsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgdGFyZ2V0Lm1ldGFkYXRhID0gdGFyZ2V0TWV0YWRhdGE7XG4gICAgICAgIHRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgIH1cbiAgICB2YXIgYmFzZUNvbnN0cnVjdG9yID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yRnVuYy5wcm90b3R5cGUpLmNvbnN0cnVjdG9yO1xuICAgIGlmIChiYXNlQ29uc3RydWN0b3IgIT09IE9iamVjdCkge1xuICAgICAgICB2YXIgYmFzZVRhcmdldHMgPSBnZXRDbGFzc1Byb3BzQXNUYXJnZXRzKG1ldGFkYXRhUmVhZGVyLCBiYXNlQ29uc3RydWN0b3IpO1xuICAgICAgICB0YXJnZXRzID0gdGFyZ2V0cy5jb25jYXQoYmFzZVRhcmdldHMpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0cztcbn1cbmZ1bmN0aW9uIGdldEJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudChtZXRhZGF0YVJlYWRlciwgZnVuYykge1xuICAgIHZhciBiYXNlQ29uc3RydWN0b3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZnVuYy5wcm90b3R5cGUpLmNvbnN0cnVjdG9yO1xuICAgIGlmIChiYXNlQ29uc3RydWN0b3IgIT09IE9iamVjdCkge1xuICAgICAgICB2YXIgYmFzZUNvbnN0cnVjdG9yTmFtZSA9IHNlcmlhbGl6YXRpb25fMS5nZXRGdW5jdGlvbk5hbWUoYmFzZUNvbnN0cnVjdG9yKTtcbiAgICAgICAgdmFyIHRhcmdldHMgPSBnZXRUYXJnZXRzKG1ldGFkYXRhUmVhZGVyLCBiYXNlQ29uc3RydWN0b3JOYW1lLCBiYXNlQ29uc3RydWN0b3IsIHRydWUpO1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSB0YXJnZXRzLm1hcChmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQubWV0YWRhdGEuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG0ua2V5ID09PSBNRVRBREFUQV9LRVkuVU5NQU5BR0VEX1RBRztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHVubWFuYWdlZENvdW50ID0gW10uY29uY2F0LmFwcGx5KFtdLCBtZXRhZGF0YSkubGVuZ3RoO1xuICAgICAgICB2YXIgZGVwZW5kZW5jeUNvdW50ID0gdGFyZ2V0cy5sZW5ndGggLSB1bm1hbmFnZWRDb3VudDtcbiAgICAgICAgaWYgKGRlcGVuZGVuY3lDb3VudCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBkZXBlbmRlbmN5Q291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0QmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50KG1ldGFkYXRhUmVhZGVyLCBiYXNlQ29uc3RydWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG59XG5leHBvcnRzLmdldEJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudCA9IGdldEJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudDtcbmZ1bmN0aW9uIGZvcm1hdFRhcmdldE1ldGFkYXRhKHRhcmdldE1ldGFkYXRhKSB7XG4gICAgdmFyIHRhcmdldE1ldGFkYXRhTWFwID0ge307XG4gICAgdGFyZ2V0TWV0YWRhdGEuZm9yRWFjaChmdW5jdGlvbiAobSkge1xuICAgICAgICB0YXJnZXRNZXRhZGF0YU1hcFttLmtleS50b1N0cmluZygpXSA9IG0udmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5qZWN0OiB0YXJnZXRNZXRhZGF0YU1hcFtNRVRBREFUQV9LRVkuSU5KRUNUX1RBR10sXG4gICAgICAgIG11bHRpSW5qZWN0OiB0YXJnZXRNZXRhZGF0YU1hcFtNRVRBREFUQV9LRVkuTVVMVElfSU5KRUNUX1RBR10sXG4gICAgICAgIHRhcmdldE5hbWU6IHRhcmdldE1ldGFkYXRhTWFwW01FVEFEQVRBX0tFWS5OQU1FX1RBR10sXG4gICAgICAgIHVubWFuYWdlZDogdGFyZ2V0TWV0YWRhdGFNYXBbTUVUQURBVEFfS0VZLlVOTUFOQUdFRF9UQUddXG4gICAgfTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgUmVxdWVzdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVxdWVzdChzZXJ2aWNlSWRlbnRpZmllciwgcGFyZW50Q29udGV4dCwgcGFyZW50UmVxdWVzdCwgYmluZGluZ3MsIHRhcmdldCkge1xuICAgICAgICB0aGlzLmlkID0gaWRfMS5pZCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXI7XG4gICAgICAgIHRoaXMucGFyZW50Q29udGV4dCA9IHBhcmVudENvbnRleHQ7XG4gICAgICAgIHRoaXMucGFyZW50UmVxdWVzdCA9IHBhcmVudFJlcXVlc3Q7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB0aGlzLmNoaWxkUmVxdWVzdHMgPSBbXTtcbiAgICAgICAgdGhpcy5iaW5kaW5ncyA9IChBcnJheS5pc0FycmF5KGJpbmRpbmdzKSA/IGJpbmRpbmdzIDogW2JpbmRpbmdzXSk7XG4gICAgICAgIHRoaXMucmVxdWVzdFNjb3BlID0gcGFyZW50UmVxdWVzdCA9PT0gbnVsbFxuICAgICAgICAgICAgPyBuZXcgTWFwKClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG4gICAgUmVxdWVzdC5wcm90b3R5cGUuYWRkQ2hpbGRSZXF1ZXN0ID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBiaW5kaW5ncywgdGFyZ2V0KSB7XG4gICAgICAgIHZhciBjaGlsZCA9IG5ldyBSZXF1ZXN0KHNlcnZpY2VJZGVudGlmaWVyLCB0aGlzLnBhcmVudENvbnRleHQsIHRoaXMsIGJpbmRpbmdzLCB0YXJnZXQpO1xuICAgICAgICB0aGlzLmNoaWxkUmVxdWVzdHMucHVzaChjaGlsZCk7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9O1xuICAgIHJldHVybiBSZXF1ZXN0O1xufSgpKTtcbmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgaWRfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9pZFwiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4vbWV0YWRhdGFcIik7XG52YXIgcXVlcnlhYmxlX3N0cmluZ18xID0gcmVxdWlyZShcIi4vcXVlcnlhYmxlX3N0cmluZ1wiKTtcbnZhciBUYXJnZXQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhcmdldCh0eXBlLCBuYW1lLCBzZXJ2aWNlSWRlbnRpZmllciwgbmFtZWRPclRhZ2dlZCkge1xuICAgICAgICB0aGlzLmlkID0gaWRfMS5pZCgpO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnNlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXI7XG4gICAgICAgIHRoaXMubmFtZSA9IG5ldyBxdWVyeWFibGVfc3RyaW5nXzEuUXVlcnlhYmxlU3RyaW5nKG5hbWUgfHwgXCJcIik7XG4gICAgICAgIHRoaXMubWV0YWRhdGEgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdmFyIG1ldGFkYXRhSXRlbSA9IG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZWRPclRhZ2dlZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbWV0YWRhdGFJdGVtID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoTUVUQURBVEFfS0VZLk5BTUVEX1RBRywgbmFtZWRPclRhZ2dlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZWRPclRhZ2dlZCBpbnN0YW5jZW9mIG1ldGFkYXRhXzEuTWV0YWRhdGEpIHtcbiAgICAgICAgICAgIG1ldGFkYXRhSXRlbSA9IG5hbWVkT3JUYWdnZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1ldGFkYXRhSXRlbSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5tZXRhZGF0YS5wdXNoKG1ldGFkYXRhSXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5oYXNUYWcgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLm1ldGFkYXRhOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIG0gPSBfYVtfaV07XG4gICAgICAgICAgICBpZiAobS5rZXkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUuaXNBcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzVGFnKE1FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHKTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUubWF0Y2hlc0FycmF5ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlc1RhZyhNRVRBREFUQV9LRVkuTVVMVElfSU5KRUNUX1RBRykobmFtZSk7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmlzTmFtZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1RhZyhNRVRBREFUQV9LRVkuTkFNRURfVEFHKTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUuaXNUYWdnZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1ldGFkYXRhLnNvbWUoZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgIHJldHVybiAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5JTkpFQ1RfVEFHKSAmJlxuICAgICAgICAgICAgICAgIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLk1VTFRJX0lOSkVDVF9UQUcpICYmXG4gICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuTkFNRV9UQUcpICYmXG4gICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuVU5NQU5BR0VEX1RBRykgJiZcbiAgICAgICAgICAgICAgICAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUuaXNPcHRpb25hbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlc1RhZyhNRVRBREFUQV9LRVkuT1BUSU9OQUxfVEFHKSh0cnVlKTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUuZ2V0TmFtZWRUYWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTmFtZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWV0YWRhdGEuZmlsdGVyKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLmtleSA9PT0gTUVUQURBVEFfS0VZLk5BTUVEX1RBRzsgfSlbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmdldEN1c3RvbVRhZ3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVGFnZ2VkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1ldGFkYXRhLmZpbHRlcihmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5JTkpFQ1RfVEFHKSAmJlxuICAgICAgICAgICAgICAgICAgICAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHKSAmJlxuICAgICAgICAgICAgICAgICAgICAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5OQU1FX1RBRykgJiZcbiAgICAgICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuVU5NQU5BR0VEX1RBRykgJiZcbiAgICAgICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuTkFNRURfVEFHKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5tYXRjaGVzTmFtZWRUYWcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGVzVGFnKE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcpKG5hbWUpO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5tYXRjaGVzVGFnID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gX3RoaXMubWV0YWRhdGE7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG0gPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgaWYgKG0ua2V5ID09PSBrZXkgJiYgbS52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFRhcmdldDtcbn0oKSk7XG5leHBvcnRzLlRhcmdldCA9IFRhcmdldDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGVycm9yX21zZ3NfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xuZnVuY3Rpb24gX2luamVjdFByb3BlcnRpZXMoaW5zdGFuY2UsIGNoaWxkUmVxdWVzdHMsIHJlc29sdmVSZXF1ZXN0KSB7XG4gICAgdmFyIHByb3BlcnR5SW5qZWN0aW9uc1JlcXVlc3RzID0gY2hpbGRSZXF1ZXN0cy5maWx0ZXIoZnVuY3Rpb24gKGNoaWxkUmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gKGNoaWxkUmVxdWVzdC50YXJnZXQgIT09IG51bGwgJiZcbiAgICAgICAgICAgIGNoaWxkUmVxdWVzdC50YXJnZXQudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLkNsYXNzUHJvcGVydHkpO1xuICAgIH0pO1xuICAgIHZhciBwcm9wZXJ0eUluamVjdGlvbnMgPSBwcm9wZXJ0eUluamVjdGlvbnNSZXF1ZXN0cy5tYXAocmVzb2x2ZVJlcXVlc3QpO1xuICAgIHByb3BlcnR5SW5qZWN0aW9uc1JlcXVlc3RzLmZvckVhY2goZnVuY3Rpb24gKHIsIGluZGV4KSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSBcIlwiO1xuICAgICAgICBwcm9wZXJ0eU5hbWUgPSByLnRhcmdldC5uYW1lLnZhbHVlKCk7XG4gICAgICAgIHZhciBpbmplY3Rpb24gPSBwcm9wZXJ0eUluamVjdGlvbnNbaW5kZXhdO1xuICAgICAgICBpbnN0YW5jZVtwcm9wZXJ0eU5hbWVdID0gaW5qZWN0aW9uO1xuICAgIH0pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbn1cbmZ1bmN0aW9uIF9jcmVhdGVJbnN0YW5jZShGdW5jLCBpbmplY3Rpb25zKSB7XG4gICAgcmV0dXJuIG5ldyAoRnVuYy5iaW5kLmFwcGx5KEZ1bmMsIFt2b2lkIDBdLmNvbmNhdChpbmplY3Rpb25zKSkpKCk7XG59XG5mdW5jdGlvbiBfcG9zdENvbnN0cnVjdChjb25zdHIsIHJlc3VsdCkge1xuICAgIGlmIChSZWZsZWN0Lmhhc01ldGFkYXRhKE1FVEFEQVRBX0tFWS5QT1NUX0NPTlNUUlVDVCwgY29uc3RyKSkge1xuICAgICAgICB2YXIgZGF0YSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoTUVUQURBVEFfS0VZLlBPU1RfQ09OU1RSVUNULCBjb25zdHIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0W2RhdGEudmFsdWVdKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl9tc2dzXzEuUE9TVF9DT05TVFJVQ1RfRVJST1IoY29uc3RyLm5hbWUsIGUubWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gcmVzb2x2ZUluc3RhbmNlKGNvbnN0ciwgY2hpbGRSZXF1ZXN0cywgcmVzb2x2ZVJlcXVlc3QpIHtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICBpZiAoY2hpbGRSZXF1ZXN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBjb25zdHJ1Y3RvckluamVjdGlvbnNSZXF1ZXN0cyA9IGNoaWxkUmVxdWVzdHMuZmlsdGVyKGZ1bmN0aW9uIChjaGlsZFJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiAoY2hpbGRSZXF1ZXN0LnRhcmdldCAhPT0gbnVsbCAmJiBjaGlsZFJlcXVlc3QudGFyZ2V0LnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bS5Db25zdHJ1Y3RvckFyZ3VtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBjb25zdHJ1Y3RvckluamVjdGlvbnMgPSBjb25zdHJ1Y3RvckluamVjdGlvbnNSZXF1ZXN0cy5tYXAocmVzb2x2ZVJlcXVlc3QpO1xuICAgICAgICByZXN1bHQgPSBfY3JlYXRlSW5zdGFuY2UoY29uc3RyLCBjb25zdHJ1Y3RvckluamVjdGlvbnMpO1xuICAgICAgICByZXN1bHQgPSBfaW5qZWN0UHJvcGVydGllcyhyZXN1bHQsIGNoaWxkUmVxdWVzdHMsIHJlc29sdmVSZXF1ZXN0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBjb25zdHIoKTtcbiAgICB9XG4gICAgX3Bvc3RDb25zdHJ1Y3QoY29uc3RyLCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLnJlc29sdmVJbnN0YW5jZSA9IHJlc29sdmVJbnN0YW5jZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIGV4Y2VwdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9leGNlcHRpb25zXCIpO1xudmFyIHNlcmlhbGl6YXRpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlscy9zZXJpYWxpemF0aW9uXCIpO1xudmFyIGluc3RhbnRpYXRpb25fMSA9IHJlcXVpcmUoXCIuL2luc3RhbnRpYXRpb25cIik7XG52YXIgaW52b2tlRmFjdG9yeSA9IGZ1bmN0aW9uIChmYWN0b3J5VHlwZSwgc2VydmljZUlkZW50aWZpZXIsIGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXhjZXB0aW9uc18xLmlzU3RhY2tPdmVyZmxvd0V4ZXB0aW9uKGVycm9yKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuQ0lSQ1VMQVJfREVQRU5ERU5DWV9JTl9GQUNUT1JZKGZhY3RvcnlUeXBlLCBzZXJ2aWNlSWRlbnRpZmllci50b1N0cmluZygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbn07XG52YXIgX3Jlc29sdmVSZXF1ZXN0ID0gZnVuY3Rpb24gKHJlcXVlc3RTY29wZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICByZXF1ZXN0LnBhcmVudENvbnRleHQuc2V0Q3VycmVudFJlcXVlc3QocmVxdWVzdCk7XG4gICAgICAgIHZhciBiaW5kaW5ncyA9IHJlcXVlc3QuYmluZGluZ3M7XG4gICAgICAgIHZhciBjaGlsZFJlcXVlc3RzID0gcmVxdWVzdC5jaGlsZFJlcXVlc3RzO1xuICAgICAgICB2YXIgdGFyZ2V0SXNBbkFycmF5ID0gcmVxdWVzdC50YXJnZXQgJiYgcmVxdWVzdC50YXJnZXQuaXNBcnJheSgpO1xuICAgICAgICB2YXIgdGFyZ2V0UGFyZW50SXNOb3RBbkFycmF5ID0gIXJlcXVlc3QucGFyZW50UmVxdWVzdCB8fFxuICAgICAgICAgICAgIXJlcXVlc3QucGFyZW50UmVxdWVzdC50YXJnZXQgfHxcbiAgICAgICAgICAgICFyZXF1ZXN0LnRhcmdldCB8fFxuICAgICAgICAgICAgIXJlcXVlc3QucGFyZW50UmVxdWVzdC50YXJnZXQubWF0Y2hlc0FycmF5KHJlcXVlc3QudGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKHRhcmdldElzQW5BcnJheSAmJiB0YXJnZXRQYXJlbnRJc05vdEFuQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGlsZFJlcXVlc3RzLm1hcChmdW5jdGlvbiAoY2hpbGRSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIF9mID0gX3Jlc29sdmVSZXF1ZXN0KHJlcXVlc3RTY29wZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9mKGNoaWxkUmVxdWVzdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHJlcXVlc3QudGFyZ2V0LmlzT3B0aW9uYWwoKSAmJiBiaW5kaW5ncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGJpbmRpbmdfMSA9IGJpbmRpbmdzWzBdO1xuICAgICAgICAgICAgdmFyIGlzU2luZ2xldG9uID0gYmluZGluZ18xLnNjb3BlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5TaW5nbGV0b247XG4gICAgICAgICAgICB2YXIgaXNSZXF1ZXN0U2luZ2xldG9uID0gYmluZGluZ18xLnNjb3BlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5SZXF1ZXN0O1xuICAgICAgICAgICAgaWYgKGlzU2luZ2xldG9uICYmIGJpbmRpbmdfMS5hY3RpdmF0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZ18xLmNhY2hlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzUmVxdWVzdFNpbmdsZXRvbiAmJlxuICAgICAgICAgICAgICAgIHJlcXVlc3RTY29wZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHJlcXVlc3RTY29wZS5oYXMoYmluZGluZ18xLmlkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0U2NvcGUuZ2V0KGJpbmRpbmdfMS5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uQ29uc3RhbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGJpbmRpbmdfMS5jYWNoZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJpbmRpbmdfMS50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYmluZGluZ18xLmNhY2hlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uQ29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBiaW5kaW5nXzEuaW1wbGVtZW50YXRpb25UeXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uRHluYW1pY1ZhbHVlICYmIGJpbmRpbmdfMS5keW5hbWljVmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpbnZva2VGYWN0b3J5KFwidG9EeW5hbWljVmFsdWVcIiwgYmluZGluZ18xLnNlcnZpY2VJZGVudGlmaWVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBiaW5kaW5nXzEuZHluYW1pY1ZhbHVlKHJlcXVlc3QucGFyZW50Q29udGV4dCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uRmFjdG9yeSAmJiBiaW5kaW5nXzEuZmFjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGludm9rZUZhY3RvcnkoXCJ0b0ZhY3RvcnlcIiwgYmluZGluZ18xLnNlcnZpY2VJZGVudGlmaWVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBiaW5kaW5nXzEuZmFjdG9yeShyZXF1ZXN0LnBhcmVudENvbnRleHQpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJpbmRpbmdfMS50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLlByb3ZpZGVyICYmIGJpbmRpbmdfMS5wcm92aWRlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGludm9rZUZhY3RvcnkoXCJ0b1Byb3ZpZGVyXCIsIGJpbmRpbmdfMS5zZXJ2aWNlSWRlbnRpZmllciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gYmluZGluZ18xLnByb3ZpZGVyKHJlcXVlc3QucGFyZW50Q29udGV4dCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uSW5zdGFuY2UgJiYgYmluZGluZ18xLmltcGxlbWVudGF0aW9uVHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGluc3RhbnRpYXRpb25fMS5yZXNvbHZlSW5zdGFuY2UoYmluZGluZ18xLmltcGxlbWVudGF0aW9uVHlwZSwgY2hpbGRSZXF1ZXN0cywgX3Jlc29sdmVSZXF1ZXN0KHJlcXVlc3RTY29wZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyID0gc2VyaWFsaXphdGlvbl8xLmdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcocmVxdWVzdC5zZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuSU5WQUxJRF9CSU5ESU5HX1RZUEUgKyBcIiBcIiArIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYmluZGluZ18xLm9uQWN0aXZhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYmluZGluZ18xLm9uQWN0aXZhdGlvbihyZXF1ZXN0LnBhcmVudENvbnRleHQsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTaW5nbGV0b24pIHtcbiAgICAgICAgICAgICAgICBiaW5kaW5nXzEuY2FjaGUgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgYmluZGluZ18xLmFjdGl2YXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNSZXF1ZXN0U2luZ2xldG9uICYmXG4gICAgICAgICAgICAgICAgcmVxdWVzdFNjb3BlICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgIXJlcXVlc3RTY29wZS5oYXMoYmluZGluZ18xLmlkKSkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RTY29wZS5zZXQoYmluZGluZ18xLmlkLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH07XG59O1xuZnVuY3Rpb24gcmVzb2x2ZShjb250ZXh0KSB7XG4gICAgdmFyIF9mID0gX3Jlc29sdmVSZXF1ZXN0KGNvbnRleHQucGxhbi5yb290UmVxdWVzdC5yZXF1ZXN0U2NvcGUpO1xuICAgIHJldHVybiBfZihjb250ZXh0LnBsYW4ucm9vdFJlcXVlc3QpO1xufVxuZXhwb3J0cy5yZXNvbHZlID0gcmVzb2x2ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGxpdGVyYWxfdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbnZhciBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX3doZW5fb25fc3ludGF4XCIpO1xudmFyIEJpbmRpbmdJblN5bnRheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmluZGluZ0luU3ludGF4KGJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZyA9IGJpbmRpbmc7XG4gICAgfVxuICAgIEJpbmRpbmdJblN5bnRheC5wcm90b3R5cGUuaW5SZXF1ZXN0U2NvcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuc2NvcGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5SZXF1ZXN0O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ0luU3ludGF4LnByb3RvdHlwZS5pblNpbmdsZXRvblNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnNjb3BlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uU2luZ2xldG9uO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ0luU3ludGF4LnByb3RvdHlwZS5pblRyYW5zaWVudFNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnNjb3BlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uVHJhbnNpZW50O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdJblN5bnRheDtcbn0oKSk7XG5leHBvcnRzLkJpbmRpbmdJblN5bnRheCA9IEJpbmRpbmdJblN5bnRheDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGJpbmRpbmdfaW5fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX2luX3N5bnRheFwiKTtcbnZhciBiaW5kaW5nX29uX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ19vbl9zeW50YXhcIik7XG52YXIgYmluZGluZ193aGVuX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ193aGVuX3N5bnRheFwiKTtcbnZhciBCaW5kaW5nSW5XaGVuT25TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdJbldoZW5PblN5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgICAgICB0aGlzLl9iaW5kaW5nV2hlblN5bnRheCA9IG5ldyBiaW5kaW5nX3doZW5fc3ludGF4XzEuQmluZGluZ1doZW5TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdPblN5bnRheCA9IG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICAgICAgdGhpcy5fYmluZGluZ0luU3ludGF4ID0gbmV3IGJpbmRpbmdfaW5fc3ludGF4XzEuQmluZGluZ0luU3ludGF4KGJpbmRpbmcpO1xuICAgIH1cbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLmluUmVxdWVzdFNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ0luU3ludGF4LmluUmVxdWVzdFNjb3BlKCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLmluU2luZ2xldG9uU2NvcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nSW5TeW50YXguaW5TaW5nbGV0b25TY29wZSgpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS5pblRyYW5zaWVudFNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ0luU3ludGF4LmluVHJhbnNpZW50U2NvcGUoKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbiA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0TmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblRhcmdldE5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0SXNEZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblRhcmdldElzRGVmYXVsdCgpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXRUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5JbmplY3RlZEludG8gPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuSW5qZWN0ZWRJbnRvKHBhcmVudCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnROYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuUGFyZW50TmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnRUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblBhcmVudFRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9ySXMgPSBmdW5jdGlvbiAoYW5jZXN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3RvcklzKGFuY2VzdG9yKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JJcyA9IGZ1bmN0aW9uIChhbmNlc3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JJcyhhbmNlc3Rvcik7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3Rvck5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkFueUFuY2VzdG9yVGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yTmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yVGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JNYXRjaGVzID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3Rvck1hdGNoZXMoY29uc3RyYWludCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3Rvck1hdGNoZXMoY29uc3RyYWludCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLm9uQWN0aXZhdGlvbiA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nT25TeW50YXgub25BY3RpdmF0aW9uKGhhbmRsZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdJbldoZW5PblN5bnRheDtcbn0oKSk7XG5leHBvcnRzLkJpbmRpbmdJbldoZW5PblN5bnRheCA9IEJpbmRpbmdJbldoZW5PblN5bnRheDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGJpbmRpbmdfd2hlbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfd2hlbl9zeW50YXhcIik7XG52YXIgQmluZGluZ09uU3ludGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaW5kaW5nT25TeW50YXgoYmluZGluZykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nID0gYmluZGluZztcbiAgICB9XG4gICAgQmluZGluZ09uU3ludGF4LnByb3RvdHlwZS5vbkFjdGl2YXRpb24gPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLm9uQWN0aXZhdGlvbiA9IGhhbmRsZXI7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX3N5bnRheF8xLkJpbmRpbmdXaGVuU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdPblN5bnRheDtcbn0oKSk7XG5leHBvcnRzLkJpbmRpbmdPblN5bnRheCA9IEJpbmRpbmdPblN5bnRheDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIGJpbmRpbmdfaW5fd2hlbl9vbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfaW5fd2hlbl9vbl9zeW50YXhcIik7XG52YXIgYmluZGluZ193aGVuX29uX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ193aGVuX29uX3N5bnRheFwiKTtcbnZhciBCaW5kaW5nVG9TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdUb1N5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgIH1cbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uSW5zdGFuY2U7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlID0gY29uc3RydWN0b3I7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19pbl93aGVuX29uX3N5bnRheF8xLkJpbmRpbmdJbldoZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9TZWxmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2JpbmRpbmcuc2VydmljZUlkZW50aWZpZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIgKyBFUlJPUl9NU0dTLklOVkFMSURfVE9fU0VMRl9WQUxVRSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLl9iaW5kaW5nLnNlcnZpY2VJZGVudGlmaWVyO1xuICAgICAgICByZXR1cm4gdGhpcy50byhzZWxmKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9Db25zdGFudFZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uQ29uc3RhbnRWYWx1ZTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jYWNoZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmR5bmFtaWNWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9EeW5hbWljVmFsdWUgPSBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkR5bmFtaWNWYWx1ZTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jYWNoZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuZHluYW1pY1ZhbHVlID0gZnVuYztcbiAgICAgICAgdGhpcy5fYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUgPSBudWxsO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfaW5fd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nSW5XaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoY29uc3RydWN0b3IpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5Db25zdHJ1Y3RvcjtcbiAgICAgICAgdGhpcy5fYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUgPSBjb25zdHJ1Y3RvcjtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9GYWN0b3J5ID0gZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5GYWN0b3J5O1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmZhY3RvcnkgPSBmYWN0b3J5O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b0Z1bmN0aW9uID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmdW5jICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLklOVkFMSURfRlVOQ1RJT05fQklORElORyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJpbmRpbmdXaGVuT25TeW50YXggPSB0aGlzLnRvQ29uc3RhbnRWYWx1ZShmdW5jKTtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5GdW5jdGlvbjtcbiAgICAgICAgcmV0dXJuIGJpbmRpbmdXaGVuT25TeW50YXg7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvQXV0b0ZhY3RvcnkgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5GYWN0b3J5O1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmZhY3RvcnkgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICAgICAgdmFyIGF1dG9mYWN0b3J5ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY29udGV4dC5jb250YWluZXIuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTsgfTtcbiAgICAgICAgICAgIHJldHVybiBhdXRvZmFjdG9yeTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9Qcm92aWRlciA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLlByb3ZpZGVyO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnByb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX29uX3N5bnRheF8xLkJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvU2VydmljZSA9IGZ1bmN0aW9uIChzZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudG9EeW5hbWljVmFsdWUoZnVuY3Rpb24gKGNvbnRleHQpIHsgcmV0dXJuIGNvbnRleHQuY29udGFpbmVyLmdldChzZXJ2aWNlKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQmluZGluZ1RvU3ludGF4O1xufSgpKTtcbmV4cG9ydHMuQmluZGluZ1RvU3ludGF4ID0gQmluZGluZ1RvU3ludGF4O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYmluZGluZ19vbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfb25fc3ludGF4XCIpO1xudmFyIGJpbmRpbmdfd2hlbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfd2hlbl9zeW50YXhcIik7XG52YXIgQmluZGluZ1doZW5PblN5bnRheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmluZGluZ1doZW5PblN5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgICAgICB0aGlzLl9iaW5kaW5nV2hlblN5bnRheCA9IG5ldyBiaW5kaW5nX3doZW5fc3ludGF4XzEuQmluZGluZ1doZW5TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdPblN5bnRheCA9IG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbiA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXROYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXRJc0RlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuVGFyZ2V0SXNEZWZhdWx0KCk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXRUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuSW5qZWN0ZWRJbnRvID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkluamVjdGVkSW50byhwYXJlbnQpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlblBhcmVudE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5QYXJlbnROYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnRUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblBhcmVudFRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3RvcklzID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JJcyhhbmNlc3Rvcik7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3RvcklzID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3RvcklzKGFuY2VzdG9yKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3Rvck5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3RvclRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yTmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JOYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yVGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JNYXRjaGVzKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JNYXRjaGVzID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yTWF0Y2hlcyhjb25zdHJhaW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLm9uQWN0aXZhdGlvbiA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nT25TeW50YXgub25BY3RpdmF0aW9uKGhhbmRsZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdXaGVuT25TeW50YXg7XG59KCkpO1xuZXhwb3J0cy5CaW5kaW5nV2hlbk9uU3ludGF4ID0gQmluZGluZ1doZW5PblN5bnRheDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGJpbmRpbmdfb25fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX29uX3N5bnRheFwiKTtcbnZhciBjb25zdHJhaW50X2hlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0cmFpbnRfaGVscGVyc1wiKTtcbnZhciBCaW5kaW5nV2hlblN5bnRheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmluZGluZ1doZW5TeW50YXgoYmluZGluZykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nID0gYmluZGluZztcbiAgICB9XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW4gPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBjb25zdHJhaW50O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXROYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGNvbnN0cmFpbnRfaGVscGVyc18xLm5hbWVkQ29uc3RyYWludChuYW1lKTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0SXNEZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgdmFyIHRhcmdldElzRGVmYXVsdCA9IChyZXF1ZXN0LnRhcmdldCAhPT0gbnVsbCkgJiZcbiAgICAgICAgICAgICAgICAoIXJlcXVlc3QudGFyZ2V0LmlzTmFtZWQoKSkgJiZcbiAgICAgICAgICAgICAgICAoIXJlcXVlc3QudGFyZ2V0LmlzVGFnZ2VkKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldElzRGVmYXVsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gY29uc3RyYWludF9oZWxwZXJzXzEudGFnZ2VkQ29uc3RyYWludCh0YWcpKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuSW5qZWN0ZWRJbnRvID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnR5cGVDb25zdHJhaW50KHBhcmVudCkocmVxdWVzdC5wYXJlbnRSZXF1ZXN0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuUGFyZW50TmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLm5hbWVkQ29uc3RyYWludChuYW1lKShyZXF1ZXN0LnBhcmVudFJlcXVlc3QpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnRUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnRhZ2dlZENvbnN0cmFpbnQodGFnKSh2YWx1ZSkocmVxdWVzdC5wYXJlbnRSZXF1ZXN0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JJcyA9IGZ1bmN0aW9uIChhbmNlc3Rvcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50X2hlbHBlcnNfMS50eXBlQ29uc3RyYWludChhbmNlc3RvcikpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9ySXMgPSBmdW5jdGlvbiAoYW5jZXN0b3IpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiAhY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnRfaGVscGVyc18xLnR5cGVDb25zdHJhaW50KGFuY2VzdG9yKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yTmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50X2hlbHBlcnNfMS5uYW1lZENvbnN0cmFpbnQobmFtZSkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yTmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuICFjb25zdHJhaW50X2hlbHBlcnNfMS50cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgY29uc3RyYWludF9oZWxwZXJzXzEubmFtZWRDb25zdHJhaW50KG5hbWUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50X2hlbHBlcnNfMS50YWdnZWRDb25zdHJhaW50KHRhZykodmFsdWUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3RvclRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gIWNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50X2hlbHBlcnNfMS50YWdnZWRDb25zdHJhaW50KHRhZykodmFsdWUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JNYXRjaGVzID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJhaW50X2hlbHBlcnNfMS50cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgY29uc3RyYWludCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JNYXRjaGVzID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiAhY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnQpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdXaGVuU3ludGF4O1xufSgpKTtcbmV4cG9ydHMuQmluZGluZ1doZW5TeW50YXggPSBCaW5kaW5nV2hlblN5bnRheDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIHRyYXZlcnNlQW5jZXJzdG9ycyA9IGZ1bmN0aW9uIChyZXF1ZXN0LCBjb25zdHJhaW50KSB7XG4gICAgdmFyIHBhcmVudCA9IHJlcXVlc3QucGFyZW50UmVxdWVzdDtcbiAgICBpZiAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBjb25zdHJhaW50KHBhcmVudCkgPyB0cnVlIDogdHJhdmVyc2VBbmNlcnN0b3JzKHBhcmVudCwgY29uc3RyYWludCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbmV4cG9ydHMudHJhdmVyc2VBbmNlcnN0b3JzID0gdHJhdmVyc2VBbmNlcnN0b3JzO1xudmFyIHRhZ2dlZENvbnN0cmFpbnQgPSBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiByZXF1ZXN0ICE9PSBudWxsICYmIHJlcXVlc3QudGFyZ2V0ICE9PSBudWxsICYmIHJlcXVlc3QudGFyZ2V0Lm1hdGNoZXNUYWcoa2V5KSh2YWx1ZSk7XG4gICAgfTtcbiAgICBjb25zdHJhaW50Lm1ldGFEYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoa2V5LCB2YWx1ZSk7XG4gICAgcmV0dXJuIGNvbnN0cmFpbnQ7XG59OyB9O1xuZXhwb3J0cy50YWdnZWRDb25zdHJhaW50ID0gdGFnZ2VkQ29uc3RyYWludDtcbnZhciBuYW1lZENvbnN0cmFpbnQgPSB0YWdnZWRDb25zdHJhaW50KE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcpO1xuZXhwb3J0cy5uYW1lZENvbnN0cmFpbnQgPSBuYW1lZENvbnN0cmFpbnQ7XG52YXIgdHlwZUNvbnN0cmFpbnQgPSBmdW5jdGlvbiAodHlwZSkgeyByZXR1cm4gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICB2YXIgYmluZGluZyA9IG51bGw7XG4gICAgaWYgKHJlcXVlc3QgIT09IG51bGwpIHtcbiAgICAgICAgYmluZGluZyA9IHJlcXVlc3QuYmluZGluZ3NbMF07XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyID0gYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlSWRlbnRpZmllciA9PT0gdHlwZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IHJlcXVlc3QuYmluZGluZ3NbMF0uaW1wbGVtZW50YXRpb25UeXBlO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGUgPT09IGNvbnN0cnVjdG9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07IH07XG5leHBvcnRzLnR5cGVDb25zdHJhaW50ID0gdHlwZUNvbnN0cmFpbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubXVsdGlCaW5kVG9TZXJ2aWNlID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHR5cGVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHR5cGVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodCkgeyByZXR1cm4gY29udGFpbmVyLmJpbmQodCkudG9TZXJ2aWNlKHNlcnZpY2UpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG5mdW5jdGlvbiBpc1N0YWNrT3ZlcmZsb3dFeGVwdGlvbihlcnJvcikge1xuICAgIHJldHVybiAoZXJyb3IgaW5zdGFuY2VvZiBSYW5nZUVycm9yIHx8XG4gICAgICAgIGVycm9yLm1lc3NhZ2UgPT09IEVSUk9SX01TR1MuU1RBQ0tfT1ZFUkZMT1cpO1xufVxuZXhwb3J0cy5pc1N0YWNrT3ZlcmZsb3dFeGVwdGlvbiA9IGlzU3RhY2tPdmVyZmxvd0V4ZXB0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaWRDb3VudGVyID0gMDtcbmZ1bmN0aW9uIGlkKCkge1xuICAgIHJldHVybiBpZENvdW50ZXIrKztcbn1cbmV4cG9ydHMuaWQgPSBpZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG5mdW5jdGlvbiBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgaWYgKHR5cGVvZiBzZXJ2aWNlSWRlbnRpZmllciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBfc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgcmV0dXJuIF9zZXJ2aWNlSWRlbnRpZmllci5uYW1lO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygc2VydmljZUlkZW50aWZpZXIgPT09IFwic3ltYm9sXCIpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJZGVudGlmaWVyLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgX3NlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXI7XG4gICAgICAgIHJldHVybiBfc2VydmljZUlkZW50aWZpZXI7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nID0gZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZztcbmZ1bmN0aW9uIGxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllcihjb250YWluZXIsIHNlcnZpY2VJZGVudGlmaWVyLCBnZXRCaW5kaW5ncykge1xuICAgIHZhciByZWdpc3RlcmVkQmluZGluZ3NMaXN0ID0gXCJcIjtcbiAgICB2YXIgcmVnaXN0ZXJlZEJpbmRpbmdzID0gZ2V0QmluZGluZ3MoY29udGFpbmVyLCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgaWYgKHJlZ2lzdGVyZWRCaW5kaW5ncy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCA9IFwiXFxuUmVnaXN0ZXJlZCBiaW5kaW5nczpcIjtcbiAgICAgICAgcmVnaXN0ZXJlZEJpbmRpbmdzLmZvckVhY2goZnVuY3Rpb24gKGJpbmRpbmcpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gXCJPYmplY3RcIjtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBnZXRGdW5jdGlvbk5hbWUoYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCA9IHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3QgKyBcIlxcbiBcIiArIG5hbWU7XG4gICAgICAgICAgICBpZiAoYmluZGluZy5jb25zdHJhaW50Lm1ldGFEYXRhKSB7XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCA9IHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3QgKyBcIiAtIFwiICsgYmluZGluZy5jb25zdHJhaW50Lm1ldGFEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3Q7XG59XG5leHBvcnRzLmxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllciA9IGxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllcjtcbmZ1bmN0aW9uIGFscmVhZHlEZXBlbmRlbmN5Q2hhaW4ocmVxdWVzdCwgc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICBpZiAocmVxdWVzdC5wYXJlbnRSZXF1ZXN0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVxdWVzdC5wYXJlbnRSZXF1ZXN0LnNlcnZpY2VJZGVudGlmaWVyID09PSBzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBhbHJlYWR5RGVwZW5kZW5jeUNoYWluKHJlcXVlc3QucGFyZW50UmVxdWVzdCwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRlcGVuZGVuY3lDaGFpblRvU3RyaW5nKHJlcXVlc3QpIHtcbiAgICBmdW5jdGlvbiBfY3JlYXRlU3RyaW5nQXJyKHJlcSwgcmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgeyByZXN1bHQgPSBbXTsgfVxuICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXIgPSBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHJlcS5zZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIHJlc3VsdC5wdXNoKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKHJlcS5wYXJlbnRSZXF1ZXN0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NyZWF0ZVN0cmluZ0FycihyZXEucGFyZW50UmVxdWVzdCwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB2YXIgc3RyaW5nQXJyID0gX2NyZWF0ZVN0cmluZ0FycihyZXF1ZXN0KTtcbiAgICByZXR1cm4gc3RyaW5nQXJyLnJldmVyc2UoKS5qb2luKFwiIC0tPiBcIik7XG59XG5mdW5jdGlvbiBjaXJjdWxhckRlcGVuZGVuY3lUb0V4Y2VwdGlvbihyZXF1ZXN0KSB7XG4gICAgcmVxdWVzdC5jaGlsZFJlcXVlc3RzLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkUmVxdWVzdCkge1xuICAgICAgICBpZiAoYWxyZWFkeURlcGVuZGVuY3lDaGFpbihjaGlsZFJlcXVlc3QsIGNoaWxkUmVxdWVzdC5zZXJ2aWNlSWRlbnRpZmllcikpIHtcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlcyA9IGRlcGVuZGVuY3lDaGFpblRvU3RyaW5nKGNoaWxkUmVxdWVzdCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5DSVJDVUxBUl9ERVBFTkRFTkNZICsgXCIgXCIgKyBzZXJ2aWNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjaXJjdWxhckRlcGVuZGVuY3lUb0V4Y2VwdGlvbihjaGlsZFJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmNpcmN1bGFyRGVwZW5kZW5jeVRvRXhjZXB0aW9uID0gY2lyY3VsYXJEZXBlbmRlbmN5VG9FeGNlcHRpb247XG5mdW5jdGlvbiBsaXN0TWV0YWRhdGFGb3JUYXJnZXQoc2VydmljZUlkZW50aWZpZXJTdHJpbmcsIHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuaXNUYWdnZWQoKSB8fCB0YXJnZXQuaXNOYW1lZCgpKSB7XG4gICAgICAgIHZhciBtXzEgPSBcIlwiO1xuICAgICAgICB2YXIgbmFtZWRUYWcgPSB0YXJnZXQuZ2V0TmFtZWRUYWcoKTtcbiAgICAgICAgdmFyIG90aGVyVGFncyA9IHRhcmdldC5nZXRDdXN0b21UYWdzKCk7XG4gICAgICAgIGlmIChuYW1lZFRhZyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbV8xICs9IG5hbWVkVGFnLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlclRhZ3MgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG90aGVyVGFncy5mb3JFYWNoKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgICAgICAgICBtXzEgKz0gdGFnLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiIFwiICsgc2VydmljZUlkZW50aWZpZXJTdHJpbmcgKyBcIlxcbiBcIiArIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nICsgXCIgLSBcIiArIG1fMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcIiBcIiArIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nO1xuICAgIH1cbn1cbmV4cG9ydHMubGlzdE1ldGFkYXRhRm9yVGFyZ2V0ID0gbGlzdE1ldGFkYXRhRm9yVGFyZ2V0O1xuZnVuY3Rpb24gZ2V0RnVuY3Rpb25OYW1lKHYpIHtcbiAgICBpZiAodi5uYW1lKSB7XG4gICAgICAgIHJldHVybiB2Lm5hbWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgbmFtZV8xID0gdi50b1N0cmluZygpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBuYW1lXzEubWF0Y2goL15mdW5jdGlvblxccyooW15cXHMoXSspLyk7XG4gICAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogXCJBbm9ueW1vdXMgZnVuY3Rpb246IFwiICsgbmFtZV8xO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0RnVuY3Rpb25OYW1lID0gZ2V0RnVuY3Rpb25OYW1lO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBwZXJjZW50VHdlbnRpZXMgPSAvJTIwL2c7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgRm9ybWF0ID0ge1xuICAgIFJGQzE3Mzg6ICdSRkMxNzM4JyxcbiAgICBSRkMzOTg2OiAnUkZDMzk4Nidcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbC5hc3NpZ24oXG4gICAge1xuICAgICAgICAnZGVmYXVsdCc6IEZvcm1hdC5SRkMzOTg2LFxuICAgICAgICBmb3JtYXR0ZXJzOiB7XG4gICAgICAgICAgICBSRkMxNzM4OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVwbGFjZS5jYWxsKHZhbHVlLCBwZXJjZW50VHdlbnRpZXMsICcrJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUkZDMzk4NjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEZvcm1hdFxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG52YXIgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmb3JtYXRzOiBmb3JtYXRzLFxuICAgIHBhcnNlOiBwYXJzZSxcbiAgICBzdHJpbmdpZnk6IHN0cmluZ2lmeVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgYWxsb3dQcm90b3R5cGVzOiBmYWxzZSxcbiAgICBhcnJheUxpbWl0OiAyMCxcbiAgICBjaGFyc2V0OiAndXRmLTgnLFxuICAgIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gICAgY29tbWE6IGZhbHNlLFxuICAgIGRlY29kZXI6IHV0aWxzLmRlY29kZSxcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBkZXB0aDogNSxcbiAgICBpZ25vcmVRdWVyeVByZWZpeDogZmFsc2UsXG4gICAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiBmYWxzZSxcbiAgICBwYXJhbWV0ZXJMaW1pdDogMTAwMCxcbiAgICBwYXJzZUFycmF5czogdHJ1ZSxcbiAgICBwbGFpbk9iamVjdHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBpbnRlcnByZXROdW1lcmljRW50aXRpZXMgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mIyhcXGQrKTsvZywgZnVuY3Rpb24gKCQwLCBudW1iZXJTdHIpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobnVtYmVyU3RyLCAxMCkpO1xuICAgIH0pO1xufTtcblxuLy8gVGhpcyBpcyB3aGF0IGJyb3dzZXJzIHdpbGwgc3VibWl0IHdoZW4gdGhlIOKckyBjaGFyYWN0ZXIgb2NjdXJzIGluIGFuXG4vLyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQgYm9keSBhbmQgdGhlIGVuY29kaW5nIG9mIHRoZSBwYWdlIGNvbnRhaW5pbmdcbi8vIHRoZSBmb3JtIGlzIGlzby04ODU5LTEsIG9yIHdoZW4gdGhlIHN1Ym1pdHRlZCBmb3JtIGhhcyBhbiBhY2NlcHQtY2hhcnNldFxuLy8gYXR0cmlidXRlIG9mIGlzby04ODU5LTEuIFByZXN1bWFibHkgYWxzbyB3aXRoIG90aGVyIGNoYXJzZXRzIHRoYXQgZG8gbm90IGNvbnRhaW5cbi8vIHRoZSDinJMgY2hhcmFjdGVyLCBzdWNoIGFzIHVzLWFzY2lpLlxudmFyIGlzb1NlbnRpbmVsID0gJ3V0Zjg9JTI2JTIzMTAwMDMlM0InOyAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JylcblxuLy8gVGhlc2UgYXJlIHRoZSBwZXJjZW50LWVuY29kZWQgdXRmLTggb2N0ZXRzIHJlcHJlc2VudGluZyBhIGNoZWNrbWFyaywgaW5kaWNhdGluZyB0aGF0IHRoZSByZXF1ZXN0IGFjdHVhbGx5IGlzIHV0Zi04IGVuY29kZWQuXG52YXIgY2hhcnNldFNlbnRpbmVsID0gJ3V0Zjg9JUUyJTlDJTkzJzsgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuXG52YXIgcGFyc2VWYWx1ZXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nVmFsdWVzKHN0ciwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIgY2xlYW5TdHIgPSBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID8gc3RyLnJlcGxhY2UoL15cXD8vLCAnJykgOiBzdHI7XG4gICAgdmFyIGxpbWl0ID0gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBvcHRpb25zLnBhcmFtZXRlckxpbWl0O1xuICAgIHZhciBwYXJ0cyA9IGNsZWFuU3RyLnNwbGl0KG9wdGlvbnMuZGVsaW1pdGVyLCBsaW1pdCk7XG4gICAgdmFyIHNraXBJbmRleCA9IC0xOyAvLyBLZWVwIHRyYWNrIG9mIHdoZXJlIHRoZSB1dGY4IHNlbnRpbmVsIHdhcyBmb3VuZFxuICAgIHZhciBpO1xuXG4gICAgdmFyIGNoYXJzZXQgPSBvcHRpb25zLmNoYXJzZXQ7XG4gICAgaWYgKG9wdGlvbnMuY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKHBhcnRzW2ldLmluZGV4T2YoJ3V0Zjg9JykgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocGFydHNbaV0gPT09IGNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyc2V0ID0gJ3V0Zi04JztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldID09PSBpc29TZW50aW5lbCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyc2V0ID0gJ2lzby04ODU5LTEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBza2lwSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGkgPSBwYXJ0cy5sZW5ndGg7IC8vIFRoZSBlc2xpbnQgc2V0dGluZ3MgZG8gbm90IGFsbG93IGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChpID09PSBza2lwSW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaV07XG5cbiAgICAgICAgdmFyIGJyYWNrZXRFcXVhbHNQb3MgPSBwYXJ0LmluZGV4T2YoJ109Jyk7XG4gICAgICAgIHZhciBwb3MgPSBicmFja2V0RXF1YWxzUG9zID09PSAtMSA/IHBhcnQuaW5kZXhPZignPScpIDogYnJhY2tldEVxdWFsc1BvcyArIDE7XG5cbiAgICAgICAgdmFyIGtleSwgdmFsO1xuICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQsIGRlZmF1bHRzLmRlY29kZXIsIGNoYXJzZXQsICdrZXknKTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID8gbnVsbCA6ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UoMCwgcG9zKSwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ2tleScpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UocG9zICsgMSksIGRlZmF1bHRzLmRlY29kZXIsIGNoYXJzZXQsICd2YWx1ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbCAmJiBvcHRpb25zLmludGVycHJldE51bWVyaWNFbnRpdGllcyAmJiBjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgICAgIHZhbCA9IGludGVycHJldE51bWVyaWNFbnRpdGllcyh2YWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiBvcHRpb25zLmNvbW1hICYmIHZhbC5pbmRleE9mKCcsJykgPiAtMSkge1xuICAgICAgICAgICAgdmFsID0gdmFsLnNwbGl0KCcsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFydC5pbmRleE9mKCdbXT0nKSA+IC0xKSB7XG4gICAgICAgICAgICB2YWwgPSBpc0FycmF5KHZhbCkgPyBbdmFsXSA6IHZhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gdXRpbHMuY29tYmluZShvYmpba2V5XSwgdmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBwYXJzZU9iamVjdCA9IGZ1bmN0aW9uIChjaGFpbiwgdmFsLCBvcHRpb25zKSB7XG4gICAgdmFyIGxlYWYgPSB2YWw7XG5cbiAgICBmb3IgKHZhciBpID0gY2hhaW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIG9iajtcbiAgICAgICAgdmFyIHJvb3QgPSBjaGFpbltpXTtcblxuICAgICAgICBpZiAocm9vdCA9PT0gJ1tdJyAmJiBvcHRpb25zLnBhcnNlQXJyYXlzKSB7XG4gICAgICAgICAgICBvYmogPSBbXS5jb25jYXQobGVhZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICAgICAgICAgIHZhciBjbGVhblJvb3QgPSByb290LmNoYXJBdCgwKSA9PT0gJ1snICYmIHJvb3QuY2hhckF0KHJvb3QubGVuZ3RoIC0gMSkgPT09ICddJyA/IHJvb3Quc2xpY2UoMSwgLTEpIDogcm9vdDtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGNsZWFuUm9vdCwgMTApO1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnBhcnNlQXJyYXlzICYmIGNsZWFuUm9vdCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBvYmogPSB7IDA6IGxlYWYgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgIWlzTmFOKGluZGV4KVxuICAgICAgICAgICAgICAgICYmIHJvb3QgIT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIFN0cmluZyhpbmRleCkgPT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIGluZGV4ID49IDBcbiAgICAgICAgICAgICAgICAmJiAob3B0aW9ucy5wYXJzZUFycmF5cyAmJiBpbmRleCA8PSBvcHRpb25zLmFycmF5TGltaXQpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgICAgICBvYmpbaW5kZXhdID0gbGVhZjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2NsZWFuUm9vdF0gPSBsZWFmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGVhZiA9IG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVhZjtcbn07XG5cbnZhciBwYXJzZUtleXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nS2V5cyhnaXZlbktleSwgdmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKCFnaXZlbktleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtIGRvdCBub3RhdGlvbiB0byBicmFja2V0IG5vdGF0aW9uXG4gICAgdmFyIGtleSA9IG9wdGlvbnMuYWxsb3dEb3RzID8gZ2l2ZW5LZXkucmVwbGFjZSgvXFwuKFteLltdKykvZywgJ1skMV0nKSA6IGdpdmVuS2V5O1xuXG4gICAgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gICAgdmFyIGJyYWNrZXRzID0gLyhcXFtbXltcXF1dKl0pLztcbiAgICB2YXIgY2hpbGQgPSAvKFxcW1teW1xcXV0qXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IG9wdGlvbnMuZGVwdGggPiAwICYmIGJyYWNrZXRzLmV4ZWMoa2V5KTtcbiAgICB2YXIgcGFyZW50ID0gc2VnbWVudCA/IGtleS5zbGljZSgwLCBzZWdtZW50LmluZGV4KSA6IGtleTtcblxuICAgIC8vIFN0YXNoIHRoZSBwYXJlbnQgaWYgaXQgZXhpc3RzXG5cbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlbid0IHVzaW5nIHBsYWluIG9iamVjdHMsIG9wdGlvbmFsbHkgcHJlZml4IGtleXMgdGhhdCB3b3VsZCBvdmVyd3JpdGUgb2JqZWN0IHByb3RvdHlwZSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgcGFyZW50KSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMucHVzaChwYXJlbnQpO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChvcHRpb25zLmRlcHRoID4gMCAmJiAoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNlZ21lbnRbMV0uc2xpY2UoMSwgLTEpKSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlT2JqZWN0KGtleXMsIHZhbCwgb3B0aW9ucyk7XG59O1xuXG52YXIgbm9ybWFsaXplUGFyc2VPcHRpb25zID0gZnVuY3Rpb24gbm9ybWFsaXplUGFyc2VPcHRpb25zKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmRlY29kZXIgIT09IG51bGwgJiYgb3B0cy5kZWNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZGVjb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdEZWNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0cy5jaGFyc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvcHRzLmNoYXJzZXQgIT09ICd1dGYtOCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICB2YXIgY2hhcnNldCA9IHR5cGVvZiBvcHRzLmNoYXJzZXQgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuY2hhcnNldCA6IG9wdHMuY2hhcnNldDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGFsbG93UHJvdG90eXBlczogdHlwZW9mIG9wdHMuYWxsb3dQcm90b3R5cGVzID09PSAnYm9vbGVhbicgPyBvcHRzLmFsbG93UHJvdG90eXBlcyA6IGRlZmF1bHRzLmFsbG93UHJvdG90eXBlcyxcbiAgICAgICAgYXJyYXlMaW1pdDogdHlwZW9mIG9wdHMuYXJyYXlMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRzLmFycmF5TGltaXQgOiBkZWZhdWx0cy5hcnJheUxpbWl0LFxuICAgICAgICBjaGFyc2V0OiBjaGFyc2V0LFxuICAgICAgICBjaGFyc2V0U2VudGluZWw6IHR5cGVvZiBvcHRzLmNoYXJzZXRTZW50aW5lbCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaGFyc2V0U2VudGluZWwgOiBkZWZhdWx0cy5jaGFyc2V0U2VudGluZWwsXG4gICAgICAgIGNvbW1hOiB0eXBlb2Ygb3B0cy5jb21tYSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jb21tYSA6IGRlZmF1bHRzLmNvbW1hLFxuICAgICAgICBkZWNvZGVyOiB0eXBlb2Ygb3B0cy5kZWNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5kZWNvZGVyIDogZGVmYXVsdHMuZGVjb2RlcixcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICdzdHJpbmcnIHx8IHV0aWxzLmlzUmVnRXhwKG9wdHMuZGVsaW1pdGVyKSA/IG9wdHMuZGVsaW1pdGVyIDogZGVmYXVsdHMuZGVsaW1pdGVyLFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8taW1wbGljaXQtY29lcmNpb24sIG5vLWV4dHJhLXBhcmVuc1xuICAgICAgICBkZXB0aDogKHR5cGVvZiBvcHRzLmRlcHRoID09PSAnbnVtYmVyJyB8fCBvcHRzLmRlcHRoID09PSBmYWxzZSkgPyArb3B0cy5kZXB0aCA6IGRlZmF1bHRzLmRlcHRoLFxuICAgICAgICBpZ25vcmVRdWVyeVByZWZpeDogb3B0cy5pZ25vcmVRdWVyeVByZWZpeCA9PT0gdHJ1ZSxcbiAgICAgICAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiB0eXBlb2Ygb3B0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgPT09ICdib29sZWFuJyA/IG9wdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzIDogZGVmYXVsdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzLFxuICAgICAgICBwYXJhbWV0ZXJMaW1pdDogdHlwZW9mIG9wdHMucGFyYW1ldGVyTGltaXQgPT09ICdudW1iZXInID8gb3B0cy5wYXJhbWV0ZXJMaW1pdCA6IGRlZmF1bHRzLnBhcmFtZXRlckxpbWl0LFxuICAgICAgICBwYXJzZUFycmF5czogb3B0cy5wYXJzZUFycmF5cyAhPT0gZmFsc2UsXG4gICAgICAgIHBsYWluT2JqZWN0czogdHlwZW9mIG9wdHMucGxhaW5PYmplY3RzID09PSAnYm9vbGVhbicgPyBvcHRzLnBsYWluT2JqZWN0cyA6IGRlZmF1bHRzLnBsYWluT2JqZWN0cyxcbiAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0ciwgb3B0cykge1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplUGFyc2VPcHRpb25zKG9wdHMpO1xuXG4gICAgaWYgKHN0ciA9PT0gJycgfHwgc3RyID09PSBudWxsIHx8IHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcE9iaiA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gcGFyc2VWYWx1ZXMoc3RyLCBvcHRpb25zKSA6IHN0cjtcbiAgICB2YXIgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGtleXMgYW5kIHNldHVwIHRoZSBuZXcgb2JqZWN0XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRlbXBPYmopO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIG5ld09iaiA9IHBhcnNlS2V5cyhrZXksIHRlbXBPYmpba2V5XSwgb3B0aW9ucyk7XG4gICAgICAgIG9iaiA9IHV0aWxzLm1lcmdlKG9iaiwgbmV3T2JqLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXRpbHMuY29tcGFjdChvYmopO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBjb21tYTogJ2NvbW1hJyxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xudmFyIHB1c2hUb0FycmF5ID0gZnVuY3Rpb24gKGFyciwgdmFsdWVPckFycmF5KSB7XG4gICAgcHVzaC5hcHBseShhcnIsIGlzQXJyYXkodmFsdWVPckFycmF5KSA/IHZhbHVlT3JBcnJheSA6IFt2YWx1ZU9yQXJyYXldKTtcbn07XG5cbnZhciB0b0lTTyA9IERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xuXG52YXIgZGVmYXVsdEZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhZGRRdWVyeVByZWZpeDogZmFsc2UsXG4gICAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgICBjaGFyc2V0OiAndXRmLTgnLFxuICAgIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZW5jb2RlOiB0cnVlLFxuICAgIGVuY29kZXI6IHV0aWxzLmVuY29kZSxcbiAgICBlbmNvZGVWYWx1ZXNPbmx5OiBmYWxzZSxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgZm9ybWF0dGVyOiBmb3JtYXRzLmZvcm1hdHRlcnNbZGVmYXVsdEZvcm1hdF0sXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGluZGljZXM6IGZhbHNlLFxuICAgIHNlcmlhbGl6ZURhdGU6IGZ1bmN0aW9uIHNlcmlhbGl6ZURhdGUoZGF0ZSkge1xuICAgICAgICByZXR1cm4gdG9JU08uY2FsbChkYXRlKTtcbiAgICB9LFxuICAgIHNraXBOdWxsczogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIGlzTm9uTnVsbGlzaFByaW1pdGl2ZSA9IGZ1bmN0aW9uIGlzTm9uTnVsbGlzaFByaW1pdGl2ZSh2KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2ID09PSAnc3RyaW5nJ1xuICAgICAgICB8fCB0eXBlb2YgdiA9PT0gJ251bWJlcidcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdib29sZWFuJ1xuICAgICAgICB8fCB0eXBlb2YgdiA9PT0gJ3N5bWJvbCdcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdiaWdpbnQnO1xufTtcblxudmFyIHN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShcbiAgICBvYmplY3QsXG4gICAgcHJlZml4LFxuICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgIHNraXBOdWxscyxcbiAgICBlbmNvZGVyLFxuICAgIGZpbHRlcixcbiAgICBzb3J0LFxuICAgIGFsbG93RG90cyxcbiAgICBzZXJpYWxpemVEYXRlLFxuICAgIGZvcm1hdHRlcixcbiAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgIGNoYXJzZXRcbikge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2JqID0gZmlsdGVyKHByZWZpeCwgb2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgb2JqID0gc2VyaWFsaXplRGF0ZShvYmopO1xuICAgIH0gZWxzZSBpZiAoZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2NvbW1hJyAmJiBpc0FycmF5KG9iaikpIHtcbiAgICAgICAgb2JqID0gb2JqLmpvaW4oJywnKTtcbiAgICB9XG5cbiAgICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIGlmIChzdHJpY3ROdWxsSGFuZGxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVyICYmICFlbmNvZGVWYWx1ZXNPbmx5ID8gZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICdrZXknKSA6IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmIChpc05vbk51bGxpc2hQcmltaXRpdmUob2JqKSB8fCB1dGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICdrZXknKTtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybWF0dGVyKGtleVZhbHVlKSArICc9JyArIGZvcm1hdHRlcihlbmNvZGVyKG9iaiwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCwgJ3ZhbHVlJykpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihwcmVmaXgpICsgJz0nICsgZm9ybWF0dGVyKFN0cmluZyhvYmopKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgdmFyIG9iaktleXM7XG4gICAgaWYgKGlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgb2JqS2V5cyA9IHNvcnQgPyBrZXlzLnNvcnQoc29ydCkgOiBrZXlzO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAoc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHB1c2hUb0FycmF5KHZhbHVlcywgc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIHR5cGVvZiBnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnZnVuY3Rpb24nID8gZ2VuZXJhdGVBcnJheVByZWZpeChwcmVmaXgsIGtleSkgOiBwcmVmaXgsXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICAgICAgY2hhcnNldFxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwdXNoVG9BcnJheSh2YWx1ZXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICBwcmVmaXggKyAoYWxsb3dEb3RzID8gJy4nICsga2V5IDogJ1snICsga2V5ICsgJ10nKSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgICAgICBjaGFyc2V0XG4gICAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG59O1xuXG52YXIgbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZW5jb2RlciAhPT0gbnVsbCAmJiBvcHRzLmVuY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0cy5lbmNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGNoYXJzZXQgPSBvcHRzLmNoYXJzZXQgfHwgZGVmYXVsdHMuY2hhcnNldDtcbiAgICBpZiAodHlwZW9mIG9wdHMuY2hhcnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAndXRmLTgnICYmIG9wdHMuY2hhcnNldCAhPT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjaGFyc2V0IG9wdGlvbiBtdXN0IGJlIGVpdGhlciB1dGYtOCwgaXNvLTg4NTktMSwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgdmFyIGZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbiAgICBpZiAodHlwZW9mIG9wdHMuZm9ybWF0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIWhhcy5jYWxsKGZvcm1hdHMuZm9ybWF0dGVycywgb3B0cy5mb3JtYXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0ID0gb3B0cy5mb3JtYXQ7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcblxuICAgIHZhciBmaWx0ZXIgPSBkZWZhdWx0cy5maWx0ZXI7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJyB8fCBpc0FycmF5KG9wdHMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRzLmZpbHRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRRdWVyeVByZWZpeDogdHlwZW9mIG9wdHMuYWRkUXVlcnlQcmVmaXggPT09ICdib29sZWFuJyA/IG9wdHMuYWRkUXVlcnlQcmVmaXggOiBkZWZhdWx0cy5hZGRRdWVyeVByZWZpeCxcbiAgICAgICAgYWxsb3dEb3RzOiB0eXBlb2Ygb3B0cy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuYWxsb3dEb3RzIDogISFvcHRzLmFsbG93RG90cyxcbiAgICAgICAgY2hhcnNldDogY2hhcnNldCxcbiAgICAgICAgY2hhcnNldFNlbnRpbmVsOiB0eXBlb2Ygb3B0cy5jaGFyc2V0U2VudGluZWwgPT09ICdib29sZWFuJyA/IG9wdHMuY2hhcnNldFNlbnRpbmVsIDogZGVmYXVsdHMuY2hhcnNldFNlbnRpbmVsLFxuICAgICAgICBkZWxpbWl0ZXI6IHR5cGVvZiBvcHRzLmRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5kZWxpbWl0ZXIgOiBvcHRzLmRlbGltaXRlcixcbiAgICAgICAgZW5jb2RlOiB0eXBlb2Ygb3B0cy5lbmNvZGUgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlIDogZGVmYXVsdHMuZW5jb2RlLFxuICAgICAgICBlbmNvZGVyOiB0eXBlb2Ygb3B0cy5lbmNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5lbmNvZGVyIDogZGVmYXVsdHMuZW5jb2RlcixcbiAgICAgICAgZW5jb2RlVmFsdWVzT25seTogdHlwZW9mIG9wdHMuZW5jb2RlVmFsdWVzT25seSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5lbmNvZGVWYWx1ZXNPbmx5IDogZGVmYXVsdHMuZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICAgIGZvcm1hdHRlcjogZm9ybWF0dGVyLFxuICAgICAgICBzZXJpYWxpemVEYXRlOiB0eXBlb2Ygb3B0cy5zZXJpYWxpemVEYXRlID09PSAnZnVuY3Rpb24nID8gb3B0cy5zZXJpYWxpemVEYXRlIDogZGVmYXVsdHMuc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgc2tpcE51bGxzOiB0eXBlb2Ygb3B0cy5za2lwTnVsbHMgPT09ICdib29sZWFuJyA/IG9wdHMuc2tpcE51bGxzIDogZGVmYXVsdHMuc2tpcE51bGxzLFxuICAgICAgICBzb3J0OiB0eXBlb2Ygb3B0cy5zb3J0ID09PSAnZnVuY3Rpb24nID8gb3B0cy5zb3J0IDogbnVsbCxcbiAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0cykge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgdmFyIG9wdGlvbnMgPSBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zKG9wdHMpO1xuXG4gICAgdmFyIG9iaktleXM7XG4gICAgdmFyIGZpbHRlcjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaiA9IGZpbHRlcignJywgb2JqKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob3B0aW9ucy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2YXIgYXJyYXlGb3JtYXQ7XG4gICAgaWYgKG9wdHMgJiYgb3B0cy5hcnJheUZvcm1hdCBpbiBhcnJheVByZWZpeEdlbmVyYXRvcnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmFycmF5Rm9ybWF0O1xuICAgIH0gZWxzZSBpZiAob3B0cyAmJiAnaW5kaWNlcycgaW4gb3B0cykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdHMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZUFycmF5UHJlZml4ID0gYXJyYXlQcmVmaXhHZW5lcmF0b3JzW2FycmF5Rm9ybWF0XTtcblxuICAgIGlmICghb2JqS2V5cykge1xuICAgICAgICBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zb3J0KSB7XG4gICAgICAgIG9iaktleXMuc29ydChvcHRpb25zLnNvcnQpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAob3B0aW9ucy5za2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHB1c2hUb0FycmF5KGtleXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgb3B0aW9ucy5za2lwTnVsbHMsXG4gICAgICAgICAgICBvcHRpb25zLmVuY29kZSA/IG9wdGlvbnMuZW5jb2RlciA6IG51bGwsXG4gICAgICAgICAgICBvcHRpb25zLmZpbHRlcixcbiAgICAgICAgICAgIG9wdGlvbnMuc29ydCxcbiAgICAgICAgICAgIG9wdGlvbnMuYWxsb3dEb3RzLFxuICAgICAgICAgICAgb3B0aW9ucy5zZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgb3B0aW9ucy5mb3JtYXR0ZXIsXG4gICAgICAgICAgICBvcHRpb25zLmVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICBvcHRpb25zLmNoYXJzZXRcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgdmFyIGpvaW5lZCA9IGtleXMuam9pbihvcHRpb25zLmRlbGltaXRlcik7XG4gICAgdmFyIHByZWZpeCA9IG9wdGlvbnMuYWRkUXVlcnlQcmVmaXggPT09IHRydWUgPyAnPycgOiAnJztcblxuICAgIGlmIChvcHRpb25zLmNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICBpZiAob3B0aW9ucy5jaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgICAgIC8vIGVuY29kZVVSSUNvbXBvbmVudCgnJiMxMDAwMzsnKSwgdGhlIFwibnVtZXJpYyBlbnRpdHlcIiByZXByZXNlbnRhdGlvbiBvZiBhIGNoZWNrbWFya1xuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSUyNiUyMzEwMDAzJTNCJic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJ+KckycpXG4gICAgICAgICAgICBwcmVmaXggKz0gJ3V0Zjg9JUUyJTlDJTkzJic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gam9pbmVkLmxlbmd0aCA+IDAgPyBwcmVmaXggKyBqb2luZWQgOiAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG52YXIgaGV4VGFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgICAgYXJyYXkucHVzaCgnJScgKyAoKGkgPCAxNiA/ICcwJyA6ICcnKSArIGkudG9TdHJpbmcoMTYpKS50b1VwcGVyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG59KCkpO1xuXG52YXIgY29tcGFjdFF1ZXVlID0gZnVuY3Rpb24gY29tcGFjdFF1ZXVlKHF1ZXVlKSB7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgdmFyIGNvbXBhY3RlZCA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9iai5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2pdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wYWN0ZWQucHVzaChvYmpbal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbS5vYmpbaXRlbS5wcm9wXSA9IGNvbXBhY3RlZDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBhcnJheVRvT2JqZWN0ID0gZnVuY3Rpb24gYXJyYXlUb09iamVjdChzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0gb3B0aW9ucyAmJiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG9ialtpXSA9IHNvdXJjZVtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgbWVyZ2UgPSBmdW5jdGlvbiBtZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuICAgIC8qIGVzbGludCBuby1wYXJhbS1yZWFzc2lnbjogMCAqL1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChpc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRhcmdldC5wdXNoKHNvdXJjZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ICYmIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoKG9wdGlvbnMgJiYgKG9wdGlvbnMucGxhaW5PYmplY3RzIHx8IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSkgfHwgIWhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbc291cmNlXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW3RhcmdldCwgc291cmNlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXQgfHwgdHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIFt0YXJnZXRdLmNvbmNhdChzb3VyY2UpO1xuICAgIH1cblxuICAgIHZhciBtZXJnZVRhcmdldCA9IHRhcmdldDtcbiAgICBpZiAoaXNBcnJheSh0YXJnZXQpICYmICFpc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgbWVyZ2VUYXJnZXQgPSBhcnJheVRvT2JqZWN0KHRhcmdldCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiBpc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIGlmIChoYXMuY2FsbCh0YXJnZXQsIGkpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldEl0ZW0gPSB0YXJnZXRbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldEl0ZW0gJiYgdHlwZW9mIHRhcmdldEl0ZW0gPT09ICdvYmplY3QnICYmIGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IG1lcmdlKHRhcmdldEl0ZW0sIGl0ZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgICAgICBpZiAoaGFzLmNhbGwoYWNjLCBrZXkpKSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IG1lcmdlKGFjY1trZXldLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgbWVyZ2VUYXJnZXQpO1xufTtcblxudmFyIGFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnblNpbmdsZVNvdXJjZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgYWNjW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB0YXJnZXQpO1xufTtcblxudmFyIGRlY29kZSA9IGZ1bmN0aW9uIChzdHIsIGRlY29kZXIsIGNoYXJzZXQpIHtcbiAgICB2YXIgc3RyV2l0aG91dFBsdXMgPSBzdHIucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgaWYgKGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICAvLyB1bmVzY2FwZSBuZXZlciB0aHJvd3MsIG5vIHRyeS4uLmNhdGNoIG5lZWRlZDpcbiAgICAgICAgcmV0dXJuIHN0cldpdGhvdXRQbHVzLnJlcGxhY2UoLyVbMC05YS1mXXsyfS9naSwgdW5lc2NhcGUpO1xuICAgIH1cbiAgICAvLyB1dGYtOFxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyV2l0aG91dFBsdXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHN0cldpdGhvdXRQbHVzO1xuICAgIH1cbn07XG5cbnZhciBlbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUoc3RyLCBkZWZhdWx0RW5jb2RlciwgY2hhcnNldCkge1xuICAgIC8vIFRoaXMgY29kZSB3YXMgb3JpZ2luYWxseSB3cml0dGVuIGJ5IEJyaWFuIFdoaXRlIChtc2NkZXgpIGZvciB0aGUgaW8uanMgY29yZSBxdWVyeXN0cmluZyBsaWJyYXJ5LlxuICAgIC8vIEl0IGhhcyBiZWVuIGFkYXB0ZWQgaGVyZSBmb3Igc3RyaWN0ZXIgYWRoZXJlbmNlIHRvIFJGQyAzOTg2XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICB2YXIgc3RyaW5nID0gc3RyO1xuICAgIGlmICh0eXBlb2Ygc3RyID09PSAnc3ltYm9sJykge1xuICAgICAgICBzdHJpbmcgPSBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3RyKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHN0cmluZyA9IFN0cmluZyhzdHIpO1xuICAgIH1cblxuICAgIGlmIChjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgcmV0dXJuIGVzY2FwZShzdHJpbmcpLnJlcGxhY2UoLyV1WzAtOWEtZl17NH0vZ2ksIGZ1bmN0aW9uICgkMCkge1xuICAgICAgICAgICAgcmV0dXJuICclMjYlMjMnICsgcGFyc2VJbnQoJDAuc2xpY2UoMiksIDE2KSArICclM0InO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjID09PSAweDJEIC8vIC1cbiAgICAgICAgICAgIHx8IGMgPT09IDB4MkUgLy8gLlxuICAgICAgICAgICAgfHwgYyA9PT0gMHg1RiAvLyBfXG4gICAgICAgICAgICB8fCBjID09PSAweDdFIC8vIH5cbiAgICAgICAgICAgIHx8IChjID49IDB4MzAgJiYgYyA8PSAweDM5KSAvLyAwLTlcbiAgICAgICAgICAgIHx8IChjID49IDB4NDEgJiYgYyA8PSAweDVBKSAvLyBhLXpcbiAgICAgICAgICAgIHx8IChjID49IDB4NjEgJiYgYyA8PSAweDdBKSAvLyBBLVpcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvdXQgKz0gc3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyBoZXhUYWJsZVtjXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4QzAgfCAoYyA+PiA2KV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4RDgwMCB8fCBjID49IDB4RTAwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4RTAgfCAoYyA+PiAxMildICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgYyA9IDB4MTAwMDAgKyAoKChjICYgMHgzRkYpIDw8IDEwKSB8IChzdHJpbmcuY2hhckNvZGVBdChpKSAmIDB4M0ZGKSk7XG4gICAgICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgKGMgPj4gMTgpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxudmFyIGNvbXBhY3QgPSBmdW5jdGlvbiBjb21wYWN0KHZhbHVlKSB7XG4gICAgdmFyIHF1ZXVlID0gW3sgb2JqOiB7IG86IHZhbHVlIH0sIHByb3A6ICdvJyB9XTtcbiAgICB2YXIgcmVmcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlW2ldO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICAgICAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsICYmIHJlZnMuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goeyBvYmo6IG9iaiwgcHJvcDoga2V5IH0pO1xuICAgICAgICAgICAgICAgIHJlZnMucHVzaCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcGFjdFF1ZXVlKHF1ZXVlKTtcblxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBpc1JlZ0V4cCA9IGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG52YXIgaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlcihvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcblxudmFyIGNvbWJpbmUgPSBmdW5jdGlvbiBjb21iaW5lKGEsIGIpIHtcbiAgICByZXR1cm4gW10uY29uY2F0KGEsIGIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXJyYXlUb09iamVjdDogYXJyYXlUb09iamVjdCxcbiAgICBhc3NpZ246IGFzc2lnbixcbiAgICBjb21iaW5lOiBjb21iaW5lLFxuICAgIGNvbXBhY3Q6IGNvbXBhY3QsXG4gICAgZGVjb2RlOiBkZWNvZGUsXG4gICAgZW5jb2RlOiBlbmNvZGUsXG4gICAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICAgIGlzUmVnRXhwOiBpc1JlZ0V4cCxcbiAgICBtZXJnZTogbWVyZ2Vcbn07XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoQykgTWljcm9zb2Z0LiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXG5cblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbnZhciBSZWZsZWN0O1xuKGZ1bmN0aW9uIChSZWZsZWN0KSB7XG4gICAgLy8gTWV0YWRhdGEgUHJvcG9zYWxcbiAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhL1xuICAgIChmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgICAgICB2YXIgcm9vdCA9IHR5cGVvZiBnbG9iYWwgPT09IFwib2JqZWN0XCIgPyBnbG9iYWwgOlxuICAgICAgICAgICAgdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDpcbiAgICAgICAgICAgICAgICB0eXBlb2YgdGhpcyA9PT0gXCJvYmplY3RcIiA/IHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICBGdW5jdGlvbihcInJldHVybiB0aGlzO1wiKSgpO1xuICAgICAgICB2YXIgZXhwb3J0ZXIgPSBtYWtlRXhwb3J0ZXIoUmVmbGVjdCk7XG4gICAgICAgIGlmICh0eXBlb2Ygcm9vdC5SZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICByb290LlJlZmxlY3QgPSBSZWZsZWN0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXhwb3J0ZXIgPSBtYWtlRXhwb3J0ZXIocm9vdC5SZWZsZWN0LCBleHBvcnRlcik7XG4gICAgICAgIH1cbiAgICAgICAgZmFjdG9yeShleHBvcnRlcik7XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VFeHBvcnRlcih0YXJnZXQsIHByZXZpb3VzKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFtrZXldICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzKVxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyhrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KShmdW5jdGlvbiAoZXhwb3J0ZXIpIHtcbiAgICAgICAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gICAgICAgIC8vIGZlYXR1cmUgdGVzdCBmb3IgU3ltYm9sIHN1cHBvcnRcbiAgICAgICAgdmFyIHN1cHBvcnRzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiO1xuICAgICAgICB2YXIgdG9QcmltaXRpdmVTeW1ib2wgPSBzdXBwb3J0c1N5bWJvbCAmJiB0eXBlb2YgU3ltYm9sLnRvUHJpbWl0aXZlICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sLnRvUHJpbWl0aXZlIDogXCJAQHRvUHJpbWl0aXZlXCI7XG4gICAgICAgIHZhciBpdGVyYXRvclN5bWJvbCA9IHN1cHBvcnRzU3ltYm9sICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wuaXRlcmF0b3IgOiBcIkBAaXRlcmF0b3JcIjtcbiAgICAgICAgdmFyIHN1cHBvcnRzQ3JlYXRlID0gdHlwZW9mIE9iamVjdC5jcmVhdGUgPT09IFwiZnVuY3Rpb25cIjsgLy8gZmVhdHVyZSB0ZXN0IGZvciBPYmplY3QuY3JlYXRlIHN1cHBvcnRcbiAgICAgICAgdmFyIHN1cHBvcnRzUHJvdG8gPSB7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5OyAvLyBmZWF0dXJlIHRlc3QgZm9yIF9fcHJvdG9fXyBzdXBwb3J0XG4gICAgICAgIHZhciBkb3duTGV2ZWwgPSAhc3VwcG9ydHNDcmVhdGUgJiYgIXN1cHBvcnRzUHJvdG87XG4gICAgICAgIHZhciBIYXNoTWFwID0ge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGFuIG9iamVjdCBpbiBkaWN0aW9uYXJ5IG1vZGUgKGEuay5hLiBcInNsb3dcIiBtb2RlIGluIHY4KVxuICAgICAgICAgICAgY3JlYXRlOiBzdXBwb3J0c0NyZWF0ZVxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gTWFrZURpY3Rpb25hcnkoT2JqZWN0LmNyZWF0ZShudWxsKSk7IH1cbiAgICAgICAgICAgICAgICA6IHN1cHBvcnRzUHJvdG9cbiAgICAgICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBNYWtlRGljdGlvbmFyeSh7IF9fcHJvdG9fXzogbnVsbCB9KTsgfVxuICAgICAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE1ha2VEaWN0aW9uYXJ5KHt9KTsgfSxcbiAgICAgICAgICAgIGhhczogZG93bkxldmVsXG4gICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAobWFwLCBrZXkpIHsgcmV0dXJuIGhhc093bi5jYWxsKG1hcCwga2V5KTsgfVxuICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKG1hcCwga2V5KSB7IHJldHVybiBrZXkgaW4gbWFwOyB9LFxuICAgICAgICAgICAgZ2V0OiBkb3duTGV2ZWxcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uIChtYXAsIGtleSkgeyByZXR1cm4gaGFzT3duLmNhbGwobWFwLCBrZXkpID8gbWFwW2tleV0gOiB1bmRlZmluZWQ7IH1cbiAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uIChtYXAsIGtleSkgeyByZXR1cm4gbWFwW2tleV07IH0sXG4gICAgICAgIH07XG4gICAgICAgIC8vIExvYWQgZ2xvYmFsIG9yIHNoaW0gdmVyc2lvbnMgb2YgTWFwLCBTZXQsIGFuZCBXZWFrTWFwXG4gICAgICAgIHZhciBmdW5jdGlvblByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihGdW5jdGlvbik7XG4gICAgICAgIHZhciB1c2VQb2x5ZmlsbCA9IHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52W1wiUkVGTEVDVF9NRVRBREFUQV9VU0VfTUFQX1BPTFlGSUxMXCJdID09PSBcInRydWVcIjtcbiAgICAgICAgdmFyIF9NYXAgPSAhdXNlUG9seWZpbGwgJiYgdHlwZW9mIE1hcCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBNYXAucHJvdG90eXBlLmVudHJpZXMgPT09IFwiZnVuY3Rpb25cIiA/IE1hcCA6IENyZWF0ZU1hcFBvbHlmaWxsKCk7XG4gICAgICAgIHZhciBfU2V0ID0gIXVzZVBvbHlmaWxsICYmIHR5cGVvZiBTZXQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU2V0LnByb3RvdHlwZS5lbnRyaWVzID09PSBcImZ1bmN0aW9uXCIgPyBTZXQgOiBDcmVhdGVTZXRQb2x5ZmlsbCgpO1xuICAgICAgICB2YXIgX1dlYWtNYXAgPSAhdXNlUG9seWZpbGwgJiYgdHlwZW9mIFdlYWtNYXAgPT09IFwiZnVuY3Rpb25cIiA/IFdlYWtNYXAgOiBDcmVhdGVXZWFrTWFwUG9seWZpbGwoKTtcbiAgICAgICAgLy8gW1tNZXRhZGF0YV1dIGludGVybmFsIHNsb3RcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnktb2JqZWN0LWludGVybmFsLW1ldGhvZHMtYW5kLWludGVybmFsLXNsb3RzXG4gICAgICAgIHZhciBNZXRhZGF0YSA9IG5ldyBfV2Vha01hcCgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllcyBhIHNldCBvZiBkZWNvcmF0b3JzIHRvIGEgcHJvcGVydHkgb2YgYSB0YXJnZXQgb2JqZWN0LlxuICAgICAgICAgKiBAcGFyYW0gZGVjb3JhdG9ycyBBbiBhcnJheSBvZiBkZWNvcmF0b3JzLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0LlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IHRvIGRlY29yYXRlLlxuICAgICAgICAgKiBAcGFyYW0gYXR0cmlidXRlcyAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciB0aGUgdGFyZ2V0IGtleS5cbiAgICAgICAgICogQHJlbWFya3MgRGVjb3JhdG9ycyBhcmUgYXBwbGllZCBpbiByZXZlcnNlIG9yZGVyLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICBFeGFtcGxlID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiLFxuICAgICAgICAgKiAgICAgICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9yc0FycmF5LCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiLFxuICAgICAgICAgKiAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpKSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIixcbiAgICAgICAgICogICAgICAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIsXG4gICAgICAgICAqICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpKSk7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBkZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSkge1xuICAgICAgICAgICAgICAgIGlmICghSXNBcnJheShkZWNvcmF0b3JzKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QoYXR0cmlidXRlcykgJiYgIUlzVW5kZWZpbmVkKGF0dHJpYnV0ZXMpICYmICFJc051bGwoYXR0cmlidXRlcykpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoSXNOdWxsKGF0dHJpYnV0ZXMpKVxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERlY29yYXRlUHJvcGVydHkoZGVjb3JhdG9ycywgdGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIUlzQXJyYXkoZGVjb3JhdG9ycykpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoIUlzQ29uc3RydWN0b3IodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBEZWNvcmF0ZUNvbnN0cnVjdG9yKGRlY29yYXRvcnMsIHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJkZWNvcmF0ZVwiLCBkZWNvcmF0ZSk7XG4gICAgICAgIC8vIDQuMS4yIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI3JlZmxlY3QubWV0YWRhdGFcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZGVmYXVsdCBtZXRhZGF0YSBkZWNvcmF0b3IgZmFjdG9yeSB0aGF0IGNhbiBiZSB1c2VkIG9uIGEgY2xhc3MsIGNsYXNzIG1lbWJlciwgb3IgcGFyYW1ldGVyLlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgVGhlIGtleSBmb3IgdGhlIG1ldGFkYXRhIGVudHJ5LlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFWYWx1ZSBUaGUgdmFsdWUgZm9yIHRoZSBtZXRhZGF0YSBlbnRyeS5cbiAgICAgICAgICogQHJldHVybnMgQSBkZWNvcmF0b3IgZnVuY3Rpb24uXG4gICAgICAgICAqIEByZW1hcmtzXG4gICAgICAgICAqIElmIGBtZXRhZGF0YUtleWAgaXMgYWxyZWFkeSBkZWZpbmVkIGZvciB0aGUgdGFyZ2V0IGFuZCB0YXJnZXQga2V5LCB0aGVcbiAgICAgICAgICogbWV0YWRhdGFWYWx1ZSBmb3IgdGhhdCBrZXkgd2lsbCBiZSBvdmVyd3JpdHRlbi5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IsIFR5cGVTY3JpcHQgb25seSlcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSwgVHlwZVNjcmlwdCBvbmx5KVxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcbiAgICAgICAgICogICAgICAgICBwcm9wZXJ0eTtcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QoKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcbiAgICAgICAgICogICAgICAgICBtZXRob2QoKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBkZWNvcmF0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpICYmICFJc1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIE9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlY29yYXRvcjtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcIm1ldGFkYXRhXCIsIG1ldGFkYXRhKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZSBhIHVuaXF1ZSBtZXRhZGF0YSBlbnRyeSBvbiB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YVZhbHVlIEEgdmFsdWUgdGhhdCBjb250YWlucyBhdHRhY2hlZCBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0byBkZWZpbmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBkZWNvcmF0b3IgZmFjdG9yeSBhcyBtZXRhZGF0YS1wcm9kdWNpbmcgYW5ub3RhdGlvbi5cbiAgICAgICAgICogICAgIGZ1bmN0aW9uIE15QW5ub3RhdGlvbihvcHRpb25zKTogRGVjb3JhdG9yIHtcbiAgICAgICAgICogICAgICAgICByZXR1cm4gKHRhcmdldCwga2V5PykgPT4gUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIHRhcmdldCwga2V5KTtcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGRlZmluZU1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImRlZmluZU1ldGFkYXRhXCIsIGRlZmluZU1ldGFkYXRhKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgYSB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHRhcmdldCBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbiBoYXMgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgbWV0YWRhdGEga2V5IHdhcyBkZWZpbmVkIG9uIHRoZSB0YXJnZXQgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUgY2hhaW47IG90aGVyd2lzZSwgYGZhbHNlYC5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGhhc01ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUhhc01ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImhhc01ldGFkYXRhXCIsIGhhc01ldGFkYXRhKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgYSB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHRhcmdldCBvYmplY3QgaGFzIHRoZSBwcm92aWRlZCBtZXRhZGF0YSBrZXkgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG1ldGFkYXRhIGtleSB3YXMgZGVmaW5lZCBvbiB0aGUgdGFyZ2V0IG9iamVjdDsgb3RoZXJ3aXNlLCBgZmFsc2VgLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gaGFzT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5SGFzT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiaGFzT3duTWV0YWRhdGFcIiwgaGFzT3duTWV0YWRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgbWV0YWRhdGEgdmFsdWUgZm9yIHRoZSBwcm92aWRlZCBtZXRhZGF0YSBrZXkgb24gdGhlIHRhcmdldCBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbi5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgbWV0YWRhdGEgdmFsdWUgZm9yIHRoZSBtZXRhZGF0YSBrZXkgaWYgZm91bmQ7IG90aGVyd2lzZSwgYHVuZGVmaW5lZGAuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlHZXRNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJnZXRNZXRhZGF0YVwiLCBnZXRNZXRhZGF0YSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBvbiB0aGUgdGFyZ2V0IG9iamVjdC5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgbWV0YWRhdGEgdmFsdWUgZm9yIHRoZSBtZXRhZGF0YSBrZXkgaWYgZm91bmQ7IG90aGVyd2lzZSwgYHVuZGVmaW5lZGAuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlHZXRPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJnZXRPd25NZXRhZGF0YVwiLCBnZXRPd25NZXRhZGF0YSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBtZXRhZGF0YSBrZXlzIGRlZmluZWQgb24gdGhlIHRhcmdldCBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbi5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQHJldHVybnMgQW4gYXJyYXkgb2YgdW5pcXVlIG1ldGFkYXRhIGtleXMuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0TWV0YWRhdGFLZXlzKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5TWV0YWRhdGFLZXlzKHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiZ2V0TWV0YWRhdGFLZXlzXCIsIGdldE1ldGFkYXRhS2V5cyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSB1bmlxdWUgbWV0YWRhdGEga2V5cyBkZWZpbmVkIG9uIHRoZSB0YXJnZXQgb2JqZWN0LlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcmV0dXJucyBBbiBhcnJheSBvZiB1bmlxdWUgbWV0YWRhdGEga2V5cy5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRPd25NZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlPd25NZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJnZXRPd25NZXRhZGF0YUtleXNcIiwgZ2V0T3duTWV0YWRhdGFLZXlzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlbGV0ZXMgdGhlIG1ldGFkYXRhIGVudHJ5IGZyb20gdGhlIHRhcmdldCBvYmplY3Qgd2l0aCB0aGUgcHJvdmlkZWQga2V5LlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgbWV0YWRhdGEgZW50cnkgd2FzIGZvdW5kIGFuZCBkZWxldGVkOyBvdGhlcndpc2UsIGZhbHNlLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5kZWxldGVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcCh0YXJnZXQsIHByb3BlcnR5S2V5LCAvKkNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFtZXRhZGF0YU1hcC5kZWxldGUobWV0YWRhdGFLZXkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YU1hcC5zaXplID4gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIHZhciB0YXJnZXRNZXRhZGF0YSA9IE1ldGFkYXRhLmdldCh0YXJnZXQpO1xuICAgICAgICAgICAgdGFyZ2V0TWV0YWRhdGEuZGVsZXRlKHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIGlmICh0YXJnZXRNZXRhZGF0YS5zaXplID4gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIE1ldGFkYXRhLmRlbGV0ZSh0YXJnZXQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJkZWxldGVNZXRhZGF0YVwiLCBkZWxldGVNZXRhZGF0YSk7XG4gICAgICAgIGZ1bmN0aW9uIERlY29yYXRlQ29uc3RydWN0b3IoZGVjb3JhdG9ycywgdGFyZ2V0KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIHZhciBkZWNvcmF0b3IgPSBkZWNvcmF0b3JzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBkZWNvcmF0ZWQgPSBkZWNvcmF0b3IodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKGRlY29yYXRlZCkgJiYgIUlzTnVsbChkZWNvcmF0ZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNDb25zdHJ1Y3RvcihkZWNvcmF0ZWQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBkZWNvcmF0ZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBEZWNvcmF0ZVByb3BlcnR5KGRlY29yYXRvcnMsIHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRvciA9IGRlY29yYXRvcnNbaV07XG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRlZCA9IGRlY29yYXRvcih0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKGRlY29yYXRlZCkgJiYgIUlzTnVsbChkZWNvcmF0ZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QoZGVjb3JhdGVkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRvciA9IGRlY29yYXRlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIENyZWF0ZSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldE1ldGFkYXRhID0gTWV0YWRhdGEuZ2V0KE8pO1xuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKHRhcmdldE1ldGFkYXRhKSkge1xuICAgICAgICAgICAgICAgIGlmICghQ3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRhcmdldE1ldGFkYXRhID0gbmV3IF9NYXAoKTtcbiAgICAgICAgICAgICAgICBNZXRhZGF0YS5zZXQoTywgdGFyZ2V0TWV0YWRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gdGFyZ2V0TWV0YWRhdGEuZ2V0KFApO1xuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSkge1xuICAgICAgICAgICAgICAgIGlmICghQ3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhTWFwID0gbmV3IF9NYXAoKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRNZXRhZGF0YS5zZXQoUCwgbWV0YWRhdGFNYXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1ldGFkYXRhTWFwO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS4xLjEgT3JkaW5hcnlIYXNNZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnloYXNtZXRhZGF0YVxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUhhc01ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKSB7XG4gICAgICAgICAgICB2YXIgaGFzT3duID0gT3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XG4gICAgICAgICAgICBpZiAoaGFzT3duKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTyk7XG4gICAgICAgICAgICBpZiAoIUlzTnVsbChwYXJlbnQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUhhc01ldGFkYXRhKE1ldGFkYXRhS2V5LCBwYXJlbnQsIFApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS4yLjEgT3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnloYXNvd25tZXRhZGF0YVxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKSB7XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIC8qQ3JlYXRlKi8gZmFsc2UpO1xuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gVG9Cb29sZWFuKG1ldGFkYXRhTWFwLmhhcyhNZXRhZGF0YUtleSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS4zLjEgT3JkaW5hcnlHZXRNZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnlnZXRtZXRhZGF0YVxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUdldE1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKSB7XG4gICAgICAgICAgICB2YXIgaGFzT3duID0gT3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XG4gICAgICAgICAgICBpZiAoaGFzT3duKVxuICAgICAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pO1xuICAgICAgICAgICAgaWYgKCFJc051bGwocGFyZW50KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlHZXRNZXRhZGF0YShNZXRhZGF0YUtleSwgcGFyZW50LCBQKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjQuMSBPcmRpbmFyeUdldE93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWdldG93bm1ldGFkYXRhXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5R2V0T3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgLypDcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gbWV0YWRhdGFNYXAuZ2V0KE1ldGFkYXRhS2V5KTtcbiAgICAgICAgfVxuICAgICAgICAvLyAzLjEuNS4xIE9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE1ldGFkYXRhVmFsdWUsIE8sIFApXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5ZGVmaW5lb3dubWV0YWRhdGFcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTWV0YWRhdGFWYWx1ZSwgTywgUCkge1xuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCAvKkNyZWF0ZSovIHRydWUpO1xuICAgICAgICAgICAgbWV0YWRhdGFNYXAuc2V0KE1ldGFkYXRhS2V5LCBNZXRhZGF0YVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyAzLjEuNi4xIE9yZGluYXJ5TWV0YWRhdGFLZXlzKE8sIFApXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5bWV0YWRhdGFrZXlzXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5TWV0YWRhdGFLZXlzKE8sIFApIHtcbiAgICAgICAgICAgIHZhciBvd25LZXlzID0gT3JkaW5hcnlPd25NZXRhZGF0YUtleXMoTywgUCk7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG93bktleXM7XG4gICAgICAgICAgICB2YXIgcGFyZW50S2V5cyA9IE9yZGluYXJ5TWV0YWRhdGFLZXlzKHBhcmVudCwgUCk7XG4gICAgICAgICAgICBpZiAocGFyZW50S2V5cy5sZW5ndGggPD0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3duS2V5cztcbiAgICAgICAgICAgIGlmIChvd25LZXlzLmxlbmd0aCA8PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnRLZXlzO1xuICAgICAgICAgICAgdmFyIHNldCA9IG5ldyBfU2V0KCk7XG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBvd25LZXlzXzEgPSBvd25LZXlzOyBfaSA8IG93bktleXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gb3duS2V5c18xW19pXTtcbiAgICAgICAgICAgICAgICB2YXIgaGFzS2V5ID0gc2V0LmhhcyhrZXkpO1xuICAgICAgICAgICAgICAgIGlmICghaGFzS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldC5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBwYXJlbnRLZXlzXzEgPSBwYXJlbnRLZXlzOyBfYSA8IHBhcmVudEtleXNfMS5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gcGFyZW50S2V5c18xW19hXTtcbiAgICAgICAgICAgICAgICB2YXIgaGFzS2V5ID0gc2V0LmhhcyhrZXkpO1xuICAgICAgICAgICAgICAgIGlmICghaGFzS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldC5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjcuMSBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyhPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeW93bm1ldGFkYXRha2V5c1xuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyhPLCBQKSB7XG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCAvKkNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgICAgICAgICB2YXIga2V5c09iaiA9IG1ldGFkYXRhTWFwLmtleXMoKTtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IEdldEl0ZXJhdG9yKGtleXNPYmopO1xuICAgICAgICAgICAgdmFyIGsgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IEl0ZXJhdG9yU3RlcChpdGVyYXRvcik7XG4gICAgICAgICAgICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMubGVuZ3RoID0gaztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBuZXh0VmFsdWUgPSBJdGVyYXRvclZhbHVlKG5leHQpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXNba10gPSBuZXh0VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIDYgRUNNQVNjcmlwdCBEYXRhIFR5cDBlcyBhbmQgVmFsdWVzXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWVjbWFzY3JpcHQtZGF0YS10eXBlcy1hbmQtdmFsdWVzXG4gICAgICAgIGZ1bmN0aW9uIFR5cGUoeCkge1xuICAgICAgICAgICAgaWYgKHggPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgLyogTnVsbCAqLztcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIHgpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6IHJldHVybiAwIC8qIFVuZGVmaW5lZCAqLztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiByZXR1cm4gMiAvKiBCb29sZWFuICovO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIDMgLyogU3RyaW5nICovO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzeW1ib2xcIjogcmV0dXJuIDQgLyogU3ltYm9sICovO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIDUgLyogTnVtYmVyICovO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjogcmV0dXJuIHggPT09IG51bGwgPyAxIC8qIE51bGwgKi8gOiA2IC8qIE9iamVjdCAqLztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gNiAvKiBPYmplY3QgKi87XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gNi4xLjEgVGhlIFVuZGVmaW5lZCBUeXBlXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMtdW5kZWZpbmVkLXR5cGVcbiAgICAgICAgZnVuY3Rpb24gSXNVbmRlZmluZWQoeCkge1xuICAgICAgICAgICAgcmV0dXJuIHggPT09IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyA2LjEuMiBUaGUgTnVsbCBUeXBlXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMtbnVsbC10eXBlXG4gICAgICAgIGZ1bmN0aW9uIElzTnVsbCh4KSB7XG4gICAgICAgICAgICByZXR1cm4geCA9PT0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyA2LjEuNSBUaGUgU3ltYm9sIFR5cGVcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcy1zeW1ib2wtdHlwZVxuICAgICAgICBmdW5jdGlvbiBJc1N5bWJvbCh4KSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNi4xLjcgVGhlIE9iamVjdCBUeXBlXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC10eXBlXG4gICAgICAgIGZ1bmN0aW9uIElzT2JqZWN0KHgpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJvYmplY3RcIiA/IHggIT09IG51bGwgOiB0eXBlb2YgeCA9PT0gXCJmdW5jdGlvblwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMSBUeXBlIENvbnZlcnNpb25cbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdHlwZS1jb252ZXJzaW9uXG4gICAgICAgIC8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b3ByaW1pdGl2ZVxuICAgICAgICBmdW5jdGlvbiBUb1ByaW1pdGl2ZShpbnB1dCwgUHJlZmVycmVkVHlwZSkge1xuICAgICAgICAgICAgc3dpdGNoIChUeXBlKGlucHV0KSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMCAvKiBVbmRlZmluZWQgKi86IHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgICAgICBjYXNlIDEgLyogTnVsbCAqLzogcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgICAgIGNhc2UgMiAvKiBCb29sZWFuICovOiByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICAgICAgY2FzZSAzIC8qIFN0cmluZyAqLzogcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgICAgIGNhc2UgNCAvKiBTeW1ib2wgKi86IHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgICAgICBjYXNlIDUgLyogTnVtYmVyICovOiByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaGludCA9IFByZWZlcnJlZFR5cGUgPT09IDMgLyogU3RyaW5nICovID8gXCJzdHJpbmdcIiA6IFByZWZlcnJlZFR5cGUgPT09IDUgLyogTnVtYmVyICovID8gXCJudW1iZXJcIiA6IFwiZGVmYXVsdFwiO1xuICAgICAgICAgICAgdmFyIGV4b3RpY1RvUHJpbSA9IEdldE1ldGhvZChpbnB1dCwgdG9QcmltaXRpdmVTeW1ib2wpO1xuICAgICAgICAgICAgaWYgKGV4b3RpY1RvUHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGV4b3RpY1RvUHJpbS5jYWxsKGlucHV0LCBoaW50KTtcbiAgICAgICAgICAgICAgICBpZiAoSXNPYmplY3QocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlUb1ByaW1pdGl2ZShpbnB1dCwgaGludCA9PT0gXCJkZWZhdWx0XCIgPyBcIm51bWJlclwiIDogaGludCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4xLjEuMSBPcmRpbmFyeVRvUHJpbWl0aXZlKE8sIGhpbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9yZGluYXJ5dG9wcmltaXRpdmVcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlUb1ByaW1pdGl2ZShPLCBoaW50KSB7XG4gICAgICAgICAgICBpZiAoaGludCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIHZhciB0b1N0cmluZ18xID0gTy50b1N0cmluZztcbiAgICAgICAgICAgICAgICBpZiAoSXNDYWxsYWJsZSh0b1N0cmluZ18xKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdG9TdHJpbmdfMS5jYWxsKE8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVPZiA9IE8udmFsdWVPZjtcbiAgICAgICAgICAgICAgICBpZiAoSXNDYWxsYWJsZSh2YWx1ZU9mKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdmFsdWVPZi5jYWxsKE8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZU9mID0gTy52YWx1ZU9mO1xuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHZhbHVlT2YpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB2YWx1ZU9mLmNhbGwoTyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0b1N0cmluZ18yID0gTy50b1N0cmluZztcbiAgICAgICAgICAgICAgICBpZiAoSXNDYWxsYWJsZSh0b1N0cmluZ18yKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdG9TdHJpbmdfMi5jYWxsKE8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjEuMiBUb0Jvb2xlYW4oYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8yMDE2LyNzZWMtdG9ib29sZWFuXG4gICAgICAgIGZ1bmN0aW9uIFRvQm9vbGVhbihhcmd1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuICEhYXJndW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4xLjEyIFRvU3RyaW5nKGFyZ3VtZW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b3N0cmluZ1xuICAgICAgICBmdW5jdGlvbiBUb1N0cmluZyhhcmd1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBhcmd1bWVudDtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjEuMTQgVG9Qcm9wZXJ0eUtleShhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9wcm9wZXJ0eWtleVxuICAgICAgICBmdW5jdGlvbiBUb1Byb3BlcnR5S2V5KGFyZ3VtZW50KSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gVG9QcmltaXRpdmUoYXJndW1lbnQsIDMgLyogU3RyaW5nICovKTtcbiAgICAgICAgICAgIGlmIChJc1N5bWJvbChrZXkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICByZXR1cm4gVG9TdHJpbmcoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjIgVGVzdGluZyBhbmQgQ29tcGFyaXNvbiBPcGVyYXRpb25zXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRlc3RpbmctYW5kLWNvbXBhcmlzb24tb3BlcmF0aW9uc1xuICAgICAgICAvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pc2FycmF5XG4gICAgICAgIGZ1bmN0aW9uIElzQXJyYXkoYXJndW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5XG4gICAgICAgICAgICAgICAgPyBBcnJheS5pc0FycmF5KGFyZ3VtZW50KVxuICAgICAgICAgICAgICAgIDogYXJndW1lbnQgaW5zdGFuY2VvZiBPYmplY3RcbiAgICAgICAgICAgICAgICAgICAgPyBhcmd1bWVudCBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMi4zIElzQ2FsbGFibGUoYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlzY2FsbGFibGVcbiAgICAgICAgZnVuY3Rpb24gSXNDYWxsYWJsZShhcmd1bWVudCkge1xuICAgICAgICAgICAgLy8gTk9URTogVGhpcyBpcyBhbiBhcHByb3hpbWF0aW9uIGFzIHdlIGNhbm5vdCBjaGVjayBmb3IgW1tDYWxsXV0gaW50ZXJuYWwgbWV0aG9kLlxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJmdW5jdGlvblwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMi40IElzQ29uc3RydWN0b3IoYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlzY29uc3RydWN0b3JcbiAgICAgICAgZnVuY3Rpb24gSXNDb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuICAgICAgICAgICAgLy8gTk9URTogVGhpcyBpcyBhbiBhcHByb3hpbWF0aW9uIGFzIHdlIGNhbm5vdCBjaGVjayBmb3IgW1tDb25zdHJ1Y3RdXSBpbnRlcm5hbCBtZXRob2QuXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4yLjcgSXNQcm9wZXJ0eUtleShhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNwcm9wZXJ0eWtleVxuICAgICAgICBmdW5jdGlvbiBJc1Byb3BlcnR5S2V5KGFyZ3VtZW50KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKFR5cGUoYXJndW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAzIC8qIFN0cmluZyAqLzogcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSA0IC8qIFN5bWJvbCAqLzogcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIDcuMyBPcGVyYXRpb25zIG9uIE9iamVjdHNcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3BlcmF0aW9ucy1vbi1vYmplY3RzXG4gICAgICAgIC8vIDcuMy45IEdldE1ldGhvZChWLCBQKVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1nZXRtZXRob2RcbiAgICAgICAgZnVuY3Rpb24gR2V0TWV0aG9kKFYsIFApIHtcbiAgICAgICAgICAgIHZhciBmdW5jID0gVltQXTtcbiAgICAgICAgICAgIGlmIChmdW5jID09PSB1bmRlZmluZWQgfHwgZnVuYyA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKCFJc0NhbGxhYmxlKGZ1bmMpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuNCBPcGVyYXRpb25zIG9uIEl0ZXJhdG9yIE9iamVjdHNcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3BlcmF0aW9ucy1vbi1pdGVyYXRvci1vYmplY3RzXG4gICAgICAgIGZ1bmN0aW9uIEdldEl0ZXJhdG9yKG9iaikge1xuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IEdldE1ldGhvZChvYmosIGl0ZXJhdG9yU3ltYm9sKTtcbiAgICAgICAgICAgIGlmICghSXNDYWxsYWJsZShtZXRob2QpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTsgLy8gZnJvbSBDYWxsXG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBtZXRob2QuY2FsbChvYmopO1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdChpdGVyYXRvcikpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuNC40IEl0ZXJhdG9yVmFsdWUoaXRlclJlc3VsdClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLzIwMTYvI3NlYy1pdGVyYXRvcnZhbHVlXG4gICAgICAgIGZ1bmN0aW9uIEl0ZXJhdG9yVmFsdWUoaXRlclJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJSZXN1bHQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy40LjUgSXRlcmF0b3JTdGVwKGl0ZXJhdG9yKVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pdGVyYXRvcnN0ZXBcbiAgICAgICAgZnVuY3Rpb24gSXRlcmF0b3JTdGVwKGl0ZXJhdG9yKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gZmFsc2UgOiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXRlcmF0b3JjbG9zZVxuICAgICAgICBmdW5jdGlvbiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yKSB7XG4gICAgICAgICAgICB2YXIgZiA9IGl0ZXJhdG9yW1wicmV0dXJuXCJdO1xuICAgICAgICAgICAgaWYgKGYpXG4gICAgICAgICAgICAgICAgZi5jYWxsKGl0ZXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICAvLyA5LjEgT3JkaW5hcnkgT2JqZWN0IEludGVybmFsIE1ldGhvZHMgYW5kIEludGVybmFsIFNsb3RzXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9yZGluYXJ5LW9iamVjdC1pbnRlcm5hbC1tZXRob2RzLWFuZC1pbnRlcm5hbC1zbG90c1xuICAgICAgICAvLyA5LjEuMS4xIE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTylcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3JkaW5hcnlnZXRwcm90b3R5cGVvZlxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pIHtcbiAgICAgICAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgTyAhPT0gXCJmdW5jdGlvblwiIHx8IE8gPT09IGZ1bmN0aW9uUHJvdG90eXBlKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcbiAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQgZG9lc24ndCBzZXQgX19wcm90b19fIGluIEVTNSwgYXMgaXQncyBub24tc3RhbmRhcmQuXG4gICAgICAgICAgICAvLyBUcnkgdG8gZGV0ZXJtaW5lIHRoZSBzdXBlcmNsYXNzIGNvbnN0cnVjdG9yLiBDb21wYXRpYmxlIGltcGxlbWVudGF0aW9uc1xuICAgICAgICAgICAgLy8gbXVzdCBlaXRoZXIgc2V0IF9fcHJvdG9fXyBvbiBhIHN1YmNsYXNzIGNvbnN0cnVjdG9yIHRvIHRoZSBzdXBlcmNsYXNzIGNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgLy8gb3IgZW5zdXJlIGVhY2ggY2xhc3MgaGFzIGEgdmFsaWQgYGNvbnN0cnVjdG9yYCBwcm9wZXJ0eSBvbiBpdHMgcHJvdG90eXBlIHRoYXRcbiAgICAgICAgICAgIC8vIHBvaW50cyBiYWNrIHRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgbm90IHRoZSBzYW1lIGFzIEZ1bmN0aW9uLltbUHJvdG90eXBlXV0sIHRoZW4gdGhpcyBpcyBkZWZpbmF0ZWx5IGluaGVyaXRlZC5cbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdGhlIGNhc2Ugd2hlbiBpbiBFUzYgb3Igd2hlbiB1c2luZyBfX3Byb3RvX18gaW4gYSBjb21wYXRpYmxlIGJyb3dzZXIuXG4gICAgICAgICAgICBpZiAocHJvdG8gIT09IGZ1bmN0aW9uUHJvdG90eXBlKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcbiAgICAgICAgICAgIC8vIElmIHRoZSBzdXBlciBwcm90b3R5cGUgaXMgT2JqZWN0LnByb3RvdHlwZSwgbnVsbCwgb3IgdW5kZWZpbmVkLCB0aGVuIHdlIGNhbm5vdCBkZXRlcm1pbmUgdGhlIGhlcml0YWdlLlxuICAgICAgICAgICAgdmFyIHByb3RvdHlwZSA9IE8ucHJvdG90eXBlO1xuICAgICAgICAgICAgdmFyIHByb3RvdHlwZVByb3RvID0gcHJvdG90eXBlICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpO1xuICAgICAgICAgICAgaWYgKHByb3RvdHlwZVByb3RvID09IG51bGwgfHwgcHJvdG90eXBlUHJvdG8gPT09IE9iamVjdC5wcm90b3R5cGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gSWYgdGhlIGNvbnN0cnVjdG9yIHdhcyBub3QgYSBmdW5jdGlvbiwgdGhlbiB3ZSBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBoZXJpdGFnZS5cbiAgICAgICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IHByb3RvdHlwZVByb3RvLmNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgc29tZSBraW5kIG9mIHNlbGYtcmVmZXJlbmNlLCB0aGVuIHdlIGNhbm5vdCBkZXRlcm1pbmUgdGhlIGhlcml0YWdlLlxuICAgICAgICAgICAgaWYgKGNvbnN0cnVjdG9yID09PSBPKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBwcmV0dHkgZ29vZCBndWVzcyBhdCB0aGUgaGVyaXRhZ2UuXG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmFpdmUgTWFwIHNoaW1cbiAgICAgICAgZnVuY3Rpb24gQ3JlYXRlTWFwUG9seWZpbGwoKSB7XG4gICAgICAgICAgICB2YXIgY2FjaGVTZW50aW5lbCA9IHt9O1xuICAgICAgICAgICAgdmFyIGFycmF5U2VudGluZWwgPSBbXTtcbiAgICAgICAgICAgIHZhciBNYXBJdGVyYXRvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBNYXBJdGVyYXRvcihrZXlzLCB2YWx1ZXMsIHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IGtleXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlW1wiQEBpdGVyYXRvclwiXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2luZGV4O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuX2tleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fc2VsZWN0b3IodGhpcy5fa2V5c1tpbmRleF0sIHRoaXMuX3ZhbHVlc1tpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA+PSB0aGlzLl9rZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IGFycmF5U2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gYXJyYXlTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogcmVzdWx0LCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE1hcEl0ZXJhdG9yLnByb3RvdHlwZS50aHJvdyA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBhcnJheVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gYXJyYXlTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE1hcEl0ZXJhdG9yLnByb3RvdHlwZS5yZXR1cm4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0gYXJyYXlTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IGFycmF5U2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWFwSXRlcmF0b3I7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBNYXAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlS2V5ID0gY2FjaGVTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IC0yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWFwLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9rZXlzLmxlbmd0aDsgfSxcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB0aGlzLl9maW5kKGtleSwgLyppbnNlcnQqLyBmYWxzZSkgPj0gMDsgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZChrZXksIC8qaW5zZXJ0Ki8gZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXggPj0gMCA/IHRoaXMuX3ZhbHVlc1tpbmRleF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2ZpbmQoa2V5LCAvKmluc2VydCovIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2ZpbmQoa2V5LCAvKmluc2VydCovIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy5fa2V5cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gaW5kZXggKyAxOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5c1tpIC0gMV0gPSB0aGlzLl9rZXlzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1tpIC0gMV0gPSB0aGlzLl92YWx1ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzLmxlbmd0aC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzLmxlbmd0aC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gdGhpcy5fY2FjaGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUtleSA9IGNhY2hlU2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IC0yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVLZXkgPSBjYWNoZVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gLTI7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTWFwSXRlcmF0b3IodGhpcy5fa2V5cywgdGhpcy5fdmFsdWVzLCBnZXRLZXkpOyB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE1hcEl0ZXJhdG9yKHRoaXMuX2tleXMsIHRoaXMuX3ZhbHVlcywgZ2V0VmFsdWUpOyB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNYXBJdGVyYXRvcih0aGlzLl9rZXlzLCB0aGlzLl92YWx1ZXMsIGdldEVudHJ5KTsgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlW1wiQEBpdGVyYXRvclwiXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZW50cmllcygpOyB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzKCk7IH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5fZmluZCA9IGZ1bmN0aW9uIChrZXksIGluc2VydCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FjaGVLZXkgIT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IHRoaXMuX2tleXMuaW5kZXhPZih0aGlzLl9jYWNoZUtleSA9IGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlSW5kZXggPCAwICYmIGluc2VydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IHRoaXMuX2tleXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUluZGV4O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hcDtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRLZXkoa2V5LCBfKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFZhbHVlKF8sIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0RW50cnkoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmFpdmUgU2V0IHNoaW1cbiAgICAgICAgZnVuY3Rpb24gQ3JlYXRlU2V0UG9seWZpbGwoKSB7XG4gICAgICAgICAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFNldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwID0gbmV3IF9NYXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNldC5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLnNpemU7IH0sXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0aGlzLl9tYXAuaGFzKHZhbHVlKTsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdGhpcy5fbWFwLnNldCh2YWx1ZSwgdmFsdWUpLCB0aGlzOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0aGlzLl9tYXAuZGVsZXRlKHZhbHVlKTsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkgeyB0aGlzLl9tYXAuY2xlYXIoKTsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYXAua2V5cygpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLnZhbHVlcygpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hcC5lbnRyaWVzKCk7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZVtcIkBAaXRlcmF0b3JcIl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmtleXMoKTsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMua2V5cygpOyB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBTZXQ7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5haXZlIFdlYWtNYXAgc2hpbVxuICAgICAgICBmdW5jdGlvbiBDcmVhdGVXZWFrTWFwUG9seWZpbGwoKSB7XG4gICAgICAgICAgICB2YXIgVVVJRF9TSVpFID0gMTY7XG4gICAgICAgICAgICB2YXIga2V5cyA9IEhhc2hNYXAuY3JlYXRlKCk7XG4gICAgICAgICAgICB2YXIgcm9vdEtleSA9IENyZWF0ZVVuaXF1ZUtleSgpO1xuICAgICAgICAgICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBXZWFrTWFwKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXkgPSBDcmVhdGVVbmlxdWVLZXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGUgPSBHZXRPckNyZWF0ZVdlYWtNYXBUYWJsZSh0YXJnZXQsIC8qY3JlYXRlKi8gZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUgIT09IHVuZGVmaW5lZCA/IEhhc2hNYXAuaGFzKHRhYmxlLCB0aGlzLl9rZXkpIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZSAhPT0gdW5kZWZpbmVkID8gSGFzaE1hcC5nZXQodGFibGUsIHRoaXMuX2tleSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGUgPSBHZXRPckNyZWF0ZVdlYWtNYXBUYWJsZSh0YXJnZXQsIC8qY3JlYXRlKi8gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlW3RoaXMuX2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZSAhPT0gdW5kZWZpbmVkID8gZGVsZXRlIHRhYmxlW3RoaXMuX2tleV0gOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBub3QgYSByZWFsIGNsZWFyLCBqdXN0IG1ha2VzIHRoZSBwcmV2aW91cyBkYXRhIHVucmVhY2hhYmxlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleSA9IENyZWF0ZVVuaXF1ZUtleSgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFdlYWtNYXA7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgZnVuY3Rpb24gQ3JlYXRlVW5pcXVlS2V5KCkge1xuICAgICAgICAgICAgICAgIHZhciBrZXk7XG4gICAgICAgICAgICAgICAgZG9cbiAgICAgICAgICAgICAgICAgICAga2V5ID0gXCJAQFdlYWtNYXBAQFwiICsgQ3JlYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChIYXNoTWFwLmhhcyhrZXlzLCBrZXkpKTtcbiAgICAgICAgICAgICAgICBrZXlzW2tleV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBHZXRPckNyZWF0ZVdlYWtNYXBUYWJsZSh0YXJnZXQsIGNyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICghaGFzT3duLmNhbGwodGFyZ2V0LCByb290S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNyZWF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHJvb3RLZXksIHsgdmFsdWU6IEhhc2hNYXAuY3JlYXRlKCkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcm9vdEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBGaWxsUmFuZG9tQnl0ZXMoYnVmZmVyLCBzaXplKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltpXSA9IE1hdGgucmFuZG9tKCkgKiAweGZmIHwgMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gR2VuUmFuZG9tQnl0ZXMoc2l6ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgVWludDhBcnJheSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoc2l6ZSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1zQ3J5cHRvICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBGaWxsUmFuZG9tQnl0ZXMobmV3IFVpbnQ4QXJyYXkoc2l6ZSksIHNpemUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gRmlsbFJhbmRvbUJ5dGVzKG5ldyBBcnJheShzaXplKSwgc2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBDcmVhdGVVVUlEKCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gR2VuUmFuZG9tQnl0ZXMoVVVJRF9TSVpFKTtcbiAgICAgICAgICAgICAgICAvLyBtYXJrIGFzIHJhbmRvbSAtIFJGQyA0MTIyIMKnIDQuNFxuICAgICAgICAgICAgICAgIGRhdGFbNl0gPSBkYXRhWzZdICYgMHg0ZiB8IDB4NDA7XG4gICAgICAgICAgICAgICAgZGF0YVs4XSA9IGRhdGFbOF0gJiAweGJmIHwgMHg4MDtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBVVUlEX1NJWkU7ICsrb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBieXRlID0gZGF0YVtvZmZzZXRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ID09PSA0IHx8IG9mZnNldCA9PT0gNiB8fCBvZmZzZXQgPT09IDgpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCItXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChieXRlIDwgMTYpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCIwXCI7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBieXRlLnRvU3RyaW5nKDE2KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHVzZXMgYSBoZXVyaXN0aWMgdXNlZCBieSB2OCBhbmQgY2hha3JhIHRvIGZvcmNlIGFuIG9iamVjdCBpbnRvIGRpY3Rpb25hcnkgbW9kZS5cbiAgICAgICAgZnVuY3Rpb24gTWFrZURpY3Rpb25hcnkob2JqKSB7XG4gICAgICAgICAgICBvYmouX18gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBkZWxldGUgb2JqLl9fO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgIH0pO1xufSkoUmVmbGVjdCB8fCAoUmVmbGVjdCA9IHt9KSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNtcCAoYSwgYikge1xuICAgIHZhciBwYSA9IGEuc3BsaXQoJy4nKTtcbiAgICB2YXIgcGIgPSBiLnNwbGl0KCcuJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgdmFyIG5hID0gTnVtYmVyKHBhW2ldKTtcbiAgICAgICAgdmFyIG5iID0gTnVtYmVyKHBiW2ldKTtcbiAgICAgICAgaWYgKG5hID4gbmIpIHJldHVybiAxO1xuICAgICAgICBpZiAobmIgPiBuYSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoIWlzTmFOKG5hKSAmJiBpc05hTihuYikpIHJldHVybiAxO1xuICAgICAgICBpZiAoaXNOYU4obmEpICYmICFpc05hTihuYikpIHJldHVybiAtMTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG59O1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gU2VtVmVyXG5cbnZhciBkZWJ1Z1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiZcbiAgICBwcm9jZXNzLmVudiAmJlxuICAgIHByb2Nlc3MuZW52Lk5PREVfREVCVUcgJiZcbiAgICAvXFxic2VtdmVyXFxiL2kudGVzdChwcm9jZXNzLmVudi5OT0RFX0RFQlVHKSkge1xuICBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMClcbiAgICBhcmdzLnVuc2hpZnQoJ1NFTVZFUicpXG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncylcbiAgfVxufSBlbHNlIHtcbiAgZGVidWcgPSBmdW5jdGlvbiAoKSB7fVxufVxuXG4vLyBOb3RlOiB0aGlzIGlzIHRoZSBzZW12ZXIub3JnIHZlcnNpb24gb2YgdGhlIHNwZWMgdGhhdCBpdCBpbXBsZW1lbnRzXG4vLyBOb3QgbmVjZXNzYXJpbHkgdGhlIHBhY2thZ2UgdmVyc2lvbiBvZiB0aGlzIGNvZGUuXG5leHBvcnRzLlNFTVZFUl9TUEVDX1ZFUlNJT04gPSAnMi4wLjAnXG5cbnZhciBNQVhfTEVOR1RIID0gMjU2XG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIDkwMDcxOTkyNTQ3NDA5OTFcblxuLy8gTWF4IHNhZmUgc2VnbWVudCBsZW5ndGggZm9yIGNvZXJjaW9uLlxudmFyIE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEggPSAxNlxuXG4vLyBUaGUgYWN0dWFsIHJlZ2V4cHMgZ28gb24gZXhwb3J0cy5yZVxudmFyIHJlID0gZXhwb3J0cy5yZSA9IFtdXG52YXIgc3JjID0gZXhwb3J0cy5zcmMgPSBbXVxudmFyIFIgPSAwXG5cbi8vIFRoZSBmb2xsb3dpbmcgUmVndWxhciBFeHByZXNzaW9ucyBjYW4gYmUgdXNlZCBmb3IgdG9rZW5pemluZyxcbi8vIHZhbGlkYXRpbmcsIGFuZCBwYXJzaW5nIFNlbVZlciB2ZXJzaW9uIHN0cmluZ3MuXG5cbi8vICMjIE51bWVyaWMgSWRlbnRpZmllclxuLy8gQSBzaW5nbGUgYDBgLCBvciBhIG5vbi16ZXJvIGRpZ2l0IGZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBkaWdpdHMuXG5cbnZhciBOVU1FUklDSURFTlRJRklFUiA9IFIrK1xuc3JjW05VTUVSSUNJREVOVElGSUVSXSA9ICcwfFsxLTldXFxcXGQqJ1xudmFyIE5VTUVSSUNJREVOVElGSUVSTE9PU0UgPSBSKytcbnNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSA9ICdbMC05XSsnXG5cbi8vICMjIE5vbi1udW1lcmljIElkZW50aWZpZXJcbi8vIFplcm8gb3IgbW9yZSBkaWdpdHMsIGZvbGxvd2VkIGJ5IGEgbGV0dGVyIG9yIGh5cGhlbiwgYW5kIHRoZW4gemVybyBvclxuLy8gbW9yZSBsZXR0ZXJzLCBkaWdpdHMsIG9yIGh5cGhlbnMuXG5cbnZhciBOT05OVU1FUklDSURFTlRJRklFUiA9IFIrK1xuc3JjW05PTk5VTUVSSUNJREVOVElGSUVSXSA9ICdcXFxcZCpbYS16QS1aLV1bYS16QS1aMC05LV0qJ1xuXG4vLyAjIyBNYWluIFZlcnNpb25cbi8vIFRocmVlIGRvdC1zZXBhcmF0ZWQgbnVtZXJpYyBpZGVudGlmaWVycy5cblxudmFyIE1BSU5WRVJTSU9OID0gUisrXG5zcmNbTUFJTlZFUlNJT05dID0gJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnKSdcblxudmFyIE1BSU5WRVJTSU9OTE9PU0UgPSBSKytcbnNyY1tNQUlOVkVSU0lPTkxPT1NFXSA9ICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICcpJ1xuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uIElkZW50aWZpZXJcbi8vIEEgbnVtZXJpYyBpZGVudGlmaWVyLCBvciBhIG5vbi1udW1lcmljIGlkZW50aWZpZXIuXG5cbnZhciBQUkVSRUxFQVNFSURFTlRJRklFUiA9IFIrK1xuc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSXSA9ICcoPzonICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3wnICsgc3JjW05PTk5VTUVSSUNJREVOVElGSUVSXSArICcpJ1xuXG52YXIgUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRSA9IFIrK1xuc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdID0gJyg/OicgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3wnICsgc3JjW05PTk5VTUVSSUNJREVOVElGSUVSXSArICcpJ1xuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uXG4vLyBIeXBoZW4sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIGRvdC1zZXBhcmF0ZWQgcHJlLXJlbGVhc2UgdmVyc2lvblxuLy8gaWRlbnRpZmllcnMuXG5cbnZhciBQUkVSRUxFQVNFID0gUisrXG5zcmNbUFJFUkVMRUFTRV0gPSAnKD86LSgnICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSXSArXG4gICAgICAgICAgICAgICAgICAnKD86XFxcXC4nICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSXSArICcpKikpJ1xuXG52YXIgUFJFUkVMRUFTRUxPT1NFID0gUisrXG5zcmNbUFJFUkVMRUFTRUxPT1NFXSA9ICcoPzotPygnICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSArICcpKikpJ1xuXG4vLyAjIyBCdWlsZCBNZXRhZGF0YSBJZGVudGlmaWVyXG4vLyBBbnkgY29tYmluYXRpb24gb2YgZGlnaXRzLCBsZXR0ZXJzLCBvciBoeXBoZW5zLlxuXG52YXIgQlVJTERJREVOVElGSUVSID0gUisrXG5zcmNbQlVJTERJREVOVElGSUVSXSA9ICdbMC05QS1aYS16LV0rJ1xuXG4vLyAjIyBCdWlsZCBNZXRhZGF0YVxuLy8gUGx1cyBzaWduLCBmb2xsb3dlZCBieSBvbmUgb3IgbW9yZSBwZXJpb2Qtc2VwYXJhdGVkIGJ1aWxkIG1ldGFkYXRhXG4vLyBpZGVudGlmaWVycy5cblxudmFyIEJVSUxEID0gUisrXG5zcmNbQlVJTERdID0gJyg/OlxcXFwrKCcgKyBzcmNbQlVJTERJREVOVElGSUVSXSArXG4gICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tCVUlMRElERU5USUZJRVJdICsgJykqKSknXG5cbi8vICMjIEZ1bGwgVmVyc2lvbiBTdHJpbmdcbi8vIEEgbWFpbiB2ZXJzaW9uLCBmb2xsb3dlZCBvcHRpb25hbGx5IGJ5IGEgcHJlLXJlbGVhc2UgdmVyc2lvbiBhbmRcbi8vIGJ1aWxkIG1ldGFkYXRhLlxuXG4vLyBOb3RlIHRoYXQgdGhlIG9ubHkgbWFqb3IsIG1pbm9yLCBwYXRjaCwgYW5kIHByZS1yZWxlYXNlIHNlY3Rpb25zIG9mXG4vLyB0aGUgdmVyc2lvbiBzdHJpbmcgYXJlIGNhcHR1cmluZyBncm91cHMuICBUaGUgYnVpbGQgbWV0YWRhdGEgaXMgbm90IGFcbi8vIGNhcHR1cmluZyBncm91cCwgYmVjYXVzZSBpdCBzaG91bGQgbm90IGV2ZXIgYmUgdXNlZCBpbiB2ZXJzaW9uXG4vLyBjb21wYXJpc29uLlxuXG52YXIgRlVMTCA9IFIrK1xudmFyIEZVTExQTEFJTiA9ICd2PycgKyBzcmNbTUFJTlZFUlNJT05dICtcbiAgICAgICAgICAgICAgICBzcmNbUFJFUkVMRUFTRV0gKyAnPycgK1xuICAgICAgICAgICAgICAgIHNyY1tCVUlMRF0gKyAnPydcblxuc3JjW0ZVTExdID0gJ14nICsgRlVMTFBMQUlOICsgJyQnXG5cbi8vIGxpa2UgZnVsbCwgYnV0IGFsbG93cyB2MS4yLjMgYW5kID0xLjIuMywgd2hpY2ggcGVvcGxlIGRvIHNvbWV0aW1lcy5cbi8vIGFsc28sIDEuMC4wYWxwaGExIChwcmVyZWxlYXNlIHdpdGhvdXQgdGhlIGh5cGhlbikgd2hpY2ggaXMgcHJldHR5XG4vLyBjb21tb24gaW4gdGhlIG5wbSByZWdpc3RyeS5cbnZhciBMT09TRVBMQUlOID0gJ1t2PVxcXFxzXSonICsgc3JjW01BSU5WRVJTSU9OTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgc3JjW1BSRVJFTEVBU0VMT09TRV0gKyAnPycgK1xuICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nXG5cbnZhciBMT09TRSA9IFIrK1xuc3JjW0xPT1NFXSA9ICdeJyArIExPT1NFUExBSU4gKyAnJCdcblxudmFyIEdUTFQgPSBSKytcbnNyY1tHVExUXSA9ICcoKD86PHw+KT89PyknXG5cbi8vIFNvbWV0aGluZyBsaWtlIFwiMi4qXCIgb3IgXCIxLjIueFwiLlxuLy8gTm90ZSB0aGF0IFwieC54XCIgaXMgYSB2YWxpZCB4UmFuZ2UgaWRlbnRpZmVyLCBtZWFuaW5nIFwiYW55IHZlcnNpb25cIlxuLy8gT25seSB0aGUgZmlyc3QgaXRlbSBpcyBzdHJpY3RseSByZXF1aXJlZC5cbnZhciBYUkFOR0VJREVOVElGSUVSTE9PU0UgPSBSKytcbnNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdID0gc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJ3x4fFh8XFxcXConXG52YXIgWFJBTkdFSURFTlRJRklFUiA9IFIrK1xuc3JjW1hSQU5HRUlERU5USUZJRVJdID0gc3JjW05VTUVSSUNJREVOVElGSUVSXSArICd8eHxYfFxcXFwqJ1xuXG52YXIgWFJBTkdFUExBSU4gPSBSKytcbnNyY1tYUkFOR0VQTEFJTl0gPSAnW3Y9XFxcXHNdKignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzonICsgc3JjW1BSRVJFTEVBU0VdICsgJyk/JyArXG4gICAgICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/JyArXG4gICAgICAgICAgICAgICAgICAgJyk/KT8nXG5cbnZhciBYUkFOR0VQTEFJTkxPT1NFID0gUisrXG5zcmNbWFJBTkdFUExBSU5MT09TRV0gPSAnW3Y9XFxcXHNdKignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzonICsgc3JjW1BSRVJFTEVBU0VMT09TRV0gKyAnKT8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyY1tCVUlMRF0gKyAnPycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyk/KT8nXG5cbnZhciBYUkFOR0UgPSBSKytcbnNyY1tYUkFOR0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKicgKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnXG52YXIgWFJBTkdFTE9PU0UgPSBSKytcbnNyY1tYUkFOR0VMT09TRV0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqJyArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICckJ1xuXG4vLyBDb2VyY2lvbi5cbi8vIEV4dHJhY3QgYW55dGhpbmcgdGhhdCBjb3VsZCBjb25jZWl2YWJseSBiZSBhIHBhcnQgb2YgYSB2YWxpZCBzZW12ZXJcbnZhciBDT0VSQ0UgPSBSKytcbnNyY1tDT0VSQ0VdID0gJyg/Ol58W15cXFxcZF0pJyArXG4gICAgICAgICAgICAgICcoXFxcXGR7MSwnICsgTUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSCArICd9KScgK1xuICAgICAgICAgICAgICAnKD86XFxcXC4oXFxcXGR7MSwnICsgTUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSCArICd9KSk/JyArXG4gICAgICAgICAgICAgICcoPzpcXFxcLihcXFxcZHsxLCcgKyBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIICsgJ30pKT8nICtcbiAgICAgICAgICAgICAgJyg/OiR8W15cXFxcZF0pJ1xuXG4vLyBUaWxkZSByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwicmVhc29uYWJseSBhdCBvciBncmVhdGVyIHRoYW5cIlxudmFyIExPTkVUSUxERSA9IFIrK1xuc3JjW0xPTkVUSUxERV0gPSAnKD86fj4/KSdcblxudmFyIFRJTERFVFJJTSA9IFIrK1xuc3JjW1RJTERFVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0xPTkVUSUxERV0gKyAnXFxcXHMrJ1xucmVbVElMREVUUklNXSA9IG5ldyBSZWdFeHAoc3JjW1RJTERFVFJJTV0sICdnJylcbnZhciB0aWxkZVRyaW1SZXBsYWNlID0gJyQxfidcblxudmFyIFRJTERFID0gUisrXG5zcmNbVElMREVdID0gJ14nICsgc3JjW0xPTkVUSUxERV0gKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnXG52YXIgVElMREVMT09TRSA9IFIrK1xuc3JjW1RJTERFTE9PU0VdID0gJ14nICsgc3JjW0xPTkVUSUxERV0gKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCdcblxuLy8gQ2FyZXQgcmFuZ2VzLlxuLy8gTWVhbmluZyBpcyBcImF0IGxlYXN0IGFuZCBiYWNrd2FyZHMgY29tcGF0aWJsZSB3aXRoXCJcbnZhciBMT05FQ0FSRVQgPSBSKytcbnNyY1tMT05FQ0FSRVRdID0gJyg/OlxcXFxeKSdcblxudmFyIENBUkVUVFJJTSA9IFIrK1xuc3JjW0NBUkVUVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0xPTkVDQVJFVF0gKyAnXFxcXHMrJ1xucmVbQ0FSRVRUUklNXSA9IG5ldyBSZWdFeHAoc3JjW0NBUkVUVFJJTV0sICdnJylcbnZhciBjYXJldFRyaW1SZXBsYWNlID0gJyQxXidcblxudmFyIENBUkVUID0gUisrXG5zcmNbQ0FSRVRdID0gJ14nICsgc3JjW0xPTkVDQVJFVF0gKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnXG52YXIgQ0FSRVRMT09TRSA9IFIrK1xuc3JjW0NBUkVUTE9PU0VdID0gJ14nICsgc3JjW0xPTkVDQVJFVF0gKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCdcblxuLy8gQSBzaW1wbGUgZ3QvbHQvZXEgdGhpbmcsIG9yIGp1c3QgXCJcIiB0byBpbmRpY2F0ZSBcImFueSB2ZXJzaW9uXCJcbnZhciBDT01QQVJBVE9STE9PU0UgPSBSKytcbnNyY1tDT01QQVJBVE9STE9PU0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKignICsgTE9PU0VQTEFJTiArICcpJHxeJCdcbnZhciBDT01QQVJBVE9SID0gUisrXG5zcmNbQ09NUEFSQVRPUl0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqKCcgKyBGVUxMUExBSU4gKyAnKSR8XiQnXG5cbi8vIEFuIGV4cHJlc3Npb24gdG8gc3RyaXAgYW55IHdoaXRlc3BhY2UgYmV0d2VlbiB0aGUgZ3RsdCBhbmQgdGhlIHRoaW5nXG4vLyBpdCBtb2RpZmllcywgc28gdGhhdCBgPiAxLjIuM2AgPT0+IGA+MS4yLjNgXG52YXIgQ09NUEFSQVRPUlRSSU0gPSBSKytcbnNyY1tDT01QQVJBVE9SVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0dUTFRdICtcbiAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqKCcgKyBMT09TRVBMQUlOICsgJ3wnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJ1xuXG4vLyB0aGlzIG9uZSBoYXMgdG8gdXNlIHRoZSAvZyBmbGFnXG5yZVtDT01QQVJBVE9SVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1tDT01QQVJBVE9SVFJJTV0sICdnJylcbnZhciBjb21wYXJhdG9yVHJpbVJlcGxhY2UgPSAnJDEkMiQzJ1xuXG4vLyBTb21ldGhpbmcgbGlrZSBgMS4yLjMgLSAxLjIuNGBcbi8vIE5vdGUgdGhhdCB0aGVzZSBhbGwgdXNlIHRoZSBsb29zZSBmb3JtLCBiZWNhdXNlIHRoZXknbGwgYmVcbi8vIGNoZWNrZWQgYWdhaW5zdCBlaXRoZXIgdGhlIHN0cmljdCBvciBsb29zZSBjb21wYXJhdG9yIGZvcm1cbi8vIGxhdGVyLlxudmFyIEhZUEhFTlJBTkdFID0gUisrXG5zcmNbSFlQSEVOUkFOR0VdID0gJ15cXFxccyooJyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICdcXFxccystXFxcXHMrJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJ1xcXFxzKiQnXG5cbnZhciBIWVBIRU5SQU5HRUxPT1NFID0gUisrXG5zcmNbSFlQSEVOUkFOR0VMT09TRV0gPSAnXlxcXFxzKignICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXFxccystXFxcXHMrJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKiQnXG5cbi8vIFN0YXIgcmFuZ2VzIGJhc2ljYWxseSBqdXN0IGFsbG93IGFueXRoaW5nIGF0IGFsbC5cbnZhciBTVEFSID0gUisrXG5zcmNbU1RBUl0gPSAnKDx8Pik/PT9cXFxccypcXFxcKidcblxuLy8gQ29tcGlsZSB0byBhY3R1YWwgcmVnZXhwIG9iamVjdHMuXG4vLyBBbGwgYXJlIGZsYWctZnJlZSwgdW5sZXNzIHRoZXkgd2VyZSBjcmVhdGVkIGFib3ZlIHdpdGggYSBmbGFnLlxuZm9yICh2YXIgaSA9IDA7IGkgPCBSOyBpKyspIHtcbiAgZGVidWcoaSwgc3JjW2ldKVxuICBpZiAoIXJlW2ldKSB7XG4gICAgcmVbaV0gPSBuZXcgUmVnRXhwKHNyY1tpXSlcbiAgfVxufVxuXG5leHBvcnRzLnBhcnNlID0gcGFyc2VcbmZ1bmN0aW9uIHBhcnNlICh2ZXJzaW9uLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgcmV0dXJuIHZlcnNpb25cbiAgfVxuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgaWYgKHZlcnNpb24ubGVuZ3RoID4gTUFYX0xFTkdUSCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICB2YXIgciA9IG9wdGlvbnMubG9vc2UgPyByZVtMT09TRV0gOiByZVtGVUxMXVxuICBpZiAoIXIudGVzdCh2ZXJzaW9uKSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG5leHBvcnRzLnZhbGlkID0gdmFsaWRcbmZ1bmN0aW9uIHZhbGlkICh2ZXJzaW9uLCBvcHRpb25zKSB7XG4gIHZhciB2ID0gcGFyc2UodmVyc2lvbiwgb3B0aW9ucylcbiAgcmV0dXJuIHYgPyB2LnZlcnNpb24gOiBudWxsXG59XG5cbmV4cG9ydHMuY2xlYW4gPSBjbGVhblxuZnVuY3Rpb24gY2xlYW4gKHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgdmFyIHMgPSBwYXJzZSh2ZXJzaW9uLnRyaW0oKS5yZXBsYWNlKC9eWz12XSsvLCAnJyksIG9wdGlvbnMpXG4gIHJldHVybiBzID8gcy52ZXJzaW9uIDogbnVsbFxufVxuXG5leHBvcnRzLlNlbVZlciA9IFNlbVZlclxuXG5mdW5jdGlvbiBTZW1WZXIgKHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zIHx8IHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBsb29zZTogISFvcHRpb25zLFxuICAgICAgaW5jbHVkZVByZXJlbGVhc2U6IGZhbHNlXG4gICAgfVxuICB9XG4gIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgaWYgKHZlcnNpb24ubG9vc2UgPT09IG9wdGlvbnMubG9vc2UpIHtcbiAgICAgIHJldHVybiB2ZXJzaW9uXG4gICAgfSBlbHNlIHtcbiAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnZlcnNpb25cbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBWZXJzaW9uOiAnICsgdmVyc2lvbilcbiAgfVxuXG4gIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2ZXJzaW9uIGlzIGxvbmdlciB0aGFuICcgKyBNQVhfTEVOR1RIICsgJyBjaGFyYWN0ZXJzJylcbiAgfVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgb3B0aW9ucylcbiAgfVxuXG4gIGRlYnVnKCdTZW1WZXInLCB2ZXJzaW9uLCBvcHRpb25zKVxuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gIHRoaXMubG9vc2UgPSAhIW9wdGlvbnMubG9vc2VcblxuICB2YXIgbSA9IHZlcnNpb24udHJpbSgpLm1hdGNoKG9wdGlvbnMubG9vc2UgPyByZVtMT09TRV0gOiByZVtGVUxMXSlcblxuICBpZiAoIW0pIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFZlcnNpb246ICcgKyB2ZXJzaW9uKVxuICB9XG5cbiAgdGhpcy5yYXcgPSB2ZXJzaW9uXG5cbiAgLy8gdGhlc2UgYXJlIGFjdHVhbGx5IG51bWJlcnNcbiAgdGhpcy5tYWpvciA9ICttWzFdXG4gIHRoaXMubWlub3IgPSArbVsyXVxuICB0aGlzLnBhdGNoID0gK21bM11cblxuICBpZiAodGhpcy5tYWpvciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5tYWpvciA8IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1ham9yIHZlcnNpb24nKVxuICB9XG5cbiAgaWYgKHRoaXMubWlub3IgPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMubWlub3IgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBtaW5vciB2ZXJzaW9uJylcbiAgfVxuXG4gIGlmICh0aGlzLnBhdGNoID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLnBhdGNoIDwgMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgcGF0Y2ggdmVyc2lvbicpXG4gIH1cblxuICAvLyBudW1iZXJpZnkgYW55IHByZXJlbGVhc2UgbnVtZXJpYyBpZHNcbiAgaWYgKCFtWzRdKSB7XG4gICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgfSBlbHNlIHtcbiAgICB0aGlzLnByZXJlbGVhc2UgPSBtWzRdLnNwbGl0KCcuJykubWFwKGZ1bmN0aW9uIChpZCkge1xuICAgICAgaWYgKC9eWzAtOV0rJC8udGVzdChpZCkpIHtcbiAgICAgICAgdmFyIG51bSA9ICtpZFxuICAgICAgICBpZiAobnVtID49IDAgJiYgbnVtIDwgTUFYX1NBRkVfSU5URUdFUikge1xuICAgICAgICAgIHJldHVybiBudW1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGlkXG4gICAgfSlcbiAgfVxuXG4gIHRoaXMuYnVpbGQgPSBtWzVdID8gbVs1XS5zcGxpdCgnLicpIDogW11cbiAgdGhpcy5mb3JtYXQoKVxufVxuXG5TZW1WZXIucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy52ZXJzaW9uID0gdGhpcy5tYWpvciArICcuJyArIHRoaXMubWlub3IgKyAnLicgKyB0aGlzLnBhdGNoXG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgdGhpcy52ZXJzaW9uICs9ICctJyArIHRoaXMucHJlcmVsZWFzZS5qb2luKCcuJylcbiAgfVxuICByZXR1cm4gdGhpcy52ZXJzaW9uXG59XG5cblNlbVZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnZlcnNpb25cbn1cblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIGRlYnVnKCdTZW1WZXIuY29tcGFyZScsIHRoaXMudmVyc2lvbiwgdGhpcy5vcHRpb25zLCBvdGhlcilcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gdGhpcy5jb21wYXJlTWFpbihvdGhlcikgfHwgdGhpcy5jb21wYXJlUHJlKG90aGVyKVxufVxuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmVNYWluID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICB9XG5cbiAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLm1ham9yLCBvdGhlci5tYWpvcikgfHxcbiAgICAgICAgIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLm1pbm9yLCBvdGhlci5taW5vcikgfHxcbiAgICAgICAgIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLnBhdGNoLCBvdGhlci5wYXRjaClcbn1cblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlUHJlID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICB9XG5cbiAgLy8gTk9UIGhhdmluZyBhIHByZXJlbGVhc2UgaXMgPiBoYXZpbmcgb25lXG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgIHJldHVybiAtMVxuICB9IGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmIG90aGVyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgcmV0dXJuIDFcbiAgfSBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gMFxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIGRvIHtcbiAgICB2YXIgYSA9IHRoaXMucHJlcmVsZWFzZVtpXVxuICAgIHZhciBiID0gb3RoZXIucHJlcmVsZWFzZVtpXVxuICAgIGRlYnVnKCdwcmVyZWxlYXNlIGNvbXBhcmUnLCBpLCBhLCBiKVxuICAgIGlmIChhID09PSB1bmRlZmluZWQgJiYgYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH0gZWxzZSBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gMVxuICAgIH0gZWxzZSBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9IGVsc2UgaWYgKGEgPT09IGIpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnMoYSwgYilcbiAgICB9XG4gIH0gd2hpbGUgKCsraSlcbn1cblxuLy8gcHJlbWlub3Igd2lsbCBidW1wIHRoZSB2ZXJzaW9uIHVwIHRvIHRoZSBuZXh0IG1pbm9yIHJlbGVhc2UsIGFuZCBpbW1lZGlhdGVseVxuLy8gZG93biB0byBwcmUtcmVsZWFzZS4gcHJlbWFqb3IgYW5kIHByZXBhdGNoIHdvcmsgdGhlIHNhbWUgd2F5LlxuU2VtVmVyLnByb3RvdHlwZS5pbmMgPSBmdW5jdGlvbiAocmVsZWFzZSwgaWRlbnRpZmllcikge1xuICBzd2l0Y2ggKHJlbGVhc2UpIHtcbiAgICBjYXNlICdwcmVtYWpvcic6XG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMFxuICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgIHRoaXMubWlub3IgPSAwXG4gICAgICB0aGlzLm1ham9yKytcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdwcmVtaW5vcic6XG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMFxuICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgIHRoaXMubWlub3IrK1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3ByZXBhdGNoJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgYWxyZWFkeSBhIHByZXJlbGVhc2UsIGl0IHdpbGwgYnVtcCB0byB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgICAvLyBkcm9wIGFueSBwcmVyZWxlYXNlcyB0aGF0IG1pZ2h0IGFscmVhZHkgZXhpc3QsIHNpbmNlIHRoZXkgYXJlIG5vdFxuICAgICAgLy8gcmVsZXZhbnQgYXQgdGhpcyBwb2ludC5cbiAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICB0aGlzLmluYygncGF0Y2gnLCBpZGVudGlmaWVyKVxuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpXG4gICAgICBicmVha1xuICAgIC8vIElmIHRoZSBpbnB1dCBpcyBhIG5vbi1wcmVyZWxlYXNlIHZlcnNpb24sIHRoaXMgYWN0cyB0aGUgc2FtZSBhc1xuICAgIC8vIHByZXBhdGNoLlxuICAgIGNhc2UgJ3ByZXJlbGVhc2UnOlxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcilcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ21ham9yJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgYSBwcmUtbWFqb3IgdmVyc2lvbiwgYnVtcCB1cCB0byB0aGUgc2FtZSBtYWpvciB2ZXJzaW9uLlxuICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCBtYWpvci5cbiAgICAgIC8vIDEuMC4wLTUgYnVtcHMgdG8gMS4wLjBcbiAgICAgIC8vIDEuMS4wIGJ1bXBzIHRvIDIuMC4wXG4gICAgICBpZiAodGhpcy5taW5vciAhPT0gMCB8fFxuICAgICAgICAgIHRoaXMucGF0Y2ggIT09IDAgfHxcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMubWFqb3IrK1xuICAgICAgfVxuICAgICAgdGhpcy5taW5vciA9IDBcbiAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdtaW5vcic6XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1pbm9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWlub3IgdmVyc2lvbi5cbiAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWlub3IuXG4gICAgICAvLyAxLjIuMC01IGJ1bXBzIHRvIDEuMi4wXG4gICAgICAvLyAxLjIuMSBidW1wcyB0byAxLjMuMFxuICAgICAgaWYgKHRoaXMucGF0Y2ggIT09IDAgfHwgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLm1pbm9yKytcbiAgICAgIH1cbiAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdwYXRjaCc6XG4gICAgICAvLyBJZiB0aGlzIGlzIG5vdCBhIHByZS1yZWxlYXNlIHZlcnNpb24sIGl0IHdpbGwgaW5jcmVtZW50IHRoZSBwYXRjaC5cbiAgICAgIC8vIElmIGl0IGlzIGEgcHJlLXJlbGVhc2UgaXQgd2lsbCBidW1wIHVwIHRvIHRoZSBzYW1lIHBhdGNoIHZlcnNpb24uXG4gICAgICAvLyAxLjIuMC01IHBhdGNoZXMgdG8gMS4yLjBcbiAgICAgIC8vIDEuMi4wIHBhdGNoZXMgdG8gMS4yLjFcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMucGF0Y2grK1xuICAgICAgfVxuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgIGJyZWFrXG4gICAgLy8gVGhpcyBwcm9iYWJseSBzaG91bGRuJ3QgYmUgdXNlZCBwdWJsaWNseS5cbiAgICAvLyAxLjAuMCBcInByZVwiIHdvdWxkIGJlY29tZSAxLjAuMC0wIHdoaWNoIGlzIHRoZSB3cm9uZyBkaXJlY3Rpb24uXG4gICAgY2FzZSAncHJlJzpcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFswXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLnByZXJlbGVhc2UubGVuZ3RoXG4gICAgICAgIHdoaWxlICgtLWkgPj0gMCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcmVyZWxlYXNlW2ldID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlW2ldKytcbiAgICAgICAgICAgIGkgPSAtMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gLTEpIHtcbiAgICAgICAgICAvLyBkaWRuJ3QgaW5jcmVtZW50IGFueXRoaW5nXG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLnB1c2goMClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlkZW50aWZpZXIpIHtcbiAgICAgICAgLy8gMS4yLjAtYmV0YS4xIGJ1bXBzIHRvIDEuMi4wLWJldGEuMixcbiAgICAgICAgLy8gMS4yLjAtYmV0YS5mb29ibHogb3IgMS4yLjAtYmV0YSBidW1wcyB0byAxLjIuMC1iZXRhLjBcbiAgICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZVswXSA9PT0gaWRlbnRpZmllcikge1xuICAgICAgICAgIGlmIChpc05hTih0aGlzLnByZXJlbGVhc2VbMV0pKSB7XG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbaWRlbnRpZmllciwgMF1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW2lkZW50aWZpZXIsIDBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrXG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluY3JlbWVudCBhcmd1bWVudDogJyArIHJlbGVhc2UpXG4gIH1cbiAgdGhpcy5mb3JtYXQoKVxuICB0aGlzLnJhdyA9IHRoaXMudmVyc2lvblxuICByZXR1cm4gdGhpc1xufVxuXG5leHBvcnRzLmluYyA9IGluY1xuZnVuY3Rpb24gaW5jICh2ZXJzaW9uLCByZWxlYXNlLCBsb29zZSwgaWRlbnRpZmllcikge1xuICBpZiAodHlwZW9mIChsb29zZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgaWRlbnRpZmllciA9IGxvb3NlXG4gICAgbG9vc2UgPSB1bmRlZmluZWRcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpLmluYyhyZWxlYXNlLCBpZGVudGlmaWVyKS52ZXJzaW9uXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG5leHBvcnRzLmRpZmYgPSBkaWZmXG5mdW5jdGlvbiBkaWZmICh2ZXJzaW9uMSwgdmVyc2lvbjIpIHtcbiAgaWYgKGVxKHZlcnNpb24xLCB2ZXJzaW9uMikpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9IGVsc2Uge1xuICAgIHZhciB2MSA9IHBhcnNlKHZlcnNpb24xKVxuICAgIHZhciB2MiA9IHBhcnNlKHZlcnNpb24yKVxuICAgIHZhciBwcmVmaXggPSAnJ1xuICAgIGlmICh2MS5wcmVyZWxlYXNlLmxlbmd0aCB8fCB2Mi5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgICAgcHJlZml4ID0gJ3ByZSdcbiAgICAgIHZhciBkZWZhdWx0UmVzdWx0ID0gJ3ByZXJlbGVhc2UnXG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiB2MSkge1xuICAgICAgaWYgKGtleSA9PT0gJ21ham9yJyB8fCBrZXkgPT09ICdtaW5vcicgfHwga2V5ID09PSAncGF0Y2gnKSB7XG4gICAgICAgIGlmICh2MVtrZXldICE9PSB2MltrZXldKSB7XG4gICAgICAgICAgcmV0dXJuIHByZWZpeCArIGtleVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0UmVzdWx0IC8vIG1heSBiZSB1bmRlZmluZWRcbiAgfVxufVxuXG5leHBvcnRzLmNvbXBhcmVJZGVudGlmaWVycyA9IGNvbXBhcmVJZGVudGlmaWVyc1xuXG52YXIgbnVtZXJpYyA9IC9eWzAtOV0rJC9cbmZ1bmN0aW9uIGNvbXBhcmVJZGVudGlmaWVycyAoYSwgYikge1xuICB2YXIgYW51bSA9IG51bWVyaWMudGVzdChhKVxuICB2YXIgYm51bSA9IG51bWVyaWMudGVzdChiKVxuXG4gIGlmIChhbnVtICYmIGJudW0pIHtcbiAgICBhID0gK2FcbiAgICBiID0gK2JcbiAgfVxuXG4gIHJldHVybiBhID09PSBiID8gMFxuICAgIDogKGFudW0gJiYgIWJudW0pID8gLTFcbiAgICA6IChibnVtICYmICFhbnVtKSA/IDFcbiAgICA6IGEgPCBiID8gLTFcbiAgICA6IDFcbn1cblxuZXhwb3J0cy5yY29tcGFyZUlkZW50aWZpZXJzID0gcmNvbXBhcmVJZGVudGlmaWVyc1xuZnVuY3Rpb24gcmNvbXBhcmVJZGVudGlmaWVycyAoYSwgYikge1xuICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGIsIGEpXG59XG5cbmV4cG9ydHMubWFqb3IgPSBtYWpvclxuZnVuY3Rpb24gbWFqb3IgKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5tYWpvclxufVxuXG5leHBvcnRzLm1pbm9yID0gbWlub3JcbmZ1bmN0aW9uIG1pbm9yIChhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkubWlub3Jcbn1cblxuZXhwb3J0cy5wYXRjaCA9IHBhdGNoXG5mdW5jdGlvbiBwYXRjaCAoYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLnBhdGNoXG59XG5cbmV4cG9ydHMuY29tcGFyZSA9IGNvbXBhcmVcbmZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5jb21wYXJlKG5ldyBTZW1WZXIoYiwgbG9vc2UpKVxufVxuXG5leHBvcnRzLmNvbXBhcmVMb29zZSA9IGNvbXBhcmVMb29zZVxuZnVuY3Rpb24gY29tcGFyZUxvb3NlIChhLCBiKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIHRydWUpXG59XG5cbmV4cG9ydHMucmNvbXBhcmUgPSByY29tcGFyZVxuZnVuY3Rpb24gcmNvbXBhcmUgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGIsIGEsIGxvb3NlKVxufVxuXG5leHBvcnRzLnNvcnQgPSBzb3J0XG5mdW5jdGlvbiBzb3J0IChsaXN0LCBsb29zZSkge1xuICByZXR1cm4gbGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuY29tcGFyZShhLCBiLCBsb29zZSlcbiAgfSlcbn1cblxuZXhwb3J0cy5yc29ydCA9IHJzb3J0XG5mdW5jdGlvbiByc29ydCAobGlzdCwgbG9vc2UpIHtcbiAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBleHBvcnRzLnJjb21wYXJlKGEsIGIsIGxvb3NlKVxuICB9KVxufVxuXG5leHBvcnRzLmd0ID0gZ3RcbmZ1bmN0aW9uIGd0IChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPiAwXG59XG5cbmV4cG9ydHMubHQgPSBsdFxuZnVuY3Rpb24gbHQgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8IDBcbn1cblxuZXhwb3J0cy5lcSA9IGVxXG5mdW5jdGlvbiBlcSAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID09PSAwXG59XG5cbmV4cG9ydHMubmVxID0gbmVxXG5mdW5jdGlvbiBuZXEgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSAhPT0gMFxufVxuXG5leHBvcnRzLmd0ZSA9IGd0ZVxuZnVuY3Rpb24gZ3RlIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPj0gMFxufVxuXG5leHBvcnRzLmx0ZSA9IGx0ZVxuZnVuY3Rpb24gbHRlIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPD0gMFxufVxuXG5leHBvcnRzLmNtcCA9IGNtcFxuZnVuY3Rpb24gY21wIChhLCBvcCwgYiwgbG9vc2UpIHtcbiAgc3dpdGNoIChvcCkge1xuICAgIGNhc2UgJz09PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKVxuICAgICAgICBhID0gYS52ZXJzaW9uXG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKVxuICAgICAgICBiID0gYi52ZXJzaW9uXG4gICAgICByZXR1cm4gYSA9PT0gYlxuXG4gICAgY2FzZSAnIT09JzpcbiAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpXG4gICAgICAgIGEgPSBhLnZlcnNpb25cbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpXG4gICAgICAgIGIgPSBiLnZlcnNpb25cbiAgICAgIHJldHVybiBhICE9PSBiXG5cbiAgICBjYXNlICcnOlxuICAgIGNhc2UgJz0nOlxuICAgIGNhc2UgJz09JzpcbiAgICAgIHJldHVybiBlcShhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJyE9JzpcbiAgICAgIHJldHVybiBuZXEoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc+JzpcbiAgICAgIHJldHVybiBndChhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJz49JzpcbiAgICAgIHJldHVybiBndGUoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc8JzpcbiAgICAgIHJldHVybiBsdChhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJzw9JzpcbiAgICAgIHJldHVybiBsdGUoYSwgYiwgbG9vc2UpXG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBvcGVyYXRvcjogJyArIG9wKVxuICB9XG59XG5cbmV4cG9ydHMuQ29tcGFyYXRvciA9IENvbXBhcmF0b3JcbmZ1bmN0aW9uIENvbXBhcmF0b3IgKGNvbXAsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zIHx8IHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBsb29zZTogISFvcHRpb25zLFxuICAgICAgaW5jbHVkZVByZXJlbGVhc2U6IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaWYgKGNvbXAgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSB7XG4gICAgaWYgKGNvbXAubG9vc2UgPT09ICEhb3B0aW9ucy5sb29zZSkge1xuICAgICAgcmV0dXJuIGNvbXBcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcCA9IGNvbXAudmFsdWVcbiAgICB9XG4gIH1cblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29tcGFyYXRvcikpIHtcbiAgICByZXR1cm4gbmV3IENvbXBhcmF0b3IoY29tcCwgb3B0aW9ucylcbiAgfVxuXG4gIGRlYnVnKCdjb21wYXJhdG9yJywgY29tcCwgb3B0aW9ucylcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG4gIHRoaXMucGFyc2UoY29tcClcblxuICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSkge1xuICAgIHRoaXMudmFsdWUgPSAnJ1xuICB9IGVsc2Uge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLm9wZXJhdG9yICsgdGhpcy5zZW12ZXIudmVyc2lvblxuICB9XG5cbiAgZGVidWcoJ2NvbXAnLCB0aGlzKVxufVxuXG52YXIgQU5ZID0ge31cbkNvbXBhcmF0b3IucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKGNvbXApIHtcbiAgdmFyIHIgPSB0aGlzLm9wdGlvbnMubG9vc2UgPyByZVtDT01QQVJBVE9STE9PU0VdIDogcmVbQ09NUEFSQVRPUl1cbiAgdmFyIG0gPSBjb21wLm1hdGNoKHIpXG5cbiAgaWYgKCFtKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjb21wYXJhdG9yOiAnICsgY29tcClcbiAgfVxuXG4gIHRoaXMub3BlcmF0b3IgPSBtWzFdXG4gIGlmICh0aGlzLm9wZXJhdG9yID09PSAnPScpIHtcbiAgICB0aGlzLm9wZXJhdG9yID0gJydcbiAgfVxuXG4gIC8vIGlmIGl0IGxpdGVyYWxseSBpcyBqdXN0ICc+JyBvciAnJyB0aGVuIGFsbG93IGFueXRoaW5nLlxuICBpZiAoIW1bMl0pIHtcbiAgICB0aGlzLnNlbXZlciA9IEFOWVxuICB9IGVsc2Uge1xuICAgIHRoaXMuc2VtdmVyID0gbmV3IFNlbVZlcihtWzJdLCB0aGlzLm9wdGlvbnMubG9vc2UpXG4gIH1cbn1cblxuQ29tcGFyYXRvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnZhbHVlXG59XG5cbkNvbXBhcmF0b3IucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbiAodmVyc2lvbikge1xuICBkZWJ1ZygnQ29tcGFyYXRvci50ZXN0JywgdmVyc2lvbiwgdGhpcy5vcHRpb25zLmxvb3NlKVxuXG4gIGlmICh0aGlzLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLm9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gY21wKHZlcnNpb24sIHRoaXMub3BlcmF0b3IsIHRoaXMuc2VtdmVyLCB0aGlzLm9wdGlvbnMpXG59XG5cbkNvbXBhcmF0b3IucHJvdG90eXBlLmludGVyc2VjdHMgPSBmdW5jdGlvbiAoY29tcCwgb3B0aW9ucykge1xuICBpZiAoIShjb21wIGluc3RhbmNlb2YgQ29tcGFyYXRvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhIENvbXBhcmF0b3IgaXMgcmVxdWlyZWQnKVxuICB9XG5cbiAgaWYgKCFvcHRpb25zIHx8IHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBsb29zZTogISFvcHRpb25zLFxuICAgICAgaW5jbHVkZVByZXJlbGVhc2U6IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgdmFyIHJhbmdlVG1wXG5cbiAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICcnKSB7XG4gICAgcmFuZ2VUbXAgPSBuZXcgUmFuZ2UoY29tcC52YWx1ZSwgb3B0aW9ucylcbiAgICByZXR1cm4gc2F0aXNmaWVzKHRoaXMudmFsdWUsIHJhbmdlVG1wLCBvcHRpb25zKVxuICB9IGVsc2UgaWYgKGNvbXAub3BlcmF0b3IgPT09ICcnKSB7XG4gICAgcmFuZ2VUbXAgPSBuZXcgUmFuZ2UodGhpcy52YWx1ZSwgb3B0aW9ucylcbiAgICByZXR1cm4gc2F0aXNmaWVzKGNvbXAuc2VtdmVyLCByYW5nZVRtcCwgb3B0aW9ucylcbiAgfVxuXG4gIHZhciBzYW1lRGlyZWN0aW9uSW5jcmVhc2luZyA9XG4gICAgKHRoaXMub3BlcmF0b3IgPT09ICc+PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJz4nKSAmJlxuICAgIChjb21wLm9wZXJhdG9yID09PSAnPj0nIHx8IGNvbXAub3BlcmF0b3IgPT09ICc+JylcbiAgdmFyIHNhbWVEaXJlY3Rpb25EZWNyZWFzaW5nID1cbiAgICAodGhpcy5vcGVyYXRvciA9PT0gJzw9JyB8fCB0aGlzLm9wZXJhdG9yID09PSAnPCcpICYmXG4gICAgKGNvbXAub3BlcmF0b3IgPT09ICc8PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJzwnKVxuICB2YXIgc2FtZVNlbVZlciA9IHRoaXMuc2VtdmVyLnZlcnNpb24gPT09IGNvbXAuc2VtdmVyLnZlcnNpb25cbiAgdmFyIGRpZmZlcmVudERpcmVjdGlvbnNJbmNsdXNpdmUgPVxuICAgICh0aGlzLm9wZXJhdG9yID09PSAnPj0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc8PScpICYmXG4gICAgKGNvbXAub3BlcmF0b3IgPT09ICc+PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJzw9JylcbiAgdmFyIG9wcG9zaXRlRGlyZWN0aW9uc0xlc3NUaGFuID1cbiAgICBjbXAodGhpcy5zZW12ZXIsICc8JywgY29tcC5zZW12ZXIsIG9wdGlvbnMpICYmXG4gICAgKCh0aGlzLm9wZXJhdG9yID09PSAnPj0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc+JykgJiZcbiAgICAoY29tcC5vcGVyYXRvciA9PT0gJzw9JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPCcpKVxuICB2YXIgb3Bwb3NpdGVEaXJlY3Rpb25zR3JlYXRlclRoYW4gPVxuICAgIGNtcCh0aGlzLnNlbXZlciwgJz4nLCBjb21wLnNlbXZlciwgb3B0aW9ucykgJiZcbiAgICAoKHRoaXMub3BlcmF0b3IgPT09ICc8PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJzwnKSAmJlxuICAgIChjb21wLm9wZXJhdG9yID09PSAnPj0nIHx8IGNvbXAub3BlcmF0b3IgPT09ICc+JykpXG5cbiAgcmV0dXJuIHNhbWVEaXJlY3Rpb25JbmNyZWFzaW5nIHx8IHNhbWVEaXJlY3Rpb25EZWNyZWFzaW5nIHx8XG4gICAgKHNhbWVTZW1WZXIgJiYgZGlmZmVyZW50RGlyZWN0aW9uc0luY2x1c2l2ZSkgfHxcbiAgICBvcHBvc2l0ZURpcmVjdGlvbnNMZXNzVGhhbiB8fCBvcHBvc2l0ZURpcmVjdGlvbnNHcmVhdGVyVGhhblxufVxuXG5leHBvcnRzLlJhbmdlID0gUmFuZ2VcbmZ1bmN0aW9uIFJhbmdlIChyYW5nZSwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGxvb3NlOiAhIW9wdGlvbnMsXG4gICAgICBpbmNsdWRlUHJlcmVsZWFzZTogZmFsc2VcbiAgICB9XG4gIH1cblxuICBpZiAocmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkge1xuICAgIGlmIChyYW5nZS5sb29zZSA9PT0gISFvcHRpb25zLmxvb3NlICYmXG4gICAgICAgIHJhbmdlLmluY2x1ZGVQcmVyZWxlYXNlID09PSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpIHtcbiAgICAgIHJldHVybiByYW5nZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLnJhdywgb3B0aW9ucylcbiAgICB9XG4gIH1cblxuICBpZiAocmFuZ2UgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZS52YWx1ZSwgb3B0aW9ucylcbiAgfVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSYW5nZSkpIHtcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuICB9XG5cbiAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG4gIHRoaXMuaW5jbHVkZVByZXJlbGVhc2UgPSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2VcblxuICAvLyBGaXJzdCwgc3BsaXQgYmFzZWQgb24gYm9vbGVhbiBvciB8fFxuICB0aGlzLnJhdyA9IHJhbmdlXG4gIHRoaXMuc2V0ID0gcmFuZ2Uuc3BsaXQoL1xccypcXHxcXHxcXHMqLykubWFwKGZ1bmN0aW9uIChyYW5nZSkge1xuICAgIHJldHVybiB0aGlzLnBhcnNlUmFuZ2UocmFuZ2UudHJpbSgpKVxuICB9LCB0aGlzKS5maWx0ZXIoZnVuY3Rpb24gKGMpIHtcbiAgICAvLyB0aHJvdyBvdXQgYW55IHRoYXQgYXJlIG5vdCByZWxldmFudCBmb3Igd2hhdGV2ZXIgcmVhc29uXG4gICAgcmV0dXJuIGMubGVuZ3RoXG4gIH0pXG5cbiAgaWYgKCF0aGlzLnNldC5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFNlbVZlciBSYW5nZTogJyArIHJhbmdlKVxuICB9XG5cbiAgdGhpcy5mb3JtYXQoKVxufVxuXG5SYW5nZS5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJhbmdlID0gdGhpcy5zZXQubWFwKGZ1bmN0aW9uIChjb21wcykge1xuICAgIHJldHVybiBjb21wcy5qb2luKCcgJykudHJpbSgpXG4gIH0pLmpvaW4oJ3x8JykudHJpbSgpXG4gIHJldHVybiB0aGlzLnJhbmdlXG59XG5cblJhbmdlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMucmFuZ2Vcbn1cblxuUmFuZ2UucHJvdG90eXBlLnBhcnNlUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgdmFyIGxvb3NlID0gdGhpcy5vcHRpb25zLmxvb3NlXG4gIHJhbmdlID0gcmFuZ2UudHJpbSgpXG4gIC8vIGAxLjIuMyAtIDEuMi40YCA9PiBgPj0xLjIuMyA8PTEuMi40YFxuICB2YXIgaHIgPSBsb29zZSA/IHJlW0hZUEhFTlJBTkdFTE9PU0VdIDogcmVbSFlQSEVOUkFOR0VdXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShociwgaHlwaGVuUmVwbGFjZSlcbiAgZGVidWcoJ2h5cGhlbiByZXBsYWNlJywgcmFuZ2UpXG4gIC8vIGA+IDEuMi4zIDwgMS4yLjVgID0+IGA+MS4yLjMgPDEuMi41YFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbQ09NUEFSQVRPUlRSSU1dLCBjb21wYXJhdG9yVHJpbVJlcGxhY2UpXG4gIGRlYnVnKCdjb21wYXJhdG9yIHRyaW0nLCByYW5nZSwgcmVbQ09NUEFSQVRPUlRSSU1dKVxuXG4gIC8vIGB+IDEuMi4zYCA9PiBgfjEuMi4zYFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbVElMREVUUklNXSwgdGlsZGVUcmltUmVwbGFjZSlcblxuICAvLyBgXiAxLjIuM2AgPT4gYF4xLjIuM2BcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW0NBUkVUVFJJTV0sIGNhcmV0VHJpbVJlcGxhY2UpXG5cbiAgLy8gbm9ybWFsaXplIHNwYWNlc1xuICByYW5nZSA9IHJhbmdlLnNwbGl0KC9cXHMrLykuam9pbignICcpXG5cbiAgLy8gQXQgdGhpcyBwb2ludCwgdGhlIHJhbmdlIGlzIGNvbXBsZXRlbHkgdHJpbW1lZCBhbmRcbiAgLy8gcmVhZHkgdG8gYmUgc3BsaXQgaW50byBjb21wYXJhdG9ycy5cblxuICB2YXIgY29tcFJlID0gbG9vc2UgPyByZVtDT01QQVJBVE9STE9PU0VdIDogcmVbQ09NUEFSQVRPUl1cbiAgdmFyIHNldCA9IHJhbmdlLnNwbGl0KCcgJykubWFwKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgcmV0dXJuIHBhcnNlQ29tcGFyYXRvcihjb21wLCB0aGlzLm9wdGlvbnMpXG4gIH0sIHRoaXMpLmpvaW4oJyAnKS5zcGxpdCgvXFxzKy8pXG4gIGlmICh0aGlzLm9wdGlvbnMubG9vc2UpIHtcbiAgICAvLyBpbiBsb29zZSBtb2RlLCB0aHJvdyBvdXQgYW55IHRoYXQgYXJlIG5vdCB2YWxpZCBjb21wYXJhdG9yc1xuICAgIHNldCA9IHNldC5maWx0ZXIoZnVuY3Rpb24gKGNvbXApIHtcbiAgICAgIHJldHVybiAhIWNvbXAubWF0Y2goY29tcFJlKVxuICAgIH0pXG4gIH1cbiAgc2V0ID0gc2V0Lm1hcChmdW5jdGlvbiAoY29tcCkge1xuICAgIHJldHVybiBuZXcgQ29tcGFyYXRvcihjb21wLCB0aGlzLm9wdGlvbnMpXG4gIH0sIHRoaXMpXG5cbiAgcmV0dXJuIHNldFxufVxuXG5SYW5nZS5wcm90b3R5cGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uIChyYW5nZSwgb3B0aW9ucykge1xuICBpZiAoIShyYW5nZSBpbnN0YW5jZW9mIFJhbmdlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2EgUmFuZ2UgaXMgcmVxdWlyZWQnKVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuc2V0LnNvbWUoZnVuY3Rpb24gKHRoaXNDb21wYXJhdG9ycykge1xuICAgIHJldHVybiB0aGlzQ29tcGFyYXRvcnMuZXZlcnkoZnVuY3Rpb24gKHRoaXNDb21wYXJhdG9yKSB7XG4gICAgICByZXR1cm4gcmFuZ2Uuc2V0LnNvbWUoZnVuY3Rpb24gKHJhbmdlQ29tcGFyYXRvcnMpIHtcbiAgICAgICAgcmV0dXJuIHJhbmdlQ29tcGFyYXRvcnMuZXZlcnkoZnVuY3Rpb24gKHJhbmdlQ29tcGFyYXRvcikge1xuICAgICAgICAgIHJldHVybiB0aGlzQ29tcGFyYXRvci5pbnRlcnNlY3RzKHJhbmdlQ29tcGFyYXRvciwgb3B0aW9ucylcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuLy8gTW9zdGx5IGp1c3QgZm9yIHRlc3RpbmcgYW5kIGxlZ2FjeSBBUEkgcmVhc29uc1xuZXhwb3J0cy50b0NvbXBhcmF0b3JzID0gdG9Db21wYXJhdG9yc1xuZnVuY3Rpb24gdG9Db21wYXJhdG9ycyAocmFuZ2UsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucykuc2V0Lm1hcChmdW5jdGlvbiAoY29tcCkge1xuICAgIHJldHVybiBjb21wLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgcmV0dXJuIGMudmFsdWVcbiAgICB9KS5qb2luKCcgJykudHJpbSgpLnNwbGl0KCcgJylcbiAgfSlcbn1cblxuLy8gY29tcHJpc2VkIG9mIHhyYW5nZXMsIHRpbGRlcywgc3RhcnMsIGFuZCBndGx0J3MgYXQgdGhpcyBwb2ludC5cbi8vIGFscmVhZHkgcmVwbGFjZWQgdGhlIGh5cGhlbiByYW5nZXNcbi8vIHR1cm4gaW50byBhIHNldCBvZiBKVVNUIGNvbXBhcmF0b3JzLlxuZnVuY3Rpb24gcGFyc2VDb21wYXJhdG9yIChjb21wLCBvcHRpb25zKSB7XG4gIGRlYnVnKCdjb21wJywgY29tcCwgb3B0aW9ucylcbiAgY29tcCA9IHJlcGxhY2VDYXJldHMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ2NhcmV0JywgY29tcClcbiAgY29tcCA9IHJlcGxhY2VUaWxkZXMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ3RpbGRlcycsIGNvbXApXG4gIGNvbXAgPSByZXBsYWNlWFJhbmdlcyhjb21wLCBvcHRpb25zKVxuICBkZWJ1ZygneHJhbmdlJywgY29tcClcbiAgY29tcCA9IHJlcGxhY2VTdGFycyhjb21wLCBvcHRpb25zKVxuICBkZWJ1Zygnc3RhcnMnLCBjb21wKVxuICByZXR1cm4gY29tcFxufVxuXG5mdW5jdGlvbiBpc1ggKGlkKSB7XG4gIHJldHVybiAhaWQgfHwgaWQudG9Mb3dlckNhc2UoKSA9PT0gJ3gnIHx8IGlkID09PSAnKidcbn1cblxuLy8gfiwgfj4gLS0+ICogKGFueSwga2luZGEgc2lsbHkpXG4vLyB+MiwgfjIueCwgfjIueC54LCB+PjIsIH4+Mi54IH4+Mi54LnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyB+Mi4wLCB+Mi4wLngsIH4+Mi4wLCB+PjIuMC54IC0tPiA+PTIuMC4wIDwyLjEuMFxuLy8gfjEuMiwgfjEuMi54LCB+PjEuMiwgfj4xLjIueCAtLT4gPj0xLjIuMCA8MS4zLjBcbi8vIH4xLjIuMywgfj4xLjIuMyAtLT4gPj0xLjIuMyA8MS4zLjBcbi8vIH4xLjIuMCwgfj4xLjIuMCAtLT4gPj0xLjIuMCA8MS4zLjBcbmZ1bmN0aW9uIHJlcGxhY2VUaWxkZXMgKGNvbXAsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VUaWxkZShjb21wLCBvcHRpb25zKVxuICB9KS5qb2luKCcgJylcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVRpbGRlIChjb21wLCBvcHRpb25zKSB7XG4gIHZhciByID0gb3B0aW9ucy5sb29zZSA/IHJlW1RJTERFTE9PU0VdIDogcmVbVElMREVdXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24gKF8sIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ3RpbGRlJywgY29tcCwgXywgTSwgbSwgcCwgcHIpXG4gICAgdmFyIHJldFxuXG4gICAgaWYgKGlzWChNKSkge1xuICAgICAgcmV0ID0gJydcbiAgICB9IGVsc2UgaWYgKGlzWChtKSkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnXG4gICAgfSBlbHNlIGlmIChpc1gocCkpIHtcbiAgICAgIC8vIH4xLjIgPT0gPj0xLjIuMCA8MS4zLjBcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCdcbiAgICB9IGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZVRpbGRlIHByJywgcHIpXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgJy0nICsgcHIgK1xuICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCdcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gfjEuMi4zID09ID49MS4yLjMgPDEuMy4wXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnXG4gICAgfVxuXG4gICAgZGVidWcoJ3RpbGRlIHJldHVybicsIHJldClcbiAgICByZXR1cm4gcmV0XG4gIH0pXG59XG5cbi8vIF4gLS0+ICogKGFueSwga2luZGEgc2lsbHkpXG4vLyBeMiwgXjIueCwgXjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gXjIuMCwgXjIuMC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gXjEuMiwgXjEuMi54IC0tPiA+PTEuMi4wIDwyLjAuMFxuLy8gXjEuMi4zIC0tPiA+PTEuMi4zIDwyLjAuMFxuLy8gXjEuMi4wIC0tPiA+PTEuMi4wIDwyLjAuMFxuZnVuY3Rpb24gcmVwbGFjZUNhcmV0cyAoY29tcCwgb3B0aW9ucykge1xuICByZXR1cm4gY29tcC50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZUNhcmV0KGNvbXAsIG9wdGlvbnMpXG4gIH0pLmpvaW4oJyAnKVxufVxuXG5mdW5jdGlvbiByZXBsYWNlQ2FyZXQgKGNvbXAsIG9wdGlvbnMpIHtcbiAgZGVidWcoJ2NhcmV0JywgY29tcCwgb3B0aW9ucylcbiAgdmFyIHIgPSBvcHRpb25zLmxvb3NlID8gcmVbQ0FSRVRMT09TRV0gOiByZVtDQVJFVF1cbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbiAoXywgTSwgbSwgcCwgcHIpIHtcbiAgICBkZWJ1ZygnY2FyZXQnLCBjb21wLCBfLCBNLCBtLCBwLCBwcilcbiAgICB2YXIgcmV0XG5cbiAgICBpZiAoaXNYKE0pKSB7XG4gICAgICByZXQgPSAnJ1xuICAgIH0gZWxzZSBpZiAoaXNYKG0pKSB7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCdcbiAgICB9IGVsc2UgaWYgKGlzWChwKSkge1xuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJ1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocHIpIHtcbiAgICAgIGRlYnVnKCdyZXBsYWNlQ2FyZXQgcHInLCBwcilcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgaWYgKG0gPT09ICcwJykge1xuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyAnLScgKyBwciArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyBtICsgJy4nICsgKCtwICsgMSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgJy0nICsgcHIgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyAnLScgKyBwciArXG4gICAgICAgICAgICAgICcgPCcgKyAoK00gKyAxKSArICcuMC4wJ1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Zygnbm8gcHInKVxuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKSB7XG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyBtICsgJy4nICsgKCtwICsgMSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJ1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICAgJyA8JyArICgrTSArIDEpICsgJy4wLjAnXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVidWcoJ2NhcmV0IHJldHVybicsIHJldClcbiAgICByZXR1cm4gcmV0XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VYUmFuZ2VzIChjb21wLCBvcHRpb25zKSB7XG4gIGRlYnVnKCdyZXBsYWNlWFJhbmdlcycsIGNvbXAsIG9wdGlvbnMpXG4gIHJldHVybiBjb21wLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VYUmFuZ2UoY29tcCwgb3B0aW9ucylcbiAgfSkuam9pbignICcpXG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VYUmFuZ2UgKGNvbXAsIG9wdGlvbnMpIHtcbiAgY29tcCA9IGNvbXAudHJpbSgpXG4gIHZhciByID0gb3B0aW9ucy5sb29zZSA/IHJlW1hSQU5HRUxPT1NFXSA6IHJlW1hSQU5HRV1cbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbiAocmV0LCBndGx0LCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCd4UmFuZ2UnLCBjb21wLCByZXQsIGd0bHQsIE0sIG0sIHAsIHByKVxuICAgIHZhciB4TSA9IGlzWChNKVxuICAgIHZhciB4bSA9IHhNIHx8IGlzWChtKVxuICAgIHZhciB4cCA9IHhtIHx8IGlzWChwKVxuICAgIHZhciBhbnlYID0geHBcblxuICAgIGlmIChndGx0ID09PSAnPScgJiYgYW55WCkge1xuICAgICAgZ3RsdCA9ICcnXG4gICAgfVxuXG4gICAgaWYgKHhNKSB7XG4gICAgICBpZiAoZ3RsdCA9PT0gJz4nIHx8IGd0bHQgPT09ICc8Jykge1xuICAgICAgICAvLyBub3RoaW5nIGlzIGFsbG93ZWRcbiAgICAgICAgcmV0ID0gJzwwLjAuMCdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgZm9yYmlkZGVuXG4gICAgICAgIHJldCA9ICcqJ1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ3RsdCAmJiBhbnlYKSB7XG4gICAgICAvLyB3ZSBrbm93IHBhdGNoIGlzIGFuIHgsIGJlY2F1c2Ugd2UgaGF2ZSBhbnkgeCBhdCBhbGwuXG4gICAgICAvLyByZXBsYWNlIFggd2l0aCAwXG4gICAgICBpZiAoeG0pIHtcbiAgICAgICAgbSA9IDBcbiAgICAgIH1cbiAgICAgIHAgPSAwXG5cbiAgICAgIGlmIChndGx0ID09PSAnPicpIHtcbiAgICAgICAgLy8gPjEgPT4gPj0yLjAuMFxuICAgICAgICAvLyA+MS4yID0+ID49MS4zLjBcbiAgICAgICAgLy8gPjEuMi4zID0+ID49IDEuMi40XG4gICAgICAgIGd0bHQgPSAnPj0nXG4gICAgICAgIGlmICh4bSkge1xuICAgICAgICAgIE0gPSArTSArIDFcbiAgICAgICAgICBtID0gMFxuICAgICAgICAgIHAgPSAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbSA9ICttICsgMVxuICAgICAgICAgIHAgPSAwXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZ3RsdCA9PT0gJzw9Jykge1xuICAgICAgICAvLyA8PTAuNy54IGlzIGFjdHVhbGx5IDwwLjguMCwgc2luY2UgYW55IDAuNy54IHNob3VsZFxuICAgICAgICAvLyBwYXNzLiAgU2ltaWxhcmx5LCA8PTcueCBpcyBhY3R1YWxseSA8OC4wLjAsIGV0Yy5cbiAgICAgICAgZ3RsdCA9ICc8J1xuICAgICAgICBpZiAoeG0pIHtcbiAgICAgICAgICBNID0gK00gKyAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbSA9ICttICsgMVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IGd0bHQgKyBNICsgJy4nICsgbSArICcuJyArIHBcbiAgICB9IGVsc2UgaWYgKHhtKSB7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCdcbiAgICB9IGVsc2UgaWYgKHhwKSB7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnXG4gICAgfVxuXG4gICAgZGVidWcoJ3hSYW5nZSByZXR1cm4nLCByZXQpXG5cbiAgICByZXR1cm4gcmV0XG4gIH0pXG59XG5cbi8vIEJlY2F1c2UgKiBpcyBBTkQtZWQgd2l0aCBldmVyeXRoaW5nIGVsc2UgaW4gdGhlIGNvbXBhcmF0b3IsXG4vLyBhbmQgJycgbWVhbnMgXCJhbnkgdmVyc2lvblwiLCBqdXN0IHJlbW92ZSB0aGUgKnMgZW50aXJlbHkuXG5mdW5jdGlvbiByZXBsYWNlU3RhcnMgKGNvbXAsIG9wdGlvbnMpIHtcbiAgZGVidWcoJ3JlcGxhY2VTdGFycycsIGNvbXAsIG9wdGlvbnMpXG4gIC8vIExvb3NlbmVzcyBpcyBpZ25vcmVkIGhlcmUuICBzdGFyIGlzIGFsd2F5cyBhcyBsb29zZSBhcyBpdCBnZXRzIVxuICByZXR1cm4gY29tcC50cmltKCkucmVwbGFjZShyZVtTVEFSXSwgJycpXG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgcGFzc2VkIHRvIHN0cmluZy5yZXBsYWNlKHJlW0hZUEhFTlJBTkdFXSlcbi8vIE0sIG0sIHBhdGNoLCBwcmVyZWxlYXNlLCBidWlsZFxuLy8gMS4yIC0gMy40LjUgPT4gPj0xLjIuMCA8PTMuNC41XG4vLyAxLjIuMyAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMCBBbnkgMy40Lnggd2lsbCBkb1xuLy8gMS4yIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wXG5mdW5jdGlvbiBoeXBoZW5SZXBsYWNlICgkMCxcbiAgZnJvbSwgZk0sIGZtLCBmcCwgZnByLCBmYixcbiAgdG8sIHRNLCB0bSwgdHAsIHRwciwgdGIpIHtcbiAgaWYgKGlzWChmTSkpIHtcbiAgICBmcm9tID0gJydcbiAgfSBlbHNlIGlmIChpc1goZm0pKSB7XG4gICAgZnJvbSA9ICc+PScgKyBmTSArICcuMC4wJ1xuICB9IGVsc2UgaWYgKGlzWChmcCkpIHtcbiAgICBmcm9tID0gJz49JyArIGZNICsgJy4nICsgZm0gKyAnLjAnXG4gIH0gZWxzZSB7XG4gICAgZnJvbSA9ICc+PScgKyBmcm9tXG4gIH1cblxuICBpZiAoaXNYKHRNKSkge1xuICAgIHRvID0gJydcbiAgfSBlbHNlIGlmIChpc1godG0pKSB7XG4gICAgdG8gPSAnPCcgKyAoK3RNICsgMSkgKyAnLjAuMCdcbiAgfSBlbHNlIGlmIChpc1godHApKSB7XG4gICAgdG8gPSAnPCcgKyB0TSArICcuJyArICgrdG0gKyAxKSArICcuMCdcbiAgfSBlbHNlIGlmICh0cHIpIHtcbiAgICB0byA9ICc8PScgKyB0TSArICcuJyArIHRtICsgJy4nICsgdHAgKyAnLScgKyB0cHJcbiAgfSBlbHNlIHtcbiAgICB0byA9ICc8PScgKyB0b1xuICB9XG5cbiAgcmV0dXJuIChmcm9tICsgJyAnICsgdG8pLnRyaW0oKVxufVxuXG4vLyBpZiBBTlkgb2YgdGhlIHNldHMgbWF0Y2ggQUxMIG9mIGl0cyBjb21wYXJhdG9ycywgdGhlbiBwYXNzXG5SYW5nZS5wcm90b3R5cGUudGVzdCA9IGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG4gIGlmICghdmVyc2lvbikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJykge1xuICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMub3B0aW9ucylcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodGVzdFNldCh0aGlzLnNldFtpXSwgdmVyc2lvbiwgdGhpcy5vcHRpb25zKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHRlc3RTZXQgKHNldCwgdmVyc2lvbiwgb3B0aW9ucykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgIGlmICghc2V0W2ldLnRlc3QodmVyc2lvbikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmICh2ZXJzaW9uLnByZXJlbGVhc2UubGVuZ3RoICYmICFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlKSB7XG4gICAgLy8gRmluZCB0aGUgc2V0IG9mIHZlcnNpb25zIHRoYXQgYXJlIGFsbG93ZWQgdG8gaGF2ZSBwcmVyZWxlYXNlc1xuICAgIC8vIEZvciBleGFtcGxlLCBeMS4yLjMtcHIuMSBkZXN1Z2FycyB0byA+PTEuMi4zLXByLjEgPDIuMC4wXG4gICAgLy8gVGhhdCBzaG91bGQgYWxsb3cgYDEuMi4zLXByLjJgIHRvIHBhc3MuXG4gICAgLy8gSG93ZXZlciwgYDEuMi40LWFscGhhLm5vdHJlYWR5YCBzaG91bGQgTk9UIGJlIGFsbG93ZWQsXG4gICAgLy8gZXZlbiB0aG91Z2ggaXQncyB3aXRoaW4gdGhlIHJhbmdlIHNldCBieSB0aGUgY29tcGFyYXRvcnMuXG4gICAgZm9yIChpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgICAgZGVidWcoc2V0W2ldLnNlbXZlcilcbiAgICAgIGlmIChzZXRbaV0uc2VtdmVyID09PSBBTlkpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgaWYgKHNldFtpXS5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBhbGxvd2VkID0gc2V0W2ldLnNlbXZlclxuICAgICAgICBpZiAoYWxsb3dlZC5tYWpvciA9PT0gdmVyc2lvbi5tYWpvciAmJlxuICAgICAgICAgICAgYWxsb3dlZC5taW5vciA9PT0gdmVyc2lvbi5taW5vciAmJlxuICAgICAgICAgICAgYWxsb3dlZC5wYXRjaCA9PT0gdmVyc2lvbi5wYXRjaCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBWZXJzaW9uIGhhcyBhIC1wcmUsIGJ1dCBpdCdzIG5vdCBvbmUgb2YgdGhlIG9uZXMgd2UgbGlrZS5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydHMuc2F0aXNmaWVzID0gc2F0aXNmaWVzXG5mdW5jdGlvbiBzYXRpc2ZpZXMgKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKSB7XG4gIHRyeSB7XG4gICAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIHJhbmdlLnRlc3QodmVyc2lvbilcbn1cblxuZXhwb3J0cy5tYXhTYXRpc2Z5aW5nID0gbWF4U2F0aXNmeWluZ1xuZnVuY3Rpb24gbWF4U2F0aXNmeWluZyAodmVyc2lvbnMsIHJhbmdlLCBvcHRpb25zKSB7XG4gIHZhciBtYXggPSBudWxsXG4gIHZhciBtYXhTViA9IG51bGxcbiAgdHJ5IHtcbiAgICB2YXIgcmFuZ2VPYmogPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICB2ZXJzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgaWYgKHJhbmdlT2JqLnRlc3QodikpIHtcbiAgICAgIC8vIHNhdGlzZmllcyh2LCByYW5nZSwgb3B0aW9ucylcbiAgICAgIGlmICghbWF4IHx8IG1heFNWLmNvbXBhcmUodikgPT09IC0xKSB7XG4gICAgICAgIC8vIGNvbXBhcmUobWF4LCB2LCB0cnVlKVxuICAgICAgICBtYXggPSB2XG4gICAgICAgIG1heFNWID0gbmV3IFNlbVZlcihtYXgsIG9wdGlvbnMpXG4gICAgICB9XG4gICAgfVxuICB9KVxuICByZXR1cm4gbWF4XG59XG5cbmV4cG9ydHMubWluU2F0aXNmeWluZyA9IG1pblNhdGlzZnlpbmdcbmZ1bmN0aW9uIG1pblNhdGlzZnlpbmcgKHZlcnNpb25zLCByYW5nZSwgb3B0aW9ucykge1xuICB2YXIgbWluID0gbnVsbFxuICB2YXIgbWluU1YgPSBudWxsXG4gIHRyeSB7XG4gICAgdmFyIHJhbmdlT2JqID0gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgdmVyc2lvbnMuZm9yRWFjaChmdW5jdGlvbiAodikge1xuICAgIGlmIChyYW5nZU9iai50ZXN0KHYpKSB7XG4gICAgICAvLyBzYXRpc2ZpZXModiwgcmFuZ2UsIG9wdGlvbnMpXG4gICAgICBpZiAoIW1pbiB8fCBtaW5TVi5jb21wYXJlKHYpID09PSAxKSB7XG4gICAgICAgIC8vIGNvbXBhcmUobWluLCB2LCB0cnVlKVxuICAgICAgICBtaW4gPSB2XG4gICAgICAgIG1pblNWID0gbmV3IFNlbVZlcihtaW4sIG9wdGlvbnMpXG4gICAgICB9XG4gICAgfVxuICB9KVxuICByZXR1cm4gbWluXG59XG5cbmV4cG9ydHMubWluVmVyc2lvbiA9IG1pblZlcnNpb25cbmZ1bmN0aW9uIG1pblZlcnNpb24gKHJhbmdlLCBsb29zZSkge1xuICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpXG5cbiAgdmFyIG1pbnZlciA9IG5ldyBTZW1WZXIoJzAuMC4wJylcbiAgaWYgKHJhbmdlLnRlc3QobWludmVyKSkge1xuICAgIHJldHVybiBtaW52ZXJcbiAgfVxuXG4gIG1pbnZlciA9IG5ldyBTZW1WZXIoJzAuMC4wLTAnKVxuICBpZiAocmFuZ2UudGVzdChtaW52ZXIpKSB7XG4gICAgcmV0dXJuIG1pbnZlclxuICB9XG5cbiAgbWludmVyID0gbnVsbFxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlLnNldC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjb21wYXJhdG9ycyA9IHJhbmdlLnNldFtpXVxuXG4gICAgY29tcGFyYXRvcnMuZm9yRWFjaChmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICAgICAgLy8gQ2xvbmUgdG8gYXZvaWQgbWFuaXB1bGF0aW5nIHRoZSBjb21wYXJhdG9yJ3Mgc2VtdmVyIG9iamVjdC5cbiAgICAgIHZhciBjb21wdmVyID0gbmV3IFNlbVZlcihjb21wYXJhdG9yLnNlbXZlci52ZXJzaW9uKVxuICAgICAgc3dpdGNoIChjb21wYXJhdG9yLm9wZXJhdG9yKSB7XG4gICAgICAgIGNhc2UgJz4nOlxuICAgICAgICAgIGlmIChjb21wdmVyLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb21wdmVyLnBhdGNoKytcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcHZlci5wcmVyZWxlYXNlLnB1c2goMClcbiAgICAgICAgICB9XG4gICAgICAgICAgY29tcHZlci5yYXcgPSBjb21wdmVyLmZvcm1hdCgpXG4gICAgICAgICAgLyogZmFsbHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnJzpcbiAgICAgICAgY2FzZSAnPj0nOlxuICAgICAgICAgIGlmICghbWludmVyIHx8IGd0KG1pbnZlciwgY29tcHZlcikpIHtcbiAgICAgICAgICAgIG1pbnZlciA9IGNvbXB2ZXJcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnPCc6XG4gICAgICAgIGNhc2UgJzw9JzpcbiAgICAgICAgICAvKiBJZ25vcmUgbWF4aW11bSB2ZXJzaW9ucyAqL1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIG9wZXJhdGlvbjogJyArIGNvbXBhcmF0b3Iub3BlcmF0b3IpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlmIChtaW52ZXIgJiYgcmFuZ2UudGVzdChtaW52ZXIpKSB7XG4gICAgcmV0dXJuIG1pbnZlclxuICB9XG5cbiAgcmV0dXJuIG51bGxcbn1cblxuZXhwb3J0cy52YWxpZFJhbmdlID0gdmFsaWRSYW5nZVxuZnVuY3Rpb24gdmFsaWRSYW5nZSAocmFuZ2UsIG9wdGlvbnMpIHtcbiAgdHJ5IHtcbiAgICAvLyBSZXR1cm4gJyonIGluc3RlYWQgb2YgJycgc28gdGhhdCB0cnV0aGluZXNzIHdvcmtzLlxuICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBpZiBpdCdzIGludmFsaWQgYW55d2F5XG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucykucmFuZ2UgfHwgJyonXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBsZXNzIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2VcbmV4cG9ydHMubHRyID0gbHRyXG5mdW5jdGlvbiBsdHIgKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKSB7XG4gIHJldHVybiBvdXRzaWRlKHZlcnNpb24sIHJhbmdlLCAnPCcsIG9wdGlvbnMpXG59XG5cbi8vIERldGVybWluZSBpZiB2ZXJzaW9uIGlzIGdyZWF0ZXIgdGhhbiBhbGwgdGhlIHZlcnNpb25zIHBvc3NpYmxlIGluIHRoZSByYW5nZS5cbmV4cG9ydHMuZ3RyID0gZ3RyXG5mdW5jdGlvbiBndHIgKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKSB7XG4gIHJldHVybiBvdXRzaWRlKHZlcnNpb24sIHJhbmdlLCAnPicsIG9wdGlvbnMpXG59XG5cbmV4cG9ydHMub3V0c2lkZSA9IG91dHNpZGVcbmZ1bmN0aW9uIG91dHNpZGUgKHZlcnNpb24sIHJhbmdlLCBoaWxvLCBvcHRpb25zKSB7XG4gIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIG9wdGlvbnMpXG4gIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuXG4gIHZhciBndGZuLCBsdGVmbiwgbHRmbiwgY29tcCwgZWNvbXBcbiAgc3dpdGNoIChoaWxvKSB7XG4gICAgY2FzZSAnPic6XG4gICAgICBndGZuID0gZ3RcbiAgICAgIGx0ZWZuID0gbHRlXG4gICAgICBsdGZuID0gbHRcbiAgICAgIGNvbXAgPSAnPidcbiAgICAgIGVjb21wID0gJz49J1xuICAgICAgYnJlYWtcbiAgICBjYXNlICc8JzpcbiAgICAgIGd0Zm4gPSBsdFxuICAgICAgbHRlZm4gPSBndGVcbiAgICAgIGx0Zm4gPSBndFxuICAgICAgY29tcCA9ICc8J1xuICAgICAgZWNvbXAgPSAnPD0nXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNdXN0IHByb3ZpZGUgYSBoaWxvIHZhbCBvZiBcIjxcIiBvciBcIj5cIicpXG4gIH1cblxuICAvLyBJZiBpdCBzYXRpc2lmZXMgdGhlIHJhbmdlIGl0IGlzIG5vdCBvdXRzaWRlXG4gIGlmIChzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBGcm9tIG5vdyBvbiwgdmFyaWFibGUgdGVybXMgYXJlIGFzIGlmIHdlJ3JlIGluIFwiZ3RyXCIgbW9kZS5cbiAgLy8gYnV0IG5vdGUgdGhhdCBldmVyeXRoaW5nIGlzIGZsaXBwZWQgZm9yIHRoZSBcImx0clwiIGZ1bmN0aW9uLlxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2Uuc2V0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGNvbXBhcmF0b3JzID0gcmFuZ2Uuc2V0W2ldXG5cbiAgICB2YXIgaGlnaCA9IG51bGxcbiAgICB2YXIgbG93ID0gbnVsbFxuXG4gICAgY29tcGFyYXRvcnMuZm9yRWFjaChmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICAgICAgaWYgKGNvbXBhcmF0b3Iuc2VtdmVyID09PSBBTlkpIHtcbiAgICAgICAgY29tcGFyYXRvciA9IG5ldyBDb21wYXJhdG9yKCc+PTAuMC4wJylcbiAgICAgIH1cbiAgICAgIGhpZ2ggPSBoaWdoIHx8IGNvbXBhcmF0b3JcbiAgICAgIGxvdyA9IGxvdyB8fCBjb21wYXJhdG9yXG4gICAgICBpZiAoZ3Rmbihjb21wYXJhdG9yLnNlbXZlciwgaGlnaC5zZW12ZXIsIG9wdGlvbnMpKSB7XG4gICAgICAgIGhpZ2ggPSBjb21wYXJhdG9yXG4gICAgICB9IGVsc2UgaWYgKGx0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGxvdy5zZW12ZXIsIG9wdGlvbnMpKSB7XG4gICAgICAgIGxvdyA9IGNvbXBhcmF0b3JcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gSWYgdGhlIGVkZ2UgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhIG9wZXJhdG9yIHRoZW4gb3VyIHZlcnNpb25cbiAgICAvLyBpc24ndCBvdXRzaWRlIGl0XG4gICAgaWYgKGhpZ2gub3BlcmF0b3IgPT09IGNvbXAgfHwgaGlnaC5vcGVyYXRvciA9PT0gZWNvbXApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIElmIHRoZSBsb3dlc3QgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhbiBvcGVyYXRvciBhbmQgb3VyIHZlcnNpb25cbiAgICAvLyBpcyBsZXNzIHRoYW4gaXQgdGhlbiBpdCBpc24ndCBoaWdoZXIgdGhhbiB0aGUgcmFuZ2VcbiAgICBpZiAoKCFsb3cub3BlcmF0b3IgfHwgbG93Lm9wZXJhdG9yID09PSBjb21wKSAmJlxuICAgICAgICBsdGVmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIGlmIChsb3cub3BlcmF0b3IgPT09IGVjb21wICYmIGx0Zm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnRzLnByZXJlbGVhc2UgPSBwcmVyZWxlYXNlXG5mdW5jdGlvbiBwcmVyZWxlYXNlICh2ZXJzaW9uLCBvcHRpb25zKSB7XG4gIHZhciBwYXJzZWQgPSBwYXJzZSh2ZXJzaW9uLCBvcHRpb25zKVxuICByZXR1cm4gKHBhcnNlZCAmJiBwYXJzZWQucHJlcmVsZWFzZS5sZW5ndGgpID8gcGFyc2VkLnByZXJlbGVhc2UgOiBudWxsXG59XG5cbmV4cG9ydHMuaW50ZXJzZWN0cyA9IGludGVyc2VjdHNcbmZ1bmN0aW9uIGludGVyc2VjdHMgKHIxLCByMiwgb3B0aW9ucykge1xuICByMSA9IG5ldyBSYW5nZShyMSwgb3B0aW9ucylcbiAgcjIgPSBuZXcgUmFuZ2UocjIsIG9wdGlvbnMpXG4gIHJldHVybiByMS5pbnRlcnNlY3RzKHIyKVxufVxuXG5leHBvcnRzLmNvZXJjZSA9IGNvZXJjZVxuZnVuY3Rpb24gY29lcmNlICh2ZXJzaW9uKSB7XG4gIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgcmV0dXJuIHZlcnNpb25cbiAgfVxuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgdmFyIG1hdGNoID0gdmVyc2lvbi5tYXRjaChyZVtDT0VSQ0VdKVxuXG4gIGlmIChtYXRjaCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHJldHVybiBwYXJzZShtYXRjaFsxXSArXG4gICAgJy4nICsgKG1hdGNoWzJdIHx8ICcwJykgK1xuICAgICcuJyArIChtYXRjaFszXSB8fCAnMCcpKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi90dW5uZWwnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG5ldCA9IHJlcXVpcmUoJ25ldCcpO1xudmFyIHRscyA9IHJlcXVpcmUoJ3RscycpO1xudmFyIGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG52YXIgaHR0cHMgPSByZXF1aXJlKCdodHRwcycpO1xudmFyIGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cblxuZXhwb3J0cy5odHRwT3Zlckh0dHAgPSBodHRwT3Zlckh0dHA7XG5leHBvcnRzLmh0dHBzT3Zlckh0dHAgPSBodHRwc092ZXJIdHRwO1xuZXhwb3J0cy5odHRwT3Zlckh0dHBzID0gaHR0cE92ZXJIdHRwcztcbmV4cG9ydHMuaHR0cHNPdmVySHR0cHMgPSBodHRwc092ZXJIdHRwcztcblxuXG5mdW5jdGlvbiBodHRwT3Zlckh0dHAob3B0aW9ucykge1xuICB2YXIgYWdlbnQgPSBuZXcgVHVubmVsaW5nQWdlbnQob3B0aW9ucyk7XG4gIGFnZW50LnJlcXVlc3QgPSBodHRwLnJlcXVlc3Q7XG4gIHJldHVybiBhZ2VudDtcbn1cblxuZnVuY3Rpb24gaHR0cHNPdmVySHR0cChvcHRpb25zKSB7XG4gIHZhciBhZ2VudCA9IG5ldyBUdW5uZWxpbmdBZ2VudChvcHRpb25zKTtcbiAgYWdlbnQucmVxdWVzdCA9IGh0dHAucmVxdWVzdDtcbiAgYWdlbnQuY3JlYXRlU29ja2V0ID0gY3JlYXRlU2VjdXJlU29ja2V0O1xuICByZXR1cm4gYWdlbnQ7XG59XG5cbmZ1bmN0aW9uIGh0dHBPdmVySHR0cHMob3B0aW9ucykge1xuICB2YXIgYWdlbnQgPSBuZXcgVHVubmVsaW5nQWdlbnQob3B0aW9ucyk7XG4gIGFnZW50LnJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0O1xuICByZXR1cm4gYWdlbnQ7XG59XG5cbmZ1bmN0aW9uIGh0dHBzT3Zlckh0dHBzKG9wdGlvbnMpIHtcbiAgdmFyIGFnZW50ID0gbmV3IFR1bm5lbGluZ0FnZW50KG9wdGlvbnMpO1xuICBhZ2VudC5yZXF1ZXN0ID0gaHR0cHMucmVxdWVzdDtcbiAgYWdlbnQuY3JlYXRlU29ja2V0ID0gY3JlYXRlU2VjdXJlU29ja2V0O1xuICByZXR1cm4gYWdlbnQ7XG59XG5cblxuZnVuY3Rpb24gVHVubmVsaW5nQWdlbnQob3B0aW9ucykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHNlbGYub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHNlbGYucHJveHlPcHRpb25zID0gc2VsZi5vcHRpb25zLnByb3h5IHx8IHt9O1xuICBzZWxmLm1heFNvY2tldHMgPSBzZWxmLm9wdGlvbnMubWF4U29ja2V0cyB8fCBodHRwLkFnZW50LmRlZmF1bHRNYXhTb2NrZXRzO1xuICBzZWxmLnJlcXVlc3RzID0gW107XG4gIHNlbGYuc29ja2V0cyA9IFtdO1xuXG4gIHNlbGYub24oJ2ZyZWUnLCBmdW5jdGlvbiBvbkZyZWUoc29ja2V0LCBob3N0LCBwb3J0LCBsb2NhbEFkZHJlc3MpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRvT3B0aW9ucyhob3N0LCBwb3J0LCBsb2NhbEFkZHJlc3MpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzZWxmLnJlcXVlc3RzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB2YXIgcGVuZGluZyA9IHNlbGYucmVxdWVzdHNbaV07XG4gICAgICBpZiAocGVuZGluZy5ob3N0ID09PSBvcHRpb25zLmhvc3QgJiYgcGVuZGluZy5wb3J0ID09PSBvcHRpb25zLnBvcnQpIHtcbiAgICAgICAgLy8gRGV0ZWN0IHRoZSByZXF1ZXN0IHRvIGNvbm5lY3Qgc2FtZSBvcmlnaW4gc2VydmVyLFxuICAgICAgICAvLyByZXVzZSB0aGUgY29ubmVjdGlvbi5cbiAgICAgICAgc2VsZi5yZXF1ZXN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHBlbmRpbmcucmVxdWVzdC5vblNvY2tldChzb2NrZXQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHNvY2tldC5kZXN0cm95KCk7XG4gICAgc2VsZi5yZW1vdmVTb2NrZXQoc29ja2V0KTtcbiAgfSk7XG59XG51dGlsLmluaGVyaXRzKFR1bm5lbGluZ0FnZW50LCBldmVudHMuRXZlbnRFbWl0dGVyKTtcblxuVHVubmVsaW5nQWdlbnQucHJvdG90eXBlLmFkZFJlcXVlc3QgPSBmdW5jdGlvbiBhZGRSZXF1ZXN0KHJlcSwgaG9zdCwgcG9ydCwgbG9jYWxBZGRyZXNzKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoe3JlcXVlc3Q6IHJlcX0sIHNlbGYub3B0aW9ucywgdG9PcHRpb25zKGhvc3QsIHBvcnQsIGxvY2FsQWRkcmVzcykpO1xuXG4gIGlmIChzZWxmLnNvY2tldHMubGVuZ3RoID49IHRoaXMubWF4U29ja2V0cykge1xuICAgIC8vIFdlIGFyZSBvdmVyIGxpbWl0IHNvIHdlJ2xsIGFkZCBpdCB0byB0aGUgcXVldWUuXG4gICAgc2VsZi5yZXF1ZXN0cy5wdXNoKG9wdGlvbnMpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIElmIHdlIGFyZSB1bmRlciBtYXhTb2NrZXRzIGNyZWF0ZSBhIG5ldyBvbmUuXG4gIHNlbGYuY3JlYXRlU29ja2V0KG9wdGlvbnMsIGZ1bmN0aW9uKHNvY2tldCkge1xuICAgIHNvY2tldC5vbignZnJlZScsIG9uRnJlZSk7XG4gICAgc29ja2V0Lm9uKCdjbG9zZScsIG9uQ2xvc2VPclJlbW92ZSk7XG4gICAgc29ja2V0Lm9uKCdhZ2VudFJlbW92ZScsIG9uQ2xvc2VPclJlbW92ZSk7XG4gICAgcmVxLm9uU29ja2V0KHNvY2tldCk7XG5cbiAgICBmdW5jdGlvbiBvbkZyZWUoKSB7XG4gICAgICBzZWxmLmVtaXQoJ2ZyZWUnLCBzb2NrZXQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2xvc2VPclJlbW92ZShlcnIpIHtcbiAgICAgIHNlbGYucmVtb3ZlU29ja2V0KHNvY2tldCk7XG4gICAgICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2ZyZWUnLCBvbkZyZWUpO1xuICAgICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uQ2xvc2VPclJlbW92ZSk7XG4gICAgICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2FnZW50UmVtb3ZlJywgb25DbG9zZU9yUmVtb3ZlKTtcbiAgICB9XG4gIH0pO1xufTtcblxuVHVubmVsaW5nQWdlbnQucHJvdG90eXBlLmNyZWF0ZVNvY2tldCA9IGZ1bmN0aW9uIGNyZWF0ZVNvY2tldChvcHRpb25zLCBjYikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBwbGFjZWhvbGRlciA9IHt9O1xuICBzZWxmLnNvY2tldHMucHVzaChwbGFjZWhvbGRlcik7XG5cbiAgdmFyIGNvbm5lY3RPcHRpb25zID0gbWVyZ2VPcHRpb25zKHt9LCBzZWxmLnByb3h5T3B0aW9ucywge1xuICAgIG1ldGhvZDogJ0NPTk5FQ1QnLFxuICAgIHBhdGg6IG9wdGlvbnMuaG9zdCArICc6JyArIG9wdGlvbnMucG9ydCxcbiAgICBhZ2VudDogZmFsc2VcbiAgfSk7XG4gIGlmIChjb25uZWN0T3B0aW9ucy5wcm94eUF1dGgpIHtcbiAgICBjb25uZWN0T3B0aW9ucy5oZWFkZXJzID0gY29ubmVjdE9wdGlvbnMuaGVhZGVycyB8fCB7fTtcbiAgICBjb25uZWN0T3B0aW9ucy5oZWFkZXJzWydQcm94eS1BdXRob3JpemF0aW9uJ10gPSAnQmFzaWMgJyArXG4gICAgICAgIG5ldyBCdWZmZXIoY29ubmVjdE9wdGlvbnMucHJveHlBdXRoKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gIH1cblxuICBkZWJ1ZygnbWFraW5nIENPTk5FQ1QgcmVxdWVzdCcpO1xuICB2YXIgY29ubmVjdFJlcSA9IHNlbGYucmVxdWVzdChjb25uZWN0T3B0aW9ucyk7XG4gIGNvbm5lY3RSZXEudXNlQ2h1bmtlZEVuY29kaW5nQnlEZWZhdWx0ID0gZmFsc2U7IC8vIGZvciB2MC42XG4gIGNvbm5lY3RSZXEub25jZSgncmVzcG9uc2UnLCBvblJlc3BvbnNlKTsgLy8gZm9yIHYwLjZcbiAgY29ubmVjdFJlcS5vbmNlKCd1cGdyYWRlJywgb25VcGdyYWRlKTsgICAvLyBmb3IgdjAuNlxuICBjb25uZWN0UmVxLm9uY2UoJ2Nvbm5lY3QnLCBvbkNvbm5lY3QpOyAgIC8vIGZvciB2MC43IG9yIGxhdGVyXG4gIGNvbm5lY3RSZXEub25jZSgnZXJyb3InLCBvbkVycm9yKTtcbiAgY29ubmVjdFJlcS5lbmQoKTtcblxuICBmdW5jdGlvbiBvblJlc3BvbnNlKHJlcykge1xuICAgIC8vIFZlcnkgaGFja3kuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGF2b2lkIGh0dHAtcGFyc2VyIGxlYWtzLlxuICAgIHJlcy51cGdyYWRlID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uVXBncmFkZShyZXMsIHNvY2tldCwgaGVhZCkge1xuICAgIC8vIEhhY2t5LlxuICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICBvbkNvbm5lY3QocmVzLCBzb2NrZXQsIGhlYWQpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Db25uZWN0KHJlcywgc29ja2V0LCBoZWFkKSB7XG4gICAgY29ubmVjdFJlcS5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICBzb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG5cbiAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgYXNzZXJ0LmVxdWFsKGhlYWQubGVuZ3RoLCAwKTtcbiAgICAgIGRlYnVnKCd0dW5uZWxpbmcgY29ubmVjdGlvbiBoYXMgZXN0YWJsaXNoZWQnKTtcbiAgICAgIHNlbGYuc29ja2V0c1tzZWxmLnNvY2tldHMuaW5kZXhPZihwbGFjZWhvbGRlcildID0gc29ja2V0O1xuICAgICAgY2Ioc29ja2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ3R1bm5lbGluZyBzb2NrZXQgY291bGQgbm90IGJlIGVzdGFibGlzaGVkLCBzdGF0dXNDb2RlPSVkJyxcbiAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlKTtcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigndHVubmVsaW5nIHNvY2tldCBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdGF0dXNDb2RlPScgKyByZXMuc3RhdHVzQ29kZSk7XG4gICAgICBlcnJvci5jb2RlID0gJ0VDT05OUkVTRVQnO1xuICAgICAgb3B0aW9ucy5yZXF1ZXN0LmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgc2VsZi5yZW1vdmVTb2NrZXQocGxhY2Vob2xkZXIpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRXJyb3IoY2F1c2UpIHtcbiAgICBjb25uZWN0UmVxLnJlbW92ZUFsbExpc3RlbmVycygpO1xuXG4gICAgZGVidWcoJ3R1bm5lbGluZyBzb2NrZXQgY291bGQgbm90IGJlIGVzdGFibGlzaGVkLCBjYXVzZT0lc1xcbicsXG4gICAgICAgICAgY2F1c2UubWVzc2FnZSwgY2F1c2Uuc3RhY2spO1xuICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigndHVubmVsaW5nIHNvY2tldCBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnY2F1c2U9JyArIGNhdXNlLm1lc3NhZ2UpO1xuICAgIGVycm9yLmNvZGUgPSAnRUNPTk5SRVNFVCc7XG4gICAgb3B0aW9ucy5yZXF1ZXN0LmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuICAgIHNlbGYucmVtb3ZlU29ja2V0KHBsYWNlaG9sZGVyKTtcbiAgfVxufTtcblxuVHVubmVsaW5nQWdlbnQucHJvdG90eXBlLnJlbW92ZVNvY2tldCA9IGZ1bmN0aW9uIHJlbW92ZVNvY2tldChzb2NrZXQpIHtcbiAgdmFyIHBvcyA9IHRoaXMuc29ja2V0cy5pbmRleE9mKHNvY2tldClcbiAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5zb2NrZXRzLnNwbGljZShwb3MsIDEpO1xuXG4gIHZhciBwZW5kaW5nID0gdGhpcy5yZXF1ZXN0cy5zaGlmdCgpO1xuICBpZiAocGVuZGluZykge1xuICAgIC8vIElmIHdlIGhhdmUgcGVuZGluZyByZXF1ZXN0cyBhbmQgYSBzb2NrZXQgZ2V0cyBjbG9zZWQgYSBuZXcgb25lXG4gICAgLy8gbmVlZHMgdG8gYmUgY3JlYXRlZCB0byB0YWtlIG92ZXIgaW4gdGhlIHBvb2wgZm9yIHRoZSBvbmUgdGhhdCBjbG9zZWQuXG4gICAgdGhpcy5jcmVhdGVTb2NrZXQocGVuZGluZywgZnVuY3Rpb24oc29ja2V0KSB7XG4gICAgICBwZW5kaW5nLnJlcXVlc3Qub25Tb2NrZXQoc29ja2V0KTtcbiAgICB9KTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlU2VjdXJlU29ja2V0KG9wdGlvbnMsIGNiKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgVHVubmVsaW5nQWdlbnQucHJvdG90eXBlLmNyZWF0ZVNvY2tldC5jYWxsKHNlbGYsIG9wdGlvbnMsIGZ1bmN0aW9uKHNvY2tldCkge1xuICAgIHZhciBob3N0SGVhZGVyID0gb3B0aW9ucy5yZXF1ZXN0LmdldEhlYWRlcignaG9zdCcpO1xuICAgIHZhciB0bHNPcHRpb25zID0gbWVyZ2VPcHRpb25zKHt9LCBzZWxmLm9wdGlvbnMsIHtcbiAgICAgIHNvY2tldDogc29ja2V0LFxuICAgICAgc2VydmVybmFtZTogaG9zdEhlYWRlciA/IGhvc3RIZWFkZXIucmVwbGFjZSgvOi4qJC8sICcnKSA6IG9wdGlvbnMuaG9zdFxuICAgIH0pO1xuXG4gICAgLy8gMCBpcyBkdW1teSBwb3J0IGZvciB2MC42XG4gICAgdmFyIHNlY3VyZVNvY2tldCA9IHRscy5jb25uZWN0KDAsIHRsc09wdGlvbnMpO1xuICAgIHNlbGYuc29ja2V0c1tzZWxmLnNvY2tldHMuaW5kZXhPZihzb2NrZXQpXSA9IHNlY3VyZVNvY2tldDtcbiAgICBjYihzZWN1cmVTb2NrZXQpO1xuICB9KTtcbn1cblxuXG5mdW5jdGlvbiB0b09wdGlvbnMoaG9zdCwgcG9ydCwgbG9jYWxBZGRyZXNzKSB7XG4gIGlmICh0eXBlb2YgaG9zdCA9PT0gJ3N0cmluZycpIHsgLy8gc2luY2UgdjAuMTBcbiAgICByZXR1cm4ge1xuICAgICAgaG9zdDogaG9zdCxcbiAgICAgIHBvcnQ6IHBvcnQsXG4gICAgICBsb2NhbEFkZHJlc3M6IGxvY2FsQWRkcmVzc1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGhvc3Q7IC8vIGZvciB2MC4xMSBvciBsYXRlclxufVxuXG5mdW5jdGlvbiBtZXJnZU9wdGlvbnModGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgb3ZlcnJpZGVzID0gYXJndW1lbnRzW2ldO1xuICAgIGlmICh0eXBlb2Ygb3ZlcnJpZGVzID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvdmVycmlkZXMpO1xuICAgICAgZm9yICh2YXIgaiA9IDAsIGtleUxlbiA9IGtleXMubGVuZ3RoOyBqIDwga2V5TGVuOyArK2opIHtcbiAgICAgICAgdmFyIGsgPSBrZXlzW2pdO1xuICAgICAgICBpZiAob3ZlcnJpZGVzW2tdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0YXJnZXRba10gPSBvdmVycmlkZXNba107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuXG52YXIgZGVidWc7XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyAmJiAvXFxidHVubmVsXFxiLy50ZXN0KHByb2Nlc3MuZW52Lk5PREVfREVCVUcpKSB7XG4gIGRlYnVnID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGFyZ3NbMF0gPSAnVFVOTkVMOiAnICsgYXJnc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJncy51bnNoaWZ0KCdUVU5ORUw6Jyk7XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gIH1cbn0gZWxzZSB7XG4gIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbn1cbmV4cG9ydHMuZGVidWcgPSBkZWJ1ZzsgLy8gZm9yIHRlc3RcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB1cmwgPSByZXF1aXJlKFwidXJsXCIpO1xyXG5jb25zdCBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XHJcbmNvbnN0IGh0dHBzID0gcmVxdWlyZShcImh0dHBzXCIpO1xyXG5jb25zdCB1dGlsID0gcmVxdWlyZShcIi4vVXRpbFwiKTtcclxubGV0IGZzO1xyXG5sZXQgdHVubmVsO1xyXG52YXIgSHR0cENvZGVzO1xyXG4oZnVuY3Rpb24gKEh0dHBDb2Rlcykge1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk9LXCJdID0gMjAwXSA9IFwiT0tcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJNdWx0aXBsZUNob2ljZXNcIl0gPSAzMDBdID0gXCJNdWx0aXBsZUNob2ljZXNcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJNb3ZlZFBlcm1hbmVudGx5XCJdID0gMzAxXSA9IFwiTW92ZWRQZXJtYW5lbnRseVwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlJlc291cmNlTW92ZWRcIl0gPSAzMDJdID0gXCJSZXNvdXJjZU1vdmVkXCI7XHJcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiU2VlT3RoZXJcIl0gPSAzMDNdID0gXCJTZWVPdGhlclwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk5vdE1vZGlmaWVkXCJdID0gMzA0XSA9IFwiTm90TW9kaWZpZWRcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJVc2VQcm94eVwiXSA9IDMwNV0gPSBcIlVzZVByb3h5XCI7XHJcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiU3dpdGNoUHJveHlcIl0gPSAzMDZdID0gXCJTd2l0Y2hQcm94eVwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlRlbXBvcmFyeVJlZGlyZWN0XCJdID0gMzA3XSA9IFwiVGVtcG9yYXJ5UmVkaXJlY3RcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJQZXJtYW5lbnRSZWRpcmVjdFwiXSA9IDMwOF0gPSBcIlBlcm1hbmVudFJlZGlyZWN0XCI7XHJcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiQmFkUmVxdWVzdFwiXSA9IDQwMF0gPSBcIkJhZFJlcXVlc3RcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJVbmF1dGhvcml6ZWRcIl0gPSA0MDFdID0gXCJVbmF1dGhvcml6ZWRcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJQYXltZW50UmVxdWlyZWRcIl0gPSA0MDJdID0gXCJQYXltZW50UmVxdWlyZWRcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJGb3JiaWRkZW5cIl0gPSA0MDNdID0gXCJGb3JiaWRkZW5cIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJOb3RGb3VuZFwiXSA9IDQwNF0gPSBcIk5vdEZvdW5kXCI7XHJcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiTWV0aG9kTm90QWxsb3dlZFwiXSA9IDQwNV0gPSBcIk1ldGhvZE5vdEFsbG93ZWRcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJOb3RBY2NlcHRhYmxlXCJdID0gNDA2XSA9IFwiTm90QWNjZXB0YWJsZVwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZFwiXSA9IDQwN10gPSBcIlByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZFwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlJlcXVlc3RUaW1lb3V0XCJdID0gNDA4XSA9IFwiUmVxdWVzdFRpbWVvdXRcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJDb25mbGljdFwiXSA9IDQwOV0gPSBcIkNvbmZsaWN0XCI7XHJcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiR29uZVwiXSA9IDQxMF0gPSBcIkdvbmVcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJUb29NYW55UmVxdWVzdHNcIl0gPSA0MjldID0gXCJUb29NYW55UmVxdWVzdHNcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJJbnRlcm5hbFNlcnZlckVycm9yXCJdID0gNTAwXSA9IFwiSW50ZXJuYWxTZXJ2ZXJFcnJvclwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk5vdEltcGxlbWVudGVkXCJdID0gNTAxXSA9IFwiTm90SW1wbGVtZW50ZWRcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJCYWRHYXRld2F5XCJdID0gNTAyXSA9IFwiQmFkR2F0ZXdheVwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlNlcnZpY2VVbmF2YWlsYWJsZVwiXSA9IDUwM10gPSBcIlNlcnZpY2VVbmF2YWlsYWJsZVwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkdhdGV3YXlUaW1lb3V0XCJdID0gNTA0XSA9IFwiR2F0ZXdheVRpbWVvdXRcIjtcclxufSkoSHR0cENvZGVzID0gZXhwb3J0cy5IdHRwQ29kZXMgfHwgKGV4cG9ydHMuSHR0cENvZGVzID0ge30pKTtcclxuY29uc3QgSHR0cFJlZGlyZWN0Q29kZXMgPSBbSHR0cENvZGVzLk1vdmVkUGVybWFuZW50bHksIEh0dHBDb2Rlcy5SZXNvdXJjZU1vdmVkLCBIdHRwQ29kZXMuU2VlT3RoZXIsIEh0dHBDb2Rlcy5UZW1wb3JhcnlSZWRpcmVjdCwgSHR0cENvZGVzLlBlcm1hbmVudFJlZGlyZWN0XTtcclxuY29uc3QgSHR0cFJlc3BvbnNlUmV0cnlDb2RlcyA9IFtIdHRwQ29kZXMuQmFkR2F0ZXdheSwgSHR0cENvZGVzLlNlcnZpY2VVbmF2YWlsYWJsZSwgSHR0cENvZGVzLkdhdGV3YXlUaW1lb3V0XTtcclxuY29uc3QgUmV0cnlhYmxlSHR0cFZlcmJzID0gWydPUFRJT05TJywgJ0dFVCcsICdERUxFVEUnLCAnSEVBRCddO1xyXG5jb25zdCBFeHBvbmVudGlhbEJhY2tvZmZDZWlsaW5nID0gMTA7XHJcbmNvbnN0IEV4cG9uZW50aWFsQmFja29mZlRpbWVTbGljZSA9IDU7XHJcbmNsYXNzIEh0dHBDbGllbnRSZXNwb25zZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIH1cclxuICAgIHJlYWRCb2R5KCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBidWZmZXIgPSBCdWZmZXIuYWxsb2MoMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVuY29kaW5nQ2hhcnNldCA9IHV0aWwub2J0YWluQ29udGVudENoYXJzZXQodGhpcyk7XHJcbiAgICAgICAgICAgIC8vIEV4dHJhY3QgRW5jb2RpbmcgZnJvbSBoZWFkZXI6ICdjb250ZW50LWVuY29kaW5nJ1xyXG4gICAgICAgICAgICAvLyBNYXRjaCBgZ3ppcGAsIGBnemlwLCBkZWZsYXRlYCB2YXJpYXRpb25zIG9mIEdaSVAgZW5jb2RpbmdcclxuICAgICAgICAgICAgY29uc3QgY29udGVudEVuY29kaW5nID0gdGhpcy5tZXNzYWdlLmhlYWRlcnNbJ2NvbnRlbnQtZW5jb2RpbmcnXSB8fCAnJztcclxuICAgICAgICAgICAgY29uc3QgaXNHemlwcGVkRW5jb2RlZCA9IG5ldyBSZWdFeHAoJyhnemlwJCl8KGd6aXAsICpkZWZsYXRlKScpLnRlc3QoY29udGVudEVuY29kaW5nKTtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlLm9uKCdkYXRhJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNodW5rID0gKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykgPyBCdWZmZXIuZnJvbShkYXRhLCBlbmNvZGluZ0NoYXJzZXQpIDogZGF0YTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoW2J1ZmZlciwgY2h1bmtdKTtcclxuICAgICAgICAgICAgfSkub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzR3ppcHBlZEVuY29kZWQpIHsgLy8gUHJvY2VzcyBHWmlwcGVkIFJlc3BvbnNlIEJvZHkgSEVSRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBndW56aXBwZWRCb2R5ID0geWllbGQgdXRpbC5kZWNvbXByZXNzR3ppcHBlZENvbnRlbnQoYnVmZmVyLCBlbmNvZGluZ0NoYXJzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGd1bnppcHBlZEJvZHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGJ1ZmZlci50b1N0cmluZyhlbmNvZGluZ0NoYXJzZXQpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuSHR0cENsaWVudFJlc3BvbnNlID0gSHR0cENsaWVudFJlc3BvbnNlO1xyXG5mdW5jdGlvbiBpc0h0dHBzKHJlcXVlc3RVcmwpIHtcclxuICAgIGxldCBwYXJzZWRVcmwgPSB1cmwucGFyc2UocmVxdWVzdFVybCk7XHJcbiAgICByZXR1cm4gcGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcclxufVxyXG5leHBvcnRzLmlzSHR0cHMgPSBpc0h0dHBzO1xyXG52YXIgRW52aXJvbm1lbnRWYXJpYWJsZXM7XHJcbihmdW5jdGlvbiAoRW52aXJvbm1lbnRWYXJpYWJsZXMpIHtcclxuICAgIEVudmlyb25tZW50VmFyaWFibGVzW1wiSFRUUF9QUk9YWVwiXSA9IFwiSFRUUF9QUk9YWVwiO1xyXG4gICAgRW52aXJvbm1lbnRWYXJpYWJsZXNbXCJIVFRQU19QUk9YWVwiXSA9IFwiSFRUUFNfUFJPWFlcIjtcclxuICAgIEVudmlyb25tZW50VmFyaWFibGVzW1wiTk9fUFJPWFlcIl0gPSBcIk5PX1BST1hZXCI7XHJcbn0pKEVudmlyb25tZW50VmFyaWFibGVzIHx8IChFbnZpcm9ubWVudFZhcmlhYmxlcyA9IHt9KSk7XHJcbmNsYXNzIEh0dHBDbGllbnQge1xyXG4gICAgY29uc3RydWN0b3IodXNlckFnZW50LCBoYW5kbGVycywgcmVxdWVzdE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl9pZ25vcmVTc2xFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2FsbG93UmVkaXJlY3RzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9hbGxvd1JlZGlyZWN0RG93bmdyYWRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4UmVkaXJlY3RzID0gNTA7XHJcbiAgICAgICAgdGhpcy5fYWxsb3dSZXRyaWVzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4UmV0cmllcyA9IDE7XHJcbiAgICAgICAgdGhpcy5fa2VlcEFsaXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGlzcG9zZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVzZXJBZ2VudCA9IHVzZXJBZ2VudDtcclxuICAgICAgICB0aGlzLmhhbmRsZXJzID0gaGFuZGxlcnMgfHwgW107XHJcbiAgICAgICAgbGV0IG5vX3Byb3h5ID0gcHJvY2Vzcy5lbnZbRW52aXJvbm1lbnRWYXJpYWJsZXMuTk9fUFJPWFldO1xyXG4gICAgICAgIGlmIChub19wcm94eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9odHRwUHJveHlCeXBhc3NIb3N0cyA9IFtdO1xyXG4gICAgICAgICAgICBub19wcm94eS5zcGxpdCgnLCcpLmZvckVhY2goYnlwYXNzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2h0dHBQcm94eUJ5cGFzc0hvc3RzLnB1c2gobmV3IFJlZ0V4cChieXBhc3MsICdpJykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0T3B0aW9ucyA9IHJlcXVlc3RPcHRpb25zO1xyXG4gICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMuaWdub3JlU3NsRXJyb3IgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faWdub3JlU3NsRXJyb3IgPSByZXF1ZXN0T3B0aW9ucy5pZ25vcmVTc2xFcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zb2NrZXRUaW1lb3V0ID0gcmVxdWVzdE9wdGlvbnMuc29ja2V0VGltZW91dDtcclxuICAgICAgICAgICAgdGhpcy5faHR0cFByb3h5ID0gcmVxdWVzdE9wdGlvbnMucHJveHk7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5wcm94eSAmJiByZXF1ZXN0T3B0aW9ucy5wcm94eS5wcm94eUJ5cGFzc0hvc3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9odHRwUHJveHlCeXBhc3NIb3N0cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdE9wdGlvbnMucHJveHkucHJveHlCeXBhc3NIb3N0cy5mb3JFYWNoKGJ5cGFzcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faHR0cFByb3h5QnlwYXNzSG9zdHMucHVzaChuZXcgUmVnRXhwKGJ5cGFzcywgJ2knKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9jZXJ0Q29uZmlnID0gcmVxdWVzdE9wdGlvbnMuY2VydDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NlcnRDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHVzaW5nIGNlcnQsIG5lZWQgZnNcclxuICAgICAgICAgICAgICAgIGZzID0gcmVxdWlyZSgnZnMnKTtcclxuICAgICAgICAgICAgICAgIC8vIGNhY2hlIHRoZSBjZXJ0IGNvbnRlbnQgaW50byBtZW1vcnksIHNvIHdlIGRvbid0IGhhdmUgdG8gcmVhZCBpdCBmcm9tIGRpc2sgZXZlcnkgdGltZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NlcnRDb25maWcuY2FGaWxlICYmIGZzLmV4aXN0c1N5bmModGhpcy5fY2VydENvbmZpZy5jYUZpbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2EgPSBmcy5yZWFkRmlsZVN5bmModGhpcy5fY2VydENvbmZpZy5jYUZpbGUsICd1dGY4Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2VydENvbmZpZy5jZXJ0RmlsZSAmJiBmcy5leGlzdHNTeW5jKHRoaXMuX2NlcnRDb25maWcuY2VydEZpbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2VydCA9IGZzLnJlYWRGaWxlU3luYyh0aGlzLl9jZXJ0Q29uZmlnLmNlcnRGaWxlLCAndXRmOCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NlcnRDb25maWcua2V5RmlsZSAmJiBmcy5leGlzdHNTeW5jKHRoaXMuX2NlcnRDb25maWcua2V5RmlsZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXkgPSBmcy5yZWFkRmlsZVN5bmModGhpcy5fY2VydENvbmZpZy5rZXlGaWxlLCAndXRmOCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5hbGxvd1JlZGlyZWN0cyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbGxvd1JlZGlyZWN0cyA9IHJlcXVlc3RPcHRpb25zLmFsbG93UmVkaXJlY3RzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5hbGxvd1JlZGlyZWN0RG93bmdyYWRlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FsbG93UmVkaXJlY3REb3duZ3JhZGUgPSByZXF1ZXN0T3B0aW9ucy5hbGxvd1JlZGlyZWN0RG93bmdyYWRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5tYXhSZWRpcmVjdHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4UmVkaXJlY3RzID0gTWF0aC5tYXgocmVxdWVzdE9wdGlvbnMubWF4UmVkaXJlY3RzLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMua2VlcEFsaXZlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2tlZXBBbGl2ZSA9IHJlcXVlc3RPcHRpb25zLmtlZXBBbGl2ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMuYWxsb3dSZXRyaWVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FsbG93UmV0cmllcyA9IHJlcXVlc3RPcHRpb25zLmFsbG93UmV0cmllcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMubWF4UmV0cmllcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhSZXRyaWVzID0gcmVxdWVzdE9wdGlvbnMubWF4UmV0cmllcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9wdGlvbnMocmVxdWVzdFVybCwgYWRkaXRpb25hbEhlYWRlcnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdPUFRJT05TJywgcmVxdWVzdFVybCwgbnVsbCwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xyXG4gICAgfVxyXG4gICAgZ2V0KHJlcXVlc3RVcmwsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnR0VUJywgcmVxdWVzdFVybCwgbnVsbCwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xyXG4gICAgfVxyXG4gICAgZGVsKHJlcXVlc3RVcmwsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnREVMRVRFJywgcmVxdWVzdFVybCwgbnVsbCwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xyXG4gICAgfVxyXG4gICAgcG9zdChyZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCByZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XHJcbiAgICB9XHJcbiAgICBwYXRjaChyZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BBVENIJywgcmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xyXG4gICAgfVxyXG4gICAgcHV0KHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUFVUJywgcmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xyXG4gICAgfVxyXG4gICAgaGVhZChyZXF1ZXN0VXJsLCBhZGRpdGlvbmFsSGVhZGVycykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0hFQUQnLCByZXF1ZXN0VXJsLCBudWxsLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XHJcbiAgICB9XHJcbiAgICBzZW5kU3RyZWFtKHZlcmIsIHJlcXVlc3RVcmwsIHN0cmVhbSwgYWRkaXRpb25hbEhlYWRlcnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHZlcmIsIHJlcXVlc3RVcmwsIHN0cmVhbSwgYWRkaXRpb25hbEhlYWRlcnMpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWtlcyBhIHJhdyBodHRwIHJlcXVlc3QuXHJcbiAgICAgKiBBbGwgb3RoZXIgbWV0aG9kcyBzdWNoIGFzIGdldCwgcG9zdCwgcGF0Y2gsIGFuZCByZXF1ZXN0IHVsdGltYXRlbHkgY2FsbCB0aGlzLlxyXG4gICAgICogUHJlZmVyIGdldCwgZGVsLCBwb3N0IGFuZCBwYXRjaFxyXG4gICAgICovXHJcbiAgICByZXF1ZXN0KHZlcmIsIHJlcXVlc3RVcmwsIGRhdGEsIGhlYWRlcnMpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGlzcG9zZWQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNsaWVudCBoYXMgYWxyZWFkeSBiZWVuIGRpc3Bvc2VkLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGFyc2VkVXJsID0gdXJsLnBhcnNlKHJlcXVlc3RVcmwpO1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IHRoaXMuX3ByZXBhcmVSZXF1ZXN0KHZlcmIsIHBhcnNlZFVybCwgaGVhZGVycyk7XHJcbiAgICAgICAgICAgIC8vIE9ubHkgcGVyZm9ybSByZXRyaWVzIG9uIHJlYWRzIHNpbmNlIHdyaXRlcyBtYXkgbm90IGJlIGlkZW1wb3RlbnQuXHJcbiAgICAgICAgICAgIGxldCBtYXhUcmllcyA9ICh0aGlzLl9hbGxvd1JldHJpZXMgJiYgUmV0cnlhYmxlSHR0cFZlcmJzLmluZGV4T2YodmVyYikgIT0gLTEpID8gdGhpcy5fbWF4UmV0cmllcyArIDEgOiAxO1xyXG4gICAgICAgICAgICBsZXQgbnVtVHJpZXMgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcmVzcG9uc2U7XHJcbiAgICAgICAgICAgIHdoaWxlIChudW1UcmllcyA8IG1heFRyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IHlpZWxkIHRoaXMucmVxdWVzdFJhdyhpbmZvLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGl0J3MgYW4gYXV0aGVudGljYXRpb24gY2hhbGxlbmdlXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UubWVzc2FnZSAmJiByZXNwb25zZS5tZXNzYWdlLnN0YXR1c0NvZGUgPT09IEh0dHBDb2Rlcy5VbmF1dGhvcml6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXV0aGVudGljYXRpb25IYW5kbGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oYW5kbGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVyc1tpXS5jYW5IYW5kbGVBdXRoZW50aWNhdGlvbihyZXNwb25zZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uSGFuZGxlciA9IHRoaXMuaGFuZGxlcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXV0aGVudGljYXRpb25IYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoZW50aWNhdGlvbkhhbmRsZXIuaGFuZGxlQXV0aGVudGljYXRpb24odGhpcywgaW5mbywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHJlY2VpdmVkIGFuIHVuYXV0aG9yaXplZCByZXNwb25zZSBidXQgaGF2ZSBubyBoYW5kbGVycyB0byBoYW5kbGUgaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIExldCB0aGUgcmVzcG9uc2UgcmV0dXJuIHRvIHRoZSBjYWxsZXIuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVkaXJlY3RzUmVtYWluaW5nID0gdGhpcy5fbWF4UmVkaXJlY3RzO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKEh0dHBSZWRpcmVjdENvZGVzLmluZGV4T2YocmVzcG9uc2UubWVzc2FnZS5zdGF0dXNDb2RlKSAhPSAtMVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX2FsbG93UmVkaXJlY3RzXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgcmVkaXJlY3RzUmVtYWluaW5nID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZGlyZWN0VXJsID0gcmVzcG9uc2UubWVzc2FnZS5oZWFkZXJzW1wibG9jYXRpb25cIl07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWRpcmVjdFVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSdzIG5vIGxvY2F0aW9uIHRvIHJlZGlyZWN0IHRvLCB3ZSB3b24ndFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlZFJlZGlyZWN0VXJsID0gdXJsLnBhcnNlKHJlZGlyZWN0VXJsKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VkVXJsLnByb3RvY29sID09ICdodHRwczonICYmIHBhcnNlZFVybC5wcm90b2NvbCAhPSBwYXJzZWRSZWRpcmVjdFVybC5wcm90b2NvbCAmJiAhdGhpcy5fYWxsb3dSZWRpcmVjdERvd25ncmFkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWRpcmVjdCBmcm9tIEhUVFBTIHRvIEhUVFAgcHJvdG9jb2wuIFRoaXMgZG93bmdyYWRlIGlzIG5vdCBhbGxvd2VkIGZvciBzZWN1cml0eSByZWFzb25zLiBJZiB5b3Ugd2FudCB0byBhbGxvdyB0aGlzIGJlaGF2aW9yLCBzZXQgdGhlIGFsbG93UmVkaXJlY3REb3duZ3JhZGUgb3B0aW9uIHRvIHRydWUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGZpbmlzaCByZWFkaW5nIHRoZSByZXNwb25zZSBiZWZvcmUgcmVhc3NpZ25pbmcgcmVzcG9uc2VcclxuICAgICAgICAgICAgICAgICAgICAvLyB3aGljaCB3aWxsIGxlYWsgdGhlIG9wZW4gc29ja2V0LlxyXG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHJlc3BvbnNlLnJlYWRCb2R5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0J3MgbWFrZSB0aGUgcmVxdWVzdCB3aXRoIHRoZSBuZXcgcmVkaXJlY3RVcmxcclxuICAgICAgICAgICAgICAgICAgICBpbmZvID0gdGhpcy5fcHJlcGFyZVJlcXVlc3QodmVyYiwgcGFyc2VkUmVkaXJlY3RVcmwsIGhlYWRlcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0geWllbGQgdGhpcy5yZXF1ZXN0UmF3KGluZm8sIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0c1JlbWFpbmluZy0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKEh0dHBSZXNwb25zZVJldHJ5Q29kZXMuaW5kZXhPZihyZXNwb25zZS5tZXNzYWdlLnN0YXR1c0NvZGUpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgbm90IGEgcmV0cnkgY29kZSwgcmV0dXJuIGltbWVkaWF0ZWx5IGluc3RlYWQgb2YgcmV0cnlpbmdcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBudW1UcmllcyArPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKG51bVRyaWVzIDwgbWF4VHJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB5aWVsZCByZXNwb25zZS5yZWFkQm9keSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuX3BlcmZvcm1FeHBvbmVudGlhbEJhY2tvZmYobnVtVHJpZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogTmVlZHMgdG8gYmUgY2FsbGVkIGlmIGtlZXBBbGl2ZSBpcyBzZXQgdG8gdHJ1ZSBpbiByZXF1ZXN0IG9wdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FnZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FnZW50LmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZGlzcG9zZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSYXcgcmVxdWVzdC5cclxuICAgICAqIEBwYXJhbSBpbmZvXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICovXHJcbiAgICByZXF1ZXN0UmF3KGluZm8sIGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2tGb3JSZXN1bHQgPSBmdW5jdGlvbiAoZXJyLCByZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0UmF3V2l0aENhbGxiYWNrKGluZm8sIGRhdGEsIGNhbGxiYWNrRm9yUmVzdWx0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmF3IHJlcXVlc3Qgd2l0aCBjYWxsYmFjay5cclxuICAgICAqIEBwYXJhbSBpbmZvXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICogQHBhcmFtIG9uUmVzdWx0XHJcbiAgICAgKi9cclxuICAgIHJlcXVlc3RSYXdXaXRoQ2FsbGJhY2soaW5mbywgZGF0YSwgb25SZXN1bHQpIHtcclxuICAgICAgICBsZXQgc29ja2V0O1xyXG4gICAgICAgIGxldCBpc0RhdGFTdHJpbmcgPSB0eXBlb2YgKGRhdGEpID09PSAnc3RyaW5nJztcclxuICAgICAgICBpZiAodHlwZW9mIChkYXRhKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgaW5mby5vcHRpb25zLmhlYWRlcnNbXCJDb250ZW50LUxlbmd0aFwiXSA9IEJ1ZmZlci5ieXRlTGVuZ3RoKGRhdGEsICd1dGY4Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjYWxsYmFja0NhbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBoYW5kbGVSZXN1bHQgPSAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjYWxsYmFja0NhbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tDYWxsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgb25SZXN1bHQoZXJyLCByZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgcmVxID0gaW5mby5odHRwTW9kdWxlLnJlcXVlc3QoaW5mby5vcHRpb25zLCAobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXMgPSBuZXcgSHR0cENsaWVudFJlc3BvbnNlKG1zZyk7XHJcbiAgICAgICAgICAgIGhhbmRsZVJlc3VsdChudWxsLCByZXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlcS5vbignc29ja2V0JywgKHNvY2spID0+IHtcclxuICAgICAgICAgICAgc29ja2V0ID0gc29jaztcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBJZiB3ZSBldmVyIGdldCBkaXNjb25uZWN0ZWQsIHdlIHdhbnQgdGhlIHNvY2tldCB0byB0aW1lb3V0IGV2ZW50dWFsbHlcclxuICAgICAgICByZXEuc2V0VGltZW91dCh0aGlzLl9zb2NrZXRUaW1lb3V0IHx8IDMgKiA2MDAwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc29ja2V0KSB7XHJcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaGFuZGxlUmVzdWx0KG5ldyBFcnJvcignUmVxdWVzdCB0aW1lb3V0OiAnICsgaW5mby5vcHRpb25zLnBhdGgpLCBudWxsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAvLyBlcnIgaGFzIHN0YXR1c0NvZGUgcHJvcGVydHlcclxuICAgICAgICAgICAgLy8gcmVzIHNob3VsZCBoYXZlIGhlYWRlcnNcclxuICAgICAgICAgICAgaGFuZGxlUmVzdWx0KGVyciwgbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGRhdGEgJiYgdHlwZW9mIChkYXRhKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmVxLndyaXRlKGRhdGEsICd1dGY4Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhICYmIHR5cGVvZiAoZGF0YSkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGRhdGEub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmVxLmVuZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZGF0YS5waXBlKHJlcSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXEuZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3ByZXBhcmVSZXF1ZXN0KG1ldGhvZCwgcmVxdWVzdFVybCwgaGVhZGVycykge1xyXG4gICAgICAgIGNvbnN0IGluZm8gPSB7fTtcclxuICAgICAgICBpbmZvLnBhcnNlZFVybCA9IHJlcXVlc3RVcmw7XHJcbiAgICAgICAgY29uc3QgdXNpbmdTc2wgPSBpbmZvLnBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XHJcbiAgICAgICAgaW5mby5odHRwTW9kdWxlID0gdXNpbmdTc2wgPyBodHRwcyA6IGh0dHA7XHJcbiAgICAgICAgY29uc3QgZGVmYXVsdFBvcnQgPSB1c2luZ1NzbCA/IDQ0MyA6IDgwO1xyXG4gICAgICAgIGluZm8ub3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIGluZm8ub3B0aW9ucy5ob3N0ID0gaW5mby5wYXJzZWRVcmwuaG9zdG5hbWU7XHJcbiAgICAgICAgaW5mby5vcHRpb25zLnBvcnQgPSBpbmZvLnBhcnNlZFVybC5wb3J0ID8gcGFyc2VJbnQoaW5mby5wYXJzZWRVcmwucG9ydCkgOiBkZWZhdWx0UG9ydDtcclxuICAgICAgICBpbmZvLm9wdGlvbnMucGF0aCA9IChpbmZvLnBhcnNlZFVybC5wYXRobmFtZSB8fCAnJykgKyAoaW5mby5wYXJzZWRVcmwuc2VhcmNoIHx8ICcnKTtcclxuICAgICAgICBpbmZvLm9wdGlvbnMubWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIGluZm8ub3B0aW9ucy5oZWFkZXJzID0gdGhpcy5fbWVyZ2VIZWFkZXJzKGhlYWRlcnMpO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJBZ2VudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGluZm8ub3B0aW9ucy5oZWFkZXJzW1widXNlci1hZ2VudFwiXSA9IHRoaXMudXNlckFnZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmZvLm9wdGlvbnMuYWdlbnQgPSB0aGlzLl9nZXRBZ2VudChpbmZvLnBhcnNlZFVybCk7XHJcbiAgICAgICAgLy8gZ2l2ZXMgaGFuZGxlcnMgYW4gb3Bwb3J0dW5pdHkgdG8gcGFydGljaXBhdGVcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVycyAmJiAhdGhpcy5faXNQcmVzaWduZWQodXJsLmZvcm1hdChyZXF1ZXN0VXJsKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyLnByZXBhcmVSZXF1ZXN0KGluZm8ub3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxuICAgIF9pc1ByZXNpZ25lZChyZXF1ZXN0VXJsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVxdWVzdE9wdGlvbnMgJiYgdGhpcy5yZXF1ZXN0T3B0aW9ucy5wcmVzaWduZWRVcmxQYXR0ZXJucykge1xyXG4gICAgICAgICAgICBjb25zdCBwYXR0ZXJucyA9IHRoaXMucmVxdWVzdE9wdGlvbnMucHJlc2lnbmVkVXJsUGF0dGVybnM7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0dGVybnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0VXJsLm1hdGNoKHBhdHRlcm5zW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIF9tZXJnZUhlYWRlcnMoaGVhZGVycykge1xyXG4gICAgICAgIGNvbnN0IGxvd2VyY2FzZUtleXMgPSBvYmogPT4gT2JqZWN0LmtleXMob2JqKS5yZWR1Y2UoKGMsIGspID0+IChjW2sudG9Mb3dlckNhc2UoKV0gPSBvYmpba10sIGMpLCB7fSk7XHJcbiAgICAgICAgaWYgKHRoaXMucmVxdWVzdE9wdGlvbnMgJiYgdGhpcy5yZXF1ZXN0T3B0aW9ucy5oZWFkZXJzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBsb3dlcmNhc2VLZXlzKHRoaXMucmVxdWVzdE9wdGlvbnMuaGVhZGVycyksIGxvd2VyY2FzZUtleXMoaGVhZGVycykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbG93ZXJjYXNlS2V5cyhoZWFkZXJzIHx8IHt9KTtcclxuICAgIH1cclxuICAgIF9nZXRBZ2VudChwYXJzZWRVcmwpIHtcclxuICAgICAgICBsZXQgYWdlbnQ7XHJcbiAgICAgICAgbGV0IHByb3h5ID0gdGhpcy5fZ2V0UHJveHkocGFyc2VkVXJsKTtcclxuICAgICAgICBsZXQgdXNlUHJveHkgPSBwcm94eS5wcm94eVVybCAmJiBwcm94eS5wcm94eVVybC5ob3N0bmFtZSAmJiAhdGhpcy5faXNNYXRjaEluQnlwYXNzUHJveHlMaXN0KHBhcnNlZFVybCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2tlZXBBbGl2ZSAmJiB1c2VQcm94eSkge1xyXG4gICAgICAgICAgICBhZ2VudCA9IHRoaXMuX3Byb3h5QWdlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9rZWVwQWxpdmUgJiYgIXVzZVByb3h5KSB7XHJcbiAgICAgICAgICAgIGFnZW50ID0gdGhpcy5fYWdlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIGFnZW50IGlzIGFscmVhZHkgYXNzaWduZWQgdXNlIHRoYXQgYWdlbnQuXHJcbiAgICAgICAgaWYgKCEhYWdlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFnZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB1c2luZ1NzbCA9IHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XHJcbiAgICAgICAgbGV0IG1heFNvY2tldHMgPSAxMDA7XHJcbiAgICAgICAgaWYgKCEhdGhpcy5yZXF1ZXN0T3B0aW9ucykge1xyXG4gICAgICAgICAgICBtYXhTb2NrZXRzID0gdGhpcy5yZXF1ZXN0T3B0aW9ucy5tYXhTb2NrZXRzIHx8IGh0dHAuZ2xvYmFsQWdlbnQubWF4U29ja2V0cztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVzZVByb3h5KSB7XHJcbiAgICAgICAgICAgIC8vIElmIHVzaW5nIHByb3h5LCBuZWVkIHR1bm5lbFxyXG4gICAgICAgICAgICBpZiAoIXR1bm5lbCkge1xyXG4gICAgICAgICAgICAgICAgdHVubmVsID0gcmVxdWlyZSgndHVubmVsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgYWdlbnRPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgbWF4U29ja2V0czogbWF4U29ja2V0cyxcclxuICAgICAgICAgICAgICAgIGtlZXBBbGl2ZTogdGhpcy5fa2VlcEFsaXZlLFxyXG4gICAgICAgICAgICAgICAgcHJveHk6IHtcclxuICAgICAgICAgICAgICAgICAgICBwcm94eUF1dGg6IHByb3h5LnByb3h5QXV0aCxcclxuICAgICAgICAgICAgICAgICAgICBob3N0OiBwcm94eS5wcm94eVVybC5ob3N0bmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBwb3J0OiBwcm94eS5wcm94eVVybC5wb3J0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsZXQgdHVubmVsQWdlbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG92ZXJIdHRwcyA9IHByb3h5LnByb3h5VXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcclxuICAgICAgICAgICAgaWYgKHVzaW5nU3NsKSB7XHJcbiAgICAgICAgICAgICAgICB0dW5uZWxBZ2VudCA9IG92ZXJIdHRwcyA/IHR1bm5lbC5odHRwc092ZXJIdHRwcyA6IHR1bm5lbC5odHRwc092ZXJIdHRwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHVubmVsQWdlbnQgPSBvdmVySHR0cHMgPyB0dW5uZWwuaHR0cE92ZXJIdHRwcyA6IHR1bm5lbC5odHRwT3Zlckh0dHA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWdlbnQgPSB0dW5uZWxBZ2VudChhZ2VudE9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm94eUFnZW50ID0gYWdlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIHJldXNpbmcgYWdlbnQgYWNyb3NzIHJlcXVlc3QgYW5kIHR1bm5lbGluZyBhZ2VudCBpc24ndCBhc3NpZ25lZCBjcmVhdGUgYSBuZXcgYWdlbnRcclxuICAgICAgICBpZiAodGhpcy5fa2VlcEFsaXZlICYmICFhZ2VudCkge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0geyBrZWVwQWxpdmU6IHRoaXMuX2tlZXBBbGl2ZSwgbWF4U29ja2V0czogbWF4U29ja2V0cyB9O1xyXG4gICAgICAgICAgICBhZ2VudCA9IHVzaW5nU3NsID8gbmV3IGh0dHBzLkFnZW50KG9wdGlvbnMpIDogbmV3IGh0dHAuQWdlbnQob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FnZW50ID0gYWdlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIG5vdCB1c2luZyBwcml2YXRlIGFnZW50IGFuZCB0dW5uZWwgYWdlbnQgaXNuJ3Qgc2V0dXAgdGhlbiB1c2UgZ2xvYmFsIGFnZW50XHJcbiAgICAgICAgaWYgKCFhZ2VudCkge1xyXG4gICAgICAgICAgICBhZ2VudCA9IHVzaW5nU3NsID8gaHR0cHMuZ2xvYmFsQWdlbnQgOiBodHRwLmdsb2JhbEFnZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXNpbmdTc2wgJiYgdGhpcy5faWdub3JlU3NsRXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0byBzZXQgTk9ERV9UTFNfUkVKRUNUX1VOQVVUSE9SSVpFRD0wIHNpbmNlIHRoYXQgd2lsbCBhZmZlY3QgcmVxdWVzdCBmb3IgZW50aXJlIHByb2Nlc3NcclxuICAgICAgICAgICAgLy8gaHR0cC5SZXF1ZXN0T3B0aW9ucyBkb2Vzbid0IGV4cG9zZSBhIHdheSB0byBtb2RpZnkgUmVxdWVzdE9wdGlvbnMuYWdlbnQub3B0aW9uc1xyXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIGNhc3QgaXQgdG8gYW55IGFuZCBjaGFuZ2UgaXQgZGlyZWN0bHlcclxuICAgICAgICAgICAgYWdlbnQub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oYWdlbnQub3B0aW9ucyB8fCB7fSwgeyByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXNpbmdTc2wgJiYgdGhpcy5fY2VydENvbmZpZykge1xyXG4gICAgICAgICAgICBhZ2VudC5vcHRpb25zID0gT2JqZWN0LmFzc2lnbihhZ2VudC5vcHRpb25zIHx8IHt9LCB7IGNhOiB0aGlzLl9jYSwgY2VydDogdGhpcy5fY2VydCwga2V5OiB0aGlzLl9rZXksIHBhc3NwaHJhc2U6IHRoaXMuX2NlcnRDb25maWcucGFzc3BocmFzZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFnZW50O1xyXG4gICAgfVxyXG4gICAgX2dldFByb3h5KHBhcnNlZFVybCkge1xyXG4gICAgICAgIGxldCB1c2luZ1NzbCA9IHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XHJcbiAgICAgICAgbGV0IHByb3h5Q29uZmlnID0gdGhpcy5faHR0cFByb3h5O1xyXG4gICAgICAgIC8vIGZhbGxiYWNrIHRvIGh0dHBfcHJveHkgYW5kIGh0dHBzX3Byb3h5IGVudlxyXG4gICAgICAgIGxldCBodHRwc19wcm94eSA9IHByb2Nlc3MuZW52W0Vudmlyb25tZW50VmFyaWFibGVzLkhUVFBTX1BST1hZXTtcclxuICAgICAgICBsZXQgaHR0cF9wcm94eSA9IHByb2Nlc3MuZW52W0Vudmlyb25tZW50VmFyaWFibGVzLkhUVFBfUFJPWFldO1xyXG4gICAgICAgIGlmICghcHJveHlDb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKGh0dHBzX3Byb3h5ICYmIHVzaW5nU3NsKSB7XHJcbiAgICAgICAgICAgICAgICBwcm94eUNvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBwcm94eVVybDogaHR0cHNfcHJveHlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaHR0cF9wcm94eSkge1xyXG4gICAgICAgICAgICAgICAgcHJveHlDb25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJveHlVcmw6IGh0dHBfcHJveHlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHByb3h5VXJsO1xyXG4gICAgICAgIGxldCBwcm94eUF1dGg7XHJcbiAgICAgICAgaWYgKHByb3h5Q29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm94eUNvbmZpZy5wcm94eVVybC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwcm94eVVybCA9IHVybC5wYXJzZShwcm94eUNvbmZpZy5wcm94eVVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByb3h5Q29uZmlnLnByb3h5VXNlcm5hbWUgfHwgcHJveHlDb25maWcucHJveHlQYXNzd29yZCkge1xyXG4gICAgICAgICAgICAgICAgcHJveHlBdXRoID0gcHJveHlDb25maWcucHJveHlVc2VybmFtZSArIFwiOlwiICsgcHJveHlDb25maWcucHJveHlQYXNzd29yZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBwcm94eVVybDogcHJveHlVcmwsIHByb3h5QXV0aDogcHJveHlBdXRoIH07XHJcbiAgICB9XHJcbiAgICBfaXNNYXRjaEluQnlwYXNzUHJveHlMaXN0KHBhcnNlZFVybCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faHR0cFByb3h5QnlwYXNzSG9zdHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYnlwYXNzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faHR0cFByb3h5QnlwYXNzSG9zdHMuZm9yRWFjaChieXBhc3NIb3N0ID0+IHtcclxuICAgICAgICAgICAgaWYgKGJ5cGFzc0hvc3QudGVzdChwYXJzZWRVcmwuaHJlZikpIHtcclxuICAgICAgICAgICAgICAgIGJ5cGFzcyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYnlwYXNzO1xyXG4gICAgfVxyXG4gICAgX3BlcmZvcm1FeHBvbmVudGlhbEJhY2tvZmYocmV0cnlOdW1iZXIpIHtcclxuICAgICAgICByZXRyeU51bWJlciA9IE1hdGgubWluKEV4cG9uZW50aWFsQmFja29mZkNlaWxpbmcsIHJldHJ5TnVtYmVyKTtcclxuICAgICAgICBjb25zdCBtcyA9IEV4cG9uZW50aWFsQmFja29mZlRpbWVTbGljZSAqIE1hdGgucG93KDIsIHJldHJ5TnVtYmVyKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoKSwgbXMpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkh0dHBDbGllbnQgPSBIdHRwQ2xpZW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgcXMgPSByZXF1aXJlKFwicXNcIik7XHJcbmNvbnN0IHVybCA9IHJlcXVpcmUoXCJ1cmxcIik7XHJcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuY29uc3QgemxpYiA9IHJlcXVpcmUoXCJ6bGliXCIpO1xyXG4vKipcclxuICogY3JlYXRlcyBhbiB1cmwgZnJvbSBhIHJlcXVlc3QgdXJsIGFuZCBvcHRpb25hbCBiYXNlIHVybCAoaHR0cDovL3NlcnZlcjo4MDgwKVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2UgLSBhIGZ1bGx5IHF1YWxpZmllZCB1cmwgb3IgcmVsYXRpdmUgcGF0aFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVybCAtIGFuIG9wdGlvbmFsIGJhc2VVcmwgKGh0dHA6Ly9zZXJ2ZXI6ODA4MClcclxuICogQHBhcmFtIHtJUmVxdWVzdE9wdGlvbnN9IG9wdGlvbnMgLSBhbiBvcHRpb25hbCBvcHRpb25zIG9iamVjdCwgY291bGQgaW5jbHVkZSBRdWVyeVBhcmFtZXRlcnMgZS5nLlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gcmVzdWx0YW50IHVybFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0VXJsKHJlc291cmNlLCBiYXNlVXJsLCBxdWVyeVBhcmFtcykge1xyXG4gICAgY29uc3QgcGF0aEFwaSA9IHBhdGgucG9zaXggfHwgcGF0aDtcclxuICAgIGxldCByZXF1ZXN0VXJsID0gJyc7XHJcbiAgICBpZiAoIWJhc2VVcmwpIHtcclxuICAgICAgICByZXF1ZXN0VXJsID0gcmVzb3VyY2U7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICghcmVzb3VyY2UpIHtcclxuICAgICAgICByZXF1ZXN0VXJsID0gYmFzZVVybDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSB1cmwucGFyc2UoYmFzZVVybCk7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0YW50VXJsID0gdXJsLnBhcnNlKHJlc291cmNlKTtcclxuICAgICAgICAvLyByZXNvdXJjZSAoc3BlY2lmaWMgcGVyIHJlcXVlc3QpIGVsZW1lbnRzIHRha2UgcHJpb3JpdHlcclxuICAgICAgICByZXN1bHRhbnRVcmwucHJvdG9jb2wgPSByZXN1bHRhbnRVcmwucHJvdG9jb2wgfHwgYmFzZS5wcm90b2NvbDtcclxuICAgICAgICByZXN1bHRhbnRVcmwuYXV0aCA9IHJlc3VsdGFudFVybC5hdXRoIHx8IGJhc2UuYXV0aDtcclxuICAgICAgICByZXN1bHRhbnRVcmwuaG9zdCA9IHJlc3VsdGFudFVybC5ob3N0IHx8IGJhc2UuaG9zdDtcclxuICAgICAgICByZXN1bHRhbnRVcmwucGF0aG5hbWUgPSBwYXRoQXBpLnJlc29sdmUoYmFzZS5wYXRobmFtZSwgcmVzdWx0YW50VXJsLnBhdGhuYW1lKTtcclxuICAgICAgICBpZiAoIXJlc3VsdGFudFVybC5wYXRobmFtZS5lbmRzV2l0aCgnLycpICYmIHJlc291cmNlLmVuZHNXaXRoKCcvJykpIHtcclxuICAgICAgICAgICAgcmVzdWx0YW50VXJsLnBhdGhuYW1lICs9ICcvJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdFVybCA9IHVybC5mb3JtYXQocmVzdWx0YW50VXJsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBxdWVyeVBhcmFtcyA/XHJcbiAgICAgICAgZ2V0VXJsV2l0aFBhcnNlZFF1ZXJ5UGFyYW1zKHJlcXVlc3RVcmwsIHF1ZXJ5UGFyYW1zKSA6XHJcbiAgICAgICAgcmVxdWVzdFVybDtcclxufVxyXG5leHBvcnRzLmdldFVybCA9IGdldFVybDtcclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0VXJsXHJcbiAqIEBwYXJhbSB7SVJlcXVlc3RRdWVyeVBhcmFtc30gcXVlcnlQYXJhbXNcclxuICogQHJldHVybiB7c3RyaW5nfSAtIFJlcXVlc3QncyBVUkwgd2l0aCBRdWVyeSBQYXJhbWV0ZXJzIGFwcGVuZGVkL3BhcnNlZC5cclxuICovXHJcbmZ1bmN0aW9uIGdldFVybFdpdGhQYXJzZWRRdWVyeVBhcmFtcyhyZXF1ZXN0VXJsLCBxdWVyeVBhcmFtcykge1xyXG4gICAgY29uc3QgdXJsID0gcmVxdWVzdFVybC5yZXBsYWNlKC9cXD8kL2csICcnKTsgLy8gQ2xlYW4gYW55IGV4dHJhIGVuZC1vZi1zdHJpbmcgXCI/XCIgY2hhcmFjdGVyXHJcbiAgICBjb25zdCBwYXJzZWRRdWVyeVBhcmFtcyA9IHFzLnN0cmluZ2lmeShxdWVyeVBhcmFtcy5wYXJhbXMsIGJ1aWxkUGFyYW1zU3RyaW5naWZ5T3B0aW9ucyhxdWVyeVBhcmFtcykpO1xyXG4gICAgcmV0dXJuIGAke3VybH0ke3BhcnNlZFF1ZXJ5UGFyYW1zfWA7XHJcbn1cclxuLyoqXHJcbiAqIEJ1aWxkIG9wdGlvbnMgZm9yIFF1ZXJ5UGFyYW1zIFN0cmluZ2lmeWluZy5cclxuICpcclxuICogQHBhcmFtIHtJUmVxdWVzdFF1ZXJ5UGFyYW1zfSBxdWVyeVBhcmFtc1xyXG4gKiBAcmV0dXJuIHtvYmplY3R9XHJcbiAqL1xyXG5mdW5jdGlvbiBidWlsZFBhcmFtc1N0cmluZ2lmeU9wdGlvbnMocXVlcnlQYXJhbXMpIHtcclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgIGFkZFF1ZXJ5UHJlZml4OiB0cnVlLFxyXG4gICAgICAgIGRlbGltaXRlcjogKHF1ZXJ5UGFyYW1zLm9wdGlvbnMgfHwge30pLnNlcGFyYXRvciB8fCAnJicsXHJcbiAgICAgICAgYWxsb3dEb3RzOiAocXVlcnlQYXJhbXMub3B0aW9ucyB8fCB7fSkuc2hvdWxkQWxsb3dEb3RzIHx8IGZhbHNlLFxyXG4gICAgICAgIGFycmF5Rm9ybWF0OiAocXVlcnlQYXJhbXMub3B0aW9ucyB8fCB7fSkuYXJyYXlGb3JtYXQgfHwgJ3JlcGVhdCcsXHJcbiAgICAgICAgZW5jb2RlVmFsdWVzT25seTogKHF1ZXJ5UGFyYW1zLm9wdGlvbnMgfHwge30pLnNob3VsZE9ubHlFbmNvZGVWYWx1ZXMgfHwgdHJ1ZVxyXG4gICAgfTtcclxuICAgIHJldHVybiBvcHRpb25zO1xyXG59XHJcbi8qKlxyXG4gKiBEZWNvbXByZXNzL0RlY29kZSBnemlwIGVuY29kZWQgSlNPTlxyXG4gKiBVc2luZyBOb2RlLmpzIGJ1aWx0LWluIHpsaWIgbW9kdWxlXHJcbiAqXHJcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXJcclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYXJzZXQ/IC0gb3B0aW9uYWw7IGRlZmF1bHRzIHRvICd1dGYtOCdcclxuICogQHJldHVybiB7UHJvbWlzZTxzdHJpbmc+fVxyXG4gKi9cclxuZnVuY3Rpb24gZGVjb21wcmVzc0d6aXBwZWRDb250ZW50KGJ1ZmZlciwgY2hhcnNldCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICB6bGliLmd1bnppcChidWZmZXIsIGZ1bmN0aW9uIChlcnJvciwgYnVmZmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShidWZmZXIudG9TdHJpbmcoY2hhcnNldCB8fCAndXRmLTgnKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZGVjb21wcmVzc0d6aXBwZWRDb250ZW50ID0gZGVjb21wcmVzc0d6aXBwZWRDb250ZW50O1xyXG4vKipcclxuICogT2J0YWluIFJlc3BvbnNlJ3MgQ29udGVudCBDaGFyc2V0LlxyXG4gKiBUaHJvdWdoIGluc3BlY3RpbmcgYGNvbnRlbnQtdHlwZWAgcmVzcG9uc2UgaGVhZGVyLlxyXG4gKiBJdCBSZXR1cm5zICd1dGYtOCcgaWYgTk8gY2hhcnNldCBzcGVjaWZpZWQvbWF0Y2hlZC5cclxuICpcclxuICogQHBhcmFtIHtJSHR0cENsaWVudFJlc3BvbnNlfSByZXNwb25zZVxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gQ29udGVudCBFbmNvZGluZyBDaGFyc2V0OyBEZWZhdWx0PXV0Zi04XHJcbiAqL1xyXG5mdW5jdGlvbiBvYnRhaW5Db250ZW50Q2hhcnNldChyZXNwb25zZSkge1xyXG4gICAgLy8gRmluZCB0aGUgY2hhcnNldCwgaWYgc3BlY2lmaWVkLlxyXG4gICAgLy8gU2VhcmNoIGZvciB0aGUgYGNoYXJzZXQ9Q0hBUlNFVGAgc3RyaW5nLCBub3QgaW5jbHVkaW5nIGA7LFxcclxcbmBcclxuICAgIC8vIEV4YW1wbGU6IGNvbnRlbnQtdHlwZTogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCdcclxuICAgIC8vIHxfXyBtYXRjaGVzIHdvdWxkIGJlIFsnY2hhcnNldD11dGYtOCcsICd1dGYtOCcsIGluZGV4OiAxOCwgaW5wdXQ6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J11cclxuICAgIC8vIHxfX19fXyBtYXRjaGVzWzFdIHdvdWxkIGhhdmUgdGhlIGNoYXJzZXQgOnRhZGE6ICwgaW4gb3VyIGV4YW1wbGUgaXQncyB1dGYtOFxyXG4gICAgLy8gSG93ZXZlciwgaWYgdGhlIG1hdGNoZXMgQXJyYXkgd2FzIGVtcHR5IG9yIG5vIGNoYXJzZXQgZm91bmQsICd1dGYtOCcgd291bGQgYmUgcmV0dXJuZWQgYnkgZGVmYXVsdC5cclxuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UubWVzc2FnZS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSB8fCAnJztcclxuICAgIGNvbnN0IG1hdGNoZXMgPSBjb250ZW50VHlwZS5tYXRjaCgvY2hhcnNldD0oW147LFxcclxcbl0rKS9pKTtcclxuICAgIHJldHVybiAobWF0Y2hlcyAmJiBtYXRjaGVzWzFdKSA/IG1hdGNoZXNbMV0gOiAndXRmLTgnO1xyXG59XHJcbmV4cG9ydHMub2J0YWluQ29udGVudENoYXJzZXQgPSBvYnRhaW5Db250ZW50Q2hhcnNldDtcclxuIiwiaW1wb3J0IHsgaW5qZWN0YWJsZSB9IGZyb20gXCJpbnZlcnNpZnlcIjtcclxuXHJcbmltcG9ydCB7IElCdWlsZEFnZW50LCBJRXhlY1Jlc3VsdCB9IGZyb20gXCIuLi8uLi9jb3JlL21vZGVsc1wiO1xyXG5cclxuQGluamVjdGFibGUoKVxyXG5jbGFzcyBCdWlsZEFnZW50IGltcGxlbWVudHMgSUJ1aWxkQWdlbnQge1xyXG5cclxuICAgIHB1YmxpYyBnZXQgYWdlbnROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXRBZ2VudE5hbWVcIik7XHJcbiAgICAgICAgcmV0dXJuIFwiTW9ja1wiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5kKHRvb2xOYW1lOiBzdHJpbmcsIHZlcnNpb25TcGVjOiBzdHJpbmcsIGFyY2g/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmluZFwiKTtcclxuICAgICAgICByZXR1cm4gXCJmaW5kXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhY2hlRGlyKHNvdXJjZURpcjogc3RyaW5nLCB0b29sOiBzdHJpbmcsIHZlcnNpb246IHN0cmluZywgYXJjaD86IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjYWNoZURpclwiKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFwiY2FjaGVEaXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZVRlbXBEaXIoKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZVRlbXBEaXJcIik7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcImNyZWF0ZVRlbXBEaXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlYnVnKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGVidWdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEZhaWxlZChtZXNzYWdlOiBzdHJpbmcsIGRvbmU/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXRGYWlsZWRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFN1Y2NlZWRlZChtZXNzYWdlOiBzdHJpbmcsIGRvbmU/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXRTdWNjZWVkZWRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4cG9ydFZhcmlhYmxlKG5hbWU6IHN0cmluZywgdmFsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImV4cG9ydFZhcmlhYmxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRWYXJpYWJsZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0VmFyaWFibGVcIik7XHJcbiAgICAgICAgcmV0dXJuIFwiZ2V0VmFyaWFibGVcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUGF0aChpbnB1dFBhdGg6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWRkUGF0aFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd2hpY2godG9vbDogc3RyaW5nLCBjaGVjaz86IGJvb2xlYW4pOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwid2hpY2hcIik7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcIndoaWNoXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleGVjKGV4ZWM6IHN0cmluZywgYXJnczogc3RyaW5nW10pOiBQcm9taXNlPElFeGVjUmVzdWx0PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XHJcbiAgICAgICAgICAgIGNvZGU6IDAsXHJcbiAgICAgICAgICAgIGVycm9yOiBudWxsLFxyXG4gICAgICAgICAgICBzdGRlcnI6IFwicmVzdWx0LnN0ZGVyclwiLFxyXG4gICAgICAgICAgICBzdGRvdXQ6IFwicmVzdWx0LnN0ZG91dFwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTb3VyY2VEaXIoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdldFNvdXJjZURpclwiKTtcclxuICAgICAgICByZXR1cm4gXCJnZXRTb3VyY2VEaXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0T3V0cHV0KG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2V0T3V0cHV0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbnB1dChpbnB1dDogc3RyaW5nLCByZXF1aXJlZD86IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0SW5wdXRcIik7XHJcbiAgICAgICAgcmV0dXJuIFwiZ2V0SW5wdXRcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGlzdElucHV0KGlucHV0OiBzdHJpbmcsIHJlcXVpcmVkPzogYm9vbGVhbik6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdldExpc3RJbnB1dFwiKTtcclxuICAgICAgICByZXR1cm4gW1wiZ2V0SW5wdXRcIl07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEJvb2xlYW5JbnB1dChpbnB1dDogc3RyaW5nLCByZXF1aXJlZD86IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdldEJvb2xlYW5JbnB1dFwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzVmFsaWRJbnB1dEZpbGUoaW5wdXQ6IHN0cmluZywgZmlsZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpc1ZhbGlkSW5wdXRGaWxlXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmlsZUV4aXN0cyhmaWxlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZpbGVFeGlzdHNcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXJlY3RvcnlFeGlzdHMoZmlsZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJkaXJlY3RvcnlFeGlzdHNcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgQnVpbGRBZ2VudCxcclxufTtcclxuIiwiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCAqIGFzIG9zIGZyb20gXCJvc1wiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcInR5cGVkLXJlc3QtY2xpZW50L0h0dHBDbGllbnRcIjtcclxuXHJcbmltcG9ydCB7IGluamVjdCwgaW5qZWN0YWJsZSB9IGZyb20gXCJpbnZlcnNpZnlcIjtcclxuaW1wb3J0IHsgVFlQRVMsIElFeGVjUmVzdWx0LCBJQnVpbGRBZ2VudCB9IGZyb20gXCIuL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBJVmVyc2lvbk1hbmFnZXIgfSBmcm9tIFwiLi92ZXJzaW9uTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRG90bmV0VG9vbCB7XHJcbiAgICBkaXNhYmxlVGVsZW1ldHJ5KCk6IHZvaWQ7XHJcbiAgICB0b29sSW5zdGFsbCh0b29sTmFtZTogc3RyaW5nLCB2ZXJzaW9uU3BlYzogc3RyaW5nLCBjaGVja0xhdGVzdDogYm9vbGVhbiwgaW5jbHVkZVByZTogYm9vbGVhbik6IFByb21pc2U8c3RyaW5nPjtcclxufVxyXG5cclxuQGluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRG90bmV0VG9vbCBpbXBsZW1lbnRzIElEb3RuZXRUb29sIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgYnVpbGRBZ2VudDogSUJ1aWxkQWdlbnQ7XHJcbiAgICBwcm90ZWN0ZWQgdmVyc2lvbk1hbmFnZXI6IElWZXJzaW9uTWFuYWdlcjtcclxuICAgIHByaXZhdGUgaHR0cENsaWVudDogaHR0cC5IdHRwQ2xpZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIEBpbmplY3QoVFlQRVMuSUJ1aWxkQWdlbnQpIGJ1aWxkQWdlbnQ6IElCdWlsZEFnZW50LFxyXG4gICAgICAgIEBpbmplY3QoVFlQRVMuSVZlcnNpb25NYW5hZ2VyKSB2ZXJzaW9uTWFuYWdlcjogSVZlcnNpb25NYW5hZ2VyLFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5idWlsZEFnZW50ID0gYnVpbGRBZ2VudDtcclxuICAgICAgICB0aGlzLnZlcnNpb25NYW5hZ2VyID0gdmVyc2lvbk1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5odHRwQ2xpZW50ID0gbmV3IGh0dHAuSHR0cENsaWVudChcImRvdG5ldFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzYWJsZVRlbGVtZXRyeSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZXhwb3J0VmFyaWFibGUoXCJET1RORVRfQ0xJX1RFTEVNRVRSWV9PUFRPVVRcIiwgXCIxXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlKGNtZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSk6IFByb21pc2U8SUV4ZWNSZXN1bHQ+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgQ29tbWFuZDogJHtjbWR9ICR7YXJncy5qb2luKCcgJyl9YCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRBZ2VudC5leGVjKGNtZCwgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHRvb2xJbnN0YWxsKHRvb2xOYW1lOiBzdHJpbmcsIHZlcnNpb25TcGVjOiBzdHJpbmcsIGNoZWNrTGF0ZXN0OiBib29sZWFuLCBpbmNsdWRlUHJlOiBib29sZWFuKVxyXG4gICAgOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coYEluc3RhbGxpbmcgJHt0b29sTmFtZX0gdmVyc2lvbiBgICsgdmVyc2lvblNwZWMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZlcnNpb25NYW5hZ2VyLmlzRXhwbGljaXRWZXJzaW9uKHZlcnNpb25TcGVjKSkge1xyXG4gICAgICAgICAgICBjaGVja0xhdGVzdCA9IGZhbHNlOyAvLyBjaGVjayBsYXRlc3QgZG9lc24ndCBtYWtlIHNlbnNlIHdoZW4gZXhwbGljaXQgdmVyc2lvblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRvb2xQYXRoOiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKCFjaGVja0xhdGVzdCkge1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAvLyBMZXQncyB0cnkgYW5kIHJlc29sdmUgdGhlIHZlcnNpb24gc3BlYyBsb2NhbGx5IGZpcnN0XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIHRvb2xQYXRoID0gdGhpcy5idWlsZEFnZW50LmZpbmQodG9vbE5hbWUsIHZlcnNpb25TcGVjKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdG9vbFBhdGgpIHtcclxuICAgICAgICAgICAgbGV0IHZlcnNpb246IHN0cmluZztcclxuICAgICAgICAgICAgaWYgKHRoaXMudmVyc2lvbk1hbmFnZXIuaXNFeHBsaWNpdFZlcnNpb24odmVyc2lvblNwZWMpKSB7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gRXhwbGljaXQgdmVyc2lvbiB3YXMgc3BlY2lmaWVkLiBObyBuZWVkIHRvIHF1ZXJ5IGZvciBsaXN0IG9mIHZlcnNpb25zLlxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIHZlcnNpb24gPSB2ZXJzaW9uU3BlYztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyBMZXQncyBxdWVyeSBhbmQgcmVzb2x2ZSB0aGUgbGF0ZXN0IHZlcnNpb24gZm9yIHRoZSB2ZXJzaW9uU3BlYy5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSB2ZXJzaW9uIGlzIGFuIGV4cGxpY2l0IHZlcnNpb24gKDEuMS4xIG9yIHYxLjEuMSkgdGhlbiBubyBuZWVkIHRvIHF1ZXJ5LlxyXG4gICAgICAgICAgICAgICAgLy8gSWYgeW91ciB0b29sIGRvZXNuJ3Qgb2ZmZXIgYSBtZWNoYW5pc20gdG8gcXVlcnksXHJcbiAgICAgICAgICAgICAgICAvLyB0aGVuIGl0IGNhbiBvbmx5IHN1cHBvcnQgZXhhY3QgdmVyc2lvbiBpbnB1dHMuXHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgdmVyc2lvbiA9IGF3YWl0IHRoaXMucXVlcnlMYXRlc3RNYXRjaCh0b29sTmFtZSwgdmVyc2lvblNwZWMsIGluY2x1ZGVQcmUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gZmluZCAke3Rvb2xOYW1lfSB2ZXJzaW9uICcke3ZlcnNpb25TcGVjfScuYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRoZSBjYWNoZSBmb3IgdGhlIHJlc29sdmVkIHZlcnNpb24uXHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgdG9vbFBhdGggPSB0aGlzLmJ1aWxkQWdlbnQuZmluZCh0b29sTmFtZSwgdmVyc2lvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0b29sUGF0aCkge1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vIERvd25sb2FkLCBleHRyYWN0LCBjYWNoZVxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIHRvb2xQYXRoID0gYXdhaXQgdGhpcy5hY3F1aXJlVG9vbCh0b29sTmFtZSwgdmVyc2lvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gUHJlcGVuZCB0aGUgdG9vbHMgcGF0aC4gVGhpcyBwcmVwZW5kcyB0aGUgUEFUSCBmb3IgdGhlIGN1cnJlbnQgcHJvY2VzcyBhbmRcclxuICAgICAgICAvLyBpbnN0cnVjdHMgdGhlIGFnZW50IHRvIHByZXBlbmQgZm9yIGVhY2ggdGFzayB0aGF0IGZvbGxvd3MuXHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZGVidWcoYHRvb2xQYXRoOiAke3Rvb2xQYXRofWApO1xyXG5cclxuICAgICAgICBpZiAob3MucGxhdGZvcm0oKSAhPT0gXCJ3aW4zMlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRvdG5ldFJvb3QgPSBwYXRoLmRpcm5hbWUoZnMucmVhZGxpbmtTeW5jKGF3YWl0IHRoaXMuYnVpbGRBZ2VudC53aGljaChcImRvdG5ldFwiKSkpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZXhwb3J0VmFyaWFibGUoXCJET1RORVRfUk9PVFwiLCBkb3RuZXRSb290KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5idWlsZEFnZW50LmFkZFBhdGgodG9vbFBhdGgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdG9vbFBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBxdWVyeUxhdGVzdE1hdGNoKHRvb2xOYW1lOiBzdHJpbmcsIHZlcnNpb25TcGVjOiBzdHJpbmcsIGluY2x1ZGVQcmVyZWxlYXNlOiBib29sZWFuKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZGVidWcoYHF1ZXJ5aW5nIHRvb2wgdmVyc2lvbnMgZm9yICR7dG9vbE5hbWV9JHt2ZXJzaW9uU3BlYyA/IGBAJHt2ZXJzaW9uU3BlY31gIDogXCJcIn0gJHtpbmNsdWRlUHJlcmVsZWFzZSA/IFwiaW5jbHVkaW5nIHByZS1yZWxlYXNlc1wiIDogXCJcIn1gKTtcclxuXHJcbiAgICAgICAgY29uc3QgZG93bmxvYWRQYXRoID0gYGh0dHBzOi8vYXBpLXYydjNzZWFyY2gtMC5udWdldC5vcmcvcXVlcnk/cT0ke2VuY29kZVVSSUNvbXBvbmVudCh0b29sTmFtZS50b0xvd2VyQ2FzZSgpKX0mcHJlcmVsZWFzZT0ke2luY2x1ZGVQcmVyZWxlYXNlID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9JnNlbVZlckxldmVsPTIuMC4wYDtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmh0dHBDbGllbnQuZ2V0KGRvd25sb2FkUGF0aCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzIHx8IHJlcy5tZXNzYWdlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJvZHk6IHN0cmluZyA9IGF3YWl0IHJlcy5yZWFkQm9keSgpO1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGJvZHkpLmRhdGE7XHJcblxyXG4gICAgICAgIGNvbnN0IHZlcnNpb25zID0gKGRhdGFbMF0udmVyc2lvbnMgYXMgeyB2ZXJzaW9uOiBzdHJpbmcgfVtdKS5tYXAoKHgpID0+IHgudmVyc2lvbik7XHJcbiAgICAgICAgaWYgKCF2ZXJzaW9ucyB8fCAhdmVyc2lvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5idWlsZEFnZW50LmRlYnVnKGBnb3QgdmVyc2lvbnM6ICR7dmVyc2lvbnMuam9pbihcIiwgXCIpfWApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy52ZXJzaW9uTWFuYWdlci5ldmFsdWF0ZVZlcnNpb25zKHZlcnNpb25zLCB2ZXJzaW9uU3BlYyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBhY3F1aXJlVG9vbCh0b29sTmFtZTogc3RyaW5nLCB2ZXJzaW9uOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cclxuICAgICAgICBjb25zdCB0ZW1wRGlyZWN0b3J5ID0gYXdhaXQgdGhpcy5idWlsZEFnZW50LmNyZWF0ZVRlbXBEaXIoKTtcclxuICAgICAgICBsZXQgYXJncyA9IFtcInRvb2xcIiwgXCJpbnN0YWxsXCIsIHRvb2xOYW1lLCBcIi0tdG9vbC1wYXRoXCIsIHRlbXBEaXJlY3RvcnldO1xyXG5cclxuICAgICAgICBpZiAodmVyc2lvbikge1xyXG4gICAgICAgICAgICB2ZXJzaW9uID0gdGhpcy52ZXJzaW9uTWFuYWdlci5jbGVhblZlcnNpb24odmVyc2lvbik7XHJcbiAgICAgICAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdChbXCItLXZlcnNpb25cIiwgdmVyc2lvbl0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5leGVjdXRlKFwiZG90bmV0XCIsIGFyZ3MpO1xyXG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IHJlc3VsdC5jb2RlID09PSAwID8gXCJzdWNjZXNzXCIgOiBcImZhaWx1cmVcIjtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gcmVzdWx0LmNvZGUgPT09IDAgPyByZXN1bHQuc3Rkb3V0IDogcmVzdWx0LnN0ZGVycjtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZEFnZW50LmRlYnVnKGB0b29sIGluc3RhbGwgcmVzdWx0OiAke3N0YXR1c30gJHttZXNzYWdlfWApO1xyXG5cclxuICAgICAgICBpZiAocmVzdWx0LmNvZGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgaW5zdGFsbGluZyB0b29sXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYnVpbGRBZ2VudC5jYWNoZURpcih0ZW1wRGlyZWN0b3J5LCB0b29sTmFtZSwgdmVyc2lvbik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDb250YWluZXIgfSBmcm9tIFwiaW52ZXJzaWZ5XCI7XHJcbmltcG9ydCB7IElWZXJzaW9uTWFuYWdlciwgVmVyc2lvbk1hbmFnZXIgfSBmcm9tIFwiLi92ZXJzaW9uTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUWVBFUywgSUJ1aWxkQWdlbnQgfSBmcm9tIFwiLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgQnVpbGRBZ2VudCB9IGZyb20gXCIuLi9hZ2VudC9tb2NrL2J1aWxkLWFnZW50XCI7XHJcblxyXG5jb25zdCBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyKCk7XHJcblxyXG5jb250YWluZXIuYmluZDxJVmVyc2lvbk1hbmFnZXI+KFRZUEVTLklWZXJzaW9uTWFuYWdlcikudG8oVmVyc2lvbk1hbmFnZXIpO1xyXG5jb250YWluZXIuYmluZDxJQnVpbGRBZ2VudD4oVFlQRVMuSUJ1aWxkQWdlbnQpLnRvKEJ1aWxkQWdlbnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGFpbmVyO1xyXG4iLCJleHBvcnQgY29uc3QgVFlQRVMgPSB7XHJcbiAgICBJQnVpbGRBZ2VudDogU3ltYm9sLmZvcihcIkJ1aWxkQWdlbnRcIiksXHJcbiAgICBJRG90bmV0VG9vbDogU3ltYm9sLmZvcihcIkRvdG5ldFRvb2xcIiksXHJcbiAgICBJR2l0VmVyc2lvblRvb2w6IFN5bWJvbC5mb3IoXCJHaXRWZXJzaW9uVG9vbFwiKSxcclxuICAgIElHaXRSZWxlYXNlTWFuYWdlclRvb2w6IFN5bWJvbC5mb3IoXCJHaXRSZWxlYXNlTWFuYWdlclRvb2xcIiksXHJcbiAgICBJVmVyc2lvbk1hbmFnZXI6IFN5bWJvbC5mb3IoXCJWZXJzaW9uTWFuYWdlclwiKSxcclxufTtcclxuXHJcbmV4cG9ydCBlbnVtIFNldHVwRmllbGRzIHtcclxuICAgIGluY2x1ZGVQcmVyZWxlYXNlID0gXCJpbmNsdWRlUHJlcmVsZWFzZVwiLFxyXG4gICAgdmVyc2lvblNwZWMgPSBcInZlcnNpb25TcGVjXCIsXHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTZXR1cFNldHRpbmdzIHtcclxuICAgIFtTZXR1cEZpZWxkcy52ZXJzaW9uU3BlY106IHN0cmluZztcclxuICAgIFtTZXR1cEZpZWxkcy5pbmNsdWRlUHJlcmVsZWFzZV06IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUV4ZWNSZXN1bHQge1xyXG4gICAgc3Rkb3V0OiBzdHJpbmc7XHJcbiAgICBzdGRlcnI6IHN0cmluZztcclxuICAgIGNvZGU6IG51bWJlcjtcclxuICAgIGVycm9yOiBFcnJvcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQnVpbGRBZ2VudCB7XHJcbiAgICBhZ2VudE5hbWU6IHN0cmluZztcclxuICAgIGZpbmQodG9vbE5hbWU6IHN0cmluZywgdmVyc2lvblNwZWM6IHN0cmluZywgYXJjaD86IHN0cmluZyk6IHN0cmluZztcclxuICAgIGNhY2hlRGlyKHNvdXJjZURpcjogc3RyaW5nLCB0b29sOiBzdHJpbmcsIHZlcnNpb246IHN0cmluZywgYXJjaD86IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPjtcclxuICAgIGNyZWF0ZVRlbXBEaXIoKTogUHJvbWlzZTxzdHJpbmc+O1xyXG4gICAgZGVidWcobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuICAgIHNldEZhaWxlZChtZXNzYWdlOiBzdHJpbmcsIGRvbmU/OiBib29sZWFuKTogdm9pZDtcclxuICAgIHNldFN1Y2NlZWRlZChtZXNzYWdlOiBzdHJpbmcsIGRvbmU/OiBib29sZWFuKTogdm9pZDtcclxuICAgIGV4cG9ydFZhcmlhYmxlKG5hbWU6IHN0cmluZywgdmFsOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgZ2V0VmFyaWFibGUobmFtZTogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgYWRkUGF0aChpbnB1dFBhdGg6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICB3aGljaCh0b29sOiBzdHJpbmcsIGNoZWNrPzogYm9vbGVhbik6IFByb21pc2U8c3RyaW5nPjtcclxuICAgIGV4ZWMoZXhlYzogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSk6IFByb21pc2U8SUV4ZWNSZXN1bHQ+O1xyXG5cclxuICAgIGdldFNvdXJjZURpcigpOiBzdHJpbmc7XHJcbiAgICBpc1ZhbGlkSW5wdXRGaWxlKGlucHV0OiBzdHJpbmcsIGZpbGU6IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgICBmaWxlRXhpc3RzKGZpbGU6IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgICBkaXJlY3RvcnlFeGlzdHMoZmlsZTogc3RyaW5nKTogYm9vbGVhbjtcclxuXHJcbiAgICBzZXRPdXRwdXQobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZDtcclxuICAgIGdldElucHV0KGlucHV0OiBzdHJpbmcsIHJlcXVpcmVkPzogYm9vbGVhbik6IHN0cmluZztcclxuICAgIGdldExpc3RJbnB1dChpbnB1dDogc3RyaW5nLCByZXF1aXJlZD86IGJvb2xlYW4pOiBzdHJpbmdbXTtcclxuICAgIGdldEJvb2xlYW5JbnB1dChpbnB1dDogc3RyaW5nLCByZXF1aXJlZD86IGJvb2xlYW4pOiBib29sZWFuO1xyXG59IiwiaW1wb3J0IHsgSUJ1aWxkQWdlbnQsIFNldHVwRmllbGRzLCBJU2V0dXBTZXR0aW5ncyB9IGZyb20gXCIuL21vZGVsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzIHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFNldHVwU2V0dGluZ3MoYnVpbGRBZ2VudDogSUJ1aWxkQWdlbnQpOiBJU2V0dXBTZXR0aW5ncyB7XHJcbiAgICAgICAgY29uc3QgdmVyc2lvblNwZWMgPSBidWlsZEFnZW50LmdldElucHV0KFNldHVwRmllbGRzLnZlcnNpb25TcGVjKTtcclxuICAgICAgICBjb25zdCBpbmNsdWRlUHJlcmVsZWFzZSA9IGJ1aWxkQWdlbnQuZ2V0Qm9vbGVhbklucHV0KFNldHVwRmllbGRzLmluY2x1ZGVQcmVyZWxlYXNlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmVyc2lvblNwZWMsXHJcbiAgICAgICAgICAgIGluY2x1ZGVQcmVyZWxlYXNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IGNtcCBmcm9tIFwic2VtdmVyLWNvbXBhcmVcIjtcclxuaW1wb3J0ICogYXMgc2VtdmVyIGZyb20gXCJzZW12ZXJcIjtcclxuaW1wb3J0IHsgaW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSBcImludmVyc2lmeVwiO1xyXG5cclxuaW1wb3J0IHsgSUJ1aWxkQWdlbnQsIFRZUEVTIH0gZnJvbSBcIi4vbW9kZWxzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWZXJzaW9uTWFuYWdlciB7XHJcbiAgICBpc0V4cGxpY2l0VmVyc2lvbih2ZXJzaW9uU3BlYzogc3RyaW5nKTogYm9vbGVhbjtcclxuICAgIGV2YWx1YXRlVmVyc2lvbnModmVyc2lvbnM6IHN0cmluZ1tdLCB2ZXJzaW9uU3BlYzogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgY2xlYW5WZXJzaW9uKHZlcnNpb246IHN0cmluZyk6IHN0cmluZztcclxufVxyXG5cclxuQGluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmVyc2lvbk1hbmFnZXIgaW1wbGVtZW50cyBJVmVyc2lvbk1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgYnVpbGRBZ2VudDogSUJ1aWxkQWdlbnQ7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBAaW5qZWN0KFRZUEVTLklCdWlsZEFnZW50KSBidWlsZEFnZW50OiBJQnVpbGRBZ2VudCxcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuYnVpbGRBZ2VudCA9IGJ1aWxkQWdlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzRXhwbGljaXRWZXJzaW9uKHZlcnNpb25TcGVjOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBjID0gc2VtdmVyLmNsZWFuKHZlcnNpb25TcGVjKTtcclxuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZGVidWcoXCJpc0V4cGxpY2l0OiBcIiArIGMpO1xyXG5cclxuICAgICAgICBjb25zdCB2YWxpZCA9IHNlbXZlci52YWxpZChjKSAhPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYnVpbGRBZ2VudC5kZWJ1ZyhcImV4cGxpY2l0PyBcIiArIHZhbGlkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBldmFsdWF0ZVZlcnNpb25zKHZlcnNpb25zOiBzdHJpbmdbXSwgdmVyc2lvblNwZWM6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHZlcnNpb246IHN0cmluZztcclxuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZGVidWcoXCJldmFsdWF0aW5nIFwiICsgdmVyc2lvbnMubGVuZ3RoICsgXCIgdmVyc2lvbnNcIik7XHJcbiAgICAgICAgdmVyc2lvbnMgPSB2ZXJzaW9ucy5zb3J0KGNtcCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHZlcnNpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgY29uc3QgcG90ZW50aWFsOiBzdHJpbmcgPSB2ZXJzaW9uc1tpXTtcclxuICAgICAgICBjb25zdCBzYXRpc2ZpZWQ6IGJvb2xlYW4gPSBzZW12ZXIuc2F0aXNmaWVzKHBvdGVudGlhbCwgdmVyc2lvblNwZWMpO1xyXG4gICAgICAgIGlmIChzYXRpc2ZpZWQpIHtcclxuICAgICAgICAgICAgdmVyc2lvbiA9IHBvdGVudGlhbDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICAgICBpZiAodmVyc2lvbikge1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZGVidWcoXCJtYXRjaGVkOiBcIiArIHZlcnNpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZGVidWcoXCJtYXRjaCBub3QgZm91bmRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhblZlcnNpb24odmVyc2lvbjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZGVidWcoXCJjbGVhbmluZzogXCIgKyB2ZXJzaW9uKTtcclxuICAgICAgICByZXR1cm4gc2VtdmVyLmNsZWFuKHZlcnNpb24pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSUJ1aWxkQWdlbnQsIFRZUEVTLCBTZXR1cEZpZWxkcyB9IGZyb20gXCIuLi8uLi9jb3JlL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBJR2l0UmVsZWFzZU1hbmFnZXJUb29sLCBHaXRSZWxlYXNlTWFuYWdlclRvb2wgfSBmcm9tIFwiLi4vLi4vdG9vbHMvZ2l0cmVsZWFzZW1hbmFnZXIvdG9vbFwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyBhcyBDb21tb25TZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb3JlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL3Rvb2xzL2dpdHJlbGVhc2VtYW5hZ2VyL3NldHRpbmdzXCI7XHJcblxyXG5pbXBvcnQgY29udGFpbmVyIGZyb20gXCIuLi8uLi9jb3JlL2lvY1wiO1xyXG5cclxuY29udGFpbmVyLmJpbmQ8SUdpdFJlbGVhc2VNYW5hZ2VyVG9vbD4oVFlQRVMuSUdpdFJlbGVhc2VNYW5hZ2VyVG9vbCkudG8oR2l0UmVsZWFzZU1hbmFnZXJUb29sKTtcclxuXHJcbmNvbnN0IGdpdFJlbGVhc2VNYW5hZ2VyVG9vbCA9IGNvbnRhaW5lci5nZXQ8SUdpdFJlbGVhc2VNYW5hZ2VyVG9vbD4oVFlQRVMuSUdpdFJlbGVhc2VNYW5hZ2VyVG9vbCk7XHJcbmNvbnN0IGJ1aWxkQWdlbnQgPSBjb250YWluZXIuZ2V0PElCdWlsZEFnZW50PihUWVBFUy5JQnVpbGRBZ2VudCk7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0dXAoKSB7XHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgICBnaXRSZWxlYXNlTWFuYWdlclRvb2wuZGlzYWJsZVRlbGVtZXRyeSgpO1xyXG5cclxuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IENvbW1vblNldHRpbmdzLmdldFNldHVwU2V0dGluZ3MoYnVpbGRBZ2VudCk7XHJcblxyXG4gICAgICAgIGF3YWl0IGdpdFJlbGVhc2VNYW5hZ2VyVG9vbC5pbnN0YWxsKHNldHRpbmdzLnZlcnNpb25TcGVjLCBzZXR0aW5ncy5pbmNsdWRlUHJlcmVsZWFzZSk7XHJcblxyXG4gICAgICAgIGJ1aWxkQWdlbnQuc2V0U3VjY2VlZGVkKFwiR2l0VmVyc2lvbk1hbmFnZXIgaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseVwiLCB0cnVlKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYnVpbGRBZ2VudC5zZXRGYWlsZWQoZXJyb3IubWVzc2FnZSwgdHJ1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGUoKSB7XHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgICBnaXRSZWxlYXNlTWFuYWdlclRvb2wuZGlzYWJsZVRlbGVtZXRyeSgpO1xyXG5cclxuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IFNldHRpbmdzLmdldENyZWF0ZVNldHRpbmdzKGJ1aWxkQWdlbnQpO1xyXG5cclxuICAgICAgICBhd2FpdCBnaXRSZWxlYXNlTWFuYWdlclRvb2wuY3JlYXRlKHNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgYnVpbGRBZ2VudC5zZXRTdWNjZWVkZWQoXCJHaXRWZXJzaW9uTWFuYWdlciBjcmVhdGVkIHJlbGVhc2Ugc3VjY2Vzc2Z1bGx5XCIsIHRydWUpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBidWlsZEFnZW50LnNldEZhaWxlZChlcnJvci5tZXNzYWdlLCB0cnVlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpc2NhcmQoKSB7XHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgICBnaXRSZWxlYXNlTWFuYWdlclRvb2wuZGlzYWJsZVRlbGVtZXRyeSgpO1xyXG5cclxuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IFNldHRpbmdzLmdldERpc2NhcmRTZXR0aW5ncyhidWlsZEFnZW50KTtcclxuXHJcbiAgICAgICAgYXdhaXQgZ2l0UmVsZWFzZU1hbmFnZXJUb29sLmRpc2NhcmQoc2V0dGluZ3MpO1xyXG5cclxuICAgICAgICBidWlsZEFnZW50LnNldFN1Y2NlZWRlZChcIkdpdFZlcnNpb25NYW5hZ2VyIGRpc2NhcmRlZCByZWxlYXNlIHN1Y2Nlc3NmdWxseVwiLCB0cnVlKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYnVpbGRBZ2VudC5zZXRGYWlsZWQoZXJyb3IubWVzc2FnZSwgdHJ1ZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XHJcbmltcG9ydCB7IHNldHVwIH0gZnJvbSBcIi4vbWFpblwiO1xyXG5cclxuc2V0dXAoKTtcclxuIiwiZXhwb3J0IGVudW0gQ29tbW9uRmllbGRzIHtcclxuICAgIHJlcG9zaXRvcnkgPSBcInJlcG9zaXRvcnlcIixcclxuICAgIG93bmVyID0gXCJvd25lclwiLFxyXG4gICAgdG9rZW4gPSBcInRva2VuXCIsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENyZWF0ZUZpZWxkcyB7XHJcbiAgICBtaWxlc3RvbmUgPSBcIm1pbGVzdG9uZVwiLFxyXG4gICAgcmVsZWFzZU5hbWUgPSBcInJlbGVhc2VOYW1lXCIsXHJcbiAgICBpbnB1dEZpbGVOYW1lID0gXCJpbnB1dEZpbGVOYW1lXCIsXHJcbiAgICBpc1ByZVJlbGVhc2UgPSBcImlzUHJlUmVsZWFzZVwiLFxyXG4gICAgY29tbWl0ID0gXCJjb21taXRcIixcclxuICAgIHRhcmdldERpcmVjdG9yeSA9IFwidGFyZ2V0RGlyZWN0b3J5XCIsXHJcbiAgICBhc3NldHMgPSBcImFzc2V0c1wiLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBEaXNjYXJkRmllbGRzIHtcclxuICAgIG1pbGVzdG9uZSA9IFwibWlsZXN0b25lXCIsXHJcbiAgICB0YXJnZXREaXJlY3RvcnkgPSBcInRhcmdldERpcmVjdG9yeVwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdpdFJlbGVhc2VNYW5hZ2VyU2V0dGluZ3Mge1xyXG4gICAgW0NvbW1vbkZpZWxkcy5yZXBvc2l0b3J5XTogc3RyaW5nO1xyXG4gICAgW0NvbW1vbkZpZWxkcy5vd25lcl06IHN0cmluZztcclxuICAgIFtDb21tb25GaWVsZHMudG9rZW5dOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2l0UmVsZWFzZU1hbmFnZXJDcmVhdGVTZXR0aW5ncyBleHRlbmRzIEdpdFJlbGVhc2VNYW5hZ2VyU2V0dGluZ3Mge1xyXG4gICAgW0NyZWF0ZUZpZWxkcy5taWxlc3RvbmVdOiBzdHJpbmc7XHJcbiAgICBbQ3JlYXRlRmllbGRzLnJlbGVhc2VOYW1lXTogc3RyaW5nO1xyXG4gICAgW0NyZWF0ZUZpZWxkcy5pbnB1dEZpbGVOYW1lXTogc3RyaW5nO1xyXG4gICAgW0NyZWF0ZUZpZWxkcy5pc1ByZVJlbGVhc2VdOiBib29sZWFuO1xyXG4gICAgW0NyZWF0ZUZpZWxkcy5jb21taXRdOiBzdHJpbmc7XHJcbiAgICBbQ3JlYXRlRmllbGRzLnRhcmdldERpcmVjdG9yeV06IHN0cmluZztcclxuICAgIFtDcmVhdGVGaWVsZHMuYXNzZXRzXT86IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdpdFJlbGVhc2VNYW5hZ2VyRGlzY2FyZFNldHRpbmdzIGV4dGVuZHMgR2l0UmVsZWFzZU1hbmFnZXJTZXR0aW5ncyB7XHJcbiAgICBbRGlzY2FyZEZpZWxkcy5taWxlc3RvbmVdOiBzdHJpbmc7XHJcbiAgICBbRGlzY2FyZEZpZWxkcy50YXJnZXREaXJlY3RvcnldOiBzdHJpbmc7XHJcbn0iLCJpbXBvcnQgeyBJQnVpbGRBZ2VudCB9IGZyb20gXCIuLi8uLi9jb3JlL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBHaXRSZWxlYXNlTWFuYWdlclNldHRpbmdzLCBDb21tb25GaWVsZHMsIENyZWF0ZUZpZWxkcywgR2l0UmVsZWFzZU1hbmFnZXJDcmVhdGVTZXR0aW5ncywgRGlzY2FyZEZpZWxkcywgR2l0UmVsZWFzZU1hbmFnZXJEaXNjYXJkU2V0dGluZ3MgfSBmcm9tIFwiLi9tb2RlbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRDcmVhdGVTZXR0aW5ncyhidWlsZEFnZW50OiBJQnVpbGRBZ2VudCkgOiBHaXRSZWxlYXNlTWFuYWdlckNyZWF0ZVNldHRpbmdzIHtcclxuICAgICAgICBjb25zdCBtaWxlc3RvbmUgPSBidWlsZEFnZW50LmdldElucHV0KENyZWF0ZUZpZWxkcy5taWxlc3RvbmUpO1xyXG4gICAgICAgIGNvbnN0IHJlbGVhc2VOYW1lID0gYnVpbGRBZ2VudC5nZXRJbnB1dChDcmVhdGVGaWVsZHMucmVsZWFzZU5hbWUpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0RmlsZU5hbWUgPSBidWlsZEFnZW50LmdldElucHV0KENyZWF0ZUZpZWxkcy5pbnB1dEZpbGVOYW1lKTtcclxuICAgICAgICBjb25zdCBpc1ByZVJlbGVhc2UgPSBidWlsZEFnZW50LmdldEJvb2xlYW5JbnB1dChDcmVhdGVGaWVsZHMuaXNQcmVSZWxlYXNlKTtcclxuICAgICAgICBjb25zdCBjb21taXQgPSBidWlsZEFnZW50LmdldElucHV0KENyZWF0ZUZpZWxkcy5jb21taXQpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldERpcmVjdG9yeSA9IGJ1aWxkQWdlbnQuZ2V0SW5wdXQoQ3JlYXRlRmllbGRzLnRhcmdldERpcmVjdG9yeSk7XHJcbiAgICAgICAgY29uc3QgYXNzZXRzID0gYnVpbGRBZ2VudC5nZXRMaXN0SW5wdXQoQ3JlYXRlRmllbGRzLmFzc2V0cyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbW1vblNldHRpbmdzID0gU2V0dGluZ3MuZ2V0Q29tbW9uU2V0dGluZ3MoYnVpbGRBZ2VudCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4uY29tbW9uU2V0dGluZ3MsXHJcbiAgICAgICAgICAgIG1pbGVzdG9uZSxcclxuICAgICAgICAgICAgcmVsZWFzZU5hbWUsXHJcbiAgICAgICAgICAgIGlucHV0RmlsZU5hbWUsXHJcbiAgICAgICAgICAgIGlzUHJlUmVsZWFzZSxcclxuICAgICAgICAgICAgY29tbWl0LFxyXG4gICAgICAgICAgICB0YXJnZXREaXJlY3RvcnksXHJcbiAgICAgICAgICAgIGFzc2V0c1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldERpc2NhcmRTZXR0aW5ncyhidWlsZEFnZW50OiBJQnVpbGRBZ2VudCkgOiBHaXRSZWxlYXNlTWFuYWdlckRpc2NhcmRTZXR0aW5ncyB7XHJcbiAgICAgICAgY29uc3QgbWlsZXN0b25lID0gYnVpbGRBZ2VudC5nZXRJbnB1dChEaXNjYXJkRmllbGRzLm1pbGVzdG9uZSk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0RGlyZWN0b3J5ID0gYnVpbGRBZ2VudC5nZXRJbnB1dChDcmVhdGVGaWVsZHMudGFyZ2V0RGlyZWN0b3J5KTtcclxuXHJcbiAgICAgICAgY29uc3QgY29tbW9uU2V0dGluZ3MgPSBTZXR0aW5ncy5nZXRDb21tb25TZXR0aW5ncyhidWlsZEFnZW50KTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5jb21tb25TZXR0aW5ncyxcclxuICAgICAgICAgICAgbWlsZXN0b25lLFxyXG4gICAgICAgICAgICB0YXJnZXREaXJlY3RvcnksXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldENvbW1vblNldHRpbmdzKGJ1aWxkQWdlbnQ6IElCdWlsZEFnZW50KTogR2l0UmVsZWFzZU1hbmFnZXJTZXR0aW5ncyB7XHJcbiAgICAgICAgY29uc3Qgb3duZXIgPSBidWlsZEFnZW50LmdldElucHV0KENvbW1vbkZpZWxkcy5vd25lciwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgcmVwb3NpdG9yeSA9IGJ1aWxkQWdlbnQuZ2V0SW5wdXQoQ29tbW9uRmllbGRzLnJlcG9zaXRvcnksIHRydWUpO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gYnVpbGRBZ2VudC5nZXRJbnB1dChDb21tb25GaWVsZHMudG9rZW4sIHRydWUpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBvd25lcixcclxuICAgICAgICAgICAgcmVwb3NpdG9yeSxcclxuICAgICAgICAgICAgdG9rZW5cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuXHJcbmltcG9ydCB7IFRZUEVTLCBJQnVpbGRBZ2VudCwgSUV4ZWNSZXN1bHQgfSBmcm9tIFwiLi4vLi4vY29yZS9tb2RlbHNcIjtcclxuaW1wb3J0IHsgaW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSBcImludmVyc2lmeVwiO1xyXG5pbXBvcnQgeyBEb3RuZXRUb29sLCBJRG90bmV0VG9vbCB9IGZyb20gXCIuLi8uLi9jb3JlL2RvdG5ldC10b29sXCI7XHJcbmltcG9ydCB7IElWZXJzaW9uTWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3JlL3ZlcnNpb25NYW5hZ2VyXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgR2l0UmVsZWFzZU1hbmFnZXJTZXR0aW5ncyxcclxuICAgIEdpdFJlbGVhc2VNYW5hZ2VyQ3JlYXRlU2V0dGluZ3MsXHJcbiAgICBHaXRSZWxlYXNlTWFuYWdlckRpc2NhcmRTZXR0aW5nc1xyXG59IGZyb20gXCIuL21vZGVsc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJR2l0UmVsZWFzZU1hbmFnZXJUb29sIGV4dGVuZHMgSURvdG5ldFRvb2wge1xyXG4gICAgaW5zdGFsbCh2ZXJzaW9uU3BlYzogc3RyaW5nLCBpbmNsdWRlUHJlcmVsZWFzZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD47XHJcbiAgICBjcmVhdGUoc2V0dGluZ3M6IEdpdFJlbGVhc2VNYW5hZ2VyQ3JlYXRlU2V0dGluZ3MpOiBQcm9taXNlPElFeGVjUmVzdWx0PjtcclxuICAgIGRpc2NhcmQoc2V0dGluZ3M6IEdpdFJlbGVhc2VNYW5hZ2VyRGlzY2FyZFNldHRpbmdzKTogUHJvbWlzZTxJRXhlY1Jlc3VsdD47XHJcbn1cclxuXHJcbkBpbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdpdFJlbGVhc2VNYW5hZ2VyVG9vbCBleHRlbmRzIERvdG5ldFRvb2wgaW1wbGVtZW50cyBJR2l0UmVsZWFzZU1hbmFnZXJUb29sIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBAaW5qZWN0KFRZUEVTLklCdWlsZEFnZW50KSBidWlsZEFnZW50OiBJQnVpbGRBZ2VudCxcclxuICAgICAgICBAaW5qZWN0KFRZUEVTLklWZXJzaW9uTWFuYWdlcikgdmVyc2lvbk1hbmFnZXI6IElWZXJzaW9uTWFuYWdlclxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoYnVpbGRBZ2VudCwgdmVyc2lvbk1hbmFnZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBpbnN0YWxsKHZlcnNpb25TcGVjOiBzdHJpbmcsIGluY2x1ZGVQcmVyZWxlYXNlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy50b29sSW5zdGFsbChcIkdpdFJlbGVhc2VNYW5hZ2VyLlRvb2xcIiwgdmVyc2lvblNwZWMsIGZhbHNlLCBpbmNsdWRlUHJlcmVsZWFzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZShzZXR0aW5nczogR2l0UmVsZWFzZU1hbmFnZXJDcmVhdGVTZXR0aW5ncyk6IFByb21pc2U8SUV4ZWNSZXN1bHQ+IHtcclxuICAgICAgICBjb25zdCBhcmdzID0gdGhpcy5nZXRDcmVhdGVBcmd1bWVudHMoc2V0dGluZ3MpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKFwiZG90bmV0LWdpdHJlbGVhc2VtYW5hZ2VyXCIsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNjYXJkKHNldHRpbmdzOiBHaXRSZWxlYXNlTWFuYWdlckRpc2NhcmRTZXR0aW5ncyk6IFByb21pc2U8SUV4ZWNSZXN1bHQ+IHtcclxuICAgICAgICBjb25zdCBhcmdzID0gdGhpcy5nZXREaXNjYXJkQXJndW1lbnRzKHNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShcImRvdG5ldC1naXRyZWxlYXNlbWFuYWdlclwiLCBhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb21tb25Bcmd1bWVudHMoc2V0dGluZ3M6IEdpdFJlbGVhc2VNYW5hZ2VyU2V0dGluZ3MpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgY29uc3QgYXJnczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgYXJncy5wdXNoKFwiLS1vd25lclwiLCBzZXR0aW5ncy5vd25lcik7XHJcbiAgICAgICAgYXJncy5wdXNoKFwiLS1yZXBvc2l0b3J5XCIsIHNldHRpbmdzLnJlcG9zaXRvcnkpO1xyXG4gICAgICAgIGFyZ3MucHVzaChcIi0tdG9rZW5cIiwgc2V0dGluZ3MudG9rZW4pO1xyXG5cclxuICAgICAgICByZXR1cm4gYXJncztcclxuICAgIH1cclxuXHJcbiAgICBnZXREaXNjYXJkQXJndW1lbnRzKHNldHRpbmdzOiBHaXRSZWxlYXNlTWFuYWdlckRpc2NhcmRTZXR0aW5ncyk6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCBhcmdzOiBzdHJpbmdbXSA9IFsnZGlzY2FyZCcsIC4uLnRoaXMuZ2V0Q29tbW9uQXJndW1lbnRzKHNldHRpbmdzKV07XHJcblxyXG4gICAgICAgIGlmIChzZXR0aW5ncy5taWxlc3RvbmUpIHtcclxuICAgICAgICAgICAgYXJncy5wdXNoKFwiLS1taWxlc3RvbmVcIiwgc2V0dGluZ3MubWlsZXN0b25lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0dGluZ3MudGFyZ2V0RGlyZWN0b3J5ID0gdGhpcy5nZXRSZXBvRGlyKHNldHRpbmdzLnRhcmdldERpcmVjdG9yeSk7XHJcblxyXG4gICAgICAgIGFyZ3MucHVzaChcIi0tdGFyZ2V0RGlyZWN0b3J5XCIsIHNldHRpbmdzLnRhcmdldERpcmVjdG9yeSk7XHJcblxyXG4gICAgICAgIHJldHVybiBhcmdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENyZWF0ZUFyZ3VtZW50cyhzZXR0aW5nczogR2l0UmVsZWFzZU1hbmFnZXJDcmVhdGVTZXR0aW5ncyk6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCBhcmdzOiBzdHJpbmdbXSA9IFsnY3JlYXRlJywgLi4udGhpcy5nZXRDb21tb25Bcmd1bWVudHMoc2V0dGluZ3MpXTtcclxuXHJcbiAgICAgICAgaWYgKHNldHRpbmdzLm1pbGVzdG9uZSkge1xyXG4gICAgICAgICAgICBhcmdzLnB1c2goXCItLW1pbGVzdG9uZVwiLCBzZXR0aW5ncy5taWxlc3RvbmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2V0dGluZ3MucmVsZWFzZU5hbWUpIHtcclxuICAgICAgICAgICAgYXJncy5wdXNoKFwiLS1uYW1lXCIsIHNldHRpbmdzLnJlbGVhc2VOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNldHRpbmdzLmNvbW1pdCkge1xyXG4gICAgICAgICAgICBhcmdzLnB1c2goXCItLXRhcmdldGNvbW1pdGlzaFwiLCBzZXR0aW5ncy5jb21taXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0dGluZ3MudGFyZ2V0RGlyZWN0b3J5ID0gdGhpcy5nZXRSZXBvRGlyKHNldHRpbmdzLnRhcmdldERpcmVjdG9yeSk7XHJcblxyXG4gICAgICAgIGFyZ3MucHVzaChcIi0tdGFyZ2V0RGlyZWN0b3J5XCIsIHNldHRpbmdzLnRhcmdldERpcmVjdG9yeSk7XHJcblxyXG4gICAgICAgIGlmIChzZXR0aW5ncy5pbnB1dEZpbGVOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1aWxkQWdlbnQuZmlsZUV4aXN0cyhzZXR0aW5ncy5pbnB1dEZpbGVOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKFwiLS1pbnB1dEZpbGVQYXRoXCIsIHNldHRpbmdzLmlucHV0RmlsZU5hbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2l0UmVsZWFzZU1hbmFnZXIgaW5wdXRGaWxlUGF0aCBub3QgZm91bmQgYXQgXCIgKyBzZXR0aW5ncy5pbnB1dEZpbGVOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2V0dGluZ3MuaXNQcmVSZWxlYXNlKSB7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChcIi0tcHJlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2V0dGluZ3MuYXNzZXRzICYmIHNldHRpbmdzLmFzc2V0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmFzc2V0cyA9IHNldHRpbmdzLmFzc2V0cy5tYXAoYXNzZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGguam9pbihzZXR0aW5ncy50YXJnZXREaXJlY3RvcnksIGFzc2V0KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgYXJncy5wdXNoKFwiLS1hc3NldHNcIiwgc2V0dGluZ3MuYXNzZXRzLmpvaW4oXCIsXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhcmdzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmVwb0Rpcih0YXJnZXRQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB3b3JrRGlyOiBzdHJpbmc7XHJcbiAgICAgICAgY29uc3Qgc3JjRGlyID0gdGhpcy5idWlsZEFnZW50LmdldFNvdXJjZURpcigpO1xyXG4gICAgICAgIGlmICghdGFyZ2V0UGF0aCkge1xyXG4gICAgICAgICAgICB3b3JrRGlyID0gc3JjRGlyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1aWxkQWdlbnQuZGlyZWN0b3J5RXhpc3RzKHRhcmdldFBhdGgpKSB7XHJcbiAgICAgICAgICAgICAgICB3b3JrRGlyID0gcGF0aC5qb2luKHNyY0RpciwgdGFyZ2V0UGF0aCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEaXJlY3Rvcnkgbm90IGZvdW5kIGF0IFwiICsgdGFyZ2V0UGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdvcmtEaXIucmVwbGFjZSgvXFxcXC9nLCBcIi9cIik7XHJcbiAgICB9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXNzZXJ0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRsc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ6bGliXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=