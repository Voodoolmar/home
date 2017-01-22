class TypeDescriptors {
	getArgumentName(constructor: any, argumentIndex: number): string {
		return this.getConstructorArgumentNames(constructor)[argumentIndex];
	}

	getArgumentIndex(constructor: any, argumentName: string): number {
		return this.getConstructorArgumentNames(constructor).indexOf(argumentName);
	}

	private static STRIP_COMMENTS: RegExp = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	private static ARGUMENT_NAMES: RegExp = /([^\s,]+)/g;

	getConstructorArgumentNames(func): string[] {
		const argumentNamesKey = '__argumentNames';
		let argumentNames = <string[]>func[argumentNamesKey];
		if (argumentNames) {
			return argumentNames;
		}

		var fnStr = func.toString().replace(TypeDescriptors.STRIP_COMMENTS, '');
		argumentNames = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(TypeDescriptors.ARGUMENT_NAMES) || [];
		func[argumentNamesKey] = argumentNames;
		return argumentNames;
	}

	private static varExtractor: RegExp = new RegExp("return (.*);");
	getFieldName<T, TResult>(selector: (x: T) => TResult): string {
		const fieldNameKey = '__fieldName';
		let fieldName = selector[fieldNameKey];
		if (fieldName) {
			return fieldName;
		}
		let m = TypeDescriptors.varExtractor.exec(selector + "");
		if (m == null) throw new Error("The function does not contain a statement matching 'return variableName;'");
		let path = m[1].split('.');
		fieldName = path[path.length - 1];
		selector[fieldNameKey] = fieldName;
		return fieldName;
	}
}

class InstanceLoader {
	static cloneInstance<TInstance>(a: TInstance, args: any[]): TInstance {
        var instance = Object.create(Object.getPrototypeOf(a));
        instance.constructor.apply(instance, args);
        return <TInstance>instance;
    }
}

export class ImmutableDescriptor<T> {
	private static descriptor: TypeDescriptors = new TypeDescriptors();
	private constructorArguments: any[];

	constructor(private immutableObject: T) {
		if (immutableObject.constructor === Object.prototype.constructor) {
			throw new Error("Mutating object is plain object");
		}
			
		this.constructorArguments = new Array(ImmutableDescriptor.descriptor.getConstructorArgumentNames(immutableObject.constructor).length);	
	}

	public set<TField>(fieldSelector: (x: T) => TField, newFieldValue: TField): ImmutableDescriptor<T> {
		let argumentName = ImmutableDescriptor.descriptor.getFieldName(fieldSelector);
		let argumentIndex = ImmutableDescriptor.descriptor.getArgumentIndex(this.immutableObject.constructor, argumentName);
		this.constructorArguments[argumentIndex] = newFieldValue;
		return this;
	}

	public update<TField>(fieldSelector: (x: T) => TField, newFieldValue: (x: TField) => TField): ImmutableDescriptor<T> {
		let fieldName = ImmutableDescriptor.descriptor.getFieldName(fieldSelector);
		this.constructorArguments[ImmutableDescriptor.descriptor.getArgumentIndex(this.immutableObject.constructor, fieldName)] = newFieldValue(this.immutableObject[fieldName]);
		return this;
	}

	public toObject(): T {
		for (let i = 0; i < this.constructorArguments.length; ++i) {
			if (this.constructorArguments[i] === undefined) {
				this.constructorArguments[i] = this.immutableObject[ImmutableDescriptor.descriptor.getArgumentName(this.immutableObject.constructor, i)];
			}
		}

		return InstanceLoader.cloneInstance(this.immutableObject, this.constructorArguments);
	}
}

export default function Mutate<T>(immutableObject: T): ImmutableDescriptor<T> {
	return new ImmutableDescriptor<T>(immutableObject);
}