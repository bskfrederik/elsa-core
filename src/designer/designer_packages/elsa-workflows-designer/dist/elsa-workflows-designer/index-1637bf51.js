import './models-09298028.js';
import { h } from './index-dc0ae4f5.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import { s as state } from './state-450cc93e.js';

/**
 * Used to create unique typed service identifier.
 * Useful when service has only interface, but don't have a class.
 */
class Token {
    /**
     * @param name Token name, optional and only used for debugging purposes.
     */
    constructor(name) {
        this.name = name;
    }
}

/**
 * Thrown when requested service was not found.
 */
class ServiceNotFoundError extends Error {
    constructor(identifier) {
        var _a, _b;
        super();
        this.name = 'ServiceNotFoundError';
        /** Normalized identifier name used in the error message. */
        this.normalizedIdentifier = '<UNKNOWN_IDENTIFIER>';
        if (typeof identifier === 'string') {
            this.normalizedIdentifier = identifier;
        }
        else if (identifier instanceof Token) {
            this.normalizedIdentifier = `Token<${identifier.name || 'UNSET_NAME'}>`;
        }
        else if (identifier && (identifier.name || ((_a = identifier.prototype) === null || _a === void 0 ? void 0 : _a.name))) {
            this.normalizedIdentifier =
                `MaybeConstructable<${identifier.name}>` ||
                    `MaybeConstructable<${(_b = identifier.prototype) === null || _b === void 0 ? void 0 : _b.name}>`;
        }
    }
    get message() {
        return (`Service with "${this.normalizedIdentifier}" identifier was not found in the container. ` +
            `Register it before usage via explicitly calling the "Container.set" function or using the "@Service()" decorator.`);
    }
}

/**
 * Thrown when DI cannot inject value into property decorated by @Inject decorator.
 */
class CannotInstantiateValueError extends Error {
    constructor(identifier) {
        var _a, _b;
        super();
        this.name = 'CannotInstantiateValueError';
        /** Normalized identifier name used in the error message. */
        this.normalizedIdentifier = '<UNKNOWN_IDENTIFIER>';
        // TODO: Extract this to a helper function and share between this and NotFoundError.
        if (typeof identifier === 'string') {
            this.normalizedIdentifier = identifier;
        }
        else if (identifier instanceof Token) {
            this.normalizedIdentifier = `Token<${identifier.name || 'UNSET_NAME'}>`;
        }
        else if (identifier && (identifier.name || ((_a = identifier.prototype) === null || _a === void 0 ? void 0 : _a.name))) {
            this.normalizedIdentifier =
                `MaybeConstructable<${identifier.name}>` ||
                    `MaybeConstructable<${(_b = identifier.prototype) === null || _b === void 0 ? void 0 : _b.name}>`;
        }
    }
    get message() {
        return (`Cannot instantiate the requested value for the "${this.normalizedIdentifier}" identifier. ` +
            `The related metadata doesn't contain a factory or a type to instantiate.`);
    }
}

const EMPTY_VALUE = Symbol('EMPTY_VALUE');

/**
 * TypeDI can have multiple containers.
 * One container is ContainerInstance.
 */
