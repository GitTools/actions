/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/inversify/es/annotation/decorator_utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/es/annotation/decorator_utils.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decorate": () => (/* binding */ decorate),
/* harmony export */   "tagParameter": () => (/* binding */ tagParameter),
/* harmony export */   "tagProperty": () => (/* binding */ tagProperty),
/* harmony export */   "createTaggedDecorator": () => (/* binding */ createTaggedDecorator)
/* harmony export */ });
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/js */ "./node_modules/inversify/es/utils/js.js");



function targetIsConstructorFunction(target) {
    return target.prototype !== undefined;
}
function _throwIfMethodParameter(parameterName) {
    if (parameterName !== undefined) {
        throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.INVALID_DECORATOR_OPERATION);
    }
}
function tagParameter(annotationTarget, parameterName, parameterIndex, metadata) {
    _throwIfMethodParameter(parameterName);
    _tagParameterOrProperty(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.TAGGED, annotationTarget, parameterIndex.toString(), metadata);
}
function tagProperty(annotationTarget, propertyName, metadata) {
    if (targetIsConstructorFunction(annotationTarget)) {
        throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.INVALID_DECORATOR_OPERATION);
    }
    _tagParameterOrProperty(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.TAGGED_PROP, annotationTarget.constructor, propertyName, metadata);
}
function _ensureNoMetadataKeyDuplicates(metadata) {
    var metadatas = [];
    if (Array.isArray(metadata)) {
        metadatas = metadata;
        var duplicate = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getFirstArrayDuplicate)(metadatas.map(function (md) { return md.key; }));
        if (duplicate !== undefined) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.DUPLICATED_METADATA + " " + duplicate.toString());
        }
    }
    else {
        metadatas = [metadata];
    }
    return metadatas;
}
function _tagParameterOrProperty(metadataKey, annotationTarget, key, metadata) {
    var metadatas = _ensureNoMetadataKeyDuplicates(metadata);
    var paramsOrPropertiesMetadata = {};
    if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
        paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
    }
    var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
    if (paramOrPropertyMetadata === undefined) {
        paramOrPropertyMetadata = [];
    }
    else {
        var _loop_1 = function (m) {
            if (metadatas.some(function (md) { return md.key === m.key; })) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.DUPLICATED_METADATA + " " + m.key.toString());
            }
        };
        for (var _i = 0, paramOrPropertyMetadata_1 = paramOrPropertyMetadata; _i < paramOrPropertyMetadata_1.length; _i++) {
            var m = paramOrPropertyMetadata_1[_i];
            _loop_1(m);
        }
    }
    paramOrPropertyMetadata.push.apply(paramOrPropertyMetadata, metadatas);
    paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
    Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
}
function createTaggedDecorator(metadata) {
    return function (target, targetKey, indexOrPropertyDescriptor) {
        if (typeof indexOrPropertyDescriptor === "number") {
            tagParameter(target, targetKey, indexOrPropertyDescriptor, metadata);
        }
        else {
            tagProperty(target, targetKey, metadata);
        }
    };
}
function _decorate(decorators, target) {
    Reflect.decorate(decorators, target);
}
function _param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
}
function decorate(decorator, target, parameterIndexOrProperty) {
    if (typeof parameterIndexOrProperty === "number") {
        _decorate([_param(parameterIndexOrProperty, decorator)], target);
    }
    else if (typeof parameterIndexOrProperty === "string") {
        Reflect.decorate([decorator], target, parameterIndexOrProperty);
    }
    else {
        _decorate([decorator], target);
    }
}

//# sourceMappingURL=decorator_utils.js.map

/***/ }),

/***/ "./node_modules/inversify/es/annotation/inject.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/es/annotation/inject.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inject": () => (/* binding */ inject)
/* harmony export */ });
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _inject_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inject_base */ "./node_modules/inversify/es/annotation/inject_base.js");


var inject = (0,_inject_base__WEBPACK_IMPORTED_MODULE_0__.injectBase)(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.INJECT_TAG);

//# sourceMappingURL=inject.js.map

/***/ }),

/***/ "./node_modules/inversify/es/annotation/inject_base.js":
/*!*************************************************************!*\
  !*** ./node_modules/inversify/es/annotation/inject_base.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "injectBase": () => (/* binding */ injectBase)
/* harmony export */ });
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");
/* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/es/planning/metadata.js");
/* harmony import */ var _decorator_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/es/annotation/decorator_utils.js");



function injectBase(metadataKey) {
    return function (serviceIdentifier) {
        return function (target, targetKey, indexOrPropertyDescriptor) {
            if (serviceIdentifier === undefined) {
                var className = typeof target === "function" ? target.name : target.constructor.name;
                throw new Error((0,_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.UNDEFINED_INJECT_ANNOTATION)(className));
            }
            return (0,_decorator_utils__WEBPACK_IMPORTED_MODULE_1__.createTaggedDecorator)(new _planning_metadata__WEBPACK_IMPORTED_MODULE_2__.Metadata(metadataKey, serviceIdentifier))(target, targetKey, indexOrPropertyDescriptor);
        };
    };
}
//# sourceMappingURL=inject_base.js.map

/***/ }),

/***/ "./node_modules/inversify/es/annotation/injectable.js":
/*!************************************************************!*\
  !*** ./node_modules/inversify/es/annotation/injectable.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "injectable": () => (/* binding */ injectable)
/* harmony export */ });
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");


function injectable() {
    return function (target) {
        if (Reflect.hasOwnMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.PARAM_TYPES, target)) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_1__.DUPLICATED_INJECTABLE_DECORATOR);
        }
        var types = Reflect.getMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.DESIGN_PARAM_TYPES, target) || [];
        Reflect.defineMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.PARAM_TYPES, types, target);
        return target;
    };
}

//# sourceMappingURL=injectable.js.map

/***/ }),

/***/ "./node_modules/inversify/es/annotation/lazy_service_identifier.js":
/*!*************************************************************************!*\
  !*** ./node_modules/inversify/es/annotation/lazy_service_identifier.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LazyServiceIdentifer": () => (/* binding */ LazyServiceIdentifer)
/* harmony export */ });
var LazyServiceIdentifer = (function () {
    function LazyServiceIdentifer(cb) {
        this._cb = cb;
    }
    LazyServiceIdentifer.prototype.unwrap = function () {
        return this._cb();
    };
    return LazyServiceIdentifer;
}());

//# sourceMappingURL=lazy_service_identifier.js.map

/***/ }),

/***/ "./node_modules/inversify/es/annotation/multi_inject.js":
/*!**************************************************************!*\
  !*** ./node_modules/inversify/es/annotation/multi_inject.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "multiInject": () => (/* binding */ multiInject)
/* harmony export */ });
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _inject_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inject_base */ "./node_modules/inversify/es/annotation/inject_base.js");


var multiInject = (0,_inject_base__WEBPACK_IMPORTED_MODULE_0__.injectBase)(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.MULTI_INJECT_TAG);

//# sourceMappingURL=multi_inject.js.map

/***/ }),

/***/ "./node_modules/inversify/es/annotation/named.js":
/*!*******************************************************!*\
  !*** ./node_modules/inversify/es/annotation/named.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "named": () => (/* binding */ named)
/* harmony export */ });
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/es/planning/metadata.js");
/* harmony import */ var _decorator_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/es/annotation/decorator_utils.js");



function named(name) {
    return (0,_decorator_utils__WEBPACK_IMPORTED_MODULE_0__.createTaggedDecorator)(new _planning_metadata__WEBPACK_IMPORTED_MODULE_1__.Metadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__.NAMED_TAG, name));
}

//# sourceMappingURL=named.js.map

/***/ }),

/***/ "./node_modules/inversify/es/annotation/optional.js":
/*!**********************************************************!*\
  !*** ./node_modules/inversify/es/annotation/optional.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "optional": () => (/* binding */ optional)
/* harmony export */ });
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/es/planning/metadata.js");
/* harmony import */ var _decorator_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/es/annotation/decorator_utils.js");



function optional() {
    return (0,_decorator_utils__WEBPACK_IMPORTED_MODULE_0__.createTaggedDecorator)(new _planning_metadata__WEBPACK_IMPORTED_MODULE_1__.Metadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__.OPTIONAL_TAG, true));
}

//# sourceMappingURL=optional.js.map

/***/ }),

/***/ "./node_modules/inversify/es/annotation/post_construct.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/es/annotation/post_construct.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postConstruct": () => (/* binding */ postConstruct)
/* harmony export */ });
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _property_event_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./property_event_decorator */ "./node_modules/inversify/es/annotation/property_event_decorator.js");



var postConstruct = (0,_property_event_decorator__WEBPACK_IMPORTED_MODULE_0__.propertyEventDecorator)(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.POST_CONSTRUCT, _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__.MULTIPLE_POST_CONSTRUCT_METHODS);

//# sourceMappingURL=post_construct.js.map

/***/ }),

/***/ "./node_modules/inversify/es/annotation/pre_destroy.js":
/*!*************************************************************!*\
  !*** ./node_modules/inversify/es/annotation/pre_destroy.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "preDestroy": () => (/* binding */ preDestroy)
/* harmony export */ });
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _property_event_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./property_event_decorator */ "./node_modules/inversify/es/annotation/property_event_decorator.js");



var preDestroy = (0,_property_event_decorator__WEBPACK_IMPORTED_MODULE_0__.propertyEventDecorator)(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.PRE_DESTROY, _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__.MULTIPLE_PRE_DESTROY_METHODS);

//# sourceMappingURL=pre_destroy.js.map

/***/ }),

/***/ "./node_modules/inversify/es/annotation/property_event_decorator.js":
/*!**************************************************************************!*\
  !*** ./node_modules/inversify/es/annotation/property_event_decorator.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "propertyEventDecorator": () => (/* binding */ propertyEventDecorator)
/* harmony export */ });
/* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/es/planning/metadata.js");

function propertyEventDecorator(eventKey, errorMessage) {
    return function () {
        return function (target, propertyKey) {
            var metadata = new _planning_metadata__WEBPACK_IMPORTED_MODULE_0__.Metadata(eventKey, propertyKey);
            if (Reflect.hasOwnMetadata(eventKey, target.constructor)) {
                throw new Error(errorMessage);
            }
            Reflect.defineMetadata(eventKey, metadata, target.constructor);
        };
    };
}

//# sourceMappingURL=property_event_decorator.js.map

/***/ }),

/***/ "./node_modules/inversify/es/annotation/tagged.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/es/annotation/tagged.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tagged": () => (/* binding */ tagged)
/* harmony export */ });
/* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/es/planning/metadata.js");
/* harmony import */ var _decorator_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/es/annotation/decorator_utils.js");


function tagged(metadataKey, metadataValue) {
    return (0,_decorator_utils__WEBPACK_IMPORTED_MODULE_0__.createTaggedDecorator)(new _planning_metadata__WEBPACK_IMPORTED_MODULE_1__.Metadata(metadataKey, metadataValue));
}

//# sourceMappingURL=tagged.js.map

/***/ }),

/***/ "./node_modules/inversify/es/annotation/target_name.js":
/*!*************************************************************!*\
  !*** ./node_modules/inversify/es/annotation/target_name.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "targetName": () => (/* binding */ targetName)
/* harmony export */ });
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/es/planning/metadata.js");
/* harmony import */ var _decorator_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/es/annotation/decorator_utils.js");



function targetName(name) {
    return function (target, targetKey, index) {
        var metadata = new _planning_metadata__WEBPACK_IMPORTED_MODULE_0__.Metadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.NAME_TAG, name);
        (0,_decorator_utils__WEBPACK_IMPORTED_MODULE_2__.tagParameter)(target, targetKey, index, metadata);
    };
}

//# sourceMappingURL=target_name.js.map

/***/ }),

/***/ "./node_modules/inversify/es/annotation/unmanaged.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/es/annotation/unmanaged.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unmanaged": () => (/* binding */ unmanaged)
/* harmony export */ });
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/es/planning/metadata.js");
/* harmony import */ var _decorator_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/es/annotation/decorator_utils.js");



function unmanaged() {
    return function (target, targetKey, index) {
        var metadata = new _planning_metadata__WEBPACK_IMPORTED_MODULE_0__.Metadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.UNMANAGED_TAG, true);
        (0,_decorator_utils__WEBPACK_IMPORTED_MODULE_2__.tagParameter)(target, targetKey, index, metadata);
    };
}

//# sourceMappingURL=unmanaged.js.map

/***/ }),

/***/ "./node_modules/inversify/es/bindings/binding.js":
/*!*******************************************************!*\
  !*** ./node_modules/inversify/es/bindings/binding.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Binding": () => (/* binding */ Binding)
/* harmony export */ });
/* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/es/constants/literal_types.js");
/* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/es/utils/id.js");


var Binding = (function () {
    function Binding(serviceIdentifier, scope) {
        this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_0__.id)();
        this.activated = false;
        this.serviceIdentifier = serviceIdentifier;
        this.scope = scope;
        this.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingTypeEnum.Invalid;
        this.constraint = function (request) { return true; };
        this.implementationType = null;
        this.cache = null;
        this.factory = null;
        this.provider = null;
        this.onActivation = null;
        this.onDeactivation = null;
        this.dynamicValue = null;
    }
    Binding.prototype.clone = function () {
        var clone = new Binding(this.serviceIdentifier, this.scope);
        clone.activated = (clone.scope === _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingScopeEnum.Singleton) ? this.activated : false;
        clone.implementationType = this.implementationType;
        clone.dynamicValue = this.dynamicValue;
        clone.scope = this.scope;
        clone.type = this.type;
        clone.factory = this.factory;
        clone.provider = this.provider;
        clone.constraint = this.constraint;
        clone.onActivation = this.onActivation;
        clone.onDeactivation = this.onDeactivation;
        clone.cache = this.cache;
        return clone;
    };
    return Binding;
}());

//# sourceMappingURL=binding.js.map

/***/ }),

/***/ "./node_modules/inversify/es/bindings/binding_count.js":
/*!*************************************************************!*\
  !*** ./node_modules/inversify/es/bindings/binding_count.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BindingCount": () => (/* binding */ BindingCount)
/* harmony export */ });
var BindingCount = {
    MultipleBindingsAvailable: 2,
    NoBindingsAvailable: 0,
    OnlyOneBindingAvailable: 1
};

//# sourceMappingURL=binding_count.js.map

/***/ }),

/***/ "./node_modules/inversify/es/constants/error_msgs.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/es/constants/error_msgs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DUPLICATED_INJECTABLE_DECORATOR": () => (/* binding */ DUPLICATED_INJECTABLE_DECORATOR),
/* harmony export */   "DUPLICATED_METADATA": () => (/* binding */ DUPLICATED_METADATA),
/* harmony export */   "NULL_ARGUMENT": () => (/* binding */ NULL_ARGUMENT),
/* harmony export */   "KEY_NOT_FOUND": () => (/* binding */ KEY_NOT_FOUND),
/* harmony export */   "AMBIGUOUS_MATCH": () => (/* binding */ AMBIGUOUS_MATCH),
/* harmony export */   "CANNOT_UNBIND": () => (/* binding */ CANNOT_UNBIND),
/* harmony export */   "NOT_REGISTERED": () => (/* binding */ NOT_REGISTERED),
/* harmony export */   "MISSING_INJECTABLE_ANNOTATION": () => (/* binding */ MISSING_INJECTABLE_ANNOTATION),
/* harmony export */   "MISSING_INJECT_ANNOTATION": () => (/* binding */ MISSING_INJECT_ANNOTATION),
/* harmony export */   "UNDEFINED_INJECT_ANNOTATION": () => (/* binding */ UNDEFINED_INJECT_ANNOTATION),
/* harmony export */   "CIRCULAR_DEPENDENCY": () => (/* binding */ CIRCULAR_DEPENDENCY),
/* harmony export */   "NOT_IMPLEMENTED": () => (/* binding */ NOT_IMPLEMENTED),
/* harmony export */   "INVALID_BINDING_TYPE": () => (/* binding */ INVALID_BINDING_TYPE),
/* harmony export */   "NO_MORE_SNAPSHOTS_AVAILABLE": () => (/* binding */ NO_MORE_SNAPSHOTS_AVAILABLE),
/* harmony export */   "INVALID_MIDDLEWARE_RETURN": () => (/* binding */ INVALID_MIDDLEWARE_RETURN),
/* harmony export */   "INVALID_FUNCTION_BINDING": () => (/* binding */ INVALID_FUNCTION_BINDING),
/* harmony export */   "LAZY_IN_SYNC": () => (/* binding */ LAZY_IN_SYNC),
/* harmony export */   "INVALID_TO_SELF_VALUE": () => (/* binding */ INVALID_TO_SELF_VALUE),
/* harmony export */   "INVALID_DECORATOR_OPERATION": () => (/* binding */ INVALID_DECORATOR_OPERATION),
/* harmony export */   "ARGUMENTS_LENGTH_MISMATCH": () => (/* binding */ ARGUMENTS_LENGTH_MISMATCH),
/* harmony export */   "CONTAINER_OPTIONS_MUST_BE_AN_OBJECT": () => (/* binding */ CONTAINER_OPTIONS_MUST_BE_AN_OBJECT),
/* harmony export */   "CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE": () => (/* binding */ CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE),
/* harmony export */   "CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE": () => (/* binding */ CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE),
/* harmony export */   "CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK": () => (/* binding */ CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK),
/* harmony export */   "MULTIPLE_PRE_DESTROY_METHODS": () => (/* binding */ MULTIPLE_PRE_DESTROY_METHODS),
/* harmony export */   "MULTIPLE_POST_CONSTRUCT_METHODS": () => (/* binding */ MULTIPLE_POST_CONSTRUCT_METHODS),
/* harmony export */   "ASYNC_UNBIND_REQUIRED": () => (/* binding */ ASYNC_UNBIND_REQUIRED),
/* harmony export */   "POST_CONSTRUCT_ERROR": () => (/* binding */ POST_CONSTRUCT_ERROR),
/* harmony export */   "PRE_DESTROY_ERROR": () => (/* binding */ PRE_DESTROY_ERROR),
/* harmony export */   "ON_DEACTIVATION_ERROR": () => (/* binding */ ON_DEACTIVATION_ERROR),
/* harmony export */   "CIRCULAR_DEPENDENCY_IN_FACTORY": () => (/* binding */ CIRCULAR_DEPENDENCY_IN_FACTORY),
/* harmony export */   "STACK_OVERFLOW": () => (/* binding */ STACK_OVERFLOW)
/* harmony export */ });
var DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
var DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
var NULL_ARGUMENT = "NULL argument";
var KEY_NOT_FOUND = "Key Not Found";
var AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
var CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
var NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
var MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
var MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
var UNDEFINED_INJECT_ANNOTATION = function (name) {
    return "@inject called with undefined this could mean that the class " + name + " has " +
        "a circular dependency problem. You can use a LazyServiceIdentifer to  " +
        "overcome this limitation.";
};
var CIRCULAR_DEPENDENCY = "Circular dependency found:";
var NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
var INVALID_BINDING_TYPE = "Invalid binding type:";
var NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
var INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
var INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
var LAZY_IN_SYNC = function (key) { return "You are attempting to construct '" + key + "' in a synchronous way\n but it has asynchronous dependencies."; };
var INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " +
    "used as service identifier";
var INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " +
    "must be applied to the parameters of a class constructor or a class property.";
var ARGUMENTS_LENGTH_MISMATCH = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "The number of constructor arguments in the derived class " +
        (values[0] + " must be >= than the number of constructor arguments of its base class.");
};
var CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " +
    "must be an object.";
var CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " +
    "be a string ('singleton' or 'transient').";
var CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must " +
    "be a boolean";
var CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must " +
    "be a boolean";
var MULTIPLE_PRE_DESTROY_METHODS = "Cannot apply @preDestroy decorator multiple times in the same class";
var MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
var ASYNC_UNBIND_REQUIRED = "Attempting to unbind dependency with asynchronous destruction (@preDestroy or onDeactivation)";
var POST_CONSTRUCT_ERROR = function (clazz, errorMessage) { return "@postConstruct error in class " + clazz + ": " + errorMessage; };
var PRE_DESTROY_ERROR = function (clazz, errorMessage) { return "@preDestroy error in class " + clazz + ": " + errorMessage; };
var ON_DEACTIVATION_ERROR = function (clazz, errorMessage) { return "onDeactivation() error in class " + clazz + ": " + errorMessage; };
var CIRCULAR_DEPENDENCY_IN_FACTORY = function (factoryType, serviceIdentifier) {
    return "It looks like there is a circular dependency in one of the '" + factoryType + "' bindings. Please investigate bindings with" +
        ("service identifier '" + serviceIdentifier + "'.");
};
var STACK_OVERFLOW = "Maximum call stack size exceeded";
//# sourceMappingURL=error_msgs.js.map

/***/ }),

/***/ "./node_modules/inversify/es/constants/literal_types.js":
/*!**************************************************************!*\
  !*** ./node_modules/inversify/es/constants/literal_types.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BindingScopeEnum": () => (/* binding */ BindingScopeEnum),
/* harmony export */   "BindingTypeEnum": () => (/* binding */ BindingTypeEnum),
/* harmony export */   "TargetTypeEnum": () => (/* binding */ TargetTypeEnum)
/* harmony export */ });
var BindingScopeEnum = {
    Request: "Request",
    Singleton: "Singleton",
    Transient: "Transient"
};
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
var TargetTypeEnum = {
    ClassProperty: "ClassProperty",
    ConstructorArgument: "ConstructorArgument",
    Variable: "Variable"
};

//# sourceMappingURL=literal_types.js.map

/***/ }),

/***/ "./node_modules/inversify/es/constants/metadata_keys.js":
/*!**************************************************************!*\
  !*** ./node_modules/inversify/es/constants/metadata_keys.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NAMED_TAG": () => (/* binding */ NAMED_TAG),
/* harmony export */   "NAME_TAG": () => (/* binding */ NAME_TAG),
/* harmony export */   "UNMANAGED_TAG": () => (/* binding */ UNMANAGED_TAG),
/* harmony export */   "OPTIONAL_TAG": () => (/* binding */ OPTIONAL_TAG),
/* harmony export */   "INJECT_TAG": () => (/* binding */ INJECT_TAG),
/* harmony export */   "MULTI_INJECT_TAG": () => (/* binding */ MULTI_INJECT_TAG),
/* harmony export */   "TAGGED": () => (/* binding */ TAGGED),
/* harmony export */   "TAGGED_PROP": () => (/* binding */ TAGGED_PROP),
/* harmony export */   "PARAM_TYPES": () => (/* binding */ PARAM_TYPES),
/* harmony export */   "DESIGN_PARAM_TYPES": () => (/* binding */ DESIGN_PARAM_TYPES),
/* harmony export */   "POST_CONSTRUCT": () => (/* binding */ POST_CONSTRUCT),
/* harmony export */   "PRE_DESTROY": () => (/* binding */ PRE_DESTROY),
/* harmony export */   "NON_CUSTOM_TAG_KEYS": () => (/* binding */ NON_CUSTOM_TAG_KEYS)
/* harmony export */ });
var NAMED_TAG = "named";
var NAME_TAG = "name";
var UNMANAGED_TAG = "unmanaged";
var OPTIONAL_TAG = "optional";
var INJECT_TAG = "inject";
var MULTI_INJECT_TAG = "multi_inject";
var TAGGED = "inversify:tagged";
var TAGGED_PROP = "inversify:tagged_props";
var PARAM_TYPES = "inversify:paramtypes";
var DESIGN_PARAM_TYPES = "design:paramtypes";
var POST_CONSTRUCT = "post_construct";
var PRE_DESTROY = "pre_destroy";
function getNonCustomTagKeys() {
    return [
        INJECT_TAG,
        MULTI_INJECT_TAG,
        NAME_TAG,
        UNMANAGED_TAG,
        NAMED_TAG,
        OPTIONAL_TAG,
    ];
}
var NON_CUSTOM_TAG_KEYS = getNonCustomTagKeys();
//# sourceMappingURL=metadata_keys.js.map

/***/ }),

/***/ "./node_modules/inversify/es/container/container.js":
/*!**********************************************************!*\
  !*** ./node_modules/inversify/es/container/container.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Container": () => (/* binding */ Container)
/* harmony export */ });
/* harmony import */ var _bindings_binding__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../bindings/binding */ "./node_modules/inversify/es/bindings/binding.js");
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");
/* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/es/constants/literal_types.js");
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _planning_metadata_reader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../planning/metadata_reader */ "./node_modules/inversify/es/planning/metadata_reader.js");
/* harmony import */ var _planning_planner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../planning/planner */ "./node_modules/inversify/es/planning/planner.js");
/* harmony import */ var _resolution_resolver__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../resolution/resolver */ "./node_modules/inversify/es/resolution/resolver.js");
/* harmony import */ var _syntax_binding_to_syntax__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../syntax/binding_to_syntax */ "./node_modules/inversify/es/syntax/binding_to_syntax.js");
/* harmony import */ var _utils_async__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/async */ "./node_modules/inversify/es/utils/async.js");
/* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/es/utils/id.js");
/* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/es/utils/serialization.js");
/* harmony import */ var _container_snapshot__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./container_snapshot */ "./node_modules/inversify/es/container/container_snapshot.js");
/* harmony import */ var _lookup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lookup */ "./node_modules/inversify/es/container/lookup.js");
/* harmony import */ var _module_activation_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./module_activation_store */ "./node_modules/inversify/es/container/module_activation_store.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};














var Container = (function () {
    function Container(containerOptions) {
        var options = containerOptions || {};
        if (typeof options !== "object") {
            throw new Error("" + _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT);
        }
        if (options.defaultScope === undefined) {
            options.defaultScope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingScopeEnum.Transient;
        }
        else if (options.defaultScope !== _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingScopeEnum.Singleton &&
            options.defaultScope !== _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingScopeEnum.Transient &&
            options.defaultScope !== _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingScopeEnum.Request) {
            throw new Error("" + _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
        }
        if (options.autoBindInjectable === undefined) {
            options.autoBindInjectable = false;
        }
        else if (typeof options.autoBindInjectable !== "boolean") {
            throw new Error("" + _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE);
        }
        if (options.skipBaseClassChecks === undefined) {
            options.skipBaseClassChecks = false;
        }
        else if (typeof options.skipBaseClassChecks !== "boolean") {
            throw new Error("" + _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK);
        }
        this.options = {
            autoBindInjectable: options.autoBindInjectable,
            defaultScope: options.defaultScope,
            skipBaseClassChecks: options.skipBaseClassChecks
        };
        this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_2__.id)();
        this._bindingDictionary = new _lookup__WEBPACK_IMPORTED_MODULE_3__.Lookup();
        this._snapshots = [];
        this._middleware = null;
        this._activations = new _lookup__WEBPACK_IMPORTED_MODULE_3__.Lookup();
        this._deactivations = new _lookup__WEBPACK_IMPORTED_MODULE_3__.Lookup();
        this.parent = null;
        this._metadataReader = new _planning_metadata_reader__WEBPACK_IMPORTED_MODULE_4__.MetadataReader();
        this._moduleActivationStore = new _module_activation_store__WEBPACK_IMPORTED_MODULE_5__.ModuleActivationStore();
    }
    Container.merge = function (container1, container2) {
        var containers = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            containers[_i - 2] = arguments[_i];
        }
        var container = new Container();
        var targetContainers = __spreadArray([container1, container2], containers, true).map(function (targetContainer) { return (0,_planning_planner__WEBPACK_IMPORTED_MODULE_6__.getBindingDictionary)(targetContainer); });
        var bindingDictionary = (0,_planning_planner__WEBPACK_IMPORTED_MODULE_6__.getBindingDictionary)(container);
        function copyDictionary(origin, destination) {
            origin.traverse(function (_key, value) {
                value.forEach(function (binding) {
                    destination.add(binding.serviceIdentifier, binding.clone());
                });
            });
        }
        targetContainers.forEach(function (targetBindingDictionary) {
            copyDictionary(targetBindingDictionary, bindingDictionary);
        });
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
            currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction, containerModuleHelpers.unbindAsyncFunction, containerModuleHelpers.onActivationFunction, containerModuleHelpers.onDeactivationFunction);
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
                        return [4, currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction, containerModuleHelpers.unbindAsyncFunction, containerModuleHelpers.onActivationFunction, containerModuleHelpers.onDeactivationFunction)];
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
        modules.forEach(function (module) {
            var deactivations = _this._removeModuleBindings(module.id);
            _this._deactivateSingletons(deactivations);
            _this._removeModuleHandlers(module.id);
        });
    };
    Container.prototype.unloadAsync = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a, modules_3, module_1, deactivations;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = 0, modules_3 = modules;
                        _b.label = 1;
                    case 1:
                        if (!(_a < modules_3.length)) return [3, 4];
                        module_1 = modules_3[_a];
                        deactivations = this._removeModuleBindings(module_1.id);
                        return [4, this._deactivateSingletonsAsync(deactivations)];
                    case 2:
                        _b.sent();
                        this._removeModuleHandlers(module_1.id);
                        _b.label = 3;
                    case 3:
                        _a++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    Container.prototype.bind = function (serviceIdentifier) {
        var scope = this.options.defaultScope || _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingScopeEnum.Transient;
        var binding = new _bindings_binding__WEBPACK_IMPORTED_MODULE_7__.Binding(serviceIdentifier, scope);
        this._bindingDictionary.add(serviceIdentifier, binding);
        return new _syntax_binding_to_syntax__WEBPACK_IMPORTED_MODULE_8__.BindingToSyntax(binding);
    };
    Container.prototype.rebind = function (serviceIdentifier) {
        this.unbind(serviceIdentifier);
        return this.bind(serviceIdentifier);
    };
    Container.prototype.rebindAsync = function (serviceIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.unbindAsync(serviceIdentifier)];
                    case 1:
                        _a.sent();
                        return [2, this.bind(serviceIdentifier)];
                }
            });
        });
    };
    Container.prototype.unbind = function (serviceIdentifier) {
        if (this._bindingDictionary.hasKey(serviceIdentifier)) {
            var bindings = this._bindingDictionary.get(serviceIdentifier);
            this._deactivateSingletons(bindings);
        }
        this._removeServiceFromDictionary(serviceIdentifier);
    };
    Container.prototype.unbindAsync = function (serviceIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            var bindings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._bindingDictionary.hasKey(serviceIdentifier)) return [3, 2];
                        bindings = this._bindingDictionary.get(serviceIdentifier);
                        return [4, this._deactivateSingletonsAsync(bindings)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this._removeServiceFromDictionary(serviceIdentifier);
                        return [2];
                }
            });
        });
    };
    Container.prototype.unbindAll = function () {
        var _this = this;
        this._bindingDictionary.traverse(function (_key, value) {
            _this._deactivateSingletons(value);
        });
        this._bindingDictionary = new _lookup__WEBPACK_IMPORTED_MODULE_3__.Lookup();
    };
    Container.prototype.unbindAllAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        this._bindingDictionary.traverse(function (_key, value) {
                            promises.push(_this._deactivateSingletonsAsync(value));
                        });
                        return [4, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        this._bindingDictionary = new _lookup__WEBPACK_IMPORTED_MODULE_3__.Lookup();
                        return [2];
                }
            });
        });
    };
    Container.prototype.onActivation = function (serviceIdentifier, onActivation) {
        this._activations.add(serviceIdentifier, onActivation);
    };
    Container.prototype.onDeactivation = function (serviceIdentifier, onDeactivation) {
        this._deactivations.add(serviceIdentifier, onDeactivation);
    };
    Container.prototype.isBound = function (serviceIdentifier) {
        var bound = this._bindingDictionary.hasKey(serviceIdentifier);
        if (!bound && this.parent) {
            bound = this.parent.isBound(serviceIdentifier);
        }
        return bound;
    };
    Container.prototype.isCurrentBound = function (serviceIdentifier) {
        return this._bindingDictionary.hasKey(serviceIdentifier);
    };
    Container.prototype.isBoundNamed = function (serviceIdentifier, named) {
        return this.isBoundTagged(serviceIdentifier, _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.NAMED_TAG, named);
    };
    Container.prototype.isBoundTagged = function (serviceIdentifier, key, value) {
        var bound = false;
        if (this._bindingDictionary.hasKey(serviceIdentifier)) {
            var bindings = this._bindingDictionary.get(serviceIdentifier);
            var request_1 = (0,_planning_planner__WEBPACK_IMPORTED_MODULE_6__.createMockRequest)(this, serviceIdentifier, key, value);
            bound = bindings.some(function (b) { return b.constraint(request_1); });
        }
        if (!bound && this.parent) {
            bound = this.parent.isBoundTagged(serviceIdentifier, key, value);
        }
        return bound;
    };
    Container.prototype.snapshot = function () {
        this._snapshots.push(_container_snapshot__WEBPACK_IMPORTED_MODULE_10__.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware, this._activations.clone(), this._deactivations.clone(), this._moduleActivationStore.clone()));
    };
    Container.prototype.restore = function () {
        var snapshot = this._snapshots.pop();
        if (snapshot === undefined) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.NO_MORE_SNAPSHOTS_AVAILABLE);
        }
        this._bindingDictionary = snapshot.bindings;
        this._activations = snapshot.activations;
        this._deactivations = snapshot.deactivations;
        this._middleware = snapshot.middleware;
        this._moduleActivationStore = snapshot.moduleActivationStore;
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
        var getArgs = this._getNotAllArgs(serviceIdentifier, false);
        return this._getButThrowIfAsync(getArgs);
    };
    Container.prototype.getAsync = function (serviceIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            var getArgs;
            return __generator(this, function (_a) {
                getArgs = this._getNotAllArgs(serviceIdentifier, false);
                return [2, this._get(getArgs)];
            });
        });
    };
    Container.prototype.getTagged = function (serviceIdentifier, key, value) {
        var getArgs = this._getNotAllArgs(serviceIdentifier, false, key, value);
        return this._getButThrowIfAsync(getArgs);
    };
    Container.prototype.getTaggedAsync = function (serviceIdentifier, key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var getArgs;
            return __generator(this, function (_a) {
                getArgs = this._getNotAllArgs(serviceIdentifier, false, key, value);
                return [2, this._get(getArgs)];
            });
        });
    };
    Container.prototype.getNamed = function (serviceIdentifier, named) {
        return this.getTagged(serviceIdentifier, _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.NAMED_TAG, named);
    };
    Container.prototype.getNamedAsync = function (serviceIdentifier, named) {
        return this.getTaggedAsync(serviceIdentifier, _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.NAMED_TAG, named);
    };
    Container.prototype.getAll = function (serviceIdentifier) {
        var getArgs = this._getAllArgs(serviceIdentifier);
        return this._getButThrowIfAsync(getArgs);
    };
    Container.prototype.getAllAsync = function (serviceIdentifier) {
        var getArgs = this._getAllArgs(serviceIdentifier);
        return this._getAll(getArgs);
    };
    Container.prototype.getAllTagged = function (serviceIdentifier, key, value) {
        var getArgs = this._getNotAllArgs(serviceIdentifier, true, key, value);
        return this._getButThrowIfAsync(getArgs);
    };
    Container.prototype.getAllTaggedAsync = function (serviceIdentifier, key, value) {
        var getArgs = this._getNotAllArgs(serviceIdentifier, true, key, value);
        return this._getAll(getArgs);
    };
    Container.prototype.getAllNamed = function (serviceIdentifier, named) {
        return this.getAllTagged(serviceIdentifier, _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.NAMED_TAG, named);
    };
    Container.prototype.getAllNamedAsync = function (serviceIdentifier, named) {
        return this.getAllTaggedAsync(serviceIdentifier, _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.NAMED_TAG, named);
    };
    Container.prototype.resolve = function (constructorFunction) {
        var isBound = this.isBound(constructorFunction);
        if (!isBound) {
            this.bind(constructorFunction).toSelf();
        }
        var resolved = this.get(constructorFunction);
        if (!isBound) {
            this.unbind(constructorFunction);
        }
        return resolved;
    };
    Container.prototype._preDestroy = function (constructor, instance) {
        if (Reflect.hasMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.PRE_DESTROY, constructor)) {
            var data = Reflect.getMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.PRE_DESTROY, constructor);
            return instance[data.value]();
        }
    };
    Container.prototype._removeModuleHandlers = function (moduleId) {
        var moduleActivationsHandlers = this._moduleActivationStore.remove(moduleId);
        this._activations.removeIntersection(moduleActivationsHandlers.onActivations);
        this._deactivations.removeIntersection(moduleActivationsHandlers.onDeactivations);
    };
    Container.prototype._removeModuleBindings = function (moduleId) {
        return this._bindingDictionary.removeByCondition(function (binding) { return binding.moduleId === moduleId; });
    };
    Container.prototype._deactivate = function (binding, instance) {
        var _this = this;
        var constructor = Object.getPrototypeOf(instance).constructor;
        try {
            if (this._deactivations.hasKey(binding.serviceIdentifier)) {
                var result = this._deactivateContainer(instance, this._deactivations.get(binding.serviceIdentifier).values());
                if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromise)(result)) {
                    return this._handleDeactivationError(result.then(function () { return _this._propagateContainerDeactivationThenBindingAndPreDestroyAsync(binding, instance, constructor); }), constructor);
                }
            }
            var propagateDeactivationResult = this._propagateContainerDeactivationThenBindingAndPreDestroy(binding, instance, constructor);
            if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromise)(propagateDeactivationResult)) {
                return this._handleDeactivationError(propagateDeactivationResult, constructor);
            }
        }
        catch (ex) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.ON_DEACTIVATION_ERROR(constructor.name, ex.message));
        }
    };
    Container.prototype._handleDeactivationError = function (asyncResult, constructor) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, asyncResult];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        ex_1 = _a.sent();
                        throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.ON_DEACTIVATION_ERROR(constructor.name, ex_1.message));
                    case 3: return [2];
                }
            });
        });
    };
    Container.prototype._deactivateContainer = function (instance, deactivationsIterator) {
        var _this = this;
        var deactivation = deactivationsIterator.next();
        while (deactivation.value) {
            var result = deactivation.value(instance);
            if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromise)(result)) {
                return result.then(function () {
                    return _this._deactivateContainerAsync(instance, deactivationsIterator);
                });
            }
            deactivation = deactivationsIterator.next();
        }
    };
    Container.prototype._deactivateContainerAsync = function (instance, deactivationsIterator) {
        return __awaiter(this, void 0, void 0, function () {
            var deactivation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deactivation = deactivationsIterator.next();
                        _a.label = 1;
                    case 1:
                        if (!deactivation.value) return [3, 3];
                        return [4, deactivation.value(instance)];
                    case 2:
                        _a.sent();
                        deactivation = deactivationsIterator.next();
                        return [3, 1];
                    case 3: return [2];
                }
            });
        });
    };
    Container.prototype._getContainerModuleHelpersFactory = function () {
        var _this = this;
        var setModuleId = function (bindingToSyntax, moduleId) {
            bindingToSyntax._binding.moduleId = moduleId;
        };
        var getBindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var bindingToSyntax = _this.bind(serviceIdentifier);
                setModuleId(bindingToSyntax, moduleId);
                return bindingToSyntax;
            };
        };
        var getUnbindFunction = function () {
            return function (serviceIdentifier) {
                return _this.unbind(serviceIdentifier);
            };
        };
        var getUnbindAsyncFunction = function () {
            return function (serviceIdentifier) {
                return _this.unbindAsync(serviceIdentifier);
            };
        };
        var getIsboundFunction = function () {
            return function (serviceIdentifier) {
                return _this.isBound(serviceIdentifier);
            };
        };
        var getRebindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var bindingToSyntax = _this.rebind(serviceIdentifier);
                setModuleId(bindingToSyntax, moduleId);
                return bindingToSyntax;
            };
        };
        var getOnActivationFunction = function (moduleId) {
            return function (serviceIdentifier, onActivation) {
                _this._moduleActivationStore.addActivation(moduleId, serviceIdentifier, onActivation);
                _this.onActivation(serviceIdentifier, onActivation);
            };
        };
        var getOnDeactivationFunction = function (moduleId) {
            return function (serviceIdentifier, onDeactivation) {
                _this._moduleActivationStore.addDeactivation(moduleId, serviceIdentifier, onDeactivation);
                _this.onDeactivation(serviceIdentifier, onDeactivation);
            };
        };
        return function (mId) { return ({
            bindFunction: getBindFunction(mId),
            isboundFunction: getIsboundFunction(),
            onActivationFunction: getOnActivationFunction(mId),
            onDeactivationFunction: getOnDeactivationFunction(mId),
            rebindFunction: getRebindFunction(mId),
            unbindFunction: getUnbindFunction(),
            unbindAsyncFunction: getUnbindAsyncFunction()
        }); };
    };
    Container.prototype._getAll = function (getArgs) {
        return Promise.all(this._get(getArgs));
    };
    Container.prototype._get = function (getArgs) {
        var planAndResolveArgs = __assign(__assign({}, getArgs), { contextInterceptor: function (context) { return context; }, targetType: _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.TargetTypeEnum.Variable });
        if (this._middleware) {
            var middlewareResult = this._middleware(planAndResolveArgs);
            if (middlewareResult === undefined || middlewareResult === null) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.INVALID_MIDDLEWARE_RETURN);
            }
            return middlewareResult;
        }
        return this._planAndResolve()(planAndResolveArgs);
    };
    Container.prototype._getButThrowIfAsync = function (getArgs) {
        var result = this._get(getArgs);
        if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromiseOrContainsPromise)(result)) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.LAZY_IN_SYNC(getArgs.serviceIdentifier));
        }
        return result;
    };
    Container.prototype._getAllArgs = function (serviceIdentifier) {
        var getAllArgs = {
            avoidConstraints: true,
            isMultiInject: true,
            serviceIdentifier: serviceIdentifier,
        };
        return getAllArgs;
    };
    Container.prototype._getNotAllArgs = function (serviceIdentifier, isMultiInject, key, value) {
        var getNotAllArgs = {
            avoidConstraints: false,
            isMultiInject: isMultiInject,
            serviceIdentifier: serviceIdentifier,
            key: key,
            value: value,
        };
        return getNotAllArgs;
    };
    Container.prototype._planAndResolve = function () {
        var _this = this;
        return function (args) {
            var context = (0,_planning_planner__WEBPACK_IMPORTED_MODULE_6__.plan)(_this._metadataReader, _this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
            context = args.contextInterceptor(context);
            var result = (0,_resolution_resolver__WEBPACK_IMPORTED_MODULE_12__.resolve)(context);
            return result;
        };
    };
    Container.prototype._deactivateIfSingleton = function (binding) {
        var _this = this;
        if (!binding.activated) {
            return;
        }
        if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromise)(binding.cache)) {
            return binding.cache.then(function (resolved) { return _this._deactivate(binding, resolved); });
        }
        return this._deactivate(binding, binding.cache);
    };
    Container.prototype._deactivateSingletons = function (bindings) {
        for (var _i = 0, bindings_1 = bindings; _i < bindings_1.length; _i++) {
            var binding = bindings_1[_i];
            var result = this._deactivateIfSingleton(binding);
            if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromise)(result)) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.ASYNC_UNBIND_REQUIRED);
            }
        }
    };
    Container.prototype._deactivateSingletonsAsync = function (bindings) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Promise.all(bindings.map(function (b) { return _this._deactivateIfSingleton(b); }))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Container.prototype._propagateContainerDeactivationThenBindingAndPreDestroy = function (binding, instance, constructor) {
        if (this.parent) {
            return this._deactivate.bind(this.parent)(binding, instance);
        }
        else {
            return this._bindingDeactivationAndPreDestroy(binding, instance, constructor);
        }
    };
    Container.prototype._propagateContainerDeactivationThenBindingAndPreDestroyAsync = function (binding, instance, constructor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.parent) return [3, 2];
                        return [4, this._deactivate.bind(this.parent)(binding, instance)];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2: return [4, this._bindingDeactivationAndPreDestroyAsync(binding, instance, constructor)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    Container.prototype._removeServiceFromDictionary = function (serviceIdentifier) {
        try {
            this._bindingDictionary.remove(serviceIdentifier);
        }
        catch (e) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.CANNOT_UNBIND + " " + (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_13__.getServiceIdentifierAsString)(serviceIdentifier));
        }
    };
    Container.prototype._bindingDeactivationAndPreDestroy = function (binding, instance, constructor) {
        var _this = this;
        if (typeof binding.onDeactivation === "function") {
            var result = binding.onDeactivation(instance);
            if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromise)(result)) {
                return result.then(function () { return _this._preDestroy(constructor, instance); });
            }
        }
        return this._preDestroy(constructor, instance);
    };
    Container.prototype._bindingDeactivationAndPreDestroyAsync = function (binding, instance, constructor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof binding.onDeactivation === "function")) return [3, 2];
                        return [4, binding.onDeactivation(instance)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4, this._preDestroy(constructor, instance)];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return Container;
}());

//# sourceMappingURL=container.js.map

/***/ }),

/***/ "./node_modules/inversify/es/container/container_module.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/es/container/container_module.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContainerModule": () => (/* binding */ ContainerModule),
/* harmony export */   "AsyncContainerModule": () => (/* binding */ AsyncContainerModule)
/* harmony export */ });
/* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/es/utils/id.js");

var ContainerModule = (function () {
    function ContainerModule(registry) {
        this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_0__.id)();
        this.registry = registry;
    }
    return ContainerModule;
}());

var AsyncContainerModule = (function () {
    function AsyncContainerModule(registry) {
        this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_0__.id)();
        this.registry = registry;
    }
    return AsyncContainerModule;
}());

//# sourceMappingURL=container_module.js.map

/***/ }),

/***/ "./node_modules/inversify/es/container/container_snapshot.js":
/*!*******************************************************************!*\
  !*** ./node_modules/inversify/es/container/container_snapshot.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContainerSnapshot": () => (/* binding */ ContainerSnapshot)
/* harmony export */ });
var ContainerSnapshot = (function () {
    function ContainerSnapshot() {
    }
    ContainerSnapshot.of = function (bindings, middleware, activations, deactivations, moduleActivationStore) {
        var snapshot = new ContainerSnapshot();
        snapshot.bindings = bindings;
        snapshot.middleware = middleware;
        snapshot.deactivations = deactivations;
        snapshot.activations = activations;
        snapshot.moduleActivationStore = moduleActivationStore;
        return snapshot;
    };
    return ContainerSnapshot;
}());

//# sourceMappingURL=container_snapshot.js.map

/***/ }),

/***/ "./node_modules/inversify/es/container/lookup.js":
/*!*******************************************************!*\
  !*** ./node_modules/inversify/es/container/lookup.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Lookup": () => (/* binding */ Lookup)
/* harmony export */ });
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");
/* harmony import */ var _utils_clonable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/clonable */ "./node_modules/inversify/es/utils/clonable.js");


var Lookup = (function () {
    function Lookup() {
        this._map = new Map();
    }
    Lookup.prototype.getMap = function () {
        return this._map;
    };
    Lookup.prototype.add = function (serviceIdentifier, value) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.NULL_ARGUMENT);
        }
        if (value === null || value === undefined) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.NULL_ARGUMENT);
        }
        var entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            entry.push(value);
        }
        else {
            this._map.set(serviceIdentifier, [value]);
        }
    };
    Lookup.prototype.get = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.NULL_ARGUMENT);
        }
        var entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            return entry;
        }
        else {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.KEY_NOT_FOUND);
        }
    };
    Lookup.prototype.remove = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.NULL_ARGUMENT);
        }
        if (!this._map.delete(serviceIdentifier)) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.KEY_NOT_FOUND);
        }
    };
    Lookup.prototype.removeIntersection = function (lookup) {
        var _this = this;
        this.traverse(function (serviceIdentifier, value) {
            var lookupActivations = lookup.hasKey(serviceIdentifier) ? lookup.get(serviceIdentifier) : undefined;
            if (lookupActivations !== undefined) {
                var filteredValues = value.filter(function (lookupValue) {
                    return !lookupActivations.some(function (moduleActivation) { return lookupValue === moduleActivation; });
                });
                _this._setValue(serviceIdentifier, filteredValues);
            }
        });
    };
    Lookup.prototype.removeByCondition = function (condition) {
        var _this = this;
        var removals = [];
        this._map.forEach(function (entries, key) {
            var updatedEntries = [];
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                var remove = condition(entry);
                if (remove) {
                    removals.push(entry);
                }
                else {
                    updatedEntries.push(entry);
                }
            }
            _this._setValue(key, updatedEntries);
        });
        return removals;
    };
    Lookup.prototype.hasKey = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.NULL_ARGUMENT);
        }
        return this._map.has(serviceIdentifier);
    };
    Lookup.prototype.clone = function () {
        var copy = new Lookup();
        this._map.forEach(function (value, key) {
            value.forEach(function (b) { return copy.add(key, (0,_utils_clonable__WEBPACK_IMPORTED_MODULE_1__.isClonable)(b) ? b.clone() : b); });
        });
        return copy;
    };
    Lookup.prototype.traverse = function (func) {
        this._map.forEach(function (value, key) {
            func(key, value);
        });
    };
    Lookup.prototype._setValue = function (serviceIdentifier, value) {
        if (value.length > 0) {
            this._map.set(serviceIdentifier, value);
        }
        else {
            this._map.delete(serviceIdentifier);
        }
    };
    return Lookup;
}());

//# sourceMappingURL=lookup.js.map

/***/ }),

/***/ "./node_modules/inversify/es/container/module_activation_store.js":
/*!************************************************************************!*\
  !*** ./node_modules/inversify/es/container/module_activation_store.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModuleActivationStore": () => (/* binding */ ModuleActivationStore)
/* harmony export */ });
/* harmony import */ var _lookup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lookup */ "./node_modules/inversify/es/container/lookup.js");

var ModuleActivationStore = (function () {
    function ModuleActivationStore() {
        this._map = new Map();
    }
    ModuleActivationStore.prototype.remove = function (moduleId) {
        if (this._map.has(moduleId)) {
            var handlers = this._map.get(moduleId);
            this._map.delete(moduleId);
            return handlers;
        }
        return this._getEmptyHandlersStore();
    };
    ModuleActivationStore.prototype.addDeactivation = function (moduleId, serviceIdentifier, onDeactivation) {
        this._getModuleActivationHandlers(moduleId)
            .onDeactivations.add(serviceIdentifier, onDeactivation);
    };
    ModuleActivationStore.prototype.addActivation = function (moduleId, serviceIdentifier, onActivation) {
        this._getModuleActivationHandlers(moduleId)
            .onActivations.add(serviceIdentifier, onActivation);
    };
    ModuleActivationStore.prototype.clone = function () {
        var clone = new ModuleActivationStore();
        this._map.forEach(function (handlersStore, moduleId) {
            clone._map.set(moduleId, {
                onActivations: handlersStore.onActivations.clone(),
                onDeactivations: handlersStore.onDeactivations.clone(),
            });
        });
        return clone;
    };
    ModuleActivationStore.prototype._getModuleActivationHandlers = function (moduleId) {
        var moduleActivationHandlers = this._map.get(moduleId);
        if (moduleActivationHandlers === undefined) {
            moduleActivationHandlers = this._getEmptyHandlersStore();
            this._map.set(moduleId, moduleActivationHandlers);
        }
        return moduleActivationHandlers;
    };
    ModuleActivationStore.prototype._getEmptyHandlersStore = function () {
        var handlersStore = {
            onActivations: new _lookup__WEBPACK_IMPORTED_MODULE_0__.Lookup(),
            onDeactivations: new _lookup__WEBPACK_IMPORTED_MODULE_0__.Lookup()
        };
        return handlersStore;
    };
    return ModuleActivationStore;
}());

//# sourceMappingURL=module_activation_store.js.map

/***/ }),

/***/ "./node_modules/inversify/es/interfaces/interfaces.js":
/*!************************************************************!*\
  !*** ./node_modules/inversify/es/interfaces/interfaces.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "interfaces": () => (/* binding */ interfaces)
/* harmony export */ });
var interfaces;
(function (interfaces) {
    ;
})(interfaces || (interfaces = {}));

//# sourceMappingURL=interfaces.js.map

/***/ }),

/***/ "./node_modules/inversify/es/inversify.js":
/*!************************************************!*\
  !*** ./node_modules/inversify/es/inversify.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "METADATA_KEY": () => (/* binding */ METADATA_KEY),
/* harmony export */   "Container": () => (/* reexport safe */ _container_container__WEBPACK_IMPORTED_MODULE_1__.Container),
/* harmony export */   "BindingScopeEnum": () => (/* reexport safe */ _constants_literal_types__WEBPACK_IMPORTED_MODULE_2__.BindingScopeEnum),
/* harmony export */   "BindingTypeEnum": () => (/* reexport safe */ _constants_literal_types__WEBPACK_IMPORTED_MODULE_2__.BindingTypeEnum),
/* harmony export */   "TargetTypeEnum": () => (/* reexport safe */ _constants_literal_types__WEBPACK_IMPORTED_MODULE_2__.TargetTypeEnum),
/* harmony export */   "AsyncContainerModule": () => (/* reexport safe */ _container_container_module__WEBPACK_IMPORTED_MODULE_3__.AsyncContainerModule),
/* harmony export */   "ContainerModule": () => (/* reexport safe */ _container_container_module__WEBPACK_IMPORTED_MODULE_3__.ContainerModule),
/* harmony export */   "createTaggedDecorator": () => (/* reexport safe */ _annotation_decorator_utils__WEBPACK_IMPORTED_MODULE_4__.createTaggedDecorator),
/* harmony export */   "injectable": () => (/* reexport safe */ _annotation_injectable__WEBPACK_IMPORTED_MODULE_5__.injectable),
/* harmony export */   "tagged": () => (/* reexport safe */ _annotation_tagged__WEBPACK_IMPORTED_MODULE_6__.tagged),
/* harmony export */   "named": () => (/* reexport safe */ _annotation_named__WEBPACK_IMPORTED_MODULE_7__.named),
/* harmony export */   "inject": () => (/* reexport safe */ _annotation_inject__WEBPACK_IMPORTED_MODULE_8__.inject),
/* harmony export */   "LazyServiceIdentifer": () => (/* reexport safe */ _annotation_lazy_service_identifier__WEBPACK_IMPORTED_MODULE_9__.LazyServiceIdentifer),
/* harmony export */   "optional": () => (/* reexport safe */ _annotation_optional__WEBPACK_IMPORTED_MODULE_10__.optional),
/* harmony export */   "unmanaged": () => (/* reexport safe */ _annotation_unmanaged__WEBPACK_IMPORTED_MODULE_11__.unmanaged),
/* harmony export */   "multiInject": () => (/* reexport safe */ _annotation_multi_inject__WEBPACK_IMPORTED_MODULE_12__.multiInject),
/* harmony export */   "targetName": () => (/* reexport safe */ _annotation_target_name__WEBPACK_IMPORTED_MODULE_13__.targetName),
/* harmony export */   "postConstruct": () => (/* reexport safe */ _annotation_post_construct__WEBPACK_IMPORTED_MODULE_14__.postConstruct),
/* harmony export */   "preDestroy": () => (/* reexport safe */ _annotation_pre_destroy__WEBPACK_IMPORTED_MODULE_15__.preDestroy),
/* harmony export */   "MetadataReader": () => (/* reexport safe */ _planning_metadata_reader__WEBPACK_IMPORTED_MODULE_16__.MetadataReader),
/* harmony export */   "id": () => (/* reexport safe */ _utils_id__WEBPACK_IMPORTED_MODULE_17__.id),
/* harmony export */   "interfaces": () => (/* reexport safe */ _interfaces_interfaces__WEBPACK_IMPORTED_MODULE_18__.interfaces),
/* harmony export */   "decorate": () => (/* reexport safe */ _annotation_decorator_utils__WEBPACK_IMPORTED_MODULE_4__.decorate),
/* harmony export */   "traverseAncerstors": () => (/* reexport safe */ _syntax_constraint_helpers__WEBPACK_IMPORTED_MODULE_19__.traverseAncerstors),
/* harmony export */   "taggedConstraint": () => (/* reexport safe */ _syntax_constraint_helpers__WEBPACK_IMPORTED_MODULE_19__.taggedConstraint),
/* harmony export */   "namedConstraint": () => (/* reexport safe */ _syntax_constraint_helpers__WEBPACK_IMPORTED_MODULE_19__.namedConstraint),
/* harmony export */   "typeConstraint": () => (/* reexport safe */ _syntax_constraint_helpers__WEBPACK_IMPORTED_MODULE_19__.typeConstraint),
/* harmony export */   "getServiceIdentifierAsString": () => (/* reexport safe */ _utils_serialization__WEBPACK_IMPORTED_MODULE_20__.getServiceIdentifierAsString),
/* harmony export */   "multiBindToService": () => (/* reexport safe */ _utils_binding_utils__WEBPACK_IMPORTED_MODULE_21__.multiBindToService)
/* harmony export */ });
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _container_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./container/container */ "./node_modules/inversify/es/container/container.js");
/* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants/literal_types */ "./node_modules/inversify/es/constants/literal_types.js");
/* harmony import */ var _container_container_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./container/container_module */ "./node_modules/inversify/es/container/container_module.js");
/* harmony import */ var _annotation_decorator_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./annotation/decorator_utils */ "./node_modules/inversify/es/annotation/decorator_utils.js");
/* harmony import */ var _annotation_injectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./annotation/injectable */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _annotation_tagged__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./annotation/tagged */ "./node_modules/inversify/es/annotation/tagged.js");
/* harmony import */ var _annotation_named__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./annotation/named */ "./node_modules/inversify/es/annotation/named.js");
/* harmony import */ var _annotation_inject__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./annotation/inject */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var _annotation_lazy_service_identifier__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./annotation/lazy_service_identifier */ "./node_modules/inversify/es/annotation/lazy_service_identifier.js");
/* harmony import */ var _annotation_optional__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./annotation/optional */ "./node_modules/inversify/es/annotation/optional.js");
/* harmony import */ var _annotation_unmanaged__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./annotation/unmanaged */ "./node_modules/inversify/es/annotation/unmanaged.js");
/* harmony import */ var _annotation_multi_inject__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./annotation/multi_inject */ "./node_modules/inversify/es/annotation/multi_inject.js");
/* harmony import */ var _annotation_target_name__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./annotation/target_name */ "./node_modules/inversify/es/annotation/target_name.js");
/* harmony import */ var _annotation_post_construct__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./annotation/post_construct */ "./node_modules/inversify/es/annotation/post_construct.js");
/* harmony import */ var _annotation_pre_destroy__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./annotation/pre_destroy */ "./node_modules/inversify/es/annotation/pre_destroy.js");
/* harmony import */ var _planning_metadata_reader__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./planning/metadata_reader */ "./node_modules/inversify/es/planning/metadata_reader.js");
/* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./utils/id */ "./node_modules/inversify/es/utils/id.js");
/* harmony import */ var _interfaces_interfaces__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./interfaces/interfaces */ "./node_modules/inversify/es/interfaces/interfaces.js");
/* harmony import */ var _syntax_constraint_helpers__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./syntax/constraint_helpers */ "./node_modules/inversify/es/syntax/constraint_helpers.js");
/* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./utils/serialization */ "./node_modules/inversify/es/utils/serialization.js");
/* harmony import */ var _utils_binding_utils__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./utils/binding_utils */ "./node_modules/inversify/es/utils/binding_utils.js");

var METADATA_KEY = _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__;






















//# sourceMappingURL=inversify.js.map

/***/ }),

/***/ "./node_modules/inversify/es/planning/context.js":
/*!*******************************************************!*\
  !*** ./node_modules/inversify/es/planning/context.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Context": () => (/* binding */ Context)
/* harmony export */ });
/* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/es/utils/id.js");

var Context = (function () {
    function Context(container) {
        this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_0__.id)();
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

//# sourceMappingURL=context.js.map

/***/ }),

/***/ "./node_modules/inversify/es/planning/metadata.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/es/planning/metadata.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Metadata": () => (/* binding */ Metadata)
/* harmony export */ });
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");

var Metadata = (function () {
    function Metadata(key, value) {
        this.key = key;
        this.value = value;
    }
    Metadata.prototype.toString = function () {
        if (this.key === _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.NAMED_TAG) {
            return "named: " + String(this.value).toString() + " ";
        }
        else {
            return "tagged: { key:" + this.key.toString() + ", value: " + String(this.value) + " }";
        }
    };
    return Metadata;
}());

//# sourceMappingURL=metadata.js.map

/***/ }),

/***/ "./node_modules/inversify/es/planning/metadata_reader.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/es/planning/metadata_reader.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MetadataReader": () => (/* binding */ MetadataReader)
/* harmony export */ });
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");

var MetadataReader = (function () {
    function MetadataReader() {
    }
    MetadataReader.prototype.getConstructorMetadata = function (constructorFunc) {
        var compilerGeneratedMetadata = Reflect.getMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.PARAM_TYPES, constructorFunc);
        var userGeneratedMetadata = Reflect.getMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.TAGGED, constructorFunc);
        return {
            compilerGeneratedMetadata: compilerGeneratedMetadata,
            userGeneratedMetadata: userGeneratedMetadata || {}
        };
    };
    MetadataReader.prototype.getPropertiesMetadata = function (constructorFunc) {
        var userGeneratedMetadata = Reflect.getMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.TAGGED_PROP, constructorFunc) || [];
        return userGeneratedMetadata;
    };
    return MetadataReader;
}());

//# sourceMappingURL=metadata_reader.js.map

/***/ }),

/***/ "./node_modules/inversify/es/planning/plan.js":
/*!****************************************************!*\
  !*** ./node_modules/inversify/es/planning/plan.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Plan": () => (/* binding */ Plan)
/* harmony export */ });
var Plan = (function () {
    function Plan(parentContext, rootRequest) {
        this.parentContext = parentContext;
        this.rootRequest = rootRequest;
    }
    return Plan;
}());

//# sourceMappingURL=plan.js.map

/***/ }),

/***/ "./node_modules/inversify/es/planning/planner.js":
/*!*******************************************************!*\
  !*** ./node_modules/inversify/es/planning/planner.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "plan": () => (/* binding */ plan),
/* harmony export */   "createMockRequest": () => (/* binding */ createMockRequest),
/* harmony export */   "getBindingDictionary": () => (/* binding */ getBindingDictionary)
/* harmony export */ });
/* harmony import */ var _bindings_binding_count__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../bindings/binding_count */ "./node_modules/inversify/es/bindings/binding_count.js");
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");
/* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/es/constants/literal_types.js");
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _utils_exceptions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/exceptions */ "./node_modules/inversify/es/utils/exceptions.js");
/* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reflection_utils */ "./node_modules/inversify/es/utils/serialization.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./context */ "./node_modules/inversify/es/planning/context.js");
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./metadata */ "./node_modules/inversify/es/planning/metadata.js");
/* harmony import */ var _plan__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plan */ "./node_modules/inversify/es/planning/plan.js");
/* harmony import */ var _reflection_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./reflection_utils */ "./node_modules/inversify/es/planning/reflection_utils.js");
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./request */ "./node_modules/inversify/es/planning/request.js");
/* harmony import */ var _target__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./target */ "./node_modules/inversify/es/planning/target.js");












function getBindingDictionary(cntnr) {
    return cntnr._bindingDictionary;
}
function _createTarget(isMultiInject, targetType, serviceIdentifier, name, key, value) {
    var metadataKey = isMultiInject ? _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.MULTI_INJECT_TAG : _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.INJECT_TAG;
    var injectMetadata = new _metadata__WEBPACK_IMPORTED_MODULE_1__.Metadata(metadataKey, serviceIdentifier);
    var target = new _target__WEBPACK_IMPORTED_MODULE_2__.Target(targetType, name, serviceIdentifier, injectMetadata);
    if (key !== undefined) {
        var tagMetadata = new _metadata__WEBPACK_IMPORTED_MODULE_1__.Metadata(key, value);
        target.metadata.push(tagMetadata);
    }
    return target;
}
function _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target) {
    var bindings = getBindings(context.container, target.serviceIdentifier);
    var activeBindings = [];
    if (bindings.length === _bindings_binding_count__WEBPACK_IMPORTED_MODULE_3__.BindingCount.NoBindingsAvailable &&
        context.container.options.autoBindInjectable &&
        typeof target.serviceIdentifier === "function" &&
        metadataReader.getConstructorMetadata(target.serviceIdentifier).compilerGeneratedMetadata) {
        context.container.bind(target.serviceIdentifier).toSelf();
        bindings = getBindings(context.container, target.serviceIdentifier);
    }
    if (!avoidConstraints) {
        activeBindings = bindings.filter(function (binding) {
            var request = new _request__WEBPACK_IMPORTED_MODULE_4__.Request(binding.serviceIdentifier, context, parentRequest, binding, target);
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
        case _bindings_binding_count__WEBPACK_IMPORTED_MODULE_3__.BindingCount.NoBindingsAvailable:
            if (target.isOptional()) {
                return bindings;
            }
            else {
                var serviceIdentifierString = (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.getServiceIdentifierAsString)(serviceIdentifier);
                var msg = _constants_error_msgs__WEBPACK_IMPORTED_MODULE_6__.NOT_REGISTERED;
                msg += (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.listMetadataForTarget)(serviceIdentifierString, target);
                msg += (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.listRegisteredBindingsForServiceIdentifier)(container, serviceIdentifierString, getBindings);
                throw new Error(msg);
            }
        case _bindings_binding_count__WEBPACK_IMPORTED_MODULE_3__.BindingCount.OnlyOneBindingAvailable:
            return bindings;
        case _bindings_binding_count__WEBPACK_IMPORTED_MODULE_3__.BindingCount.MultipleBindingsAvailable:
        default:
            if (!target.isArray()) {
                var serviceIdentifierString = (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.getServiceIdentifierAsString)(serviceIdentifier);
                var msg = _constants_error_msgs__WEBPACK_IMPORTED_MODULE_6__.AMBIGUOUS_MATCH + " " + serviceIdentifierString;
                msg += (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.listRegisteredBindingsForServiceIdentifier)(container, serviceIdentifierString, getBindings);
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
        childRequest = new _request__WEBPACK_IMPORTED_MODULE_4__.Request(serviceIdentifier, context, null, activeBindings, target);
        var thePlan = new _plan__WEBPACK_IMPORTED_MODULE_7__.Plan(context, childRequest);
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
        if (binding.type === _constants_literal_types__WEBPACK_IMPORTED_MODULE_8__.BindingTypeEnum.Instance && binding.implementationType !== null) {
            var dependencies = (0,_reflection_utils__WEBPACK_IMPORTED_MODULE_9__.getDependencies)(metadataReader, binding.implementationType);
            if (!context.container.options.skipBaseClassChecks) {
                var baseClassDependencyCount = (0,_reflection_utils__WEBPACK_IMPORTED_MODULE_9__.getBaseClassDependencyCount)(metadataReader, binding.implementationType);
                if (dependencies.length < baseClassDependencyCount) {
                    var error = _constants_error_msgs__WEBPACK_IMPORTED_MODULE_6__.ARGUMENTS_LENGTH_MISMATCH((0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.getFunctionName)(binding.implementationType));
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
    var context = new _context__WEBPACK_IMPORTED_MODULE_10__.Context(container);
    var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value);
    try {
        _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, null, target);
        return context;
    }
    catch (error) {
        if ((0,_utils_exceptions__WEBPACK_IMPORTED_MODULE_11__.isStackOverflowExeption)(error)) {
            (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.circularDependencyToException)(context.plan.rootRequest);
        }
        throw error;
    }
}
function createMockRequest(container, serviceIdentifier, key, value) {
    var target = new _target__WEBPACK_IMPORTED_MODULE_2__.Target(_constants_literal_types__WEBPACK_IMPORTED_MODULE_8__.TargetTypeEnum.Variable, "", serviceIdentifier, new _metadata__WEBPACK_IMPORTED_MODULE_1__.Metadata(key, value));
    var context = new _context__WEBPACK_IMPORTED_MODULE_10__.Context(container);
    var request = new _request__WEBPACK_IMPORTED_MODULE_4__.Request(serviceIdentifier, context, null, [], target);
    return request;
}

//# sourceMappingURL=planner.js.map

/***/ }),

/***/ "./node_modules/inversify/es/planning/queryable_string.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/es/planning/queryable_string.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QueryableString": () => (/* binding */ QueryableString)
/* harmony export */ });
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

//# sourceMappingURL=queryable_string.js.map

/***/ }),

/***/ "./node_modules/inversify/es/planning/reflection_utils.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/es/planning/reflection_utils.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDependencies": () => (/* binding */ getDependencies),
/* harmony export */   "getBaseClassDependencyCount": () => (/* binding */ getBaseClassDependencyCount),
/* harmony export */   "getFunctionName": () => (/* reexport safe */ _utils_serialization__WEBPACK_IMPORTED_MODULE_0__.getFunctionName)
/* harmony export */ });
/* harmony import */ var _annotation_lazy_service_identifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../annotation/lazy_service_identifier */ "./node_modules/inversify/es/annotation/lazy_service_identifier.js");
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");
/* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/es/constants/literal_types.js");
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/es/utils/serialization.js");
/* harmony import */ var _target__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./target */ "./node_modules/inversify/es/planning/target.js");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};






function getDependencies(metadataReader, func) {
    var constructorName = (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_0__.getFunctionName)(func);
    return getTargets(metadataReader, constructorName, func, false);
}
function getTargets(metadataReader, constructorName, func, isBaseClass) {
    var metadata = metadataReader.getConstructorMetadata(func);
    var serviceIdentifiers = metadata.compilerGeneratedMetadata;
    if (serviceIdentifiers === undefined) {
        var msg = _constants_error_msgs__WEBPACK_IMPORTED_MODULE_1__.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
        throw new Error(msg);
    }
    var constructorArgsMetadata = metadata.userGeneratedMetadata;
    var keys = Object.keys(constructorArgsMetadata);
    var hasUserDeclaredUnknownInjections = (func.length === 0 && keys.length > 0);
    var hasOptionalParameters = keys.length > func.length;
    var iterations = (hasUserDeclaredUnknownInjections || hasOptionalParameters) ? keys.length : func.length;
    var constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
    var propertyTargets = getClassPropsAsTargets(metadataReader, func, constructorName);
    var targets = __spreadArray(__spreadArray([], constructorTargets, true), propertyTargets, true);
    return targets;
}
function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
    var targetMetadata = constructorArgsMetadata[index.toString()] || [];
    var metadata = formatTargetMetadata(targetMetadata);
    var isManaged = metadata.unmanaged !== true;
    var serviceIdentifier = serviceIdentifiers[index];
    var injectIdentifier = (metadata.inject || metadata.multiInject);
    serviceIdentifier = (injectIdentifier) ? (injectIdentifier) : serviceIdentifier;
    if (serviceIdentifier instanceof _annotation_lazy_service_identifier__WEBPACK_IMPORTED_MODULE_2__.LazyServiceIdentifer) {
        serviceIdentifier = serviceIdentifier.unwrap();
    }
    if (isManaged) {
        var isObject = serviceIdentifier === Object;
        var isFunction = serviceIdentifier === Function;
        var isUndefined = serviceIdentifier === undefined;
        var isUnknownType = (isObject || isFunction || isUndefined);
        if (!isBaseClass && isUnknownType) {
            var msg = _constants_error_msgs__WEBPACK_IMPORTED_MODULE_1__.MISSING_INJECT_ANNOTATION + " argument " + index + " in class " + constructorName + ".";
            throw new Error(msg);
        }
        var target = new _target__WEBPACK_IMPORTED_MODULE_3__.Target(_constants_literal_types__WEBPACK_IMPORTED_MODULE_4__.TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier);
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
function _getServiceIdentifierForProperty(inject, multiInject, propertyName, className) {
    var serviceIdentifier = (inject || multiInject);
    if (serviceIdentifier === undefined) {
        var msg = _constants_error_msgs__WEBPACK_IMPORTED_MODULE_1__.MISSING_INJECTABLE_ANNOTATION + " for property " + String(propertyName) + " in class " + className + ".";
        throw new Error(msg);
    }
    return serviceIdentifier;
}
function getClassPropsAsTargets(metadataReader, constructorFunc, constructorName) {
    var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
    var targets = [];
    var symbolKeys = Object.getOwnPropertySymbols(classPropsMetadata);
    var stringKeys = Object.keys(classPropsMetadata);
    var keys = stringKeys.concat(symbolKeys);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var targetMetadata = classPropsMetadata[key];
        var metadata = formatTargetMetadata(targetMetadata);
        var identifier = metadata.targetName || key;
        var serviceIdentifier = _getServiceIdentifierForProperty(metadata.inject, metadata.multiInject, key, constructorName);
        var target = new _target__WEBPACK_IMPORTED_MODULE_3__.Target(_constants_literal_types__WEBPACK_IMPORTED_MODULE_4__.TargetTypeEnum.ClassProperty, identifier, serviceIdentifier);
        target.metadata = targetMetadata;
        targets.push(target);
    }
    var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;
    if (baseConstructor !== Object) {
        var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor, constructorName);
        targets = __spreadArray(__spreadArray([], targets, true), baseTargets, true);
    }
    return targets;
}
function getBaseClassDependencyCount(metadataReader, func) {
    var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
    if (baseConstructor !== Object) {
        var baseConstructorName = (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_0__.getFunctionName)(baseConstructor);
        var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
        var metadata = targets.map(function (t) { return t.metadata.filter(function (m) { return m.key === _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_5__.UNMANAGED_TAG; }); });
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
function formatTargetMetadata(targetMetadata) {
    var targetMetadataMap = {};
    targetMetadata.forEach(function (m) {
        targetMetadataMap[m.key.toString()] = m.value;
    });
    return {
        inject: targetMetadataMap[_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_5__.INJECT_TAG],
        multiInject: targetMetadataMap[_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_5__.MULTI_INJECT_TAG],
        targetName: targetMetadataMap[_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_5__.NAME_TAG],
        unmanaged: targetMetadataMap[_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_5__.UNMANAGED_TAG]
    };
}

//# sourceMappingURL=reflection_utils.js.map

/***/ }),

/***/ "./node_modules/inversify/es/planning/request.js":
/*!*******************************************************!*\
  !*** ./node_modules/inversify/es/planning/request.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Request": () => (/* binding */ Request)
/* harmony export */ });
/* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/es/utils/id.js");

var Request = (function () {
    function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
        this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_0__.id)();
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

//# sourceMappingURL=request.js.map

/***/ }),

/***/ "./node_modules/inversify/es/planning/target.js":
/*!******************************************************!*\
  !*** ./node_modules/inversify/es/planning/target.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Target": () => (/* binding */ Target)
/* harmony export */ });
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/es/utils/id.js");
/* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/es/utils/serialization.js");
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./metadata */ "./node_modules/inversify/es/planning/metadata.js");
/* harmony import */ var _queryable_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queryable_string */ "./node_modules/inversify/es/planning/queryable_string.js");





var Target = (function () {
    function Target(type, identifier, serviceIdentifier, namedOrTagged) {
        this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_0__.id)();
        this.type = type;
        this.serviceIdentifier = serviceIdentifier;
        var queryableName = typeof identifier === 'symbol' ? (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_1__.getSymbolDescription)(identifier) : identifier;
        this.name = new _queryable_string__WEBPACK_IMPORTED_MODULE_2__.QueryableString(queryableName || "");
        this.identifier = identifier;
        this.metadata = new Array();
        var metadataItem = null;
        if (typeof namedOrTagged === 'string') {
            metadataItem = new _metadata__WEBPACK_IMPORTED_MODULE_3__.Metadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.NAMED_TAG, namedOrTagged);
        }
        else if (namedOrTagged instanceof _metadata__WEBPACK_IMPORTED_MODULE_3__.Metadata) {
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
        return this.hasTag(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.MULTI_INJECT_TAG);
    };
    Target.prototype.matchesArray = function (name) {
        return this.matchesTag(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.MULTI_INJECT_TAG)(name);
    };
    Target.prototype.isNamed = function () {
        return this.hasTag(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.NAMED_TAG);
    };
    Target.prototype.isTagged = function () {
        return this.metadata.some(function (metadata) { return _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.NON_CUSTOM_TAG_KEYS.every(function (key) { return metadata.key !== key; }); });
    };
    Target.prototype.isOptional = function () {
        return this.matchesTag(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.OPTIONAL_TAG)(true);
    };
    Target.prototype.getNamedTag = function () {
        if (this.isNamed()) {
            return this.metadata.filter(function (m) { return m.key === _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.NAMED_TAG; })[0];
        }
        return null;
    };
    Target.prototype.getCustomTags = function () {
        if (this.isTagged()) {
            return this.metadata.filter(function (metadata) { return _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.NON_CUSTOM_TAG_KEYS.every(function (key) { return metadata.key !== key; }); });
        }
        else {
            return null;
        }
    };
    Target.prototype.matchesNamedTag = function (name) {
        return this.matchesTag(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.NAMED_TAG)(name);
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

//# sourceMappingURL=target.js.map

/***/ }),

/***/ "./node_modules/inversify/es/resolution/instantiation.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/es/resolution/instantiation.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveInstance": () => (/* binding */ resolveInstance)
/* harmony export */ });
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");
/* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/es/constants/literal_types.js");
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _utils_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/async */ "./node_modules/inversify/es/utils/async.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};




function _resolveRequests(childRequests, resolveRequest) {
    return childRequests.reduce(function (resolvedRequests, childRequest) {
        var injection = resolveRequest(childRequest);
        var targetType = childRequest.target.type;
        if (targetType === _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.TargetTypeEnum.ConstructorArgument) {
            resolvedRequests.constructorInjections.push(injection);
        }
        else {
            resolvedRequests.propertyRequests.push(childRequest);
            resolvedRequests.propertyInjections.push(injection);
        }
        if (!resolvedRequests.isAsync) {
            resolvedRequests.isAsync = (0,_utils_async__WEBPACK_IMPORTED_MODULE_1__.isPromiseOrContainsPromise)(injection);
        }
        return resolvedRequests;
    }, { constructorInjections: [], propertyInjections: [], propertyRequests: [], isAsync: false });
}
function _createInstance(constr, childRequests, resolveRequest) {
    var result;
    if (childRequests.length > 0) {
        var resolved = _resolveRequests(childRequests, resolveRequest);
        var createInstanceWithInjectionsArg = __assign(__assign({}, resolved), { constr: constr });
        if (resolved.isAsync) {
            result = createInstanceWithInjectionsAsync(createInstanceWithInjectionsArg);
        }
        else {
            result = createInstanceWithInjections(createInstanceWithInjectionsArg);
        }
    }
    else {
        result = new constr();
    }
    return result;
}
function createInstanceWithInjections(args) {
    var _a;
    var instance = new ((_a = args.constr).bind.apply(_a, __spreadArray([void 0], args.constructorInjections, false)))();
    args.propertyRequests.forEach(function (r, index) {
        var property = r.target.identifier;
        var injection = args.propertyInjections[index];
        instance[property] = injection;
    });
    return instance;
}
function createInstanceWithInjectionsAsync(args) {
    return __awaiter(this, void 0, void 0, function () {
        var constructorInjections, propertyInjections;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, possiblyWaitInjections(args.constructorInjections)];
                case 1:
                    constructorInjections = _a.sent();
                    return [4, possiblyWaitInjections(args.propertyInjections)];
                case 2:
                    propertyInjections = _a.sent();
                    return [2, createInstanceWithInjections(__assign(__assign({}, args), { constructorInjections: constructorInjections, propertyInjections: propertyInjections }))];
            }
        });
    });
}
function possiblyWaitInjections(possiblePromiseinjections) {
    return __awaiter(this, void 0, void 0, function () {
        var injections, _i, possiblePromiseinjections_1, injection;
        return __generator(this, function (_a) {
            injections = [];
            for (_i = 0, possiblePromiseinjections_1 = possiblePromiseinjections; _i < possiblePromiseinjections_1.length; _i++) {
                injection = possiblePromiseinjections_1[_i];
                if (Array.isArray(injection)) {
                    injections.push(Promise.all(injection));
                }
                else {
                    injections.push(injection);
                }
            }
            return [2, Promise.all(injections)];
        });
    });
}
function _getInstanceAfterPostConstruct(constr, result) {
    var postConstructResult = _postConstruct(constr, result);
    if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_1__.isPromise)(postConstructResult)) {
        return postConstructResult.then(function () { return result; });
    }
    else {
        return result;
    }
}
function _postConstruct(constr, instance) {
    var _a, _b;
    if (Reflect.hasMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__.POST_CONSTRUCT, constr)) {
        var data = Reflect.getMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__.POST_CONSTRUCT, constr);
        try {
            return (_b = (_a = instance)[data.value]) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        catch (e) {
            throw new Error((0,_constants_error_msgs__WEBPACK_IMPORTED_MODULE_3__.POST_CONSTRUCT_ERROR)(constr.name, e.message));
        }
    }
}
function _validateInstanceResolution(binding, constr) {
    if (binding.scope !== _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton) {
        _throwIfHandlingDeactivation(binding, constr);
    }
}
function _throwIfHandlingDeactivation(binding, constr) {
    var scopeErrorMessage = "Class cannot be instantiated in " + (binding.scope === _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Request ?
        "request" :
        "transient") + " scope.";
    if (typeof binding.onDeactivation === "function") {
        throw new Error((0,_constants_error_msgs__WEBPACK_IMPORTED_MODULE_3__.ON_DEACTIVATION_ERROR)(constr.name, scopeErrorMessage));
    }
    if (Reflect.hasMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__.PRE_DESTROY, constr)) {
        throw new Error((0,_constants_error_msgs__WEBPACK_IMPORTED_MODULE_3__.PRE_DESTROY_ERROR)(constr.name, scopeErrorMessage));
    }
}
function resolveInstance(binding, constr, childRequests, resolveRequest) {
    _validateInstanceResolution(binding, constr);
    var result = _createInstance(constr, childRequests, resolveRequest);
    if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_1__.isPromise)(result)) {
        return result.then(function (resolvedResult) { return _getInstanceAfterPostConstruct(constr, resolvedResult); });
    }
    else {
        return _getInstanceAfterPostConstruct(constr, result);
    }
}

//# sourceMappingURL=instantiation.js.map

/***/ }),

/***/ "./node_modules/inversify/es/resolution/resolver.js":
/*!**********************************************************!*\
  !*** ./node_modules/inversify/es/resolution/resolver.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolve": () => (/* binding */ resolve)
/* harmony export */ });
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");
/* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/es/constants/literal_types.js");
/* harmony import */ var _planning_planner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../planning/planner */ "./node_modules/inversify/es/planning/planner.js");
/* harmony import */ var _scope_scope__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../scope/scope */ "./node_modules/inversify/es/scope/scope.js");
/* harmony import */ var _utils_async__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/async */ "./node_modules/inversify/es/utils/async.js");
/* harmony import */ var _utils_binding_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/binding_utils */ "./node_modules/inversify/es/utils/binding_utils.js");
/* harmony import */ var _utils_exceptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/exceptions */ "./node_modules/inversify/es/utils/exceptions.js");
/* harmony import */ var _instantiation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instantiation */ "./node_modules/inversify/es/resolution/instantiation.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
            if (request.target.isOptional() && bindings.length === 0) {
                return undefined;
            }
            var binding = bindings[0];
            return _resolveBinding(requestScope, request, binding);
        }
    };
};
var _resolveFactoryFromBinding = function (binding, context) {
    var factoryDetails = (0,_utils_binding_utils__WEBPACK_IMPORTED_MODULE_0__.getFactoryDetails)(binding);
    return (0,_utils_exceptions__WEBPACK_IMPORTED_MODULE_1__.tryAndThrowErrorIfStackOverflow)(function () { return factoryDetails.factory.bind(binding)(context); }, function () { return new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__.CIRCULAR_DEPENDENCY_IN_FACTORY(factoryDetails.factoryType, context.currentRequest.serviceIdentifier.toString())); });
};
var _getResolvedFromBinding = function (requestScope, request, binding) {
    var result;
    var childRequests = request.childRequests;
    (0,_utils_binding_utils__WEBPACK_IMPORTED_MODULE_0__.ensureFullyBound)(binding);
    switch (binding.type) {
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_3__.BindingTypeEnum.ConstantValue:
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_3__.BindingTypeEnum.Function:
            result = binding.cache;
            break;
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_3__.BindingTypeEnum.Constructor:
            result = binding.implementationType;
            break;
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_3__.BindingTypeEnum.Instance:
            result = (0,_instantiation__WEBPACK_IMPORTED_MODULE_4__.resolveInstance)(binding, binding.implementationType, childRequests, _resolveRequest(requestScope));
            break;
        default:
            result = _resolveFactoryFromBinding(binding, request.parentContext);
    }
    return result;
};
var _resolveInScope = function (requestScope, binding, resolveFromBinding) {
    var result = (0,_scope_scope__WEBPACK_IMPORTED_MODULE_5__.tryGetFromScope)(requestScope, binding);
    if (result !== null) {
        return result;
    }
    result = resolveFromBinding();
    (0,_scope_scope__WEBPACK_IMPORTED_MODULE_5__.saveToScope)(requestScope, binding, result);
    return result;
};
var _resolveBinding = function (requestScope, request, binding) {
    return _resolveInScope(requestScope, binding, function () {
        var result = _getResolvedFromBinding(requestScope, request, binding);
        if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_6__.isPromise)(result)) {
            result = result.then(function (resolved) { return _onActivation(request, binding, resolved); });
        }
        else {
            result = _onActivation(request, binding, result);
        }
        return result;
    });
};
function _onActivation(request, binding, resolved) {
    var result = _bindingActivation(request.parentContext, binding, resolved);
    var containersIterator = _getContainersIterator(request.parentContext.container);
    var container;
    var containersIteratorResult = containersIterator.next();
    do {
        container = containersIteratorResult.value;
        var context_1 = request.parentContext;
        var serviceIdentifier = request.serviceIdentifier;
        var activationsIterator = _getContainerActivationsForService(container, serviceIdentifier);
        if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_6__.isPromise)(result)) {
            result = _activateContainerAsync(activationsIterator, context_1, result);
        }
        else {
            result = _activateContainer(activationsIterator, context_1, result);
        }
        containersIteratorResult = containersIterator.next();
    } while (containersIteratorResult.done !== true && !(0,_planning_planner__WEBPACK_IMPORTED_MODULE_7__.getBindingDictionary)(container).hasKey(request.serviceIdentifier));
    return result;
}
var _bindingActivation = function (context, binding, previousResult) {
    var result;
    if (typeof binding.onActivation === "function") {
        result = binding.onActivation(context, previousResult);
    }
    else {
        result = previousResult;
    }
    return result;
};
var _activateContainer = function (activationsIterator, context, result) {
    var activation = activationsIterator.next();
    while (!activation.done) {
        result = activation.value(context, result);
        if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_6__.isPromise)(result)) {
            return _activateContainerAsync(activationsIterator, context, result);
        }
        activation = activationsIterator.next();
    }
    return result;
};
var _activateContainerAsync = function (activationsIterator, context, resultPromise) { return __awaiter(void 0, void 0, void 0, function () {
    var result, activation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, resultPromise];
            case 1:
                result = _a.sent();
                activation = activationsIterator.next();
                _a.label = 2;
            case 2:
                if (!!activation.done) return [3, 4];
                return [4, activation.value(context, result)];
            case 3:
                result = _a.sent();
                activation = activationsIterator.next();
                return [3, 2];
            case 4: return [2, result];
        }
    });
}); };
var _getContainerActivationsForService = function (container, serviceIdentifier) {
    var activations = container._activations;
    return activations.hasKey(serviceIdentifier) ? activations.get(serviceIdentifier).values() : [].values();
};
var _getContainersIterator = function (container) {
    var containersStack = [container];
    var parent = container.parent;
    while (parent !== null) {
        containersStack.push(parent);
        parent = parent.parent;
    }
    var getNextContainer = function () {
        var nextContainer = containersStack.pop();
        if (nextContainer !== undefined) {
            return { done: false, value: nextContainer };
        }
        else {
            return { done: true, value: undefined };
        }
    };
    var containersIterator = {
        next: getNextContainer,
    };
    return containersIterator;
};
function resolve(context) {
    var _f = _resolveRequest(context.plan.rootRequest.requestScope);
    return _f(context.plan.rootRequest);
}

//# sourceMappingURL=resolver.js.map

/***/ }),

/***/ "./node_modules/inversify/es/scope/scope.js":
/*!**************************************************!*\
  !*** ./node_modules/inversify/es/scope/scope.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tryGetFromScope": () => (/* binding */ tryGetFromScope),
/* harmony export */   "saveToScope": () => (/* binding */ saveToScope)
/* harmony export */ });
/* harmony import */ var _inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../inversify */ "./node_modules/inversify/es/constants/literal_types.js");
/* harmony import */ var _utils_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/async */ "./node_modules/inversify/es/utils/async.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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


var tryGetFromScope = function (requestScope, binding) {
    if ((binding.scope === _inversify__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton) && binding.activated) {
        return binding.cache;
    }
    if (binding.scope === _inversify__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Request &&
        requestScope.has(binding.id)) {
        return requestScope.get(binding.id);
    }
    return null;
};
var saveToScope = function (requestScope, binding, result) {
    if (binding.scope === _inversify__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton) {
        _saveToSingletonScope(binding, result);
    }
    if (binding.scope === _inversify__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Request) {
        _saveToRequestScope(requestScope, binding, result);
    }
};
var _saveToRequestScope = function (requestScope, binding, result) {
    if (!requestScope.has(binding.id)) {
        requestScope.set(binding.id, result);
    }
};
var _saveToSingletonScope = function (binding, result) {
    binding.cache = result;
    binding.activated = true;
    if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_1__.isPromise)(result)) {
        void _saveAsyncResultToSingletonScope(binding, result);
    }
};
var _saveAsyncResultToSingletonScope = function (binding, asyncResult) { return __awaiter(void 0, void 0, void 0, function () {
    var result, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, asyncResult];
            case 1:
                result = _a.sent();
                binding.cache = result;
                return [3, 3];
            case 2:
                ex_1 = _a.sent();
                binding.cache = null;
                binding.activated = false;
                throw ex_1;
            case 3: return [2];
        }
    });
}); };
//# sourceMappingURL=scope.js.map

/***/ }),

/***/ "./node_modules/inversify/es/syntax/binding_in_syntax.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/es/syntax/binding_in_syntax.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BindingInSyntax": () => (/* binding */ BindingInSyntax)
/* harmony export */ });
/* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/es/constants/literal_types.js");
/* harmony import */ var _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binding_when_on_syntax */ "./node_modules/inversify/es/syntax/binding_when_on_syntax.js");


var BindingInSyntax = (function () {
    function BindingInSyntax(binding) {
        this._binding = binding;
    }
    BindingInSyntax.prototype.inRequestScope = function () {
        this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Request;
        return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingWhenOnSyntax(this._binding);
    };
    BindingInSyntax.prototype.inSingletonScope = function () {
        this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
        return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingWhenOnSyntax(this._binding);
    };
    BindingInSyntax.prototype.inTransientScope = function () {
        this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Transient;
        return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingWhenOnSyntax(this._binding);
    };
    return BindingInSyntax;
}());

//# sourceMappingURL=binding_in_syntax.js.map

/***/ }),

/***/ "./node_modules/inversify/es/syntax/binding_in_when_on_syntax.js":
/*!***********************************************************************!*\
  !*** ./node_modules/inversify/es/syntax/binding_in_when_on_syntax.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BindingInWhenOnSyntax": () => (/* binding */ BindingInWhenOnSyntax)
/* harmony export */ });
/* harmony import */ var _binding_in_syntax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./binding_in_syntax */ "./node_modules/inversify/es/syntax/binding_in_syntax.js");
/* harmony import */ var _binding_on_syntax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/inversify/es/syntax/binding_on_syntax.js");
/* harmony import */ var _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/inversify/es/syntax/binding_when_syntax.js");



var BindingInWhenOnSyntax = (function () {
    function BindingInWhenOnSyntax(binding) {
        this._binding = binding;
        this._bindingWhenSyntax = new _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingWhenSyntax(this._binding);
        this._bindingOnSyntax = new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingOnSyntax(this._binding);
        this._bindingInSyntax = new _binding_in_syntax__WEBPACK_IMPORTED_MODULE_2__.BindingInSyntax(binding);
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
    BindingInWhenOnSyntax.prototype.onDeactivation = function (handler) {
        return this._bindingOnSyntax.onDeactivation(handler);
    };
    return BindingInWhenOnSyntax;
}());

//# sourceMappingURL=binding_in_when_on_syntax.js.map

/***/ }),

/***/ "./node_modules/inversify/es/syntax/binding_on_syntax.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/es/syntax/binding_on_syntax.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BindingOnSyntax": () => (/* binding */ BindingOnSyntax)
/* harmony export */ });
/* harmony import */ var _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/inversify/es/syntax/binding_when_syntax.js");

var BindingOnSyntax = (function () {
    function BindingOnSyntax(binding) {
        this._binding = binding;
    }
    BindingOnSyntax.prototype.onActivation = function (handler) {
        this._binding.onActivation = handler;
        return new _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingWhenSyntax(this._binding);
    };
    BindingOnSyntax.prototype.onDeactivation = function (handler) {
        this._binding.onDeactivation = handler;
        return new _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingWhenSyntax(this._binding);
    };
    return BindingOnSyntax;
}());

//# sourceMappingURL=binding_on_syntax.js.map

/***/ }),

/***/ "./node_modules/inversify/es/syntax/binding_to_syntax.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/es/syntax/binding_to_syntax.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BindingToSyntax": () => (/* binding */ BindingToSyntax)
/* harmony export */ });
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");
/* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/es/constants/literal_types.js");
/* harmony import */ var _binding_in_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binding_in_when_on_syntax */ "./node_modules/inversify/es/syntax/binding_in_when_on_syntax.js");
/* harmony import */ var _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./binding_when_on_syntax */ "./node_modules/inversify/es/syntax/binding_when_on_syntax.js");




var BindingToSyntax = (function () {
    function BindingToSyntax(binding) {
        this._binding = binding;
    }
    BindingToSyntax.prototype.to = function (constructor) {
        this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Instance;
        this._binding.implementationType = constructor;
        return new _binding_in_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingInWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toSelf = function () {
        if (typeof this._binding.serviceIdentifier !== "function") {
            throw new Error("" + _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__.INVALID_TO_SELF_VALUE);
        }
        var self = this._binding.serviceIdentifier;
        return this.to(self);
    };
    BindingToSyntax.prototype.toConstantValue = function (value) {
        this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.ConstantValue;
        this._binding.cache = value;
        this._binding.dynamicValue = null;
        this._binding.implementationType = null;
        this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
        return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toDynamicValue = function (func) {
        this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.DynamicValue;
        this._binding.cache = null;
        this._binding.dynamicValue = func;
        this._binding.implementationType = null;
        return new _binding_in_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingInWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toConstructor = function (constructor) {
        this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Constructor;
        this._binding.implementationType = constructor;
        this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
        return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toFactory = function (factory) {
        this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Factory;
        this._binding.factory = factory;
        this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
        return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toFunction = function (func) {
        if (typeof func !== "function") {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__.INVALID_FUNCTION_BINDING);
        }
        var bindingWhenOnSyntax = this.toConstantValue(func);
        this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Function;
        this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
        return bindingWhenOnSyntax;
    };
    BindingToSyntax.prototype.toAutoFactory = function (serviceIdentifier) {
        this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Factory;
        this._binding.factory = function (context) {
            var autofactory = function () { return context.container.get(serviceIdentifier); };
            return autofactory;
        };
        this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
        return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toAutoNamedFactory = function (serviceIdentifier) {
        this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Factory;
        this._binding.factory = function (context) {
            return function (named) { return context.container.getNamed(serviceIdentifier, named); };
        };
        return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toProvider = function (provider) {
        this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Provider;
        this._binding.provider = provider;
        this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
        return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toService = function (service) {
        this.toDynamicValue(function (context) { return context.container.get(service); });
    };
    return BindingToSyntax;
}());

//# sourceMappingURL=binding_to_syntax.js.map

/***/ }),

/***/ "./node_modules/inversify/es/syntax/binding_when_on_syntax.js":
/*!********************************************************************!*\
  !*** ./node_modules/inversify/es/syntax/binding_when_on_syntax.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BindingWhenOnSyntax": () => (/* binding */ BindingWhenOnSyntax)
/* harmony export */ });
/* harmony import */ var _binding_on_syntax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/inversify/es/syntax/binding_on_syntax.js");
/* harmony import */ var _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/inversify/es/syntax/binding_when_syntax.js");


var BindingWhenOnSyntax = (function () {
    function BindingWhenOnSyntax(binding) {
        this._binding = binding;
        this._bindingWhenSyntax = new _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingWhenSyntax(this._binding);
        this._bindingOnSyntax = new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingOnSyntax(this._binding);
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
    BindingWhenOnSyntax.prototype.onDeactivation = function (handler) {
        return this._bindingOnSyntax.onDeactivation(handler);
    };
    return BindingWhenOnSyntax;
}());

//# sourceMappingURL=binding_when_on_syntax.js.map

/***/ }),

/***/ "./node_modules/inversify/es/syntax/binding_when_syntax.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/es/syntax/binding_when_syntax.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BindingWhenSyntax": () => (/* binding */ BindingWhenSyntax)
/* harmony export */ });
/* harmony import */ var _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/inversify/es/syntax/binding_on_syntax.js");
/* harmony import */ var _constraint_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constraint_helpers */ "./node_modules/inversify/es/syntax/constraint_helpers.js");


var BindingWhenSyntax = (function () {
    function BindingWhenSyntax(binding) {
        this._binding = binding;
    }
    BindingWhenSyntax.prototype.when = function (constraint) {
        this._binding.constraint = constraint;
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetNamed = function (name) {
        this._binding.constraint = (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.namedConstraint)(name);
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetIsDefault = function () {
        this._binding.constraint = function (request) {
            if (request === null) {
                return false;
            }
            var targetIsDefault = (request.target !== null) &&
                (!request.target.isNamed()) &&
                (!request.target.isTagged());
            return targetIsDefault;
        };
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetTagged = function (tag, value) {
        this._binding.constraint = (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.taggedConstraint)(tag)(value);
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenInjectedInto = function (parent) {
        this._binding.constraint = function (request) {
            return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.typeConstraint)(parent)(request.parentRequest);
        };
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenParentNamed = function (name) {
        this._binding.constraint = function (request) {
            return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.namedConstraint)(name)(request.parentRequest);
        };
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenParentTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.taggedConstraint)(tag)(value)(request.parentRequest);
        };
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        this._binding.constraint = function (request) {
            return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.typeConstraint)(ancestor));
        };
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        this._binding.constraint = function (request) {
            return request !== null && !(0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.typeConstraint)(ancestor));
        };
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorNamed = function (name) {
        this._binding.constraint = function (request) {
            return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.namedConstraint)(name));
        };
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorNamed = function (name) {
        this._binding.constraint = function (request) {
            return request !== null && !(0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.namedConstraint)(name));
        };
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.taggedConstraint)(tag)(value));
        };
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return request !== null && !(0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.taggedConstraint)(tag)(value));
        };
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        this._binding.constraint = function (request) {
            return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, constraint);
        };
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        this._binding.constraint = function (request) {
            return request !== null && !(0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, constraint);
        };
        return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
    };
    return BindingWhenSyntax;
}());

//# sourceMappingURL=binding_when_syntax.js.map

/***/ }),

/***/ "./node_modules/inversify/es/syntax/constraint_helpers.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/es/syntax/constraint_helpers.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "traverseAncerstors": () => (/* binding */ traverseAncerstors),
/* harmony export */   "taggedConstraint": () => (/* binding */ taggedConstraint),
/* harmony export */   "namedConstraint": () => (/* binding */ namedConstraint),
/* harmony export */   "typeConstraint": () => (/* binding */ typeConstraint)
/* harmony export */ });
/* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/es/constants/metadata_keys.js");
/* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/es/planning/metadata.js");


var traverseAncerstors = function (request, constraint) {
    var parent = request.parentRequest;
    if (parent !== null) {
        return constraint(parent) ? true : traverseAncerstors(parent, constraint);
    }
    else {
        return false;
    }
};
var taggedConstraint = function (key) { return function (value) {
    var constraint = function (request) {
        return request !== null && request.target !== null && request.target.matchesTag(key)(value);
    };
    constraint.metaData = new _planning_metadata__WEBPACK_IMPORTED_MODULE_0__.Metadata(key, value);
    return constraint;
}; };
var namedConstraint = taggedConstraint(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.NAMED_TAG);
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

//# sourceMappingURL=constraint_helpers.js.map

/***/ }),

/***/ "./node_modules/inversify/es/utils/async.js":
/*!**************************************************!*\
  !*** ./node_modules/inversify/es/utils/async.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPromise": () => (/* binding */ isPromise),
/* harmony export */   "isPromiseOrContainsPromise": () => (/* binding */ isPromiseOrContainsPromise)
/* harmony export */ });
function isPromise(object) {
    var isObjectOrFunction = (typeof object === 'object' && object !== null) || typeof object === 'function';
    return isObjectOrFunction && typeof object.then === "function";
}
function isPromiseOrContainsPromise(object) {
    if (isPromise(object)) {
        return true;
    }
    return Array.isArray(object) && object.some(isPromise);
}

//# sourceMappingURL=async.js.map

/***/ }),

/***/ "./node_modules/inversify/es/utils/binding_utils.js":
/*!**********************************************************!*\
  !*** ./node_modules/inversify/es/utils/binding_utils.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "multiBindToService": () => (/* binding */ multiBindToService),
/* harmony export */   "ensureFullyBound": () => (/* binding */ ensureFullyBound),
/* harmony export */   "getFactoryDetails": () => (/* binding */ getFactoryDetails)
/* harmony export */ });
/* harmony import */ var _inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../inversify */ "./node_modules/inversify/es/utils/serialization.js");
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");
/* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/es/constants/literal_types.js");
/* harmony import */ var _factory_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factory_type */ "./node_modules/inversify/es/utils/factory_type.js");




var multiBindToService = function (container) {
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
var ensureFullyBound = function (binding) {
    var boundValue = null;
    switch (binding.type) {
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.ConstantValue:
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Function:
            boundValue = binding.cache;
            break;
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Constructor:
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Instance:
            boundValue = binding.implementationType;
            break;
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.DynamicValue:
            boundValue = binding.dynamicValue;
            break;
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Provider:
            boundValue = binding.provider;
            break;
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Factory:
            boundValue = binding.factory;
            break;
    }
    if (boundValue === null) {
        var serviceIdentifierAsString = (0,_inversify__WEBPACK_IMPORTED_MODULE_1__.getServiceIdentifierAsString)(binding.serviceIdentifier);
        throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__.INVALID_BINDING_TYPE + " " + serviceIdentifierAsString);
    }
};
var getFactoryDetails = function (binding) {
    switch (binding.type) {
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Factory:
            return { factory: binding.factory, factoryType: _factory_type__WEBPACK_IMPORTED_MODULE_3__.FactoryType.Factory };
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Provider:
            return { factory: binding.provider, factoryType: _factory_type__WEBPACK_IMPORTED_MODULE_3__.FactoryType.Provider };
        case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.DynamicValue:
            return { factory: binding.dynamicValue, factoryType: _factory_type__WEBPACK_IMPORTED_MODULE_3__.FactoryType.DynamicValue };
        default:
            throw new Error("Unexpected factory type " + binding.type);
    }
};
//# sourceMappingURL=binding_utils.js.map

/***/ }),

/***/ "./node_modules/inversify/es/utils/clonable.js":
/*!*****************************************************!*\
  !*** ./node_modules/inversify/es/utils/clonable.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isClonable": () => (/* binding */ isClonable)
/* harmony export */ });
function isClonable(obj) {
    return (typeof obj === 'object')
        && (obj !== null)
        && ('clone' in obj)
        && typeof obj.clone === 'function';
}

//# sourceMappingURL=clonable.js.map

/***/ }),

/***/ "./node_modules/inversify/es/utils/exceptions.js":
/*!*******************************************************!*\
  !*** ./node_modules/inversify/es/utils/exceptions.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isStackOverflowExeption": () => (/* binding */ isStackOverflowExeption),
/* harmony export */   "tryAndThrowErrorIfStackOverflow": () => (/* binding */ tryAndThrowErrorIfStackOverflow)
/* harmony export */ });
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");

function isStackOverflowExeption(error) {
    return (error instanceof RangeError ||
        error.message === _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.STACK_OVERFLOW);
}
var tryAndThrowErrorIfStackOverflow = function (fn, errorCallback) {
    try {
        return fn();
    }
    catch (error) {
        if (isStackOverflowExeption(error)) {
            error = errorCallback();
        }
        throw error;
    }
};
//# sourceMappingURL=exceptions.js.map

/***/ }),

/***/ "./node_modules/inversify/es/utils/factory_type.js":
/*!*********************************************************!*\
  !*** ./node_modules/inversify/es/utils/factory_type.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FactoryType": () => (/* binding */ FactoryType)
/* harmony export */ });
var FactoryType;
(function (FactoryType) {
    FactoryType["DynamicValue"] = "toDynamicValue";
    FactoryType["Factory"] = "toFactory";
    FactoryType["Provider"] = "toProvider";
})(FactoryType || (FactoryType = {}));
//# sourceMappingURL=factory_type.js.map

/***/ }),

/***/ "./node_modules/inversify/es/utils/id.js":
/*!***********************************************!*\
  !*** ./node_modules/inversify/es/utils/id.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "id": () => (/* binding */ id)
/* harmony export */ });
var idCounter = 0;
function id() {
    return idCounter++;
}

//# sourceMappingURL=id.js.map

/***/ }),

/***/ "./node_modules/inversify/es/utils/js.js":
/*!***********************************************!*\
  !*** ./node_modules/inversify/es/utils/js.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFirstArrayDuplicate": () => (/* binding */ getFirstArrayDuplicate)
/* harmony export */ });
function getFirstArrayDuplicate(array) {
    var seenValues = new Set();
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var entry = array_1[_i];
        if (seenValues.has(entry)) {
            return entry;
        }
        else {
            seenValues.add(entry);
        }
    }
    return undefined;
}
//# sourceMappingURL=js.js.map

/***/ }),

/***/ "./node_modules/inversify/es/utils/serialization.js":
/*!**********************************************************!*\
  !*** ./node_modules/inversify/es/utils/serialization.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFunctionName": () => (/* binding */ getFunctionName),
/* harmony export */   "getServiceIdentifierAsString": () => (/* binding */ getServiceIdentifierAsString),
/* harmony export */   "listRegisteredBindingsForServiceIdentifier": () => (/* binding */ listRegisteredBindingsForServiceIdentifier),
/* harmony export */   "listMetadataForTarget": () => (/* binding */ listMetadataForTarget),
/* harmony export */   "circularDependencyToException": () => (/* binding */ circularDependencyToException),
/* harmony export */   "getSymbolDescription": () => (/* binding */ getSymbolDescription)
/* harmony export */ });
/* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/es/constants/error_msgs.js");

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
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.CIRCULAR_DEPENDENCY + " " + services);
        }
        else {
            circularDependencyToException(childRequest);
        }
    });
}
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
function getFunctionName(func) {
    if (func.name) {
        return func.name;
    }
    else {
        var name_1 = func.toString();
        var match = name_1.match(/^function\s*([^\s(]+)/);
        return match ? match[1] : "Anonymous function: " + name_1;
    }
}
function getSymbolDescription(symbol) {
    return symbol.toString().slice(7, -1);
}

//# sourceMappingURL=serialization.js.map

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
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/inversify.js");
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
    (0, inversify_1.injectable)()
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
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/inversify.js");
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
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(models_1.TYPES.IBuildAgent)),
    __param(1, (0, inversify_1.inject)(models_1.TYPES.IVersionManager)),
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
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/inversify.js");
const versionManager_1 = __webpack_require__(/*! ./versionManager */ "./src/core/versionManager.ts");
const models_1 = __webpack_require__(/*! ./models */ "./src/core/models.ts");
const build_agent_1 = __webpack_require__(/*! ../agent/mock/build-agent */ "./src/agent/mock/build-agent.ts");
const container = new inversify_1.Container();
container.bind(models_1.TYPES.IVersionManager).to(versionManager_1.VersionManager);
container.bind(models_1.TYPES.IBuildAgent).to(build_agent_1.BuildAgent);
exports["default"] = container;


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
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/inversify.js");
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
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(models_1.TYPES.IBuildAgent)),
    __metadata("design:paramtypes", [Object])
], VersionManager);
exports.VersionManager = VersionManager;


/***/ }),

/***/ "./src/tasks/gitreleasemanager/main.ts":
/*!*********************************************!*\
  !*** ./src/tasks/gitreleasemanager/main.ts ***!
  \*********************************************/
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
exports.addAsset = exports.publish = exports.open = exports.close = exports.discard = exports.create = exports.setup = void 0;
const models_1 = __webpack_require__(/*! ../../core/models */ "./src/core/models.ts");
const tool_1 = __webpack_require__(/*! ../../tools/gitreleasemanager/tool */ "./src/tools/gitreleasemanager/tool.ts");
const settings_1 = __webpack_require__(/*! ../../core/settings */ "./src/core/settings.ts");
const settings_2 = __webpack_require__(/*! ../../tools/gitreleasemanager/settings */ "./src/tools/gitreleasemanager/settings.ts");
const ioc_1 = __importDefault(__webpack_require__(/*! ../../core/ioc */ "./src/core/ioc.ts"));
ioc_1.default
    .bind(models_1.TYPES.IGitReleaseManagerTool)
    .to(tool_1.GitReleaseManagerTool);
const gitReleaseManagerTool = ioc_1.default.get(models_1.TYPES.IGitReleaseManagerTool);
const buildAgent = ioc_1.default.get(models_1.TYPES.IBuildAgent);
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            gitReleaseManagerTool.disableTelemetry();
            const settings = settings_1.Settings.getSetupSettings(buildAgent);
            yield gitReleaseManagerTool.install(settings.versionSpec, settings.includePrerelease);
            buildAgent.setSucceeded('GitVersionManager installed successfully', true);
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
            buildAgent.setSucceeded('GitVersionManager created release successfully', true);
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
            buildAgent.setSucceeded('GitVersionManager discarded release successfully', true);
        }
        catch (error) {
            buildAgent.setFailed(error.message, true);
        }
    });
}
exports.discard = discard;
function close() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            gitReleaseManagerTool.disableTelemetry();
            const settings = settings_2.Settings.getCloseSettings(buildAgent);
            yield gitReleaseManagerTool.close(settings);
            buildAgent.setSucceeded('GitVersionManager closed release successfully', true);
        }
        catch (error) {
            buildAgent.setFailed(error.message, true);
        }
    });
}
exports.close = close;
function open() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            gitReleaseManagerTool.disableTelemetry();
            const settings = settings_2.Settings.getOpenSettings(buildAgent);
            yield gitReleaseManagerTool.open(settings);
            buildAgent.setSucceeded('GitVersionManager opened release successfully', true);
        }
        catch (error) {
            buildAgent.setFailed(error.message, true);
        }
    });
}
exports.open = open;
function publish() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            gitReleaseManagerTool.disableTelemetry();
            const settings = settings_2.Settings.getPublishSettings(buildAgent);
            yield gitReleaseManagerTool.publish(settings);
            buildAgent.setSucceeded('GitVersionManager published release successfully', true);
        }
        catch (error) {
            buildAgent.setFailed(error.message, true);
        }
    });
}
exports.publish = publish;
function addAsset() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            gitReleaseManagerTool.disableTelemetry();
            const settings = settings_2.Settings.getAddAssetSettings(buildAgent);
            yield gitReleaseManagerTool.addAsset(settings);
            buildAgent.setSucceeded('GitVersionManager added assets to release successfully', true);
        }
        catch (error) {
            buildAgent.setFailed(error.message, true);
        }
    });
}
exports.addAsset = addAsset;


/***/ }),

/***/ "./src/tools/gitreleasemanager/models.ts":
/*!***********************************************!*\
  !*** ./src/tools/gitreleasemanager/models.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddAssetFields = exports.PublishFields = exports.OpenFields = exports.CloseFields = exports.DiscardFields = exports.CreateFields = exports.CommonFields = void 0;
var CommonFields;
(function (CommonFields) {
    CommonFields["repository"] = "repository";
    CommonFields["owner"] = "owner";
    CommonFields["token"] = "token";
    CommonFields["targetDirectory"] = "targetDirectory";
})(CommonFields = exports.CommonFields || (exports.CommonFields = {}));
var CreateFields;
(function (CreateFields) {
    CreateFields["milestone"] = "milestone";
    CreateFields["name"] = "name";
    CreateFields["inputFileName"] = "inputFileName";
    CreateFields["isPreRelease"] = "isPreRelease";
    CreateFields["commit"] = "commit";
    CreateFields["assets"] = "assets";
})(CreateFields = exports.CreateFields || (exports.CreateFields = {}));
var DiscardFields;
(function (DiscardFields) {
    DiscardFields["milestone"] = "milestone";
})(DiscardFields = exports.DiscardFields || (exports.DiscardFields = {}));
var CloseFields;
(function (CloseFields) {
    CloseFields["milestone"] = "milestone";
})(CloseFields = exports.CloseFields || (exports.CloseFields = {}));
var OpenFields;
(function (OpenFields) {
    OpenFields["milestone"] = "milestone";
})(OpenFields = exports.OpenFields || (exports.OpenFields = {}));
var PublishFields;
(function (PublishFields) {
    PublishFields["tagName"] = "tagName";
})(PublishFields = exports.PublishFields || (exports.PublishFields = {}));
var AddAssetFields;
(function (AddAssetFields) {
    AddAssetFields["tagName"] = "tagName";
    AddAssetFields["assets"] = "assets";
})(AddAssetFields = exports.AddAssetFields || (exports.AddAssetFields = {}));


/***/ }),

/***/ "./src/tools/gitreleasemanager/settings.ts":
/*!*************************************************!*\
  !*** ./src/tools/gitreleasemanager/settings.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Settings = void 0;
const models_1 = __webpack_require__(/*! ./models */ "./src/tools/gitreleasemanager/models.ts");
class Settings {
    static getCreateSettings(buildAgent) {
        const milestone = buildAgent.getInput(models_1.CreateFields.milestone);
        const name = buildAgent.getInput(models_1.CreateFields.name);
        const inputFileName = buildAgent.getInput(models_1.CreateFields.inputFileName);
        const isPreRelease = buildAgent.getBooleanInput(models_1.CreateFields.isPreRelease);
        const commit = buildAgent.getInput(models_1.CreateFields.commit);
        const assets = buildAgent.getListInput(models_1.CreateFields.assets);
        const commonSettings = Settings.getCommonSettings(buildAgent);
        return Object.assign(Object.assign({}, commonSettings), { milestone,
            name,
            inputFileName,
            isPreRelease,
            commit,
            assets });
    }
    static getDiscardSettings(buildAgent) {
        const milestone = buildAgent.getInput(models_1.DiscardFields.milestone);
        const commonSettings = Settings.getCommonSettings(buildAgent);
        return Object.assign(Object.assign({}, commonSettings), { milestone });
    }
    static getCloseSettings(buildAgent) {
        const milestone = buildAgent.getInput(models_1.CloseFields.milestone);
        const commonSettings = Settings.getCommonSettings(buildAgent);
        return Object.assign(Object.assign({}, commonSettings), { milestone });
    }
    static getOpenSettings(buildAgent) {
        const milestone = buildAgent.getInput(models_1.OpenFields.milestone);
        const commonSettings = Settings.getCommonSettings(buildAgent);
        return Object.assign(Object.assign({}, commonSettings), { milestone });
    }
    static getPublishSettings(buildAgent) {
        const tagName = buildAgent.getInput(models_1.PublishFields.tagName);
        const commonSettings = Settings.getCommonSettings(buildAgent);
        return Object.assign(Object.assign({}, commonSettings), { tagName });
    }
    static getAddAssetSettings(buildAgent) {
        const tagName = buildAgent.getInput(models_1.AddAssetFields.tagName);
        const assets = buildAgent.getListInput(models_1.AddAssetFields.assets);
        const commonSettings = Settings.getCommonSettings(buildAgent);
        return Object.assign(Object.assign({}, commonSettings), { tagName,
            assets });
    }
    static getCommonSettings(buildAgent) {
        const owner = buildAgent.getInput(models_1.CommonFields.owner, true);
        const repository = buildAgent.getInput(models_1.CommonFields.repository, true);
        const token = buildAgent.getInput(models_1.CommonFields.token, true);
        const targetDirectory = buildAgent.getInput(models_1.CommonFields.targetDirectory);
        return {
            owner,
            repository,
            token,
            targetDirectory
        };
    }
}
exports.Settings = Settings;


/***/ }),

/***/ "./src/tools/gitreleasemanager/tool.ts":
/*!*********************************************!*\
  !*** ./src/tools/gitreleasemanager/tool.ts ***!
  \*********************************************/
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
exports.GitReleaseManagerTool = void 0;
const path = __webpack_require__(/*! path */ "path");
const models_1 = __webpack_require__(/*! ../../core/models */ "./src/core/models.ts");
const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/inversify.js");
const dotnet_tool_1 = __webpack_require__(/*! ../../core/dotnet-tool */ "./src/core/dotnet-tool.ts");
let GitReleaseManagerTool = class GitReleaseManagerTool extends dotnet_tool_1.DotnetTool {
    constructor(buildAgent, versionManager) {
        super(buildAgent, versionManager);
    }
    install(versionSpec, includePrerelease) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.toolInstall('GitReleaseManager.Tool', versionSpec, false, includePrerelease);
        });
    }
    create(settings) {
        const args = this.getCreateArguments(settings);
        return this.execute('dotnet-gitreleasemanager', args);
    }
    discard(settings) {
        const args = this.getDiscardArguments(settings);
        return this.execute('dotnet-gitreleasemanager', args);
    }
    close(settings) {
        const args = this.getCloseArguments(settings);
        return this.execute('dotnet-gitreleasemanager', args);
    }
    open(settings) {
        const args = this.getOpenArguments(settings);
        return this.execute('dotnet-gitreleasemanager', args);
    }
    publish(settings) {
        const args = this.getPublishArguments(settings);
        return this.execute('dotnet-gitreleasemanager', args);
    }
    addAsset(settings) {
        const args = this.getAddAssetArguments(settings);
        return this.execute('dotnet-gitreleasemanager', args);
    }
    getCommonArguments(settings) {
        const args = [];
        args.push('--owner', settings.owner);
        args.push('--repository', settings.repository);
        args.push('--token', settings.token);
        settings.targetDirectory = this.getRepoDir(settings.targetDirectory);
        args.push('--targetDirectory', settings.targetDirectory);
        return args;
    }
    getCreateArguments(settings) {
        const args = ['create', ...this.getCommonArguments(settings)];
        if (settings.milestone) {
            args.push('--milestone', settings.milestone);
        }
        if (settings.name) {
            args.push('--name', settings.name);
        }
        if (settings.commit) {
            args.push('--targetcommitish', settings.commit);
        }
        if (settings.inputFileName) {
            if (this.buildAgent.fileExists(settings.inputFileName)) {
                args.push('--inputFilePath', settings.inputFileName);
            }
            else {
                throw new Error('GitReleaseManager inputFilePath not found at ' +
                    settings.inputFileName);
            }
        }
        if (settings.isPreRelease) {
            args.push('--pre');
        }
        if (settings.assets && settings.assets.length > 0) {
            settings.assets = settings.assets.map(asset => {
                return path.join(settings.targetDirectory, asset);
            });
            args.push('--assets', settings.assets.join(','));
        }
        return args;
    }
    getDiscardArguments(settings) {
        const args = ['discard', ...this.getCommonArguments(settings)];
        if (settings.milestone) {
            args.push('--milestone', settings.milestone);
        }
        return args;
    }
    getCloseArguments(settings) {
        const args = ['close', ...this.getCommonArguments(settings)];
        if (settings.milestone) {
            args.push('--milestone', settings.milestone);
        }
        return args;
    }
    getOpenArguments(settings) {
        const args = ['open', ...this.getCommonArguments(settings)];
        if (settings.milestone) {
            args.push('--milestone', settings.milestone);
        }
        return args;
    }
    getPublishArguments(settings) {
        const args = ['publish', ...this.getCommonArguments(settings)];
        if (settings.tagName) {
            args.push('--tagName', settings.tagName);
        }
        return args;
    }
    getAddAssetArguments(settings) {
        const args = [
            'addasset',
            ...this.getCommonArguments(settings)
        ];
        if (settings.tagName) {
            args.push('--tagName', settings.tagName);
        }
        if (settings.assets && settings.assets.length > 0) {
            settings.assets = settings.assets.map(asset => {
                return path.join(settings.targetDirectory, asset);
            });
            args.push('--assets', settings.assets.join(','));
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
                throw new Error('Directory not found at ' + targetPath);
            }
        }
        return workDir.replace(/\\/g, '/');
    }
};
GitReleaseManagerTool = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(models_1.TYPES.IBuildAgent)),
    __param(1, (0, inversify_1.inject)(models_1.TYPES.IVersionManager)),
    __metadata("design:paramtypes", [Object, Object])
], GitReleaseManagerTool);
exports.GitReleaseManagerTool = GitReleaseManagerTool;


/***/ }),

/***/ "./node_modules/tunnel/index.js":
/*!**************************************!*\
  !*** ./node_modules/tunnel/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/tunnel */ "./node_modules/tunnel/lib/tunnel.js");


/***/ }),

/***/ "./node_modules/tunnel/lib/tunnel.js":
/*!*******************************************!*\
  !*** ./node_modules/tunnel/lib/tunnel.js ***!
  \*******************************************/
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
                this._httpProxyBypassHosts.push(util.buildProxyBypassRegexFromEnv(bypass));
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
                    numTries++;
                    if (err && err.code && NetworkRetryErrors.indexOf(err.code) > -1 && numTries < maxTries) {
                        yield this._performExponentialBackoff(numTries);
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
 * Builds a RegExp to test urls against for deciding
 * wether to bypass proxy from an entry of the
 * environment variable setting NO_PROXY
 *
 * @param {string} bypass
 * @return {RegExp}
 */
function buildProxyBypassRegexFromEnv(bypass) {
    try {
        // We need to keep this around for back-compat purposes
        return new RegExp(bypass, 'i');
    }
    catch (err) {
        if (err instanceof SyntaxError && (bypass || "").startsWith("*")) {
            let wildcardEscaped = bypass.replace('*', '(.*)');
            return new RegExp(wildcardEscaped, 'i');
        }
        throw err;
    }
}
exports.buildProxyBypassRegexFromEnv = buildProxyBypassRegexFromEnv;
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

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!**********************************************!*\
  !*** ./src/tasks/gitreleasemanager/close.ts ***!
  \**********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js");
const main_1 = __webpack_require__(/*! ./main */ "./src/tasks/gitreleasemanager/main.ts");
(0, main_1.close)();

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzUWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLCtDQUFTO0FBQzdCLGNBQWMsbUJBQU8sQ0FBQyxtREFBVztBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLG9CQUFvQjtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0Isb0JBQW9CO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0UmE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw0QkFBNEIsZ0JBQWdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3R0FBd0c7QUFDeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0U7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELFFBQVE7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxRQUFRO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELHVCQUF1QjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCwwQkFBMEI7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Ozs7Ozs7O0FDWkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkI7O0FBRTNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyxVQUFVO0FBQ25CLFVBQVUsV0FBVztBQUNyQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isb0NBQW9DO0FBQ3hELDBCQUEwQixvQ0FBb0M7QUFDOUQsMEJBQTBCLG9DQUFvQztBQUM5RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUEsZUFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxNQUFN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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQWdELFNBQVM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIsYUFBYTs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRCwyQ0FBMkM7QUFDM0MsMkNBQTJDO0FBQzNDLDJDQUEyQztBQUMzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLDBCQUEwQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixxQkFBcUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsWUFBWSxRQUFRLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0U7QUFDaEUsZ0RBQWdEO0FBQ2hELDRGQUE0RjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0EsNEJBQTRCOzs7Ozs7Ozs7Ozs7QUM1STVCOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQSwwRkFBeUI7QUFDekIsMEZBQThCO0FBRTlCLGdCQUFLLEdBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9hbm5vdGF0aW9uL2RlY29yYXRvcl91dGlscy5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9hbm5vdGF0aW9uL2luamVjdC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9hbm5vdGF0aW9uL2luamVjdF9iYXNlLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2VzL2Fubm90YXRpb24vaW5qZWN0YWJsZS5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9hbm5vdGF0aW9uL2xhenlfc2VydmljZV9pZGVudGlmaWVyLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2VzL2Fubm90YXRpb24vbXVsdGlfaW5qZWN0LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2VzL2Fubm90YXRpb24vbmFtZWQuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvYW5ub3RhdGlvbi9vcHRpb25hbC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9hbm5vdGF0aW9uL3Bvc3RfY29uc3RydWN0LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2VzL2Fubm90YXRpb24vcHJlX2Rlc3Ryb3kuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvYW5ub3RhdGlvbi9wcm9wZXJ0eV9ldmVudF9kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvYW5ub3RhdGlvbi90YWdnZWQuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvYW5ub3RhdGlvbi90YXJnZXRfbmFtZS5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9hbm5vdGF0aW9uL3VubWFuYWdlZC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9iaW5kaW5ncy9iaW5kaW5nLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2VzL2JpbmRpbmdzL2JpbmRpbmdfY291bnQuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvY29uc3RhbnRzL2Vycm9yX21zZ3MuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvY29uc3RhbnRzL2xpdGVyYWxfdHlwZXMuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvY29uc3RhbnRzL21ldGFkYXRhX2tleXMuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvY29udGFpbmVyL2NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9jb250YWluZXIvY29udGFpbmVyX21vZHVsZS5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9jb250YWluZXIvY29udGFpbmVyX3NuYXBzaG90LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2VzL2NvbnRhaW5lci9sb29rdXAuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvY29udGFpbmVyL21vZHVsZV9hY3RpdmF0aW9uX3N0b3JlLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2VzL2ludGVyZmFjZXMvaW50ZXJmYWNlcy5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9pbnZlcnNpZnkuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvcGxhbm5pbmcvY29udGV4dC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9wbGFubmluZy9tZXRhZGF0YS5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9wbGFubmluZy9tZXRhZGF0YV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvcGxhbm5pbmcvcGxhbi5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9wbGFubmluZy9wbGFubmVyLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2VzL3BsYW5uaW5nL3F1ZXJ5YWJsZV9zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvcGxhbm5pbmcvcmVmbGVjdGlvbl91dGlscy5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9wbGFubmluZy9yZXF1ZXN0LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2VzL3BsYW5uaW5nL3RhcmdldC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9yZXNvbHV0aW9uL2luc3RhbnRpYXRpb24uanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvcmVzb2x1dGlvbi9yZXNvbHZlci5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9zY29wZS9zY29wZS5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9zeW50YXgvYmluZGluZ19pbl9zeW50YXguanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvc3ludGF4L2JpbmRpbmdfaW5fd2hlbl9vbl9zeW50YXguanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvc3ludGF4L2JpbmRpbmdfb25fc3ludGF4LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2VzL3N5bnRheC9iaW5kaW5nX3RvX3N5bnRheC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9zeW50YXgvYmluZGluZ193aGVuX29uX3N5bnRheC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9zeW50YXgvYmluZGluZ193aGVuX3N5bnRheC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy9zeW50YXgvY29uc3RyYWludF9oZWxwZXJzLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2VzL3V0aWxzL2FzeW5jLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2VzL3V0aWxzL2JpbmRpbmdfdXRpbHMuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvdXRpbHMvY2xvbmFibGUuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvdXRpbHMvZXhjZXB0aW9ucy5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9lcy91dGlscy9mYWN0b3J5X3R5cGUuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvdXRpbHMvaWQuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvdXRpbHMvanMuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvZXMvdXRpbHMvc2VyaWFsaXphdGlvbi5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9mb3JtYXRzLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvcXMvbGliL2luZGV4LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvcXMvbGliL3BhcnNlLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvcXMvbGliL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL3JlZmxlY3QtbWV0YWRhdGEvUmVmbGVjdC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL3NlbXZlci1jb21wYXJlL2luZGV4LmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3NlbXZlci5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vc3JjL2FnZW50L21vY2svYnVpbGQtYWdlbnQudHMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL3NyYy9jb3JlL2RvdG5ldC10b29sLnRzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9zcmMvY29yZS9pb2MudHMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL3NyYy9jb3JlL21vZGVscy50cyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vc3JjL2NvcmUvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy8uL3NyYy9jb3JlL3ZlcnNpb25NYW5hZ2VyLnRzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9zcmMvdGFza3MvZ2l0cmVsZWFzZW1hbmFnZXIvbWFpbi50cyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vc3JjL3Rvb2xzL2dpdHJlbGVhc2VtYW5hZ2VyL21vZGVscy50cyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vc3JjL3Rvb2xzL2dpdHJlbGVhc2VtYW5hZ2VyL3NldHRpbmdzLnRzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9zcmMvdG9vbHMvZ2l0cmVsZWFzZW1hbmFnZXIvdG9vbC50cyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL3R1bm5lbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL3R1bm5lbC9saWIvdHVubmVsLmpzIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvLi9ub2RlX21vZHVsZXMvdHlwZWQtcmVzdC1jbGllbnQvSHR0cENsaWVudC5qcyIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vbm9kZV9tb2R1bGVzL3R5cGVkLXJlc3QtY2xpZW50L1V0aWwuanMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiYXNzZXJ0XCIiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZXZlbnRzXCIiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJuZXRcIiIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJvc1wiIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInBhdGhcIiIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ0bHNcIiIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ1cmxcIiIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ1dGlsXCIiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiemxpYlwiIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2l0dG9vbHMtYWN0aW9ucy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dpdHRvb2xzLWFjdGlvbnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9naXR0b29scy1hY3Rpb25zLy4vc3JjL3Rhc2tzL2dpdHJlbGVhc2VtYW5hZ2VyL2Nsb3NlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEVSUk9SX01TR1MgZnJvbSBcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCI7XG5pbXBvcnQgKiBhcyBNRVRBREFUQV9LRVkgZnJvbSBcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCI7XG5pbXBvcnQgeyBnZXRGaXJzdEFycmF5RHVwbGljYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2pzXCI7XG5mdW5jdGlvbiB0YXJnZXRJc0NvbnN0cnVjdG9yRnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRhcmdldC5wcm90b3R5cGUgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIF90aHJvd0lmTWV0aG9kUGFyYW1ldGVyKHBhcmFtZXRlck5hbWUpIHtcbiAgICBpZiAocGFyYW1ldGVyTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLklOVkFMSURfREVDT1JBVE9SX09QRVJBVElPTik7XG4gICAgfVxufVxuZnVuY3Rpb24gdGFnUGFyYW1ldGVyKGFubm90YXRpb25UYXJnZXQsIHBhcmFtZXRlck5hbWUsIHBhcmFtZXRlckluZGV4LCBtZXRhZGF0YSkge1xuICAgIF90aHJvd0lmTWV0aG9kUGFyYW1ldGVyKHBhcmFtZXRlck5hbWUpO1xuICAgIF90YWdQYXJhbWV0ZXJPclByb3BlcnR5KE1FVEFEQVRBX0tFWS5UQUdHRUQsIGFubm90YXRpb25UYXJnZXQsIHBhcmFtZXRlckluZGV4LnRvU3RyaW5nKCksIG1ldGFkYXRhKTtcbn1cbmZ1bmN0aW9uIHRhZ1Byb3BlcnR5KGFubm90YXRpb25UYXJnZXQsIHByb3BlcnR5TmFtZSwgbWV0YWRhdGEpIHtcbiAgICBpZiAodGFyZ2V0SXNDb25zdHJ1Y3RvckZ1bmN0aW9uKGFubm90YXRpb25UYXJnZXQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLklOVkFMSURfREVDT1JBVE9SX09QRVJBVElPTik7XG4gICAgfVxuICAgIF90YWdQYXJhbWV0ZXJPclByb3BlcnR5KE1FVEFEQVRBX0tFWS5UQUdHRURfUFJPUCwgYW5ub3RhdGlvblRhcmdldC5jb25zdHJ1Y3RvciwgcHJvcGVydHlOYW1lLCBtZXRhZGF0YSk7XG59XG5mdW5jdGlvbiBfZW5zdXJlTm9NZXRhZGF0YUtleUR1cGxpY2F0ZXMobWV0YWRhdGEpIHtcbiAgICB2YXIgbWV0YWRhdGFzID0gW107XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWV0YWRhdGEpKSB7XG4gICAgICAgIG1ldGFkYXRhcyA9IG1ldGFkYXRhO1xuICAgICAgICB2YXIgZHVwbGljYXRlID0gZ2V0Rmlyc3RBcnJheUR1cGxpY2F0ZShtZXRhZGF0YXMubWFwKGZ1bmN0aW9uIChtZCkgeyByZXR1cm4gbWQua2V5OyB9KSk7XG4gICAgICAgIGlmIChkdXBsaWNhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuRFVQTElDQVRFRF9NRVRBREFUQSArIFwiIFwiICsgZHVwbGljYXRlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtZXRhZGF0YXMgPSBbbWV0YWRhdGFdO1xuICAgIH1cbiAgICByZXR1cm4gbWV0YWRhdGFzO1xufVxuZnVuY3Rpb24gX3RhZ1BhcmFtZXRlck9yUHJvcGVydHkobWV0YWRhdGFLZXksIGFubm90YXRpb25UYXJnZXQsIGtleSwgbWV0YWRhdGEpIHtcbiAgICB2YXIgbWV0YWRhdGFzID0gX2Vuc3VyZU5vTWV0YWRhdGFLZXlEdXBsaWNhdGVzKG1ldGFkYXRhKTtcbiAgICB2YXIgcGFyYW1zT3JQcm9wZXJ0aWVzTWV0YWRhdGEgPSB7fTtcbiAgICBpZiAoUmVmbGVjdC5oYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgYW5ub3RhdGlvblRhcmdldCkpIHtcbiAgICAgICAgcGFyYW1zT3JQcm9wZXJ0aWVzTWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCBhbm5vdGF0aW9uVGFyZ2V0KTtcbiAgICB9XG4gICAgdmFyIHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhID0gcGFyYW1zT3JQcm9wZXJ0aWVzTWV0YWRhdGFba2V5XTtcbiAgICBpZiAocGFyYW1PclByb3BlcnR5TWV0YWRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YSA9IFtdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgaWYgKG1ldGFkYXRhcy5zb21lKGZ1bmN0aW9uIChtZCkgeyByZXR1cm4gbWQua2V5ID09PSBtLmtleTsgfSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5EVVBMSUNBVEVEX01FVEFEQVRBICsgXCIgXCIgKyBtLmtleS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YV8xID0gcGFyYW1PclByb3BlcnR5TWV0YWRhdGE7IF9pIDwgcGFyYW1PclByb3BlcnR5TWV0YWRhdGFfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBtID0gcGFyYW1PclByb3BlcnR5TWV0YWRhdGFfMVtfaV07XG4gICAgICAgICAgICBfbG9vcF8xKG0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhLnB1c2guYXBwbHkocGFyYW1PclByb3BlcnR5TWV0YWRhdGEsIG1ldGFkYXRhcyk7XG4gICAgcGFyYW1zT3JQcm9wZXJ0aWVzTWV0YWRhdGFba2V5XSA9IHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhO1xuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEobWV0YWRhdGFLZXksIHBhcmFtc09yUHJvcGVydGllc01ldGFkYXRhLCBhbm5vdGF0aW9uVGFyZ2V0KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVRhZ2dlZERlY29yYXRvcihtZXRhZGF0YSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4T3JQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleE9yUHJvcGVydHlEZXNjcmlwdG9yID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICB0YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4T3JQcm9wZXJ0eURlc2NyaXB0b3IsIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRhZ1Byb3BlcnR5KHRhcmdldCwgdGFyZ2V0S2V5LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCkge1xuICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0KTtcbn1cbmZ1bmN0aW9uIF9wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH07XG59XG5mdW5jdGlvbiBkZWNvcmF0ZShkZWNvcmF0b3IsIHRhcmdldCwgcGFyYW1ldGVySW5kZXhPclByb3BlcnR5KSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbWV0ZXJJbmRleE9yUHJvcGVydHkgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgX2RlY29yYXRlKFtfcGFyYW0ocGFyYW1ldGVySW5kZXhPclByb3BlcnR5LCBkZWNvcmF0b3IpXSwgdGFyZ2V0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHBhcmFtZXRlckluZGV4T3JQcm9wZXJ0eSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBSZWZsZWN0LmRlY29yYXRlKFtkZWNvcmF0b3JdLCB0YXJnZXQsIHBhcmFtZXRlckluZGV4T3JQcm9wZXJ0eSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBfZGVjb3JhdGUoW2RlY29yYXRvcl0sIHRhcmdldCk7XG4gICAgfVxufVxuZXhwb3J0IHsgZGVjb3JhdGUsIHRhZ1BhcmFtZXRlciwgdGFnUHJvcGVydHksIGNyZWF0ZVRhZ2dlZERlY29yYXRvciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVjb3JhdG9yX3V0aWxzLmpzLm1hcCIsImltcG9ydCAqIGFzIE1FVEFEQVRBX0tFWSBmcm9tIFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIjtcbmltcG9ydCB7IGluamVjdEJhc2UgfSBmcm9tIFwiLi9pbmplY3RfYmFzZVwiO1xudmFyIGluamVjdCA9IGluamVjdEJhc2UoTUVUQURBVEFfS0VZLklOSkVDVF9UQUcpO1xuZXhwb3J0IHsgaW5qZWN0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmplY3QuanMubWFwIiwiaW1wb3J0IHsgVU5ERUZJTkVEX0lOSkVDVF9BTk5PVEFUSU9OIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCI7XG5pbXBvcnQgeyBNZXRhZGF0YSB9IGZyb20gXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiO1xuaW1wb3J0IHsgY3JlYXRlVGFnZ2VkRGVjb3JhdG9yIH0gZnJvbSBcIi4vZGVjb3JhdG9yX3V0aWxzXCI7XG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0QmFzZShtZXRhZGF0YUtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldEtleSwgaW5kZXhPclByb3BlcnR5RGVzY3JpcHRvcikge1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VJZGVudGlmaWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gdHlwZW9mIHRhcmdldCA9PT0gXCJmdW5jdGlvblwiID8gdGFyZ2V0Lm5hbWUgOiB0YXJnZXQuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoVU5ERUZJTkVEX0lOSkVDVF9BTk5PVEFUSU9OKGNsYXNzTmFtZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVRhZ2dlZERlY29yYXRvcihuZXcgTWV0YWRhdGEobWV0YWRhdGFLZXksIHNlcnZpY2VJZGVudGlmaWVyKSkodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4T3JQcm9wZXJ0eURlc2NyaXB0b3IpO1xuICAgICAgICB9O1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmplY3RfYmFzZS5qcy5tYXAiLCJpbXBvcnQgKiBhcyBFUlJPUlNfTVNHUyBmcm9tIFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIjtcbmltcG9ydCAqIGFzIE1FVEFEQVRBX0tFWSBmcm9tIFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIjtcbmZ1bmN0aW9uIGluamVjdGFibGUoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoTUVUQURBVEFfS0VZLlBBUkFNX1RZUEVTLCB0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JTX01TR1MuRFVQTElDQVRFRF9JTkpFQ1RBQkxFX0RFQ09SQVRPUik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHR5cGVzID0gUmVmbGVjdC5nZXRNZXRhZGF0YShNRVRBREFUQV9LRVkuREVTSUdOX1BBUkFNX1RZUEVTLCB0YXJnZXQpIHx8IFtdO1xuICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKE1FVEFEQVRBX0tFWS5QQVJBTV9UWVBFUywgdHlwZXMsIHRhcmdldCk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfTtcbn1cbmV4cG9ydCB7IGluamVjdGFibGUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluamVjdGFibGUuanMubWFwIiwidmFyIExhenlTZXJ2aWNlSWRlbnRpZmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMYXp5U2VydmljZUlkZW50aWZlcihjYikge1xuICAgICAgICB0aGlzLl9jYiA9IGNiO1xuICAgIH1cbiAgICBMYXp5U2VydmljZUlkZW50aWZlci5wcm90b3R5cGUudW53cmFwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2IoKTtcbiAgICB9O1xuICAgIHJldHVybiBMYXp5U2VydmljZUlkZW50aWZlcjtcbn0oKSk7XG5leHBvcnQgeyBMYXp5U2VydmljZUlkZW50aWZlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF6eV9zZXJ2aWNlX2lkZW50aWZpZXIuanMubWFwIiwiaW1wb3J0ICogYXMgTUVUQURBVEFfS0VZIGZyb20gXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiO1xuaW1wb3J0IHsgaW5qZWN0QmFzZSB9IGZyb20gXCIuL2luamVjdF9iYXNlXCI7XG52YXIgbXVsdGlJbmplY3QgPSBpbmplY3RCYXNlKE1FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHKTtcbmV4cG9ydCB7IG11bHRpSW5qZWN0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tdWx0aV9pbmplY3QuanMubWFwIiwiaW1wb3J0ICogYXMgTUVUQURBVEFfS0VZIGZyb20gXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiO1xuaW1wb3J0IHsgTWV0YWRhdGEgfSBmcm9tIFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIjtcbmltcG9ydCB7IGNyZWF0ZVRhZ2dlZERlY29yYXRvciB9IGZyb20gXCIuL2RlY29yYXRvcl91dGlsc1wiO1xuZnVuY3Rpb24gbmFtZWQobmFtZSkge1xuICAgIHJldHVybiBjcmVhdGVUYWdnZWREZWNvcmF0b3IobmV3IE1ldGFkYXRhKE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcsIG5hbWUpKTtcbn1cbmV4cG9ydCB7IG5hbWVkIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uYW1lZC5qcy5tYXAiLCJpbXBvcnQgKiBhcyBNRVRBREFUQV9LRVkgZnJvbSBcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCI7XG5pbXBvcnQgeyBNZXRhZGF0YSB9IGZyb20gXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiO1xuaW1wb3J0IHsgY3JlYXRlVGFnZ2VkRGVjb3JhdG9yIH0gZnJvbSBcIi4vZGVjb3JhdG9yX3V0aWxzXCI7XG5mdW5jdGlvbiBvcHRpb25hbCgpIHtcbiAgICByZXR1cm4gY3JlYXRlVGFnZ2VkRGVjb3JhdG9yKG5ldyBNZXRhZGF0YShNRVRBREFUQV9LRVkuT1BUSU9OQUxfVEFHLCB0cnVlKSk7XG59XG5leHBvcnQgeyBvcHRpb25hbCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b3B0aW9uYWwuanMubWFwIiwiaW1wb3J0ICogYXMgRVJST1JTX01TR1MgZnJvbSBcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCI7XG5pbXBvcnQgKiBhcyBNRVRBREFUQV9LRVkgZnJvbSBcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCI7XG5pbXBvcnQgeyBwcm9wZXJ0eUV2ZW50RGVjb3JhdG9yIH0gZnJvbSBcIi4vcHJvcGVydHlfZXZlbnRfZGVjb3JhdG9yXCI7XG52YXIgcG9zdENvbnN0cnVjdCA9IHByb3BlcnR5RXZlbnREZWNvcmF0b3IoTUVUQURBVEFfS0VZLlBPU1RfQ09OU1RSVUNULCBFUlJPUlNfTVNHUy5NVUxUSVBMRV9QT1NUX0NPTlNUUlVDVF9NRVRIT0RTKTtcbmV4cG9ydCB7IHBvc3RDb25zdHJ1Y3QgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvc3RfY29uc3RydWN0LmpzLm1hcCIsImltcG9ydCAqIGFzIEVSUk9SU19NU0dTIGZyb20gXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiO1xuaW1wb3J0ICogYXMgTUVUQURBVEFfS0VZIGZyb20gXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiO1xuaW1wb3J0IHsgcHJvcGVydHlFdmVudERlY29yYXRvciB9IGZyb20gXCIuL3Byb3BlcnR5X2V2ZW50X2RlY29yYXRvclwiO1xudmFyIHByZURlc3Ryb3kgPSBwcm9wZXJ0eUV2ZW50RGVjb3JhdG9yKE1FVEFEQVRBX0tFWS5QUkVfREVTVFJPWSwgRVJST1JTX01TR1MuTVVMVElQTEVfUFJFX0RFU1RST1lfTUVUSE9EUyk7XG5leHBvcnQgeyBwcmVEZXN0cm95IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVfZGVzdHJveS5qcy5tYXAiLCJpbXBvcnQgeyBNZXRhZGF0YSB9IGZyb20gXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiO1xuZnVuY3Rpb24gcHJvcGVydHlFdmVudERlY29yYXRvcihldmVudEtleSwgZXJyb3JNZXNzYWdlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgTWV0YWRhdGEoZXZlbnRLZXksIHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIGlmIChSZWZsZWN0Lmhhc093bk1ldGFkYXRhKGV2ZW50S2V5LCB0YXJnZXQuY29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKGV2ZW50S2V5LCBtZXRhZGF0YSwgdGFyZ2V0LmNvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuZXhwb3J0IHsgcHJvcGVydHlFdmVudERlY29yYXRvciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvcGVydHlfZXZlbnRfZGVjb3JhdG9yLmpzLm1hcCIsImltcG9ydCB7IE1ldGFkYXRhIH0gZnJvbSAnLi4vcGxhbm5pbmcvbWV0YWRhdGEnO1xuaW1wb3J0IHsgY3JlYXRlVGFnZ2VkRGVjb3JhdG9yIH0gZnJvbSAnLi9kZWNvcmF0b3JfdXRpbHMnO1xuZnVuY3Rpb24gdGFnZ2VkKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVRhZ2dlZERlY29yYXRvcihuZXcgTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpKTtcbn1cbmV4cG9ydCB7IHRhZ2dlZCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFnZ2VkLmpzLm1hcCIsImltcG9ydCAqIGFzIE1FVEFEQVRBX0tFWSBmcm9tIFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIjtcbmltcG9ydCB7IE1ldGFkYXRhIH0gZnJvbSBcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCI7XG5pbXBvcnQgeyB0YWdQYXJhbWV0ZXIgfSBmcm9tIFwiLi9kZWNvcmF0b3JfdXRpbHNcIjtcbmZ1bmN0aW9uIHRhcmdldE5hbWUobmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4KSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBNZXRhZGF0YShNRVRBREFUQV9LRVkuTkFNRV9UQUcsIG5hbWUpO1xuICAgICAgICB0YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgfTtcbn1cbmV4cG9ydCB7IHRhcmdldE5hbWUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRhcmdldF9uYW1lLmpzLm1hcCIsImltcG9ydCAqIGFzIE1FVEFEQVRBX0tFWSBmcm9tIFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIjtcbmltcG9ydCB7IE1ldGFkYXRhIH0gZnJvbSBcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCI7XG5pbXBvcnQgeyB0YWdQYXJhbWV0ZXIgfSBmcm9tIFwiLi9kZWNvcmF0b3JfdXRpbHNcIjtcbmZ1bmN0aW9uIHVubWFuYWdlZCgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgTWV0YWRhdGEoTUVUQURBVEFfS0VZLlVOTUFOQUdFRF9UQUcsIHRydWUpO1xuICAgICAgICB0YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgfTtcbn1cbmV4cG9ydCB7IHVubWFuYWdlZCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dW5tYW5hZ2VkLmpzLm1hcCIsImltcG9ydCB7IEJpbmRpbmdTY29wZUVudW0sIEJpbmRpbmdUeXBlRW51bSB9IGZyb20gXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiO1xuaW1wb3J0IHsgaWQgfSBmcm9tIFwiLi4vdXRpbHMvaWRcIjtcbnZhciBCaW5kaW5nID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaW5kaW5nKHNlcnZpY2VJZGVudGlmaWVyLCBzY29wZSkge1xuICAgICAgICB0aGlzLmlkID0gaWQoKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlSWRlbnRpZmllciA9IHNlcnZpY2VJZGVudGlmaWVyO1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMudHlwZSA9IEJpbmRpbmdUeXBlRW51bS5JbnZhbGlkO1xuICAgICAgICB0aGlzLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkgeyByZXR1cm4gdHJ1ZTsgfTtcbiAgICAgICAgdGhpcy5pbXBsZW1lbnRhdGlvblR5cGUgPSBudWxsO1xuICAgICAgICB0aGlzLmNhY2hlID0gbnVsbDtcbiAgICAgICAgdGhpcy5mYWN0b3J5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm92aWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMub25BY3RpdmF0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5vbkRlYWN0aXZhdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuZHluYW1pY1ZhbHVlID0gbnVsbDtcbiAgICB9XG4gICAgQmluZGluZy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbG9uZSA9IG5ldyBCaW5kaW5nKHRoaXMuc2VydmljZUlkZW50aWZpZXIsIHRoaXMuc2NvcGUpO1xuICAgICAgICBjbG9uZS5hY3RpdmF0ZWQgPSAoY2xvbmUuc2NvcGUgPT09IEJpbmRpbmdTY29wZUVudW0uU2luZ2xldG9uKSA/IHRoaXMuYWN0aXZhdGVkIDogZmFsc2U7XG4gICAgICAgIGNsb25lLmltcGxlbWVudGF0aW9uVHlwZSA9IHRoaXMuaW1wbGVtZW50YXRpb25UeXBlO1xuICAgICAgICBjbG9uZS5keW5hbWljVmFsdWUgPSB0aGlzLmR5bmFtaWNWYWx1ZTtcbiAgICAgICAgY2xvbmUuc2NvcGUgPSB0aGlzLnNjb3BlO1xuICAgICAgICBjbG9uZS50eXBlID0gdGhpcy50eXBlO1xuICAgICAgICBjbG9uZS5mYWN0b3J5ID0gdGhpcy5mYWN0b3J5O1xuICAgICAgICBjbG9uZS5wcm92aWRlciA9IHRoaXMucHJvdmlkZXI7XG4gICAgICAgIGNsb25lLmNvbnN0cmFpbnQgPSB0aGlzLmNvbnN0cmFpbnQ7XG4gICAgICAgIGNsb25lLm9uQWN0aXZhdGlvbiA9IHRoaXMub25BY3RpdmF0aW9uO1xuICAgICAgICBjbG9uZS5vbkRlYWN0aXZhdGlvbiA9IHRoaXMub25EZWFjdGl2YXRpb247XG4gICAgICAgIGNsb25lLmNhY2hlID0gdGhpcy5jYWNoZTtcbiAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmc7XG59KCkpO1xuZXhwb3J0IHsgQmluZGluZyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZGluZy5qcy5tYXAiLCJ2YXIgQmluZGluZ0NvdW50ID0ge1xuICAgIE11bHRpcGxlQmluZGluZ3NBdmFpbGFibGU6IDIsXG4gICAgTm9CaW5kaW5nc0F2YWlsYWJsZTogMCxcbiAgICBPbmx5T25lQmluZGluZ0F2YWlsYWJsZTogMVxufTtcbmV4cG9ydCB7IEJpbmRpbmdDb3VudCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZGluZ19jb3VudC5qcy5tYXAiLCJleHBvcnQgdmFyIERVUExJQ0FURURfSU5KRUNUQUJMRV9ERUNPUkFUT1IgPSBcIkNhbm5vdCBhcHBseSBAaW5qZWN0YWJsZSBkZWNvcmF0b3IgbXVsdGlwbGUgdGltZXMuXCI7XG5leHBvcnQgdmFyIERVUExJQ0FURURfTUVUQURBVEEgPSBcIk1ldGFkYXRhIGtleSB3YXMgdXNlZCBtb3JlIHRoYW4gb25jZSBpbiBhIHBhcmFtZXRlcjpcIjtcbmV4cG9ydCB2YXIgTlVMTF9BUkdVTUVOVCA9IFwiTlVMTCBhcmd1bWVudFwiO1xuZXhwb3J0IHZhciBLRVlfTk9UX0ZPVU5EID0gXCJLZXkgTm90IEZvdW5kXCI7XG5leHBvcnQgdmFyIEFNQklHVU9VU19NQVRDSCA9IFwiQW1iaWd1b3VzIG1hdGNoIGZvdW5kIGZvciBzZXJ2aWNlSWRlbnRpZmllcjpcIjtcbmV4cG9ydCB2YXIgQ0FOTk9UX1VOQklORCA9IFwiQ291bGQgbm90IHVuYmluZCBzZXJ2aWNlSWRlbnRpZmllcjpcIjtcbmV4cG9ydCB2YXIgTk9UX1JFR0lTVEVSRUQgPSBcIk5vIG1hdGNoaW5nIGJpbmRpbmdzIGZvdW5kIGZvciBzZXJ2aWNlSWRlbnRpZmllcjpcIjtcbmV4cG9ydCB2YXIgTUlTU0lOR19JTkpFQ1RBQkxFX0FOTk9UQVRJT04gPSBcIk1pc3NpbmcgcmVxdWlyZWQgQGluamVjdGFibGUgYW5ub3RhdGlvbiBpbjpcIjtcbmV4cG9ydCB2YXIgTUlTU0lOR19JTkpFQ1RfQU5OT1RBVElPTiA9IFwiTWlzc2luZyByZXF1aXJlZCBAaW5qZWN0IG9yIEBtdWx0aUluamVjdCBhbm5vdGF0aW9uIGluOlwiO1xuZXhwb3J0IHZhciBVTkRFRklORURfSU5KRUNUX0FOTk9UQVRJT04gPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBcIkBpbmplY3QgY2FsbGVkIHdpdGggdW5kZWZpbmVkIHRoaXMgY291bGQgbWVhbiB0aGF0IHRoZSBjbGFzcyBcIiArIG5hbWUgKyBcIiBoYXMgXCIgK1xuICAgICAgICBcImEgY2lyY3VsYXIgZGVwZW5kZW5jeSBwcm9ibGVtLiBZb3UgY2FuIHVzZSBhIExhenlTZXJ2aWNlSWRlbnRpZmVyIHRvICBcIiArXG4gICAgICAgIFwib3ZlcmNvbWUgdGhpcyBsaW1pdGF0aW9uLlwiO1xufTtcbmV4cG9ydCB2YXIgQ0lSQ1VMQVJfREVQRU5ERU5DWSA9IFwiQ2lyY3VsYXIgZGVwZW5kZW5jeSBmb3VuZDpcIjtcbmV4cG9ydCB2YXIgTk9UX0lNUExFTUVOVEVEID0gXCJTb3JyeSwgdGhpcyBmZWF0dXJlIGlzIG5vdCBmdWxseSBpbXBsZW1lbnRlZCB5ZXQuXCI7XG5leHBvcnQgdmFyIElOVkFMSURfQklORElOR19UWVBFID0gXCJJbnZhbGlkIGJpbmRpbmcgdHlwZTpcIjtcbmV4cG9ydCB2YXIgTk9fTU9SRV9TTkFQU0hPVFNfQVZBSUxBQkxFID0gXCJObyBzbmFwc2hvdCBhdmFpbGFibGUgdG8gcmVzdG9yZS5cIjtcbmV4cG9ydCB2YXIgSU5WQUxJRF9NSURETEVXQVJFX1JFVFVSTiA9IFwiSW52YWxpZCByZXR1cm4gdHlwZSBpbiBtaWRkbGV3YXJlLiBNaWRkbGV3YXJlIG11c3QgcmV0dXJuIVwiO1xuZXhwb3J0IHZhciBJTlZBTElEX0ZVTkNUSU9OX0JJTkRJTkcgPSBcIlZhbHVlIHByb3ZpZGVkIHRvIGZ1bmN0aW9uIGJpbmRpbmcgbXVzdCBiZSBhIGZ1bmN0aW9uIVwiO1xuZXhwb3J0IHZhciBMQVpZX0lOX1NZTkMgPSBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBcIllvdSBhcmUgYXR0ZW1wdGluZyB0byBjb25zdHJ1Y3QgJ1wiICsga2V5ICsgXCInIGluIGEgc3luY2hyb25vdXMgd2F5XFxuIGJ1dCBpdCBoYXMgYXN5bmNocm9ub3VzIGRlcGVuZGVuY2llcy5cIjsgfTtcbmV4cG9ydCB2YXIgSU5WQUxJRF9UT19TRUxGX1ZBTFVFID0gXCJUaGUgdG9TZWxmIGZ1bmN0aW9uIGNhbiBvbmx5IGJlIGFwcGxpZWQgd2hlbiBhIGNvbnN0cnVjdG9yIGlzIFwiICtcbiAgICBcInVzZWQgYXMgc2VydmljZSBpZGVudGlmaWVyXCI7XG5leHBvcnQgdmFyIElOVkFMSURfREVDT1JBVE9SX09QRVJBVElPTiA9IFwiVGhlIEBpbmplY3QgQG11bHRpSW5qZWN0IEB0YWdnZWQgYW5kIEBuYW1lZCBkZWNvcmF0b3JzIFwiICtcbiAgICBcIm11c3QgYmUgYXBwbGllZCB0byB0aGUgcGFyYW1ldGVycyBvZiBhIGNsYXNzIGNvbnN0cnVjdG9yIG9yIGEgY2xhc3MgcHJvcGVydHkuXCI7XG5leHBvcnQgdmFyIEFSR1VNRU5UU19MRU5HVEhfTUlTTUFUQ0ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhbHVlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gXCJUaGUgbnVtYmVyIG9mIGNvbnN0cnVjdG9yIGFyZ3VtZW50cyBpbiB0aGUgZGVyaXZlZCBjbGFzcyBcIiArXG4gICAgICAgICh2YWx1ZXNbMF0gKyBcIiBtdXN0IGJlID49IHRoYW4gdGhlIG51bWJlciBvZiBjb25zdHJ1Y3RvciBhcmd1bWVudHMgb2YgaXRzIGJhc2UgY2xhc3MuXCIpO1xufTtcbmV4cG9ydCB2YXIgQ09OVEFJTkVSX09QVElPTlNfTVVTVF9CRV9BTl9PQkpFQ1QgPSBcIkludmFsaWQgQ29udGFpbmVyIGNvbnN0cnVjdG9yIGFyZ3VtZW50LiBDb250YWluZXIgb3B0aW9ucyBcIiArXG4gICAgXCJtdXN0IGJlIGFuIG9iamVjdC5cIjtcbmV4cG9ydCB2YXIgQ09OVEFJTkVSX09QVElPTlNfSU5WQUxJRF9ERUZBVUxUX1NDT1BFID0gXCJJbnZhbGlkIENvbnRhaW5lciBvcHRpb24uIERlZmF1bHQgc2NvcGUgbXVzdCBcIiArXG4gICAgXCJiZSBhIHN0cmluZyAoJ3NpbmdsZXRvbicgb3IgJ3RyYW5zaWVudCcpLlwiO1xuZXhwb3J0IHZhciBDT05UQUlORVJfT1BUSU9OU19JTlZBTElEX0FVVE9fQklORF9JTkpFQ1RBQkxFID0gXCJJbnZhbGlkIENvbnRhaW5lciBvcHRpb24uIEF1dG8gYmluZCBpbmplY3RhYmxlIG11c3QgXCIgK1xuICAgIFwiYmUgYSBib29sZWFuXCI7XG5leHBvcnQgdmFyIENPTlRBSU5FUl9PUFRJT05TX0lOVkFMSURfU0tJUF9CQVNFX0NIRUNLID0gXCJJbnZhbGlkIENvbnRhaW5lciBvcHRpb24uIFNraXAgYmFzZSBjaGVjayBtdXN0IFwiICtcbiAgICBcImJlIGEgYm9vbGVhblwiO1xuZXhwb3J0IHZhciBNVUxUSVBMRV9QUkVfREVTVFJPWV9NRVRIT0RTID0gXCJDYW5ub3QgYXBwbHkgQHByZURlc3Ryb3kgZGVjb3JhdG9yIG11bHRpcGxlIHRpbWVzIGluIHRoZSBzYW1lIGNsYXNzXCI7XG5leHBvcnQgdmFyIE1VTFRJUExFX1BPU1RfQ09OU1RSVUNUX01FVEhPRFMgPSBcIkNhbm5vdCBhcHBseSBAcG9zdENvbnN0cnVjdCBkZWNvcmF0b3IgbXVsdGlwbGUgdGltZXMgaW4gdGhlIHNhbWUgY2xhc3NcIjtcbmV4cG9ydCB2YXIgQVNZTkNfVU5CSU5EX1JFUVVJUkVEID0gXCJBdHRlbXB0aW5nIHRvIHVuYmluZCBkZXBlbmRlbmN5IHdpdGggYXN5bmNocm9ub3VzIGRlc3RydWN0aW9uIChAcHJlRGVzdHJveSBvciBvbkRlYWN0aXZhdGlvbilcIjtcbmV4cG9ydCB2YXIgUE9TVF9DT05TVFJVQ1RfRVJST1IgPSBmdW5jdGlvbiAoY2xhenosIGVycm9yTWVzc2FnZSkgeyByZXR1cm4gXCJAcG9zdENvbnN0cnVjdCBlcnJvciBpbiBjbGFzcyBcIiArIGNsYXp6ICsgXCI6IFwiICsgZXJyb3JNZXNzYWdlOyB9O1xuZXhwb3J0IHZhciBQUkVfREVTVFJPWV9FUlJPUiA9IGZ1bmN0aW9uIChjbGF6eiwgZXJyb3JNZXNzYWdlKSB7IHJldHVybiBcIkBwcmVEZXN0cm95IGVycm9yIGluIGNsYXNzIFwiICsgY2xhenogKyBcIjogXCIgKyBlcnJvck1lc3NhZ2U7IH07XG5leHBvcnQgdmFyIE9OX0RFQUNUSVZBVElPTl9FUlJPUiA9IGZ1bmN0aW9uIChjbGF6eiwgZXJyb3JNZXNzYWdlKSB7IHJldHVybiBcIm9uRGVhY3RpdmF0aW9uKCkgZXJyb3IgaW4gY2xhc3MgXCIgKyBjbGF6eiArIFwiOiBcIiArIGVycm9yTWVzc2FnZTsgfTtcbmV4cG9ydCB2YXIgQ0lSQ1VMQVJfREVQRU5ERU5DWV9JTl9GQUNUT1JZID0gZnVuY3Rpb24gKGZhY3RvcnlUeXBlLCBzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgIHJldHVybiBcIkl0IGxvb2tzIGxpa2UgdGhlcmUgaXMgYSBjaXJjdWxhciBkZXBlbmRlbmN5IGluIG9uZSBvZiB0aGUgJ1wiICsgZmFjdG9yeVR5cGUgKyBcIicgYmluZGluZ3MuIFBsZWFzZSBpbnZlc3RpZ2F0ZSBiaW5kaW5ncyB3aXRoXCIgK1xuICAgICAgICAoXCJzZXJ2aWNlIGlkZW50aWZpZXIgJ1wiICsgc2VydmljZUlkZW50aWZpZXIgKyBcIicuXCIpO1xufTtcbmV4cG9ydCB2YXIgU1RBQ0tfT1ZFUkZMT1cgPSBcIk1heGltdW0gY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvcl9tc2dzLmpzLm1hcCIsInZhciBCaW5kaW5nU2NvcGVFbnVtID0ge1xuICAgIFJlcXVlc3Q6IFwiUmVxdWVzdFwiLFxuICAgIFNpbmdsZXRvbjogXCJTaW5nbGV0b25cIixcbiAgICBUcmFuc2llbnQ6IFwiVHJhbnNpZW50XCJcbn07XG52YXIgQmluZGluZ1R5cGVFbnVtID0ge1xuICAgIENvbnN0YW50VmFsdWU6IFwiQ29uc3RhbnRWYWx1ZVwiLFxuICAgIENvbnN0cnVjdG9yOiBcIkNvbnN0cnVjdG9yXCIsXG4gICAgRHluYW1pY1ZhbHVlOiBcIkR5bmFtaWNWYWx1ZVwiLFxuICAgIEZhY3Rvcnk6IFwiRmFjdG9yeVwiLFxuICAgIEZ1bmN0aW9uOiBcIkZ1bmN0aW9uXCIsXG4gICAgSW5zdGFuY2U6IFwiSW5zdGFuY2VcIixcbiAgICBJbnZhbGlkOiBcIkludmFsaWRcIixcbiAgICBQcm92aWRlcjogXCJQcm92aWRlclwiXG59O1xudmFyIFRhcmdldFR5cGVFbnVtID0ge1xuICAgIENsYXNzUHJvcGVydHk6IFwiQ2xhc3NQcm9wZXJ0eVwiLFxuICAgIENvbnN0cnVjdG9yQXJndW1lbnQ6IFwiQ29uc3RydWN0b3JBcmd1bWVudFwiLFxuICAgIFZhcmlhYmxlOiBcIlZhcmlhYmxlXCJcbn07XG5leHBvcnQgeyBCaW5kaW5nU2NvcGVFbnVtLCBCaW5kaW5nVHlwZUVudW0sIFRhcmdldFR5cGVFbnVtIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saXRlcmFsX3R5cGVzLmpzLm1hcCIsImV4cG9ydCB2YXIgTkFNRURfVEFHID0gXCJuYW1lZFwiO1xuZXhwb3J0IHZhciBOQU1FX1RBRyA9IFwibmFtZVwiO1xuZXhwb3J0IHZhciBVTk1BTkFHRURfVEFHID0gXCJ1bm1hbmFnZWRcIjtcbmV4cG9ydCB2YXIgT1BUSU9OQUxfVEFHID0gXCJvcHRpb25hbFwiO1xuZXhwb3J0IHZhciBJTkpFQ1RfVEFHID0gXCJpbmplY3RcIjtcbmV4cG9ydCB2YXIgTVVMVElfSU5KRUNUX1RBRyA9IFwibXVsdGlfaW5qZWN0XCI7XG5leHBvcnQgdmFyIFRBR0dFRCA9IFwiaW52ZXJzaWZ5OnRhZ2dlZFwiO1xuZXhwb3J0IHZhciBUQUdHRURfUFJPUCA9IFwiaW52ZXJzaWZ5OnRhZ2dlZF9wcm9wc1wiO1xuZXhwb3J0IHZhciBQQVJBTV9UWVBFUyA9IFwiaW52ZXJzaWZ5OnBhcmFtdHlwZXNcIjtcbmV4cG9ydCB2YXIgREVTSUdOX1BBUkFNX1RZUEVTID0gXCJkZXNpZ246cGFyYW10eXBlc1wiO1xuZXhwb3J0IHZhciBQT1NUX0NPTlNUUlVDVCA9IFwicG9zdF9jb25zdHJ1Y3RcIjtcbmV4cG9ydCB2YXIgUFJFX0RFU1RST1kgPSBcInByZV9kZXN0cm95XCI7XG5mdW5jdGlvbiBnZXROb25DdXN0b21UYWdLZXlzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAgIElOSkVDVF9UQUcsXG4gICAgICAgIE1VTFRJX0lOSkVDVF9UQUcsXG4gICAgICAgIE5BTUVfVEFHLFxuICAgICAgICBVTk1BTkFHRURfVEFHLFxuICAgICAgICBOQU1FRF9UQUcsXG4gICAgICAgIE9QVElPTkFMX1RBRyxcbiAgICBdO1xufVxuZXhwb3J0IHZhciBOT05fQ1VTVE9NX1RBR19LRVlTID0gZ2V0Tm9uQ3VzdG9tVGFnS2V5cygpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWV0YWRhdGFfa2V5cy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tIFwiLi4vYmluZGluZ3MvYmluZGluZ1wiO1xuaW1wb3J0ICogYXMgRVJST1JfTVNHUyBmcm9tIFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIjtcbmltcG9ydCB7IEJpbmRpbmdTY29wZUVudW0sIFRhcmdldFR5cGVFbnVtIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCI7XG5pbXBvcnQgKiBhcyBNRVRBREFUQV9LRVkgZnJvbSBcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCI7XG5pbXBvcnQgeyBNZXRhZGF0YVJlYWRlciB9IGZyb20gXCIuLi9wbGFubmluZy9tZXRhZGF0YV9yZWFkZXJcIjtcbmltcG9ydCB7IGNyZWF0ZU1vY2tSZXF1ZXN0LCBnZXRCaW5kaW5nRGljdGlvbmFyeSwgcGxhbiB9IGZyb20gXCIuLi9wbGFubmluZy9wbGFubmVyXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcIi4uL3Jlc29sdXRpb24vcmVzb2x2ZXJcIjtcbmltcG9ydCB7IEJpbmRpbmdUb1N5bnRheCB9IGZyb20gXCIuLi9zeW50YXgvYmluZGluZ190b19zeW50YXhcIjtcbmltcG9ydCB7IGlzUHJvbWlzZSwgaXNQcm9taXNlT3JDb250YWluc1Byb21pc2UgfSBmcm9tIFwiLi4vdXRpbHMvYXN5bmNcIjtcbmltcG9ydCB7IGlkIH0gZnJvbSBcIi4uL3V0aWxzL2lkXCI7XG5pbXBvcnQgeyBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nIH0gZnJvbSBcIi4uL3V0aWxzL3NlcmlhbGl6YXRpb25cIjtcbmltcG9ydCB7IENvbnRhaW5lclNuYXBzaG90IH0gZnJvbSBcIi4vY29udGFpbmVyX3NuYXBzaG90XCI7XG5pbXBvcnQgeyBMb29rdXAgfSBmcm9tIFwiLi9sb29rdXBcIjtcbmltcG9ydCB7IE1vZHVsZUFjdGl2YXRpb25TdG9yZSB9IGZyb20gXCIuL21vZHVsZV9hY3RpdmF0aW9uX3N0b3JlXCI7XG52YXIgQ29udGFpbmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250YWluZXIoY29udGFpbmVyT3B0aW9ucykge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGNvbnRhaW5lck9wdGlvbnMgfHwge307XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIgKyBFUlJPUl9NU0dTLkNPTlRBSU5FUl9PUFRJT05TX01VU1RfQkVfQU5fT0JKRUNUKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0U2NvcGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3B0aW9ucy5kZWZhdWx0U2NvcGUgPSBCaW5kaW5nU2NvcGVFbnVtLlRyYW5zaWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLmRlZmF1bHRTY29wZSAhPT0gQmluZGluZ1Njb3BlRW51bS5TaW5nbGV0b24gJiZcbiAgICAgICAgICAgIG9wdGlvbnMuZGVmYXVsdFNjb3BlICE9PSBCaW5kaW5nU2NvcGVFbnVtLlRyYW5zaWVudCAmJlxuICAgICAgICAgICAgb3B0aW9ucy5kZWZhdWx0U2NvcGUgIT09IEJpbmRpbmdTY29wZUVudW0uUmVxdWVzdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIgKyBFUlJPUl9NU0dTLkNPTlRBSU5FUl9PUFRJT05TX0lOVkFMSURfREVGQVVMVF9TQ09QRSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuYXV0b0JpbmRJbmplY3RhYmxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuYXV0b0JpbmRJbmplY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuYXV0b0JpbmRJbmplY3RhYmxlICE9PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIgKyBFUlJPUl9NU0dTLkNPTlRBSU5FUl9PUFRJT05TX0lOVkFMSURfQVVUT19CSU5EX0lOSkVDVEFCTEUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnNraXBCYXNlQ2xhc3NDaGVja3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3B0aW9ucy5za2lwQmFzZUNsYXNzQ2hlY2tzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuc2tpcEJhc2VDbGFzc0NoZWNrcyAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiICsgRVJST1JfTVNHUy5DT05UQUlORVJfT1BUSU9OU19JTlZBTElEX1NLSVBfQkFTRV9DSEVDSyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgYXV0b0JpbmRJbmplY3RhYmxlOiBvcHRpb25zLmF1dG9CaW5kSW5qZWN0YWJsZSxcbiAgICAgICAgICAgIGRlZmF1bHRTY29wZTogb3B0aW9ucy5kZWZhdWx0U2NvcGUsXG4gICAgICAgICAgICBza2lwQmFzZUNsYXNzQ2hlY2tzOiBvcHRpb25zLnNraXBCYXNlQ2xhc3NDaGVja3NcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pZCA9IGlkKCk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5ID0gbmV3IExvb2t1cCgpO1xuICAgICAgICB0aGlzLl9zbmFwc2hvdHMgPSBbXTtcbiAgICAgICAgdGhpcy5fbWlkZGxld2FyZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2FjdGl2YXRpb25zID0gbmV3IExvb2t1cCgpO1xuICAgICAgICB0aGlzLl9kZWFjdGl2YXRpb25zID0gbmV3IExvb2t1cCgpO1xuICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhUmVhZGVyID0gbmV3IE1ldGFkYXRhUmVhZGVyKCk7XG4gICAgICAgIHRoaXMuX21vZHVsZUFjdGl2YXRpb25TdG9yZSA9IG5ldyBNb2R1bGVBY3RpdmF0aW9uU3RvcmUoKTtcbiAgICB9XG4gICAgQ29udGFpbmVyLm1lcmdlID0gZnVuY3Rpb24gKGNvbnRhaW5lcjEsIGNvbnRhaW5lcjIpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lcnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnNbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBDb250YWluZXIoKTtcbiAgICAgICAgdmFyIHRhcmdldENvbnRhaW5lcnMgPSBfX3NwcmVhZEFycmF5KFtjb250YWluZXIxLCBjb250YWluZXIyXSwgY29udGFpbmVycywgdHJ1ZSkubWFwKGZ1bmN0aW9uICh0YXJnZXRDb250YWluZXIpIHsgcmV0dXJuIGdldEJpbmRpbmdEaWN0aW9uYXJ5KHRhcmdldENvbnRhaW5lcik7IH0pO1xuICAgICAgICB2YXIgYmluZGluZ0RpY3Rpb25hcnkgPSBnZXRCaW5kaW5nRGljdGlvbmFyeShjb250YWluZXIpO1xuICAgICAgICBmdW5jdGlvbiBjb3B5RGljdGlvbmFyeShvcmlnaW4sIGRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICBvcmlnaW4udHJhdmVyc2UoZnVuY3Rpb24gKF9rZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoYmluZGluZykge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5hZGQoYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllciwgYmluZGluZy5jbG9uZSgpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldENvbnRhaW5lcnMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0QmluZGluZ0RpY3Rpb25hcnkpIHtcbiAgICAgICAgICAgIGNvcHlEaWN0aW9uYXJ5KHRhcmdldEJpbmRpbmdEaWN0aW9uYXJ5LCBiaW5kaW5nRGljdGlvbmFyeSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbW9kdWxlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgbW9kdWxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBnZXRIZWxwZXJzID0gdGhpcy5fZ2V0Q29udGFpbmVyTW9kdWxlSGVscGVyc0ZhY3RvcnkoKTtcbiAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBtb2R1bGVzXzEgPSBtb2R1bGVzOyBfYSA8IG1vZHVsZXNfMS5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50TW9kdWxlID0gbW9kdWxlc18xW19hXTtcbiAgICAgICAgICAgIHZhciBjb250YWluZXJNb2R1bGVIZWxwZXJzID0gZ2V0SGVscGVycyhjdXJyZW50TW9kdWxlLmlkKTtcbiAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUucmVnaXN0cnkoY29udGFpbmVyTW9kdWxlSGVscGVycy5iaW5kRnVuY3Rpb24sIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMudW5iaW5kRnVuY3Rpb24sIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMuaXNib3VuZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLnJlYmluZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLnVuYmluZEFzeW5jRnVuY3Rpb24sIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMub25BY3RpdmF0aW9uRnVuY3Rpb24sIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMub25EZWFjdGl2YXRpb25GdW5jdGlvbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUubG9hZEFzeW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbW9kdWxlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgbW9kdWxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBnZXRIZWxwZXJzLCBfYSwgbW9kdWxlc18yLCBjdXJyZW50TW9kdWxlLCBjb250YWluZXJNb2R1bGVIZWxwZXJzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SGVscGVycyA9IHRoaXMuX2dldENvbnRhaW5lck1vZHVsZUhlbHBlcnNGYWN0b3J5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IDAsIG1vZHVsZXNfMiA9IG1vZHVsZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKF9hIDwgbW9kdWxlc18yLmxlbmd0aCkpIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50TW9kdWxlID0gbW9kdWxlc18yW19hXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMgPSBnZXRIZWxwZXJzKGN1cnJlbnRNb2R1bGUuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBjdXJyZW50TW9kdWxlLnJlZ2lzdHJ5KGNvbnRhaW5lck1vZHVsZUhlbHBlcnMuYmluZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLnVuYmluZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLmlzYm91bmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy5yZWJpbmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy51bmJpbmRBc3luY0Z1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLm9uQWN0aXZhdGlvbkZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLm9uRGVhY3RpdmF0aW9uRnVuY3Rpb24pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAxXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbW9kdWxlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgbW9kdWxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIG1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgICAgICB2YXIgZGVhY3RpdmF0aW9ucyA9IF90aGlzLl9yZW1vdmVNb2R1bGVCaW5kaW5ncyhtb2R1bGUuaWQpO1xuICAgICAgICAgICAgX3RoaXMuX2RlYWN0aXZhdGVTaW5nbGV0b25zKGRlYWN0aXZhdGlvbnMpO1xuICAgICAgICAgICAgX3RoaXMuX3JlbW92ZU1vZHVsZUhhbmRsZXJzKG1vZHVsZS5pZCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS51bmxvYWRBc3luYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1vZHVsZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG1vZHVsZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EsIG1vZHVsZXNfMywgbW9kdWxlXzEsIGRlYWN0aXZhdGlvbnM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IDAsIG1vZHVsZXNfMyA9IG1vZHVsZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKF9hIDwgbW9kdWxlc18zLmxlbmd0aCkpIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVfMSA9IG1vZHVsZXNfM1tfYV07XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWFjdGl2YXRpb25zID0gdGhpcy5fcmVtb3ZlTW9kdWxlQmluZGluZ3MobW9kdWxlXzEuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLl9kZWFjdGl2YXRlU2luZ2xldG9uc0FzeW5jKGRlYWN0aXZhdGlvbnMpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlTW9kdWxlSGFuZGxlcnMobW9kdWxlXzEuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAxXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICB2YXIgc2NvcGUgPSB0aGlzLm9wdGlvbnMuZGVmYXVsdFNjb3BlIHx8IEJpbmRpbmdTY29wZUVudW0uVHJhbnNpZW50O1xuICAgICAgICB2YXIgYmluZGluZyA9IG5ldyBCaW5kaW5nKHNlcnZpY2VJZGVudGlmaWVyLCBzY29wZSk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LmFkZChzZXJ2aWNlSWRlbnRpZmllciwgYmluZGluZyk7XG4gICAgICAgIHJldHVybiBuZXcgQmluZGluZ1RvU3ludGF4KGJpbmRpbmcpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5yZWJpbmQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgdGhpcy51bmJpbmQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5iaW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUucmViaW5kQXN5bmMgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIHRoaXMudW5iaW5kQXN5bmMoc2VydmljZUlkZW50aWZpZXIpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB0aGlzLmJpbmQoc2VydmljZUlkZW50aWZpZXIpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICBpZiAodGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuaGFzS2V5KHNlcnZpY2VJZGVudGlmaWVyKSkge1xuICAgICAgICAgICAgdmFyIGJpbmRpbmdzID0gdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgIHRoaXMuX2RlYWN0aXZhdGVTaW5nbGV0b25zKGJpbmRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW1vdmVTZXJ2aWNlRnJvbURpY3Rpb25hcnkoc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS51bmJpbmRBc3luYyA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYmluZGluZ3M7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5Lmhhc0tleShzZXJ2aWNlSWRlbnRpZmllcikpIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5kaW5ncyA9IHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LmdldChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuX2RlYWN0aXZhdGVTaW5nbGV0b25zQXN5bmMoYmluZGluZ3MpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVTZXJ2aWNlRnJvbURpY3Rpb25hcnkoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnVuYmluZEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkudHJhdmVyc2UoZnVuY3Rpb24gKF9rZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBfdGhpcy5fZGVhY3RpdmF0ZVNpbmdsZXRvbnModmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkgPSBuZXcgTG9va3VwKCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnVuYmluZEFsbEFzeW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZXM7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LnRyYXZlcnNlKGZ1bmN0aW9uIChfa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goX3RoaXMuX2RlYWN0aXZhdGVTaW5nbGV0b25zQXN5bmModmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBQcm9taXNlLmFsbChwcm9taXNlcyldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iaW5kaW5nRGljdGlvbmFyeSA9IG5ldyBMb29rdXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5vbkFjdGl2YXRpb24gPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIG9uQWN0aXZhdGlvbikge1xuICAgICAgICB0aGlzLl9hY3RpdmF0aW9ucy5hZGQoc2VydmljZUlkZW50aWZpZXIsIG9uQWN0aXZhdGlvbik7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLm9uRGVhY3RpdmF0aW9uID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBvbkRlYWN0aXZhdGlvbikge1xuICAgICAgICB0aGlzLl9kZWFjdGl2YXRpb25zLmFkZChzZXJ2aWNlSWRlbnRpZmllciwgb25EZWFjdGl2YXRpb24pO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5pc0JvdW5kID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHZhciBib3VuZCA9IHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5Lmhhc0tleShzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIGlmICghYm91bmQgJiYgdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIGJvdW5kID0gdGhpcy5wYXJlbnQuaXNCb3VuZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJvdW5kO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5pc0N1cnJlbnRCb3VuZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuaGFzS2V5KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuaXNCb3VuZE5hbWVkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBuYW1lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0JvdW5kVGFnZ2VkKHNlcnZpY2VJZGVudGlmaWVyLCBNRVRBREFUQV9LRVkuTkFNRURfVEFHLCBuYW1lZCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmlzQm91bmRUYWdnZWQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGJvdW5kID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5oYXNLZXkoc2VydmljZUlkZW50aWZpZXIpKSB7XG4gICAgICAgICAgICB2YXIgYmluZGluZ3MgPSB0aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5nZXQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgdmFyIHJlcXVlc3RfMSA9IGNyZWF0ZU1vY2tSZXF1ZXN0KHRoaXMsIHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGJvdW5kID0gYmluZGluZ3Muc29tZShmdW5jdGlvbiAoYikgeyByZXR1cm4gYi5jb25zdHJhaW50KHJlcXVlc3RfMSk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYm91bmQgJiYgdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIGJvdW5kID0gdGhpcy5wYXJlbnQuaXNCb3VuZFRhZ2dlZChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJvdW5kO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5zbmFwc2hvdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fc25hcHNob3RzLnB1c2goQ29udGFpbmVyU25hcHNob3Qub2YodGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuY2xvbmUoKSwgdGhpcy5fbWlkZGxld2FyZSwgdGhpcy5fYWN0aXZhdGlvbnMuY2xvbmUoKSwgdGhpcy5fZGVhY3RpdmF0aW9ucy5jbG9uZSgpLCB0aGlzLl9tb2R1bGVBY3RpdmF0aW9uU3RvcmUuY2xvbmUoKSkpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5yZXN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc25hcHNob3QgPSB0aGlzLl9zbmFwc2hvdHMucG9wKCk7XG4gICAgICAgIGlmIChzbmFwc2hvdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5OT19NT1JFX1NOQVBTSE9UU19BVkFJTEFCTEUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5ID0gc25hcHNob3QuYmluZGluZ3M7XG4gICAgICAgIHRoaXMuX2FjdGl2YXRpb25zID0gc25hcHNob3QuYWN0aXZhdGlvbnM7XG4gICAgICAgIHRoaXMuX2RlYWN0aXZhdGlvbnMgPSBzbmFwc2hvdC5kZWFjdGl2YXRpb25zO1xuICAgICAgICB0aGlzLl9taWRkbGV3YXJlID0gc25hcHNob3QubWlkZGxld2FyZTtcbiAgICAgICAgdGhpcy5fbW9kdWxlQWN0aXZhdGlvblN0b3JlID0gc25hcHNob3QubW9kdWxlQWN0aXZhdGlvblN0b3JlO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5jcmVhdGVDaGlsZCA9IGZ1bmN0aW9uIChjb250YWluZXJPcHRpb25zKSB7XG4gICAgICAgIHZhciBjaGlsZCA9IG5ldyBDb250YWluZXIoY29udGFpbmVyT3B0aW9ucyB8fCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmFwcGx5TWlkZGxld2FyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1pZGRsZXdhcmVzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBtaWRkbGV3YXJlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbml0aWFsID0gKHRoaXMuX21pZGRsZXdhcmUpID8gdGhpcy5fbWlkZGxld2FyZSA6IHRoaXMuX3BsYW5BbmRSZXNvbHZlKCk7XG4gICAgICAgIHRoaXMuX21pZGRsZXdhcmUgPSBtaWRkbGV3YXJlcy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGN1cnIpIHsgcmV0dXJuIGN1cnIocHJldik7IH0sIGluaXRpYWwpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5hcHBseUN1c3RvbU1ldGFkYXRhUmVhZGVyID0gZnVuY3Rpb24gKG1ldGFkYXRhUmVhZGVyKSB7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhUmVhZGVyID0gbWV0YWRhdGFSZWFkZXI7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICB2YXIgZ2V0QXJncyA9IHRoaXMuX2dldE5vdEFsbEFyZ3Moc2VydmljZUlkZW50aWZpZXIsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEJ1dFRocm93SWZBc3luYyhnZXRBcmdzKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0QXN5bmMgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGdldEFyZ3M7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgZ2V0QXJncyA9IHRoaXMuX2dldE5vdEFsbEFyZ3Moc2VydmljZUlkZW50aWZpZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIHRoaXMuX2dldChnZXRBcmdzKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldFRhZ2dlZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgZ2V0QXJncyA9IHRoaXMuX2dldE5vdEFsbEFyZ3Moc2VydmljZUlkZW50aWZpZXIsIGZhbHNlLCBrZXksIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEJ1dFRocm93SWZBc3luYyhnZXRBcmdzKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0VGFnZ2VkQXN5bmMgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGdldEFyZ3M7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgZ2V0QXJncyA9IHRoaXMuX2dldE5vdEFsbEFyZ3Moc2VydmljZUlkZW50aWZpZXIsIGZhbHNlLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIHRoaXMuX2dldChnZXRBcmdzKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldE5hbWVkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBuYW1lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUYWdnZWQoc2VydmljZUlkZW50aWZpZXIsIE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcsIG5hbWVkKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0TmFtZWRBc3luYyA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgbmFtZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGFnZ2VkQXN5bmMoc2VydmljZUlkZW50aWZpZXIsIE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcsIG5hbWVkKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHZhciBnZXRBcmdzID0gdGhpcy5fZ2V0QWxsQXJncyhzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRCdXRUaHJvd0lmQXN5bmMoZ2V0QXJncyk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldEFsbEFzeW5jID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHZhciBnZXRBcmdzID0gdGhpcy5fZ2V0QWxsQXJncyhzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRBbGwoZ2V0QXJncyk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldEFsbFRhZ2dlZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgZ2V0QXJncyA9IHRoaXMuX2dldE5vdEFsbEFyZ3Moc2VydmljZUlkZW50aWZpZXIsIHRydWUsIGtleSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QnV0VGhyb3dJZkFzeW5jKGdldEFyZ3MpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXRBbGxUYWdnZWRBc3luYyA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgZ2V0QXJncyA9IHRoaXMuX2dldE5vdEFsbEFyZ3Moc2VydmljZUlkZW50aWZpZXIsIHRydWUsIGtleSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QWxsKGdldEFyZ3MpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXRBbGxOYW1lZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgbmFtZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsVGFnZ2VkKHNlcnZpY2VJZGVudGlmaWVyLCBNRVRBREFUQV9LRVkuTkFNRURfVEFHLCBuYW1lZCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldEFsbE5hbWVkQXN5bmMgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIG5hbWVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFsbFRhZ2dlZEFzeW5jKHNlcnZpY2VJZGVudGlmaWVyLCBNRVRBREFUQV9LRVkuTkFNRURfVEFHLCBuYW1lZCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbiAoY29uc3RydWN0b3JGdW5jdGlvbikge1xuICAgICAgICB2YXIgaXNCb3VuZCA9IHRoaXMuaXNCb3VuZChjb25zdHJ1Y3RvckZ1bmN0aW9uKTtcbiAgICAgICAgaWYgKCFpc0JvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmQoY29uc3RydWN0b3JGdW5jdGlvbikudG9TZWxmKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc29sdmVkID0gdGhpcy5nZXQoY29uc3RydWN0b3JGdW5jdGlvbik7XG4gICAgICAgIGlmICghaXNCb3VuZCkge1xuICAgICAgICAgICAgdGhpcy51bmJpbmQoY29uc3RydWN0b3JGdW5jdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc29sdmVkO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fcHJlRGVzdHJveSA9IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgaW5zdGFuY2UpIHtcbiAgICAgICAgaWYgKFJlZmxlY3QuaGFzTWV0YWRhdGEoTUVUQURBVEFfS0VZLlBSRV9ERVNUUk9ZLCBjb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YShNRVRBREFUQV9LRVkuUFJFX0RFU1RST1ksIGNvbnN0cnVjdG9yKTtcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZVtkYXRhLnZhbHVlXSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9yZW1vdmVNb2R1bGVIYW5kbGVycyA9IGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuICAgICAgICB2YXIgbW9kdWxlQWN0aXZhdGlvbnNIYW5kbGVycyA9IHRoaXMuX21vZHVsZUFjdGl2YXRpb25TdG9yZS5yZW1vdmUobW9kdWxlSWQpO1xuICAgICAgICB0aGlzLl9hY3RpdmF0aW9ucy5yZW1vdmVJbnRlcnNlY3Rpb24obW9kdWxlQWN0aXZhdGlvbnNIYW5kbGVycy5vbkFjdGl2YXRpb25zKTtcbiAgICAgICAgdGhpcy5fZGVhY3RpdmF0aW9ucy5yZW1vdmVJbnRlcnNlY3Rpb24obW9kdWxlQWN0aXZhdGlvbnNIYW5kbGVycy5vbkRlYWN0aXZhdGlvbnMpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fcmVtb3ZlTW9kdWxlQmluZGluZ3MgPSBmdW5jdGlvbiAobW9kdWxlSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LnJlbW92ZUJ5Q29uZGl0aW9uKGZ1bmN0aW9uIChiaW5kaW5nKSB7IHJldHVybiBiaW5kaW5nLm1vZHVsZUlkID09PSBtb2R1bGVJZDsgfSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9kZWFjdGl2YXRlID0gZnVuY3Rpb24gKGJpbmRpbmcsIGluc3RhbmNlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnN0YW5jZSkuY29uc3RydWN0b3I7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGVhY3RpdmF0aW9ucy5oYXNLZXkoYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllcikpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fZGVhY3RpdmF0ZUNvbnRhaW5lcihpbnN0YW5jZSwgdGhpcy5fZGVhY3RpdmF0aW9ucy5nZXQoYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllcikudmFsdWVzKCkpO1xuICAgICAgICAgICAgICAgIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlRGVhY3RpdmF0aW9uRXJyb3IocmVzdWx0LnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX3Byb3BhZ2F0ZUNvbnRhaW5lckRlYWN0aXZhdGlvblRoZW5CaW5kaW5nQW5kUHJlRGVzdHJveUFzeW5jKGJpbmRpbmcsIGluc3RhbmNlLCBjb25zdHJ1Y3Rvcik7IH0pLCBjb25zdHJ1Y3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHByb3BhZ2F0ZURlYWN0aXZhdGlvblJlc3VsdCA9IHRoaXMuX3Byb3BhZ2F0ZUNvbnRhaW5lckRlYWN0aXZhdGlvblRoZW5CaW5kaW5nQW5kUHJlRGVzdHJveShiaW5kaW5nLCBpbnN0YW5jZSwgY29uc3RydWN0b3IpO1xuICAgICAgICAgICAgaWYgKGlzUHJvbWlzZShwcm9wYWdhdGVEZWFjdGl2YXRpb25SZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZURlYWN0aXZhdGlvbkVycm9yKHByb3BhZ2F0ZURlYWN0aXZhdGlvblJlc3VsdCwgY29uc3RydWN0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuT05fREVBQ1RJVkFUSU9OX0VSUk9SKGNvbnN0cnVjdG9yLm5hbWUsIGV4Lm1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5faGFuZGxlRGVhY3RpdmF0aW9uRXJyb3IgPSBmdW5jdGlvbiAoYXN5bmNSZXN1bHQsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBleF8xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCAyLCAsIDNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgYXN5bmNSZXN1bHRdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDNdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBleF8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuT05fREVBQ1RJVkFUSU9OX0VSUk9SKGNvbnN0cnVjdG9yLm5hbWUsIGV4XzEubWVzc2FnZSkpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZGVhY3RpdmF0ZUNvbnRhaW5lciA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgZGVhY3RpdmF0aW9uc0l0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBkZWFjdGl2YXRpb24gPSBkZWFjdGl2YXRpb25zSXRlcmF0b3IubmV4dCgpO1xuICAgICAgICB3aGlsZSAoZGVhY3RpdmF0aW9uLnZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZGVhY3RpdmF0aW9uLnZhbHVlKGluc3RhbmNlKTtcbiAgICAgICAgICAgIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5fZGVhY3RpdmF0ZUNvbnRhaW5lckFzeW5jKGluc3RhbmNlLCBkZWFjdGl2YXRpb25zSXRlcmF0b3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVhY3RpdmF0aW9uID0gZGVhY3RpdmF0aW9uc0l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZGVhY3RpdmF0ZUNvbnRhaW5lckFzeW5jID0gZnVuY3Rpb24gKGluc3RhbmNlLCBkZWFjdGl2YXRpb25zSXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRlYWN0aXZhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYWN0aXZhdGlvbiA9IGRlYWN0aXZhdGlvbnNJdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGVhY3RpdmF0aW9uLnZhbHVlKSByZXR1cm4gWzMsIDNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBkZWFjdGl2YXRpb24udmFsdWUoaW5zdGFuY2UpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVhY3RpdmF0aW9uID0gZGVhY3RpdmF0aW9uc0l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9nZXRDb250YWluZXJNb2R1bGVIZWxwZXJzRmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHNldE1vZHVsZUlkID0gZnVuY3Rpb24gKGJpbmRpbmdUb1N5bnRheCwgbW9kdWxlSWQpIHtcbiAgICAgICAgICAgIGJpbmRpbmdUb1N5bnRheC5fYmluZGluZy5tb2R1bGVJZCA9IG1vZHVsZUlkO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0QmluZEZ1bmN0aW9uID0gZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJpbmRpbmdUb1N5bnRheCA9IF90aGlzLmJpbmQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIHNldE1vZHVsZUlkKGJpbmRpbmdUb1N5bnRheCwgbW9kdWxlSWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5nVG9TeW50YXg7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0VW5iaW5kRnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnVuYmluZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0VW5iaW5kQXN5bmNGdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudW5iaW5kQXN5bmMoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldElzYm91bmRGdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuaXNCb3VuZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0UmViaW5kRnVuY3Rpb24gPSBmdW5jdGlvbiAobW9kdWxlSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmluZGluZ1RvU3ludGF4ID0gX3RoaXMucmViaW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICBzZXRNb2R1bGVJZChiaW5kaW5nVG9TeW50YXgsIG1vZHVsZUlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZ1RvU3ludGF4O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldE9uQWN0aXZhdGlvbkZ1bmN0aW9uID0gZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBvbkFjdGl2YXRpb24pIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fbW9kdWxlQWN0aXZhdGlvblN0b3JlLmFkZEFjdGl2YXRpb24obW9kdWxlSWQsIHNlcnZpY2VJZGVudGlmaWVyLCBvbkFjdGl2YXRpb24pO1xuICAgICAgICAgICAgICAgIF90aGlzLm9uQWN0aXZhdGlvbihzZXJ2aWNlSWRlbnRpZmllciwgb25BY3RpdmF0aW9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHZhciBnZXRPbkRlYWN0aXZhdGlvbkZ1bmN0aW9uID0gZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBvbkRlYWN0aXZhdGlvbikge1xuICAgICAgICAgICAgICAgIF90aGlzLl9tb2R1bGVBY3RpdmF0aW9uU3RvcmUuYWRkRGVhY3RpdmF0aW9uKG1vZHVsZUlkLCBzZXJ2aWNlSWRlbnRpZmllciwgb25EZWFjdGl2YXRpb24pO1xuICAgICAgICAgICAgICAgIF90aGlzLm9uRGVhY3RpdmF0aW9uKHNlcnZpY2VJZGVudGlmaWVyLCBvbkRlYWN0aXZhdGlvbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1JZCkgeyByZXR1cm4gKHtcbiAgICAgICAgICAgIGJpbmRGdW5jdGlvbjogZ2V0QmluZEZ1bmN0aW9uKG1JZCksXG4gICAgICAgICAgICBpc2JvdW5kRnVuY3Rpb246IGdldElzYm91bmRGdW5jdGlvbigpLFxuICAgICAgICAgICAgb25BY3RpdmF0aW9uRnVuY3Rpb246IGdldE9uQWN0aXZhdGlvbkZ1bmN0aW9uKG1JZCksXG4gICAgICAgICAgICBvbkRlYWN0aXZhdGlvbkZ1bmN0aW9uOiBnZXRPbkRlYWN0aXZhdGlvbkZ1bmN0aW9uKG1JZCksXG4gICAgICAgICAgICByZWJpbmRGdW5jdGlvbjogZ2V0UmViaW5kRnVuY3Rpb24obUlkKSxcbiAgICAgICAgICAgIHVuYmluZEZ1bmN0aW9uOiBnZXRVbmJpbmRGdW5jdGlvbigpLFxuICAgICAgICAgICAgdW5iaW5kQXN5bmNGdW5jdGlvbjogZ2V0VW5iaW5kQXN5bmNGdW5jdGlvbigpXG4gICAgICAgIH0pOyB9O1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZ2V0QWxsID0gZnVuY3Rpb24gKGdldEFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuX2dldChnZXRBcmdzKSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9nZXQgPSBmdW5jdGlvbiAoZ2V0QXJncykge1xuICAgICAgICB2YXIgcGxhbkFuZFJlc29sdmVBcmdzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGdldEFyZ3MpLCB7IGNvbnRleHRJbnRlcmNlcHRvcjogZnVuY3Rpb24gKGNvbnRleHQpIHsgcmV0dXJuIGNvbnRleHQ7IH0sIHRhcmdldFR5cGU6IFRhcmdldFR5cGVFbnVtLlZhcmlhYmxlIH0pO1xuICAgICAgICBpZiAodGhpcy5fbWlkZGxld2FyZSkge1xuICAgICAgICAgICAgdmFyIG1pZGRsZXdhcmVSZXN1bHQgPSB0aGlzLl9taWRkbGV3YXJlKHBsYW5BbmRSZXNvbHZlQXJncyk7XG4gICAgICAgICAgICBpZiAobWlkZGxld2FyZVJlc3VsdCA9PT0gdW5kZWZpbmVkIHx8IG1pZGRsZXdhcmVSZXN1bHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5JTlZBTElEX01JRERMRVdBUkVfUkVUVVJOKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtaWRkbGV3YXJlUmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFuQW5kUmVzb2x2ZSgpKHBsYW5BbmRSZXNvbHZlQXJncyk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9nZXRCdXRUaHJvd0lmQXN5bmMgPSBmdW5jdGlvbiAoZ2V0QXJncykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fZ2V0KGdldEFyZ3MpO1xuICAgICAgICBpZiAoaXNQcm9taXNlT3JDb250YWluc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuTEFaWV9JTl9TWU5DKGdldEFyZ3Muc2VydmljZUlkZW50aWZpZXIpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZ2V0QWxsQXJncyA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICB2YXIgZ2V0QWxsQXJncyA9IHtcbiAgICAgICAgICAgIGF2b2lkQ29uc3RyYWludHM6IHRydWUsXG4gICAgICAgICAgICBpc011bHRpSW5qZWN0OiB0cnVlLFxuICAgICAgICAgICAgc2VydmljZUlkZW50aWZpZXI6IHNlcnZpY2VJZGVudGlmaWVyLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ2V0QWxsQXJncztcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuX2dldE5vdEFsbEFyZ3MgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIGlzTXVsdGlJbmplY3QsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGdldE5vdEFsbEFyZ3MgPSB7XG4gICAgICAgICAgICBhdm9pZENvbnN0cmFpbnRzOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTXVsdGlJbmplY3Q6IGlzTXVsdGlJbmplY3QsXG4gICAgICAgICAgICBzZXJ2aWNlSWRlbnRpZmllcjogc2VydmljZUlkZW50aWZpZXIsXG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGdldE5vdEFsbEFyZ3M7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9wbGFuQW5kUmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHBsYW4oX3RoaXMuX21ldGFkYXRhUmVhZGVyLCBfdGhpcywgYXJncy5pc011bHRpSW5qZWN0LCBhcmdzLnRhcmdldFR5cGUsIGFyZ3Muc2VydmljZUlkZW50aWZpZXIsIGFyZ3Mua2V5LCBhcmdzLnZhbHVlLCBhcmdzLmF2b2lkQ29uc3RyYWludHMpO1xuICAgICAgICAgICAgY29udGV4dCA9IGFyZ3MuY29udGV4dEludGVyY2VwdG9yKGNvbnRleHQpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc29sdmUoY29udGV4dCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZGVhY3RpdmF0ZUlmU2luZ2xldG9uID0gZnVuY3Rpb24gKGJpbmRpbmcpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFiaW5kaW5nLmFjdGl2YXRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1Byb21pc2UoYmluZGluZy5jYWNoZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBiaW5kaW5nLmNhY2hlLnRoZW4oZnVuY3Rpb24gKHJlc29sdmVkKSB7IHJldHVybiBfdGhpcy5fZGVhY3RpdmF0ZShiaW5kaW5nLCByZXNvbHZlZCk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWFjdGl2YXRlKGJpbmRpbmcsIGJpbmRpbmcuY2FjaGUpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZGVhY3RpdmF0ZVNpbmdsZXRvbnMgPSBmdW5jdGlvbiAoYmluZGluZ3MpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBiaW5kaW5nc18xID0gYmluZGluZ3M7IF9pIDwgYmluZGluZ3NfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBiaW5kaW5nID0gYmluZGluZ3NfMVtfaV07XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fZGVhY3RpdmF0ZUlmU2luZ2xldG9uKGJpbmRpbmcpO1xuICAgICAgICAgICAgaWYgKGlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuQVNZTkNfVU5CSU5EX1JFUVVJUkVEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZGVhY3RpdmF0ZVNpbmdsZXRvbnNBc3luYyA9IGZ1bmN0aW9uIChiaW5kaW5ncykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIFByb21pc2UuYWxsKGJpbmRpbmdzLm1hcChmdW5jdGlvbiAoYikgeyByZXR1cm4gX3RoaXMuX2RlYWN0aXZhdGVJZlNpbmdsZXRvbihiKTsgfSkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9wcm9wYWdhdGVDb250YWluZXJEZWFjdGl2YXRpb25UaGVuQmluZGluZ0FuZFByZURlc3Ryb3kgPSBmdW5jdGlvbiAoYmluZGluZywgaW5zdGFuY2UsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlYWN0aXZhdGUuYmluZCh0aGlzLnBhcmVudCkoYmluZGluZywgaW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdEZWFjdGl2YXRpb25BbmRQcmVEZXN0cm95KGJpbmRpbmcsIGluc3RhbmNlLCBjb25zdHJ1Y3Rvcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuX3Byb3BhZ2F0ZUNvbnRhaW5lckRlYWN0aXZhdGlvblRoZW5CaW5kaW5nQW5kUHJlRGVzdHJveUFzeW5jID0gZnVuY3Rpb24gKGJpbmRpbmcsIGluc3RhbmNlLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLl9kZWFjdGl2YXRlLmJpbmQodGhpcy5wYXJlbnQpKGJpbmRpbmcsIGluc3RhbmNlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFs0LCB0aGlzLl9iaW5kaW5nRGVhY3RpdmF0aW9uQW5kUHJlRGVzdHJveUFzeW5jKGJpbmRpbmcsIGluc3RhbmNlLCBjb25zdHJ1Y3RvcildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9yZW1vdmVTZXJ2aWNlRnJvbURpY3Rpb25hcnkgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LnJlbW92ZShzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLkNBTk5PVF9VTkJJTkQgKyBcIiBcIiArIGdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcoc2VydmljZUlkZW50aWZpZXIpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fYmluZGluZ0RlYWN0aXZhdGlvbkFuZFByZURlc3Ryb3kgPSBmdW5jdGlvbiAoYmluZGluZywgaW5zdGFuY2UsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2YgYmluZGluZy5vbkRlYWN0aXZhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYmluZGluZy5vbkRlYWN0aXZhdGlvbihpbnN0YW5jZSk7XG4gICAgICAgICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX3ByZURlc3Ryb3koY29uc3RydWN0b3IsIGluc3RhbmNlKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByZURlc3Ryb3koY29uc3RydWN0b3IsIGluc3RhbmNlKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuX2JpbmRpbmdEZWFjdGl2YXRpb25BbmRQcmVEZXN0cm95QXN5bmMgPSBmdW5jdGlvbiAoYmluZGluZywgaW5zdGFuY2UsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHR5cGVvZiBiaW5kaW5nLm9uRGVhY3RpdmF0aW9uID09PSBcImZ1bmN0aW9uXCIpKSByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBiaW5kaW5nLm9uRGVhY3RpdmF0aW9uKGluc3RhbmNlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzQsIHRoaXMuX3ByZURlc3Ryb3koY29uc3RydWN0b3IsIGluc3RhbmNlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRhaW5lcjtcbn0oKSk7XG5leHBvcnQgeyBDb250YWluZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRhaW5lci5qcy5tYXAiLCJpbXBvcnQgeyBpZCB9IGZyb20gXCIuLi91dGlscy9pZFwiO1xudmFyIENvbnRhaW5lck1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGFpbmVyTW9kdWxlKHJlZ2lzdHJ5KSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5ID0gcmVnaXN0cnk7XG4gICAgfVxuICAgIHJldHVybiBDb250YWluZXJNb2R1bGU7XG59KCkpO1xuZXhwb3J0IHsgQ29udGFpbmVyTW9kdWxlIH07XG52YXIgQXN5bmNDb250YWluZXJNb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFzeW5jQ29udGFpbmVyTW9kdWxlKHJlZ2lzdHJ5KSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5ID0gcmVnaXN0cnk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY0NvbnRhaW5lck1vZHVsZTtcbn0oKSk7XG5leHBvcnQgeyBBc3luY0NvbnRhaW5lck1vZHVsZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGFpbmVyX21vZHVsZS5qcy5tYXAiLCJ2YXIgQ29udGFpbmVyU25hcHNob3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lclNuYXBzaG90KCkge1xuICAgIH1cbiAgICBDb250YWluZXJTbmFwc2hvdC5vZiA9IGZ1bmN0aW9uIChiaW5kaW5ncywgbWlkZGxld2FyZSwgYWN0aXZhdGlvbnMsIGRlYWN0aXZhdGlvbnMsIG1vZHVsZUFjdGl2YXRpb25TdG9yZSkge1xuICAgICAgICB2YXIgc25hcHNob3QgPSBuZXcgQ29udGFpbmVyU25hcHNob3QoKTtcbiAgICAgICAgc25hcHNob3QuYmluZGluZ3MgPSBiaW5kaW5ncztcbiAgICAgICAgc25hcHNob3QubWlkZGxld2FyZSA9IG1pZGRsZXdhcmU7XG4gICAgICAgIHNuYXBzaG90LmRlYWN0aXZhdGlvbnMgPSBkZWFjdGl2YXRpb25zO1xuICAgICAgICBzbmFwc2hvdC5hY3RpdmF0aW9ucyA9IGFjdGl2YXRpb25zO1xuICAgICAgICBzbmFwc2hvdC5tb2R1bGVBY3RpdmF0aW9uU3RvcmUgPSBtb2R1bGVBY3RpdmF0aW9uU3RvcmU7XG4gICAgICAgIHJldHVybiBzbmFwc2hvdDtcbiAgICB9O1xuICAgIHJldHVybiBDb250YWluZXJTbmFwc2hvdDtcbn0oKSk7XG5leHBvcnQgeyBDb250YWluZXJTbmFwc2hvdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGFpbmVyX3NuYXBzaG90LmpzLm1hcCIsImltcG9ydCAqIGFzIEVSUk9SX01TR1MgZnJvbSBcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCI7XG5pbXBvcnQgeyBpc0Nsb25hYmxlIH0gZnJvbSBcIi4uL3V0aWxzL2Nsb25hYmxlXCI7XG52YXIgTG9va3VwID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMb29rdXAoKSB7XG4gICAgICAgIHRoaXMuX21hcCA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgTG9va3VwLnByb3RvdHlwZS5nZXRNYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXA7XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHNlcnZpY2VJZGVudGlmaWVyID09PSBudWxsIHx8IHNlcnZpY2VJZGVudGlmaWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLk5VTExfQVJHVU1FTlQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5OVUxMX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9tYXAuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKGVudHJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVudHJ5LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFwLnNldChzZXJ2aWNlSWRlbnRpZmllciwgW3ZhbHVlXSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllciA9PT0gbnVsbCB8fCBzZXJ2aWNlSWRlbnRpZmllciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5OVUxMX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9tYXAuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKGVudHJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLktFWV9OT1RfRk9VTkQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICBpZiAoc2VydmljZUlkZW50aWZpZXIgPT09IG51bGwgfHwgc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuTlVMTF9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9tYXAuZGVsZXRlKHNlcnZpY2VJZGVudGlmaWVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuS0VZX05PVF9GT1VORCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUucmVtb3ZlSW50ZXJzZWN0aW9uID0gZnVuY3Rpb24gKGxvb2t1cCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnRyYXZlcnNlKGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBsb29rdXBBY3RpdmF0aW9ucyA9IGxvb2t1cC5oYXNLZXkoc2VydmljZUlkZW50aWZpZXIpID8gbG9va3VwLmdldChzZXJ2aWNlSWRlbnRpZmllcikgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAobG9va3VwQWN0aXZhdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJlZFZhbHVlcyA9IHZhbHVlLmZpbHRlcihmdW5jdGlvbiAobG9va3VwVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFsb29rdXBBY3RpdmF0aW9ucy5zb21lKGZ1bmN0aW9uIChtb2R1bGVBY3RpdmF0aW9uKSB7IHJldHVybiBsb29rdXBWYWx1ZSA9PT0gbW9kdWxlQWN0aXZhdGlvbjsgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3NldFZhbHVlKHNlcnZpY2VJZGVudGlmaWVyLCBmaWx0ZXJlZFZhbHVlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS5yZW1vdmVCeUNvbmRpdGlvbiA9IGZ1bmN0aW9uIChjb25kaXRpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJlbW92YWxzID0gW107XG4gICAgICAgIHRoaXMuX21hcC5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyaWVzLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciB1cGRhdGVkRW50cmllcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBlbnRyaWVzXzEgPSBlbnRyaWVzOyBfaSA8IGVudHJpZXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzXzFbX2ldO1xuICAgICAgICAgICAgICAgIHZhciByZW1vdmUgPSBjb25kaXRpb24oZW50cnkpO1xuICAgICAgICAgICAgICAgIGlmIChyZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZhbHMucHVzaChlbnRyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRW50cmllcy5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5fc2V0VmFsdWUoa2V5LCB1cGRhdGVkRW50cmllcyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVtb3ZhbHM7XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLmhhc0tleSA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICBpZiAoc2VydmljZUlkZW50aWZpZXIgPT09IG51bGwgfHwgc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuTlVMTF9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC5oYXMoc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvcHkgPSBuZXcgTG9va3VwKCk7XG4gICAgICAgIHRoaXMuX21hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChiKSB7IHJldHVybiBjb3B5LmFkZChrZXksIGlzQ2xvbmFibGUoYikgPyBiLmNsb25lKCkgOiBiKTsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29weTtcbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUudHJhdmVyc2UgPSBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICB0aGlzLl9tYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgZnVuYyhrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLl9zZXRWYWx1ZSA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5zZXQoc2VydmljZUlkZW50aWZpZXIsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5kZWxldGUoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTG9va3VwO1xufSgpKTtcbmV4cG9ydCB7IExvb2t1cCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9va3VwLmpzLm1hcCIsImltcG9ydCB7IExvb2t1cCB9IGZyb20gXCIuL2xvb2t1cFwiO1xudmFyIE1vZHVsZUFjdGl2YXRpb25TdG9yZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTW9kdWxlQWN0aXZhdGlvblN0b3JlKCkge1xuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIE1vZHVsZUFjdGl2YXRpb25TdG9yZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG4gICAgICAgIGlmICh0aGlzLl9tYXAuaGFzKG1vZHVsZUlkKSkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5fbWFwLmdldChtb2R1bGVJZCk7XG4gICAgICAgICAgICB0aGlzLl9tYXAuZGVsZXRlKG1vZHVsZUlkKTtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVycztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RW1wdHlIYW5kbGVyc1N0b3JlKCk7XG4gICAgfTtcbiAgICBNb2R1bGVBY3RpdmF0aW9uU3RvcmUucHJvdG90eXBlLmFkZERlYWN0aXZhdGlvbiA9IGZ1bmN0aW9uIChtb2R1bGVJZCwgc2VydmljZUlkZW50aWZpZXIsIG9uRGVhY3RpdmF0aW9uKSB7XG4gICAgICAgIHRoaXMuX2dldE1vZHVsZUFjdGl2YXRpb25IYW5kbGVycyhtb2R1bGVJZClcbiAgICAgICAgICAgIC5vbkRlYWN0aXZhdGlvbnMuYWRkKHNlcnZpY2VJZGVudGlmaWVyLCBvbkRlYWN0aXZhdGlvbik7XG4gICAgfTtcbiAgICBNb2R1bGVBY3RpdmF0aW9uU3RvcmUucHJvdG90eXBlLmFkZEFjdGl2YXRpb24gPSBmdW5jdGlvbiAobW9kdWxlSWQsIHNlcnZpY2VJZGVudGlmaWVyLCBvbkFjdGl2YXRpb24pIHtcbiAgICAgICAgdGhpcy5fZ2V0TW9kdWxlQWN0aXZhdGlvbkhhbmRsZXJzKG1vZHVsZUlkKVxuICAgICAgICAgICAgLm9uQWN0aXZhdGlvbnMuYWRkKHNlcnZpY2VJZGVudGlmaWVyLCBvbkFjdGl2YXRpb24pO1xuICAgIH07XG4gICAgTW9kdWxlQWN0aXZhdGlvblN0b3JlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsb25lID0gbmV3IE1vZHVsZUFjdGl2YXRpb25TdG9yZSgpO1xuICAgICAgICB0aGlzLl9tYXAuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlcnNTdG9yZSwgbW9kdWxlSWQpIHtcbiAgICAgICAgICAgIGNsb25lLl9tYXAuc2V0KG1vZHVsZUlkLCB7XG4gICAgICAgICAgICAgICAgb25BY3RpdmF0aW9uczogaGFuZGxlcnNTdG9yZS5vbkFjdGl2YXRpb25zLmNsb25lKCksXG4gICAgICAgICAgICAgICAgb25EZWFjdGl2YXRpb25zOiBoYW5kbGVyc1N0b3JlLm9uRGVhY3RpdmF0aW9ucy5jbG9uZSgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2xvbmU7XG4gICAgfTtcbiAgICBNb2R1bGVBY3RpdmF0aW9uU3RvcmUucHJvdG90eXBlLl9nZXRNb2R1bGVBY3RpdmF0aW9uSGFuZGxlcnMgPSBmdW5jdGlvbiAobW9kdWxlSWQpIHtcbiAgICAgICAgdmFyIG1vZHVsZUFjdGl2YXRpb25IYW5kbGVycyA9IHRoaXMuX21hcC5nZXQobW9kdWxlSWQpO1xuICAgICAgICBpZiAobW9kdWxlQWN0aXZhdGlvbkhhbmRsZXJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG1vZHVsZUFjdGl2YXRpb25IYW5kbGVycyA9IHRoaXMuX2dldEVtcHR5SGFuZGxlcnNTdG9yZSgpO1xuICAgICAgICAgICAgdGhpcy5fbWFwLnNldChtb2R1bGVJZCwgbW9kdWxlQWN0aXZhdGlvbkhhbmRsZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbW9kdWxlQWN0aXZhdGlvbkhhbmRsZXJzO1xuICAgIH07XG4gICAgTW9kdWxlQWN0aXZhdGlvblN0b3JlLnByb3RvdHlwZS5fZ2V0RW1wdHlIYW5kbGVyc1N0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaGFuZGxlcnNTdG9yZSA9IHtcbiAgICAgICAgICAgIG9uQWN0aXZhdGlvbnM6IG5ldyBMb29rdXAoKSxcbiAgICAgICAgICAgIG9uRGVhY3RpdmF0aW9uczogbmV3IExvb2t1cCgpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBoYW5kbGVyc1N0b3JlO1xuICAgIH07XG4gICAgcmV0dXJuIE1vZHVsZUFjdGl2YXRpb25TdG9yZTtcbn0oKSk7XG5leHBvcnQgeyBNb2R1bGVBY3RpdmF0aW9uU3RvcmUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vZHVsZV9hY3RpdmF0aW9uX3N0b3JlLmpzLm1hcCIsInZhciBpbnRlcmZhY2VzO1xuKGZ1bmN0aW9uIChpbnRlcmZhY2VzKSB7XG4gICAgO1xufSkoaW50ZXJmYWNlcyB8fCAoaW50ZXJmYWNlcyA9IHt9KSk7XG5leHBvcnQgeyBpbnRlcmZhY2VzIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2VzLmpzLm1hcCIsImltcG9ydCAqIGFzIGtleXMgZnJvbSBcIi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIjtcbmV4cG9ydCB2YXIgTUVUQURBVEFfS0VZID0ga2V5cztcbmV4cG9ydCB7IENvbnRhaW5lciB9IGZyb20gXCIuL2NvbnRhaW5lci9jb250YWluZXJcIjtcbmV4cG9ydCB7IEJpbmRpbmdTY29wZUVudW0sIEJpbmRpbmdUeXBlRW51bSwgVGFyZ2V0VHlwZUVudW0gfSBmcm9tIFwiLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiO1xuZXhwb3J0IHsgQXN5bmNDb250YWluZXJNb2R1bGUsIENvbnRhaW5lck1vZHVsZSB9IGZyb20gXCIuL2NvbnRhaW5lci9jb250YWluZXJfbW9kdWxlXCI7XG5leHBvcnQgeyBjcmVhdGVUYWdnZWREZWNvcmF0b3IgfSBmcm9tIFwiLi9hbm5vdGF0aW9uL2RlY29yYXRvcl91dGlsc1wiO1xuZXhwb3J0IHsgaW5qZWN0YWJsZSB9IGZyb20gXCIuL2Fubm90YXRpb24vaW5qZWN0YWJsZVwiO1xuZXhwb3J0IHsgdGFnZ2VkIH0gZnJvbSBcIi4vYW5ub3RhdGlvbi90YWdnZWRcIjtcbmV4cG9ydCB7IG5hbWVkIH0gZnJvbSBcIi4vYW5ub3RhdGlvbi9uYW1lZFwiO1xuZXhwb3J0IHsgaW5qZWN0IH0gZnJvbSBcIi4vYW5ub3RhdGlvbi9pbmplY3RcIjtcbmV4cG9ydCB7IExhenlTZXJ2aWNlSWRlbnRpZmVyIH0gZnJvbSBcIi4vYW5ub3RhdGlvbi9sYXp5X3NlcnZpY2VfaWRlbnRpZmllclwiO1xuZXhwb3J0IHsgb3B0aW9uYWwgfSBmcm9tIFwiLi9hbm5vdGF0aW9uL29wdGlvbmFsXCI7XG5leHBvcnQgeyB1bm1hbmFnZWQgfSBmcm9tIFwiLi9hbm5vdGF0aW9uL3VubWFuYWdlZFwiO1xuZXhwb3J0IHsgbXVsdGlJbmplY3QgfSBmcm9tIFwiLi9hbm5vdGF0aW9uL211bHRpX2luamVjdFwiO1xuZXhwb3J0IHsgdGFyZ2V0TmFtZSB9IGZyb20gXCIuL2Fubm90YXRpb24vdGFyZ2V0X25hbWVcIjtcbmV4cG9ydCB7IHBvc3RDb25zdHJ1Y3QgfSBmcm9tIFwiLi9hbm5vdGF0aW9uL3Bvc3RfY29uc3RydWN0XCI7XG5leHBvcnQgeyBwcmVEZXN0cm95IH0gZnJvbSBcIi4vYW5ub3RhdGlvbi9wcmVfZGVzdHJveVwiO1xuZXhwb3J0IHsgTWV0YWRhdGFSZWFkZXIgfSBmcm9tIFwiLi9wbGFubmluZy9tZXRhZGF0YV9yZWFkZXJcIjtcbmV4cG9ydCB7IGlkIH0gZnJvbSBcIi4vdXRpbHMvaWRcIjtcbmV4cG9ydCB7IGludGVyZmFjZXMgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIjtcbmV4cG9ydCB7IGRlY29yYXRlIH0gZnJvbSBcIi4vYW5ub3RhdGlvbi9kZWNvcmF0b3JfdXRpbHNcIjtcbmV4cG9ydCB7IHRyYXZlcnNlQW5jZXJzdG9ycywgdGFnZ2VkQ29uc3RyYWludCwgbmFtZWRDb25zdHJhaW50LCB0eXBlQ29uc3RyYWludCB9IGZyb20gXCIuL3N5bnRheC9jb25zdHJhaW50X2hlbHBlcnNcIjtcbmV4cG9ydCB7IGdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcgfSBmcm9tIFwiLi91dGlscy9zZXJpYWxpemF0aW9uXCI7XG5leHBvcnQgeyBtdWx0aUJpbmRUb1NlcnZpY2UgfSBmcm9tIFwiLi91dGlscy9iaW5kaW5nX3V0aWxzXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnZlcnNpZnkuanMubWFwIiwiaW1wb3J0IHsgaWQgfSBmcm9tIFwiLi4vdXRpbHMvaWRcIjtcbnZhciBDb250ZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0KGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmlkID0gaWQoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgfVxuICAgIENvbnRleHQucHJvdG90eXBlLmFkZFBsYW4gPSBmdW5jdGlvbiAocGxhbikge1xuICAgICAgICB0aGlzLnBsYW4gPSBwbGFuO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuc2V0Q3VycmVudFJlcXVlc3QgPSBmdW5jdGlvbiAoY3VycmVudFJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UmVxdWVzdCA9IGN1cnJlbnRSZXF1ZXN0O1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRleHQ7XG59KCkpO1xuZXhwb3J0IHsgQ29udGV4dCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGV4dC5qcy5tYXAiLCJpbXBvcnQgKiBhcyBNRVRBREFUQV9LRVkgZnJvbSBcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCI7XG52YXIgTWV0YWRhdGEgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1ldGFkYXRhKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgTWV0YWRhdGEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5rZXkgPT09IE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm5hbWVkOiBcIiArIFN0cmluZyh0aGlzLnZhbHVlKS50b1N0cmluZygpICsgXCIgXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJ0YWdnZWQ6IHsga2V5OlwiICsgdGhpcy5rZXkudG9TdHJpbmcoKSArIFwiLCB2YWx1ZTogXCIgKyBTdHJpbmcodGhpcy52YWx1ZSkgKyBcIiB9XCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBNZXRhZGF0YTtcbn0oKSk7XG5leHBvcnQgeyBNZXRhZGF0YSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWV0YWRhdGEuanMubWFwIiwiaW1wb3J0ICogYXMgTUVUQURBVEFfS0VZIGZyb20gXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiO1xudmFyIE1ldGFkYXRhUmVhZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXRhZGF0YVJlYWRlcigpIHtcbiAgICB9XG4gICAgTWV0YWRhdGFSZWFkZXIucHJvdG90eXBlLmdldENvbnN0cnVjdG9yTWV0YWRhdGEgPSBmdW5jdGlvbiAoY29uc3RydWN0b3JGdW5jKSB7XG4gICAgICAgIHZhciBjb21waWxlckdlbmVyYXRlZE1ldGFkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YShNRVRBREFUQV9LRVkuUEFSQU1fVFlQRVMsIGNvbnN0cnVjdG9yRnVuYyk7XG4gICAgICAgIHZhciB1c2VyR2VuZXJhdGVkTWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKE1FVEFEQVRBX0tFWS5UQUdHRUQsIGNvbnN0cnVjdG9yRnVuYyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21waWxlckdlbmVyYXRlZE1ldGFkYXRhOiBjb21waWxlckdlbmVyYXRlZE1ldGFkYXRhLFxuICAgICAgICAgICAgdXNlckdlbmVyYXRlZE1ldGFkYXRhOiB1c2VyR2VuZXJhdGVkTWV0YWRhdGEgfHwge31cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE1ldGFkYXRhUmVhZGVyLnByb3RvdHlwZS5nZXRQcm9wZXJ0aWVzTWV0YWRhdGEgPSBmdW5jdGlvbiAoY29uc3RydWN0b3JGdW5jKSB7XG4gICAgICAgIHZhciB1c2VyR2VuZXJhdGVkTWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKE1FVEFEQVRBX0tFWS5UQUdHRURfUFJPUCwgY29uc3RydWN0b3JGdW5jKSB8fCBbXTtcbiAgICAgICAgcmV0dXJuIHVzZXJHZW5lcmF0ZWRNZXRhZGF0YTtcbiAgICB9O1xuICAgIHJldHVybiBNZXRhZGF0YVJlYWRlcjtcbn0oKSk7XG5leHBvcnQgeyBNZXRhZGF0YVJlYWRlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWV0YWRhdGFfcmVhZGVyLmpzLm1hcCIsInZhciBQbGFuID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQbGFuKHBhcmVudENvbnRleHQsIHJvb3RSZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucGFyZW50Q29udGV4dCA9IHBhcmVudENvbnRleHQ7XG4gICAgICAgIHRoaXMucm9vdFJlcXVlc3QgPSByb290UmVxdWVzdDtcbiAgICB9XG4gICAgcmV0dXJuIFBsYW47XG59KCkpO1xuZXhwb3J0IHsgUGxhbiB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGxhbi5qcy5tYXAiLCJpbXBvcnQgeyBCaW5kaW5nQ291bnQgfSBmcm9tIFwiLi4vYmluZGluZ3MvYmluZGluZ19jb3VudFwiO1xuaW1wb3J0ICogYXMgRVJST1JfTVNHUyBmcm9tIFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIjtcbmltcG9ydCB7IEJpbmRpbmdUeXBlRW51bSwgVGFyZ2V0VHlwZUVudW0gfSBmcm9tIFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIjtcbmltcG9ydCAqIGFzIE1FVEFEQVRBX0tFWSBmcm9tIFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIjtcbmltcG9ydCB7IGlzU3RhY2tPdmVyZmxvd0V4ZXB0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4Y2VwdGlvbnNcIjtcbmltcG9ydCB7IGNpcmN1bGFyRGVwZW5kZW5jeVRvRXhjZXB0aW9uLCBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nLCBsaXN0TWV0YWRhdGFGb3JUYXJnZXQsIGxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllciB9IGZyb20gXCIuLi91dGlscy9zZXJpYWxpemF0aW9uXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcIi4vY29udGV4dFwiO1xuaW1wb3J0IHsgTWV0YWRhdGEgfSBmcm9tIFwiLi9tZXRhZGF0YVwiO1xuaW1wb3J0IHsgUGxhbiB9IGZyb20gXCIuL3BsYW5cIjtcbmltcG9ydCB7IGdldEJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudCwgZ2V0RGVwZW5kZW5jaWVzLCBnZXRGdW5jdGlvbk5hbWUgfSBmcm9tIFwiLi9yZWZsZWN0aW9uX3V0aWxzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSBcIi4vcmVxdWVzdFwiO1xuaW1wb3J0IHsgVGFyZ2V0IH0gZnJvbSBcIi4vdGFyZ2V0XCI7XG5mdW5jdGlvbiBnZXRCaW5kaW5nRGljdGlvbmFyeShjbnRucikge1xuICAgIHJldHVybiBjbnRuci5fYmluZGluZ0RpY3Rpb25hcnk7XG59XG5mdW5jdGlvbiBfY3JlYXRlVGFyZ2V0KGlzTXVsdGlJbmplY3QsIHRhcmdldFR5cGUsIHNlcnZpY2VJZGVudGlmaWVyLCBuYW1lLCBrZXksIHZhbHVlKSB7XG4gICAgdmFyIG1ldGFkYXRhS2V5ID0gaXNNdWx0aUluamVjdCA/IE1FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHIDogTUVUQURBVEFfS0VZLklOSkVDVF9UQUc7XG4gICAgdmFyIGluamVjdE1ldGFkYXRhID0gbmV3IE1ldGFkYXRhKG1ldGFkYXRhS2V5LCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgdmFyIHRhcmdldCA9IG5ldyBUYXJnZXQodGFyZ2V0VHlwZSwgbmFtZSwgc2VydmljZUlkZW50aWZpZXIsIGluamVjdE1ldGFkYXRhKTtcbiAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHRhZ01ldGFkYXRhID0gbmV3IE1ldGFkYXRhKGtleSwgdmFsdWUpO1xuICAgICAgICB0YXJnZXQubWV0YWRhdGEucHVzaCh0YWdNZXRhZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBfZ2V0QWN0aXZlQmluZGluZ3MobWV0YWRhdGFSZWFkZXIsIGF2b2lkQ29uc3RyYWludHMsIGNvbnRleHQsIHBhcmVudFJlcXVlc3QsIHRhcmdldCkge1xuICAgIHZhciBiaW5kaW5ncyA9IGdldEJpbmRpbmdzKGNvbnRleHQuY29udGFpbmVyLCB0YXJnZXQuc2VydmljZUlkZW50aWZpZXIpO1xuICAgIHZhciBhY3RpdmVCaW5kaW5ncyA9IFtdO1xuICAgIGlmIChiaW5kaW5ncy5sZW5ndGggPT09IEJpbmRpbmdDb3VudC5Ob0JpbmRpbmdzQXZhaWxhYmxlICYmXG4gICAgICAgIGNvbnRleHQuY29udGFpbmVyLm9wdGlvbnMuYXV0b0JpbmRJbmplY3RhYmxlICYmXG4gICAgICAgIHR5cGVvZiB0YXJnZXQuc2VydmljZUlkZW50aWZpZXIgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICBtZXRhZGF0YVJlYWRlci5nZXRDb25zdHJ1Y3Rvck1ldGFkYXRhKHRhcmdldC5zZXJ2aWNlSWRlbnRpZmllcikuY29tcGlsZXJHZW5lcmF0ZWRNZXRhZGF0YSkge1xuICAgICAgICBjb250ZXh0LmNvbnRhaW5lci5iaW5kKHRhcmdldC5zZXJ2aWNlSWRlbnRpZmllcikudG9TZWxmKCk7XG4gICAgICAgIGJpbmRpbmdzID0gZ2V0QmluZGluZ3MoY29udGV4dC5jb250YWluZXIsIHRhcmdldC5zZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfVxuICAgIGlmICghYXZvaWRDb25zdHJhaW50cykge1xuICAgICAgICBhY3RpdmVCaW5kaW5ncyA9IGJpbmRpbmdzLmZpbHRlcihmdW5jdGlvbiAoYmluZGluZykge1xuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgUmVxdWVzdChiaW5kaW5nLnNlcnZpY2VJZGVudGlmaWVyLCBjb250ZXh0LCBwYXJlbnRSZXF1ZXN0LCBiaW5kaW5nLCB0YXJnZXQpO1xuICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmcuY29uc3RyYWludChyZXF1ZXN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhY3RpdmVCaW5kaW5ncyA9IGJpbmRpbmdzO1xuICAgIH1cbiAgICBfdmFsaWRhdGVBY3RpdmVCaW5kaW5nQ291bnQodGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyLCBhY3RpdmVCaW5kaW5ncywgdGFyZ2V0LCBjb250ZXh0LmNvbnRhaW5lcik7XG4gICAgcmV0dXJuIGFjdGl2ZUJpbmRpbmdzO1xufVxuZnVuY3Rpb24gX3ZhbGlkYXRlQWN0aXZlQmluZGluZ0NvdW50KHNlcnZpY2VJZGVudGlmaWVyLCBiaW5kaW5ncywgdGFyZ2V0LCBjb250YWluZXIpIHtcbiAgICBzd2l0Y2ggKGJpbmRpbmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIEJpbmRpbmdDb3VudC5Ob0JpbmRpbmdzQXZhaWxhYmxlOlxuICAgICAgICAgICAgaWYgKHRhcmdldC5pc09wdGlvbmFsKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXJTdHJpbmcgPSBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gRVJST1JfTVNHUy5OT1RfUkVHSVNURVJFRDtcbiAgICAgICAgICAgICAgICBtc2cgKz0gbGlzdE1ldGFkYXRhRm9yVGFyZ2V0KHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgIG1zZyArPSBsaXN0UmVnaXN0ZXJlZEJpbmRpbmdzRm9yU2VydmljZUlkZW50aWZpZXIoY29udGFpbmVyLCBzZXJ2aWNlSWRlbnRpZmllclN0cmluZywgZ2V0QmluZGluZ3MpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlIEJpbmRpbmdDb3VudC5Pbmx5T25lQmluZGluZ0F2YWlsYWJsZTpcbiAgICAgICAgICAgIHJldHVybiBiaW5kaW5ncztcbiAgICAgICAgY2FzZSBCaW5kaW5nQ291bnQuTXVsdGlwbGVCaW5kaW5nc0F2YWlsYWJsZTpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGlmICghdGFyZ2V0LmlzQXJyYXkoKSkge1xuICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllclN0cmluZyA9IGdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBFUlJPUl9NU0dTLkFNQklHVU9VU19NQVRDSCArIFwiIFwiICsgc2VydmljZUlkZW50aWZpZXJTdHJpbmc7XG4gICAgICAgICAgICAgICAgbXNnICs9IGxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllcihjb250YWluZXIsIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nLCBnZXRCaW5kaW5ncyk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gX2NyZWF0ZVN1YlJlcXVlc3RzKG1ldGFkYXRhUmVhZGVyLCBhdm9pZENvbnN0cmFpbnRzLCBzZXJ2aWNlSWRlbnRpZmllciwgY29udGV4dCwgcGFyZW50UmVxdWVzdCwgdGFyZ2V0KSB7XG4gICAgdmFyIGFjdGl2ZUJpbmRpbmdzO1xuICAgIHZhciBjaGlsZFJlcXVlc3Q7XG4gICAgaWYgKHBhcmVudFJlcXVlc3QgPT09IG51bGwpIHtcbiAgICAgICAgYWN0aXZlQmluZGluZ3MgPSBfZ2V0QWN0aXZlQmluZGluZ3MobWV0YWRhdGFSZWFkZXIsIGF2b2lkQ29uc3RyYWludHMsIGNvbnRleHQsIG51bGwsIHRhcmdldCk7XG4gICAgICAgIGNoaWxkUmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHNlcnZpY2VJZGVudGlmaWVyLCBjb250ZXh0LCBudWxsLCBhY3RpdmVCaW5kaW5ncywgdGFyZ2V0KTtcbiAgICAgICAgdmFyIHRoZVBsYW4gPSBuZXcgUGxhbihjb250ZXh0LCBjaGlsZFJlcXVlc3QpO1xuICAgICAgICBjb250ZXh0LmFkZFBsYW4odGhlUGxhbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhY3RpdmVCaW5kaW5ncyA9IF9nZXRBY3RpdmVCaW5kaW5ncyhtZXRhZGF0YVJlYWRlciwgYXZvaWRDb25zdHJhaW50cywgY29udGV4dCwgcGFyZW50UmVxdWVzdCwgdGFyZ2V0KTtcbiAgICAgICAgY2hpbGRSZXF1ZXN0ID0gcGFyZW50UmVxdWVzdC5hZGRDaGlsZFJlcXVlc3QodGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyLCBhY3RpdmVCaW5kaW5ncywgdGFyZ2V0KTtcbiAgICB9XG4gICAgYWN0aXZlQmluZGluZ3MuZm9yRWFjaChmdW5jdGlvbiAoYmluZGluZykge1xuICAgICAgICB2YXIgc3ViQ2hpbGRSZXF1ZXN0ID0gbnVsbDtcbiAgICAgICAgaWYgKHRhcmdldC5pc0FycmF5KCkpIHtcbiAgICAgICAgICAgIHN1YkNoaWxkUmVxdWVzdCA9IGNoaWxkUmVxdWVzdC5hZGRDaGlsZFJlcXVlc3QoYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllciwgYmluZGluZywgdGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nLmNhY2hlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ViQ2hpbGRSZXF1ZXN0ID0gY2hpbGRSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChiaW5kaW5nLnR5cGUgPT09IEJpbmRpbmdUeXBlRW51bS5JbnN0YW5jZSAmJiBiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGRlcGVuZGVuY2llcyA9IGdldERlcGVuZGVuY2llcyhtZXRhZGF0YVJlYWRlciwgYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUpO1xuICAgICAgICAgICAgaWYgKCFjb250ZXh0LmNvbnRhaW5lci5vcHRpb25zLnNraXBCYXNlQ2xhc3NDaGVja3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50ID0gZ2V0QmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50KG1ldGFkYXRhUmVhZGVyLCBiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGRlcGVuZGVuY2llcy5sZW5ndGggPCBiYXNlQ2xhc3NEZXBlbmRlbmN5Q291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gRVJST1JfTVNHUy5BUkdVTUVOVFNfTEVOR1RIX01JU01BVENIKGdldEZ1bmN0aW9uTmFtZShiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlcGVuZGVuY2llcy5mb3JFYWNoKGZ1bmN0aW9uIChkZXBlbmRlbmN5KSB7XG4gICAgICAgICAgICAgICAgX2NyZWF0ZVN1YlJlcXVlc3RzKG1ldGFkYXRhUmVhZGVyLCBmYWxzZSwgZGVwZW5kZW5jeS5zZXJ2aWNlSWRlbnRpZmllciwgY29udGV4dCwgc3ViQ2hpbGRSZXF1ZXN0LCBkZXBlbmRlbmN5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBnZXRCaW5kaW5ncyhjb250YWluZXIsIHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgdmFyIGJpbmRpbmdzID0gW107XG4gICAgdmFyIGJpbmRpbmdEaWN0aW9uYXJ5ID0gZ2V0QmluZGluZ0RpY3Rpb25hcnkoY29udGFpbmVyKTtcbiAgICBpZiAoYmluZGluZ0RpY3Rpb25hcnkuaGFzS2V5KHNlcnZpY2VJZGVudGlmaWVyKSkge1xuICAgICAgICBiaW5kaW5ncyA9IGJpbmRpbmdEaWN0aW9uYXJ5LmdldChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRhaW5lci5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgYmluZGluZ3MgPSBnZXRCaW5kaW5ncyhjb250YWluZXIucGFyZW50LCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfVxuICAgIHJldHVybiBiaW5kaW5ncztcbn1cbmZ1bmN0aW9uIHBsYW4obWV0YWRhdGFSZWFkZXIsIGNvbnRhaW5lciwgaXNNdWx0aUluamVjdCwgdGFyZ2V0VHlwZSwgc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUsIGF2b2lkQ29uc3RyYWludHMpIHtcbiAgICBpZiAoYXZvaWRDb25zdHJhaW50cyA9PT0gdm9pZCAwKSB7IGF2b2lkQ29uc3RyYWludHMgPSBmYWxzZTsgfVxuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQoY29udGFpbmVyKTtcbiAgICB2YXIgdGFyZ2V0ID0gX2NyZWF0ZVRhcmdldChpc011bHRpSW5qZWN0LCB0YXJnZXRUeXBlLCBzZXJ2aWNlSWRlbnRpZmllciwgXCJcIiwga2V5LCB2YWx1ZSk7XG4gICAgdHJ5IHtcbiAgICAgICAgX2NyZWF0ZVN1YlJlcXVlc3RzKG1ldGFkYXRhUmVhZGVyLCBhdm9pZENvbnN0cmFpbnRzLCBzZXJ2aWNlSWRlbnRpZmllciwgY29udGV4dCwgbnVsbCwgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoaXNTdGFja092ZXJmbG93RXhlcHRpb24oZXJyb3IpKSB7XG4gICAgICAgICAgICBjaXJjdWxhckRlcGVuZGVuY3lUb0V4Y2VwdGlvbihjb250ZXh0LnBsYW4ucm9vdFJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZU1vY2tSZXF1ZXN0KGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gbmV3IFRhcmdldChUYXJnZXRUeXBlRW51bS5WYXJpYWJsZSwgXCJcIiwgc2VydmljZUlkZW50aWZpZXIsIG5ldyBNZXRhZGF0YShrZXksIHZhbHVlKSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dChjb250YWluZXIpO1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3Qoc2VydmljZUlkZW50aWZpZXIsIGNvbnRleHQsIG51bGwsIFtdLCB0YXJnZXQpO1xuICAgIHJldHVybiByZXF1ZXN0O1xufVxuZXhwb3J0IHsgcGxhbiwgY3JlYXRlTW9ja1JlcXVlc3QsIGdldEJpbmRpbmdEaWN0aW9uYXJ5IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wbGFubmVyLmpzLm1hcCIsInZhciBRdWVyeWFibGVTdHJpbmcgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFF1ZXJ5YWJsZVN0cmluZyhzdHIpIHtcbiAgICAgICAgdGhpcy5zdHIgPSBzdHI7XG4gICAgfVxuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nKSA9PT0gMDtcbiAgICB9O1xuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbiAoc2VhcmNoU3RyaW5nKSB7XG4gICAgICAgIHZhciByZXZlcnNlU3RyaW5nID0gXCJcIjtcbiAgICAgICAgdmFyIHJldmVyc2VTZWFyY2hTdHJpbmcgPSBzZWFyY2hTdHJpbmcuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgICAgIHJldmVyc2VTdHJpbmcgPSB0aGlzLnN0ci5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRzV2l0aC5jYWxsKHsgc3RyOiByZXZlcnNlU3RyaW5nIH0sIHJldmVyc2VTZWFyY2hTdHJpbmcpO1xuICAgIH07XG4gICAgUXVlcnlhYmxlU3RyaW5nLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnN0ci5pbmRleE9mKHNlYXJjaFN0cmluZykgIT09IC0xKTtcbiAgICB9O1xuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKGNvbXBhcmVTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyID09PSBjb21wYXJlU3RyaW5nO1xuICAgIH07XG4gICAgUXVlcnlhYmxlU3RyaW5nLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgIH07XG4gICAgcmV0dXJuIFF1ZXJ5YWJsZVN0cmluZztcbn0oKSk7XG5leHBvcnQgeyBRdWVyeWFibGVTdHJpbmcgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXF1ZXJ5YWJsZV9zdHJpbmcuanMubWFwIiwidmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59O1xuaW1wb3J0IHsgTGF6eVNlcnZpY2VJZGVudGlmZXIgfSBmcm9tIFwiLi4vYW5ub3RhdGlvbi9sYXp5X3NlcnZpY2VfaWRlbnRpZmllclwiO1xuaW1wb3J0ICogYXMgRVJST1JfTVNHUyBmcm9tIFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIjtcbmltcG9ydCB7IFRhcmdldFR5cGVFbnVtIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCI7XG5pbXBvcnQgKiBhcyBNRVRBREFUQV9LRVkgZnJvbSBcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCI7XG5pbXBvcnQgeyBnZXRGdW5jdGlvbk5hbWUgfSBmcm9tIFwiLi4vdXRpbHMvc2VyaWFsaXphdGlvblwiO1xuaW1wb3J0IHsgVGFyZ2V0IH0gZnJvbSBcIi4vdGFyZ2V0XCI7XG5mdW5jdGlvbiBnZXREZXBlbmRlbmNpZXMobWV0YWRhdGFSZWFkZXIsIGZ1bmMpIHtcbiAgICB2YXIgY29uc3RydWN0b3JOYW1lID0gZ2V0RnVuY3Rpb25OYW1lKGZ1bmMpO1xuICAgIHJldHVybiBnZXRUYXJnZXRzKG1ldGFkYXRhUmVhZGVyLCBjb25zdHJ1Y3Rvck5hbWUsIGZ1bmMsIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIGdldFRhcmdldHMobWV0YWRhdGFSZWFkZXIsIGNvbnN0cnVjdG9yTmFtZSwgZnVuYywgaXNCYXNlQ2xhc3MpIHtcbiAgICB2YXIgbWV0YWRhdGEgPSBtZXRhZGF0YVJlYWRlci5nZXRDb25zdHJ1Y3Rvck1ldGFkYXRhKGZ1bmMpO1xuICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllcnMgPSBtZXRhZGF0YS5jb21waWxlckdlbmVyYXRlZE1ldGFkYXRhO1xuICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllcnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbXNnID0gRVJST1JfTVNHUy5NSVNTSU5HX0lOSkVDVEFCTEVfQU5OT1RBVElPTiArIFwiIFwiICsgY29uc3RydWN0b3JOYW1lICsgXCIuXCI7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbiAgICB2YXIgY29uc3RydWN0b3JBcmdzTWV0YWRhdGEgPSBtZXRhZGF0YS51c2VyR2VuZXJhdGVkTWV0YWRhdGE7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YSk7XG4gICAgdmFyIGhhc1VzZXJEZWNsYXJlZFVua25vd25JbmplY3Rpb25zID0gKGZ1bmMubGVuZ3RoID09PSAwICYmIGtleXMubGVuZ3RoID4gMCk7XG4gICAgdmFyIGhhc09wdGlvbmFsUGFyYW1ldGVycyA9IGtleXMubGVuZ3RoID4gZnVuYy5sZW5ndGg7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAoaGFzVXNlckRlY2xhcmVkVW5rbm93bkluamVjdGlvbnMgfHwgaGFzT3B0aW9uYWxQYXJhbWV0ZXJzKSA/IGtleXMubGVuZ3RoIDogZnVuYy5sZW5ndGg7XG4gICAgdmFyIGNvbnN0cnVjdG9yVGFyZ2V0cyA9IGdldENvbnN0cnVjdG9yQXJnc0FzVGFyZ2V0cyhpc0Jhc2VDbGFzcywgY29uc3RydWN0b3JOYW1lLCBzZXJ2aWNlSWRlbnRpZmllcnMsIGNvbnN0cnVjdG9yQXJnc01ldGFkYXRhLCBpdGVyYXRpb25zKTtcbiAgICB2YXIgcHJvcGVydHlUYXJnZXRzID0gZ2V0Q2xhc3NQcm9wc0FzVGFyZ2V0cyhtZXRhZGF0YVJlYWRlciwgZnVuYywgY29uc3RydWN0b3JOYW1lKTtcbiAgICB2YXIgdGFyZ2V0cyA9IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgY29uc3RydWN0b3JUYXJnZXRzLCB0cnVlKSwgcHJvcGVydHlUYXJnZXRzLCB0cnVlKTtcbiAgICByZXR1cm4gdGFyZ2V0cztcbn1cbmZ1bmN0aW9uIGdldENvbnN0cnVjdG9yQXJnc0FzVGFyZ2V0KGluZGV4LCBpc0Jhc2VDbGFzcywgY29uc3RydWN0b3JOYW1lLCBzZXJ2aWNlSWRlbnRpZmllcnMsIGNvbnN0cnVjdG9yQXJnc01ldGFkYXRhKSB7XG4gICAgdmFyIHRhcmdldE1ldGFkYXRhID0gY29uc3RydWN0b3JBcmdzTWV0YWRhdGFbaW5kZXgudG9TdHJpbmcoKV0gfHwgW107XG4gICAgdmFyIG1ldGFkYXRhID0gZm9ybWF0VGFyZ2V0TWV0YWRhdGEodGFyZ2V0TWV0YWRhdGEpO1xuICAgIHZhciBpc01hbmFnZWQgPSBtZXRhZGF0YS51bm1hbmFnZWQgIT09IHRydWU7XG4gICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXJzW2luZGV4XTtcbiAgICB2YXIgaW5qZWN0SWRlbnRpZmllciA9IChtZXRhZGF0YS5pbmplY3QgfHwgbWV0YWRhdGEubXVsdGlJbmplY3QpO1xuICAgIHNlcnZpY2VJZGVudGlmaWVyID0gKGluamVjdElkZW50aWZpZXIpID8gKGluamVjdElkZW50aWZpZXIpIDogc2VydmljZUlkZW50aWZpZXI7XG4gICAgaWYgKHNlcnZpY2VJZGVudGlmaWVyIGluc3RhbmNlb2YgTGF6eVNlcnZpY2VJZGVudGlmZXIpIHtcbiAgICAgICAgc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllci51bndyYXAoKTtcbiAgICB9XG4gICAgaWYgKGlzTWFuYWdlZCkge1xuICAgICAgICB2YXIgaXNPYmplY3QgPSBzZXJ2aWNlSWRlbnRpZmllciA9PT0gT2JqZWN0O1xuICAgICAgICB2YXIgaXNGdW5jdGlvbiA9IHNlcnZpY2VJZGVudGlmaWVyID09PSBGdW5jdGlvbjtcbiAgICAgICAgdmFyIGlzVW5kZWZpbmVkID0gc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIGlzVW5rbm93blR5cGUgPSAoaXNPYmplY3QgfHwgaXNGdW5jdGlvbiB8fCBpc1VuZGVmaW5lZCk7XG4gICAgICAgIGlmICghaXNCYXNlQ2xhc3MgJiYgaXNVbmtub3duVHlwZSkge1xuICAgICAgICAgICAgdmFyIG1zZyA9IEVSUk9SX01TR1MuTUlTU0lOR19JTkpFQ1RfQU5OT1RBVElPTiArIFwiIGFyZ3VtZW50IFwiICsgaW5kZXggKyBcIiBpbiBjbGFzcyBcIiArIGNvbnN0cnVjdG9yTmFtZSArIFwiLlwiO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRhcmdldCA9IG5ldyBUYXJnZXQoVGFyZ2V0VHlwZUVudW0uQ29uc3RydWN0b3JBcmd1bWVudCwgbWV0YWRhdGEudGFyZ2V0TmFtZSwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICB0YXJnZXQubWV0YWRhdGEgPSB0YXJnZXRNZXRhZGF0YTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3RvckFyZ3NBc1RhcmdldHMoaXNCYXNlQ2xhc3MsIGNvbnN0cnVjdG9yTmFtZSwgc2VydmljZUlkZW50aWZpZXJzLCBjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YSwgaXRlcmF0aW9ucykge1xuICAgIHZhciB0YXJnZXRzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYXRpb25zOyBpKyspIHtcbiAgICAgICAgdmFyIGluZGV4ID0gaTtcbiAgICAgICAgdmFyIHRhcmdldCA9IGdldENvbnN0cnVjdG9yQXJnc0FzVGFyZ2V0KGluZGV4LCBpc0Jhc2VDbGFzcywgY29uc3RydWN0b3JOYW1lLCBzZXJ2aWNlSWRlbnRpZmllcnMsIGNvbnN0cnVjdG9yQXJnc01ldGFkYXRhKTtcbiAgICAgICAgaWYgKHRhcmdldCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGFyZ2V0cy5wdXNoKHRhcmdldCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldHM7XG59XG5mdW5jdGlvbiBfZ2V0U2VydmljZUlkZW50aWZpZXJGb3JQcm9wZXJ0eShpbmplY3QsIG11bHRpSW5qZWN0LCBwcm9wZXJ0eU5hbWUsIGNsYXNzTmFtZSkge1xuICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllciA9IChpbmplY3QgfHwgbXVsdGlJbmplY3QpO1xuICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBtc2cgPSBFUlJPUl9NU0dTLk1JU1NJTkdfSU5KRUNUQUJMRV9BTk5PVEFUSU9OICsgXCIgZm9yIHByb3BlcnR5IFwiICsgU3RyaW5nKHByb3BlcnR5TmFtZSkgKyBcIiBpbiBjbGFzcyBcIiArIGNsYXNzTmFtZSArIFwiLlwiO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlcnZpY2VJZGVudGlmaWVyO1xufVxuZnVuY3Rpb24gZ2V0Q2xhc3NQcm9wc0FzVGFyZ2V0cyhtZXRhZGF0YVJlYWRlciwgY29uc3RydWN0b3JGdW5jLCBjb25zdHJ1Y3Rvck5hbWUpIHtcbiAgICB2YXIgY2xhc3NQcm9wc01ldGFkYXRhID0gbWV0YWRhdGFSZWFkZXIuZ2V0UHJvcGVydGllc01ldGFkYXRhKGNvbnN0cnVjdG9yRnVuYyk7XG4gICAgdmFyIHRhcmdldHMgPSBbXTtcbiAgICB2YXIgc3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoY2xhc3NQcm9wc01ldGFkYXRhKTtcbiAgICB2YXIgc3RyaW5nS2V5cyA9IE9iamVjdC5rZXlzKGNsYXNzUHJvcHNNZXRhZGF0YSk7XG4gICAgdmFyIGtleXMgPSBzdHJpbmdLZXlzLmNvbmNhdChzeW1ib2xLZXlzKTtcbiAgICBmb3IgKHZhciBfaSA9IDAsIGtleXNfMSA9IGtleXM7IF9pIDwga2V5c18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIga2V5ID0ga2V5c18xW19pXTtcbiAgICAgICAgdmFyIHRhcmdldE1ldGFkYXRhID0gY2xhc3NQcm9wc01ldGFkYXRhW2tleV07XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IGZvcm1hdFRhcmdldE1ldGFkYXRhKHRhcmdldE1ldGFkYXRhKTtcbiAgICAgICAgdmFyIGlkZW50aWZpZXIgPSBtZXRhZGF0YS50YXJnZXROYW1lIHx8IGtleTtcbiAgICAgICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyID0gX2dldFNlcnZpY2VJZGVudGlmaWVyRm9yUHJvcGVydHkobWV0YWRhdGEuaW5qZWN0LCBtZXRhZGF0YS5tdWx0aUluamVjdCwga2V5LCBjb25zdHJ1Y3Rvck5hbWUpO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gbmV3IFRhcmdldChUYXJnZXRUeXBlRW51bS5DbGFzc1Byb3BlcnR5LCBpZGVudGlmaWVyLCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIHRhcmdldC5tZXRhZGF0YSA9IHRhcmdldE1ldGFkYXRhO1xuICAgICAgICB0YXJnZXRzLnB1c2godGFyZ2V0KTtcbiAgICB9XG4gICAgdmFyIGJhc2VDb25zdHJ1Y3RvciA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihjb25zdHJ1Y3RvckZ1bmMucHJvdG90eXBlKS5jb25zdHJ1Y3RvcjtcbiAgICBpZiAoYmFzZUNvbnN0cnVjdG9yICE9PSBPYmplY3QpIHtcbiAgICAgICAgdmFyIGJhc2VUYXJnZXRzID0gZ2V0Q2xhc3NQcm9wc0FzVGFyZ2V0cyhtZXRhZGF0YVJlYWRlciwgYmFzZUNvbnN0cnVjdG9yLCBjb25zdHJ1Y3Rvck5hbWUpO1xuICAgICAgICB0YXJnZXRzID0gX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCB0YXJnZXRzLCB0cnVlKSwgYmFzZVRhcmdldHMsIHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0cztcbn1cbmZ1bmN0aW9uIGdldEJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudChtZXRhZGF0YVJlYWRlciwgZnVuYykge1xuICAgIHZhciBiYXNlQ29uc3RydWN0b3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZnVuYy5wcm90b3R5cGUpLmNvbnN0cnVjdG9yO1xuICAgIGlmIChiYXNlQ29uc3RydWN0b3IgIT09IE9iamVjdCkge1xuICAgICAgICB2YXIgYmFzZUNvbnN0cnVjdG9yTmFtZSA9IGdldEZ1bmN0aW9uTmFtZShiYXNlQ29uc3RydWN0b3IpO1xuICAgICAgICB2YXIgdGFyZ2V0cyA9IGdldFRhcmdldHMobWV0YWRhdGFSZWFkZXIsIGJhc2VDb25zdHJ1Y3Rvck5hbWUsIGJhc2VDb25zdHJ1Y3RvciwgdHJ1ZSk7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHRhcmdldHMubWFwKGZ1bmN0aW9uICh0KSB7IHJldHVybiB0Lm1ldGFkYXRhLmZpbHRlcihmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5rZXkgPT09IE1FVEFEQVRBX0tFWS5VTk1BTkFHRURfVEFHOyB9KTsgfSk7XG4gICAgICAgIHZhciB1bm1hbmFnZWRDb3VudCA9IFtdLmNvbmNhdC5hcHBseShbXSwgbWV0YWRhdGEpLmxlbmd0aDtcbiAgICAgICAgdmFyIGRlcGVuZGVuY3lDb3VudCA9IHRhcmdldHMubGVuZ3RoIC0gdW5tYW5hZ2VkQ291bnQ7XG4gICAgICAgIGlmIChkZXBlbmRlbmN5Q291bnQgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVwZW5kZW5jeUNvdW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGdldEJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudChtZXRhZGF0YVJlYWRlciwgYmFzZUNvbnN0cnVjdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxufVxuZnVuY3Rpb24gZm9ybWF0VGFyZ2V0TWV0YWRhdGEodGFyZ2V0TWV0YWRhdGEpIHtcbiAgICB2YXIgdGFyZ2V0TWV0YWRhdGFNYXAgPSB7fTtcbiAgICB0YXJnZXRNZXRhZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIHRhcmdldE1ldGFkYXRhTWFwW20ua2V5LnRvU3RyaW5nKCldID0gbS52YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBpbmplY3Q6IHRhcmdldE1ldGFkYXRhTWFwW01FVEFEQVRBX0tFWS5JTkpFQ1RfVEFHXSxcbiAgICAgICAgbXVsdGlJbmplY3Q6IHRhcmdldE1ldGFkYXRhTWFwW01FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHXSxcbiAgICAgICAgdGFyZ2V0TmFtZTogdGFyZ2V0TWV0YWRhdGFNYXBbTUVUQURBVEFfS0VZLk5BTUVfVEFHXSxcbiAgICAgICAgdW5tYW5hZ2VkOiB0YXJnZXRNZXRhZGF0YU1hcFtNRVRBREFUQV9LRVkuVU5NQU5BR0VEX1RBR11cbiAgICB9O1xufVxuZXhwb3J0IHsgZ2V0RGVwZW5kZW5jaWVzLCBnZXRCYXNlQ2xhc3NEZXBlbmRlbmN5Q291bnQsIGdldEZ1bmN0aW9uTmFtZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVmbGVjdGlvbl91dGlscy5qcy5tYXAiLCJpbXBvcnQgeyBpZCB9IGZyb20gXCIuLi91dGlscy9pZFwiO1xudmFyIFJlcXVlc3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlcXVlc3Qoc2VydmljZUlkZW50aWZpZXIsIHBhcmVudENvbnRleHQsIHBhcmVudFJlcXVlc3QsIGJpbmRpbmdzLCB0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkKCk7XG4gICAgICAgIHRoaXMuc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgdGhpcy5wYXJlbnRDb250ZXh0ID0gcGFyZW50Q29udGV4dDtcbiAgICAgICAgdGhpcy5wYXJlbnRSZXF1ZXN0ID0gcGFyZW50UmVxdWVzdDtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHRoaXMuY2hpbGRSZXF1ZXN0cyA9IFtdO1xuICAgICAgICB0aGlzLmJpbmRpbmdzID0gKEFycmF5LmlzQXJyYXkoYmluZGluZ3MpID8gYmluZGluZ3MgOiBbYmluZGluZ3NdKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0U2NvcGUgPSBwYXJlbnRSZXF1ZXN0ID09PSBudWxsXG4gICAgICAgICAgICA/IG5ldyBNYXAoKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5hZGRDaGlsZFJlcXVlc3QgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIGJpbmRpbmdzLCB0YXJnZXQpIHtcbiAgICAgICAgdmFyIGNoaWxkID0gbmV3IFJlcXVlc3Qoc2VydmljZUlkZW50aWZpZXIsIHRoaXMucGFyZW50Q29udGV4dCwgdGhpcywgYmluZGluZ3MsIHRhcmdldCk7XG4gICAgICAgIHRoaXMuY2hpbGRSZXF1ZXN0cy5wdXNoKGNoaWxkKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH07XG4gICAgcmV0dXJuIFJlcXVlc3Q7XG59KCkpO1xuZXhwb3J0IHsgUmVxdWVzdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVxdWVzdC5qcy5tYXAiLCJpbXBvcnQgKiBhcyBNRVRBREFUQV9LRVkgZnJvbSAnLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXMnO1xuaW1wb3J0IHsgaWQgfSBmcm9tICcuLi91dGlscy9pZCc7XG5pbXBvcnQgeyBnZXRTeW1ib2xEZXNjcmlwdGlvbiB9IGZyb20gJy4uL3V0aWxzL3NlcmlhbGl6YXRpb24nO1xuaW1wb3J0IHsgTWV0YWRhdGEgfSBmcm9tICcuL21ldGFkYXRhJztcbmltcG9ydCB7IFF1ZXJ5YWJsZVN0cmluZyB9IGZyb20gJy4vcXVlcnlhYmxlX3N0cmluZyc7XG52YXIgVGFyZ2V0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYXJnZXQodHlwZSwgaWRlbnRpZmllciwgc2VydmljZUlkZW50aWZpZXIsIG5hbWVkT3JUYWdnZWQpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkKCk7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgdmFyIHF1ZXJ5YWJsZU5hbWUgPSB0eXBlb2YgaWRlbnRpZmllciA9PT0gJ3N5bWJvbCcgPyBnZXRTeW1ib2xEZXNjcmlwdGlvbihpZGVudGlmaWVyKSA6IGlkZW50aWZpZXI7XG4gICAgICAgIHRoaXMubmFtZSA9IG5ldyBRdWVyeWFibGVTdHJpbmcocXVlcnlhYmxlTmFtZSB8fCBcIlwiKTtcbiAgICAgICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcbiAgICAgICAgdGhpcy5tZXRhZGF0YSA9IG5ldyBBcnJheSgpO1xuICAgICAgICB2YXIgbWV0YWRhdGFJdGVtID0gbnVsbDtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lZE9yVGFnZ2VkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbWV0YWRhdGFJdGVtID0gbmV3IE1ldGFkYXRhKE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcsIG5hbWVkT3JUYWdnZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWVkT3JUYWdnZWQgaW5zdGFuY2VvZiBNZXRhZGF0YSkge1xuICAgICAgICAgICAgbWV0YWRhdGFJdGVtID0gbmFtZWRPclRhZ2dlZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWV0YWRhdGFJdGVtICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm1ldGFkYXRhLnB1c2gobWV0YWRhdGFJdGVtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBUYXJnZXQucHJvdG90eXBlLmhhc1RhZyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMubWV0YWRhdGE7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgbSA9IF9hW19pXTtcbiAgICAgICAgICAgIGlmIChtLmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5pc0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNUYWcoTUVUQURBVEFfS0VZLk1VTFRJX0lOSkVDVF9UQUcpO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5tYXRjaGVzQXJyYXkgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGVzVGFnKE1FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHKShuYW1lKTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUuaXNOYW1lZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzVGFnKE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcpO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5pc1RhZ2dlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWV0YWRhdGEuc29tZShmdW5jdGlvbiAobWV0YWRhdGEpIHsgcmV0dXJuIE1FVEFEQVRBX0tFWS5OT05fQ1VTVE9NX1RBR19LRVlTLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIG1ldGFkYXRhLmtleSAhPT0ga2V5OyB9KTsgfSk7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmlzT3B0aW9uYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoZXNUYWcoTUVUQURBVEFfS0VZLk9QVElPTkFMX1RBRykodHJ1ZSk7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmdldE5hbWVkVGFnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc05hbWVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1ldGFkYXRhLmZpbHRlcihmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5rZXkgPT09IE1FVEFEQVRBX0tFWS5OQU1FRF9UQUc7IH0pWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5nZXRDdXN0b21UYWdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1RhZ2dlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZXRhZGF0YS5maWx0ZXIoZnVuY3Rpb24gKG1ldGFkYXRhKSB7IHJldHVybiBNRVRBREFUQV9LRVkuTk9OX0NVU1RPTV9UQUdfS0VZUy5ldmVyeShmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBtZXRhZGF0YS5rZXkgIT09IGtleTsgfSk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUubWF0Y2hlc05hbWVkVGFnID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlc1RhZyhNRVRBREFUQV9LRVkuTkFNRURfVEFHKShuYW1lKTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUubWF0Y2hlc1RhZyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IF90aGlzLm1ldGFkYXRhOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBtID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIGlmIChtLmtleSA9PT0ga2V5ICYmIG0udmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBUYXJnZXQ7XG59KCkpO1xuZXhwb3J0IHsgVGFyZ2V0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10YXJnZXQuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG5pbXBvcnQgeyBPTl9ERUFDVElWQVRJT05fRVJST1IsIFBPU1RfQ09OU1RSVUNUX0VSUk9SLCBQUkVfREVTVFJPWV9FUlJPUiB9IGZyb20gXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiO1xuaW1wb3J0IHsgQmluZGluZ1Njb3BlRW51bSwgVGFyZ2V0VHlwZUVudW0gfSBmcm9tIFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIjtcbmltcG9ydCAqIGFzIE1FVEFEQVRBX0tFWSBmcm9tIFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIjtcbmltcG9ydCB7IGlzUHJvbWlzZSwgaXNQcm9taXNlT3JDb250YWluc1Byb21pc2UgfSBmcm9tIFwiLi4vdXRpbHMvYXN5bmNcIjtcbmZ1bmN0aW9uIF9yZXNvbHZlUmVxdWVzdHMoY2hpbGRSZXF1ZXN0cywgcmVzb2x2ZVJlcXVlc3QpIHtcbiAgICByZXR1cm4gY2hpbGRSZXF1ZXN0cy5yZWR1Y2UoZnVuY3Rpb24gKHJlc29sdmVkUmVxdWVzdHMsIGNoaWxkUmVxdWVzdCkge1xuICAgICAgICB2YXIgaW5qZWN0aW9uID0gcmVzb2x2ZVJlcXVlc3QoY2hpbGRSZXF1ZXN0KTtcbiAgICAgICAgdmFyIHRhcmdldFR5cGUgPSBjaGlsZFJlcXVlc3QudGFyZ2V0LnR5cGU7XG4gICAgICAgIGlmICh0YXJnZXRUeXBlID09PSBUYXJnZXRUeXBlRW51bS5Db25zdHJ1Y3RvckFyZ3VtZW50KSB7XG4gICAgICAgICAgICByZXNvbHZlZFJlcXVlc3RzLmNvbnN0cnVjdG9ySW5qZWN0aW9ucy5wdXNoKGluamVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlZFJlcXVlc3RzLnByb3BlcnR5UmVxdWVzdHMucHVzaChjaGlsZFJlcXVlc3QpO1xuICAgICAgICAgICAgcmVzb2x2ZWRSZXF1ZXN0cy5wcm9wZXJ0eUluamVjdGlvbnMucHVzaChpbmplY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzb2x2ZWRSZXF1ZXN0cy5pc0FzeW5jKSB7XG4gICAgICAgICAgICByZXNvbHZlZFJlcXVlc3RzLmlzQXN5bmMgPSBpc1Byb21pc2VPckNvbnRhaW5zUHJvbWlzZShpbmplY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvbHZlZFJlcXVlc3RzO1xuICAgIH0sIHsgY29uc3RydWN0b3JJbmplY3Rpb25zOiBbXSwgcHJvcGVydHlJbmplY3Rpb25zOiBbXSwgcHJvcGVydHlSZXF1ZXN0czogW10sIGlzQXN5bmM6IGZhbHNlIH0pO1xufVxuZnVuY3Rpb24gX2NyZWF0ZUluc3RhbmNlKGNvbnN0ciwgY2hpbGRSZXF1ZXN0cywgcmVzb2x2ZVJlcXVlc3QpIHtcbiAgICB2YXIgcmVzdWx0O1xuICAgIGlmIChjaGlsZFJlcXVlc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHJlc29sdmVkID0gX3Jlc29sdmVSZXF1ZXN0cyhjaGlsZFJlcXVlc3RzLCByZXNvbHZlUmVxdWVzdCk7XG4gICAgICAgIHZhciBjcmVhdGVJbnN0YW5jZVdpdGhJbmplY3Rpb25zQXJnID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc29sdmVkKSwgeyBjb25zdHI6IGNvbnN0ciB9KTtcbiAgICAgICAgaWYgKHJlc29sdmVkLmlzQXN5bmMpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGNyZWF0ZUluc3RhbmNlV2l0aEluamVjdGlvbnNBc3luYyhjcmVhdGVJbnN0YW5jZVdpdGhJbmplY3Rpb25zQXJnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGNyZWF0ZUluc3RhbmNlV2l0aEluamVjdGlvbnMoY3JlYXRlSW5zdGFuY2VXaXRoSW5qZWN0aW9uc0FyZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBjb25zdHIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlV2l0aEluamVjdGlvbnMoYXJncykge1xuICAgIHZhciBfYTtcbiAgICB2YXIgaW5zdGFuY2UgPSBuZXcgKChfYSA9IGFyZ3MuY29uc3RyKS5iaW5kLmFwcGx5KF9hLCBfX3NwcmVhZEFycmF5KFt2b2lkIDBdLCBhcmdzLmNvbnN0cnVjdG9ySW5qZWN0aW9ucywgZmFsc2UpKSkoKTtcbiAgICBhcmdzLnByb3BlcnR5UmVxdWVzdHMuZm9yRWFjaChmdW5jdGlvbiAociwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHByb3BlcnR5ID0gci50YXJnZXQuaWRlbnRpZmllcjtcbiAgICAgICAgdmFyIGluamVjdGlvbiA9IGFyZ3MucHJvcGVydHlJbmplY3Rpb25zW2luZGV4XTtcbiAgICAgICAgaW5zdGFuY2VbcHJvcGVydHldID0gaW5qZWN0aW9uO1xuICAgIH0pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlV2l0aEluamVjdGlvbnNBc3luYyhhcmdzKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29uc3RydWN0b3JJbmplY3Rpb25zLCBwcm9wZXJ0eUluamVjdGlvbnM7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCwgcG9zc2libHlXYWl0SW5qZWN0aW9ucyhhcmdzLmNvbnN0cnVjdG9ySW5qZWN0aW9ucyldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3JJbmplY3Rpb25zID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHBvc3NpYmx5V2FpdEluamVjdGlvbnMoYXJncy5wcm9wZXJ0eUluamVjdGlvbnMpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5SW5qZWN0aW9ucyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBjcmVhdGVJbnN0YW5jZVdpdGhJbmplY3Rpb25zKF9fYXNzaWduKF9fYXNzaWduKHt9LCBhcmdzKSwgeyBjb25zdHJ1Y3RvckluamVjdGlvbnM6IGNvbnN0cnVjdG9ySW5qZWN0aW9ucywgcHJvcGVydHlJbmplY3Rpb25zOiBwcm9wZXJ0eUluamVjdGlvbnMgfSkpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBwb3NzaWJseVdhaXRJbmplY3Rpb25zKHBvc3NpYmxlUHJvbWlzZWluamVjdGlvbnMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbmplY3Rpb25zLCBfaSwgcG9zc2libGVQcm9taXNlaW5qZWN0aW9uc18xLCBpbmplY3Rpb247XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIGluamVjdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoX2kgPSAwLCBwb3NzaWJsZVByb21pc2VpbmplY3Rpb25zXzEgPSBwb3NzaWJsZVByb21pc2VpbmplY3Rpb25zOyBfaSA8IHBvc3NpYmxlUHJvbWlzZWluamVjdGlvbnNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBpbmplY3Rpb24gPSBwb3NzaWJsZVByb21pc2VpbmplY3Rpb25zXzFbX2ldO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGluamVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0aW9ucy5wdXNoKFByb21pc2UuYWxsKGluamVjdGlvbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0aW9ucy5wdXNoKGluamVjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFsyLCBQcm9taXNlLmFsbChpbmplY3Rpb25zKV07XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gX2dldEluc3RhbmNlQWZ0ZXJQb3N0Q29uc3RydWN0KGNvbnN0ciwgcmVzdWx0KSB7XG4gICAgdmFyIHBvc3RDb25zdHJ1Y3RSZXN1bHQgPSBfcG9zdENvbnN0cnVjdChjb25zdHIsIHJlc3VsdCk7XG4gICAgaWYgKGlzUHJvbWlzZShwb3N0Q29uc3RydWN0UmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gcG9zdENvbnN0cnVjdFJlc3VsdC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc3VsdDsgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9wb3N0Q29uc3RydWN0KGNvbnN0ciwgaW5zdGFuY2UpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGlmIChSZWZsZWN0Lmhhc01ldGFkYXRhKE1FVEFEQVRBX0tFWS5QT1NUX0NPTlNUUlVDVCwgY29uc3RyKSkge1xuICAgICAgICB2YXIgZGF0YSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoTUVUQURBVEFfS0VZLlBPU1RfQ09OU1RSVUNULCBjb25zdHIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIChfYiA9IChfYSA9IGluc3RhbmNlKVtkYXRhLnZhbHVlXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoUE9TVF9DT05TVFJVQ1RfRVJST1IoY29uc3RyLm5hbWUsIGUubWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gX3ZhbGlkYXRlSW5zdGFuY2VSZXNvbHV0aW9uKGJpbmRpbmcsIGNvbnN0cikge1xuICAgIGlmIChiaW5kaW5nLnNjb3BlICE9PSBCaW5kaW5nU2NvcGVFbnVtLlNpbmdsZXRvbikge1xuICAgICAgICBfdGhyb3dJZkhhbmRsaW5nRGVhY3RpdmF0aW9uKGJpbmRpbmcsIGNvbnN0cik7XG4gICAgfVxufVxuZnVuY3Rpb24gX3Rocm93SWZIYW5kbGluZ0RlYWN0aXZhdGlvbihiaW5kaW5nLCBjb25zdHIpIHtcbiAgICB2YXIgc2NvcGVFcnJvck1lc3NhZ2UgPSBcIkNsYXNzIGNhbm5vdCBiZSBpbnN0YW50aWF0ZWQgaW4gXCIgKyAoYmluZGluZy5zY29wZSA9PT0gQmluZGluZ1Njb3BlRW51bS5SZXF1ZXN0ID9cbiAgICAgICAgXCJyZXF1ZXN0XCIgOlxuICAgICAgICBcInRyYW5zaWVudFwiKSArIFwiIHNjb3BlLlwiO1xuICAgIGlmICh0eXBlb2YgYmluZGluZy5vbkRlYWN0aXZhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihPTl9ERUFDVElWQVRJT05fRVJST1IoY29uc3RyLm5hbWUsIHNjb3BlRXJyb3JNZXNzYWdlKSk7XG4gICAgfVxuICAgIGlmIChSZWZsZWN0Lmhhc01ldGFkYXRhKE1FVEFEQVRBX0tFWS5QUkVfREVTVFJPWSwgY29uc3RyKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoUFJFX0RFU1RST1lfRVJST1IoY29uc3RyLm5hbWUsIHNjb3BlRXJyb3JNZXNzYWdlKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVzb2x2ZUluc3RhbmNlKGJpbmRpbmcsIGNvbnN0ciwgY2hpbGRSZXF1ZXN0cywgcmVzb2x2ZVJlcXVlc3QpIHtcbiAgICBfdmFsaWRhdGVJbnN0YW5jZVJlc29sdXRpb24oYmluZGluZywgY29uc3RyKTtcbiAgICB2YXIgcmVzdWx0ID0gX2NyZWF0ZUluc3RhbmNlKGNvbnN0ciwgY2hpbGRSZXF1ZXN0cywgcmVzb2x2ZVJlcXVlc3QpO1xuICAgIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnRoZW4oZnVuY3Rpb24gKHJlc29sdmVkUmVzdWx0KSB7IHJldHVybiBfZ2V0SW5zdGFuY2VBZnRlclBvc3RDb25zdHJ1Y3QoY29uc3RyLCByZXNvbHZlZFJlc3VsdCk7IH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIF9nZXRJbnN0YW5jZUFmdGVyUG9zdENvbnN0cnVjdChjb25zdHIsIHJlc3VsdCk7XG4gICAgfVxufVxuZXhwb3J0IHsgcmVzb2x2ZUluc3RhbmNlIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnN0YW50aWF0aW9uLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgKiBhcyBFUlJPUl9NU0dTIGZyb20gXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiO1xuaW1wb3J0IHsgQmluZGluZ1R5cGVFbnVtIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCI7XG5pbXBvcnQgeyBnZXRCaW5kaW5nRGljdGlvbmFyeSB9IGZyb20gXCIuLi9wbGFubmluZy9wbGFubmVyXCI7XG5pbXBvcnQgeyBzYXZlVG9TY29wZSwgdHJ5R2V0RnJvbVNjb3BlIH0gZnJvbSBcIi4uL3Njb3BlL3Njb3BlXCI7XG5pbXBvcnQgeyBpc1Byb21pc2UgfSBmcm9tIFwiLi4vdXRpbHMvYXN5bmNcIjtcbmltcG9ydCB7IGdldEZhY3RvcnlEZXRhaWxzLCBlbnN1cmVGdWxseUJvdW5kIH0gZnJvbSBcIi4uL3V0aWxzL2JpbmRpbmdfdXRpbHNcIjtcbmltcG9ydCB7IHRyeUFuZFRocm93RXJyb3JJZlN0YWNrT3ZlcmZsb3cgfSBmcm9tIFwiLi4vdXRpbHMvZXhjZXB0aW9uc1wiO1xuaW1wb3J0IHsgcmVzb2x2ZUluc3RhbmNlIH0gZnJvbSBcIi4vaW5zdGFudGlhdGlvblwiO1xudmFyIF9yZXNvbHZlUmVxdWVzdCA9IGZ1bmN0aW9uIChyZXF1ZXN0U2NvcGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgcmVxdWVzdC5wYXJlbnRDb250ZXh0LnNldEN1cnJlbnRSZXF1ZXN0KHJlcXVlc3QpO1xuICAgICAgICB2YXIgYmluZGluZ3MgPSByZXF1ZXN0LmJpbmRpbmdzO1xuICAgICAgICB2YXIgY2hpbGRSZXF1ZXN0cyA9IHJlcXVlc3QuY2hpbGRSZXF1ZXN0cztcbiAgICAgICAgdmFyIHRhcmdldElzQW5BcnJheSA9IHJlcXVlc3QudGFyZ2V0ICYmIHJlcXVlc3QudGFyZ2V0LmlzQXJyYXkoKTtcbiAgICAgICAgdmFyIHRhcmdldFBhcmVudElzTm90QW5BcnJheSA9ICFyZXF1ZXN0LnBhcmVudFJlcXVlc3QgfHxcbiAgICAgICAgICAgICFyZXF1ZXN0LnBhcmVudFJlcXVlc3QudGFyZ2V0IHx8XG4gICAgICAgICAgICAhcmVxdWVzdC50YXJnZXQgfHxcbiAgICAgICAgICAgICFyZXF1ZXN0LnBhcmVudFJlcXVlc3QudGFyZ2V0Lm1hdGNoZXNBcnJheShyZXF1ZXN0LnRhcmdldC5zZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIGlmICh0YXJnZXRJc0FuQXJyYXkgJiYgdGFyZ2V0UGFyZW50SXNOb3RBbkFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2hpbGRSZXF1ZXN0cy5tYXAoZnVuY3Rpb24gKGNoaWxkUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIHZhciBfZiA9IF9yZXNvbHZlUmVxdWVzdChyZXF1ZXN0U2NvcGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfZihjaGlsZFJlcXVlc3QpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC50YXJnZXQuaXNPcHRpb25hbCgpICYmIGJpbmRpbmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYmluZGluZyA9IGJpbmRpbmdzWzBdO1xuICAgICAgICAgICAgcmV0dXJuIF9yZXNvbHZlQmluZGluZyhyZXF1ZXN0U2NvcGUsIHJlcXVlc3QsIGJpbmRpbmcpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG52YXIgX3Jlc29sdmVGYWN0b3J5RnJvbUJpbmRpbmcgPSBmdW5jdGlvbiAoYmluZGluZywgY29udGV4dCkge1xuICAgIHZhciBmYWN0b3J5RGV0YWlscyA9IGdldEZhY3RvcnlEZXRhaWxzKGJpbmRpbmcpO1xuICAgIHJldHVybiB0cnlBbmRUaHJvd0Vycm9ySWZTdGFja092ZXJmbG93KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhY3RvcnlEZXRhaWxzLmZhY3RvcnkuYmluZChiaW5kaW5nKShjb250ZXh0KTsgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEVycm9yKEVSUk9SX01TR1MuQ0lSQ1VMQVJfREVQRU5ERU5DWV9JTl9GQUNUT1JZKGZhY3RvcnlEZXRhaWxzLmZhY3RvcnlUeXBlLCBjb250ZXh0LmN1cnJlbnRSZXF1ZXN0LnNlcnZpY2VJZGVudGlmaWVyLnRvU3RyaW5nKCkpKTsgfSk7XG59O1xudmFyIF9nZXRSZXNvbHZlZEZyb21CaW5kaW5nID0gZnVuY3Rpb24gKHJlcXVlc3RTY29wZSwgcmVxdWVzdCwgYmluZGluZykge1xuICAgIHZhciByZXN1bHQ7XG4gICAgdmFyIGNoaWxkUmVxdWVzdHMgPSByZXF1ZXN0LmNoaWxkUmVxdWVzdHM7XG4gICAgZW5zdXJlRnVsbHlCb3VuZChiaW5kaW5nKTtcbiAgICBzd2l0Y2ggKGJpbmRpbmcudHlwZSkge1xuICAgICAgICBjYXNlIEJpbmRpbmdUeXBlRW51bS5Db25zdGFudFZhbHVlOlxuICAgICAgICBjYXNlIEJpbmRpbmdUeXBlRW51bS5GdW5jdGlvbjpcbiAgICAgICAgICAgIHJlc3VsdCA9IGJpbmRpbmcuY2FjaGU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBCaW5kaW5nVHlwZUVudW0uQ29uc3RydWN0b3I6XG4gICAgICAgICAgICByZXN1bHQgPSBiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEJpbmRpbmdUeXBlRW51bS5JbnN0YW5jZTpcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc29sdmVJbnN0YW5jZShiaW5kaW5nLCBiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSwgY2hpbGRSZXF1ZXN0cywgX3Jlc29sdmVSZXF1ZXN0KHJlcXVlc3RTY29wZSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXN1bHQgPSBfcmVzb2x2ZUZhY3RvcnlGcm9tQmluZGluZyhiaW5kaW5nLCByZXF1ZXN0LnBhcmVudENvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfcmVzb2x2ZUluU2NvcGUgPSBmdW5jdGlvbiAocmVxdWVzdFNjb3BlLCBiaW5kaW5nLCByZXNvbHZlRnJvbUJpbmRpbmcpIHtcbiAgICB2YXIgcmVzdWx0ID0gdHJ5R2V0RnJvbVNjb3BlKHJlcXVlc3RTY29wZSwgYmluZGluZyk7XG4gICAgaWYgKHJlc3VsdCAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXN1bHQgPSByZXNvbHZlRnJvbUJpbmRpbmcoKTtcbiAgICBzYXZlVG9TY29wZShyZXF1ZXN0U2NvcGUsIGJpbmRpbmcsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX3Jlc29sdmVCaW5kaW5nID0gZnVuY3Rpb24gKHJlcXVlc3RTY29wZSwgcmVxdWVzdCwgYmluZGluZykge1xuICAgIHJldHVybiBfcmVzb2x2ZUluU2NvcGUocmVxdWVzdFNjb3BlLCBiaW5kaW5nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBfZ2V0UmVzb2x2ZWRGcm9tQmluZGluZyhyZXF1ZXN0U2NvcGUsIHJlcXVlc3QsIGJpbmRpbmcpO1xuICAgICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC50aGVuKGZ1bmN0aW9uIChyZXNvbHZlZCkgeyByZXR1cm4gX29uQWN0aXZhdGlvbihyZXF1ZXN0LCBiaW5kaW5nLCByZXNvbHZlZCk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gX29uQWN0aXZhdGlvbihyZXF1ZXN0LCBiaW5kaW5nLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG59O1xuZnVuY3Rpb24gX29uQWN0aXZhdGlvbihyZXF1ZXN0LCBiaW5kaW5nLCByZXNvbHZlZCkge1xuICAgIHZhciByZXN1bHQgPSBfYmluZGluZ0FjdGl2YXRpb24ocmVxdWVzdC5wYXJlbnRDb250ZXh0LCBiaW5kaW5nLCByZXNvbHZlZCk7XG4gICAgdmFyIGNvbnRhaW5lcnNJdGVyYXRvciA9IF9nZXRDb250YWluZXJzSXRlcmF0b3IocmVxdWVzdC5wYXJlbnRDb250ZXh0LmNvbnRhaW5lcik7XG4gICAgdmFyIGNvbnRhaW5lcjtcbiAgICB2YXIgY29udGFpbmVyc0l0ZXJhdG9yUmVzdWx0ID0gY29udGFpbmVyc0l0ZXJhdG9yLm5leHQoKTtcbiAgICBkbyB7XG4gICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lcnNJdGVyYXRvclJlc3VsdC52YWx1ZTtcbiAgICAgICAgdmFyIGNvbnRleHRfMSA9IHJlcXVlc3QucGFyZW50Q29udGV4dDtcbiAgICAgICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyID0gcmVxdWVzdC5zZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgdmFyIGFjdGl2YXRpb25zSXRlcmF0b3IgPSBfZ2V0Q29udGFpbmVyQWN0aXZhdGlvbnNGb3JTZXJ2aWNlKGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IF9hY3RpdmF0ZUNvbnRhaW5lckFzeW5jKGFjdGl2YXRpb25zSXRlcmF0b3IsIGNvbnRleHRfMSwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IF9hY3RpdmF0ZUNvbnRhaW5lcihhY3RpdmF0aW9uc0l0ZXJhdG9yLCBjb250ZXh0XzEsIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyc0l0ZXJhdG9yUmVzdWx0ID0gY29udGFpbmVyc0l0ZXJhdG9yLm5leHQoKTtcbiAgICB9IHdoaWxlIChjb250YWluZXJzSXRlcmF0b3JSZXN1bHQuZG9uZSAhPT0gdHJ1ZSAmJiAhZ2V0QmluZGluZ0RpY3Rpb25hcnkoY29udGFpbmVyKS5oYXNLZXkocmVxdWVzdC5zZXJ2aWNlSWRlbnRpZmllcikpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG52YXIgX2JpbmRpbmdBY3RpdmF0aW9uID0gZnVuY3Rpb24gKGNvbnRleHQsIGJpbmRpbmcsIHByZXZpb3VzUmVzdWx0KSB7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZiAodHlwZW9mIGJpbmRpbmcub25BY3RpdmF0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmVzdWx0ID0gYmluZGluZy5vbkFjdGl2YXRpb24oY29udGV4dCwgcHJldmlvdXNSZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gcHJldmlvdXNSZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9hY3RpdmF0ZUNvbnRhaW5lciA9IGZ1bmN0aW9uIChhY3RpdmF0aW9uc0l0ZXJhdG9yLCBjb250ZXh0LCByZXN1bHQpIHtcbiAgICB2YXIgYWN0aXZhdGlvbiA9IGFjdGl2YXRpb25zSXRlcmF0b3IubmV4dCgpO1xuICAgIHdoaWxlICghYWN0aXZhdGlvbi5kb25lKSB7XG4gICAgICAgIHJlc3VsdCA9IGFjdGl2YXRpb24udmFsdWUoY29udGV4dCwgcmVzdWx0KTtcbiAgICAgICAgaWYgKGlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gX2FjdGl2YXRlQ29udGFpbmVyQXN5bmMoYWN0aXZhdGlvbnNJdGVyYXRvciwgY29udGV4dCwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBhY3RpdmF0aW9uID0gYWN0aXZhdGlvbnNJdGVyYXRvci5uZXh0KCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9hY3RpdmF0ZUNvbnRhaW5lckFzeW5jID0gZnVuY3Rpb24gKGFjdGl2YXRpb25zSXRlcmF0b3IsIGNvbnRleHQsIHJlc3VsdFByb21pc2UpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdCwgYWN0aXZhdGlvbjtcbiAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCByZXN1bHRQcm9taXNlXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgYWN0aXZhdGlvbiA9IGFjdGl2YXRpb25zSXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBpZiAoISFhY3RpdmF0aW9uLmRvbmUpIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBhY3RpdmF0aW9uLnZhbHVlKGNvbnRleHQsIHJlc3VsdCldO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICBhY3RpdmF0aW9uID0gYWN0aXZhdGlvbnNJdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFszLCAyXTtcbiAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyLCByZXN1bHRdO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsgfTtcbnZhciBfZ2V0Q29udGFpbmVyQWN0aXZhdGlvbnNGb3JTZXJ2aWNlID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICB2YXIgYWN0aXZhdGlvbnMgPSBjb250YWluZXIuX2FjdGl2YXRpb25zO1xuICAgIHJldHVybiBhY3RpdmF0aW9ucy5oYXNLZXkoc2VydmljZUlkZW50aWZpZXIpID8gYWN0aXZhdGlvbnMuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKS52YWx1ZXMoKSA6IFtdLnZhbHVlcygpO1xufTtcbnZhciBfZ2V0Q29udGFpbmVyc0l0ZXJhdG9yID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgIHZhciBjb250YWluZXJzU3RhY2sgPSBbY29udGFpbmVyXTtcbiAgICB2YXIgcGFyZW50ID0gY29udGFpbmVyLnBhcmVudDtcbiAgICB3aGlsZSAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnRhaW5lcnNTdGFjay5wdXNoKHBhcmVudCk7XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgfVxuICAgIHZhciBnZXROZXh0Q29udGFpbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmV4dENvbnRhaW5lciA9IGNvbnRhaW5lcnNTdGFjay5wb3AoKTtcbiAgICAgICAgaWYgKG5leHRDb250YWluZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBuZXh0Q29udGFpbmVyIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogdW5kZWZpbmVkIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBjb250YWluZXJzSXRlcmF0b3IgPSB7XG4gICAgICAgIG5leHQ6IGdldE5leHRDb250YWluZXIsXG4gICAgfTtcbiAgICByZXR1cm4gY29udGFpbmVyc0l0ZXJhdG9yO1xufTtcbmZ1bmN0aW9uIHJlc29sdmUoY29udGV4dCkge1xuICAgIHZhciBfZiA9IF9yZXNvbHZlUmVxdWVzdChjb250ZXh0LnBsYW4ucm9vdFJlcXVlc3QucmVxdWVzdFNjb3BlKTtcbiAgICByZXR1cm4gX2YoY29udGV4dC5wbGFuLnJvb3RSZXF1ZXN0KTtcbn1cbmV4cG9ydCB7IHJlc29sdmUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlc29sdmVyLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgeyBCaW5kaW5nU2NvcGVFbnVtIH0gZnJvbSBcIi4uL2ludmVyc2lmeVwiO1xuaW1wb3J0IHsgaXNQcm9taXNlIH0gZnJvbSBcIi4uL3V0aWxzL2FzeW5jXCI7XG5leHBvcnQgdmFyIHRyeUdldEZyb21TY29wZSA9IGZ1bmN0aW9uIChyZXF1ZXN0U2NvcGUsIGJpbmRpbmcpIHtcbiAgICBpZiAoKGJpbmRpbmcuc2NvcGUgPT09IEJpbmRpbmdTY29wZUVudW0uU2luZ2xldG9uKSAmJiBiaW5kaW5nLmFjdGl2YXRlZCkge1xuICAgICAgICByZXR1cm4gYmluZGluZy5jYWNoZTtcbiAgICB9XG4gICAgaWYgKGJpbmRpbmcuc2NvcGUgPT09IEJpbmRpbmdTY29wZUVudW0uUmVxdWVzdCAmJlxuICAgICAgICByZXF1ZXN0U2NvcGUuaGFzKGJpbmRpbmcuaWQpKSB7XG4gICAgICAgIHJldHVybiByZXF1ZXN0U2NvcGUuZ2V0KGJpbmRpbmcuaWQpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5leHBvcnQgdmFyIHNhdmVUb1Njb3BlID0gZnVuY3Rpb24gKHJlcXVlc3RTY29wZSwgYmluZGluZywgcmVzdWx0KSB7XG4gICAgaWYgKGJpbmRpbmcuc2NvcGUgPT09IEJpbmRpbmdTY29wZUVudW0uU2luZ2xldG9uKSB7XG4gICAgICAgIF9zYXZlVG9TaW5nbGV0b25TY29wZShiaW5kaW5nLCByZXN1bHQpO1xuICAgIH1cbiAgICBpZiAoYmluZGluZy5zY29wZSA9PT0gQmluZGluZ1Njb3BlRW51bS5SZXF1ZXN0KSB7XG4gICAgICAgIF9zYXZlVG9SZXF1ZXN0U2NvcGUocmVxdWVzdFNjb3BlLCBiaW5kaW5nLCByZXN1bHQpO1xuICAgIH1cbn07XG52YXIgX3NhdmVUb1JlcXVlc3RTY29wZSA9IGZ1bmN0aW9uIChyZXF1ZXN0U2NvcGUsIGJpbmRpbmcsIHJlc3VsdCkge1xuICAgIGlmICghcmVxdWVzdFNjb3BlLmhhcyhiaW5kaW5nLmlkKSkge1xuICAgICAgICByZXF1ZXN0U2NvcGUuc2V0KGJpbmRpbmcuaWQsIHJlc3VsdCk7XG4gICAgfVxufTtcbnZhciBfc2F2ZVRvU2luZ2xldG9uU2NvcGUgPSBmdW5jdGlvbiAoYmluZGluZywgcmVzdWx0KSB7XG4gICAgYmluZGluZy5jYWNoZSA9IHJlc3VsdDtcbiAgICBiaW5kaW5nLmFjdGl2YXRlZCA9IHRydWU7XG4gICAgaWYgKGlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgICAgIHZvaWQgX3NhdmVBc3luY1Jlc3VsdFRvU2luZ2xldG9uU2NvcGUoYmluZGluZywgcmVzdWx0KTtcbiAgICB9XG59O1xudmFyIF9zYXZlQXN5bmNSZXN1bHRUb1NpbmdsZXRvblNjb3BlID0gZnVuY3Rpb24gKGJpbmRpbmcsIGFzeW5jUmVzdWx0KSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQsIGV4XzE7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCAyLCAsIDNdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQsIGFzeW5jUmVzdWx0XTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgYmluZGluZy5jYWNoZSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDNdO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGV4XzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgYmluZGluZy5jYWNoZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgYmluZGluZy5hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aHJvdyBleF8xO1xuICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzJdO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjb3BlLmpzLm1hcCIsImltcG9ydCB7IEJpbmRpbmdTY29wZUVudW0gfSBmcm9tIFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIjtcbmltcG9ydCB7IEJpbmRpbmdXaGVuT25TeW50YXggfSBmcm9tIFwiLi9iaW5kaW5nX3doZW5fb25fc3ludGF4XCI7XG52YXIgQmluZGluZ0luU3ludGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaW5kaW5nSW5TeW50YXgoYmluZGluZykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nID0gYmluZGluZztcbiAgICB9XG4gICAgQmluZGluZ0luU3ludGF4LnByb3RvdHlwZS5pblJlcXVlc3RTY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5zY29wZSA9IEJpbmRpbmdTY29wZUVudW0uUmVxdWVzdDtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ0luU3ludGF4LnByb3RvdHlwZS5pblNpbmdsZXRvblNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnNjb3BlID0gQmluZGluZ1Njb3BlRW51bS5TaW5nbGV0b247XG4gICAgICAgIHJldHVybiBuZXcgQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJblN5bnRheC5wcm90b3R5cGUuaW5UcmFuc2llbnRTY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5zY29wZSA9IEJpbmRpbmdTY29wZUVudW0uVHJhbnNpZW50O1xuICAgICAgICByZXR1cm4gbmV3IEJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICByZXR1cm4gQmluZGluZ0luU3ludGF4O1xufSgpKTtcbmV4cG9ydCB7IEJpbmRpbmdJblN5bnRheCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZGluZ19pbl9zeW50YXguanMubWFwIiwiaW1wb3J0IHsgQmluZGluZ0luU3ludGF4IH0gZnJvbSBcIi4vYmluZGluZ19pbl9zeW50YXhcIjtcbmltcG9ydCB7IEJpbmRpbmdPblN5bnRheCB9IGZyb20gXCIuL2JpbmRpbmdfb25fc3ludGF4XCI7XG5pbXBvcnQgeyBCaW5kaW5nV2hlblN5bnRheCB9IGZyb20gXCIuL2JpbmRpbmdfd2hlbl9zeW50YXhcIjtcbnZhciBCaW5kaW5nSW5XaGVuT25TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdJbldoZW5PblN5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgICAgICB0aGlzLl9iaW5kaW5nV2hlblN5bnRheCA9IG5ldyBCaW5kaW5nV2hlblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICAgICAgdGhpcy5fYmluZGluZ09uU3ludGF4ID0gbmV3IEJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICAgICAgdGhpcy5fYmluZGluZ0luU3ludGF4ID0gbmV3IEJpbmRpbmdJblN5bnRheChiaW5kaW5nKTtcbiAgICB9XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS5pblJlcXVlc3RTY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdJblN5bnRheC5pblJlcXVlc3RTY29wZSgpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS5pblNpbmdsZXRvblNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ0luU3ludGF4LmluU2luZ2xldG9uU2NvcGUoKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUuaW5UcmFuc2llbnRTY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdJblN5bnRheC5pblRyYW5zaWVudFNjb3BlKCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW4gPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbihjb25zdHJhaW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXROYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldElzRGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXRJc0RlZmF1bHQoKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldFRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuVGFyZ2V0VGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuSW5qZWN0ZWRJbnRvID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkluamVjdGVkSW50byhwYXJlbnQpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuUGFyZW50TmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblBhcmVudE5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuUGFyZW50VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5QYXJlbnRUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3RvcklzID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JJcyhhbmNlc3Rvcik7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9ySXMgPSBmdW5jdGlvbiAoYW5jZXN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9ySXMoYW5jZXN0b3IpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JOYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JOYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3RvclRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JOYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3Rvck5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3RvclRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3RvclRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JNYXRjaGVzKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3Rvck1hdGNoZXMgPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JNYXRjaGVzKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS5vbkFjdGl2YXRpb24gPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ09uU3ludGF4Lm9uQWN0aXZhdGlvbihoYW5kbGVyKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUub25EZWFjdGl2YXRpb24gPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ09uU3ludGF4Lm9uRGVhY3RpdmF0aW9uKGhhbmRsZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdJbldoZW5PblN5bnRheDtcbn0oKSk7XG5leHBvcnQgeyBCaW5kaW5nSW5XaGVuT25TeW50YXggfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJpbmRpbmdfaW5fd2hlbl9vbl9zeW50YXguanMubWFwIiwiaW1wb3J0IHsgQmluZGluZ1doZW5TeW50YXggfSBmcm9tIFwiLi9iaW5kaW5nX3doZW5fc3ludGF4XCI7XG52YXIgQmluZGluZ09uU3ludGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaW5kaW5nT25TeW50YXgoYmluZGluZykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nID0gYmluZGluZztcbiAgICB9XG4gICAgQmluZGluZ09uU3ludGF4LnByb3RvdHlwZS5vbkFjdGl2YXRpb24gPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLm9uQWN0aXZhdGlvbiA9IGhhbmRsZXI7XG4gICAgICAgIHJldHVybiBuZXcgQmluZGluZ1doZW5TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nT25TeW50YXgucHJvdG90eXBlLm9uRGVhY3RpdmF0aW9uID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5vbkRlYWN0aXZhdGlvbiA9IGhhbmRsZXI7XG4gICAgICAgIHJldHVybiBuZXcgQmluZGluZ1doZW5TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICByZXR1cm4gQmluZGluZ09uU3ludGF4O1xufSgpKTtcbmV4cG9ydCB7IEJpbmRpbmdPblN5bnRheCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZGluZ19vbl9zeW50YXguanMubWFwIiwiaW1wb3J0ICogYXMgRVJST1JfTVNHUyBmcm9tIFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIjtcbmltcG9ydCB7IEJpbmRpbmdTY29wZUVudW0sIEJpbmRpbmdUeXBlRW51bSB9IGZyb20gXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiO1xuaW1wb3J0IHsgQmluZGluZ0luV2hlbk9uU3ludGF4IH0gZnJvbSBcIi4vYmluZGluZ19pbl93aGVuX29uX3N5bnRheFwiO1xuaW1wb3J0IHsgQmluZGluZ1doZW5PblN5bnRheCB9IGZyb20gXCIuL2JpbmRpbmdfd2hlbl9vbl9zeW50YXhcIjtcbnZhciBCaW5kaW5nVG9TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdUb1N5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgIH1cbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IEJpbmRpbmdUeXBlRW51bS5JbnN0YW5jZTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUgPSBjb25zdHJ1Y3RvcjtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nSW5XaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvU2VsZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9iaW5kaW5nLnNlcnZpY2VJZGVudGlmaWVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiICsgRVJST1JfTVNHUy5JTlZBTElEX1RPX1NFTEZfVkFMVUUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWxmID0gdGhpcy5fYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgcmV0dXJuIHRoaXMudG8oc2VsZik7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvQ29uc3RhbnRWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBCaW5kaW5nVHlwZUVudW0uQ29uc3RhbnRWYWx1ZTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jYWNoZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmR5bmFtaWNWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYmluZGluZy5zY29wZSA9IEJpbmRpbmdTY29wZUVudW0uU2luZ2xldG9uO1xuICAgICAgICByZXR1cm4gbmV3IEJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvRHluYW1pY1ZhbHVlID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gQmluZGluZ1R5cGVFbnVtLkR5bmFtaWNWYWx1ZTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jYWNoZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuZHluYW1pY1ZhbHVlID0gZnVuYztcbiAgICAgICAgdGhpcy5fYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUgPSBudWxsO1xuICAgICAgICByZXR1cm4gbmV3IEJpbmRpbmdJbldoZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9Db25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChjb25zdHJ1Y3Rvcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBCaW5kaW5nVHlwZUVudW0uQ29uc3RydWN0b3I7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlID0gY29uc3RydWN0b3I7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuc2NvcGUgPSBCaW5kaW5nU2NvcGVFbnVtLlNpbmdsZXRvbjtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b0ZhY3RvcnkgPSBmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBCaW5kaW5nVHlwZUVudW0uRmFjdG9yeTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5mYWN0b3J5ID0gZmFjdG9yeTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5zY29wZSA9IEJpbmRpbmdTY29wZUVudW0uU2luZ2xldG9uO1xuICAgICAgICByZXR1cm4gbmV3IEJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvRnVuY3Rpb24gPSBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICBpZiAodHlwZW9mIGZ1bmMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuSU5WQUxJRF9GVU5DVElPTl9CSU5ESU5HKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYmluZGluZ1doZW5PblN5bnRheCA9IHRoaXMudG9Db25zdGFudFZhbHVlKGZ1bmMpO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBCaW5kaW5nVHlwZUVudW0uRnVuY3Rpb247XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuc2NvcGUgPSBCaW5kaW5nU2NvcGVFbnVtLlNpbmdsZXRvbjtcbiAgICAgICAgcmV0dXJuIGJpbmRpbmdXaGVuT25TeW50YXg7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvQXV0b0ZhY3RvcnkgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gQmluZGluZ1R5cGVFbnVtLkZhY3Rvcnk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuZmFjdG9yeSA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgYXV0b2ZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjb250ZXh0LmNvbnRhaW5lci5nZXQoc2VydmljZUlkZW50aWZpZXIpOyB9O1xuICAgICAgICAgICAgcmV0dXJuIGF1dG9mYWN0b3J5O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnNjb3BlID0gQmluZGluZ1Njb3BlRW51bS5TaW5nbGV0b247XG4gICAgICAgIHJldHVybiBuZXcgQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9BdXRvTmFtZWRGYWN0b3J5ID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IEJpbmRpbmdUeXBlRW51bS5GYWN0b3J5O1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmZhY3RvcnkgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lZCkgeyByZXR1cm4gY29udGV4dC5jb250YWluZXIuZ2V0TmFtZWQoc2VydmljZUlkZW50aWZpZXIsIG5hbWVkKTsgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b1Byb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IEJpbmRpbmdUeXBlRW51bS5Qcm92aWRlcjtcbiAgICAgICAgdGhpcy5fYmluZGluZy5wcm92aWRlciA9IHByb3ZpZGVyO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnNjb3BlID0gQmluZGluZ1Njb3BlRW51bS5TaW5nbGV0b247XG4gICAgICAgIHJldHVybiBuZXcgQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9TZXJ2aWNlID0gZnVuY3Rpb24gKHNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50b0R5bmFtaWNWYWx1ZShmdW5jdGlvbiAoY29udGV4dCkgeyByZXR1cm4gY29udGV4dC5jb250YWluZXIuZ2V0KHNlcnZpY2UpOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBCaW5kaW5nVG9TeW50YXg7XG59KCkpO1xuZXhwb3J0IHsgQmluZGluZ1RvU3ludGF4IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iaW5kaW5nX3RvX3N5bnRheC5qcy5tYXAiLCJpbXBvcnQgeyBCaW5kaW5nT25TeW50YXggfSBmcm9tIFwiLi9iaW5kaW5nX29uX3N5bnRheFwiO1xuaW1wb3J0IHsgQmluZGluZ1doZW5TeW50YXggfSBmcm9tIFwiLi9iaW5kaW5nX3doZW5fc3ludGF4XCI7XG52YXIgQmluZGluZ1doZW5PblN5bnRheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmluZGluZ1doZW5PblN5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgICAgICB0aGlzLl9iaW5kaW5nV2hlblN5bnRheCA9IG5ldyBCaW5kaW5nV2hlblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICAgICAgdGhpcy5fYmluZGluZ09uU3ludGF4ID0gbmV3IEJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbiA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXROYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXRJc0RlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuVGFyZ2V0SXNEZWZhdWx0KCk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXRUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuSW5qZWN0ZWRJbnRvID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkluamVjdGVkSW50byhwYXJlbnQpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlblBhcmVudE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5QYXJlbnROYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnRUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblBhcmVudFRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3RvcklzID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JJcyhhbmNlc3Rvcik7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3RvcklzID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3RvcklzKGFuY2VzdG9yKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3Rvck5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3RvclRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yTmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JOYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yVGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JNYXRjaGVzKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JNYXRjaGVzID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yTWF0Y2hlcyhjb25zdHJhaW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLm9uQWN0aXZhdGlvbiA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nT25TeW50YXgub25BY3RpdmF0aW9uKGhhbmRsZXIpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUub25EZWFjdGl2YXRpb24gPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ09uU3ludGF4Lm9uRGVhY3RpdmF0aW9uKGhhbmRsZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdXaGVuT25TeW50YXg7XG59KCkpO1xuZXhwb3J0IHsgQmluZGluZ1doZW5PblN5bnRheCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZGluZ193aGVuX29uX3N5bnRheC5qcy5tYXAiLCJpbXBvcnQgeyBCaW5kaW5nT25TeW50YXggfSBmcm9tIFwiLi9iaW5kaW5nX29uX3N5bnRheFwiO1xuaW1wb3J0IHsgbmFtZWRDb25zdHJhaW50LCB0YWdnZWRDb25zdHJhaW50LCB0cmF2ZXJzZUFuY2Vyc3RvcnMsIHR5cGVDb25zdHJhaW50IH0gZnJvbSBcIi4vY29uc3RyYWludF9oZWxwZXJzXCI7XG52YXIgQmluZGluZ1doZW5TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdXaGVuU3ludGF4KGJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZyA9IGJpbmRpbmc7XG4gICAgfVxuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gY29uc3RyYWludDtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gbmFtZWRDb25zdHJhaW50KG5hbWUpO1xuICAgICAgICByZXR1cm4gbmV3IEJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0SXNEZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3QgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdGFyZ2V0SXNEZWZhdWx0ID0gKHJlcXVlc3QudGFyZ2V0ICE9PSBudWxsKSAmJlxuICAgICAgICAgICAgICAgICghcmVxdWVzdC50YXJnZXQuaXNOYW1lZCgpKSAmJlxuICAgICAgICAgICAgICAgICghcmVxdWVzdC50YXJnZXQuaXNUYWdnZWQoKSk7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0SXNEZWZhdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IEJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gdGFnZ2VkQ29uc3RyYWludCh0YWcpKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbkluamVjdGVkSW50byA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0ICE9PSBudWxsICYmIHR5cGVDb25zdHJhaW50KHBhcmVudCkocmVxdWVzdC5wYXJlbnRSZXF1ZXN0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlblBhcmVudE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0ICE9PSBudWxsICYmIG5hbWVkQ29uc3RyYWludChuYW1lKShyZXF1ZXN0LnBhcmVudFJlcXVlc3QpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IEJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuUGFyZW50VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0ICE9PSBudWxsICYmIHRhZ2dlZENvbnN0cmFpbnQodGFnKSh2YWx1ZSkocmVxdWVzdC5wYXJlbnRSZXF1ZXN0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9ySXMgPSBmdW5jdGlvbiAoYW5jZXN0b3IpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0ICE9PSBudWxsICYmIHRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCB0eXBlQ29uc3RyYWludChhbmNlc3RvcikpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IEJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3RvcklzID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdCAhPT0gbnVsbCAmJiAhdHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIHR5cGVDb25zdHJhaW50KGFuY2VzdG9yKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0ICE9PSBudWxsICYmIHRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBuYW1lZENvbnN0cmFpbnQobmFtZSkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IEJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0ICE9PSBudWxsICYmICF0cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgbmFtZWRDb25zdHJhaW50KG5hbWUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0ICE9PSBudWxsICYmIHRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCB0YWdnZWRDb25zdHJhaW50KHRhZykodmFsdWUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QgIT09IG51bGwgJiYgIXRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCB0YWdnZWRDb25zdHJhaW50KHRhZykodmFsdWUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdCAhPT0gbnVsbCAmJiB0cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgY29uc3RyYWludCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdCAhPT0gbnVsbCAmJiAhdHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnQpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IEJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIHJldHVybiBCaW5kaW5nV2hlblN5bnRheDtcbn0oKSk7XG5leHBvcnQgeyBCaW5kaW5nV2hlblN5bnRheCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZGluZ193aGVuX3N5bnRheC5qcy5tYXAiLCJpbXBvcnQgKiBhcyBNRVRBREFUQV9LRVkgZnJvbSBcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCI7XG5pbXBvcnQgeyBNZXRhZGF0YSB9IGZyb20gXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiO1xudmFyIHRyYXZlcnNlQW5jZXJzdG9ycyA9IGZ1bmN0aW9uIChyZXF1ZXN0LCBjb25zdHJhaW50KSB7XG4gICAgdmFyIHBhcmVudCA9IHJlcXVlc3QucGFyZW50UmVxdWVzdDtcbiAgICBpZiAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBjb25zdHJhaW50KHBhcmVudCkgPyB0cnVlIDogdHJhdmVyc2VBbmNlcnN0b3JzKHBhcmVudCwgY29uc3RyYWludCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbnZhciB0YWdnZWRDb25zdHJhaW50ID0gZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFyIGNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gcmVxdWVzdCAhPT0gbnVsbCAmJiByZXF1ZXN0LnRhcmdldCAhPT0gbnVsbCAmJiByZXF1ZXN0LnRhcmdldC5tYXRjaGVzVGFnKGtleSkodmFsdWUpO1xuICAgIH07XG4gICAgY29uc3RyYWludC5tZXRhRGF0YSA9IG5ldyBNZXRhZGF0YShrZXksIHZhbHVlKTtcbiAgICByZXR1cm4gY29uc3RyYWludDtcbn07IH07XG52YXIgbmFtZWRDb25zdHJhaW50ID0gdGFnZ2VkQ29uc3RyYWludChNRVRBREFUQV9LRVkuTkFNRURfVEFHKTtcbnZhciB0eXBlQ29uc3RyYWludCA9IGZ1bmN0aW9uICh0eXBlKSB7IHJldHVybiBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgIHZhciBiaW5kaW5nID0gbnVsbDtcbiAgICBpZiAocmVxdWVzdCAhPT0gbnVsbCkge1xuICAgICAgICBiaW5kaW5nID0gcmVxdWVzdC5iaW5kaW5nc1swXTtcbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXIgPSBiaW5kaW5nLnNlcnZpY2VJZGVudGlmaWVyO1xuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VJZGVudGlmaWVyID09PSB0eXBlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNvbnN0cnVjdG9yID0gcmVxdWVzdC5iaW5kaW5nc1swXS5pbXBsZW1lbnRhdGlvblR5cGU7XG4gICAgICAgICAgICByZXR1cm4gdHlwZSA9PT0gY29uc3RydWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTsgfTtcbmV4cG9ydCB7IHRyYXZlcnNlQW5jZXJzdG9ycywgdGFnZ2VkQ29uc3RyYWludCwgbmFtZWRDb25zdHJhaW50LCB0eXBlQ29uc3RyYWludCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RyYWludF9oZWxwZXJzLmpzLm1hcCIsImZ1bmN0aW9uIGlzUHJvbWlzZShvYmplY3QpIHtcbiAgICB2YXIgaXNPYmplY3RPckZ1bmN0aW9uID0gKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCkgfHwgdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJztcbiAgICByZXR1cm4gaXNPYmplY3RPckZ1bmN0aW9uICYmIHR5cGVvZiBvYmplY3QudGhlbiA9PT0gXCJmdW5jdGlvblwiO1xufVxuZnVuY3Rpb24gaXNQcm9taXNlT3JDb250YWluc1Byb21pc2Uob2JqZWN0KSB7XG4gICAgaWYgKGlzUHJvbWlzZShvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmplY3QpICYmIG9iamVjdC5zb21lKGlzUHJvbWlzZSk7XG59XG5leHBvcnQgeyBpc1Byb21pc2UsIGlzUHJvbWlzZU9yQ29udGFpbnNQcm9taXNlIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc3luYy5qcy5tYXAiLCJpbXBvcnQgeyBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nIH0gZnJvbSBcIi4uL2ludmVyc2lmeVwiO1xuaW1wb3J0ICogYXMgRVJST1JfTVNHUyBmcm9tIFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIjtcbmltcG9ydCB7IEJpbmRpbmdUeXBlRW51bSB9IGZyb20gXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiO1xuaW1wb3J0IHsgRmFjdG9yeVR5cGUgfSBmcm9tIFwiLi9mYWN0b3J5X3R5cGVcIjtcbmV4cG9ydCB2YXIgbXVsdGlCaW5kVG9TZXJ2aWNlID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHR5cGVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHR5cGVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodCkgeyByZXR1cm4gY29udGFpbmVyLmJpbmQodCkudG9TZXJ2aWNlKHNlcnZpY2UpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9O1xufTtcbmV4cG9ydCB2YXIgZW5zdXJlRnVsbHlCb3VuZCA9IGZ1bmN0aW9uIChiaW5kaW5nKSB7XG4gICAgdmFyIGJvdW5kVmFsdWUgPSBudWxsO1xuICAgIHN3aXRjaCAoYmluZGluZy50eXBlKSB7XG4gICAgICAgIGNhc2UgQmluZGluZ1R5cGVFbnVtLkNvbnN0YW50VmFsdWU6XG4gICAgICAgIGNhc2UgQmluZGluZ1R5cGVFbnVtLkZ1bmN0aW9uOlxuICAgICAgICAgICAgYm91bmRWYWx1ZSA9IGJpbmRpbmcuY2FjaGU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBCaW5kaW5nVHlwZUVudW0uQ29uc3RydWN0b3I6XG4gICAgICAgIGNhc2UgQmluZGluZ1R5cGVFbnVtLkluc3RhbmNlOlxuICAgICAgICAgICAgYm91bmRWYWx1ZSA9IGJpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQmluZGluZ1R5cGVFbnVtLkR5bmFtaWNWYWx1ZTpcbiAgICAgICAgICAgIGJvdW5kVmFsdWUgPSBiaW5kaW5nLmR5bmFtaWNWYWx1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEJpbmRpbmdUeXBlRW51bS5Qcm92aWRlcjpcbiAgICAgICAgICAgIGJvdW5kVmFsdWUgPSBiaW5kaW5nLnByb3ZpZGVyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQmluZGluZ1R5cGVFbnVtLkZhY3Rvcnk6XG4gICAgICAgICAgICBib3VuZFZhbHVlID0gYmluZGluZy5mYWN0b3J5O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChib3VuZFZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nID0gZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZyhiaW5kaW5nLnNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuSU5WQUxJRF9CSU5ESU5HX1RZUEUgKyBcIiBcIiArIHNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcpO1xuICAgIH1cbn07XG5leHBvcnQgdmFyIGdldEZhY3RvcnlEZXRhaWxzID0gZnVuY3Rpb24gKGJpbmRpbmcpIHtcbiAgICBzd2l0Y2ggKGJpbmRpbmcudHlwZSkge1xuICAgICAgICBjYXNlIEJpbmRpbmdUeXBlRW51bS5GYWN0b3J5OlxuICAgICAgICAgICAgcmV0dXJuIHsgZmFjdG9yeTogYmluZGluZy5mYWN0b3J5LCBmYWN0b3J5VHlwZTogRmFjdG9yeVR5cGUuRmFjdG9yeSB9O1xuICAgICAgICBjYXNlIEJpbmRpbmdUeXBlRW51bS5Qcm92aWRlcjpcbiAgICAgICAgICAgIHJldHVybiB7IGZhY3Rvcnk6IGJpbmRpbmcucHJvdmlkZXIsIGZhY3RvcnlUeXBlOiBGYWN0b3J5VHlwZS5Qcm92aWRlciB9O1xuICAgICAgICBjYXNlIEJpbmRpbmdUeXBlRW51bS5EeW5hbWljVmFsdWU6XG4gICAgICAgICAgICByZXR1cm4geyBmYWN0b3J5OiBiaW5kaW5nLmR5bmFtaWNWYWx1ZSwgZmFjdG9yeVR5cGU6IEZhY3RvcnlUeXBlLkR5bmFtaWNWYWx1ZSB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBmYWN0b3J5IHR5cGUgXCIgKyBiaW5kaW5nLnR5cGUpO1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iaW5kaW5nX3V0aWxzLmpzLm1hcCIsImZ1bmN0aW9uIGlzQ2xvbmFibGUob2JqKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JylcbiAgICAgICAgJiYgKG9iaiAhPT0gbnVsbClcbiAgICAgICAgJiYgKCdjbG9uZScgaW4gb2JqKVxuICAgICAgICAmJiB0eXBlb2Ygb2JqLmNsb25lID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0IHsgaXNDbG9uYWJsZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2xvbmFibGUuanMubWFwIiwiaW1wb3J0ICogYXMgRVJST1JfTVNHUyBmcm9tIFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIjtcbmV4cG9ydCBmdW5jdGlvbiBpc1N0YWNrT3ZlcmZsb3dFeGVwdGlvbihlcnJvcikge1xuICAgIHJldHVybiAoZXJyb3IgaW5zdGFuY2VvZiBSYW5nZUVycm9yIHx8XG4gICAgICAgIGVycm9yLm1lc3NhZ2UgPT09IEVSUk9SX01TR1MuU1RBQ0tfT1ZFUkZMT1cpO1xufVxuZXhwb3J0IHZhciB0cnlBbmRUaHJvd0Vycm9ySWZTdGFja092ZXJmbG93ID0gZnVuY3Rpb24gKGZuLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoaXNTdGFja092ZXJmbG93RXhlcHRpb24oZXJyb3IpKSB7XG4gICAgICAgICAgICBlcnJvciA9IGVycm9yQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhjZXB0aW9ucy5qcy5tYXAiLCJleHBvcnQgdmFyIEZhY3RvcnlUeXBlO1xuKGZ1bmN0aW9uIChGYWN0b3J5VHlwZSkge1xuICAgIEZhY3RvcnlUeXBlW1wiRHluYW1pY1ZhbHVlXCJdID0gXCJ0b0R5bmFtaWNWYWx1ZVwiO1xuICAgIEZhY3RvcnlUeXBlW1wiRmFjdG9yeVwiXSA9IFwidG9GYWN0b3J5XCI7XG4gICAgRmFjdG9yeVR5cGVbXCJQcm92aWRlclwiXSA9IFwidG9Qcm92aWRlclwiO1xufSkoRmFjdG9yeVR5cGUgfHwgKEZhY3RvcnlUeXBlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZhY3RvcnlfdHlwZS5qcy5tYXAiLCJ2YXIgaWRDb3VudGVyID0gMDtcbmZ1bmN0aW9uIGlkKCkge1xuICAgIHJldHVybiBpZENvdW50ZXIrKztcbn1cbmV4cG9ydCB7IGlkIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZC5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gZ2V0Rmlyc3RBcnJheUR1cGxpY2F0ZShhcnJheSkge1xuICAgIHZhciBzZWVuVmFsdWVzID0gbmV3IFNldCgpO1xuICAgIGZvciAodmFyIF9pID0gMCwgYXJyYXlfMSA9IGFycmF5OyBfaSA8IGFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IGFycmF5XzFbX2ldO1xuICAgICAgICBpZiAoc2VlblZhbHVlcy5oYXMoZW50cnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWVuVmFsdWVzLmFkZChlbnRyeSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpzLmpzLm1hcCIsImltcG9ydCAqIGFzIEVSUk9SX01TR1MgZnJvbSBcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCI7XG5mdW5jdGlvbiBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgaWYgKHR5cGVvZiBzZXJ2aWNlSWRlbnRpZmllciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBfc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgcmV0dXJuIF9zZXJ2aWNlSWRlbnRpZmllci5uYW1lO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygc2VydmljZUlkZW50aWZpZXIgPT09IFwic3ltYm9sXCIpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJZGVudGlmaWVyLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgX3NlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXI7XG4gICAgICAgIHJldHVybiBfc2VydmljZUlkZW50aWZpZXI7XG4gICAgfVxufVxuZnVuY3Rpb24gbGlzdFJlZ2lzdGVyZWRCaW5kaW5nc0ZvclNlcnZpY2VJZGVudGlmaWVyKGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXIsIGdldEJpbmRpbmdzKSB7XG4gICAgdmFyIHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3QgPSBcIlwiO1xuICAgIHZhciByZWdpc3RlcmVkQmluZGluZ3MgPSBnZXRCaW5kaW5ncyhjb250YWluZXIsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICBpZiAocmVnaXN0ZXJlZEJpbmRpbmdzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZWdpc3RlcmVkQmluZGluZ3NMaXN0ID0gXCJcXG5SZWdpc3RlcmVkIGJpbmRpbmdzOlwiO1xuICAgICAgICByZWdpc3RlcmVkQmluZGluZ3MuZm9yRWFjaChmdW5jdGlvbiAoYmluZGluZykge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBcIk9iamVjdFwiO1xuICAgICAgICAgICAgaWYgKGJpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IGdldEZ1bmN0aW9uTmFtZShiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWdpc3RlcmVkQmluZGluZ3NMaXN0ID0gcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCArIFwiXFxuIFwiICsgbmFtZTtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nLmNvbnN0cmFpbnQubWV0YURhdGEpIHtcbiAgICAgICAgICAgICAgICByZWdpc3RlcmVkQmluZGluZ3NMaXN0ID0gcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCArIFwiIC0gXCIgKyBiaW5kaW5nLmNvbnN0cmFpbnQubWV0YURhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdDtcbn1cbmZ1bmN0aW9uIGFscmVhZHlEZXBlbmRlbmN5Q2hhaW4ocmVxdWVzdCwgc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICBpZiAocmVxdWVzdC5wYXJlbnRSZXF1ZXN0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVxdWVzdC5wYXJlbnRSZXF1ZXN0LnNlcnZpY2VJZGVudGlmaWVyID09PSBzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBhbHJlYWR5RGVwZW5kZW5jeUNoYWluKHJlcXVlc3QucGFyZW50UmVxdWVzdCwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRlcGVuZGVuY3lDaGFpblRvU3RyaW5nKHJlcXVlc3QpIHtcbiAgICBmdW5jdGlvbiBfY3JlYXRlU3RyaW5nQXJyKHJlcSwgcmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgeyByZXN1bHQgPSBbXTsgfVxuICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXIgPSBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHJlcS5zZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIHJlc3VsdC5wdXNoKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKHJlcS5wYXJlbnRSZXF1ZXN0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NyZWF0ZVN0cmluZ0FycihyZXEucGFyZW50UmVxdWVzdCwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB2YXIgc3RyaW5nQXJyID0gX2NyZWF0ZVN0cmluZ0FycihyZXF1ZXN0KTtcbiAgICByZXR1cm4gc3RyaW5nQXJyLnJldmVyc2UoKS5qb2luKFwiIC0tPiBcIik7XG59XG5mdW5jdGlvbiBjaXJjdWxhckRlcGVuZGVuY3lUb0V4Y2VwdGlvbihyZXF1ZXN0KSB7XG4gICAgcmVxdWVzdC5jaGlsZFJlcXVlc3RzLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkUmVxdWVzdCkge1xuICAgICAgICBpZiAoYWxyZWFkeURlcGVuZGVuY3lDaGFpbihjaGlsZFJlcXVlc3QsIGNoaWxkUmVxdWVzdC5zZXJ2aWNlSWRlbnRpZmllcikpIHtcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlcyA9IGRlcGVuZGVuY3lDaGFpblRvU3RyaW5nKGNoaWxkUmVxdWVzdCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5DSVJDVUxBUl9ERVBFTkRFTkNZICsgXCIgXCIgKyBzZXJ2aWNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjaXJjdWxhckRlcGVuZGVuY3lUb0V4Y2VwdGlvbihjaGlsZFJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBsaXN0TWV0YWRhdGFGb3JUYXJnZXQoc2VydmljZUlkZW50aWZpZXJTdHJpbmcsIHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuaXNUYWdnZWQoKSB8fCB0YXJnZXQuaXNOYW1lZCgpKSB7XG4gICAgICAgIHZhciBtXzEgPSBcIlwiO1xuICAgICAgICB2YXIgbmFtZWRUYWcgPSB0YXJnZXQuZ2V0TmFtZWRUYWcoKTtcbiAgICAgICAgdmFyIG90aGVyVGFncyA9IHRhcmdldC5nZXRDdXN0b21UYWdzKCk7XG4gICAgICAgIGlmIChuYW1lZFRhZyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbV8xICs9IG5hbWVkVGFnLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlclRhZ3MgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG90aGVyVGFncy5mb3JFYWNoKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgICAgICAgICBtXzEgKz0gdGFnLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiIFwiICsgc2VydmljZUlkZW50aWZpZXJTdHJpbmcgKyBcIlxcbiBcIiArIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nICsgXCIgLSBcIiArIG1fMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcIiBcIiArIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldEZ1bmN0aW9uTmFtZShmdW5jKSB7XG4gICAgaWYgKGZ1bmMubmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuYy5uYW1lO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIG5hbWVfMSA9IGZ1bmMudG9TdHJpbmcoKTtcbiAgICAgICAgdmFyIG1hdGNoID0gbmFtZV8xLm1hdGNoKC9eZnVuY3Rpb25cXHMqKFteXFxzKF0rKS8pO1xuICAgICAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6IFwiQW5vbnltb3VzIGZ1bmN0aW9uOiBcIiArIG5hbWVfMTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRTeW1ib2xEZXNjcmlwdGlvbihzeW1ib2wpIHtcbiAgICByZXR1cm4gc3ltYm9sLnRvU3RyaW5nKCkuc2xpY2UoNywgLTEpO1xufVxuZXhwb3J0IHsgZ2V0RnVuY3Rpb25OYW1lLCBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nLCBsaXN0UmVnaXN0ZXJlZEJpbmRpbmdzRm9yU2VydmljZUlkZW50aWZpZXIsIGxpc3RNZXRhZGF0YUZvclRhcmdldCwgY2lyY3VsYXJEZXBlbmRlbmN5VG9FeGNlcHRpb24sIGdldFN5bWJvbERlc2NyaXB0aW9uIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXJpYWxpemF0aW9uLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgcGVyY2VudFR3ZW50aWVzID0gLyUyMC9nO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIEZvcm1hdCA9IHtcbiAgICBSRkMxNzM4OiAnUkZDMTczOCcsXG4gICAgUkZDMzk4NjogJ1JGQzM5ODYnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWwuYXNzaWduKFxuICAgIHtcbiAgICAgICAgJ2RlZmF1bHQnOiBGb3JtYXQuUkZDMzk4NixcbiAgICAgICAgZm9ybWF0dGVyczoge1xuICAgICAgICAgICAgUkZDMTczODogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2UuY2FsbCh2YWx1ZSwgcGVyY2VudFR3ZW50aWVzLCAnKycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFJGQzM5ODY6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBGb3JtYXRcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0czogZm9ybWF0cyxcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgc3RyaW5naWZ5OiBzdHJpbmdpZnlcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhbGxvd0RvdHM6IGZhbHNlLFxuICAgIGFsbG93UHJvdG90eXBlczogZmFsc2UsXG4gICAgYXJyYXlMaW1pdDogMjAsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGNvbW1hOiBmYWxzZSxcbiAgICBkZWNvZGVyOiB1dGlscy5kZWNvZGUsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZGVwdGg6IDUsXG4gICAgaWdub3JlUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGludGVycHJldE51bWVyaWNFbnRpdGllczogZmFsc2UsXG4gICAgcGFyYW1ldGVyTGltaXQ6IDEwMDAsXG4gICAgcGFyc2VBcnJheXM6IHRydWUsXG4gICAgcGxhaW5PYmplY3RzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvJiMoXFxkKyk7L2csIGZ1bmN0aW9uICgkMCwgbnVtYmVyU3RyKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG51bWJlclN0ciwgMTApKTtcbiAgICB9KTtcbn07XG5cbnZhciBwYXJzZUFycmF5VmFsdWUgPSBmdW5jdGlvbiAodmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiBvcHRpb25zLmNvbW1hICYmIHZhbC5pbmRleE9mKCcsJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdmFsLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbDtcbn07XG5cbnZhciBtYXliZU1hcCA9IGZ1bmN0aW9uIG1heWJlTWFwKHZhbCwgZm4pIHtcbiAgICBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIHZhciBtYXBwZWQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIG1hcHBlZC5wdXNoKGZuKHZhbFtpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXBwZWQ7XG4gICAgfVxuICAgIHJldHVybiBmbih2YWwpO1xufTtcblxuLy8gVGhpcyBpcyB3aGF0IGJyb3dzZXJzIHdpbGwgc3VibWl0IHdoZW4gdGhlIOKckyBjaGFyYWN0ZXIgb2NjdXJzIGluIGFuXG4vLyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQgYm9keSBhbmQgdGhlIGVuY29kaW5nIG9mIHRoZSBwYWdlIGNvbnRhaW5pbmdcbi8vIHRoZSBmb3JtIGlzIGlzby04ODU5LTEsIG9yIHdoZW4gdGhlIHN1Ym1pdHRlZCBmb3JtIGhhcyBhbiBhY2NlcHQtY2hhcnNldFxuLy8gYXR0cmlidXRlIG9mIGlzby04ODU5LTEuIFByZXN1bWFibHkgYWxzbyB3aXRoIG90aGVyIGNoYXJzZXRzIHRoYXQgZG8gbm90IGNvbnRhaW5cbi8vIHRoZSDinJMgY2hhcmFjdGVyLCBzdWNoIGFzIHVzLWFzY2lpLlxudmFyIGlzb1NlbnRpbmVsID0gJ3V0Zjg9JTI2JTIzMTAwMDMlM0InOyAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JylcblxuLy8gVGhlc2UgYXJlIHRoZSBwZXJjZW50LWVuY29kZWQgdXRmLTggb2N0ZXRzIHJlcHJlc2VudGluZyBhIGNoZWNrbWFyaywgaW5kaWNhdGluZyB0aGF0IHRoZSByZXF1ZXN0IGFjdHVhbGx5IGlzIHV0Zi04IGVuY29kZWQuXG52YXIgY2hhcnNldFNlbnRpbmVsID0gJ3V0Zjg9JUUyJTlDJTkzJzsgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuXG52YXIgcGFyc2VWYWx1ZXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nVmFsdWVzKHN0ciwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIgY2xlYW5TdHIgPSBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID8gc3RyLnJlcGxhY2UoL15cXD8vLCAnJykgOiBzdHI7XG4gICAgdmFyIGxpbWl0ID0gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBvcHRpb25zLnBhcmFtZXRlckxpbWl0O1xuICAgIHZhciBwYXJ0cyA9IGNsZWFuU3RyLnNwbGl0KG9wdGlvbnMuZGVsaW1pdGVyLCBsaW1pdCk7XG4gICAgdmFyIHNraXBJbmRleCA9IC0xOyAvLyBLZWVwIHRyYWNrIG9mIHdoZXJlIHRoZSB1dGY4IHNlbnRpbmVsIHdhcyBmb3VuZFxuICAgIHZhciBpO1xuXG4gICAgdmFyIGNoYXJzZXQgPSBvcHRpb25zLmNoYXJzZXQ7XG4gICAgaWYgKG9wdGlvbnMuY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKHBhcnRzW2ldLmluZGV4T2YoJ3V0Zjg9JykgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocGFydHNbaV0gPT09IGNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyc2V0ID0gJ3V0Zi04JztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldID09PSBpc29TZW50aW5lbCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyc2V0ID0gJ2lzby04ODU5LTEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBza2lwSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGkgPSBwYXJ0cy5sZW5ndGg7IC8vIFRoZSBlc2xpbnQgc2V0dGluZ3MgZG8gbm90IGFsbG93IGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChpID09PSBza2lwSW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaV07XG5cbiAgICAgICAgdmFyIGJyYWNrZXRFcXVhbHNQb3MgPSBwYXJ0LmluZGV4T2YoJ109Jyk7XG4gICAgICAgIHZhciBwb3MgPSBicmFja2V0RXF1YWxzUG9zID09PSAtMSA/IHBhcnQuaW5kZXhPZignPScpIDogYnJhY2tldEVxdWFsc1BvcyArIDE7XG5cbiAgICAgICAgdmFyIGtleSwgdmFsO1xuICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQsIGRlZmF1bHRzLmRlY29kZXIsIGNoYXJzZXQsICdrZXknKTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID8gbnVsbCA6ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UoMCwgcG9zKSwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ2tleScpO1xuICAgICAgICAgICAgdmFsID0gbWF5YmVNYXAoXG4gICAgICAgICAgICAgICAgcGFyc2VBcnJheVZhbHVlKHBhcnQuc2xpY2UocG9zICsgMSksIG9wdGlvbnMpLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlbmNvZGVkVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmRlY29kZXIoZW5jb2RlZFZhbCwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWwgJiYgb3B0aW9ucy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgJiYgY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICB2YWwgPSBpbnRlcnByZXROdW1lcmljRW50aXRpZXModmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJ0LmluZGV4T2YoJ1tdPScpID4gLTEpIHtcbiAgICAgICAgICAgIHZhbCA9IGlzQXJyYXkodmFsKSA/IFt2YWxdIDogdmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB1dGlscy5jb21iaW5lKG9ialtrZXldLCB2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIHBhcnNlT2JqZWN0ID0gZnVuY3Rpb24gKGNoYWluLCB2YWwsIG9wdGlvbnMsIHZhbHVlc1BhcnNlZCkge1xuICAgIHZhciBsZWFmID0gdmFsdWVzUGFyc2VkID8gdmFsIDogcGFyc2VBcnJheVZhbHVlKHZhbCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBpID0gY2hhaW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIG9iajtcbiAgICAgICAgdmFyIHJvb3QgPSBjaGFpbltpXTtcblxuICAgICAgICBpZiAocm9vdCA9PT0gJ1tdJyAmJiBvcHRpb25zLnBhcnNlQXJyYXlzKSB7XG4gICAgICAgICAgICBvYmogPSBbXS5jb25jYXQobGVhZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICAgICAgICAgIHZhciBjbGVhblJvb3QgPSByb290LmNoYXJBdCgwKSA9PT0gJ1snICYmIHJvb3QuY2hhckF0KHJvb3QubGVuZ3RoIC0gMSkgPT09ICddJyA/IHJvb3Quc2xpY2UoMSwgLTEpIDogcm9vdDtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGNsZWFuUm9vdCwgMTApO1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnBhcnNlQXJyYXlzICYmIGNsZWFuUm9vdCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBvYmogPSB7IDA6IGxlYWYgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgIWlzTmFOKGluZGV4KVxuICAgICAgICAgICAgICAgICYmIHJvb3QgIT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIFN0cmluZyhpbmRleCkgPT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIGluZGV4ID49IDBcbiAgICAgICAgICAgICAgICAmJiAob3B0aW9ucy5wYXJzZUFycmF5cyAmJiBpbmRleCA8PSBvcHRpb25zLmFycmF5TGltaXQpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgICAgICBvYmpbaW5kZXhdID0gbGVhZjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2NsZWFuUm9vdF0gPSBsZWFmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGVhZiA9IG9iajsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIH1cblxuICAgIHJldHVybiBsZWFmO1xufTtcblxudmFyIHBhcnNlS2V5cyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdLZXlzKGdpdmVuS2V5LCB2YWwsIG9wdGlvbnMsIHZhbHVlc1BhcnNlZCkge1xuICAgIGlmICghZ2l2ZW5LZXkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRyYW5zZm9ybSBkb3Qgbm90YXRpb24gdG8gYnJhY2tldCBub3RhdGlvblxuICAgIHZhciBrZXkgPSBvcHRpb25zLmFsbG93RG90cyA/IGdpdmVuS2V5LnJlcGxhY2UoL1xcLihbXi5bXSspL2csICdbJDFdJykgOiBnaXZlbktleTtcblxuICAgIC8vIFRoZSByZWdleCBjaHVua3NcblxuICAgIHZhciBicmFja2V0cyA9IC8oXFxbW15bXFxdXSpdKS87XG4gICAgdmFyIGNoaWxkID0gLyhcXFtbXltcXF1dKl0pL2c7XG5cbiAgICAvLyBHZXQgdGhlIHBhcmVudFxuXG4gICAgdmFyIHNlZ21lbnQgPSBvcHRpb25zLmRlcHRoID4gMCAmJiBicmFja2V0cy5leGVjKGtleSk7XG4gICAgdmFyIHBhcmVudCA9IHNlZ21lbnQgPyBrZXkuc2xpY2UoMCwgc2VnbWVudC5pbmRleCkgOiBrZXk7XG5cbiAgICAvLyBTdGFzaCB0aGUgcGFyZW50IGlmIGl0IGV4aXN0c1xuXG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIC8vIElmIHdlIGFyZW4ndCB1c2luZyBwbGFpbiBvYmplY3RzLCBvcHRpb25hbGx5IHByZWZpeCBrZXlzIHRoYXQgd291bGQgb3ZlcndyaXRlIG9iamVjdCBwcm90b3R5cGUgcHJvcGVydGllc1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHBhcmVudCkpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBrZXlzLnB1c2gocGFyZW50KTtcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggY2hpbGRyZW4gYXBwZW5kaW5nIHRvIHRoZSBhcnJheSB1bnRpbCB3ZSBoaXQgZGVwdGhcblxuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAob3B0aW9ucy5kZXB0aCA+IDAgJiYgKHNlZ21lbnQgPSBjaGlsZC5leGVjKGtleSkpICE9PSBudWxsICYmIGkgPCBvcHRpb25zLmRlcHRoKSB7XG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgaWYgKCFvcHRpb25zLnBsYWluT2JqZWN0cyAmJiBoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzZWdtZW50WzFdLnNsaWNlKDEsIC0xKSkpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAga2V5cy5wdXNoKHNlZ21lbnRbMV0pO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlJ3MgYSByZW1haW5kZXIsIGp1c3QgYWRkIHdoYXRldmVyIGlzIGxlZnRcblxuICAgIGlmIChzZWdtZW50KSB7XG4gICAgICAgIGtleXMucHVzaCgnWycgKyBrZXkuc2xpY2Uoc2VnbWVudC5pbmRleCkgKyAnXScpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZU9iamVjdChrZXlzLCB2YWwsIG9wdGlvbnMsIHZhbHVlc1BhcnNlZCk7XG59O1xuXG52YXIgbm9ybWFsaXplUGFyc2VPcHRpb25zID0gZnVuY3Rpb24gbm9ybWFsaXplUGFyc2VPcHRpb25zKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmRlY29kZXIgIT09IG51bGwgJiYgb3B0cy5kZWNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZGVjb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdEZWNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0cy5jaGFyc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvcHRzLmNoYXJzZXQgIT09ICd1dGYtOCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNoYXJzZXQgb3B0aW9uIG11c3QgYmUgZWl0aGVyIHV0Zi04LCBpc28tODg1OS0xLCBvciB1bmRlZmluZWQnKTtcbiAgICB9XG4gICAgdmFyIGNoYXJzZXQgPSB0eXBlb2Ygb3B0cy5jaGFyc2V0ID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmNoYXJzZXQgOiBvcHRzLmNoYXJzZXQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhbGxvd0RvdHM6IHR5cGVvZiBvcHRzLmFsbG93RG90cyA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5hbGxvd0RvdHMgOiAhIW9wdHMuYWxsb3dEb3RzLFxuICAgICAgICBhbGxvd1Byb3RvdHlwZXM6IHR5cGVvZiBvcHRzLmFsbG93UHJvdG90eXBlcyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5hbGxvd1Byb3RvdHlwZXMgOiBkZWZhdWx0cy5hbGxvd1Byb3RvdHlwZXMsXG4gICAgICAgIGFycmF5TGltaXQ6IHR5cGVvZiBvcHRzLmFycmF5TGltaXQgPT09ICdudW1iZXInID8gb3B0cy5hcnJheUxpbWl0IDogZGVmYXVsdHMuYXJyYXlMaW1pdCxcbiAgICAgICAgY2hhcnNldDogY2hhcnNldCxcbiAgICAgICAgY2hhcnNldFNlbnRpbmVsOiB0eXBlb2Ygb3B0cy5jaGFyc2V0U2VudGluZWwgPT09ICdib29sZWFuJyA/IG9wdHMuY2hhcnNldFNlbnRpbmVsIDogZGVmYXVsdHMuY2hhcnNldFNlbnRpbmVsLFxuICAgICAgICBjb21tYTogdHlwZW9mIG9wdHMuY29tbWEgPT09ICdib29sZWFuJyA/IG9wdHMuY29tbWEgOiBkZWZhdWx0cy5jb21tYSxcbiAgICAgICAgZGVjb2RlcjogdHlwZW9mIG9wdHMuZGVjb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuZGVjb2RlciA6IGRlZmF1bHRzLmRlY29kZXIsXG4gICAgICAgIGRlbGltaXRlcjogdHlwZW9mIG9wdHMuZGVsaW1pdGVyID09PSAnc3RyaW5nJyB8fCB1dGlscy5pc1JlZ0V4cChvcHRzLmRlbGltaXRlcikgPyBvcHRzLmRlbGltaXRlciA6IGRlZmF1bHRzLmRlbGltaXRlcixcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWltcGxpY2l0LWNvZXJjaW9uLCBuby1leHRyYS1wYXJlbnNcbiAgICAgICAgZGVwdGg6ICh0eXBlb2Ygb3B0cy5kZXB0aCA9PT0gJ251bWJlcicgfHwgb3B0cy5kZXB0aCA9PT0gZmFsc2UpID8gK29wdHMuZGVwdGggOiBkZWZhdWx0cy5kZXB0aCxcbiAgICAgICAgaWdub3JlUXVlcnlQcmVmaXg6IG9wdHMuaWdub3JlUXVlcnlQcmVmaXggPT09IHRydWUsXG4gICAgICAgIGludGVycHJldE51bWVyaWNFbnRpdGllczogdHlwZW9mIG9wdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzID09PSAnYm9vbGVhbicgPyBvcHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyA6IGRlZmF1bHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyxcbiAgICAgICAgcGFyYW1ldGVyTGltaXQ6IHR5cGVvZiBvcHRzLnBhcmFtZXRlckxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdHMucGFyYW1ldGVyTGltaXQgOiBkZWZhdWx0cy5wYXJhbWV0ZXJMaW1pdCxcbiAgICAgICAgcGFyc2VBcnJheXM6IG9wdHMucGFyc2VBcnJheXMgIT09IGZhbHNlLFxuICAgICAgICBwbGFpbk9iamVjdHM6IHR5cGVvZiBvcHRzLnBsYWluT2JqZWN0cyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5wbGFpbk9iamVjdHMgOiBkZWZhdWx0cy5wbGFpbk9iamVjdHMsXG4gICAgICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIsIG9wdHMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IG5vcm1hbGl6ZVBhcnNlT3B0aW9ucyhvcHRzKTtcblxuICAgIGlmIChzdHIgPT09ICcnIHx8IHN0ciA9PT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgfVxuXG4gICAgdmFyIHRlbXBPYmogPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IHBhcnNlVmFsdWVzKHN0ciwgb3B0aW9ucykgOiBzdHI7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBrZXlzIGFuZCBzZXR1cCB0aGUgbmV3IG9iamVjdFxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0ZW1wT2JqKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhciBuZXdPYmogPSBwYXJzZUtleXMoa2V5LCB0ZW1wT2JqW2tleV0sIG9wdGlvbnMsIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgb2JqID0gdXRpbHMubWVyZ2Uob2JqLCBuZXdPYmosIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB1dGlscy5jb21wYWN0KG9iaik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBhcnJheVByZWZpeEdlbmVyYXRvcnMgPSB7XG4gICAgYnJhY2tldHM6IGZ1bmN0aW9uIGJyYWNrZXRzKHByZWZpeCkge1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1tdJztcbiAgICB9LFxuICAgIGNvbW1hOiAnY29tbWEnLFxuICAgIGluZGljZXM6IGZ1bmN0aW9uIGluZGljZXMocHJlZml4LCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbJyArIGtleSArICddJztcbiAgICB9LFxuICAgIHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHByZWZpeCkge1xuICAgICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbnZhciBwdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG52YXIgcHVzaFRvQXJyYXkgPSBmdW5jdGlvbiAoYXJyLCB2YWx1ZU9yQXJyYXkpIHtcbiAgICBwdXNoLmFwcGx5KGFyciwgaXNBcnJheSh2YWx1ZU9yQXJyYXkpID8gdmFsdWVPckFycmF5IDogW3ZhbHVlT3JBcnJheV0pO1xufTtcblxudmFyIHRvSVNPID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmc7XG5cbnZhciBkZWZhdWx0Rm9ybWF0ID0gZm9ybWF0c1snZGVmYXVsdCddO1xudmFyIGRlZmF1bHRzID0ge1xuICAgIGFkZFF1ZXJ5UHJlZml4OiBmYWxzZSxcbiAgICBhbGxvd0RvdHM6IGZhbHNlLFxuICAgIGNoYXJzZXQ6ICd1dGYtOCcsXG4gICAgY2hhcnNldFNlbnRpbmVsOiBmYWxzZSxcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBlbmNvZGU6IHRydWUsXG4gICAgZW5jb2RlcjogdXRpbHMuZW5jb2RlLFxuICAgIGVuY29kZVZhbHVlc09ubHk6IGZhbHNlLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBmb3JtYXR0ZXI6IGZvcm1hdHMuZm9ybWF0dGVyc1tkZWZhdWx0Rm9ybWF0XSxcbiAgICAvLyBkZXByZWNhdGVkXG4gICAgaW5kaWNlczogZmFsc2UsXG4gICAgc2VyaWFsaXplRGF0ZTogZnVuY3Rpb24gc2VyaWFsaXplRGF0ZShkYXRlKSB7XG4gICAgICAgIHJldHVybiB0b0lTTy5jYWxsKGRhdGUpO1xuICAgIH0sXG4gICAgc2tpcE51bGxzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgaXNOb25OdWxsaXNoUHJpbWl0aXZlID0gZnVuY3Rpb24gaXNOb25OdWxsaXNoUHJpbWl0aXZlKHYpIHtcbiAgICByZXR1cm4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG4gICAgICAgIHx8IHR5cGVvZiB2ID09PSAnbnVtYmVyJ1xuICAgICAgICB8fCB0eXBlb2YgdiA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgIHx8IHR5cGVvZiB2ID09PSAnc3ltYm9sJ1xuICAgICAgICB8fCB0eXBlb2YgdiA9PT0gJ2JpZ2ludCc7XG59O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KFxuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0dGVyLFxuICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgY2hhcnNldFxuKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYmogPSBmaWx0ZXIocHJlZml4LCBvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBzZXJpYWxpemVEYXRlKG9iaik7XG4gICAgfSBlbHNlIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgICAgICBvYmogPSBvYmouam9pbignLCcpO1xuICAgIH1cblxuICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHN0cmljdE51bGxIYW5kbGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZXIgJiYgIWVuY29kZVZhbHVlc09ubHkgPyBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCwgJ2tleScpIDogcHJlZml4O1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKGlzTm9uTnVsbGlzaFByaW1pdGl2ZShvYmopIHx8IHV0aWxzLmlzQnVmZmVyKG9iaikpIHtcbiAgICAgICAgaWYgKGVuY29kZXIpIHtcbiAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGVuY29kZVZhbHVlc09ubHkgPyBwcmVmaXggOiBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCwgJ2tleScpO1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIoa2V5VmFsdWUpICsgJz0nICsgZm9ybWF0dGVyKGVuY29kZXIob2JqLCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAndmFsdWUnKSldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZm9ybWF0dGVyKHByZWZpeCkgKyAnPScgKyBmb3JtYXR0ZXIoU3RyaW5nKG9iaikpXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICB2YXIgb2JqS2V5cztcbiAgICBpZiAoaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBvYmpLZXlzID0gc29ydCA/IGtleXMuc29ydChzb3J0KSA6IGtleXM7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgcHVzaFRvQXJyYXkodmFsdWVzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgdHlwZW9mIGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdmdW5jdGlvbicgPyBnZW5lcmF0ZUFycmF5UHJlZml4KHByZWZpeCwga2V5KSA6IHByZWZpeCxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgICAgICBjaGFyc2V0XG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHB1c2hUb0FycmF5KHZhbHVlcywgc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIHByZWZpeCArIChhbGxvd0RvdHMgPyAnLicgKyBrZXkgOiAnWycgKyBrZXkgKyAnXScpLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgICAgIGNoYXJzZXRcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbn07XG5cbnZhciBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zID0gZnVuY3Rpb24gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKSB7XG4gICAgaWYgKCFvcHRzKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICB9XG5cbiAgICBpZiAob3B0cy5lbmNvZGVyICE9PSBudWxsICYmIG9wdHMuZW5jb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRzLmVuY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRW5jb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgY2hhcnNldCA9IG9wdHMuY2hhcnNldCB8fCBkZWZhdWx0cy5jaGFyc2V0O1xuICAgIGlmICh0eXBlb2Ygb3B0cy5jaGFyc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvcHRzLmNoYXJzZXQgIT09ICd1dGYtOCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNoYXJzZXQgb3B0aW9uIG11c3QgYmUgZWl0aGVyIHV0Zi04LCBpc28tODg1OS0xLCBvciB1bmRlZmluZWQnKTtcbiAgICB9XG5cbiAgICB2YXIgZm9ybWF0ID0gZm9ybWF0c1snZGVmYXVsdCddO1xuICAgIGlmICh0eXBlb2Ygb3B0cy5mb3JtYXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICghaGFzLmNhbGwoZm9ybWF0cy5mb3JtYXR0ZXJzLCBvcHRzLmZvcm1hdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9wdGlvbiBwcm92aWRlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtYXQgPSBvcHRzLmZvcm1hdDtcbiAgICB9XG4gICAgdmFyIGZvcm1hdHRlciA9IGZvcm1hdHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuXG4gICAgdmFyIGZpbHRlciA9IGRlZmF1bHRzLmZpbHRlcjtcbiAgICBpZiAodHlwZW9mIG9wdHMuZmlsdGVyID09PSAnZnVuY3Rpb24nIHx8IGlzQXJyYXkob3B0cy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdHMuZmlsdGVyO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZFF1ZXJ5UHJlZml4OiB0eXBlb2Ygb3B0cy5hZGRRdWVyeVByZWZpeCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5hZGRRdWVyeVByZWZpeCA6IGRlZmF1bHRzLmFkZFF1ZXJ5UHJlZml4LFxuICAgICAgICBhbGxvd0RvdHM6IHR5cGVvZiBvcHRzLmFsbG93RG90cyA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5hbGxvd0RvdHMgOiAhIW9wdHMuYWxsb3dEb3RzLFxuICAgICAgICBjaGFyc2V0OiBjaGFyc2V0LFxuICAgICAgICBjaGFyc2V0U2VudGluZWw6IHR5cGVvZiBvcHRzLmNoYXJzZXRTZW50aW5lbCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaGFyc2V0U2VudGluZWwgOiBkZWZhdWx0cy5jaGFyc2V0U2VudGluZWwsXG4gICAgICAgIGRlbGltaXRlcjogdHlwZW9mIG9wdHMuZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmRlbGltaXRlciA6IG9wdHMuZGVsaW1pdGVyLFxuICAgICAgICBlbmNvZGU6IHR5cGVvZiBvcHRzLmVuY29kZSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5lbmNvZGUgOiBkZWZhdWx0cy5lbmNvZGUsXG4gICAgICAgIGVuY29kZXI6IHR5cGVvZiBvcHRzLmVuY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRzLmVuY29kZXIgOiBkZWZhdWx0cy5lbmNvZGVyLFxuICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5OiB0eXBlb2Ygb3B0cy5lbmNvZGVWYWx1ZXNPbmx5ID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZVZhbHVlc09ubHkgOiBkZWZhdWx0cy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICBmaWx0ZXI6IGZpbHRlcixcbiAgICAgICAgZm9ybWF0dGVyOiBmb3JtYXR0ZXIsXG4gICAgICAgIHNlcmlhbGl6ZURhdGU6IHR5cGVvZiBvcHRzLnNlcmlhbGl6ZURhdGUgPT09ICdmdW5jdGlvbicgPyBvcHRzLnNlcmlhbGl6ZURhdGUgOiBkZWZhdWx0cy5zZXJpYWxpemVEYXRlLFxuICAgICAgICBza2lwTnVsbHM6IHR5cGVvZiBvcHRzLnNraXBOdWxscyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5za2lwTnVsbHMgOiBkZWZhdWx0cy5za2lwTnVsbHMsXG4gICAgICAgIHNvcnQ6IHR5cGVvZiBvcHRzLnNvcnQgPT09ICdmdW5jdGlvbicgPyBvcHRzLnNvcnQgOiBudWxsLFxuICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IHR5cGVvZiBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmdcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBvcHRzKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICB2YXIgb3B0aW9ucyA9IG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMob3B0cyk7XG5cbiAgICB2YXIgb2JqS2V5cztcbiAgICB2YXIgZmlsdGVyO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqID0gZmlsdGVyKCcnLCBvYmopO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvcHRpb25zLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHZhciBhcnJheUZvcm1hdDtcbiAgICBpZiAob3B0cyAmJiBvcHRzLmFycmF5Rm9ybWF0IGluIGFycmF5UHJlZml4R2VuZXJhdG9ycykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdHMuYXJyYXlGb3JtYXQ7XG4gICAgfSBlbHNlIGlmIChvcHRzICYmICdpbmRpY2VzJyBpbiBvcHRzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5pbmRpY2VzID8gJ2luZGljZXMnIDogJ3JlcGVhdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSAnaW5kaWNlcyc7XG4gICAgfVxuXG4gICAgdmFyIGdlbmVyYXRlQXJyYXlQcmVmaXggPSBhcnJheVByZWZpeEdlbmVyYXRvcnNbYXJyYXlGb3JtYXRdO1xuXG4gICAgaWYgKCFvYmpLZXlzKSB7XG4gICAgICAgIG9iaktleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnNvcnQpIHtcbiAgICAgICAgb2JqS2V5cy5zb3J0KG9wdGlvbnMuc29ydCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVzaFRvQXJyYXkoa2V5cywgc3RyaW5naWZ5KFxuICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICBvcHRpb25zLnNraXBOdWxscyxcbiAgICAgICAgICAgIG9wdGlvbnMuZW5jb2RlID8gb3B0aW9ucy5lbmNvZGVyIDogbnVsbCxcbiAgICAgICAgICAgIG9wdGlvbnMuZmlsdGVyLFxuICAgICAgICAgICAgb3B0aW9ucy5zb3J0LFxuICAgICAgICAgICAgb3B0aW9ucy5hbGxvd0RvdHMsXG4gICAgICAgICAgICBvcHRpb25zLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICBvcHRpb25zLmZvcm1hdHRlcixcbiAgICAgICAgICAgIG9wdGlvbnMuZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgIG9wdGlvbnMuY2hhcnNldFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICB2YXIgam9pbmVkID0ga2V5cy5qb2luKG9wdGlvbnMuZGVsaW1pdGVyKTtcbiAgICB2YXIgcHJlZml4ID0gb3B0aW9ucy5hZGRRdWVyeVByZWZpeCA9PT0gdHJ1ZSA/ICc/JyA6ICcnO1xuXG4gICAgaWYgKG9wdGlvbnMuY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCcmIzEwMDAzOycpLCB0aGUgXCJudW1lcmljIGVudGl0eVwiIHJlcHJlc2VudGF0aW9uIG9mIGEgY2hlY2ttYXJrXG4gICAgICAgICAgICBwcmVmaXggKz0gJ3V0Zjg9JTI2JTIzMTAwMDMlM0ImJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVuY29kZVVSSUNvbXBvbmVudCgn4pyTJylcbiAgICAgICAgICAgIHByZWZpeCArPSAndXRmOD0lRTIlOUMlOTMmJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBqb2luZWQubGVuZ3RoID4gMCA/IHByZWZpeCArIGpvaW5lZCA6ICcnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbnZhciBoZXhUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgICAgICBhcnJheS5wdXNoKCclJyArICgoaSA8IDE2ID8gJzAnIDogJycpICsgaS50b1N0cmluZygxNikpLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbn0oKSk7XG5cbnZhciBjb21wYWN0UXVldWUgPSBmdW5jdGlvbiBjb21wYWN0UXVldWUocXVldWUpIHtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YXIgY29tcGFjdGVkID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb2JqLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbal0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLm9ialtpdGVtLnByb3BdID0gY29tcGFjdGVkO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiBhcnJheVRvT2JqZWN0KHNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSBvcHRpb25zICYmIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBtZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG4gICAgLyogZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOiAwICovXG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgJiYgdHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICgob3B0aW9ucyAmJiAob3B0aW9ucy5wbGFpbk9iamVjdHMgfHwgb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpKSB8fCAhaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc291cmNlKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtzb3VyY2VdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbdGFyZ2V0LCBzb3VyY2VdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gW3RhcmdldF0uY29uY2F0KHNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIG1lcmdlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgIWlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBtZXJnZVRhcmdldCA9IGFycmF5VG9PYmplY3QodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheSh0YXJnZXQpICYmIGlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKHRhcmdldCwgaSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0SXRlbSA9IHRhcmdldFtpXTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0SXRlbSAmJiB0eXBlb2YgdGFyZ2V0SXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gbWVyZ2UodGFyZ2V0SXRlbSwgaXRlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgICAgIGlmIChoYXMuY2FsbChhY2MsIGtleSkpIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gbWVyZ2UoYWNjW2tleV0sIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBtZXJnZVRhcmdldCk7XG59O1xuXG52YXIgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduU2luZ2xlU291cmNlKHRhcmdldCwgc291cmNlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICBhY2Nba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHRhcmdldCk7XG59O1xuXG52YXIgZGVjb2RlID0gZnVuY3Rpb24gKHN0ciwgZGVjb2RlciwgY2hhcnNldCkge1xuICAgIHZhciBzdHJXaXRob3V0UGx1cyA9IHN0ci5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIC8vIHVuZXNjYXBlIG5ldmVyIHRocm93cywgbm8gdHJ5Li4uY2F0Y2ggbmVlZGVkOlxuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXMucmVwbGFjZSgvJVswLTlhLWZdezJ9L2dpLCB1bmVzY2FwZSk7XG4gICAgfVxuICAgIC8vIHV0Zi04XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHJXaXRob3V0UGx1cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXM7XG4gICAgfVxufTtcblxudmFyIGVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShzdHIsIGRlZmF1bHRFbmNvZGVyLCBjaGFyc2V0KSB7XG4gICAgLy8gVGhpcyBjb2RlIHdhcyBvcmlnaW5hbGx5IHdyaXR0ZW4gYnkgQnJpYW4gV2hpdGUgKG1zY2RleCkgZm9yIHRoZSBpby5qcyBjb3JlIHF1ZXJ5c3RyaW5nIGxpYnJhcnkuXG4gICAgLy8gSXQgaGFzIGJlZW4gYWRhcHRlZCBoZXJlIGZvciBzdHJpY3RlciBhZGhlcmVuY2UgdG8gUkZDIDM5ODZcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIHZhciBzdHJpbmcgPSBzdHI7XG4gICAgaWYgKHR5cGVvZiBzdHIgPT09ICdzeW1ib2wnKSB7XG4gICAgICAgIHN0cmluZyA9IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdHIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgc3RyaW5nID0gU3RyaW5nKHN0cik7XG4gICAgfVxuXG4gICAgaWYgKGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICByZXR1cm4gZXNjYXBlKHN0cmluZykucmVwbGFjZSgvJXVbMC05YS1mXXs0fS9naSwgZnVuY3Rpb24gKCQwKSB7XG4gICAgICAgICAgICByZXR1cm4gJyUyNiUyMycgKyBwYXJzZUludCgkMC5zbGljZSgyKSwgMTYpICsgJyUzQic7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBvdXQgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgYyA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGMgPT09IDB4MkQgLy8gLVxuICAgICAgICAgICAgfHwgYyA9PT0gMHgyRSAvLyAuXG4gICAgICAgICAgICB8fCBjID09PSAweDVGIC8vIF9cbiAgICAgICAgICAgIHx8IGMgPT09IDB4N0UgLy8gflxuICAgICAgICAgICAgfHwgKGMgPj0gMHgzMCAmJiBjIDw9IDB4MzkpIC8vIDAtOVxuICAgICAgICAgICAgfHwgKGMgPj0gMHg0MSAmJiBjIDw9IDB4NUEpIC8vIGEtelxuICAgICAgICAgICAgfHwgKGMgPj0gMHg2MSAmJiBjIDw9IDB4N0EpIC8vIEEtWlxuICAgICAgICApIHtcbiAgICAgICAgICAgIG91dCArPSBzdHJpbmcuY2hhckF0KGkpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIGhleFRhYmxlW2NdO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhDMCB8IChjID4+IDYpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHhEODAwIHx8IGMgPj0gMHhFMDAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhFMCB8IChjID4+IDEyKV0gKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaSArPSAxO1xuICAgICAgICBjID0gMHgxMDAwMCArICgoKGMgJiAweDNGRikgPDwgMTApIHwgKHN0cmluZy5jaGFyQ29kZUF0KGkpICYgMHgzRkYpKTtcbiAgICAgICAgb3V0ICs9IGhleFRhYmxlWzB4RjAgfCAoYyA+PiAxOCldXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gMTIpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG52YXIgY29tcGFjdCA9IGZ1bmN0aW9uIGNvbXBhY3QodmFsdWUpIHtcbiAgICB2YXIgcXVldWUgPSBbeyBvYmo6IHsgbzogdmFsdWUgfSwgcHJvcDogJ28nIH1dO1xuICAgIHZhciByZWZzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWVbaV07XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tqXTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwgJiYgcmVmcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcXVldWUucHVzaCh7IG9iajogb2JqLCBwcm9wOiBrZXkgfSk7XG4gICAgICAgICAgICAgICAgcmVmcy5wdXNoKHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wYWN0UXVldWUocXVldWUpO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxudmFyIGlzUmVnRXhwID0gZnVuY3Rpb24gaXNSZWdFeHAob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBSZWdFeHBdJztcbn07XG5cbnZhciBpc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyKG9iaikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISEob2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKSk7XG59O1xuXG52YXIgY29tYmluZSA9IGZ1bmN0aW9uIGNvbWJpbmUoYSwgYikge1xuICAgIHJldHVybiBbXS5jb25jYXQoYSwgYik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhcnJheVRvT2JqZWN0OiBhcnJheVRvT2JqZWN0LFxuICAgIGFzc2lnbjogYXNzaWduLFxuICAgIGNvbWJpbmU6IGNvbWJpbmUsXG4gICAgY29tcGFjdDogY29tcGFjdCxcbiAgICBkZWNvZGU6IGRlY29kZSxcbiAgICBlbmNvZGU6IGVuY29kZSxcbiAgICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gICAgaXNSZWdFeHA6IGlzUmVnRXhwLFxuICAgIG1lcmdlOiBtZXJnZVxufTtcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ29weXJpZ2h0IChDKSBNaWNyb3NvZnQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cblxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xudmFyIFJlZmxlY3Q7XG4oZnVuY3Rpb24gKFJlZmxlY3QpIHtcbiAgICAvLyBNZXRhZGF0YSBQcm9wb3NhbFxuICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvXG4gICAgKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgICAgIHZhciByb290ID0gdHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIiA/IGdsb2JhbCA6XG4gICAgICAgICAgICB0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiA/IHNlbGYgOlxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzID09PSBcIm9iamVjdFwiID8gdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgIEZ1bmN0aW9uKFwicmV0dXJuIHRoaXM7XCIpKCk7XG4gICAgICAgIHZhciBleHBvcnRlciA9IG1ha2VFeHBvcnRlcihSZWZsZWN0KTtcbiAgICAgICAgaWYgKHR5cGVvZiByb290LlJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHJvb3QuUmVmbGVjdCA9IFJlZmxlY3Q7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBleHBvcnRlciA9IG1ha2VFeHBvcnRlcihyb290LlJlZmxlY3QsIGV4cG9ydGVyKTtcbiAgICAgICAgfVxuICAgICAgICBmYWN0b3J5KGV4cG9ydGVyKTtcbiAgICAgICAgZnVuY3Rpb24gbWFrZUV4cG9ydGVyKHRhcmdldCwgcHJldmlvdXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W2tleV0gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHsgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMpXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pKGZ1bmN0aW9uIChleHBvcnRlcikge1xuICAgICAgICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgICAgICAgLy8gZmVhdHVyZSB0ZXN0IGZvciBTeW1ib2wgc3VwcG9ydFxuICAgICAgICB2YXIgc3VwcG9ydHNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICAgIHZhciB0b1ByaW1pdGl2ZVN5bWJvbCA9IHN1cHBvcnRzU3ltYm9sICYmIHR5cGVvZiBTeW1ib2wudG9QcmltaXRpdmUgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wudG9QcmltaXRpdmUgOiBcIkBAdG9QcmltaXRpdmVcIjtcbiAgICAgICAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gc3VwcG9ydHNTeW1ib2wgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbC5pdGVyYXRvciA6IFwiQEBpdGVyYXRvclwiO1xuICAgICAgICB2YXIgc3VwcG9ydHNDcmVhdGUgPSB0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gXCJmdW5jdGlvblwiOyAvLyBmZWF0dXJlIHRlc3QgZm9yIE9iamVjdC5jcmVhdGUgc3VwcG9ydFxuICAgICAgICB2YXIgc3VwcG9ydHNQcm90byA9IHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXk7IC8vIGZlYXR1cmUgdGVzdCBmb3IgX19wcm90b19fIHN1cHBvcnRcbiAgICAgICAgdmFyIGRvd25MZXZlbCA9ICFzdXBwb3J0c0NyZWF0ZSAmJiAhc3VwcG9ydHNQcm90bztcbiAgICAgICAgdmFyIEhhc2hNYXAgPSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgYW4gb2JqZWN0IGluIGRpY3Rpb25hcnkgbW9kZSAoYS5rLmEuIFwic2xvd1wiIG1vZGUgaW4gdjgpXG4gICAgICAgICAgICBjcmVhdGU6IHN1cHBvcnRzQ3JlYXRlXG4gICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBNYWtlRGljdGlvbmFyeShPYmplY3QuY3JlYXRlKG51bGwpKTsgfVxuICAgICAgICAgICAgICAgIDogc3VwcG9ydHNQcm90b1xuICAgICAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE1ha2VEaWN0aW9uYXJ5KHsgX19wcm90b19fOiBudWxsIH0pOyB9XG4gICAgICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKCkgeyByZXR1cm4gTWFrZURpY3Rpb25hcnkoe30pOyB9LFxuICAgICAgICAgICAgaGFzOiBkb3duTGV2ZWxcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uIChtYXAsIGtleSkgeyByZXR1cm4gaGFzT3duLmNhbGwobWFwLCBrZXkpOyB9XG4gICAgICAgICAgICAgICAgOiBmdW5jdGlvbiAobWFwLCBrZXkpIHsgcmV0dXJuIGtleSBpbiBtYXA7IH0sXG4gICAgICAgICAgICBnZXQ6IGRvd25MZXZlbFxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24gKG1hcCwga2V5KSB7IHJldHVybiBoYXNPd24uY2FsbChtYXAsIGtleSkgPyBtYXBba2V5XSA6IHVuZGVmaW5lZDsgfVxuICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKG1hcCwga2V5KSB7IHJldHVybiBtYXBba2V5XTsgfSxcbiAgICAgICAgfTtcbiAgICAgICAgLy8gTG9hZCBnbG9iYWwgb3Igc2hpbSB2ZXJzaW9ucyBvZiBNYXAsIFNldCwgYW5kIFdlYWtNYXBcbiAgICAgICAgdmFyIGZ1bmN0aW9uUHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKEZ1bmN0aW9uKTtcbiAgICAgICAgdmFyIHVzZVBvbHlmaWxsID0gdHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnZbXCJSRUZMRUNUX01FVEFEQVRBX1VTRV9NQVBfUE9MWUZJTExcIl0gPT09IFwidHJ1ZVwiO1xuICAgICAgICB2YXIgX01hcCA9ICF1c2VQb2x5ZmlsbCAmJiB0eXBlb2YgTWFwID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIE1hcC5wcm90b3R5cGUuZW50cmllcyA9PT0gXCJmdW5jdGlvblwiID8gTWFwIDogQ3JlYXRlTWFwUG9seWZpbGwoKTtcbiAgICAgICAgdmFyIF9TZXQgPSAhdXNlUG9seWZpbGwgJiYgdHlwZW9mIFNldCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTZXQucHJvdG90eXBlLmVudHJpZXMgPT09IFwiZnVuY3Rpb25cIiA/IFNldCA6IENyZWF0ZVNldFBvbHlmaWxsKCk7XG4gICAgICAgIHZhciBfV2Vha01hcCA9ICF1c2VQb2x5ZmlsbCAmJiB0eXBlb2YgV2Vha01hcCA9PT0gXCJmdW5jdGlvblwiID8gV2Vha01hcCA6IENyZWF0ZVdlYWtNYXBQb2x5ZmlsbCgpO1xuICAgICAgICAvLyBbW01ldGFkYXRhXV0gaW50ZXJuYWwgc2xvdFxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeS1vYmplY3QtaW50ZXJuYWwtbWV0aG9kcy1hbmQtaW50ZXJuYWwtc2xvdHNcbiAgICAgICAgdmFyIE1ldGFkYXRhID0gbmV3IF9XZWFrTWFwKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVzIGEgc2V0IG9mIGRlY29yYXRvcnMgdG8gYSBwcm9wZXJ0eSBvZiBhIHRhcmdldCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSBkZWNvcmF0b3JzIEFuIGFycmF5IG9mIGRlY29yYXRvcnMuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgdG8gZGVjb3JhdGUuXG4gICAgICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVzIChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGRlc2NyaXB0b3IgZm9yIHRoZSB0YXJnZXQga2V5LlxuICAgICAgICAgKiBAcmVtYXJrcyBEZWNvcmF0b3JzIGFyZSBhcHBsaWVkIGluIHJldmVyc2Ugb3JkZXIuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIEV4YW1wbGUgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIsXG4gICAgICAgICAqICAgICAgICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIsXG4gICAgICAgICAqICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIikpKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiLFxuICAgICAgICAgKiAgICAgICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9yc0FycmF5LCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIixcbiAgICAgICAgICogICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIikpKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFJc0FycmF5KGRlY29yYXRvcnMpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChhdHRyaWJ1dGVzKSAmJiAhSXNVbmRlZmluZWQoYXR0cmlidXRlcykgJiYgIUlzTnVsbChhdHRyaWJ1dGVzKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmIChJc051bGwoYXR0cmlidXRlcykpXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGVjb3JhdGVQcm9wZXJ0eShkZWNvcmF0b3JzLCB0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghSXNBcnJheShkZWNvcmF0b3JzKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmICghSXNDb25zdHJ1Y3Rvcih0YXJnZXQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERlY29yYXRlQ29uc3RydWN0b3IoZGVjb3JhdG9ycywgdGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImRlY29yYXRlXCIsIGRlY29yYXRlKTtcbiAgICAgICAgLy8gNC4xLjIgUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSlcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jcmVmbGVjdC5tZXRhZGF0YVxuICAgICAgICAvKipcbiAgICAgICAgICogQSBkZWZhdWx0IG1ldGFkYXRhIGRlY29yYXRvciBmYWN0b3J5IHRoYXQgY2FuIGJlIHVzZWQgb24gYSBjbGFzcywgY2xhc3MgbWVtYmVyLCBvciBwYXJhbWV0ZXIuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBUaGUga2V5IGZvciB0aGUgbWV0YWRhdGEgZW50cnkuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YVZhbHVlIFRoZSB2YWx1ZSBmb3IgdGhlIG1ldGFkYXRhIGVudHJ5LlxuICAgICAgICAgKiBAcmV0dXJucyBBIGRlY29yYXRvciBmdW5jdGlvbi5cbiAgICAgICAgICogQHJlbWFya3NcbiAgICAgICAgICogSWYgYG1ldGFkYXRhS2V5YCBpcyBhbHJlYWR5IGRlZmluZWQgZm9yIHRoZSB0YXJnZXQgYW5kIHRhcmdldCBrZXksIHRoZVxuICAgICAgICAgKiBtZXRhZGF0YVZhbHVlIGZvciB0aGF0IGtleSB3aWxsIGJlIG92ZXJ3cml0dGVuLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvciwgVHlwZVNjcmlwdCBvbmx5KVxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlLCBUeXBlU2NyaXB0IG9ubHkpXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxuICAgICAgICAgKiAgICAgICAgIHByb3BlcnR5O1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZCgpIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZCgpIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlY29yYXRvcih0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkgJiYgIUlzUHJvcGVydHlLZXkocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgT3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVjb3JhdG9yO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwibWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lIGEgdW5pcXVlIG1ldGFkYXRhIGVudHJ5IG9uIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhVmFsdWUgQSB2YWx1ZSB0aGF0IGNvbnRhaW5zIGF0dGFjaGVkIG1ldGFkYXRhLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRvIGRlZmluZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGRlY29yYXRvciBmYWN0b3J5IGFzIG1ldGFkYXRhLXByb2R1Y2luZyBhbm5vdGF0aW9uLlxuICAgICAgICAgKiAgICAgZnVuY3Rpb24gTXlBbm5vdGF0aW9uKG9wdGlvbnMpOiBEZWNvcmF0b3Ige1xuICAgICAgICAgKiAgICAgICAgIHJldHVybiAodGFyZ2V0LCBrZXk/KSA9PiBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgdGFyZ2V0LCBrZXkpO1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZGVmaW5lTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiZGVmaW5lTWV0YWRhdGFcIiwgZGVmaW5lTWV0YWRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluIGhhcyB0aGUgcHJvdmlkZWQgbWV0YWRhdGEga2V5IGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZSBtZXRhZGF0YSBrZXkgd2FzIGRlZmluZWQgb24gdGhlIHRhcmdldCBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbjsgb3RoZXJ3aXNlLCBgZmFsc2VgLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gaGFzTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5SGFzTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiaGFzTWV0YWRhdGFcIiwgaGFzTWV0YWRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdGFyZ2V0IG9iamVjdCBoYXMgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgbWV0YWRhdGEga2V5IHdhcyBkZWZpbmVkIG9uIHRoZSB0YXJnZXQgb2JqZWN0OyBvdGhlcndpc2UsIGBmYWxzZWAuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBoYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlIYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJoYXNPd25NZXRhZGF0YVwiLCBoYXNPd25NZXRhZGF0YSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBvbiB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluLlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIG1ldGFkYXRhIGtleSBpZiBmb3VuZDsgb3RoZXJ3aXNlLCBgdW5kZWZpbmVkYC5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImdldE1ldGFkYXRhXCIsIGdldE1ldGFkYXRhKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIG1ldGFkYXRhIHZhbHVlIGZvciB0aGUgcHJvdmlkZWQgbWV0YWRhdGEga2V5IG9uIHRoZSB0YXJnZXQgb2JqZWN0LlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIG1ldGFkYXRhIGtleSBpZiBmb3VuZDsgb3RoZXJ3aXNlLCBgdW5kZWZpbmVkYC5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImdldE93bk1ldGFkYXRhXCIsIGdldE93bk1ldGFkYXRhKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIG1ldGFkYXRhIGtleXMgZGVmaW5lZCBvbiB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcmV0dXJucyBBbiBhcnJheSBvZiB1bmlxdWUgbWV0YWRhdGEga2V5cy5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRNZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlNZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJnZXRNZXRhZGF0YUtleXNcIiwgZ2V0TWV0YWRhdGFLZXlzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHVuaXF1ZSBtZXRhZGF0YSBrZXlzIGRlZmluZWQgb24gdGhlIHRhcmdldCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHVuaXF1ZSBtZXRhZGF0YSBrZXlzLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldE93bk1ldGFkYXRhS2V5cyh0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyh0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImdldE93bk1ldGFkYXRhS2V5c1wiLCBnZXRPd25NZXRhZGF0YUtleXMpO1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVsZXRlcyB0aGUgbWV0YWRhdGEgZW50cnkgZnJvbSB0aGUgdGFyZ2V0IG9iamVjdCB3aXRoIHRoZSBwcm92aWRlZCBrZXkuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZSBtZXRhZGF0YSBlbnRyeSB3YXMgZm91bmQgYW5kIGRlbGV0ZWQ7IG90aGVyd2lzZSwgZmFsc2UuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBkZWxldGVNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKHRhcmdldCwgcHJvcGVydHlLZXksIC8qQ3JlYXRlKi8gZmFsc2UpO1xuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIW1ldGFkYXRhTWFwLmRlbGV0ZShtZXRhZGF0YUtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKG1ldGFkYXRhTWFwLnNpemUgPiAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgdmFyIHRhcmdldE1ldGFkYXRhID0gTWV0YWRhdGEuZ2V0KHRhcmdldCk7XG4gICAgICAgICAgICB0YXJnZXRNZXRhZGF0YS5kZWxldGUocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgaWYgKHRhcmdldE1ldGFkYXRhLnNpemUgPiAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgTWV0YWRhdGEuZGVsZXRlKHRhcmdldCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImRlbGV0ZU1ldGFkYXRhXCIsIGRlbGV0ZU1ldGFkYXRhKTtcbiAgICAgICAgZnVuY3Rpb24gRGVjb3JhdGVDb25zdHJ1Y3RvcihkZWNvcmF0b3JzLCB0YXJnZXQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRvciA9IGRlY29yYXRvcnNbaV07XG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRlZCA9IGRlY29yYXRvcih0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQoZGVjb3JhdGVkKSAmJiAhSXNOdWxsKGRlY29yYXRlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc0NvbnN0cnVjdG9yKGRlY29yYXRlZCkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGRlY29yYXRlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIERlY29yYXRlUHJvcGVydHkoZGVjb3JhdG9ycywgdGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVjb3JhdG9yID0gZGVjb3JhdG9yc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgZGVjb3JhdGVkID0gZGVjb3JhdG9yKHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQoZGVjb3JhdGVkKSAmJiAhSXNOdWxsKGRlY29yYXRlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChkZWNvcmF0ZWQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdG9yID0gZGVjb3JhdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgQ3JlYXRlKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0TWV0YWRhdGEgPSBNZXRhZGF0YS5nZXQoTyk7XG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQodGFyZ2V0TWV0YWRhdGEpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFDcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGFyZ2V0TWV0YWRhdGEgPSBuZXcgX01hcCgpO1xuICAgICAgICAgICAgICAgIE1ldGFkYXRhLnNldChPLCB0YXJnZXRNZXRhZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSB0YXJnZXRNZXRhZGF0YS5nZXQoUCk7XG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFDcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGFNYXAgPSBuZXcgX01hcCgpO1xuICAgICAgICAgICAgICAgIHRhcmdldE1ldGFkYXRhLnNldChQLCBtZXRhZGF0YU1hcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWV0YWRhdGFNYXA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjEuMSBPcmRpbmFyeUhhc01ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWhhc21ldGFkYXRhXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5SGFzTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcbiAgICAgICAgICAgIHZhciBoYXNPd24gPSBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcbiAgICAgICAgICAgIGlmIChoYXNPd24pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKTtcbiAgICAgICAgICAgIGlmICghSXNOdWxsKHBhcmVudCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5SGFzTWV0YWRhdGEoTWV0YWRhdGFLZXksIHBhcmVudCwgUCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjIuMSBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWhhc293bm1ldGFkYXRhXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5SGFzT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgLypDcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBUb0Jvb2xlYW4obWV0YWRhdGFNYXAuaGFzKE1ldGFkYXRhS2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjMuMSBPcmRpbmFyeUdldE1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWdldG1ldGFkYXRhXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5R2V0TWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcbiAgICAgICAgICAgIHZhciBoYXNPd24gPSBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcbiAgICAgICAgICAgIGlmIChoYXNPd24pXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5R2V0T3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApO1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTyk7XG4gICAgICAgICAgICBpZiAoIUlzTnVsbChwYXJlbnQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE1ldGFkYXRhKE1ldGFkYXRhS2V5LCBwYXJlbnQsIFApO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyAzLjEuNC4xIE9yZGluYXJ5R2V0T3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5Z2V0b3dubWV0YWRhdGFcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlHZXRPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCkge1xuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCAvKkNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBtZXRhZGF0YU1hcC5nZXQoTWV0YWRhdGFLZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS41LjEgT3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTWV0YWRhdGFWYWx1ZSwgTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnlkZWZpbmVvd25tZXRhZGF0YVxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBNZXRhZGF0YVZhbHVlLCBPLCBQKSB7XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIC8qQ3JlYXRlKi8gdHJ1ZSk7XG4gICAgICAgICAgICBtZXRhZGF0YU1hcC5zZXQoTWV0YWRhdGFLZXksIE1ldGFkYXRhVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS42LjEgT3JkaW5hcnlNZXRhZGF0YUtleXMoTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnltZXRhZGF0YWtleXNcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlNZXRhZGF0YUtleXMoTywgUCkge1xuICAgICAgICAgICAgdmFyIG93bktleXMgPSBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyhPLCBQKTtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pO1xuICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3duS2V5cztcbiAgICAgICAgICAgIHZhciBwYXJlbnRLZXlzID0gT3JkaW5hcnlNZXRhZGF0YUtleXMocGFyZW50LCBQKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRLZXlzLmxlbmd0aCA8PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBvd25LZXlzO1xuICAgICAgICAgICAgaWYgKG93bktleXMubGVuZ3RoIDw9IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudEtleXM7XG4gICAgICAgICAgICB2YXIgc2V0ID0gbmV3IF9TZXQoKTtcbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIG93bktleXNfMSA9IG93bktleXM7IF9pIDwgb3duS2V5c18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBvd25LZXlzXzFbX2ldO1xuICAgICAgICAgICAgICAgIHZhciBoYXNLZXkgPSBzZXQuaGFzKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0LmFkZChrZXkpO1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBfYSA9IDAsIHBhcmVudEtleXNfMSA9IHBhcmVudEtleXM7IF9hIDwgcGFyZW50S2V5c18xLmxlbmd0aDsgX2ErKykge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBwYXJlbnRLZXlzXzFbX2FdO1xuICAgICAgICAgICAgICAgIHZhciBoYXNLZXkgPSBzZXQuaGFzKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0LmFkZChrZXkpO1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgfVxuICAgICAgICAvLyAzLjEuNy4xIE9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKE8sIFApXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5b3dubWV0YWRhdGFrZXlzXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKE8sIFApIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIC8qQ3JlYXRlKi8gZmFsc2UpO1xuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSlcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgICAgIHZhciBrZXlzT2JqID0gbWV0YWRhdGFNYXAua2V5cygpO1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gR2V0SXRlcmF0b3Ioa2V5c09iaik7XG4gICAgICAgICAgICB2YXIgayA9IDA7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gSXRlcmF0b3JTdGVwKGl0ZXJhdG9yKTtcbiAgICAgICAgICAgICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cy5sZW5ndGggPSBrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG5leHRWYWx1ZSA9IEl0ZXJhdG9yVmFsdWUobmV4dCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAga2V5c1trXSA9IG5leHRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gNiBFQ01BU2NyaXB0IERhdGEgVHlwMGVzIGFuZCBWYWx1ZXNcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1kYXRhLXR5cGVzLWFuZC12YWx1ZXNcbiAgICAgICAgZnVuY3Rpb24gVHlwZSh4KSB7XG4gICAgICAgICAgICBpZiAoeCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAvKiBOdWxsICovO1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgeCkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjogcmV0dXJuIDAgLyogVW5kZWZpbmVkICovO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiAyIC8qIEJvb2xlYW4gKi87XG4gICAgICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gMyAvKiBTdHJpbmcgKi87XG4gICAgICAgICAgICAgICAgY2FzZSBcInN5bWJvbFwiOiByZXR1cm4gNCAvKiBTeW1ib2wgKi87XG4gICAgICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gNSAvKiBOdW1iZXIgKi87XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOiByZXR1cm4geCA9PT0gbnVsbCA/IDEgLyogTnVsbCAqLyA6IDYgLyogT2JqZWN0ICovO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiA2IC8qIE9iamVjdCAqLztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyA2LjEuMSBUaGUgVW5kZWZpbmVkIFR5cGVcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcy11bmRlZmluZWQtdHlwZVxuICAgICAgICBmdW5jdGlvbiBJc1VuZGVmaW5lZCh4KSB7XG4gICAgICAgICAgICByZXR1cm4geCA9PT0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIDYuMS4yIFRoZSBOdWxsIFR5cGVcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcy1udWxsLXR5cGVcbiAgICAgICAgZnVuY3Rpb24gSXNOdWxsKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB4ID09PSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIDYuMS41IFRoZSBTeW1ib2wgVHlwZVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzLXN5bWJvbC10eXBlXG4gICAgICAgIGZ1bmN0aW9uIElzU3ltYm9sKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyA2LjEuNyBUaGUgT2JqZWN0IFR5cGVcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LXR5cGVcbiAgICAgICAgZnVuY3Rpb24gSXNPYmplY3QoeCkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcIm9iamVjdFwiID8geCAhPT0gbnVsbCA6IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4xIFR5cGUgQ29udmVyc2lvblxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10eXBlLWNvbnZlcnNpb25cbiAgICAgICAgLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4gICAgICAgIGZ1bmN0aW9uIFRvUHJpbWl0aXZlKGlucHV0LCBQcmVmZXJyZWRUeXBlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKFR5cGUoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwIC8qIFVuZGVmaW5lZCAqLzogcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgICAgIGNhc2UgMSAvKiBOdWxsICovOiByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICAgICAgY2FzZSAyIC8qIEJvb2xlYW4gKi86IHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgICAgICBjYXNlIDMgLyogU3RyaW5nICovOiByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICAgICAgY2FzZSA0IC8qIFN5bWJvbCAqLzogcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgICAgIGNhc2UgNSAvKiBOdW1iZXIgKi86IHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBoaW50ID0gUHJlZmVycmVkVHlwZSA9PT0gMyAvKiBTdHJpbmcgKi8gPyBcInN0cmluZ1wiIDogUHJlZmVycmVkVHlwZSA9PT0gNSAvKiBOdW1iZXIgKi8gPyBcIm51bWJlclwiIDogXCJkZWZhdWx0XCI7XG4gICAgICAgICAgICB2YXIgZXhvdGljVG9QcmltID0gR2V0TWV0aG9kKGlucHV0LCB0b1ByaW1pdGl2ZVN5bWJvbCk7XG4gICAgICAgICAgICBpZiAoZXhvdGljVG9QcmltICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZXhvdGljVG9QcmltLmNhbGwoaW5wdXQsIGhpbnQpO1xuICAgICAgICAgICAgICAgIGlmIChJc09iamVjdChyZXN1bHQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeVRvUHJpbWl0aXZlKGlucHV0LCBoaW50ID09PSBcImRlZmF1bHRcIiA/IFwibnVtYmVyXCIgOiBoaW50KTtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjEuMS4xIE9yZGluYXJ5VG9QcmltaXRpdmUoTywgaGludClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3JkaW5hcnl0b3ByaW1pdGl2ZVxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeVRvUHJpbWl0aXZlKE8sIGhpbnQpIHtcbiAgICAgICAgICAgIGlmIChoaW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvU3RyaW5nXzEgPSBPLnRvU3RyaW5nO1xuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHRvU3RyaW5nXzEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0b1N0cmluZ18xLmNhbGwoTyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZU9mID0gTy52YWx1ZU9mO1xuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHZhbHVlT2YpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB2YWx1ZU9mLmNhbGwoTyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlT2YgPSBPLnZhbHVlT2Y7XG4gICAgICAgICAgICAgICAgaWYgKElzQ2FsbGFibGUodmFsdWVPZikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZhbHVlT2YuY2FsbChPKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChyZXN1bHQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRvU3RyaW5nXzIgPSBPLnRvU3RyaW5nO1xuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHRvU3RyaW5nXzIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0b1N0cmluZ18yLmNhbGwoTyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMS4yIFRvQm9vbGVhbihhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLzIwMTYvI3NlYy10b2Jvb2xlYW5cbiAgICAgICAgZnVuY3Rpb24gVG9Cb29sZWFuKGFyZ3VtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gISFhcmd1bWVudDtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjEuMTIgVG9TdHJpbmcoYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvc3RyaW5nXG4gICAgICAgIGZ1bmN0aW9uIFRvU3RyaW5nKGFyZ3VtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIiArIGFyZ3VtZW50O1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMS4xNCBUb1Byb3BlcnR5S2V5KGFyZ3VtZW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b3Byb3BlcnR5a2V5XG4gICAgICAgIGZ1bmN0aW9uIFRvUHJvcGVydHlLZXkoYXJndW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBUb1ByaW1pdGl2ZShhcmd1bWVudCwgMyAvKiBTdHJpbmcgKi8pO1xuICAgICAgICAgICAgaWYgKElzU3ltYm9sKGtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIHJldHVybiBUb1N0cmluZyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMiBUZXN0aW5nIGFuZCBDb21wYXJpc29uIE9wZXJhdGlvbnNcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdGVzdGluZy1hbmQtY29tcGFyaXNvbi1vcGVyYXRpb25zXG4gICAgICAgIC8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlzYXJyYXlcbiAgICAgICAgZnVuY3Rpb24gSXNBcnJheShhcmd1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXlcbiAgICAgICAgICAgICAgICA/IEFycmF5LmlzQXJyYXkoYXJndW1lbnQpXG4gICAgICAgICAgICAgICAgOiBhcmd1bWVudCBpbnN0YW5jZW9mIE9iamVjdFxuICAgICAgICAgICAgICAgICAgICA/IGFyZ3VtZW50IGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4yLjMgSXNDYWxsYWJsZShhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNjYWxsYWJsZVxuICAgICAgICBmdW5jdGlvbiBJc0NhbGxhYmxlKGFyZ3VtZW50KSB7XG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGFuIGFwcHJveGltYXRpb24gYXMgd2UgY2Fubm90IGNoZWNrIGZvciBbW0NhbGxdXSBpbnRlcm5hbCBtZXRob2QuXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4yLjQgSXNDb25zdHJ1Y3Rvcihhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNjb25zdHJ1Y3RvclxuICAgICAgICBmdW5jdGlvbiBJc0NvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGFuIGFwcHJveGltYXRpb24gYXMgd2UgY2Fubm90IGNoZWNrIGZvciBbW0NvbnN0cnVjdF1dIGludGVybmFsIG1ldGhvZC5cbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT09IFwiZnVuY3Rpb25cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjIuNyBJc1Byb3BlcnR5S2V5KGFyZ3VtZW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pc3Byb3BlcnR5a2V5XG4gICAgICAgIGZ1bmN0aW9uIElzUHJvcGVydHlLZXkoYXJndW1lbnQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoVHlwZShhcmd1bWVudCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDMgLyogU3RyaW5nICovOiByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDQgLyogU3ltYm9sICovOiByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4zIE9wZXJhdGlvbnMgb24gT2JqZWN0c1xuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcGVyYXRpb25zLW9uLW9iamVjdHNcbiAgICAgICAgLy8gNy4zLjkgR2V0TWV0aG9kKFYsIFApXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWdldG1ldGhvZFxuICAgICAgICBmdW5jdGlvbiBHZXRNZXRob2QoViwgUCkge1xuICAgICAgICAgICAgdmFyIGZ1bmMgPSBWW1BdO1xuICAgICAgICAgICAgaWYgKGZ1bmMgPT09IHVuZGVmaW5lZCB8fCBmdW5jID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoIUlzQ2FsbGFibGUoZnVuYykpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy40IE9wZXJhdGlvbnMgb24gSXRlcmF0b3IgT2JqZWN0c1xuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcGVyYXRpb25zLW9uLWl0ZXJhdG9yLW9iamVjdHNcbiAgICAgICAgZnVuY3Rpb24gR2V0SXRlcmF0b3Iob2JqKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gR2V0TWV0aG9kKG9iaiwgaXRlcmF0b3JTeW1ib2wpO1xuICAgICAgICAgICAgaWYgKCFJc0NhbGxhYmxlKG1ldGhvZCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpOyAvLyBmcm9tIENhbGxcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG1ldGhvZC5jYWxsKG9iaik7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KGl0ZXJhdG9yKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy40LjQgSXRlcmF0b3JWYWx1ZShpdGVyUmVzdWx0KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvMjAxNi8jc2VjLWl0ZXJhdG9ydmFsdWVcbiAgICAgICAgZnVuY3Rpb24gSXRlcmF0b3JWYWx1ZShpdGVyUmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlclJlc3VsdC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjQuNSBJdGVyYXRvclN0ZXAoaXRlcmF0b3IpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWl0ZXJhdG9yc3RlcFxuICAgICAgICBmdW5jdGlvbiBJdGVyYXRvclN0ZXAoaXRlcmF0b3IpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyBmYWxzZSA6IHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pdGVyYXRvcmNsb3NlXG4gICAgICAgIGZ1bmN0aW9uIEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IpIHtcbiAgICAgICAgICAgIHZhciBmID0gaXRlcmF0b3JbXCJyZXR1cm5cIl07XG4gICAgICAgICAgICBpZiAoZilcbiAgICAgICAgICAgICAgICBmLmNhbGwoaXRlcmF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDkuMSBPcmRpbmFyeSBPYmplY3QgSW50ZXJuYWwgTWV0aG9kcyBhbmQgSW50ZXJuYWwgU2xvdHNcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3JkaW5hcnktb2JqZWN0LWludGVybmFsLW1ldGhvZHMtYW5kLWludGVybmFsLXNsb3RzXG4gICAgICAgIC8vIDkuMS4xLjEgT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcmRpbmFyeWdldHByb3RvdHlwZW9mXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTykge1xuICAgICAgICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBPICE9PSBcImZ1bmN0aW9uXCIgfHwgTyA9PT0gZnVuY3Rpb25Qcm90b3R5cGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCBkb2Vzbid0IHNldCBfX3Byb3RvX18gaW4gRVM1LCBhcyBpdCdzIG5vbi1zdGFuZGFyZC5cbiAgICAgICAgICAgIC8vIFRyeSB0byBkZXRlcm1pbmUgdGhlIHN1cGVyY2xhc3MgY29uc3RydWN0b3IuIENvbXBhdGlibGUgaW1wbGVtZW50YXRpb25zXG4gICAgICAgICAgICAvLyBtdXN0IGVpdGhlciBzZXQgX19wcm90b19fIG9uIGEgc3ViY2xhc3MgY29uc3RydWN0b3IgdG8gdGhlIHN1cGVyY2xhc3MgY29uc3RydWN0b3IsXG4gICAgICAgICAgICAvLyBvciBlbnN1cmUgZWFjaCBjbGFzcyBoYXMgYSB2YWxpZCBgY29uc3RydWN0b3JgIHByb3BlcnR5IG9uIGl0cyBwcm90b3R5cGUgdGhhdFxuICAgICAgICAgICAgLy8gcG9pbnRzIGJhY2sgdG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBub3QgdGhlIHNhbWUgYXMgRnVuY3Rpb24uW1tQcm90b3R5cGVdXSwgdGhlbiB0aGlzIGlzIGRlZmluYXRlbHkgaW5oZXJpdGVkLlxuICAgICAgICAgICAgLy8gVGhpcyBpcyB0aGUgY2FzZSB3aGVuIGluIEVTNiBvciB3aGVuIHVzaW5nIF9fcHJvdG9fXyBpbiBhIGNvbXBhdGlibGUgYnJvd3Nlci5cbiAgICAgICAgICAgIGlmIChwcm90byAhPT0gZnVuY3Rpb25Qcm90b3R5cGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gSWYgdGhlIHN1cGVyIHByb3RvdHlwZSBpcyBPYmplY3QucHJvdG90eXBlLCBudWxsLCBvciB1bmRlZmluZWQsIHRoZW4gd2UgY2Fubm90IGRldGVybWluZSB0aGUgaGVyaXRhZ2UuXG4gICAgICAgICAgICB2YXIgcHJvdG90eXBlID0gTy5wcm90b3R5cGU7XG4gICAgICAgICAgICB2YXIgcHJvdG90eXBlUHJvdG8gPSBwcm90b3R5cGUgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSk7XG4gICAgICAgICAgICBpZiAocHJvdG90eXBlUHJvdG8gPT0gbnVsbCB8fCBwcm90b3R5cGVQcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdG87XG4gICAgICAgICAgICAvLyBJZiB0aGUgY29uc3RydWN0b3Igd2FzIG5vdCBhIGZ1bmN0aW9uLCB0aGVuIHdlIGNhbm5vdCBkZXRlcm1pbmUgdGhlIGhlcml0YWdlLlxuICAgICAgICAgICAgdmFyIGNvbnN0cnVjdG9yID0gcHJvdG90eXBlUHJvdG8uY29uc3RydWN0b3I7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnN0cnVjdG9yICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBzb21lIGtpbmQgb2Ygc2VsZi1yZWZlcmVuY2UsIHRoZW4gd2UgY2Fubm90IGRldGVybWluZSB0aGUgaGVyaXRhZ2UuXG4gICAgICAgICAgICBpZiAoY29uc3RydWN0b3IgPT09IE8pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHByZXR0eSBnb29kIGd1ZXNzIGF0IHRoZSBoZXJpdGFnZS5cbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3RvcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBuYWl2ZSBNYXAgc2hpbVxuICAgICAgICBmdW5jdGlvbiBDcmVhdGVNYXBQb2x5ZmlsbCgpIHtcbiAgICAgICAgICAgIHZhciBjYWNoZVNlbnRpbmVsID0ge307XG4gICAgICAgICAgICB2YXIgYXJyYXlTZW50aW5lbCA9IFtdO1xuICAgICAgICAgICAgdmFyIE1hcEl0ZXJhdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIE1hcEl0ZXJhdG9yKGtleXMsIHZhbHVlcywgc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0ga2V5cztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGVbXCJAQGl0ZXJhdG9yXCJdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5faW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5fa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9zZWxlY3Rvcih0aGlzLl9rZXlzW2luZGV4XSwgdGhpcy5fdmFsdWVzW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggKyAxID49IHRoaXMuX2tleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0gYXJyYXlTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBhcnJheVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiByZXN1bHQsIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlLnRocm93ID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IGFycmF5U2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBhcnJheVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlLnJldHVybiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBhcnJheVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gYXJyYXlTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6IHRydWUgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXBJdGVyYXRvcjtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIE1hcCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVLZXkgPSBjYWNoZVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gLTI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNYXAucHJvdG90eXBlLCBcInNpemVcIiwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2tleXMubGVuZ3RoOyB9LFxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHRoaXMuX2ZpbmQoa2V5LCAvKmluc2VydCovIGZhbHNlKSA+PSAwOyB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9maW5kKGtleSwgLyppbnNlcnQqLyBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCA+PSAwID8gdGhpcy5fdmFsdWVzW2luZGV4XSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZChrZXksIC8qaW5zZXJ0Ki8gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZChrZXksIC8qaW5zZXJ0Ki8gZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNpemUgPSB0aGlzLl9rZXlzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBpbmRleCArIDE7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzW2kgLSAxXSA9IHRoaXMuX2tleXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzW2kgLSAxXSA9IHRoaXMuX3ZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMubGVuZ3RoLS07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMubGVuZ3RoLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSB0aGlzLl9jYWNoZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlS2V5ID0gY2FjaGVTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gLTI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUtleSA9IGNhY2hlU2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlSW5kZXggPSAtMjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNYXBJdGVyYXRvcih0aGlzLl9rZXlzLCB0aGlzLl92YWx1ZXMsIGdldEtleSk7IH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTWFwSXRlcmF0b3IodGhpcy5fa2V5cywgdGhpcy5fdmFsdWVzLCBnZXRWYWx1ZSk7IH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE1hcEl0ZXJhdG9yKHRoaXMuX2tleXMsIHRoaXMuX3ZhbHVlcywgZ2V0RW50cnkpOyB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGVbXCJAQGl0ZXJhdG9yXCJdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzKCk7IH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmVudHJpZXMoKTsgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLl9maW5kID0gZnVuY3Rpb24gKGtleSwgaW5zZXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYWNoZUtleSAhPT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gdGhpcy5fa2V5cy5pbmRleE9mKHRoaXMuX2NhY2hlS2V5ID0ga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FjaGVJbmRleCA8IDAgJiYgaW5zZXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gdGhpcy5fa2V5cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlSW5kZXg7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWFwO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEtleShrZXksIF8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VmFsdWUoXywgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRFbnRyeShrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBuYWl2ZSBTZXQgc2hpbVxuICAgICAgICBmdW5jdGlvbiBDcmVhdGVTZXRQb2x5ZmlsbCgpIHtcbiAgICAgICAgICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gU2V0KCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXAgPSBuZXcgX01hcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2V0LnByb3RvdHlwZSwgXCJzaXplXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYXAuc2l6ZTsgfSxcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHRoaXMuX21hcC5oYXModmFsdWUpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0aGlzLl9tYXAuc2V0KHZhbHVlLCB2YWx1ZSksIHRoaXM7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHRoaXMuX21hcC5kZWxldGUodmFsdWUpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7IHRoaXMuX21hcC5jbGVhcigpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hcC5rZXlzKCk7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYXAudmFsdWVzKCk7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLmVudHJpZXMoKTsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlW1wiQEBpdGVyYXRvclwiXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMua2V5cygpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5rZXlzKCk7IH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNldDtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmFpdmUgV2Vha01hcCBzaGltXG4gICAgICAgIGZ1bmN0aW9uIENyZWF0ZVdlYWtNYXBQb2x5ZmlsbCgpIHtcbiAgICAgICAgICAgIHZhciBVVUlEX1NJWkUgPSAxNjtcbiAgICAgICAgICAgIHZhciBrZXlzID0gSGFzaE1hcC5jcmVhdGUoKTtcbiAgICAgICAgICAgIHZhciByb290S2V5ID0gQ3JlYXRlVW5pcXVlS2V5KCk7XG4gICAgICAgICAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFdlYWtNYXAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleSA9IENyZWF0ZVVuaXF1ZUtleSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZSAhPT0gdW5kZWZpbmVkID8gSGFzaE1hcC5oYXModGFibGUsIHRoaXMuX2tleSkgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCAvKmNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlICE9PSB1bmRlZmluZWQgPyBIYXNoTWFwLmdldCh0YWJsZSwgdGhpcy5fa2V5KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVbdGhpcy5fa2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCAvKmNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlICE9PSB1bmRlZmluZWQgPyBkZWxldGUgdGFibGVbdGhpcy5fa2V5XSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IG5vdCBhIHJlYWwgY2xlYXIsIGp1c3QgbWFrZXMgdGhlIHByZXZpb3VzIGRhdGEgdW5yZWFjaGFibGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5ID0gQ3JlYXRlVW5pcXVlS2V5KCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gV2Vha01hcDtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBDcmVhdGVVbmlxdWVLZXkoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgICAgICBkb1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBcIkBAV2Vha01hcEBAXCIgKyBDcmVhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKEhhc2hNYXAuaGFzKGtleXMsIGtleSkpO1xuICAgICAgICAgICAgICAgIGtleXNba2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgY3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNPd24uY2FsbCh0YXJnZXQsIHJvb3RLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcm9vdEtleSwgeyB2YWx1ZTogSGFzaE1hcC5jcmVhdGUoKSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtyb290S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIEZpbGxSYW5kb21CeXRlcyhidWZmZXIsIHNpemUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSlcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyW2ldID0gTWF0aC5yYW5kb20oKSAqIDB4ZmYgfCAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBHZW5SYW5kb21CeXRlcyhzaXplKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBVaW50OEFycmF5ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8gIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbXNDcnlwdG8gIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZpbGxSYW5kb21CeXRlcyhuZXcgVWludDhBcnJheShzaXplKSwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBGaWxsUmFuZG9tQnl0ZXMobmV3IEFycmF5KHNpemUpLCBzaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIENyZWF0ZVVVSUQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBHZW5SYW5kb21CeXRlcyhVVUlEX1NJWkUpO1xuICAgICAgICAgICAgICAgIC8vIG1hcmsgYXMgcmFuZG9tIC0gUkZDIDQxMjIgwqcgNC40XG4gICAgICAgICAgICAgICAgZGF0YVs2XSA9IGRhdGFbNl0gJiAweDRmIHwgMHg0MDtcbiAgICAgICAgICAgICAgICBkYXRhWzhdID0gZGF0YVs4XSAmIDB4YmYgfCAweDgwO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG9mZnNldCA9IDA7IG9mZnNldCA8IFVVSURfU0laRTsgKytvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ5dGUgPSBkYXRhW29mZnNldF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPT09IDQgfHwgb2Zmc2V0ID09PSA2IHx8IG9mZnNldCA9PT0gOClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIi1cIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ5dGUgPCAxNilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGJ5dGUudG9TdHJpbmcoMTYpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXNlcyBhIGhldXJpc3RpYyB1c2VkIGJ5IHY4IGFuZCBjaGFrcmEgdG8gZm9yY2UgYW4gb2JqZWN0IGludG8gZGljdGlvbmFyeSBtb2RlLlxuICAgICAgICBmdW5jdGlvbiBNYWtlRGljdGlvbmFyeShvYmopIHtcbiAgICAgICAgICAgIG9iai5fXyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmouX187XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgfSk7XG59KShSZWZsZWN0IHx8IChSZWZsZWN0ID0ge30pKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY21wIChhLCBiKSB7XG4gICAgdmFyIHBhID0gYS5zcGxpdCgnLicpO1xuICAgIHZhciBwYiA9IGIuc3BsaXQoJy4nKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICB2YXIgbmEgPSBOdW1iZXIocGFbaV0pO1xuICAgICAgICB2YXIgbmIgPSBOdW1iZXIocGJbaV0pO1xuICAgICAgICBpZiAobmEgPiBuYikgcmV0dXJuIDE7XG4gICAgICAgIGlmIChuYiA+IG5hKSByZXR1cm4gLTE7XG4gICAgICAgIGlmICghaXNOYU4obmEpICYmIGlzTmFOKG5iKSkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChpc05hTihuYSkgJiYgIWlzTmFOKG5iKSkgcmV0dXJuIC0xO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbn07XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBTZW1WZXJcblxudmFyIGRlYnVnXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JyAmJlxuICAgIHByb2Nlc3MuZW52ICYmXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyAmJlxuICAgIC9cXGJzZW12ZXJcXGIvaS50ZXN0KHByb2Nlc3MuZW52Lk5PREVfREVCVUcpKSB7XG4gIGRlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKVxuICAgIGFyZ3MudW5zaGlmdCgnU0VNVkVSJylcbiAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKVxuICB9XG59IGVsc2Uge1xuICBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHt9XG59XG5cbi8vIE5vdGU6IHRoaXMgaXMgdGhlIHNlbXZlci5vcmcgdmVyc2lvbiBvZiB0aGUgc3BlYyB0aGF0IGl0IGltcGxlbWVudHNcbi8vIE5vdCBuZWNlc3NhcmlseSB0aGUgcGFja2FnZSB2ZXJzaW9uIG9mIHRoaXMgY29kZS5cbmV4cG9ydHMuU0VNVkVSX1NQRUNfVkVSU0lPTiA9ICcyLjAuMCdcblxudmFyIE1BWF9MRU5HVEggPSAyNTZcbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHxcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gOTAwNzE5OTI1NDc0MDk5MVxuXG4vLyBNYXggc2FmZSBzZWdtZW50IGxlbmd0aCBmb3IgY29lcmNpb24uXG52YXIgTUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSCA9IDE2XG5cbi8vIFRoZSBhY3R1YWwgcmVnZXhwcyBnbyBvbiBleHBvcnRzLnJlXG52YXIgcmUgPSBleHBvcnRzLnJlID0gW11cbnZhciBzcmMgPSBleHBvcnRzLnNyYyA9IFtdXG52YXIgUiA9IDBcblxuLy8gVGhlIGZvbGxvd2luZyBSZWd1bGFyIEV4cHJlc3Npb25zIGNhbiBiZSB1c2VkIGZvciB0b2tlbml6aW5nLFxuLy8gdmFsaWRhdGluZywgYW5kIHBhcnNpbmcgU2VtVmVyIHZlcnNpb24gc3RyaW5ncy5cblxuLy8gIyMgTnVtZXJpYyBJZGVudGlmaWVyXG4vLyBBIHNpbmdsZSBgMGAsIG9yIGEgbm9uLXplcm8gZGlnaXQgZm9sbG93ZWQgYnkgemVybyBvciBtb3JlIGRpZ2l0cy5cblxudmFyIE5VTUVSSUNJREVOVElGSUVSID0gUisrXG5zcmNbTlVNRVJJQ0lERU5USUZJRVJdID0gJzB8WzEtOV1cXFxcZConXG52YXIgTlVNRVJJQ0lERU5USUZJRVJMT09TRSA9IFIrK1xuc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdID0gJ1swLTldKydcblxuLy8gIyMgTm9uLW51bWVyaWMgSWRlbnRpZmllclxuLy8gWmVybyBvciBtb3JlIGRpZ2l0cywgZm9sbG93ZWQgYnkgYSBsZXR0ZXIgb3IgaHlwaGVuLCBhbmQgdGhlbiB6ZXJvIG9yXG4vLyBtb3JlIGxldHRlcnMsIGRpZ2l0cywgb3IgaHlwaGVucy5cblxudmFyIE5PTk5VTUVSSUNJREVOVElGSUVSID0gUisrXG5zcmNbTk9OTlVNRVJJQ0lERU5USUZJRVJdID0gJ1xcXFxkKlthLXpBLVotXVthLXpBLVowLTktXSonXG5cbi8vICMjIE1haW4gVmVyc2lvblxuLy8gVGhyZWUgZG90LXNlcGFyYXRlZCBudW1lcmljIGlkZW50aWZpZXJzLlxuXG52YXIgTUFJTlZFUlNJT04gPSBSKytcbnNyY1tNQUlOVkVSU0lPTl0gPSAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArICcpJ1xuXG52YXIgTUFJTlZFUlNJT05MT09TRSA9IFIrK1xuc3JjW01BSU5WRVJTSU9OTE9PU0VdID0gJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJyknXG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb24gSWRlbnRpZmllclxuLy8gQSBudW1lcmljIGlkZW50aWZpZXIsIG9yIGEgbm9uLW51bWVyaWMgaWRlbnRpZmllci5cblxudmFyIFBSRVJFTEVBU0VJREVOVElGSUVSID0gUisrXG5zcmNbUFJFUkVMRUFTRUlERU5USUZJRVJdID0gJyg/OicgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfCcgKyBzcmNbTk9OTlVNRVJJQ0lERU5USUZJRVJdICsgJyknXG5cbnZhciBQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFID0gUisrXG5zcmNbUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV0gPSAnKD86JyArIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfCcgKyBzcmNbTk9OTlVNRVJJQ0lERU5USUZJRVJdICsgJyknXG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb25cbi8vIEh5cGhlbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgZG90LXNlcGFyYXRlZCBwcmUtcmVsZWFzZSB2ZXJzaW9uXG4vLyBpZGVudGlmaWVycy5cblxudmFyIFBSRVJFTEVBU0UgPSBSKytcbnNyY1tQUkVSRUxFQVNFXSA9ICcoPzotKCcgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJdICtcbiAgICAgICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJdICsgJykqKSknXG5cbnZhciBQUkVSRUxFQVNFTE9PU0UgPSBSKytcbnNyY1tQUkVSRUxFQVNFTE9PU0VdID0gJyg/Oi0/KCcgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV0gK1xuICAgICAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4nICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdICsgJykqKSknXG5cbi8vICMjIEJ1aWxkIE1ldGFkYXRhIElkZW50aWZpZXJcbi8vIEFueSBjb21iaW5hdGlvbiBvZiBkaWdpdHMsIGxldHRlcnMsIG9yIGh5cGhlbnMuXG5cbnZhciBCVUlMRElERU5USUZJRVIgPSBSKytcbnNyY1tCVUlMRElERU5USUZJRVJdID0gJ1swLTlBLVphLXotXSsnXG5cbi8vICMjIEJ1aWxkIE1ldGFkYXRhXG4vLyBQbHVzIHNpZ24sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIHBlcmlvZC1zZXBhcmF0ZWQgYnVpbGQgbWV0YWRhdGFcbi8vIGlkZW50aWZpZXJzLlxuXG52YXIgQlVJTEQgPSBSKytcbnNyY1tCVUlMRF0gPSAnKD86XFxcXCsoJyArIHNyY1tCVUlMRElERU5USUZJRVJdICtcbiAgICAgICAgICAgICAnKD86XFxcXC4nICsgc3JjW0JVSUxESURFTlRJRklFUl0gKyAnKSopKSdcblxuLy8gIyMgRnVsbCBWZXJzaW9uIFN0cmluZ1xuLy8gQSBtYWluIHZlcnNpb24sIGZvbGxvd2VkIG9wdGlvbmFsbHkgYnkgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uIGFuZFxuLy8gYnVpbGQgbWV0YWRhdGEuXG5cbi8vIE5vdGUgdGhhdCB0aGUgb25seSBtYWpvciwgbWlub3IsIHBhdGNoLCBhbmQgcHJlLXJlbGVhc2Ugc2VjdGlvbnMgb2Zcbi8vIHRoZSB2ZXJzaW9uIHN0cmluZyBhcmUgY2FwdHVyaW5nIGdyb3Vwcy4gIFRoZSBidWlsZCBtZXRhZGF0YSBpcyBub3QgYVxuLy8gY2FwdHVyaW5nIGdyb3VwLCBiZWNhdXNlIGl0IHNob3VsZCBub3QgZXZlciBiZSB1c2VkIGluIHZlcnNpb25cbi8vIGNvbXBhcmlzb24uXG5cbnZhciBGVUxMID0gUisrXG52YXIgRlVMTFBMQUlOID0gJ3Y/JyArIHNyY1tNQUlOVkVSU0lPTl0gK1xuICAgICAgICAgICAgICAgIHNyY1tQUkVSRUxFQVNFXSArICc/JyArXG4gICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/J1xuXG5zcmNbRlVMTF0gPSAnXicgKyBGVUxMUExBSU4gKyAnJCdcblxuLy8gbGlrZSBmdWxsLCBidXQgYWxsb3dzIHYxLjIuMyBhbmQgPTEuMi4zLCB3aGljaCBwZW9wbGUgZG8gc29tZXRpbWVzLlxuLy8gYWxzbywgMS4wLjBhbHBoYTEgKHByZXJlbGVhc2Ugd2l0aG91dCB0aGUgaHlwaGVuKSB3aGljaCBpcyBwcmV0dHlcbi8vIGNvbW1vbiBpbiB0aGUgbnBtIHJlZ2lzdHJ5LlxudmFyIExPT1NFUExBSU4gPSAnW3Y9XFxcXHNdKicgKyBzcmNbTUFJTlZFUlNJT05MT09TRV0gK1xuICAgICAgICAgICAgICAgICBzcmNbUFJFUkVMRUFTRUxPT1NFXSArICc/JyArXG4gICAgICAgICAgICAgICAgIHNyY1tCVUlMRF0gKyAnPydcblxudmFyIExPT1NFID0gUisrXG5zcmNbTE9PU0VdID0gJ14nICsgTE9PU0VQTEFJTiArICckJ1xuXG52YXIgR1RMVCA9IFIrK1xuc3JjW0dUTFRdID0gJygoPzo8fD4pPz0/KSdcblxuLy8gU29tZXRoaW5nIGxpa2UgXCIyLipcIiBvciBcIjEuMi54XCIuXG4vLyBOb3RlIHRoYXQgXCJ4LnhcIiBpcyBhIHZhbGlkIHhSYW5nZSBpZGVudGlmZXIsIG1lYW5pbmcgXCJhbnkgdmVyc2lvblwiXG4vLyBPbmx5IHRoZSBmaXJzdCBpdGVtIGlzIHN0cmljdGx5IHJlcXVpcmVkLlxudmFyIFhSQU5HRUlERU5USUZJRVJMT09TRSA9IFIrK1xuc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gPSBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnfHh8WHxcXFxcKidcbnZhciBYUkFOR0VJREVOVElGSUVSID0gUisrXG5zcmNbWFJBTkdFSURFTlRJRklFUl0gPSBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJ3x4fFh8XFxcXConXG5cbnZhciBYUkFOR0VQTEFJTiA9IFIrK1xuc3JjW1hSQU5HRVBMQUlOXSA9ICdbdj1cXFxcc10qKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OicgKyBzcmNbUFJFUkVMRUFTRV0gKyAnKT8nICtcbiAgICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAnKT8pPydcblxudmFyIFhSQU5HRVBMQUlOTE9PU0UgPSBSKytcbnNyY1tYUkFOR0VQTEFJTkxPT1NFXSA9ICdbdj1cXFxcc10qKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OicgKyBzcmNbUFJFUkVMRUFTRUxPT1NFXSArICcpPycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKT8pPydcblxudmFyIFhSQU5HRSA9IFIrK1xuc3JjW1hSQU5HRV0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqJyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnJCdcbnZhciBYUkFOR0VMT09TRSA9IFIrK1xuc3JjW1hSQU5HRUxPT1NFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyonICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnXG5cbi8vIENvZXJjaW9uLlxuLy8gRXh0cmFjdCBhbnl0aGluZyB0aGF0IGNvdWxkIGNvbmNlaXZhYmx5IGJlIGEgcGFydCBvZiBhIHZhbGlkIHNlbXZlclxudmFyIENPRVJDRSA9IFIrK1xuc3JjW0NPRVJDRV0gPSAnKD86XnxbXlxcXFxkXSknICtcbiAgICAgICAgICAgICAgJyhcXFxcZHsxLCcgKyBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIICsgJ30pJyArXG4gICAgICAgICAgICAgICcoPzpcXFxcLihcXFxcZHsxLCcgKyBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIICsgJ30pKT8nICtcbiAgICAgICAgICAgICAgJyg/OlxcXFwuKFxcXFxkezEsJyArIE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEggKyAnfSkpPycgK1xuICAgICAgICAgICAgICAnKD86JHxbXlxcXFxkXSknXG5cbi8vIFRpbGRlIHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJyZWFzb25hYmx5IGF0IG9yIGdyZWF0ZXIgdGhhblwiXG52YXIgTE9ORVRJTERFID0gUisrXG5zcmNbTE9ORVRJTERFXSA9ICcoPzp+Pj8pJ1xuXG52YXIgVElMREVUUklNID0gUisrXG5zcmNbVElMREVUUklNXSA9ICcoXFxcXHMqKScgKyBzcmNbTE9ORVRJTERFXSArICdcXFxccysnXG5yZVtUSUxERVRSSU1dID0gbmV3IFJlZ0V4cChzcmNbVElMREVUUklNXSwgJ2cnKVxudmFyIHRpbGRlVHJpbVJlcGxhY2UgPSAnJDF+J1xuXG52YXIgVElMREUgPSBSKytcbnNyY1tUSUxERV0gPSAnXicgKyBzcmNbTE9ORVRJTERFXSArIHNyY1tYUkFOR0VQTEFJTl0gKyAnJCdcbnZhciBUSUxERUxPT1NFID0gUisrXG5zcmNbVElMREVMT09TRV0gPSAnXicgKyBzcmNbTE9ORVRJTERFXSArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICckJ1xuXG4vLyBDYXJldCByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwiYXQgbGVhc3QgYW5kIGJhY2t3YXJkcyBjb21wYXRpYmxlIHdpdGhcIlxudmFyIExPTkVDQVJFVCA9IFIrK1xuc3JjW0xPTkVDQVJFVF0gPSAnKD86XFxcXF4pJ1xuXG52YXIgQ0FSRVRUUklNID0gUisrXG5zcmNbQ0FSRVRUUklNXSA9ICcoXFxcXHMqKScgKyBzcmNbTE9ORUNBUkVUXSArICdcXFxccysnXG5yZVtDQVJFVFRSSU1dID0gbmV3IFJlZ0V4cChzcmNbQ0FSRVRUUklNXSwgJ2cnKVxudmFyIGNhcmV0VHJpbVJlcGxhY2UgPSAnJDFeJ1xuXG52YXIgQ0FSRVQgPSBSKytcbnNyY1tDQVJFVF0gPSAnXicgKyBzcmNbTE9ORUNBUkVUXSArIHNyY1tYUkFOR0VQTEFJTl0gKyAnJCdcbnZhciBDQVJFVExPT1NFID0gUisrXG5zcmNbQ0FSRVRMT09TRV0gPSAnXicgKyBzcmNbTE9ORUNBUkVUXSArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICckJ1xuXG4vLyBBIHNpbXBsZSBndC9sdC9lcSB0aGluZywgb3IganVzdCBcIlwiIHRvIGluZGljYXRlIFwiYW55IHZlcnNpb25cIlxudmFyIENPTVBBUkFUT1JMT09TRSA9IFIrK1xuc3JjW0NPTVBBUkFUT1JMT09TRV0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqKCcgKyBMT09TRVBMQUlOICsgJykkfF4kJ1xudmFyIENPTVBBUkFUT1IgPSBSKytcbnNyY1tDT01QQVJBVE9SXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyooJyArIEZVTExQTEFJTiArICcpJHxeJCdcblxuLy8gQW4gZXhwcmVzc2lvbiB0byBzdHJpcCBhbnkgd2hpdGVzcGFjZSBiZXR3ZWVuIHRoZSBndGx0IGFuZCB0aGUgdGhpbmdcbi8vIGl0IG1vZGlmaWVzLCBzbyB0aGF0IGA+IDEuMi4zYCA9PT4gYD4xLjIuM2BcbnZhciBDT01QQVJBVE9SVFJJTSA9IFIrK1xuc3JjW0NPTVBBUkFUT1JUUklNXSA9ICcoXFxcXHMqKScgKyBzcmNbR1RMVF0gK1xuICAgICAgICAgICAgICAgICAgICAgICdcXFxccyooJyArIExPT1NFUExBSU4gKyAnfCcgKyBzcmNbWFJBTkdFUExBSU5dICsgJyknXG5cbi8vIHRoaXMgb25lIGhhcyB0byB1c2UgdGhlIC9nIGZsYWdcbnJlW0NPTVBBUkFUT1JUUklNXSA9IG5ldyBSZWdFeHAoc3JjW0NPTVBBUkFUT1JUUklNXSwgJ2cnKVxudmFyIGNvbXBhcmF0b3JUcmltUmVwbGFjZSA9ICckMSQyJDMnXG5cbi8vIFNvbWV0aGluZyBsaWtlIGAxLjIuMyAtIDEuMi40YFxuLy8gTm90ZSB0aGF0IHRoZXNlIGFsbCB1c2UgdGhlIGxvb3NlIGZvcm0sIGJlY2F1c2UgdGhleSdsbCBiZVxuLy8gY2hlY2tlZCBhZ2FpbnN0IGVpdGhlciB0aGUgc3RyaWN0IG9yIGxvb3NlIGNvbXBhcmF0b3IgZm9ybVxuLy8gbGF0ZXIuXG52YXIgSFlQSEVOUkFOR0UgPSBSKytcbnNyY1tIWVBIRU5SQU5HRV0gPSAnXlxcXFxzKignICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJ1xcXFxzKy1cXFxccysnICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbWFJBTkdFUExBSU5dICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnXFxcXHMqJCdcblxudmFyIEhZUEhFTlJBTkdFTE9PU0UgPSBSKytcbnNyY1tIWVBIRU5SQU5HRUxPT1NFXSA9ICdeXFxcXHMqKCcgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKy1cXFxccysnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqJCdcblxuLy8gU3RhciByYW5nZXMgYmFzaWNhbGx5IGp1c3QgYWxsb3cgYW55dGhpbmcgYXQgYWxsLlxudmFyIFNUQVIgPSBSKytcbnNyY1tTVEFSXSA9ICcoPHw+KT89P1xcXFxzKlxcXFwqJ1xuXG4vLyBDb21waWxlIHRvIGFjdHVhbCByZWdleHAgb2JqZWN0cy5cbi8vIEFsbCBhcmUgZmxhZy1mcmVlLCB1bmxlc3MgdGhleSB3ZXJlIGNyZWF0ZWQgYWJvdmUgd2l0aCBhIGZsYWcuXG5mb3IgKHZhciBpID0gMDsgaSA8IFI7IGkrKykge1xuICBkZWJ1ZyhpLCBzcmNbaV0pXG4gIGlmICghcmVbaV0pIHtcbiAgICByZVtpXSA9IG5ldyBSZWdFeHAoc3JjW2ldKVxuICB9XG59XG5cbmV4cG9ydHMucGFyc2UgPSBwYXJzZVxuZnVuY3Rpb24gcGFyc2UgKHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zIHx8IHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBsb29zZTogISFvcHRpb25zLFxuICAgICAgaW5jbHVkZVByZXJlbGVhc2U6IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpIHtcbiAgICByZXR1cm4gdmVyc2lvblxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHZhciByID0gb3B0aW9ucy5sb29zZSA/IHJlW0xPT1NFXSA6IHJlW0ZVTExdXG4gIGlmICghci50ZXN0KHZlcnNpb24pKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbmV4cG9ydHMudmFsaWQgPSB2YWxpZFxuZnVuY3Rpb24gdmFsaWQgKHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgdmFyIHYgPSBwYXJzZSh2ZXJzaW9uLCBvcHRpb25zKVxuICByZXR1cm4gdiA/IHYudmVyc2lvbiA6IG51bGxcbn1cblxuZXhwb3J0cy5jbGVhbiA9IGNsZWFuXG5mdW5jdGlvbiBjbGVhbiAodmVyc2lvbiwgb3B0aW9ucykge1xuICB2YXIgcyA9IHBhcnNlKHZlcnNpb24udHJpbSgpLnJlcGxhY2UoL15bPXZdKy8sICcnKSwgb3B0aW9ucylcbiAgcmV0dXJuIHMgPyBzLnZlcnNpb24gOiBudWxsXG59XG5cbmV4cG9ydHMuU2VtVmVyID0gU2VtVmVyXG5cbmZ1bmN0aW9uIFNlbVZlciAodmVyc2lvbiwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGxvb3NlOiAhIW9wdGlvbnMsXG4gICAgICBpbmNsdWRlUHJlcmVsZWFzZTogZmFsc2VcbiAgICB9XG4gIH1cbiAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpIHtcbiAgICBpZiAodmVyc2lvbi5sb29zZSA9PT0gb3B0aW9ucy5sb29zZSkge1xuICAgICAgcmV0dXJuIHZlcnNpb25cbiAgICB9IGVsc2Uge1xuICAgICAgdmVyc2lvbiA9IHZlcnNpb24udmVyc2lvblxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFZlcnNpb246ICcgKyB2ZXJzaW9uKVxuICB9XG5cbiAgaWYgKHZlcnNpb24ubGVuZ3RoID4gTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZlcnNpb24gaXMgbG9uZ2VyIHRoYW4gJyArIE1BWF9MRU5HVEggKyAnIGNoYXJhY3RlcnMnKVxuICB9XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICB9XG5cbiAgZGVidWcoJ1NlbVZlcicsIHZlcnNpb24sIG9wdGlvbnMpXG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgdGhpcy5sb29zZSA9ICEhb3B0aW9ucy5sb29zZVxuXG4gIHZhciBtID0gdmVyc2lvbi50cmltKCkubWF0Y2gob3B0aW9ucy5sb29zZSA/IHJlW0xPT1NFXSA6IHJlW0ZVTExdKVxuXG4gIGlmICghbSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVmVyc2lvbjogJyArIHZlcnNpb24pXG4gIH1cblxuICB0aGlzLnJhdyA9IHZlcnNpb25cblxuICAvLyB0aGVzZSBhcmUgYWN0dWFsbHkgbnVtYmVyc1xuICB0aGlzLm1ham9yID0gK21bMV1cbiAgdGhpcy5taW5vciA9ICttWzJdXG4gIHRoaXMucGF0Y2ggPSArbVszXVxuXG4gIGlmICh0aGlzLm1ham9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1ham9yIDwgMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWFqb3IgdmVyc2lvbicpXG4gIH1cblxuICBpZiAodGhpcy5taW5vciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5taW5vciA8IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1pbm9yIHZlcnNpb24nKVxuICB9XG5cbiAgaWYgKHRoaXMucGF0Y2ggPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMucGF0Y2ggPCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBwYXRjaCB2ZXJzaW9uJylcbiAgfVxuXG4gIC8vIG51bWJlcmlmeSBhbnkgcHJlcmVsZWFzZSBudW1lcmljIGlkc1xuICBpZiAoIW1bNF0pIHtcbiAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICB9IGVsc2Uge1xuICAgIHRoaXMucHJlcmVsZWFzZSA9IG1bNF0uc3BsaXQoJy4nKS5tYXAoZnVuY3Rpb24gKGlkKSB7XG4gICAgICBpZiAoL15bMC05XSskLy50ZXN0KGlkKSkge1xuICAgICAgICB2YXIgbnVtID0gK2lkXG4gICAgICAgIGlmIChudW0gPj0gMCAmJiBudW0gPCBNQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgICAgICAgcmV0dXJuIG51bVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaWRcbiAgICB9KVxuICB9XG5cbiAgdGhpcy5idWlsZCA9IG1bNV0gPyBtWzVdLnNwbGl0KCcuJykgOiBbXVxuICB0aGlzLmZvcm1hdCgpXG59XG5cblNlbVZlci5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnZlcnNpb24gPSB0aGlzLm1ham9yICsgJy4nICsgdGhpcy5taW5vciArICcuJyArIHRoaXMucGF0Y2hcbiAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICB0aGlzLnZlcnNpb24gKz0gJy0nICsgdGhpcy5wcmVyZWxlYXNlLmpvaW4oJy4nKVxuICB9XG4gIHJldHVybiB0aGlzLnZlcnNpb25cbn1cblxuU2VtVmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudmVyc2lvblxufVxuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgZGVidWcoJ1NlbVZlci5jb21wYXJlJywgdGhpcy52ZXJzaW9uLCB0aGlzLm9wdGlvbnMsIG90aGVyKVxuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgfVxuXG4gIHJldHVybiB0aGlzLmNvbXBhcmVNYWluKG90aGVyKSB8fCB0aGlzLmNvbXBhcmVQcmUob3RoZXIpXG59XG5cblNlbVZlci5wcm90b3R5cGUuY29tcGFyZU1haW4gPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWFqb3IsIG90aGVyLm1ham9yKSB8fFxuICAgICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWlub3IsIG90aGVyLm1pbm9yKSB8fFxuICAgICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMucGF0Y2gsIG90aGVyLnBhdGNoKVxufVxuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmVQcmUgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gIH1cblxuICAvLyBOT1QgaGF2aW5nIGEgcHJlcmVsZWFzZSBpcyA+IGhhdmluZyBvbmVcbiAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgIW90aGVyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgcmV0dXJuIC0xXG4gIH0gZWxzZSBpZiAoIXRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gMVxuICB9IGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgIHJldHVybiAwXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgZG8ge1xuICAgIHZhciBhID0gdGhpcy5wcmVyZWxlYXNlW2ldXG4gICAgdmFyIGIgPSBvdGhlci5wcmVyZWxlYXNlW2ldXG4gICAgZGVidWcoJ3ByZXJlbGVhc2UgY29tcGFyZScsIGksIGEsIGIpXG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCAmJiBiID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAwXG4gICAgfSBlbHNlIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAxXG4gICAgfSBlbHNlIGlmIChhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH0gZWxzZSBpZiAoYSA9PT0gYikge1xuICAgICAgY29udGludWVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKVxuICAgIH1cbiAgfSB3aGlsZSAoKytpKVxufVxuXG4vLyBwcmVtaW5vciB3aWxsIGJ1bXAgdGhlIHZlcnNpb24gdXAgdG8gdGhlIG5leHQgbWlub3IgcmVsZWFzZSwgYW5kIGltbWVkaWF0ZWx5XG4vLyBkb3duIHRvIHByZS1yZWxlYXNlLiBwcmVtYWpvciBhbmQgcHJlcGF0Y2ggd29yayB0aGUgc2FtZSB3YXkuXG5TZW1WZXIucHJvdG90eXBlLmluYyA9IGZ1bmN0aW9uIChyZWxlYXNlLCBpZGVudGlmaWVyKSB7XG4gIHN3aXRjaCAocmVsZWFzZSkge1xuICAgIGNhc2UgJ3ByZW1ham9yJzpcbiAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgdGhpcy5taW5vciA9IDBcbiAgICAgIHRoaXMubWFqb3IrK1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3ByZW1pbm9yJzpcbiAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgdGhpcy5taW5vcisrXG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcilcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncHJlcGF0Y2gnOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhbHJlYWR5IGEgcHJlcmVsZWFzZSwgaXQgd2lsbCBidW1wIHRvIHRoZSBuZXh0IHZlcnNpb25cbiAgICAgIC8vIGRyb3AgYW55IHByZXJlbGVhc2VzIHRoYXQgbWlnaHQgYWxyZWFkeSBleGlzdCwgc2luY2UgdGhleSBhcmUgbm90XG4gICAgICAvLyByZWxldmFudCBhdCB0aGlzIHBvaW50LlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDBcbiAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpXG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcilcbiAgICAgIGJyZWFrXG4gICAgLy8gSWYgdGhlIGlucHV0IGlzIGEgbm9uLXByZXJlbGVhc2UgdmVyc2lvbiwgdGhpcyBhY3RzIHRoZSBzYW1lIGFzXG4gICAgLy8gcHJlcGF0Y2guXG4gICAgY2FzZSAncHJlcmVsZWFzZSc6XG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmluYygncGF0Y2gnLCBpZGVudGlmaWVyKVxuICAgICAgfVxuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnbWFqb3InOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1tYWpvciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1ham9yIHZlcnNpb24uXG4gICAgICAvLyBPdGhlcndpc2UgaW5jcmVtZW50IG1ham9yLlxuICAgICAgLy8gMS4wLjAtNSBidW1wcyB0byAxLjAuMFxuICAgICAgLy8gMS4xLjAgYnVtcHMgdG8gMi4wLjBcbiAgICAgIGlmICh0aGlzLm1pbm9yICE9PSAwIHx8XG4gICAgICAgICAgdGhpcy5wYXRjaCAhPT0gMCB8fFxuICAgICAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5tYWpvcisrXG4gICAgICB9XG4gICAgICB0aGlzLm1pbm9yID0gMFxuICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdXG4gICAgICBicmVha1xuICAgIGNhc2UgJ21pbm9yJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgYSBwcmUtbWlub3IgdmVyc2lvbiwgYnVtcCB1cCB0byB0aGUgc2FtZSBtaW5vciB2ZXJzaW9uLlxuICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCBtaW5vci5cbiAgICAgIC8vIDEuMi4wLTUgYnVtcHMgdG8gMS4yLjBcbiAgICAgIC8vIDEuMi4xIGJ1bXBzIHRvIDEuMy4wXG4gICAgICBpZiAodGhpcy5wYXRjaCAhPT0gMCB8fCB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMubWlub3IrK1xuICAgICAgfVxuICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3BhdGNoJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgbm90IGEgcHJlLXJlbGVhc2UgdmVyc2lvbiwgaXQgd2lsbCBpbmNyZW1lbnQgdGhlIHBhdGNoLlxuICAgICAgLy8gSWYgaXQgaXMgYSBwcmUtcmVsZWFzZSBpdCB3aWxsIGJ1bXAgdXAgdG8gdGhlIHNhbWUgcGF0Y2ggdmVyc2lvbi5cbiAgICAgIC8vIDEuMi4wLTUgcGF0Y2hlcyB0byAxLjIuMFxuICAgICAgLy8gMS4yLjAgcGF0Y2hlcyB0byAxLjIuMVxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5wYXRjaCsrXG4gICAgICB9XG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICAgICAgYnJlYWtcbiAgICAvLyBUaGlzIHByb2JhYmx5IHNob3VsZG4ndCBiZSB1c2VkIHB1YmxpY2x5LlxuICAgIC8vIDEuMC4wIFwicHJlXCIgd291bGQgYmVjb21lIDEuMC4wLTAgd2hpY2ggaXMgdGhlIHdyb25nIGRpcmVjdGlvbi5cbiAgICBjYXNlICdwcmUnOlxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gWzBdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaSA9IHRoaXMucHJlcmVsZWFzZS5sZW5ndGhcbiAgICAgICAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByZXJlbGVhc2VbaV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2VbaV0rK1xuICAgICAgICAgICAgaSA9IC0yXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSAtMSkge1xuICAgICAgICAgIC8vIGRpZG4ndCBpbmNyZW1lbnQgYW55dGhpbmdcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UucHVzaCgwKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaWRlbnRpZmllcikge1xuICAgICAgICAvLyAxLjIuMC1iZXRhLjEgYnVtcHMgdG8gMS4yLjAtYmV0YS4yLFxuICAgICAgICAvLyAxLjIuMC1iZXRhLmZvb2JseiBvciAxLjIuMC1iZXRhIGJ1bXBzIHRvIDEuMi4wLWJldGEuMFxuICAgICAgICBpZiAodGhpcy5wcmVyZWxlYXNlWzBdID09PSBpZGVudGlmaWVyKSB7XG4gICAgICAgICAgaWYgKGlzTmFOKHRoaXMucHJlcmVsZWFzZVsxXSkpIHtcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCAwXVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbaWRlbnRpZmllciwgMF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5jcmVtZW50IGFyZ3VtZW50OiAnICsgcmVsZWFzZSlcbiAgfVxuICB0aGlzLmZvcm1hdCgpXG4gIHRoaXMucmF3ID0gdGhpcy52ZXJzaW9uXG4gIHJldHVybiB0aGlzXG59XG5cbmV4cG9ydHMuaW5jID0gaW5jXG5mdW5jdGlvbiBpbmMgKHZlcnNpb24sIHJlbGVhc2UsIGxvb3NlLCBpZGVudGlmaWVyKSB7XG4gIGlmICh0eXBlb2YgKGxvb3NlKSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZGVudGlmaWVyID0gbG9vc2VcbiAgICBsb29zZSA9IHVuZGVmaW5lZFxuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBsb29zZSkuaW5jKHJlbGVhc2UsIGlkZW50aWZpZXIpLnZlcnNpb25cbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbmV4cG9ydHMuZGlmZiA9IGRpZmZcbmZ1bmN0aW9uIGRpZmYgKHZlcnNpb24xLCB2ZXJzaW9uMikge1xuICBpZiAoZXEodmVyc2lvbjEsIHZlcnNpb24yKSkge1xuICAgIHJldHVybiBudWxsXG4gIH0gZWxzZSB7XG4gICAgdmFyIHYxID0gcGFyc2UodmVyc2lvbjEpXG4gICAgdmFyIHYyID0gcGFyc2UodmVyc2lvbjIpXG4gICAgdmFyIHByZWZpeCA9ICcnXG4gICAgaWYgKHYxLnByZXJlbGVhc2UubGVuZ3RoIHx8IHYyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICBwcmVmaXggPSAncHJlJ1xuICAgICAgdmFyIGRlZmF1bHRSZXN1bHQgPSAncHJlcmVsZWFzZSdcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIHYxKSB7XG4gICAgICBpZiAoa2V5ID09PSAnbWFqb3InIHx8IGtleSA9PT0gJ21pbm9yJyB8fCBrZXkgPT09ICdwYXRjaCcpIHtcbiAgICAgICAgaWYgKHYxW2tleV0gIT09IHYyW2tleV0pIHtcbiAgICAgICAgICByZXR1cm4gcHJlZml4ICsga2V5XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRSZXN1bHQgLy8gbWF5IGJlIHVuZGVmaW5lZFxuICB9XG59XG5cbmV4cG9ydHMuY29tcGFyZUlkZW50aWZpZXJzID0gY29tcGFyZUlkZW50aWZpZXJzXG5cbnZhciBudW1lcmljID0gL15bMC05XSskL1xuZnVuY3Rpb24gY29tcGFyZUlkZW50aWZpZXJzIChhLCBiKSB7XG4gIHZhciBhbnVtID0gbnVtZXJpYy50ZXN0KGEpXG4gIHZhciBibnVtID0gbnVtZXJpYy50ZXN0KGIpXG5cbiAgaWYgKGFudW0gJiYgYm51bSkge1xuICAgIGEgPSArYVxuICAgIGIgPSArYlxuICB9XG5cbiAgcmV0dXJuIGEgPT09IGIgPyAwXG4gICAgOiAoYW51bSAmJiAhYm51bSkgPyAtMVxuICAgIDogKGJudW0gJiYgIWFudW0pID8gMVxuICAgIDogYSA8IGIgPyAtMVxuICAgIDogMVxufVxuXG5leHBvcnRzLnJjb21wYXJlSWRlbnRpZmllcnMgPSByY29tcGFyZUlkZW50aWZpZXJzXG5mdW5jdGlvbiByY29tcGFyZUlkZW50aWZpZXJzIChhLCBiKSB7XG4gIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnMoYiwgYSlcbn1cblxuZXhwb3J0cy5tYWpvciA9IG1ham9yXG5mdW5jdGlvbiBtYWpvciAoYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1ham9yXG59XG5cbmV4cG9ydHMubWlub3IgPSBtaW5vclxuZnVuY3Rpb24gbWlub3IgKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5taW5vclxufVxuXG5leHBvcnRzLnBhdGNoID0gcGF0Y2hcbmZ1bmN0aW9uIHBhdGNoIChhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkucGF0Y2hcbn1cblxuZXhwb3J0cy5jb21wYXJlID0gY29tcGFyZVxuZnVuY3Rpb24gY29tcGFyZSAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLmNvbXBhcmUobmV3IFNlbVZlcihiLCBsb29zZSkpXG59XG5cbmV4cG9ydHMuY29tcGFyZUxvb3NlID0gY29tcGFyZUxvb3NlXG5mdW5jdGlvbiBjb21wYXJlTG9vc2UgKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgdHJ1ZSlcbn1cblxuZXhwb3J0cy5yY29tcGFyZSA9IHJjb21wYXJlXG5mdW5jdGlvbiByY29tcGFyZSAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYiwgYSwgbG9vc2UpXG59XG5cbmV4cG9ydHMuc29ydCA9IHNvcnRcbmZ1bmN0aW9uIHNvcnQgKGxpc3QsIGxvb3NlKSB7XG4gIHJldHVybiBsaXN0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5jb21wYXJlKGEsIGIsIGxvb3NlKVxuICB9KVxufVxuXG5leHBvcnRzLnJzb3J0ID0gcnNvcnRcbmZ1bmN0aW9uIHJzb3J0IChsaXN0LCBsb29zZSkge1xuICByZXR1cm4gbGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMucmNvbXBhcmUoYSwgYiwgbG9vc2UpXG4gIH0pXG59XG5cbmV4cG9ydHMuZ3QgPSBndFxuZnVuY3Rpb24gZ3QgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA+IDBcbn1cblxuZXhwb3J0cy5sdCA9IGx0XG5mdW5jdGlvbiBsdCAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpIDwgMFxufVxuXG5leHBvcnRzLmVxID0gZXFcbmZ1bmN0aW9uIGVxIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPT09IDBcbn1cblxuZXhwb3J0cy5uZXEgPSBuZXFcbmZ1bmN0aW9uIG5lcSAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpICE9PSAwXG59XG5cbmV4cG9ydHMuZ3RlID0gZ3RlXG5mdW5jdGlvbiBndGUgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA+PSAwXG59XG5cbmV4cG9ydHMubHRlID0gbHRlXG5mdW5jdGlvbiBsdGUgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8PSAwXG59XG5cbmV4cG9ydHMuY21wID0gY21wXG5mdW5jdGlvbiBjbXAgKGEsIG9wLCBiLCBsb29zZSkge1xuICBzd2l0Y2ggKG9wKSB7XG4gICAgY2FzZSAnPT09JzpcbiAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpXG4gICAgICAgIGEgPSBhLnZlcnNpb25cbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpXG4gICAgICAgIGIgPSBiLnZlcnNpb25cbiAgICAgIHJldHVybiBhID09PSBiXG5cbiAgICBjYXNlICchPT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JylcbiAgICAgICAgYSA9IGEudmVyc2lvblxuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0JylcbiAgICAgICAgYiA9IGIudmVyc2lvblxuICAgICAgcmV0dXJuIGEgIT09IGJcblxuICAgIGNhc2UgJyc6XG4gICAgY2FzZSAnPSc6XG4gICAgY2FzZSAnPT0nOlxuICAgICAgcmV0dXJuIGVxKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnIT0nOlxuICAgICAgcmV0dXJuIG5lcShhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJz4nOlxuICAgICAgcmV0dXJuIGd0KGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPj0nOlxuICAgICAgcmV0dXJuIGd0ZShhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJzwnOlxuICAgICAgcmV0dXJuIGx0KGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPD0nOlxuICAgICAgcmV0dXJuIGx0ZShhLCBiLCBsb29zZSlcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG9wZXJhdG9yOiAnICsgb3ApXG4gIH1cbn1cblxuZXhwb3J0cy5Db21wYXJhdG9yID0gQ29tcGFyYXRvclxuZnVuY3Rpb24gQ29tcGFyYXRvciAoY29tcCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGxvb3NlOiAhIW9wdGlvbnMsXG4gICAgICBpbmNsdWRlUHJlcmVsZWFzZTogZmFsc2VcbiAgICB9XG4gIH1cblxuICBpZiAoY29tcCBpbnN0YW5jZW9mIENvbXBhcmF0b3IpIHtcbiAgICBpZiAoY29tcC5sb29zZSA9PT0gISFvcHRpb25zLmxvb3NlKSB7XG4gICAgICByZXR1cm4gY29tcFxuICAgIH0gZWxzZSB7XG4gICAgICBjb21wID0gY29tcC52YWx1ZVxuICAgIH1cbiAgfVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSkge1xuICAgIHJldHVybiBuZXcgQ29tcGFyYXRvcihjb21wLCBvcHRpb25zKVxuICB9XG5cbiAgZGVidWcoJ2NvbXBhcmF0b3InLCBjb21wLCBvcHRpb25zKVxuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gIHRoaXMubG9vc2UgPSAhIW9wdGlvbnMubG9vc2VcbiAgdGhpcy5wYXJzZShjb21wKVxuXG4gIGlmICh0aGlzLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgdGhpcy52YWx1ZSA9ICcnXG4gIH0gZWxzZSB7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMub3BlcmF0b3IgKyB0aGlzLnNlbXZlci52ZXJzaW9uXG4gIH1cblxuICBkZWJ1ZygnY29tcCcsIHRoaXMpXG59XG5cbnZhciBBTlkgPSB7fVxuQ29tcGFyYXRvci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAoY29tcCkge1xuICB2YXIgciA9IHRoaXMub3B0aW9ucy5sb29zZSA/IHJlW0NPTVBBUkFUT1JMT09TRV0gOiByZVtDT01QQVJBVE9SXVxuICB2YXIgbSA9IGNvbXAubWF0Y2gocilcblxuICBpZiAoIW0pIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNvbXBhcmF0b3I6ICcgKyBjb21wKVxuICB9XG5cbiAgdGhpcy5vcGVyYXRvciA9IG1bMV1cbiAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICc9Jykge1xuICAgIHRoaXMub3BlcmF0b3IgPSAnJ1xuICB9XG5cbiAgLy8gaWYgaXQgbGl0ZXJhbGx5IGlzIGp1c3QgJz4nIG9yICcnIHRoZW4gYWxsb3cgYW55dGhpbmcuXG4gIGlmICghbVsyXSkge1xuICAgIHRoaXMuc2VtdmVyID0gQU5ZXG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zZW12ZXIgPSBuZXcgU2VtVmVyKG1bMl0sIHRoaXMub3B0aW9ucy5sb29zZSlcbiAgfVxufVxuXG5Db21wYXJhdG9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudmFsdWVcbn1cblxuQ29tcGFyYXRvci5wcm90b3R5cGUudGVzdCA9IGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG4gIGRlYnVnKCdDb21wYXJhdG9yLnRlc3QnLCB2ZXJzaW9uLCB0aGlzLm9wdGlvbnMubG9vc2UpXG5cbiAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJykge1xuICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMub3B0aW9ucylcbiAgfVxuXG4gIHJldHVybiBjbXAodmVyc2lvbiwgdGhpcy5vcGVyYXRvciwgdGhpcy5zZW12ZXIsIHRoaXMub3B0aW9ucylcbn1cblxuQ29tcGFyYXRvci5wcm90b3R5cGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uIChjb21wLCBvcHRpb25zKSB7XG4gIGlmICghKGNvbXAgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2EgQ29tcGFyYXRvciBpcyByZXF1aXJlZCcpXG4gIH1cblxuICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGxvb3NlOiAhIW9wdGlvbnMsXG4gICAgICBpbmNsdWRlUHJlcmVsZWFzZTogZmFsc2VcbiAgICB9XG4gIH1cblxuICB2YXIgcmFuZ2VUbXBcblxuICBpZiAodGhpcy5vcGVyYXRvciA9PT0gJycpIHtcbiAgICByYW5nZVRtcCA9IG5ldyBSYW5nZShjb21wLnZhbHVlLCBvcHRpb25zKVxuICAgIHJldHVybiBzYXRpc2ZpZXModGhpcy52YWx1ZSwgcmFuZ2VUbXAsIG9wdGlvbnMpXG4gIH0gZWxzZSBpZiAoY29tcC5vcGVyYXRvciA9PT0gJycpIHtcbiAgICByYW5nZVRtcCA9IG5ldyBSYW5nZSh0aGlzLnZhbHVlLCBvcHRpb25zKVxuICAgIHJldHVybiBzYXRpc2ZpZXMoY29tcC5zZW12ZXIsIHJhbmdlVG1wLCBvcHRpb25zKVxuICB9XG5cbiAgdmFyIHNhbWVEaXJlY3Rpb25JbmNyZWFzaW5nID1cbiAgICAodGhpcy5vcGVyYXRvciA9PT0gJz49JyB8fCB0aGlzLm9wZXJhdG9yID09PSAnPicpICYmXG4gICAgKGNvbXAub3BlcmF0b3IgPT09ICc+PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJz4nKVxuICB2YXIgc2FtZURpcmVjdGlvbkRlY3JlYXNpbmcgPVxuICAgICh0aGlzLm9wZXJhdG9yID09PSAnPD0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc8JykgJiZcbiAgICAoY29tcC5vcGVyYXRvciA9PT0gJzw9JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPCcpXG4gIHZhciBzYW1lU2VtVmVyID0gdGhpcy5zZW12ZXIudmVyc2lvbiA9PT0gY29tcC5zZW12ZXIudmVyc2lvblxuICB2YXIgZGlmZmVyZW50RGlyZWN0aW9uc0luY2x1c2l2ZSA9XG4gICAgKHRoaXMub3BlcmF0b3IgPT09ICc+PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJzw9JykgJiZcbiAgICAoY29tcC5vcGVyYXRvciA9PT0gJz49JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPD0nKVxuICB2YXIgb3Bwb3NpdGVEaXJlY3Rpb25zTGVzc1RoYW4gPVxuICAgIGNtcCh0aGlzLnNlbXZlciwgJzwnLCBjb21wLnNlbXZlciwgb3B0aW9ucykgJiZcbiAgICAoKHRoaXMub3BlcmF0b3IgPT09ICc+PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJz4nKSAmJlxuICAgIChjb21wLm9wZXJhdG9yID09PSAnPD0nIHx8IGNvbXAub3BlcmF0b3IgPT09ICc8JykpXG4gIHZhciBvcHBvc2l0ZURpcmVjdGlvbnNHcmVhdGVyVGhhbiA9XG4gICAgY21wKHRoaXMuc2VtdmVyLCAnPicsIGNvbXAuc2VtdmVyLCBvcHRpb25zKSAmJlxuICAgICgodGhpcy5vcGVyYXRvciA9PT0gJzw9JyB8fCB0aGlzLm9wZXJhdG9yID09PSAnPCcpICYmXG4gICAgKGNvbXAub3BlcmF0b3IgPT09ICc+PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJz4nKSlcblxuICByZXR1cm4gc2FtZURpcmVjdGlvbkluY3JlYXNpbmcgfHwgc2FtZURpcmVjdGlvbkRlY3JlYXNpbmcgfHxcbiAgICAoc2FtZVNlbVZlciAmJiBkaWZmZXJlbnREaXJlY3Rpb25zSW5jbHVzaXZlKSB8fFxuICAgIG9wcG9zaXRlRGlyZWN0aW9uc0xlc3NUaGFuIHx8IG9wcG9zaXRlRGlyZWN0aW9uc0dyZWF0ZXJUaGFuXG59XG5cbmV4cG9ydHMuUmFuZ2UgPSBSYW5nZVxuZnVuY3Rpb24gUmFuZ2UgKHJhbmdlLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmIChyYW5nZSBpbnN0YW5jZW9mIFJhbmdlKSB7XG4gICAgaWYgKHJhbmdlLmxvb3NlID09PSAhIW9wdGlvbnMubG9vc2UgJiZcbiAgICAgICAgcmFuZ2UuaW5jbHVkZVByZXJlbGVhc2UgPT09ICEhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSkge1xuICAgICAgcmV0dXJuIHJhbmdlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UucmF3LCBvcHRpb25zKVxuICAgIH1cbiAgfVxuXG4gIGlmIChyYW5nZSBpbnN0YW5jZW9mIENvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLnZhbHVlLCBvcHRpb25zKVxuICB9XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJhbmdlKSkge1xuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH1cblxuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gIHRoaXMubG9vc2UgPSAhIW9wdGlvbnMubG9vc2VcbiAgdGhpcy5pbmNsdWRlUHJlcmVsZWFzZSA9ICEhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZVxuXG4gIC8vIEZpcnN0LCBzcGxpdCBiYXNlZCBvbiBib29sZWFuIG9yIHx8XG4gIHRoaXMucmF3ID0gcmFuZ2VcbiAgdGhpcy5zZXQgPSByYW5nZS5zcGxpdCgvXFxzKlxcfFxcfFxccyovKS5tYXAoZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VSYW5nZShyYW5nZS50cmltKCkpXG4gIH0sIHRoaXMpLmZpbHRlcihmdW5jdGlvbiAoYykge1xuICAgIC8vIHRocm93IG91dCBhbnkgdGhhdCBhcmUgbm90IHJlbGV2YW50IGZvciB3aGF0ZXZlciByZWFzb25cbiAgICByZXR1cm4gYy5sZW5ndGhcbiAgfSlcblxuICBpZiAoIXRoaXMuc2V0Lmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgU2VtVmVyIFJhbmdlOiAnICsgcmFuZ2UpXG4gIH1cblxuICB0aGlzLmZvcm1hdCgpXG59XG5cblJhbmdlLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmFuZ2UgPSB0aGlzLnNldC5tYXAoZnVuY3Rpb24gKGNvbXBzKSB7XG4gICAgcmV0dXJuIGNvbXBzLmpvaW4oJyAnKS50cmltKClcbiAgfSkuam9pbignfHwnKS50cmltKClcbiAgcmV0dXJuIHRoaXMucmFuZ2Vcbn1cblxuUmFuZ2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5yYW5nZVxufVxuXG5SYW5nZS5wcm90b3R5cGUucGFyc2VSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICB2YXIgbG9vc2UgPSB0aGlzLm9wdGlvbnMubG9vc2VcbiAgcmFuZ2UgPSByYW5nZS50cmltKClcbiAgLy8gYDEuMi4zIC0gMS4yLjRgID0+IGA+PTEuMi4zIDw9MS4yLjRgXG4gIHZhciBociA9IGxvb3NlID8gcmVbSFlQSEVOUkFOR0VMT09TRV0gOiByZVtIWVBIRU5SQU5HRV1cbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKGhyLCBoeXBoZW5SZXBsYWNlKVxuICBkZWJ1ZygnaHlwaGVuIHJlcGxhY2UnLCByYW5nZSlcbiAgLy8gYD4gMS4yLjMgPCAxLjIuNWAgPT4gYD4xLjIuMyA8MS4yLjVgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtDT01QQVJBVE9SVFJJTV0sIGNvbXBhcmF0b3JUcmltUmVwbGFjZSlcbiAgZGVidWcoJ2NvbXBhcmF0b3IgdHJpbScsIHJhbmdlLCByZVtDT01QQVJBVE9SVFJJTV0pXG5cbiAgLy8gYH4gMS4yLjNgID0+IGB+MS4yLjNgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtUSUxERVRSSU1dLCB0aWxkZVRyaW1SZXBsYWNlKVxuXG4gIC8vIGBeIDEuMi4zYCA9PiBgXjEuMi4zYFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbQ0FSRVRUUklNXSwgY2FyZXRUcmltUmVwbGFjZSlcblxuICAvLyBub3JtYWxpemUgc3BhY2VzXG4gIHJhbmdlID0gcmFuZ2Uuc3BsaXQoL1xccysvKS5qb2luKCcgJylcblxuICAvLyBBdCB0aGlzIHBvaW50LCB0aGUgcmFuZ2UgaXMgY29tcGxldGVseSB0cmltbWVkIGFuZFxuICAvLyByZWFkeSB0byBiZSBzcGxpdCBpbnRvIGNvbXBhcmF0b3JzLlxuXG4gIHZhciBjb21wUmUgPSBsb29zZSA/IHJlW0NPTVBBUkFUT1JMT09TRV0gOiByZVtDT01QQVJBVE9SXVxuICB2YXIgc2V0ID0gcmFuZ2Uuc3BsaXQoJyAnKS5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICByZXR1cm4gcGFyc2VDb21wYXJhdG9yKGNvbXAsIHRoaXMub3B0aW9ucylcbiAgfSwgdGhpcykuam9pbignICcpLnNwbGl0KC9cXHMrLylcbiAgaWYgKHRoaXMub3B0aW9ucy5sb29zZSkge1xuICAgIC8vIGluIGxvb3NlIG1vZGUsIHRocm93IG91dCBhbnkgdGhhdCBhcmUgbm90IHZhbGlkIGNvbXBhcmF0b3JzXG4gICAgc2V0ID0gc2V0LmZpbHRlcihmdW5jdGlvbiAoY29tcCkge1xuICAgICAgcmV0dXJuICEhY29tcC5tYXRjaChjb21wUmUpXG4gICAgfSlcbiAgfVxuICBzZXQgPSBzZXQubWFwKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgcmV0dXJuIG5ldyBDb21wYXJhdG9yKGNvbXAsIHRoaXMub3B0aW9ucylcbiAgfSwgdGhpcylcblxuICByZXR1cm4gc2V0XG59XG5cblJhbmdlLnByb3RvdHlwZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKHJhbmdlLCBvcHRpb25zKSB7XG4gIGlmICghKHJhbmdlIGluc3RhbmNlb2YgUmFuZ2UpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYSBSYW5nZSBpcyByZXF1aXJlZCcpXG4gIH1cblxuICByZXR1cm4gdGhpcy5zZXQuc29tZShmdW5jdGlvbiAodGhpc0NvbXBhcmF0b3JzKSB7XG4gICAgcmV0dXJuIHRoaXNDb21wYXJhdG9ycy5ldmVyeShmdW5jdGlvbiAodGhpc0NvbXBhcmF0b3IpIHtcbiAgICAgIHJldHVybiByYW5nZS5zZXQuc29tZShmdW5jdGlvbiAocmFuZ2VDb21wYXJhdG9ycykge1xuICAgICAgICByZXR1cm4gcmFuZ2VDb21wYXJhdG9ycy5ldmVyeShmdW5jdGlvbiAocmFuZ2VDb21wYXJhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNDb21wYXJhdG9yLmludGVyc2VjdHMocmFuZ2VDb21wYXJhdG9yLCBvcHRpb25zKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG4vLyBNb3N0bHkganVzdCBmb3IgdGVzdGluZyBhbmQgbGVnYWN5IEFQSSByZWFzb25zXG5leHBvcnRzLnRvQ29tcGFyYXRvcnMgPSB0b0NvbXBhcmF0b3JzXG5mdW5jdGlvbiB0b0NvbXBhcmF0b3JzIChyYW5nZSwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKS5zZXQubWFwKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgcmV0dXJuIGNvbXAubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICByZXR1cm4gYy52YWx1ZVxuICAgIH0pLmpvaW4oJyAnKS50cmltKCkuc3BsaXQoJyAnKVxuICB9KVxufVxuXG4vLyBjb21wcmlzZWQgb2YgeHJhbmdlcywgdGlsZGVzLCBzdGFycywgYW5kIGd0bHQncyBhdCB0aGlzIHBvaW50LlxuLy8gYWxyZWFkeSByZXBsYWNlZCB0aGUgaHlwaGVuIHJhbmdlc1xuLy8gdHVybiBpbnRvIGEgc2V0IG9mIEpVU1QgY29tcGFyYXRvcnMuXG5mdW5jdGlvbiBwYXJzZUNvbXBhcmF0b3IgKGNvbXAsIG9wdGlvbnMpIHtcbiAgZGVidWcoJ2NvbXAnLCBjb21wLCBvcHRpb25zKVxuICBjb21wID0gcmVwbGFjZUNhcmV0cyhjb21wLCBvcHRpb25zKVxuICBkZWJ1ZygnY2FyZXQnLCBjb21wKVxuICBjb21wID0gcmVwbGFjZVRpbGRlcyhjb21wLCBvcHRpb25zKVxuICBkZWJ1ZygndGlsZGVzJywgY29tcClcbiAgY29tcCA9IHJlcGxhY2VYUmFuZ2VzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCd4cmFuZ2UnLCBjb21wKVxuICBjb21wID0gcmVwbGFjZVN0YXJzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCdzdGFycycsIGNvbXApXG4gIHJldHVybiBjb21wXG59XG5cbmZ1bmN0aW9uIGlzWCAoaWQpIHtcbiAgcmV0dXJuICFpZCB8fCBpZC50b0xvd2VyQ2FzZSgpID09PSAneCcgfHwgaWQgPT09ICcqJ1xufVxuXG4vLyB+LCB+PiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIH4yLCB+Mi54LCB+Mi54LngsIH4+Miwgfj4yLnggfj4yLngueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIH4yLjAsIH4yLjAueCwgfj4yLjAsIH4+Mi4wLnggLS0+ID49Mi4wLjAgPDIuMS4wXG4vLyB+MS4yLCB+MS4yLngsIH4+MS4yLCB+PjEuMi54IC0tPiA+PTEuMi4wIDwxLjMuMFxuLy8gfjEuMi4zLCB+PjEuMi4zIC0tPiA+PTEuMi4zIDwxLjMuMFxuLy8gfjEuMi4wLCB+PjEuMi4wIC0tPiA+PTEuMi4wIDwxLjMuMFxuZnVuY3Rpb24gcmVwbGFjZVRpbGRlcyAoY29tcCwgb3B0aW9ucykge1xuICByZXR1cm4gY29tcC50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZVRpbGRlKGNvbXAsIG9wdGlvbnMpXG4gIH0pLmpvaW4oJyAnKVxufVxuXG5mdW5jdGlvbiByZXBsYWNlVGlsZGUgKGNvbXAsIG9wdGlvbnMpIHtcbiAgdmFyIHIgPSBvcHRpb25zLmxvb3NlID8gcmVbVElMREVMT09TRV0gOiByZVtUSUxERV1cbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbiAoXywgTSwgbSwgcCwgcHIpIHtcbiAgICBkZWJ1ZygndGlsZGUnLCBjb21wLCBfLCBNLCBtLCBwLCBwcilcbiAgICB2YXIgcmV0XG5cbiAgICBpZiAoaXNYKE0pKSB7XG4gICAgICByZXQgPSAnJ1xuICAgIH0gZWxzZSBpZiAoaXNYKG0pKSB7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCdcbiAgICB9IGVsc2UgaWYgKGlzWChwKSkge1xuICAgICAgLy8gfjEuMiA9PSA+PTEuMi4wIDwxLjMuMFxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJ1xuICAgIH0gZWxzZSBpZiAocHIpIHtcbiAgICAgIGRlYnVnKCdyZXBsYWNlVGlsZGUgcHInLCBwcilcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyAnLScgKyBwciArXG4gICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJ1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB+MS4yLjMgPT0gPj0xLjIuMyA8MS4zLjBcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCdcbiAgICB9XG5cbiAgICBkZWJ1ZygndGlsZGUgcmV0dXJuJywgcmV0KVxuICAgIHJldHVybiByZXRcbiAgfSlcbn1cblxuLy8gXiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIF4yLCBeMi54LCBeMi54LnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyBeMi4wLCBeMi4wLnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyBeMS4yLCBeMS4yLnggLS0+ID49MS4yLjAgPDIuMC4wXG4vLyBeMS4yLjMgLS0+ID49MS4yLjMgPDIuMC4wXG4vLyBeMS4yLjAgLS0+ID49MS4yLjAgPDIuMC4wXG5mdW5jdGlvbiByZXBsYWNlQ2FyZXRzIChjb21wLCBvcHRpb25zKSB7XG4gIHJldHVybiBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbiAoY29tcCkge1xuICAgIHJldHVybiByZXBsYWNlQ2FyZXQoY29tcCwgb3B0aW9ucylcbiAgfSkuam9pbignICcpXG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VDYXJldCAoY29tcCwgb3B0aW9ucykge1xuICBkZWJ1ZygnY2FyZXQnLCBjb21wLCBvcHRpb25zKVxuICB2YXIgciA9IG9wdGlvbnMubG9vc2UgPyByZVtDQVJFVExPT1NFXSA6IHJlW0NBUkVUXVxuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uIChfLCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCdjYXJldCcsIGNvbXAsIF8sIE0sIG0sIHAsIHByKVxuICAgIHZhciByZXRcblxuICAgIGlmIChpc1goTSkpIHtcbiAgICAgIHJldCA9ICcnXG4gICAgfSBlbHNlIGlmIChpc1gobSkpIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJ1xuICAgIH0gZWxzZSBpZiAoaXNYKHApKSB7XG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArICgrTSArIDEpICsgJy4wLjAnXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VDYXJldCBwcicsIHByKVxuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKSB7XG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArICctJyArIHByICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArIG0gKyAnLicgKyAoK3AgKyAxKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyAnLScgKyBwciArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCdcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArICctJyArIHByICtcbiAgICAgICAgICAgICAgJyA8JyArICgrTSArIDEpICsgJy4wLjAnXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCdubyBwcicpXG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpIHtcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArIG0gKyAnLicgKyAoK3AgKyAxKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAnIDwnICsgKCtNICsgMSkgKyAnLjAuMCdcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWJ1ZygnY2FyZXQgcmV0dXJuJywgcmV0KVxuICAgIHJldHVybiByZXRcbiAgfSlcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVhSYW5nZXMgKGNvbXAsIG9wdGlvbnMpIHtcbiAgZGVidWcoJ3JlcGxhY2VYUmFuZ2VzJywgY29tcCwgb3B0aW9ucylcbiAgcmV0dXJuIGNvbXAuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZVhSYW5nZShjb21wLCBvcHRpb25zKVxuICB9KS5qb2luKCcgJylcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVhSYW5nZSAoY29tcCwgb3B0aW9ucykge1xuICBjb21wID0gY29tcC50cmltKClcbiAgdmFyIHIgPSBvcHRpb25zLmxvb3NlID8gcmVbWFJBTkdFTE9PU0VdIDogcmVbWFJBTkdFXVxuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uIChyZXQsIGd0bHQsIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ3hSYW5nZScsIGNvbXAsIHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpXG4gICAgdmFyIHhNID0gaXNYKE0pXG4gICAgdmFyIHhtID0geE0gfHwgaXNYKG0pXG4gICAgdmFyIHhwID0geG0gfHwgaXNYKHApXG4gICAgdmFyIGFueVggPSB4cFxuXG4gICAgaWYgKGd0bHQgPT09ICc9JyAmJiBhbnlYKSB7XG4gICAgICBndGx0ID0gJydcbiAgICB9XG5cbiAgICBpZiAoeE0pIHtcbiAgICAgIGlmIChndGx0ID09PSAnPicgfHwgZ3RsdCA9PT0gJzwnKSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgYWxsb3dlZFxuICAgICAgICByZXQgPSAnPDAuMC4wJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBmb3JiaWRkZW5cbiAgICAgICAgcmV0ID0gJyonXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChndGx0ICYmIGFueVgpIHtcbiAgICAgIC8vIHdlIGtub3cgcGF0Y2ggaXMgYW4geCwgYmVjYXVzZSB3ZSBoYXZlIGFueSB4IGF0IGFsbC5cbiAgICAgIC8vIHJlcGxhY2UgWCB3aXRoIDBcbiAgICAgIGlmICh4bSkge1xuICAgICAgICBtID0gMFxuICAgICAgfVxuICAgICAgcCA9IDBcblxuICAgICAgaWYgKGd0bHQgPT09ICc+Jykge1xuICAgICAgICAvLyA+MSA9PiA+PTIuMC4wXG4gICAgICAgIC8vID4xLjIgPT4gPj0xLjMuMFxuICAgICAgICAvLyA+MS4yLjMgPT4gPj0gMS4yLjRcbiAgICAgICAgZ3RsdCA9ICc+PSdcbiAgICAgICAgaWYgKHhtKSB7XG4gICAgICAgICAgTSA9ICtNICsgMVxuICAgICAgICAgIG0gPSAwXG4gICAgICAgICAgcCA9IDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtID0gK20gKyAxXG4gICAgICAgICAgcCA9IDBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChndGx0ID09PSAnPD0nKSB7XG4gICAgICAgIC8vIDw9MC43LnggaXMgYWN0dWFsbHkgPDAuOC4wLCBzaW5jZSBhbnkgMC43Lnggc2hvdWxkXG4gICAgICAgIC8vIHBhc3MuICBTaW1pbGFybHksIDw9Ny54IGlzIGFjdHVhbGx5IDw4LjAuMCwgZXRjLlxuICAgICAgICBndGx0ID0gJzwnXG4gICAgICAgIGlmICh4bSkge1xuICAgICAgICAgIE0gPSArTSArIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtID0gK20gKyAxXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0ID0gZ3RsdCArIE0gKyAnLicgKyBtICsgJy4nICsgcFxuICAgIH0gZWxzZSBpZiAoeG0pIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJ1xuICAgIH0gZWxzZSBpZiAoeHApIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCdcbiAgICB9XG5cbiAgICBkZWJ1ZygneFJhbmdlIHJldHVybicsIHJldClcblxuICAgIHJldHVybiByZXRcbiAgfSlcbn1cblxuLy8gQmVjYXVzZSAqIGlzIEFORC1lZCB3aXRoIGV2ZXJ5dGhpbmcgZWxzZSBpbiB0aGUgY29tcGFyYXRvcixcbi8vIGFuZCAnJyBtZWFucyBcImFueSB2ZXJzaW9uXCIsIGp1c3QgcmVtb3ZlIHRoZSAqcyBlbnRpcmVseS5cbmZ1bmN0aW9uIHJlcGxhY2VTdGFycyAoY29tcCwgb3B0aW9ucykge1xuICBkZWJ1ZygncmVwbGFjZVN0YXJzJywgY29tcCwgb3B0aW9ucylcbiAgLy8gTG9vc2VuZXNzIGlzIGlnbm9yZWQgaGVyZS4gIHN0YXIgaXMgYWx3YXlzIGFzIGxvb3NlIGFzIGl0IGdldHMhXG4gIHJldHVybiBjb21wLnRyaW0oKS5yZXBsYWNlKHJlW1NUQVJdLCAnJylcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBwYXNzZWQgdG8gc3RyaW5nLnJlcGxhY2UocmVbSFlQSEVOUkFOR0VdKVxuLy8gTSwgbSwgcGF0Y2gsIHByZXJlbGVhc2UsIGJ1aWxkXG4vLyAxLjIgLSAzLjQuNSA9PiA+PTEuMi4wIDw9My40LjVcbi8vIDEuMi4zIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wIEFueSAzLjQueCB3aWxsIGRvXG4vLyAxLjIgLSAzLjQgPT4gPj0xLjIuMCA8My41LjBcbmZ1bmN0aW9uIGh5cGhlblJlcGxhY2UgKCQwLFxuICBmcm9tLCBmTSwgZm0sIGZwLCBmcHIsIGZiLFxuICB0bywgdE0sIHRtLCB0cCwgdHByLCB0Yikge1xuICBpZiAoaXNYKGZNKSkge1xuICAgIGZyb20gPSAnJ1xuICB9IGVsc2UgaWYgKGlzWChmbSkpIHtcbiAgICBmcm9tID0gJz49JyArIGZNICsgJy4wLjAnXG4gIH0gZWxzZSBpZiAoaXNYKGZwKSkge1xuICAgIGZyb20gPSAnPj0nICsgZk0gKyAnLicgKyBmbSArICcuMCdcbiAgfSBlbHNlIHtcbiAgICBmcm9tID0gJz49JyArIGZyb21cbiAgfVxuXG4gIGlmIChpc1godE0pKSB7XG4gICAgdG8gPSAnJ1xuICB9IGVsc2UgaWYgKGlzWCh0bSkpIHtcbiAgICB0byA9ICc8JyArICgrdE0gKyAxKSArICcuMC4wJ1xuICB9IGVsc2UgaWYgKGlzWCh0cCkpIHtcbiAgICB0byA9ICc8JyArIHRNICsgJy4nICsgKCt0bSArIDEpICsgJy4wJ1xuICB9IGVsc2UgaWYgKHRwcikge1xuICAgIHRvID0gJzw9JyArIHRNICsgJy4nICsgdG0gKyAnLicgKyB0cCArICctJyArIHRwclxuICB9IGVsc2Uge1xuICAgIHRvID0gJzw9JyArIHRvXG4gIH1cblxuICByZXR1cm4gKGZyb20gKyAnICcgKyB0bykudHJpbSgpXG59XG5cbi8vIGlmIEFOWSBvZiB0aGUgc2V0cyBtYXRjaCBBTEwgb2YgaXRzIGNvbXBhcmF0b3JzLCB0aGVuIHBhc3NcblJhbmdlLnByb3RvdHlwZS50ZXN0ID0gZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5vcHRpb25zKVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNldC5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0ZXN0U2V0KHRoaXMuc2V0W2ldLCB2ZXJzaW9uLCB0aGlzLm9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gdGVzdFNldCAoc2V0LCB2ZXJzaW9uLCBvcHRpb25zKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFzZXRbaV0udGVzdCh2ZXJzaW9uKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaWYgKHZlcnNpb24ucHJlcmVsZWFzZS5sZW5ndGggJiYgIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpIHtcbiAgICAvLyBGaW5kIHRoZSBzZXQgb2YgdmVyc2lvbnMgdGhhdCBhcmUgYWxsb3dlZCB0byBoYXZlIHByZXJlbGVhc2VzXG4gICAgLy8gRm9yIGV4YW1wbGUsIF4xLjIuMy1wci4xIGRlc3VnYXJzIHRvID49MS4yLjMtcHIuMSA8Mi4wLjBcbiAgICAvLyBUaGF0IHNob3VsZCBhbGxvdyBgMS4yLjMtcHIuMmAgdG8gcGFzcy5cbiAgICAvLyBIb3dldmVyLCBgMS4yLjQtYWxwaGEubm90cmVhZHlgIHNob3VsZCBOT1QgYmUgYWxsb3dlZCxcbiAgICAvLyBldmVuIHRob3VnaCBpdCdzIHdpdGhpbiB0aGUgcmFuZ2Ugc2V0IGJ5IHRoZSBjb21wYXJhdG9ycy5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZWJ1ZyhzZXRbaV0uc2VtdmVyKVxuICAgICAgaWYgKHNldFtpXS5zZW12ZXIgPT09IEFOWSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBpZiAoc2V0W2ldLnNlbXZlci5wcmVyZWxlYXNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGFsbG93ZWQgPSBzZXRbaV0uc2VtdmVyXG4gICAgICAgIGlmIChhbGxvd2VkLm1ham9yID09PSB2ZXJzaW9uLm1ham9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLm1pbm9yID09PSB2ZXJzaW9uLm1pbm9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLnBhdGNoID09PSB2ZXJzaW9uLnBhdGNoKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFZlcnNpb24gaGFzIGEgLXByZSwgYnV0IGl0J3Mgbm90IG9uZSBvZiB0aGUgb25lcyB3ZSBsaWtlLlxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0cy5zYXRpc2ZpZXMgPSBzYXRpc2ZpZXNcbmZ1bmN0aW9uIHNhdGlzZmllcyAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgdHJ5IHtcbiAgICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gcmFuZ2UudGVzdCh2ZXJzaW9uKVxufVxuXG5leHBvcnRzLm1heFNhdGlzZnlpbmcgPSBtYXhTYXRpc2Z5aW5nXG5mdW5jdGlvbiBtYXhTYXRpc2Z5aW5nICh2ZXJzaW9ucywgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgdmFyIG1heCA9IG51bGxcbiAgdmFyIG1heFNWID0gbnVsbFxuICB0cnkge1xuICAgIHZhciByYW5nZU9iaiA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHZlcnNpb25zLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICBpZiAocmFuZ2VPYmoudGVzdCh2KSkge1xuICAgICAgLy8gc2F0aXNmaWVzKHYsIHJhbmdlLCBvcHRpb25zKVxuICAgICAgaWYgKCFtYXggfHwgbWF4U1YuY29tcGFyZSh2KSA9PT0gLTEpIHtcbiAgICAgICAgLy8gY29tcGFyZShtYXgsIHYsIHRydWUpXG4gICAgICAgIG1heCA9IHZcbiAgICAgICAgbWF4U1YgPSBuZXcgU2VtVmVyKG1heCwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBtYXhcbn1cblxuZXhwb3J0cy5taW5TYXRpc2Z5aW5nID0gbWluU2F0aXNmeWluZ1xuZnVuY3Rpb24gbWluU2F0aXNmeWluZyAodmVyc2lvbnMsIHJhbmdlLCBvcHRpb25zKSB7XG4gIHZhciBtaW4gPSBudWxsXG4gIHZhciBtaW5TViA9IG51bGxcbiAgdHJ5IHtcbiAgICB2YXIgcmFuZ2VPYmogPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICB2ZXJzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgaWYgKHJhbmdlT2JqLnRlc3QodikpIHtcbiAgICAgIC8vIHNhdGlzZmllcyh2LCByYW5nZSwgb3B0aW9ucylcbiAgICAgIGlmICghbWluIHx8IG1pblNWLmNvbXBhcmUodikgPT09IDEpIHtcbiAgICAgICAgLy8gY29tcGFyZShtaW4sIHYsIHRydWUpXG4gICAgICAgIG1pbiA9IHZcbiAgICAgICAgbWluU1YgPSBuZXcgU2VtVmVyKG1pbiwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBtaW5cbn1cblxuZXhwb3J0cy5taW5WZXJzaW9uID0gbWluVmVyc2lvblxuZnVuY3Rpb24gbWluVmVyc2lvbiAocmFuZ2UsIGxvb3NlKSB7XG4gIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSlcblxuICB2YXIgbWludmVyID0gbmV3IFNlbVZlcignMC4wLjAnKVxuICBpZiAocmFuZ2UudGVzdChtaW52ZXIpKSB7XG4gICAgcmV0dXJuIG1pbnZlclxuICB9XG5cbiAgbWludmVyID0gbmV3IFNlbVZlcignMC4wLjAtMCcpXG4gIGlmIChyYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICBtaW52ZXIgPSBudWxsXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2Uuc2V0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGNvbXBhcmF0b3JzID0gcmFuZ2Uuc2V0W2ldXG5cbiAgICBjb21wYXJhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gICAgICAvLyBDbG9uZSB0byBhdm9pZCBtYW5pcHVsYXRpbmcgdGhlIGNvbXBhcmF0b3IncyBzZW12ZXIgb2JqZWN0LlxuICAgICAgdmFyIGNvbXB2ZXIgPSBuZXcgU2VtVmVyKGNvbXBhcmF0b3Iuc2VtdmVyLnZlcnNpb24pXG4gICAgICBzd2l0Y2ggKGNvbXBhcmF0b3Iub3BlcmF0b3IpIHtcbiAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgaWYgKGNvbXB2ZXIucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbXB2ZXIucGF0Y2grK1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wdmVyLnByZXJlbGVhc2UucHVzaCgwKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb21wdmVyLnJhdyA9IGNvbXB2ZXIuZm9ybWF0KClcbiAgICAgICAgICAvKiBmYWxsdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICcnOlxuICAgICAgICBjYXNlICc+PSc6XG4gICAgICAgICAgaWYgKCFtaW52ZXIgfHwgZ3QobWludmVyLCBjb21wdmVyKSkge1xuICAgICAgICAgICAgbWludmVyID0gY29tcHZlclxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgY2FzZSAnPD0nOlxuICAgICAgICAgIC8qIElnbm9yZSBtYXhpbXVtIHZlcnNpb25zICovXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgb3BlcmF0aW9uOiAnICsgY29tcGFyYXRvci5vcGVyYXRvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaWYgKG1pbnZlciAmJiByYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5leHBvcnRzLnZhbGlkUmFuZ2UgPSB2YWxpZFJhbmdlXG5mdW5jdGlvbiB2YWxpZFJhbmdlIChyYW5nZSwgb3B0aW9ucykge1xuICB0cnkge1xuICAgIC8vIFJldHVybiAnKicgaW5zdGVhZCBvZiAnJyBzbyB0aGF0IHRydXRoaW5lc3Mgd29ya3MuXG4gICAgLy8gVGhpcyB3aWxsIHRocm93IGlmIGl0J3MgaW52YWxpZCBhbnl3YXlcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKS5yYW5nZSB8fCAnKidcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbi8vIERldGVybWluZSBpZiB2ZXJzaW9uIGlzIGxlc3MgdGhhbiBhbGwgdGhlIHZlcnNpb25zIHBvc3NpYmxlIGluIHRoZSByYW5nZVxuZXhwb3J0cy5sdHIgPSBsdHJcbmZ1bmN0aW9uIGx0ciAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc8Jywgb3B0aW9ucylcbn1cblxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgZ3JlYXRlciB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlLlxuZXhwb3J0cy5ndHIgPSBndHJcbmZ1bmN0aW9uIGd0ciAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc+Jywgb3B0aW9ucylcbn1cblxuZXhwb3J0cy5vdXRzaWRlID0gb3V0c2lkZVxuZnVuY3Rpb24gb3V0c2lkZSAodmVyc2lvbiwgcmFuZ2UsIGhpbG8sIG9wdGlvbnMpIHtcbiAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgb3B0aW9ucylcbiAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG5cbiAgdmFyIGd0Zm4sIGx0ZWZuLCBsdGZuLCBjb21wLCBlY29tcFxuICBzd2l0Y2ggKGhpbG8pIHtcbiAgICBjYXNlICc+JzpcbiAgICAgIGd0Zm4gPSBndFxuICAgICAgbHRlZm4gPSBsdGVcbiAgICAgIGx0Zm4gPSBsdFxuICAgICAgY29tcCA9ICc+J1xuICAgICAgZWNvbXAgPSAnPj0nXG4gICAgICBicmVha1xuICAgIGNhc2UgJzwnOlxuICAgICAgZ3RmbiA9IGx0XG4gICAgICBsdGVmbiA9IGd0ZVxuICAgICAgbHRmbiA9IGd0XG4gICAgICBjb21wID0gJzwnXG4gICAgICBlY29tcCA9ICc8PSdcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ011c3QgcHJvdmlkZSBhIGhpbG8gdmFsIG9mIFwiPFwiIG9yIFwiPlwiJylcbiAgfVxuXG4gIC8vIElmIGl0IHNhdGlzaWZlcyB0aGUgcmFuZ2UgaXQgaXMgbm90IG91dHNpZGVcbiAgaWYgKHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIEZyb20gbm93IG9uLCB2YXJpYWJsZSB0ZXJtcyBhcmUgYXMgaWYgd2UncmUgaW4gXCJndHJcIiBtb2RlLlxuICAvLyBidXQgbm90ZSB0aGF0IGV2ZXJ5dGhpbmcgaXMgZmxpcHBlZCBmb3IgdGhlIFwibHRyXCIgZnVuY3Rpb24uXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZS5zZXQubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgY29tcGFyYXRvcnMgPSByYW5nZS5zZXRbaV1cblxuICAgIHZhciBoaWdoID0gbnVsbFxuICAgIHZhciBsb3cgPSBudWxsXG5cbiAgICBjb21wYXJhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gICAgICBpZiAoY29tcGFyYXRvci5zZW12ZXIgPT09IEFOWSkge1xuICAgICAgICBjb21wYXJhdG9yID0gbmV3IENvbXBhcmF0b3IoJz49MC4wLjAnKVxuICAgICAgfVxuICAgICAgaGlnaCA9IGhpZ2ggfHwgY29tcGFyYXRvclxuICAgICAgbG93ID0gbG93IHx8IGNvbXBhcmF0b3JcbiAgICAgIGlmIChndGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBoaWdoLnNlbXZlciwgb3B0aW9ucykpIHtcbiAgICAgICAgaGlnaCA9IGNvbXBhcmF0b3JcbiAgICAgIH0gZWxzZSBpZiAobHRmbihjb21wYXJhdG9yLnNlbXZlciwgbG93LnNlbXZlciwgb3B0aW9ucykpIHtcbiAgICAgICAgbG93ID0gY29tcGFyYXRvclxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBJZiB0aGUgZWRnZSB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGEgb3BlcmF0b3IgdGhlbiBvdXIgdmVyc2lvblxuICAgIC8vIGlzbid0IG91dHNpZGUgaXRcbiAgICBpZiAoaGlnaC5vcGVyYXRvciA9PT0gY29tcCB8fCBoaWdoLm9wZXJhdG9yID09PSBlY29tcCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGxvd2VzdCB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGFuIG9wZXJhdG9yIGFuZCBvdXIgdmVyc2lvblxuICAgIC8vIGlzIGxlc3MgdGhhbiBpdCB0aGVuIGl0IGlzbid0IGhpZ2hlciB0aGFuIHRoZSByYW5nZVxuICAgIGlmICgoIWxvdy5vcGVyYXRvciB8fCBsb3cub3BlcmF0b3IgPT09IGNvbXApICYmXG4gICAgICAgIGx0ZWZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2UgaWYgKGxvdy5vcGVyYXRvciA9PT0gZWNvbXAgJiYgbHRmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydHMucHJlcmVsZWFzZSA9IHByZXJlbGVhc2VcbmZ1bmN0aW9uIHByZXJlbGVhc2UgKHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgdmFyIHBhcnNlZCA9IHBhcnNlKHZlcnNpb24sIG9wdGlvbnMpXG4gIHJldHVybiAocGFyc2VkICYmIHBhcnNlZC5wcmVyZWxlYXNlLmxlbmd0aCkgPyBwYXJzZWQucHJlcmVsZWFzZSA6IG51bGxcbn1cblxuZXhwb3J0cy5pbnRlcnNlY3RzID0gaW50ZXJzZWN0c1xuZnVuY3Rpb24gaW50ZXJzZWN0cyAocjEsIHIyLCBvcHRpb25zKSB7XG4gIHIxID0gbmV3IFJhbmdlKHIxLCBvcHRpb25zKVxuICByMiA9IG5ldyBSYW5nZShyMiwgb3B0aW9ucylcbiAgcmV0dXJuIHIxLmludGVyc2VjdHMocjIpXG59XG5cbmV4cG9ydHMuY29lcmNlID0gY29lcmNlXG5mdW5jdGlvbiBjb2VyY2UgKHZlcnNpb24pIHtcbiAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpIHtcbiAgICByZXR1cm4gdmVyc2lvblxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICB2YXIgbWF0Y2ggPSB2ZXJzaW9uLm1hdGNoKHJlW0NPRVJDRV0pXG5cbiAgaWYgKG1hdGNoID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIHBhcnNlKG1hdGNoWzFdICtcbiAgICAnLicgKyAobWF0Y2hbMl0gfHwgJzAnKSArXG4gICAgJy4nICsgKG1hdGNoWzNdIHx8ICcwJykpXG59XG4iLCJpbXBvcnQgeyBpbmplY3RhYmxlIH0gZnJvbSAnaW52ZXJzaWZ5J1xuXG5pbXBvcnQgeyBJQnVpbGRBZ2VudCwgSUV4ZWNSZXN1bHQgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscydcbmltcG9ydCB7IElSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ3R5cGVkLXJlc3QtY2xpZW50L0ludGVyZmFjZXMnXG5cbkBpbmplY3RhYmxlKClcbmNsYXNzIEJ1aWxkQWdlbnQgaW1wbGVtZW50cyBJQnVpbGRBZ2VudCB7XG4gICAgcHJveHlDb25maWd1cmF0aW9uKHVybDogc3RyaW5nKTogSVJlcXVlc3RPcHRpb25zIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Byb3h5Q29uZmlndXJhdGlvbicpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gICAgcHVibGljIGdldCBhZ2VudE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dldEFnZW50TmFtZScpXG4gICAgICAgIHJldHVybiAnTW9jaydcbiAgICB9XG5cbiAgICBwdWJsaWMgZmluZCh0b29sTmFtZTogc3RyaW5nLCB2ZXJzaW9uU3BlYzogc3RyaW5nLCBhcmNoPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZpbmQnKVxuICAgICAgICByZXR1cm4gJ2ZpbmQnXG4gICAgfVxuXG4gICAgcHVibGljIGNhY2hlRGlyKFxuICAgICAgICBzb3VyY2VEaXI6IHN0cmluZyxcbiAgICAgICAgdG9vbDogc3RyaW5nLFxuICAgICAgICB2ZXJzaW9uOiBzdHJpbmcsXG4gICAgICAgIGFyY2g/OiBzdHJpbmdcbiAgICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zb2xlLmxvZygnY2FjaGVEaXInKVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdjYWNoZURpcicpXG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZVRlbXBEaXIoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZVRlbXBEaXInKVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdjcmVhdGVUZW1wRGlyJylcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVidWcobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkZWJ1ZycpXG4gICAgfVxuXG4gICAgcHVibGljIHNldEZhaWxlZChtZXNzYWdlOiBzdHJpbmcsIGRvbmU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXRGYWlsZWQnKVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTdWNjZWVkZWQobWVzc2FnZTogc3RyaW5nLCBkb25lPzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnc2V0U3VjY2VlZGVkJylcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhwb3J0VmFyaWFibGUobmFtZTogc3RyaW5nLCB2YWw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnZXhwb3J0VmFyaWFibGUnKVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRWYXJpYWJsZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2V0VmFyaWFibGUnKVxuICAgICAgICByZXR1cm4gJ2dldFZhcmlhYmxlJ1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRQYXRoKGlucHV0UGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhZGRQYXRoJylcbiAgICB9XG5cbiAgICBwdWJsaWMgd2hpY2godG9vbDogc3RyaW5nLCBjaGVjaz86IGJvb2xlYW4pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zb2xlLmxvZygnd2hpY2gnKVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCd3aGljaCcpXG4gICAgfVxuXG4gICAgcHVibGljIGV4ZWMoZXhlYzogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSk6IFByb21pc2U8SUV4ZWNSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgICAgICBjb2RlOiAwLFxuICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICBzdGRlcnI6ICdyZXN1bHQuc3RkZXJyJyxcbiAgICAgICAgICAgIHN0ZG91dDogJ3Jlc3VsdC5zdGRvdXQnXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIGdldFNvdXJjZURpcigpOiBzdHJpbmcge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2V0U291cmNlRGlyJylcbiAgICAgICAgcmV0dXJuICdnZXRTb3VyY2VEaXInXG4gICAgfVxuXG4gICAgcHVibGljIHNldE91dHB1dChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NldE91dHB1dCcpXG4gICAgfVxuXG4gICAgcHVibGljIGdldElucHV0KGlucHV0OiBzdHJpbmcsIHJlcXVpcmVkPzogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRJbnB1dCcpXG4gICAgICAgIHJldHVybiAnZ2V0SW5wdXQnXG4gICAgfVxuXG4gICAgcHVibGljIGdldExpc3RJbnB1dChpbnB1dDogc3RyaW5nLCByZXF1aXJlZD86IGJvb2xlYW4pOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRMaXN0SW5wdXQnKVxuICAgICAgICByZXR1cm4gWydnZXRJbnB1dCddXG4gICAgfVxuXG4gICAgcHVibGljIGdldEJvb2xlYW5JbnB1dChpbnB1dDogc3RyaW5nLCByZXF1aXJlZD86IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dldEJvb2xlYW5JbnB1dCcpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHB1YmxpYyBpc1ZhbGlkSW5wdXRGaWxlKGlucHV0OiBzdHJpbmcsIGZpbGU6IHN0cmluZykge1xuICAgICAgICBjb25zb2xlLmxvZygnaXNWYWxpZElucHV0RmlsZScpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHB1YmxpYyBmaWxlRXhpc3RzKGZpbGU6IHN0cmluZykge1xuICAgICAgICBjb25zb2xlLmxvZygnZmlsZUV4aXN0cycpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHB1YmxpYyBkaXJlY3RvcnlFeGlzdHMoZmlsZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkaXJlY3RvcnlFeGlzdHMnKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCB7IEJ1aWxkQWdlbnQgfVxuIiwiaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnXG5pbXBvcnQgKiBhcyBvcyBmcm9tICdvcydcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSAndHlwZWQtcmVzdC1jbGllbnQvSHR0cENsaWVudCdcblxuaW1wb3J0IHsgaW5qZWN0LCBpbmplY3RhYmxlIH0gZnJvbSAnaW52ZXJzaWZ5J1xuaW1wb3J0IHsgVFlQRVMsIElFeGVjUmVzdWx0LCBJQnVpbGRBZ2VudCB9IGZyb20gJy4vbW9kZWxzJ1xuaW1wb3J0IHsgSVZlcnNpb25NYW5hZ2VyIH0gZnJvbSAnLi92ZXJzaW9uTWFuYWdlcidcblxuZXhwb3J0IGludGVyZmFjZSBJRG90bmV0VG9vbCB7XG4gICAgZGlzYWJsZVRlbGVtZXRyeSgpOiB2b2lkXG4gICAgdG9vbEluc3RhbGwoXG4gICAgICAgIHRvb2xOYW1lOiBzdHJpbmcsXG4gICAgICAgIHZlcnNpb25TcGVjOiBzdHJpbmcsXG4gICAgICAgIGNoZWNrTGF0ZXN0OiBib29sZWFuLFxuICAgICAgICBpbmNsdWRlUHJlOiBib29sZWFuXG4gICAgKTogUHJvbWlzZTxzdHJpbmc+XG59XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb3RuZXRUb29sIGltcGxlbWVudHMgSURvdG5ldFRvb2wge1xuICAgIHByb3RlY3RlZCBidWlsZEFnZW50OiBJQnVpbGRBZ2VudFxuICAgIHByb3RlY3RlZCB2ZXJzaW9uTWFuYWdlcjogSVZlcnNpb25NYW5hZ2VyXG4gICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBodHRwLkh0dHBDbGllbnRcblxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IG51Z2V0Um9vdDogc3RyaW5nID1cbiAgICAgICAgJ2h0dHBzOi8vYXBpLXYydjNzZWFyY2gtMC5udWdldC5vcmcvJ1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBpbmplY3QoVFlQRVMuSUJ1aWxkQWdlbnQpIGJ1aWxkQWdlbnQ6IElCdWlsZEFnZW50LFxuICAgICAgICBAaW5qZWN0KFRZUEVTLklWZXJzaW9uTWFuYWdlcikgdmVyc2lvbk1hbmFnZXI6IElWZXJzaW9uTWFuYWdlclxuICAgICkge1xuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQgPSBidWlsZEFnZW50XG4gICAgICAgIHRoaXMudmVyc2lvbk1hbmFnZXIgPSB2ZXJzaW9uTWFuYWdlclxuICAgICAgICB0aGlzLmh0dHBDbGllbnQgPSBuZXcgaHR0cC5IdHRwQ2xpZW50KFxuICAgICAgICAgICAgJ2RvdG5ldCcsXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICB0aGlzLmJ1aWxkQWdlbnQucHJveHlDb25maWd1cmF0aW9uKERvdG5ldFRvb2wubnVnZXRSb290KVxuICAgICAgICApXG4gICAgfVxuXG4gICAgcHVibGljIGRpc2FibGVUZWxlbWV0cnkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYnVpbGRBZ2VudC5leHBvcnRWYXJpYWJsZSgnRE9UTkVUX0NMSV9URUxFTUVUUllfT1BUT1VUJywgJ3RydWUnKVxuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZXhwb3J0VmFyaWFibGUoJ0RPVE5FVF9OT0xPR08nLCAndHJ1ZScpXG4gICAgfVxuXG4gICAgcHVibGljIGV4ZWN1dGUoY21kOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdKTogUHJvbWlzZTxJRXhlY1Jlc3VsdD4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgQ29tbWFuZDogJHtjbWR9ICR7YXJncy5qb2luKCcgJyl9YClcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRBZ2VudC5leGVjKGNtZCwgYXJncylcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdG9vbEluc3RhbGwoXG4gICAgICAgIHRvb2xOYW1lOiBzdHJpbmcsXG4gICAgICAgIHZlcnNpb25TcGVjOiBzdHJpbmcsXG4gICAgICAgIGNoZWNrTGF0ZXN0OiBib29sZWFuLFxuICAgICAgICBpbmNsdWRlUHJlOiBib29sZWFuXG4gICAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc29sZS5sb2coJycpXG4gICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpXG4gICAgICAgIGNvbnNvbGUubG9nKGBJbnN0YWxsaW5nICR7dG9vbE5hbWV9IHZlcnNpb24gYCArIHZlcnNpb25TcGVjKVxuICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKVxuXG4gICAgICAgIGlmICh0aGlzLnZlcnNpb25NYW5hZ2VyLmlzRXhwbGljaXRWZXJzaW9uKHZlcnNpb25TcGVjKSkge1xuICAgICAgICAgICAgY2hlY2tMYXRlc3QgPSBmYWxzZSAvLyBjaGVjayBsYXRlc3QgZG9lc24ndCBtYWtlIHNlbnNlIHdoZW4gZXhwbGljaXQgdmVyc2lvblxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRvb2xQYXRoOiBzdHJpbmdcbiAgICAgICAgaWYgKCFjaGVja0xhdGVzdCkge1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIExldCdzIHRyeSBhbmQgcmVzb2x2ZSB0aGUgdmVyc2lvbiBzcGVjIGxvY2FsbHkgZmlyc3RcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB0b29sUGF0aCA9IHRoaXMuYnVpbGRBZ2VudC5maW5kKHRvb2xOYW1lLCB2ZXJzaW9uU3BlYylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdG9vbFBhdGgpIHtcbiAgICAgICAgICAgIGxldCB2ZXJzaW9uOiBzdHJpbmdcbiAgICAgICAgICAgIGlmICh0aGlzLnZlcnNpb25NYW5hZ2VyLmlzRXhwbGljaXRWZXJzaW9uKHZlcnNpb25TcGVjKSkge1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gRXhwbGljaXQgdmVyc2lvbiB3YXMgc3BlY2lmaWVkLiBObyBuZWVkIHRvIHF1ZXJ5IGZvciBsaXN0IG9mIHZlcnNpb25zLlxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgdmVyc2lvbiA9IHZlcnNpb25TcGVjXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gTGV0J3MgcXVlcnkgYW5kIHJlc29sdmUgdGhlIGxhdGVzdCB2ZXJzaW9uIGZvciB0aGUgdmVyc2lvblNwZWMuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHZlcnNpb24gaXMgYW4gZXhwbGljaXQgdmVyc2lvbiAoMS4xLjEgb3IgdjEuMS4xKSB0aGVuIG5vIG5lZWQgdG8gcXVlcnkuXG4gICAgICAgICAgICAgICAgLy8gSWYgeW91ciB0b29sIGRvZXNuJ3Qgb2ZmZXIgYSBtZWNoYW5pc20gdG8gcXVlcnksXG4gICAgICAgICAgICAgICAgLy8gdGhlbiBpdCBjYW4gb25seSBzdXBwb3J0IGV4YWN0IHZlcnNpb24gaW5wdXRzLlxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgdmVyc2lvbiA9IGF3YWl0IHRoaXMucXVlcnlMYXRlc3RNYXRjaChcbiAgICAgICAgICAgICAgICAgICAgdG9vbE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb25TcGVjLFxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlUHJlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIGlmICghdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICBgVW5hYmxlIHRvIGZpbmQgJHt0b29sTmFtZX0gdmVyc2lvbiAnJHt2ZXJzaW9uU3BlY30nLmBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIGNhY2hlIGZvciB0aGUgcmVzb2x2ZWQgdmVyc2lvbi5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIHRvb2xQYXRoID0gdGhpcy5idWlsZEFnZW50LmZpbmQodG9vbE5hbWUsIHZlcnNpb24pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRvb2xQYXRoKSB7XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBEb3dubG9hZCwgZXh0cmFjdCwgY2FjaGVcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIHRvb2xQYXRoID0gYXdhaXQgdGhpcy5hY3F1aXJlVG9vbCh0b29sTmFtZSwgdmVyc2lvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFByZXBlbmQgdGhlIHRvb2xzIHBhdGguIFRoaXMgcHJlcGVuZHMgdGhlIFBBVEggZm9yIHRoZSBjdXJyZW50IHByb2Nlc3MgYW5kXG4gICAgICAgIC8vIGluc3RydWN0cyB0aGUgYWdlbnQgdG8gcHJlcGVuZCBmb3IgZWFjaCB0YXNrIHRoYXQgZm9sbG93cy5cbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5idWlsZEFnZW50LmRlYnVnKGB0b29sUGF0aDogJHt0b29sUGF0aH1gKVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG9zLnBsYXRmb3JtKCkgIT09ICd3aW4zMicgJiZcbiAgICAgICAgICAgICF0aGlzLmJ1aWxkQWdlbnQuZ2V0VmFyaWFibGUoJ0RPVE5FVF9ST09UJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgZG90bmV0UGF0aCA9IGF3YWl0IHRoaXMuYnVpbGRBZ2VudC53aGljaCgnZG90bmV0JylcbiAgICAgICAgICAgIGRvdG5ldFBhdGggPSBmcy5yZWFkbGlua1N5bmMoZG90bmV0UGF0aCkgfHwgZG90bmV0UGF0aFxuICAgICAgICAgICAgY29uc3QgZG90bmV0Um9vdCA9IHBhdGguZGlybmFtZShkb3RuZXRQYXRoKVxuICAgICAgICAgICAgdGhpcy5idWlsZEFnZW50LmV4cG9ydFZhcmlhYmxlKCdET1RORVRfUk9PVCcsIGRvdG5ldFJvb3QpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idWlsZEFnZW50LmFkZFBhdGgodG9vbFBhdGgpXG5cbiAgICAgICAgcmV0dXJuIHRvb2xQYXRoXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBxdWVyeUxhdGVzdE1hdGNoKFxuICAgICAgICB0b29sTmFtZTogc3RyaW5nLFxuICAgICAgICB2ZXJzaW9uU3BlYzogc3RyaW5nLFxuICAgICAgICBpbmNsdWRlUHJlcmVsZWFzZTogYm9vbGVhblxuICAgICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHRoaXMuYnVpbGRBZ2VudC5kZWJ1ZyhcbiAgICAgICAgICAgIGBxdWVyeWluZyB0b29sIHZlcnNpb25zIGZvciAke3Rvb2xOYW1lfSR7XG4gICAgICAgICAgICAgICAgdmVyc2lvblNwZWMgPyBgQCR7dmVyc2lvblNwZWN9YCA6ICcnXG4gICAgICAgICAgICB9ICR7aW5jbHVkZVByZXJlbGVhc2UgPyAnaW5jbHVkaW5nIHByZS1yZWxlYXNlcycgOiAnJ31gXG4gICAgICAgIClcblxuICAgICAgICBjb25zdCBkb3dubG9hZFBhdGggPSBgJHtcbiAgICAgICAgICAgIERvdG5ldFRvb2wubnVnZXRSb290XG4gICAgICAgIH1xdWVyeT9xPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRvb2xOYW1lLnRvTG93ZXJDYXNlKCkpfSZwcmVyZWxlYXNlPSR7XG4gICAgICAgICAgICBpbmNsdWRlUHJlcmVsZWFzZSA/ICd0cnVlJyA6ICdmYWxzZSdcbiAgICAgICAgfSZzZW1WZXJMZXZlbD0yLjAuMGBcblxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmh0dHBDbGllbnQuZ2V0KGRvd25sb2FkUGF0aClcblxuICAgICAgICBpZiAoIXJlcyB8fCByZXMubWVzc2FnZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBib2R5OiBzdHJpbmcgPSBhd2FpdCByZXMucmVhZEJvZHkoKVxuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShib2R5KS5kYXRhXG5cbiAgICAgICAgY29uc3QgdmVyc2lvbnMgPSAoZGF0YVswXS52ZXJzaW9ucyBhcyB7IHZlcnNpb246IHN0cmluZyB9W10pLm1hcChcbiAgICAgICAgICAgIHggPT4geC52ZXJzaW9uXG4gICAgICAgIClcbiAgICAgICAgaWYgKCF2ZXJzaW9ucyB8fCAhdmVyc2lvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idWlsZEFnZW50LmRlYnVnKGBnb3QgdmVyc2lvbnM6ICR7dmVyc2lvbnMuam9pbignLCAnKX1gKVxuXG4gICAgICAgIHJldHVybiB0aGlzLnZlcnNpb25NYW5hZ2VyLmV2YWx1YXRlVmVyc2lvbnModmVyc2lvbnMsIHZlcnNpb25TcGVjKVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgYWNxdWlyZVRvb2woXG4gICAgICAgIHRvb2xOYW1lOiBzdHJpbmcsXG4gICAgICAgIHZlcnNpb246IHN0cmluZ1xuICAgICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IHRlbXBEaXJlY3RvcnkgPSBhd2FpdCB0aGlzLmJ1aWxkQWdlbnQuY3JlYXRlVGVtcERpcigpXG4gICAgICAgIGxldCBhcmdzID0gWyd0b29sJywgJ2luc3RhbGwnLCB0b29sTmFtZSwgJy0tdG9vbC1wYXRoJywgdGVtcERpcmVjdG9yeV1cblxuICAgICAgICBpZiAodmVyc2lvbikge1xuICAgICAgICAgICAgdmVyc2lvbiA9IHRoaXMudmVyc2lvbk1hbmFnZXIuY2xlYW5WZXJzaW9uKHZlcnNpb24pXG4gICAgICAgICAgICBhcmdzID0gYXJncy5jb25jYXQoWyctLXZlcnNpb24nLCB2ZXJzaW9uXSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuZXhlY3V0ZSgnZG90bmV0JywgYXJncylcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gcmVzdWx0LmNvZGUgPT09IDAgPyAnc3VjY2VzcycgOiAnZmFpbHVyZSdcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHJlc3VsdC5jb2RlID09PSAwID8gcmVzdWx0LnN0ZG91dCA6IHJlc3VsdC5zdGRlcnJcblxuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZGVidWcoYHRvb2wgaW5zdGFsbCByZXN1bHQ6ICR7c3RhdHVzfSAke21lc3NhZ2V9YClcblxuICAgICAgICBpZiAocmVzdWx0LmNvZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3IgaW5zdGFsbGluZyB0b29sJylcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmJ1aWxkQWdlbnQuY2FjaGVEaXIodGVtcERpcmVjdG9yeSwgdG9vbE5hbWUsIHZlcnNpb24pXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnaW52ZXJzaWZ5J1xuaW1wb3J0IHsgSVZlcnNpb25NYW5hZ2VyLCBWZXJzaW9uTWFuYWdlciB9IGZyb20gJy4vdmVyc2lvbk1hbmFnZXInXG5pbXBvcnQgeyBUWVBFUywgSUJ1aWxkQWdlbnQgfSBmcm9tICcuL21vZGVscydcbmltcG9ydCB7IEJ1aWxkQWdlbnQgfSBmcm9tICcuLi9hZ2VudC9tb2NrL2J1aWxkLWFnZW50J1xuXG5jb25zdCBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyKClcblxuY29udGFpbmVyLmJpbmQ8SVZlcnNpb25NYW5hZ2VyPihUWVBFUy5JVmVyc2lvbk1hbmFnZXIpLnRvKFZlcnNpb25NYW5hZ2VyKVxuY29udGFpbmVyLmJpbmQ8SUJ1aWxkQWdlbnQ+KFRZUEVTLklCdWlsZEFnZW50KS50byhCdWlsZEFnZW50KVxuXG5leHBvcnQgZGVmYXVsdCBjb250YWluZXJcbiIsImltcG9ydCB7IElSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ3R5cGVkLXJlc3QtY2xpZW50L0ludGVyZmFjZXMnXG5cbmV4cG9ydCBjb25zdCBUWVBFUyA9IHtcbiAgICBJQnVpbGRBZ2VudDogU3ltYm9sLmZvcignQnVpbGRBZ2VudCcpLFxuICAgIElEb3RuZXRUb29sOiBTeW1ib2wuZm9yKCdEb3RuZXRUb29sJyksXG4gICAgSUdpdFZlcnNpb25Ub29sOiBTeW1ib2wuZm9yKCdHaXRWZXJzaW9uVG9vbCcpLFxuICAgIElHaXRSZWxlYXNlTWFuYWdlclRvb2w6IFN5bWJvbC5mb3IoJ0dpdFJlbGVhc2VNYW5hZ2VyVG9vbCcpLFxuICAgIElWZXJzaW9uTWFuYWdlcjogU3ltYm9sLmZvcignVmVyc2lvbk1hbmFnZXInKVxufVxuXG5leHBvcnQgZW51bSBTZXR1cEZpZWxkcyB7XG4gICAgaW5jbHVkZVByZXJlbGVhc2UgPSAnaW5jbHVkZVByZXJlbGVhc2UnLFxuICAgIHZlcnNpb25TcGVjID0gJ3ZlcnNpb25TcGVjJ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTZXR1cFNldHRpbmdzIHtcbiAgICBbU2V0dXBGaWVsZHMudmVyc2lvblNwZWNdOiBzdHJpbmdcbiAgICBbU2V0dXBGaWVsZHMuaW5jbHVkZVByZXJlbGVhc2VdOiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUV4ZWNSZXN1bHQge1xuICAgIHN0ZG91dDogc3RyaW5nXG4gICAgc3RkZXJyOiBzdHJpbmdcbiAgICBjb2RlOiBudW1iZXJcbiAgICBlcnJvcjogRXJyb3Jcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQnVpbGRBZ2VudCB7XG4gICAgYWdlbnROYW1lOiBzdHJpbmdcbiAgICBwcm94eUNvbmZpZ3VyYXRpb24odXJsOiBzdHJpbmcpOiBJUmVxdWVzdE9wdGlvbnNcbiAgICBmaW5kKHRvb2xOYW1lOiBzdHJpbmcsIHZlcnNpb25TcGVjOiBzdHJpbmcsIGFyY2g/OiBzdHJpbmcpOiBzdHJpbmdcbiAgICBjYWNoZURpcihcbiAgICAgICAgc291cmNlRGlyOiBzdHJpbmcsXG4gICAgICAgIHRvb2w6IHN0cmluZyxcbiAgICAgICAgdmVyc2lvbjogc3RyaW5nLFxuICAgICAgICBhcmNoPzogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxzdHJpbmc+XG4gICAgY3JlYXRlVGVtcERpcigpOiBQcm9taXNlPHN0cmluZz5cbiAgICBkZWJ1ZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkXG4gICAgc2V0RmFpbGVkKG1lc3NhZ2U6IHN0cmluZywgZG9uZT86IGJvb2xlYW4pOiB2b2lkXG4gICAgc2V0U3VjY2VlZGVkKG1lc3NhZ2U6IHN0cmluZywgZG9uZT86IGJvb2xlYW4pOiB2b2lkXG4gICAgZXhwb3J0VmFyaWFibGUobmFtZTogc3RyaW5nLCB2YWw6IHN0cmluZyk6IHZvaWRcbiAgICBnZXRWYXJpYWJsZShuYW1lOiBzdHJpbmcpOiBzdHJpbmdcbiAgICBhZGRQYXRoKGlucHV0UGF0aDogc3RyaW5nKTogdm9pZFxuICAgIHdoaWNoKHRvb2w6IHN0cmluZywgY2hlY2s/OiBib29sZWFuKTogUHJvbWlzZTxzdHJpbmc+XG4gICAgZXhlYyhleGVjOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdKTogUHJvbWlzZTxJRXhlY1Jlc3VsdD5cblxuICAgIGdldFNvdXJjZURpcigpOiBzdHJpbmdcbiAgICBpc1ZhbGlkSW5wdXRGaWxlKGlucHV0OiBzdHJpbmcsIGZpbGU6IHN0cmluZyk6IGJvb2xlYW5cbiAgICBmaWxlRXhpc3RzKGZpbGU6IHN0cmluZyk6IGJvb2xlYW5cbiAgICBkaXJlY3RvcnlFeGlzdHMoZmlsZTogc3RyaW5nKTogYm9vbGVhblxuXG4gICAgc2V0T3V0cHV0KG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWRcbiAgICBnZXRJbnB1dChpbnB1dDogc3RyaW5nLCByZXF1aXJlZD86IGJvb2xlYW4pOiBzdHJpbmdcbiAgICBnZXRMaXN0SW5wdXQoaW5wdXQ6IHN0cmluZywgcmVxdWlyZWQ/OiBib29sZWFuKTogc3RyaW5nW11cbiAgICBnZXRCb29sZWFuSW5wdXQoaW5wdXQ6IHN0cmluZywgcmVxdWlyZWQ/OiBib29sZWFuKTogYm9vbGVhblxufVxuIiwiaW1wb3J0IHsgSUJ1aWxkQWdlbnQsIFNldHVwRmllbGRzLCBJU2V0dXBTZXR0aW5ncyB9IGZyb20gJy4vbW9kZWxzJ1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3Mge1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U2V0dXBTZXR0aW5ncyhidWlsZEFnZW50OiBJQnVpbGRBZ2VudCk6IElTZXR1cFNldHRpbmdzIHtcbiAgICAgICAgY29uc3QgdmVyc2lvblNwZWMgPSBidWlsZEFnZW50LmdldElucHV0KFNldHVwRmllbGRzLnZlcnNpb25TcGVjKVxuICAgICAgICBjb25zdCBpbmNsdWRlUHJlcmVsZWFzZSA9IGJ1aWxkQWdlbnQuZ2V0Qm9vbGVhbklucHV0KFxuICAgICAgICAgICAgU2V0dXBGaWVsZHMuaW5jbHVkZVByZXJlbGVhc2VcbiAgICAgICAgKVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZXJzaW9uU3BlYyxcbiAgICAgICAgICAgIGluY2x1ZGVQcmVyZWxlYXNlXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgY21wIGZyb20gJ3NlbXZlci1jb21wYXJlJ1xuaW1wb3J0ICogYXMgc2VtdmVyIGZyb20gJ3NlbXZlcidcbmltcG9ydCB7IGluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ2ludmVyc2lmeSdcblxuaW1wb3J0IHsgSUJ1aWxkQWdlbnQsIFRZUEVTIH0gZnJvbSAnLi9tb2RlbHMnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVZlcnNpb25NYW5hZ2VyIHtcbiAgICBpc0V4cGxpY2l0VmVyc2lvbih2ZXJzaW9uU3BlYzogc3RyaW5nKTogYm9vbGVhblxuICAgIGV2YWx1YXRlVmVyc2lvbnModmVyc2lvbnM6IHN0cmluZ1tdLCB2ZXJzaW9uU3BlYzogc3RyaW5nKTogc3RyaW5nXG4gICAgY2xlYW5WZXJzaW9uKHZlcnNpb246IHN0cmluZyk6IHN0cmluZ1xufVxuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmVyc2lvbk1hbmFnZXIgaW1wbGVtZW50cyBJVmVyc2lvbk1hbmFnZXIge1xuICAgIHByaXZhdGUgYnVpbGRBZ2VudDogSUJ1aWxkQWdlbnRcbiAgICBjb25zdHJ1Y3RvcihAaW5qZWN0KFRZUEVTLklCdWlsZEFnZW50KSBidWlsZEFnZW50OiBJQnVpbGRBZ2VudCkge1xuICAgICAgICB0aGlzLmJ1aWxkQWdlbnQgPSBidWlsZEFnZW50XG4gICAgfVxuXG4gICAgcHVibGljIGlzRXhwbGljaXRWZXJzaW9uKHZlcnNpb25TcGVjOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgYyA9IHNlbXZlci5jbGVhbih2ZXJzaW9uU3BlYylcbiAgICAgICAgdGhpcy5idWlsZEFnZW50LmRlYnVnKCdpc0V4cGxpY2l0OiAnICsgYylcblxuICAgICAgICBjb25zdCB2YWxpZCA9IHNlbXZlci52YWxpZChjKSAhPSBudWxsXG4gICAgICAgIHRoaXMuYnVpbGRBZ2VudC5kZWJ1ZygnZXhwbGljaXQ/ICcgKyB2YWxpZClcblxuICAgICAgICByZXR1cm4gdmFsaWRcbiAgICB9XG5cbiAgICBwdWJsaWMgZXZhbHVhdGVWZXJzaW9ucyh2ZXJzaW9uczogc3RyaW5nW10sIHZlcnNpb25TcGVjOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgdmVyc2lvbjogc3RyaW5nXG4gICAgICAgIHRoaXMuYnVpbGRBZ2VudC5kZWJ1ZygnZXZhbHVhdGluZyAnICsgdmVyc2lvbnMubGVuZ3RoICsgJyB2ZXJzaW9ucycpXG4gICAgICAgIHZlcnNpb25zID0gdmVyc2lvbnMuc29ydChjbXApXG4gICAgICAgIGZvciAobGV0IGkgPSB2ZXJzaW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3QgcG90ZW50aWFsOiBzdHJpbmcgPSB2ZXJzaW9uc1tpXVxuICAgICAgICAgICAgY29uc3Qgc2F0aXNmaWVkOiBib29sZWFuID0gc2VtdmVyLnNhdGlzZmllcyhwb3RlbnRpYWwsIHZlcnNpb25TcGVjKVxuICAgICAgICAgICAgaWYgKHNhdGlzZmllZCkge1xuICAgICAgICAgICAgICAgIHZlcnNpb24gPSBwb3RlbnRpYWxcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZlcnNpb24pIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRBZ2VudC5kZWJ1ZygnbWF0Y2hlZDogJyArIHZlcnNpb24pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkQWdlbnQuZGVidWcoJ21hdGNoIG5vdCBmb3VuZCcpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmVyc2lvblxuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhblZlcnNpb24odmVyc2lvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgdGhpcy5idWlsZEFnZW50LmRlYnVnKCdjbGVhbmluZzogJyArIHZlcnNpb24pXG4gICAgICAgIHJldHVybiBzZW12ZXIuY2xlYW4odmVyc2lvbilcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJQnVpbGRBZ2VudCwgVFlQRVMgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscydcbmltcG9ydCB7XG4gICAgSUdpdFJlbGVhc2VNYW5hZ2VyVG9vbCxcbiAgICBHaXRSZWxlYXNlTWFuYWdlclRvb2xcbn0gZnJvbSAnLi4vLi4vdG9vbHMvZ2l0cmVsZWFzZW1hbmFnZXIvdG9vbCdcbmltcG9ydCB7IFNldHRpbmdzIGFzIENvbW1vblNldHRpbmdzIH0gZnJvbSAnLi4vLi4vY29yZS9zZXR0aW5ncydcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSAnLi4vLi4vdG9vbHMvZ2l0cmVsZWFzZW1hbmFnZXIvc2V0dGluZ3MnXG5cbmltcG9ydCBjb250YWluZXIgZnJvbSAnLi4vLi4vY29yZS9pb2MnXG5cbmNvbnRhaW5lclxuICAgIC5iaW5kPElHaXRSZWxlYXNlTWFuYWdlclRvb2w+KFRZUEVTLklHaXRSZWxlYXNlTWFuYWdlclRvb2wpXG4gICAgLnRvKEdpdFJlbGVhc2VNYW5hZ2VyVG9vbClcblxuY29uc3QgZ2l0UmVsZWFzZU1hbmFnZXJUb29sID0gY29udGFpbmVyLmdldDxJR2l0UmVsZWFzZU1hbmFnZXJUb29sPihcbiAgICBUWVBFUy5JR2l0UmVsZWFzZU1hbmFnZXJUb29sXG4pXG5jb25zdCBidWlsZEFnZW50ID0gY29udGFpbmVyLmdldDxJQnVpbGRBZ2VudD4oVFlQRVMuSUJ1aWxkQWdlbnQpXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICB0cnkge1xuICAgICAgICBnaXRSZWxlYXNlTWFuYWdlclRvb2wuZGlzYWJsZVRlbGVtZXRyeSgpXG5cbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBDb21tb25TZXR0aW5ncy5nZXRTZXR1cFNldHRpbmdzKGJ1aWxkQWdlbnQpXG5cbiAgICAgICAgYXdhaXQgZ2l0UmVsZWFzZU1hbmFnZXJUb29sLmluc3RhbGwoXG4gICAgICAgICAgICBzZXR0aW5ncy52ZXJzaW9uU3BlYyxcbiAgICAgICAgICAgIHNldHRpbmdzLmluY2x1ZGVQcmVyZWxlYXNlXG4gICAgICAgIClcblxuICAgICAgICBidWlsZEFnZW50LnNldFN1Y2NlZWRlZChcbiAgICAgICAgICAgICdHaXRWZXJzaW9uTWFuYWdlciBpbnN0YWxsZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGJ1aWxkQWdlbnQuc2V0RmFpbGVkKGVycm9yLm1lc3NhZ2UsIHRydWUpXG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGdpdFJlbGVhc2VNYW5hZ2VyVG9vbC5kaXNhYmxlVGVsZW1ldHJ5KClcblxuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IFNldHRpbmdzLmdldENyZWF0ZVNldHRpbmdzKGJ1aWxkQWdlbnQpXG5cbiAgICAgICAgYXdhaXQgZ2l0UmVsZWFzZU1hbmFnZXJUb29sLmNyZWF0ZShzZXR0aW5ncylcblxuICAgICAgICBidWlsZEFnZW50LnNldFN1Y2NlZWRlZChcbiAgICAgICAgICAgICdHaXRWZXJzaW9uTWFuYWdlciBjcmVhdGVkIHJlbGVhc2Ugc3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGJ1aWxkQWdlbnQuc2V0RmFpbGVkKGVycm9yLm1lc3NhZ2UsIHRydWUpXG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzY2FyZCgpIHtcbiAgICB0cnkge1xuICAgICAgICBnaXRSZWxlYXNlTWFuYWdlclRvb2wuZGlzYWJsZVRlbGVtZXRyeSgpXG5cbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBTZXR0aW5ncy5nZXREaXNjYXJkU2V0dGluZ3MoYnVpbGRBZ2VudClcblxuICAgICAgICBhd2FpdCBnaXRSZWxlYXNlTWFuYWdlclRvb2wuZGlzY2FyZChzZXR0aW5ncylcblxuICAgICAgICBidWlsZEFnZW50LnNldFN1Y2NlZWRlZChcbiAgICAgICAgICAgICdHaXRWZXJzaW9uTWFuYWdlciBkaXNjYXJkZWQgcmVsZWFzZSBzdWNjZXNzZnVsbHknLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgYnVpbGRBZ2VudC5zZXRGYWlsZWQoZXJyb3IubWVzc2FnZSwgdHJ1ZSlcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICB0cnkge1xuICAgICAgICBnaXRSZWxlYXNlTWFuYWdlclRvb2wuZGlzYWJsZVRlbGVtZXRyeSgpXG5cbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBTZXR0aW5ncy5nZXRDbG9zZVNldHRpbmdzKGJ1aWxkQWdlbnQpXG5cbiAgICAgICAgYXdhaXQgZ2l0UmVsZWFzZU1hbmFnZXJUb29sLmNsb3NlKHNldHRpbmdzKVxuXG4gICAgICAgIGJ1aWxkQWdlbnQuc2V0U3VjY2VlZGVkKFxuICAgICAgICAgICAgJ0dpdFZlcnNpb25NYW5hZ2VyIGNsb3NlZCByZWxlYXNlIHN1Y2Nlc3NmdWxseScsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgIClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBidWlsZEFnZW50LnNldEZhaWxlZChlcnJvci5tZXNzYWdlLCB0cnVlKVxuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgZ2l0UmVsZWFzZU1hbmFnZXJUb29sLmRpc2FibGVUZWxlbWV0cnkoKVxuXG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gU2V0dGluZ3MuZ2V0T3BlblNldHRpbmdzKGJ1aWxkQWdlbnQpXG5cbiAgICAgICAgYXdhaXQgZ2l0UmVsZWFzZU1hbmFnZXJUb29sLm9wZW4oc2V0dGluZ3MpXG5cbiAgICAgICAgYnVpbGRBZ2VudC5zZXRTdWNjZWVkZWQoXG4gICAgICAgICAgICAnR2l0VmVyc2lvbk1hbmFnZXIgb3BlbmVkIHJlbGVhc2Ugc3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGJ1aWxkQWdlbnQuc2V0RmFpbGVkKGVycm9yLm1lc3NhZ2UsIHRydWUpXG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHVibGlzaCgpIHtcbiAgICB0cnkge1xuICAgICAgICBnaXRSZWxlYXNlTWFuYWdlclRvb2wuZGlzYWJsZVRlbGVtZXRyeSgpXG5cbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBTZXR0aW5ncy5nZXRQdWJsaXNoU2V0dGluZ3MoYnVpbGRBZ2VudClcblxuICAgICAgICBhd2FpdCBnaXRSZWxlYXNlTWFuYWdlclRvb2wucHVibGlzaChzZXR0aW5ncylcblxuICAgICAgICBidWlsZEFnZW50LnNldFN1Y2NlZWRlZChcbiAgICAgICAgICAgICdHaXRWZXJzaW9uTWFuYWdlciBwdWJsaXNoZWQgcmVsZWFzZSBzdWNjZXNzZnVsbHknLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgYnVpbGRBZ2VudC5zZXRGYWlsZWQoZXJyb3IubWVzc2FnZSwgdHJ1ZSlcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRBc3NldCgpIHtcbiAgICB0cnkge1xuICAgICAgICBnaXRSZWxlYXNlTWFuYWdlclRvb2wuZGlzYWJsZVRlbGVtZXRyeSgpXG5cbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBTZXR0aW5ncy5nZXRBZGRBc3NldFNldHRpbmdzKGJ1aWxkQWdlbnQpXG5cbiAgICAgICAgYXdhaXQgZ2l0UmVsZWFzZU1hbmFnZXJUb29sLmFkZEFzc2V0KHNldHRpbmdzKVxuXG4gICAgICAgIGJ1aWxkQWdlbnQuc2V0U3VjY2VlZGVkKFxuICAgICAgICAgICAgJ0dpdFZlcnNpb25NYW5hZ2VyIGFkZGVkIGFzc2V0cyB0byByZWxlYXNlIHN1Y2Nlc3NmdWxseScsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgIClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBidWlsZEFnZW50LnNldEZhaWxlZChlcnJvci5tZXNzYWdlLCB0cnVlKVxuICAgIH1cbn1cbiIsImV4cG9ydCBlbnVtIENvbW1vbkZpZWxkcyB7XG4gICAgcmVwb3NpdG9yeSA9ICdyZXBvc2l0b3J5JyxcbiAgICBvd25lciA9ICdvd25lcicsXG4gICAgdG9rZW4gPSAndG9rZW4nLFxuICAgIHRhcmdldERpcmVjdG9yeSA9ICd0YXJnZXREaXJlY3RvcnknXG59XG5cbmV4cG9ydCBlbnVtIENyZWF0ZUZpZWxkcyB7XG4gICAgbWlsZXN0b25lID0gJ21pbGVzdG9uZScsXG4gICAgbmFtZSA9ICduYW1lJyxcbiAgICBpbnB1dEZpbGVOYW1lID0gJ2lucHV0RmlsZU5hbWUnLFxuICAgIGlzUHJlUmVsZWFzZSA9ICdpc1ByZVJlbGVhc2UnLFxuICAgIGNvbW1pdCA9ICdjb21taXQnLFxuICAgIGFzc2V0cyA9ICdhc3NldHMnXG59XG5cbmV4cG9ydCBlbnVtIERpc2NhcmRGaWVsZHMge1xuICAgIG1pbGVzdG9uZSA9ICdtaWxlc3RvbmUnXG59XG5cbmV4cG9ydCBlbnVtIENsb3NlRmllbGRzIHtcbiAgICBtaWxlc3RvbmUgPSAnbWlsZXN0b25lJ1xufVxuXG5leHBvcnQgZW51bSBPcGVuRmllbGRzIHtcbiAgICBtaWxlc3RvbmUgPSAnbWlsZXN0b25lJ1xufVxuXG5leHBvcnQgZW51bSBQdWJsaXNoRmllbGRzIHtcbiAgICB0YWdOYW1lID0gJ3RhZ05hbWUnXG59XG5cbmV4cG9ydCBlbnVtIEFkZEFzc2V0RmllbGRzIHtcbiAgICB0YWdOYW1lID0gJ3RhZ05hbWUnLFxuICAgIGFzc2V0cyA9ICdhc3NldHMnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2l0UmVsZWFzZU1hbmFnZXJTZXR0aW5ncyB7XG4gICAgW0NvbW1vbkZpZWxkcy5yZXBvc2l0b3J5XTogc3RyaW5nXG4gICAgW0NvbW1vbkZpZWxkcy5vd25lcl06IHN0cmluZ1xuICAgIFtDb21tb25GaWVsZHMudG9rZW5dOiBzdHJpbmdcbiAgICBbQ29tbW9uRmllbGRzLnRhcmdldERpcmVjdG9yeV06IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdpdFJlbGVhc2VNYW5hZ2VyQ3JlYXRlU2V0dGluZ3NcbiAgICBleHRlbmRzIEdpdFJlbGVhc2VNYW5hZ2VyU2V0dGluZ3Mge1xuICAgIFtDcmVhdGVGaWVsZHMubWlsZXN0b25lXTogc3RyaW5nXG4gICAgW0NyZWF0ZUZpZWxkcy5uYW1lXTogc3RyaW5nXG4gICAgW0NyZWF0ZUZpZWxkcy5pbnB1dEZpbGVOYW1lXTogc3RyaW5nXG4gICAgW0NyZWF0ZUZpZWxkcy5pc1ByZVJlbGVhc2VdOiBib29sZWFuXG4gICAgW0NyZWF0ZUZpZWxkcy5jb21taXRdOiBzdHJpbmdcbiAgICBbQ3JlYXRlRmllbGRzLmFzc2V0c10/OiBzdHJpbmdbXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdpdFJlbGVhc2VNYW5hZ2VyRGlzY2FyZFNldHRpbmdzXG4gICAgZXh0ZW5kcyBHaXRSZWxlYXNlTWFuYWdlclNldHRpbmdzIHtcbiAgICBbRGlzY2FyZEZpZWxkcy5taWxlc3RvbmVdOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHaXRSZWxlYXNlTWFuYWdlckNsb3NlU2V0dGluZ3NcbiAgICBleHRlbmRzIEdpdFJlbGVhc2VNYW5hZ2VyU2V0dGluZ3Mge1xuICAgIFtDbG9zZUZpZWxkcy5taWxlc3RvbmVdOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHaXRSZWxlYXNlTWFuYWdlck9wZW5TZXR0aW5nc1xuICAgIGV4dGVuZHMgR2l0UmVsZWFzZU1hbmFnZXJTZXR0aW5ncyB7XG4gICAgW09wZW5GaWVsZHMubWlsZXN0b25lXTogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2l0UmVsZWFzZU1hbmFnZXJQdWJsaXNoU2V0dGluZ3NcbiAgICBleHRlbmRzIEdpdFJlbGVhc2VNYW5hZ2VyU2V0dGluZ3Mge1xuICAgIFtQdWJsaXNoRmllbGRzLnRhZ05hbWVdOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHaXRSZWxlYXNlTWFuYWdlckFkZEFzc2V0U2V0dGluZ3NcbiAgICBleHRlbmRzIEdpdFJlbGVhc2VNYW5hZ2VyU2V0dGluZ3Mge1xuICAgIFtBZGRBc3NldEZpZWxkcy50YWdOYW1lXTogc3RyaW5nXG4gICAgW0FkZEFzc2V0RmllbGRzLmFzc2V0c106IHN0cmluZ1tdXG59XG4iLCJpbXBvcnQgeyBJQnVpbGRBZ2VudCB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzJ1xuaW1wb3J0IHtcbiAgICBHaXRSZWxlYXNlTWFuYWdlclNldHRpbmdzLFxuICAgIENvbW1vbkZpZWxkcyxcbiAgICBDcmVhdGVGaWVsZHMsXG4gICAgRGlzY2FyZEZpZWxkcyxcbiAgICBDbG9zZUZpZWxkcyxcbiAgICBPcGVuRmllbGRzLFxuICAgIFB1Ymxpc2hGaWVsZHMsXG4gICAgQWRkQXNzZXRGaWVsZHMsXG4gICAgR2l0UmVsZWFzZU1hbmFnZXJDcmVhdGVTZXR0aW5ncyxcbiAgICBHaXRSZWxlYXNlTWFuYWdlckRpc2NhcmRTZXR0aW5ncyxcbiAgICBHaXRSZWxlYXNlTWFuYWdlckNsb3NlU2V0dGluZ3MsXG4gICAgR2l0UmVsZWFzZU1hbmFnZXJPcGVuU2V0dGluZ3MsXG4gICAgR2l0UmVsZWFzZU1hbmFnZXJQdWJsaXNoU2V0dGluZ3MsXG4gICAgR2l0UmVsZWFzZU1hbmFnZXJBZGRBc3NldFNldHRpbmdzXG59IGZyb20gJy4vbW9kZWxzJ1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3Mge1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q3JlYXRlU2V0dGluZ3MoXG4gICAgICAgIGJ1aWxkQWdlbnQ6IElCdWlsZEFnZW50XG4gICAgKTogR2l0UmVsZWFzZU1hbmFnZXJDcmVhdGVTZXR0aW5ncyB7XG4gICAgICAgIGNvbnN0IG1pbGVzdG9uZSA9IGJ1aWxkQWdlbnQuZ2V0SW5wdXQoQ3JlYXRlRmllbGRzLm1pbGVzdG9uZSlcbiAgICAgICAgY29uc3QgbmFtZSA9IGJ1aWxkQWdlbnQuZ2V0SW5wdXQoQ3JlYXRlRmllbGRzLm5hbWUpXG4gICAgICAgIGNvbnN0IGlucHV0RmlsZU5hbWUgPSBidWlsZEFnZW50LmdldElucHV0KENyZWF0ZUZpZWxkcy5pbnB1dEZpbGVOYW1lKVxuICAgICAgICBjb25zdCBpc1ByZVJlbGVhc2UgPSBidWlsZEFnZW50LmdldEJvb2xlYW5JbnB1dChcbiAgICAgICAgICAgIENyZWF0ZUZpZWxkcy5pc1ByZVJlbGVhc2VcbiAgICAgICAgKVxuICAgICAgICBjb25zdCBjb21taXQgPSBidWlsZEFnZW50LmdldElucHV0KENyZWF0ZUZpZWxkcy5jb21taXQpXG4gICAgICAgIGNvbnN0IGFzc2V0cyA9IGJ1aWxkQWdlbnQuZ2V0TGlzdElucHV0KENyZWF0ZUZpZWxkcy5hc3NldHMpXG5cbiAgICAgICAgY29uc3QgY29tbW9uU2V0dGluZ3MgPSBTZXR0aW5ncy5nZXRDb21tb25TZXR0aW5ncyhidWlsZEFnZW50KVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uY29tbW9uU2V0dGluZ3MsXG4gICAgICAgICAgICBtaWxlc3RvbmUsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgaW5wdXRGaWxlTmFtZSxcbiAgICAgICAgICAgIGlzUHJlUmVsZWFzZSxcbiAgICAgICAgICAgIGNvbW1pdCxcbiAgICAgICAgICAgIGFzc2V0c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXREaXNjYXJkU2V0dGluZ3MoXG4gICAgICAgIGJ1aWxkQWdlbnQ6IElCdWlsZEFnZW50XG4gICAgKTogR2l0UmVsZWFzZU1hbmFnZXJEaXNjYXJkU2V0dGluZ3Mge1xuICAgICAgICBjb25zdCBtaWxlc3RvbmUgPSBidWlsZEFnZW50LmdldElucHV0KERpc2NhcmRGaWVsZHMubWlsZXN0b25lKVxuXG4gICAgICAgIGNvbnN0IGNvbW1vblNldHRpbmdzID0gU2V0dGluZ3MuZ2V0Q29tbW9uU2V0dGluZ3MoYnVpbGRBZ2VudClcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmNvbW1vblNldHRpbmdzLFxuICAgICAgICAgICAgbWlsZXN0b25lXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldENsb3NlU2V0dGluZ3MoXG4gICAgICAgIGJ1aWxkQWdlbnQ6IElCdWlsZEFnZW50XG4gICAgKTogR2l0UmVsZWFzZU1hbmFnZXJDbG9zZVNldHRpbmdzIHtcbiAgICAgICAgY29uc3QgbWlsZXN0b25lID0gYnVpbGRBZ2VudC5nZXRJbnB1dChDbG9zZUZpZWxkcy5taWxlc3RvbmUpXG5cbiAgICAgICAgY29uc3QgY29tbW9uU2V0dGluZ3MgPSBTZXR0aW5ncy5nZXRDb21tb25TZXR0aW5ncyhidWlsZEFnZW50KVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uY29tbW9uU2V0dGluZ3MsXG4gICAgICAgICAgICBtaWxlc3RvbmVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0T3BlblNldHRpbmdzKFxuICAgICAgICBidWlsZEFnZW50OiBJQnVpbGRBZ2VudFxuICAgICk6IEdpdFJlbGVhc2VNYW5hZ2VyT3BlblNldHRpbmdzIHtcbiAgICAgICAgY29uc3QgbWlsZXN0b25lID0gYnVpbGRBZ2VudC5nZXRJbnB1dChPcGVuRmllbGRzLm1pbGVzdG9uZSlcblxuICAgICAgICBjb25zdCBjb21tb25TZXR0aW5ncyA9IFNldHRpbmdzLmdldENvbW1vblNldHRpbmdzKGJ1aWxkQWdlbnQpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5jb21tb25TZXR0aW5ncyxcbiAgICAgICAgICAgIG1pbGVzdG9uZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQdWJsaXNoU2V0dGluZ3MoXG4gICAgICAgIGJ1aWxkQWdlbnQ6IElCdWlsZEFnZW50XG4gICAgKTogR2l0UmVsZWFzZU1hbmFnZXJQdWJsaXNoU2V0dGluZ3Mge1xuICAgICAgICBjb25zdCB0YWdOYW1lID0gYnVpbGRBZ2VudC5nZXRJbnB1dChQdWJsaXNoRmllbGRzLnRhZ05hbWUpXG5cbiAgICAgICAgY29uc3QgY29tbW9uU2V0dGluZ3MgPSBTZXR0aW5ncy5nZXRDb21tb25TZXR0aW5ncyhidWlsZEFnZW50KVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uY29tbW9uU2V0dGluZ3MsXG4gICAgICAgICAgICB0YWdOYW1lXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEFkZEFzc2V0U2V0dGluZ3MoXG4gICAgICAgIGJ1aWxkQWdlbnQ6IElCdWlsZEFnZW50XG4gICAgKTogR2l0UmVsZWFzZU1hbmFnZXJBZGRBc3NldFNldHRpbmdzIHtcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IGJ1aWxkQWdlbnQuZ2V0SW5wdXQoQWRkQXNzZXRGaWVsZHMudGFnTmFtZSlcbiAgICAgICAgY29uc3QgYXNzZXRzID0gYnVpbGRBZ2VudC5nZXRMaXN0SW5wdXQoQWRkQXNzZXRGaWVsZHMuYXNzZXRzKVxuXG4gICAgICAgIGNvbnN0IGNvbW1vblNldHRpbmdzID0gU2V0dGluZ3MuZ2V0Q29tbW9uU2V0dGluZ3MoYnVpbGRBZ2VudClcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmNvbW1vblNldHRpbmdzLFxuICAgICAgICAgICAgdGFnTmFtZSxcbiAgICAgICAgICAgIGFzc2V0c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0Q29tbW9uU2V0dGluZ3MoXG4gICAgICAgIGJ1aWxkQWdlbnQ6IElCdWlsZEFnZW50XG4gICAgKTogR2l0UmVsZWFzZU1hbmFnZXJTZXR0aW5ncyB7XG4gICAgICAgIGNvbnN0IG93bmVyID0gYnVpbGRBZ2VudC5nZXRJbnB1dChDb21tb25GaWVsZHMub3duZXIsIHRydWUpXG4gICAgICAgIGNvbnN0IHJlcG9zaXRvcnkgPSBidWlsZEFnZW50LmdldElucHV0KENvbW1vbkZpZWxkcy5yZXBvc2l0b3J5LCB0cnVlKVxuICAgICAgICBjb25zdCB0b2tlbiA9IGJ1aWxkQWdlbnQuZ2V0SW5wdXQoQ29tbW9uRmllbGRzLnRva2VuLCB0cnVlKVxuICAgICAgICBjb25zdCB0YXJnZXREaXJlY3RvcnkgPSBidWlsZEFnZW50LmdldElucHV0KFxuICAgICAgICAgICAgQ29tbW9uRmllbGRzLnRhcmdldERpcmVjdG9yeVxuICAgICAgICApXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG93bmVyLFxuICAgICAgICAgICAgcmVwb3NpdG9yeSxcbiAgICAgICAgICAgIHRva2VuLFxuICAgICAgICAgICAgdGFyZ2V0RGlyZWN0b3J5XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuXG5pbXBvcnQgeyBUWVBFUywgSUJ1aWxkQWdlbnQsIElFeGVjUmVzdWx0IH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMnXG5pbXBvcnQgeyBpbmplY3RhYmxlLCBpbmplY3QgfSBmcm9tICdpbnZlcnNpZnknXG5pbXBvcnQgeyBEb3RuZXRUb29sLCBJRG90bmV0VG9vbCB9IGZyb20gJy4uLy4uL2NvcmUvZG90bmV0LXRvb2wnXG5pbXBvcnQgeyBJVmVyc2lvbk1hbmFnZXIgfSBmcm9tICcuLi8uLi9jb3JlL3ZlcnNpb25NYW5hZ2VyJ1xuXG5pbXBvcnQge1xuICAgIEdpdFJlbGVhc2VNYW5hZ2VyU2V0dGluZ3MsXG4gICAgR2l0UmVsZWFzZU1hbmFnZXJDcmVhdGVTZXR0aW5ncyxcbiAgICBHaXRSZWxlYXNlTWFuYWdlckRpc2NhcmRTZXR0aW5ncyxcbiAgICBHaXRSZWxlYXNlTWFuYWdlckNsb3NlU2V0dGluZ3MsXG4gICAgR2l0UmVsZWFzZU1hbmFnZXJPcGVuU2V0dGluZ3MsXG4gICAgR2l0UmVsZWFzZU1hbmFnZXJQdWJsaXNoU2V0dGluZ3MsXG4gICAgR2l0UmVsZWFzZU1hbmFnZXJBZGRBc3NldFNldHRpbmdzXG59IGZyb20gJy4vbW9kZWxzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElHaXRSZWxlYXNlTWFuYWdlclRvb2wgZXh0ZW5kcyBJRG90bmV0VG9vbCB7XG4gICAgaW5zdGFsbCh2ZXJzaW9uU3BlYzogc3RyaW5nLCBpbmNsdWRlUHJlcmVsZWFzZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD5cbiAgICBjcmVhdGUoc2V0dGluZ3M6IEdpdFJlbGVhc2VNYW5hZ2VyQ3JlYXRlU2V0dGluZ3MpOiBQcm9taXNlPElFeGVjUmVzdWx0PlxuICAgIGRpc2NhcmQoc2V0dGluZ3M6IEdpdFJlbGVhc2VNYW5hZ2VyRGlzY2FyZFNldHRpbmdzKTogUHJvbWlzZTxJRXhlY1Jlc3VsdD5cbiAgICBjbG9zZShzZXR0aW5nczogR2l0UmVsZWFzZU1hbmFnZXJDbG9zZVNldHRpbmdzKTogUHJvbWlzZTxJRXhlY1Jlc3VsdD5cbiAgICBvcGVuKHNldHRpbmdzOiBHaXRSZWxlYXNlTWFuYWdlck9wZW5TZXR0aW5ncyk6IFByb21pc2U8SUV4ZWNSZXN1bHQ+XG4gICAgcHVibGlzaChzZXR0aW5nczogR2l0UmVsZWFzZU1hbmFnZXJQdWJsaXNoU2V0dGluZ3MpOiBQcm9taXNlPElFeGVjUmVzdWx0PlxuICAgIGFkZEFzc2V0KHNldHRpbmdzOiBHaXRSZWxlYXNlTWFuYWdlckFkZEFzc2V0U2V0dGluZ3MpOiBQcm9taXNlPElFeGVjUmVzdWx0PlxufVxuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2l0UmVsZWFzZU1hbmFnZXJUb29sXG4gICAgZXh0ZW5kcyBEb3RuZXRUb29sXG4gICAgaW1wbGVtZW50cyBJR2l0UmVsZWFzZU1hbmFnZXJUb29sIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQGluamVjdChUWVBFUy5JQnVpbGRBZ2VudCkgYnVpbGRBZ2VudDogSUJ1aWxkQWdlbnQsXG4gICAgICAgIEBpbmplY3QoVFlQRVMuSVZlcnNpb25NYW5hZ2VyKSB2ZXJzaW9uTWFuYWdlcjogSVZlcnNpb25NYW5hZ2VyXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGJ1aWxkQWdlbnQsIHZlcnNpb25NYW5hZ2VyKVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBpbnN0YWxsKFxuICAgICAgICB2ZXJzaW9uU3BlYzogc3RyaW5nLFxuICAgICAgICBpbmNsdWRlUHJlcmVsZWFzZTogYm9vbGVhblxuICAgICk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLnRvb2xJbnN0YWxsKFxuICAgICAgICAgICAgJ0dpdFJlbGVhc2VNYW5hZ2VyLlRvb2wnLFxuICAgICAgICAgICAgdmVyc2lvblNwZWMsXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIGluY2x1ZGVQcmVyZWxlYXNlXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlKFxuICAgICAgICBzZXR0aW5nczogR2l0UmVsZWFzZU1hbmFnZXJDcmVhdGVTZXR0aW5nc1xuICAgICk6IFByb21pc2U8SUV4ZWNSZXN1bHQ+IHtcbiAgICAgICAgY29uc3QgYXJncyA9IHRoaXMuZ2V0Q3JlYXRlQXJndW1lbnRzKHNldHRpbmdzKVxuXG4gICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUoJ2RvdG5ldC1naXRyZWxlYXNlbWFuYWdlcicsIGFyZ3MpXG4gICAgfVxuXG4gICAgcHVibGljIGRpc2NhcmQoXG4gICAgICAgIHNldHRpbmdzOiBHaXRSZWxlYXNlTWFuYWdlckRpc2NhcmRTZXR0aW5nc1xuICAgICk6IFByb21pc2U8SUV4ZWNSZXN1bHQ+IHtcbiAgICAgICAgY29uc3QgYXJncyA9IHRoaXMuZ2V0RGlzY2FyZEFyZ3VtZW50cyhzZXR0aW5ncylcblxuICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKCdkb3RuZXQtZ2l0cmVsZWFzZW1hbmFnZXInLCBhcmdzKVxuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZShcbiAgICAgICAgc2V0dGluZ3M6IEdpdFJlbGVhc2VNYW5hZ2VyQ2xvc2VTZXR0aW5nc1xuICAgICk6IFByb21pc2U8SUV4ZWNSZXN1bHQ+IHtcbiAgICAgICAgY29uc3QgYXJncyA9IHRoaXMuZ2V0Q2xvc2VBcmd1bWVudHMoc2V0dGluZ3MpXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZSgnZG90bmV0LWdpdHJlbGVhc2VtYW5hZ2VyJywgYXJncylcbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbihzZXR0aW5nczogR2l0UmVsZWFzZU1hbmFnZXJPcGVuU2V0dGluZ3MpOiBQcm9taXNlPElFeGVjUmVzdWx0PiB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSB0aGlzLmdldE9wZW5Bcmd1bWVudHMoc2V0dGluZ3MpXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZSgnZG90bmV0LWdpdHJlbGVhc2VtYW5hZ2VyJywgYXJncylcbiAgICB9XG5cbiAgICBwdWJsaWMgcHVibGlzaChcbiAgICAgICAgc2V0dGluZ3M6IEdpdFJlbGVhc2VNYW5hZ2VyUHVibGlzaFNldHRpbmdzXG4gICAgKTogUHJvbWlzZTxJRXhlY1Jlc3VsdD4ge1xuICAgICAgICBjb25zdCBhcmdzID0gdGhpcy5nZXRQdWJsaXNoQXJndW1lbnRzKHNldHRpbmdzKVxuXG4gICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUoJ2RvdG5ldC1naXRyZWxlYXNlbWFuYWdlcicsIGFyZ3MpXG4gICAgfVxuXG4gICAgcHVibGljIGFkZEFzc2V0KFxuICAgICAgICBzZXR0aW5nczogR2l0UmVsZWFzZU1hbmFnZXJBZGRBc3NldFNldHRpbmdzXG4gICAgKTogUHJvbWlzZTxJRXhlY1Jlc3VsdD4ge1xuICAgICAgICBjb25zdCBhcmdzID0gdGhpcy5nZXRBZGRBc3NldEFyZ3VtZW50cyhzZXR0aW5ncylcblxuICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKCdkb3RuZXQtZ2l0cmVsZWFzZW1hbmFnZXInLCBhcmdzKVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29tbW9uQXJndW1lbnRzKHNldHRpbmdzOiBHaXRSZWxlYXNlTWFuYWdlclNldHRpbmdzKTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCBhcmdzOiBzdHJpbmdbXSA9IFtdXG5cbiAgICAgICAgYXJncy5wdXNoKCctLW93bmVyJywgc2V0dGluZ3Mub3duZXIpXG4gICAgICAgIGFyZ3MucHVzaCgnLS1yZXBvc2l0b3J5Jywgc2V0dGluZ3MucmVwb3NpdG9yeSlcbiAgICAgICAgYXJncy5wdXNoKCctLXRva2VuJywgc2V0dGluZ3MudG9rZW4pXG5cbiAgICAgICAgc2V0dGluZ3MudGFyZ2V0RGlyZWN0b3J5ID0gdGhpcy5nZXRSZXBvRGlyKHNldHRpbmdzLnRhcmdldERpcmVjdG9yeSlcblxuICAgICAgICBhcmdzLnB1c2goJy0tdGFyZ2V0RGlyZWN0b3J5Jywgc2V0dGluZ3MudGFyZ2V0RGlyZWN0b3J5KVxuXG4gICAgICAgIHJldHVybiBhcmdzXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDcmVhdGVBcmd1bWVudHMoXG4gICAgICAgIHNldHRpbmdzOiBHaXRSZWxlYXNlTWFuYWdlckNyZWF0ZVNldHRpbmdzXG4gICAgKTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCBhcmdzOiBzdHJpbmdbXSA9IFsnY3JlYXRlJywgLi4udGhpcy5nZXRDb21tb25Bcmd1bWVudHMoc2V0dGluZ3MpXVxuXG4gICAgICAgIGlmIChzZXR0aW5ncy5taWxlc3RvbmUpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCgnLS1taWxlc3RvbmUnLCBzZXR0aW5ncy5taWxlc3RvbmUpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNldHRpbmdzLm5hbWUpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCgnLS1uYW1lJywgc2V0dGluZ3MubmFtZSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2V0dGluZ3MuY29tbWl0KSB7XG4gICAgICAgICAgICBhcmdzLnB1c2goJy0tdGFyZ2V0Y29tbWl0aXNoJywgc2V0dGluZ3MuY29tbWl0KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLmlucHV0RmlsZU5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1aWxkQWdlbnQuZmlsZUV4aXN0cyhzZXR0aW5ncy5pbnB1dEZpbGVOYW1lKSkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaCgnLS1pbnB1dEZpbGVQYXRoJywgc2V0dGluZ3MuaW5wdXRGaWxlTmFtZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnR2l0UmVsZWFzZU1hbmFnZXIgaW5wdXRGaWxlUGF0aCBub3QgZm91bmQgYXQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5pbnB1dEZpbGVOYW1lXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzZXR0aW5ncy5pc1ByZVJlbGVhc2UpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCgnLS1wcmUnKVxuICAgICAgICB9XG4gICAgICAgIGlmIChzZXR0aW5ncy5hc3NldHMgJiYgc2V0dGluZ3MuYXNzZXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNldHRpbmdzLmFzc2V0cyA9IHNldHRpbmdzLmFzc2V0cy5tYXAoYXNzZXQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXRoLmpvaW4oc2V0dGluZ3MudGFyZ2V0RGlyZWN0b3J5LCBhc3NldClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGFyZ3MucHVzaCgnLS1hc3NldHMnLCBzZXR0aW5ncy5hc3NldHMuam9pbignLCcpKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyZ3NcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERpc2NhcmRBcmd1bWVudHMoXG4gICAgICAgIHNldHRpbmdzOiBHaXRSZWxlYXNlTWFuYWdlckRpc2NhcmRTZXR0aW5nc1xuICAgICk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgYXJnczogc3RyaW5nW10gPSBbJ2Rpc2NhcmQnLCAuLi50aGlzLmdldENvbW1vbkFyZ3VtZW50cyhzZXR0aW5ncyldXG5cbiAgICAgICAgaWYgKHNldHRpbmdzLm1pbGVzdG9uZSkge1xuICAgICAgICAgICAgYXJncy5wdXNoKCctLW1pbGVzdG9uZScsIHNldHRpbmdzLm1pbGVzdG9uZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcmdzXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDbG9zZUFyZ3VtZW50cyhcbiAgICAgICAgc2V0dGluZ3M6IEdpdFJlbGVhc2VNYW5hZ2VyQ2xvc2VTZXR0aW5nc1xuICAgICk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgYXJnczogc3RyaW5nW10gPSBbJ2Nsb3NlJywgLi4udGhpcy5nZXRDb21tb25Bcmd1bWVudHMoc2V0dGluZ3MpXVxuXG4gICAgICAgIGlmIChzZXR0aW5ncy5taWxlc3RvbmUpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCgnLS1taWxlc3RvbmUnLCBzZXR0aW5ncy5taWxlc3RvbmUpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJnc1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3BlbkFyZ3VtZW50cyhcbiAgICAgICAgc2V0dGluZ3M6IEdpdFJlbGVhc2VNYW5hZ2VyT3BlblNldHRpbmdzXG4gICAgKTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCBhcmdzOiBzdHJpbmdbXSA9IFsnb3BlbicsIC4uLnRoaXMuZ2V0Q29tbW9uQXJndW1lbnRzKHNldHRpbmdzKV1cblxuICAgICAgICBpZiAoc2V0dGluZ3MubWlsZXN0b25lKSB7XG4gICAgICAgICAgICBhcmdzLnB1c2goJy0tbWlsZXN0b25lJywgc2V0dGluZ3MubWlsZXN0b25lKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyZ3NcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFB1Ymxpc2hBcmd1bWVudHMoXG4gICAgICAgIHNldHRpbmdzOiBHaXRSZWxlYXNlTWFuYWdlclB1Ymxpc2hTZXR0aW5nc1xuICAgICk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgYXJnczogc3RyaW5nW10gPSBbJ3B1Ymxpc2gnLCAuLi50aGlzLmdldENvbW1vbkFyZ3VtZW50cyhzZXR0aW5ncyldXG5cbiAgICAgICAgaWYgKHNldHRpbmdzLnRhZ05hbWUpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCgnLS10YWdOYW1lJywgc2V0dGluZ3MudGFnTmFtZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcmdzXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRBZGRBc3NldEFyZ3VtZW50cyhcbiAgICAgICAgc2V0dGluZ3M6IEdpdFJlbGVhc2VNYW5hZ2VyQWRkQXNzZXRTZXR0aW5nc1xuICAgICk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgYXJnczogc3RyaW5nW10gPSBbXG4gICAgICAgICAgICAnYWRkYXNzZXQnLFxuICAgICAgICAgICAgLi4udGhpcy5nZXRDb21tb25Bcmd1bWVudHMoc2V0dGluZ3MpXG4gICAgICAgIF1cblxuICAgICAgICBpZiAoc2V0dGluZ3MudGFnTmFtZSkge1xuICAgICAgICAgICAgYXJncy5wdXNoKCctLXRhZ05hbWUnLCBzZXR0aW5ncy50YWdOYW1lKVxuICAgICAgICB9XG4gICAgICAgIGlmIChzZXR0aW5ncy5hc3NldHMgJiYgc2V0dGluZ3MuYXNzZXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNldHRpbmdzLmFzc2V0cyA9IHNldHRpbmdzLmFzc2V0cy5tYXAoYXNzZXQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXRoLmpvaW4oc2V0dGluZ3MudGFyZ2V0RGlyZWN0b3J5LCBhc3NldClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGFyZ3MucHVzaCgnLS1hc3NldHMnLCBzZXR0aW5ncy5hc3NldHMuam9pbignLCcpKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyZ3NcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJlcG9EaXIodGFyZ2V0UGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHdvcmtEaXI6IHN0cmluZ1xuICAgICAgICBjb25zdCBzcmNEaXIgPSB0aGlzLmJ1aWxkQWdlbnQuZ2V0U291cmNlRGlyKClcbiAgICAgICAgaWYgKCF0YXJnZXRQYXRoKSB7XG4gICAgICAgICAgICB3b3JrRGlyID0gc3JjRGlyXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5idWlsZEFnZW50LmRpcmVjdG9yeUV4aXN0cyh0YXJnZXRQYXRoKSkge1xuICAgICAgICAgICAgICAgIHdvcmtEaXIgPSBwYXRoLmpvaW4oc3JjRGlyLCB0YXJnZXRQYXRoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RpcmVjdG9yeSBub3QgZm91bmQgYXQgJyArIHRhcmdldFBhdGgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdvcmtEaXIucmVwbGFjZSgvXFxcXC9nLCAnLycpXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi90dW5uZWwnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG5ldCA9IHJlcXVpcmUoJ25ldCcpO1xudmFyIHRscyA9IHJlcXVpcmUoJ3RscycpO1xudmFyIGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG52YXIgaHR0cHMgPSByZXF1aXJlKCdodHRwcycpO1xudmFyIGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cblxuZXhwb3J0cy5odHRwT3Zlckh0dHAgPSBodHRwT3Zlckh0dHA7XG5leHBvcnRzLmh0dHBzT3Zlckh0dHAgPSBodHRwc092ZXJIdHRwO1xuZXhwb3J0cy5odHRwT3Zlckh0dHBzID0gaHR0cE92ZXJIdHRwcztcbmV4cG9ydHMuaHR0cHNPdmVySHR0cHMgPSBodHRwc092ZXJIdHRwcztcblxuXG5mdW5jdGlvbiBodHRwT3Zlckh0dHAob3B0aW9ucykge1xuICB2YXIgYWdlbnQgPSBuZXcgVHVubmVsaW5nQWdlbnQob3B0aW9ucyk7XG4gIGFnZW50LnJlcXVlc3QgPSBodHRwLnJlcXVlc3Q7XG4gIHJldHVybiBhZ2VudDtcbn1cblxuZnVuY3Rpb24gaHR0cHNPdmVySHR0cChvcHRpb25zKSB7XG4gIHZhciBhZ2VudCA9IG5ldyBUdW5uZWxpbmdBZ2VudChvcHRpb25zKTtcbiAgYWdlbnQucmVxdWVzdCA9IGh0dHAucmVxdWVzdDtcbiAgYWdlbnQuY3JlYXRlU29ja2V0ID0gY3JlYXRlU2VjdXJlU29ja2V0O1xuICBhZ2VudC5kZWZhdWx0UG9ydCA9IDQ0MztcbiAgcmV0dXJuIGFnZW50O1xufVxuXG5mdW5jdGlvbiBodHRwT3Zlckh0dHBzKG9wdGlvbnMpIHtcbiAgdmFyIGFnZW50ID0gbmV3IFR1bm5lbGluZ0FnZW50KG9wdGlvbnMpO1xuICBhZ2VudC5yZXF1ZXN0ID0gaHR0cHMucmVxdWVzdDtcbiAgcmV0dXJuIGFnZW50O1xufVxuXG5mdW5jdGlvbiBodHRwc092ZXJIdHRwcyhvcHRpb25zKSB7XG4gIHZhciBhZ2VudCA9IG5ldyBUdW5uZWxpbmdBZ2VudChvcHRpb25zKTtcbiAgYWdlbnQucmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Q7XG4gIGFnZW50LmNyZWF0ZVNvY2tldCA9IGNyZWF0ZVNlY3VyZVNvY2tldDtcbiAgYWdlbnQuZGVmYXVsdFBvcnQgPSA0NDM7XG4gIHJldHVybiBhZ2VudDtcbn1cblxuXG5mdW5jdGlvbiBUdW5uZWxpbmdBZ2VudChvcHRpb25zKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgc2VsZi5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgc2VsZi5wcm94eU9wdGlvbnMgPSBzZWxmLm9wdGlvbnMucHJveHkgfHwge307XG4gIHNlbGYubWF4U29ja2V0cyA9IHNlbGYub3B0aW9ucy5tYXhTb2NrZXRzIHx8IGh0dHAuQWdlbnQuZGVmYXVsdE1heFNvY2tldHM7XG4gIHNlbGYucmVxdWVzdHMgPSBbXTtcbiAgc2VsZi5zb2NrZXRzID0gW107XG5cbiAgc2VsZi5vbignZnJlZScsIGZ1bmN0aW9uIG9uRnJlZShzb2NrZXQsIGhvc3QsIHBvcnQsIGxvY2FsQWRkcmVzcykge1xuICAgIHZhciBvcHRpb25zID0gdG9PcHRpb25zKGhvc3QsIHBvcnQsIGxvY2FsQWRkcmVzcyk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlbGYucmVxdWVzdHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHZhciBwZW5kaW5nID0gc2VsZi5yZXF1ZXN0c1tpXTtcbiAgICAgIGlmIChwZW5kaW5nLmhvc3QgPT09IG9wdGlvbnMuaG9zdCAmJiBwZW5kaW5nLnBvcnQgPT09IG9wdGlvbnMucG9ydCkge1xuICAgICAgICAvLyBEZXRlY3QgdGhlIHJlcXVlc3QgdG8gY29ubmVjdCBzYW1lIG9yaWdpbiBzZXJ2ZXIsXG4gICAgICAgIC8vIHJldXNlIHRoZSBjb25uZWN0aW9uLlxuICAgICAgICBzZWxmLnJlcXVlc3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgcGVuZGluZy5yZXF1ZXN0Lm9uU29ja2V0KHNvY2tldCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgc29ja2V0LmRlc3Ryb3koKTtcbiAgICBzZWxmLnJlbW92ZVNvY2tldChzb2NrZXQpO1xuICB9KTtcbn1cbnV0aWwuaW5oZXJpdHMoVHVubmVsaW5nQWdlbnQsIGV2ZW50cy5FdmVudEVtaXR0ZXIpO1xuXG5UdW5uZWxpbmdBZ2VudC5wcm90b3R5cGUuYWRkUmVxdWVzdCA9IGZ1bmN0aW9uIGFkZFJlcXVlc3QocmVxLCBob3N0LCBwb3J0LCBsb2NhbEFkZHJlc3MpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgb3B0aW9ucyA9IG1lcmdlT3B0aW9ucyh7cmVxdWVzdDogcmVxfSwgc2VsZi5vcHRpb25zLCB0b09wdGlvbnMoaG9zdCwgcG9ydCwgbG9jYWxBZGRyZXNzKSk7XG5cbiAgaWYgKHNlbGYuc29ja2V0cy5sZW5ndGggPj0gdGhpcy5tYXhTb2NrZXRzKSB7XG4gICAgLy8gV2UgYXJlIG92ZXIgbGltaXQgc28gd2UnbGwgYWRkIGl0IHRvIHRoZSBxdWV1ZS5cbiAgICBzZWxmLnJlcXVlc3RzLnB1c2gob3B0aW9ucyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gSWYgd2UgYXJlIHVuZGVyIG1heFNvY2tldHMgY3JlYXRlIGEgbmV3IG9uZS5cbiAgc2VsZi5jcmVhdGVTb2NrZXQob3B0aW9ucywgZnVuY3Rpb24oc29ja2V0KSB7XG4gICAgc29ja2V0Lm9uKCdmcmVlJywgb25GcmVlKTtcbiAgICBzb2NrZXQub24oJ2Nsb3NlJywgb25DbG9zZU9yUmVtb3ZlKTtcbiAgICBzb2NrZXQub24oJ2FnZW50UmVtb3ZlJywgb25DbG9zZU9yUmVtb3ZlKTtcbiAgICByZXEub25Tb2NrZXQoc29ja2V0KTtcblxuICAgIGZ1bmN0aW9uIG9uRnJlZSgpIHtcbiAgICAgIHNlbGYuZW1pdCgnZnJlZScsIHNvY2tldCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbG9zZU9yUmVtb3ZlKGVycikge1xuICAgICAgc2VsZi5yZW1vdmVTb2NrZXQoc29ja2V0KTtcbiAgICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignZnJlZScsIG9uRnJlZSk7XG4gICAgICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25DbG9zZU9yUmVtb3ZlKTtcbiAgICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignYWdlbnRSZW1vdmUnLCBvbkNsb3NlT3JSZW1vdmUpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5UdW5uZWxpbmdBZ2VudC5wcm90b3R5cGUuY3JlYXRlU29ja2V0ID0gZnVuY3Rpb24gY3JlYXRlU29ja2V0KG9wdGlvbnMsIGNiKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHBsYWNlaG9sZGVyID0ge307XG4gIHNlbGYuc29ja2V0cy5wdXNoKHBsYWNlaG9sZGVyKTtcblxuICB2YXIgY29ubmVjdE9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoe30sIHNlbGYucHJveHlPcHRpb25zLCB7XG4gICAgbWV0aG9kOiAnQ09OTkVDVCcsXG4gICAgcGF0aDogb3B0aW9ucy5ob3N0ICsgJzonICsgb3B0aW9ucy5wb3J0LFxuICAgIGFnZW50OiBmYWxzZSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBob3N0OiBvcHRpb25zLmhvc3QgKyAnOicgKyBvcHRpb25zLnBvcnRcbiAgICB9XG4gIH0pO1xuICBpZiAob3B0aW9ucy5sb2NhbEFkZHJlc3MpIHtcbiAgICBjb25uZWN0T3B0aW9ucy5sb2NhbEFkZHJlc3MgPSBvcHRpb25zLmxvY2FsQWRkcmVzcztcbiAgfVxuICBpZiAoY29ubmVjdE9wdGlvbnMucHJveHlBdXRoKSB7XG4gICAgY29ubmVjdE9wdGlvbnMuaGVhZGVycyA9IGNvbm5lY3RPcHRpb25zLmhlYWRlcnMgfHwge307XG4gICAgY29ubmVjdE9wdGlvbnMuaGVhZGVyc1snUHJveHktQXV0aG9yaXphdGlvbiddID0gJ0Jhc2ljICcgK1xuICAgICAgICBuZXcgQnVmZmVyKGNvbm5lY3RPcHRpb25zLnByb3h5QXV0aCkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICB9XG5cbiAgZGVidWcoJ21ha2luZyBDT05ORUNUIHJlcXVlc3QnKTtcbiAgdmFyIGNvbm5lY3RSZXEgPSBzZWxmLnJlcXVlc3QoY29ubmVjdE9wdGlvbnMpO1xuICBjb25uZWN0UmVxLnVzZUNodW5rZWRFbmNvZGluZ0J5RGVmYXVsdCA9IGZhbHNlOyAvLyBmb3IgdjAuNlxuICBjb25uZWN0UmVxLm9uY2UoJ3Jlc3BvbnNlJywgb25SZXNwb25zZSk7IC8vIGZvciB2MC42XG4gIGNvbm5lY3RSZXEub25jZSgndXBncmFkZScsIG9uVXBncmFkZSk7ICAgLy8gZm9yIHYwLjZcbiAgY29ubmVjdFJlcS5vbmNlKCdjb25uZWN0Jywgb25Db25uZWN0KTsgICAvLyBmb3IgdjAuNyBvciBsYXRlclxuICBjb25uZWN0UmVxLm9uY2UoJ2Vycm9yJywgb25FcnJvcik7XG4gIGNvbm5lY3RSZXEuZW5kKCk7XG5cbiAgZnVuY3Rpb24gb25SZXNwb25zZShyZXMpIHtcbiAgICAvLyBWZXJ5IGhhY2t5LiBUaGlzIGlzIG5lY2Vzc2FyeSB0byBhdm9pZCBodHRwLXBhcnNlciBsZWFrcy5cbiAgICByZXMudXBncmFkZSA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBvblVwZ3JhZGUocmVzLCBzb2NrZXQsIGhlYWQpIHtcbiAgICAvLyBIYWNreS5cbiAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgb25Db25uZWN0KHJlcywgc29ja2V0LCBoZWFkKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29ubmVjdChyZXMsIHNvY2tldCwgaGVhZCkge1xuICAgIGNvbm5lY3RSZXEucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuXG4gICAgaWYgKHJlcy5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICAgIGRlYnVnKCd0dW5uZWxpbmcgc29ja2V0IGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCwgc3RhdHVzQ29kZT0lZCcsXG4gICAgICAgIHJlcy5zdGF0dXNDb2RlKTtcbiAgICAgIHNvY2tldC5kZXN0cm95KCk7XG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ3R1bm5lbGluZyBzb2NrZXQgY291bGQgbm90IGJlIGVzdGFibGlzaGVkLCAnICtcbiAgICAgICAgJ3N0YXR1c0NvZGU9JyArIHJlcy5zdGF0dXNDb2RlKTtcbiAgICAgIGVycm9yLmNvZGUgPSAnRUNPTk5SRVNFVCc7XG4gICAgICBvcHRpb25zLnJlcXVlc3QuZW1pdCgnZXJyb3InLCBlcnJvcik7XG4gICAgICBzZWxmLnJlbW92ZVNvY2tldChwbGFjZWhvbGRlcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChoZWFkLmxlbmd0aCA+IDApIHtcbiAgICAgIGRlYnVnKCdnb3QgaWxsZWdhbCByZXNwb25zZSBib2R5IGZyb20gcHJveHknKTtcbiAgICAgIHNvY2tldC5kZXN0cm95KCk7XG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ2dvdCBpbGxlZ2FsIHJlc3BvbnNlIGJvZHkgZnJvbSBwcm94eScpO1xuICAgICAgZXJyb3IuY29kZSA9ICdFQ09OTlJFU0VUJztcbiAgICAgIG9wdGlvbnMucmVxdWVzdC5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgICAgIHNlbGYucmVtb3ZlU29ja2V0KHBsYWNlaG9sZGVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGVidWcoJ3R1bm5lbGluZyBjb25uZWN0aW9uIGhhcyBlc3RhYmxpc2hlZCcpO1xuICAgIHNlbGYuc29ja2V0c1tzZWxmLnNvY2tldHMuaW5kZXhPZihwbGFjZWhvbGRlcildID0gc29ja2V0O1xuICAgIHJldHVybiBjYihzb2NrZXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25FcnJvcihjYXVzZSkge1xuICAgIGNvbm5lY3RSZXEucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG5cbiAgICBkZWJ1ZygndHVubmVsaW5nIHNvY2tldCBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQsIGNhdXNlPSVzXFxuJyxcbiAgICAgICAgICBjYXVzZS5tZXNzYWdlLCBjYXVzZS5zdGFjayk7XG4gICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCd0dW5uZWxpbmcgc29ja2V0IGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdjYXVzZT0nICsgY2F1c2UubWVzc2FnZSk7XG4gICAgZXJyb3IuY29kZSA9ICdFQ09OTlJFU0VUJztcbiAgICBvcHRpb25zLnJlcXVlc3QuZW1pdCgnZXJyb3InLCBlcnJvcik7XG4gICAgc2VsZi5yZW1vdmVTb2NrZXQocGxhY2Vob2xkZXIpO1xuICB9XG59O1xuXG5UdW5uZWxpbmdBZ2VudC5wcm90b3R5cGUucmVtb3ZlU29ja2V0ID0gZnVuY3Rpb24gcmVtb3ZlU29ja2V0KHNvY2tldCkge1xuICB2YXIgcG9zID0gdGhpcy5zb2NrZXRzLmluZGV4T2Yoc29ja2V0KVxuICBpZiAocG9zID09PSAtMSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnNvY2tldHMuc3BsaWNlKHBvcywgMSk7XG5cbiAgdmFyIHBlbmRpbmcgPSB0aGlzLnJlcXVlc3RzLnNoaWZ0KCk7XG4gIGlmIChwZW5kaW5nKSB7XG4gICAgLy8gSWYgd2UgaGF2ZSBwZW5kaW5nIHJlcXVlc3RzIGFuZCBhIHNvY2tldCBnZXRzIGNsb3NlZCBhIG5ldyBvbmVcbiAgICAvLyBuZWVkcyB0byBiZSBjcmVhdGVkIHRvIHRha2Ugb3ZlciBpbiB0aGUgcG9vbCBmb3IgdGhlIG9uZSB0aGF0IGNsb3NlZC5cbiAgICB0aGlzLmNyZWF0ZVNvY2tldChwZW5kaW5nLCBmdW5jdGlvbihzb2NrZXQpIHtcbiAgICAgIHBlbmRpbmcucmVxdWVzdC5vblNvY2tldChzb2NrZXQpO1xuICAgIH0pO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVTZWN1cmVTb2NrZXQob3B0aW9ucywgY2IpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBUdW5uZWxpbmdBZ2VudC5wcm90b3R5cGUuY3JlYXRlU29ja2V0LmNhbGwoc2VsZiwgb3B0aW9ucywgZnVuY3Rpb24oc29ja2V0KSB7XG4gICAgdmFyIGhvc3RIZWFkZXIgPSBvcHRpb25zLnJlcXVlc3QuZ2V0SGVhZGVyKCdob3N0Jyk7XG4gICAgdmFyIHRsc09wdGlvbnMgPSBtZXJnZU9wdGlvbnMoe30sIHNlbGYub3B0aW9ucywge1xuICAgICAgc29ja2V0OiBzb2NrZXQsXG4gICAgICBzZXJ2ZXJuYW1lOiBob3N0SGVhZGVyID8gaG9zdEhlYWRlci5yZXBsYWNlKC86LiokLywgJycpIDogb3B0aW9ucy5ob3N0XG4gICAgfSk7XG5cbiAgICAvLyAwIGlzIGR1bW15IHBvcnQgZm9yIHYwLjZcbiAgICB2YXIgc2VjdXJlU29ja2V0ID0gdGxzLmNvbm5lY3QoMCwgdGxzT3B0aW9ucyk7XG4gICAgc2VsZi5zb2NrZXRzW3NlbGYuc29ja2V0cy5pbmRleE9mKHNvY2tldCldID0gc2VjdXJlU29ja2V0O1xuICAgIGNiKHNlY3VyZVNvY2tldCk7XG4gIH0pO1xufVxuXG5cbmZ1bmN0aW9uIHRvT3B0aW9ucyhob3N0LCBwb3J0LCBsb2NhbEFkZHJlc3MpIHtcbiAgaWYgKHR5cGVvZiBob3N0ID09PSAnc3RyaW5nJykgeyAvLyBzaW5jZSB2MC4xMFxuICAgIHJldHVybiB7XG4gICAgICBob3N0OiBob3N0LFxuICAgICAgcG9ydDogcG9ydCxcbiAgICAgIGxvY2FsQWRkcmVzczogbG9jYWxBZGRyZXNzXG4gICAgfTtcbiAgfVxuICByZXR1cm4gaG9zdDsgLy8gZm9yIHYwLjExIG9yIGxhdGVyXG59XG5cbmZ1bmN0aW9uIG1lcmdlT3B0aW9ucyh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciBvdmVycmlkZXMgPSBhcmd1bWVudHNbaV07XG4gICAgaWYgKHR5cGVvZiBvdmVycmlkZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG92ZXJyaWRlcyk7XG4gICAgICBmb3IgKHZhciBqID0gMCwga2V5TGVuID0ga2V5cy5sZW5ndGg7IGogPCBrZXlMZW47ICsraikge1xuICAgICAgICB2YXIgayA9IGtleXNbal07XG4gICAgICAgIGlmIChvdmVycmlkZXNba10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRhcmdldFtrXSA9IG92ZXJyaWRlc1trXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5cbnZhciBkZWJ1ZztcbmlmIChwcm9jZXNzLmVudi5OT0RFX0RFQlVHICYmIC9cXGJ0dW5uZWxcXGIvLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRykpIHtcbiAgZGVidWcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgYXJnc1swXSA9ICdUVU5ORUw6ICcgKyBhcmdzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmdzLnVuc2hpZnQoJ1RVTk5FTDonKTtcbiAgICB9XG4gICAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgfVxufSBlbHNlIHtcbiAgZGVidWcgPSBmdW5jdGlvbigpIHt9O1xufVxuZXhwb3J0cy5kZWJ1ZyA9IGRlYnVnOyAvLyBmb3IgdGVzdFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHVybCA9IHJlcXVpcmUoXCJ1cmxcIik7XG5jb25zdCBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5jb25zdCBodHRwcyA9IHJlcXVpcmUoXCJodHRwc1wiKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKFwiLi9VdGlsXCIpO1xubGV0IGZzO1xubGV0IHR1bm5lbDtcbnZhciBIdHRwQ29kZXM7XG4oZnVuY3Rpb24gKEh0dHBDb2Rlcykge1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJPS1wiXSA9IDIwMF0gPSBcIk9LXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk11bHRpcGxlQ2hvaWNlc1wiXSA9IDMwMF0gPSBcIk11bHRpcGxlQ2hvaWNlc1wiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJNb3ZlZFBlcm1hbmVudGx5XCJdID0gMzAxXSA9IFwiTW92ZWRQZXJtYW5lbnRseVwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJSZXNvdXJjZU1vdmVkXCJdID0gMzAyXSA9IFwiUmVzb3VyY2VNb3ZlZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJTZWVPdGhlclwiXSA9IDMwM10gPSBcIlNlZU90aGVyXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk5vdE1vZGlmaWVkXCJdID0gMzA0XSA9IFwiTm90TW9kaWZpZWRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiVXNlUHJveHlcIl0gPSAzMDVdID0gXCJVc2VQcm94eVwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJTd2l0Y2hQcm94eVwiXSA9IDMwNl0gPSBcIlN3aXRjaFByb3h5XCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlRlbXBvcmFyeVJlZGlyZWN0XCJdID0gMzA3XSA9IFwiVGVtcG9yYXJ5UmVkaXJlY3RcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiUGVybWFuZW50UmVkaXJlY3RcIl0gPSAzMDhdID0gXCJQZXJtYW5lbnRSZWRpcmVjdFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJCYWRSZXF1ZXN0XCJdID0gNDAwXSA9IFwiQmFkUmVxdWVzdFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJVbmF1dGhvcml6ZWRcIl0gPSA0MDFdID0gXCJVbmF1dGhvcml6ZWRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiUGF5bWVudFJlcXVpcmVkXCJdID0gNDAyXSA9IFwiUGF5bWVudFJlcXVpcmVkXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkZvcmJpZGRlblwiXSA9IDQwM10gPSBcIkZvcmJpZGRlblwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJOb3RGb3VuZFwiXSA9IDQwNF0gPSBcIk5vdEZvdW5kXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk1ldGhvZE5vdEFsbG93ZWRcIl0gPSA0MDVdID0gXCJNZXRob2ROb3RBbGxvd2VkXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk5vdEFjY2VwdGFibGVcIl0gPSA0MDZdID0gXCJOb3RBY2NlcHRhYmxlXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZFwiXSA9IDQwN10gPSBcIlByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJSZXF1ZXN0VGltZW91dFwiXSA9IDQwOF0gPSBcIlJlcXVlc3RUaW1lb3V0XCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkNvbmZsaWN0XCJdID0gNDA5XSA9IFwiQ29uZmxpY3RcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiR29uZVwiXSA9IDQxMF0gPSBcIkdvbmVcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiVG9vTWFueVJlcXVlc3RzXCJdID0gNDI5XSA9IFwiVG9vTWFueVJlcXVlc3RzXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkludGVybmFsU2VydmVyRXJyb3JcIl0gPSA1MDBdID0gXCJJbnRlcm5hbFNlcnZlckVycm9yXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk5vdEltcGxlbWVudGVkXCJdID0gNTAxXSA9IFwiTm90SW1wbGVtZW50ZWRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiQmFkR2F0ZXdheVwiXSA9IDUwMl0gPSBcIkJhZEdhdGV3YXlcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiU2VydmljZVVuYXZhaWxhYmxlXCJdID0gNTAzXSA9IFwiU2VydmljZVVuYXZhaWxhYmxlXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkdhdGV3YXlUaW1lb3V0XCJdID0gNTA0XSA9IFwiR2F0ZXdheVRpbWVvdXRcIjtcbn0pKEh0dHBDb2RlcyA9IGV4cG9ydHMuSHR0cENvZGVzIHx8IChleHBvcnRzLkh0dHBDb2RlcyA9IHt9KSk7XG5jb25zdCBIdHRwUmVkaXJlY3RDb2RlcyA9IFtIdHRwQ29kZXMuTW92ZWRQZXJtYW5lbnRseSwgSHR0cENvZGVzLlJlc291cmNlTW92ZWQsIEh0dHBDb2Rlcy5TZWVPdGhlciwgSHR0cENvZGVzLlRlbXBvcmFyeVJlZGlyZWN0LCBIdHRwQ29kZXMuUGVybWFuZW50UmVkaXJlY3RdO1xuY29uc3QgSHR0cFJlc3BvbnNlUmV0cnlDb2RlcyA9IFtIdHRwQ29kZXMuQmFkR2F0ZXdheSwgSHR0cENvZGVzLlNlcnZpY2VVbmF2YWlsYWJsZSwgSHR0cENvZGVzLkdhdGV3YXlUaW1lb3V0XTtcbmNvbnN0IE5ldHdvcmtSZXRyeUVycm9ycyA9IFsnRUNPTk5SRVNFVCcsICdFTk9URk9VTkQnLCAnRVNPQ0tFVFRJTUVET1VUJywgJ0VUSU1FRE9VVCcsICdFQ09OTlJFRlVTRUQnXTtcbmNvbnN0IFJldHJ5YWJsZUh0dHBWZXJicyA9IFsnT1BUSU9OUycsICdHRVQnLCAnREVMRVRFJywgJ0hFQUQnXTtcbmNvbnN0IEV4cG9uZW50aWFsQmFja29mZkNlaWxpbmcgPSAxMDtcbmNvbnN0IEV4cG9uZW50aWFsQmFja29mZlRpbWVTbGljZSA9IDU7XG5jbGFzcyBIdHRwQ2xpZW50UmVzcG9uc2Uge1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG4gICAgcmVhZEJvZHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBsZXQgYnVmZmVyID0gQnVmZmVyLmFsbG9jKDApO1xuICAgICAgICAgICAgY29uc3QgZW5jb2RpbmdDaGFyc2V0ID0gdXRpbC5vYnRhaW5Db250ZW50Q2hhcnNldCh0aGlzKTtcbiAgICAgICAgICAgIC8vIEV4dHJhY3QgRW5jb2RpbmcgZnJvbSBoZWFkZXI6ICdjb250ZW50LWVuY29kaW5nJ1xuICAgICAgICAgICAgLy8gTWF0Y2ggYGd6aXBgLCBgZ3ppcCwgZGVmbGF0ZWAgdmFyaWF0aW9ucyBvZiBHWklQIGVuY29kaW5nXG4gICAgICAgICAgICBjb25zdCBjb250ZW50RW5jb2RpbmcgPSB0aGlzLm1lc3NhZ2UuaGVhZGVyc1snY29udGVudC1lbmNvZGluZyddIHx8ICcnO1xuICAgICAgICAgICAgY29uc3QgaXNHemlwcGVkRW5jb2RlZCA9IG5ldyBSZWdFeHAoJyhnemlwJCl8KGd6aXAsICpkZWZsYXRlKScpLnRlc3QoY29udGVudEVuY29kaW5nKTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZS5vbignZGF0YScsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2h1bmsgPSAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSA/IEJ1ZmZlci5mcm9tKGRhdGEsIGVuY29kaW5nQ2hhcnNldCkgOiBkYXRhO1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoW2J1ZmZlciwgY2h1bmtdKTtcbiAgICAgICAgICAgIH0pLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzR3ppcHBlZEVuY29kZWQpIHsgLy8gUHJvY2VzcyBHWmlwcGVkIFJlc3BvbnNlIEJvZHkgSEVSRVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3VuemlwcGVkQm9keSA9IHlpZWxkIHV0aWwuZGVjb21wcmVzc0d6aXBwZWRDb250ZW50KGJ1ZmZlciwgZW5jb2RpbmdDaGFyc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZ3VuemlwcGVkQm9keSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGJ1ZmZlci50b1N0cmluZyhlbmNvZGluZ0NoYXJzZXQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG5leHBvcnRzLkh0dHBDbGllbnRSZXNwb25zZSA9IEh0dHBDbGllbnRSZXNwb25zZTtcbmZ1bmN0aW9uIGlzSHR0cHMocmVxdWVzdFVybCkge1xuICAgIGxldCBwYXJzZWRVcmwgPSB1cmwucGFyc2UocmVxdWVzdFVybCk7XG4gICAgcmV0dXJuIHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG59XG5leHBvcnRzLmlzSHR0cHMgPSBpc0h0dHBzO1xudmFyIEVudmlyb25tZW50VmFyaWFibGVzO1xuKGZ1bmN0aW9uIChFbnZpcm9ubWVudFZhcmlhYmxlcykge1xuICAgIEVudmlyb25tZW50VmFyaWFibGVzW1wiSFRUUF9QUk9YWVwiXSA9IFwiSFRUUF9QUk9YWVwiO1xuICAgIEVudmlyb25tZW50VmFyaWFibGVzW1wiSFRUUFNfUFJPWFlcIl0gPSBcIkhUVFBTX1BST1hZXCI7XG4gICAgRW52aXJvbm1lbnRWYXJpYWJsZXNbXCJOT19QUk9YWVwiXSA9IFwiTk9fUFJPWFlcIjtcbn0pKEVudmlyb25tZW50VmFyaWFibGVzIHx8IChFbnZpcm9ubWVudFZhcmlhYmxlcyA9IHt9KSk7XG5jbGFzcyBIdHRwQ2xpZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih1c2VyQWdlbnQsIGhhbmRsZXJzLCByZXF1ZXN0T3B0aW9ucykge1xuICAgICAgICB0aGlzLl9pZ25vcmVTc2xFcnJvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hbGxvd1JlZGlyZWN0cyA9IHRydWU7XG4gICAgICAgIHRoaXMuX2FsbG93UmVkaXJlY3REb3duZ3JhZGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fbWF4UmVkaXJlY3RzID0gNTA7XG4gICAgICAgIHRoaXMuX2FsbG93UmV0cmllcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9tYXhSZXRyaWVzID0gMTtcbiAgICAgICAgdGhpcy5fa2VlcEFsaXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXNlckFnZW50ID0gdXNlckFnZW50O1xuICAgICAgICB0aGlzLmhhbmRsZXJzID0gaGFuZGxlcnMgfHwgW107XG4gICAgICAgIGxldCBub19wcm94eSA9IHByb2Nlc3MuZW52W0Vudmlyb25tZW50VmFyaWFibGVzLk5PX1BST1hZXTtcbiAgICAgICAgaWYgKG5vX3Byb3h5KSB7XG4gICAgICAgICAgICB0aGlzLl9odHRwUHJveHlCeXBhc3NIb3N0cyA9IFtdO1xuICAgICAgICAgICAgbm9fcHJveHkuc3BsaXQoJywnKS5mb3JFYWNoKGJ5cGFzcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5faHR0cFByb3h5QnlwYXNzSG9zdHMucHVzaCh1dGlsLmJ1aWxkUHJveHlCeXBhc3NSZWdleEZyb21FbnYoYnlwYXNzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3RPcHRpb25zID0gcmVxdWVzdE9wdGlvbnM7XG4gICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLmlnbm9yZVNzbEVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pZ25vcmVTc2xFcnJvciA9IHJlcXVlc3RPcHRpb25zLmlnbm9yZVNzbEVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc29ja2V0VGltZW91dCA9IHJlcXVlc3RPcHRpb25zLnNvY2tldFRpbWVvdXQ7XG4gICAgICAgICAgICB0aGlzLl9odHRwUHJveHkgPSByZXF1ZXN0T3B0aW9ucy5wcm94eTtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5wcm94eSAmJiByZXF1ZXN0T3B0aW9ucy5wcm94eS5wcm94eUJ5cGFzc0hvc3RzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faHR0cFByb3h5QnlwYXNzSG9zdHMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0T3B0aW9ucy5wcm94eS5wcm94eUJ5cGFzc0hvc3RzLmZvckVhY2goYnlwYXNzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faHR0cFByb3h5QnlwYXNzSG9zdHMucHVzaChuZXcgUmVnRXhwKGJ5cGFzcywgJ2knKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jZXJ0Q29uZmlnID0gcmVxdWVzdE9wdGlvbnMuY2VydDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jZXJ0Q29uZmlnKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdXNpbmcgY2VydCwgbmVlZCBmc1xuICAgICAgICAgICAgICAgIGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgICAgICAgICAgICAgICAvLyBjYWNoZSB0aGUgY2VydCBjb250ZW50IGludG8gbWVtb3J5LCBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlYWQgaXQgZnJvbSBkaXNrIGV2ZXJ5IHRpbWVcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2VydENvbmZpZy5jYUZpbGUgJiYgZnMuZXhpc3RzU3luYyh0aGlzLl9jZXJ0Q29uZmlnLmNhRmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2EgPSBmcy5yZWFkRmlsZVN5bmModGhpcy5fY2VydENvbmZpZy5jYUZpbGUsICd1dGY4Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jZXJ0Q29uZmlnLmNlcnRGaWxlICYmIGZzLmV4aXN0c1N5bmModGhpcy5fY2VydENvbmZpZy5jZXJ0RmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2VydCA9IGZzLnJlYWRGaWxlU3luYyh0aGlzLl9jZXJ0Q29uZmlnLmNlcnRGaWxlLCAndXRmOCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2VydENvbmZpZy5rZXlGaWxlICYmIGZzLmV4aXN0c1N5bmModGhpcy5fY2VydENvbmZpZy5rZXlGaWxlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXkgPSBmcy5yZWFkRmlsZVN5bmModGhpcy5fY2VydENvbmZpZy5rZXlGaWxlLCAndXRmOCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5hbGxvd1JlZGlyZWN0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWxsb3dSZWRpcmVjdHMgPSByZXF1ZXN0T3B0aW9ucy5hbGxvd1JlZGlyZWN0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5hbGxvd1JlZGlyZWN0RG93bmdyYWRlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbGxvd1JlZGlyZWN0RG93bmdyYWRlID0gcmVxdWVzdE9wdGlvbnMuYWxsb3dSZWRpcmVjdERvd25ncmFkZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5tYXhSZWRpcmVjdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21heFJlZGlyZWN0cyA9IE1hdGgubWF4KHJlcXVlc3RPcHRpb25zLm1heFJlZGlyZWN0cywgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMua2VlcEFsaXZlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9rZWVwQWxpdmUgPSByZXF1ZXN0T3B0aW9ucy5rZWVwQWxpdmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMuYWxsb3dSZXRyaWVzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbGxvd1JldHJpZXMgPSByZXF1ZXN0T3B0aW9ucy5hbGxvd1JldHJpZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMubWF4UmV0cmllcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4UmV0cmllcyA9IHJlcXVlc3RPcHRpb25zLm1heFJldHJpZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgb3B0aW9ucyhyZXF1ZXN0VXJsLCBhZGRpdGlvbmFsSGVhZGVycykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdPUFRJT05TJywgcmVxdWVzdFVybCwgbnVsbCwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xuICAgIH1cbiAgICBnZXQocmVxdWVzdFVybCwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnR0VUJywgcmVxdWVzdFVybCwgbnVsbCwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xuICAgIH1cbiAgICBkZWwocmVxdWVzdFVybCwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnREVMRVRFJywgcmVxdWVzdFVybCwgbnVsbCwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xuICAgIH1cbiAgICBwb3N0KHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCByZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgfVxuICAgIHBhdGNoKHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BBVENIJywgcmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xuICAgIH1cbiAgICBwdXQocmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUFVUJywgcmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xuICAgIH1cbiAgICBoZWFkKHJlcXVlc3RVcmwsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0hFQUQnLCByZXF1ZXN0VXJsLCBudWxsLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgfVxuICAgIHNlbmRTdHJlYW0odmVyYiwgcmVxdWVzdFVybCwgc3RyZWFtLCBhZGRpdGlvbmFsSGVhZGVycykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHZlcmIsIHJlcXVlc3RVcmwsIHN0cmVhbSwgYWRkaXRpb25hbEhlYWRlcnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIHJhdyBodHRwIHJlcXVlc3QuXG4gICAgICogQWxsIG90aGVyIG1ldGhvZHMgc3VjaCBhcyBnZXQsIHBvc3QsIHBhdGNoLCBhbmQgcmVxdWVzdCB1bHRpbWF0ZWx5IGNhbGwgdGhpcy5cbiAgICAgKiBQcmVmZXIgZ2V0LCBkZWwsIHBvc3QgYW5kIHBhdGNoXG4gICAgICovXG4gICAgcmVxdWVzdCh2ZXJiLCByZXF1ZXN0VXJsLCBkYXRhLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDbGllbnQgaGFzIGFscmVhZHkgYmVlbiBkaXNwb3NlZC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcGFyc2VkVXJsID0gdXJsLnBhcnNlKHJlcXVlc3RVcmwpO1xuICAgICAgICAgICAgbGV0IGluZm8gPSB0aGlzLl9wcmVwYXJlUmVxdWVzdCh2ZXJiLCBwYXJzZWRVcmwsIGhlYWRlcnMpO1xuICAgICAgICAgICAgLy8gT25seSBwZXJmb3JtIHJldHJpZXMgb24gcmVhZHMgc2luY2Ugd3JpdGVzIG1heSBub3QgYmUgaWRlbXBvdGVudC5cbiAgICAgICAgICAgIGxldCBtYXhUcmllcyA9ICh0aGlzLl9hbGxvd1JldHJpZXMgJiYgUmV0cnlhYmxlSHR0cFZlcmJzLmluZGV4T2YodmVyYikgIT0gLTEpID8gdGhpcy5fbWF4UmV0cmllcyArIDEgOiAxO1xuICAgICAgICAgICAgbGV0IG51bVRyaWVzID0gMDtcbiAgICAgICAgICAgIGxldCByZXNwb25zZTtcbiAgICAgICAgICAgIHdoaWxlIChudW1UcmllcyA8IG1heFRyaWVzKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB5aWVsZCB0aGlzLnJlcXVlc3RSYXcoaW5mbywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbnVtVHJpZXMrKztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVyciAmJiBlcnIuY29kZSAmJiBOZXR3b3JrUmV0cnlFcnJvcnMuaW5kZXhPZihlcnIuY29kZSkgPiAtMSAmJiBudW1UcmllcyA8IG1heFRyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLl9wZXJmb3JtRXhwb25lbnRpYWxCYWNrb2ZmKG51bVRyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgaXQncyBhbiBhdXRoZW50aWNhdGlvbiBjaGFsbGVuZ2VcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UubWVzc2FnZSAmJiByZXNwb25zZS5tZXNzYWdlLnN0YXR1c0NvZGUgPT09IEh0dHBDb2Rlcy5VbmF1dGhvcml6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF1dGhlbnRpY2F0aW9uSGFuZGxlcjtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhhbmRsZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVyc1tpXS5jYW5IYW5kbGVBdXRoZW50aWNhdGlvbihyZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbkhhbmRsZXIgPSB0aGlzLmhhbmRsZXJzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdXRoZW50aWNhdGlvbkhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoZW50aWNhdGlvbkhhbmRsZXIuaGFuZGxlQXV0aGVudGljYXRpb24odGhpcywgaW5mbywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHJlY2VpdmVkIGFuIHVuYXV0aG9yaXplZCByZXNwb25zZSBidXQgaGF2ZSBubyBoYW5kbGVycyB0byBoYW5kbGUgaXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMZXQgdGhlIHJlc3BvbnNlIHJldHVybiB0byB0aGUgY2FsbGVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCByZWRpcmVjdHNSZW1haW5pbmcgPSB0aGlzLl9tYXhSZWRpcmVjdHM7XG4gICAgICAgICAgICAgICAgd2hpbGUgKEh0dHBSZWRpcmVjdENvZGVzLmluZGV4T2YocmVzcG9uc2UubWVzc2FnZS5zdGF0dXNDb2RlKSAhPSAtMVxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9hbGxvd1JlZGlyZWN0c1xuICAgICAgICAgICAgICAgICAgICAmJiByZWRpcmVjdHNSZW1haW5pbmcgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZGlyZWN0VXJsID0gcmVzcG9uc2UubWVzc2FnZS5oZWFkZXJzW1wibG9jYXRpb25cIl07XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVkaXJlY3RVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlJ3Mgbm8gbG9jYXRpb24gdG8gcmVkaXJlY3QgdG8sIHdlIHdvbid0XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VkUmVkaXJlY3RVcmwgPSB1cmwucGFyc2UocmVkaXJlY3RVcmwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VkVXJsLnByb3RvY29sID09ICdodHRwczonICYmIHBhcnNlZFVybC5wcm90b2NvbCAhPSBwYXJzZWRSZWRpcmVjdFVybC5wcm90b2NvbCAmJiAhdGhpcy5fYWxsb3dSZWRpcmVjdERvd25ncmFkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVkaXJlY3QgZnJvbSBIVFRQUyB0byBIVFRQIHByb3RvY29sLiBUaGlzIGRvd25ncmFkZSBpcyBub3QgYWxsb3dlZCBmb3Igc2VjdXJpdHkgcmVhc29ucy4gSWYgeW91IHdhbnQgdG8gYWxsb3cgdGhpcyBiZWhhdmlvciwgc2V0IHRoZSBhbGxvd1JlZGlyZWN0RG93bmdyYWRlIG9wdGlvbiB0byB0cnVlLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGZpbmlzaCByZWFkaW5nIHRoZSByZXNwb25zZSBiZWZvcmUgcmVhc3NpZ25pbmcgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hpY2ggd2lsbCBsZWFrIHRoZSBvcGVuIHNvY2tldC5cbiAgICAgICAgICAgICAgICAgICAgeWllbGQgcmVzcG9uc2UucmVhZEJvZHkoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0J3MgbWFrZSB0aGUgcmVxdWVzdCB3aXRoIHRoZSBuZXcgcmVkaXJlY3RVcmxcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuX3ByZXBhcmVSZXF1ZXN0KHZlcmIsIHBhcnNlZFJlZGlyZWN0VXJsLCBoZWFkZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB5aWVsZCB0aGlzLnJlcXVlc3RSYXcoaW5mbywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0c1JlbWFpbmluZy0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoSHR0cFJlc3BvbnNlUmV0cnlDb2Rlcy5pbmRleE9mKHJlc3BvbnNlLm1lc3NhZ2Uuc3RhdHVzQ29kZSkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgbm90IGEgcmV0cnkgY29kZSwgcmV0dXJuIGltbWVkaWF0ZWx5IGluc3RlYWQgb2YgcmV0cnlpbmdcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBudW1UcmllcyArPSAxO1xuICAgICAgICAgICAgICAgIGlmIChudW1UcmllcyA8IG1heFRyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHJlc3BvbnNlLnJlYWRCb2R5KCk7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuX3BlcmZvcm1FeHBvbmVudGlhbEJhY2tvZmYobnVtVHJpZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE5lZWRzIHRvIGJlIGNhbGxlZCBpZiBrZWVwQWxpdmUgaXMgc2V0IHRvIHRydWUgaW4gcmVxdWVzdCBvcHRpb25zLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9hZ2VudCkge1xuICAgICAgICAgICAgdGhpcy5fYWdlbnQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmF3IHJlcXVlc3QuXG4gICAgICogQHBhcmFtIGluZm9cbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqL1xuICAgIHJlcXVlc3RSYXcoaW5mbywgZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNhbGxiYWNrRm9yUmVzdWx0ID0gZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdFJhd1dpdGhDYWxsYmFjayhpbmZvLCBkYXRhLCBjYWxsYmFja0ZvclJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSYXcgcmVxdWVzdCB3aXRoIGNhbGxiYWNrLlxuICAgICAqIEBwYXJhbSBpbmZvXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcGFyYW0gb25SZXN1bHRcbiAgICAgKi9cbiAgICByZXF1ZXN0UmF3V2l0aENhbGxiYWNrKGluZm8sIGRhdGEsIG9uUmVzdWx0KSB7XG4gICAgICAgIGxldCBzb2NrZXQ7XG4gICAgICAgIGlmICh0eXBlb2YgKGRhdGEpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaW5mby5vcHRpb25zLmhlYWRlcnNbXCJDb250ZW50LUxlbmd0aFwiXSA9IEJ1ZmZlci5ieXRlTGVuZ3RoKGRhdGEsICd1dGY4Jyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNhbGxiYWNrQ2FsbGVkID0gZmFsc2U7XG4gICAgICAgIGxldCBoYW5kbGVSZXN1bHQgPSAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgIGlmICghY2FsbGJhY2tDYWxsZWQpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja0NhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgb25SZXN1bHQoZXJyLCByZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsZXQgcmVxID0gaW5mby5odHRwTW9kdWxlLnJlcXVlc3QoaW5mby5vcHRpb25zLCAobXNnKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzID0gbmV3IEh0dHBDbGllbnRSZXNwb25zZShtc2cpO1xuICAgICAgICAgICAgaGFuZGxlUmVzdWx0KG51bGwsIHJlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXEub24oJ3NvY2tldCcsIChzb2NrKSA9PiB7XG4gICAgICAgICAgICBzb2NrZXQgPSBzb2NrO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gSWYgd2UgZXZlciBnZXQgZGlzY29ubmVjdGVkLCB3ZSB3YW50IHRoZSBzb2NrZXQgdG8gdGltZW91dCBldmVudHVhbGx5XG4gICAgICAgIHJlcS5zZXRUaW1lb3V0KHRoaXMuX3NvY2tldFRpbWVvdXQgfHwgMyAqIDYwMDAwLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc29ja2V0KSB7XG4gICAgICAgICAgICAgICAgc29ja2V0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhhbmRsZVJlc3VsdChuZXcgRXJyb3IoJ1JlcXVlc3QgdGltZW91dDogJyArIGluZm8ub3B0aW9ucy5wYXRoKSwgbnVsbCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgLy8gZXJyIGhhcyBzdGF0dXNDb2RlIHByb3BlcnR5XG4gICAgICAgICAgICAvLyByZXMgc2hvdWxkIGhhdmUgaGVhZGVyc1xuICAgICAgICAgICAgaGFuZGxlUmVzdWx0KGVyciwgbnVsbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZGF0YSAmJiB0eXBlb2YgKGRhdGEpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmVxLndyaXRlKGRhdGEsICd1dGY4Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEgJiYgdHlwZW9mIChkYXRhKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRhdGEub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlcS5lbmQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGF0YS5waXBlKHJlcSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXEuZW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3ByZXBhcmVSZXF1ZXN0KG1ldGhvZCwgcmVxdWVzdFVybCwgaGVhZGVycykge1xuICAgICAgICBjb25zdCBpbmZvID0ge307XG4gICAgICAgIGluZm8ucGFyc2VkVXJsID0gcmVxdWVzdFVybDtcbiAgICAgICAgY29uc3QgdXNpbmdTc2wgPSBpbmZvLnBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgICAgIGluZm8uaHR0cE1vZHVsZSA9IHVzaW5nU3NsID8gaHR0cHMgOiBodHRwO1xuICAgICAgICBjb25zdCBkZWZhdWx0UG9ydCA9IHVzaW5nU3NsID8gNDQzIDogODA7XG4gICAgICAgIGluZm8ub3B0aW9ucyA9IHt9O1xuICAgICAgICBpbmZvLm9wdGlvbnMuaG9zdCA9IGluZm8ucGFyc2VkVXJsLmhvc3RuYW1lO1xuICAgICAgICBpbmZvLm9wdGlvbnMucG9ydCA9IGluZm8ucGFyc2VkVXJsLnBvcnQgPyBwYXJzZUludChpbmZvLnBhcnNlZFVybC5wb3J0KSA6IGRlZmF1bHRQb3J0O1xuICAgICAgICBpbmZvLm9wdGlvbnMucGF0aCA9IChpbmZvLnBhcnNlZFVybC5wYXRobmFtZSB8fCAnJykgKyAoaW5mby5wYXJzZWRVcmwuc2VhcmNoIHx8ICcnKTtcbiAgICAgICAgaW5mby5vcHRpb25zLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgaW5mby5vcHRpb25zLnRpbWVvdXQgPSAodGhpcy5yZXF1ZXN0T3B0aW9ucyAmJiB0aGlzLnJlcXVlc3RPcHRpb25zLnNvY2tldFRpbWVvdXQpIHx8IHRoaXMuX3NvY2tldFRpbWVvdXQ7XG4gICAgICAgIHRoaXMuX3NvY2tldFRpbWVvdXQgPSBpbmZvLm9wdGlvbnMudGltZW91dDtcbiAgICAgICAgaW5mby5vcHRpb25zLmhlYWRlcnMgPSB0aGlzLl9tZXJnZUhlYWRlcnMoaGVhZGVycyk7XG4gICAgICAgIGlmICh0aGlzLnVzZXJBZ2VudCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpbmZvLm9wdGlvbnMuaGVhZGVyc1tcInVzZXItYWdlbnRcIl0gPSB0aGlzLnVzZXJBZ2VudDtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLm9wdGlvbnMuYWdlbnQgPSB0aGlzLl9nZXRBZ2VudChpbmZvLnBhcnNlZFVybCk7XG4gICAgICAgIC8vIGdpdmVzIGhhbmRsZXJzIGFuIG9wcG9ydHVuaXR5IHRvIHBhcnRpY2lwYXRlXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZXJzICYmICF0aGlzLl9pc1ByZXNpZ25lZCh1cmwuZm9ybWF0KHJlcXVlc3RVcmwpKSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaGFuZGxlci5wcmVwYXJlUmVxdWVzdChpbmZvLm9wdGlvbnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuICAgIF9pc1ByZXNpZ25lZChyZXF1ZXN0VXJsKSB7XG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RPcHRpb25zICYmIHRoaXMucmVxdWVzdE9wdGlvbnMucHJlc2lnbmVkVXJsUGF0dGVybnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhdHRlcm5zID0gdGhpcy5yZXF1ZXN0T3B0aW9ucy5wcmVzaWduZWRVcmxQYXR0ZXJucztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0dGVybnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdFVybC5tYXRjaChwYXR0ZXJuc1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgX21lcmdlSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgICAgIGNvbnN0IGxvd2VyY2FzZUtleXMgPSBvYmogPT4gT2JqZWN0LmtleXMob2JqKS5yZWR1Y2UoKGMsIGspID0+IChjW2sudG9Mb3dlckNhc2UoKV0gPSBvYmpba10sIGMpLCB7fSk7XG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RPcHRpb25zICYmIHRoaXMucmVxdWVzdE9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGxvd2VyY2FzZUtleXModGhpcy5yZXF1ZXN0T3B0aW9ucy5oZWFkZXJzKSwgbG93ZXJjYXNlS2V5cyhoZWFkZXJzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvd2VyY2FzZUtleXMoaGVhZGVycyB8fCB7fSk7XG4gICAgfVxuICAgIF9nZXRBZ2VudChwYXJzZWRVcmwpIHtcbiAgICAgICAgbGV0IGFnZW50O1xuICAgICAgICBsZXQgcHJveHkgPSB0aGlzLl9nZXRQcm94eShwYXJzZWRVcmwpO1xuICAgICAgICBsZXQgdXNlUHJveHkgPSBwcm94eS5wcm94eVVybCAmJiBwcm94eS5wcm94eVVybC5ob3N0bmFtZSAmJiAhdGhpcy5faXNNYXRjaEluQnlwYXNzUHJveHlMaXN0KHBhcnNlZFVybCk7XG4gICAgICAgIGlmICh0aGlzLl9rZWVwQWxpdmUgJiYgdXNlUHJveHkpIHtcbiAgICAgICAgICAgIGFnZW50ID0gdGhpcy5fcHJveHlBZ2VudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fa2VlcEFsaXZlICYmICF1c2VQcm94eSkge1xuICAgICAgICAgICAgYWdlbnQgPSB0aGlzLl9hZ2VudDtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBhZ2VudCBpcyBhbHJlYWR5IGFzc2lnbmVkIHVzZSB0aGF0IGFnZW50LlxuICAgICAgICBpZiAoISFhZ2VudCkge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzaW5nU3NsID0gcGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcbiAgICAgICAgbGV0IG1heFNvY2tldHMgPSAxMDA7XG4gICAgICAgIGlmICghIXRoaXMucmVxdWVzdE9wdGlvbnMpIHtcbiAgICAgICAgICAgIG1heFNvY2tldHMgPSB0aGlzLnJlcXVlc3RPcHRpb25zLm1heFNvY2tldHMgfHwgaHR0cC5nbG9iYWxBZ2VudC5tYXhTb2NrZXRzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1c2VQcm94eSkge1xuICAgICAgICAgICAgLy8gSWYgdXNpbmcgcHJveHksIG5lZWQgdHVubmVsXG4gICAgICAgICAgICBpZiAoIXR1bm5lbCkge1xuICAgICAgICAgICAgICAgIHR1bm5lbCA9IHJlcXVpcmUoJ3R1bm5lbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYWdlbnRPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIG1heFNvY2tldHM6IG1heFNvY2tldHMsXG4gICAgICAgICAgICAgICAga2VlcEFsaXZlOiB0aGlzLl9rZWVwQWxpdmUsXG4gICAgICAgICAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJveHlBdXRoOiBwcm94eS5wcm94eUF1dGgsXG4gICAgICAgICAgICAgICAgICAgIGhvc3Q6IHByb3h5LnByb3h5VXJsLmhvc3RuYW1lLFxuICAgICAgICAgICAgICAgICAgICBwb3J0OiBwcm94eS5wcm94eVVybC5wb3J0XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgdHVubmVsQWdlbnQ7XG4gICAgICAgICAgICBjb25zdCBvdmVySHR0cHMgPSBwcm94eS5wcm94eVVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgICAgICAgICBpZiAodXNpbmdTc2wpIHtcbiAgICAgICAgICAgICAgICB0dW5uZWxBZ2VudCA9IG92ZXJIdHRwcyA/IHR1bm5lbC5odHRwc092ZXJIdHRwcyA6IHR1bm5lbC5odHRwc092ZXJIdHRwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHVubmVsQWdlbnQgPSBvdmVySHR0cHMgPyB0dW5uZWwuaHR0cE92ZXJIdHRwcyA6IHR1bm5lbC5odHRwT3Zlckh0dHA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZ2VudCA9IHR1bm5lbEFnZW50KGFnZW50T3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLl9wcm94eUFnZW50ID0gYWdlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgcmV1c2luZyBhZ2VudCBhY3Jvc3MgcmVxdWVzdCBhbmQgdHVubmVsaW5nIGFnZW50IGlzbid0IGFzc2lnbmVkIGNyZWF0ZSBhIG5ldyBhZ2VudFxuICAgICAgICBpZiAodGhpcy5fa2VlcEFsaXZlICYmICFhZ2VudCkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHsga2VlcEFsaXZlOiB0aGlzLl9rZWVwQWxpdmUsIG1heFNvY2tldHM6IG1heFNvY2tldHMgfTtcbiAgICAgICAgICAgIGFnZW50ID0gdXNpbmdTc2wgPyBuZXcgaHR0cHMuQWdlbnQob3B0aW9ucykgOiBuZXcgaHR0cC5BZ2VudChvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuX2FnZW50ID0gYWdlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgbm90IHVzaW5nIHByaXZhdGUgYWdlbnQgYW5kIHR1bm5lbCBhZ2VudCBpc24ndCBzZXR1cCB0aGVuIHVzZSBnbG9iYWwgYWdlbnRcbiAgICAgICAgaWYgKCFhZ2VudCkge1xuICAgICAgICAgICAgYWdlbnQgPSB1c2luZ1NzbCA/IGh0dHBzLmdsb2JhbEFnZW50IDogaHR0cC5nbG9iYWxBZ2VudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXNpbmdTc2wgJiYgdGhpcy5faWdub3JlU3NsRXJyb3IpIHtcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gc2V0IE5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQ9MCBzaW5jZSB0aGF0IHdpbGwgYWZmZWN0IHJlcXVlc3QgZm9yIGVudGlyZSBwcm9jZXNzXG4gICAgICAgICAgICAvLyBodHRwLlJlcXVlc3RPcHRpb25zIGRvZXNuJ3QgZXhwb3NlIGEgd2F5IHRvIG1vZGlmeSBSZXF1ZXN0T3B0aW9ucy5hZ2VudC5vcHRpb25zXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIGNhc3QgaXQgdG8gYW55IGFuZCBjaGFuZ2UgaXQgZGlyZWN0bHlcbiAgICAgICAgICAgIGFnZW50Lm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGFnZW50Lm9wdGlvbnMgfHwge30sIHsgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXNpbmdTc2wgJiYgdGhpcy5fY2VydENvbmZpZykge1xuICAgICAgICAgICAgYWdlbnQub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oYWdlbnQub3B0aW9ucyB8fCB7fSwgeyBjYTogdGhpcy5fY2EsIGNlcnQ6IHRoaXMuX2NlcnQsIGtleTogdGhpcy5fa2V5LCBwYXNzcGhyYXNlOiB0aGlzLl9jZXJ0Q29uZmlnLnBhc3NwaHJhc2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFnZW50O1xuICAgIH1cbiAgICBfZ2V0UHJveHkocGFyc2VkVXJsKSB7XG4gICAgICAgIGxldCB1c2luZ1NzbCA9IHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgICAgIGxldCBwcm94eUNvbmZpZyA9IHRoaXMuX2h0dHBQcm94eTtcbiAgICAgICAgLy8gZmFsbGJhY2sgdG8gaHR0cF9wcm94eSBhbmQgaHR0cHNfcHJveHkgZW52XG4gICAgICAgIGxldCBodHRwc19wcm94eSA9IHByb2Nlc3MuZW52W0Vudmlyb25tZW50VmFyaWFibGVzLkhUVFBTX1BST1hZXTtcbiAgICAgICAgbGV0IGh0dHBfcHJveHkgPSBwcm9jZXNzLmVudltFbnZpcm9ubWVudFZhcmlhYmxlcy5IVFRQX1BST1hZXTtcbiAgICAgICAgaWYgKCFwcm94eUNvbmZpZykge1xuICAgICAgICAgICAgaWYgKGh0dHBzX3Byb3h5ICYmIHVzaW5nU3NsKSB7XG4gICAgICAgICAgICAgICAgcHJveHlDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3h5VXJsOiBodHRwc19wcm94eVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChodHRwX3Byb3h5KSB7XG4gICAgICAgICAgICAgICAgcHJveHlDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3h5VXJsOiBodHRwX3Byb3h5XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJveHlVcmw7XG4gICAgICAgIGxldCBwcm94eUF1dGg7XG4gICAgICAgIGlmIChwcm94eUNvbmZpZykge1xuICAgICAgICAgICAgaWYgKHByb3h5Q29uZmlnLnByb3h5VXJsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwcm94eVVybCA9IHVybC5wYXJzZShwcm94eUNvbmZpZy5wcm94eVVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJveHlDb25maWcucHJveHlVc2VybmFtZSB8fCBwcm94eUNvbmZpZy5wcm94eVBhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgcHJveHlBdXRoID0gcHJveHlDb25maWcucHJveHlVc2VybmFtZSArIFwiOlwiICsgcHJveHlDb25maWcucHJveHlQYXNzd29yZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBwcm94eVVybDogcHJveHlVcmwsIHByb3h5QXV0aDogcHJveHlBdXRoIH07XG4gICAgfVxuICAgIF9pc01hdGNoSW5CeXBhc3NQcm94eUxpc3QocGFyc2VkVXJsKSB7XG4gICAgICAgIGlmICghdGhpcy5faHR0cFByb3h5QnlwYXNzSG9zdHMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYnlwYXNzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2h0dHBQcm94eUJ5cGFzc0hvc3RzLmZvckVhY2goYnlwYXNzSG9zdCA9PiB7XG4gICAgICAgICAgICBpZiAoYnlwYXNzSG9zdC50ZXN0KHBhcnNlZFVybC5ocmVmKSkge1xuICAgICAgICAgICAgICAgIGJ5cGFzcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYnlwYXNzO1xuICAgIH1cbiAgICBfcGVyZm9ybUV4cG9uZW50aWFsQmFja29mZihyZXRyeU51bWJlcikge1xuICAgICAgICByZXRyeU51bWJlciA9IE1hdGgubWluKEV4cG9uZW50aWFsQmFja29mZkNlaWxpbmcsIHJldHJ5TnVtYmVyKTtcbiAgICAgICAgY29uc3QgbXMgPSBFeHBvbmVudGlhbEJhY2tvZmZUaW1lU2xpY2UgKiBNYXRoLnBvdygyLCByZXRyeU51bWJlcik7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZSgpLCBtcykpO1xuICAgIH1cbn1cbmV4cG9ydHMuSHR0cENsaWVudCA9IEh0dHBDbGllbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0LiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcXMgPSByZXF1aXJlKFwicXNcIik7XG5jb25zdCB1cmwgPSByZXF1aXJlKFwidXJsXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgemxpYiA9IHJlcXVpcmUoXCJ6bGliXCIpO1xuLyoqXG4gKiBjcmVhdGVzIGFuIHVybCBmcm9tIGEgcmVxdWVzdCB1cmwgYW5kIG9wdGlvbmFsIGJhc2UgdXJsIChodHRwOi8vc2VydmVyOjgwODApXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2UgLSBhIGZ1bGx5IHF1YWxpZmllZCB1cmwgb3IgcmVsYXRpdmUgcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVcmwgLSBhbiBvcHRpb25hbCBiYXNlVXJsIChodHRwOi8vc2VydmVyOjgwODApXG4gKiBAcGFyYW0ge0lSZXF1ZXN0T3B0aW9uc30gb3B0aW9ucyAtIGFuIG9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0LCBjb3VsZCBpbmNsdWRlIFF1ZXJ5UGFyYW1ldGVycyBlLmcuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gcmVzdWx0YW50IHVybFxuICovXG5mdW5jdGlvbiBnZXRVcmwocmVzb3VyY2UsIGJhc2VVcmwsIHF1ZXJ5UGFyYW1zKSB7XG4gICAgY29uc3QgcGF0aEFwaSA9IHBhdGgucG9zaXggfHwgcGF0aDtcbiAgICBsZXQgcmVxdWVzdFVybCA9ICcnO1xuICAgIGlmICghYmFzZVVybCkge1xuICAgICAgICByZXF1ZXN0VXJsID0gcmVzb3VyY2U7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFyZXNvdXJjZSkge1xuICAgICAgICByZXF1ZXN0VXJsID0gYmFzZVVybDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGJhc2UgPSB1cmwucGFyc2UoYmFzZVVybCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdGFudFVybCA9IHVybC5wYXJzZShyZXNvdXJjZSk7XG4gICAgICAgIC8vIHJlc291cmNlIChzcGVjaWZpYyBwZXIgcmVxdWVzdCkgZWxlbWVudHMgdGFrZSBwcmlvcml0eVxuICAgICAgICByZXN1bHRhbnRVcmwucHJvdG9jb2wgPSByZXN1bHRhbnRVcmwucHJvdG9jb2wgfHwgYmFzZS5wcm90b2NvbDtcbiAgICAgICAgcmVzdWx0YW50VXJsLmF1dGggPSByZXN1bHRhbnRVcmwuYXV0aCB8fCBiYXNlLmF1dGg7XG4gICAgICAgIHJlc3VsdGFudFVybC5ob3N0ID0gcmVzdWx0YW50VXJsLmhvc3QgfHwgYmFzZS5ob3N0O1xuICAgICAgICByZXN1bHRhbnRVcmwucGF0aG5hbWUgPSBwYXRoQXBpLnJlc29sdmUoYmFzZS5wYXRobmFtZSwgcmVzdWx0YW50VXJsLnBhdGhuYW1lKTtcbiAgICAgICAgaWYgKCFyZXN1bHRhbnRVcmwucGF0aG5hbWUuZW5kc1dpdGgoJy8nKSAmJiByZXNvdXJjZS5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICByZXN1bHRhbnRVcmwucGF0aG5hbWUgKz0gJy8nO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RVcmwgPSB1cmwuZm9ybWF0KHJlc3VsdGFudFVybCk7XG4gICAgfVxuICAgIHJldHVybiBxdWVyeVBhcmFtcyA/XG4gICAgICAgIGdldFVybFdpdGhQYXJzZWRRdWVyeVBhcmFtcyhyZXF1ZXN0VXJsLCBxdWVyeVBhcmFtcykgOlxuICAgICAgICByZXF1ZXN0VXJsO1xufVxuZXhwb3J0cy5nZXRVcmwgPSBnZXRVcmw7XG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdFVybFxuICogQHBhcmFtIHtJUmVxdWVzdFF1ZXJ5UGFyYW1zfSBxdWVyeVBhcmFtc1xuICogQHJldHVybiB7c3RyaW5nfSAtIFJlcXVlc3QncyBVUkwgd2l0aCBRdWVyeSBQYXJhbWV0ZXJzIGFwcGVuZGVkL3BhcnNlZC5cbiAqL1xuZnVuY3Rpb24gZ2V0VXJsV2l0aFBhcnNlZFF1ZXJ5UGFyYW1zKHJlcXVlc3RVcmwsIHF1ZXJ5UGFyYW1zKSB7XG4gICAgY29uc3QgdXJsID0gcmVxdWVzdFVybC5yZXBsYWNlKC9cXD8kL2csICcnKTsgLy8gQ2xlYW4gYW55IGV4dHJhIGVuZC1vZi1zdHJpbmcgXCI/XCIgY2hhcmFjdGVyXG4gICAgY29uc3QgcGFyc2VkUXVlcnlQYXJhbXMgPSBxcy5zdHJpbmdpZnkocXVlcnlQYXJhbXMucGFyYW1zLCBidWlsZFBhcmFtc1N0cmluZ2lmeU9wdGlvbnMocXVlcnlQYXJhbXMpKTtcbiAgICByZXR1cm4gYCR7dXJsfSR7cGFyc2VkUXVlcnlQYXJhbXN9YDtcbn1cbi8qKlxuICogQnVpbGQgb3B0aW9ucyBmb3IgUXVlcnlQYXJhbXMgU3RyaW5naWZ5aW5nLlxuICpcbiAqIEBwYXJhbSB7SVJlcXVlc3RRdWVyeVBhcmFtc30gcXVlcnlQYXJhbXNcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuZnVuY3Rpb24gYnVpbGRQYXJhbXNTdHJpbmdpZnlPcHRpb25zKHF1ZXJ5UGFyYW1zKSB7XG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgIGFkZFF1ZXJ5UHJlZml4OiB0cnVlLFxuICAgICAgICBkZWxpbWl0ZXI6IChxdWVyeVBhcmFtcy5vcHRpb25zIHx8IHt9KS5zZXBhcmF0b3IgfHwgJyYnLFxuICAgICAgICBhbGxvd0RvdHM6IChxdWVyeVBhcmFtcy5vcHRpb25zIHx8IHt9KS5zaG91bGRBbGxvd0RvdHMgfHwgZmFsc2UsXG4gICAgICAgIGFycmF5Rm9ybWF0OiAocXVlcnlQYXJhbXMub3B0aW9ucyB8fCB7fSkuYXJyYXlGb3JtYXQgfHwgJ3JlcGVhdCcsXG4gICAgICAgIGVuY29kZVZhbHVlc09ubHk6IChxdWVyeVBhcmFtcy5vcHRpb25zIHx8IHt9KS5zaG91bGRPbmx5RW5jb2RlVmFsdWVzIHx8IHRydWVcbiAgICB9O1xuICAgIHJldHVybiBvcHRpb25zO1xufVxuLyoqXG4gKiBEZWNvbXByZXNzL0RlY29kZSBnemlwIGVuY29kZWQgSlNPTlxuICogVXNpbmcgTm9kZS5qcyBidWlsdC1pbiB6bGliIG1vZHVsZVxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGFyc2V0PyAtIG9wdGlvbmFsOyBkZWZhdWx0cyB0byAndXRmLTgnXG4gKiBAcmV0dXJuIHtQcm9taXNlPHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGRlY29tcHJlc3NHemlwcGVkQ29udGVudChidWZmZXIsIGNoYXJzZXQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgemxpYi5ndW56aXAoYnVmZmVyLCBmdW5jdGlvbiAoZXJyb3IsIGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKGJ1ZmZlci50b1N0cmluZyhjaGFyc2V0IHx8ICd1dGYtOCcpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmRlY29tcHJlc3NHemlwcGVkQ29udGVudCA9IGRlY29tcHJlc3NHemlwcGVkQ29udGVudDtcbi8qKlxuICogQnVpbGRzIGEgUmVnRXhwIHRvIHRlc3QgdXJscyBhZ2FpbnN0IGZvciBkZWNpZGluZ1xuICogd2V0aGVyIHRvIGJ5cGFzcyBwcm94eSBmcm9tIGFuIGVudHJ5IG9mIHRoZVxuICogZW52aXJvbm1lbnQgdmFyaWFibGUgc2V0dGluZyBOT19QUk9YWVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBieXBhc3NcbiAqIEByZXR1cm4ge1JlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gYnVpbGRQcm94eUJ5cGFzc1JlZ2V4RnJvbUVudihieXBhc3MpIHtcbiAgICB0cnkge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIGtlZXAgdGhpcyBhcm91bmQgZm9yIGJhY2stY29tcGF0IHB1cnBvc2VzXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKGJ5cGFzcywgJ2knKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgU3ludGF4RXJyb3IgJiYgKGJ5cGFzcyB8fCBcIlwiKS5zdGFydHNXaXRoKFwiKlwiKSkge1xuICAgICAgICAgICAgbGV0IHdpbGRjYXJkRXNjYXBlZCA9IGJ5cGFzcy5yZXBsYWNlKCcqJywgJyguKiknKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHdpbGRjYXJkRXNjYXBlZCwgJ2knKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxufVxuZXhwb3J0cy5idWlsZFByb3h5QnlwYXNzUmVnZXhGcm9tRW52ID0gYnVpbGRQcm94eUJ5cGFzc1JlZ2V4RnJvbUVudjtcbi8qKlxuICogT2J0YWluIFJlc3BvbnNlJ3MgQ29udGVudCBDaGFyc2V0LlxuICogVGhyb3VnaCBpbnNwZWN0aW5nIGBjb250ZW50LXR5cGVgIHJlc3BvbnNlIGhlYWRlci5cbiAqIEl0IFJldHVybnMgJ3V0Zi04JyBpZiBOTyBjaGFyc2V0IHNwZWNpZmllZC9tYXRjaGVkLlxuICpcbiAqIEBwYXJhbSB7SUh0dHBDbGllbnRSZXNwb25zZX0gcmVzcG9uc2VcbiAqIEByZXR1cm4ge3N0cmluZ30gLSBDb250ZW50IEVuY29kaW5nIENoYXJzZXQ7IERlZmF1bHQ9dXRmLThcbiAqL1xuZnVuY3Rpb24gb2J0YWluQ29udGVudENoYXJzZXQocmVzcG9uc2UpIHtcbiAgICAvLyBGaW5kIHRoZSBjaGFyc2V0LCBpZiBzcGVjaWZpZWQuXG4gICAgLy8gU2VhcmNoIGZvciB0aGUgYGNoYXJzZXQ9Q0hBUlNFVGAgc3RyaW5nLCBub3QgaW5jbHVkaW5nIGA7LFxcclxcbmBcbiAgICAvLyBFeGFtcGxlOiBjb250ZW50LXR5cGU6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnXG4gICAgLy8gfF9fIG1hdGNoZXMgd291bGQgYmUgWydjaGFyc2V0PXV0Zi04JywgJ3V0Zi04JywgaW5kZXg6IDE4LCBpbnB1dDogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXVxuICAgIC8vIHxfX19fXyBtYXRjaGVzWzFdIHdvdWxkIGhhdmUgdGhlIGNoYXJzZXQgOnRhZGE6ICwgaW4gb3VyIGV4YW1wbGUgaXQncyB1dGYtOFxuICAgIC8vIEhvd2V2ZXIsIGlmIHRoZSBtYXRjaGVzIEFycmF5IHdhcyBlbXB0eSBvciBubyBjaGFyc2V0IGZvdW5kLCAndXRmLTgnIHdvdWxkIGJlIHJldHVybmVkIGJ5IGRlZmF1bHQuXG4gICAgY29uc3Qgbm9kZVN1cHBvcnRlZEVuY29kaW5ncyA9IFsnYXNjaWknLCAndXRmOCcsICd1dGYxNmxlJywgJ3VjczInLCAnYmFzZTY0JywgJ2JpbmFyeScsICdoZXgnXTtcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLm1lc3NhZ2UuaGVhZGVyc1snY29udGVudC10eXBlJ10gfHwgJyc7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGNvbnRlbnRUeXBlLm1hdGNoKC9jaGFyc2V0PShbXjssXFxyXFxuXSspL2kpO1xuICAgIHJldHVybiAobWF0Y2hlcyAmJiBtYXRjaGVzWzFdICYmIG5vZGVTdXBwb3J0ZWRFbmNvZGluZ3MuaW5kZXhPZihtYXRjaGVzWzFdKSAhPSAtMSkgPyBtYXRjaGVzWzFdIDogJ3V0Zi04Jztcbn1cbmV4cG9ydHMub2J0YWluQ29udGVudENoYXJzZXQgPSBvYnRhaW5Db250ZW50Q2hhcnNldDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzc2VydFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJldmVudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiemxpYlwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSdcbmltcG9ydCB7IGNsb3NlIH0gZnJvbSAnLi9tYWluJ1xuXG5jbG9zZSgpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=