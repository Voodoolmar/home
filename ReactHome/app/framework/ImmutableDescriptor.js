"use strict";
var TypeDescriptors = (function () {
    function TypeDescriptors() {
    }
    TypeDescriptors.prototype.getArgumentName = function (constructor, argumentIndex) {
        return this.getConstructorArgumentNames(constructor)[argumentIndex];
    };
    TypeDescriptors.prototype.getArgumentIndex = function (constructor, argumentName) {
        return this.getConstructorArgumentNames(constructor).indexOf(argumentName);
    };
    TypeDescriptors.prototype.getConstructorArgumentNames = function (func) {
        var argumentNamesKey = '__argumentNames';
        var argumentNames = func[argumentNamesKey];
        if (argumentNames) {
            return argumentNames;
        }
        var fnStr = func.toString().replace(TypeDescriptors.STRIP_COMMENTS, '');
        argumentNames = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(TypeDescriptors.ARGUMENT_NAMES) || [];
        func[argumentNamesKey] = argumentNames;
        return argumentNames;
    };
    TypeDescriptors.prototype.getFieldName = function (selector) {
        var fieldNameKey = '__fieldName';
        var fieldName = selector[fieldNameKey];
        if (fieldName) {
            return fieldName;
        }
        var m = TypeDescriptors.varExtractor.exec(selector + "");
        if (m == null)
            throw new Error("The function does not contain a statement matching 'return variableName;'");
        var path = m[1].split('.');
        fieldName = path[path.length - 1];
        selector[fieldNameKey] = fieldName;
        return fieldName;
    };
    TypeDescriptors.STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    TypeDescriptors.ARGUMENT_NAMES = /([^\s,]+)/g;
    TypeDescriptors.varExtractor = new RegExp("return (.*);");
    return TypeDescriptors;
}());
var InstanceLoader = (function () {
    function InstanceLoader() {
    }
    InstanceLoader.cloneInstance = function (a, args) {
        var instance = Object.create(Object.getPrototypeOf(a));
        instance.constructor.apply(instance, args);
        return instance;
    };
    return InstanceLoader;
}());
var ImmutableDescriptor = (function () {
    function ImmutableDescriptor(immutableObject) {
        this.immutableObject = immutableObject;
        if (immutableObject.constructor === Object.prototype.constructor) {
            throw new Error("Mutating object is plain object");
        }
        this.constructorArguments = new Array(ImmutableDescriptor.descriptor.getConstructorArgumentNames(immutableObject.constructor).length);
    }
    ImmutableDescriptor.prototype.set = function (fieldSelector, newFieldValue) {
        var argumentName = ImmutableDescriptor.descriptor.getFieldName(fieldSelector);
        var argumentIndex = ImmutableDescriptor.descriptor.getArgumentIndex(this.immutableObject.constructor, argumentName);
        this.constructorArguments[argumentIndex] = newFieldValue;
        return this;
    };
    ImmutableDescriptor.prototype.update = function (fieldSelector, newFieldValue) {
        var fieldName = ImmutableDescriptor.descriptor.getFieldName(fieldSelector);
        this.constructorArguments[ImmutableDescriptor.descriptor.getArgumentIndex(this.immutableObject.constructor, fieldName)] = newFieldValue(this.immutableObject[fieldName]);
        return this;
    };
    ImmutableDescriptor.prototype.toObject = function () {
        for (var i = 0; i < this.constructorArguments.length; ++i) {
            if (this.constructorArguments[i] === undefined) {
                this.constructorArguments[i] = this.immutableObject[ImmutableDescriptor.descriptor.getArgumentName(this.immutableObject.constructor, i)];
            }
        }
        return InstanceLoader.cloneInstance(this.immutableObject, this.constructorArguments);
    };
    ImmutableDescriptor.descriptor = new TypeDescriptors();
    return ImmutableDescriptor;
}());
exports.ImmutableDescriptor = ImmutableDescriptor;
function Mutate(immutableObject) {
    return new ImmutableDescriptor(immutableObject);
}
exports.__esModule = true;
exports["default"] = Mutate;
//# sourceMappingURL=ImmutableDescriptor.js.map