class ContainerInstance {
    constructor(id) {
        /** All registered services in the container. */
        this.services = [];
        this.id = id;
    }
    has(identifier) {
        return !!this.findService(identifier);
    }
    get(identifier) {
        const globalContainer = Container.of(undefined);
        const globalService = globalContainer.findService(identifier);
        const scopedService = this.findService(identifier);
        if (globalService && globalService.global === true)
            return this.getServiceValue(globalService);
        if (scopedService)
            return this.getServiceValue(scopedService);
        /** If it's the first time requested in the child container we load it from parent and set it. */
        if (globalService && this !== globalContainer) {
            const clonedService = { ...globalService };
            clonedService.value = EMPTY_VALUE;
            /**
             * We need to immediately set the empty value from the root container
             * to prevent infinite lookup in cyclic dependencies.
             */
            this.set(clonedService);
            const value = this.getServiceValue(clonedService);
            this.set({ ...clonedService, value });
            return value;
        }
        if (globalService)
            return this.getServiceValue(globalService);
        throw new ServiceNotFoundError(identifier);
    }
    getMany(identifier) {
        return this.findAllServices(identifier).map(service => this.getServiceValue(service));
    }
    set(identifierOrServiceMetadata, value) {
        if (identifierOrServiceMetadata instanceof Array) {
            identifierOrServiceMetadata.forEach(data => this.set(data));
            return this;
        }
        if (typeof identifierOrServiceMetadata === 'string' || identifierOrServiceMetadata instanceof Token) {
            return this.set({
                id: identifierOrServiceMetadata,
                type: null,
                value: value,
                factory: undefined,
                global: false,
                multiple: false,
                eager: false,
                transient: false,
            });
        }
        if (typeof identifierOrServiceMetadata === 'function') {
            return this.set({
                id: identifierOrServiceMetadata,
                // TODO: remove explicit casting
                type: identifierOrServiceMetadata,
                value: value,
                factory: undefined,
                global: false,
                multiple: false,
                eager: false,
                transient: false,
            });
        }
        const newService = {
            id: new Token('UNREACHABLE'),
            type: null,
            factory: undefined,
            value: EMPTY_VALUE,
            global: false,
            multiple: false,
            eager: false,
            transient: false,
            ...identifierOrServiceMetadata,
        };
        const service = this.findService(newService.id);
        if (service && service.multiple !== true) {
            Object.assign(service, newService);
        }
        else {
            this.services.push(newService);
        }
        if (newService.eager) {
            this.get(newService.id);
        }
        return this;
    }
    /**
     * Removes services with a given service identifiers.
     */
    remove(identifierOrIdentifierArray) {
        if (Array.isArray(identifierOrIdentifierArray)) {
            identifierOrIdentifierArray.forEach(id => this.remove(id));
        }
        else {
            this.services = this.services.filter(service => {
                if (service.id === identifierOrIdentifierArray) {
                    this.destroyServiceInstance(service);
                    return false;
                }
                return true;
            });
        }
        return this;
    }
    /**
     * Completely resets the container by removing all previously registered services from it.
     */
    reset(options = { strategy: 'resetValue' }) {
        switch (options.strategy) {
            case 'resetValue':
                this.services.forEach(service => this.destroyServiceInstance(service));
                break;
            case 'resetServices':
                this.services.forEach(service => this.destroyServiceInstance(service));
                this.services = [];
                break;
            default:
                throw new Error('Received invalid reset strategy.');
        }
        return this;
    }
    /**
     * Returns all services registered with the given identifier.
     */
    findAllServices(identifier) {
        return this.services.filter(service => service.id === identifier);
    }
    /**
     * Finds registered service in the with a given service identifier.
     */
    findService(identifier) {
        return this.services.find(service => service.id === identifier);
    }
    /**
     * Gets the value belonging to `serviceMetadata.id`.
     *
     * - if `serviceMetadata.value` is already set it is immediately returned
     * - otherwise the requested type is resolved to the value saved to `serviceMetadata.value` and returned
     */
    getServiceValue(serviceMetadata) {
        var _a;
        let value = EMPTY_VALUE;
        /**
         * If the service value has been set to anything prior to this call we return that value.
         * NOTE: This part builds on the assumption that transient dependencies has no value set ever.
         */
        if (serviceMetadata.value !== EMPTY_VALUE) {
            return serviceMetadata.value;
        }
        /** If both factory and type is missing, we cannot resolve the requested ID. */
        if (!serviceMetadata.factory && !serviceMetadata.type) {
            throw new CannotInstantiateValueError(serviceMetadata.id);
        }
        /**
         * If a factory is defined it takes priority over creating an instance via `new`.
         * The return value of the factory is not checked, we believe by design that the user knows what he/she is doing.
         */
        if (serviceMetadata.factory) {
            /**
             * If we received the factory in the [Constructable<Factory>, "functionName"] format, we need to create the
             * factory first and then call the specified function on it.
             */
            if (serviceMetadata.factory instanceof Array) {
                let factoryInstance;
                try {
                    /** Try to get the factory from TypeDI first, if failed, fall back to simply initiating the class. */
                    factoryInstance = this.get(serviceMetadata.factory[0]);
                }
                catch (error) {
                    if (error instanceof ServiceNotFoundError) {
                        factoryInstance = new serviceMetadata.factory[0]();
                    }
                    else {
                        throw error;
                    }
                }
                value = factoryInstance[serviceMetadata.factory[1]](this, serviceMetadata.id);
            }
            else {
                /** If only a simple function was provided we simply call it. */
                value = serviceMetadata.factory(this, serviceMetadata.id);
            }
        }
        /**
         * If no factory was provided and only then, we create the instance from the type if it was set.
         */
        if (!serviceMetadata.factory && serviceMetadata.type) {
            const constructableTargetType = serviceMetadata.type;
            // setup constructor parameters for a newly initialized service
            const paramTypes = ((_a = Reflect) === null || _a === void 0 ? void 0 : _a.getMetadata('design:paramtypes', constructableTargetType)) || [];
            const params = this.initializeParams(constructableTargetType, paramTypes);
            // "extra feature" - always pass container instance as the last argument to the service function
            // this allows us to support javascript where we don't have decorators and emitted metadata about dependencies
            // need to be injected, and user can use provided container to get instances he needs
            params.push(this);
            value = new constructableTargetType(...params);
            // TODO: Calling this here, leads to infinite loop, because @Inject decorator registerds a handler
            // TODO: which calls Container.get, which will check if the requested type has a value set and if not
            // TODO: it will start the instantiation process over. So this is currently called outside of the if branch
            // TODO: after the current value has been assigned to the serviceMetadata.
            // this.applyPropertyHandlers(constructableTargetType, value as Constructable<unknown>);
        }
        /** If this is not a transient service, and we resolved something, then we set it as the value. */
        if (!serviceMetadata.transient && value !== EMPTY_VALUE) {
            serviceMetadata.value = value;
        }
        if (value === EMPTY_VALUE) {
            /** This branch should never execute, but better to be safe than sorry. */
            throw new CannotInstantiateValueError(serviceMetadata.id);
        }
        if (serviceMetadata.type) {
            this.applyPropertyHandlers(serviceMetadata.type, value);
        }
        return value;
    }
    /**
     * Initializes all parameter types for a given target service class.
     */
    initializeParams(target, paramTypes) {
        return paramTypes.map((paramType, index) => {
            const paramHandler = Container.handlers.find(handler => {
                /**
                 * @Inject()-ed values are stored as parameter handlers and they reference their target
                 * when created. So when a class is extended the @Inject()-ed values are not inherited
                 * because the handler still points to the old object only.
                 *
                 * As a quick fix a single level parent lookup is added via `Object.getPrototypeOf(target)`,
                 * however this should be updated to a more robust solution.
                 *
                 * TODO: Add proper inheritance handling: either copy the handlers when a class is registered what
                 * TODO: has it's parent already registered as dependency or make the lookup search up to the base Object.
                 */
                return ((handler.object === target || handler.object === Object.getPrototypeOf(target)) && handler.index === index);
            });
            if (paramHandler)
                return paramHandler.value(this);
            if (paramType && paramType.name && !this.isPrimitiveParamType(paramType.name)) {
                return this.get(paramType);
            }
            return undefined;
        });
    }
    /**
     * Checks if given parameter type is primitive type or not.
     */
    isPrimitiveParamType(paramTypeName) {
        return ['string', 'boolean', 'number', 'object'].includes(paramTypeName.toLowerCase());
    }
    /**
     * Applies all registered handlers on a given target class.
     */
    applyPropertyHandlers(target, instance) {
        Container.handlers.forEach(handler => {
            if (typeof handler.index === 'number')
                return;
            if (handler.object.constructor !== target && !(target.prototype instanceof handler.object.constructor))
                return;
            if (handler.propertyName) {
                instance[handler.propertyName] = handler.value(this);
            }
        });
    }
    /**
     * Checks if the given service metadata contains a destroyable service instance and destroys it in place. If the service
     * contains a callable function named `destroy` it is called but not awaited and the return value is ignored..
     *
     * @param serviceMetadata the service metadata containing the instance to destroy
     * @param force when true the service will be always destroyed even if it's cannot be re-created
     */
    destroyServiceInstance(serviceMetadata, force = false) {
        /** We reset value only if we can re-create it (aka type or factory exists). */
        const shouldResetValue = force || !!serviceMetadata.type || !!serviceMetadata.factory;
        if (shouldResetValue) {
            /** If we wound a function named destroy we call it without any params. */
            if (typeof (serviceMetadata === null || serviceMetadata === void 0 ? void 0 : serviceMetadata.value)['destroy'] === 'function') {
                try {
                    serviceMetadata.value.destroy();
                }
                catch (error) {
                    /** We simply ignore the errors from the destroy function. */
                }
            }
            serviceMetadata.value = EMPTY_VALUE;
        }
    }
}

