import Ajv, {JSONSchemaType} from 'ajv';

export function isObjectInclude(object: Record<string, unknown>, query: Record<string, unknown>): boolean {
    return Object.keys(query).every((queryKey: string): boolean => query[queryKey] === object[queryKey]);
}

const ajv = new Ajv();

export function getExpectedStructure<ExpectedResponseType>(
    data: unknown,
    jsonSchema: JSONSchemaType<ExpectedResponseType>
): ExpectedResponseType {
    const validate = ajv.compile<ExpectedResponseType>(jsonSchema);

    if (validate(data)) {
        return data;
    }

    throw new Error(JSON.stringify(validate.errors));
}
