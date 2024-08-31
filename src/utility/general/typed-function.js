class TypedFunction
{
    constructor (inputs, outputs) 
    {
        this.inputs = inputs;
        this.outputs = outputs;
    }

    call(blockFunction) {
       return blockFunction(...this.inputs.map((input) => input.value));
    }
}