/**
 * Service container.
 */
class Container {
    /**
     * Gets a separate container instance for the given instance id.
     */
    static of(containerId = 'default') {
        if (containerId === 'default')
            return this.globalInstance;
        let container = this.instances.find(instance => instance.id === containerId);
        if (!container) {
            container = new ContainerInstance(containerId);
            this.instances.push(container);
            // TODO: Why we are not reseting here? Let's reset here. (I have added the commented code.)
            // container.reset();
        }
        return container;
    }
    static has(identifier) {
        return this.globalInstance.has(identifier);
    }
    static get(identifier) {
        return this.globalInstance.get(identifier);
    }
    static getMany(id) {
        return this.globalInstance.getMany(id);
    }
    static set(identifierOrServiceMetadata, value) {
        this.globalInstance.set(identifierOrServiceMetadata, value);
        return this;
    }
    /**
     * Removes services with a given service identifiers.
     */
    static remove(identifierOrIdentifierArray) {
        this.globalInstance.remove(identifierOrIdentifierArray);
        return this;
    }
    /**
     * Completely resets the container by removing all previously registered services and handlers from it.
     */
    static reset(containerId = 'default') {
        if (containerId == 'default') {
            this.globalInstance.reset();
            this.instances.forEach(instance => instance.reset());
        }
        else {
            const instance = this.instances.find(instance => instance.id === containerId);
            if (instance) {
                instance.reset();
                this.instances.splice(this.instances.indexOf(instance), 1);
            }
        }
        return this;
    }
    /**
     * Registers a new handler.
     */
    static registerHandler(handler) {
        this.handlers.push(handler);
        return this;
    }
    /**
     * Helper method that imports given services.
     */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    static import(services) {
        return this;
    }
}
/**
 * All registered handlers. The @Inject() decorator uses handlers internally to mark a property for injection.
 **/
