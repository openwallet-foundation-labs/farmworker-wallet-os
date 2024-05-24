export declare class PresentationSubmissionSchema {
    static getPresentationSubmissionSchema(): {
        $schema: string;
        title: string;
        type: string;
        properties: {
            presentation_submission: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    definition_id: {
                        type: string;
                    };
                    descriptor_map: {
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
        definitions: {
            descriptor: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    path: {
                        type: string;
                    };
                    path_nested: {
                        type: string;
                        $ref: string;
                    };
                    format: {
                        type: string;
                        enum: string[];
                    };
                };
                required: string[];
                additionalProperties: boolean;
            };
        };
        required: string[];
        additionalProperties: boolean;
    };
}
