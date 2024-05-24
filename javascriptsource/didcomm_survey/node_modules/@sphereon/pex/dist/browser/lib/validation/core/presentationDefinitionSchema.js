"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentationDefinitionSchema = void 0;
class PresentationDefinitionSchema {
    //TODO: pass it with a config file
    static getPresentationDefinitionSchemaV1() {
        return {
            $schema: 'http://json-schema.org/draft-07/schema#',
            title: 'Presentation Definition',
            definitions: {
                schema: {
                    type: 'object',
                    properties: {
                        uri: {
                            type: 'string',
                        },
                        required: {
                            type: 'boolean',
                        },
                    },
                    required: ['uri'],
                    additionalProperties: false,
                },
                issuance: {
                    type: 'object',
                    properties: {
                        manifest: {
                            type: 'string',
                        },
                    },
                    additionalProperties: true,
                },
                filter: {
                    type: 'object',
                    properties: {
                        type: {
                            type: 'string',
                        },
                        format: {
                            type: 'string',
                        },
                        pattern: {
                            type: 'string',
                        },
                        minimum: {
                            type: ['number', 'string'],
                        },
                        minLength: {
                            type: 'integer',
                        },
                        maxLength: {
                            type: 'integer',
                        },
                        exclusiveMinimum: {
                            type: ['number', 'string'],
                        },
                        exclusiveMaximum: {
                            type: ['number', 'string'],
                        },
                        maximum: {
                            type: ['number', 'string'],
                        },
                        const: {
                            type: ['number', 'string', 'boolean'],
                        },
                        enum: {
                            type: 'array',
                            items: {
                                type: ['number', 'string'],
                            },
                        },
                        not: {
                            type: 'object',
                            minProperties: 1,
                        },
                    },
                    required: ['type'],
                    additionalProperties: false,
                },
                format: {
                    type: 'object',
                    properties: {
                        'vc+sd-jwt': {
                            type: 'object',
                            properties: {
                                'sd-jwt_alg_values': {
                                    type: 'array',
                                    description: 'A JSON array containing identifiers of cryptographic algorithms the verifier supports for protection of a SD-JWT. If present, the alg JOSE header (as defined in [RFC7515]) of the presented SD-JWT MUST match one of the array values.',
                                    minItems: 1,
                                    items: {
                                        type: 'string',
                                    },
                                },
                                'kb-jwt_alg_values': {
                                    type: 'array',
                                    description: 'A JSON array containing identifiers of cryptographic algorithms the verifier supports for protection of a KB-JWT. If present, the alg JOSE header (as defined in [RFC7515]) of the presented KB-JWT MUST match one of the array values.',
                                    minItems: 1,
                                    items: {
                                        type: 'string',
                                    },
                                },
                            },
                            required: [],
                            additionalProperties: false,
                        },
                    },
                    patternProperties: {
                        '^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$': {
                            type: 'object',
                            properties: {
                                alg: {
                                    type: 'array',
                                    minItems: 1,
                                    items: {
                                        type: 'string',
                                    },
                                },
                            },
                            required: ['alg'],
                            additionalProperties: false,
                        },
                        '^ldp_vc$|^ldp_vp$|^ldp$': {
                            type: 'object',
                            properties: {
                                proof_type: {
                                    type: 'array',
                                    minItems: 1,
                                    items: {
                                        type: 'string',
                                    },
                                },
                            },
                            required: ['proof_type'],
                            additionalProperties: false,
                        },
                        '^di_vc$|^di_vp$|^di$': {
                            type: 'object',
                            properties: {
                                proof_type: {
                                    type: 'array',
                                    minItems: 1,
                                    items: {
                                        type: 'string',
                                    },
                                },
                                cryptosuite: {
                                    type: 'array',
                                    minItems: 1,
                                    items: {
                                        type: 'string',
                                    },
                                },
                            },
                            required: ['proof_type', 'cryptosuite'],
                            additionalProperties: false,
                        },
                        additionalProperties: false,
                    },
                    additionalProperties: false,
                },
                submission_requirements: {
                    type: 'object',
                    oneOf: [
                        {
                            properties: {
                                name: {
                                    type: 'string',
                                },
                                purpose: {
                                    type: 'string',
                                },
                                rule: {
                                    type: 'string',
                                    enum: ['all', 'pick'],
                                },
                                count: {
                                    type: 'integer',
                                    minimum: 1,
                                },
                                min: {
                                    type: 'integer',
                                    minimum: 0,
                                },
                                max: {
                                    type: 'integer',
                                    minimum: 0,
                                },
                                from: {
                                    type: 'string',
                                },
                            },
                            required: ['rule', 'from'],
                            additionalProperties: false,
                        },
                        {
                            properties: {
                                name: {
                                    type: 'string',
                                },
                                purpose: {
                                    type: 'string',
                                },
                                rule: {
                                    type: 'string',
                                    enum: ['all', 'pick'],
                                },
                                count: {
                                    type: 'integer',
                                    minimum: 1,
                                },
                                min: {
                                    type: 'integer',
                                    minimum: 0,
                                },
                                max: {
                                    type: 'integer',
                                    minimum: 0,
                                },
                                from_nested: {
                                    type: 'array',
                                    minItems: 1,
                                    items: {
                                        $ref: '#/definitions/submission_requirements',
                                    },
                                },
                            },
                            required: ['rule', 'from_nested'],
                            additionalProperties: false,
                        },
                    ],
                },
                input_descriptors: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
                        purpose: {
                            type: 'string',
                        },
                        group: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                        },
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/schema',
                            },
                        },
                        issuance: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/issuance',
                            },
                        },
                        constraints: {
                            type: 'object',
                            properties: {
                                limit_disclosure: {
                                    type: 'string',
                                    enum: ['required', 'preferred'],
                                },
                                statuses: {
                                    type: 'object',
                                    properties: {
                                        active: {
                                            type: 'object',
                                            properties: {
                                                directive: {
                                                    type: 'string',
                                                    enum: ['required', 'allowed', 'disallowed'],
                                                },
                                            },
                                        },
                                        suspended: {
                                            type: 'object',
                                            properties: {
                                                directive: {
                                                    type: 'string',
                                                    enum: ['required', 'allowed', 'disallowed'],
                                                },
                                            },
                                        },
                                        revoked: {
                                            type: 'object',
                                            properties: {
                                                directive: {
                                                    type: 'string',
                                                    enum: ['required', 'allowed', 'disallowed'],
                                                },
                                            },
                                        },
                                    },
                                },
                                fields: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/definitions/field',
                                    },
                                },
                                subject_is_issuer: {
                                    type: 'string',
                                    enum: ['required', 'preferred'],
                                },
                                is_holder: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            field_id: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                            directive: {
                                                type: 'string',
                                                enum: ['required', 'preferred'],
                                            },
                                        },
                                        required: ['field_id', 'directive'],
                                        additionalProperties: false,
                                    },
                                },
                                same_subject: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            field_id: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                            directive: {
                                                type: 'string',
                                                enum: ['required', 'preferred'],
                                            },
                                        },
                                        required: ['field_id', 'directive'],
                                        additionalProperties: false,
                                    },
                                },
                            },
                            additionalProperties: false,
                        },
                    },
                    required: ['id', 'schema'],
                    additionalProperties: false,
                },
                field: {
                    type: 'object',
                    oneOf: [
                        {
                            properties: {
                                id: {
                                    type: 'string',
                                },
                                path: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
                                purpose: {
                                    type: 'string',
                                },
                                filter: {
                                    $ref: '#/definitions/filter',
                                },
                            },
                            required: ['path'],
                            additionalProperties: false,
                        },
                        {
                            properties: {
                                id: {
                                    type: 'string',
                                },
                                path: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
                                purpose: {
                                    type: 'string',
                                },
                                filter: {
                                    $ref: '#/definitions/filter',
                                },
                                predicate: {
                                    type: 'string',
                                    enum: ['required', 'preferred'],
                                },
                            },
                            required: ['path', 'filter', 'predicate'],
                            additionalProperties: false,
                        },
                    ],
                },
            },
            type: 'object',
            properties: {
                presentation_definition: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
                        purpose: {
                            type: 'string',
                        },
                        format: {
                            $ref: '#/definitions/format',
                        },
                        submission_requirements: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/submission_requirements',
                            },
                        },
                        input_descriptors: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/input_descriptors',
                            },
                        },
                    },
                    required: ['id', 'input_descriptors'],
                    additionalProperties: false,
                },
            },
        };
    }
    static getPresentationDefinitionSchemaV2() {
        return {
            $schema: 'http://json-schema.org/draft-07/schema#',
            title: 'Presentation Definition',
            definitions: {
                issuance: {
                    type: 'object',
                    properties: {
                        manifest: {
                            type: 'string',
                        },
                    },
                    additionalProperties: true,
                },
                format: {
                    type: 'object',
                    properties: {
                        'vc+sd-jwt': {
                            type: 'object',
                            // No properties for vc+sd-jwt format
                            properties: {},
                            required: [],
                            additionalProperties: false,
                        },
                    },
                    patternProperties: {
                        '^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^mso_mdoc$': {
                            type: 'object',
                            properties: {
                                alg: {
                                    type: 'array',
                                    minItems: 1,
                                    items: { type: 'string' },
                                },
                            },
                            required: ['alg'],
                            additionalProperties: false,
                        },
                        '^ldp_vc$|^ldp_vp$|^ldp$': {
                            type: 'object',
                            properties: {
                                proof_type: {
                                    type: 'array',
                                    minItems: 1,
                                    items: { type: 'string' },
                                },
                            },
                            required: ['proof_type'],
                            additionalProperties: false,
                        },
                        '^di_vc$|^di_vp$|^di$': {
                            type: 'object',
                            properties: {
                                proof_type: {
                                    type: 'array',
                                    minItems: 1,
                                    items: {
                                        type: 'string',
                                    },
                                },
                                cryptosuite: {
                                    type: 'array',
                                    minItems: 1,
                                    items: {
                                        type: 'string',
                                    },
                                },
                            },
                            required: ['proof_type', 'cryptosuite'],
                            additionalProperties: false,
                        },
                        additionalProperties: false,
                    },
                    additionalProperties: false,
                },
                submission_requirements: {
                    type: 'object',
                    oneOf: [
                        {
                            properties: {
                                name: { type: 'string' },
                                purpose: { type: 'string' },
                                rule: {
                                    type: 'string',
                                    enum: ['all', 'pick'],
                                },
                                count: { type: 'integer', minimum: 1 },
                                min: { type: 'integer', minimum: 0 },
                                max: { type: 'integer', minimum: 0 },
                                from: { type: 'string' },
                            },
                            required: ['rule', 'from'],
                            additionalProperties: false,
                        },
                        {
                            properties: {
                                name: { type: 'string' },
                                purpose: { type: 'string' },
                                rule: {
                                    type: 'string',
                                    enum: ['all', 'pick'],
                                },
                                count: { type: 'integer', minimum: 1 },
                                min: { type: 'integer', minimum: 0 },
                                max: { type: 'integer', minimum: 0 },
                                from_nested: {
                                    type: 'array',
                                    minItems: 1,
                                    items: {
                                        $ref: '#/definitions/submission_requirements',
                                    },
                                },
                            },
                            required: ['rule', 'from_nested'],
                            additionalProperties: false,
                        },
                    ],
                },
                input_descriptors: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        purpose: { type: 'string' },
                        issuance: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/issuance',
                            },
                        },
                        group: {
                            type: 'array',
                            items: { type: 'string' },
                        },
                        format: { $ref: '#/definitions/format' },
                        constraints: {
                            type: 'object',
                            properties: {
                                limit_disclosure: {
                                    type: 'string',
                                    enum: ['required', 'preferred'],
                                },
                                statuses: {
                                    type: 'object',
                                    properties: {
                                        active: {
                                            type: 'object',
                                            properties: {
                                                directive: {
                                                    type: 'string',
                                                    enum: ['required', 'allowed', 'disallowed'],
                                                },
                                            },
                                        },
                                        suspended: {
                                            type: 'object',
                                            properties: {
                                                directive: {
                                                    type: 'string',
                                                    enum: ['required', 'allowed', 'disallowed'],
                                                },
                                            },
                                        },
                                        revoked: {
                                            type: 'object',
                                            properties: {
                                                directive: {
                                                    type: 'string',
                                                    enum: ['required', 'allowed', 'disallowed'],
                                                },
                                            },
                                        },
                                    },
                                },
                                fields: {
                                    type: 'array',
                                    items: { $ref: '#/definitions/field' },
                                },
                                subject_is_issuer: {
                                    type: 'string',
                                    enum: ['required', 'preferred'],
                                },
                                is_holder: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            field_id: {
                                                type: 'array',
                                                items: { type: 'string' },
                                            },
                                            directive: {
                                                type: 'string',
                                                enum: ['required', 'preferred'],
                                            },
                                        },
                                        required: ['field_id', 'directive'],
                                        additionalProperties: false,
                                    },
                                },
                                same_subject: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            field_id: {
                                                type: 'array',
                                                items: { type: 'string' },
                                            },
                                            directive: {
                                                type: 'string',
                                                enum: ['required', 'preferred'],
                                            },
                                        },
                                        required: ['field_id', 'directive'],
                                        additionalProperties: false,
                                    },
                                },
                            },
                            additionalProperties: false,
                        },
                    },
                    required: ['id'],
                    additionalProperties: false,
                },
                field: {
                    type: 'object',
                    oneOf: [
                        {
                            properties: {
                                id: { type: 'string' },
                                path: {
                                    type: 'array',
                                    items: { type: 'string' },
                                },
                                purpose: { type: 'string' },
                                intent_to_retain: { type: 'boolean' },
                                optional: { type: 'boolean' },
                                filter: { $ref: 'http://json-schema.org/schema#' },
                            },
                            required: ['path'],
                            additionalProperties: false,
                        },
                        {
                            properties: {
                                id: { type: 'string' },
                                path: {
                                    type: 'array',
                                    items: { type: 'string' },
                                },
                                purpose: { type: 'string' },
                                intent_to_retain: { type: 'boolean' },
                                optional: { type: 'boolean' },
                                filter: { $ref: 'http://json-schema.org/schema#' },
                                predicate: {
                                    type: 'string',
                                    enum: ['required', 'preferred'],
                                },
                            },
                            required: ['path', 'filter', 'predicate'],
                            additionalProperties: false,
                        },
                    ],
                },
            },
            type: 'object',
            properties: {
                presentation_definition: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        purpose: { type: 'string' },
                        format: { $ref: '#/definitions/format' },
                        frame: {
                            type: 'object',
                            additionalProperties: true,
                        },
                        submission_requirements: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/submission_requirements',
                            },
                        },
                        input_descriptors: {
                            type: 'array',
                            items: { $ref: '#/definitions/input_descriptors' },
                        },
                    },
                    required: ['id', 'input_descriptors'],
                    additionalProperties: false,
                },
            },
        };
    }
}
exports.PresentationDefinitionSchema = PresentationDefinitionSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VudGF0aW9uRGVmaW5pdGlvblNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi92YWxpZGF0aW9uL2NvcmUvcHJlc2VudGF0aW9uRGVmaW5pdGlvblNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLDRCQUE0QjtJQUN2QyxrQ0FBa0M7SUFDM0IsTUFBTSxDQUFDLGlDQUFpQztRQUM3QyxPQUFPO1lBQ0wsT0FBTyxFQUFFLHlDQUF5QztZQUNsRCxLQUFLLEVBQUUseUJBQXlCO1lBQ2hDLFdBQVcsRUFBRTtnQkFDWCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFO3dCQUNWLEdBQUcsRUFBRTs0QkFDSCxJQUFJLEVBQUUsUUFBUTt5QkFDZjt3QkFDRCxRQUFRLEVBQUU7NEJBQ1IsSUFBSSxFQUFFLFNBQVM7eUJBQ2hCO3FCQUNGO29CQUNELFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQztvQkFDakIsb0JBQW9CLEVBQUUsS0FBSztpQkFDNUI7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRTt3QkFDVixRQUFRLEVBQUU7NEJBQ1IsSUFBSSxFQUFFLFFBQVE7eUJBQ2Y7cUJBQ0Y7b0JBQ0Qsb0JBQW9CLEVBQUUsSUFBSTtpQkFDM0I7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRTt3QkFDVixJQUFJLEVBQUU7NEJBQ0osSUFBSSxFQUFFLFFBQVE7eUJBQ2Y7d0JBQ0QsTUFBTSxFQUFFOzRCQUNOLElBQUksRUFBRSxRQUFRO3lCQUNmO3dCQUNELE9BQU8sRUFBRTs0QkFDUCxJQUFJLEVBQUUsUUFBUTt5QkFDZjt3QkFDRCxPQUFPLEVBQUU7NEJBQ1AsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQzt5QkFDM0I7d0JBQ0QsU0FBUyxF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