Container.handlers = [];
/**  Global container instance. */
Container.globalInstance = new ContainerInstance('default');
/** Other containers created using Container.of method. */
Container.instances = [];

/**
 * Thrown when DI cannot inject value into property decorated by @Inject decorator.
 */
class CannotInjectValueError extends Error {
    constructor(target, propertyName) {
        super();
        this.target = target;
        this.propertyName = propertyName;
        this.name = 'CannotInjectValueError';
    }
    get message() {
        return (`Cannot inject value into "${this.target.constructor.name}.${this.propertyName}". ` +
            `Please make sure you setup reflect-metadata properly and you don't use interfaces without service tokens as injection value.`);
    }
}

/**
 * Helper function used in inject decorators to resolve the received identifier to
 * an eager type when possible or to a lazy type when cyclic dependencies are possibly involved.
 *
 * @param typeOrIdentifier a service identifier or a function returning a type acting as service identifier or nothing
 * @param target the class definition of the target of the decorator
 * @param propertyName the name of the property in case of a PropertyDecorator
 * @param index the index of the parameter in the constructor in case of ParameterDecorator
 */
function resolveToTypeWrapper(typeOrIdentifier, target, propertyName, index) {
    /**
     * ? We want to error out as soon as possible when looking up services to inject, however
     * ? we cannot determine the type at decorator execution when cyclic dependencies are involved
     * ? because calling the received `() => MyType` function right away would cause a JS error:
     * ? "Cannot access 'MyType' before initialization", so we need to execute the function in the handler,
     * ? when the classes are already created. To overcome this, we use a wrapper:
     * ?  - the lazyType is executed in the handler so we never have a JS error
     * ?  - the eagerType is checked when decorator is running and an error is raised if an unknown type is encountered
     */
    let typeWrapper;
    /** If requested type is explicitly set via a string ID or token, we set it explicitly. */
    if ((typeOrIdentifier && typeof typeOrIdentifier === 'string') || typeOrIdentifier instanceof Token) {
        typeWrapper = { eagerType: typeOrIdentifier, lazyType: () => typeOrIdentifier };
    }
    /** If requested type is explicitly set via a () => MyClassType format, we set it explicitly. */
    if (typeOrIdentifier && typeof typeOrIdentifier === 'function') {
        /** We set eagerType to null, preventing the raising of the CannotInjectValueError in decorators.  */
        typeWrapper = { eagerType: null, lazyType: () => typeOrIdentifier() };
    }
    /** If no explicit type is set and handler registered for a class property, we need to get the property type. */
    if (!typeOrIdentifier && propertyName) {
        const identifier = Reflect.getMetadata('design:type', target, propertyName);
        typeWrapper = { eagerType: identifier, lazyType: () => identifier };
    }
    /** If no explicit type is set and handler registered for a constructor parameter, we need to get the parameter types. */
    if (!typeOrIdentifier && typeof index == 'number' && Number.isInteger(index)) {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyName);
        /** It's not guaranteed, that we find any types for the constructor. */
        const identifier = paramTypes === null || paramTypes === void 0 ? void 0 : paramTypes[index];
        typeWrapper = { eagerType: identifier, lazyType: () => identifier };
    }
    return typeWrapper;
}

