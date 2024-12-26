function parseDynamoDBResponse(data) {
    return data.map(item => {
        const parsedItem = {};

        for (const field in item) {
            if (item[field].S) {
                // Handle string data type (S)
                parsedItem[field] = item[field].S;
            } else if (item[field].N) {
                // Handle number data type (N)
                parsedItem[field] = parseFloat(item[field].N);  // Convert to float for numeric values
            } else {
                // Handle other data types if necessary
                parsedItem[field] = item[field];
            }
        }
        console.log(parsedItem)
        return parsedItem;
    });
}


const marshallValue = (value) => {
    if (typeof value === 'string') return { S: value };
    if (typeof value === 'number') return { N: value.toString() };
    if (typeof value === 'boolean') return { BOOL: value };
    if (Array.isArray(value)) {
        if (value.length === 0) return { L: [] };
        if (typeof value[0] === 'string') return { SS: value };
        if (typeof value[0] === 'number') return { NS: value.map(String) };
        return { L: value.map(this.marshallValue.bind(this)) };
    }
    if (value instanceof Date) return { S: value.toISOString() };
    if (typeof value === 'object') {
        return { M: Object.entries(value).reduce((acc, [k, v]) => {
            acc[k] = this.marshallValue(v);
            return acc;
        }, {})};
    }
    throw new Error(`Unsupported type for value: ${value}`);
}
module.exports = marshallValue;

