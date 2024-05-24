export class PresentationSubmissionSchema {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VudGF0aW9uU3VibWlzc2lvblNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi92YWxpZGF0aW9uL2NvcmUvcHJlc2VudGF0aW9uU3VibWlzc2lvblNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sNEJBQTRCO0lBQ3ZDLGtDQUFrQztJQUMzQixNQUFNLENBQUMsK0JBQStCO1FBQzNDLE9BQU87WUFDTCxPQUFPLEVBQUUseUNBQXlDO1lBQ2xELEtBQUssRUFBRSx5QkFBeUI7WUFDaEMsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsdUJBQXVCLEVBQUU7b0JBQ3ZCLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRTt3QkFDVixFQUFFLEVBQUU7NEJBQ0YsSUFBSSxFQUFFLFFBQVE7eUJBQ2Y7d0JBQ0QsYUFBYSxFQUFFOzRCQUNiLElBQUksRUFBRSxRQUFRO3lCQUNmO3dCQUNELGNBQWMsRUFBRTs0QkFDZCxJQUFJLEVBQUUsT0FBTzs0QkFDYixLQUFLLEVBQUU7Z0NBQ0wsSUFBSSxFQUFFLDBCQUEwQjs2QkFDakM7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDbkQsb0JBQW9CLEVBQUUsS0FBSztpQkFDNUI7YUFDRjtZQUNELFdBQVcsRUFBRTtnQkFDWCxVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFO3dCQUNWLEVBQUUsRUFBRTs0QkFDRixJQUFJLEVBQUUsUUFBUTt5QkFDZjt3QkFDRCxJQUFJLEVBQUU7NEJBQ0osSUFBSSxFQUFFLFFBQVE7eUJBQ2Y7d0JBQ0QsV0FBVyxFQUFFOzRCQUNYLElBQUksRUFBRSxRQUFROzRCQUNkLElBQUksRUFBRSwwQkFBMEI7eUJBQ2pDO3dCQUNELE1BQU0sRUFBRTs0QkFDTixJQUFJLEVBQUUsUUFBUTs0QkFDZCxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQzt5QkFDaEk7cUJBQ0Y7b0JBQ0QsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7b0JBQ2xDLG9CQUFvQixFQUFFLEtBQUs7aUJBQzVCO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztZQUNyQyxvQkFBb0IsRUFBRSxLQUFLO1NBQzVCLENBQUM7SUFDSixDQUFDO0NBQ0YifQ==