function InjectMany(typeOrIdentifier) {
    return function (target, propertyName, index) {
        const typeWrapper = resolveToTypeWrapper(typeOrIdentifier, target, propertyName, index);
        /** If no type was inferred, or the general Object type was inferred we throw an error. */
        if (typeWrapper === undefined || typeWrapper.eagerType === undefined || typeWrapper.eagerType === Object) {
            throw new CannotInjectValueError(target, propertyName);
        }
        Container.registerHandler({
            object: target,
            propertyName: propertyName,
            index: index,
            value: containerInstance => {
                const evaluatedLazyType = typeWrapper.lazyType();
                /** If no type was inferred lazily, or the general Object type was inferred we throw an error. */
                if (evaluatedLazyType === undefined || evaluatedLazyType === Object) {
                    throw new CannotInjectValueError(target, propertyName);
                }
                return containerInstance.getMany(evaluatedLazyType);
            },
        });
    };
}

function Inject(typeOrIdentifier) {
    return function (target, propertyName, index) {
        const typeWrapper = resolveToTypeWrapper(typeOrIdentifier, target, propertyName, index);
        /** If no type was inferred, or the general Object type was inferred we throw an error. */
        if (typeWrapper === undefined || typeWrapper.eagerType === undefined || typeWrapper.eagerType === Object) {
            throw new CannotInjectValueError(target, propertyName);
        }
        Container.registerHandler({
            object: target,
            propertyName: propertyName,
            index: index,
            value: containerInstance => {
                const evaluatedLazyType = typeWrapper.lazyType();
                /** If no type was inferred lazily, or the general Object type was inferred we throw an error. */
                if (evaluatedLazyType === undefined || evaluatedLazyType === Object) {
                    throw new CannotInjectValueError(target, propertyName);
                }
                return containerInstance.get(evaluatedLazyType);
            },
        });
    };
}

function Service(optionsOrServiceIdentifier) {
    return targetConstructor => {
        const serviceMetadata = {
            id: targetConstructor,
            // TODO: Let's investigate why we receive Function type instead of a constructable.
            type: targetConstructor,
            factory: undefined,
            multiple: false,
            global: false,
            eager: false,
            transient: false,
            value: EMPTY_VALUE,
        };
        if (optionsOrServiceIdentifier instanceof Token || typeof optionsOrServiceIdentifier === 'string') {
            /** We received a Token or string ID. */
            serviceMetadata.id = optionsOrServiceIdentifier;
        }
        else if (optionsOrServiceIdentifier) {
            /** We received a ServiceOptions object. */
            serviceMetadata.id = optionsOrServiceIdentifier.id || targetConstructor;
            serviceMetadata.factory = optionsOrServiceIdentifier.factory || undefined;
            serviceMetadata.multiple = optionsOrServiceIdentifier.multiple || false;
            serviceMetadata.global = optionsOrServiceIdentifier.global || false;
            serviceMetadata.eager = optionsOrServiceIdentifier.eager || false;
            serviceMetadata.transient = optionsOrServiceIdentifier.transient || false;
        }
        Container.set(serviceMetadata);
    };
}

