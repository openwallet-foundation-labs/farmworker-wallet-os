export declare class PresentationDefinitionSchema {
    static getPresentationDefinitionSchemaV1(): {
        $schema: string;
        title: string;
        definitions: {
            schema: {
                type: string;
                properties: {
                    uri: {
                        type: string;
                    };
                    required: {
                        type: string;
                    };
                };
                required: string[];
                additionalProperties: boolean;
            };
            issuance: {
                type: string;
                properties: {
                    manifest: {
                        type: string;
                    };
                };
                additionalProperties: boolean;
            };
            filter: {
                type: string;
                properties: {
                    type: {
                        type: string;
                    };
                    format: {
                        type: string;
                    };
                    pattern: {
                        type: string;
                    };
                    minimum: {
                        type: string[];
                    };
                    minLength: {
                        type: string;
                    };
                    maxLength: {
                        type: string;
                    };
                    exclusiveMinimum: {
                        type: string[];
                    };
                    exclusiveMaximum: {
                        type: string[];
                    };
                    maximum: {
                        type: string[];
                    };
                    const: {
                        type: string[];
                    };
                    enum: {
                        type: string;
                        items: {
                            type: string[];
                        };
                    };
                    not: {
                        type: string;
                        minProperties: number;
                    };
                };
                required: string[];
                additionalProperties: boolean;
            };
            format: {
                type: string;
                properties: {
                    'vc+sd-jwt': {
                        type: string;
                        properties: {
                            'sd-jwt_alg_values': {
                                type: string;
                                description: string;
                                minItems: number;
                                items: {
                                    type: string;
                                };
                            };
                            'kb-jwt_alg_values': {
                                type: string;
                                description: string;
                                minItems: number;
                                items: {
                                    type: string;
                                };
                            };
                        };
                        required: never[];
                        additionalProperties: boolean;
                    };
                };
                patternProperties: {
                    '^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$': {
                        type: string;
                        properties: {
                            alg: {
                                type: string;
                                minItems: number;
                                items: {
                                    type: string;
                                };
                            };
                        };
                        required: string[];
                        additionalProperties: boolean;
                    };
                    '^ldp_vc$|^ldp_vp$|^ldp$': {
                        type: string;
                        properties: {
                            proof_type: {
                                type: string;
                                minItems: number;
                                items: {
                                    type: string;
                                };
                            };
                        };
                        required: string[];
                        additionalProperties: boolean;
                    };
                    '^di_vc$|^di_vp$|^di$': {
                        type: string;
                        properties: {
                            proof_type: {
                                type: string;
                                minItems: number;
                                items: {
                                    type: string;
                                };
                            };
                            cryptosuite: {
                                type: string;
                                minItems: number;
                                items: {
                                    type: string;
                                };
                            };
                        };
                        required: string[];
                        additionalProperties: boolean;
                    };
                    additionalProperties: boolean;
                };
                additionalProperties: boolean;
            };
            submission_requirements: {
                type: string;
                oneOf: ({
                    properties: {
                        name: {
                            type: string;
                        };
                        purpose: {
                            type: string;
                        };
                        rule: {
                            type: string;
                            enum: string[];
                        };
                        count: {
                            type: string;
                            minimum: number;
                        };
                        min: {
                            type: string;
                            minimum: number;
                        };
                        max: {
                            type: string;
                            minimum: number;
                        };
                        from: {
                            type: string;
                        };
                        from_nested?: undefined;
                    };
                    required: string[];
                    additionalProperties: boolean;
                } | {
                    properties: {
                        name: {
                            type: string;
                        };
                        purpose: {
                            type: string;
                        };
                        rule: {
                            type: string;
                            enum: string[];
                        };
                        count: {
                            type: string;
                            minimum: number;
                        };
                        min: {
                            type: string;
                            minimum: number;
                        };
                        max: {
                            type: string;
                            minimum: number;
                        };
                        from_nested: {
                            type: string;
                            minItems: number;
                            items: {
                                $ref: string;
                            };
                        };
                        from?: undefined;
                    };
                    required: string[];
                    additionalProperties: boolean;
                })[];
            };
            input_descriptors: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    name: {
                        type: string;
                    };
                    purpose: {
                        type: string;
                    };
                    group: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                    schema: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    issuance: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    constraints: {
                        type: string;
                        properties: {
                            limit_disclosure: {
                                type: string;
                                enum: string[];
                            };
                            statuses: {
                                type: string;
                                properties: {
                                    active: {
                                        type: string;
                                        properties: {
                                            directive: {
                                                type: string;
                                                enum: string[];
                                            };
                                        };
                                    };
                                    suspended: {
                                        type: string;
                                        properties: {
                                            directive: {
                                                type: string;
                                                enum: string[];
                                            };
                                        };
                                    };
                                    revoked: {
                                        type: string;
                                        properties: {
                                            directive: {
                                                type: string;
                                                enum: string[];
                                            };
                                        };
                                    };
                                };
                            };
                            fields: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                            };
                            subject_is_issuer: {
                                type: string;
                                enum: string[];
                            };
                            is_holder: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        field_id: {
                                            type: string;
                                            items: {
                                                type: string;
                                            };
                                        };
                                        directive: {
                                            type: string;
                                            enum: string[];
                                        };
                                    };
                                    required: string[];
                                    additionalProperties: boolean;
                                };
                            };
                            same_subject: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        field_id: {
                                            type: string;
                                            items: {
                                                type: string;
                                            };
                                        };
                                        directive: {
                                            type: string;
                                            enum: string[];
                                        };
                                    };
                                    required: string[];
                                    additionalProperties: boolean;
                                };
                            };
                        };
                        additionalProperties: boolean;
                    };
                };
                required: string[];
                additionalProperties: boolean;
            };
            field: {
                type: string;
                oneOf: ({
                    properties: {
                        id: {
                            type: string;
                        };
                        path: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        purpose: {
                            type: string;
                        };
                        filter: {
                            $ref: string;
                        };
                        predicate?: undefined;
                    };
                    required: string[];
                    additionalProperties: boolean;
                } | {
                    properties: {
                        id: {
                            type: string;
                        };
                        path: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        purpose: {
                            type: string;
                        };
                        filter: {
                            $ref: string;
                        };
                        predicate: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                    additionalProperties: boolean;
                })[];
            };
        };
        type: string;
        properties: {
            presentation_definition: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    name: {
                        type: string;
                    };
                    purpose: {
                        type: string;
                    };
                    format: {
                        $ref: string;
                    };
                    submission_requirements: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    input_descriptors: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                required: string[];
                additionalProperties: boolean;
            };
        };
    };
    static getPresentationDefinitionSchemaV2(): {
        $schema: string;
        title: string;
        definitions: {
            issuance: {
                type: string;
                properties: {
                    manifest: {
                        type: string;
                    };
                };
                additionalProperties: boolean;
            };
            format: {
                type: string;
                properties: {
                    'vc+sd-jwt': {
                        type: string;
                        properties: {};
                        required: never[];
                        additionalProperties: boolean;
                    };
                };
                patternProperties: {
                    '^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^mso_mdoc$': {
                        type: string;
                        properties: {
                            alg: {
                                type: string;
                                minItems: number;
                                items: {
                                    type: string;
                                };
                            };
                        };
                        required: string[];
                        additionalProperties: boolean;
                    };
                    '^ldp_vc$|^ldp_vp$|^ldp$': {
                        type: string;
                        properties: {
                            proof_type: {
                                type: string;
                                minItems: number;
                                items: {
                                    type: string;
                                };
                            };
                        };
                        required: string[];
                        additionalProperties: boolean;
                    };
                    '^di_vc$|^di_vp$|^di$': {
                        type: string;
                        properties: {
                            proof_type: {
                                type: string;
                                minItems: number;
                                items: {
                                    type: string;
                                };
                            };
                            cryptosuite: {
                                type: string;
                                minItems: number;
                                items: {
                                    type: string;
                                };
                            };
                        };
                        required: string[];
                        additionalProperties: boolean;
                    };
                    additionalProperties: boolean;
                };
                additionalProperties: boolean;
            };
            submission_requirements: {
                type: string;
                oneOf: ({
                    properties: {
                        name: {
                            type: string;
                        };
                        purpose: {
                            type: string;
                        };
                        rule: {
                            type: string;
                            enum: string[];
                        };
                        count: {
                            type: string;
                            minimum: number;
                        };
                        min: {
                            type: string;
                            minimum: number;
                        };
                        max: {
                            type: string;
                            minimum: number;
                        };
                        from: {
                            type: string;
                        };
                        from_nested?: undefined;
                    };
                    required: string[];
                    additionalProperties: boolean;
                } | {
                    properties: {
                        name: {
                            type: string;
                        };
                        purpose: {
                            type: string;
                        };
                        rule: {
                            type: string;
                            enum: string[];
                        };
                        count: {
                            type: string;
                            minimum: number;
                        };
                        min: {
                            type: string;
                            minimum: number;
                        };
                        max: {
                            type: string;
                            minimum: number;
                        };
                        from_nested: {
                            type: string;
                            minItems: number;
                            items: {
                                $ref: string;
                            };
                        };
                        from?: undefined;
                    };
                    required: string[];
                    additionalProperties: boolean;
                })[];
            };
            input_descriptors: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    name: {
                        type: string;
                    };
                    purpose: {
                        type: string;
                    };
                    issuance: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    group: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                    format: {
                        $ref: string;
                    };
                    constraints: {
                        type: string;
                        properties: {
                            limit_disclosure: {
                                type: string;
                                enum: string[];
                            };
                            statuses: {
                                type: string;
                                properties: {
                                    active: {
                                        type: string;
                                        properties: {
                                            directive: {
                                                type: string;
                                                enum: string[];
                                            };
                                        };
                                    };
                                    suspended: {
                                        type: string;
                                        properties: {
                                            directive: {
                                                type: string;
                                                enum: string[];
                                            };
                                        };
                                    };
                                    revoked: {
                                        type: string;
                                        properties: {
                                            directive: {
                                                type: string;
                                                enum: string[];
                                            };
                                        };
                                    };
                                };
                            };
                            fields: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                            };
                            subject_is_issuer: {
                                type: string;
                                enum: string[];
                            };
                            is_holder: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        field_id: {
                                            type: string;
                                            items: {
                                                type: string;
                                            };
                                        };
                                        directive: {
                                            type: string;
                                            enum: string[];
                                        };
                                    };
                                    required: string[];
                                    additionalProperties: boolean;
                                };
                            };
                            same_subject: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        field_id: {
                                            type: string;
                                            items: {
                                                type: string;
                                            };
                                        };
                                        directive: {
                                            type: string;
                                            enum: string[];
                                        };
                                    };
                                    required: string[];
                                    additionalProperties: boolean;
                                };
                            };
                        };
                        additionalProperties: boolean;
                    };
                };
                required: string[];
                additionalProperties: boolean;
            };
            field: {
                type: string;
                oneOf: ({
                    properties: {
                        id: {
                            type: string;
                        };
                        path: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        purpose: {
                            type: string;
                        };
                        intent_to_retain: {
                            type: string;
                        };
                        optional: {
                            type: string;
                        };
                        filter: {
                            $ref: string;
                        };
                        predicate?: undefined;
                    };
                    required: string[];
                    additionalProperties: boolean;
                } | {
                    properties: {
                        id: {
                            type: string;
                        };
                        path: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        purpose: {
                            type: string;
                        };
                        intent_to_retain: {
                            type: string;
                        };
                        optional: {
                            type: string;
                        };
                        filter: {
                            $ref: string;
                        };
                        predicate: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                    additionalProperties: boolean;
                })[];
            };
        };
        type: string;
        properties: {
            presentation_definition: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    name: {
                        type: string;
                    };
                    purpose: {
                        type: string;
                    };
                    format: {
                        $ref: string;
                    };
                    frame: {
                        type: string;
                        additionalProperties: boolean;
                    };
                    submission_requirements: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    input_descriptors: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                required: string[];
                additionalProperties: boolean;
            };
        };
    };
}
