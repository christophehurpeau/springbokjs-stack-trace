import StackTrace from './StackTrace';

export default class ParsedError extends Error {

    constructor(err, stackTrace) {
        if (!(err instanceof Error)) {
            throw new TypeError('Value of argument "err" violates contract.\n\nExpected:\nError\n\nGot:\n' + _inspect(err));
        }

        if (!(stackTrace instanceof StackTrace)) {
            throw new TypeError('Value of argument "stackTrace" violates contract.\n\nExpected:\nStackTrace\n\nGot:\n' + _inspect(stackTrace));
        }

        super(err.message);
        this.originalError = err;
        this.stackTrace = stackTrace;

        // http://stackoverflow.com/questions/35392675/how-to-override-error-stack-getter
        this.stack = this.toString();
    }

    get name() {
        function _ref(_id) {
            if (!(typeof _id === 'string')) {
                throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id));
            }

            return _id;
        }

        return _ref(this.originalError.name);
    }

    get message() {
        function _ref2(_id2) {
            if (!(typeof _id2 === 'string')) {
                throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id2));
            }

            return _id2;
        }

        return _ref2(this.originalError.message);
    }

    get originalStack() {
        function _ref3(_id3) {
            if (!(typeof _id3 === 'string')) {
                throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id3));
            }

            return _id3;
        }

        return _ref3(this.originalError.stack);
    }

    toString() {
        if (this._toStringCache) {
            return this._toStringCache;
        }

        var str = `ParsedError: ${ this.name }: ${ this.message }\n`;
        str += this.stackTrace.toString();

        if (this.previous) {
            str += '\n';
            str += 'PREVIOUS: ';
            str += this.previous.toString();
        }

        return this._toStringCache = str;
    }
}

function _inspect(input, depth) {
    var maxDepth = 4;
    var maxKeys = 15;

    if (depth === undefined) {
        depth = 0;
    }

    depth += 1;

    if (input === null) {
        return 'null';
    } else if (input === undefined) {
        return 'void';
    } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
        return typeof input;
    } else if (Array.isArray(input)) {
        if (input.length > 0) {
            var _ret = function () {
                if (depth > maxDepth) return {
                        v: '[...]'
                    };

                var first = _inspect(input[0], depth);

                if (input.every(item => _inspect(item, depth) === first)) {
                    return {
                        v: first.trim() + '[]'
                    };
                } else {
                    return {
                        v: '[' + input.slice(0, maxKeys).map(item => _inspect(item, depth)).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']'
                    };
                }
            }();

            if (typeof _ret === "object") return _ret.v;
        } else {
            return 'Array';
        }
    } else {
        var keys = Object.keys(input);

        if (!keys.length) {
            if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
                return input.constructor.name;
            } else {
                return 'Object';
            }
        }

        if (depth > maxDepth) return '{...}';
        var indent = '  '.repeat(depth - 1);
        var entries = keys.slice(0, maxKeys).map(key => {
            return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
        }).join('\n  ' + indent);

        if (keys.length >= maxKeys) {
            entries += '\n  ' + indent + '...';
        }

        if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
            return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
        } else {
            return '{\n  ' + indent + entries + '\n' + indent + '}';
        }
    }
}
//# sourceMappingURL=ParsedError.js.map