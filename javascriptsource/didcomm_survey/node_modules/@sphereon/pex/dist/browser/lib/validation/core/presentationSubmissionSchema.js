"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentationSubmissionSchema = void 0;
class PresentationSubmissionSchema {
    //TODO: pass it with a config file
    static getPresentationSubmissionSchema() {
        return {
            $schema: 'http://json-schema.org/draft-07/schema#',
            title: 'Presentation Submission',
            type: 'object',
            properties: {
                presentation_submission: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                        },
                        definition_id: {
                            type: 'string',
                        },
                        descriptor_map: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/descriptor',
                            },
                        },
                    },
                    required: ['id', 'definition_id', 'descriptor_map'],
                    additionalProperties: false,
                },
            },
            definitions: {
                descriptor: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                        },
                        path: {
                            type: 'string',
                        },
                        path_nested: {
                            type: 'object',
                            $ref: '#/definitions/descriptor',
                        },
                        format: {
                            type: 'string',
                            enum: ['jwt', 'jwt_vc', 'jwt_vc_json', 'jwt_vp', 'jwt_vp_json', 'ldp', 'ldp_vc', 'ldp_vp', 'di', 'di_vc', 'di_vp', 'vc+sd-jwt'],
                        },
                    },
                    required: ['id', 'path', 'format'],
                    additionalProperties: false,
                },
            },
            required: ['presentation_submission'],
            additionalProperties: false,
        };
    }
}
exports.PresentationSubmissionSchema = PresentationSubmissionSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VudGF0aW9uU3VibWlzc2lvblNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi92YWxpZGF0aW9uL2NvcmUvcHJlc2VudGF0aW9uU3VibWlzc2lvblNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLDRCQUE0QjtJQUN2QyxrQ0FBa0M7SUFDM0IsTUFBTSxDQUFDLCtCQUErQjtRQUMzQyxPQUFPO1lBQ0wsT0FBTyxFQUFFLHlDQUF5QztZQUNsRCxLQUFLLEVBQUUseUJBQXlCO1lBQ2hDLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLHVCQUF1QixFQUFFO29CQUN2QixJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUU7d0JBQ1YsRUFBRSxFQUFFOzRCQUNGLElBQUksRUFBRSxRQUFRO3lCQUNmO3dCQUNELGFBQWEsRUFBRTs0QkFDYixJQUFJLEVBQUUsUUFBUTt5QkFDZjt3QkFDRCxjQUFjLEVBQUU7NEJBQ2QsSUFBSSxFQUFFLE9BQU87NEJBQ2IsS0FBSyxFQUFFO2dDQUNMLElBQUksRUFBRSwwQkFBMEI7NkJBQ2pDO3lCQUNGO3FCQUNGO29CQUNELFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ25ELG9CQUFvQixFQUFFLEtBQUs7aUJBQzVCO2FBQ0Y7WUFDRCxXQUFXLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRTt3QkFDVixFQUFFLEVBQUU7NEJBQ0YsSUFBSSxFQUFFLFFBQVE7eUJBQ2Y7d0JBQ0QsSUFBSSxFQUFFOzRCQUNKLElBQUksRUFBRSxRQUFRO3lCQUNmO3dCQUNELFdBQVcsRUFBRTs0QkFDWCxJQUFJLEVBQUUsUUFBUTs0QkFDZCxJQUFJLEVBQUUsMEJBQTBCO3lCQUNqQzt3QkFDRCxNQUFNLEVBQUU7NEJBQ04sSUFBSSxFQUFFLFFBQVE7NEJBQ2QsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUM7eUJBQ2hJO3FCQUNGO29CQUNELFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO29CQUNsQyxvQkFBb0IsRUFBRSxLQUFLO2lCQUM1QjthQUNGO1lBQ0QsUUFBUSxFQUFFLENBQUMseUJBQXlCLENBQUM7WUFDckMsb0JBQW9CLEVBQUUsS0FBSztTQUM1QixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBdkRELG9FQXVEQyJ9