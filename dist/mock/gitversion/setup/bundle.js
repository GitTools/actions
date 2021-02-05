module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/inversify/lib/annotation/decorator_utils.js":
/*!******************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/decorator_utils.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tagProperty = exports.tagParameter = exports.decorate = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.inject = exports.LazyServiceIdentifer = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectable = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.multiInject = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.named = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.optional = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.postConstruct = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tagged = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.targetName = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unmanaged = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Binding = void 0;
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
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingCount = void 0;
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
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STACK_OVERFLOW = exports.CIRCULAR_DEPENDENCY_IN_FACTORY = exports.POST_CONSTRUCT_ERROR = exports.MULTIPLE_POST_CONSTRUCT_METHODS = exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = exports.ARGUMENTS_LENGTH_MISMATCH = exports.INVALID_DECORATOR_OPERATION = exports.INVALID_TO_SELF_VALUE = exports.INVALID_FUNCTION_BINDING = exports.INVALID_MIDDLEWARE_RETURN = exports.NO_MORE_SNAPSHOTS_AVAILABLE = exports.INVALID_BINDING_TYPE = exports.NOT_IMPLEMENTED = exports.CIRCULAR_DEPENDENCY = exports.UNDEFINED_INJECT_ANNOTATION = exports.MISSING_INJECT_ANNOTATION = exports.MISSING_INJECTABLE_ANNOTATION = exports.NOT_REGISTERED = exports.CANNOT_UNBIND = exports.AMBIGUOUS_MATCH = exports.KEY_NOT_FOUND = exports.NULL_ARGUMENT = exports.DUPLICATED_METADATA = exports.DUPLICATED_INJECTABLE_DECORATOR = void 0;
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
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetTypeEnum = exports.BindingTypeEnum = exports.BindingScopeEnum = void 0;
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
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.POST_CONSTRUCT = exports.DESIGN_PARAM_TYPES = exports.PARAM_TYPES = exports.TAGGED_PROP = exports.TAGGED = exports.MULTI_INJECT_TAG = exports.INJECT_TAG = exports.OPTIONAL_TAG = exports.UNMANAGED_TAG = exports.NAME_TAG = exports.NAMED_TAG = void 0;
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Container = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsyncContainerModule = exports.ContainerModule = void 0;
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
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContainerSnapshot = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Lookup = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.METADATA_KEY = void 0;
var keys = __webpack_require__(/*! ./constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
exports.METADATA_KEY = keys;
var container_1 = __webpack_require__(/*! ./container/container */ "./node_modules/inversify/lib/container/container.js");
Object.defineProperty(exports, "Container", ({ enumerable: true, get: function () { return container_1.Container; } }));
var literal_types_1 = __webpack_require__(/*! ./constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
Object.defineProperty(exports, "BindingScopeEnum", ({ enumerable: true, get: function () { return literal_types_1.BindingScopeEnum; } }));
Object.defineProperty(exports, "BindingTypeEnum", ({ enumerable: true, get: function () { return literal_types_1.BindingTypeEnum; } }));
Object.defineProperty(exports, "TargetTypeEnum", ({ enumerable: true, get: function () { return literal_types_1.TargetTypeEnum; } }));
var container_module_1 = __webpack_require__(/*! ./container/container_module */ "./node_modules/inversify/lib/container/container_module.js");
Object.defineProperty(exports, "AsyncContainerModule", ({ enumerable: true, get: function () { return container_module_1.AsyncContainerModule; } }));
Object.defineProperty(exports, "ContainerModule", ({ enumerable: true, get: function () { return container_module_1.ContainerModule; } }));
var injectable_1 = __webpack_require__(/*! ./annotation/injectable */ "./node_modules/inversify/lib/annotation/injectable.js");
Object.defineProperty(exports, "injectable", ({ enumerable: true, get: function () { return injectable_1.injectable; } }));
var tagged_1 = __webpack_require__(/*! ./annotation/tagged */ "./node_modules/inversify/lib/annotation/tagged.js");
Object.defineProperty(exports, "tagged", ({ enumerable: true, get: function () { return tagged_1.tagged; } }));
var named_1 = __webpack_require__(/*! ./annotation/named */ "./node_modules/inversify/lib/annotation/named.js");
Object.defineProperty(exports, "named", ({ enumerable: true, get: function () { return named_1.named; } }));
var inject_1 = __webpack_require__(/*! ./annotation/inject */ "./node_modules/inversify/lib/annotation/inject.js");
Object.defineProperty(exports, "inject", ({ enumerable: true, get: function () { return inject_1.inject; } }));
Object.defineProperty(exports, "LazyServiceIdentifer", ({ enumerable: true, get: function () { return inject_1.LazyServiceIdentifer; } }));
var optional_1 = __webpack_require__(/*! ./annotation/optional */ "./node_modules/inversify/lib/annotation/optional.js");
Object.defineProperty(exports, "optional", ({ enumerable: true, get: function () { return optional_1.optional; } }));
var unmanaged_1 = __webpack_require__(/*! ./annotation/unmanaged */ "./node_modules/inversify/lib/annotation/unmanaged.js");
Object.defineProperty(exports, "unmanaged", ({ enumerable: true, get: function () { return unmanaged_1.unmanaged; } }));
var multi_inject_1 = __webpack_require__(/*! ./annotation/multi_inject */ "./node_modules/inversify/lib/annotation/multi_inject.js");
Object.defineProperty(exports, "multiInject", ({ enumerable: true, get: function () { return multi_inject_1.multiInject; } }));
var target_name_1 = __webpack_require__(/*! ./annotation/target_name */ "./node_modules/inversify/lib/annotation/target_name.js");
Object.defineProperty(exports, "targetName", ({ enumerable: true, get: function () { return target_name_1.targetName; } }));
var post_construct_1 = __webpack_require__(/*! ./annotation/post_construct */ "./node_modules/inversify/lib/annotation/post_construct.js");
Object.defineProperty(exports, "postConstruct", ({ enumerable: true, get: function () { return post_construct_1.postConstruct; } }));
var metadata_reader_1 = __webpack_require__(/*! ./planning/metadata_reader */ "./node_modules/inversify/lib/planning/metadata_reader.js");
Object.defineProperty(exports, "MetadataReader", ({ enumerable: true, get: function () { return metadata_reader_1.MetadataReader; } }));
var id_1 = __webpack_require__(/*! ./utils/id */ "./node_modules/inversify/lib/utils/id.js");
Object.defineProperty(exports, "id", ({ enumerable: true, get: function () { return id_1.id; } }));
var decorator_utils_1 = __webpack_require__(/*! ./annotation/decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
Object.defineProperty(exports, "decorate", ({ enumerable: true, get: function () { return decorator_utils_1.decorate; } }));
var constraint_helpers_1 = __webpack_require__(/*! ./syntax/constraint_helpers */ "./node_modules/inversify/lib/syntax/constraint_helpers.js");
Object.defineProperty(exports, "traverseAncerstors", ({ enumerable: true, get: function () { return constraint_helpers_1.traverseAncerstors; } }));
Object.defineProperty(exports, "taggedConstraint", ({ enumerable: true, get: function () { return constraint_helpers_1.taggedConstraint; } }));
Object.defineProperty(exports, "namedConstraint", ({ enumerable: true, get: function () { return constraint_helpers_1.namedConstraint; } }));
Object.defineProperty(exports, "typeConstraint", ({ enumerable: true, get: function () { return constraint_helpers_1.typeConstraint; } }));
var serialization_1 = __webpack_require__(/*! ./utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
Object.defineProperty(exports, "getServiceIdentifierAsString", ({ enumerable: true, get: function () { return serialization_1.getServiceIdentifierAsString; } }));
var binding_utils_1 = __webpack_require__(/*! ./utils/binding_utils */ "./node_modules/inversify/lib/utils/binding_utils.js");
Object.defineProperty(exports, "multiBindToService", ({ enumerable: true, get: function () { return binding_utils_1.multiBindToService; } }));


/***/ }),

/***/ "./node_modules/inversify/lib/planning/context.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/planning/context.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Context = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Metadata = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataReader = void 0;
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
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Plan = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getBindingDictionary = exports.createMockRequest = exports.plan = void 0;
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
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryableString = void 0;
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFunctionName = exports.getBaseClassDependencyCount = exports.getDependencies = void 0;
var inject_1 = __webpack_require__(/*! ../annotation/inject */ "./node_modules/inversify/lib/annotation/inject.js");
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
Object.defineProperty(exports, "getFunctionName", ({ enumerable: true, get: function () { return serialization_1.getFunctionName; } }));
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
    var targets = __spreadArrays(constructorTargets, propertyTargets);
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
        targets = __spreadArrays(targets, baseTargets);
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Request = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Target = void 0;
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveInstance = void 0;
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
    return new (Func.bind.apply(Func, __spreadArrays([void 0], injections)))();
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolve = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingInSyntax = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingInWhenOnSyntax = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingOnSyntax = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingToSyntax = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingWhenOnSyntax = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindingWhenSyntax = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeConstraint = exports.namedConstraint = exports.taggedConstraint = exports.traverseAncerstors = void 0;
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
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.multiBindToService = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isStackOverflowExeption = void 0;
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
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.id = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.circularDependencyToException = exports.listMetadataForTarget = exports.listRegisteredBindingsForServiceIdentifier = exports.getServiceIdentifierAsString = exports.getFunctionName = void 0;
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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
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
            val = maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
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

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

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

        leaf = obj; // eslint-disable-line no-param-reassign
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
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

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
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
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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
/***/ ((module) => {

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
/***/ (() => {

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
/***/ ((module) => {

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
/***/ ((module, exports) => {

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

/***/ "./src/agent/mock/build-agent.ts":
/*!***************************************!*\
  !*** ./src/agent/mock/build-agent.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BuildAgent = void 0;
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
let BuildAgent = class BuildAgent {
    proxyConfiguration(url) {
        console.log('proxyConfiguration');
        return undefined;
    }
    get agentName() {
        console.log('getAgentName');
        return 'Mock';
    }
    find(toolName, versionSpec, arch) {
        console.log('find');
        return 'find';
    }
    cacheDir(sourceDir, tool, version, arch) {
        console.log('cacheDir');
        return Promise.resolve('cacheDir');
    }
    createTempDir() {
        console.log('createTempDir');
        return Promise.resolve('createTempDir');
    }
    debug(message) {
        console.log('debug');
    }
    setFailed(message, done) {
        console.log('setFailed');
    }
    setSucceeded(message, done) {
        console.log('setSucceeded');
    }
    exportVariable(name, val) {
        console.log('exportVariable');
    }
    getVariable(name) {
        console.log('getVariable');
        return 'getVariable';
    }
    addPath(inputPath) {
        console.log('addPath');
    }
    which(tool, check) {
        console.log('which');
        return Promise.resolve('which');
    }
    exec(exec, args) {
        return Promise.resolve({
            code: 0,
            error: null,
            stderr: 'result.stderr',
            stdout: 'result.stdout'
        });
    }
    getSourceDir() {
        console.log('getSourceDir');
        return 'getSourceDir';
    }
    setOutput(name, value) {
        console.log('setOutput');
    }
    getInput(input, required) {
        console.log('getInput');
        return 'getInput';
    }
    getListInput(input, required) {
        console.log('getListInput');
        return ['getInput'];
    }
    getBooleanInput(input, required) {
        console.log('getBooleanInput');
        return false;
    }
    isValidInputFile(input, file) {
        console.log('isValidInputFile');
        return false;
    }
    fileExists(file) {
        console.log('fileExists');
        return false;
    }
    directoryExists(file) {
        console.log('directoryExists');
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var DotnetTool_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DotnetTool = void 0;
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const os = __importStar(__webpack_require__(/*! os */ "os"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const http = __importStar(__webpack_require__(/*! typed-rest-client/HttpClient */ "./node_modules/typed-rest-client/HttpClient.js"));
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const models_1 = __webpack_require__(/*! ./models */ "./src/core/models.ts");
let DotnetTool = DotnetTool_1 = class DotnetTool {
    constructor(buildAgent, versionManager) {
        this.buildAgent = buildAgent;
        this.versionManager = versionManager;
        this.httpClient = new http.HttpClient('dotnet', undefined, this.buildAgent.proxyConfiguration(DotnetTool_1.nugetRoot));
    }
    disableTelemetry() {
        this.buildAgent.exportVariable('DOTNET_CLI_TELEMETRY_OPTOUT', 'true');
        this.buildAgent.exportVariable('DOTNET_NOLOGO', 'true');
    }
    execute(cmd, args) {
        console.log(`Command: ${cmd} ${args.join(' ')}`);
        return this.buildAgent.exec(cmd, args);
    }
    toolInstall(toolName, versionSpec, checkLatest, includePre) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('');
            console.log('--------------------------');
            console.log(`Installing ${toolName} version ` + versionSpec);
            console.log('--------------------------');
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
            if (os.platform() !== 'win32' &&
                !this.buildAgent.getVariable('DOTNET_ROOT')) {
                let dotnetPath = yield this.buildAgent.which('dotnet');
                dotnetPath = fs.readlinkSync(dotnetPath) || dotnetPath;
                const dotnetRoot = path.dirname(dotnetPath);
                this.buildAgent.exportVariable('DOTNET_ROOT', dotnetRoot);
            }
            this.buildAgent.addPath(toolPath);
            return toolPath;
        });
    }
    queryLatestMatch(toolName, versionSpec, includePrerelease) {
        return __awaiter(this, void 0, void 0, function* () {
            this.buildAgent.debug(`querying tool versions for ${toolName}${versionSpec ? `@${versionSpec}` : ''} ${includePrerelease ? 'including pre-releases' : ''}`);
            const downloadPath = `${DotnetTool_1.nugetRoot}query?q=${encodeURIComponent(toolName.toLowerCase())}&prerelease=${includePrerelease ? 'true' : 'false'}&semVerLevel=2.0.0`;
            const res = yield this.httpClient.get(downloadPath);
            if (!res || res.message.statusCode !== 200) {
                return null;
            }
            const body = yield res.readBody();
            const data = JSON.parse(body).data;
            const versions = data[0].versions.map(x => x.version);
            if (!versions || !versions.length) {
                return null;
            }
            this.buildAgent.debug(`got versions: ${versions.join(', ')}`);
            return this.versionManager.evaluateVersions(versions, versionSpec);
        });
    }
    acquireTool(toolName, version) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempDirectory = yield this.buildAgent.createTempDir();
            let args = ['tool', 'install', toolName, '--tool-path', tempDirectory];
            if (version) {
                version = this.versionManager.cleanVersion(version);
                args = args.concat(['--version', version]);
            }
            const result = yield this.execute('dotnet', args);
            const status = result.code === 0 ? 'success' : 'failure';
            const message = result.code === 0 ? result.stdout : result.stderr;
            this.buildAgent.debug(`tool install result: ${status} ${message}`);
            if (result.code) {
                throw new Error('Error installing tool');
            }
            return yield this.buildAgent.cacheDir(tempDirectory, toolName, version);
        });
    }
};
DotnetTool.nugetRoot = 'https://api-v2v3search-0.nuget.org/';
DotnetTool = DotnetTool_1 = __decorate([
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
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
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetupFields = exports.TYPES = void 0;
exports.TYPES = {
    IBuildAgent: Symbol.for('BuildAgent'),
    IDotnetTool: Symbol.for('DotnetTool'),
    IGitVersionTool: Symbol.for('GitVersionTool'),
    IGitReleaseManagerTool: Symbol.for('GitReleaseManagerTool'),
    IVersionManager: Symbol.for('VersionManager')
};
var SetupFields;
(function (SetupFields) {
    SetupFields["includePrerelease"] = "includePrerelease";
    SetupFields["versionSpec"] = "versionSpec";
})(SetupFields = exports.SetupFields || (exports.SetupFields = {}));


/***/ }),

/***/ "./src/core/settings.ts":
/*!******************************!*\
  !*** ./src/core/settings.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Settings = void 0;
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VersionManager = void 0;
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
        this.buildAgent.debug('isExplicit: ' + c);
        const valid = semver.valid(c) != null;
        this.buildAgent.debug('explicit? ' + valid);
        return valid;
    }
    evaluateVersions(versions, versionSpec) {
        let version;
        this.buildAgent.debug('evaluating ' + versions.length + ' versions');
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
            this.buildAgent.debug('matched: ' + version);
        }
        else {
            this.buildAgent.debug('match not found');
        }
        return version;
    }
    cleanVersion(version) {
        this.buildAgent.debug('cleaning: ' + version);
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

/***/ "./src/tasks/gitversion/main.ts":
/*!**************************************!*\
  !*** ./src/tasks/gitversion/main.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.run = exports.setup = void 0;
const models_1 = __webpack_require__(/*! ../../core/models */ "./src/core/models.ts");
const settings_1 = __webpack_require__(/*! ../../core/settings */ "./src/core/settings.ts");
const settings_2 = __webpack_require__(/*! ../../tools/gitversion/settings */ "./src/tools/gitversion/settings.ts");
const tool_1 = __webpack_require__(/*! ../../tools/gitversion/tool */ "./src/tools/gitversion/tool.ts");
const ioc_1 = __importDefault(__webpack_require__(/*! ../../core/ioc */ "./src/core/ioc.ts"));
ioc_1.default.bind(models_1.TYPES.IGitVersionTool).to(tool_1.GitVersionTool);
const gitVersionTool = ioc_1.default.get(models_1.TYPES.IGitVersionTool);
const buildAgent = ioc_1.default.get(models_1.TYPES.IBuildAgent);
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            gitVersionTool.disableTelemetry();
            const settings = settings_1.Settings.getSetupSettings(buildAgent);
            yield gitVersionTool.install(settings.versionSpec, settings.includePrerelease);
            buildAgent.setSucceeded('GitVersion installed successfully', true);
        }
        catch (error) {
            buildAgent.setFailed(error.message, true);
        }
    });
}
exports.setup = setup;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            gitVersionTool.disableTelemetry();
            const settings = settings_2.Settings.getGitVersionSettings(buildAgent);
            const result = yield gitVersionTool.run(settings);
            const { stdout } = result;
            const jsonOutput = stdout.substring(stdout.indexOf('{'), stdout.indexOf('}') + 1);
            const gitversion = JSON.parse(jsonOutput);
            gitVersionTool.writeGitVersionToAgent(gitversion);
            if (result.code === 0) {
                buildAgent.setSucceeded('GitVersion executed successfully', true);
            }
            else {
                buildAgent.setFailed(result.error.message, true);
            }
        }
        catch (error) {
            buildAgent.setFailed(error, true);
        }
    });
}
exports.run = run;


/***/ }),

/***/ "./src/tasks/gitversion/setup.ts":
/*!***************************************!*\
  !*** ./src/tasks/gitversion/setup.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js");
const main_1 = __webpack_require__(/*! ./main */ "./src/tasks/gitversion/main.ts");
main_1.setup();


/***/ }),

/***/ "./src/tools/gitversion/models.ts":
/*!****************************************!*\
  !*** ./src/tools/gitversion/models.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExecuteFields = void 0;
var ExecuteFields;
(function (ExecuteFields) {
    ExecuteFields["targetPath"] = "targetPath";
    ExecuteFields["useConfigFile"] = "useConfigFile";
    ExecuteFields["configFilePath"] = "configFilePath";
    ExecuteFields["updateAssemblyInfo"] = "updateAssemblyInfo";
    ExecuteFields["updateAssemblyInfoFilename"] = "updateAssemblyInfoFilename";
    ExecuteFields["additionalArguments"] = "additionalArguments";
    ExecuteFields["srcDir"] = "srcDir";
})(ExecuteFields = exports.ExecuteFields || (exports.ExecuteFields = {}));


/***/ }),

/***/ "./src/tools/gitversion/settings.ts":
/*!******************************************!*\
  !*** ./src/tools/gitversion/settings.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Settings = void 0;
const models_1 = __webpack_require__(/*! ./models */ "./src/tools/gitversion/models.ts");
class Settings {
    static getGitVersionSettings(buildAgent) {
        var _a;
        const targetPath = buildAgent.getInput(models_1.ExecuteFields.targetPath);
        const useConfigFile = buildAgent.getBooleanInput(models_1.ExecuteFields.useConfigFile);
        const configFilePath = buildAgent.getInput(models_1.ExecuteFields.configFilePath);
        const updateAssemblyInfo = buildAgent.getBooleanInput(models_1.ExecuteFields.updateAssemblyInfo);
        const updateAssemblyInfoFilename = buildAgent.getInput(models_1.ExecuteFields.updateAssemblyInfoFilename);
        const additionalArguments = buildAgent.getInput(models_1.ExecuteFields.additionalArguments);
        const srcDir = (_a = buildAgent.getSourceDir()) === null || _a === void 0 ? void 0 : _a.replace(/\\/g, '/');
        return {
            targetPath,
            useConfigFile,
            configFilePath,
            updateAssemblyInfo,
            updateAssemblyInfoFilename,
            additionalArguments,
            srcDir
        };
    }
}
exports.Settings = Settings;


/***/ }),

/***/ "./src/tools/gitversion/tool.ts":
/*!**************************************!*\
  !*** ./src/tools/gitversion/tool.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GitVersionTool = void 0;
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
const models_1 = __webpack_require__(/*! ../../core/models */ "./src/core/models.ts");
const dotnet_tool_1 = __webpack_require__(/*! ../../core/dotnet-tool */ "./src/core/dotnet-tool.ts");
let GitVersionTool = class GitVersionTool extends dotnet_tool_1.DotnetTool {
    constructor(buildAgent, versionManager) {
        super(buildAgent, versionManager);
    }
    install(versionSpec, includePrerelease) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.toolInstall('GitVersion.Tool', versionSpec, false, includePrerelease);
        });
    }
    run(options) {
        const workDir = this.getRepoDir(options.targetPath);
        const args = this.getArguments(workDir, options);
        return this.execute('dotnet-gitversion', args);
    }
    getRepoDir(targetPath) {
        let workDir;
        const srcDir = this.buildAgent.getSourceDir() || '.';
        if (!targetPath) {
            workDir = srcDir;
        }
        else {
            if (this.buildAgent.directoryExists(targetPath)) {
                workDir = targetPath;
            }
            else {
                throw new Error('Directory not found at ' + targetPath);
            }
        }
        return workDir.replace(/\\/g, '/');
    }
    getArguments(workDir, options) {
        let args = [workDir, '/output', 'json', '/output', 'buildserver'];
        const { useConfigFile, configFilePath, updateAssemblyInfo, updateAssemblyInfoFilename, additionalArguments } = options;
        if (useConfigFile) {
            if (this.buildAgent.isValidInputFile('configFilePath', configFilePath)) {
                args.push('/config', configFilePath);
            }
            else {
                throw new Error('GitVersion configuration file not found at ' +
                    configFilePath);
            }
        }
        if (updateAssemblyInfo) {
            args.push('/updateassemblyinfo');
            // You can specify 'updateAssemblyInfo' without 'updateAssemblyInfoFilename'.
            if ((updateAssemblyInfoFilename === null || updateAssemblyInfoFilename === void 0 ? void 0 : updateAssemblyInfoFilename.length) > 0) {
                if (this.buildAgent.isValidInputFile('updateAssemblyInfoFilename', updateAssemblyInfoFilename)) {
                    args.push(updateAssemblyInfoFilename);
                }
                else {
                    throw new Error('AssemblyInfoFilename file not found at ' +
                        updateAssemblyInfoFilename);
                }
            }
        }
        if (additionalArguments) {
            args = args.concat(this.argStringToArray(additionalArguments));
        }
        return args;
    }
    writeGitVersionToAgent(gitversion) {
        let properties = Object.keys(gitversion);
        let gitversionOutput = gitversion;
        properties.forEach(property => {
            const name = this.toCamelCase(property);
            const value = gitversionOutput[property];
            this.buildAgent.setOutput(name, value);
        });
    }
    argStringToArray(argString) {
        var args = [];
        var inQuotes = false;
        var escaped = false;
        var lastCharWasSpace = true;
        var arg = '';
        var append = function (c) {
            // we only escape double quotes.
            if (escaped && c !== '"') {
                arg += '\\';
            }
            arg += c;
            escaped = false;
        };
        for (var i = 0; i < argString.length; i++) {
            var c = argString.charAt(i);
            if (c === ' ' && !inQuotes) {
                if (!lastCharWasSpace) {
                    args.push(arg);
                    arg = '';
                }
                lastCharWasSpace = true;
                continue;
            }
            else {
                lastCharWasSpace = false;
            }
            if (c === '"') {
                if (!escaped) {
                    inQuotes = !inQuotes;
                }
                else {
                    append(c);
                }
                continue;
            }
            if (c === '\\' && escaped) {
                append(c);
                continue;
            }
            if (c === '\\' && inQuotes) {
                escaped = true;
                continue;
            }
            append(c);
            lastCharWasSpace = false;
        }
        if (!lastCharWasSpace) {
            args.push(arg.trim());
        }
        return args;
    }
    toCamelCase(input) {
        return input.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
            if (+match === 0)
                return ''; // or if (/\s+/.test(match)) for white spaces
            return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }
};
GitVersionTool = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(models_1.TYPES.IBuildAgent)),
    __param(1, inversify_1.inject(models_1.TYPES.IVersionManager)),
    __metadata("design:paramtypes", [Object, Object])
], GitVersionTool);
exports.GitVersionTool = GitVersionTool;


/***/ }),

/***/ "./node_modules/typed-rest-client/HttpClient.js":
/*!******************************************************!*\
  !*** ./node_modules/typed-rest-client/HttpClient.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
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
const NetworkRetryErrors = ['ECONNRESET', 'ENOTFOUND', 'ESOCKETTIMEDOUT', 'ETIMEDOUT', 'ECONNREFUSED'];
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
                    else {
                        resolve(buffer.toString(encodingCharset));
                    }
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
                try {
                    response = yield this.requestRaw(info, data);
                }
                catch (err) {
                    if (err && err.code && NetworkRetryErrors.indexOf(err.code) > -1) {
                        continue;
                    }
                    throw err;
                }
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
                socket.destroy();
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
        info.options.timeout = (this.requestOptions && this.requestOptions.socketTimeout) || this._socketTimeout;
        this._socketTimeout = info.options.timeout;
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
                tunnel = __webpack_require__(/*! tunnel */ "./node_modules/typed-rest-client/node_modules/tunnel/index.js");
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
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
    const nodeSupportedEncodings = ['ascii', 'utf8', 'utf16le', 'ucs2', 'base64', 'binary', 'hex'];
    const contentType = response.message.headers['content-type'] || '';
    const matches = contentType.match(/charset=([^;,\r\n]+)/i);
    return (matches && matches[1] && nodeSupportedEncodings.indexOf(matches[1]) != -1) ? matches[1] : 'utf-8';
}
exports.obtainContentCharset = obtainContentCharset;


/***/ }),

/***/ "./node_modules/typed-rest-client/node_modules/tunnel/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/typed-rest-client/node_modules/tunnel/index.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/tunnel */ "./node_modules/typed-rest-client/node_modules/tunnel/lib/tunnel.js");


/***/ }),

/***/ "./node_modules/typed-rest-client/node_modules/tunnel/lib/tunnel.js":
/*!**************************************************************************!*\
  !*** ./node_modules/typed-rest-client/node_modules/tunnel/lib/tunnel.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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
  agent.defaultPort = 443;
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
  agent.defaultPort = 443;
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
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
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

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
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

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");;

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");;

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");;

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");;

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/tasks/gitversion/setup.ts");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi9kZWNvcmF0b3JfdXRpbHMuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vaW5qZWN0LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL2luamVjdGFibGUuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vbXVsdGlfaW5qZWN0LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL25hbWVkLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL29wdGlvbmFsLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL3Bvc3RfY29uc3RydWN0LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL3RhZ2dlZC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi90YXJnZXRfbmFtZS5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi91bm1hbmFnZWQuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2JpbmRpbmdzL2JpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2JpbmRpbmdzL2JpbmRpbmdfY291bnQuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnN0YW50cy9lcnJvcl9tc2dzLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9jb25zdGFudHMvbGl0ZXJhbF90eXBlcy5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvY29uc3RhbnRzL21ldGFkYXRhX2tleXMuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnRhaW5lci9jb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnRhaW5lci9jb250YWluZXJfbW9kdWxlLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9jb250YWluZXIvY29udGFpbmVyX3NuYXBzaG90LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9jb250YWluZXIvbG9va3VwLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9pbnZlcnNpZnkuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL2NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL21ldGFkYXRhLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9tZXRhZGF0YV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3BsYW4uanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3BsYW5uZXIuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3F1ZXJ5YWJsZV9zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3JlZmxlY3Rpb25fdXRpbHMuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3RhcmdldC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvcmVzb2x1dGlvbi9pbnN0YW50aWF0aW9uLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9yZXNvbHV0aW9uL3Jlc29sdmVyLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9zeW50YXgvYmluZGluZ19pbl9zeW50YXguanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX2luX3doZW5fb25fc3ludGF4LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9zeW50YXgvYmluZGluZ19vbl9zeW50YXguanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX3RvX3N5bnRheC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvc3ludGF4L2JpbmRpbmdfd2hlbl9vbl9zeW50YXguanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX3doZW5fc3ludGF4LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9zeW50YXgvY29uc3RyYWludF9oZWxwZXJzLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi91dGlscy9iaW5kaW5nX3V0aWxzLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi91dGlscy9leGNlcHRpb25zLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi91dGlscy9pZC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvdXRpbHMvc2VyaWFsaXphdGlvbi5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9mb3JtYXRzLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvcXMvbGliL2luZGV4LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvcXMvbGliL3BhcnNlLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvcXMvbGliL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL3JlZmxlY3QtbWV0YWRhdGEvUmVmbGVjdC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL3NlbXZlci1jb21wYXJlL2luZGV4LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3NlbXZlci5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vc3JjL2FnZW50L21vY2svYnVpbGQtYWdlbnQudHMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL3NyYy9jb3JlL2RvdG5ldC10b29sLnRzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9zcmMvY29yZS9pb2MudHMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL3NyYy9jb3JlL21vZGVscy50cyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vc3JjL2NvcmUvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL3NyYy9jb3JlL3ZlcnNpb25NYW5hZ2VyLnRzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9zcmMvdGFza3MvZ2l0dmVyc2lvbi9tYWluLnRzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9zcmMvdGFza3MvZ2l0dmVyc2lvbi9zZXR1cC50cyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vc3JjL3Rvb2xzL2dpdHZlcnNpb24vbW9kZWxzLnRzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9zcmMvdG9vbHMvZ2l0dmVyc2lvbi9zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vc3JjL3Rvb2xzL2dpdHZlcnNpb24vdG9vbC50cyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL3R5cGVkLXJlc3QtY2xpZW50L0h0dHBDbGllbnQuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy90eXBlZC1yZXN0LWNsaWVudC9VdGlsLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvdHlwZWQtcmVzdC1jbGllbnQvbm9kZV9tb2R1bGVzL3R1bm5lbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL3R5cGVkLXJlc3QtY2xpZW50L25vZGVfbW9kdWxlcy90dW5uZWwvbGliL3R1bm5lbC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zL2V4dGVybmFsIFwiYXNzZXJ0XCIiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy9leHRlcm5hbCBcImV2ZW50c1wiIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy9leHRlcm5hbCBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy9leHRlcm5hbCBcIm5ldFwiIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvZXh0ZXJuYWwgXCJvc1wiIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy9leHRlcm5hbCBcInRsc1wiIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvZXh0ZXJuYWwgXCJ1cmxcIiIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zL2V4dGVybmFsIFwidXRpbFwiIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvZXh0ZXJuYWwgXCJ6bGliXCIiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELG1CQUFtQixHQUFHLG9CQUFvQixHQUFHLGdCQUFnQjtBQUM3RCxpQkFBaUIsbUJBQU8sQ0FBQyxxRkFBeUI7QUFDbEQsbUJBQW1CLG1CQUFPLENBQUMsMkZBQTRCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RSx1Q0FBdUM7QUFDcEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxvQ0FBb0M7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOzs7Ozs7Ozs7Ozs7QUMxREg7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsY0FBYyxHQUFHLDRCQUE0QjtBQUM3QyxtQkFBbUIsbUJBQU8sQ0FBQyxxRkFBeUI7QUFDcEQsbUJBQW1CLG1CQUFPLENBQUMsMkZBQTRCO0FBQ3ZELGlCQUFpQixtQkFBTyxDQUFDLCtFQUFzQjtBQUMvQyx3QkFBd0IsbUJBQU8sQ0FBQyxxRkFBbUI7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQywyQ0FBMkM7QUFDM0MsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkMsMkNBQTJDO0FBQzNDLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLDJDQUEyQztBQUMzQyw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkMsMkNBQTJDO0FBQzNDLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsdUJBQXVCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELDBCQUEwQjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQywwQkFBMEI7Ozs7Ozs7Ozs7O0FDMW1DM0I7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1pBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVMsVUFBVTtBQUNuQixVQUFVLFdBQVc7QUFDckI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9DQUFvQztBQUN4RCwwQkFBMEIsb0NBQW9DO0FBQzlELDBCQUEwQixvQ0FBb0M7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWM7O0FBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHFCQUFxQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsMEJBQTBCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHFC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Ozs7Ozs7OztBQ0FBLGdDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImdpdHZlcnNpb24vc2V0dXAvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRhZ1Byb3BlcnR5ID0gZXhwb3J0cy50YWdQYXJhbWV0ZXIgPSBleHBvcnRzLmRlY29yYXRlID0gdm9pZCAwO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xuZnVuY3Rpb24gdGFnUGFyYW1ldGVyKGFubm90YXRpb25UYXJnZXQsIHByb3BlcnR5TmFtZSwgcGFyYW1ldGVySW5kZXgsIG1ldGFkYXRhKSB7XG4gICAgdmFyIG1ldGFkYXRhS2V5ID0gTUVUQURBVEFfS0VZLlRBR0dFRDtcbiAgICBfdGFnUGFyYW1ldGVyT3JQcm9wZXJ0eShtZXRhZGF0YUtleSwgYW5ub3RhdGlvblRhcmdldCwgcHJvcGVydHlOYW1lLCBtZXRhZGF0YSwgcGFyYW1ldGVySW5kZXgpO1xufVxuZXhwb3J0cy50YWdQYXJhbWV0ZXIgPSB0YWdQYXJhbWV0ZXI7XG5mdW5jdGlvbiB0YWdQcm9wZXJ0eShhbm5vdGF0aW9uVGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIG1ldGFkYXRhKSB7XG4gICAgdmFyIG1ldGFkYXRhS2V5ID0gTUVUQURBVEFfS0VZLlRBR0dFRF9QUk9QO1xuICAgIF90YWdQYXJhbWV0ZXJPclByb3BlcnR5KG1ldGFkYXRhS2V5LCBhbm5vdGF0aW9uVGFyZ2V0LmNvbnN0cnVjdG9yLCBwcm9wZXJ0eU5hbWUsIG1ldGFkYXRhKTtcbn1cbmV4cG9ydHMudGFnUHJvcGVydHkgPSB0YWdQcm9wZXJ0eTtcbmZ1bmN0aW9uIF90YWdQYXJhbWV0ZXJPclByb3BlcnR5KG1ldGFkYXRhS2V5LCBhbm5vdGF0aW9uVGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIG1ldGFkYXRhLCBwYXJhbWV0ZXJJbmRleCkge1xuICAgIHZhciBwYXJhbXNPclByb3BlcnRpZXNNZXRhZGF0YSA9IHt9O1xuICAgIHZhciBpc1BhcmFtZXRlckRlY29yYXRvciA9ICh0eXBlb2YgcGFyYW1ldGVySW5kZXggPT09IFwibnVtYmVyXCIpO1xuICAgIHZhciBrZXkgPSAocGFyYW1ldGVySW5kZXggIT09IHVuZGVmaW5lZCAmJiBpc1BhcmFtZXRlckRlY29yYXRvcikgPyBwYXJhbWV0ZXJJbmRleC50b1N0cmluZygpIDogcHJvcGVydHlOYW1lO1xuICAgIGlmIChpc1BhcmFtZXRlckRlY29yYXRvciAmJiBwcm9wZXJ0eU5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5JTlZBTElEX0RFQ09SQVRPUl9PUEVSQVRJT04pO1xuICAgIH1cbiAgICBpZiAoUmVmbGVjdC5oYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgYW5ub3RhdGlvblRhcmdldCkpIHtcbiAgICAgICAgcGFyYW1zT3JQcm9wZXJ0aWVzTWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCBhbm5vdGF0aW9uVGFyZ2V0KTtcbiAgICB9XG4gICAgdmFyIHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhID0gcGFyYW1zT3JQcm9wZXJ0aWVzTWV0YWRhdGFba2V5XTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocGFyYW1PclByb3BlcnR5TWV0YWRhdGEpKSB7XG4gICAgICAgIHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhID0gW107XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhXzEgPSBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YTsgX2kgPCBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YV8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIG0gPSBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YV8xW19pXTtcbiAgICAgICAgICAgIGlmIChtLmtleSA9PT0gbWV0YWRhdGEua2V5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuRFVQTElDQVRFRF9NRVRBREFUQSArIFwiIFwiICsgbS5rZXkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFyYW1PclByb3BlcnR5TWV0YWRhdGEucHVzaChtZXRhZGF0YSk7XG4gICAgcGFyYW1zT3JQcm9wZXJ0aWVzTWV0YWRhdGFba2V5XSA9IHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhO1xuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEobWV0YWRhdGFLZXksIHBhcmFtc09yUHJvcGVydGllc01ldGFkYXRhLCBhbm5vdGF0aW9uVGFyZ2V0KTtcbn1cbmZ1bmN0aW9uIF9kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQpIHtcbiAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCk7XG59XG5mdW5jdGlvbiBfcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9O1xufVxuZnVuY3Rpb24gZGVjb3JhdGUoZGVjb3JhdG9yLCB0YXJnZXQsIHBhcmFtZXRlckluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbWV0ZXJJbmRleCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBfZGVjb3JhdGUoW19wYXJhbShwYXJhbWV0ZXJJbmRleCwgZGVjb3JhdG9yKV0sIHRhcmdldCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBwYXJhbWV0ZXJJbmRleCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBSZWZsZWN0LmRlY29yYXRlKFtkZWNvcmF0b3JdLCB0YXJnZXQsIHBhcmFtZXRlckluZGV4KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIF9kZWNvcmF0ZShbZGVjb3JhdG9yXSwgdGFyZ2V0KTtcbiAgICB9XG59XG5leHBvcnRzLmRlY29yYXRlID0gZGVjb3JhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5qZWN0ID0gZXhwb3J0cy5MYXp5U2VydmljZUlkZW50aWZlciA9IHZvaWQgMDtcbnZhciBlcnJvcl9tc2dzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JfdXRpbHNcIik7XG52YXIgTGF6eVNlcnZpY2VJZGVudGlmZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExhenlTZXJ2aWNlSWRlbnRpZmVyKGNiKSB7XG4gICAgICAgIHRoaXMuX2NiID0gY2I7XG4gICAgfVxuICAgIExhenlTZXJ2aWNlSWRlbnRpZmVyLnByb3RvdHlwZS51bndyYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYigpO1xuICAgIH07XG4gICAgcmV0dXJuIExhenlTZXJ2aWNlSWRlbnRpZmVyO1xufSgpKTtcbmV4cG9ydHMuTGF6eVNlcnZpY2VJZGVudGlmZXIgPSBMYXp5U2VydmljZUlkZW50aWZlcjtcbmZ1bmN0aW9uIGluamVjdChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4KSB7XG4gICAgICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JfbXNnc18xLlVOREVGSU5FRF9JTkpFQ1RfQU5OT1RBVElPTih0YXJnZXQubmFtZSkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5JTkpFQ1RfVEFHLCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1BhcmFtZXRlcih0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgsIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1Byb3BlcnR5KHRhcmdldCwgdGFyZ2V0S2V5LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5pbmplY3QgPSBpbmplY3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5qZWN0YWJsZSA9IHZvaWQgMDtcbnZhciBFUlJPUlNfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG5mdW5jdGlvbiBpbmplY3RhYmxlKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGlmIChSZWZsZWN0Lmhhc093bk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5QQVJBTV9UWVBFUywgdGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SU19NU0dTLkRVUExJQ0FURURfSU5KRUNUQUJMRV9ERUNPUkFUT1IpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0eXBlcyA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoTUVUQURBVEFfS0VZLkRFU0lHTl9QQVJBTV9UWVBFUywgdGFyZ2V0KSB8fCBbXTtcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShNRVRBREFUQV9LRVkuUEFSQU1fVFlQRVMsIHR5cGVzLCB0YXJnZXQpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH07XG59XG5leHBvcnRzLmluamVjdGFibGUgPSBpbmplY3RhYmxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm11bHRpSW5qZWN0ID0gdm9pZCAwO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yX3V0aWxzXCIpO1xuZnVuY3Rpb24gbXVsdGlJbmplY3Qoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuTVVMVElfSU5KRUNUX1RBRywgc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQcm9wZXJ0eSh0YXJnZXQsIHRhcmdldEtleSwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMubXVsdGlJbmplY3QgPSBtdWx0aUluamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5uYW1lZCA9IHZvaWQgMDtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbnZhciBkZWNvcmF0b3JfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcl91dGlsc1wiKTtcbmZ1bmN0aW9uIG5hbWVkKG5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuTkFNRURfVEFHLCBuYW1lKTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUGFyYW1ldGVyKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUHJvcGVydHkodGFyZ2V0LCB0YXJnZXRLZXksIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLm5hbWVkID0gbmFtZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMub3B0aW9uYWwgPSB2b2lkIDA7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JfdXRpbHNcIik7XG5mdW5jdGlvbiBvcHRpb25hbCgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuT1BUSU9OQUxfVEFHLCB0cnVlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUGFyYW1ldGVyKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUHJvcGVydHkodGFyZ2V0LCB0YXJnZXRLZXksIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLm9wdGlvbmFsID0gb3B0aW9uYWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucG9zdENvbnN0cnVjdCA9IHZvaWQgMDtcbnZhciBFUlJPUlNfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbmZ1bmN0aW9uIHBvc3RDb25zdHJ1Y3QoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5QT1NUX0NPTlNUUlVDVCwgcHJvcGVydHlLZXkpO1xuICAgICAgICBpZiAoUmVmbGVjdC5oYXNPd25NZXRhZGF0YShNRVRBREFUQV9LRVkuUE9TVF9DT05TVFJVQ1QsIHRhcmdldC5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUlNfTVNHUy5NVUxUSVBMRV9QT1NUX0NPTlNUUlVDVF9NRVRIT0RTKTtcbiAgICAgICAgfVxuICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKE1FVEFEQVRBX0tFWS5QT1NUX0NPTlNUUlVDVCwgbWV0YWRhdGEsIHRhcmdldC5jb25zdHJ1Y3Rvcik7XG4gICAgfTtcbn1cbmV4cG9ydHMucG9zdENvbnN0cnVjdCA9IHBvc3RDb25zdHJ1Y3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGFnZ2VkID0gdm9pZCAwO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JfdXRpbHNcIik7XG5mdW5jdGlvbiB0YWdnZWQobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1BhcmFtZXRlcih0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgsIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1Byb3BlcnR5KHRhcmdldCwgdGFyZ2V0S2V5LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy50YWdnZWQgPSB0YWdnZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGFyZ2V0TmFtZSA9IHZvaWQgMDtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbnZhciBkZWNvcmF0b3JfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcl91dGlsc1wiKTtcbmZ1bmN0aW9uIHRhcmdldE5hbWUobmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4KSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5OQU1FX1RBRywgbmFtZSk7XG4gICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1BhcmFtZXRlcih0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgsIG1ldGFkYXRhKTtcbiAgICB9O1xufVxuZXhwb3J0cy50YXJnZXROYW1lID0gdGFyZ2V0TmFtZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51bm1hbmFnZWQgPSB2b2lkIDA7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JfdXRpbHNcIik7XG5mdW5jdGlvbiB1bm1hbmFnZWQoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoTUVUQURBVEFfS0VZLlVOTUFOQUdFRF9UQUcsIHRydWUpO1xuICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgfTtcbn1cbmV4cG9ydHMudW5tYW5hZ2VkID0gdW5tYW5hZ2VkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJpbmRpbmcgPSB2b2lkIDA7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgQmluZGluZyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmluZGluZyhzZXJ2aWNlSWRlbnRpZmllciwgc2NvcGUpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlSWRlbnRpZmllciA9IHNlcnZpY2VJZGVudGlmaWVyO1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uSW52YWxpZDtcbiAgICAgICAgdGhpcy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHsgcmV0dXJuIHRydWU7IH07XG4gICAgICAgIHRoaXMuaW1wbGVtZW50YXRpb25UeXBlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWNoZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmFjdG9yeSA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvdmlkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLm9uQWN0aXZhdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuZHluYW1pY1ZhbHVlID0gbnVsbDtcbiAgICB9XG4gICAgQmluZGluZy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbG9uZSA9IG5ldyBCaW5kaW5nKHRoaXMuc2VydmljZUlkZW50aWZpZXIsIHRoaXMuc2NvcGUpO1xuICAgICAgICBjbG9uZS5hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgY2xvbmUuaW1wbGVtZW50YXRpb25UeXBlID0gdGhpcy5pbXBsZW1lbnRhdGlvblR5cGU7XG4gICAgICAgIGNsb25lLmR5bmFtaWNWYWx1ZSA9IHRoaXMuZHluYW1pY1ZhbHVlO1xuICAgICAgICBjbG9uZS5zY29wZSA9IHRoaXMuc2NvcGU7XG4gICAgICAgIGNsb25lLnR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgIGNsb25lLmZhY3RvcnkgPSB0aGlzLmZhY3Rvcnk7XG4gICAgICAgIGNsb25lLnByb3ZpZGVyID0gdGhpcy5wcm92aWRlcjtcbiAgICAgICAgY2xvbmUuY29uc3RyYWludCA9IHRoaXMuY29uc3RyYWludDtcbiAgICAgICAgY2xvbmUub25BY3RpdmF0aW9uID0gdGhpcy5vbkFjdGl2YXRpb247XG4gICAgICAgIGNsb25lLmNhY2hlID0gdGhpcy5jYWNoZTtcbiAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmc7XG59KCkpO1xuZXhwb3J0cy5CaW5kaW5nID0gQmluZGluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CaW5kaW5nQ291bnQgPSB2b2lkIDA7XG52YXIgQmluZGluZ0NvdW50ID0ge1xuICAgIE11bHRpcGxlQmluZGluZ3NBdmFpbGFibGU6IDIsXG4gICAgTm9CaW5kaW5nc0F2YWlsYWJsZTogMCxcbiAgICBPbmx5T25lQmluZGluZ0F2YWlsYWJsZTogMVxufTtcbmV4cG9ydHMuQmluZGluZ0NvdW50ID0gQmluZGluZ0NvdW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNUQUNLX09WRVJGTE9XID0gZXhwb3J0cy5DSVJDVUxBUl9ERVBFTkRFTkNZX0lOX0ZBQ1RPUlkgPSBleHBvcnRzLlBPU1RfQ09OU1RSVUNUX0VSUk9SID0gZXhwb3J0cy5NVUxUSVBMRV9QT1NUX0NPTlNUUlVDVF9NRVRIT0RTID0gZXhwb3J0cy5DT05UQUlORVJfT1BUSU9OU19JTlZBTElEX1NLSVBfQkFTRV9DSEVDSyA9IGV4cG9ydHMuQ09OVEFJTkVSX09QVElPTlNfSU5WQUxJRF9BVVRPX0JJTkRfSU5KRUNUQUJMRSA9IGV4cG9ydHMuQ09OVEFJTkVSX09QVElPTlNfSU5WQUxJRF9ERUZBVUxUX1NDT1BFID0gZXhwb3J0cy5DT05UQUlORVJfT1BUSU9OU19NVVNUX0JFX0FOX09CSkVDVCA9IGV4cG9ydHMuQVJHVU1FTlRTX0xFTkdUSF9NSVNNQVRDSCA9IGV4cG9ydHMuSU5WQUxJRF9ERUNPUkFUT1JfT1BFUkFUSU9OID0gZXhwb3J0cy5JTlZBTElEX1RPX1NFTEZfVkFMVUUgPSBleHBvcnRzLklOVkFMSURfRlVOQ1RJT05fQklORElORyA9IGV4cG9ydHMuSU5WQUxJRF9NSURETEVXQVJFX1JFVFVSTiA9IGV4cG9ydHMuTk9fTU9SRV9TTkFQU0hPVFNfQVZBSUxBQkxFID0gZXhwb3J0cy5JTlZBTElEX0JJTkRJTkdfVFlQRSA9IGV4cG9ydHMuTk9UX0lNUExFTUVOVEVEID0gZXhwb3J0cy5DSVJDVUxBUl9ERVBFTkRFTkNZID0gZXhwb3J0cy5VTkRFRklORURfSU5KRUNUX0FOTk9UQVRJT04gPSBleHBvcnRzLk1JU1NJTkdfSU5KRUNUX0FOTk9UQVRJT04gPSBleHBvcnRzLk1JU1NJTkdfSU5KRUNUQUJMRV9BTk5PVEFUSU9OID0gZXhwb3J0cy5OT1RfUkVHSVNURVJFRCA9IGV4cG9ydHMuQ0FOTk9UX1VOQklORCA9IGV4cG9ydHMuQU1CSUdVT1VTX01BVENIID0gZXhwb3J0cy5LRVlfTk9UX0ZPVU5EID0gZXhwb3J0cy5OVUxMX0FSR1VNRU5UID0gZXhwb3J0cy5EVVBMSUNBVEVEX01FVEFEQVRBID0gZXhwb3J0cy5EVVBMSUNBVEVEX0lOSkVDVEFCTEVfREVDT1JBVE9SID0gdm9pZCAwO1xuZXhwb3J0cy5EVVBMSUNBVEVEX0lOSkVDVEFCTEVfREVDT1JBVE9SID0gXCJDYW5ub3QgYXBwbHkgQGluamVjdGFibGUgZGVjb3JhdG9yIG11bHRpcGxlIHRpbWVzLlwiO1xuZXhwb3J0cy5EVVBMSUNBVEVEX01FVEFEQVRBID0gXCJNZXRhZGF0YSBrZXkgd2FzIHVzZWQgbW9yZSB0aGFuIG9uY2UgaW4gYSBwYXJhbWV0ZXI6XCI7XG5leHBvcnRzLk5VTExfQVJHVU1FTlQgPSBcIk5VTEwgYXJndW1lbnRcIjtcbmV4cG9ydHMuS0VZX05PVF9GT1VORCA9IFwiS2V5IE5vdCBGb3VuZFwiO1xuZXhwb3J0cy5BTUJJR1VPVVNfTUFUQ0ggPSBcIkFtYmlndW91cyBtYXRjaCBmb3VuZCBmb3Igc2VydmljZUlkZW50aWZpZXI6XCI7XG5leHBvcnRzLkNBTk5PVF9VTkJJTkQgPSBcIkNvdWxkIG5vdCB1bmJpbmQgc2VydmljZUlkZW50aWZpZXI6XCI7XG5leHBvcnRzLk5PVF9SRUdJU1RFUkVEID0gXCJObyBtYXRjaGluZyBiaW5kaW5ncyBmb3VuZCBmb3Igc2VydmljZUlkZW50aWZpZXI6XCI7XG5leHBvcnRzLk1JU1NJTkdfSU5KRUNUQUJMRV9BTk5PVEFUSU9OID0gXCJNaXNzaW5nIHJlcXVpcmVkIEBpbmplY3RhYmxlIGFubm90YXRpb24gaW46XCI7XG5leHBvcnRzLk1JU1NJTkdfSU5KRUNUX0FOTk9UQVRJT04gPSBcIk1pc3NpbmcgcmVxdWlyZWQgQGluamVjdCBvciBAbXVsdGlJbmplY3QgYW5ub3RhdGlvbiBpbjpcIjtcbmV4cG9ydHMuVU5ERUZJTkVEX0lOSkVDVF9BTk5PVEFUSU9OID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gXCJAaW5qZWN0IGNhbGxlZCB3aXRoIHVuZGVmaW5lZCB0aGlzIGNvdWxkIG1lYW4gdGhhdCB0aGUgY2xhc3MgXCIgKyBuYW1lICsgXCIgaGFzIFwiICtcbiAgICAgICAgXCJhIGNpcmN1bGFyIGRlcGVuZGVuY3kgcHJvYmxlbS4gWW91IGNhbiB1c2UgYSBMYXp5U2VydmljZUlkZW50aWZlciB0byAgXCIgK1xuICAgICAgICBcIm92ZXJjb21lIHRoaXMgbGltaXRhdGlvbi5cIjtcbn07XG5leHBvcnRzLkNJUkNVTEFSX0RFUEVOREVOQ1kgPSBcIkNpcmN1bGFyIGRlcGVuZGVuY3kgZm91bmQ6XCI7XG5leHBvcnRzLk5PVF9JTVBMRU1FTlRFRCA9IFwiU29ycnksIHRoaXMgZmVhdHVyZSBpcyBub3QgZnVsbHkgaW1wbGVtZW50ZWQgeWV0LlwiO1xuZXhwb3J0cy5JTlZBTElEX0JJTkRJTkdfVFlQRSA9IFwiSW52YWxpZCBiaW5kaW5nIHR5cGU6XCI7XG5leHBvcnRzLk5PX01PUkVfU05BUFNIT1RTX0FWQUlMQUJMRSA9IFwiTm8gc25hcHNob3QgYXZhaWxhYmxlIHRvIHJlc3RvcmUuXCI7XG5leHBvcnRzLklOVkFMSURfTUlERExFV0FSRV9SRVRVUk4gPSBcIkludmFsaWQgcmV0dXJuIHR5cGUgaW4gbWlkZGxld2FyZS4gTWlkZGxld2FyZSBtdXN0IHJldHVybiFcIjtcbmV4cG9ydHMuSU5WQUxJRF9GVU5DVElPTl9CSU5ESU5HID0gXCJWYWx1ZSBwcm92aWRlZCB0byBmdW5jdGlvbiBiaW5kaW5nIG11c3QgYmUgYSBmdW5jdGlvbiFcIjtcbmV4cG9ydHMuSU5WQUxJRF9UT19TRUxGX1ZBTFVFID0gXCJUaGUgdG9TZWxmIGZ1bmN0aW9uIGNhbiBvbmx5IGJlIGFwcGxpZWQgd2hlbiBhIGNvbnN0cnVjdG9yIGlzIFwiICtcbiAgICBcInVzZWQgYXMgc2VydmljZSBpZGVudGlmaWVyXCI7XG5leHBvcnRzLklOVkFMSURfREVDT1JBVE9SX09QRVJBVElPTiA9IFwiVGhlIEBpbmplY3QgQG11bHRpSW5qZWN0IEB0YWdnZWQgYW5kIEBuYW1lZCBkZWNvcmF0b3JzIFwiICtcbiAgICBcIm11c3QgYmUgYXBwbGllZCB0byB0aGUgcGFyYW1ldGVycyBvZiBhIGNsYXNzIGNvbnN0cnVjdG9yIG9yIGEgY2xhc3MgcHJvcGVydHkuXCI7XG5leHBvcnRzLkFSR1VNRU5UU19MRU5HVEhfTUlTTUFUQ0ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhbHVlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gXCJUaGUgbnVtYmVyIG9mIGNvbnN0cnVjdG9yIGFyZ3VtZW50cyBpbiB0aGUgZGVyaXZlZCBjbGFzcyBcIiArXG4gICAgICAgICh2YWx1ZXNbMF0gKyBcIiBtdXN0IGJlID49IHRoYW4gdGhlIG51bWJlciBvZiBjb25zdHJ1Y3RvciBhcmd1bWVudHMgb2YgaXRzIGJhc2UgY2xhc3MuXCIpO1xufTtcbmV4cG9ydHMuQ09OVEFJTkVSX09QVElPTlNfTVVTVF9CRV9BTl9PQkpFQ1QgPSBcIkludmFsaWQgQ29udGFpbmVyIGNvbnN0cnVjdG9yIGFyZ3VtZW50LiBDb250YWluZXIgb3B0aW9ucyBcIiArXG4gICAgXCJtdXN0IGJlIGFuIG9iamVjdC5cIjtcbmV4cG9ydHMuQ09OVEFJTkVSX09QVElPTlNfSU5WQUxJRF9ERUZBVUxUX1NDT1BFID0gXCJJbnZhbGlkIENvbnRhaW5lciBvcHRpb24uIERlZmF1bHQgc2NvcGUgbXVzdCBcIiArXG4gICAgXCJiZSBhIHN0cmluZyAoJ3NpbmdsZXRvbicgb3IgJ3RyYW5zaWVudCcpLlwiO1xuZXhwb3J0cy5DT05UQUlORVJfT1BUSU9OU19JTlZBTElEX0FVVE9fQklORF9JTkpFQ1RBQkxFID0gXCJJbnZhbGlkIENvbnRhaW5lciBvcHRpb24uIEF1dG8gYmluZCBpbmplY3RhYmxlIG11c3QgXCIgK1xuICAgIFwiYmUgYSBib29sZWFuXCI7XG5leHBvcnRzLkNPTlRBSU5FUl9PUFRJT05TX0lOVkFMSURfU0tJUF9CQVNFX0NIRUNLID0gXCJJbnZhbGlkIENvbnRhaW5lciBvcHRpb24uIFNraXAgYmFzZSBjaGVjayBtdXN0IFwiICtcbiAgICBcImJlIGEgYm9vbGVhblwiO1xuZXhwb3J0cy5NVUxUSVBMRV9QT1NUX0NPTlNUUlVDVF9NRVRIT0RTID0gXCJDYW5ub3QgYXBwbHkgQHBvc3RDb25zdHJ1Y3QgZGVjb3JhdG9yIG11bHRpcGxlIHRpbWVzIGluIHRoZSBzYW1lIGNsYXNzXCI7XG5leHBvcnRzLlBPU1RfQ09OU1RSVUNUX0VSUk9SID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YWx1ZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIFwiQHBvc3RDb25zdHJ1Y3QgZXJyb3IgaW4gY2xhc3MgXCIgKyB2YWx1ZXNbMF0gKyBcIjogXCIgKyB2YWx1ZXNbMV07XG59O1xuZXhwb3J0cy5DSVJDVUxBUl9ERVBFTkRFTkNZX0lOX0ZBQ1RPUlkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhbHVlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gXCJJdCBsb29rcyBsaWtlIHRoZXJlIGlzIGEgY2lyY3VsYXIgZGVwZW5kZW5jeSBcIiArXG4gICAgICAgIChcImluIG9uZSBvZiB0aGUgJ1wiICsgdmFsdWVzWzBdICsgXCInIGJpbmRpbmdzLiBQbGVhc2UgaW52ZXN0aWdhdGUgYmluZGluZ3Mgd2l0aFwiKSArXG4gICAgICAgIChcInNlcnZpY2UgaWRlbnRpZmllciAnXCIgKyB2YWx1ZXNbMV0gKyBcIicuXCIpO1xufTtcbmV4cG9ydHMuU1RBQ0tfT1ZFUkZMT1cgPSBcIk1heGltdW0gY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGFyZ2V0VHlwZUVudW0gPSBleHBvcnRzLkJpbmRpbmdUeXBlRW51bSA9IGV4cG9ydHMuQmluZGluZ1Njb3BlRW51bSA9IHZvaWQgMDtcbnZhciBCaW5kaW5nU2NvcGVFbnVtID0ge1xuICAgIFJlcXVlc3Q6IFwiUmVxdWVzdFwiLFxuICAgIFNpbmdsZXRvbjogXCJTaW5nbGV0b25cIixcbiAgICBUcmFuc2llbnQ6IFwiVHJhbnNpZW50XCJcbn07XG5leHBvcnRzLkJpbmRpbmdTY29wZUVudW0gPSBCaW5kaW5nU2NvcGVFbnVtO1xudmFyIEJpbmRpbmdUeXBlRW51bSA9IHtcbiAgICBDb25zdGFudFZhbHVlOiBcIkNvbnN0YW50VmFsdWVcIixcbiAgICBDb25zdHJ1Y3RvcjogXCJDb25zdHJ1Y3RvclwiLFxuICAgIER5bmFtaWNWYWx1ZTogXCJEeW5hbWljVmFsdWVcIixcbiAgICBGYWN0b3J5OiBcIkZhY3RvcnlcIixcbiAgICBGdW5jdGlvbjogXCJGdW5jdGlvblwiLFxuICAgIEluc3RhbmNlOiBcIkluc3RhbmNlXCIsXG4gICAgSW52YWxpZDogXCJJbnZhbGlkXCIsXG4gICAgUHJvdmlkZXI6IFwiUHJvdmlkZXJcIlxufTtcbmV4cG9ydHMuQmluZGluZ1R5cGVFbnVtID0gQmluZGluZ1R5cGVFbnVtO1xudmFyIFRhcmdldFR5cGVFbnVtID0ge1xuICAgIENsYXNzUHJvcGVydHk6IFwiQ2xhc3NQcm9wZXJ0eVwiLFxuICAgIENvbnN0cnVjdG9yQXJndW1lbnQ6IFwiQ29uc3RydWN0b3JBcmd1bWVudFwiLFxuICAgIFZhcmlhYmxlOiBcIlZhcmlhYmxlXCJcbn07XG5leHBvcnRzLlRhcmdldFR5cGVFbnVtID0gVGFyZ2V0VHlwZUVudW07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUE9TVF9DT05TVFJVQ1QgPSBleHBvcnRzLkRFU0lHTl9QQVJBTV9UWVBFUyA9IGV4cG9ydHMuUEFSQU1fVFlQRVMgPSBleHBvcnRzLlRBR0dFRF9QUk9QID0gZXhwb3J0cy5UQUdHRUQgPSBleHBvcnRzLk1VTFRJX0lOSkVDVF9UQUcgPSBleHBvcnRzLklOSkVDVF9UQUcgPSBleHBvcnRzLk9QVElPTkFMX1RBRyA9IGV4cG9ydHMuVU5NQU5BR0VEX1RBRyA9IGV4cG9ydHMuTkFNRV9UQUcgPSBleHBvcnRzLk5BTUVEX1RBRyA9IHZvaWQgMDtcbmV4cG9ydHMuTkFNRURfVEFHID0gXCJuYW1lZFwiO1xuZXhwb3J0cy5OQU1FX1RBRyA9IFwibmFtZVwiO1xuZXhwb3J0cy5VTk1BTkFHRURfVEFHID0gXCJ1bm1hbmFnZWRcIjtcbmV4cG9ydHMuT1BUSU9OQUxfVEFHID0gXCJvcHRpb25hbFwiO1xuZXhwb3J0cy5JTkpFQ1RfVEFHID0gXCJpbmplY3RcIjtcbmV4cG9ydHMuTVVMVElfSU5KRUNUX1RBRyA9IFwibXVsdGlfaW5qZWN0XCI7XG5leHBvcnRzLlRBR0dFRCA9IFwiaW52ZXJzaWZ5OnRhZ2dlZFwiO1xuZXhwb3J0cy5UQUdHRURfUFJPUCA9IFwiaW52ZXJzaWZ5OnRhZ2dlZF9wcm9wc1wiO1xuZXhwb3J0cy5QQVJBTV9UWVBFUyA9IFwiaW52ZXJzaWZ5OnBhcmFtdHlwZXNcIjtcbmV4cG9ydHMuREVTSUdOX1BBUkFNX1RZUEVTID0gXCJkZXNpZ246cGFyYW10eXBlc1wiO1xuZXhwb3J0cy5QT1NUX0NPTlNUUlVDVCA9IFwicG9zdF9jb25zdHJ1Y3RcIjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29udGFpbmVyID0gdm9pZCAwO1xudmFyIGJpbmRpbmdfMSA9IHJlcXVpcmUoXCIuLi9iaW5kaW5ncy9iaW5kaW5nXCIpO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV9yZWFkZXJfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YV9yZWFkZXJcIik7XG52YXIgcGxhbm5lcl8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL3BsYW5uZXJcIik7XG52YXIgcmVzb2x2ZXJfMSA9IHJlcXVpcmUoXCIuLi9yZXNvbHV0aW9uL3Jlc29sdmVyXCIpO1xudmFyIGJpbmRpbmdfdG9fc3ludGF4XzEgPSByZXF1aXJlKFwiLi4vc3ludGF4L2JpbmRpbmdfdG9fc3ludGF4XCIpO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgc2VyaWFsaXphdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlcmlhbGl6YXRpb25cIik7XG52YXIgY29udGFpbmVyX3NuYXBzaG90XzEgPSByZXF1aXJlKFwiLi9jb250YWluZXJfc25hcHNob3RcIik7XG52YXIgbG9va3VwXzEgPSByZXF1aXJlKFwiLi9sb29rdXBcIik7XG52YXIgQ29udGFpbmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250YWluZXIoY29udGFpbmVyT3B0aW9ucykge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGNvbnRhaW5lck9wdGlvbnMgfHwge307XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIgKyBFUlJPUl9NU0dTLkNPTlRBSU5FUl9PUFRJT05TX01VU1RfQkVfQU5fT0JKRUNUKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0U2NvcGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3B0aW9ucy5kZWZhdWx0U2NvcGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5UcmFuc2llbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5kZWZhdWx0U2NvcGUgIT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlNpbmdsZXRvbiAmJlxuICAgICAgICAgICAgb3B0aW9ucy5kZWZhdWx0U2NvcGUgIT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlRyYW5zaWVudCAmJlxuICAgICAgICAgICAgb3B0aW9ucy5kZWZhdWx0U2NvcGUgIT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlJlcXVlc3QpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiICsgRVJST1JfTVNHUy5DT05UQUlORVJfT1BUSU9OU19JTlZBTElEX0RFRkFVTFRfU0NPUEUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmF1dG9CaW5kSW5qZWN0YWJsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvcHRpb25zLmF1dG9CaW5kSW5qZWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmF1dG9CaW5kSW5qZWN0YWJsZSAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiICsgRVJST1JfTVNHUy5DT05UQUlORVJfT1BUSU9OU19JTlZBTElEX0FVVE9fQklORF9JTkpFQ1RBQkxFKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5za2lwQmFzZUNsYXNzQ2hlY2tzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuc2tpcEJhc2VDbGFzc0NoZWNrcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLnNraXBCYXNlQ2xhc3NDaGVja3MgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcIiArIEVSUk9SX01TR1MuQ09OVEFJTkVSX09QVElPTlNfSU5WQUxJRF9TS0lQX0JBU0VfQ0hFQ0spO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGF1dG9CaW5kSW5qZWN0YWJsZTogb3B0aW9ucy5hdXRvQmluZEluamVjdGFibGUsXG4gICAgICAgICAgICBkZWZhdWx0U2NvcGU6IG9wdGlvbnMuZGVmYXVsdFNjb3BlLFxuICAgICAgICAgICAgc2tpcEJhc2VDbGFzc0NoZWNrczogb3B0aW9ucy5za2lwQmFzZUNsYXNzQ2hlY2tzXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaWQgPSBpZF8xLmlkKCk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5ID0gbmV3IGxvb2t1cF8xLkxvb2t1cCgpO1xuICAgICAgICB0aGlzLl9zbmFwc2hvdHMgPSBbXTtcbiAgICAgICAgdGhpcy5fbWlkZGxld2FyZSA9IG51bGw7XG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFSZWFkZXIgPSBuZXcgbWV0YWRhdGFfcmVhZGVyXzEuTWV0YWRhdGFSZWFkZXIoKTtcbiAgICB9XG4gICAgQ29udGFpbmVyLm1lcmdlID0gZnVuY3Rpb24gKGNvbnRhaW5lcjEsIGNvbnRhaW5lcjIpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBDb250YWluZXIoKTtcbiAgICAgICAgdmFyIGJpbmRpbmdEaWN0aW9uYXJ5ID0gcGxhbm5lcl8xLmdldEJpbmRpbmdEaWN0aW9uYXJ5KGNvbnRhaW5lcik7XG4gICAgICAgIHZhciBiaW5kaW5nRGljdGlvbmFyeTEgPSBwbGFubmVyXzEuZ2V0QmluZGluZ0RpY3Rpb25hcnkoY29udGFpbmVyMSk7XG4gICAgICAgIHZhciBiaW5kaW5nRGljdGlvbmFyeTIgPSBwbGFubmVyXzEuZ2V0QmluZGluZ0RpY3Rpb25hcnkoY29udGFpbmVyMik7XG4gICAgICAgIGZ1bmN0aW9uIGNvcHlEaWN0aW9uYXJ5KG9yaWdpbiwgZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgIG9yaWdpbi50cmF2ZXJzZShmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGJpbmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24uYWRkKGJpbmRpbmcuc2VydmljZUlkZW50aWZpZXIsIGJpbmRpbmcuY2xvbmUoKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb3B5RGljdGlvbmFyeShiaW5kaW5nRGljdGlvbmFyeTEsIGJpbmRpbmdEaWN0aW9uYXJ5KTtcbiAgICAgICAgY29weURpY3Rpb25hcnkoYmluZGluZ0RpY3Rpb25hcnkyLCBiaW5kaW5nRGljdGlvbmFyeSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtb2R1bGVzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBtb2R1bGVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdldEhlbHBlcnMgPSB0aGlzLl9nZXRDb250YWluZXJNb2R1bGVIZWxwZXJzRmFjdG9yeSgpO1xuICAgICAgICBmb3IgKHZhciBfYSA9IDAsIG1vZHVsZXNfMSA9IG1vZHVsZXM7IF9hIDwgbW9kdWxlc18xLmxlbmd0aDsgX2ErKykge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRNb2R1bGUgPSBtb2R1bGVzXzFbX2FdO1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMgPSBnZXRIZWxwZXJzKGN1cnJlbnRNb2R1bGUuaWQpO1xuICAgICAgICAgICAgY3VycmVudE1vZHVsZS5yZWdpc3RyeShjb250YWluZXJNb2R1bGVIZWxwZXJzLmJpbmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy51bmJpbmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy5pc2JvdW5kRnVuY3Rpb24sIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMucmViaW5kRnVuY3Rpb24pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmxvYWRBc3luYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1vZHVsZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG1vZHVsZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZ2V0SGVscGVycywgX2EsIG1vZHVsZXNfMiwgY3VycmVudE1vZHVsZSwgY29udGFpbmVyTW9kdWxlSGVscGVycztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEhlbHBlcnMgPSB0aGlzLl9nZXRDb250YWluZXJNb2R1bGVIZWxwZXJzRmFjdG9yeSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSAwLCBtb2R1bGVzXzIgPSBtb2R1bGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShfYSA8IG1vZHVsZXNfMi5sZW5ndGgpKSByZXR1cm4gWzMsIDRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE1vZHVsZSA9IG1vZHVsZXNfMltfYV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXJNb2R1bGVIZWxwZXJzID0gZ2V0SGVscGVycyhjdXJyZW50TW9kdWxlLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgY3VycmVudE1vZHVsZS5yZWdpc3RyeShjb250YWluZXJNb2R1bGVIZWxwZXJzLmJpbmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy51bmJpbmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy5pc2JvdW5kRnVuY3Rpb24sIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMucmViaW5kRnVuY3Rpb24pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAxXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbW9kdWxlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgbW9kdWxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb25kaXRpb25GYWN0b3J5ID0gZnVuY3Rpb24gKGV4cGVjdGVkKSB7IHJldHVybiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubW9kdWxlSWQgPT09IGV4cGVjdGVkO1xuICAgICAgICB9OyB9O1xuICAgICAgICBtb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICAgICAgdmFyIGNvbmRpdGlvbiA9IGNvbmRpdGlvbkZhY3RvcnkobW9kdWxlLmlkKTtcbiAgICAgICAgICAgIF90aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5yZW1vdmVCeUNvbmRpdGlvbihjb25kaXRpb24pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICB2YXIgc2NvcGUgPSB0aGlzLm9wdGlvbnMuZGVmYXVsdFNjb3BlIHx8IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlRyYW5zaWVudDtcbiAgICAgICAgdmFyIGJpbmRpbmcgPSBuZXcgYmluZGluZ18xLkJpbmRpbmcoc2VydmljZUlkZW50aWZpZXIsIHNjb3BlKTtcbiAgICAgICAgdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuYWRkKHNlcnZpY2VJZGVudGlmaWVyLCBiaW5kaW5nKTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3RvX3N5bnRheF8xLkJpbmRpbmdUb1N5bnRheChiaW5kaW5nKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUucmViaW5kID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHRoaXMudW5iaW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmluZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkucmVtb3ZlKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuQ0FOTk9UX1VOQklORCArIFwiIFwiICsgc2VyaWFsaXphdGlvbl8xLmdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcoc2VydmljZUlkZW50aWZpZXIpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS51bmJpbmRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5ID0gbmV3IGxvb2t1cF8xLkxvb2t1cCgpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5pc0JvdW5kID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHZhciBib3VuZCA9IHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5Lmhhc0tleShzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIGlmICghYm91bmQgJiYgdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIGJvdW5kID0gdGhpcy5wYXJlbnQuaXNCb3VuZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJvdW5kO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5pc0JvdW5kTmFtZWQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIG5hbWVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQm91bmRUYWdnZWQoc2VydmljZUlkZW50aWZpZXIsIE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcsIG5hbWVkKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuaXNCb3VuZFRhZ2dlZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgYm91bmQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5Lmhhc0tleShzZXJ2aWNlSWRlbnRpZmllcikpIHtcbiAgICAgICAgICAgIHZhciBiaW5kaW5ncyA9IHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LmdldChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdF8xID0gcGxhbm5lcl8xLmNyZWF0ZU1vY2tSZXF1ZXN0KHRoaXMsIHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGJvdW5kID0gYmluZGluZ3Muc29tZShmdW5jdGlvbiAoYikgeyByZXR1cm4gYi5jb25zdHJhaW50KHJlcXVlc3RfMSk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYm91bmQgJiYgdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIGJvdW5kID0gdGhpcy5wYXJlbnQuaXNCb3VuZFRhZ2dlZChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJvdW5kO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5zbmFwc2hvdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fc25hcHNob3RzLnB1c2goY29udGFpbmVyX3NuYXBzaG90XzEuQ29udGFpbmVyU25hcHNob3Qub2YodGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuY2xvbmUoKSwgdGhpcy5fbWlkZGxld2FyZSkpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5yZXN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc25hcHNob3QgPSB0aGlzLl9zbmFwc2hvdHMucG9wKCk7XG4gICAgICAgIGlmIChzbmFwc2hvdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5OT19NT1JFX1NOQVBTSE9UU19BVkFJTEFCTEUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5ID0gc25hcHNob3QuYmluZGluZ3M7XG4gICAgICAgIHRoaXMuX21pZGRsZXdhcmUgPSBzbmFwc2hvdC5taWRkbGV3YXJlO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5jcmVhdGVDaGlsZCA9IGZ1bmN0aW9uIChjb250YWluZXJPcHRpb25zKSB7XG4gICAgICAgIHZhciBjaGlsZCA9IG5ldyBDb250YWluZXIoY29udGFpbmVyT3B0aW9ucyB8fCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmFwcGx5TWlkZGxld2FyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1pZGRsZXdhcmVzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBtaWRkbGV3YXJlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbml0aWFsID0gKHRoaXMuX21pZGRsZXdhcmUpID8gdGhpcy5fbWlkZGxld2FyZSA6IHRoaXMuX3BsYW5BbmRSZXNvbHZlKCk7XG4gICAgICAgIHRoaXMuX21pZGRsZXdhcmUgPSBtaWRkbGV3YXJlcy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGN1cnIpIHsgcmV0dXJuIGN1cnIocHJldik7IH0sIGluaXRpYWwpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5hcHBseUN1c3RvbU1ldGFkYXRhUmVhZGVyID0gZnVuY3Rpb24gKG1ldGFkYXRhUmVhZGVyKSB7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhUmVhZGVyID0gbWV0YWRhdGFSZWFkZXI7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0KGZhbHNlLCBmYWxzZSwgbGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLlZhcmlhYmxlLCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldFRhZ2dlZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0KGZhbHNlLCBmYWxzZSwgbGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLlZhcmlhYmxlLCBzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldE5hbWVkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBuYW1lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUYWdnZWQoc2VydmljZUlkZW50aWZpZXIsIE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcsIG5hbWVkKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXQodHJ1ZSwgdHJ1ZSwgbGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLlZhcmlhYmxlLCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldEFsbFRhZ2dlZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0KGZhbHNlLCB0cnVlLCBsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uVmFyaWFibGUsIHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0QWxsTmFtZWQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIG5hbWVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFsbFRhZ2dlZChzZXJ2aWNlSWRlbnRpZmllciwgTUVUQURBVEFfS0VZLk5BTUVEX1RBRywgbmFtZWQpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIHRlbXBDb250YWluZXIgPSB0aGlzLmNyZWF0ZUNoaWxkKCk7XG4gICAgICAgIHRlbXBDb250YWluZXIuYmluZChjb25zdHJ1Y3RvckZ1bmN0aW9uKS50b1NlbGYoKTtcbiAgICAgICAgcmV0dXJuIHRlbXBDb250YWluZXIuZ2V0KGNvbnN0cnVjdG9yRnVuY3Rpb24pO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZ2V0Q29udGFpbmVyTW9kdWxlSGVscGVyc0ZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzZXRNb2R1bGVJZCA9IGZ1bmN0aW9uIChiaW5kaW5nVG9TeW50YXgsIG1vZHVsZUlkKSB7XG4gICAgICAgICAgICBiaW5kaW5nVG9TeW50YXguX2JpbmRpbmcubW9kdWxlSWQgPSBtb2R1bGVJZDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldEJpbmRGdW5jdGlvbiA9IGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICAgICAgICAgIHZhciBfYmluZCA9IF90aGlzLmJpbmQuYmluZChfdGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIGJpbmRpbmdUb1N5bnRheCA9IF9iaW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICBzZXRNb2R1bGVJZChiaW5kaW5nVG9TeW50YXgsIG1vZHVsZUlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZ1RvU3ludGF4O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldFVuYmluZEZ1bmN0aW9uID0gZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF91bmJpbmQgPSBfdGhpcy51bmJpbmQuYmluZChfdGhpcyk7XG4gICAgICAgICAgICAgICAgX3VuYmluZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0SXNib3VuZEZ1bmN0aW9uID0gZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9pc0JvdW5kID0gX3RoaXMuaXNCb3VuZC5iaW5kKF90aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2lzQm91bmQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldFJlYmluZEZ1bmN0aW9uID0gZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWJpbmQgPSBfdGhpcy5yZWJpbmQuYmluZChfdGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIGJpbmRpbmdUb1N5bnRheCA9IF9yZWJpbmQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIHNldE1vZHVsZUlkKGJpbmRpbmdUb1N5bnRheCwgbW9kdWxlSWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5nVG9TeW50YXg7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1JZCkgeyByZXR1cm4gKHtcbiAgICAgICAgICAgIGJpbmRGdW5jdGlvbjogZ2V0QmluZEZ1bmN0aW9uKG1JZCksXG4gICAgICAgICAgICBpc2JvdW5kRnVuY3Rpb246IGdldElzYm91bmRGdW5jdGlvbihtSWQpLFxuICAgICAgICAgICAgcmViaW5kRnVuY3Rpb246IGdldFJlYmluZEZ1bmN0aW9uKG1JZCksXG4gICAgICAgICAgICB1bmJpbmRGdW5jdGlvbjogZ2V0VW5iaW5kRnVuY3Rpb24obUlkKVxuICAgICAgICB9KTsgfTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuX2dldCA9IGZ1bmN0aW9uIChhdm9pZENvbnN0cmFpbnRzLCBpc011bHRpSW5qZWN0LCB0YXJnZXRUeXBlLCBzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgdmFyIGRlZmF1bHRBcmdzID0ge1xuICAgICAgICAgICAgYXZvaWRDb25zdHJhaW50czogYXZvaWRDb25zdHJhaW50cyxcbiAgICAgICAgICAgIGNvbnRleHRJbnRlcmNlcHRvcjogZnVuY3Rpb24gKGNvbnRleHQpIHsgcmV0dXJuIGNvbnRleHQ7IH0sXG4gICAgICAgICAgICBpc011bHRpSW5qZWN0OiBpc011bHRpSW5qZWN0LFxuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBzZXJ2aWNlSWRlbnRpZmllcjogc2VydmljZUlkZW50aWZpZXIsXG4gICAgICAgICAgICB0YXJnZXRUeXBlOiB0YXJnZXRUeXBlLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLl9taWRkbGV3YXJlKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9taWRkbGV3YXJlKGRlZmF1bHRBcmdzKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCB8fCByZXN1bHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5JTlZBTElEX01JRERMRVdBUkVfUkVUVVJOKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX3BsYW5BbmRSZXNvbHZlKCkoZGVmYXVsdEFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9wbGFuQW5kUmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHBsYW5uZXJfMS5wbGFuKF90aGlzLl9tZXRhZGF0YVJlYWRlciwgX3RoaXMsIGFyZ3MuaXNNdWx0aUluamVjdCwgYXJncy50YXJnZXRUeXBlLCBhcmdzLnNlcnZpY2VJZGVudGlmaWVyLCBhcmdzLmtleSwgYXJncy52YWx1ZSwgYXJncy5hdm9pZENvbnN0cmFpbnRzKTtcbiAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzLmNvbnRleHRJbnRlcmNlcHRvcihjb250ZXh0KTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSByZXNvbHZlcl8xLnJlc29sdmUoY29udGV4dCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRhaW5lcjtcbn0oKSk7XG5leHBvcnRzLkNvbnRhaW5lciA9IENvbnRhaW5lcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Bc3luY0NvbnRhaW5lck1vZHVsZSA9IGV4cG9ydHMuQ29udGFpbmVyTW9kdWxlID0gdm9pZCAwO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgQ29udGFpbmVyTW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250YWluZXJNb2R1bGUocmVnaXN0cnkpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RyeSA9IHJlZ2lzdHJ5O1xuICAgIH1cbiAgICByZXR1cm4gQ29udGFpbmVyTW9kdWxlO1xufSgpKTtcbmV4cG9ydHMuQ29udGFpbmVyTW9kdWxlID0gQ29udGFpbmVyTW9kdWxlO1xudmFyIEFzeW5jQ29udGFpbmVyTW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBc3luY0NvbnRhaW5lck1vZHVsZShyZWdpc3RyeSkge1xuICAgICAgICB0aGlzLmlkID0gaWRfMS5pZCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5ID0gcmVnaXN0cnk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY0NvbnRhaW5lck1vZHVsZTtcbn0oKSk7XG5leHBvcnRzLkFzeW5jQ29udGFpbmVyTW9kdWxlID0gQXN5bmNDb250YWluZXJNb2R1bGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29udGFpbmVyU25hcHNob3QgPSB2b2lkIDA7XG52YXIgQ29udGFpbmVyU25hcHNob3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lclNuYXBzaG90KCkge1xuICAgIH1cbiAgICBDb250YWluZXJTbmFwc2hvdC5vZiA9IGZ1bmN0aW9uIChiaW5kaW5ncywgbWlkZGxld2FyZSkge1xuICAgICAgICB2YXIgc25hcHNob3QgPSBuZXcgQ29udGFpbmVyU25hcHNob3QoKTtcbiAgICAgICAgc25hcHNob3QuYmluZGluZ3MgPSBiaW5kaW5ncztcbiAgICAgICAgc25hcHNob3QubWlkZGxld2FyZSA9IG1pZGRsZXdhcmU7XG4gICAgICAgIHJldHVybiBzbmFwc2hvdDtcbiAgICB9O1xuICAgIHJldHVybiBDb250YWluZXJTbmFwc2hvdDtcbn0oKSk7XG5leHBvcnRzLkNvbnRhaW5lclNuYXBzaG90ID0gQ29udGFpbmVyU25hcHNob3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTG9va3VwID0gdm9pZCAwO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgTG9va3VwID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMb29rdXAoKSB7XG4gICAgICAgIHRoaXMuX21hcCA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgTG9va3VwLnByb3RvdHlwZS5nZXRNYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXA7XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHNlcnZpY2VJZGVudGlmaWVyID09PSBudWxsIHx8IHNlcnZpY2VJZGVudGlmaWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLk5VTExfQVJHVU1FTlQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5OVUxMX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9tYXAuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKGVudHJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVudHJ5LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fbWFwLnNldChzZXJ2aWNlSWRlbnRpZmllciwgZW50cnkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFwLnNldChzZXJ2aWNlSWRlbnRpZmllciwgW3ZhbHVlXSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllciA9PT0gbnVsbCB8fCBzZXJ2aWNlSWRlbnRpZmllciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5OVUxMX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9tYXAuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKGVudHJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLktFWV9OT1RfRk9VTkQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICBpZiAoc2VydmljZUlkZW50aWZpZXIgPT09IG51bGwgfHwgc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuTlVMTF9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9tYXAuZGVsZXRlKHNlcnZpY2VJZGVudGlmaWVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuS0VZX05PVF9GT1VORCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUucmVtb3ZlQnlDb25kaXRpb24gPSBmdW5jdGlvbiAoY29uZGl0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX21hcC5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyaWVzLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciB1cGRhdGVkRW50cmllcyA9IGVudHJpZXMuZmlsdGVyKGZ1bmN0aW9uIChlbnRyeSkgeyByZXR1cm4gIWNvbmRpdGlvbihlbnRyeSk7IH0pO1xuICAgICAgICAgICAgaWYgKHVwZGF0ZWRFbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fbWFwLnNldChrZXksIHVwZGF0ZWRFbnRyaWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLl9tYXAuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS5oYXNLZXkgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgaWYgKHNlcnZpY2VJZGVudGlmaWVyID09PSBudWxsIHx8IHNlcnZpY2VJZGVudGlmaWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLk5VTExfQVJHVU1FTlQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAuaGFzKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb3B5ID0gbmV3IExvb2t1cCgpO1xuICAgICAgICB0aGlzLl9tYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoYikgeyByZXR1cm4gY29weS5hZGQoa2V5LCBiLmNsb25lKCkpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS50cmF2ZXJzZSA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgIHRoaXMuX21hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBmdW5jKGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBMb29rdXA7XG59KCkpO1xuZXhwb3J0cy5Mb29rdXAgPSBMb29rdXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTUVUQURBVEFfS0VZID0gdm9pZCAwO1xudmFyIGtleXMgPSByZXF1aXJlKFwiLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbmV4cG9ydHMuTUVUQURBVEFfS0VZID0ga2V5cztcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lci9jb250YWluZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDb250YWluZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbnRhaW5lcl8xLkNvbnRhaW5lcjsgfSB9KTtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkJpbmRpbmdTY29wZUVudW1cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQmluZGluZ1R5cGVFbnVtXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVGFyZ2V0VHlwZUVudW1cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bTsgfSB9KTtcbnZhciBjb250YWluZXJfbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9jb250YWluZXIvY29udGFpbmVyX21vZHVsZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkFzeW5jQ29udGFpbmVyTW9kdWxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb250YWluZXJfbW9kdWxlXzEuQXN5bmNDb250YWluZXJNb2R1bGU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDb250YWluZXJNb2R1bGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbnRhaW5lcl9tb2R1bGVfMS5Db250YWluZXJNb2R1bGU7IH0gfSk7XG52YXIgaW5qZWN0YWJsZV8xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi9pbmplY3RhYmxlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaW5qZWN0YWJsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5qZWN0YWJsZV8xLmluamVjdGFibGU7IH0gfSk7XG52YXIgdGFnZ2VkXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL3RhZ2dlZFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRhZ2dlZFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFnZ2VkXzEudGFnZ2VkOyB9IH0pO1xudmFyIG5hbWVkXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL25hbWVkXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibmFtZWRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5hbWVkXzEubmFtZWQ7IH0gfSk7XG52YXIgaW5qZWN0XzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL2luamVjdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImluamVjdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5qZWN0XzEuaW5qZWN0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTGF6eVNlcnZpY2VJZGVudGlmZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGluamVjdF8xLkxhenlTZXJ2aWNlSWRlbnRpZmVyOyB9IH0pO1xudmFyIG9wdGlvbmFsXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL29wdGlvbmFsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwib3B0aW9uYWxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9wdGlvbmFsXzEub3B0aW9uYWw7IH0gfSk7XG52YXIgdW5tYW5hZ2VkXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL3VubWFuYWdlZFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInVubWFuYWdlZFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5tYW5hZ2VkXzEudW5tYW5hZ2VkOyB9IH0pO1xudmFyIG11bHRpX2luamVjdF8xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi9tdWx0aV9pbmplY3RcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtdWx0aUluamVjdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbXVsdGlfaW5qZWN0XzEubXVsdGlJbmplY3Q7IH0gfSk7XG52YXIgdGFyZ2V0X25hbWVfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vdGFyZ2V0X25hbWVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ0YXJnZXROYW1lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0YXJnZXRfbmFtZV8xLnRhcmdldE5hbWU7IH0gfSk7XG52YXIgcG9zdF9jb25zdHJ1Y3RfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vcG9zdF9jb25zdHJ1Y3RcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwb3N0Q29uc3RydWN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwb3N0X2NvbnN0cnVjdF8xLnBvc3RDb25zdHJ1Y3Q7IH0gfSk7XG52YXIgbWV0YWRhdGFfcmVhZGVyXzEgPSByZXF1aXJlKFwiLi9wbGFubmluZy9tZXRhZGF0YV9yZWFkZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJNZXRhZGF0YVJlYWRlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWV0YWRhdGFfcmVhZGVyXzEuTWV0YWRhdGFSZWFkZXI7IH0gfSk7XG52YXIgaWRfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2lkXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaWRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlkXzEuaWQ7IH0gfSk7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL2RlY29yYXRvcl91dGlsc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImRlY29yYXRlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkZWNvcmF0b3JfdXRpbHNfMS5kZWNvcmF0ZTsgfSB9KTtcbnZhciBjb25zdHJhaW50X2hlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL3N5bnRheC9jb25zdHJhaW50X2hlbHBlcnNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ0cmF2ZXJzZUFuY2Vyc3RvcnNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9yczsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRhZ2dlZENvbnN0cmFpbnRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnRhZ2dlZENvbnN0cmFpbnQ7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJuYW1lZENvbnN0cmFpbnRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLm5hbWVkQ29uc3RyYWludDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInR5cGVDb25zdHJhaW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25zdHJhaW50X2hlbHBlcnNfMS50eXBlQ29uc3RyYWludDsgfSB9KTtcbnZhciBzZXJpYWxpemF0aW9uXzEgPSByZXF1aXJlKFwiLi91dGlscy9zZXJpYWxpemF0aW9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZ1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VyaWFsaXphdGlvbl8xLmdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmc7IH0gfSk7XG52YXIgYmluZGluZ191dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHMvYmluZGluZ191dGlsc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm11bHRpQmluZFRvU2VydmljZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYmluZGluZ191dGlsc18xLm11bHRpQmluZFRvU2VydmljZTsgfSB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Db250ZXh0ID0gdm9pZCAwO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgQ29udGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dChjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgfVxuICAgIENvbnRleHQucHJvdG90eXBlLmFkZFBsYW4gPSBmdW5jdGlvbiAocGxhbikge1xuICAgICAgICB0aGlzLnBsYW4gPSBwbGFuO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuc2V0Q3VycmVudFJlcXVlc3QgPSBmdW5jdGlvbiAoY3VycmVudFJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UmVxdWVzdCA9IGN1cnJlbnRSZXF1ZXN0O1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRleHQ7XG59KCkpO1xuZXhwb3J0cy5Db250ZXh0ID0gQ29udGV4dDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NZXRhZGF0YSA9IHZvaWQgMDtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgTWV0YWRhdGEgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1ldGFkYXRhKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgTWV0YWRhdGEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5rZXkgPT09IE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm5hbWVkOiBcIiArIHRoaXMudmFsdWUudG9TdHJpbmcoKSArIFwiIFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwidGFnZ2VkOiB7IGtleTpcIiArIHRoaXMua2V5LnRvU3RyaW5nKCkgKyBcIiwgdmFsdWU6IFwiICsgdGhpcy52YWx1ZSArIFwiIH1cIjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE1ldGFkYXRhO1xufSgpKTtcbmV4cG9ydHMuTWV0YWRhdGEgPSBNZXRhZGF0YTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NZXRhZGF0YVJlYWRlciA9IHZvaWQgMDtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgTWV0YWRhdGFSZWFkZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1ldGFkYXRhUmVhZGVyKCkge1xuICAgIH1cbiAgICBNZXRhZGF0YVJlYWRlci5wcm90b3R5cGUuZ2V0Q29uc3RydWN0b3JNZXRhZGF0YSA9IGZ1bmN0aW9uIChjb25zdHJ1Y3RvckZ1bmMpIHtcbiAgICAgICAgdmFyIGNvbXBpbGVyR2VuZXJhdGVkTWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKE1FVEFEQVRBX0tFWS5QQVJBTV9UWVBFUywgY29uc3RydWN0b3JGdW5jKTtcbiAgICAgICAgdmFyIHVzZXJHZW5lcmF0ZWRNZXRhZGF0YSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoTUVUQURBVEFfS0VZLlRBR0dFRCwgY29uc3RydWN0b3JGdW5jKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBpbGVyR2VuZXJhdGVkTWV0YWRhdGE6IGNvbXBpbGVyR2VuZXJhdGVkTWV0YWRhdGEsXG4gICAgICAgICAgICB1c2VyR2VuZXJhdGVkTWV0YWRhdGE6IHVzZXJHZW5lcmF0ZWRNZXRhZGF0YSB8fCB7fVxuICAgICAgICB9O1xuICAgIH07XG4gICAgTWV0YWRhdGFSZWFkZXIucHJvdG90eXBlLmdldFByb3BlcnRpZXNNZXRhZGF0YSA9IGZ1bmN0aW9uIChjb25zdHJ1Y3RvckZ1bmMpIHtcbiAgICAgICAgdmFyIHVzZXJHZW5lcmF0ZWRNZXRhZGF0YSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoTUVUQURBVEFfS0VZLlRBR0dFRF9QUk9QLCBjb25zdHJ1Y3RvckZ1bmMpIHx8IFtdO1xuICAgICAgICByZXR1cm4gdXNlckdlbmVyYXRlZE1ldGFkYXRhO1xuICAgIH07XG4gICAgcmV0dXJuIE1ldGFkYXRhUmVhZGVyO1xufSgpKTtcbmV4cG9ydHMuTWV0YWRhdGFSZWFkZXIgPSBNZXRhZGF0YVJlYWRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5QbGFuID0gdm9pZCAwO1xudmFyIFBsYW4gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBsYW4ocGFyZW50Q29udGV4dCwgcm9vdFJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRDb250ZXh0ID0gcGFyZW50Q29udGV4dDtcbiAgICAgICAgdGhpcy5yb290UmVxdWVzdCA9IHJvb3RSZXF1ZXN0O1xuICAgIH1cbiAgICByZXR1cm4gUGxhbjtcbn0oKSk7XG5leHBvcnRzLlBsYW4gPSBQbGFuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEJpbmRpbmdEaWN0aW9uYXJ5ID0gZXhwb3J0cy5jcmVhdGVNb2NrUmVxdWVzdCA9IGV4cG9ydHMucGxhbiA9IHZvaWQgMDtcbnZhciBiaW5kaW5nX2NvdW50XzEgPSByZXF1aXJlKFwiLi4vYmluZGluZ3MvYmluZGluZ19jb3VudFwiKTtcbnZhciBFUlJPUl9NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIGxpdGVyYWxfdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgZXhjZXB0aW9uc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL2V4Y2VwdGlvbnNcIik7XG52YXIgc2VyaWFsaXphdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlcmlhbGl6YXRpb25cIik7XG52YXIgY29udGV4dF8xID0gcmVxdWlyZShcIi4vY29udGV4dFwiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4vbWV0YWRhdGFcIik7XG52YXIgcGxhbl8xID0gcmVxdWlyZShcIi4vcGxhblwiKTtcbnZhciByZWZsZWN0aW9uX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9yZWZsZWN0aW9uX3V0aWxzXCIpO1xudmFyIHJlcXVlc3RfMSA9IHJlcXVpcmUoXCIuL3JlcXVlc3RcIik7XG52YXIgdGFyZ2V0XzEgPSByZXF1aXJlKFwiLi90YXJnZXRcIik7XG5mdW5jdGlvbiBnZXRCaW5kaW5nRGljdGlvbmFyeShjbnRucikge1xuICAgIHJldHVybiBjbnRuci5fYmluZGluZ0RpY3Rpb25hcnk7XG59XG5leHBvcnRzLmdldEJpbmRpbmdEaWN0aW9uYXJ5ID0gZ2V0QmluZGluZ0RpY3Rpb25hcnk7XG5mdW5jdGlvbiBfY3JlYXRlVGFyZ2V0KGlzTXVsdGlJbmplY3QsIHRhcmdldFR5cGUsIHNlcnZpY2VJZGVudGlmaWVyLCBuYW1lLCBrZXksIHZhbHVlKSB7XG4gICAgdmFyIG1ldGFkYXRhS2V5ID0gaXNNdWx0aUluamVjdCA/IE1FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHIDogTUVUQURBVEFfS0VZLklOSkVDVF9UQUc7XG4gICAgdmFyIGluamVjdE1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEobWV0YWRhdGFLZXksIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB2YXIgdGFyZ2V0ID0gbmV3IHRhcmdldF8xLlRhcmdldCh0YXJnZXRUeXBlLCBuYW1lLCBzZXJ2aWNlSWRlbnRpZmllciwgaW5qZWN0TWV0YWRhdGEpO1xuICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgdGFnTWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShrZXksIHZhbHVlKTtcbiAgICAgICAgdGFyZ2V0Lm1ldGFkYXRhLnB1c2godGFnTWV0YWRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gX2dldEFjdGl2ZUJpbmRpbmdzKG1ldGFkYXRhUmVhZGVyLCBhdm9pZENvbnN0cmFpbnRzLCBjb250ZXh0LCBwYXJlbnRSZXF1ZXN0LCB0YXJnZXQpIHtcbiAgICB2YXIgYmluZGluZ3MgPSBnZXRCaW5kaW5ncyhjb250ZXh0LmNvbnRhaW5lciwgdGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB2YXIgYWN0aXZlQmluZGluZ3MgPSBbXTtcbiAgICBpZiAoYmluZGluZ3MubGVuZ3RoID09PSBiaW5kaW5nX2NvdW50XzEuQmluZGluZ0NvdW50Lk5vQmluZGluZ3NBdmFpbGFibGUgJiZcbiAgICAgICAgY29udGV4dC5jb250YWluZXIub3B0aW9ucy5hdXRvQmluZEluamVjdGFibGUgJiZcbiAgICAgICAgdHlwZW9mIHRhcmdldC5zZXJ2aWNlSWRlbnRpZmllciA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIG1ldGFkYXRhUmVhZGVyLmdldENvbnN0cnVjdG9yTWV0YWRhdGEodGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyKS5jb21waWxlckdlbmVyYXRlZE1ldGFkYXRhKSB7XG4gICAgICAgIGNvbnRleHQuY29udGFpbmVyLmJpbmQodGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyKS50b1NlbGYoKTtcbiAgICAgICAgYmluZGluZ3MgPSBnZXRCaW5kaW5ncyhjb250ZXh0LmNvbnRhaW5lciwgdGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9XG4gICAgaWYgKCFhdm9pZENvbnN0cmFpbnRzKSB7XG4gICAgICAgIGFjdGl2ZUJpbmRpbmdzID0gYmluZGluZ3MuZmlsdGVyKGZ1bmN0aW9uIChiaW5kaW5nKSB7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyByZXF1ZXN0XzEuUmVxdWVzdChiaW5kaW5nLnNlcnZpY2VJZGVudGlmaWVyLCBjb250ZXh0LCBwYXJlbnRSZXF1ZXN0LCBiaW5kaW5nLCB0YXJnZXQpO1xuICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmcuY29uc3RyYWludChyZXF1ZXN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhY3RpdmVCaW5kaW5ncyA9IGJpbmRpbmdzO1xuICAgIH1cbiAgICBfdmFsaWRhdGVBY3RpdmVCaW5kaW5nQ291bnQodGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyLCBhY3RpdmVCaW5kaW5ncywgdGFyZ2V0LCBjb250ZXh0LmNvbnRhaW5lcik7XG4gICAgcmV0dXJuIGFjdGl2ZUJpbmRpbmdzO1xufVxuZnVuY3Rpb24gX3ZhbGlkYXRlQWN0aXZlQmluZGluZ0NvdW50KHNlcnZpY2VJZGVudGlmaWVyLCBiaW5kaW5ncywgdGFyZ2V0LCBjb250YWluZXIpIHtcbiAgICBzd2l0Y2ggKGJpbmRpbmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIGJpbmRpbmdfY291bnRfMS5CaW5kaW5nQ291bnQuTm9CaW5kaW5nc0F2YWlsYWJsZTpcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaXNPcHRpb25hbCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nID0gc2VyaWFsaXphdGlvbl8xLmdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBFUlJPUl9NU0dTLk5PVF9SRUdJU1RFUkVEO1xuICAgICAgICAgICAgICAgIG1zZyArPSBzZXJpYWxpemF0aW9uXzEubGlzdE1ldGFkYXRhRm9yVGFyZ2V0KHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgIG1zZyArPSBzZXJpYWxpemF0aW9uXzEubGlzdFJlZ2lzdGVyZWRCaW5kaW5nc0ZvclNlcnZpY2VJZGVudGlmaWVyKGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXJTdHJpbmcsIGdldEJpbmRpbmdzKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2FzZSBiaW5kaW5nX2NvdW50XzEuQmluZGluZ0NvdW50Lk9ubHlPbmVCaW5kaW5nQXZhaWxhYmxlOlxuICAgICAgICAgICAgaWYgKCF0YXJnZXQuaXNBcnJheSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlIGJpbmRpbmdfY291bnRfMS5CaW5kaW5nQ291bnQuTXVsdGlwbGVCaW5kaW5nc0F2YWlsYWJsZTpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGlmICghdGFyZ2V0LmlzQXJyYXkoKSkge1xuICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllclN0cmluZyA9IHNlcmlhbGl6YXRpb25fMS5nZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gRVJST1JfTVNHUy5BTUJJR1VPVVNfTUFUQ0ggKyBcIiBcIiArIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nO1xuICAgICAgICAgICAgICAgIG1zZyArPSBzZXJpYWxpemF0aW9uXzEubGlzdFJlZ2lzdGVyZWRCaW5kaW5nc0ZvclNlcnZpY2VJZGVudGlmaWVyKGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXJTdHJpbmcsIGdldEJpbmRpbmdzKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5ncztcbiAgICAgICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfY3JlYXRlU3ViUmVxdWVzdHMobWV0YWRhdGFSZWFkZXIsIGF2b2lkQ29uc3RyYWludHMsIHNlcnZpY2VJZGVudGlmaWVyLCBjb250ZXh0LCBwYXJlbnRSZXF1ZXN0LCB0YXJnZXQpIHtcbiAgICB2YXIgYWN0aXZlQmluZGluZ3M7XG4gICAgdmFyIGNoaWxkUmVxdWVzdDtcbiAgICBpZiAocGFyZW50UmVxdWVzdCA9PT0gbnVsbCkge1xuICAgICAgICBhY3RpdmVCaW5kaW5ncyA9IF9nZXRBY3RpdmVCaW5kaW5ncyhtZXRhZGF0YVJlYWRlciwgYXZvaWRDb25zdHJhaW50cywgY29udGV4dCwgbnVsbCwgdGFyZ2V0KTtcbiAgICAgICAgY2hpbGRSZXF1ZXN0ID0gbmV3IHJlcXVlc3RfMS5SZXF1ZXN0KHNlcnZpY2VJZGVudGlmaWVyLCBjb250ZXh0LCBudWxsLCBhY3RpdmVCaW5kaW5ncywgdGFyZ2V0KTtcbiAgICAgICAgdmFyIHRoZVBsYW4gPSBuZXcgcGxhbl8xLlBsYW4oY29udGV4dCwgY2hpbGRSZXF1ZXN0KTtcbiAgICAgICAgY29udGV4dC5hZGRQbGFuKHRoZVBsYW4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYWN0aXZlQmluZGluZ3MgPSBfZ2V0QWN0aXZlQmluZGluZ3MobWV0YWRhdGFSZWFkZXIsIGF2b2lkQ29uc3RyYWludHMsIGNvbnRleHQsIHBhcmVudFJlcXVlc3QsIHRhcmdldCk7XG4gICAgICAgIGNoaWxkUmVxdWVzdCA9IHBhcmVudFJlcXVlc3QuYWRkQ2hpbGRSZXF1ZXN0KHRhcmdldC5zZXJ2aWNlSWRlbnRpZmllciwgYWN0aXZlQmluZGluZ3MsIHRhcmdldCk7XG4gICAgfVxuICAgIGFjdGl2ZUJpbmRpbmdzLmZvckVhY2goZnVuY3Rpb24gKGJpbmRpbmcpIHtcbiAgICAgICAgdmFyIHN1YkNoaWxkUmVxdWVzdCA9IG51bGw7XG4gICAgICAgIGlmICh0YXJnZXQuaXNBcnJheSgpKSB7XG4gICAgICAgICAgICBzdWJDaGlsZFJlcXVlc3QgPSBjaGlsZFJlcXVlc3QuYWRkQ2hpbGRSZXF1ZXN0KGJpbmRpbmcuc2VydmljZUlkZW50aWZpZXIsIGJpbmRpbmcsIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoYmluZGluZy5jYWNoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YkNoaWxkUmVxdWVzdCA9IGNoaWxkUmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYmluZGluZy50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkluc3RhbmNlICYmIGJpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgZGVwZW5kZW5jaWVzID0gcmVmbGVjdGlvbl91dGlsc18xLmdldERlcGVuZGVuY2llcyhtZXRhZGF0YVJlYWRlciwgYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUpO1xuICAgICAgICAgICAgaWYgKCFjb250ZXh0LmNvbnRhaW5lci5vcHRpb25zLnNraXBCYXNlQ2xhc3NDaGVja3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50ID0gcmVmbGVjdGlvbl91dGlsc18xLmdldEJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudChtZXRhZGF0YVJlYWRlciwgYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUpO1xuICAgICAgICAgICAgICAgIGlmIChkZXBlbmRlbmNpZXMubGVuZ3RoIDwgYmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IEVSUk9SX01TR1MuQVJHVU1FTlRTX0xFTkdUSF9NSVNNQVRDSChyZWZsZWN0aW9uX3V0aWxzXzEuZ2V0RnVuY3Rpb25OYW1lKGJpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goZnVuY3Rpb24gKGRlcGVuZGVuY3kpIHtcbiAgICAgICAgICAgICAgICBfY3JlYXRlU3ViUmVxdWVzdHMobWV0YWRhdGFSZWFkZXIsIGZhbHNlLCBkZXBlbmRlbmN5LnNlcnZpY2VJZGVudGlmaWVyLCBjb250ZXh0LCBzdWJDaGlsZFJlcXVlc3QsIGRlcGVuZGVuY3kpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldEJpbmRpbmdzKGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICB2YXIgYmluZGluZ3MgPSBbXTtcbiAgICB2YXIgYmluZGluZ0RpY3Rpb25hcnkgPSBnZXRCaW5kaW5nRGljdGlvbmFyeShjb250YWluZXIpO1xuICAgIGlmIChiaW5kaW5nRGljdGlvbmFyeS5oYXNLZXkoc2VydmljZUlkZW50aWZpZXIpKSB7XG4gICAgICAgIGJpbmRpbmdzID0gYmluZGluZ0RpY3Rpb25hcnkuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29udGFpbmVyLnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICBiaW5kaW5ncyA9IGdldEJpbmRpbmdzKGNvbnRhaW5lci5wYXJlbnQsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGJpbmRpbmdzO1xufVxuZnVuY3Rpb24gcGxhbihtZXRhZGF0YVJlYWRlciwgY29udGFpbmVyLCBpc011bHRpSW5qZWN0LCB0YXJnZXRUeXBlLCBzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSwgYXZvaWRDb25zdHJhaW50cykge1xuICAgIGlmIChhdm9pZENvbnN0cmFpbnRzID09PSB2b2lkIDApIHsgYXZvaWRDb25zdHJhaW50cyA9IGZhbHNlOyB9XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgY29udGV4dF8xLkNvbnRleHQoY29udGFpbmVyKTtcbiAgICB2YXIgdGFyZ2V0ID0gX2NyZWF0ZVRhcmdldChpc011bHRpSW5qZWN0LCB0YXJnZXRUeXBlLCBzZXJ2aWNlSWRlbnRpZmllciwgXCJcIiwga2V5LCB2YWx1ZSk7XG4gICAgdHJ5IHtcbiAgICAgICAgX2NyZWF0ZVN1YlJlcXVlc3RzKG1ldGFkYXRhUmVhZGVyLCBhdm9pZENvbnN0cmFpbnRzLCBzZXJ2aWNlSWRlbnRpZmllciwgY29udGV4dCwgbnVsbCwgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXhjZXB0aW9uc18xLmlzU3RhY2tPdmVyZmxvd0V4ZXB0aW9uKGVycm9yKSkge1xuICAgICAgICAgICAgaWYgKGNvbnRleHQucGxhbikge1xuICAgICAgICAgICAgICAgIHNlcmlhbGl6YXRpb25fMS5jaXJjdWxhckRlcGVuZGVuY3lUb0V4Y2VwdGlvbihjb250ZXh0LnBsYW4ucm9vdFJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cbmV4cG9ydHMucGxhbiA9IHBsYW47XG5mdW5jdGlvbiBjcmVhdGVNb2NrUmVxdWVzdChjb250YWluZXIsIHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKSB7XG4gICAgdmFyIHRhcmdldCA9IG5ldyB0YXJnZXRfMS5UYXJnZXQobGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLlZhcmlhYmxlLCBcIlwiLCBzZXJ2aWNlSWRlbnRpZmllciwgbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoa2V5LCB2YWx1ZSkpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IGNvbnRleHRfMS5Db250ZXh0KGNvbnRhaW5lcik7XG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgcmVxdWVzdF8xLlJlcXVlc3Qoc2VydmljZUlkZW50aWZpZXIsIGNvbnRleHQsIG51bGwsIFtdLCB0YXJnZXQpO1xuICAgIHJldHVybiByZXF1ZXN0O1xufVxuZXhwb3J0cy5jcmVhdGVNb2NrUmVxdWVzdCA9IGNyZWF0ZU1vY2tSZXF1ZXN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlF1ZXJ5YWJsZVN0cmluZyA9IHZvaWQgMDtcbnZhciBRdWVyeWFibGVTdHJpbmcgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFF1ZXJ5YWJsZVN0cmluZyhzdHIpIHtcbiAgICAgICAgdGhpcy5zdHIgPSBzdHI7XG4gICAgfVxuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nKSA9PT0gMDtcbiAgICB9O1xuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbiAoc2VhcmNoU3RyaW5nKSB7XG4gICAgICAgIHZhciByZXZlcnNlU3RyaW5nID0gXCJcIjtcbiAgICAgICAgdmFyIHJldmVyc2VTZWFyY2hTdHJpbmcgPSBzZWFyY2hTdHJpbmcuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgICAgIHJldmVyc2VTdHJpbmcgPSB0aGlzLnN0ci5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRzV2l0aC5jYWxsKHsgc3RyOiByZXZlcnNlU3RyaW5nIH0sIHJldmVyc2VTZWFyY2hTdHJpbmcpO1xuICAgIH07XG4gICAgUXVlcnlhYmxlU3RyaW5nLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnN0ci5pbmRleE9mKHNlYXJjaFN0cmluZykgIT09IC0xKTtcbiAgICB9O1xuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKGNvbXBhcmVTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyID09PSBjb21wYXJlU3RyaW5nO1xuICAgIH07XG4gICAgUXVlcnlhYmxlU3RyaW5nLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgIH07XG4gICAgcmV0dXJuIFF1ZXJ5YWJsZVN0cmluZztcbn0oKSk7XG5leHBvcnRzLlF1ZXJ5YWJsZVN0cmluZyA9IFF1ZXJ5YWJsZVN0cmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fc3ByZWFkQXJyYXlzID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5cykgfHwgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcbiAgICByZXR1cm4gcjtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEZ1bmN0aW9uTmFtZSA9IGV4cG9ydHMuZ2V0QmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50ID0gZXhwb3J0cy5nZXREZXBlbmRlbmNpZXMgPSB2b2lkIDA7XG52YXIgaW5qZWN0XzEgPSByZXF1aXJlKFwiLi4vYW5ub3RhdGlvbi9pbmplY3RcIik7XG52YXIgRVJST1JfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIHNlcmlhbGl6YXRpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlscy9zZXJpYWxpemF0aW9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2V0RnVuY3Rpb25OYW1lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXJpYWxpemF0aW9uXzEuZ2V0RnVuY3Rpb25OYW1lOyB9IH0pO1xudmFyIHRhcmdldF8xID0gcmVxdWlyZShcIi4vdGFyZ2V0XCIpO1xuZnVuY3Rpb24gZ2V0RGVwZW5kZW5jaWVzKG1ldGFkYXRhUmVhZGVyLCBmdW5jKSB7XG4gICAgdmFyIGNvbnN0cnVjdG9yTmFtZSA9IHNlcmlhbGl6YXRpb25fMS5nZXRGdW5jdGlvbk5hbWUoZnVuYyk7XG4gICAgdmFyIHRhcmdldHMgPSBnZXRUYXJnZXRzKG1ldGFkYXRhUmVhZGVyLCBjb25zdHJ1Y3Rvck5hbWUsIGZ1bmMsIGZhbHNlKTtcbiAgICByZXR1cm4gdGFyZ2V0cztcbn1cbmV4cG9ydHMuZ2V0RGVwZW5kZW5jaWVzID0gZ2V0RGVwZW5kZW5jaWVzO1xuZnVuY3Rpb24gZ2V0VGFyZ2V0cyhtZXRhZGF0YVJlYWRlciwgY29uc3RydWN0b3JOYW1lLCBmdW5jLCBpc0Jhc2VDbGFzcykge1xuICAgIHZhciBtZXRhZGF0YSA9IG1ldGFkYXRhUmVhZGVyLmdldENvbnN0cnVjdG9yTWV0YWRhdGEoZnVuYyk7XG4gICAgdmFyIHNlcnZpY2VJZGVudGlmaWVycyA9IG1ldGFkYXRhLmNvbXBpbGVyR2VuZXJhdGVkTWV0YWRhdGE7XG4gICAgaWYgKHNlcnZpY2VJZGVudGlmaWVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBtc2cgPSBFUlJPUl9NU0dTLk1JU1NJTkdfSU5KRUNUQUJMRV9BTk5PVEFUSU9OICsgXCIgXCIgKyBjb25zdHJ1Y3Rvck5hbWUgKyBcIi5cIjtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuICAgIHZhciBjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YSA9IG1ldGFkYXRhLnVzZXJHZW5lcmF0ZWRNZXRhZGF0YTtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGNvbnN0cnVjdG9yQXJnc01ldGFkYXRhKTtcbiAgICB2YXIgaGFzVXNlckRlY2xhcmVkVW5rbm93bkluamVjdGlvbnMgPSAoZnVuYy5sZW5ndGggPT09IDAgJiYga2V5cy5sZW5ndGggPiAwKTtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IChoYXNVc2VyRGVjbGFyZWRVbmtub3duSW5qZWN0aW9ucykgPyBrZXlzLmxlbmd0aCA6IGZ1bmMubGVuZ3RoO1xuICAgIHZhciBjb25zdHJ1Y3RvclRhcmdldHMgPSBnZXRDb25zdHJ1Y3RvckFyZ3NBc1RhcmdldHMoaXNCYXNlQ2xhc3MsIGNvbnN0cnVjdG9yTmFtZSwgc2VydmljZUlkZW50aWZpZXJzLCBjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YSwgaXRlcmF0aW9ucyk7XG4gICAgdmFyIHByb3BlcnR5VGFyZ2V0cyA9IGdldENsYXNzUHJvcHNBc1RhcmdldHMobWV0YWRhdGFSZWFkZXIsIGZ1bmMpO1xuICAgIHZhciB0YXJnZXRzID0gX19zcHJlYWRBcnJheXMoY29uc3RydWN0b3JUYXJnZXRzLCBwcm9wZXJ0eVRhcmdldHMpO1xuICAgIHJldHVybiB0YXJnZXRzO1xufVxuZnVuY3Rpb24gZ2V0Q29uc3RydWN0b3JBcmdzQXNUYXJnZXQoaW5kZXgsIGlzQmFzZUNsYXNzLCBjb25zdHJ1Y3Rvck5hbWUsIHNlcnZpY2VJZGVudGlmaWVycywgY29uc3RydWN0b3JBcmdzTWV0YWRhdGEpIHtcbiAgICB2YXIgdGFyZ2V0TWV0YWRhdGEgPSBjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YVtpbmRleC50b1N0cmluZygpXSB8fCBbXTtcbiAgICB2YXIgbWV0YWRhdGEgPSBmb3JtYXRUYXJnZXRNZXRhZGF0YSh0YXJnZXRNZXRhZGF0YSk7XG4gICAgdmFyIGlzTWFuYWdlZCA9IG1ldGFkYXRhLnVubWFuYWdlZCAhPT0gdHJ1ZTtcbiAgICB2YXIgc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllcnNbaW5kZXhdO1xuICAgIHZhciBpbmplY3RJZGVudGlmaWVyID0gKG1ldGFkYXRhLmluamVjdCB8fCBtZXRhZGF0YS5tdWx0aUluamVjdCk7XG4gICAgc2VydmljZUlkZW50aWZpZXIgPSAoaW5qZWN0SWRlbnRpZmllcikgPyAoaW5qZWN0SWRlbnRpZmllcikgOiBzZXJ2aWNlSWRlbnRpZmllcjtcbiAgICBpZiAoc2VydmljZUlkZW50aWZpZXIgaW5zdGFuY2VvZiBpbmplY3RfMS5MYXp5U2VydmljZUlkZW50aWZlcikge1xuICAgICAgICBzZXJ2aWNlSWRlbnRpZmllciA9IHNlcnZpY2VJZGVudGlmaWVyLnVud3JhcCgpO1xuICAgIH1cbiAgICBpZiAoaXNNYW5hZ2VkKSB7XG4gICAgICAgIHZhciBpc09iamVjdCA9IHNlcnZpY2VJZGVudGlmaWVyID09PSBPYmplY3Q7XG4gICAgICAgIHZhciBpc0Z1bmN0aW9uID0gc2VydmljZUlkZW50aWZpZXIgPT09IEZ1bmN0aW9uO1xuICAgICAgICB2YXIgaXNVbmRlZmluZWQgPSBzZXJ2aWNlSWRlbnRpZmllciA9PT0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgaXNVbmtub3duVHlwZSA9IChpc09iamVjdCB8fCBpc0Z1bmN0aW9uIHx8IGlzVW5kZWZpbmVkKTtcbiAgICAgICAgaWYgKCFpc0Jhc2VDbGFzcyAmJiBpc1Vua25vd25UeXBlKSB7XG4gICAgICAgICAgICB2YXIgbXNnID0gRVJST1JfTVNHUy5NSVNTSU5HX0lOSkVDVF9BTk5PVEFUSU9OICsgXCIgYXJndW1lbnQgXCIgKyBpbmRleCArIFwiIGluIGNsYXNzIFwiICsgY29uc3RydWN0b3JOYW1lICsgXCIuXCI7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGFyZ2V0ID0gbmV3IHRhcmdldF8xLlRhcmdldChsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uQ29uc3RydWN0b3JBcmd1bWVudCwgbWV0YWRhdGEudGFyZ2V0TmFtZSwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICB0YXJnZXQubWV0YWRhdGEgPSB0YXJnZXRNZXRhZGF0YTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3RvckFyZ3NBc1RhcmdldHMoaXNCYXNlQ2xhc3MsIGNvbnN0cnVjdG9yTmFtZSwgc2VydmljZUlkZW50aWZpZXJzLCBjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YSwgaXRlcmF0aW9ucykge1xuICAgIHZhciB0YXJnZXRzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYXRpb25zOyBpKyspIHtcbiAgICAgICAgdmFyIGluZGV4ID0gaTtcbiAgICAgICAgdmFyIHRhcmdldCA9IGdldENvbnN0cnVjdG9yQXJnc0FzVGFyZ2V0KGluZGV4LCBpc0Jhc2VDbGFzcywgY29uc3RydWN0b3JOYW1lLCBzZXJ2aWNlSWRlbnRpZmllcnMsIGNvbnN0cnVjdG9yQXJnc01ldGFkYXRhKTtcbiAgICAgICAgaWYgKHRhcmdldCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGFyZ2V0cy5wdXNoKHRhcmdldCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldHM7XG59XG5mdW5jdGlvbiBnZXRDbGFzc1Byb3BzQXNUYXJnZXRzKG1ldGFkYXRhUmVhZGVyLCBjb25zdHJ1Y3RvckZ1bmMpIHtcbiAgICB2YXIgY2xhc3NQcm9wc01ldGFkYXRhID0gbWV0YWRhdGFSZWFkZXIuZ2V0UHJvcGVydGllc01ldGFkYXRhKGNvbnN0cnVjdG9yRnVuYyk7XG4gICAgdmFyIHRhcmdldHMgPSBbXTtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGNsYXNzUHJvcHNNZXRhZGF0YSk7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBrZXlzXzEgPSBrZXlzOyBfaSA8IGtleXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNfMVtfaV07XG4gICAgICAgIHZhciB0YXJnZXRNZXRhZGF0YSA9IGNsYXNzUHJvcHNNZXRhZGF0YVtrZXldO1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBmb3JtYXRUYXJnZXRNZXRhZGF0YShjbGFzc1Byb3BzTWV0YWRhdGFba2V5XSk7XG4gICAgICAgIHZhciB0YXJnZXROYW1lID0gbWV0YWRhdGEudGFyZ2V0TmFtZSB8fCBrZXk7XG4gICAgICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllciA9IChtZXRhZGF0YS5pbmplY3QgfHwgbWV0YWRhdGEubXVsdGlJbmplY3QpO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gbmV3IHRhcmdldF8xLlRhcmdldChsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uQ2xhc3NQcm9wZXJ0eSwgdGFyZ2V0TmFtZSwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICB0YXJnZXQubWV0YWRhdGEgPSB0YXJnZXRNZXRhZGF0YTtcbiAgICAgICAgdGFyZ2V0cy5wdXNoKHRhcmdldCk7XG4gICAgfVxuICAgIHZhciBiYXNlQ29uc3RydWN0b3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoY29uc3RydWN0b3JGdW5jLnByb3RvdHlwZSkuY29uc3RydWN0b3I7XG4gICAgaWYgKGJhc2VDb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSB7XG4gICAgICAgIHZhciBiYXNlVGFyZ2V0cyA9IGdldENsYXNzUHJvcHNBc1RhcmdldHMobWV0YWRhdGFSZWFkZXIsIGJhc2VDb25zdHJ1Y3Rvcik7XG4gICAgICAgIHRhcmdldHMgPSBfX3NwcmVhZEFycmF5cyh0YXJnZXRzLCBiYXNlVGFyZ2V0cyk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRzO1xufVxuZnVuY3Rpb24gZ2V0QmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50KG1ldGFkYXRhUmVhZGVyLCBmdW5jKSB7XG4gICAgdmFyIGJhc2VDb25zdHJ1Y3RvciA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihmdW5jLnByb3RvdHlwZSkuY29uc3RydWN0b3I7XG4gICAgaWYgKGJhc2VDb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSB7XG4gICAgICAgIHZhciBiYXNlQ29uc3RydWN0b3JOYW1lID0gc2VyaWFsaXphdGlvbl8xLmdldEZ1bmN0aW9uTmFtZShiYXNlQ29uc3RydWN0b3IpO1xuICAgICAgICB2YXIgdGFyZ2V0cyA9IGdldFRhcmdldHMobWV0YWRhdGFSZWFkZXIsIGJhc2VDb25zdHJ1Y3Rvck5hbWUsIGJhc2VDb25zdHJ1Y3RvciwgdHJ1ZSk7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHRhcmdldHMubWFwKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdC5tZXRhZGF0YS5maWx0ZXIoZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbS5rZXkgPT09IE1FVEFEQVRBX0tFWS5VTk1BTkFHRURfVEFHO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdW5tYW5hZ2VkQ291bnQgPSBbXS5jb25jYXQuYXBwbHkoW10sIG1ldGFkYXRhKS5sZW5ndGg7XG4gICAgICAgIHZhciBkZXBlbmRlbmN5Q291bnQgPSB0YXJnZXRzLmxlbmd0aCAtIHVubWFuYWdlZENvdW50O1xuICAgICAgICBpZiAoZGVwZW5kZW5jeUNvdW50ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlcGVuZGVuY3lDb3VudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRCYXNlQ2xhc3NEZXBlbmRlbmN5Q291bnQobWV0YWRhdGFSZWFkZXIsIGJhc2VDb25zdHJ1Y3Rvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0QmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50ID0gZ2V0QmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50O1xuZnVuY3Rpb24gZm9ybWF0VGFyZ2V0TWV0YWRhdGEodGFyZ2V0TWV0YWRhdGEpIHtcbiAgICB2YXIgdGFyZ2V0TWV0YWRhdGFNYXAgPSB7fTtcbiAgICB0YXJnZXRNZXRhZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIHRhcmdldE1ldGFkYXRhTWFwW20ua2V5LnRvU3RyaW5nKCldID0gbS52YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBpbmplY3Q6IHRhcmdldE1ldGFkYXRhTWFwW01FVEFEQVRBX0tFWS5JTkpFQ1RfVEFHXSxcbiAgICAgICAgbXVsdGlJbmplY3Q6IHRhcmdldE1ldGFkYXRhTWFwW01FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHXSxcbiAgICAgICAgdGFyZ2V0TmFtZTogdGFyZ2V0TWV0YWRhdGFNYXBbTUVUQURBVEFfS0VZLk5BTUVfVEFHXSxcbiAgICAgICAgdW5tYW5hZ2VkOiB0YXJnZXRNZXRhZGF0YU1hcFtNRVRBREFUQV9LRVkuVU5NQU5BR0VEX1RBR11cbiAgICB9O1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlJlcXVlc3QgPSB2b2lkIDA7XG52YXIgaWRfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9pZFwiKTtcbnZhciBSZXF1ZXN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZXF1ZXN0KHNlcnZpY2VJZGVudGlmaWVyLCBwYXJlbnRDb250ZXh0LCBwYXJlbnRSZXF1ZXN0LCBiaW5kaW5ncywgdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZF8xLmlkKCk7XG4gICAgICAgIHRoaXMuc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgdGhpcy5wYXJlbnRDb250ZXh0ID0gcGFyZW50Q29udGV4dDtcbiAgICAgICAgdGhpcy5wYXJlbnRSZXF1ZXN0ID0gcGFyZW50UmVxdWVzdDtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHRoaXMuY2hpbGRSZXF1ZXN0cyA9IFtdO1xuICAgICAgICB0aGlzLmJpbmRpbmdzID0gKEFycmF5LmlzQXJyYXkoYmluZGluZ3MpID8gYmluZGluZ3MgOiBbYmluZGluZ3NdKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0U2NvcGUgPSBwYXJlbnRSZXF1ZXN0ID09PSBudWxsXG4gICAgICAgICAgICA/IG5ldyBNYXAoKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5hZGRDaGlsZFJlcXVlc3QgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIGJpbmRpbmdzLCB0YXJnZXQpIHtcbiAgICAgICAgdmFyIGNoaWxkID0gbmV3IFJlcXVlc3Qoc2VydmljZUlkZW50aWZpZXIsIHRoaXMucGFyZW50Q29udGV4dCwgdGhpcywgYmluZGluZ3MsIHRhcmdldCk7XG4gICAgICAgIHRoaXMuY2hpbGRSZXF1ZXN0cy5wdXNoKGNoaWxkKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH07XG4gICAgcmV0dXJuIFJlcXVlc3Q7XG59KCkpO1xuZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UYXJnZXQgPSB2b2lkIDA7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuL21ldGFkYXRhXCIpO1xudmFyIHF1ZXJ5YWJsZV9zdHJpbmdfMSA9IHJlcXVpcmUoXCIuL3F1ZXJ5YWJsZV9zdHJpbmdcIik7XG52YXIgVGFyZ2V0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYXJnZXQodHlwZSwgbmFtZSwgc2VydmljZUlkZW50aWZpZXIsIG5hbWVkT3JUYWdnZWQpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlSWRlbnRpZmllciA9IHNlcnZpY2VJZGVudGlmaWVyO1xuICAgICAgICB0aGlzLm5hbWUgPSBuZXcgcXVlcnlhYmxlX3N0cmluZ18xLlF1ZXJ5YWJsZVN0cmluZyhuYW1lIHx8IFwiXCIpO1xuICAgICAgICB0aGlzLm1ldGFkYXRhID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHZhciBtZXRhZGF0YUl0ZW0gPSBudWxsO1xuICAgICAgICBpZiAodHlwZW9mIG5hbWVkT3JUYWdnZWQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIG1ldGFkYXRhSXRlbSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcsIG5hbWVkT3JUYWdnZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWVkT3JUYWdnZWQgaW5zdGFuY2VvZiBtZXRhZGF0YV8xLk1ldGFkYXRhKSB7XG4gICAgICAgICAgICBtZXRhZGF0YUl0ZW0gPSBuYW1lZE9yVGFnZ2VkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXRhZGF0YUl0ZW0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubWV0YWRhdGEucHVzaChtZXRhZGF0YUl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFRhcmdldC5wcm90b3R5cGUuaGFzVGFnID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5tZXRhZGF0YTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBtID0gX2FbX2ldO1xuICAgICAgICAgICAgaWYgKG0ua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmlzQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1RhZyhNRVRBREFUQV9LRVkuTVVMVElfSU5KRUNUX1RBRyk7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLm1hdGNoZXNBcnJheSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoZXNUYWcoTUVUQURBVEFfS0VZLk1VTFRJX0lOSkVDVF9UQUcpKG5hbWUpO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5pc05hbWVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNUYWcoTUVUQURBVEFfS0VZLk5BTUVEX1RBRyk7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmlzVGFnZ2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXRhZGF0YS5zb21lKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICByZXR1cm4gKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuSU5KRUNUX1RBRykgJiZcbiAgICAgICAgICAgICAgICAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHKSAmJlxuICAgICAgICAgICAgICAgIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLk5BTUVfVEFHKSAmJlxuICAgICAgICAgICAgICAgIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLlVOTUFOQUdFRF9UQUcpICYmXG4gICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuTkFNRURfVEFHKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmlzT3B0aW9uYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoZXNUYWcoTUVUQURBVEFfS0VZLk9QVElPTkFMX1RBRykodHJ1ZSk7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmdldE5hbWVkVGFnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc05hbWVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1ldGFkYXRhLmZpbHRlcihmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5rZXkgPT09IE1FVEFEQVRBX0tFWS5OQU1FRF9UQUc7IH0pWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5nZXRDdXN0b21UYWdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1RhZ2dlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZXRhZGF0YS5maWx0ZXIoZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuSU5KRUNUX1RBRykgJiZcbiAgICAgICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuTVVMVElfSU5KRUNUX1RBRykgJiZcbiAgICAgICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuTkFNRV9UQUcpICYmXG4gICAgICAgICAgICAgICAgICAgIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLlVOTUFOQUdFRF9UQUcpICYmXG4gICAgICAgICAgICAgICAgICAgIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLk5BTUVEX1RBRyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUubWF0Y2hlc05hbWVkVGFnID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlc1RhZyhNRVRBREFUQV9LRVkuTkFNRURfVEFHKShuYW1lKTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUubWF0Y2hlc1RhZyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IF90aGlzLm1ldGFkYXRhOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBtID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIGlmIChtLmtleSA9PT0ga2V5ICYmIG0udmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBUYXJnZXQ7XG59KCkpO1xuZXhwb3J0cy5UYXJnZXQgPSBUYXJnZXQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3NwcmVhZEFycmF5cyA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheXMpIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgICAgcltrXSA9IGFbal07XG4gICAgcmV0dXJuIHI7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZXNvbHZlSW5zdGFuY2UgPSB2b2lkIDA7XG52YXIgZXJyb3JfbXNnc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIGxpdGVyYWxfdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG5mdW5jdGlvbiBfaW5qZWN0UHJvcGVydGllcyhpbnN0YW5jZSwgY2hpbGRSZXF1ZXN0cywgcmVzb2x2ZVJlcXVlc3QpIHtcbiAgICB2YXIgcHJvcGVydHlJbmplY3Rpb25zUmVxdWVzdHMgPSBjaGlsZFJlcXVlc3RzLmZpbHRlcihmdW5jdGlvbiAoY2hpbGRSZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiAoY2hpbGRSZXF1ZXN0LnRhcmdldCAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgY2hpbGRSZXF1ZXN0LnRhcmdldC50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uQ2xhc3NQcm9wZXJ0eSk7XG4gICAgfSk7XG4gICAgdmFyIHByb3BlcnR5SW5qZWN0aW9ucyA9IHByb3BlcnR5SW5qZWN0aW9uc1JlcXVlc3RzLm1hcChyZXNvbHZlUmVxdWVzdCk7XG4gICAgcHJvcGVydHlJbmplY3Rpb25zUmVxdWVzdHMuZm9yRWFjaChmdW5jdGlvbiAociwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IFwiXCI7XG4gICAgICAgIHByb3BlcnR5TmFtZSA9IHIudGFyZ2V0Lm5hbWUudmFsdWUoKTtcbiAgICAgICAgdmFyIGluamVjdGlvbiA9IHByb3BlcnR5SW5qZWN0aW9uc1tpbmRleF07XG4gICAgICAgIGluc3RhbmNlW3Byb3BlcnR5TmFtZV0gPSBpbmplY3Rpb247XG4gICAgfSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xufVxuZnVuY3Rpb24gX2NyZWF0ZUluc3RhbmNlKEZ1bmMsIGluamVjdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IChGdW5jLmJpbmQuYXBwbHkoRnVuYywgX19zcHJlYWRBcnJheXMoW3ZvaWQgMF0sIGluamVjdGlvbnMpKSkoKTtcbn1cbmZ1bmN0aW9uIF9wb3N0Q29uc3RydWN0KGNvbnN0ciwgcmVzdWx0KSB7XG4gICAgaWYgKFJlZmxlY3QuaGFzTWV0YWRhdGEoTUVUQURBVEFfS0VZLlBPU1RfQ09OU1RSVUNULCBjb25zdHIpKSB7XG4gICAgICAgIHZhciBkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YShNRVRBREFUQV9LRVkuUE9TVF9DT05TVFJVQ1QsIGNvbnN0cik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHRbZGF0YS52YWx1ZV0oKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yX21zZ3NfMS5QT1NUX0NPTlNUUlVDVF9FUlJPUihjb25zdHIubmFtZSwgZS5tZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiByZXNvbHZlSW5zdGFuY2UoY29uc3RyLCBjaGlsZFJlcXVlc3RzLCByZXNvbHZlUmVxdWVzdCkge1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIGlmIChjaGlsZFJlcXVlc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGNvbnN0cnVjdG9ySW5qZWN0aW9uc1JlcXVlc3RzID0gY2hpbGRSZXF1ZXN0cy5maWx0ZXIoZnVuY3Rpb24gKGNoaWxkUmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIChjaGlsZFJlcXVlc3QudGFyZ2V0ICE9PSBudWxsICYmIGNoaWxkUmVxdWVzdC50YXJnZXQudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLkNvbnN0cnVjdG9yQXJndW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGNvbnN0cnVjdG9ySW5qZWN0aW9ucyA9IGNvbnN0cnVjdG9ySW5qZWN0aW9uc1JlcXVlc3RzLm1hcChyZXNvbHZlUmVxdWVzdCk7XG4gICAgICAgIHJlc3VsdCA9IF9jcmVhdGVJbnN0YW5jZShjb25zdHIsIGNvbnN0cnVjdG9ySW5qZWN0aW9ucyk7XG4gICAgICAgIHJlc3VsdCA9IF9pbmplY3RQcm9wZXJ0aWVzKHJlc3VsdCwgY2hpbGRSZXF1ZXN0cywgcmVzb2x2ZVJlcXVlc3QpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IGNvbnN0cigpO1xuICAgIH1cbiAgICBfcG9zdENvbnN0cnVjdChjb25zdHIsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMucmVzb2x2ZUluc3RhbmNlID0gcmVzb2x2ZUluc3RhbmNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlc29sdmUgPSB2b2lkIDA7XG52YXIgRVJST1JfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG52YXIgZXhjZXB0aW9uc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL2V4Y2VwdGlvbnNcIik7XG52YXIgc2VyaWFsaXphdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlcmlhbGl6YXRpb25cIik7XG52YXIgaW5zdGFudGlhdGlvbl8xID0gcmVxdWlyZShcIi4vaW5zdGFudGlhdGlvblwiKTtcbnZhciBpbnZva2VGYWN0b3J5ID0gZnVuY3Rpb24gKGZhY3RvcnlUeXBlLCBzZXJ2aWNlSWRlbnRpZmllciwgZm4pIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChleGNlcHRpb25zXzEuaXNTdGFja092ZXJmbG93RXhlcHRpb24oZXJyb3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5DSVJDVUxBUl9ERVBFTkRFTkNZX0lOX0ZBQ1RPUlkoZmFjdG9yeVR5cGUsIHNlcnZpY2VJZGVudGlmaWVyLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxufTtcbnZhciBfcmVzb2x2ZVJlcXVlc3QgPSBmdW5jdGlvbiAocmVxdWVzdFNjb3BlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgIHJlcXVlc3QucGFyZW50Q29udGV4dC5zZXRDdXJyZW50UmVxdWVzdChyZXF1ZXN0KTtcbiAgICAgICAgdmFyIGJpbmRpbmdzID0gcmVxdWVzdC5iaW5kaW5ncztcbiAgICAgICAgdmFyIGNoaWxkUmVxdWVzdHMgPSByZXF1ZXN0LmNoaWxkUmVxdWVzdHM7XG4gICAgICAgIHZhciB0YXJnZXRJc0FuQXJyYXkgPSByZXF1ZXN0LnRhcmdldCAmJiByZXF1ZXN0LnRhcmdldC5pc0FycmF5KCk7XG4gICAgICAgIHZhciB0YXJnZXRQYXJlbnRJc05vdEFuQXJyYXkgPSAhcmVxdWVzdC5wYXJlbnRSZXF1ZXN0IHx8XG4gICAgICAgICAgICAhcmVxdWVzdC5wYXJlbnRSZXF1ZXN0LnRhcmdldCB8fFxuICAgICAgICAgICAgIXJlcXVlc3QudGFyZ2V0IHx8XG4gICAgICAgICAgICAhcmVxdWVzdC5wYXJlbnRSZXF1ZXN0LnRhcmdldC5tYXRjaGVzQXJyYXkocmVxdWVzdC50YXJnZXQuc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAodGFyZ2V0SXNBbkFycmF5ICYmIHRhcmdldFBhcmVudElzTm90QW5BcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkUmVxdWVzdHMubWFwKGZ1bmN0aW9uIChjaGlsZFJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2YgPSBfcmVzb2x2ZVJlcXVlc3QocmVxdWVzdFNjb3BlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2YoY2hpbGRSZXF1ZXN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC50YXJnZXQuaXNPcHRpb25hbCgpICYmIGJpbmRpbmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYmluZGluZ18xID0gYmluZGluZ3NbMF07XG4gICAgICAgICAgICB2YXIgaXNTaW5nbGV0b24gPSBiaW5kaW5nXzEuc2NvcGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlNpbmdsZXRvbjtcbiAgICAgICAgICAgIHZhciBpc1JlcXVlc3RTaW5nbGV0b24gPSBiaW5kaW5nXzEuc2NvcGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlJlcXVlc3Q7XG4gICAgICAgICAgICBpZiAoaXNTaW5nbGV0b24gJiYgYmluZGluZ18xLmFjdGl2YXRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5nXzEuY2FjaGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNSZXF1ZXN0U2luZ2xldG9uICYmXG4gICAgICAgICAgICAgICAgcmVxdWVzdFNjb3BlICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgcmVxdWVzdFNjb3BlLmhhcyhiaW5kaW5nXzEuaWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3RTY29wZS5nZXQoYmluZGluZ18xLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiaW5kaW5nXzEudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5Db25zdGFudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYmluZGluZ18xLmNhY2hlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBiaW5kaW5nXzEuY2FjaGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kaW5nXzEudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5Db25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGJpbmRpbmdfMS5pbXBsZW1lbnRhdGlvblR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kaW5nXzEudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5EeW5hbWljVmFsdWUgJiYgYmluZGluZ18xLmR5bmFtaWNWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGludm9rZUZhY3RvcnkoXCJ0b0R5bmFtaWNWYWx1ZVwiLCBiaW5kaW5nXzEuc2VydmljZUlkZW50aWZpZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJpbmRpbmdfMS5keW5hbWljVmFsdWUocmVxdWVzdC5wYXJlbnRDb250ZXh0KTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kaW5nXzEudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5GYWN0b3J5ICYmIGJpbmRpbmdfMS5mYWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW52b2tlRmFjdG9yeShcInRvRmFjdG9yeVwiLCBiaW5kaW5nXzEuc2VydmljZUlkZW50aWZpZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJpbmRpbmdfMS5mYWN0b3J5KHJlcXVlc3QucGFyZW50Q29udGV4dCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uUHJvdmlkZXIgJiYgYmluZGluZ18xLnByb3ZpZGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW52b2tlRmFjdG9yeShcInRvUHJvdmlkZXJcIiwgYmluZGluZ18xLnNlcnZpY2VJZGVudGlmaWVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBiaW5kaW5nXzEucHJvdmlkZXIocmVxdWVzdC5wYXJlbnRDb250ZXh0KTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kaW5nXzEudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5JbnN0YW5jZSAmJiBiaW5kaW5nXzEuaW1wbGVtZW50YXRpb25UeXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW5zdGFudGlhdGlvbl8xLnJlc29sdmVJbnN0YW5jZShiaW5kaW5nXzEuaW1wbGVtZW50YXRpb25UeXBlLCBjaGlsZFJlcXVlc3RzLCBfcmVzb2x2ZVJlcXVlc3QocmVxdWVzdFNjb3BlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXIgPSBzZXJpYWxpemF0aW9uXzEuZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZyhyZXF1ZXN0LnNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5JTlZBTElEX0JJTkRJTkdfVFlQRSArIFwiIFwiICsgc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBiaW5kaW5nXzEub25BY3RpdmF0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBiaW5kaW5nXzEub25BY3RpdmF0aW9uKHJlcXVlc3QucGFyZW50Q29udGV4dCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1NpbmdsZXRvbikge1xuICAgICAgICAgICAgICAgIGJpbmRpbmdfMS5jYWNoZSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBiaW5kaW5nXzEuYWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1JlcXVlc3RTaW5nbGV0b24gJiZcbiAgICAgICAgICAgICAgICByZXF1ZXN0U2NvcGUgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAhcmVxdWVzdFNjb3BlLmhhcyhiaW5kaW5nXzEuaWQpKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdFNjb3BlLnNldChiaW5kaW5nXzEuaWQsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfTtcbn07XG5mdW5jdGlvbiByZXNvbHZlKGNvbnRleHQpIHtcbiAgICB2YXIgX2YgPSBfcmVzb2x2ZVJlcXVlc3QoY29udGV4dC5wbGFuLnJvb3RSZXF1ZXN0LnJlcXVlc3RTY29wZSk7XG4gICAgcmV0dXJuIF9mKGNvbnRleHQucGxhbi5yb290UmVxdWVzdCk7XG59XG5leHBvcnRzLnJlc29sdmUgPSByZXNvbHZlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJpbmRpbmdJblN5bnRheCA9IHZvaWQgMDtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG52YXIgYmluZGluZ193aGVuX29uX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ193aGVuX29uX3N5bnRheFwiKTtcbnZhciBCaW5kaW5nSW5TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdJblN5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgIH1cbiAgICBCaW5kaW5nSW5TeW50YXgucHJvdG90eXBlLmluUmVxdWVzdFNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnNjb3BlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uUmVxdWVzdDtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJblN5bnRheC5wcm90b3R5cGUuaW5TaW5nbGV0b25TY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5zY29wZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlNpbmdsZXRvbjtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJblN5bnRheC5wcm90b3R5cGUuaW5UcmFuc2llbnRTY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5zY29wZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlRyYW5zaWVudDtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIHJldHVybiBCaW5kaW5nSW5TeW50YXg7XG59KCkpO1xuZXhwb3J0cy5CaW5kaW5nSW5TeW50YXggPSBCaW5kaW5nSW5TeW50YXg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQmluZGluZ0luV2hlbk9uU3ludGF4ID0gdm9pZCAwO1xudmFyIGJpbmRpbmdfaW5fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX2luX3N5bnRheFwiKTtcbnZhciBiaW5kaW5nX29uX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ19vbl9zeW50YXhcIik7XG52YXIgYmluZGluZ193aGVuX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ193aGVuX3N5bnRheFwiKTtcbnZhciBCaW5kaW5nSW5XaGVuT25TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdJbldoZW5PblN5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgICAgICB0aGlzLl9iaW5kaW5nV2hlblN5bnRheCA9IG5ldyBiaW5kaW5nX3doZW5fc3ludGF4XzEuQmluZGluZ1doZW5TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdPblN5bnRheCA9IG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICAgICAgdGhpcy5fYmluZGluZ0luU3ludGF4ID0gbmV3IGJpbmRpbmdfaW5fc3ludGF4XzEuQmluZGluZ0luU3ludGF4KGJpbmRpbmcpO1xuICAgIH1cbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLmluUmVxdWVzdFNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ0luU3ludGF4LmluUmVxdWVzdFNjb3BlKCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLmluU2luZ2xldG9uU2NvcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nSW5TeW50YXguaW5TaW5nbGV0b25TY29wZSgpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS5pblRyYW5zaWVudFNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ0luU3ludGF4LmluVHJhbnNpZW50U2NvcGUoKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbiA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0TmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblRhcmdldE5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0SXNEZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblRhcmdldElzRGVmYXVsdCgpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXRUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5JbmplY3RlZEludG8gPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuSW5qZWN0ZWRJbnRvKHBhcmVudCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnROYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuUGFyZW50TmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnRUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblBhcmVudFRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9ySXMgPSBmdW5jdGlvbiAoYW5jZXN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3RvcklzKGFuY2VzdG9yKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JJcyA9IGZ1bmN0aW9uIChhbmNlc3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JJcyhhbmNlc3Rvcik7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3Rvck5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkFueUFuY2VzdG9yVGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yTmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yVGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JNYXRjaGVzID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3Rvck1hdGNoZXMoY29uc3RyYWludCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3Rvck1hdGNoZXMoY29uc3RyYWludCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLm9uQWN0aXZhdGlvbiA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nT25TeW50YXgub25BY3RpdmF0aW9uKGhhbmRsZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdJbldoZW5PblN5bnRheDtcbn0oKSk7XG5leHBvcnRzLkJpbmRpbmdJbldoZW5PblN5bnRheCA9IEJpbmRpbmdJbldoZW5PblN5bnRheDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CaW5kaW5nT25TeW50YXggPSB2b2lkIDA7XG52YXIgYmluZGluZ193aGVuX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ193aGVuX3N5bnRheFwiKTtcbnZhciBCaW5kaW5nT25TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdPblN5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgIH1cbiAgICBCaW5kaW5nT25TeW50YXgucHJvdG90eXBlLm9uQWN0aXZhdGlvbiA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcub25BY3RpdmF0aW9uID0gaGFuZGxlcjtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fc3ludGF4XzEuQmluZGluZ1doZW5TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICByZXR1cm4gQmluZGluZ09uU3ludGF4O1xufSgpKTtcbmV4cG9ydHMuQmluZGluZ09uU3ludGF4ID0gQmluZGluZ09uU3ludGF4O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJpbmRpbmdUb1N5bnRheCA9IHZvaWQgMDtcbnZhciBFUlJPUl9NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIGxpdGVyYWxfdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbnZhciBiaW5kaW5nX2luX3doZW5fb25fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX2luX3doZW5fb25fc3ludGF4XCIpO1xudmFyIGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfd2hlbl9vbl9zeW50YXhcIik7XG52YXIgQmluZGluZ1RvU3ludGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaW5kaW5nVG9TeW50YXgoYmluZGluZykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nID0gYmluZGluZztcbiAgICB9XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50byA9IGZ1bmN0aW9uIChjb25zdHJ1Y3Rvcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkluc3RhbmNlO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSA9IGNvbnN0cnVjdG9yO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfaW5fd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nSW5XaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvU2VsZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9iaW5kaW5nLnNlcnZpY2VJZGVudGlmaWVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiICsgRVJST1JfTVNHUy5JTlZBTElEX1RPX1NFTEZfVkFMVUUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWxmID0gdGhpcy5fYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgcmV0dXJuIHRoaXMudG8oc2VsZik7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvQ29uc3RhbnRWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkNvbnN0YW50VmFsdWU7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY2FjaGUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5keW5hbWljVmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSA9IG51bGw7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX29uX3N5bnRheF8xLkJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvRHluYW1pY1ZhbHVlID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5EeW5hbWljVmFsdWU7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY2FjaGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmR5bmFtaWNWYWx1ZSA9IGZ1bmM7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX2luX3doZW5fb25fc3ludGF4XzEuQmluZGluZ0luV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b0NvbnN0cnVjdG9yID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uQ29uc3RydWN0b3I7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlID0gY29uc3RydWN0b3I7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX29uX3N5bnRheF8xLkJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvRmFjdG9yeSA9IGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uRmFjdG9yeTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5mYWN0b3J5ID0gZmFjdG9yeTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9GdW5jdGlvbiA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZnVuYyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5JTlZBTElEX0ZVTkNUSU9OX0JJTkRJTkcpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBiaW5kaW5nV2hlbk9uU3ludGF4ID0gdGhpcy50b0NvbnN0YW50VmFsdWUoZnVuYyk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uRnVuY3Rpb247XG4gICAgICAgIHJldHVybiBiaW5kaW5nV2hlbk9uU3ludGF4O1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b0F1dG9GYWN0b3J5ID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uRmFjdG9yeTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5mYWN0b3J5ID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgICAgIHZhciBhdXRvZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbnRleHQuY29udGFpbmVyLmdldChzZXJ2aWNlSWRlbnRpZmllcik7IH07XG4gICAgICAgICAgICByZXR1cm4gYXV0b2ZhY3Rvcnk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX29uX3N5bnRheF8xLkJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvUHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5Qcm92aWRlcjtcbiAgICAgICAgdGhpcy5fYmluZGluZy5wcm92aWRlciA9IHByb3ZpZGVyO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b1NlcnZpY2UgPSBmdW5jdGlvbiAoc2VydmljZSkge1xuICAgICAgICB0aGlzLnRvRHluYW1pY1ZhbHVlKGZ1bmN0aW9uIChjb250ZXh0KSB7IHJldHVybiBjb250ZXh0LmNvbnRhaW5lci5nZXQoc2VydmljZSk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdUb1N5bnRheDtcbn0oKSk7XG5leHBvcnRzLkJpbmRpbmdUb1N5bnRheCA9IEJpbmRpbmdUb1N5bnRheDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CaW5kaW5nV2hlbk9uU3ludGF4ID0gdm9pZCAwO1xudmFyIGJpbmRpbmdfb25fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX29uX3N5bnRheFwiKTtcbnZhciBiaW5kaW5nX3doZW5fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX3doZW5fc3ludGF4XCIpO1xudmFyIEJpbmRpbmdXaGVuT25TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdXaGVuT25TeW50YXgoYmluZGluZykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nID0gYmluZGluZztcbiAgICAgICAgdGhpcy5fYmluZGluZ1doZW5TeW50YXggPSBuZXcgYmluZGluZ193aGVuX3N5bnRheF8xLkJpbmRpbmdXaGVuU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgICAgICB0aGlzLl9iaW5kaW5nT25TeW50YXggPSBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfVxuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW4gPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbihjb25zdHJhaW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXROYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuVGFyZ2V0TmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0SXNEZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblRhcmdldElzRGVmYXVsdCgpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldFRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuVGFyZ2V0VGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkluamVjdGVkSW50byA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5JbmplY3RlZEludG8ocGFyZW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnROYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuUGFyZW50TmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuUGFyZW50VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5QYXJlbnRUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JJcyA9IGZ1bmN0aW9uIChhbmNlc3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkFueUFuY2VzdG9ySXMoYW5jZXN0b3IpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JJcyA9IGZ1bmN0aW9uIChhbmNlc3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JJcyhhbmNlc3Rvcik7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JOYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JOYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3RvclRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yTmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3RvclRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3RvclRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3Rvck1hdGNoZXMgPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkFueUFuY2VzdG9yTWF0Y2hlcyhjb25zdHJhaW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3Rvck1hdGNoZXMoY29uc3RyYWludCk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS5vbkFjdGl2YXRpb24gPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ09uU3ludGF4Lm9uQWN0aXZhdGlvbihoYW5kbGVyKTtcbiAgICB9O1xuICAgIHJldHVybiBCaW5kaW5nV2hlbk9uU3ludGF4O1xufSgpKTtcbmV4cG9ydHMuQmluZGluZ1doZW5PblN5bnRheCA9IEJpbmRpbmdXaGVuT25TeW50YXg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQmluZGluZ1doZW5TeW50YXggPSB2b2lkIDA7XG52YXIgYmluZGluZ19vbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfb25fc3ludGF4XCIpO1xudmFyIGNvbnN0cmFpbnRfaGVscGVyc18xID0gcmVxdWlyZShcIi4vY29uc3RyYWludF9oZWxwZXJzXCIpO1xudmFyIEJpbmRpbmdXaGVuU3ludGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaW5kaW5nV2hlblN5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgIH1cbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbiA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGNvbnN0cmFpbnQ7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gY29uc3RyYWludF9oZWxwZXJzXzEubmFtZWRDb25zdHJhaW50KG5hbWUpO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXRJc0RlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0SXNEZWZhdWx0ID0gKHJlcXVlc3QudGFyZ2V0ICE9PSBudWxsKSAmJlxuICAgICAgICAgICAgICAgICghcmVxdWVzdC50YXJnZXQuaXNOYW1lZCgpKSAmJlxuICAgICAgICAgICAgICAgICghcmVxdWVzdC50YXJnZXQuaXNUYWdnZWQoKSk7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0SXNEZWZhdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXRUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBjb25zdHJhaW50X2hlbHBlcnNfMS50YWdnZWRDb25zdHJhaW50KHRhZykodmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5JbmplY3RlZEludG8gPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RyYWludF9oZWxwZXJzXzEudHlwZUNvbnN0cmFpbnQocGFyZW50KShyZXF1ZXN0LnBhcmVudFJlcXVlc3QpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnROYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RyYWludF9oZWxwZXJzXzEubmFtZWRDb25zdHJhaW50KG5hbWUpKHJlcXVlc3QucGFyZW50UmVxdWVzdCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlblBhcmVudFRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RyYWludF9oZWxwZXJzXzEudGFnZ2VkQ29uc3RyYWludCh0YWcpKHZhbHVlKShyZXF1ZXN0LnBhcmVudFJlcXVlc3QpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3RvcklzID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnRfaGVscGVyc18xLnR5cGVDb25zdHJhaW50KGFuY2VzdG9yKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JJcyA9IGZ1bmN0aW9uIChhbmNlc3Rvcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuICFjb25zdHJhaW50X2hlbHBlcnNfMS50cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgY29uc3RyYWludF9oZWxwZXJzXzEudHlwZUNvbnN0cmFpbnQoYW5jZXN0b3IpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JOYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnRfaGVscGVyc18xLm5hbWVkQ29uc3RyYWludChuYW1lKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JOYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gIWNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50X2hlbHBlcnNfMS5uYW1lZENvbnN0cmFpbnQobmFtZSkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3RvclRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnRfaGVscGVyc18xLnRhZ2dlZENvbnN0cmFpbnQodGFnKSh2YWx1ZSkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiAhY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnRfaGVscGVyc18xLnRhZ2dlZENvbnN0cmFpbnQodGFnKSh2YWx1ZSkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3Rvck1hdGNoZXMgPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3Rvck1hdGNoZXMgPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuICFjb25zdHJhaW50X2hlbHBlcnNfMS50cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgY29uc3RyYWludCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICByZXR1cm4gQmluZGluZ1doZW5TeW50YXg7XG59KCkpO1xuZXhwb3J0cy5CaW5kaW5nV2hlblN5bnRheCA9IEJpbmRpbmdXaGVuU3ludGF4O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnR5cGVDb25zdHJhaW50ID0gZXhwb3J0cy5uYW1lZENvbnN0cmFpbnQgPSBleHBvcnRzLnRhZ2dlZENvbnN0cmFpbnQgPSBleHBvcnRzLnRyYXZlcnNlQW5jZXJzdG9ycyA9IHZvaWQgMDtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbnZhciB0cmF2ZXJzZUFuY2Vyc3RvcnMgPSBmdW5jdGlvbiAocmVxdWVzdCwgY29uc3RyYWludCkge1xuICAgIHZhciBwYXJlbnQgPSByZXF1ZXN0LnBhcmVudFJlcXVlc3Q7XG4gICAgaWYgKHBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gY29uc3RyYWludChwYXJlbnQpID8gdHJ1ZSA6IHRyYXZlcnNlQW5jZXJzdG9ycyhwYXJlbnQsIGNvbnN0cmFpbnQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5leHBvcnRzLnRyYXZlcnNlQW5jZXJzdG9ycyA9IHRyYXZlcnNlQW5jZXJzdG9ycztcbnZhciB0YWdnZWRDb25zdHJhaW50ID0gZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFyIGNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gcmVxdWVzdCAhPT0gbnVsbCAmJiByZXF1ZXN0LnRhcmdldCAhPT0gbnVsbCAmJiByZXF1ZXN0LnRhcmdldC5tYXRjaGVzVGFnKGtleSkodmFsdWUpO1xuICAgIH07XG4gICAgY29uc3RyYWludC5tZXRhRGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKGtleSwgdmFsdWUpO1xuICAgIHJldHVybiBjb25zdHJhaW50O1xufTsgfTtcbmV4cG9ydHMudGFnZ2VkQ29uc3RyYWludCA9IHRhZ2dlZENvbnN0cmFpbnQ7XG52YXIgbmFtZWRDb25zdHJhaW50ID0gdGFnZ2VkQ29uc3RyYWludChNRVRBREFUQV9LRVkuTkFNRURfVEFHKTtcbmV4cG9ydHMubmFtZWRDb25zdHJhaW50ID0gbmFtZWRDb25zdHJhaW50O1xudmFyIHR5cGVDb25zdHJhaW50ID0gZnVuY3Rpb24gKHR5cGUpIHsgcmV0dXJuIGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgdmFyIGJpbmRpbmcgPSBudWxsO1xuICAgIGlmIChyZXF1ZXN0ICE9PSBudWxsKSB7XG4gICAgICAgIGJpbmRpbmcgPSByZXF1ZXN0LmJpbmRpbmdzWzBdO1xuICAgICAgICBpZiAodHlwZW9mIHR5cGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllciA9IGJpbmRpbmcuc2VydmljZUlkZW50aWZpZXI7XG4gICAgICAgICAgICByZXR1cm4gc2VydmljZUlkZW50aWZpZXIgPT09IHR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgY29uc3RydWN0b3IgPSByZXF1ZXN0LmJpbmRpbmdzWzBdLmltcGxlbWVudGF0aW9uVHlwZTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlID09PSBjb25zdHJ1Y3RvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59OyB9O1xuZXhwb3J0cy50eXBlQ29uc3RyYWludCA9IHR5cGVDb25zdHJhaW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm11bHRpQmluZFRvU2VydmljZSA9IHZvaWQgMDtcbmV4cG9ydHMubXVsdGlCaW5kVG9TZXJ2aWNlID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHR5cGVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHR5cGVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodCkgeyByZXR1cm4gY29udGFpbmVyLmJpbmQodCkudG9TZXJ2aWNlKHNlcnZpY2UpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc1N0YWNrT3ZlcmZsb3dFeGVwdGlvbiA9IHZvaWQgMDtcbnZhciBFUlJPUl9NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xuZnVuY3Rpb24gaXNTdGFja092ZXJmbG93RXhlcHRpb24oZXJyb3IpIHtcbiAgICByZXR1cm4gKGVycm9yIGluc3RhbmNlb2YgUmFuZ2VFcnJvciB8fFxuICAgICAgICBlcnJvci5tZXNzYWdlID09PSBFUlJPUl9NU0dTLlNUQUNLX09WRVJGTE9XKTtcbn1cbmV4cG9ydHMuaXNTdGFja092ZXJmbG93RXhlcHRpb24gPSBpc1N0YWNrT3ZlcmZsb3dFeGVwdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pZCA9IHZvaWQgMDtcbnZhciBpZENvdW50ZXIgPSAwO1xuZnVuY3Rpb24gaWQoKSB7XG4gICAgcmV0dXJuIGlkQ291bnRlcisrO1xufVxuZXhwb3J0cy5pZCA9IGlkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNpcmN1bGFyRGVwZW5kZW5jeVRvRXhjZXB0aW9uID0gZXhwb3J0cy5saXN0TWV0YWRhdGFGb3JUYXJnZXQgPSBleHBvcnRzLmxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllciA9IGV4cG9ydHMuZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZyA9IGV4cG9ydHMuZ2V0RnVuY3Rpb25OYW1lID0gdm9pZCAwO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG5mdW5jdGlvbiBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgaWYgKHR5cGVvZiBzZXJ2aWNlSWRlbnRpZmllciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBfc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgcmV0dXJuIF9zZXJ2aWNlSWRlbnRpZmllci5uYW1lO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygc2VydmljZUlkZW50aWZpZXIgPT09IFwic3ltYm9sXCIpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJZGVudGlmaWVyLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgX3NlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXI7XG4gICAgICAgIHJldHVybiBfc2VydmljZUlkZW50aWZpZXI7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nID0gZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZztcbmZ1bmN0aW9uIGxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllcihjb250YWluZXIsIHNlcnZpY2VJZGVudGlmaWVyLCBnZXRCaW5kaW5ncykge1xuICAgIHZhciByZWdpc3RlcmVkQmluZGluZ3NMaXN0ID0gXCJcIjtcbiAgICB2YXIgcmVnaXN0ZXJlZEJpbmRpbmdzID0gZ2V0QmluZGluZ3MoY29udGFpbmVyLCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgaWYgKHJlZ2lzdGVyZWRCaW5kaW5ncy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCA9IFwiXFxuUmVnaXN0ZXJlZCBiaW5kaW5nczpcIjtcbiAgICAgICAgcmVnaXN0ZXJlZEJpbmRpbmdzLmZvckVhY2goZnVuY3Rpb24gKGJpbmRpbmcpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gXCJPYmplY3RcIjtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBnZXRGdW5jdGlvbk5hbWUoYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCA9IHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3QgKyBcIlxcbiBcIiArIG5hbWU7XG4gICAgICAgICAgICBpZiAoYmluZGluZy5jb25zdHJhaW50Lm1ldGFEYXRhKSB7XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCA9IHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3QgKyBcIiAtIFwiICsgYmluZGluZy5jb25zdHJhaW50Lm1ldGFEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3Q7XG59XG5leHBvcnRzLmxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllciA9IGxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllcjtcbmZ1bmN0aW9uIGFscmVhZHlEZXBlbmRlbmN5Q2hhaW4ocmVxdWVzdCwgc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICBpZiAocmVxdWVzdC5wYXJlbnRSZXF1ZXN0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVxdWVzdC5wYXJlbnRSZXF1ZXN0LnNlcnZpY2VJZGVudGlmaWVyID09PSBzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBhbHJlYWR5RGVwZW5kZW5jeUNoYWluKHJlcXVlc3QucGFyZW50UmVxdWVzdCwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRlcGVuZGVuY3lDaGFpblRvU3RyaW5nKHJlcXVlc3QpIHtcbiAgICBmdW5jdGlvbiBfY3JlYXRlU3RyaW5nQXJyKHJlcSwgcmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgeyByZXN1bHQgPSBbXTsgfVxuICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXIgPSBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHJlcS5zZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIHJlc3VsdC5wdXNoKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKHJlcS5wYXJlbnRSZXF1ZXN0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NyZWF0ZVN0cmluZ0FycihyZXEucGFyZW50UmVxdWVzdCwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB2YXIgc3RyaW5nQXJyID0gX2NyZWF0ZVN0cmluZ0FycihyZXF1ZXN0KTtcbiAgICByZXR1cm4gc3RyaW5nQXJyLnJldmVyc2UoKS5qb2luKFwiIC0tPiBcIik7XG59XG5mdW5jdGlvbiBjaXJjdWxhckRlcGVuZGVuY3lUb0V4Y2VwdGlvbihyZXF1ZXN0KSB7XG4gICAgcmVxdWVzdC5jaGlsZFJlcXVlc3RzLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkUmVxdWVzdCkge1xuICAgICAgICBpZiAoYWxyZWFkeURlcGVuZGVuY3lDaGFpbihjaGlsZFJlcXVlc3QsIGNoaWxkUmVxdWVzdC5zZXJ2aWNlSWRlbnRpZmllcikpIHtcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlcyA9IGRlcGVuZGVuY3lDaGFpblRvU3RyaW5nKGNoaWxkUmVxdWVzdCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5DSVJDVUxBUl9ERVBFTkRFTkNZICsgXCIgXCIgKyBzZXJ2aWNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjaXJjdWxhckRlcGVuZGVuY3lUb0V4Y2VwdGlvbihjaGlsZFJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmNpcmN1bGFyRGVwZW5kZW5jeVRvRXhjZXB0aW9uID0gY2lyY3VsYXJEZXBlbmRlbmN5VG9FeGNlcHRpb247XG5mdW5jdGlvbiBsaXN0TWV0YWRhdGFGb3JUYXJnZXQoc2VydmljZUlkZW50aWZpZXJTdHJpbmcsIHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuaXNUYWdnZWQoKSB8fCB0YXJnZXQuaXNOYW1lZCgpKSB7XG4gICAgICAgIHZhciBtXzEgPSBcIlwiO1xuICAgICAgICB2YXIgbmFtZWRUYWcgPSB0YXJnZXQuZ2V0TmFtZWRUYWcoKTtcbiAgICAgICAgdmFyIG90aGVyVGFncyA9IHRhcmdldC5nZXRDdXN0b21UYWdzKCk7XG4gICAgICAgIGlmIChuYW1lZFRhZyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbV8xICs9IG5hbWVkVGFnLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlclRhZ3MgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG90aGVyVGFncy5mb3JFYWNoKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgICAgICAgICBtXzEgKz0gdGFnLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiIFwiICsgc2VydmljZUlkZW50aWZpZXJTdHJpbmcgKyBcIlxcbiBcIiArIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nICsgXCIgLSBcIiArIG1fMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcIiBcIiArIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nO1xuICAgIH1cbn1cbmV4cG9ydHMubGlzdE1ldGFkYXRhRm9yVGFyZ2V0ID0gbGlzdE1ldGFkYXRhRm9yVGFyZ2V0O1xuZnVuY3Rpb24gZ2V0RnVuY3Rpb25OYW1lKHYpIHtcbiAgICBpZiAodi5uYW1lKSB7XG4gICAgICAgIHJldHVybiB2Lm5hbWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgbmFtZV8xID0gdi50b1N0cmluZygpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBuYW1lXzEubWF0Y2goL15mdW5jdGlvblxccyooW15cXHMoXSspLyk7XG4gICAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogXCJBbm9ueW1vdXMgZnVuY3Rpb246IFwiICsgbmFtZV8xO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0RnVuY3Rpb25OYW1lID0gZ2V0RnVuY3Rpb25OYW1lO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBwZXJjZW50VHdlbnRpZXMgPSAvJTIwL2c7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgRm9ybWF0ID0ge1xuICAgIFJGQzE3Mzg6ICdSRkMxNzM4JyxcbiAgICBSRkMzOTg2OiAnUkZDMzk4Nidcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbC5hc3NpZ24oXG4gICAge1xuICAgICAgICAnZGVmYXVsdCc6IEZvcm1hdC5SRkMzOTg2LFxuICAgICAgICBmb3JtYXR0ZXJzOiB7XG4gICAgICAgICAgICBSRkMxNzM4OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVwbGFjZS5jYWxsKHZhbHVlLCBwZXJjZW50VHdlbnRpZXMsICcrJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUkZDMzk4NjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEZvcm1hdFxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG52YXIgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmb3JtYXRzOiBmb3JtYXRzLFxuICAgIHBhcnNlOiBwYXJzZSxcbiAgICBzdHJpbmdpZnk6IHN0cmluZ2lmeVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgYWxsb3dQcm90b3R5cGVzOiBmYWxzZSxcbiAgICBhcnJheUxpbWl0OiAyMCxcbiAgICBjaGFyc2V0OiAndXRmLTgnLFxuICAgIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gICAgY29tbWE6IGZhbHNlLFxuICAgIGRlY29kZXI6IHV0aWxzLmRlY29kZSxcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBkZXB0aDogNSxcbiAgICBpZ25vcmVRdWVyeVByZWZpeDogZmFsc2UsXG4gICAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiBmYWxzZSxcbiAgICBwYXJhbWV0ZXJMaW1pdDogMTAwMCxcbiAgICBwYXJzZUFycmF5czogdHJ1ZSxcbiAgICBwbGFpbk9iamVjdHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBpbnRlcnByZXROdW1lcmljRW50aXRpZXMgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mIyhcXGQrKTsvZywgZnVuY3Rpb24gKCQwLCBudW1iZXJTdHIpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobnVtYmVyU3RyLCAxMCkpO1xuICAgIH0pO1xufTtcblxudmFyIHBhcnNlQXJyYXlWYWx1ZSA9IGZ1bmN0aW9uICh2YWwsIG9wdGlvbnMpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnICYmIG9wdGlvbnMuY29tbWEgJiYgdmFsLmluZGV4T2YoJywnKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiB2YWwuc3BsaXQoJywnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsO1xufTtcblxudmFyIG1heWJlTWFwID0gZnVuY3Rpb24gbWF5YmVNYXAodmFsLCBmbikge1xuICAgIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgICAgdmFyIG1hcHBlZCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgbWFwcGVkLnB1c2goZm4odmFsW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcHBlZDtcbiAgICB9XG4gICAgcmV0dXJuIGZuKHZhbCk7XG59O1xuXG4vLyBUaGlzIGlzIHdoYXQgYnJvd3NlcnMgd2lsbCBzdWJtaXQgd2hlbiB0aGUg4pyTIGNoYXJhY3RlciBvY2N1cnMgaW4gYW5cbi8vIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCBib2R5IGFuZCB0aGUgZW5jb2Rpbmcgb2YgdGhlIHBhZ2UgY29udGFpbmluZ1xuLy8gdGhlIGZvcm0gaXMgaXNvLTg4NTktMSwgb3Igd2hlbiB0aGUgc3VibWl0dGVkIGZvcm0gaGFzIGFuIGFjY2VwdC1jaGFyc2V0XG4vLyBhdHRyaWJ1dGUgb2YgaXNvLTg4NTktMS4gUHJlc3VtYWJseSBhbHNvIHdpdGggb3RoZXIgY2hhcnNldHMgdGhhdCBkbyBub3QgY29udGFpblxuLy8gdGhlIOKckyBjaGFyYWN0ZXIsIHN1Y2ggYXMgdXMtYXNjaWkuXG52YXIgaXNvU2VudGluZWwgPSAndXRmOD0lMjYlMjMxMDAwMyUzQic7IC8vIGVuY29kZVVSSUNvbXBvbmVudCgnJiMxMDAwMzsnKVxuXG4vLyBUaGVzZSBhcmUgdGhlIHBlcmNlbnQtZW5jb2RlZCB1dGYtOCBvY3RldHMgcmVwcmVzZW50aW5nIGEgY2hlY2ttYXJrLCBpbmRpY2F0aW5nIHRoYXQgdGhlIHJlcXVlc3QgYWN0dWFsbHkgaXMgdXRmLTggZW5jb2RlZC5cbnZhciBjaGFyc2V0U2VudGluZWwgPSAndXRmOD0lRTIlOUMlOTMnOyAvLyBlbmNvZGVVUklDb21wb25lbnQoJ+KckycpXG5cbnZhciBwYXJzZVZhbHVlcyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdWYWx1ZXMoc3RyLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIHZhciBjbGVhblN0ciA9IG9wdGlvbnMuaWdub3JlUXVlcnlQcmVmaXggPyBzdHIucmVwbGFjZSgvXlxcPy8sICcnKSA6IHN0cjtcbiAgICB2YXIgbGltaXQgPSBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSBJbmZpbml0eSA/IHVuZGVmaW5lZCA6IG9wdGlvbnMucGFyYW1ldGVyTGltaXQ7XG4gICAgdmFyIHBhcnRzID0gY2xlYW5TdHIuc3BsaXQob3B0aW9ucy5kZWxpbWl0ZXIsIGxpbWl0KTtcbiAgICB2YXIgc2tpcEluZGV4ID0gLTE7IC8vIEtlZXAgdHJhY2sgb2Ygd2hlcmUgdGhlIHV0Zjggc2VudGluZWwgd2FzIGZvdW5kXG4gICAgdmFyIGk7XG5cbiAgICB2YXIgY2hhcnNldCA9IG9wdGlvbnMuY2hhcnNldDtcbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAocGFydHNbaV0uaW5kZXhPZigndXRmOD0nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0c1tpXSA9PT0gY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJzZXQgPSAndXRmLTgnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFydHNbaV0gPT09IGlzb1NlbnRpbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJzZXQgPSAnaXNvLTg4NTktMSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNraXBJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgaSA9IHBhcnRzLmxlbmd0aDsgLy8gVGhlIGVzbGludCBzZXR0aW5ncyBkbyBub3QgYWxsb3cgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKGkgPT09IHNraXBJbmRleCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcblxuICAgICAgICB2YXIgYnJhY2tldEVxdWFsc1BvcyA9IHBhcnQuaW5kZXhPZignXT0nKTtcbiAgICAgICAgdmFyIHBvcyA9IGJyYWNrZXRFcXVhbHNQb3MgPT09IC0xID8gcGFydC5pbmRleE9mKCc9JykgOiBicmFja2V0RXF1YWxzUG9zICsgMTtcblxuICAgICAgICB2YXIga2V5LCB2YWw7XG4gICAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydCwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ2tleScpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPyBudWxsIDogJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZSgwLCBwb3MpLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0LCAna2V5Jyk7XG4gICAgICAgICAgICB2YWwgPSBtYXliZU1hcChcbiAgICAgICAgICAgICAgICBwYXJzZUFycmF5VmFsdWUocGFydC5zbGljZShwb3MgKyAxKSwgb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVuY29kZWRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZGVjb2RlcihlbmNvZGVkVmFsLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0LCAndmFsdWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbCAmJiBvcHRpb25zLmludGVycHJldE51bWVyaWNFbnRpdGllcyAmJiBjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgICAgIHZhbCA9IGludGVycHJldE51bWVyaWNFbnRpdGllcyh2YWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnQuaW5kZXhPZignW109JykgPiAtMSkge1xuICAgICAgICAgICAgdmFsID0gaXNBcnJheSh2YWwpID8gW3ZhbF0gOiB2YWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHV0aWxzLmNvbWJpbmUob2JqW2tleV0sIHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgcGFyc2VPYmplY3QgPSBmdW5jdGlvbiAoY2hhaW4sIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKSB7XG4gICAgdmFyIGxlYWYgPSB2YWx1ZXNQYXJzZWQgPyB2YWwgOiBwYXJzZUFycmF5VmFsdWUodmFsLCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIGkgPSBjaGFpbi5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgb2JqO1xuICAgICAgICB2YXIgcm9vdCA9IGNoYWluW2ldO1xuXG4gICAgICAgIGlmIChyb290ID09PSAnW10nICYmIG9wdGlvbnMucGFyc2VBcnJheXMpIHtcbiAgICAgICAgICAgIG9iaiA9IFtdLmNvbmNhdChsZWFmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgICAgICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3QuY2hhckF0KDApID09PSAnWycgJiYgcm9vdC5jaGFyQXQocm9vdC5sZW5ndGggLSAxKSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCAtMSkgOiByb290O1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucGFyc2VBcnJheXMgJiYgY2xlYW5Sb290ID09PSAnJykge1xuICAgICAgICAgICAgICAgIG9iaiA9IHsgMDogbGVhZiB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAhaXNOYU4oaW5kZXgpXG4gICAgICAgICAgICAgICAgJiYgcm9vdCAhPT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgU3RyaW5nKGluZGV4KSA9PT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgaW5kZXggPj0gMFxuICAgICAgICAgICAgICAgICYmIChvcHRpb25zLnBhcnNlQXJyYXlzICYmIGluZGV4IDw9IG9wdGlvbnMuYXJyYXlMaW1pdClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgICAgIG9ialtpbmRleF0gPSBsZWFmO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbY2xlYW5Sb290XSA9IGxlYWY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZWFmID0gb2JqOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgfVxuXG4gICAgcmV0dXJuIGxlYWY7XG59O1xuXG52YXIgcGFyc2VLZXlzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ0tleXMoZ2l2ZW5LZXksIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKSB7XG4gICAgaWYgKCFnaXZlbktleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtIGRvdCBub3RhdGlvbiB0byBicmFja2V0IG5vdGF0aW9uXG4gICAgdmFyIGtleSA9IG9wdGlvbnMuYWxsb3dEb3RzID8gZ2l2ZW5LZXkucmVwbGFjZSgvXFwuKFteLltdKykvZywgJ1skMV0nKSA6IGdpdmVuS2V5O1xuXG4gICAgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gICAgdmFyIGJyYWNrZXRzID0gLyhcXFtbXltcXF1dKl0pLztcbiAgICB2YXIgY2hpbGQgPSAvKFxcW1teW1xcXV0qXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IG9wdGlvbnMuZGVwdGggPiAwICYmIGJyYWNrZXRzLmV4ZWMoa2V5KTtcbiAgICB2YXIgcGFyZW50ID0gc2VnbWVudCA/IGtleS5zbGljZSgwLCBzZWdtZW50LmluZGV4KSA6IGtleTtcblxuICAgIC8vIFN0YXNoIHRoZSBwYXJlbnQgaWYgaXQgZXhpc3RzXG5cbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlbid0IHVzaW5nIHBsYWluIG9iamVjdHMsIG9wdGlvbmFsbHkgcHJlZml4IGtleXMgdGhhdCB3b3VsZCBvdmVyd3JpdGUgb2JqZWN0IHByb3RvdHlwZSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgcGFyZW50KSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMucHVzaChwYXJlbnQpO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChvcHRpb25zLmRlcHRoID4gMCAmJiAoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNlZ21lbnRbMV0uc2xpY2UoMSwgLTEpKSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlT2JqZWN0KGtleXMsIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKTtcbn07XG5cbnZhciBub3JtYWxpemVQYXJzZU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVQYXJzZU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZGVjb2RlciAhPT0gbnVsbCAmJiBvcHRzLmRlY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0cy5kZWNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RlY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICB2YXIgY2hhcnNldCA9IHR5cGVvZiBvcHRzLmNoYXJzZXQgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuY2hhcnNldCA6IG9wdHMuY2hhcnNldDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGFsbG93UHJvdG90eXBlczogdHlwZW9mIG9wdHMuYWxsb3dQcm90b3R5cGVzID09PSAnYm9vbGVhbicgPyBvcHRzLmFsbG93UHJvdG90eXBlcyA6IGRlZmF1bHRzLmFsbG93UHJvdG90eXBlcyxcbiAgICAgICAgYXJyYXlMaW1pdDogdHlwZW9mIG9wdHMuYXJyYXlMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRzLmFycmF5TGltaXQgOiBkZWZhdWx0cy5hcnJheUxpbWl0LFxuICAgICAgICBjaGFyc2V0OiBjaGFyc2V0LFxuICAgICAgICBjaGFyc2V0U2VudGluZWw6IHR5cGVvZiBvcHRzLmNoYXJzZXRTZW50aW5lbCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaGFyc2V0U2VudGluZWwgOiBkZWZhdWx0cy5jaGFyc2V0U2VudGluZWwsXG4gICAgICAgIGNvbW1hOiB0eXBlb2Ygb3B0cy5jb21tYSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jb21tYSA6IGRlZmF1bHRzLmNvbW1hLFxuICAgICAgICBkZWNvZGVyOiB0eXBlb2Ygb3B0cy5kZWNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5kZWNvZGVyIDogZGVmYXVsdHMuZGVjb2RlcixcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICdzdHJpbmcnIHx8IHV0aWxzLmlzUmVnRXhwKG9wdHMuZGVsaW1pdGVyKSA/IG9wdHMuZGVsaW1pdGVyIDogZGVmYXVsdHMuZGVsaW1pdGVyLFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8taW1wbGljaXQtY29lcmNpb24sIG5vLWV4dHJhLXBhcmVuc1xuICAgICAgICBkZXB0aDogKHR5cGVvZiBvcHRzLmRlcHRoID09PSAnbnVtYmVyJyB8fCBvcHRzLmRlcHRoID09PSBmYWxzZSkgPyArb3B0cy5kZXB0aCA6IGRlZmF1bHRzLmRlcHRoLFxuICAgICAgICBpZ25vcmVRdWVyeVByZWZpeDogb3B0cy5pZ25vcmVRdWVyeVByZWZpeCA9PT0gdHJ1ZSxcbiAgICAgICAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiB0eXBlb2Ygb3B0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgPT09ICdib29sZWFuJyA/IG9wdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzIDogZGVmYXVsdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzLFxuICAgICAgICBwYXJhbWV0ZXJMaW1pdDogdHlwZW9mIG9wdHMucGFyYW1ldGVyTGltaXQgPT09ICdudW1iZXInID8gb3B0cy5wYXJhbWV0ZXJMaW1pdCA6IGRlZmF1bHRzLnBhcmFtZXRlckxpbWl0LFxuICAgICAgICBwYXJzZUFycmF5czogb3B0cy5wYXJzZUFycmF5cyAhPT0gZmFsc2UsXG4gICAgICAgIHBsYWluT2JqZWN0czogdHlwZW9mIG9wdHMucGxhaW5PYmplY3RzID09PSAnYm9vbGVhbicgPyBvcHRzLnBsYWluT2JqZWN0cyA6IGRlZmF1bHRzLnBsYWluT2JqZWN0cyxcbiAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0ciwgb3B0cykge1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplUGFyc2VPcHRpb25zKG9wdHMpO1xuXG4gICAgaWYgKHN0ciA9PT0gJycgfHwgc3RyID09PSBudWxsIHx8IHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcE9iaiA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gcGFyc2VWYWx1ZXMoc3RyLCBvcHRpb25zKSA6IHN0cjtcbiAgICB2YXIgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGtleXMgYW5kIHNldHVwIHRoZSBuZXcgb2JqZWN0XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRlbXBPYmopO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIG5ld09iaiA9IHBhcnNlS2V5cyhrZXksIHRlbXBPYmpba2V5XSwgb3B0aW9ucywgdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpO1xuICAgICAgICBvYmogPSB1dGlscy5tZXJnZShvYmosIG5ld09iaiwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHV0aWxzLmNvbXBhY3Qob2JqKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGFycmF5UHJlZml4R2VuZXJhdG9ycyA9IHtcbiAgICBicmFja2V0czogZnVuY3Rpb24gYnJhY2tldHMocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnW10nO1xuICAgIH0sXG4gICAgY29tbWE6ICdjb21tYScsXG4gICAgaW5kaWNlczogZnVuY3Rpb24gaW5kaWNlcyhwcmVmaXgsIGtleSkge1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1snICsga2V5ICsgJ10nO1xuICAgIH0sXG4gICAgcmVwZWF0OiBmdW5jdGlvbiByZXBlYXQocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIHB1c2ggPSBBcnJheS5wcm90b3R5cGUucHVzaDtcbnZhciBwdXNoVG9BcnJheSA9IGZ1bmN0aW9uIChhcnIsIHZhbHVlT3JBcnJheSkge1xuICAgIHB1c2guYXBwbHkoYXJyLCBpc0FycmF5KHZhbHVlT3JBcnJheSkgPyB2YWx1ZU9yQXJyYXkgOiBbdmFsdWVPckFycmF5XSk7XG59O1xuXG52YXIgdG9JU08gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcblxudmFyIGRlZmF1bHRGb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWRkUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGVuY29kZTogdHJ1ZSxcbiAgICBlbmNvZGVyOiB1dGlscy5lbmNvZGUsXG4gICAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGZvcm1hdHRlcjogZm9ybWF0cy5mb3JtYXR0ZXJzW2RlZmF1bHRGb3JtYXRdLFxuICAgIC8vIGRlcHJlY2F0ZWRcbiAgICBpbmRpY2VzOiBmYWxzZSxcbiAgICBzZXJpYWxpemVEYXRlOiBmdW5jdGlvbiBzZXJpYWxpemVEYXRlKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRvSVNPLmNhbGwoZGF0ZSk7XG4gICAgfSxcbiAgICBza2lwTnVsbHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBpc05vbk51bGxpc2hQcmltaXRpdmUgPSBmdW5jdGlvbiBpc05vbk51bGxpc2hQcmltaXRpdmUodikge1xuICAgIHJldHVybiB0eXBlb2YgdiA9PT0gJ3N0cmluZydcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdudW1iZXInXG4gICAgICAgIHx8IHR5cGVvZiB2ID09PSAnYm9vbGVhbidcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdzeW1ib2wnXG4gICAgICAgIHx8IHR5cGVvZiB2ID09PSAnYmlnaW50Jztcbn07XG5cbnZhciBzdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkoXG4gICAgb2JqZWN0LFxuICAgIHByZWZpeCxcbiAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICBza2lwTnVsbHMsXG4gICAgZW5jb2RlcixcbiAgICBmaWx0ZXIsXG4gICAgc29ydCxcbiAgICBhbGxvd0RvdHMsXG4gICAgc2VyaWFsaXplRGF0ZSxcbiAgICBmb3JtYXR0ZXIsXG4gICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICBjaGFyc2V0XG4pIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9iaiA9IGZpbHRlcihwcmVmaXgsIG9iaik7XG4gICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIG9iaiA9IHNlcmlhbGl6ZURhdGUob2JqKTtcbiAgICB9IGVsc2UgaWYgKGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdjb21tYScgJiYgaXNBcnJheShvYmopKSB7XG4gICAgICAgIG9iaiA9IG9iai5qb2luKCcsJyk7XG4gICAgfVxuXG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoc3RyaWN0TnVsbEhhbmRsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlciAmJiAhZW5jb2RlVmFsdWVzT25seSA/IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAna2V5JykgOiBwcmVmaXg7XG4gICAgICAgIH1cblxuICAgICAgICBvYmogPSAnJztcbiAgICB9XG5cbiAgICBpZiAoaXNOb25OdWxsaXNoUHJpbWl0aXZlKG9iaikgfHwgdXRpbHMuaXNCdWZmZXIob2JqKSkge1xuICAgICAgICBpZiAoZW5jb2Rlcikge1xuICAgICAgICAgICAgdmFyIGtleVZhbHVlID0gZW5jb2RlVmFsdWVzT25seSA/IHByZWZpeCA6IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAna2V5Jyk7XG4gICAgICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihrZXlWYWx1ZSkgKyAnPScgKyBmb3JtYXR0ZXIoZW5jb2RlcihvYmosIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICd2YWx1ZScpKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIocHJlZml4KSArICc9JyArIGZvcm1hdHRlcihTdHJpbmcob2JqKSldO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzO1xuICAgIGlmIChpc0FycmF5KGZpbHRlcikpIHtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIG9iaktleXMgPSBzb3J0ID8ga2V5cy5zb3J0KHNvcnQpIDoga2V5cztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICBwdXNoVG9BcnJheSh2YWx1ZXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICB0eXBlb2YgZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2Z1bmN0aW9uJyA/IGdlbmVyYXRlQXJyYXlQcmVmaXgocHJlZml4LCBrZXkpIDogcHJlZml4LFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgICAgIGNoYXJzZXRcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHVzaFRvQXJyYXkodmFsdWVzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgcHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICAgICAgY2hhcnNldFxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufTtcblxudmFyIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmVuY29kZXIgIT09IG51bGwgJiYgb3B0cy5lbmNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZW5jb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbmNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBjaGFyc2V0ID0gb3B0cy5jaGFyc2V0IHx8IGRlZmF1bHRzLmNoYXJzZXQ7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHZhciBmb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZvcm1hdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKCFoYXMuY2FsbChmb3JtYXRzLmZvcm1hdHRlcnMsIG9wdHMuZm9ybWF0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBmb3JtYXQgb3B0aW9uIHByb3ZpZGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdCA9IG9wdHMuZm9ybWF0O1xuICAgIH1cbiAgICB2YXIgZm9ybWF0dGVyID0gZm9ybWF0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG5cbiAgICB2YXIgZmlsdGVyID0gZGVmYXVsdHMuZmlsdGVyO1xuICAgIGlmICh0eXBlb2Ygb3B0cy5maWx0ZXIgPT09ICdmdW5jdGlvbicgfHwgaXNBcnJheShvcHRzLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0cy5maWx0ZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkUXVlcnlQcmVmaXg6IHR5cGVvZiBvcHRzLmFkZFF1ZXJ5UHJlZml4ID09PSAnYm9vbGVhbicgPyBvcHRzLmFkZFF1ZXJ5UHJlZml4IDogZGVmYXVsdHMuYWRkUXVlcnlQcmVmaXgsXG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGNoYXJzZXQ6IGNoYXJzZXQsXG4gICAgICAgIGNoYXJzZXRTZW50aW5lbDogdHlwZW9mIG9wdHMuY2hhcnNldFNlbnRpbmVsID09PSAnYm9vbGVhbicgPyBvcHRzLmNoYXJzZXRTZW50aW5lbCA6IGRlZmF1bHRzLmNoYXJzZXRTZW50aW5lbCxcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuZGVsaW1pdGVyIDogb3B0cy5kZWxpbWl0ZXIsXG4gICAgICAgIGVuY29kZTogdHlwZW9mIG9wdHMuZW5jb2RlID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZSA6IGRlZmF1bHRzLmVuY29kZSxcbiAgICAgICAgZW5jb2RlcjogdHlwZW9mIG9wdHMuZW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuZW5jb2RlciA6IGRlZmF1bHRzLmVuY29kZXIsXG4gICAgICAgIGVuY29kZVZhbHVlc09ubHk6IHR5cGVvZiBvcHRzLmVuY29kZVZhbHVlc09ubHkgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlVmFsdWVzT25seSA6IGRlZmF1bHRzLmVuY29kZVZhbHVlc09ubHksXG4gICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlcixcbiAgICAgICAgc2VyaWFsaXplRGF0ZTogdHlwZW9mIG9wdHMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgIHNraXBOdWxsczogdHlwZW9mIG9wdHMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRzLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscyxcbiAgICAgICAgc29ydDogdHlwZW9mIG9wdHMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc29ydCA6IG51bGwsXG4gICAgICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG9wdHMpIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKTtcblxuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRzICYmIG9wdHMuYXJyYXlGb3JtYXQgaW4gYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5hcnJheUZvcm1hdDtcbiAgICB9IGVsc2UgaWYgKG9wdHMgJiYgJ2luZGljZXMnIGluIG9wdHMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmluZGljZXMgPyAnaW5kaWNlcycgOiAncmVwZWF0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheUZvcm1hdCA9ICdpbmRpY2VzJztcbiAgICB9XG5cbiAgICB2YXIgZ2VuZXJhdGVBcnJheVByZWZpeCA9IGFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG5cbiAgICBpZiAoIW9iaktleXMpIHtcbiAgICAgICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQob3B0aW9ucy5zb3J0KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBwdXNoVG9BcnJheShrZXlzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2tpcE51bGxzLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGUgPyBvcHRpb25zLmVuY29kZXIgOiBudWxsLFxuICAgICAgICAgICAgb3B0aW9ucy5maWx0ZXIsXG4gICAgICAgICAgICBvcHRpb25zLnNvcnQsXG4gICAgICAgICAgICBvcHRpb25zLmFsbG93RG90cyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgIG9wdGlvbnMuZm9ybWF0dGVyLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgb3B0aW9ucy5jaGFyc2V0XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHZhciBqb2luZWQgPSBrZXlzLmpvaW4ob3B0aW9ucy5kZWxpbWl0ZXIpO1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmFkZFF1ZXJ5UHJlZml4ID09PSB0cnVlID8gJz8nIDogJyc7XG5cbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JyksIHRoZSBcIm51bWVyaWMgZW50aXR5XCIgcmVwcmVzZW50YXRpb24gb2YgYSBjaGVja21hcmtcbiAgICAgICAgICAgIHByZWZpeCArPSAndXRmOD0lMjYlMjMxMDAwMyUzQiYnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSVFMiU5QyU5MyYnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpvaW5lZC5sZW5ndGggPiAwID8gcHJlZml4ICsgam9pbmVkIDogJyc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxudmFyIGhleFRhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgICAgIGFycmF5LnB1c2goJyUnICsgKChpIDwgMTYgPyAnMCcgOiAnJykgKyBpLnRvU3RyaW5nKDE2KSkudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xufSgpKTtcblxudmFyIGNvbXBhY3RRdWV1ZSA9IGZ1bmN0aW9uIGNvbXBhY3RRdWV1ZShxdWV1ZSkge1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWUucG9wKCk7XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhciBjb21wYWN0ZWQgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYmoubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtqXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFjdGVkLnB1c2gob2JqW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ub2JqW2l0ZW0ucHJvcF0gPSBjb21wYWN0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIGFycmF5VG9PYmplY3Qoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIG1lcmdlID0gZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICAvKiBlc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246IDAgKi9cbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0YXJnZXQucHVzaChzb3VyY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKChvcHRpb25zICYmIChvcHRpb25zLnBsYWluT2JqZWN0cyB8fCBvcHRpb25zLmFsbG93UHJvdG90eXBlcykpIHx8ICFoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3NvdXJjZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFt0YXJnZXQsIHNvdXJjZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0IHx8IHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBbdGFyZ2V0XS5jb25jYXQoc291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgbWVyZ2VUYXJnZXQgPSB0YXJnZXQ7XG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiAhaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIG1lcmdlVGFyZ2V0ID0gYXJyYXlUb09iamVjdCh0YXJnZXQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwodGFyZ2V0LCBpKSkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRJdGVtID0gdGFyZ2V0W2ldO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRJdGVtICYmIHR5cGVvZiB0YXJnZXRJdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBtZXJnZSh0YXJnZXRJdGVtLCBpdGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKGFjYywga2V5KSkge1xuICAgICAgICAgICAgYWNjW2tleV0gPSBtZXJnZShhY2Nba2V5XSwgdmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIG1lcmdlVGFyZ2V0KTtcbn07XG5cbnZhciBhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ25TaW5nbGVTb3VyY2UodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIGFjY1trZXldID0gc291cmNlW2tleV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgdGFyZ2V0KTtcbn07XG5cbnZhciBkZWNvZGUgPSBmdW5jdGlvbiAoc3RyLCBkZWNvZGVyLCBjaGFyc2V0KSB7XG4gICAgdmFyIHN0cldpdGhvdXRQbHVzID0gc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgIGlmIChjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgLy8gdW5lc2NhcGUgbmV2ZXIgdGhyb3dzLCBubyB0cnkuLi5jYXRjaCBuZWVkZWQ6XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cy5yZXBsYWNlKC8lWzAtOWEtZl17Mn0vZ2ksIHVuZXNjYXBlKTtcbiAgICB9XG4gICAgLy8gdXRmLThcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cldpdGhvdXRQbHVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cztcbiAgICB9XG59O1xuXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKHN0ciwgZGVmYXVsdEVuY29kZXIsIGNoYXJzZXQpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHN0cjtcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgc3RyaW5nID0gU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN0cik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICBzdHJpbmcgPSBTdHJpbmcoc3RyKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHJldHVybiBlc2NhcGUoc3RyaW5nKS5yZXBsYWNlKC8ldVswLTlhLWZdezR9L2dpLCBmdW5jdGlvbiAoJDApIHtcbiAgICAgICAgICAgIHJldHVybiAnJTI2JTIzJyArIHBhcnNlSW50KCQwLnNsaWNlKDIpLCAxNikgKyAnJTNCJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYyA9PT0gMHgyRCAvLyAtXG4gICAgICAgICAgICB8fCBjID09PSAweDJFIC8vIC5cbiAgICAgICAgICAgIHx8IGMgPT09IDB4NUYgLy8gX1xuICAgICAgICAgICAgfHwgYyA9PT0gMHg3RSAvLyB+XG4gICAgICAgICAgICB8fCAoYyA+PSAweDMwICYmIGMgPD0gMHgzOSkgLy8gMC05XG4gICAgICAgICAgICB8fCAoYyA+PSAweDQxICYmIGMgPD0gMHg1QSkgLy8gYS16XG4gICAgICAgICAgICB8fCAoYyA+PSAweDYxICYmIGMgPD0gMHg3QSkgLy8gQS1aXG4gICAgICAgICkge1xuICAgICAgICAgICAgb3V0ICs9IHN0cmluZy5jaGFyQXQoaSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgaGV4VGFibGVbY107XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEMwIHwgKGMgPj4gNildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweEQ4MDAgfHwgYyA+PSAweEUwMDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEUwIHwgKGMgPj4gMTIpXSArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpICs9IDE7XG4gICAgICAgIGMgPSAweDEwMDAwICsgKCgoYyAmIDB4M0ZGKSA8PCAxMCkgfCAoc3RyaW5nLmNoYXJDb2RlQXQoaSkgJiAweDNGRikpO1xuICAgICAgICBvdXQgKz0gaGV4VGFibGVbMHhGMCB8IChjID4+IDE4KV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiAxMikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbnZhciBjb21wYWN0ID0gZnVuY3Rpb24gY29tcGFjdCh2YWx1ZSkge1xuICAgIHZhciBxdWV1ZSA9IFt7IG9iajogeyBvOiB2YWx1ZSB9LCBwcm9wOiAnbycgfV07XG4gICAgdmFyIHJlZnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZVtpXTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2pdO1xuICAgICAgICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCAmJiByZWZzLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHsgb2JqOiBvYmosIHByb3A6IGtleSB9KTtcbiAgICAgICAgICAgICAgICByZWZzLnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBhY3RRdWV1ZShxdWV1ZSk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG52YXIgaXNSZWdFeHAgPSBmdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufTtcblxudmFyIGlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopKTtcbn07XG5cbnZhciBjb21iaW5lID0gZnVuY3Rpb24gY29tYmluZShhLCBiKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdChhLCBiKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFycmF5VG9PYmplY3Q6IGFycmF5VG9PYmplY3QsXG4gICAgYXNzaWduOiBhc3NpZ24sXG4gICAgY29tYmluZTogY29tYmluZSxcbiAgICBjb21wYWN0OiBjb21wYWN0LFxuICAgIGRlY29kZTogZGVjb2RlLFxuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgICBpc1JlZ0V4cDogaXNSZWdFeHAsXG4gICAgbWVyZ2U6IG1lcmdlXG59O1xuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5Db3B5cmlnaHQgKEMpIE1pY3Jvc29mdC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxuXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG52YXIgUmVmbGVjdDtcbihmdW5jdGlvbiAoUmVmbGVjdCkge1xuICAgIC8vIE1ldGFkYXRhIFByb3Bvc2FsXG4gICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS9cbiAgICAoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICAgICAgdmFyIHJvb3QgPSB0eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDpcbiAgICAgICAgICAgIHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6XG4gICAgICAgICAgICAgICAgdHlwZW9mIHRoaXMgPT09IFwib2JqZWN0XCIgPyB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgRnVuY3Rpb24oXCJyZXR1cm4gdGhpcztcIikoKTtcbiAgICAgICAgdmFyIGV4cG9ydGVyID0gbWFrZUV4cG9ydGVyKFJlZmxlY3QpO1xuICAgICAgICBpZiAodHlwZW9mIHJvb3QuUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcm9vdC5SZWZsZWN0ID0gUmVmbGVjdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGV4cG9ydGVyID0gbWFrZUV4cG9ydGVyKHJvb3QuUmVmbGVjdCwgZXhwb3J0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGZhY3RvcnkoZXhwb3J0ZXIpO1xuICAgICAgICBmdW5jdGlvbiBtYWtlRXhwb3J0ZXIodGFyZ2V0LCBwcmV2aW91cykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRba2V5XSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgeyBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91cylcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSkoZnVuY3Rpb24gKGV4cG9ydGVyKSB7XG4gICAgICAgIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICAgICAgICAvLyBmZWF0dXJlIHRlc3QgZm9yIFN5bWJvbCBzdXBwb3J0XG4gICAgICAgIHZhciBzdXBwb3J0c1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIjtcbiAgICAgICAgdmFyIHRvUHJpbWl0aXZlU3ltYm9sID0gc3VwcG9ydHNTeW1ib2wgJiYgdHlwZW9mIFN5bWJvbC50b1ByaW1pdGl2ZSAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbC50b1ByaW1pdGl2ZSA6IFwiQEB0b1ByaW1pdGl2ZVwiO1xuICAgICAgICB2YXIgaXRlcmF0b3JTeW1ib2wgPSBzdXBwb3J0c1N5bWJvbCAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sLml0ZXJhdG9yIDogXCJAQGl0ZXJhdG9yXCI7XG4gICAgICAgIHZhciBzdXBwb3J0c0NyZWF0ZSA9IHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSBcImZ1bmN0aW9uXCI7IC8vIGZlYXR1cmUgdGVzdCBmb3IgT2JqZWN0LmNyZWF0ZSBzdXBwb3J0XG4gICAgICAgIHZhciBzdXBwb3J0c1Byb3RvID0geyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheTsgLy8gZmVhdHVyZSB0ZXN0IGZvciBfX3Byb3RvX18gc3VwcG9ydFxuICAgICAgICB2YXIgZG93bkxldmVsID0gIXN1cHBvcnRzQ3JlYXRlICYmICFzdXBwb3J0c1Byb3RvO1xuICAgICAgICB2YXIgSGFzaE1hcCA9IHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhbiBvYmplY3QgaW4gZGljdGlvbmFyeSBtb2RlIChhLmsuYS4gXCJzbG93XCIgbW9kZSBpbiB2OClcbiAgICAgICAgICAgIGNyZWF0ZTogc3VwcG9ydHNDcmVhdGVcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE1ha2VEaWN0aW9uYXJ5KE9iamVjdC5jcmVhdGUobnVsbCkpOyB9XG4gICAgICAgICAgICAgICAgOiBzdXBwb3J0c1Byb3RvXG4gICAgICAgICAgICAgICAgICAgID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gTWFrZURpY3Rpb25hcnkoeyBfX3Byb3RvX186IG51bGwgfSk7IH1cbiAgICAgICAgICAgICAgICAgICAgOiBmdW5jdGlvbiAoKSB7IHJldHVybiBNYWtlRGljdGlvbmFyeSh7fSk7IH0sXG4gICAgICAgICAgICBoYXM6IGRvd25MZXZlbFxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24gKG1hcCwga2V5KSB7IHJldHVybiBoYXNPd24uY2FsbChtYXAsIGtleSk7IH1cbiAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uIChtYXAsIGtleSkgeyByZXR1cm4ga2V5IGluIG1hcDsgfSxcbiAgICAgICAgICAgIGdldDogZG93bkxldmVsXG4gICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAobWFwLCBrZXkpIHsgcmV0dXJuIGhhc093bi5jYWxsKG1hcCwga2V5KSA/IG1hcFtrZXldIDogdW5kZWZpbmVkOyB9XG4gICAgICAgICAgICAgICAgOiBmdW5jdGlvbiAobWFwLCBrZXkpIHsgcmV0dXJuIG1hcFtrZXldOyB9LFxuICAgICAgICB9O1xuICAgICAgICAvLyBMb2FkIGdsb2JhbCBvciBzaGltIHZlcnNpb25zIG9mIE1hcCwgU2V0LCBhbmQgV2Vha01hcFxuICAgICAgICB2YXIgZnVuY3Rpb25Qcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRnVuY3Rpb24pO1xuICAgICAgICB2YXIgdXNlUG9seWZpbGwgPSB0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudltcIlJFRkxFQ1RfTUVUQURBVEFfVVNFX01BUF9QT0xZRklMTFwiXSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgIHZhciBfTWFwID0gIXVzZVBvbHlmaWxsICYmIHR5cGVvZiBNYXAgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgTWFwLnByb3RvdHlwZS5lbnRyaWVzID09PSBcImZ1bmN0aW9uXCIgPyBNYXAgOiBDcmVhdGVNYXBQb2x5ZmlsbCgpO1xuICAgICAgICB2YXIgX1NldCA9ICF1c2VQb2x5ZmlsbCAmJiB0eXBlb2YgU2V0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFNldC5wcm90b3R5cGUuZW50cmllcyA9PT0gXCJmdW5jdGlvblwiID8gU2V0IDogQ3JlYXRlU2V0UG9seWZpbGwoKTtcbiAgICAgICAgdmFyIF9XZWFrTWFwID0gIXVzZVBvbHlmaWxsICYmIHR5cGVvZiBXZWFrTWFwID09PSBcImZ1bmN0aW9uXCIgPyBXZWFrTWFwIDogQ3JlYXRlV2Vha01hcFBvbHlmaWxsKCk7XG4gICAgICAgIC8vIFtbTWV0YWRhdGFdXSBpbnRlcm5hbCBzbG90XG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5LW9iamVjdC1pbnRlcm5hbC1tZXRob2RzLWFuZC1pbnRlcm5hbC1zbG90c1xuICAgICAgICB2YXIgTWV0YWRhdGEgPSBuZXcgX1dlYWtNYXAoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZXMgYSBzZXQgb2YgZGVjb3JhdG9ycyB0byBhIHByb3BlcnR5IG9mIGEgdGFyZ2V0IG9iamVjdC5cbiAgICAgICAgICogQHBhcmFtIGRlY29yYXRvcnMgQW4gYXJyYXkgb2YgZGVjb3JhdG9ycy5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdC5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSB0byBkZWNvcmF0ZS5cbiAgICAgICAgICogQHBhcmFtIGF0dHJpYnV0ZXMgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkgZGVzY3JpcHRvciBmb3IgdGhlIHRhcmdldCBrZXkuXG4gICAgICAgICAqIEByZW1hcmtzIERlY29yYXRvcnMgYXJlIGFwcGxpZWQgaW4gcmV2ZXJzZSBvcmRlci5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgRXhhbXBsZSA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9yc0FycmF5LCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9yc0FycmF5LCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9yc0FycmF5LCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIixcbiAgICAgICAgICogICAgICAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIixcbiAgICAgICAgICogICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKSkpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIsXG4gICAgICAgICAqICAgICAgICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiLFxuICAgICAgICAgKiAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKSkpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUlzQXJyYXkoZGVjb3JhdG9ycykpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KGF0dHJpYnV0ZXMpICYmICFJc1VuZGVmaW5lZChhdHRyaWJ1dGVzKSAmJiAhSXNOdWxsKGF0dHJpYnV0ZXMpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKElzTnVsbChhdHRyaWJ1dGVzKSlcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBEZWNvcmF0ZVByb3BlcnR5KGRlY29yYXRvcnMsIHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFJc0FycmF5KGRlY29yYXRvcnMpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFJc0NvbnN0cnVjdG9yKHRhcmdldCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGVjb3JhdGVDb25zdHJ1Y3RvcihkZWNvcmF0b3JzLCB0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiZGVjb3JhdGVcIiwgZGVjb3JhdGUpO1xuICAgICAgICAvLyA0LjEuMiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNyZWZsZWN0Lm1ldGFkYXRhXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGRlZmF1bHQgbWV0YWRhdGEgZGVjb3JhdG9yIGZhY3RvcnkgdGhhdCBjYW4gYmUgdXNlZCBvbiBhIGNsYXNzLCBjbGFzcyBtZW1iZXIsIG9yIHBhcmFtZXRlci5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IFRoZSBrZXkgZm9yIHRoZSBtZXRhZGF0YSBlbnRyeS5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhVmFsdWUgVGhlIHZhbHVlIGZvciB0aGUgbWV0YWRhdGEgZW50cnkuXG4gICAgICAgICAqIEByZXR1cm5zIEEgZGVjb3JhdG9yIGZ1bmN0aW9uLlxuICAgICAgICAgKiBAcmVtYXJrc1xuICAgICAgICAgKiBJZiBgbWV0YWRhdGFLZXlgIGlzIGFscmVhZHkgZGVmaW5lZCBmb3IgdGhlIHRhcmdldCBhbmQgdGFyZ2V0IGtleSwgdGhlXG4gICAgICAgICAqIG1ldGFkYXRhVmFsdWUgZm9yIHRoYXQga2V5IHdpbGwgYmUgb3ZlcndyaXR0ZW4uXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yLCBUeXBlU2NyaXB0IG9ubHkpXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUsIFR5cGVTY3JpcHQgb25seSlcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXG4gICAgICAgICAqICAgICAgICAgcHJvcGVydHk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBtZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xuICAgICAgICAgICAgZnVuY3Rpb24gZGVjb3JhdG9yKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSAmJiAhSXNQcm9wZXJ0eUtleShwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICBPcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZWNvcmF0b3I7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJtZXRhZGF0YVwiLCBtZXRhZGF0YSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB1bmlxdWUgbWV0YWRhdGEgZW50cnkgb24gdGhlIHRhcmdldC5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFWYWx1ZSBBIHZhbHVlIHRoYXQgY29udGFpbnMgYXR0YWNoZWQgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdG8gZGVmaW5lIG1ldGFkYXRhLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gZGVjb3JhdG9yIGZhY3RvcnkgYXMgbWV0YWRhdGEtcHJvZHVjaW5nIGFubm90YXRpb24uXG4gICAgICAgICAqICAgICBmdW5jdGlvbiBNeUFubm90YXRpb24ob3B0aW9ucyk6IERlY29yYXRvciB7XG4gICAgICAgICAqICAgICAgICAgcmV0dXJuICh0YXJnZXQsIGtleT8pID0+IFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCB0YXJnZXQsIGtleSk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBkZWZpbmVNZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJkZWZpbmVNZXRhZGF0YVwiLCBkZWZpbmVNZXRhZGF0YSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIGEgdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSB0YXJnZXQgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUgY2hhaW4gaGFzIHRoZSBwcm92aWRlZCBtZXRhZGF0YSBrZXkgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG1ldGFkYXRhIGtleSB3YXMgZGVmaW5lZCBvbiB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluOyBvdGhlcndpc2UsIGBmYWxzZWAuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBoYXNNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlIYXNNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJoYXNNZXRhZGF0YVwiLCBoYXNNZXRhZGF0YSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIGEgdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSB0YXJnZXQgb2JqZWN0IGhhcyB0aGUgcHJvdmlkZWQgbWV0YWRhdGEga2V5IGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZSBtZXRhZGF0YSBrZXkgd2FzIGRlZmluZWQgb24gdGhlIHRhcmdldCBvYmplY3Q7IG90aGVyd2lzZSwgYGZhbHNlYC5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGhhc093bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUhhc093bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImhhc093bk1ldGFkYXRhXCIsIGhhc093bk1ldGFkYXRhKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIG1ldGFkYXRhIHZhbHVlIGZvciB0aGUgcHJvdmlkZWQgbWV0YWRhdGEga2V5IG9uIHRoZSB0YXJnZXQgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUgY2hhaW4uXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQHJldHVybnMgVGhlIG1ldGFkYXRhIHZhbHVlIGZvciB0aGUgbWV0YWRhdGEga2V5IGlmIGZvdW5kOyBvdGhlcndpc2UsIGB1bmRlZmluZWRgLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0TWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5R2V0TWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiZ2V0TWV0YWRhdGFcIiwgZ2V0TWV0YWRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgbWV0YWRhdGEgdmFsdWUgZm9yIHRoZSBwcm92aWRlZCBtZXRhZGF0YSBrZXkgb24gdGhlIHRhcmdldCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQHJldHVybnMgVGhlIG1ldGFkYXRhIHZhbHVlIGZvciB0aGUgbWV0YWRhdGEga2V5IGlmIGZvdW5kOyBvdGhlcndpc2UsIGB1bmRlZmluZWRgLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0T3duTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5R2V0T3duTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiZ2V0T3duTWV0YWRhdGFcIiwgZ2V0T3duTWV0YWRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgbWV0YWRhdGEga2V5cyBkZWZpbmVkIG9uIHRoZSB0YXJnZXQgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUgY2hhaW4uXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHVuaXF1ZSBtZXRhZGF0YSBrZXlzLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldE1ldGFkYXRhS2V5cyh0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeU1ldGFkYXRhS2V5cyh0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImdldE1ldGFkYXRhS2V5c1wiLCBnZXRNZXRhZGF0YUtleXMpO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgdW5pcXVlIG1ldGFkYXRhIGtleXMgZGVmaW5lZCBvbiB0aGUgdGFyZ2V0IG9iamVjdC5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQHJldHVybnMgQW4gYXJyYXkgb2YgdW5pcXVlIG1ldGFkYXRhIGtleXMuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0T3duTWV0YWRhdGFLZXlzKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiZ2V0T3duTWV0YWRhdGFLZXlzXCIsIGdldE93bk1ldGFkYXRhS2V5cyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWxldGVzIHRoZSBtZXRhZGF0YSBlbnRyeSBmcm9tIHRoZSB0YXJnZXQgb2JqZWN0IHdpdGggdGhlIHByb3ZpZGVkIGtleS5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG1ldGFkYXRhIGVudHJ5IHdhcyBmb3VuZCBhbmQgZGVsZXRlZDsgb3RoZXJ3aXNlLCBmYWxzZS5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5kZWxldGVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5kZWxldGVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5kZWxldGVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5kZWxldGVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGRlbGV0ZU1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAodGFyZ2V0LCBwcm9wZXJ0eUtleSwgLypDcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmICghbWV0YWRhdGFNYXAuZGVsZXRlKG1ldGFkYXRhS2V5KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAobWV0YWRhdGFNYXAuc2l6ZSA+IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0TWV0YWRhdGEgPSBNZXRhZGF0YS5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgIHRhcmdldE1ldGFkYXRhLmRlbGV0ZShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICBpZiAodGFyZ2V0TWV0YWRhdGEuc2l6ZSA+IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBNZXRhZGF0YS5kZWxldGUodGFyZ2V0KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiZGVsZXRlTWV0YWRhdGFcIiwgZGVsZXRlTWV0YWRhdGEpO1xuICAgICAgICBmdW5jdGlvbiBEZWNvcmF0ZUNvbnN0cnVjdG9yKGRlY29yYXRvcnMsIHRhcmdldCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVjb3JhdG9yID0gZGVjb3JhdG9yc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgZGVjb3JhdGVkID0gZGVjb3JhdG9yKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChkZWNvcmF0ZWQpICYmICFJc051bGwoZGVjb3JhdGVkKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzQ29uc3RydWN0b3IoZGVjb3JhdGVkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gZGVjb3JhdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gRGVjb3JhdGVQcm9wZXJ0eShkZWNvcmF0b3JzLCB0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIHZhciBkZWNvcmF0b3IgPSBkZWNvcmF0b3JzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBkZWNvcmF0ZWQgPSBkZWNvcmF0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChkZWNvcmF0ZWQpICYmICFJc051bGwoZGVjb3JhdGVkKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KGRlY29yYXRlZCkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0b3IgPSBkZWNvcmF0ZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCBDcmVhdGUpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRNZXRhZGF0YSA9IE1ldGFkYXRhLmdldChPKTtcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZCh0YXJnZXRNZXRhZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUNyZWF0ZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0YXJnZXRNZXRhZGF0YSA9IG5ldyBfTWFwKCk7XG4gICAgICAgICAgICAgICAgTWV0YWRhdGEuc2V0KE8sIHRhcmdldE1ldGFkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IHRhcmdldE1ldGFkYXRhLmdldChQKTtcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUNyZWF0ZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YU1hcCA9IG5ldyBfTWFwKCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0TWV0YWRhdGEuc2V0KFAsIG1ldGFkYXRhTWFwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtZXRhZGF0YU1hcDtcbiAgICAgICAgfVxuICAgICAgICAvLyAzLjEuMS4xIE9yZGluYXJ5SGFzTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5aGFzbWV0YWRhdGFcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlIYXNNZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCkge1xuICAgICAgICAgICAgdmFyIGhhc093biA9IE9yZGluYXJ5SGFzT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApO1xuICAgICAgICAgICAgaWYgKGhhc093bilcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pO1xuICAgICAgICAgICAgaWYgKCFJc051bGwocGFyZW50KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlIYXNNZXRhZGF0YShNZXRhZGF0YUtleSwgcGFyZW50LCBQKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyAzLjEuMi4xIE9yZGluYXJ5SGFzT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5aGFzb3dubWV0YWRhdGFcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCkge1xuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCAvKkNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIFRvQm9vbGVhbihtZXRhZGF0YU1hcC5oYXMoTWV0YWRhdGFLZXkpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyAzLjEuMy4xIE9yZGluYXJ5R2V0TWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5Z2V0bWV0YWRhdGFcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlHZXRNZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCkge1xuICAgICAgICAgICAgdmFyIGhhc093biA9IE9yZGluYXJ5SGFzT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApO1xuICAgICAgICAgICAgaWYgKGhhc093bilcbiAgICAgICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlHZXRPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKTtcbiAgICAgICAgICAgIGlmICghSXNOdWxsKHBhcmVudCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5R2V0TWV0YWRhdGEoTWV0YWRhdGFLZXksIHBhcmVudCwgUCk7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS40LjEgT3JkaW5hcnlHZXRPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnlnZXRvd25tZXRhZGF0YVxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUdldE93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKSB7XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIC8qQ3JlYXRlKi8gZmFsc2UpO1xuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGFkYXRhTWFwLmdldChNZXRhZGF0YUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjUuMSBPcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBNZXRhZGF0YVZhbHVlLCBPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWRlZmluZW93bm1ldGFkYXRhXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE1ldGFkYXRhVmFsdWUsIE8sIFApIHtcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgLypDcmVhdGUqLyB0cnVlKTtcbiAgICAgICAgICAgIG1ldGFkYXRhTWFwLnNldChNZXRhZGF0YUtleSwgTWV0YWRhdGFWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjYuMSBPcmRpbmFyeU1ldGFkYXRhS2V5cyhPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeW1ldGFkYXRha2V5c1xuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeU1ldGFkYXRhS2V5cyhPLCBQKSB7XG4gICAgICAgICAgICB2YXIgb3duS2V5cyA9IE9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKE8sIFApO1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTyk7XG4gICAgICAgICAgICBpZiAocGFyZW50ID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBvd25LZXlzO1xuICAgICAgICAgICAgdmFyIHBhcmVudEtleXMgPSBPcmRpbmFyeU1ldGFkYXRhS2V5cyhwYXJlbnQsIFApO1xuICAgICAgICAgICAgaWYgKHBhcmVudEtleXMubGVuZ3RoIDw9IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIG93bktleXM7XG4gICAgICAgICAgICBpZiAob3duS2V5cy5sZW5ndGggPD0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50S2V5cztcbiAgICAgICAgICAgIHZhciBzZXQgPSBuZXcgX1NldCgpO1xuICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgb3duS2V5c18xID0gb3duS2V5czsgX2kgPCBvd25LZXlzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IG93bktleXNfMVtfaV07XG4gICAgICAgICAgICAgICAgdmFyIGhhc0tleSA9IHNldC5oYXMoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc0tleSkge1xuICAgICAgICAgICAgICAgICAgICBzZXQuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIF9hID0gMCwgcGFyZW50S2V5c18xID0gcGFyZW50S2V5czsgX2EgPCBwYXJlbnRLZXlzXzEubGVuZ3RoOyBfYSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IHBhcmVudEtleXNfMVtfYV07XG4gICAgICAgICAgICAgICAgdmFyIGhhc0tleSA9IHNldC5oYXMoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc0tleSkge1xuICAgICAgICAgICAgICAgICAgICBzZXQuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS43LjEgT3JkaW5hcnlPd25NZXRhZGF0YUtleXMoTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnlvd25tZXRhZGF0YWtleXNcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlPd25NZXRhZGF0YUtleXMoTywgUCkge1xuICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgLypDcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKVxuICAgICAgICAgICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgICAgICAgdmFyIGtleXNPYmogPSBtZXRhZGF0YU1hcC5rZXlzKCk7XG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBHZXRJdGVyYXRvcihrZXlzT2JqKTtcbiAgICAgICAgICAgIHZhciBrID0gMDtcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSBJdGVyYXRvclN0ZXAoaXRlcmF0b3IpO1xuICAgICAgICAgICAgICAgIGlmICghbmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBrZXlzLmxlbmd0aCA9IGs7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbmV4dFZhbHVlID0gSXRlcmF0b3JWYWx1ZShuZXh0KTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBrZXlzW2tdID0gbmV4dFZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgSXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGsrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyA2IEVDTUFTY3JpcHQgRGF0YSBUeXAwZXMgYW5kIFZhbHVlc1xuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1lY21hc2NyaXB0LWRhdGEtdHlwZXMtYW5kLXZhbHVlc1xuICAgICAgICBmdW5jdGlvbiBUeXBlKHgpIHtcbiAgICAgICAgICAgIGlmICh4ID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiAxIC8qIE51bGwgKi87XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiB4KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOiByZXR1cm4gMCAvKiBVbmRlZmluZWQgKi87XG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIDIgLyogQm9vbGVhbiAqLztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiAzIC8qIFN0cmluZyAqLztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3ltYm9sXCI6IHJldHVybiA0IC8qIFN5bWJvbCAqLztcbiAgICAgICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiA1IC8qIE51bWJlciAqLztcbiAgICAgICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6IHJldHVybiB4ID09PSBudWxsID8gMSAvKiBOdWxsICovIDogNiAvKiBPYmplY3QgKi87XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDYgLyogT2JqZWN0ICovO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIDYuMS4xIFRoZSBVbmRlZmluZWQgVHlwZVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzLXVuZGVmaW5lZC10eXBlXG4gICAgICAgIGZ1bmN0aW9uIElzVW5kZWZpbmVkKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB4ID09PSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNi4xLjIgVGhlIE51bGwgVHlwZVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzLW51bGwtdHlwZVxuICAgICAgICBmdW5jdGlvbiBJc051bGwoeCkge1xuICAgICAgICAgICAgcmV0dXJuIHggPT09IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNi4xLjUgVGhlIFN5bWJvbCBUeXBlXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMtc3ltYm9sLXR5cGVcbiAgICAgICAgZnVuY3Rpb24gSXNTeW1ib2woeCkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIDYuMS43IFRoZSBPYmplY3QgVHlwZVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QtdHlwZVxuICAgICAgICBmdW5jdGlvbiBJc09iamVjdCh4KSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHggPT09IFwib2JqZWN0XCIgPyB4ICE9PSBudWxsIDogdHlwZW9mIHggPT09IFwiZnVuY3Rpb25cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjEgVHlwZSBDb252ZXJzaW9uXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXR5cGUtY29udmVyc2lvblxuICAgICAgICAvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbiAgICAgICAgZnVuY3Rpb24gVG9QcmltaXRpdmUoaW5wdXQsIFByZWZlcnJlZFR5cGUpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoVHlwZShpbnB1dCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDAgLyogVW5kZWZpbmVkICovOiByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICAgICAgY2FzZSAxIC8qIE51bGwgKi86IHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgICAgICBjYXNlIDIgLyogQm9vbGVhbiAqLzogcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgICAgIGNhc2UgMyAvKiBTdHJpbmcgKi86IHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgICAgICBjYXNlIDQgLyogU3ltYm9sICovOiByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICAgICAgY2FzZSA1IC8qIE51bWJlciAqLzogcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGhpbnQgPSBQcmVmZXJyZWRUeXBlID09PSAzIC8qIFN0cmluZyAqLyA/IFwic3RyaW5nXCIgOiBQcmVmZXJyZWRUeXBlID09PSA1IC8qIE51bWJlciAqLyA/IFwibnVtYmVyXCIgOiBcImRlZmF1bHRcIjtcbiAgICAgICAgICAgIHZhciBleG90aWNUb1ByaW0gPSBHZXRNZXRob2QoaW5wdXQsIHRvUHJpbWl0aXZlU3ltYm9sKTtcbiAgICAgICAgICAgIGlmIChleG90aWNUb1ByaW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBleG90aWNUb1ByaW0uY2FsbChpbnB1dCwgaGludCk7XG4gICAgICAgICAgICAgICAgaWYgKElzT2JqZWN0KHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5VG9QcmltaXRpdmUoaW5wdXQsIGhpbnQgPT09IFwiZGVmYXVsdFwiID8gXCJudW1iZXJcIiA6IGhpbnQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMS4xLjEgT3JkaW5hcnlUb1ByaW1pdGl2ZShPLCBoaW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcmRpbmFyeXRvcHJpbWl0aXZlXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5VG9QcmltaXRpdmUoTywgaGludCkge1xuICAgICAgICAgICAgaWYgKGhpbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9TdHJpbmdfMSA9IE8udG9TdHJpbmc7XG4gICAgICAgICAgICAgICAgaWYgKElzQ2FsbGFibGUodG9TdHJpbmdfMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRvU3RyaW5nXzEuY2FsbChPKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChyZXN1bHQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlT2YgPSBPLnZhbHVlT2Y7XG4gICAgICAgICAgICAgICAgaWYgKElzQ2FsbGFibGUodmFsdWVPZikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZhbHVlT2YuY2FsbChPKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChyZXN1bHQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVPZiA9IE8udmFsdWVPZjtcbiAgICAgICAgICAgICAgICBpZiAoSXNDYWxsYWJsZSh2YWx1ZU9mKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdmFsdWVPZi5jYWxsKE8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdG9TdHJpbmdfMiA9IE8udG9TdHJpbmc7XG4gICAgICAgICAgICAgICAgaWYgKElzQ2FsbGFibGUodG9TdHJpbmdfMikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRvU3RyaW5nXzIuY2FsbChPKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChyZXN1bHQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4xLjIgVG9Cb29sZWFuKGFyZ3VtZW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvMjAxNi8jc2VjLXRvYm9vbGVhblxuICAgICAgICBmdW5jdGlvbiBUb0Jvb2xlYW4oYXJndW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiAhIWFyZ3VtZW50O1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMS4xMiBUb1N0cmluZyhhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9zdHJpbmdcbiAgICAgICAgZnVuY3Rpb24gVG9TdHJpbmcoYXJndW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiICsgYXJndW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4xLjE0IFRvUHJvcGVydHlLZXkoYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvcHJvcGVydHlrZXlcbiAgICAgICAgZnVuY3Rpb24gVG9Qcm9wZXJ0eUtleShhcmd1bWVudCkge1xuICAgICAgICAgICAgdmFyIGtleSA9IFRvUHJpbWl0aXZlKGFyZ3VtZW50LCAzIC8qIFN0cmluZyAqLyk7XG4gICAgICAgICAgICBpZiAoSXNTeW1ib2woa2V5KSlcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgcmV0dXJuIFRvU3RyaW5nKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4yIFRlc3RpbmcgYW5kIENvbXBhcmlzb24gT3BlcmF0aW9uc1xuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10ZXN0aW5nLWFuZC1jb21wYXJpc29uLW9wZXJhdGlvbnNcbiAgICAgICAgLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNhcnJheVxuICAgICAgICBmdW5jdGlvbiBJc0FycmF5KGFyZ3VtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheVxuICAgICAgICAgICAgICAgID8gQXJyYXkuaXNBcnJheShhcmd1bWVudClcbiAgICAgICAgICAgICAgICA6IGFyZ3VtZW50IGluc3RhbmNlb2YgT2JqZWN0XG4gICAgICAgICAgICAgICAgICAgID8gYXJndW1lbnQgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgICAgICAgICA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCkgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjIuMyBJc0NhbGxhYmxlKGFyZ3VtZW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pc2NhbGxhYmxlXG4gICAgICAgIGZ1bmN0aW9uIElzQ2FsbGFibGUoYXJndW1lbnQpIHtcbiAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgaXMgYW4gYXBwcm94aW1hdGlvbiBhcyB3ZSBjYW5ub3QgY2hlY2sgZm9yIFtbQ2FsbF1dIGludGVybmFsIG1ldGhvZC5cbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT09IFwiZnVuY3Rpb25cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjIuNCBJc0NvbnN0cnVjdG9yKGFyZ3VtZW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pc2NvbnN0cnVjdG9yXG4gICAgICAgIGZ1bmN0aW9uIElzQ29uc3RydWN0b3IoYXJndW1lbnQpIHtcbiAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgaXMgYW4gYXBwcm94aW1hdGlvbiBhcyB3ZSBjYW5ub3QgY2hlY2sgZm9yIFtbQ29uc3RydWN0XV0gaW50ZXJuYWwgbWV0aG9kLlxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJmdW5jdGlvblwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMi43IElzUHJvcGVydHlLZXkoYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlzcHJvcGVydHlrZXlcbiAgICAgICAgZnVuY3Rpb24gSXNQcm9wZXJ0eUtleShhcmd1bWVudCkge1xuICAgICAgICAgICAgc3dpdGNoIChUeXBlKGFyZ3VtZW50KSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMyAvKiBTdHJpbmcgKi86IHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNCAvKiBTeW1ib2wgKi86IHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyA3LjMgT3BlcmF0aW9ucyBvbiBPYmplY3RzXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9wZXJhdGlvbnMtb24tb2JqZWN0c1xuICAgICAgICAvLyA3LjMuOSBHZXRNZXRob2QoViwgUClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZ2V0bWV0aG9kXG4gICAgICAgIGZ1bmN0aW9uIEdldE1ldGhvZChWLCBQKSB7XG4gICAgICAgICAgICB2YXIgZnVuYyA9IFZbUF07XG4gICAgICAgICAgICBpZiAoZnVuYyA9PT0gdW5kZWZpbmVkIHx8IGZ1bmMgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmICghSXNDYWxsYWJsZShmdW5jKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICByZXR1cm4gZnVuYztcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjQgT3BlcmF0aW9ucyBvbiBJdGVyYXRvciBPYmplY3RzXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9wZXJhdGlvbnMtb24taXRlcmF0b3Itb2JqZWN0c1xuICAgICAgICBmdW5jdGlvbiBHZXRJdGVyYXRvcihvYmopIHtcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSBHZXRNZXRob2Qob2JqLCBpdGVyYXRvclN5bWJvbCk7XG4gICAgICAgICAgICBpZiAoIUlzQ2FsbGFibGUobWV0aG9kKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7IC8vIGZyb20gQ2FsbFxuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gbWV0aG9kLmNhbGwob2JqKTtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QoaXRlcmF0b3IpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRvcjtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjQuNCBJdGVyYXRvclZhbHVlKGl0ZXJSZXN1bHQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8yMDE2LyNzZWMtaXRlcmF0b3J2YWx1ZVxuICAgICAgICBmdW5jdGlvbiBJdGVyYXRvclZhbHVlKGl0ZXJSZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVyUmVzdWx0LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuNC41IEl0ZXJhdG9yU3RlcChpdGVyYXRvcilcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXRlcmF0b3JzdGVwXG4gICAgICAgIGZ1bmN0aW9uIEl0ZXJhdG9yU3RlcChpdGVyYXRvcikge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IGZhbHNlIDogcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWl0ZXJhdG9yY2xvc2VcbiAgICAgICAgZnVuY3Rpb24gSXRlcmF0b3JDbG9zZShpdGVyYXRvcikge1xuICAgICAgICAgICAgdmFyIGYgPSBpdGVyYXRvcltcInJldHVyblwiXTtcbiAgICAgICAgICAgIGlmIChmKVxuICAgICAgICAgICAgICAgIGYuY2FsbChpdGVyYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gOS4xIE9yZGluYXJ5IE9iamVjdCBJbnRlcm5hbCBNZXRob2RzIGFuZCBJbnRlcm5hbCBTbG90c1xuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcmRpbmFyeS1vYmplY3QtaW50ZXJuYWwtbWV0aG9kcy1hbmQtaW50ZXJuYWwtc2xvdHNcbiAgICAgICAgLy8gOS4xLjEuMSBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9yZGluYXJ5Z2V0cHJvdG90eXBlb2ZcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKSB7XG4gICAgICAgICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIE8gIT09IFwiZnVuY3Rpb25cIiB8fCBPID09PSBmdW5jdGlvblByb3RvdHlwZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdG87XG4gICAgICAgICAgICAvLyBUeXBlU2NyaXB0IGRvZXNuJ3Qgc2V0IF9fcHJvdG9fXyBpbiBFUzUsIGFzIGl0J3Mgbm9uLXN0YW5kYXJkLlxuICAgICAgICAgICAgLy8gVHJ5IHRvIGRldGVybWluZSB0aGUgc3VwZXJjbGFzcyBjb25zdHJ1Y3Rvci4gQ29tcGF0aWJsZSBpbXBsZW1lbnRhdGlvbnNcbiAgICAgICAgICAgIC8vIG11c3QgZWl0aGVyIHNldCBfX3Byb3RvX18gb24gYSBzdWJjbGFzcyBjb25zdHJ1Y3RvciB0byB0aGUgc3VwZXJjbGFzcyBjb25zdHJ1Y3RvcixcbiAgICAgICAgICAgIC8vIG9yIGVuc3VyZSBlYWNoIGNsYXNzIGhhcyBhIHZhbGlkIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHkgb24gaXRzIHByb3RvdHlwZSB0aGF0XG4gICAgICAgICAgICAvLyBwb2ludHMgYmFjayB0byB0aGUgY29uc3RydWN0b3IuXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIG5vdCB0aGUgc2FtZSBhcyBGdW5jdGlvbi5bW1Byb3RvdHlwZV1dLCB0aGVuIHRoaXMgaXMgZGVmaW5hdGVseSBpbmhlcml0ZWQuXG4gICAgICAgICAgICAvLyBUaGlzIGlzIHRoZSBjYXNlIHdoZW4gaW4gRVM2IG9yIHdoZW4gdXNpbmcgX19wcm90b19fIGluIGEgY29tcGF0aWJsZSBicm93c2VyLlxuICAgICAgICAgICAgaWYgKHByb3RvICE9PSBmdW5jdGlvblByb3RvdHlwZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdG87XG4gICAgICAgICAgICAvLyBJZiB0aGUgc3VwZXIgcHJvdG90eXBlIGlzIE9iamVjdC5wcm90b3R5cGUsIG51bGwsIG9yIHVuZGVmaW5lZCwgdGhlbiB3ZSBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBoZXJpdGFnZS5cbiAgICAgICAgICAgIHZhciBwcm90b3R5cGUgPSBPLnByb3RvdHlwZTtcbiAgICAgICAgICAgIHZhciBwcm90b3R5cGVQcm90byA9IHByb3RvdHlwZSAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKTtcbiAgICAgICAgICAgIGlmIChwcm90b3R5cGVQcm90byA9PSBudWxsIHx8IHByb3RvdHlwZVByb3RvID09PSBPYmplY3QucHJvdG90eXBlKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcbiAgICAgICAgICAgIC8vIElmIHRoZSBjb25zdHJ1Y3RvciB3YXMgbm90IGEgZnVuY3Rpb24sIHRoZW4gd2UgY2Fubm90IGRldGVybWluZSB0aGUgaGVyaXRhZ2UuXG4gICAgICAgICAgICB2YXIgY29uc3RydWN0b3IgPSBwcm90b3R5cGVQcm90by5jb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc3RydWN0b3IgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdG87XG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIHNvbWUga2luZCBvZiBzZWxmLXJlZmVyZW5jZSwgdGhlbiB3ZSBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBoZXJpdGFnZS5cbiAgICAgICAgICAgIGlmIChjb25zdHJ1Y3RvciA9PT0gTylcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdG87XG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGEgcHJldHR5IGdvb2QgZ3Vlc3MgYXQgdGhlIGhlcml0YWdlLlxuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5haXZlIE1hcCBzaGltXG4gICAgICAgIGZ1bmN0aW9uIENyZWF0ZU1hcFBvbHlmaWxsKCkge1xuICAgICAgICAgICAgdmFyIGNhY2hlU2VudGluZWwgPSB7fTtcbiAgICAgICAgICAgIHZhciBhcnJheVNlbnRpbmVsID0gW107XG4gICAgICAgICAgICB2YXIgTWFwSXRlcmF0b3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gTWFwSXRlcmF0b3Ioa2V5cywgdmFsdWVzLCBzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBrZXlzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIE1hcEl0ZXJhdG9yLnByb3RvdHlwZVtcIkBAaXRlcmF0b3JcIl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuICAgICAgICAgICAgICAgIE1hcEl0ZXJhdG9yLnByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuICAgICAgICAgICAgICAgIE1hcEl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLl9rZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX3NlbGVjdG9yKHRoaXMuX2tleXNbaW5kZXhdLCB0aGlzLl92YWx1ZXNbaW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCArIDEgPj0gdGhpcy5fa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBhcnJheVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IGFycmF5U2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHJlc3VsdCwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGUudGhyb3cgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0gYXJyYXlTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IGFycmF5U2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGUucmV0dXJuID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IGFycmF5U2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBhcnJheVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hcEl0ZXJhdG9yO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gTWFwKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUtleSA9IGNhY2hlU2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlSW5kZXggPSAtMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1hcC5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fa2V5cy5sZW5ndGg7IH0sXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdGhpcy5fZmluZChrZXksIC8qaW5zZXJ0Ki8gZmFsc2UpID49IDA7IH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2ZpbmQoa2V5LCAvKmluc2VydCovIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgPyB0aGlzLl92YWx1ZXNbaW5kZXhdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9maW5kKGtleSwgLyppbnNlcnQqLyB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9maW5kKGtleSwgLyppbnNlcnQqLyBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuX2tleXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGluZGV4ICsgMTsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXNbaSAtIDFdID0gdGhpcy5fa2V5c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbaSAtIDFdID0gdGhpcy5fdmFsdWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cy5sZW5ndGgtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5sZW5ndGgtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IHRoaXMuX2NhY2hlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVLZXkgPSBjYWNoZVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlSW5kZXggPSAtMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlS2V5ID0gY2FjaGVTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IC0yO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE1hcEl0ZXJhdG9yKHRoaXMuX2tleXMsIHRoaXMuX3ZhbHVlcywgZ2V0S2V5KTsgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNYXBJdGVyYXRvcih0aGlzLl9rZXlzLCB0aGlzLl92YWx1ZXMsIGdldFZhbHVlKTsgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTWFwSXRlcmF0b3IodGhpcy5fa2V5cywgdGhpcy5fdmFsdWVzLCBnZXRFbnRyeSk7IH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZVtcIkBAaXRlcmF0b3JcIl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmVudHJpZXMoKTsgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZW50cmllcygpOyB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuX2ZpbmQgPSBmdW5jdGlvbiAoa2V5LCBpbnNlcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlS2V5ICE9PSBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlSW5kZXggPSB0aGlzLl9rZXlzLmluZGV4T2YodGhpcy5fY2FjaGVLZXkgPSBrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYWNoZUluZGV4IDwgMCAmJiBpbnNlcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlSW5kZXggPSB0aGlzLl9rZXlzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVJbmRleDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXA7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0S2V5KGtleSwgXykge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRWYWx1ZShfLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEVudHJ5KGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIG5haXZlIFNldCBzaGltXG4gICAgICAgIGZ1bmN0aW9uIENyZWF0ZVNldFBvbHlmaWxsKCkge1xuICAgICAgICAgICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBTZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcCA9IG5ldyBfTWFwKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZXQucHJvdG90eXBlLCBcInNpemVcIiwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hcC5zaXplOyB9LFxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdGhpcy5fbWFwLmhhcyh2YWx1ZSk7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHRoaXMuX21hcC5zZXQodmFsdWUsIHZhbHVlKSwgdGhpczsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdGhpcy5fbWFwLmRlbGV0ZSh2YWx1ZSk7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHsgdGhpcy5fbWFwLmNsZWFyKCk7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLmtleXMoKTsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hcC52YWx1ZXMoKTsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYXAuZW50cmllcygpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGVbXCJAQGl0ZXJhdG9yXCJdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5rZXlzKCk7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmtleXMoKTsgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gU2V0O1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBuYWl2ZSBXZWFrTWFwIHNoaW1cbiAgICAgICAgZnVuY3Rpb24gQ3JlYXRlV2Vha01hcFBvbHlmaWxsKCkge1xuICAgICAgICAgICAgdmFyIFVVSURfU0laRSA9IDE2O1xuICAgICAgICAgICAgdmFyIGtleXMgPSBIYXNoTWFwLmNyZWF0ZSgpO1xuICAgICAgICAgICAgdmFyIHJvb3RLZXkgPSBDcmVhdGVVbmlxdWVLZXkoKTtcbiAgICAgICAgICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gV2Vha01hcCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5ID0gQ3JlYXRlVW5pcXVlS2V5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCAvKmNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlICE9PSB1bmRlZmluZWQgPyBIYXNoTWFwLmhhcyh0YWJsZSwgdGhpcy5fa2V5KSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGUgPSBHZXRPckNyZWF0ZVdlYWtNYXBUYWJsZSh0YXJnZXQsIC8qY3JlYXRlKi8gZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUgIT09IHVuZGVmaW5lZCA/IEhhc2hNYXAuZ2V0KHRhYmxlLCB0aGlzLl9rZXkpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHRhcmdldCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCAvKmNyZWF0ZSovIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0YWJsZVt0aGlzLl9rZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGUgPSBHZXRPckNyZWF0ZVdlYWtNYXBUYWJsZSh0YXJnZXQsIC8qY3JlYXRlKi8gZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUgIT09IHVuZGVmaW5lZCA/IGRlbGV0ZSB0YWJsZVt0aGlzLl9rZXldIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogbm90IGEgcmVhbCBjbGVhciwganVzdCBtYWtlcyB0aGUgcHJldmlvdXMgZGF0YSB1bnJlYWNoYWJsZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXkgPSBDcmVhdGVVbmlxdWVLZXkoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBXZWFrTWFwO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIENyZWF0ZVVuaXF1ZUtleSgpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5O1xuICAgICAgICAgICAgICAgIGRvXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IFwiQEBXZWFrTWFwQEBcIiArIENyZWF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoSGFzaE1hcC5oYXMoa2V5cywga2V5KSk7XG4gICAgICAgICAgICAgICAga2V5c1trZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCBjcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bi5jYWxsKHRhcmdldCwgcm9vdEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCByb290S2V5LCB7IHZhbHVlOiBIYXNoTWFwLmNyZWF0ZSgpIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Jvb3RLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gRmlsbFJhbmRvbUJ5dGVzKGJ1ZmZlciwgc2l6ZSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKVxuICAgICAgICAgICAgICAgICAgICBidWZmZXJbaV0gPSBNYXRoLnJhbmRvbSgpICogMHhmZiB8IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIEdlblJhbmRvbUJ5dGVzKHNpemUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNyeXB0byAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtc0NyeXB0byAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoc2l6ZSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRmlsbFJhbmRvbUJ5dGVzKG5ldyBVaW50OEFycmF5KHNpemUpLCBzaXplKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEZpbGxSYW5kb21CeXRlcyhuZXcgQXJyYXkoc2l6ZSksIHNpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gQ3JlYXRlVVVJRCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IEdlblJhbmRvbUJ5dGVzKFVVSURfU0laRSk7XG4gICAgICAgICAgICAgICAgLy8gbWFyayBhcyByYW5kb20gLSBSRkMgNDEyMiDCpyA0LjRcbiAgICAgICAgICAgICAgICBkYXRhWzZdID0gZGF0YVs2XSAmIDB4NGYgfCAweDQwO1xuICAgICAgICAgICAgICAgIGRhdGFbOF0gPSBkYXRhWzhdICYgMHhiZiB8IDB4ODA7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgVVVJRF9TSVpFOyArK29mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYnl0ZSA9IGRhdGFbb2Zmc2V0XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA9PT0gNCB8fCBvZmZzZXQgPT09IDYgfHwgb2Zmc2V0ID09PSA4KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiLVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYnl0ZSA8IDE2KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiMFwiO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYnl0ZS50b1N0cmluZygxNikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB1c2VzIGEgaGV1cmlzdGljIHVzZWQgYnkgdjggYW5kIGNoYWtyYSB0byBmb3JjZSBhbiBvYmplY3QgaW50byBkaWN0aW9uYXJ5IG1vZGUuXG4gICAgICAgIGZ1bmN0aW9uIE1ha2VEaWN0aW9uYXJ5KG9iaikge1xuICAgICAgICAgICAgb2JqLl9fID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZGVsZXRlIG9iai5fXztcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pKFJlZmxlY3QgfHwgKFJlZmxlY3QgPSB7fSkpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbXAgKGEsIGIpIHtcbiAgICB2YXIgcGEgPSBhLnNwbGl0KCcuJyk7XG4gICAgdmFyIHBiID0gYi5zcGxpdCgnLicpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIHZhciBuYSA9IE51bWJlcihwYVtpXSk7XG4gICAgICAgIHZhciBuYiA9IE51bWJlcihwYltpXSk7XG4gICAgICAgIGlmIChuYSA+IG5iKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKG5iID4gbmEpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKCFpc05hTihuYSkgJiYgaXNOYU4obmIpKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGlzTmFOKG5hKSAmJiAhaXNOYU4obmIpKSByZXR1cm4gLTE7XG4gICAgfVxuICAgIHJldHVybiAwO1xufTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IFNlbVZlclxuXG52YXIgZGVidWdcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pZiAodHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmXG4gICAgcHJvY2Vzcy5lbnYgJiZcbiAgICBwcm9jZXNzLmVudi5OT0RFX0RFQlVHICYmXG4gICAgL1xcYnNlbXZlclxcYi9pLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRykpIHtcbiAgZGVidWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApXG4gICAgYXJncy51bnNoaWZ0KCdTRU1WRVInKVxuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpXG4gIH1cbn0gZWxzZSB7XG4gIGRlYnVnID0gZnVuY3Rpb24gKCkge31cbn1cblxuLy8gTm90ZTogdGhpcyBpcyB0aGUgc2VtdmVyLm9yZyB2ZXJzaW9uIG9mIHRoZSBzcGVjIHRoYXQgaXQgaW1wbGVtZW50c1xuLy8gTm90IG5lY2Vzc2FyaWx5IHRoZSBwYWNrYWdlIHZlcnNpb24gb2YgdGhpcyBjb2RlLlxuZXhwb3J0cy5TRU1WRVJfU1BFQ19WRVJTSU9OID0gJzIuMC4wJ1xuXG52YXIgTUFYX0xFTkdUSCA9IDI1NlxudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiB8fFxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyA5MDA3MTk5MjU0NzQwOTkxXG5cbi8vIE1heCBzYWZlIHNlZ21lbnQgbGVuZ3RoIGZvciBjb2VyY2lvbi5cbnZhciBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIID0gMTZcblxuLy8gVGhlIGFjdHVhbCByZWdleHBzIGdvIG9uIGV4cG9ydHMucmVcbnZhciByZSA9IGV4cG9ydHMucmUgPSBbXVxudmFyIHNyYyA9IGV4cG9ydHMuc3JjID0gW11cbnZhciBSID0gMFxuXG4vLyBUaGUgZm9sbG93aW5nIFJlZ3VsYXIgRXhwcmVzc2lvbnMgY2FuIGJlIHVzZWQgZm9yIHRva2VuaXppbmcsXG4vLyB2YWxpZGF0aW5nLCBhbmQgcGFyc2luZyBTZW1WZXIgdmVyc2lvbiBzdHJpbmdzLlxuXG4vLyAjIyBOdW1lcmljIElkZW50aWZpZXJcbi8vIEEgc2luZ2xlIGAwYCwgb3IgYSBub24temVybyBkaWdpdCBmb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgZGlnaXRzLlxuXG52YXIgTlVNRVJJQ0lERU5USUZJRVIgPSBSKytcbnNyY1tOVU1FUklDSURFTlRJRklFUl0gPSAnMHxbMS05XVxcXFxkKidcbnZhciBOVU1FUklDSURFTlRJRklFUkxPT1NFID0gUisrXG5zcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gPSAnWzAtOV0rJ1xuXG4vLyAjIyBOb24tbnVtZXJpYyBJZGVudGlmaWVyXG4vLyBaZXJvIG9yIG1vcmUgZGlnaXRzLCBmb2xsb3dlZCBieSBhIGxldHRlciBvciBoeXBoZW4sIGFuZCB0aGVuIHplcm8gb3Jcbi8vIG1vcmUgbGV0dGVycywgZGlnaXRzLCBvciBoeXBoZW5zLlxuXG52YXIgTk9OTlVNRVJJQ0lERU5USUZJRVIgPSBSKytcbnNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gPSAnXFxcXGQqW2EtekEtWi1dW2EtekEtWjAtOS1dKidcblxuLy8gIyMgTWFpbiBWZXJzaW9uXG4vLyBUaHJlZSBkb3Qtc2VwYXJhdGVkIG51bWVyaWMgaWRlbnRpZmllcnMuXG5cbnZhciBNQUlOVkVSU0lPTiA9IFIrK1xuc3JjW01BSU5WRVJTSU9OXSA9ICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJyknXG5cbnZhciBNQUlOVkVSU0lPTkxPT1NFID0gUisrXG5zcmNbTUFJTlZFUlNJT05MT09TRV0gPSAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKSdcblxuLy8gIyMgUHJlLXJlbGVhc2UgVmVyc2lvbiBJZGVudGlmaWVyXG4vLyBBIG51bWVyaWMgaWRlbnRpZmllciwgb3IgYSBub24tbnVtZXJpYyBpZGVudGlmaWVyLlxuXG52YXIgUFJFUkVMRUFTRUlERU5USUZJRVIgPSBSKytcbnNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gPSAnKD86JyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd8JyArIHNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gKyAnKSdcblxudmFyIFBSRVJFTEVBU0VJREVOVElGSUVSTE9PU0UgPSBSKytcbnNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSA9ICcoPzonICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd8JyArIHNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gKyAnKSdcblxuLy8gIyMgUHJlLXJlbGVhc2UgVmVyc2lvblxuLy8gSHlwaGVuLCBmb2xsb3dlZCBieSBvbmUgb3IgbW9yZSBkb3Qtc2VwYXJhdGVkIHByZS1yZWxlYXNlIHZlcnNpb25cbi8vIGlkZW50aWZpZXJzLlxuXG52YXIgUFJFUkVMRUFTRSA9IFIrK1xuc3JjW1BSRVJFTEVBU0VdID0gJyg/Oi0oJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gKyAnKSopKSdcblxudmFyIFBSRVJFTEVBU0VMT09TRSA9IFIrK1xuc3JjW1BSRVJFTEVBU0VMT09TRV0gPSAnKD86LT8oJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSArXG4gICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV0gKyAnKSopKSdcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGEgSWRlbnRpZmllclxuLy8gQW55IGNvbWJpbmF0aW9uIG9mIGRpZ2l0cywgbGV0dGVycywgb3IgaHlwaGVucy5cblxudmFyIEJVSUxESURFTlRJRklFUiA9IFIrK1xuc3JjW0JVSUxESURFTlRJRklFUl0gPSAnWzAtOUEtWmEtei1dKydcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGFcbi8vIFBsdXMgc2lnbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgcGVyaW9kLXNlcGFyYXRlZCBidWlsZCBtZXRhZGF0YVxuLy8gaWRlbnRpZmllcnMuXG5cbnZhciBCVUlMRCA9IFIrK1xuc3JjW0JVSUxEXSA9ICcoPzpcXFxcKygnICsgc3JjW0JVSUxESURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbQlVJTERJREVOVElGSUVSXSArICcpKikpJ1xuXG4vLyAjIyBGdWxsIFZlcnNpb24gU3RyaW5nXG4vLyBBIG1haW4gdmVyc2lvbiwgZm9sbG93ZWQgb3B0aW9uYWxseSBieSBhIHByZS1yZWxlYXNlIHZlcnNpb24gYW5kXG4vLyBidWlsZCBtZXRhZGF0YS5cblxuLy8gTm90ZSB0aGF0IHRoZSBvbmx5IG1ham9yLCBtaW5vciwgcGF0Y2gsIGFuZCBwcmUtcmVsZWFzZSBzZWN0aW9ucyBvZlxuLy8gdGhlIHZlcnNpb24gc3RyaW5nIGFyZSBjYXB0dXJpbmcgZ3JvdXBzLiAgVGhlIGJ1aWxkIG1ldGFkYXRhIGlzIG5vdCBhXG4vLyBjYXB0dXJpbmcgZ3JvdXAsIGJlY2F1c2UgaXQgc2hvdWxkIG5vdCBldmVyIGJlIHVzZWQgaW4gdmVyc2lvblxuLy8gY29tcGFyaXNvbi5cblxudmFyIEZVTEwgPSBSKytcbnZhciBGVUxMUExBSU4gPSAndj8nICsgc3JjW01BSU5WRVJTSU9OXSArXG4gICAgICAgICAgICAgICAgc3JjW1BSRVJFTEVBU0VdICsgJz8nICtcbiAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nXG5cbnNyY1tGVUxMXSA9ICdeJyArIEZVTExQTEFJTiArICckJ1xuXG4vLyBsaWtlIGZ1bGwsIGJ1dCBhbGxvd3MgdjEuMi4zIGFuZCA9MS4yLjMsIHdoaWNoIHBlb3BsZSBkbyBzb21ldGltZXMuXG4vLyBhbHNvLCAxLjAuMGFscGhhMSAocHJlcmVsZWFzZSB3aXRob3V0IHRoZSBoeXBoZW4pIHdoaWNoIGlzIHByZXR0eVxuLy8gY29tbW9uIGluIHRoZSBucG0gcmVnaXN0cnkuXG52YXIgTE9PU0VQTEFJTiA9ICdbdj1cXFxcc10qJyArIHNyY1tNQUlOVkVSU0lPTkxPT1NFXSArXG4gICAgICAgICAgICAgICAgIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/J1xuXG52YXIgTE9PU0UgPSBSKytcbnNyY1tMT09TRV0gPSAnXicgKyBMT09TRVBMQUlOICsgJyQnXG5cbnZhciBHVExUID0gUisrXG5zcmNbR1RMVF0gPSAnKCg/Ojx8Pik/PT8pJ1xuXG4vLyBTb21ldGhpbmcgbGlrZSBcIjIuKlwiIG9yIFwiMS4yLnhcIi5cbi8vIE5vdGUgdGhhdCBcIngueFwiIGlzIGEgdmFsaWQgeFJhbmdlIGlkZW50aWZlciwgbWVhbmluZyBcImFueSB2ZXJzaW9uXCJcbi8vIE9ubHkgdGhlIGZpcnN0IGl0ZW0gaXMgc3RyaWN0bHkgcmVxdWlyZWQuXG52YXIgWFJBTkdFSURFTlRJRklFUkxPT1NFID0gUisrXG5zcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSA9IHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICd8eHxYfFxcXFwqJ1xudmFyIFhSQU5HRUlERU5USUZJRVIgPSBSKytcbnNyY1tYUkFOR0VJREVOVElGSUVSXSA9IHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnfHh8WHxcXFxcKidcblxudmFyIFhSQU5HRVBMQUlOID0gUisrXG5zcmNbWFJBTkdFUExBSU5dID0gJ1t2PVxcXFxzXSooJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnKD86JyArIHNyY1tQUkVSRUxFQVNFXSArICcpPycgK1xuICAgICAgICAgICAgICAgICAgIHNyY1tCVUlMRF0gKyAnPycgK1xuICAgICAgICAgICAgICAgICAgICcpPyk/J1xuXG52YXIgWFJBTkdFUExBSU5MT09TRSA9IFIrK1xuc3JjW1hSQU5HRVBMQUlOTE9PU0VdID0gJ1t2PVxcXFxzXSooJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86JyArIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJyk/JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcpPyk/J1xuXG52YXIgWFJBTkdFID0gUisrXG5zcmNbWFJBTkdFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyonICsgc3JjW1hSQU5HRVBMQUlOXSArICckJ1xudmFyIFhSQU5HRUxPT1NFID0gUisrXG5zcmNbWFJBTkdFTE9PU0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKicgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCdcblxuLy8gQ29lcmNpb24uXG4vLyBFeHRyYWN0IGFueXRoaW5nIHRoYXQgY291bGQgY29uY2VpdmFibHkgYmUgYSBwYXJ0IG9mIGEgdmFsaWQgc2VtdmVyXG52YXIgQ09FUkNFID0gUisrXG5zcmNbQ09FUkNFXSA9ICcoPzpefFteXFxcXGRdKScgK1xuICAgICAgICAgICAgICAnKFxcXFxkezEsJyArIE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEggKyAnfSknICtcbiAgICAgICAgICAgICAgJyg/OlxcXFwuKFxcXFxkezEsJyArIE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEggKyAnfSkpPycgK1xuICAgICAgICAgICAgICAnKD86XFxcXC4oXFxcXGR7MSwnICsgTUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSCArICd9KSk/JyArXG4gICAgICAgICAgICAgICcoPzokfFteXFxcXGRdKSdcblxuLy8gVGlsZGUgcmFuZ2VzLlxuLy8gTWVhbmluZyBpcyBcInJlYXNvbmFibHkgYXQgb3IgZ3JlYXRlciB0aGFuXCJcbnZhciBMT05FVElMREUgPSBSKytcbnNyY1tMT05FVElMREVdID0gJyg/On4+PyknXG5cbnZhciBUSUxERVRSSU0gPSBSKytcbnNyY1tUSUxERVRSSU1dID0gJyhcXFxccyopJyArIHNyY1tMT05FVElMREVdICsgJ1xcXFxzKydcbnJlW1RJTERFVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1tUSUxERVRSSU1dLCAnZycpXG52YXIgdGlsZGVUcmltUmVwbGFjZSA9ICckMX4nXG5cbnZhciBUSUxERSA9IFIrK1xuc3JjW1RJTERFXSA9ICdeJyArIHNyY1tMT05FVElMREVdICsgc3JjW1hSQU5HRVBMQUlOXSArICckJ1xudmFyIFRJTERFTE9PU0UgPSBSKytcbnNyY1tUSUxERUxPT1NFXSA9ICdeJyArIHNyY1tMT05FVElMREVdICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnXG5cbi8vIENhcmV0IHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJhdCBsZWFzdCBhbmQgYmFja3dhcmRzIGNvbXBhdGlibGUgd2l0aFwiXG52YXIgTE9ORUNBUkVUID0gUisrXG5zcmNbTE9ORUNBUkVUXSA9ICcoPzpcXFxcXiknXG5cbnZhciBDQVJFVFRSSU0gPSBSKytcbnNyY1tDQVJFVFRSSU1dID0gJyhcXFxccyopJyArIHNyY1tMT05FQ0FSRVRdICsgJ1xcXFxzKydcbnJlW0NBUkVUVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1tDQVJFVFRSSU1dLCAnZycpXG52YXIgY2FyZXRUcmltUmVwbGFjZSA9ICckMV4nXG5cbnZhciBDQVJFVCA9IFIrK1xuc3JjW0NBUkVUXSA9ICdeJyArIHNyY1tMT05FQ0FSRVRdICsgc3JjW1hSQU5HRVBMQUlOXSArICckJ1xudmFyIENBUkVUTE9PU0UgPSBSKytcbnNyY1tDQVJFVExPT1NFXSA9ICdeJyArIHNyY1tMT05FQ0FSRVRdICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnXG5cbi8vIEEgc2ltcGxlIGd0L2x0L2VxIHRoaW5nLCBvciBqdXN0IFwiXCIgdG8gaW5kaWNhdGUgXCJhbnkgdmVyc2lvblwiXG52YXIgQ09NUEFSQVRPUkxPT1NFID0gUisrXG5zcmNbQ09NUEFSQVRPUkxPT1NFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyooJyArIExPT1NFUExBSU4gKyAnKSR8XiQnXG52YXIgQ09NUEFSQVRPUiA9IFIrK1xuc3JjW0NPTVBBUkFUT1JdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKignICsgRlVMTFBMQUlOICsgJykkfF4kJ1xuXG4vLyBBbiBleHByZXNzaW9uIHRvIHN0cmlwIGFueSB3aGl0ZXNwYWNlIGJldHdlZW4gdGhlIGd0bHQgYW5kIHRoZSB0aGluZ1xuLy8gaXQgbW9kaWZpZXMsIHNvIHRoYXQgYD4gMS4yLjNgID09PiBgPjEuMi4zYFxudmFyIENPTVBBUkFUT1JUUklNID0gUisrXG5zcmNbQ09NUEFSQVRPUlRSSU1dID0gJyhcXFxccyopJyArIHNyY1tHVExUXSArXG4gICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKignICsgTE9PU0VQTEFJTiArICd8JyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKSdcblxuLy8gdGhpcyBvbmUgaGFzIHRvIHVzZSB0aGUgL2cgZmxhZ1xucmVbQ09NUEFSQVRPUlRSSU1dID0gbmV3IFJlZ0V4cChzcmNbQ09NUEFSQVRPUlRSSU1dLCAnZycpXG52YXIgY29tcGFyYXRvclRyaW1SZXBsYWNlID0gJyQxJDIkMydcblxuLy8gU29tZXRoaW5nIGxpa2UgYDEuMi4zIC0gMS4yLjRgXG4vLyBOb3RlIHRoYXQgdGhlc2UgYWxsIHVzZSB0aGUgbG9vc2UgZm9ybSwgYmVjYXVzZSB0aGV5J2xsIGJlXG4vLyBjaGVja2VkIGFnYWluc3QgZWl0aGVyIHRoZSBzdHJpY3Qgb3IgbG9vc2UgY29tcGFyYXRvciBmb3JtXG4vLyBsYXRlci5cbnZhciBIWVBIRU5SQU5HRSA9IFIrK1xuc3JjW0hZUEhFTlJBTkdFXSA9ICdeXFxcXHMqKCcgKyBzcmNbWFJBTkdFUExBSU5dICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnXFxcXHMrLVxcXFxzKycgK1xuICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICdcXFxccyokJ1xuXG52YXIgSFlQSEVOUkFOR0VMT09TRSA9IFIrK1xuc3JjW0hZUEhFTlJBTkdFTE9PU0VdID0gJ15cXFxccyooJyArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMrLVxcXFxzKycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXFxccyokJ1xuXG4vLyBTdGFyIHJhbmdlcyBiYXNpY2FsbHkganVzdCBhbGxvdyBhbnl0aGluZyBhdCBhbGwuXG52YXIgU1RBUiA9IFIrK1xuc3JjW1NUQVJdID0gJyg8fD4pPz0/XFxcXHMqXFxcXConXG5cbi8vIENvbXBpbGUgdG8gYWN0dWFsIHJlZ2V4cCBvYmplY3RzLlxuLy8gQWxsIGFyZSBmbGFnLWZyZWUsIHVubGVzcyB0aGV5IHdlcmUgY3JlYXRlZCBhYm92ZSB3aXRoIGEgZmxhZy5cbmZvciAodmFyIGkgPSAwOyBpIDwgUjsgaSsrKSB7XG4gIGRlYnVnKGksIHNyY1tpXSlcbiAgaWYgKCFyZVtpXSkge1xuICAgIHJlW2ldID0gbmV3IFJlZ0V4cChzcmNbaV0pXG4gIH1cbn1cblxuZXhwb3J0cy5wYXJzZSA9IHBhcnNlXG5mdW5jdGlvbiBwYXJzZSAodmVyc2lvbiwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGxvb3NlOiAhIW9wdGlvbnMsXG4gICAgICBpbmNsdWRlUHJlcmVsZWFzZTogZmFsc2VcbiAgICB9XG4gIH1cblxuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIHJldHVybiB2ZXJzaW9uXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgdmFyIHIgPSBvcHRpb25zLmxvb3NlID8gcmVbTE9PU0VdIDogcmVbRlVMTF1cbiAgaWYgKCFyLnRlc3QodmVyc2lvbikpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZXhwb3J0cy52YWxpZCA9IHZhbGlkXG5mdW5jdGlvbiB2YWxpZCAodmVyc2lvbiwgb3B0aW9ucykge1xuICB2YXIgdiA9IHBhcnNlKHZlcnNpb24sIG9wdGlvbnMpXG4gIHJldHVybiB2ID8gdi52ZXJzaW9uIDogbnVsbFxufVxuXG5leHBvcnRzLmNsZWFuID0gY2xlYW5cbmZ1bmN0aW9uIGNsZWFuICh2ZXJzaW9uLCBvcHRpb25zKSB7XG4gIHZhciBzID0gcGFyc2UodmVyc2lvbi50cmltKCkucmVwbGFjZSgvXls9dl0rLywgJycpLCBvcHRpb25zKVxuICByZXR1cm4gcyA/IHMudmVyc2lvbiA6IG51bGxcbn1cblxuZXhwb3J0cy5TZW1WZXIgPSBTZW1WZXJcblxuZnVuY3Rpb24gU2VtVmVyICh2ZXJzaW9uLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIGlmICh2ZXJzaW9uLmxvb3NlID09PSBvcHRpb25zLmxvb3NlKSB7XG4gICAgICByZXR1cm4gdmVyc2lvblxuICAgIH0gZWxzZSB7XG4gICAgICB2ZXJzaW9uID0gdmVyc2lvbi52ZXJzaW9uXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVmVyc2lvbjogJyArIHZlcnNpb24pXG4gIH1cblxuICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmVyc2lvbiBpcyBsb25nZXIgdGhhbiAnICsgTUFYX0xFTkdUSCArICcgY2hhcmFjdGVycycpXG4gIH1cblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIG9wdGlvbnMpXG4gIH1cblxuICBkZWJ1ZygnU2VtVmVyJywgdmVyc2lvbiwgb3B0aW9ucylcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG5cbiAgdmFyIG0gPSB2ZXJzaW9uLnRyaW0oKS5tYXRjaChvcHRpb25zLmxvb3NlID8gcmVbTE9PU0VdIDogcmVbRlVMTF0pXG5cbiAgaWYgKCFtKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBWZXJzaW9uOiAnICsgdmVyc2lvbilcbiAgfVxuXG4gIHRoaXMucmF3ID0gdmVyc2lvblxuXG4gIC8vIHRoZXNlIGFyZSBhY3R1YWxseSBudW1iZXJzXG4gIHRoaXMubWFqb3IgPSArbVsxXVxuICB0aGlzLm1pbm9yID0gK21bMl1cbiAgdGhpcy5wYXRjaCA9ICttWzNdXG5cbiAgaWYgKHRoaXMubWFqb3IgPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMubWFqb3IgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBtYWpvciB2ZXJzaW9uJylcbiAgfVxuXG4gIGlmICh0aGlzLm1pbm9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1pbm9yIDwgMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWlub3IgdmVyc2lvbicpXG4gIH1cblxuICBpZiAodGhpcy5wYXRjaCA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5wYXRjaCA8IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHBhdGNoIHZlcnNpb24nKVxuICB9XG5cbiAgLy8gbnVtYmVyaWZ5IGFueSBwcmVyZWxlYXNlIG51bWVyaWMgaWRzXG4gIGlmICghbVs0XSkge1xuICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdXG4gIH0gZWxzZSB7XG4gICAgdGhpcy5wcmVyZWxlYXNlID0gbVs0XS5zcGxpdCgnLicpLm1hcChmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGlmICgvXlswLTldKyQvLnRlc3QoaWQpKSB7XG4gICAgICAgIHZhciBudW0gPSAraWRcbiAgICAgICAgaWYgKG51bSA+PSAwICYmIG51bSA8IE1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICAgICAgICByZXR1cm4gbnVtXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpZFxuICAgIH0pXG4gIH1cblxuICB0aGlzLmJ1aWxkID0gbVs1XSA/IG1bNV0uc3BsaXQoJy4nKSA6IFtdXG4gIHRoaXMuZm9ybWF0KClcbn1cblxuU2VtVmVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMudmVyc2lvbiA9IHRoaXMubWFqb3IgKyAnLicgKyB0aGlzLm1pbm9yICsgJy4nICsgdGhpcy5wYXRjaFxuICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgIHRoaXMudmVyc2lvbiArPSAnLScgKyB0aGlzLnByZXJlbGVhc2Uuam9pbignLicpXG4gIH1cbiAgcmV0dXJuIHRoaXMudmVyc2lvblxufVxuXG5TZW1WZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy52ZXJzaW9uXG59XG5cblNlbVZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIChvdGhlcikge1xuICBkZWJ1ZygnU2VtVmVyLmNvbXBhcmUnLCB0aGlzLnZlcnNpb24sIHRoaXMub3B0aW9ucywgb3RoZXIpXG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuY29tcGFyZU1haW4ob3RoZXIpIHx8IHRoaXMuY29tcGFyZVByZShvdGhlcilcbn1cblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlTWFpbiA9IGZ1bmN0aW9uIChvdGhlcikge1xuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgfVxuXG4gIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnModGhpcy5tYWpvciwgb3RoZXIubWFqb3IpIHx8XG4gICAgICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5taW5vciwgb3RoZXIubWlub3IpIHx8XG4gICAgICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5wYXRjaCwgb3RoZXIucGF0Y2gpXG59XG5cblNlbVZlci5wcm90b3R5cGUuY29tcGFyZVByZSA9IGZ1bmN0aW9uIChvdGhlcikge1xuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgfVxuXG4gIC8vIE5PVCBoYXZpbmcgYSBwcmVyZWxlYXNlIGlzID4gaGF2aW5nIG9uZVxuICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gLTFcbiAgfSBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiBvdGhlci5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgIHJldHVybiAxXG4gIH0gZWxzZSBpZiAoIXRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgIW90aGVyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIHZhciBpID0gMFxuICBkbyB7XG4gICAgdmFyIGEgPSB0aGlzLnByZXJlbGVhc2VbaV1cbiAgICB2YXIgYiA9IG90aGVyLnByZXJlbGVhc2VbaV1cbiAgICBkZWJ1ZygncHJlcmVsZWFzZSBjb21wYXJlJywgaSwgYSwgYilcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIDBcbiAgICB9IGVsc2UgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIDFcbiAgICB9IGVsc2UgaWYgKGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfSBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICBjb250aW51ZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpXG4gICAgfVxuICB9IHdoaWxlICgrK2kpXG59XG5cbi8vIHByZW1pbm9yIHdpbGwgYnVtcCB0aGUgdmVyc2lvbiB1cCB0byB0aGUgbmV4dCBtaW5vciByZWxlYXNlLCBhbmQgaW1tZWRpYXRlbHlcbi8vIGRvd24gdG8gcHJlLXJlbGVhc2UuIHByZW1ham9yIGFuZCBwcmVwYXRjaCB3b3JrIHRoZSBzYW1lIHdheS5cblNlbVZlci5wcm90b3R5cGUuaW5jID0gZnVuY3Rpb24gKHJlbGVhc2UsIGlkZW50aWZpZXIpIHtcbiAgc3dpdGNoIChyZWxlYXNlKSB7XG4gICAgY2FzZSAncHJlbWFqb3InOlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDBcbiAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICB0aGlzLm1pbm9yID0gMFxuICAgICAgdGhpcy5tYWpvcisrXG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcilcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncHJlbWlub3InOlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDBcbiAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICB0aGlzLm1pbm9yKytcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdwcmVwYXRjaCc6XG4gICAgICAvLyBJZiB0aGlzIGlzIGFscmVhZHkgYSBwcmVyZWxlYXNlLCBpdCB3aWxsIGJ1bXAgdG8gdGhlIG5leHQgdmVyc2lvblxuICAgICAgLy8gZHJvcCBhbnkgcHJlcmVsZWFzZXMgdGhhdCBtaWdodCBhbHJlYWR5IGV4aXN0LCBzaW5jZSB0aGV5IGFyZSBub3RcbiAgICAgIC8vIHJlbGV2YW50IGF0IHRoaXMgcG9pbnQuXG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMFxuICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcilcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgYnJlYWtcbiAgICAvLyBJZiB0aGUgaW5wdXQgaXMgYSBub24tcHJlcmVsZWFzZSB2ZXJzaW9uLCB0aGlzIGFjdHMgdGhlIHNhbWUgYXNcbiAgICAvLyBwcmVwYXRjaC5cbiAgICBjYXNlICdwcmVyZWxlYXNlJzpcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcilcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdtYWpvcic6XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1ham9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWFqb3IgdmVyc2lvbi5cbiAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWFqb3IuXG4gICAgICAvLyAxLjAuMC01IGJ1bXBzIHRvIDEuMC4wXG4gICAgICAvLyAxLjEuMCBidW1wcyB0byAyLjAuMFxuICAgICAgaWYgKHRoaXMubWlub3IgIT09IDAgfHxcbiAgICAgICAgICB0aGlzLnBhdGNoICE9PSAwIHx8XG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLm1ham9yKytcbiAgICAgIH1cbiAgICAgIHRoaXMubWlub3IgPSAwXG4gICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnbWlub3InOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1taW5vciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1pbm9yIHZlcnNpb24uXG4gICAgICAvLyBPdGhlcndpc2UgaW5jcmVtZW50IG1pbm9yLlxuICAgICAgLy8gMS4yLjAtNSBidW1wcyB0byAxLjIuMFxuICAgICAgLy8gMS4yLjEgYnVtcHMgdG8gMS4zLjBcbiAgICAgIGlmICh0aGlzLnBhdGNoICE9PSAwIHx8IHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5taW5vcisrXG4gICAgICB9XG4gICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncGF0Y2gnOlxuICAgICAgLy8gSWYgdGhpcyBpcyBub3QgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uLCBpdCB3aWxsIGluY3JlbWVudCB0aGUgcGF0Y2guXG4gICAgICAvLyBJZiBpdCBpcyBhIHByZS1yZWxlYXNlIGl0IHdpbGwgYnVtcCB1cCB0byB0aGUgc2FtZSBwYXRjaCB2ZXJzaW9uLlxuICAgICAgLy8gMS4yLjAtNSBwYXRjaGVzIHRvIDEuMi4wXG4gICAgICAvLyAxLjIuMCBwYXRjaGVzIHRvIDEuMi4xXG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnBhdGNoKytcbiAgICAgIH1cbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdXG4gICAgICBicmVha1xuICAgIC8vIFRoaXMgcHJvYmFibHkgc2hvdWxkbid0IGJlIHVzZWQgcHVibGljbHkuXG4gICAgLy8gMS4wLjAgXCJwcmVcIiB3b3VsZCBiZWNvbWUgMS4wLjAtMCB3aGljaCBpcyB0aGUgd3JvbmcgZGlyZWN0aW9uLlxuICAgIGNhc2UgJ3ByZSc6XG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbMF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpID0gdGhpcy5wcmVyZWxlYXNlLmxlbmd0aFxuICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJlcmVsZWFzZVtpXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZVtpXSsrXG4gICAgICAgICAgICBpID0gLTJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICAgICAgLy8gZGlkbid0IGluY3JlbWVudCBhbnl0aGluZ1xuICAgICAgICAgIHRoaXMucHJlcmVsZWFzZS5wdXNoKDApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpZGVudGlmaWVyKSB7XG4gICAgICAgIC8vIDEuMi4wLWJldGEuMSBidW1wcyB0byAxLjIuMC1iZXRhLjIsXG4gICAgICAgIC8vIDEuMi4wLWJldGEuZm9vYmx6IG9yIDEuMi4wLWJldGEgYnVtcHMgdG8gMS4yLjAtYmV0YS4wXG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2VbMF0gPT09IGlkZW50aWZpZXIpIHtcbiAgICAgICAgICBpZiAoaXNOYU4odGhpcy5wcmVyZWxlYXNlWzFdKSkge1xuICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW2lkZW50aWZpZXIsIDBdXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCAwXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVha1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmNyZW1lbnQgYXJndW1lbnQ6ICcgKyByZWxlYXNlKVxuICB9XG4gIHRoaXMuZm9ybWF0KClcbiAgdGhpcy5yYXcgPSB0aGlzLnZlcnNpb25cbiAgcmV0dXJuIHRoaXNcbn1cblxuZXhwb3J0cy5pbmMgPSBpbmNcbmZ1bmN0aW9uIGluYyAodmVyc2lvbiwgcmVsZWFzZSwgbG9vc2UsIGlkZW50aWZpZXIpIHtcbiAgaWYgKHR5cGVvZiAobG9vc2UpID09PSAnc3RyaW5nJykge1xuICAgIGlkZW50aWZpZXIgPSBsb29zZVxuICAgIGxvb3NlID0gdW5kZWZpbmVkXG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKS5pbmMocmVsZWFzZSwgaWRlbnRpZmllcikudmVyc2lvblxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZXhwb3J0cy5kaWZmID0gZGlmZlxuZnVuY3Rpb24gZGlmZiAodmVyc2lvbjEsIHZlcnNpb24yKSB7XG4gIGlmIChlcSh2ZXJzaW9uMSwgdmVyc2lvbjIpKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfSBlbHNlIHtcbiAgICB2YXIgdjEgPSBwYXJzZSh2ZXJzaW9uMSlcbiAgICB2YXIgdjIgPSBwYXJzZSh2ZXJzaW9uMilcbiAgICB2YXIgcHJlZml4ID0gJydcbiAgICBpZiAodjEucHJlcmVsZWFzZS5sZW5ndGggfHwgdjIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAgIHByZWZpeCA9ICdwcmUnXG4gICAgICB2YXIgZGVmYXVsdFJlc3VsdCA9ICdwcmVyZWxlYXNlJ1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gdjEpIHtcbiAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICBpZiAodjFba2V5XSAhPT0gdjJba2V5XSkge1xuICAgICAgICAgIHJldHVybiBwcmVmaXggKyBrZXlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJlc3VsdCAvLyBtYXkgYmUgdW5kZWZpbmVkXG4gIH1cbn1cblxuZXhwb3J0cy5jb21wYXJlSWRlbnRpZmllcnMgPSBjb21wYXJlSWRlbnRpZmllcnNcblxudmFyIG51bWVyaWMgPSAvXlswLTldKyQvXG5mdW5jdGlvbiBjb21wYXJlSWRlbnRpZmllcnMgKGEsIGIpIHtcbiAgdmFyIGFudW0gPSBudW1lcmljLnRlc3QoYSlcbiAgdmFyIGJudW0gPSBudW1lcmljLnRlc3QoYilcblxuICBpZiAoYW51bSAmJiBibnVtKSB7XG4gICAgYSA9ICthXG4gICAgYiA9ICtiXG4gIH1cblxuICByZXR1cm4gYSA9PT0gYiA/IDBcbiAgICA6IChhbnVtICYmICFibnVtKSA/IC0xXG4gICAgOiAoYm51bSAmJiAhYW51bSkgPyAxXG4gICAgOiBhIDwgYiA/IC0xXG4gICAgOiAxXG59XG5cbmV4cG9ydHMucmNvbXBhcmVJZGVudGlmaWVycyA9IHJjb21wYXJlSWRlbnRpZmllcnNcbmZ1bmN0aW9uIHJjb21wYXJlSWRlbnRpZmllcnMgKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhiLCBhKVxufVxuXG5leHBvcnRzLm1ham9yID0gbWFqb3JcbmZ1bmN0aW9uIG1ham9yIChhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkubWFqb3Jcbn1cblxuZXhwb3J0cy5taW5vciA9IG1pbm9yXG5mdW5jdGlvbiBtaW5vciAoYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1pbm9yXG59XG5cbmV4cG9ydHMucGF0Y2ggPSBwYXRjaFxuZnVuY3Rpb24gcGF0Y2ggKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5wYXRjaFxufVxuXG5leHBvcnRzLmNvbXBhcmUgPSBjb21wYXJlXG5mdW5jdGlvbiBjb21wYXJlIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkuY29tcGFyZShuZXcgU2VtVmVyKGIsIGxvb3NlKSlcbn1cblxuZXhwb3J0cy5jb21wYXJlTG9vc2UgPSBjb21wYXJlTG9vc2VcbmZ1bmN0aW9uIGNvbXBhcmVMb29zZSAoYSwgYikge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCB0cnVlKVxufVxuXG5leHBvcnRzLnJjb21wYXJlID0gcmNvbXBhcmVcbmZ1bmN0aW9uIHJjb21wYXJlIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShiLCBhLCBsb29zZSlcbn1cblxuZXhwb3J0cy5zb3J0ID0gc29ydFxuZnVuY3Rpb24gc29ydCAobGlzdCwgbG9vc2UpIHtcbiAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBleHBvcnRzLmNvbXBhcmUoYSwgYiwgbG9vc2UpXG4gIH0pXG59XG5cbmV4cG9ydHMucnNvcnQgPSByc29ydFxuZnVuY3Rpb24gcnNvcnQgKGxpc3QsIGxvb3NlKSB7XG4gIHJldHVybiBsaXN0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5yY29tcGFyZShhLCBiLCBsb29zZSlcbiAgfSlcbn1cblxuZXhwb3J0cy5ndCA9IGd0XG5mdW5jdGlvbiBndCAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID4gMFxufVxuXG5leHBvcnRzLmx0ID0gbHRcbmZ1bmN0aW9uIGx0IChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPCAwXG59XG5cbmV4cG9ydHMuZXEgPSBlcVxuZnVuY3Rpb24gZXEgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA9PT0gMFxufVxuXG5leHBvcnRzLm5lcSA9IG5lcVxuZnVuY3Rpb24gbmVxIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgIT09IDBcbn1cblxuZXhwb3J0cy5ndGUgPSBndGVcbmZ1bmN0aW9uIGd0ZSAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID49IDBcbn1cblxuZXhwb3J0cy5sdGUgPSBsdGVcbmZ1bmN0aW9uIGx0ZSAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpIDw9IDBcbn1cblxuZXhwb3J0cy5jbXAgPSBjbXBcbmZ1bmN0aW9uIGNtcCAoYSwgb3AsIGIsIGxvb3NlKSB7XG4gIHN3aXRjaCAob3ApIHtcbiAgICBjYXNlICc9PT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JylcbiAgICAgICAgYSA9IGEudmVyc2lvblxuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0JylcbiAgICAgICAgYiA9IGIudmVyc2lvblxuICAgICAgcmV0dXJuIGEgPT09IGJcblxuICAgIGNhc2UgJyE9PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKVxuICAgICAgICBhID0gYS52ZXJzaW9uXG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKVxuICAgICAgICBiID0gYi52ZXJzaW9uXG4gICAgICByZXR1cm4gYSAhPT0gYlxuXG4gICAgY2FzZSAnJzpcbiAgICBjYXNlICc9JzpcbiAgICBjYXNlICc9PSc6XG4gICAgICByZXR1cm4gZXEoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICchPSc6XG4gICAgICByZXR1cm4gbmVxKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPic6XG4gICAgICByZXR1cm4gZ3QoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc+PSc6XG4gICAgICByZXR1cm4gZ3RlKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPCc6XG4gICAgICByZXR1cm4gbHQoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc8PSc6XG4gICAgICByZXR1cm4gbHRlKGEsIGIsIGxvb3NlKVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgb3BlcmF0b3I6ICcgKyBvcClcbiAgfVxufVxuXG5leHBvcnRzLkNvbXBhcmF0b3IgPSBDb21wYXJhdG9yXG5mdW5jdGlvbiBDb21wYXJhdG9yIChjb21wLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmIChjb21wIGluc3RhbmNlb2YgQ29tcGFyYXRvcikge1xuICAgIGlmIChjb21wLmxvb3NlID09PSAhIW9wdGlvbnMubG9vc2UpIHtcbiAgICAgIHJldHVybiBjb21wXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXAgPSBjb21wLnZhbHVlXG4gICAgfVxuICB9XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbXBhcmF0b3IpKSB7XG4gICAgcmV0dXJuIG5ldyBDb21wYXJhdG9yKGNvbXAsIG9wdGlvbnMpXG4gIH1cblxuICBkZWJ1ZygnY29tcGFyYXRvcicsIGNvbXAsIG9wdGlvbnMpXG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgdGhpcy5sb29zZSA9ICEhb3B0aW9ucy5sb29zZVxuICB0aGlzLnBhcnNlKGNvbXApXG5cbiAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkpIHtcbiAgICB0aGlzLnZhbHVlID0gJydcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5vcGVyYXRvciArIHRoaXMuc2VtdmVyLnZlcnNpb25cbiAgfVxuXG4gIGRlYnVnKCdjb21wJywgdGhpcylcbn1cblxudmFyIEFOWSA9IHt9XG5Db21wYXJhdG9yLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChjb21wKSB7XG4gIHZhciByID0gdGhpcy5vcHRpb25zLmxvb3NlID8gcmVbQ09NUEFSQVRPUkxPT1NFXSA6IHJlW0NPTVBBUkFUT1JdXG4gIHZhciBtID0gY29tcC5tYXRjaChyKVxuXG4gIGlmICghbSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY29tcGFyYXRvcjogJyArIGNvbXApXG4gIH1cblxuICB0aGlzLm9wZXJhdG9yID0gbVsxXVxuICBpZiAodGhpcy5vcGVyYXRvciA9PT0gJz0nKSB7XG4gICAgdGhpcy5vcGVyYXRvciA9ICcnXG4gIH1cblxuICAvLyBpZiBpdCBsaXRlcmFsbHkgaXMganVzdCAnPicgb3IgJycgdGhlbiBhbGxvdyBhbnl0aGluZy5cbiAgaWYgKCFtWzJdKSB7XG4gICAgdGhpcy5zZW12ZXIgPSBBTllcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnNlbXZlciA9IG5ldyBTZW1WZXIobVsyXSwgdGhpcy5vcHRpb25zLmxvb3NlKVxuICB9XG59XG5cbkNvbXBhcmF0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy52YWx1ZVxufVxuXG5Db21wYXJhdG9yLnByb3RvdHlwZS50ZXN0ID0gZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgZGVidWcoJ0NvbXBhcmF0b3IudGVzdCcsIHZlcnNpb24sIHRoaXMub3B0aW9ucy5sb29zZSlcblxuICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5vcHRpb25zKVxuICB9XG5cbiAgcmV0dXJuIGNtcCh2ZXJzaW9uLCB0aGlzLm9wZXJhdG9yLCB0aGlzLnNlbXZlciwgdGhpcy5vcHRpb25zKVxufVxuXG5Db21wYXJhdG9yLnByb3RvdHlwZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKGNvbXAsIG9wdGlvbnMpIHtcbiAgaWYgKCEoY29tcCBpbnN0YW5jZW9mIENvbXBhcmF0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYSBDb21wYXJhdG9yIGlzIHJlcXVpcmVkJylcbiAgfVxuXG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHZhciByYW5nZVRtcFxuXG4gIGlmICh0aGlzLm9wZXJhdG9yID09PSAnJykge1xuICAgIHJhbmdlVG1wID0gbmV3IFJhbmdlKGNvbXAudmFsdWUsIG9wdGlvbnMpXG4gICAgcmV0dXJuIHNhdGlzZmllcyh0aGlzLnZhbHVlLCByYW5nZVRtcCwgb3B0aW9ucylcbiAgfSBlbHNlIGlmIChjb21wLm9wZXJhdG9yID09PSAnJykge1xuICAgIHJhbmdlVG1wID0gbmV3IFJhbmdlKHRoaXMudmFsdWUsIG9wdGlvbnMpXG4gICAgcmV0dXJuIHNhdGlzZmllcyhjb21wLnNlbXZlciwgcmFuZ2VUbXAsIG9wdGlvbnMpXG4gIH1cblxuICB2YXIgc2FtZURpcmVjdGlvbkluY3JlYXNpbmcgPVxuICAgICh0aGlzLm9wZXJhdG9yID09PSAnPj0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc+JykgJiZcbiAgICAoY29tcC5vcGVyYXRvciA9PT0gJz49JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPicpXG4gIHZhciBzYW1lRGlyZWN0aW9uRGVjcmVhc2luZyA9XG4gICAgKHRoaXMub3BlcmF0b3IgPT09ICc8PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJzwnKSAmJlxuICAgIChjb21wLm9wZXJhdG9yID09PSAnPD0nIHx8IGNvbXAub3BlcmF0b3IgPT09ICc8JylcbiAgdmFyIHNhbWVTZW1WZXIgPSB0aGlzLnNlbXZlci52ZXJzaW9uID09PSBjb21wLnNlbXZlci52ZXJzaW9uXG4gIHZhciBkaWZmZXJlbnREaXJlY3Rpb25zSW5jbHVzaXZlID1cbiAgICAodGhpcy5vcGVyYXRvciA9PT0gJz49JyB8fCB0aGlzLm9wZXJhdG9yID09PSAnPD0nKSAmJlxuICAgIChjb21wLm9wZXJhdG9yID09PSAnPj0nIHx8IGNvbXAub3BlcmF0b3IgPT09ICc8PScpXG4gIHZhciBvcHBvc2l0ZURpcmVjdGlvbnNMZXNzVGhhbiA9XG4gICAgY21wKHRoaXMuc2VtdmVyLCAnPCcsIGNvbXAuc2VtdmVyLCBvcHRpb25zKSAmJlxuICAgICgodGhpcy5vcGVyYXRvciA9PT0gJz49JyB8fCB0aGlzLm9wZXJhdG9yID09PSAnPicpICYmXG4gICAgKGNvbXAub3BlcmF0b3IgPT09ICc8PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJzwnKSlcbiAgdmFyIG9wcG9zaXRlRGlyZWN0aW9uc0dyZWF0ZXJUaGFuID1cbiAgICBjbXAodGhpcy5zZW12ZXIsICc+JywgY29tcC5zZW12ZXIsIG9wdGlvbnMpICYmXG4gICAgKCh0aGlzLm9wZXJhdG9yID09PSAnPD0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc8JykgJiZcbiAgICAoY29tcC5vcGVyYXRvciA9PT0gJz49JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPicpKVxuXG4gIHJldHVybiBzYW1lRGlyZWN0aW9uSW5jcmVhc2luZyB8fCBzYW1lRGlyZWN0aW9uRGVjcmVhc2luZyB8fFxuICAgIChzYW1lU2VtVmVyICYmIGRpZmZlcmVudERpcmVjdGlvbnNJbmNsdXNpdmUpIHx8XG4gICAgb3Bwb3NpdGVEaXJlY3Rpb25zTGVzc1RoYW4gfHwgb3Bwb3NpdGVEaXJlY3Rpb25zR3JlYXRlclRoYW5cbn1cblxuZXhwb3J0cy5SYW5nZSA9IFJhbmdlXG5mdW5jdGlvbiBSYW5nZSAocmFuZ2UsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zIHx8IHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBsb29zZTogISFvcHRpb25zLFxuICAgICAgaW5jbHVkZVByZXJlbGVhc2U6IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaWYgKHJhbmdlIGluc3RhbmNlb2YgUmFuZ2UpIHtcbiAgICBpZiAocmFuZ2UubG9vc2UgPT09ICEhb3B0aW9ucy5sb29zZSAmJlxuICAgICAgICByYW5nZS5pbmNsdWRlUHJlcmVsZWFzZSA9PT0gISFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlKSB7XG4gICAgICByZXR1cm4gcmFuZ2VcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZS5yYXcsIG9wdGlvbnMpXG4gICAgfVxuICB9XG5cbiAgaWYgKHJhbmdlIGluc3RhbmNlb2YgQ29tcGFyYXRvcikge1xuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UudmFsdWUsIG9wdGlvbnMpXG4gIH1cblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmFuZ2UpKSB7XG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfVxuXG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgdGhpcy5sb29zZSA9ICEhb3B0aW9ucy5sb29zZVxuICB0aGlzLmluY2x1ZGVQcmVyZWxlYXNlID0gISFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlXG5cbiAgLy8gRmlyc3QsIHNwbGl0IGJhc2VkIG9uIGJvb2xlYW4gb3IgfHxcbiAgdGhpcy5yYXcgPSByYW5nZVxuICB0aGlzLnNldCA9IHJhbmdlLnNwbGl0KC9cXHMqXFx8XFx8XFxzKi8pLm1hcChmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJzZVJhbmdlKHJhbmdlLnRyaW0oKSlcbiAgfSwgdGhpcykuZmlsdGVyKGZ1bmN0aW9uIChjKSB7XG4gICAgLy8gdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgcmVsZXZhbnQgZm9yIHdoYXRldmVyIHJlYXNvblxuICAgIHJldHVybiBjLmxlbmd0aFxuICB9KVxuXG4gIGlmICghdGhpcy5zZXQubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBTZW1WZXIgUmFuZ2U6ICcgKyByYW5nZSlcbiAgfVxuXG4gIHRoaXMuZm9ybWF0KClcbn1cblxuUmFuZ2UucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yYW5nZSA9IHRoaXMuc2V0Lm1hcChmdW5jdGlvbiAoY29tcHMpIHtcbiAgICByZXR1cm4gY29tcHMuam9pbignICcpLnRyaW0oKVxuICB9KS5qb2luKCd8fCcpLnRyaW0oKVxuICByZXR1cm4gdGhpcy5yYW5nZVxufVxuXG5SYW5nZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnJhbmdlXG59XG5cblJhbmdlLnByb3RvdHlwZS5wYXJzZVJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gIHZhciBsb29zZSA9IHRoaXMub3B0aW9ucy5sb29zZVxuICByYW5nZSA9IHJhbmdlLnRyaW0oKVxuICAvLyBgMS4yLjMgLSAxLjIuNGAgPT4gYD49MS4yLjMgPD0xLjIuNGBcbiAgdmFyIGhyID0gbG9vc2UgPyByZVtIWVBIRU5SQU5HRUxPT1NFXSA6IHJlW0hZUEhFTlJBTkdFXVxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UoaHIsIGh5cGhlblJlcGxhY2UpXG4gIGRlYnVnKCdoeXBoZW4gcmVwbGFjZScsIHJhbmdlKVxuICAvLyBgPiAxLjIuMyA8IDEuMi41YCA9PiBgPjEuMi4zIDwxLjIuNWBcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW0NPTVBBUkFUT1JUUklNXSwgY29tcGFyYXRvclRyaW1SZXBsYWNlKVxuICBkZWJ1ZygnY29tcGFyYXRvciB0cmltJywgcmFuZ2UsIHJlW0NPTVBBUkFUT1JUUklNXSlcblxuICAvLyBgfiAxLjIuM2AgPT4gYH4xLjIuM2BcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW1RJTERFVFJJTV0sIHRpbGRlVHJpbVJlcGxhY2UpXG5cbiAgLy8gYF4gMS4yLjNgID0+IGBeMS4yLjNgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtDQVJFVFRSSU1dLCBjYXJldFRyaW1SZXBsYWNlKVxuXG4gIC8vIG5vcm1hbGl6ZSBzcGFjZXNcbiAgcmFuZ2UgPSByYW5nZS5zcGxpdCgvXFxzKy8pLmpvaW4oJyAnKVxuXG4gIC8vIEF0IHRoaXMgcG9pbnQsIHRoZSByYW5nZSBpcyBjb21wbGV0ZWx5IHRyaW1tZWQgYW5kXG4gIC8vIHJlYWR5IHRvIGJlIHNwbGl0IGludG8gY29tcGFyYXRvcnMuXG5cbiAgdmFyIGNvbXBSZSA9IGxvb3NlID8gcmVbQ09NUEFSQVRPUkxPT1NFXSA6IHJlW0NPTVBBUkFUT1JdXG4gIHZhciBzZXQgPSByYW5nZS5zcGxpdCgnICcpLm1hcChmdW5jdGlvbiAoY29tcCkge1xuICAgIHJldHVybiBwYXJzZUNvbXBhcmF0b3IoY29tcCwgdGhpcy5vcHRpb25zKVxuICB9LCB0aGlzKS5qb2luKCcgJykuc3BsaXQoL1xccysvKVxuICBpZiAodGhpcy5vcHRpb25zLmxvb3NlKSB7XG4gICAgLy8gaW4gbG9vc2UgbW9kZSwgdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgdmFsaWQgY29tcGFyYXRvcnNcbiAgICBzZXQgPSBzZXQuZmlsdGVyKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgICByZXR1cm4gISFjb21wLm1hdGNoKGNvbXBSZSlcbiAgICB9KVxuICB9XG4gIHNldCA9IHNldC5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICByZXR1cm4gbmV3IENvbXBhcmF0b3IoY29tcCwgdGhpcy5vcHRpb25zKVxuICB9LCB0aGlzKVxuXG4gIHJldHVybiBzZXRcbn1cblxuUmFuZ2UucHJvdG90eXBlLmludGVyc2VjdHMgPSBmdW5jdGlvbiAocmFuZ2UsIG9wdGlvbnMpIHtcbiAgaWYgKCEocmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhIFJhbmdlIGlzIHJlcXVpcmVkJylcbiAgfVxuXG4gIHJldHVybiB0aGlzLnNldC5zb21lKGZ1bmN0aW9uICh0aGlzQ29tcGFyYXRvcnMpIHtcbiAgICByZXR1cm4gdGhpc0NvbXBhcmF0b3JzLmV2ZXJ5KGZ1bmN0aW9uICh0aGlzQ29tcGFyYXRvcikge1xuICAgICAgcmV0dXJuIHJhbmdlLnNldC5zb21lKGZ1bmN0aW9uIChyYW5nZUNvbXBhcmF0b3JzKSB7XG4gICAgICAgIHJldHVybiByYW5nZUNvbXBhcmF0b3JzLmV2ZXJ5KGZ1bmN0aW9uIChyYW5nZUNvbXBhcmF0b3IpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc0NvbXBhcmF0b3IuaW50ZXJzZWN0cyhyYW5nZUNvbXBhcmF0b3IsIG9wdGlvbnMpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIE1vc3RseSBqdXN0IGZvciB0ZXN0aW5nIGFuZCBsZWdhY3kgQVBJIHJlYXNvbnNcbmV4cG9ydHMudG9Db21wYXJhdG9ycyA9IHRvQ29tcGFyYXRvcnNcbmZ1bmN0aW9uIHRvQ29tcGFyYXRvcnMgKHJhbmdlLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpLnNldC5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICByZXR1cm4gY29tcC5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgIHJldHVybiBjLnZhbHVlXG4gICAgfSkuam9pbignICcpLnRyaW0oKS5zcGxpdCgnICcpXG4gIH0pXG59XG5cbi8vIGNvbXByaXNlZCBvZiB4cmFuZ2VzLCB0aWxkZXMsIHN0YXJzLCBhbmQgZ3RsdCdzIGF0IHRoaXMgcG9pbnQuXG4vLyBhbHJlYWR5IHJlcGxhY2VkIHRoZSBoeXBoZW4gcmFuZ2VzXG4vLyB0dXJuIGludG8gYSBzZXQgb2YgSlVTVCBjb21wYXJhdG9ycy5cbmZ1bmN0aW9uIHBhcnNlQ29tcGFyYXRvciAoY29tcCwgb3B0aW9ucykge1xuICBkZWJ1ZygnY29tcCcsIGNvbXAsIG9wdGlvbnMpXG4gIGNvbXAgPSByZXBsYWNlQ2FyZXRzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCdjYXJldCcsIGNvbXApXG4gIGNvbXAgPSByZXBsYWNlVGlsZGVzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCd0aWxkZXMnLCBjb21wKVxuICBjb21wID0gcmVwbGFjZVhSYW5nZXMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ3hyYW5nZScsIGNvbXApXG4gIGNvbXAgPSByZXBsYWNlU3RhcnMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ3N0YXJzJywgY29tcClcbiAgcmV0dXJuIGNvbXBcbn1cblxuZnVuY3Rpb24gaXNYIChpZCkge1xuICByZXR1cm4gIWlkIHx8IGlkLnRvTG93ZXJDYXNlKCkgPT09ICd4JyB8fCBpZCA9PT0gJyonXG59XG5cbi8vIH4sIH4+IC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gfjIsIH4yLngsIH4yLngueCwgfj4yLCB+PjIueCB+PjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gfjIuMCwgfjIuMC54LCB+PjIuMCwgfj4yLjAueCAtLT4gPj0yLjAuMCA8Mi4xLjBcbi8vIH4xLjIsIH4xLjIueCwgfj4xLjIsIH4+MS4yLnggLS0+ID49MS4yLjAgPDEuMy4wXG4vLyB+MS4yLjMsIH4+MS4yLjMgLS0+ID49MS4yLjMgPDEuMy4wXG4vLyB+MS4yLjAsIH4+MS4yLjAgLS0+ID49MS4yLjAgPDEuMy4wXG5mdW5jdGlvbiByZXBsYWNlVGlsZGVzIChjb21wLCBvcHRpb25zKSB7XG4gIHJldHVybiBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbiAoY29tcCkge1xuICAgIHJldHVybiByZXBsYWNlVGlsZGUoY29tcCwgb3B0aW9ucylcbiAgfSkuam9pbignICcpXG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VUaWxkZSAoY29tcCwgb3B0aW9ucykge1xuICB2YXIgciA9IG9wdGlvbnMubG9vc2UgPyByZVtUSUxERUxPT1NFXSA6IHJlW1RJTERFXVxuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uIChfLCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCd0aWxkZScsIGNvbXAsIF8sIE0sIG0sIHAsIHByKVxuICAgIHZhciByZXRcblxuICAgIGlmIChpc1goTSkpIHtcbiAgICAgIHJldCA9ICcnXG4gICAgfSBlbHNlIGlmIChpc1gobSkpIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJ1xuICAgIH0gZWxzZSBpZiAoaXNYKHApKSB7XG4gICAgICAvLyB+MS4yID09ID49MS4yLjAgPDEuMy4wXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnXG4gICAgfSBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VUaWxkZSBwcicsIHByKVxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArICctJyArIHByICtcbiAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIH4xLjIuMyA9PSA+PTEuMi4zIDwxLjMuMFxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJ1xuICAgIH1cblxuICAgIGRlYnVnKCd0aWxkZSByZXR1cm4nLCByZXQpXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG4vLyBeIC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gXjIsIF4yLngsIF4yLngueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIF4yLjAsIF4yLjAueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIF4xLjIsIF4xLjIueCAtLT4gPj0xLjIuMCA8Mi4wLjBcbi8vIF4xLjIuMyAtLT4gPj0xLjIuMyA8Mi4wLjBcbi8vIF4xLjIuMCAtLT4gPj0xLjIuMCA8Mi4wLjBcbmZ1bmN0aW9uIHJlcGxhY2VDYXJldHMgKGNvbXAsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VDYXJldChjb21wLCBvcHRpb25zKVxuICB9KS5qb2luKCcgJylcbn1cblxuZnVuY3Rpb24gcmVwbGFjZUNhcmV0IChjb21wLCBvcHRpb25zKSB7XG4gIGRlYnVnKCdjYXJldCcsIGNvbXAsIG9wdGlvbnMpXG4gIHZhciByID0gb3B0aW9ucy5sb29zZSA/IHJlW0NBUkVUTE9PU0VdIDogcmVbQ0FSRVRdXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24gKF8sIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ2NhcmV0JywgY29tcCwgXywgTSwgbSwgcCwgcHIpXG4gICAgdmFyIHJldFxuXG4gICAgaWYgKGlzWChNKSkge1xuICAgICAgcmV0ID0gJydcbiAgICB9IGVsc2UgaWYgKGlzWChtKSkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnXG4gICAgfSBlbHNlIGlmIChpc1gocCkpIHtcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCdcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZUNhcmV0IHByJywgcHIpXG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpIHtcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgJy0nICsgcHIgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArICctJyArIHByICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJ1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgJy0nICsgcHIgK1xuICAgICAgICAgICAgICAnIDwnICsgKCtNICsgMSkgKyAnLjAuMCdcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ25vIHByJylcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgaWYgKG0gPT09ICcwJykge1xuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCdcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICcgPCcgKyAoK00gKyAxKSArICcuMC4wJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlYnVnKCdjYXJldCByZXR1cm4nLCByZXQpXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG5mdW5jdGlvbiByZXBsYWNlWFJhbmdlcyAoY29tcCwgb3B0aW9ucykge1xuICBkZWJ1ZygncmVwbGFjZVhSYW5nZXMnLCBjb21wLCBvcHRpb25zKVxuICByZXR1cm4gY29tcC5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbiAoY29tcCkge1xuICAgIHJldHVybiByZXBsYWNlWFJhbmdlKGNvbXAsIG9wdGlvbnMpXG4gIH0pLmpvaW4oJyAnKVxufVxuXG5mdW5jdGlvbiByZXBsYWNlWFJhbmdlIChjb21wLCBvcHRpb25zKSB7XG4gIGNvbXAgPSBjb21wLnRyaW0oKVxuICB2YXIgciA9IG9wdGlvbnMubG9vc2UgPyByZVtYUkFOR0VMT09TRV0gOiByZVtYUkFOR0VdXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24gKHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpIHtcbiAgICBkZWJ1ZygneFJhbmdlJywgY29tcCwgcmV0LCBndGx0LCBNLCBtLCBwLCBwcilcbiAgICB2YXIgeE0gPSBpc1goTSlcbiAgICB2YXIgeG0gPSB4TSB8fCBpc1gobSlcbiAgICB2YXIgeHAgPSB4bSB8fCBpc1gocClcbiAgICB2YXIgYW55WCA9IHhwXG5cbiAgICBpZiAoZ3RsdCA9PT0gJz0nICYmIGFueVgpIHtcbiAgICAgIGd0bHQgPSAnJ1xuICAgIH1cblxuICAgIGlmICh4TSkge1xuICAgICAgaWYgKGd0bHQgPT09ICc+JyB8fCBndGx0ID09PSAnPCcpIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBhbGxvd2VkXG4gICAgICAgIHJldCA9ICc8MC4wLjAnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBub3RoaW5nIGlzIGZvcmJpZGRlblxuICAgICAgICByZXQgPSAnKidcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGd0bHQgJiYgYW55WCkge1xuICAgICAgLy8gd2Uga25vdyBwYXRjaCBpcyBhbiB4LCBiZWNhdXNlIHdlIGhhdmUgYW55IHggYXQgYWxsLlxuICAgICAgLy8gcmVwbGFjZSBYIHdpdGggMFxuICAgICAgaWYgKHhtKSB7XG4gICAgICAgIG0gPSAwXG4gICAgICB9XG4gICAgICBwID0gMFxuXG4gICAgICBpZiAoZ3RsdCA9PT0gJz4nKSB7XG4gICAgICAgIC8vID4xID0+ID49Mi4wLjBcbiAgICAgICAgLy8gPjEuMiA9PiA+PTEuMy4wXG4gICAgICAgIC8vID4xLjIuMyA9PiA+PSAxLjIuNFxuICAgICAgICBndGx0ID0gJz49J1xuICAgICAgICBpZiAoeG0pIHtcbiAgICAgICAgICBNID0gK00gKyAxXG4gICAgICAgICAgbSA9IDBcbiAgICAgICAgICBwID0gMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG0gPSArbSArIDFcbiAgICAgICAgICBwID0gMFxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGd0bHQgPT09ICc8PScpIHtcbiAgICAgICAgLy8gPD0wLjcueCBpcyBhY3R1YWxseSA8MC44LjAsIHNpbmNlIGFueSAwLjcueCBzaG91bGRcbiAgICAgICAgLy8gcGFzcy4gIFNpbWlsYXJseSwgPD03LnggaXMgYWN0dWFsbHkgPDguMC4wLCBldGMuXG4gICAgICAgIGd0bHQgPSAnPCdcbiAgICAgICAgaWYgKHhtKSB7XG4gICAgICAgICAgTSA9ICtNICsgMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG0gPSArbSArIDFcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXQgPSBndGx0ICsgTSArICcuJyArIG0gKyAnLicgKyBwXG4gICAgfSBlbHNlIGlmICh4bSkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnXG4gICAgfSBlbHNlIGlmICh4cCkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJ1xuICAgIH1cblxuICAgIGRlYnVnKCd4UmFuZ2UgcmV0dXJuJywgcmV0KVxuXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG4vLyBCZWNhdXNlICogaXMgQU5ELWVkIHdpdGggZXZlcnl0aGluZyBlbHNlIGluIHRoZSBjb21wYXJhdG9yLFxuLy8gYW5kICcnIG1lYW5zIFwiYW55IHZlcnNpb25cIiwganVzdCByZW1vdmUgdGhlICpzIGVudGlyZWx5LlxuZnVuY3Rpb24gcmVwbGFjZVN0YXJzIChjb21wLCBvcHRpb25zKSB7XG4gIGRlYnVnKCdyZXBsYWNlU3RhcnMnLCBjb21wLCBvcHRpb25zKVxuICAvLyBMb29zZW5lc3MgaXMgaWdub3JlZCBoZXJlLiAgc3RhciBpcyBhbHdheXMgYXMgbG9vc2UgYXMgaXQgZ2V0cyFcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnJlcGxhY2UocmVbU1RBUl0sICcnKVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIHBhc3NlZCB0byBzdHJpbmcucmVwbGFjZShyZVtIWVBIRU5SQU5HRV0pXG4vLyBNLCBtLCBwYXRjaCwgcHJlcmVsZWFzZSwgYnVpbGRcbi8vIDEuMiAtIDMuNC41ID0+ID49MS4yLjAgPD0zLjQuNVxuLy8gMS4yLjMgLSAzLjQgPT4gPj0xLjIuMCA8My41LjAgQW55IDMuNC54IHdpbGwgZG9cbi8vIDEuMiAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMFxuZnVuY3Rpb24gaHlwaGVuUmVwbGFjZSAoJDAsXG4gIGZyb20sIGZNLCBmbSwgZnAsIGZwciwgZmIsXG4gIHRvLCB0TSwgdG0sIHRwLCB0cHIsIHRiKSB7XG4gIGlmIChpc1goZk0pKSB7XG4gICAgZnJvbSA9ICcnXG4gIH0gZWxzZSBpZiAoaXNYKGZtKSkge1xuICAgIGZyb20gPSAnPj0nICsgZk0gKyAnLjAuMCdcbiAgfSBlbHNlIGlmIChpc1goZnApKSB7XG4gICAgZnJvbSA9ICc+PScgKyBmTSArICcuJyArIGZtICsgJy4wJ1xuICB9IGVsc2Uge1xuICAgIGZyb20gPSAnPj0nICsgZnJvbVxuICB9XG5cbiAgaWYgKGlzWCh0TSkpIHtcbiAgICB0byA9ICcnXG4gIH0gZWxzZSBpZiAoaXNYKHRtKSkge1xuICAgIHRvID0gJzwnICsgKCt0TSArIDEpICsgJy4wLjAnXG4gIH0gZWxzZSBpZiAoaXNYKHRwKSkge1xuICAgIHRvID0gJzwnICsgdE0gKyAnLicgKyAoK3RtICsgMSkgKyAnLjAnXG4gIH0gZWxzZSBpZiAodHByKSB7XG4gICAgdG8gPSAnPD0nICsgdE0gKyAnLicgKyB0bSArICcuJyArIHRwICsgJy0nICsgdHByXG4gIH0gZWxzZSB7XG4gICAgdG8gPSAnPD0nICsgdG9cbiAgfVxuXG4gIHJldHVybiAoZnJvbSArICcgJyArIHRvKS50cmltKClcbn1cblxuLy8gaWYgQU5ZIG9mIHRoZSBzZXRzIG1hdGNoIEFMTCBvZiBpdHMgY29tcGFyYXRvcnMsIHRoZW4gcGFzc1xuUmFuZ2UucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbiAodmVyc2lvbikge1xuICBpZiAoIXZlcnNpb24pIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLm9wdGlvbnMpXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHRlc3RTZXQodGhpcy5zZXRbaV0sIHZlcnNpb24sIHRoaXMub3B0aW9ucykpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiB0ZXN0U2V0IChzZXQsIHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIXNldFtpXS50ZXN0KHZlcnNpb24pKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBpZiAodmVyc2lvbi5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSkge1xuICAgIC8vIEZpbmQgdGhlIHNldCBvZiB2ZXJzaW9ucyB0aGF0IGFyZSBhbGxvd2VkIHRvIGhhdmUgcHJlcmVsZWFzZXNcbiAgICAvLyBGb3IgZXhhbXBsZSwgXjEuMi4zLXByLjEgZGVzdWdhcnMgdG8gPj0xLjIuMy1wci4xIDwyLjAuMFxuICAgIC8vIFRoYXQgc2hvdWxkIGFsbG93IGAxLjIuMy1wci4yYCB0byBwYXNzLlxuICAgIC8vIEhvd2V2ZXIsIGAxLjIuNC1hbHBoYS5ub3RyZWFkeWAgc2hvdWxkIE5PVCBiZSBhbGxvd2VkLFxuICAgIC8vIGV2ZW4gdGhvdWdoIGl0J3Mgd2l0aGluIHRoZSByYW5nZSBzZXQgYnkgdGhlIGNvbXBhcmF0b3JzLlxuICAgIGZvciAoaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlYnVnKHNldFtpXS5zZW12ZXIpXG4gICAgICBpZiAoc2V0W2ldLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChzZXRbaV0uc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgYWxsb3dlZCA9IHNldFtpXS5zZW12ZXJcbiAgICAgICAgaWYgKGFsbG93ZWQubWFqb3IgPT09IHZlcnNpb24ubWFqb3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQubWlub3IgPT09IHZlcnNpb24ubWlub3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQucGF0Y2ggPT09IHZlcnNpb24ucGF0Y2gpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVmVyc2lvbiBoYXMgYSAtcHJlLCBidXQgaXQncyBub3Qgb25lIG9mIHRoZSBvbmVzIHdlIGxpa2UuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnRzLnNhdGlzZmllcyA9IHNhdGlzZmllc1xuZnVuY3Rpb24gc2F0aXNmaWVzICh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykge1xuICB0cnkge1xuICAgIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiByYW5nZS50ZXN0KHZlcnNpb24pXG59XG5cbmV4cG9ydHMubWF4U2F0aXNmeWluZyA9IG1heFNhdGlzZnlpbmdcbmZ1bmN0aW9uIG1heFNhdGlzZnlpbmcgKHZlcnNpb25zLCByYW5nZSwgb3B0aW9ucykge1xuICB2YXIgbWF4ID0gbnVsbFxuICB2YXIgbWF4U1YgPSBudWxsXG4gIHRyeSB7XG4gICAgdmFyIHJhbmdlT2JqID0gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgdmVyc2lvbnMuZm9yRWFjaChmdW5jdGlvbiAodikge1xuICAgIGlmIChyYW5nZU9iai50ZXN0KHYpKSB7XG4gICAgICAvLyBzYXRpc2ZpZXModiwgcmFuZ2UsIG9wdGlvbnMpXG4gICAgICBpZiAoIW1heCB8fCBtYXhTVi5jb21wYXJlKHYpID09PSAtMSkge1xuICAgICAgICAvLyBjb21wYXJlKG1heCwgdiwgdHJ1ZSlcbiAgICAgICAgbWF4ID0gdlxuICAgICAgICBtYXhTViA9IG5ldyBTZW1WZXIobWF4LCBvcHRpb25zKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIG1heFxufVxuXG5leHBvcnRzLm1pblNhdGlzZnlpbmcgPSBtaW5TYXRpc2Z5aW5nXG5mdW5jdGlvbiBtaW5TYXRpc2Z5aW5nICh2ZXJzaW9ucywgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgdmFyIG1pbiA9IG51bGxcbiAgdmFyIG1pblNWID0gbnVsbFxuICB0cnkge1xuICAgIHZhciByYW5nZU9iaiA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHZlcnNpb25zLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICBpZiAocmFuZ2VPYmoudGVzdCh2KSkge1xuICAgICAgLy8gc2F0aXNmaWVzKHYsIHJhbmdlLCBvcHRpb25zKVxuICAgICAgaWYgKCFtaW4gfHwgbWluU1YuY29tcGFyZSh2KSA9PT0gMSkge1xuICAgICAgICAvLyBjb21wYXJlKG1pbiwgdiwgdHJ1ZSlcbiAgICAgICAgbWluID0gdlxuICAgICAgICBtaW5TViA9IG5ldyBTZW1WZXIobWluLCBvcHRpb25zKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIG1pblxufVxuXG5leHBvcnRzLm1pblZlcnNpb24gPSBtaW5WZXJzaW9uXG5mdW5jdGlvbiBtaW5WZXJzaW9uIChyYW5nZSwgbG9vc2UpIHtcbiAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKVxuXG4gIHZhciBtaW52ZXIgPSBuZXcgU2VtVmVyKCcwLjAuMCcpXG4gIGlmIChyYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICBtaW52ZXIgPSBuZXcgU2VtVmVyKCcwLjAuMC0wJylcbiAgaWYgKHJhbmdlLnRlc3QobWludmVyKSkge1xuICAgIHJldHVybiBtaW52ZXJcbiAgfVxuXG4gIG1pbnZlciA9IG51bGxcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZS5zZXQubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgY29tcGFyYXRvcnMgPSByYW5nZS5zZXRbaV1cblxuICAgIGNvbXBhcmF0b3JzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgICAgIC8vIENsb25lIHRvIGF2b2lkIG1hbmlwdWxhdGluZyB0aGUgY29tcGFyYXRvcidzIHNlbXZlciBvYmplY3QuXG4gICAgICB2YXIgY29tcHZlciA9IG5ldyBTZW1WZXIoY29tcGFyYXRvci5zZW12ZXIudmVyc2lvbilcbiAgICAgIHN3aXRjaCAoY29tcGFyYXRvci5vcGVyYXRvcikge1xuICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICBpZiAoY29tcHZlci5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29tcHZlci5wYXRjaCsrXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXB2ZXIucHJlcmVsZWFzZS5wdXNoKDApXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbXB2ZXIucmF3ID0gY29tcHZlci5mb3JtYXQoKVxuICAgICAgICAgIC8qIGZhbGx0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJyc6XG4gICAgICAgIGNhc2UgJz49JzpcbiAgICAgICAgICBpZiAoIW1pbnZlciB8fCBndChtaW52ZXIsIGNvbXB2ZXIpKSB7XG4gICAgICAgICAgICBtaW52ZXIgPSBjb21wdmVyXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICBjYXNlICc8PSc6XG4gICAgICAgICAgLyogSWdub3JlIG1heGltdW0gdmVyc2lvbnMgKi9cbiAgICAgICAgICBicmVha1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBvcGVyYXRpb246ICcgKyBjb21wYXJhdG9yLm9wZXJhdG9yKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpZiAobWludmVyICYmIHJhbmdlLnRlc3QobWludmVyKSkge1xuICAgIHJldHVybiBtaW52ZXJcbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG5cbmV4cG9ydHMudmFsaWRSYW5nZSA9IHZhbGlkUmFuZ2VcbmZ1bmN0aW9uIHZhbGlkUmFuZ2UgKHJhbmdlLCBvcHRpb25zKSB7XG4gIHRyeSB7XG4gICAgLy8gUmV0dXJuICcqJyBpbnN0ZWFkIG9mICcnIHNvIHRoYXQgdHJ1dGhpbmVzcyB3b3Jrcy5cbiAgICAvLyBUaGlzIHdpbGwgdGhyb3cgaWYgaXQncyBpbnZhbGlkIGFueXdheVxuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpLnJhbmdlIHx8ICcqJ1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgbGVzcyB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlXG5leHBvcnRzLmx0ciA9IGx0clxuZnVuY3Rpb24gbHRyICh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykge1xuICByZXR1cm4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJzwnLCBvcHRpb25zKVxufVxuXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBncmVhdGVyIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2UuXG5leHBvcnRzLmd0ciA9IGd0clxuZnVuY3Rpb24gZ3RyICh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykge1xuICByZXR1cm4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJz4nLCBvcHRpb25zKVxufVxuXG5leHBvcnRzLm91dHNpZGUgPSBvdXRzaWRlXG5mdW5jdGlvbiBvdXRzaWRlICh2ZXJzaW9uLCByYW5nZSwgaGlsbywgb3B0aW9ucykge1xuICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcblxuICB2YXIgZ3RmbiwgbHRlZm4sIGx0Zm4sIGNvbXAsIGVjb21wXG4gIHN3aXRjaCAoaGlsbykge1xuICAgIGNhc2UgJz4nOlxuICAgICAgZ3RmbiA9IGd0XG4gICAgICBsdGVmbiA9IGx0ZVxuICAgICAgbHRmbiA9IGx0XG4gICAgICBjb21wID0gJz4nXG4gICAgICBlY29tcCA9ICc+PSdcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnPCc6XG4gICAgICBndGZuID0gbHRcbiAgICAgIGx0ZWZuID0gZ3RlXG4gICAgICBsdGZuID0gZ3RcbiAgICAgIGNvbXAgPSAnPCdcbiAgICAgIGVjb21wID0gJzw9J1xuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBwcm92aWRlIGEgaGlsbyB2YWwgb2YgXCI8XCIgb3IgXCI+XCInKVxuICB9XG5cbiAgLy8gSWYgaXQgc2F0aXNpZmVzIHRoZSByYW5nZSBpdCBpcyBub3Qgb3V0c2lkZVxuICBpZiAoc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gRnJvbSBub3cgb24sIHZhcmlhYmxlIHRlcm1zIGFyZSBhcyBpZiB3ZSdyZSBpbiBcImd0clwiIG1vZGUuXG4gIC8vIGJ1dCBub3RlIHRoYXQgZXZlcnl0aGluZyBpcyBmbGlwcGVkIGZvciB0aGUgXCJsdHJcIiBmdW5jdGlvbi5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlLnNldC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjb21wYXJhdG9ycyA9IHJhbmdlLnNldFtpXVxuXG4gICAgdmFyIGhpZ2ggPSBudWxsXG4gICAgdmFyIGxvdyA9IG51bGxcblxuICAgIGNvbXBhcmF0b3JzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgICAgIGlmIChjb21wYXJhdG9yLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgICAgIGNvbXBhcmF0b3IgPSBuZXcgQ29tcGFyYXRvcignPj0wLjAuMCcpXG4gICAgICB9XG4gICAgICBoaWdoID0gaGlnaCB8fCBjb21wYXJhdG9yXG4gICAgICBsb3cgPSBsb3cgfHwgY29tcGFyYXRvclxuICAgICAgaWYgKGd0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGhpZ2guc2VtdmVyLCBvcHRpb25zKSkge1xuICAgICAgICBoaWdoID0gY29tcGFyYXRvclxuICAgICAgfSBlbHNlIGlmIChsdGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBsb3cuc2VtdmVyLCBvcHRpb25zKSkge1xuICAgICAgICBsb3cgPSBjb21wYXJhdG9yXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIElmIHRoZSBlZGdlIHZlcnNpb24gY29tcGFyYXRvciBoYXMgYSBvcGVyYXRvciB0aGVuIG91ciB2ZXJzaW9uXG4gICAgLy8gaXNuJ3Qgb3V0c2lkZSBpdFxuICAgIGlmIChoaWdoLm9wZXJhdG9yID09PSBjb21wIHx8IGhpZ2gub3BlcmF0b3IgPT09IGVjb21wKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgbG93ZXN0IHZlcnNpb24gY29tcGFyYXRvciBoYXMgYW4gb3BlcmF0b3IgYW5kIG91ciB2ZXJzaW9uXG4gICAgLy8gaXMgbGVzcyB0aGFuIGl0IHRoZW4gaXQgaXNuJ3QgaGlnaGVyIHRoYW4gdGhlIHJhbmdlXG4gICAgaWYgKCghbG93Lm9wZXJhdG9yIHx8IGxvdy5vcGVyYXRvciA9PT0gY29tcCkgJiZcbiAgICAgICAgbHRlZm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSBpZiAobG93Lm9wZXJhdG9yID09PSBlY29tcCAmJiBsdGZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0cy5wcmVyZWxlYXNlID0gcHJlcmVsZWFzZVxuZnVuY3Rpb24gcHJlcmVsZWFzZSAodmVyc2lvbiwgb3B0aW9ucykge1xuICB2YXIgcGFyc2VkID0gcGFyc2UodmVyc2lvbiwgb3B0aW9ucylcbiAgcmV0dXJuIChwYXJzZWQgJiYgcGFyc2VkLnByZXJlbGVhc2UubGVuZ3RoKSA/IHBhcnNlZC5wcmVyZWxlYXNlIDogbnVsbFxufVxuXG5leHBvcnRzLmludGVyc2VjdHMgPSBpbnRlcnNlY3RzXG5mdW5jdGlvbiBpbnRlcnNlY3RzIChyMSwgcjIsIG9wdGlvbnMpIHtcbiAgcjEgPSBuZXcgUmFuZ2UocjEsIG9wdGlvbnMpXG4gIHIyID0gbmV3IFJhbmdlKHIyLCBvcHRpb25zKVxuICByZXR1cm4gcjEuaW50ZXJzZWN0cyhyMilcbn1cblxuZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2VcbmZ1bmN0aW9uIGNvZXJjZSAodmVyc2lvbikge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIHJldHVybiB2ZXJzaW9uXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHZhciBtYXRjaCA9IHZlcnNpb24ubWF0Y2gocmVbQ09FUkNFXSlcblxuICBpZiAobWF0Y2ggPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICByZXR1cm4gcGFyc2UobWF0Y2hbMV0gK1xuICAgICcuJyArIChtYXRjaFsyXSB8fCAnMCcpICtcbiAgICAnLicgKyAobWF0Y2hbM10gfHwgJzAnKSlcbn1cbiIsImltcG9ydCB7IGluamVjdGFibGUgfSBmcm9tICdpbnZlcnNpZnknXG5cbmltcG9ydCB7IElCdWlsZEFnZW50LCBJRXhlY1Jlc3VsdCB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzJ1xuaW1wb3J0IHsgSVJlcXVlc3RPcHRpb25zIH0gZnJvbSAndHlwZWQtcmVzdC1jbGllbnQvSW50ZXJmYWNlcydcblxuQGluamVjdGFibGUoKVxuY2xhc3MgQnVpbGRBZ2VudCBpbXBsZW1lbnRzIElCdWlsZEFnZW50IHtcbiAgICBwcm94eUNvbmZpZ3VyYXRpb24odXJsOiBzdHJpbmcpOiBJUmVxdWVzdE9wdGlvbnMge1xuICAgICAgICBjb25zb2xlLmxvZygncHJveHlDb25maWd1cmF0aW9uJylcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgICBwdWJsaWMgZ2V0IGFnZW50TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2V0QWdlbnROYW1lJylcbiAgICAgICAgcmV0dXJuICdNb2NrJ1xuICAgIH1cblxuICAgIHB1YmxpYyBmaW5kKHRvb2xOYW1lOiBzdHJpbmcsIHZlcnNpb25TcGVjOiBzdHJpbmcsIGFyY2g/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zb2xlLmxvZygnZmluZCcpXG4gICAgICAgIHJldHVybiAnZmluZCdcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FjaGVEaXIoXG4gICAgICAgIHNvdXJjZURpcjogc3RyaW5nLFxuICAgICAgICB0b29sOiBzdHJpbmcsXG4gICAgICAgIHZlcnNpb246IHN0cmluZyxcbiAgICAgICAgYXJjaD86IHN0cmluZ1xuICAgICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjYWNoZURpcicpXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2NhY2hlRGlyJylcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlVGVtcERpcigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zb2xlLmxvZygnY3JlYXRlVGVtcERpcicpXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2NyZWF0ZVRlbXBEaXInKVxuICAgIH1cblxuICAgIHB1YmxpYyBkZWJ1ZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RlYnVnJylcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RmFpbGVkKG1lc3NhZ2U6IHN0cmluZywgZG9uZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NldEZhaWxlZCcpXG4gICAgfVxuXG4gICAgcHVibGljIHNldFN1Y2NlZWRlZChtZXNzYWdlOiBzdHJpbmcsIGRvbmU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXRTdWNjZWVkZWQnKVxuICAgIH1cblxuICAgIHB1YmxpYyBleHBvcnRWYXJpYWJsZShuYW1lOiBzdHJpbmcsIHZhbDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdleHBvcnRWYXJpYWJsZScpXG4gICAgfVxuXG4gICAgcHVibGljIGdldFZhcmlhYmxlKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRWYXJpYWJsZScpXG4gICAgICAgIHJldHVybiAnZ2V0VmFyaWFibGUnXG4gICAgfVxuXG4gICAgcHVibGljIGFkZFBhdGgoaW5wdXRQYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZFBhdGgnKVxuICAgIH1cblxuICAgIHB1YmxpYyB3aGljaCh0b29sOiBzdHJpbmcsIGNoZWNrPzogYm9vbGVhbik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3aGljaCcpXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ3doaWNoJylcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlYyhleGVjOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdKTogUHJvbWlzZTxJRXhlY1Jlc3VsdD4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICAgIGNvZGU6IDAsXG4gICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgIHN0ZGVycjogJ3Jlc3VsdC5zdGRlcnInLFxuICAgICAgICAgICAgc3Rkb3V0OiAncmVzdWx0LnN0ZG91dCdcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U291cmNlRGlyKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRTb3VyY2VEaXInKVxuICAgICAgICByZXR1cm4gJ2dldFNvdXJjZURpcidcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0T3V0cHV0KG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnc2V0T3V0cHV0JylcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SW5wdXQoaW5wdXQ6IHN0cmluZywgcmVxdWlyZWQ/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dldElucHV0JylcbiAgICAgICAgcmV0dXJuICdnZXRJbnB1dCdcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGlzdElucHV0KGlucHV0OiBzdHJpbmcsIHJlcXVpcmVkPzogYm9vbGVhbik6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dldExpc3RJbnB1dCcpXG4gICAgICAgIHJldHVybiBbJ2dldElucHV0J11cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Qm9vbGVhbklucHV0KGlucHV0OiBzdHJpbmcsIHJlcXVpcmVkPzogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2V0Qm9vbGVhbklucHV0JylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcHVibGljIGlzVmFsaWRJbnB1dEZpbGUoaW5wdXQ6IHN0cmluZywgZmlsZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpc1ZhbGlkSW5wdXRGaWxlJylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcHVibGljIGZpbGVFeGlzdHMoZmlsZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmaWxlRXhpc3RzJylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcHVibGljIGRpcmVjdG9yeUV4aXN0cyhmaWxlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RpcmVjdG9yeUV4aXN0cycpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn1cblxuZXhwb3J0IHsgQnVpbGRBZ2VudCB9XG4iLCJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcydcbmltcG9ydCAqIGFzIG9zIGZyb20gJ29zJ1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0ICogYXMgaHR0cCBmcm9tICd0eXBlZC1yZXN0LWNsaWVudC9IdHRwQ2xpZW50J1xuXG5pbXBvcnQgeyBpbmplY3QsIGluamVjdGFibGUgfSBmcm9tICdpbnZlcnNpZnknXG5pbXBvcnQgeyBUWVBFUywgSUV4ZWNSZXN1bHQsIElCdWlsZEFnZW50IH0gZnJvbSAnLi9tb2RlbHMnXG5pbXBvcnQgeyBJVmVyc2lvbk1hbmFnZXIgfSBmcm9tICcuL3ZlcnNpb25NYW5hZ2VyJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElEb3RuZXRUb29sIHtcbiAgICBkaXNhYmxlVGVsZW1ldHJ5KCk6IHZvaWRcbiAgICB0b29sSW5zdGFsbChcbiAgICAgICAgdG9vbE5hbWU6IHN0cmluZyxcbiAgICAgICAgdmVyc2lvblNwZWM6IHN0cmluZyxcbiAgICAgICAgY2hlY2tMYXRlc3Q6IGJvb2xlYW4sXG4gICAgICAgIGluY2x1ZGVQcmU6IGJvb2xlYW5cbiAgICApOiBQcm9taXNlPHN0cmluZz5cbn1cblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvdG5ldFRvb2wgaW1wbGVtZW50cyBJRG90bmV0VG9vbCB7XG4gICAgcHJvdGVjdGVkIGJ1aWxkQWdlbnQ6IElCdWlsZEFnZW50XG4gICAgcHJvdGVjdGVkIHZlcnNpb25NYW5hZ2VyOiBJVmVyc2lvbk1hbmFnZXJcbiAgICBwcml2YXRlIGh0dHBDbGllbnQ6IGh0dHAuSHR0cENsaWVudFxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbnVnZXRSb290OiBzdHJpbmcgPVxuICAgICAgICAnaHR0cHM6Ly9hcGktdjJ2M3NlYXJjaC0wLm51Z2V0Lm9yZy8nXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQGluamVjdChUWVBFUy5JQnVpbGRBZ2VudCkgYnVpbGRBZ2VudDogSUJ1aWxkQWdlbnQsXG4gICAgICAgIEBpbmplY3QoVFlQRVMuSVZlcnNpb25NYW5hZ2VyKSB2ZXJzaW9uTWFuYWdlcjogSVZlcnNpb25NYW5hZ2VyXG4gICAgKSB7XG4gICAgICAgIHRoaXMuYnVpbGRBZ2VudCA9IGJ1aWxkQWdlbnRcbiAgICAgICAgdGhpcy52ZXJzaW9uTWFuYWdlciA9IHZlcnNpb25NYW5hZ2VyXG4gICAgICAgIHRoaXMuaHR0cENsaWVudCA9IG5ldyBodHRwLkh0dHBDbGllbnQoXG4gICAgICAgICAgICAnZG90bmV0JyxcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRoaXMuYnVpbGRBZ2VudC5wcm94eUNvbmZpZ3VyYXRpb24oRG90bmV0VG9vbC5udWdldFJvb3QpXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzYWJsZVRlbGVtZXRyeSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5idWlsZEFnZW50LmV4cG9ydFZhcmlhYmxlKCdET1RORVRfQ0xJX1RFTEVNRVRSWV9PUFRPVVQnLCAndHJ1ZScpXG4gICAgICAgIHRoaXMuYnVpbGRBZ2VudC5leHBvcnRWYXJpYWJsZSgnRE9UTkVUX05PTE9HTycsICd0cnVlJylcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlY3V0ZShjbWQ6IHN0cmluZywgYXJnczogc3RyaW5nW10pOiBQcm9taXNlPElFeGVjUmVzdWx0PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBDb21tYW5kOiAke2NtZH0gJHthcmdzLmpvaW4oJyAnKX1gKVxuICAgICAgICByZXR1cm4gdGhpcy5idWlsZEFnZW50LmV4ZWMoY21kLCBhcmdzKVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB0b29sSW5zdGFsbChcbiAgICAgICAgdG9vbE5hbWU6IHN0cmluZyxcbiAgICAgICAgdmVyc2lvblNwZWM6IHN0cmluZyxcbiAgICAgICAgY2hlY2tMYXRlc3Q6IGJvb2xlYW4sXG4gICAgICAgIGluY2x1ZGVQcmU6IGJvb2xlYW5cbiAgICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zb2xlLmxvZygnJylcbiAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJylcbiAgICAgICAgY29uc29sZS5sb2coYEluc3RhbGxpbmcgJHt0b29sTmFtZX0gdmVyc2lvbiBgICsgdmVyc2lvblNwZWMpXG4gICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpXG5cbiAgICAgICAgaWYgKHRoaXMudmVyc2lvbk1hbmFnZXIuaXNFeHBsaWNpdFZlcnNpb24odmVyc2lvblNwZWMpKSB7XG4gICAgICAgICAgICBjaGVja0xhdGVzdCA9IGZhbHNlIC8vIGNoZWNrIGxhdGVzdCBkb2Vzbid0IG1ha2Ugc2Vuc2Ugd2hlbiBleHBsaWNpdCB2ZXJzaW9uXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdG9vbFBhdGg6IHN0cmluZ1xuICAgICAgICBpZiAoIWNoZWNrTGF0ZXN0KSB7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gTGV0J3MgdHJ5IGFuZCByZXNvbHZlIHRoZSB2ZXJzaW9uIHNwZWMgbG9jYWxseSBmaXJzdFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIHRvb2xQYXRoID0gdGhpcy5idWlsZEFnZW50LmZpbmQodG9vbE5hbWUsIHZlcnNpb25TcGVjKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0b29sUGF0aCkge1xuICAgICAgICAgICAgbGV0IHZlcnNpb246IHN0cmluZ1xuICAgICAgICAgICAgaWYgKHRoaXMudmVyc2lvbk1hbmFnZXIuaXNFeHBsaWNpdFZlcnNpb24odmVyc2lvblNwZWMpKSB7XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBFeHBsaWNpdCB2ZXJzaW9uIHdhcyBzcGVjaWZpZWQuIE5vIG5lZWQgdG8gcXVlcnkgZm9yIGxpc3Qgb2YgdmVyc2lvbnMuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICB2ZXJzaW9uID0gdmVyc2lvblNwZWNcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBMZXQncyBxdWVyeSBhbmQgcmVzb2x2ZSB0aGUgbGF0ZXN0IHZlcnNpb24gZm9yIHRoZSB2ZXJzaW9uU3BlYy5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdmVyc2lvbiBpcyBhbiBleHBsaWNpdCB2ZXJzaW9uICgxLjEuMSBvciB2MS4xLjEpIHRoZW4gbm8gbmVlZCB0byBxdWVyeS5cbiAgICAgICAgICAgICAgICAvLyBJZiB5b3VyIHRvb2wgZG9lc24ndCBvZmZlciBhIG1lY2hhbmlzbSB0byBxdWVyeSxcbiAgICAgICAgICAgICAgICAvLyB0aGVuIGl0IGNhbiBvbmx5IHN1cHBvcnQgZXhhY3QgdmVyc2lvbiBpbnB1dHMuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICB2ZXJzaW9uID0gYXdhaXQgdGhpcy5xdWVyeUxhdGVzdE1hdGNoKFxuICAgICAgICAgICAgICAgICAgICB0b29sTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvblNwZWMsXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGVQcmVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgIGBVbmFibGUgdG8gZmluZCAke3Rvb2xOYW1lfSB2ZXJzaW9uICcke3ZlcnNpb25TcGVjfScuYFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0aGUgY2FjaGUgZm9yIHRoZSByZXNvbHZlZCB2ZXJzaW9uLlxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgdG9vbFBhdGggPSB0aGlzLmJ1aWxkQWdlbnQuZmluZCh0b29sTmFtZSwgdmVyc2lvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdG9vbFBhdGgpIHtcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIERvd25sb2FkLCBleHRyYWN0LCBjYWNoZVxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgdG9vbFBhdGggPSBhd2FpdCB0aGlzLmFjcXVpcmVUb29sKHRvb2xOYW1lLCB2ZXJzaW9uKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gUHJlcGVuZCB0aGUgdG9vbHMgcGF0aC4gVGhpcyBwcmVwZW5kcyB0aGUgUEFUSCBmb3IgdGhlIGN1cnJlbnQgcHJvY2VzcyBhbmRcbiAgICAgICAgLy8gaW5zdHJ1Y3RzIHRoZSBhZ2VudCB0byBwcmVwZW5kIGZvciBlYWNoIHRhc2sgdGhhdCBmb2xsb3dzLlxuICAgICAgICAvL1xuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZGVidWcoYHRvb2xQYXRoOiAke3Rvb2xQYXRofWApXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgb3MucGxhdGZvcm0oKSAhPT0gJ3dpbjMyJyAmJlxuICAgICAgICAgICAgIXRoaXMuYnVpbGRBZ2VudC5nZXRWYXJpYWJsZSgnRE9UTkVUX1JPT1QnKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGxldCBkb3RuZXRQYXRoID0gYXdhaXQgdGhpcy5idWlsZEFnZW50LndoaWNoKCdkb3RuZXQnKVxuICAgICAgICAgICAgZG90bmV0UGF0aCA9IGZzLnJlYWRsaW5rU3luYyhkb3RuZXRQYXRoKSB8fCBkb3RuZXRQYXRoXG4gICAgICAgICAgICBjb25zdCBkb3RuZXRSb290ID0gcGF0aC5kaXJuYW1lKGRvdG5ldFBhdGgpXG4gICAgICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZXhwb3J0VmFyaWFibGUoJ0RPVE5FVF9ST09UJywgZG90bmV0Um9vdClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuYWRkUGF0aCh0b29sUGF0aClcblxuICAgICAgICByZXR1cm4gdG9vbFBhdGhcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHF1ZXJ5TGF0ZXN0TWF0Y2goXG4gICAgICAgIHRvb2xOYW1lOiBzdHJpbmcsXG4gICAgICAgIHZlcnNpb25TcGVjOiBzdHJpbmcsXG4gICAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBib29sZWFuXG4gICAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgdGhpcy5idWlsZEFnZW50LmRlYnVnKFxuICAgICAgICAgICAgYHF1ZXJ5aW5nIHRvb2wgdmVyc2lvbnMgZm9yICR7dG9vbE5hbWV9JHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uU3BlYyA/IGBAJHt2ZXJzaW9uU3BlY31gIDogJydcbiAgICAgICAgICAgIH0gJHtpbmNsdWRlUHJlcmVsZWFzZSA/ICdpbmNsdWRpbmcgcHJlLXJlbGVhc2VzJyA6ICcnfWBcbiAgICAgICAgKVxuXG4gICAgICAgIGNvbnN0IGRvd25sb2FkUGF0aCA9IGAke1xuICAgICAgICAgICAgRG90bmV0VG9vbC5udWdldFJvb3RcbiAgICAgICAgfXF1ZXJ5P3E9JHtlbmNvZGVVUklDb21wb25lbnQodG9vbE5hbWUudG9Mb3dlckNhc2UoKSl9JnByZXJlbGVhc2U9JHtcbiAgICAgICAgICAgIGluY2x1ZGVQcmVyZWxlYXNlID8gJ3RydWUnIDogJ2ZhbHNlJ1xuICAgICAgICB9JnNlbVZlckxldmVsPTIuMC4wYFxuXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuaHR0cENsaWVudC5nZXQoZG93bmxvYWRQYXRoKVxuXG4gICAgICAgIGlmICghcmVzIHx8IHJlcy5tZXNzYWdlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJvZHk6IHN0cmluZyA9IGF3YWl0IHJlcy5yZWFkQm9keSgpXG4gICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGJvZHkpLmRhdGFcblxuICAgICAgICBjb25zdCB2ZXJzaW9ucyA9IChkYXRhWzBdLnZlcnNpb25zIGFzIHsgdmVyc2lvbjogc3RyaW5nIH1bXSkubWFwKFxuICAgICAgICAgICAgeCA9PiB4LnZlcnNpb25cbiAgICAgICAgKVxuICAgICAgICBpZiAoIXZlcnNpb25zIHx8ICF2ZXJzaW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZGVidWcoYGdvdCB2ZXJzaW9uczogJHt2ZXJzaW9ucy5qb2luKCcsICcpfWApXG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmVyc2lvbk1hbmFnZXIuZXZhbHVhdGVWZXJzaW9ucyh2ZXJzaW9ucywgdmVyc2lvblNwZWMpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBhY3F1aXJlVG9vbChcbiAgICAgICAgdG9vbE5hbWU6IHN0cmluZyxcbiAgICAgICAgdmVyc2lvbjogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgdGVtcERpcmVjdG9yeSA9IGF3YWl0IHRoaXMuYnVpbGRBZ2VudC5jcmVhdGVUZW1wRGlyKClcbiAgICAgICAgbGV0IGFyZ3MgPSBbJ3Rvb2wnLCAnaW5zdGFsbCcsIHRvb2xOYW1lLCAnLS10b29sLXBhdGgnLCB0ZW1wRGlyZWN0b3J5XVxuXG4gICAgICAgIGlmICh2ZXJzaW9uKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gdGhpcy52ZXJzaW9uTWFuYWdlci5jbGVhblZlcnNpb24odmVyc2lvbilcbiAgICAgICAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdChbJy0tdmVyc2lvbicsIHZlcnNpb25dKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5leGVjdXRlKCdkb3RuZXQnLCBhcmdzKVxuICAgICAgICBjb25zdCBzdGF0dXMgPSByZXN1bHQuY29kZSA9PT0gMCA/ICdzdWNjZXNzJyA6ICdmYWlsdXJlJ1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gcmVzdWx0LmNvZGUgPT09IDAgPyByZXN1bHQuc3Rkb3V0IDogcmVzdWx0LnN0ZGVyclxuXG4gICAgICAgIHRoaXMuYnVpbGRBZ2VudC5kZWJ1ZyhgdG9vbCBpbnN0YWxsIHJlc3VsdDogJHtzdGF0dXN9ICR7bWVzc2FnZX1gKVxuXG4gICAgICAgIGlmIChyZXN1bHQuY29kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBpbnN0YWxsaW5nIHRvb2wnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYnVpbGRBZ2VudC5jYWNoZURpcih0ZW1wRGlyZWN0b3J5LCB0b29sTmFtZSwgdmVyc2lvbilcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICdpbnZlcnNpZnknXG5pbXBvcnQgeyBJVmVyc2lvbk1hbmFnZXIsIFZlcnNpb25NYW5hZ2VyIH0gZnJvbSAnLi92ZXJzaW9uTWFuYWdlcidcbmltcG9ydCB7IFRZUEVTLCBJQnVpbGRBZ2VudCB9IGZyb20gJy4vbW9kZWxzJ1xuaW1wb3J0IHsgQnVpbGRBZ2VudCB9IGZyb20gJy4uL2FnZW50L21vY2svYnVpbGQtYWdlbnQnXG5cbmNvbnN0IGNvbnRhaW5lciA9IG5ldyBDb250YWluZXIoKVxuXG5jb250YWluZXIuYmluZDxJVmVyc2lvbk1hbmFnZXI+KFRZUEVTLklWZXJzaW9uTWFuYWdlcikudG8oVmVyc2lvbk1hbmFnZXIpXG5jb250YWluZXIuYmluZDxJQnVpbGRBZ2VudD4oVFlQRVMuSUJ1aWxkQWdlbnQpLnRvKEJ1aWxkQWdlbnQpXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRhaW5lclxuIiwiaW1wb3J0IHsgSVJlcXVlc3RPcHRpb25zIH0gZnJvbSAndHlwZWQtcmVzdC1jbGllbnQvSW50ZXJmYWNlcydcblxuZXhwb3J0IGNvbnN0IFRZUEVTID0ge1xuICAgIElCdWlsZEFnZW50OiBTeW1ib2wuZm9yKCdCdWlsZEFnZW50JyksXG4gICAgSURvdG5ldFRvb2w6IFN5bWJvbC5mb3IoJ0RvdG5ldFRvb2wnKSxcbiAgICBJR2l0VmVyc2lvblRvb2w6IFN5bWJvbC5mb3IoJ0dpdFZlcnNpb25Ub29sJyksXG4gICAgSUdpdFJlbGVhc2VNYW5hZ2VyVG9vbDogU3ltYm9sLmZvcignR2l0UmVsZWFzZU1hbmFnZXJUb29sJyksXG4gICAgSVZlcnNpb25NYW5hZ2VyOiBTeW1ib2wuZm9yKCdWZXJzaW9uTWFuYWdlcicpXG59XG5cbmV4cG9ydCBlbnVtIFNldHVwRmllbGRzIHtcbiAgICBpbmNsdWRlUHJlcmVsZWFzZSA9ICdpbmNsdWRlUHJlcmVsZWFzZScsXG4gICAgdmVyc2lvblNwZWMgPSAndmVyc2lvblNwZWMnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNldHVwU2V0dGluZ3Mge1xuICAgIFtTZXR1cEZpZWxkcy52ZXJzaW9uU3BlY106IHN0cmluZ1xuICAgIFtTZXR1cEZpZWxkcy5pbmNsdWRlUHJlcmVsZWFzZV06IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRXhlY1Jlc3VsdCB7XG4gICAgc3Rkb3V0OiBzdHJpbmdcbiAgICBzdGRlcnI6IHN0cmluZ1xuICAgIGNvZGU6IG51bWJlclxuICAgIGVycm9yOiBFcnJvclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElCdWlsZEFnZW50IHtcbiAgICBhZ2VudE5hbWU6IHN0cmluZ1xuICAgIHByb3h5Q29uZmlndXJhdGlvbih1cmw6IHN0cmluZyk6IElSZXF1ZXN0T3B0aW9uc1xuICAgIGZpbmQodG9vbE5hbWU6IHN0cmluZywgdmVyc2lvblNwZWM6IHN0cmluZywgYXJjaD86IHN0cmluZyk6IHN0cmluZ1xuICAgIGNhY2hlRGlyKFxuICAgICAgICBzb3VyY2VEaXI6IHN0cmluZyxcbiAgICAgICAgdG9vbDogc3RyaW5nLFxuICAgICAgICB2ZXJzaW9uOiBzdHJpbmcsXG4gICAgICAgIGFyY2g/OiBzdHJpbmdcbiAgICApOiBQcm9taXNlPHN0cmluZz5cbiAgICBjcmVhdGVUZW1wRGlyKCk6IFByb21pc2U8c3RyaW5nPlxuICAgIGRlYnVnKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWRcbiAgICBzZXRGYWlsZWQobWVzc2FnZTogc3RyaW5nLCBkb25lPzogYm9vbGVhbik6IHZvaWRcbiAgICBzZXRTdWNjZWVkZWQobWVzc2FnZTogc3RyaW5nLCBkb25lPzogYm9vbGVhbik6IHZvaWRcbiAgICBleHBvcnRWYXJpYWJsZShuYW1lOiBzdHJpbmcsIHZhbDogc3RyaW5nKTogdm9pZFxuICAgIGdldFZhcmlhYmxlKG5hbWU6IHN0cmluZyk6IHN0cmluZ1xuICAgIGFkZFBhdGgoaW5wdXRQYXRoOiBzdHJpbmcpOiB2b2lkXG4gICAgd2hpY2godG9vbDogc3RyaW5nLCBjaGVjaz86IGJvb2xlYW4pOiBQcm9taXNlPHN0cmluZz5cbiAgICBleGVjKGV4ZWM6IHN0cmluZywgYXJnczogc3RyaW5nW10pOiBQcm9taXNlPElFeGVjUmVzdWx0PlxuXG4gICAgZ2V0U291cmNlRGlyKCk6IHN0cmluZ1xuICAgIGlzVmFsaWRJbnB1dEZpbGUoaW5wdXQ6IHN0cmluZywgZmlsZTogc3RyaW5nKTogYm9vbGVhblxuICAgIGZpbGVFeGlzdHMoZmlsZTogc3RyaW5nKTogYm9vbGVhblxuICAgIGRpcmVjdG9yeUV4aXN0cyhmaWxlOiBzdHJpbmcpOiBib29sZWFuXG5cbiAgICBzZXRPdXRwdXQobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZFxuICAgIGdldElucHV0KGlucHV0OiBzdHJpbmcsIHJlcXVpcmVkPzogYm9vbGVhbik6IHN0cmluZ1xuICAgIGdldExpc3RJbnB1dChpbnB1dDogc3RyaW5nLCByZXF1aXJlZD86IGJvb2xlYW4pOiBzdHJpbmdbXVxuICAgIGdldEJvb2xlYW5JbnB1dChpbnB1dDogc3RyaW5nLCByZXF1aXJlZD86IGJvb2xlYW4pOiBib29sZWFuXG59XG4iLCJpbXBvcnQgeyBJQnVpbGRBZ2VudCwgU2V0dXBGaWVsZHMsIElTZXR1cFNldHRpbmdzIH0gZnJvbSAnLi9tb2RlbHMnXG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XG4gICAgcHVibGljIHN0YXRpYyBnZXRTZXR1cFNldHRpbmdzKGJ1aWxkQWdlbnQ6IElCdWlsZEFnZW50KTogSVNldHVwU2V0dGluZ3Mge1xuICAgICAgICBjb25zdCB2ZXJzaW9uU3BlYyA9IGJ1aWxkQWdlbnQuZ2V0SW5wdXQoU2V0dXBGaWVsZHMudmVyc2lvblNwZWMpXG4gICAgICAgIGNvbnN0IGluY2x1ZGVQcmVyZWxlYXNlID0gYnVpbGRBZ2VudC5nZXRCb29sZWFuSW5wdXQoXG4gICAgICAgICAgICBTZXR1cEZpZWxkcy5pbmNsdWRlUHJlcmVsZWFzZVxuICAgICAgICApXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZlcnNpb25TcGVjLFxuICAgICAgICAgICAgaW5jbHVkZVByZXJlbGVhc2VcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBjbXAgZnJvbSAnc2VtdmVyLWNvbXBhcmUnXG5pbXBvcnQgKiBhcyBzZW12ZXIgZnJvbSAnc2VtdmVyJ1xuaW1wb3J0IHsgaW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnaW52ZXJzaWZ5J1xuXG5pbXBvcnQgeyBJQnVpbGRBZ2VudCwgVFlQRVMgfSBmcm9tICcuL21vZGVscydcblxuZXhwb3J0IGludGVyZmFjZSBJVmVyc2lvbk1hbmFnZXIge1xuICAgIGlzRXhwbGljaXRWZXJzaW9uKHZlcnNpb25TcGVjOiBzdHJpbmcpOiBib29sZWFuXG4gICAgZXZhbHVhdGVWZXJzaW9ucyh2ZXJzaW9uczogc3RyaW5nW10sIHZlcnNpb25TcGVjOiBzdHJpbmcpOiBzdHJpbmdcbiAgICBjbGVhblZlcnNpb24odmVyc2lvbjogc3RyaW5nKTogc3RyaW5nXG59XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWZXJzaW9uTWFuYWdlciBpbXBsZW1lbnRzIElWZXJzaW9uTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBidWlsZEFnZW50OiBJQnVpbGRBZ2VudFxuICAgIGNvbnN0cnVjdG9yKEBpbmplY3QoVFlQRVMuSUJ1aWxkQWdlbnQpIGJ1aWxkQWdlbnQ6IElCdWlsZEFnZW50KSB7XG4gICAgICAgIHRoaXMuYnVpbGRBZ2VudCA9IGJ1aWxkQWdlbnRcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNFeHBsaWNpdFZlcnNpb24odmVyc2lvblNwZWM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBjID0gc2VtdmVyLmNsZWFuKHZlcnNpb25TcGVjKVxuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZGVidWcoJ2lzRXhwbGljaXQ6ICcgKyBjKVxuXG4gICAgICAgIGNvbnN0IHZhbGlkID0gc2VtdmVyLnZhbGlkKGMpICE9IG51bGxcbiAgICAgICAgdGhpcy5idWlsZEFnZW50LmRlYnVnKCdleHBsaWNpdD8gJyArIHZhbGlkKVxuXG4gICAgICAgIHJldHVybiB2YWxpZFxuICAgIH1cblxuICAgIHB1YmxpYyBldmFsdWF0ZVZlcnNpb25zKHZlcnNpb25zOiBzdHJpbmdbXSwgdmVyc2lvblNwZWM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCB2ZXJzaW9uOiBzdHJpbmdcbiAgICAgICAgdGhpcy5idWlsZEFnZW50LmRlYnVnKCdldmFsdWF0aW5nICcgKyB2ZXJzaW9ucy5sZW5ndGggKyAnIHZlcnNpb25zJylcbiAgICAgICAgdmVyc2lvbnMgPSB2ZXJzaW9ucy5zb3J0KGNtcClcbiAgICAgICAgZm9yIChsZXQgaSA9IHZlcnNpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBwb3RlbnRpYWw6IHN0cmluZyA9IHZlcnNpb25zW2ldXG4gICAgICAgICAgICBjb25zdCBzYXRpc2ZpZWQ6IGJvb2xlYW4gPSBzZW12ZXIuc2F0aXNmaWVzKHBvdGVudGlhbCwgdmVyc2lvblNwZWMpXG4gICAgICAgICAgICBpZiAoc2F0aXNmaWVkKSB7XG4gICAgICAgICAgICAgICAgdmVyc2lvbiA9IHBvdGVudGlhbFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmVyc2lvbikge1xuICAgICAgICAgICAgdGhpcy5idWlsZEFnZW50LmRlYnVnKCdtYXRjaGVkOiAnICsgdmVyc2lvbilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRBZ2VudC5kZWJ1ZygnbWF0Y2ggbm90IGZvdW5kJylcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2ZXJzaW9uXG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFuVmVyc2lvbih2ZXJzaW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZGVidWcoJ2NsZWFuaW5nOiAnICsgdmVyc2lvbilcbiAgICAgICAgcmV0dXJuIHNlbXZlci5jbGVhbih2ZXJzaW9uKVxuICAgIH1cbn1cbiIsImltcG9ydCB7IElCdWlsZEFnZW50LCBUWVBFUyB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzJ1xuaW1wb3J0IHsgU2V0dGluZ3MgYXMgQ29tbW9uU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9jb3JlL3NldHRpbmdzJ1xuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tICcuLi8uLi90b29scy9naXR2ZXJzaW9uL3NldHRpbmdzJ1xuaW1wb3J0IHsgSUdpdFZlcnNpb25Ub29sLCBHaXRWZXJzaW9uVG9vbCB9IGZyb20gJy4uLy4uL3Rvb2xzL2dpdHZlcnNpb24vdG9vbCdcbmltcG9ydCB7XG4gICAgR2l0VmVyc2lvblNldHRpbmdzLFxuICAgIEdpdFZlcnNpb25PdXRwdXRcbn0gZnJvbSAnLi4vLi4vdG9vbHMvZ2l0dmVyc2lvbi9tb2RlbHMnXG5cbmltcG9ydCBjb250YWluZXIgZnJvbSAnLi4vLi4vY29yZS9pb2MnXG5cbmNvbnRhaW5lci5iaW5kPElHaXRWZXJzaW9uVG9vbD4oVFlQRVMuSUdpdFZlcnNpb25Ub29sKS50byhHaXRWZXJzaW9uVG9vbClcblxuY29uc3QgZ2l0VmVyc2lvblRvb2wgPSBjb250YWluZXIuZ2V0PElHaXRWZXJzaW9uVG9vbD4oVFlQRVMuSUdpdFZlcnNpb25Ub29sKVxuY29uc3QgYnVpbGRBZ2VudCA9IGNvbnRhaW5lci5nZXQ8SUJ1aWxkQWdlbnQ+KFRZUEVTLklCdWlsZEFnZW50KVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgZ2l0VmVyc2lvblRvb2wuZGlzYWJsZVRlbGVtZXRyeSgpXG5cbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBDb21tb25TZXR0aW5ncy5nZXRTZXR1cFNldHRpbmdzKGJ1aWxkQWdlbnQpXG5cbiAgICAgICAgYXdhaXQgZ2l0VmVyc2lvblRvb2wuaW5zdGFsbChcbiAgICAgICAgICAgIHNldHRpbmdzLnZlcnNpb25TcGVjLFxuICAgICAgICAgICAgc2V0dGluZ3MuaW5jbHVkZVByZXJlbGVhc2VcbiAgICAgICAgKVxuXG4gICAgICAgIGJ1aWxkQWdlbnQuc2V0U3VjY2VlZGVkKCdHaXRWZXJzaW9uIGluc3RhbGxlZCBzdWNjZXNzZnVsbHknLCB0cnVlKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGJ1aWxkQWdlbnQuc2V0RmFpbGVkKGVycm9yLm1lc3NhZ2UsIHRydWUpXG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcnVuKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGdpdFZlcnNpb25Ub29sLmRpc2FibGVUZWxlbWV0cnkoKVxuXG4gICAgICAgIGNvbnN0IHNldHRpbmdzOiBHaXRWZXJzaW9uU2V0dGluZ3MgPSBTZXR0aW5ncy5nZXRHaXRWZXJzaW9uU2V0dGluZ3MoXG4gICAgICAgICAgICBidWlsZEFnZW50XG4gICAgICAgIClcblxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBnaXRWZXJzaW9uVG9vbC5ydW4oc2V0dGluZ3MpXG4gICAgICAgIGNvbnN0IHsgc3Rkb3V0IH0gPSByZXN1bHRcbiAgICAgICAgY29uc3QganNvbk91dHB1dCA9IHN0ZG91dC5zdWJzdHJpbmcoXG4gICAgICAgICAgICBzdGRvdXQuaW5kZXhPZigneycpLFxuICAgICAgICAgICAgc3Rkb3V0LmluZGV4T2YoJ30nKSArIDFcbiAgICAgICAgKVxuXG4gICAgICAgIGNvbnN0IGdpdHZlcnNpb24gPSBKU09OLnBhcnNlKGpzb25PdXRwdXQpIGFzIEdpdFZlcnNpb25PdXRwdXRcbiAgICAgICAgZ2l0VmVyc2lvblRvb2wud3JpdGVHaXRWZXJzaW9uVG9BZ2VudChnaXR2ZXJzaW9uKVxuXG4gICAgICAgIGlmIChyZXN1bHQuY29kZSA9PT0gMCkge1xuICAgICAgICAgICAgYnVpbGRBZ2VudC5zZXRTdWNjZWVkZWQoJ0dpdFZlcnNpb24gZXhlY3V0ZWQgc3VjY2Vzc2Z1bGx5JywgdHJ1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1aWxkQWdlbnQuc2V0RmFpbGVkKHJlc3VsdC5lcnJvci5tZXNzYWdlLCB0cnVlKVxuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgYnVpbGRBZ2VudC5zZXRGYWlsZWQoZXJyb3IsIHRydWUpXG4gICAgfVxufVxuIiwiaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJ1xuaW1wb3J0IHsgc2V0dXAgfSBmcm9tICcuL21haW4nXG5cbnNldHVwKClcbiIsImV4cG9ydCBlbnVtIEV4ZWN1dGVGaWVsZHMge1xuICAgIHRhcmdldFBhdGggPSAndGFyZ2V0UGF0aCcsXG4gICAgdXNlQ29uZmlnRmlsZSA9ICd1c2VDb25maWdGaWxlJyxcbiAgICBjb25maWdGaWxlUGF0aCA9ICdjb25maWdGaWxlUGF0aCcsXG4gICAgdXBkYXRlQXNzZW1ibHlJbmZvID0gJ3VwZGF0ZUFzc2VtYmx5SW5mbycsXG4gICAgdXBkYXRlQXNzZW1ibHlJbmZvRmlsZW5hbWUgPSAndXBkYXRlQXNzZW1ibHlJbmZvRmlsZW5hbWUnLFxuICAgIGFkZGl0aW9uYWxBcmd1bWVudHMgPSAnYWRkaXRpb25hbEFyZ3VtZW50cycsXG4gICAgc3JjRGlyID0gJ3NyY0Rpcidcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHaXRWZXJzaW9uU2V0dGluZ3Mge1xuICAgIFtFeGVjdXRlRmllbGRzLnRhcmdldFBhdGhdOiBzdHJpbmdcbiAgICBbRXhlY3V0ZUZpZWxkcy51c2VDb25maWdGaWxlXTogYm9vbGVhblxuICAgIFtFeGVjdXRlRmllbGRzLmNvbmZpZ0ZpbGVQYXRoXTogc3RyaW5nXG4gICAgW0V4ZWN1dGVGaWVsZHMudXBkYXRlQXNzZW1ibHlJbmZvXTogYm9vbGVhblxuICAgIFtFeGVjdXRlRmllbGRzLnVwZGF0ZUFzc2VtYmx5SW5mb0ZpbGVuYW1lXTogc3RyaW5nXG4gICAgW0V4ZWN1dGVGaWVsZHMuYWRkaXRpb25hbEFyZ3VtZW50c106IHN0cmluZ1xuICAgIFtFeGVjdXRlRmllbGRzLnNyY0Rpcl06IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdpdFZlcnNpb25PdXRwdXQge1xuICAgIE1ham9yOiBudW1iZXJcbiAgICBNaW5vcjogbnVtYmVyXG4gICAgUGF0Y2g6IG51bWJlclxuICAgIFByZVJlbGVhc2VUYWc6IHN0cmluZ1xuICAgIFByZVJlbGVhc2VUYWdXaXRoRGFzaDogc3RyaW5nXG4gICAgUHJlUmVsZWFzZUxhYmVsOiBzdHJpbmdcbiAgICBQcmVSZWxlYXNlTnVtYmVyOiBudW1iZXJcbiAgICBXZWlnaHRlZFByZVJlbGVhc2VOdW1iZXI6IG51bWJlclxuICAgIEJ1aWxkTWV0YURhdGE6IG51bWJlclxuICAgIEJ1aWxkTWV0YURhdGFQYWRkZWQ6IHN0cmluZ1xuICAgIEZ1bGxCdWlsZE1ldGFEYXRhOiBzdHJpbmdcbiAgICBNYWpvck1pbm9yUGF0Y2g6IHN0cmluZ1xuICAgIFNlbVZlcjogc3RyaW5nXG4gICAgTGVnYWN5U2VtVmVyOiBzdHJpbmdcbiAgICBMZWdhY3lTZW1WZXJQYWRkZWQ6IHN0cmluZ1xuICAgIEFzc2VtYmx5U2VtVmVyOiBzdHJpbmdcbiAgICBBc3NlbWJseVNlbUZpbGVWZXI6IHN0cmluZ1xuICAgIEZ1bGxTZW1WZXI6IHN0cmluZ1xuICAgIEluZm9ybWF0aW9uYWxWZXJzaW9uOiBzdHJpbmdcbiAgICBCcmFuY2hOYW1lOiBzdHJpbmdcbiAgICBFc2NhcGVkQnJhbmNoTmFtZTogc3RyaW5nXG4gICAgU2hhOiBzdHJpbmdcbiAgICBTaG9ydFNoYTogc3RyaW5nXG4gICAgTnVHZXRWZXJzaW9uVjI6IHN0cmluZ1xuICAgIE51R2V0VmVyc2lvbjogc3RyaW5nXG4gICAgTnVHZXRQcmVSZWxlYXNlVGFnVjI6IHN0cmluZ1xuICAgIE51R2V0UHJlUmVsZWFzZVRhZzogc3RyaW5nXG4gICAgVmVyc2lvblNvdXJjZVNoYTogc3RyaW5nXG4gICAgQ29tbWl0c1NpbmNlVmVyc2lvblNvdXJjZTogbnVtYmVyXG4gICAgQ29tbWl0c1NpbmNlVmVyc2lvblNvdXJjZVBhZGRlZDogc3RyaW5nXG4gICAgVW5jb21taXR0ZWRDaGFuZ2VzOiBudW1iZXJcbiAgICBDb21taXREYXRlOiBzdHJpbmdcbn1cbiIsImltcG9ydCB7IElCdWlsZEFnZW50IH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMnXG5cbmltcG9ydCB7IEdpdFZlcnNpb25TZXR0aW5ncywgRXhlY3V0ZUZpZWxkcyB9IGZyb20gJy4vbW9kZWxzJ1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3Mge1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0R2l0VmVyc2lvblNldHRpbmdzKFxuICAgICAgICBidWlsZEFnZW50OiBJQnVpbGRBZ2VudFxuICAgICk6IEdpdFZlcnNpb25TZXR0aW5ncyB7XG4gICAgICAgIGNvbnN0IHRhcmdldFBhdGggPSBidWlsZEFnZW50LmdldElucHV0KEV4ZWN1dGVGaWVsZHMudGFyZ2V0UGF0aClcblxuICAgICAgICBjb25zdCB1c2VDb25maWdGaWxlID0gYnVpbGRBZ2VudC5nZXRCb29sZWFuSW5wdXQoXG4gICAgICAgICAgICBFeGVjdXRlRmllbGRzLnVzZUNvbmZpZ0ZpbGVcbiAgICAgICAgKVxuICAgICAgICBjb25zdCBjb25maWdGaWxlUGF0aCA9IGJ1aWxkQWdlbnQuZ2V0SW5wdXQoRXhlY3V0ZUZpZWxkcy5jb25maWdGaWxlUGF0aClcblxuICAgICAgICBjb25zdCB1cGRhdGVBc3NlbWJseUluZm8gPSBidWlsZEFnZW50LmdldEJvb2xlYW5JbnB1dChcbiAgICAgICAgICAgIEV4ZWN1dGVGaWVsZHMudXBkYXRlQXNzZW1ibHlJbmZvXG4gICAgICAgIClcbiAgICAgICAgY29uc3QgdXBkYXRlQXNzZW1ibHlJbmZvRmlsZW5hbWUgPSBidWlsZEFnZW50LmdldElucHV0KFxuICAgICAgICAgICAgRXhlY3V0ZUZpZWxkcy51cGRhdGVBc3NlbWJseUluZm9GaWxlbmFtZVxuICAgICAgICApXG5cbiAgICAgICAgY29uc3QgYWRkaXRpb25hbEFyZ3VtZW50cyA9IGJ1aWxkQWdlbnQuZ2V0SW5wdXQoXG4gICAgICAgICAgICBFeGVjdXRlRmllbGRzLmFkZGl0aW9uYWxBcmd1bWVudHNcbiAgICAgICAgKVxuXG4gICAgICAgIGNvbnN0IHNyY0RpciA9IGJ1aWxkQWdlbnQuZ2V0U291cmNlRGlyKCk/LnJlcGxhY2UoL1xcXFwvZywgJy8nKVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0YXJnZXRQYXRoLFxuICAgICAgICAgICAgdXNlQ29uZmlnRmlsZSxcbiAgICAgICAgICAgIGNvbmZpZ0ZpbGVQYXRoLFxuICAgICAgICAgICAgdXBkYXRlQXNzZW1ibHlJbmZvLFxuICAgICAgICAgICAgdXBkYXRlQXNzZW1ibHlJbmZvRmlsZW5hbWUsXG4gICAgICAgICAgICBhZGRpdGlvbmFsQXJndW1lbnRzLFxuICAgICAgICAgICAgc3JjRGlyXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxyXG5cclxuaW1wb3J0IHsgaW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnaW52ZXJzaWZ5J1xyXG5pbXBvcnQgeyBJRXhlY1Jlc3VsdCwgSUJ1aWxkQWdlbnQsIFRZUEVTIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMnXHJcbmltcG9ydCB7IERvdG5ldFRvb2wsIElEb3RuZXRUb29sIH0gZnJvbSAnLi4vLi4vY29yZS9kb3RuZXQtdG9vbCdcclxuaW1wb3J0IHsgR2l0VmVyc2lvblNldHRpbmdzLCBHaXRWZXJzaW9uT3V0cHV0IH0gZnJvbSAnLi9tb2RlbHMnXHJcbmltcG9ydCB7IElWZXJzaW9uTWFuYWdlciB9IGZyb20gJy4uLy4uL2NvcmUvdmVyc2lvbk1hbmFnZXInXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElHaXRWZXJzaW9uVG9vbCBleHRlbmRzIElEb3RuZXRUb29sIHtcclxuICAgIGluc3RhbGwodmVyc2lvblNwZWM6IHN0cmluZywgaW5jbHVkZVByZXJlbGVhc2U6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+XHJcbiAgICBydW4ob3B0aW9uczogR2l0VmVyc2lvblNldHRpbmdzKTogUHJvbWlzZTxJRXhlY1Jlc3VsdD5cclxuICAgIHdyaXRlR2l0VmVyc2lvblRvQWdlbnQoZ2l0dmVyc2lvbjogR2l0VmVyc2lvbk91dHB1dCk6IHZvaWRcclxufVxyXG5cclxuQGluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2l0VmVyc2lvblRvb2wgZXh0ZW5kcyBEb3RuZXRUb29sIGltcGxlbWVudHMgSUdpdFZlcnNpb25Ub29sIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIEBpbmplY3QoVFlQRVMuSUJ1aWxkQWdlbnQpIGJ1aWxkQWdlbnQ6IElCdWlsZEFnZW50LFxyXG4gICAgICAgIEBpbmplY3QoVFlQRVMuSVZlcnNpb25NYW5hZ2VyKSB2ZXJzaW9uTWFuYWdlcjogSVZlcnNpb25NYW5hZ2VyXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihidWlsZEFnZW50LCB2ZXJzaW9uTWFuYWdlcilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgaW5zdGFsbChcclxuICAgICAgICB2ZXJzaW9uU3BlYzogc3RyaW5nLFxyXG4gICAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBib29sZWFuXHJcbiAgICApOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLnRvb2xJbnN0YWxsKFxyXG4gICAgICAgICAgICAnR2l0VmVyc2lvbi5Ub29sJyxcclxuICAgICAgICAgICAgdmVyc2lvblNwZWMsXHJcbiAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICBpbmNsdWRlUHJlcmVsZWFzZVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuKG9wdGlvbnM6IEdpdFZlcnNpb25TZXR0aW5ncyk6IFByb21pc2U8SUV4ZWNSZXN1bHQ+IHtcclxuICAgICAgICBjb25zdCB3b3JrRGlyID0gdGhpcy5nZXRSZXBvRGlyKG9wdGlvbnMudGFyZ2V0UGF0aClcclxuXHJcbiAgICAgICAgY29uc3QgYXJncyA9IHRoaXMuZ2V0QXJndW1lbnRzKHdvcmtEaXIsIG9wdGlvbnMpXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUoJ2RvdG5ldC1naXR2ZXJzaW9uJywgYXJncylcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJlcG9EaXIodGFyZ2V0UGF0aDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgd29ya0Rpcjogc3RyaW5nXHJcbiAgICAgICAgY29uc3Qgc3JjRGlyID0gdGhpcy5idWlsZEFnZW50LmdldFNvdXJjZURpcigpIHx8ICcuJ1xyXG4gICAgICAgIGlmICghdGFyZ2V0UGF0aCkge1xyXG4gICAgICAgICAgICB3b3JrRGlyID0gc3JjRGlyXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYnVpbGRBZ2VudC5kaXJlY3RvcnlFeGlzdHModGFyZ2V0UGF0aCkpIHtcclxuICAgICAgICAgICAgICAgIHdvcmtEaXIgPSB0YXJnZXRQYXRoXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RpcmVjdG9yeSBub3QgZm91bmQgYXQgJyArIHRhcmdldFBhdGgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdvcmtEaXIucmVwbGFjZSgvXFxcXC9nLCAnLycpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBcmd1bWVudHMoXHJcbiAgICAgICAgd29ya0Rpcjogc3RyaW5nLFxyXG4gICAgICAgIG9wdGlvbnM6IEdpdFZlcnNpb25TZXR0aW5nc1xyXG4gICAgKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGxldCBhcmdzID0gW3dvcmtEaXIsICcvb3V0cHV0JywgJ2pzb24nLCAnL291dHB1dCcsICdidWlsZHNlcnZlciddXHJcblxyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgdXNlQ29uZmlnRmlsZSxcclxuICAgICAgICAgICAgY29uZmlnRmlsZVBhdGgsXHJcbiAgICAgICAgICAgIHVwZGF0ZUFzc2VtYmx5SW5mbyxcclxuICAgICAgICAgICAgdXBkYXRlQXNzZW1ibHlJbmZvRmlsZW5hbWUsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxBcmd1bWVudHNcclxuICAgICAgICB9ID0gb3B0aW9uc1xyXG5cclxuICAgICAgICBpZiAodXNlQ29uZmlnRmlsZSkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuaXNWYWxpZElucHV0RmlsZShcclxuICAgICAgICAgICAgICAgICAgICAnY29uZmlnRmlsZVBhdGgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ0ZpbGVQYXRoXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKCcvY29uZmlnJywgY29uZmlnRmlsZVBhdGgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgJ0dpdFZlcnNpb24gY29uZmlndXJhdGlvbiBmaWxlIG5vdCBmb3VuZCBhdCAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnRmlsZVBhdGhcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXBkYXRlQXNzZW1ibHlJbmZvKSB7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaCgnL3VwZGF0ZWFzc2VtYmx5aW5mbycpXHJcblxyXG4gICAgICAgICAgICAvLyBZb3UgY2FuIHNwZWNpZnkgJ3VwZGF0ZUFzc2VtYmx5SW5mbycgd2l0aG91dCAndXBkYXRlQXNzZW1ibHlJbmZvRmlsZW5hbWUnLlxyXG4gICAgICAgICAgICBpZiAodXBkYXRlQXNzZW1ibHlJbmZvRmlsZW5hbWU/Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuaXNWYWxpZElucHV0RmlsZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VwZGF0ZUFzc2VtYmx5SW5mb0ZpbGVuYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXNzZW1ibHlJbmZvRmlsZW5hbWVcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXBkYXRlQXNzZW1ibHlJbmZvRmlsZW5hbWUpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0Fzc2VtYmx5SW5mb0ZpbGVuYW1lIGZpbGUgbm90IGZvdW5kIGF0ICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXNzZW1ibHlJbmZvRmlsZW5hbWVcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhZGRpdGlvbmFsQXJndW1lbnRzKSB7XHJcbiAgICAgICAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdCh0aGlzLmFyZ1N0cmluZ1RvQXJyYXkoYWRkaXRpb25hbEFyZ3VtZW50cykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcmdzXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdyaXRlR2l0VmVyc2lvblRvQWdlbnQoZ2l0dmVyc2lvbjogR2l0VmVyc2lvbk91dHB1dCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoZ2l0dmVyc2lvbilcclxuICAgICAgICBsZXQgZ2l0dmVyc2lvbk91dHB1dCA9IDxhbnk+Z2l0dmVyc2lvblxyXG5cclxuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gdGhpcy50b0NhbWVsQ2FzZShwcm9wZXJ0eSlcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBnaXR2ZXJzaW9uT3V0cHV0W3Byb3BlcnR5XVxyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuc2V0T3V0cHV0KG5hbWUsIHZhbHVlKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhcmdTdHJpbmdUb0FycmF5KGFyZ1N0cmluZzogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHZhciBhcmdzOiBzdHJpbmdbXSA9IFtdXHJcblxyXG4gICAgICAgIHZhciBpblF1b3RlcyA9IGZhbHNlXHJcbiAgICAgICAgdmFyIGVzY2FwZWQgPSBmYWxzZVxyXG4gICAgICAgIHZhciBsYXN0Q2hhcldhc1NwYWNlID0gdHJ1ZVxyXG4gICAgICAgIHZhciBhcmcgPSAnJ1xyXG5cclxuICAgICAgICB2YXIgYXBwZW5kID0gZnVuY3Rpb24gKGM6IHN0cmluZykge1xyXG4gICAgICAgICAgICAvLyB3ZSBvbmx5IGVzY2FwZSBkb3VibGUgcXVvdGVzLlxyXG4gICAgICAgICAgICBpZiAoZXNjYXBlZCAmJiBjICE9PSAnXCInKSB7XHJcbiAgICAgICAgICAgICAgICBhcmcgKz0gJ1xcXFwnXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFyZyArPSBjXHJcbiAgICAgICAgICAgIGVzY2FwZWQgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdTdHJpbmcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGMgPSBhcmdTdHJpbmcuY2hhckF0KGkpXHJcblxyXG4gICAgICAgICAgICBpZiAoYyA9PT0gJyAnICYmICFpblF1b3Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFsYXN0Q2hhcldhc1NwYWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFyZylcclxuICAgICAgICAgICAgICAgICAgICBhcmcgPSAnJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFzdENoYXJXYXNTcGFjZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsYXN0Q2hhcldhc1NwYWNlID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGMgPT09ICdcIicpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZXNjYXBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluUXVvdGVzID0gIWluUXVvdGVzXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZChjKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGMgPT09ICdcXFxcJyAmJiBlc2NhcGVkKSB7XHJcbiAgICAgICAgICAgICAgICBhcHBlbmQoYylcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjID09PSAnXFxcXCcgJiYgaW5RdW90ZXMpIHtcclxuICAgICAgICAgICAgICAgIGVzY2FwZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhcHBlbmQoYylcclxuICAgICAgICAgICAgbGFzdENoYXJXYXNTcGFjZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWxhc3RDaGFyV2FzU3BhY2UpIHtcclxuICAgICAgICAgICAgYXJncy5wdXNoKGFyZy50cmltKCkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJnc1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG9DYW1lbENhc2UoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoXHJcbiAgICAgICAgICAgIC8oPzpeXFx3fFtBLVpdfFxcYlxcd3xcXHMrKS9nLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAobWF0Y2gsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoK21hdGNoID09PSAwKSByZXR1cm4gJycgLy8gb3IgaWYgKC9cXHMrLy50ZXN0KG1hdGNoKSkgZm9yIHdoaXRlIHNwYWNlc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4ID09IDAgPyBtYXRjaC50b0xvd2VyQ2FzZSgpIDogbWF0Y2gudG9VcHBlckNhc2UoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB1cmwgPSByZXF1aXJlKFwidXJsXCIpO1xyXG5jb25zdCBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XHJcbmNvbnN0IGh0dHBzID0gcmVxdWlyZShcImh0dHBzXCIpO1xyXG5jb25zdCB1dGlsID0gcmVxdWlyZShcIi4vVXRpbFwiKTtcclxubGV0IGZzO1xyXG5sZXQgdHVubmVsO1xyXG52YXIgSHR0cENvZGVzO1xyXG4oZnVuY3Rpb24gKEh0dHBDb2Rlcykge1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk9LXCJdID0gMjAwXSA9IFwiT0tcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJNdWx0aXBsZUNob2ljZXNcIl0gPSAzMDBdID0gXCJNdWx0aXBsZUNob2ljZXNcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJNb3ZlZFBlcm1hbmVudGx5XCJdID0gMzAxXSA9IFwiTW92ZWRQZXJtYW5lbnRseVwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlJlc291cmNlTW92ZWRcIl0gPSAzMDJdID0gXCJSZXNvdXJjZU1vdmVkXCI7XHJcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiU2VlT3RoZXJcIl0gPSAzMDNdID0gXCJTZWVPdGhlclwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk5vdE1vZGlmaWVkXCJdID0gMzA0XSA9IFwiTm90TW9kaWZpZWRcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJVc2VQcm94eVwiXSA9IDMwNV0gPSBcIlVzZVByb3h5XCI7XHJcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiU3dpdGNoUHJveHlcIl0gPSAzMDZdID0gXCJTd2l0Y2hQcm94eVwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlRlbXBvcmFyeVJlZGlyZWN0XCJdID0gMzA3XSA9IFwiVGVtcG9yYXJ5UmVkaXJlY3RcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJQZXJtYW5lbnRSZWRpcmVjdFwiXSA9IDMwOF0gPSBcIlBlcm1hbmVudFJlZGlyZWN0XCI7XHJcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiQmFkUmVxdWVzdFwiXSA9IDQwMF0gPSBcIkJhZFJlcXVlc3RcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJVbmF1dGhvcml6ZWRcIl0gPSA0MDFdID0gXCJVbmF1dGhvcml6ZWRcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJQYXltZW50UmVxdWlyZWRcIl0gPSA0MDJdID0gXCJQYXltZW50UmVxdWlyZWRcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJGb3JiaWRkZW5cIl0gPSA0MDNdID0gXCJGb3JiaWRkZW5cIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJOb3RGb3VuZFwiXSA9IDQwNF0gPSBcIk5vdEZvdW5kXCI7XHJcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiTWV0aG9kTm90QWxsb3dlZFwiXSA9IDQwNV0gPSBcIk1ldGhvZE5vdEFsbG93ZWRcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJOb3RBY2NlcHRhYmxlXCJdID0gNDA2XSA9IFwiTm90QWNjZXB0YWJsZVwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZFwiXSA9IDQwN10gPSBcIlByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZFwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlJlcXVlc3RUaW1lb3V0XCJdID0gNDA4XSA9IFwiUmVxdWVzdFRpbWVvdXRcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJDb25mbGljdFwiXSA9IDQwOV0gPSBcIkNvbmZsaWN0XCI7XHJcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiR29uZVwiXSA9IDQxMF0gPSBcIkdvbmVcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJUb29NYW55UmVxdWVzdHNcIl0gPSA0MjldID0gXCJUb29NYW55UmVxdWVzdHNcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJJbnRlcm5hbFNlcnZlckVycm9yXCJdID0gNTAwXSA9IFwiSW50ZXJuYWxTZXJ2ZXJFcnJvclwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk5vdEltcGxlbWVudGVkXCJdID0gNTAxXSA9IFwiTm90SW1wbGVtZW50ZWRcIjtcclxuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJCYWRHYXRld2F5XCJdID0gNTAyXSA9IFwiQmFkR2F0ZXdheVwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlNlcnZpY2VVbmF2YWlsYWJsZVwiXSA9IDUwM10gPSBcIlNlcnZpY2VVbmF2YWlsYWJsZVwiO1xyXG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkdhdGV3YXlUaW1lb3V0XCJdID0gNTA0XSA9IFwiR2F0ZXdheVRpbWVvdXRcIjtcclxufSkoSHR0cENvZGVzID0gZXhwb3J0cy5IdHRwQ29kZXMgfHwgKGV4cG9ydHMuSHR0cENvZGVzID0ge30pKTtcclxuY29uc3QgSHR0cFJlZGlyZWN0Q29kZXMgPSBbSHR0cENvZGVzLk1vdmVkUGVybWFuZW50bHksIEh0dHBDb2Rlcy5SZXNvdXJjZU1vdmVkLCBIdHRwQ29kZXMuU2VlT3RoZXIsIEh0dHBDb2Rlcy5UZW1wb3JhcnlSZWRpcmVjdCwgSHR0cENvZGVzLlBlcm1hbmVudFJlZGlyZWN0XTtcclxuY29uc3QgSHR0cFJlc3BvbnNlUmV0cnlDb2RlcyA9IFtIdHRwQ29kZXMuQmFkR2F0ZXdheSwgSHR0cENvZGVzLlNlcnZpY2VVbmF2YWlsYWJsZSwgSHR0cENvZGVzLkdhdGV3YXlUaW1lb3V0XTtcclxuY29uc3QgTmV0d29ya1JldHJ5RXJyb3JzID0gWydFQ09OTlJFU0VUJywgJ0VOT1RGT1VORCcsICdFU09DS0VUVElNRURPVVQnLCAnRVRJTUVET1VUJywgJ0VDT05OUkVGVVNFRCddO1xyXG5jb25zdCBSZXRyeWFibGVIdHRwVmVyYnMgPSBbJ09QVElPTlMnLCAnR0VUJywgJ0RFTEVURScsICdIRUFEJ107XHJcbmNvbnN0IEV4cG9uZW50aWFsQmFja29mZkNlaWxpbmcgPSAxMDtcclxuY29uc3QgRXhwb25lbnRpYWxCYWNrb2ZmVGltZVNsaWNlID0gNTtcclxuY2xhc3MgSHR0cENsaWVudFJlc3BvbnNlIHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgcmVhZEJvZHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IEJ1ZmZlci5hbGxvYygwKTtcclxuICAgICAgICAgICAgY29uc3QgZW5jb2RpbmdDaGFyc2V0ID0gdXRpbC5vYnRhaW5Db250ZW50Q2hhcnNldCh0aGlzKTtcclxuICAgICAgICAgICAgLy8gRXh0cmFjdCBFbmNvZGluZyBmcm9tIGhlYWRlcjogJ2NvbnRlbnQtZW5jb2RpbmcnXHJcbiAgICAgICAgICAgIC8vIE1hdGNoIGBnemlwYCwgYGd6aXAsIGRlZmxhdGVgIHZhcmlhdGlvbnMgb2YgR1pJUCBlbmNvZGluZ1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50RW5jb2RpbmcgPSB0aGlzLm1lc3NhZ2UuaGVhZGVyc1snY29udGVudC1lbmNvZGluZyddIHx8ICcnO1xyXG4gICAgICAgICAgICBjb25zdCBpc0d6aXBwZWRFbmNvZGVkID0gbmV3IFJlZ0V4cCgnKGd6aXAkKXwoZ3ppcCwgKmRlZmxhdGUpJykudGVzdChjb250ZW50RW5jb2RpbmcpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2Uub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2h1bmsgPSAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSA/IEJ1ZmZlci5mcm9tKGRhdGEsIGVuY29kaW5nQ2hhcnNldCkgOiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyID0gQnVmZmVyLmNvbmNhdChbYnVmZmVyLCBjaHVua10pO1xyXG4gICAgICAgICAgICB9KS5vbignZW5kJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNHemlwcGVkRW5jb2RlZCkgeyAvLyBQcm9jZXNzIEdaaXBwZWQgUmVzcG9uc2UgQm9keSBIRVJFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGd1bnppcHBlZEJvZHkgPSB5aWVsZCB1dGlsLmRlY29tcHJlc3NHemlwcGVkQ29udGVudChidWZmZXIsIGVuY29kaW5nQ2hhcnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZ3VuemlwcGVkQm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGJ1ZmZlci50b1N0cmluZyhlbmNvZGluZ0NoYXJzZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkh0dHBDbGllbnRSZXNwb25zZSA9IEh0dHBDbGllbnRSZXNwb25zZTtcclxuZnVuY3Rpb24gaXNIdHRwcyhyZXF1ZXN0VXJsKSB7XHJcbiAgICBsZXQgcGFyc2VkVXJsID0gdXJsLnBhcnNlKHJlcXVlc3RVcmwpO1xyXG4gICAgcmV0dXJuIHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XHJcbn1cclxuZXhwb3J0cy5pc0h0dHBzID0gaXNIdHRwcztcclxudmFyIEVudmlyb25tZW50VmFyaWFibGVzO1xyXG4oZnVuY3Rpb24gKEVudmlyb25tZW50VmFyaWFibGVzKSB7XHJcbiAgICBFbnZpcm9ubWVudFZhcmlhYmxlc1tcIkhUVFBfUFJPWFlcIl0gPSBcIkhUVFBfUFJPWFlcIjtcclxuICAgIEVudmlyb25tZW50VmFyaWFibGVzW1wiSFRUUFNfUFJPWFlcIl0gPSBcIkhUVFBTX1BST1hZXCI7XHJcbiAgICBFbnZpcm9ubWVudFZhcmlhYmxlc1tcIk5PX1BST1hZXCJdID0gXCJOT19QUk9YWVwiO1xyXG59KShFbnZpcm9ubWVudFZhcmlhYmxlcyB8fCAoRW52aXJvbm1lbnRWYXJpYWJsZXMgPSB7fSkpO1xyXG5jbGFzcyBIdHRwQ2xpZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHVzZXJBZ2VudCwgaGFuZGxlcnMsIHJlcXVlc3RPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5faWdub3JlU3NsRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9hbGxvd1JlZGlyZWN0cyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fYWxsb3dSZWRpcmVjdERvd25ncmFkZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX21heFJlZGlyZWN0cyA9IDUwO1xyXG4gICAgICAgIHRoaXMuX2FsbG93UmV0cmllcyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX21heFJldHJpZXMgPSAxO1xyXG4gICAgICAgIHRoaXMuX2tlZXBBbGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51c2VyQWdlbnQgPSB1c2VyQWdlbnQ7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVycyA9IGhhbmRsZXJzIHx8IFtdO1xyXG4gICAgICAgIGxldCBub19wcm94eSA9IHByb2Nlc3MuZW52W0Vudmlyb25tZW50VmFyaWFibGVzLk5PX1BST1hZXTtcclxuICAgICAgICBpZiAobm9fcHJveHkpIHtcclxuICAgICAgICAgICAgdGhpcy5faHR0cFByb3h5QnlwYXNzSG9zdHMgPSBbXTtcclxuICAgICAgICAgICAgbm9fcHJveHkuc3BsaXQoJywnKS5mb3JFYWNoKGJ5cGFzcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9odHRwUHJveHlCeXBhc3NIb3N0cy5wdXNoKG5ldyBSZWdFeHAoYnlwYXNzLCAnaScpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0T3B0aW9ucztcclxuICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLmlnbm9yZVNzbEVycm9yICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lnbm9yZVNzbEVycm9yID0gcmVxdWVzdE9wdGlvbnMuaWdub3JlU3NsRXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc29ja2V0VGltZW91dCA9IHJlcXVlc3RPcHRpb25zLnNvY2tldFRpbWVvdXQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2h0dHBQcm94eSA9IHJlcXVlc3RPcHRpb25zLnByb3h5O1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMucHJveHkgJiYgcmVxdWVzdE9wdGlvbnMucHJveHkucHJveHlCeXBhc3NIb3N0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faHR0cFByb3h5QnlwYXNzSG9zdHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RPcHRpb25zLnByb3h5LnByb3h5QnlwYXNzSG9zdHMuZm9yRWFjaChieXBhc3MgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2h0dHBQcm94eUJ5cGFzc0hvc3RzLnB1c2gobmV3IFJlZ0V4cChieXBhc3MsICdpJykpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fY2VydENvbmZpZyA9IHJlcXVlc3RPcHRpb25zLmNlcnQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jZXJ0Q29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB1c2luZyBjZXJ0LCBuZWVkIGZzXHJcbiAgICAgICAgICAgICAgICBmcyA9IHJlcXVpcmUoJ2ZzJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWNoZSB0aGUgY2VydCBjb250ZW50IGludG8gbWVtb3J5LCBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlYWQgaXQgZnJvbSBkaXNrIGV2ZXJ5IHRpbWVcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jZXJ0Q29uZmlnLmNhRmlsZSAmJiBmcy5leGlzdHNTeW5jKHRoaXMuX2NlcnRDb25maWcuY2FGaWxlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhID0gZnMucmVhZEZpbGVTeW5jKHRoaXMuX2NlcnRDb25maWcuY2FGaWxlLCAndXRmOCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NlcnRDb25maWcuY2VydEZpbGUgJiYgZnMuZXhpc3RzU3luYyh0aGlzLl9jZXJ0Q29uZmlnLmNlcnRGaWxlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NlcnQgPSBmcy5yZWFkRmlsZVN5bmModGhpcy5fY2VydENvbmZpZy5jZXJ0RmlsZSwgJ3V0ZjgnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jZXJ0Q29uZmlnLmtleUZpbGUgJiYgZnMuZXhpc3RzU3luYyh0aGlzLl9jZXJ0Q29uZmlnLmtleUZpbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5ID0gZnMucmVhZEZpbGVTeW5jKHRoaXMuX2NlcnRDb25maWcua2V5RmlsZSwgJ3V0ZjgnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMuYWxsb3dSZWRpcmVjdHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWxsb3dSZWRpcmVjdHMgPSByZXF1ZXN0T3B0aW9ucy5hbGxvd1JlZGlyZWN0cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMuYWxsb3dSZWRpcmVjdERvd25ncmFkZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbGxvd1JlZGlyZWN0RG93bmdyYWRlID0gcmVxdWVzdE9wdGlvbnMuYWxsb3dSZWRpcmVjdERvd25ncmFkZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMubWF4UmVkaXJlY3RzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21heFJlZGlyZWN0cyA9IE1hdGgubWF4KHJlcXVlc3RPcHRpb25zLm1heFJlZGlyZWN0cywgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLmtlZXBBbGl2ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9rZWVwQWxpdmUgPSByZXF1ZXN0T3B0aW9ucy5rZWVwQWxpdmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLmFsbG93UmV0cmllcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbGxvd1JldHJpZXMgPSByZXF1ZXN0T3B0aW9ucy5hbGxvd1JldHJpZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLm1heFJldHJpZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4UmV0cmllcyA9IHJlcXVlc3RPcHRpb25zLm1heFJldHJpZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvcHRpb25zKHJlcXVlc3RVcmwsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnT1BUSU9OUycsIHJlcXVlc3RVcmwsIG51bGwsIGFkZGl0aW9uYWxIZWFkZXJzIHx8IHt9KTtcclxuICAgIH1cclxuICAgIGdldChyZXF1ZXN0VXJsLCBhZGRpdGlvbmFsSGVhZGVycykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0dFVCcsIHJlcXVlc3RVcmwsIG51bGwsIGFkZGl0aW9uYWxIZWFkZXJzIHx8IHt9KTtcclxuICAgIH1cclxuICAgIGRlbChyZXF1ZXN0VXJsLCBhZGRpdGlvbmFsSGVhZGVycykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0RFTEVURScsIHJlcXVlc3RVcmwsIG51bGwsIGFkZGl0aW9uYWxIZWFkZXJzIHx8IHt9KTtcclxuICAgIH1cclxuICAgIHBvc3QocmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgcmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xyXG4gICAgfVxyXG4gICAgcGF0Y2gocmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQQVRDSCcsIHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzIHx8IHt9KTtcclxuICAgIH1cclxuICAgIHB1dChyZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BVVCcsIHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzIHx8IHt9KTtcclxuICAgIH1cclxuICAgIGhlYWQocmVxdWVzdFVybCwgYWRkaXRpb25hbEhlYWRlcnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdIRUFEJywgcmVxdWVzdFVybCwgbnVsbCwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xyXG4gICAgfVxyXG4gICAgc2VuZFN0cmVhbSh2ZXJiLCByZXF1ZXN0VXJsLCBzdHJlYW0sIGFkZGl0aW9uYWxIZWFkZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCh2ZXJiLCByZXF1ZXN0VXJsLCBzdHJlYW0sIGFkZGl0aW9uYWxIZWFkZXJzKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogTWFrZXMgYSByYXcgaHR0cCByZXF1ZXN0LlxyXG4gICAgICogQWxsIG90aGVyIG1ldGhvZHMgc3VjaCBhcyBnZXQsIHBvc3QsIHBhdGNoLCBhbmQgcmVxdWVzdCB1bHRpbWF0ZWx5IGNhbGwgdGhpcy5cclxuICAgICAqIFByZWZlciBnZXQsIGRlbCwgcG9zdCBhbmQgcGF0Y2hcclxuICAgICAqL1xyXG4gICAgcmVxdWVzdCh2ZXJiLCByZXF1ZXN0VXJsLCBkYXRhLCBoZWFkZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Rpc3Bvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDbGllbnQgaGFzIGFscmVhZHkgYmVlbiBkaXNwb3NlZC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBhcnNlZFVybCA9IHVybC5wYXJzZShyZXF1ZXN0VXJsKTtcclxuICAgICAgICAgICAgbGV0IGluZm8gPSB0aGlzLl9wcmVwYXJlUmVxdWVzdCh2ZXJiLCBwYXJzZWRVcmwsIGhlYWRlcnMpO1xyXG4gICAgICAgICAgICAvLyBPbmx5IHBlcmZvcm0gcmV0cmllcyBvbiByZWFkcyBzaW5jZSB3cml0ZXMgbWF5IG5vdCBiZSBpZGVtcG90ZW50LlxyXG4gICAgICAgICAgICBsZXQgbWF4VHJpZXMgPSAodGhpcy5fYWxsb3dSZXRyaWVzICYmIFJldHJ5YWJsZUh0dHBWZXJicy5pbmRleE9mKHZlcmIpICE9IC0xKSA/IHRoaXMuX21heFJldHJpZXMgKyAxIDogMTtcclxuICAgICAgICAgICAgbGV0IG51bVRyaWVzID0gMDtcclxuICAgICAgICAgICAgbGV0IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICB3aGlsZSAobnVtVHJpZXMgPCBtYXhUcmllcykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHlpZWxkIHRoaXMucmVxdWVzdFJhdyhpbmZvLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyICYmIGVyci5jb2RlICYmIE5ldHdvcmtSZXRyeUVycm9ycy5pbmRleE9mKGVyci5jb2RlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBpdCdzIGFuIGF1dGhlbnRpY2F0aW9uIGNoYWxsZW5nZVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLm1lc3NhZ2UgJiYgcmVzcG9uc2UubWVzc2FnZS5zdGF0dXNDb2RlID09PSBIdHRwQ29kZXMuVW5hdXRob3JpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF1dGhlbnRpY2F0aW9uSGFuZGxlcjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFuZGxlcnNbaV0uY2FuSGFuZGxlQXV0aGVudGljYXRpb24ocmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbkhhbmRsZXIgPSB0aGlzLmhhbmRsZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF1dGhlbnRpY2F0aW9uSGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aGVudGljYXRpb25IYW5kbGVyLmhhbmRsZUF1dGhlbnRpY2F0aW9uKHRoaXMsIGluZm8sIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSByZWNlaXZlZCBhbiB1bmF1dGhvcml6ZWQgcmVzcG9uc2UgYnV0IGhhdmUgbm8gaGFuZGxlcnMgdG8gaGFuZGxlIGl0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMZXQgdGhlIHJlc3BvbnNlIHJldHVybiB0byB0aGUgY2FsbGVyLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHJlZGlyZWN0c1JlbWFpbmluZyA9IHRoaXMuX21heFJlZGlyZWN0cztcclxuICAgICAgICAgICAgICAgIHdoaWxlIChIdHRwUmVkaXJlY3RDb2Rlcy5pbmRleE9mKHJlc3BvbnNlLm1lc3NhZ2Uuc3RhdHVzQ29kZSkgIT0gLTFcclxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9hbGxvd1JlZGlyZWN0c1xyXG4gICAgICAgICAgICAgICAgICAgICYmIHJlZGlyZWN0c1JlbWFpbmluZyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWRpcmVjdFVybCA9IHJlc3BvbnNlLm1lc3NhZ2UuaGVhZGVyc1tcImxvY2F0aW9uXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVkaXJlY3RVcmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUncyBubyBsb2NhdGlvbiB0byByZWRpcmVjdCB0bywgd2Ugd29uJ3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZWRSZWRpcmVjdFVybCA9IHVybC5wYXJzZShyZWRpcmVjdFVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlZFVybC5wcm90b2NvbCA9PSAnaHR0cHM6JyAmJiBwYXJzZWRVcmwucHJvdG9jb2wgIT0gcGFyc2VkUmVkaXJlY3RVcmwucHJvdG9jb2wgJiYgIXRoaXMuX2FsbG93UmVkaXJlY3REb3duZ3JhZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVkaXJlY3QgZnJvbSBIVFRQUyB0byBIVFRQIHByb3RvY29sLiBUaGlzIGRvd25ncmFkZSBpcyBub3QgYWxsb3dlZCBmb3Igc2VjdXJpdHkgcmVhc29ucy4gSWYgeW91IHdhbnQgdG8gYWxsb3cgdGhpcyBiZWhhdmlvciwgc2V0IHRoZSBhbGxvd1JlZGlyZWN0RG93bmdyYWRlIG9wdGlvbiB0byB0cnVlLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBmaW5pc2ggcmVhZGluZyB0aGUgcmVzcG9uc2UgYmVmb3JlIHJlYXNzaWduaW5nIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hpY2ggd2lsbCBsZWFrIHRoZSBvcGVuIHNvY2tldC5cclxuICAgICAgICAgICAgICAgICAgICB5aWVsZCByZXNwb25zZS5yZWFkQm9keSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCdzIG1ha2UgdGhlIHJlcXVlc3Qgd2l0aCB0aGUgbmV3IHJlZGlyZWN0VXJsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuX3ByZXBhcmVSZXF1ZXN0KHZlcmIsIHBhcnNlZFJlZGlyZWN0VXJsLCBoZWFkZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHlpZWxkIHRoaXMucmVxdWVzdFJhdyhpbmZvLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdHNSZW1haW5pbmctLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChIdHRwUmVzcG9uc2VSZXRyeUNvZGVzLmluZGV4T2YocmVzcG9uc2UubWVzc2FnZS5zdGF0dXNDb2RlKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG5vdCBhIHJldHJ5IGNvZGUsIHJldHVybiBpbW1lZGlhdGVseSBpbnN0ZWFkIG9mIHJldHJ5aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbnVtVHJpZXMgKz0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChudW1UcmllcyA8IG1heFRyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgcmVzcG9uc2UucmVhZEJvZHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLl9wZXJmb3JtRXhwb25lbnRpYWxCYWNrb2ZmKG51bVRyaWVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIE5lZWRzIHRvIGJlIGNhbGxlZCBpZiBrZWVwQWxpdmUgaXMgc2V0IHRvIHRydWUgaW4gcmVxdWVzdCBvcHRpb25zLlxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hZ2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9hZ2VudC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmF3IHJlcXVlc3QuXHJcbiAgICAgKiBAcGFyYW0gaW5mb1xyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqL1xyXG4gICAgcmVxdWVzdFJhdyhpbmZvLCBkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrRm9yUmVzdWx0ID0gZnVuY3Rpb24gKGVyciwgcmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdFJhd1dpdGhDYWxsYmFjayhpbmZvLCBkYXRhLCBjYWxsYmFja0ZvclJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJhdyByZXF1ZXN0IHdpdGggY2FsbGJhY2suXHJcbiAgICAgKiBAcGFyYW0gaW5mb1xyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqIEBwYXJhbSBvblJlc3VsdFxyXG4gICAgICovXHJcbiAgICByZXF1ZXN0UmF3V2l0aENhbGxiYWNrKGluZm8sIGRhdGEsIG9uUmVzdWx0KSB7XHJcbiAgICAgICAgbGV0IHNvY2tldDtcclxuICAgICAgICBpZiAodHlwZW9mIChkYXRhKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgaW5mby5vcHRpb25zLmhlYWRlcnNbXCJDb250ZW50LUxlbmd0aFwiXSA9IEJ1ZmZlci5ieXRlTGVuZ3RoKGRhdGEsICd1dGY4Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjYWxsYmFja0NhbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBoYW5kbGVSZXN1bHQgPSAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjYWxsYmFja0NhbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tDYWxsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgb25SZXN1bHQoZXJyLCByZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgcmVxID0gaW5mby5odHRwTW9kdWxlLnJlcXVlc3QoaW5mby5vcHRpb25zLCAobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXMgPSBuZXcgSHR0cENsaWVudFJlc3BvbnNlKG1zZyk7XHJcbiAgICAgICAgICAgIGhhbmRsZVJlc3VsdChudWxsLCByZXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlcS5vbignc29ja2V0JywgKHNvY2spID0+IHtcclxuICAgICAgICAgICAgc29ja2V0ID0gc29jaztcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBJZiB3ZSBldmVyIGdldCBkaXNjb25uZWN0ZWQsIHdlIHdhbnQgdGhlIHNvY2tldCB0byB0aW1lb3V0IGV2ZW50dWFsbHlcclxuICAgICAgICByZXEuc2V0VGltZW91dCh0aGlzLl9zb2NrZXRUaW1lb3V0IHx8IDMgKiA2MDAwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc29ja2V0KSB7XHJcbiAgICAgICAgICAgICAgICBzb2NrZXQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhhbmRsZVJlc3VsdChuZXcgRXJyb3IoJ1JlcXVlc3QgdGltZW91dDogJyArIGluZm8ub3B0aW9ucy5wYXRoKSwgbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgLy8gZXJyIGhhcyBzdGF0dXNDb2RlIHByb3BlcnR5XHJcbiAgICAgICAgICAgIC8vIHJlcyBzaG91bGQgaGF2ZSBoZWFkZXJzXHJcbiAgICAgICAgICAgIGhhbmRsZVJlc3VsdChlcnIsIG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChkYXRhICYmIHR5cGVvZiAoZGF0YSkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJlcS53cml0ZShkYXRhLCAndXRmOCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YSAmJiB0eXBlb2YgKGRhdGEpICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBkYXRhLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJlcS5lbmQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRhdGEucGlwZShyZXEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVxLmVuZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9wcmVwYXJlUmVxdWVzdChtZXRob2QsIHJlcXVlc3RVcmwsIGhlYWRlcnMpIHtcclxuICAgICAgICBjb25zdCBpbmZvID0ge307XHJcbiAgICAgICAgaW5mby5wYXJzZWRVcmwgPSByZXF1ZXN0VXJsO1xyXG4gICAgICAgIGNvbnN0IHVzaW5nU3NsID0gaW5mby5wYXJzZWRVcmwucHJvdG9jb2wgPT09ICdodHRwczonO1xyXG4gICAgICAgIGluZm8uaHR0cE1vZHVsZSA9IHVzaW5nU3NsID8gaHR0cHMgOiBodHRwO1xyXG4gICAgICAgIGNvbnN0IGRlZmF1bHRQb3J0ID0gdXNpbmdTc2wgPyA0NDMgOiA4MDtcclxuICAgICAgICBpbmZvLm9wdGlvbnMgPSB7fTtcclxuICAgICAgICBpbmZvLm9wdGlvbnMuaG9zdCA9IGluZm8ucGFyc2VkVXJsLmhvc3RuYW1lO1xyXG4gICAgICAgIGluZm8ub3B0aW9ucy5wb3J0ID0gaW5mby5wYXJzZWRVcmwucG9ydCA/IHBhcnNlSW50KGluZm8ucGFyc2VkVXJsLnBvcnQpIDogZGVmYXVsdFBvcnQ7XHJcbiAgICAgICAgaW5mby5vcHRpb25zLnBhdGggPSAoaW5mby5wYXJzZWRVcmwucGF0aG5hbWUgfHwgJycpICsgKGluZm8ucGFyc2VkVXJsLnNlYXJjaCB8fCAnJyk7XHJcbiAgICAgICAgaW5mby5vcHRpb25zLm1ldGhvZCA9IG1ldGhvZDtcclxuICAgICAgICBpbmZvLm9wdGlvbnMudGltZW91dCA9ICh0aGlzLnJlcXVlc3RPcHRpb25zICYmIHRoaXMucmVxdWVzdE9wdGlvbnMuc29ja2V0VGltZW91dCkgfHwgdGhpcy5fc29ja2V0VGltZW91dDtcclxuICAgICAgICB0aGlzLl9zb2NrZXRUaW1lb3V0ID0gaW5mby5vcHRpb25zLnRpbWVvdXQ7XHJcbiAgICAgICAgaW5mby5vcHRpb25zLmhlYWRlcnMgPSB0aGlzLl9tZXJnZUhlYWRlcnMoaGVhZGVycyk7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlckFnZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaW5mby5vcHRpb25zLmhlYWRlcnNbXCJ1c2VyLWFnZW50XCJdID0gdGhpcy51c2VyQWdlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZm8ub3B0aW9ucy5hZ2VudCA9IHRoaXMuX2dldEFnZW50KGluZm8ucGFyc2VkVXJsKTtcclxuICAgICAgICAvLyBnaXZlcyBoYW5kbGVycyBhbiBvcHBvcnR1bml0eSB0byBwYXJ0aWNpcGF0ZVxyXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZXJzICYmICF0aGlzLl9pc1ByZXNpZ25lZCh1cmwuZm9ybWF0KHJlcXVlc3RVcmwpKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzLmZvckVhY2goKGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXIucHJlcGFyZVJlcXVlc3QoaW5mby5vcHRpb25zKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmZvO1xyXG4gICAgfVxyXG4gICAgX2lzUHJlc2lnbmVkKHJlcXVlc3RVcmwpIHtcclxuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0T3B0aW9ucyAmJiB0aGlzLnJlcXVlc3RPcHRpb25zLnByZXNpZ25lZFVybFBhdHRlcm5zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhdHRlcm5zID0gdGhpcy5yZXF1ZXN0T3B0aW9ucy5wcmVzaWduZWRVcmxQYXR0ZXJucztcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXR0ZXJucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RVcmwubWF0Y2gocGF0dGVybnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgX21lcmdlSGVhZGVycyhoZWFkZXJzKSB7XHJcbiAgICAgICAgY29uc3QgbG93ZXJjYXNlS2V5cyA9IG9iaiA9PiBPYmplY3Qua2V5cyhvYmopLnJlZHVjZSgoYywgaykgPT4gKGNbay50b0xvd2VyQ2FzZSgpXSA9IG9ialtrXSwgYyksIHt9KTtcclxuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0T3B0aW9ucyAmJiB0aGlzLnJlcXVlc3RPcHRpb25zLmhlYWRlcnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGxvd2VyY2FzZUtleXModGhpcy5yZXF1ZXN0T3B0aW9ucy5oZWFkZXJzKSwgbG93ZXJjYXNlS2V5cyhoZWFkZXJzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsb3dlcmNhc2VLZXlzKGhlYWRlcnMgfHwge30pO1xyXG4gICAgfVxyXG4gICAgX2dldEFnZW50KHBhcnNlZFVybCkge1xyXG4gICAgICAgIGxldCBhZ2VudDtcclxuICAgICAgICBsZXQgcHJveHkgPSB0aGlzLl9nZXRQcm94eShwYXJzZWRVcmwpO1xyXG4gICAgICAgIGxldCB1c2VQcm94eSA9IHByb3h5LnByb3h5VXJsICYmIHByb3h5LnByb3h5VXJsLmhvc3RuYW1lICYmICF0aGlzLl9pc01hdGNoSW5CeXBhc3NQcm94eUxpc3QocGFyc2VkVXJsKTtcclxuICAgICAgICBpZiAodGhpcy5fa2VlcEFsaXZlICYmIHVzZVByb3h5KSB7XHJcbiAgICAgICAgICAgIGFnZW50ID0gdGhpcy5fcHJveHlBZ2VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2tlZXBBbGl2ZSAmJiAhdXNlUHJveHkpIHtcclxuICAgICAgICAgICAgYWdlbnQgPSB0aGlzLl9hZ2VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgYWdlbnQgaXMgYWxyZWFkeSBhc3NpZ25lZCB1c2UgdGhhdCBhZ2VudC5cclxuICAgICAgICBpZiAoISFhZ2VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYWdlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHVzaW5nU3NsID0gcGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcclxuICAgICAgICBsZXQgbWF4U29ja2V0cyA9IDEwMDtcclxuICAgICAgICBpZiAoISF0aGlzLnJlcXVlc3RPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIG1heFNvY2tldHMgPSB0aGlzLnJlcXVlc3RPcHRpb25zLm1heFNvY2tldHMgfHwgaHR0cC5nbG9iYWxBZ2VudC5tYXhTb2NrZXRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXNlUHJveHkpIHtcclxuICAgICAgICAgICAgLy8gSWYgdXNpbmcgcHJveHksIG5lZWQgdHVubmVsXHJcbiAgICAgICAgICAgIGlmICghdHVubmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0dW5uZWwgPSByZXF1aXJlKCd0dW5uZWwnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBhZ2VudE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBtYXhTb2NrZXRzOiBtYXhTb2NrZXRzLFxyXG4gICAgICAgICAgICAgICAga2VlcEFsaXZlOiB0aGlzLl9rZWVwQWxpdmUsXHJcbiAgICAgICAgICAgICAgICBwcm94eToge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3h5QXV0aDogcHJveHkucHJveHlBdXRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvc3Q6IHByb3h5LnByb3h5VXJsLmhvc3RuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvcnQ6IHByb3h5LnByb3h5VXJsLnBvcnRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxldCB0dW5uZWxBZ2VudDtcclxuICAgICAgICAgICAgY29uc3Qgb3Zlckh0dHBzID0gcHJveHkucHJveHlVcmwucHJvdG9jb2wgPT09ICdodHRwczonO1xyXG4gICAgICAgICAgICBpZiAodXNpbmdTc2wpIHtcclxuICAgICAgICAgICAgICAgIHR1bm5lbEFnZW50ID0gb3Zlckh0dHBzID8gdHVubmVsLmh0dHBzT3Zlckh0dHBzIDogdHVubmVsLmh0dHBzT3Zlckh0dHA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0dW5uZWxBZ2VudCA9IG92ZXJIdHRwcyA/IHR1bm5lbC5odHRwT3Zlckh0dHBzIDogdHVubmVsLmh0dHBPdmVySHR0cDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhZ2VudCA9IHR1bm5lbEFnZW50KGFnZW50T3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5QWdlbnQgPSBhZ2VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgcmV1c2luZyBhZ2VudCBhY3Jvc3MgcmVxdWVzdCBhbmQgdHVubmVsaW5nIGFnZW50IGlzbid0IGFzc2lnbmVkIGNyZWF0ZSBhIG5ldyBhZ2VudFxyXG4gICAgICAgIGlmICh0aGlzLl9rZWVwQWxpdmUgJiYgIWFnZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGtlZXBBbGl2ZTogdGhpcy5fa2VlcEFsaXZlLCBtYXhTb2NrZXRzOiBtYXhTb2NrZXRzIH07XHJcbiAgICAgICAgICAgIGFnZW50ID0gdXNpbmdTc2wgPyBuZXcgaHR0cHMuQWdlbnQob3B0aW9ucykgOiBuZXcgaHR0cC5BZ2VudChvcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5fYWdlbnQgPSBhZ2VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgbm90IHVzaW5nIHByaXZhdGUgYWdlbnQgYW5kIHR1bm5lbCBhZ2VudCBpc24ndCBzZXR1cCB0aGVuIHVzZSBnbG9iYWwgYWdlbnRcclxuICAgICAgICBpZiAoIWFnZW50KSB7XHJcbiAgICAgICAgICAgIGFnZW50ID0gdXNpbmdTc2wgPyBodHRwcy5nbG9iYWxBZ2VudCA6IGh0dHAuZ2xvYmFsQWdlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1c2luZ1NzbCAmJiB0aGlzLl9pZ25vcmVTc2xFcnJvcikge1xyXG4gICAgICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIHNldCBOT0RFX1RMU19SRUpFQ1RfVU5BVVRIT1JJWkVEPTAgc2luY2UgdGhhdCB3aWxsIGFmZmVjdCByZXF1ZXN0IGZvciBlbnRpcmUgcHJvY2Vzc1xyXG4gICAgICAgICAgICAvLyBodHRwLlJlcXVlc3RPcHRpb25zIGRvZXNuJ3QgZXhwb3NlIGEgd2F5IHRvIG1vZGlmeSBSZXF1ZXN0T3B0aW9ucy5hZ2VudC5vcHRpb25zXHJcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gY2FzdCBpdCB0byBhbnkgYW5kIGNoYW5nZSBpdCBkaXJlY3RseVxyXG4gICAgICAgICAgICBhZ2VudC5vcHRpb25zID0gT2JqZWN0LmFzc2lnbihhZ2VudC5vcHRpb25zIHx8IHt9LCB7IHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1c2luZ1NzbCAmJiB0aGlzLl9jZXJ0Q29uZmlnKSB7XHJcbiAgICAgICAgICAgIGFnZW50Lm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGFnZW50Lm9wdGlvbnMgfHwge30sIHsgY2E6IHRoaXMuX2NhLCBjZXJ0OiB0aGlzLl9jZXJ0LCBrZXk6IHRoaXMuX2tleSwgcGFzc3BocmFzZTogdGhpcy5fY2VydENvbmZpZy5wYXNzcGhyYXNlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWdlbnQ7XHJcbiAgICB9XHJcbiAgICBfZ2V0UHJveHkocGFyc2VkVXJsKSB7XHJcbiAgICAgICAgbGV0IHVzaW5nU3NsID0gcGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcclxuICAgICAgICBsZXQgcHJveHlDb25maWcgPSB0aGlzLl9odHRwUHJveHk7XHJcbiAgICAgICAgLy8gZmFsbGJhY2sgdG8gaHR0cF9wcm94eSBhbmQgaHR0cHNfcHJveHkgZW52XHJcbiAgICAgICAgbGV0IGh0dHBzX3Byb3h5ID0gcHJvY2Vzcy5lbnZbRW52aXJvbm1lbnRWYXJpYWJsZXMuSFRUUFNfUFJPWFldO1xyXG4gICAgICAgIGxldCBodHRwX3Byb3h5ID0gcHJvY2Vzcy5lbnZbRW52aXJvbm1lbnRWYXJpYWJsZXMuSFRUUF9QUk9YWV07XHJcbiAgICAgICAgaWYgKCFwcm94eUNvbmZpZykge1xyXG4gICAgICAgICAgICBpZiAoaHR0cHNfcHJveHkgJiYgdXNpbmdTc2wpIHtcclxuICAgICAgICAgICAgICAgIHByb3h5Q29uZmlnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3h5VXJsOiBodHRwc19wcm94eVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChodHRwX3Byb3h5KSB7XHJcbiAgICAgICAgICAgICAgICBwcm94eUNvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBwcm94eVVybDogaHR0cF9wcm94eVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHJveHlVcmw7XHJcbiAgICAgICAgbGV0IHByb3h5QXV0aDtcclxuICAgICAgICBpZiAocHJveHlDb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKHByb3h5Q29uZmlnLnByb3h5VXJsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHByb3h5VXJsID0gdXJsLnBhcnNlKHByb3h5Q29uZmlnLnByb3h5VXJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJveHlDb25maWcucHJveHlVc2VybmFtZSB8fCBwcm94eUNvbmZpZy5wcm94eVBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICBwcm94eUF1dGggPSBwcm94eUNvbmZpZy5wcm94eVVzZXJuYW1lICsgXCI6XCIgKyBwcm94eUNvbmZpZy5wcm94eVBhc3N3b3JkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IHByb3h5VXJsOiBwcm94eVVybCwgcHJveHlBdXRoOiBwcm94eUF1dGggfTtcclxuICAgIH1cclxuICAgIF9pc01hdGNoSW5CeXBhc3NQcm94eUxpc3QocGFyc2VkVXJsKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9odHRwUHJveHlCeXBhc3NIb3N0cykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBieXBhc3MgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9odHRwUHJveHlCeXBhc3NIb3N0cy5mb3JFYWNoKGJ5cGFzc0hvc3QgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYnlwYXNzSG9zdC50ZXN0KHBhcnNlZFVybC5ocmVmKSkge1xyXG4gICAgICAgICAgICAgICAgYnlwYXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBieXBhc3M7XHJcbiAgICB9XHJcbiAgICBfcGVyZm9ybUV4cG9uZW50aWFsQmFja29mZihyZXRyeU51bWJlcikge1xyXG4gICAgICAgIHJldHJ5TnVtYmVyID0gTWF0aC5taW4oRXhwb25lbnRpYWxCYWNrb2ZmQ2VpbGluZywgcmV0cnlOdW1iZXIpO1xyXG4gICAgICAgIGNvbnN0IG1zID0gRXhwb25lbnRpYWxCYWNrb2ZmVGltZVNsaWNlICogTWF0aC5wb3coMiwgcmV0cnlOdW1iZXIpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZSgpLCBtcykpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuSHR0cENsaWVudCA9IEh0dHBDbGllbnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBxcyA9IHJlcXVpcmUoXCJxc1wiKTtcclxuY29uc3QgdXJsID0gcmVxdWlyZShcInVybFwiKTtcclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5jb25zdCB6bGliID0gcmVxdWlyZShcInpsaWJcIik7XHJcbi8qKlxyXG4gKiBjcmVhdGVzIGFuIHVybCBmcm9tIGEgcmVxdWVzdCB1cmwgYW5kIG9wdGlvbmFsIGJhc2UgdXJsIChodHRwOi8vc2VydmVyOjgwODApXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZSAtIGEgZnVsbHkgcXVhbGlmaWVkIHVybCBvciByZWxhdGl2ZSBwYXRoXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVXJsIC0gYW4gb3B0aW9uYWwgYmFzZVVybCAoaHR0cDovL3NlcnZlcjo4MDgwKVxyXG4gKiBAcGFyYW0ge0lSZXF1ZXN0T3B0aW9uc30gb3B0aW9ucyAtIGFuIG9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0LCBjb3VsZCBpbmNsdWRlIFF1ZXJ5UGFyYW1ldGVycyBlLmcuXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gLSByZXN1bHRhbnQgdXJsXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRVcmwocmVzb3VyY2UsIGJhc2VVcmwsIHF1ZXJ5UGFyYW1zKSB7XHJcbiAgICBjb25zdCBwYXRoQXBpID0gcGF0aC5wb3NpeCB8fCBwYXRoO1xyXG4gICAgbGV0IHJlcXVlc3RVcmwgPSAnJztcclxuICAgIGlmICghYmFzZVVybCkge1xyXG4gICAgICAgIHJlcXVlc3RVcmwgPSByZXNvdXJjZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCFyZXNvdXJjZSkge1xyXG4gICAgICAgIHJlcXVlc3RVcmwgPSBiYXNlVXJsO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3QgYmFzZSA9IHVybC5wYXJzZShiYXNlVXJsKTtcclxuICAgICAgICBjb25zdCByZXN1bHRhbnRVcmwgPSB1cmwucGFyc2UocmVzb3VyY2UpO1xyXG4gICAgICAgIC8vIHJlc291cmNlIChzcGVjaWZpYyBwZXIgcmVxdWVzdCkgZWxlbWVudHMgdGFrZSBwcmlvcml0eVxyXG4gICAgICAgIHJlc3VsdGFudFVybC5wcm90b2NvbCA9IHJlc3VsdGFudFVybC5wcm90b2NvbCB8fCBiYXNlLnByb3RvY29sO1xyXG4gICAgICAgIHJlc3VsdGFudFVybC5hdXRoID0gcmVzdWx0YW50VXJsLmF1dGggfHwgYmFzZS5hdXRoO1xyXG4gICAgICAgIHJlc3VsdGFudFVybC5ob3N0ID0gcmVzdWx0YW50VXJsLmhvc3QgfHwgYmFzZS5ob3N0O1xyXG4gICAgICAgIHJlc3VsdGFudFVybC5wYXRobmFtZSA9IHBhdGhBcGkucmVzb2x2ZShiYXNlLnBhdGhuYW1lLCByZXN1bHRhbnRVcmwucGF0aG5hbWUpO1xyXG4gICAgICAgIGlmICghcmVzdWx0YW50VXJsLnBhdGhuYW1lLmVuZHNXaXRoKCcvJykgJiYgcmVzb3VyY2UuZW5kc1dpdGgoJy8nKSkge1xyXG4gICAgICAgICAgICByZXN1bHRhbnRVcmwucGF0aG5hbWUgKz0gJy8nO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0VXJsID0gdXJsLmZvcm1hdChyZXN1bHRhbnRVcmwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHF1ZXJ5UGFyYW1zID9cclxuICAgICAgICBnZXRVcmxXaXRoUGFyc2VkUXVlcnlQYXJhbXMocmVxdWVzdFVybCwgcXVlcnlQYXJhbXMpIDpcclxuICAgICAgICByZXF1ZXN0VXJsO1xyXG59XHJcbmV4cG9ydHMuZ2V0VXJsID0gZ2V0VXJsO1xyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RVcmxcclxuICogQHBhcmFtIHtJUmVxdWVzdFF1ZXJ5UGFyYW1zfSBxdWVyeVBhcmFtc1xyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gUmVxdWVzdCdzIFVSTCB3aXRoIFF1ZXJ5IFBhcmFtZXRlcnMgYXBwZW5kZWQvcGFyc2VkLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0VXJsV2l0aFBhcnNlZFF1ZXJ5UGFyYW1zKHJlcXVlc3RVcmwsIHF1ZXJ5UGFyYW1zKSB7XHJcbiAgICBjb25zdCB1cmwgPSByZXF1ZXN0VXJsLnJlcGxhY2UoL1xcPyQvZywgJycpOyAvLyBDbGVhbiBhbnkgZXh0cmEgZW5kLW9mLXN0cmluZyBcIj9cIiBjaGFyYWN0ZXJcclxuICAgIGNvbnN0IHBhcnNlZFF1ZXJ5UGFyYW1zID0gcXMuc3RyaW5naWZ5KHF1ZXJ5UGFyYW1zLnBhcmFtcywgYnVpbGRQYXJhbXNTdHJpbmdpZnlPcHRpb25zKHF1ZXJ5UGFyYW1zKSk7XHJcbiAgICByZXR1cm4gYCR7dXJsfSR7cGFyc2VkUXVlcnlQYXJhbXN9YDtcclxufVxyXG4vKipcclxuICogQnVpbGQgb3B0aW9ucyBmb3IgUXVlcnlQYXJhbXMgU3RyaW5naWZ5aW5nLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0lSZXF1ZXN0UXVlcnlQYXJhbXN9IHF1ZXJ5UGFyYW1zXHJcbiAqIEByZXR1cm4ge29iamVjdH1cclxuICovXHJcbmZ1bmN0aW9uIGJ1aWxkUGFyYW1zU3RyaW5naWZ5T3B0aW9ucyhxdWVyeVBhcmFtcykge1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgYWRkUXVlcnlQcmVmaXg6IHRydWUsXHJcbiAgICAgICAgZGVsaW1pdGVyOiAocXVlcnlQYXJhbXMub3B0aW9ucyB8fCB7fSkuc2VwYXJhdG9yIHx8ICcmJyxcclxuICAgICAgICBhbGxvd0RvdHM6IChxdWVyeVBhcmFtcy5vcHRpb25zIHx8IHt9KS5zaG91bGRBbGxvd0RvdHMgfHwgZmFsc2UsXHJcbiAgICAgICAgYXJyYXlGb3JtYXQ6IChxdWVyeVBhcmFtcy5vcHRpb25zIHx8IHt9KS5hcnJheUZvcm1hdCB8fCAncmVwZWF0JyxcclxuICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5OiAocXVlcnlQYXJhbXMub3B0aW9ucyB8fCB7fSkuc2hvdWxkT25seUVuY29kZVZhbHVlcyB8fCB0cnVlXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbn1cclxuLyoqXHJcbiAqIERlY29tcHJlc3MvRGVjb2RlIGd6aXAgZW5jb2RlZCBKU09OXHJcbiAqIFVzaW5nIE5vZGUuanMgYnVpbHQtaW4gemxpYiBtb2R1bGVcclxuICpcclxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hhcnNldD8gLSBvcHRpb25hbDsgZGVmYXVsdHMgdG8gJ3V0Zi04J1xyXG4gKiBAcmV0dXJuIHtQcm9taXNlPHN0cmluZz59XHJcbiAqL1xyXG5mdW5jdGlvbiBkZWNvbXByZXNzR3ppcHBlZENvbnRlbnQoYnVmZmVyLCBjaGFyc2V0KSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHpsaWIuZ3VuemlwKGJ1ZmZlciwgZnVuY3Rpb24gKGVycm9yLCBidWZmZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGJ1ZmZlci50b1N0cmluZyhjaGFyc2V0IHx8ICd1dGYtOCcpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5kZWNvbXByZXNzR3ppcHBlZENvbnRlbnQgPSBkZWNvbXByZXNzR3ppcHBlZENvbnRlbnQ7XHJcbi8qKlxyXG4gKiBPYnRhaW4gUmVzcG9uc2UncyBDb250ZW50IENoYXJzZXQuXHJcbiAqIFRocm91Z2ggaW5zcGVjdGluZyBgY29udGVudC10eXBlYCByZXNwb25zZSBoZWFkZXIuXHJcbiAqIEl0IFJldHVybnMgJ3V0Zi04JyBpZiBOTyBjaGFyc2V0IHNwZWNpZmllZC9tYXRjaGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0lIdHRwQ2xpZW50UmVzcG9uc2V9IHJlc3BvbnNlXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gLSBDb250ZW50IEVuY29kaW5nIENoYXJzZXQ7IERlZmF1bHQ9dXRmLThcclxuICovXHJcbmZ1bmN0aW9uIG9idGFpbkNvbnRlbnRDaGFyc2V0KHJlc3BvbnNlKSB7XHJcbiAgICAvLyBGaW5kIHRoZSBjaGFyc2V0LCBpZiBzcGVjaWZpZWQuXHJcbiAgICAvLyBTZWFyY2ggZm9yIHRoZSBgY2hhcnNldD1DSEFSU0VUYCBzdHJpbmcsIG5vdCBpbmNsdWRpbmcgYDssXFxyXFxuYFxyXG4gICAgLy8gRXhhbXBsZTogY29udGVudC10eXBlOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04J1xyXG4gICAgLy8gfF9fIG1hdGNoZXMgd291bGQgYmUgWydjaGFyc2V0PXV0Zi04JywgJ3V0Zi04JywgaW5kZXg6IDE4LCBpbnB1dDogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXVxyXG4gICAgLy8gfF9fX19fIG1hdGNoZXNbMV0gd291bGQgaGF2ZSB0aGUgY2hhcnNldCA6dGFkYTogLCBpbiBvdXIgZXhhbXBsZSBpdCdzIHV0Zi04XHJcbiAgICAvLyBIb3dldmVyLCBpZiB0aGUgbWF0Y2hlcyBBcnJheSB3YXMgZW1wdHkgb3Igbm8gY2hhcnNldCBmb3VuZCwgJ3V0Zi04JyB3b3VsZCBiZSByZXR1cm5lZCBieSBkZWZhdWx0LlxyXG4gICAgY29uc3Qgbm9kZVN1cHBvcnRlZEVuY29kaW5ncyA9IFsnYXNjaWknLCAndXRmOCcsICd1dGYxNmxlJywgJ3VjczInLCAnYmFzZTY0JywgJ2JpbmFyeScsICdoZXgnXTtcclxuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UubWVzc2FnZS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSB8fCAnJztcclxuICAgIGNvbnN0IG1hdGNoZXMgPSBjb250ZW50VHlwZS5tYXRjaCgvY2hhcnNldD0oW147LFxcclxcbl0rKS9pKTtcclxuICAgIHJldHVybiAobWF0Y2hlcyAmJiBtYXRjaGVzWzFdICYmIG5vZGVTdXBwb3J0ZWRFbmNvZGluZ3MuaW5kZXhPZihtYXRjaGVzWzFdKSAhPSAtMSkgPyBtYXRjaGVzWzFdIDogJ3V0Zi04JztcclxufVxyXG5leHBvcnRzLm9idGFpbkNvbnRlbnRDaGFyc2V0ID0gb2J0YWluQ29udGVudENoYXJzZXQ7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvdHVubmVsJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBuZXQgPSByZXF1aXJlKCduZXQnKTtcbnZhciB0bHMgPSByZXF1aXJlKCd0bHMnKTtcbnZhciBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xudmFyIGh0dHBzID0gcmVxdWlyZSgnaHR0cHMnKTtcbnZhciBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG5cbmV4cG9ydHMuaHR0cE92ZXJIdHRwID0gaHR0cE92ZXJIdHRwO1xuZXhwb3J0cy5odHRwc092ZXJIdHRwID0gaHR0cHNPdmVySHR0cDtcbmV4cG9ydHMuaHR0cE92ZXJIdHRwcyA9IGh0dHBPdmVySHR0cHM7XG5leHBvcnRzLmh0dHBzT3Zlckh0dHBzID0gaHR0cHNPdmVySHR0cHM7XG5cblxuZnVuY3Rpb24gaHR0cE92ZXJIdHRwKG9wdGlvbnMpIHtcbiAgdmFyIGFnZW50ID0gbmV3IFR1bm5lbGluZ0FnZW50KG9wdGlvbnMpO1xuICBhZ2VudC5yZXF1ZXN0ID0gaHR0cC5yZXF1ZXN0O1xuICByZXR1cm4gYWdlbnQ7XG59XG5cbmZ1bmN0aW9uIGh0dHBzT3Zlckh0dHAob3B0aW9ucykge1xuICB2YXIgYWdlbnQgPSBuZXcgVHVubmVsaW5nQWdlbnQob3B0aW9ucyk7XG4gIGFnZW50LnJlcXVlc3QgPSBodHRwLnJlcXVlc3Q7XG4gIGFnZW50LmNyZWF0ZVNvY2tldCA9IGNyZWF0ZVNlY3VyZVNvY2tldDtcbiAgYWdlbnQuZGVmYXVsdFBvcnQgPSA0NDM7XG4gIHJldHVybiBhZ2VudDtcbn1cblxuZnVuY3Rpb24gaHR0cE92ZXJIdHRwcyhvcHRpb25zKSB7XG4gIHZhciBhZ2VudCA9IG5ldyBUdW5uZWxpbmdBZ2VudChvcHRpb25zKTtcbiAgYWdlbnQucmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Q7XG4gIHJldHVybiBhZ2VudDtcbn1cblxuZnVuY3Rpb24gaHR0cHNPdmVySHR0cHMob3B0aW9ucykge1xuICB2YXIgYWdlbnQgPSBuZXcgVHVubmVsaW5nQWdlbnQob3B0aW9ucyk7XG4gIGFnZW50LnJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0O1xuICBhZ2VudC5jcmVhdGVTb2NrZXQgPSBjcmVhdGVTZWN1cmVTb2NrZXQ7XG4gIGFnZW50LmRlZmF1bHRQb3J0ID0gNDQzO1xuICByZXR1cm4gYWdlbnQ7XG59XG5cblxuZnVuY3Rpb24gVHVubmVsaW5nQWdlbnQob3B0aW9ucykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHNlbGYub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHNlbGYucHJveHlPcHRpb25zID0gc2VsZi5vcHRpb25zLnByb3h5IHx8IHt9O1xuICBzZWxmLm1heFNvY2tldHMgPSBzZWxmLm9wdGlvbnMubWF4U29ja2V0cyB8fCBodHRwLkFnZW50LmRlZmF1bHRNYXhTb2NrZXRzO1xuICBzZWxmLnJlcXVlc3RzID0gW107XG4gIHNlbGYuc29ja2V0cyA9IFtdO1xuXG4gIHNlbGYub24oJ2ZyZWUnLCBmdW5jdGlvbiBvbkZyZWUoc29ja2V0LCBob3N0LCBwb3J0LCBsb2NhbEFkZHJlc3MpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRvT3B0aW9ucyhob3N0LCBwb3J0LCBsb2NhbEFkZHJlc3MpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzZWxmLnJlcXVlc3RzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB2YXIgcGVuZGluZyA9IHNlbGYucmVxdWVzdHNbaV07XG4gICAgICBpZiAocGVuZGluZy5ob3N0ID09PSBvcHRpb25zLmhvc3QgJiYgcGVuZGluZy5wb3J0ID09PSBvcHRpb25zLnBvcnQpIHtcbiAgICAgICAgLy8gRGV0ZWN0IHRoZSByZXF1ZXN0IHRvIGNvbm5lY3Qgc2FtZSBvcmlnaW4gc2VydmVyLFxuICAgICAgICAvLyByZXVzZSB0aGUgY29ubmVjdGlvbi5cbiAgICAgICAgc2VsZi5yZXF1ZXN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHBlbmRpbmcucmVxdWVzdC5vblNvY2tldChzb2NrZXQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHNvY2tldC5kZXN0cm95KCk7XG4gICAgc2VsZi5yZW1vdmVTb2NrZXQoc29ja2V0KTtcbiAgfSk7XG59XG51dGlsLmluaGVyaXRzKFR1bm5lbGluZ0FnZW50LCBldmVudHMuRXZlbnRFbWl0dGVyKTtcblxuVHVubmVsaW5nQWdlbnQucHJvdG90eXBlLmFkZFJlcXVlc3QgPSBmdW5jdGlvbiBhZGRSZXF1ZXN0KHJlcSwgaG9zdCwgcG9ydCwgbG9jYWxBZGRyZXNzKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoe3JlcXVlc3Q6IHJlcX0sIHNlbGYub3B0aW9ucywgdG9PcHRpb25zKGhvc3QsIHBvcnQsIGxvY2FsQWRkcmVzcykpO1xuXG4gIGlmIChzZWxmLnNvY2tldHMubGVuZ3RoID49IHRoaXMubWF4U29ja2V0cykge1xuICAgIC8vIFdlIGFyZSBvdmVyIGxpbWl0IHNvIHdlJ2xsIGFkZCBpdCB0byB0aGUgcXVldWUuXG4gICAgc2VsZi5yZXF1ZXN0cy5wdXNoKG9wdGlvbnMpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIElmIHdlIGFyZSB1bmRlciBtYXhTb2NrZXRzIGNyZWF0ZSBhIG5ldyBvbmUuXG4gIHNlbGYuY3JlYXRlU29ja2V0KG9wdGlvbnMsIGZ1bmN0aW9uKHNvY2tldCkge1xuICAgIHNvY2tldC5vbignZnJlZScsIG9uRnJlZSk7XG4gICAgc29ja2V0Lm9uKCdjbG9zZScsIG9uQ2xvc2VPclJlbW92ZSk7XG4gICAgc29ja2V0Lm9uKCdhZ2VudFJlbW92ZScsIG9uQ2xvc2VPclJlbW92ZSk7XG4gICAgcmVxLm9uU29ja2V0KHNvY2tldCk7XG5cbiAgICBmdW5jdGlvbiBvbkZyZWUoKSB7XG4gICAgICBzZWxmLmVtaXQoJ2ZyZWUnLCBzb2NrZXQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2xvc2VPclJlbW92ZShlcnIpIHtcbiAgICAgIHNlbGYucmVtb3ZlU29ja2V0KHNvY2tldCk7XG4gICAgICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2ZyZWUnLCBvbkZyZWUpO1xuICAgICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uQ2xvc2VPclJlbW92ZSk7XG4gICAgICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2FnZW50UmVtb3ZlJywgb25DbG9zZU9yUmVtb3ZlKTtcbiAgICB9XG4gIH0pO1xufTtcblxuVHVubmVsaW5nQWdlbnQucHJvdG90eXBlLmNyZWF0ZVNvY2tldCA9IGZ1bmN0aW9uIGNyZWF0ZVNvY2tldChvcHRpb25zLCBjYikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBwbGFjZWhvbGRlciA9IHt9O1xuICBzZWxmLnNvY2tldHMucHVzaChwbGFjZWhvbGRlcik7XG5cbiAgdmFyIGNvbm5lY3RPcHRpb25zID0gbWVyZ2VPcHRpb25zKHt9LCBzZWxmLnByb3h5T3B0aW9ucywge1xuICAgIG1ldGhvZDogJ0NPTk5FQ1QnLFxuICAgIHBhdGg6IG9wdGlvbnMuaG9zdCArICc6JyArIG9wdGlvbnMucG9ydCxcbiAgICBhZ2VudDogZmFsc2UsXG4gICAgaGVhZGVyczoge1xuICAgICAgaG9zdDogb3B0aW9ucy5ob3N0ICsgJzonICsgb3B0aW9ucy5wb3J0XG4gICAgfVxuICB9KTtcbiAgaWYgKG9wdGlvbnMubG9jYWxBZGRyZXNzKSB7XG4gICAgY29ubmVjdE9wdGlvbnMubG9jYWxBZGRyZXNzID0gb3B0aW9ucy5sb2NhbEFkZHJlc3M7XG4gIH1cbiAgaWYgKGNvbm5lY3RPcHRpb25zLnByb3h5QXV0aCkge1xuICAgIGNvbm5lY3RPcHRpb25zLmhlYWRlcnMgPSBjb25uZWN0T3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuICAgIGNvbm5lY3RPcHRpb25zLmhlYWRlcnNbJ1Byb3h5LUF1dGhvcml6YXRpb24nXSA9ICdCYXNpYyAnICtcbiAgICAgICAgbmV3IEJ1ZmZlcihjb25uZWN0T3B0aW9ucy5wcm94eUF1dGgpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgfVxuXG4gIGRlYnVnKCdtYWtpbmcgQ09OTkVDVCByZXF1ZXN0Jyk7XG4gIHZhciBjb25uZWN0UmVxID0gc2VsZi5yZXF1ZXN0KGNvbm5lY3RPcHRpb25zKTtcbiAgY29ubmVjdFJlcS51c2VDaHVua2VkRW5jb2RpbmdCeURlZmF1bHQgPSBmYWxzZTsgLy8gZm9yIHYwLjZcbiAgY29ubmVjdFJlcS5vbmNlKCdyZXNwb25zZScsIG9uUmVzcG9uc2UpOyAvLyBmb3IgdjAuNlxuICBjb25uZWN0UmVxLm9uY2UoJ3VwZ3JhZGUnLCBvblVwZ3JhZGUpOyAgIC8vIGZvciB2MC42XG4gIGNvbm5lY3RSZXEub25jZSgnY29ubmVjdCcsIG9uQ29ubmVjdCk7ICAgLy8gZm9yIHYwLjcgb3IgbGF0ZXJcbiAgY29ubmVjdFJlcS5vbmNlKCdlcnJvcicsIG9uRXJyb3IpO1xuICBjb25uZWN0UmVxLmVuZCgpO1xuXG4gIGZ1bmN0aW9uIG9uUmVzcG9uc2UocmVzKSB7XG4gICAgLy8gVmVyeSBoYWNreS4gVGhpcyBpcyBuZWNlc3NhcnkgdG8gYXZvaWQgaHR0cC1wYXJzZXIgbGVha3MuXG4gICAgcmVzLnVwZ3JhZGUgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gb25VcGdyYWRlKHJlcywgc29ja2V0LCBoZWFkKSB7XG4gICAgLy8gSGFja3kuXG4gICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgIG9uQ29ubmVjdChyZXMsIHNvY2tldCwgaGVhZCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbm5lY3QocmVzLCBzb2NrZXQsIGhlYWQpIHtcbiAgICBjb25uZWN0UmVxLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIHNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblxuICAgIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICBkZWJ1ZygndHVubmVsaW5nIHNvY2tldCBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQsIHN0YXR1c0NvZGU9JWQnLFxuICAgICAgICByZXMuc3RhdHVzQ29kZSk7XG4gICAgICBzb2NrZXQuZGVzdHJveSgpO1xuICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCd0dW5uZWxpbmcgc29ja2V0IGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCwgJyArXG4gICAgICAgICdzdGF0dXNDb2RlPScgKyByZXMuc3RhdHVzQ29kZSk7XG4gICAgICBlcnJvci5jb2RlID0gJ0VDT05OUkVTRVQnO1xuICAgICAgb3B0aW9ucy5yZXF1ZXN0LmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgc2VsZi5yZW1vdmVTb2NrZXQocGxhY2Vob2xkZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaGVhZC5sZW5ndGggPiAwKSB7XG4gICAgICBkZWJ1ZygnZ290IGlsbGVnYWwgcmVzcG9uc2UgYm9keSBmcm9tIHByb3h5Jyk7XG4gICAgICBzb2NrZXQuZGVzdHJveSgpO1xuICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCdnb3QgaWxsZWdhbCByZXNwb25zZSBib2R5IGZyb20gcHJveHknKTtcbiAgICAgIGVycm9yLmNvZGUgPSAnRUNPTk5SRVNFVCc7XG4gICAgICBvcHRpb25zLnJlcXVlc3QuZW1pdCgnZXJyb3InLCBlcnJvcik7XG4gICAgICBzZWxmLnJlbW92ZVNvY2tldChwbGFjZWhvbGRlcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlYnVnKCd0dW5uZWxpbmcgY29ubmVjdGlvbiBoYXMgZXN0YWJsaXNoZWQnKTtcbiAgICBzZWxmLnNvY2tldHNbc2VsZi5zb2NrZXRzLmluZGV4T2YocGxhY2Vob2xkZXIpXSA9IHNvY2tldDtcbiAgICByZXR1cm4gY2Ioc29ja2V0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRXJyb3IoY2F1c2UpIHtcbiAgICBjb25uZWN0UmVxLnJlbW92ZUFsbExpc3RlbmVycygpO1xuXG4gICAgZGVidWcoJ3R1bm5lbGluZyBzb2NrZXQgY291bGQgbm90IGJlIGVzdGFibGlzaGVkLCBjYXVzZT0lc1xcbicsXG4gICAgICAgICAgY2F1c2UubWVzc2FnZSwgY2F1c2Uuc3RhY2spO1xuICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigndHVubmVsaW5nIHNvY2tldCBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnY2F1c2U9JyArIGNhdXNlLm1lc3NhZ2UpO1xuICAgIGVycm9yLmNvZGUgPSAnRUNPTk5SRVNFVCc7XG4gICAgb3B0aW9ucy5yZXF1ZXN0LmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuICAgIHNlbGYucmVtb3ZlU29ja2V0KHBsYWNlaG9sZGVyKTtcbiAgfVxufTtcblxuVHVubmVsaW5nQWdlbnQucHJvdG90eXBlLnJlbW92ZVNvY2tldCA9IGZ1bmN0aW9uIHJlbW92ZVNvY2tldChzb2NrZXQpIHtcbiAgdmFyIHBvcyA9IHRoaXMuc29ja2V0cy5pbmRleE9mKHNvY2tldClcbiAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5zb2NrZXRzLnNwbGljZShwb3MsIDEpO1xuXG4gIHZhciBwZW5kaW5nID0gdGhpcy5yZXF1ZXN0cy5zaGlmdCgpO1xuICBpZiAocGVuZGluZykge1xuICAgIC8vIElmIHdlIGhhdmUgcGVuZGluZyByZXF1ZXN0cyBhbmQgYSBzb2NrZXQgZ2V0cyBjbG9zZWQgYSBuZXcgb25lXG4gICAgLy8gbmVlZHMgdG8gYmUgY3JlYXRlZCB0byB0YWtlIG92ZXIgaW4gdGhlIHBvb2wgZm9yIHRoZSBvbmUgdGhhdCBjbG9zZWQuXG4gICAgdGhpcy5jcmVhdGVTb2NrZXQocGVuZGluZywgZnVuY3Rpb24oc29ja2V0KSB7XG4gICAgICBwZW5kaW5nLnJlcXVlc3Qub25Tb2NrZXQoc29ja2V0KTtcbiAgICB9KTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlU2VjdXJlU29ja2V0KG9wdGlvbnMsIGNiKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgVHVubmVsaW5nQWdlbnQucHJvdG90eXBlLmNyZWF0ZVNvY2tldC5jYWxsKHNlbGYsIG9wdGlvbnMsIGZ1bmN0aW9uKHNvY2tldCkge1xuICAgIHZhciBob3N0SGVhZGVyID0gb3B0aW9ucy5yZXF1ZXN0LmdldEhlYWRlcignaG9zdCcpO1xuICAgIHZhciB0bHNPcHRpb25zID0gbWVyZ2VPcHRpb25zKHt9LCBzZWxmLm9wdGlvbnMsIHtcbiAgICAgIHNvY2tldDogc29ja2V0LFxuICAgICAgc2VydmVybmFtZTogaG9zdEhlYWRlciA/IGhvc3RIZWFkZXIucmVwbGFjZSgvOi4qJC8sICcnKSA6IG9wdGlvbnMuaG9zdFxuICAgIH0pO1xuXG4gICAgLy8gMCBpcyBkdW1teSBwb3J0IGZvciB2MC42XG4gICAgdmFyIHNlY3VyZVNvY2tldCA9IHRscy5jb25uZWN0KDAsIHRsc09wdGlvbnMpO1xuICAgIHNlbGYuc29ja2V0c1tzZWxmLnNvY2tldHMuaW5kZXhPZihzb2NrZXQpXSA9IHNlY3VyZVNvY2tldDtcbiAgICBjYihzZWN1cmVTb2NrZXQpO1xuICB9KTtcbn1cblxuXG5mdW5jdGlvbiB0b09wdGlvbnMoaG9zdCwgcG9ydCwgbG9jYWxBZGRyZXNzKSB7XG4gIGlmICh0eXBlb2YgaG9zdCA9PT0gJ3N0cmluZycpIHsgLy8gc2luY2UgdjAuMTBcbiAgICByZXR1cm4ge1xuICAgICAgaG9zdDogaG9zdCxcbiAgICAgIHBvcnQ6IHBvcnQsXG4gICAgICBsb2NhbEFkZHJlc3M6IGxvY2FsQWRkcmVzc1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGhvc3Q7IC8vIGZvciB2MC4xMSBvciBsYXRlclxufVxuXG5mdW5jdGlvbiBtZXJnZU9wdGlvbnModGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgb3ZlcnJpZGVzID0gYXJndW1lbnRzW2ldO1xuICAgIGlmICh0eXBlb2Ygb3ZlcnJpZGVzID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvdmVycmlkZXMpO1xuICAgICAgZm9yICh2YXIgaiA9IDAsIGtleUxlbiA9IGtleXMubGVuZ3RoOyBqIDwga2V5TGVuOyArK2opIHtcbiAgICAgICAgdmFyIGsgPSBrZXlzW2pdO1xuICAgICAgICBpZiAob3ZlcnJpZGVzW2tdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0YXJnZXRba10gPSBvdmVycmlkZXNba107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuXG52YXIgZGVidWc7XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyAmJiAvXFxidHVubmVsXFxiLy50ZXN0KHByb2Nlc3MuZW52Lk5PREVfREVCVUcpKSB7XG4gIGRlYnVnID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGFyZ3NbMF0gPSAnVFVOTkVMOiAnICsgYXJnc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJncy51bnNoaWZ0KCdUVU5ORUw6Jyk7XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gIH1cbn0gZWxzZSB7XG4gIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbn1cbmV4cG9ydHMuZGVidWcgPSBkZWJ1ZzsgLy8gZm9yIHRlc3RcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzc2VydFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5ldFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRsc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dGlsXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ6bGliXCIpOzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIG1vZHVsZSBleHBvcnRzIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBydW50aW1lIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbnJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdGFza3MvZ2l0dmVyc2lvbi9zZXR1cC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=