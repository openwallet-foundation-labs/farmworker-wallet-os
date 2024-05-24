export class PresentationDefinitionSchema {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VudGF0aW9uRGVmaW5pdGlvblNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi92YWxpZGF0aW9uL2NvcmUvcHJlc2VudGF0aW9uRGVmaW5pdGlvblNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sNEJBQTRCO0lBQ3ZDLGtDQUFrQztJQUMzQixNQUFNLENBQUMsaUNBQWlDO1FBQzdDLE9BQU87WUFDTCxPQUFPLEVBQUUseUNBQXlDO1lBQ2xELEtBQUssRUFBRSx5QkFBeUI7WUFDaEMsV0FBVyxFQUFFO2dCQUNYLE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUU7d0JBQ1YsR0FBRyxFQUFFOzRCQUNILElBQUksRUFBRSxRQUFRO3lCQUNmO3dCQUNELFFBQVEsRUFBRTs0QkFDUixJQUFJLEVBQUUsU0FBUzt5QkFDaEI7cUJBQ0Y7b0JBQ0QsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDO29CQUNqQixvQkFBb0IsRUFBRSxLQUFLO2lCQUM1QjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFO3dCQUNWLFFBQVEsRUFBRTs0QkFDUixJQUFJLEVBQUUsUUFBUTt5QkFDZjtxQkFDRjtvQkFDRCxvQkFBb0IsRUFBRSxJQUFJO2lCQUMzQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFO3dCQUNWLElBQUksRUFBRTs0QkFDSixJQUFJLEVBQUUsUUFBUTt5QkFDZjt3QkFDRCxNQUFNLEVBQUU7NEJBQ04sSUFBSSxFQUFFLFFBQVE7eUJBQ2Y7d0JBQ0QsT0FBTyxFQUFFOzRCQUNQLElBQUksRUFBRSxRQUFRO3lCQUNmO3dCQUNELE9BQU8sRUFBRTs0QkFDUCxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO3lCQUMzQjt3QkFDRCxTQUFT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