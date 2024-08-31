class FunctionNode
{
    constructor(id, name, inputs, outputs, description)
    {
        this.id          = id;
        this.name        = name;
        this.inputs      = inputs;
        this.outputs     = outputs;
        this.description = description;
    }

    addProperty(key, value) {
        this[key] = value;
    }
    /**
     * 
     * @param {TypedFunction} fn 
     */
    static fromFunctionObject(fn, description) {
        return new FunctionNode(
            fn.id,
            fn.name,
            fn.inputs,
            fn.outputs,
            description
        );
    }
}

export default FunctionNode;