/**
 * We have a hard dependency on reflect-metadata package.
 * Without the dependency lookup wont work. So we should warn the users
 * when it's not loaded.
 */

const BulkActionsIcon = () => h("svg", { class: "tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "1", d: "M13 10V3L4 14h7v7l9-11h-7z" }));

const DeleteIcon = () => h("svg", { class: "tw-h-5 tw-w-5 tw-text-gray-500", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" },
  h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
  h("line", { x1: "4", y1: "7", x2: "20", y2: "7" }),
  h("line", { x1: "10", y1: "11", x2: "10", y2: "17" }),
  h("line", { x1: "14", y1: "11", x2: "14", y2: "17" }),
  h("path", { d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" }),
  h("path", { d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" }));

const EditIcon = () => h("svg", { class: "tw-h-5 tw-w-5 tw-text-gray-500", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" },
  h("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
  h("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" }));

const RevertIcon = () => h("svg", { class: "tw-h-6 tw-w-6 tw-text-gray-500", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" },
  h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
  h("path", { d: "M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" }));

const PageSizeIcon = () => h("svg", { class: "tw-h-5 tw-w-5 tw-text-gray-400 tw-mr-2", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" },
  h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
  h("line", { x1: "9", y1: "6", x2: "20", y2: "6" }),
  h("line", { x1: "9", y1: "12", x2: "20", y2: "12" }),
  h("line", { x1: "9", y1: "18", x2: "20", y2: "18" }),
  h("line", { x1: "5", y1: "6", x2: "5", y2: "6.01" }),
  h("line", { x1: "5", y1: "12", x2: "5", y2: "12.01" }),
  h("line", { x1: "5", y1: "18", x2: "5", y2: "18.01" }));

const PublishIcon = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "tw-h-5 tw-w-5 tw-text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" }));

const PublishedIcon = () => h("svg", { class: "tw-h-6 tw-w-6 tw-text-blue-500", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" },
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }));

const OrderByIcon = () => h("svg", { class: "tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" }));

const UnPublishIcon = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "tw-h-5 tw-w-5 tw-text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" }));

const WorkflowIcon = () => h("svg", { class: "tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
  h("rect", { x: "4", y: "4", width: "6", height: "6", rx: "1" }),
  h("rect", { x: "14", y: "4", width: "6", height: "6", rx: "1" }),
  h("rect", { x: "4", y: "14", width: "6", height: "6", rx: "1" }),
  h("rect", { x: "14", y: "14", width: "6", height: "6", rx: "1" }));

const WorkflowStatusIcon = () => h("svg", { class: "tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  h("circle", { cx: "12", cy: "12", r: "10" }),
  h("polygon", { points: "10 8 16 12 10 16 10 8" }));

const WarningIcon = () => h("svg", { "aria-hidden": "true", class: "tw-mx-auto tw-mb-4 tw-w-14 tw-h-14 tw-text-gray-400 dark:tw-text-gray-200", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }));

class DefaultContents {
}
DefaultContents.Warning = (message) => {
  return (h("div", { class: "tw-p-6 tw-text-center" },
    h(WarningIcon, null),
    h("h3", { class: "tw-mb-5 tw-text-lg tw-font-normal tw-text-gray-500 dark:tw-text-gray-400" }, message)));
};

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ModalDialogService = class ModalDialogService {
  show(content, options) {
    const newInstance = {
      content: content,
      options: options
    };
    let instances = state.instances;
    instances = [...instances, newInstance];
    state.instances = instances;
    return newInstance;
  }
  hide(instance) {
    let instances = state.instances;
    instances = instances.filter(x => x != instance);
    state.instances = instances;
  }
};
ModalDialogService = __decorate([
  Service()
], ModalDialogService);

export { BulkActionsIcon as B, Container as C, DefaultContents as D, EditIcon as E, ModalDialogService as M, OrderByIcon as O, PageSizeIcon as P, RevertIcon as R, Service as S, UnPublishIcon as U, WorkflowIcon as W, PublishIcon as a, DeleteIcon as b, WorkflowStatusIcon as c, PublishedIcon as d };

//# sourceMappingURL=index-1637bf51.js.map