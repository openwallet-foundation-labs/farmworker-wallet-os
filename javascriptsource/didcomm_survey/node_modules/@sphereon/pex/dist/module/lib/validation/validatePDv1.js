"use strict";
module.exports = validate42;
module.exports.default = validate42;
const schema12 = { "$schema": "http://json-schema.org/draft-07/schema#", "title": "Presentation Definition", "definitions": { "schema": { "type": "object", "properties": { "uri": { "type": "string" }, "required": { "type": "boolean" } }, "required": ["uri"], "additionalProperties": false }, "issuance": { "type": "object", "properties": { "manifest": { "type": "string" } }, "additionalProperties": true }, "filter": { "type": "object", "properties": { "type": { "type": "string" }, "format": { "type": "string" }, "pattern": { "type": "string" }, "minimum": { "type": ["number", "string"] }, "minLength": { "type": "integer" }, "maxLength": { "type": "integer" }, "exclusiveMinimum": { "type": ["number", "string"] }, "exclusiveMaximum": { "type": ["number", "string"] }, "maximum": { "type": ["number", "string"] }, "const": { "type": ["number", "string"] }, "enum": { "type": "array", "items": { "type": ["number", "string"] } }, "not": { "type": "object", "minProperties": 1 } }, "required": ["type"], "additionalProperties": false }, "format": { "type": "object", "properties": { "vc+sd-jwt": { "type": "object", "properties": { "sd-jwt_alg_values": { "type": "array", "description": "A JSON array containing identifiers of cryptographic algorithms the verifier supports for protection of a SD-JWT. If present, the alg JOSE header (as defined in [RFC7515]) of the presented SD-JWT MUST match one of the array values.", "minItems": 1, "items": { "type": "string" } }, "kb-jwt_alg_values": { "type": "array", "description": "A JSON array containing identifiers of cryptographic algorithms the verifier supports for protection of a KB-JWT. If present, the alg JOSE header (as defined in [RFC7515]) of the presented KB-JWT MUST match one of the array values.", "minItems": 1, "items": { "type": "string" } } }, "required": [], "additionalProperties": false } }, "patternProperties": { "^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$": { "type": "object", "properties": { "alg": { "type": "array", "minItems": 1, "items": { "type": "string" } } }, "required": ["alg"], "additionalProperties": false }, "^ldp_vc$|^ldp_vp$|^ldp$": { "type": "object", "properties": { "proof_type": { "type": "array", "minItems": 1, "items": { "type": "string" } } }, "required": ["proof_type"], "additionalProperties": false }, "^di_vc$|^di_vp$|^di$": { "type": "object", "properties": { "proof_type": { "type": "array", "minItems": 1, "items": { "type": "string" } }, "cryptosuite": { "type": "array", "minItems": 1, "items": { "type": "string" } } }, "required": ["proof_type", "cryptosuite"], "additionalProperties": false }, "additionalProperties": false }, "additionalProperties": false }, "submission_requirements": { "type": "object", "oneOf": [{ "properties": { "name": { "type": "string" }, "purpose": { "type": "string" }, "rule": { "type": "string", "enum": ["all", "pick"] }, "count": { "type": "integer", "minimum": 1 }, "min": { "type": "integer", "minimum": 0 }, "max": { "type": "integer", "minimum": 0 }, "from": { "type": "string" } }, "required": ["rule", "from"], "additionalProperties": false }, { "properties": { "name": { "type": "string" }, "purpose": { "type": "string" }, "rule": { "type": "string", "enum": ["all", "pick"] }, "count": { "type": "integer", "minimum": 1 }, "min": { "type": "integer", "minimum": 0 }, "max": { "type": "integer", "minimum": 0 }, "from_nested": { "type": "array", "minItems": 1, "items": { "$ref": "#/definitions/submission_requirements" } } }, "required": ["rule", "from_nested"], "additionalProperties": false }] }, "input_descriptors": { "type": "object", "properties": { "id": { "type": "string" }, "name": { "type": "string" }, "purpose": { "type": "string" }, "group": { "type": "array", "items": { "type": "string" } }, "schema": { "type": "array", "items": { "$ref": "#/definitions/schema" } }, "issuance": { "type": "array", "items": { "$ref": "#/definitions/issuance" } }, "constraints": { "type": "object", "properties": { "limit_disclosure": { "type": "string", "enum": ["required", "preferred"] }, "statuses": { "type": "object", "properties": { "active": { "type": "object", "properties": { "directive": { "type": "string", "enum": ["required", "allowed", "disallowed"] } } }, "suspended": { "type": "object", "properties": { "directive": { "type": "string", "enum": ["required", "allowed", "disallowed"] } } }, "revoked": { "type": "object", "properties": { "directive": { "type": "string", "enum": ["required", "allowed", "disallowed"] } } } } }, "fields": { "type": "array", "items": { "$ref": "#/definitions/field" } }, "subject_is_issuer": { "type": "string", "enum": ["required", "preferred"] }, "is_holder": { "type": "array", "items": { "type": "object", "properties": { "field_id": { "type": "array", "items": { "type": "string" } }, "directive": { "type": "string", "enum": ["required", "preferred"] } }, "required": ["field_id", "directive"], "additionalProperties": false } }, "same_subject": { "type": "array", "items": { "type": "object", "properties": { "field_id": { "type": "array", "items": { "type": "string" } }, "directive": { "type": "string", "enum": ["required", "preferred"] } }, "required": ["field_id", "directive"], "additionalProperties": false } } }, "additionalProperties": false } }, "required": ["id", "schema"], "additionalProperties": false }, "field": { "type": "object", "oneOf": [{ "properties": { "id": { "type": "string" }, "path": { "type": "array", "items": { "type": "string" } }, "purpose": { "type": "string" }, "filter": { "$ref": "#/definitions/filter" } }, "required": ["path"], "additionalProperties": false }, { "properties": { "id": { "type": "string" }, "path": { "type": "array", "items": { "type": "string" } }, "purpose": { "type": "string" }, "filter": { "$ref": "#/definitions/filter" }, "predicate": { "type": "string", "enum": ["required", "preferred"] } }, "required": ["path", "filter", "predicate"], "additionalProperties": false }] } }, "type": "object", "properties": { "presentation_definition": { "type": "object", "properties": { "id": { "type": "string" }, "name": { "type": "string" }, "purpose": { "type": "string" }, "format": { "$ref": "#/definitions/format" }, "submission_requirements": { "type": "array", "items": { "$ref": "#/definitions/submission_requirements" } }, "input_descriptors": { "type": "array", "items": { "$ref": "#/definitions/input_descriptors" } } }, "required": ["id", "input_descriptors"], "additionalProperties": false } } };
const schema13 = { "type": "object", "properties": { "vc+sd-jwt": { "type": "object", "properties": { "sd-jwt_alg_values": { "type": "array", "description": "A JSON array containing identifiers of cryptographic algorithms the verifier supports for protection of a SD-JWT. If present, the alg JOSE header (as defined in [RFC7515]) of the presented SD-JWT MUST match one of the array values.", "minItems": 1, "items": { "type": "string" } }, "kb-jwt_alg_values": { "type": "array", "description": "A JSON array containing identifiers of cryptographic algorithms the verifier supports for protection of a KB-JWT. If present, the alg JOSE header (as defined in [RFC7515]) of the presented KB-JWT MUST match one of the array values.", "minItems": 1, "items": { "type": "string" } } }, "required": [], "additionalProperties": false } }, "patternProperties": { "^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$": { "type": "object", "properties": { "alg": { "type": "array", "minItems": 1, "items": { "type": "string" } } }, "required": ["alg"], "additionalProperties": false }, "^ldp_vc$|^ldp_vp$|^ldp$": { "type": "object", "properties": { "proof_type": { "type": "array", "minItems": 1, "items": { "type": "string" } } }, "required": ["proof_type"], "additionalProperties": false }, "^di_vc$|^di_vp$|^di$": { "type": "object", "properties": { "proof_type": { "type": "array", "minItems": 1, "items": { "type": "string" } }, "cryptosuite": { "type": "array", "minItems": 1, "items": { "type": "string" } } }, "required": ["proof_type", "cryptosuite"], "additionalProperties": false }, "additionalProperties": false }, "additionalProperties": false };
const pattern0 = new RegExp("^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$", "u");
const pattern1 = new RegExp("^ldp_vc$|^ldp_vp$|^ldp$", "u");
const pattern2 = new RegExp("^di_vc$|^di_vp$|^di$", "u");
const pattern3 = new RegExp("additionalProperties", "u");
function validate43(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (data && typeof data == "object" && !Array.isArray(data)) {
    for (const key0 in data) {
        if (!(((((key0 === "vc+sd-jwt") || (pattern0.test(key0))) || (pattern1.test(key0))) || (pattern2.test(key0))) || (pattern3.test(key0)))) {
            const err0 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties", schema: false, parentSchema: schema13, data };
            if (vErrors === null) {
                vErrors = [err0];
            }
            else {
                vErrors.push(err0);
            }
            errors++;
        }
    }
    if (data["vc+sd-jwt"] !== undefined) {
        let data0 = data["vc+sd-jwt"];
        if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
            for (const key1 in data0) {
                if (!((key1 === "sd-jwt_alg_values") || (key1 === "kb-jwt_alg_values"))) {
                    const err1 = { instancePath: instancePath + "/vc+sd-jwt", schemaPath: "#/properties/vc%2Bsd-jwt/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties", schema: false, parentSchema: schema13.properties["vc+sd-jwt"], data: data0 };
                    if (vErrors === null) {
                        vErrors = [err1];
                    }
                    else {
                        vErrors.push(err1);
                    }
                    errors++;
                }
            }
            if (data0["sd-jwt_alg_values"] !== undefined) {
                let data1 = data0["sd-jwt_alg_values"];
                if (Array.isArray(data1)) {
                    if (data1.length < 1) {
                        const err2 = { instancePath: instancePath + "/vc+sd-jwt/sd-jwt_alg_values", schemaPath: "#/properties/vc%2Bsd-jwt/properties/sd-jwt_alg_values/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema13.properties["vc+sd-jwt"].properties["sd-jwt_alg_values"], data: data1 };
                        if (vErrors === null) {
                            vErrors = [err2];
                        }
                        else {
                            vErrors.push(err2);
                        }
                        errors++;
                    }
                    const len0 = data1.length;
                    for (let i0 = 0; i0 < len0; i0++) {
                        let data2 = data1[i0];
                        if (typeof data2 !== "string") {
                            const err3 = { instancePath: instancePath + "/vc+sd-jwt/sd-jwt_alg_values/" + i0, schemaPath: "#/properties/vc%2Bsd-jwt/properties/sd-jwt_alg_values/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema13.properties["vc+sd-jwt"].properties["sd-jwt_alg_values"].items.type, parentSchema: schema13.properties["vc+sd-jwt"].properties["sd-jwt_alg_values"].items, data: data2 };
                            if (vErrors === null) {
                                vErrors = [err3];
                            }
                            else {
                                vErrors.push(err3);
                            }
                            errors++;
                        }
                    }
                }
                else {
                    const err4 = { instancePath: instancePath + "/vc+sd-jwt/sd-jwt_alg_values", schemaPath: "#/properties/vc%2Bsd-jwt/properties/sd-jwt_alg_values/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema13.properties["vc+sd-jwt"].properties["sd-jwt_alg_values"].type, parentSchema: schema13.properties["vc+sd-jwt"].properties["sd-jwt_alg_values"], data: data1 };
                    if (vErrors === null) {
                        vErrors = [err4];
                    }
                    else {
                        vErrors.push(err4);
                    }
                    errors++;
                }
            }
            if (data0["kb-jwt_alg_values"] !== undefined) {
                let data3 = data0["kb-jwt_alg_values"];
                if (Array.isArray(data3)) {
                    if (data3.length < 1) {
                        const err5 = { instancePath: instancePath + "/vc+sd-jwt/kb-jwt_alg_values", schemaPath: "#/properties/vc%2Bsd-jwt/properties/kb-jwt_alg_values/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema13.properties["vc+sd-jwt"].properties["kb-jwt_alg_values"], data: data3 };
                        if (vErrors === null) {
                            vErrors = [err5];
                        }
                        else {
                            vErrors.push(err5);
                        }
                        errors++;
                    }
                    const len1 = data3.length;
                    for (let i1 = 0; i1 < len1; i1++) {
                        let data4 = data3[i1];
                        if (typeof data4 !== "string") {
                            const err6 = { instancePath: instancePath + "/vc+sd-jwt/kb-jwt_alg_values/" + i1, schemaPath: "#/properties/vc%2Bsd-jwt/properties/kb-jwt_alg_values/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema13.properties["vc+sd-jwt"].properties["kb-jwt_alg_values"].items.type, parentSchema: schema13.properties["vc+sd-jwt"].properties["kb-jwt_alg_values"].items, data: data4 };
                            if (vErrors === null) {
                                vErrors = [err6];
                            }
                            else {
                                vErrors.push(err6);
                            }
                            errors++;
                        }
                    }
                }
                else {
                    const err7 = { instancePath: instancePath + "/vc+sd-jwt/kb-jwt_alg_values", schemaPath: "#/properties/vc%2Bsd-jwt/properties/kb-jwt_alg_values/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema13.properties["vc+sd-jwt"].properties["kb-jwt_alg_values"].type, parentSchema: schema13.properties["vc+sd-jwt"].properties["kb-jwt_alg_values"], data: data3 };
                    if (vErrors === null) {
                        vErrors = [err7];
                    }
                    else {
                        vErrors.push(err7);
                    }
                    errors++;
                }
            }
        }
        else {
            const err8 = { instancePath: instancePath + "/vc+sd-jwt", schemaPath: "#/properties/vc%2Bsd-jwt/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema13.properties["vc+sd-jwt"].type, parentSchema: schema13.properties["vc+sd-jwt"], data: data0 };
            if (vErrors === null) {
                vErrors = [err8];
            }
            else {
                vErrors.push(err8);
            }
            errors++;
        }
    }
    for (const key2 in data) {
        if (pattern0.test(key2)) {
            let data5 = data[key2];
            if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
                if (data5.alg === undefined) {
                    const err9 = { instancePath: instancePath + "/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/%5Ejwt%24%7C%5Ejwt_vc%24%7C%5Ejwt_vc_json%24%7C%5Ejwt_vp%24%7C%5Ejwt_vp_json%24/required", keyword: "required", params: { missingProperty: "alg" }, message: "must have required property '" + "alg" + "'", schema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$"].required, parentSchema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$"], data: data5 };
                    if (vErrors === null) {
                        vErrors = [err9];
                    }
                    else {
                        vErrors.push(err9);
                    }
                    errors++;
                }
                for (const key3 in data5) {
                    if (!(key3 === "alg")) {
                        const err10 = { instancePath: instancePath + "/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/%5Ejwt%24%7C%5Ejwt_vc%24%7C%5Ejwt_vc_json%24%7C%5Ejwt_vp%24%7C%5Ejwt_vp_json%24/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties", schema: false, parentSchema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$"], data: data5 };
                        if (vErrors === null) {
                            vErrors = [err10];
                        }
                        else {
                            vErrors.push(err10);
                        }
                        errors++;
                    }
                }
                if (data5.alg !== undefined) {
                    let data6 = data5.alg;
                    if (Array.isArray(data6)) {
                        if (data6.length < 1) {
                            const err11 = { instancePath: instancePath + "/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/alg", schemaPath: "#/patternProperties/%5Ejwt%24%7C%5Ejwt_vc%24%7C%5Ejwt_vc_json%24%7C%5Ejwt_vp%24%7C%5Ejwt_vp_json%24/properties/alg/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$"].properties.alg, data: data6 };
                            if (vErrors === null) {
                                vErrors = [err11];
                            }
                            else {
                                vErrors.push(err11);
                            }
                            errors++;
                        }
                        const len2 = data6.length;
                        for (let i2 = 0; i2 < len2; i2++) {
                            let data7 = data6[i2];
                            if (typeof data7 !== "string") {
                                const err12 = { instancePath: instancePath + "/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/alg/" + i2, schemaPath: "#/patternProperties/%5Ejwt%24%7C%5Ejwt_vc%24%7C%5Ejwt_vc_json%24%7C%5Ejwt_vp%24%7C%5Ejwt_vp_json%24/properties/alg/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$"].properties.alg.items.type, parentSchema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$"].properties.alg.items, data: data7 };
                                if (vErrors === null) {
                                    vErrors = [err12];
                                }
                                else {
                                    vErrors.push(err12);
                                }
                                errors++;
                            }
                        }
                    }
                    else {
                        const err13 = { instancePath: instancePath + "/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/alg", schemaPath: "#/patternProperties/%5Ejwt%24%7C%5Ejwt_vc%24%7C%5Ejwt_vc_json%24%7C%5Ejwt_vp%24%7C%5Ejwt_vp_json%24/properties/alg/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$"].properties.alg.type, parentSchema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$"].properties.alg, data: data6 };
                        if (vErrors === null) {
                            vErrors = [err13];
                        }
                        else {
                            vErrors.push(err13);
                        }
                        errors++;
                    }
                }
            }
            else {
                const err14 = { instancePath: instancePath + "/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/%5Ejwt%24%7C%5Ejwt_vc%24%7C%5Ejwt_vc_json%24%7C%5Ejwt_vp%24%7C%5Ejwt_vp_json%24/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$"].type, parentSchema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$"], data: data5 };
                if (vErrors === null) {
                    vErrors = [err14];
                }
                else {
                    vErrors.push(err14);
                }
                errors++;
            }
        }
    }
    for (const key4 in data) {
        if (pattern1.test(key4)) {
            let data8 = data[key4];
            if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
                if (data8.proof_type === undefined) {
                    const err15 = { instancePath: instancePath + "/" + key4.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/%5Eldp_vc%24%7C%5Eldp_vp%24%7C%5Eldp%24/required", keyword: "required", params: { missingProperty: "proof_type" }, message: "must have required property '" + "proof_type" + "'", schema: schema13.patternProperties["^ldp_vc$|^ldp_vp$|^ldp$"].required, parentSchema: schema13.patternProperties["^ldp_vc$|^ldp_vp$|^ldp$"], data: data8 };
                    if (vErrors === null) {
                        vErrors = [err15];
                    }
                    else {
                        vErrors.push(err15);
                    }
                    errors++;
                }
                for (const key5 in data8) {
                    if (!(key5 === "proof_type")) {
                        const err16 = { instancePath: instancePath + "/" + key4.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/%5Eldp_vc%24%7C%5Eldp_vp%24%7C%5Eldp%24/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key5 }, message: "must NOT have additional properties", schema: false, parentSchema: schema13.patternProperties["^ldp_vc$|^ldp_vp$|^ldp$"], data: data8 };
                        if (vErrors === null) {
                            vErrors = [err16];
                        }
                        else {
                            vErrors.push(err16);
                        }
                        errors++;
                    }
                }
                if (data8.proof_type !== undefined) {
                    let data9 = data8.proof_type;
                    if (Array.isArray(data9)) {
                        if (data9.length < 1) {
                            const err17 = { instancePath: instancePath + "/" + key4.replace(/~/g, "~0").replace(/\//g, "~1") + "/proof_type", schemaPath: "#/patternProperties/%5Eldp_vc%24%7C%5Eldp_vp%24%7C%5Eldp%24/properties/proof_type/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema13.patternProperties["^ldp_vc$|^ldp_vp$|^ldp$"].properties.proof_type, data: data9 };
                            if (vErrors === null) {
                                vErrors = [err17];
                            }
                            else {
                                vErrors.push(err17);
                            }
                            errors++;
                        }
                        const len3 = data9.length;
                        for (let i3 = 0; i3 < len3; i3++) {
                            let data10 = data9[i3];
                            if (typeof data10 !== "string") {
                                const err18 = { instancePath: instancePath + "/" + key4.replace(/~/g, "~0").replace(/\//g, "~1") + "/proof_type/" + i3, schemaPath: "#/patternProperties/%5Eldp_vc%24%7C%5Eldp_vp%24%7C%5Eldp%24/properties/proof_type/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema13.patternProperties["^ldp_vc$|^ldp_vp$|^ldp$"].properties.proof_type.items.type, parentSchema: schema13.patternProperties["^ldp_vc$|^ldp_vp$|^ldp$"].properties.proof_type.items, data: data10 };
                                if (vErrors === null) {
                                    vErrors = [err18];
                                }
                                else {
                                    vErrors.push(err18);
                                }
                                errors++;
                            }
                        }
                    }
                    else {
                        const err19 = { instancePath: instancePath + "/" + key4.replace(/~/g, "~0").replace(/\//g, "~1") + "/proof_type", schemaPath: "#/patternProperties/%5Eldp_vc%24%7C%5Eldp_vp%24%7C%5Eldp%24/properties/proof_type/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema13.patternProperties["^ldp_vc$|^ldp_vp$|^ldp$"].properties.proof_type.type, parentSchema: schema13.patternProperties["^ldp_vc$|^ldp_vp$|^ldp$"].properties.proof_type, data: data9 };
                        if (vErrors === null) {
                            vErrors = [err19];
                        }
                        else {
                            vErrors.push(err19);
                        }
                        errors++;
                    }
                }
            }
            else {
                const err20 = { instancePath: instancePath + "/" + key4.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/%5Eldp_vc%24%7C%5Eldp_vp%24%7C%5Eldp%24/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema13.patternProperties["^ldp_vc$|^ldp_vp$|^ldp$"].type, parentSchema: schema13.patternProperties["^ldp_vc$|^ldp_vp$|^ldp$"], data: data8 };
                if (vErrors === null) {
                    vErrors = [err20];
                }
                else {
                    vErrors.push(err20);
                }
                errors++;
            }
        }
    }
    for (const key6 in data) {
        if (pattern2.test(key6)) {
            let data11 = data[key6];
            if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
                if (data11.proof_type === undefined) {
                    const err21 = { instancePath: instancePath + "/" + key6.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/%5Edi_vc%24%7C%5Edi_vp%24%7C%5Edi%24/required", keyword: "required", params: { missingProperty: "proof_type" }, message: "must have required property '" + "proof_type" + "'", schema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"].required, parentSchema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"], data: data11 };
                    if (vErrors === null) {
                        vErrors = [err21];
                    }
                    else {
                        vErrors.push(err21);
                    }
                    errors++;
                }
                if (data11.cryptosuite === undefined) {
                    const err22 = { instancePath: instancePath + "/" + key6.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/%5Edi_vc%24%7C%5Edi_vp%24%7C%5Edi%24/required", keyword: "required", params: { missingProperty: "cryptosuite" }, message: "must have required property '" + "cryptosuite" + "'", schema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"].required, parentSchema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"], data: data11 };
                    if (vErrors === null) {
                        vErrors = [err22];
                    }
                    else {
                        vErrors.push(err22);
                    }
                    errors++;
                }
                for (const key7 in data11) {
                    if (!((key7 === "proof_type") || (key7 === "cryptosuite"))) {
                        const err23 = { instancePath: instancePath + "/" + key6.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/%5Edi_vc%24%7C%5Edi_vp%24%7C%5Edi%24/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key7 }, message: "must NOT have additional properties", schema: false, parentSchema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"], data: data11 };
                        if (vErrors === null) {
                            vErrors = [err23];
                        }
                        else {
                            vErrors.push(err23);
                        }
                        errors++;
                    }
                }
                if (data11.proof_type !== undefined) {
                    let data12 = data11.proof_type;
                    if (Array.isArray(data12)) {
                        if (data12.length < 1) {
                            const err24 = { instancePath: instancePath + "/" + key6.replace(/~/g, "~0").replace(/\//g, "~1") + "/proof_type", schemaPath: "#/patternProperties/%5Edi_vc%24%7C%5Edi_vp%24%7C%5Edi%24/properties/proof_type/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"].properties.proof_type, data: data12 };
                            if (vErrors === null) {
                                vErrors = [err24];
                            }
                            else {
                                vErrors.push(err24);
                            }
                            errors++;
                        }
                        const len4 = data12.length;
                        for (let i4 = 0; i4 < len4; i4++) {
                            let data13 = data12[i4];
                            if (typeof data13 !== "string") {
                                const err25 = { instancePath: instancePath + "/" + key6.replace(/~/g, "~0").replace(/\//g, "~1") + "/proof_type/" + i4, schemaPath: "#/patternProperties/%5Edi_vc%24%7C%5Edi_vp%24%7C%5Edi%24/properties/proof_type/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"].properties.proof_type.items.type, parentSchema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"].properties.proof_type.items, data: data13 };
                                if (vErrors === null) {
                                    vErrors = [err25];
                                }
                                else {
                                    vErrors.push(err25);
                                }
                                errors++;
                            }
                        }
                    }
                    else {
                        const err26 = { instancePath: instancePath + "/" + key6.replace(/~/g, "~0").replace(/\//g, "~1") + "/proof_type", schemaPath: "#/patternProperties/%5Edi_vc%24%7C%5Edi_vp%24%7C%5Edi%24/properties/proof_type/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"].properties.proof_type.type, parentSchema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"].properties.proof_type, data: data12 };
                        if (vErrors === null) {
                            vErrors = [err26];
                        }
                        else {
                            vErrors.push(err26);
                        }
                        errors++;
                    }
                }
                if (data11.cryptosuite !== undefined) {
                    let data14 = data11.cryptosuite;
                    if (Array.isArray(data14)) {
                        if (data14.length < 1) {
                            const err27 = { instancePath: instancePath + "/" + key6.replace(/~/g, "~0").replace(/\//g, "~1") + "/cryptosuite", schemaPath: "#/patternProperties/%5Edi_vc%24%7C%5Edi_vp%24%7C%5Edi%24/properties/cryptosuite/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"].properties.cryptosuite, data: data14 };
                            if (vErrors === null) {
                                vErrors = [err27];
                            }
                            else {
                                vErrors.push(err27);
                            }
                            errors++;
                        }
                        const len5 = data14.length;
                        for (let i5 = 0; i5 < len5; i5++) {
                            let data15 = data14[i5];
                            if (typeof data15 !== "string") {
                                const err28 = { instancePath: instancePath + "/" + key6.replace(/~/g, "~0").replace(/\//g, "~1") + "/cryptosuite/" + i5, schemaPath: "#/patternProperties/%5Edi_vc%24%7C%5Edi_vp%24%7C%5Edi%24/properties/cryptosuite/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"].properties.cryptosuite.items.type, parentSchema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"].properties.cryptosuite.items, data: data15 };
                                if (vErrors === null) {
                                    vErrors = [err28];
                                }
                                else {
                                    vErrors.push(err28);
                                }
                                errors++;
                            }
                        }
                    }
                    else {
                        const err29 = { instancePath: instancePath + "/" + key6.replace(/~/g, "~0").replace(/\//g, "~1") + "/cryptosuite", schemaPath: "#/patternProperties/%5Edi_vc%24%7C%5Edi_vp%24%7C%5Edi%24/properties/cryptosuite/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"].properties.cryptosuite.type, parentSchema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"].properties.cryptosuite, data: data14 };
                        if (vErrors === null) {
                            vErrors = [err29];
                        }
                        else {
                            vErrors.push(err29);
                        }
                        errors++;
                    }
                }
            }
            else {
                const err30 = { instancePath: instancePath + "/" + key6.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/%5Edi_vc%24%7C%5Edi_vp%24%7C%5Edi%24/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"].type, parentSchema: schema13.patternProperties["^di_vc$|^di_vp$|^di$"], data: data11 };
                if (vErrors === null) {
                    vErrors = [err30];
                }
                else {
                    vErrors.push(err30);
                }
                errors++;
            }
        }
    }
    for (const key8 in data) {
        if (pattern3.test(key8)) {
            const err31 = { instancePath: instancePath + "/" + key8.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/additionalProperties/false schema", keyword: "false schema", params: {}, message: "boolean schema is false", schema: false, parentSchema: schema13.patternProperties.additionalProperties, data: data[key8] };
            if (vErrors === null) {
                vErrors = [err31];
            }
            else {
                vErrors.push(err31);
            }
            errors++;
        }
    }
}
else {
    const err32 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema13.type, parentSchema: schema13, data };
    if (vErrors === null) {
        vErrors = [err32];
    }
    else {
        vErrors.push(err32);
    }
    errors++;
} validate43.errors = vErrors; return errors === 0; }
const schema14 = { "type": "object", "oneOf": [{ "properties": { "name": { "type": "string" }, "purpose": { "type": "string" }, "rule": { "type": "string", "enum": ["all", "pick"] }, "count": { "type": "integer", "minimum": 1 }, "min": { "type": "integer", "minimum": 0 }, "max": { "type": "integer", "minimum": 0 }, "from": { "type": "string" } }, "required": ["rule", "from"], "additionalProperties": false }, { "properties": { "name": { "type": "string" }, "purpose": { "type": "string" }, "rule": { "type": "string", "enum": ["all", "pick"] }, "count": { "type": "integer", "minimum": 1 }, "min": { "type": "integer", "minimum": 0 }, "max": { "type": "integer", "minimum": 0 }, "from_nested": { "type": "array", "minItems": 1, "items": { "$ref": "#/definitions/submission_requirements" } } }, "required": ["rule", "from_nested"], "additionalProperties": false }] };
const wrapper0 = { validate: validate45 };
function validate45(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (!(data && typeof data == "object" && !Array.isArray(data))) {
    const err0 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema14.type, parentSchema: schema14, data };
    if (vErrors === null) {
        vErrors = [err0];
    }
    else {
        vErrors.push(err0);
    }
    errors++;
} const _errs1 = errors; let valid0 = false; let passing0 = null; const _errs2 = errors; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.rule === undefined) {
        const err1 = { instancePath, schemaPath: "#/oneOf/0/required", keyword: "required", params: { missingProperty: "rule" }, message: "must have required property '" + "rule" + "'", schema: schema14.oneOf[0].required, parentSchema: schema14.oneOf[0], data };
        if (vErrors === null) {
            vErrors = [err1];
        }
        else {
            vErrors.push(err1);
        }
        errors++;
    }
    if (data.from === undefined) {
        const err2 = { instancePath, schemaPath: "#/oneOf/0/required", keyword: "required", params: { missingProperty: "from" }, message: "must have required property '" + "from" + "'", schema: schema14.oneOf[0].required, parentSchema: schema14.oneOf[0], data };
        if (vErrors === null) {
            vErrors = [err2];
        }
        else {
            vErrors.push(err2);
        }
        errors++;
    }
    for (const key0 in data) {
        if (!(((((((key0 === "name") || (key0 === "purpose")) || (key0 === "rule")) || (key0 === "count")) || (key0 === "min")) || (key0 === "max")) || (key0 === "from"))) {
            const err3 = { instancePath, schemaPath: "#/oneOf/0/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties", schema: false, parentSchema: schema14.oneOf[0], data };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
    }
    if (data.name !== undefined) {
        let data0 = data.name;
        if (typeof data0 !== "string") {
            const err4 = { instancePath: instancePath + "/name", schemaPath: "#/oneOf/0/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema14.oneOf[0].properties.name.type, parentSchema: schema14.oneOf[0].properties.name, data: data0 };
            if (vErrors === null) {
                vErrors = [err4];
            }
            else {
                vErrors.push(err4);
            }
            errors++;
        }
    }
    if (data.purpose !== undefined) {
        let data1 = data.purpose;
        if (typeof data1 !== "string") {
            const err5 = { instancePath: instancePath + "/purpose", schemaPath: "#/oneOf/0/properties/purpose/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema14.oneOf[0].properties.purpose.type, parentSchema: schema14.oneOf[0].properties.purpose, data: data1 };
            if (vErrors === null) {
                vErrors = [err5];
            }
            else {
                vErrors.push(err5);
            }
            errors++;
        }
    }
    if (data.rule !== undefined) {
        let data2 = data.rule;
        if (typeof data2 !== "string") {
            const err6 = { instancePath: instancePath + "/rule", schemaPath: "#/oneOf/0/properties/rule/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema14.oneOf[0].properties.rule.type, parentSchema: schema14.oneOf[0].properties.rule, data: data2 };
            if (vErrors === null) {
                vErrors = [err6];
            }
            else {
                vErrors.push(err6);
            }
            errors++;
        }
        if (!((data2 === "all") || (data2 === "pick"))) {
            const err7 = { instancePath: instancePath + "/rule", schemaPath: "#/oneOf/0/properties/rule/enum", keyword: "enum", params: { allowedValues: schema14.oneOf[0].properties.rule.enum }, message: "must be equal to one of the allowed values", schema: schema14.oneOf[0].properties.rule.enum, parentSchema: schema14.oneOf[0].properties.rule, data: data2 };
            if (vErrors === null) {
                vErrors = [err7];
            }
            else {
                vErrors.push(err7);
            }
            errors++;
        }
    }
    if (data.count !== undefined) {
        let data3 = data.count;
        if (!((typeof data3 == "number") && (!(data3 % 1) && !isNaN(data3)))) {
            const err8 = { instancePath: instancePath + "/count", schemaPath: "#/oneOf/0/properties/count/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema14.oneOf[0].properties.count.type, parentSchema: schema14.oneOf[0].properties.count, data: data3 };
            if (vErrors === null) {
                vErrors = [err8];
            }
            else {
                vErrors.push(err8);
            }
            errors++;
        }
        if (typeof data3 == "number") {
            if (data3 < 1 || isNaN(data3)) {
                const err9 = { instancePath: instancePath + "/count", schemaPath: "#/oneOf/0/properties/count/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1", schema: 1, parentSchema: schema14.oneOf[0].properties.count, data: data3 };
                if (vErrors === null) {
                    vErrors = [err9];
                }
                else {
                    vErrors.push(err9);
                }
                errors++;
            }
        }
    }
    if (data.min !== undefined) {
        let data4 = data.min;
        if (!((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4)))) {
            const err10 = { instancePath: instancePath + "/min", schemaPath: "#/oneOf/0/properties/min/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema14.oneOf[0].properties.min.type, parentSchema: schema14.oneOf[0].properties.min, data: data4 };
            if (vErrors === null) {
                vErrors = [err10];
            }
            else {
                vErrors.push(err10);
            }
            errors++;
        }
        if (typeof data4 == "number") {
            if (data4 < 0 || isNaN(data4)) {
                const err11 = { instancePath: instancePath + "/min", schemaPath: "#/oneOf/0/properties/min/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema14.oneOf[0].properties.min, data: data4 };
                if (vErrors === null) {
                    vErrors = [err11];
                }
                else {
                    vErrors.push(err11);
                }
                errors++;
            }
        }
    }
    if (data.max !== undefined) {
        let data5 = data.max;
        if (!((typeof data5 == "number") && (!(data5 % 1) && !isNaN(data5)))) {
            const err12 = { instancePath: instancePath + "/max", schemaPath: "#/oneOf/0/properties/max/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema14.oneOf[0].properties.max.type, parentSchema: schema14.oneOf[0].properties.max, data: data5 };
            if (vErrors === null) {
                vErrors = [err12];
            }
            else {
                vErrors.push(err12);
            }
            errors++;
        }
        if (typeof data5 == "number") {
            if (data5 < 0 || isNaN(data5)) {
                const err13 = { instancePath: instancePath + "/max", schemaPath: "#/oneOf/0/properties/max/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema14.oneOf[0].properties.max, data: data5 };
                if (vErrors === null) {
                    vErrors = [err13];
                }
                else {
                    vErrors.push(err13);
                }
                errors++;
            }
        }
    }
    if (data.from !== undefined) {
        let data6 = data.from;
        if (typeof data6 !== "string") {
            const err14 = { instancePath: instancePath + "/from", schemaPath: "#/oneOf/0/properties/from/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema14.oneOf[0].properties.from.type, parentSchema: schema14.oneOf[0].properties.from, data: data6 };
            if (vErrors === null) {
                vErrors = [err14];
            }
            else {
                vErrors.push(err14);
            }
            errors++;
        }
    }
} var _valid0 = _errs2 === errors; if (_valid0) {
    valid0 = true;
    passing0 = 0;
} const _errs18 = errors; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.rule === undefined) {
        const err15 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: "rule" }, message: "must have required property '" + "rule" + "'", schema: schema14.oneOf[1].required, parentSchema: schema14.oneOf[1], data };
        if (vErrors === null) {
            vErrors = [err15];
        }
        else {
            vErrors.push(err15);
        }
        errors++;
    }
    if (data.from_nested === undefined) {
        const err16 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: "from_nested" }, message: "must have required property '" + "from_nested" + "'", schema: schema14.oneOf[1].required, parentSchema: schema14.oneOf[1], data };
        if (vErrors === null) {
            vErrors = [err16];
        }
        else {
            vErrors.push(err16);
        }
        errors++;
    }
    for (const key1 in data) {
        if (!(((((((key1 === "name") || (key1 === "purpose")) || (key1 === "rule")) || (key1 === "count")) || (key1 === "min")) || (key1 === "max")) || (key1 === "from_nested"))) {
            const err17 = { instancePath, schemaPath: "#/oneOf/1/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties", schema: false, parentSchema: schema14.oneOf[1], data };
            if (vErrors === null) {
                vErrors = [err17];
            }
            else {
                vErrors.push(err17);
            }
            errors++;
        }
    }
    if (data.name !== undefined) {
        let data7 = data.name;
        if (typeof data7 !== "string") {
            const err18 = { instancePath: instancePath + "/name", schemaPath: "#/oneOf/1/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema14.oneOf[1].properties.name.type, parentSchema: schema14.oneOf[1].properties.name, data: data7 };
            if (vErrors === null) {
                vErrors = [err18];
            }
            else {
                vErrors.push(err18);
            }
            errors++;
        }
    }
    if (data.purpose !== undefined) {
        let data8 = data.purpose;
        if (typeof data8 !== "string") {
            const err19 = { instancePath: instancePath + "/purpose", schemaPath: "#/oneOf/1/properties/purpose/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema14.oneOf[1].properties.purpose.type, parentSchema: schema14.oneOf[1].properties.purpose, data: data8 };
            if (vErrors === null) {
                vErrors = [err19];
            }
            else {
                vErrors.push(err19);
            }
            errors++;
        }
    }
    if (data.rule !== undefined) {
        let data9 = data.rule;
        if (typeof data9 !== "string") {
            const err20 = { instancePath: instancePath + "/rule", schemaPath: "#/oneOf/1/properties/rule/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema14.oneOf[1].properties.rule.type, parentSchema: schema14.oneOf[1].properties.rule, data: data9 };
            if (vErrors === null) {
                vErrors = [err20];
            }
            else {
                vErrors.push(err20);
            }
            errors++;
        }
        if (!((data9 === "all") || (data9 === "pick"))) {
            const err21 = { instancePath: instancePath + "/rule", schemaPath: "#/oneOf/1/properties/rule/enum", keyword: "enum", params: { allowedValues: schema14.oneOf[1].properties.rule.enum }, message: "must be equal to one of the allowed values", schema: schema14.oneOf[1].properties.rule.enum, parentSchema: schema14.oneOf[1].properties.rule, data: data9 };
            if (vErrors === null) {
                vErrors = [err21];
            }
            else {
                vErrors.push(err21);
            }
            errors++;
        }
    }
    if (data.count !== undefined) {
        let data10 = data.count;
        if (!((typeof data10 == "number") && (!(data10 % 1) && !isNaN(data10)))) {
            const err22 = { instancePath: instancePath + "/count", schemaPath: "#/oneOf/1/properties/count/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema14.oneOf[1].properties.count.type, parentSchema: schema14.oneOf[1].properties.count, data: data10 };
            if (vErrors === null) {
                vErrors = [err22];
            }
            else {
                vErrors.push(err22);
            }
            errors++;
        }
        if (typeof data10 == "number") {
            if (data10 < 1 || isNaN(data10)) {
                const err23 = { instancePath: instancePath + "/count", schemaPath: "#/oneOf/1/properties/count/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1", schema: 1, parentSchema: schema14.oneOf[1].properties.count, data: data10 };
                if (vErrors === null) {
                    vErrors = [err23];
                }
                else {
                    vErrors.push(err23);
                }
                errors++;
            }
        }
    }
    if (data.min !== undefined) {
        let data11 = data.min;
        if (!((typeof data11 == "number") && (!(data11 % 1) && !isNaN(data11)))) {
            const err24 = { instancePath: instancePath + "/min", schemaPath: "#/oneOf/1/properties/min/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema14.oneOf[1].properties.min.type, parentSchema: schema14.oneOf[1].properties.min, data: data11 };
            if (vErrors === null) {
                vErrors = [err24];
            }
            else {
                vErrors.push(err24);
            }
            errors++;
        }
        if (typeof data11 == "number") {
            if (data11 < 0 || isNaN(data11)) {
                const err25 = { instancePath: instancePath + "/min", schemaPath: "#/oneOf/1/properties/min/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema14.oneOf[1].properties.min, data: data11 };
                if (vErrors === null) {
                    vErrors = [err25];
                }
                else {
                    vErrors.push(err25);
                }
                errors++;
            }
        }
    }
    if (data.max !== undefined) {
        let data12 = data.max;
        if (!((typeof data12 == "number") && (!(data12 % 1) && !isNaN(data12)))) {
            const err26 = { instancePath: instancePath + "/max", schemaPath: "#/oneOf/1/properties/max/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema14.oneOf[1].properties.max.type, parentSchema: schema14.oneOf[1].properties.max, data: data12 };
            if (vErrors === null) {
                vErrors = [err26];
            }
            else {
                vErrors.push(err26);
            }
            errors++;
        }
        if (typeof data12 == "number") {
            if (data12 < 0 || isNaN(data12)) {
                const err27 = { instancePath: instancePath + "/max", schemaPath: "#/oneOf/1/properties/max/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema14.oneOf[1].properties.max, data: data12 };
                if (vErrors === null) {
                    vErrors = [err27];
                }
                else {
                    vErrors.push(err27);
                }
                errors++;
            }
        }
    }
    if (data.from_nested !== undefined) {
        let data13 = data.from_nested;
        if (Array.isArray(data13)) {
            if (data13.length < 1) {
                const err28 = { instancePath: instancePath + "/from_nested", schemaPath: "#/oneOf/1/properties/from_nested/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema14.oneOf[1].properties.from_nested, data: data13 };
                if (vErrors === null) {
                    vErrors = [err28];
                }
                else {
                    vErrors.push(err28);
                }
                errors++;
            }
            const len0 = data13.length;
            for (let i0 = 0; i0 < len0; i0++) {
                if (!(wrapper0.validate(data13[i0], { instancePath: instancePath + "/from_nested/" + i0, parentData: data13, parentDataProperty: i0, rootData }))) {
                    vErrors = vErrors === null ? wrapper0.validate.errors : vErrors.concat(wrapper0.validate.errors);
                    errors = vErrors.length;
                }
            }
        }
        else {
            const err29 = { instancePath: instancePath + "/from_nested", schemaPath: "#/oneOf/1/properties/from_nested/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema14.oneOf[1].properties.from_nested.type, parentSchema: schema14.oneOf[1].properties.from_nested, data: data13 };
            if (vErrors === null) {
                vErrors = [err29];
            }
            else {
                vErrors.push(err29);
            }
            errors++;
        }
    }
} var _valid0 = _errs18 === errors; if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
}
else {
    if (_valid0) {
        valid0 = true;
        passing0 = 1;
    }
} if (!valid0) {
    const err30 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf", schema: schema14.oneOf, parentSchema: schema14, data };
    if (vErrors === null) {
        vErrors = [err30];
    }
    else {
        vErrors.push(err30);
    }
    errors++;
}
else {
    errors = _errs1;
    if (vErrors !== null) {
        if (_errs1) {
            vErrors.length = _errs1;
        }
        else {
            vErrors = null;
        }
    }
} validate45.errors = vErrors; return errors === 0; }
const schema15 = { "type": "object", "properties": { "id": { "type": "string" }, "name": { "type": "string" }, "purpose": { "type": "string" }, "group": { "type": "array", "items": { "type": "string" } }, "schema": { "type": "array", "items": { "$ref": "#/definitions/schema" } }, "issuance": { "type": "array", "items": { "$ref": "#/definitions/issuance" } }, "constraints": { "type": "object", "properties": { "limit_disclosure": { "type": "string", "enum": ["required", "preferred"] }, "statuses": { "type": "object", "properties": { "active": { "type": "object", "properties": { "directive": { "type": "string", "enum": ["required", "allowed", "disallowed"] } } }, "suspended": { "type": "object", "properties": { "directive": { "type": "string", "enum": ["required", "allowed", "disallowed"] } } }, "revoked": { "type": "object", "properties": { "directive": { "type": "string", "enum": ["required", "allowed", "disallowed"] } } } } }, "fields": { "type": "array", "items": { "$ref": "#/definitions/field" } }, "subject_is_issuer": { "type": "string", "enum": ["required", "preferred"] }, "is_holder": { "type": "array", "items": { "type": "object", "properties": { "field_id": { "type": "array", "items": { "type": "string" } }, "directive": { "type": "string", "enum": ["required", "preferred"] } }, "required": ["field_id", "directive"], "additionalProperties": false } }, "same_subject": { "type": "array", "items": { "type": "object", "properties": { "field_id": { "type": "array", "items": { "type": "string" } }, "directive": { "type": "string", "enum": ["required", "preferred"] } }, "required": ["field_id", "directive"], "additionalProperties": false } } }, "additionalProperties": false } }, "required": ["id", "schema"], "additionalProperties": false };
const schema16 = { "type": "object", "properties": { "uri": { "type": "string" }, "required": { "type": "boolean" } }, "required": ["uri"], "additionalProperties": false };
function validate48(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.uri === undefined) {
        const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "uri" }, message: "must have required property '" + "uri" + "'", schema: schema16.required, parentSchema: schema16, data };
        if (vErrors === null) {
            vErrors = [err0];
        }
        else {
            vErrors.push(err0);
        }
        errors++;
    }
    for (const key0 in data) {
        if (!((key0 === "uri") || (key0 === "required"))) {
            const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties", schema: false, parentSchema: schema16, data };
            if (vErrors === null) {
                vErrors = [err1];
            }
            else {
                vErrors.push(err1);
            }
            errors++;
        }
    }
    if (data.uri !== undefined) {
        let data0 = data.uri;
        if (typeof data0 !== "string") {
            const err2 = { instancePath: instancePath + "/uri", schemaPath: "#/properties/uri/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema16.properties.uri.type, parentSchema: schema16.properties.uri, data: data0 };
            if (vErrors === null) {
                vErrors = [err2];
            }
            else {
                vErrors.push(err2);
            }
            errors++;
        }
    }
    if (data.required !== undefined) {
        let data1 = data.required;
        if (typeof data1 !== "boolean") {
            const err3 = { instancePath: instancePath + "/required", schemaPath: "#/properties/required/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean", schema: schema16.properties.required.type, parentSchema: schema16.properties.required, data: data1 };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
    }
}
else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema16.type, parentSchema: schema16, data };
    if (vErrors === null) {
        vErrors = [err4];
    }
    else {
        vErrors.push(err4);
    }
    errors++;
} validate48.errors = vErrors; return errors === 0; }
const schema17 = { "type": "object", "properties": { "manifest": { "type": "string" } }, "additionalProperties": true };
function validate50(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.manifest !== undefined) {
        let data0 = data.manifest;
        if (typeof data0 !== "string") {
            const err0 = { instancePath: instancePath + "/manifest", schemaPath: "#/properties/manifest/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema17.properties.manifest.type, parentSchema: schema17.properties.manifest, data: data0 };
            if (vErrors === null) {
                vErrors = [err0];
            }
            else {
                vErrors.push(err0);
            }
            errors++;
        }
    }
}
else {
    const err1 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema17.type, parentSchema: schema17, data };
    if (vErrors === null) {
        vErrors = [err1];
    }
    else {
        vErrors.push(err1);
    }
    errors++;
} validate50.errors = vErrors; return errors === 0; }
const schema18 = { "type": "object", "oneOf": [{ "properties": { "id": { "type": "string" }, "path": { "type": "array", "items": { "type": "string" } }, "purpose": { "type": "string" }, "filter": { "$ref": "#/definitions/filter" } }, "required": ["path"], "additionalProperties": false }, { "properties": { "id": { "type": "string" }, "path": { "type": "array", "items": { "type": "string" } }, "purpose": { "type": "string" }, "filter": { "$ref": "#/definitions/filter" }, "predicate": { "type": "string", "enum": ["required", "preferred"] } }, "required": ["path", "filter", "predicate"], "additionalProperties": false }] };
const schema19 = { "type": "object", "properties": { "type": { "type": "string" }, "format": { "type": "string" }, "pattern": { "type": "string" }, "minimum": { "type": ["number", "string"] }, "minLength": { "type": "integer" }, "maxLength": { "type": "integer" }, "exclusiveMinimum": { "type": ["number", "string"] }, "exclusiveMaximum": { "type": ["number", "string"] }, "maximum": { "type": ["number", "string"] }, "const": { "type": ["number", "string"] }, "enum": { "type": "array", "items": { "type": ["number", "string"] } }, "not": { "type": "object", "minProperties": 1 } }, "required": ["type"], "additionalProperties": false };
const func4 = Object.prototype.hasOwnProperty;
function validate53(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === undefined) {
        const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property '" + "type" + "'", schema: schema19.required, parentSchema: schema19, data };
        if (vErrors === null) {
            vErrors = [err0];
        }
        else {
            vErrors.push(err0);
        }
        errors++;
    }
    for (const key0 in data) {
        if (!(func4.call(schema19.properties, key0))) {
            const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties", schema: false, parentSchema: schema19, data };
            if (vErrors === null) {
                vErrors = [err1];
            }
            else {
                vErrors.push(err1);
            }
            errors++;
        }
    }
    if (data.type !== undefined) {
        let data0 = data.type;
        if (typeof data0 !== "string") {
            const err2 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema19.properties.type.type, parentSchema: schema19.properties.type, data: data0 };
            if (vErrors === null) {
                vErrors = [err2];
            }
            else {
                vErrors.push(err2);
            }
            errors++;
        }
    }
    if (data.format !== undefined) {
        let data1 = data.format;
        if (typeof data1 !== "string") {
            const err3 = { instancePath: instancePath + "/format", schemaPath: "#/properties/format/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema19.properties.format.type, parentSchema: schema19.properties.format, data: data1 };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
    }
    if (data.pattern !== undefined) {
        let data2 = data.pattern;
        if (typeof data2 !== "string") {
            const err4 = { instancePath: instancePath + "/pattern", schemaPath: "#/properties/pattern/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema19.properties.pattern.type, parentSchema: schema19.properties.pattern, data: data2 };
            if (vErrors === null) {
                vErrors = [err4];
            }
            else {
                vErrors.push(err4);
            }
            errors++;
        }
    }
    if (data.minimum !== undefined) {
        let data3 = data.minimum;
        if ((!(typeof data3 == "number")) && (typeof data3 !== "string")) {
            const err5 = { instancePath: instancePath + "/minimum", schemaPath: "#/properties/minimum/type", keyword: "type", params: { type: schema19.properties.minimum.type }, message: "must be number,string", schema: schema19.properties.minimum.type, parentSchema: schema19.properties.minimum, data: data3 };
            if (vErrors === null) {
                vErrors = [err5];
            }
            else {
                vErrors.push(err5);
            }
            errors++;
        }
    }
    if (data.minLength !== undefined) {
        let data4 = data.minLength;
        if (!((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4)))) {
            const err6 = { instancePath: instancePath + "/minLength", schemaPath: "#/properties/minLength/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema19.properties.minLength.type, parentSchema: schema19.properties.minLength, data: data4 };
            if (vErrors === null) {
                vErrors = [err6];
            }
            else {
                vErrors.push(err6);
            }
            errors++;
        }
    }
    if (data.maxLength !== undefined) {
        let data5 = data.maxLength;
        if (!((typeof data5 == "number") && (!(data5 % 1) && !isNaN(data5)))) {
            const err7 = { instancePath: instancePath + "/maxLength", schemaPath: "#/properties/maxLength/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema19.properties.maxLength.type, parentSchema: schema19.properties.maxLength, data: data5 };
            if (vErrors === null) {
                vErrors = [err7];
            }
            else {
                vErrors.push(err7);
            }
            errors++;
        }
    }
    if (data.exclusiveMinimum !== undefined) {
        let data6 = data.exclusiveMinimum;
        if ((!(typeof data6 == "number")) && (typeof data6 !== "string")) {
            const err8 = { instancePath: instancePath + "/exclusiveMinimum", schemaPath: "#/properties/exclusiveMinimum/type", keyword: "type", params: { type: schema19.properties.exclusiveMinimum.type }, message: "must be number,string", schema: schema19.properties.exclusiveMinimum.type, parentSchema: schema19.properties.exclusiveMinimum, data: data6 };
            if (vErrors === null) {
                vErrors = [err8];
            }
            else {
                vErrors.push(err8);
            }
            errors++;
        }
    }
    if (data.exclusiveMaximum !== undefined) {
        let data7 = data.exclusiveMaximum;
        if ((!(typeof data7 == "number")) && (typeof data7 !== "string")) {
            const err9 = { instancePath: instancePath + "/exclusiveMaximum", schemaPath: "#/properties/exclusiveMaximum/type", keyword: "type", params: { type: schema19.properties.exclusiveMaximum.type }, message: "must be number,string", schema: schema19.properties.exclusiveMaximum.type, parentSchema: schema19.properties.exclusiveMaximum, data: data7 };
            if (vErrors === null) {
                vErrors = [err9];
            }
            else {
                vErrors.push(err9);
            }
            errors++;
        }
    }
    if (data.maximum !== undefined) {
        let data8 = data.maximum;
        if ((!(typeof data8 == "number")) && (typeof data8 !== "string")) {
            const err10 = { instancePath: instancePath + "/maximum", schemaPath: "#/properties/maximum/type", keyword: "type", params: { type: schema19.properties.maximum.type }, message: "must be number,string", schema: schema19.properties.maximum.type, parentSchema: schema19.properties.maximum, data: data8 };
            if (vErrors === null) {
                vErrors = [err10];
            }
            else {
                vErrors.push(err10);
            }
            errors++;
        }
    }
    if (data.const !== undefined) {
        let data9 = data.const;
        if ((!(typeof data9 == "number")) && (typeof data9 !== "string")) {
            const err11 = { instancePath: instancePath + "/const", schemaPath: "#/properties/const/type", keyword: "type", params: { type: schema19.properties.const.type }, message: "must be number,string", schema: schema19.properties.const.type, parentSchema: schema19.properties.const, data: data9 };
            if (vErrors === null) {
                vErrors = [err11];
            }
            else {
                vErrors.push(err11);
            }
            errors++;
        }
    }
    if (data.enum !== undefined) {
        let data10 = data.enum;
        if (Array.isArray(data10)) {
            const len0 = data10.length;
            for (let i0 = 0; i0 < len0; i0++) {
                let data11 = data10[i0];
                if ((!(typeof data11 == "number")) && (typeof data11 !== "string")) {
                    const err12 = { instancePath: instancePath + "/enum/" + i0, schemaPath: "#/properties/enum/items/type", keyword: "type", params: { type: schema19.properties.enum.items.type }, message: "must be number,string", schema: schema19.properties.enum.items.type, parentSchema: schema19.properties.enum.items, data: data11 };
                    if (vErrors === null) {
                        vErrors = [err12];
                    }
                    else {
                        vErrors.push(err12);
                    }
                    errors++;
                }
            }
        }
        else {
            const err13 = { instancePath: instancePath + "/enum", schemaPath: "#/properties/enum/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema19.properties.enum.type, parentSchema: schema19.properties.enum, data: data10 };
            if (vErrors === null) {
                vErrors = [err13];
            }
            else {
                vErrors.push(err13);
            }
            errors++;
        }
    }
    if (data.not !== undefined) {
        let data12 = data.not;
        if (data12 && typeof data12 == "object" && !Array.isArray(data12)) {
            if (Object.keys(data12).length < 1) {
                const err14 = { instancePath: instancePath + "/not", schemaPath: "#/properties/not/minProperties", keyword: "minProperties", params: { limit: 1 }, message: "must NOT have fewer than 1 properties", schema: 1, parentSchema: schema19.properties.not, data: data12 };
                if (vErrors === null) {
                    vErrors = [err14];
                }
                else {
                    vErrors.push(err14);
                }
                errors++;
            }
        }
        else {
            const err15 = { instancePath: instancePath + "/not", schemaPath: "#/properties/not/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema19.properties.not.type, parentSchema: schema19.properties.not, data: data12 };
            if (vErrors === null) {
                vErrors = [err15];
            }
            else {
                vErrors.push(err15);
            }
            errors++;
        }
    }
}
else {
    const err16 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema19.type, parentSchema: schema19, data };
    if (vErrors === null) {
        vErrors = [err16];
    }
    else {
        vErrors.push(err16);
    }
    errors++;
} validate53.errors = vErrors; return errors === 0; }
function validate52(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (!(data && typeof data == "object" && !Array.isArray(data))) {
    const err0 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema18.type, parentSchema: schema18, data };
    if (vErrors === null) {
        vErrors = [err0];
    }
    else {
        vErrors.push(err0);
    }
    errors++;
} const _errs1 = errors; let valid0 = false; let passing0 = null; const _errs2 = errors; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.path === undefined) {
        const err1 = { instancePath, schemaPath: "#/oneOf/0/required", keyword: "required", params: { missingProperty: "path" }, message: "must have required property '" + "path" + "'", schema: schema18.oneOf[0].required, parentSchema: schema18.oneOf[0], data };
        if (vErrors === null) {
            vErrors = [err1];
        }
        else {
            vErrors.push(err1);
        }
        errors++;
    }
    for (const key0 in data) {
        if (!((((key0 === "id") || (key0 === "path")) || (key0 === "purpose")) || (key0 === "filter"))) {
            const err2 = { instancePath, schemaPath: "#/oneOf/0/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties", schema: false, parentSchema: schema18.oneOf[0], data };
            if (vErrors === null) {
                vErrors = [err2];
            }
            else {
                vErrors.push(err2);
            }
            errors++;
        }
    }
    if (data.id !== undefined) {
        let data0 = data.id;
        if (typeof data0 !== "string") {
            const err3 = { instancePath: instancePath + "/id", schemaPath: "#/oneOf/0/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema18.oneOf[0].properties.id.type, parentSchema: schema18.oneOf[0].properties.id, data: data0 };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
    }
    if (data.path !== undefined) {
        let data1 = data.path;
        if (Array.isArray(data1)) {
            const len0 = data1.length;
            for (let i0 = 0; i0 < len0; i0++) {
                let data2 = data1[i0];
                if (typeof data2 !== "string") {
                    const err4 = { instancePath: instancePath + "/path/" + i0, schemaPath: "#/oneOf/0/properties/path/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema18.oneOf[0].properties.path.items.type, parentSchema: schema18.oneOf[0].properties.path.items, data: data2 };
                    if (vErrors === null) {
                        vErrors = [err4];
                    }
                    else {
                        vErrors.push(err4);
                    }
                    errors++;
                }
            }
        }
        else {
            const err5 = { instancePath: instancePath + "/path", schemaPath: "#/oneOf/0/properties/path/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema18.oneOf[0].properties.path.type, parentSchema: schema18.oneOf[0].properties.path, data: data1 };
            if (vErrors === null) {
                vErrors = [err5];
            }
            else {
                vErrors.push(err5);
            }
            errors++;
        }
    }
    if (data.purpose !== undefined) {
        let data3 = data.purpose;
        if (typeof data3 !== "string") {
            const err6 = { instancePath: instancePath + "/purpose", schemaPath: "#/oneOf/0/properties/purpose/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema18.oneOf[0].properties.purpose.type, parentSchema: schema18.oneOf[0].properties.purpose, data: data3 };
            if (vErrors === null) {
                vErrors = [err6];
            }
            else {
                vErrors.push(err6);
            }
            errors++;
        }
    }
    if (data.filter !== undefined) {
        if (!(validate53(data.filter, { instancePath: instancePath + "/filter", parentData: data, parentDataProperty: "filter", rootData }))) {
            vErrors = vErrors === null ? validate53.errors : vErrors.concat(validate53.errors);
            errors = vErrors.length;
        }
    }
} var _valid0 = _errs2 === errors; if (_valid0) {
    valid0 = true;
    passing0 = 0;
} const _errs13 = errors; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.path === undefined) {
        const err7 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: "path" }, message: "must have required property '" + "path" + "'", schema: schema18.oneOf[1].required, parentSchema: schema18.oneOf[1], data };
        if (vErrors === null) {
            vErrors = [err7];
        }
        else {
            vErrors.push(err7);
        }
        errors++;
    }
    if (data.filter === undefined) {
        const err8 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: "filter" }, message: "must have required property '" + "filter" + "'", schema: schema18.oneOf[1].required, parentSchema: schema18.oneOf[1], data };
        if (vErrors === null) {
            vErrors = [err8];
        }
        else {
            vErrors.push(err8);
        }
        errors++;
    }
    if (data.predicate === undefined) {
        const err9 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: "predicate" }, message: "must have required property '" + "predicate" + "'", schema: schema18.oneOf[1].required, parentSchema: schema18.oneOf[1], data };
        if (vErrors === null) {
            vErrors = [err9];
        }
        else {
            vErrors.push(err9);
        }
        errors++;
    }
    for (const key1 in data) {
        if (!(((((key1 === "id") || (key1 === "path")) || (key1 === "purpose")) || (key1 === "filter")) || (key1 === "predicate"))) {
            const err10 = { instancePath, schemaPath: "#/oneOf/1/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties", schema: false, parentSchema: schema18.oneOf[1], data };
            if (vErrors === null) {
                vErrors = [err10];
            }
            else {
                vErrors.push(err10);
            }
            errors++;
        }
    }
    if (data.id !== undefined) {
        let data5 = data.id;
        if (typeof data5 !== "string") {
            const err11 = { instancePath: instancePath + "/id", schemaPath: "#/oneOf/1/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema18.oneOf[1].properties.id.type, parentSchema: schema18.oneOf[1].properties.id, data: data5 };
            if (vErrors === null) {
                vErrors = [err11];
            }
            else {
                vErrors.push(err11);
            }
            errors++;
        }
    }
    if (data.path !== undefined) {
        let data6 = data.path;
        if (Array.isArray(data6)) {
            const len1 = data6.length;
            for (let i1 = 0; i1 < len1; i1++) {
                let data7 = data6[i1];
                if (typeof data7 !== "string") {
                    const err12 = { instancePath: instancePath + "/path/" + i1, schemaPath: "#/oneOf/1/properties/path/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema18.oneOf[1].properties.path.items.type, parentSchema: schema18.oneOf[1].properties.path.items, data: data7 };
                    if (vErrors === null) {
                        vErrors = [err12];
                    }
                    else {
                        vErrors.push(err12);
                    }
                    errors++;
                }
            }
        }
        else {
            const err13 = { instancePath: instancePath + "/path", schemaPath: "#/oneOf/1/properties/path/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema18.oneOf[1].properties.path.type, parentSchema: schema18.oneOf[1].properties.path, data: data6 };
            if (vErrors === null) {
                vErrors = [err13];
            }
            else {
                vErrors.push(err13);
            }
            errors++;
        }
    }
    if (data.purpose !== undefined) {
        let data8 = data.purpose;
        if (typeof data8 !== "string") {
            const err14 = { instancePath: instancePath + "/purpose", schemaPath: "#/oneOf/1/properties/purpose/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema18.oneOf[1].properties.purpose.type, parentSchema: schema18.oneOf[1].properties.purpose, data: data8 };
            if (vErrors === null) {
                vErrors = [err14];
            }
            else {
                vErrors.push(err14);
            }
            errors++;
        }
    }
    if (data.filter !== undefined) {
        if (!(validate53(data.filter, { instancePath: instancePath + "/filter", parentData: data, parentDataProperty: "filter", rootData }))) {
            vErrors = vErrors === null ? validate53.errors : vErrors.concat(validate53.errors);
            errors = vErrors.length;
        }
    }
    if (data.predicate !== undefined) {
        let data10 = data.predicate;
        if (typeof data10 !== "string") {
            const err15 = { instancePath: instancePath + "/predicate", schemaPath: "#/oneOf/1/properties/predicate/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema18.oneOf[1].properties.predicate.type, parentSchema: schema18.oneOf[1].properties.predicate, data: data10 };
            if (vErrors === null) {
                vErrors = [err15];
            }
            else {
                vErrors.push(err15);
            }
            errors++;
        }
        if (!((data10 === "required") || (data10 === "preferred"))) {
            const err16 = { instancePath: instancePath + "/predicate", schemaPath: "#/oneOf/1/properties/predicate/enum", keyword: "enum", params: { allowedValues: schema18.oneOf[1].properties.predicate.enum }, message: "must be equal to one of the allowed values", schema: schema18.oneOf[1].properties.predicate.enum, parentSchema: schema18.oneOf[1].properties.predicate, data: data10 };
            if (vErrors === null) {
                vErrors = [err16];
            }
            else {
                vErrors.push(err16);
            }
            errors++;
        }
    }
} var _valid0 = _errs13 === errors; if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
}
else {
    if (_valid0) {
        valid0 = true;
        passing0 = 1;
    }
} if (!valid0) {
    const err17 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf", schema: schema18.oneOf, parentSchema: schema18, data };
    if (vErrors === null) {
        vErrors = [err17];
    }
    else {
        vErrors.push(err17);
    }
    errors++;
}
else {
    errors = _errs1;
    if (vErrors !== null) {
        if (_errs1) {
            vErrors.length = _errs1;
        }
        else {
            vErrors = null;
        }
    }
} validate52.errors = vErrors; return errors === 0; }
function validate47(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.id === undefined) {
        const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema15.required, parentSchema: schema15, data };
        if (vErrors === null) {
            vErrors = [err0];
        }
        else {
            vErrors.push(err0);
        }
        errors++;
    }
    if (data.schema === undefined) {
        const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "schema" }, message: "must have required property '" + "schema" + "'", schema: schema15.required, parentSchema: schema15, data };
        if (vErrors === null) {
            vErrors = [err1];
        }
        else {
            vErrors.push(err1);
        }
        errors++;
    }
    for (const key0 in data) {
        if (!(((((((key0 === "id") || (key0 === "name")) || (key0 === "purpose")) || (key0 === "group")) || (key0 === "schema")) || (key0 === "issuance")) || (key0 === "constraints"))) {
            const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties", schema: false, parentSchema: schema15, data };
            if (vErrors === null) {
                vErrors = [err2];
            }
            else {
                vErrors.push(err2);
            }
            errors++;
        }
    }
    if (data.id !== undefined) {
        let data0 = data.id;
        if (typeof data0 !== "string") {
            const err3 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.id.type, parentSchema: schema15.properties.id, data: data0 };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
    }
    if (data.name !== undefined) {
        let data1 = data.name;
        if (typeof data1 !== "string") {
            const err4 = { instancePath: instancePath + "/name", schemaPath: "#/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.name.type, parentSchema: schema15.properties.name, data: data1 };
            if (vErrors === null) {
                vErrors = [err4];
            }
            else {
                vErrors.push(err4);
            }
            errors++;
        }
    }
    if (data.purpose !== undefined) {
        let data2 = data.purpose;
        if (typeof data2 !== "string") {
            const err5 = { instancePath: instancePath + "/purpose", schemaPath: "#/properties/purpose/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.purpose.type, parentSchema: schema15.properties.purpose, data: data2 };
            if (vErrors === null) {
                vErrors = [err5];
            }
            else {
                vErrors.push(err5);
            }
            errors++;
        }
    }
    if (data.group !== undefined) {
        let data3 = data.group;
        if (Array.isArray(data3)) {
            const len0 = data3.length;
            for (let i0 = 0; i0 < len0; i0++) {
                let data4 = data3[i0];
                if (typeof data4 !== "string") {
                    const err6 = { instancePath: instancePath + "/group/" + i0, schemaPath: "#/properties/group/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.group.items.type, parentSchema: schema15.properties.group.items, data: data4 };
                    if (vErrors === null) {
                        vErrors = [err6];
                    }
                    else {
                        vErrors.push(err6);
                    }
                    errors++;
                }
            }
        }
        else {
            const err7 = { instancePath: instancePath + "/group", schemaPath: "#/properties/group/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.group.type, parentSchema: schema15.properties.group, data: data3 };
            if (vErrors === null) {
                vErrors = [err7];
            }
            else {
                vErrors.push(err7);
            }
            errors++;
        }
    }
    if (data.schema !== undefined) {
        let data5 = data.schema;
        if (Array.isArray(data5)) {
            const len1 = data5.length;
            for (let i1 = 0; i1 < len1; i1++) {
                if (!(validate48(data5[i1], { instancePath: instancePath + "/schema/" + i1, parentData: data5, parentDataProperty: i1, rootData }))) {
                    vErrors = vErrors === null ? validate48.errors : vErrors.concat(validate48.errors);
                    errors = vErrors.length;
                }
            }
        }
        else {
            const err8 = { instancePath: instancePath + "/schema", schemaPath: "#/properties/schema/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.schema.type, parentSchema: schema15.properties.schema, data: data5 };
            if (vErrors === null) {
                vErrors = [err8];
            }
            else {
                vErrors.push(err8);
            }
            errors++;
        }
    }
    if (data.issuance !== undefined) {
        let data7 = data.issuance;
        if (Array.isArray(data7)) {
            const len2 = data7.length;
            for (let i2 = 0; i2 < len2; i2++) {
                if (!(validate50(data7[i2], { instancePath: instancePath + "/issuance/" + i2, parentData: data7, parentDataProperty: i2, rootData }))) {
                    vErrors = vErrors === null ? validate50.errors : vErrors.concat(validate50.errors);
                    errors = vErrors.length;
                }
            }
        }
        else {
            const err9 = { instancePath: instancePath + "/issuance", schemaPath: "#/properties/issuance/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.issuance.type, parentSchema: schema15.properties.issuance, data: data7 };
            if (vErrors === null) {
                vErrors = [err9];
            }
            else {
                vErrors.push(err9);
            }
            errors++;
        }
    }
    if (data.constraints !== undefined) {
        let data9 = data.constraints;
        if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
            for (const key1 in data9) {
                if (!((((((key1 === "limit_disclosure") || (key1 === "statuses")) || (key1 === "fields")) || (key1 === "subject_is_issuer")) || (key1 === "is_holder")) || (key1 === "same_subject"))) {
                    const err10 = { instancePath: instancePath + "/constraints", schemaPath: "#/properties/constraints/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties", schema: false, parentSchema: schema15.properties.constraints, data: data9 };
                    if (vErrors === null) {
                        vErrors = [err10];
                    }
                    else {
                        vErrors.push(err10);
                    }
                    errors++;
                }
            }
            if (data9.limit_disclosure !== undefined) {
                let data10 = data9.limit_disclosure;
                if (typeof data10 !== "string") {
                    const err11 = { instancePath: instancePath + "/constraints/limit_disclosure", schemaPath: "#/properties/constraints/properties/limit_disclosure/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.limit_disclosure.type, parentSchema: schema15.properties.constraints.properties.limit_disclosure, data: data10 };
                    if (vErrors === null) {
                        vErrors = [err11];
                    }
                    else {
                        vErrors.push(err11);
                    }
                    errors++;
                }
                if (!((data10 === "required") || (data10 === "preferred"))) {
                    const err12 = { instancePath: instancePath + "/constraints/limit_disclosure", schemaPath: "#/properties/constraints/properties/limit_disclosure/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.limit_disclosure.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.limit_disclosure.enum, parentSchema: schema15.properties.constraints.properties.limit_disclosure, data: data10 };
                    if (vErrors === null) {
                        vErrors = [err12];
                    }
                    else {
                        vErrors.push(err12);
                    }
                    errors++;
                }
            }
            if (data9.statuses !== undefined) {
                let data11 = data9.statuses;
                if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
                    if (data11.active !== undefined) {
                        let data12 = data11.active;
                        if (data12 && typeof data12 == "object" && !Array.isArray(data12)) {
                            if (data12.directive !== undefined) {
                                let data13 = data12.directive;
                                if (typeof data13 !== "string") {
                                    const err13 = { instancePath: instancePath + "/constraints/statuses/active/directive", schemaPath: "#/properties/constraints/properties/statuses/properties/active/properties/directive/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.statuses.properties.active.properties.directive.type, parentSchema: schema15.properties.constraints.properties.statuses.properties.active.properties.directive, data: data13 };
                                    if (vErrors === null) {
                                        vErrors = [err13];
                                    }
                                    else {
                                        vErrors.push(err13);
                                    }
                                    errors++;
                                }
                                if (!(((data13 === "required") || (data13 === "allowed")) || (data13 === "disallowed"))) {
                                    const err14 = { instancePath: instancePath + "/constraints/statuses/active/directive", schemaPath: "#/properties/constraints/properties/statuses/properties/active/properties/directive/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.statuses.properties.active.properties.directive.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.statuses.properties.active.properties.directive.enum, parentSchema: schema15.properties.constraints.properties.statuses.properties.active.properties.directive, data: data13 };
                                    if (vErrors === null) {
                                        vErrors = [err14];
                                    }
                                    else {
                                        vErrors.push(err14);
                                    }
                                    errors++;
                                }
                            }
                        }
                        else {
                            const err15 = { instancePath: instancePath + "/constraints/statuses/active", schemaPath: "#/properties/constraints/properties/statuses/properties/active/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.properties.statuses.properties.active.type, parentSchema: schema15.properties.constraints.properties.statuses.properties.active, data: data12 };
                            if (vErrors === null) {
                                vErrors = [err15];
                            }
                            else {
                                vErrors.push(err15);
                            }
                            errors++;
                        }
                    }
                    if (data11.suspended !== undefined) {
                        let data14 = data11.suspended;
                        if (data14 && typeof data14 == "object" && !Array.isArray(data14)) {
                            if (data14.directive !== undefined) {
                                let data15 = data14.directive;
                                if (typeof data15 !== "string") {
                                    const err16 = { instancePath: instancePath + "/constraints/statuses/suspended/directive", schemaPath: "#/properties/constraints/properties/statuses/properties/suspended/properties/directive/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.statuses.properties.suspended.properties.directive.type, parentSchema: schema15.properties.constraints.properties.statuses.properties.suspended.properties.directive, data: data15 };
                                    if (vErrors === null) {
                                        vErrors = [err16];
                                    }
                                    else {
                                        vErrors.push(err16);
                                    }
                                    errors++;
                                }
                                if (!(((data15 === "required") || (data15 === "allowed")) || (data15 === "disallowed"))) {
                                    const err17 = { instancePath: instancePath + "/constraints/statuses/suspended/directive", schemaPath: "#/properties/constraints/properties/statuses/properties/suspended/properties/directive/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.statuses.properties.suspended.properties.directive.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.statuses.properties.suspended.properties.directive.enum, parentSchema: schema15.properties.constraints.properties.statuses.properties.suspended.properties.directive, data: data15 };
                                    if (vErrors === null) {
                                        vErrors = [err17];
                                    }
                                    else {
                                        vErrors.push(err17);
                                    }
                                    errors++;
                                }
                            }
                        }
                        else {
                            const err18 = { instancePath: instancePath + "/constraints/statuses/suspended", schemaPath: "#/properties/constraints/properties/statuses/properties/suspended/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.properties.statuses.properties.suspended.type, parentSchema: schema15.properties.constraints.properties.statuses.properties.suspended, data: data14 };
                            if (vErrors === null) {
                                vErrors = [err18];
                            }
                            else {
                                vErrors.push(err18);
                            }
                            errors++;
                        }
                    }
                    if (data11.revoked !== undefined) {
                        let data16 = data11.revoked;
                        if (data16 && typeof data16 == "object" && !Array.isArray(data16)) {
                            if (data16.directive !== undefined) {
                                let data17 = data16.directive;
                                if (typeof data17 !== "string") {
                                    const err19 = { instancePath: instancePath + "/constraints/statuses/revoked/directive", schemaPath: "#/properties/constraints/properties/statuses/properties/revoked/properties/directive/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.statuses.properties.revoked.properties.directive.type, parentSchema: schema15.properties.constraints.properties.statuses.properties.revoked.properties.directive, data: data17 };
                                    if (vErrors === null) {
                                        vErrors = [err19];
                                    }
                                    else {
                                        vErrors.push(err19);
                                    }
                                    errors++;
                                }
                                if (!(((data17 === "required") || (data17 === "allowed")) || (data17 === "disallowed"))) {
                                    const err20 = { instancePath: instancePath + "/constraints/statuses/revoked/directive", schemaPath: "#/properties/constraints/properties/statuses/properties/revoked/properties/directive/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.statuses.properties.revoked.properties.directive.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.statuses.properties.revoked.properties.directive.enum, parentSchema: schema15.properties.constraints.properties.statuses.properties.revoked.properties.directive, data: data17 };
                                    if (vErrors === null) {
                                        vErrors = [err20];
                                    }
                                    else {
                                        vErrors.push(err20);
                                    }
                                    errors++;
                                }
                            }
                        }
                        else {
                            const err21 = { instancePath: instancePath + "/constraints/statuses/revoked", schemaPath: "#/properties/constraints/properties/statuses/properties/revoked/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.properties.statuses.properties.revoked.type, parentSchema: schema15.properties.constraints.properties.statuses.properties.revoked, data: data16 };
                            if (vErrors === null) {
                                vErrors = [err21];
                            }
                            else {
                                vErrors.push(err21);
                            }
                            errors++;
                        }
                    }
                }
                else {
                    const err22 = { instancePath: instancePath + "/constraints/statuses", schemaPath: "#/properties/constraints/properties/statuses/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.properties.statuses.type, parentSchema: schema15.properties.constraints.properties.statuses, data: data11 };
                    if (vErrors === null) {
                        vErrors = [err22];
                    }
                    else {
                        vErrors.push(err22);
                    }
                    errors++;
                }
            }
            if (data9.fields !== undefined) {
                let data18 = data9.fields;
                if (Array.isArray(data18)) {
                    const len3 = data18.length;
                    for (let i3 = 0; i3 < len3; i3++) {
                        if (!(validate52(data18[i3], { instancePath: instancePath + "/constraints/fields/" + i3, parentData: data18, parentDataProperty: i3, rootData }))) {
                            vErrors = vErrors === null ? validate52.errors : vErrors.concat(validate52.errors);
                            errors = vErrors.length;
                        }
                    }
                }
                else {
                    const err23 = { instancePath: instancePath + "/constraints/fields", schemaPath: "#/properties/constraints/properties/fields/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.constraints.properties.fields.type, parentSchema: schema15.properties.constraints.properties.fields, data: data18 };
                    if (vErrors === null) {
                        vErrors = [err23];
                    }
                    else {
                        vErrors.push(err23);
                    }
                    errors++;
                }
            }
            if (data9.subject_is_issuer !== undefined) {
                let data20 = data9.subject_is_issuer;
                if (typeof data20 !== "string") {
                    const err24 = { instancePath: instancePath + "/constraints/subject_is_issuer", schemaPath: "#/properties/constraints/properties/subject_is_issuer/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.subject_is_issuer.type, parentSchema: schema15.properties.constraints.properties.subject_is_issuer, data: data20 };
                    if (vErrors === null) {
                        vErrors = [err24];
                    }
                    else {
                        vErrors.push(err24);
                    }
                    errors++;
                }
                if (!((data20 === "required") || (data20 === "preferred"))) {
                    const err25 = { instancePath: instancePath + "/constraints/subject_is_issuer", schemaPath: "#/properties/constraints/properties/subject_is_issuer/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.subject_is_issuer.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.subject_is_issuer.enum, parentSchema: schema15.properties.constraints.properties.subject_is_issuer, data: data20 };
                    if (vErrors === null) {
                        vErrors = [err25];
                    }
                    else {
                        vErrors.push(err25);
                    }
                    errors++;
                }
            }
            if (data9.is_holder !== undefined) {
                let data21 = data9.is_holder;
                if (Array.isArray(data21)) {
                    const len4 = data21.length;
                    for (let i4 = 0; i4 < len4; i4++) {
                        let data22 = data21[i4];
                        if (data22 && typeof data22 == "object" && !Array.isArray(data22)) {
                            if (data22.field_id === undefined) {
                                const err26 = { instancePath: instancePath + "/constraints/is_holder/" + i4, schemaPath: "#/properties/constraints/properties/is_holder/items/required", keyword: "required", params: { missingProperty: "field_id" }, message: "must have required property '" + "field_id" + "'", schema: schema15.properties.constraints.properties.is_holder.items.required, parentSchema: schema15.properties.constraints.properties.is_holder.items, data: data22 };
                                if (vErrors === null) {
                                    vErrors = [err26];
                                }
                                else {
                                    vErrors.push(err26);
                                }
                                errors++;
                            }
                            if (data22.directive === undefined) {
                                const err27 = { instancePath: instancePath + "/constraints/is_holder/" + i4, schemaPath: "#/properties/constraints/properties/is_holder/items/required", keyword: "required", params: { missingProperty: "directive" }, message: "must have required property '" + "directive" + "'", schema: schema15.properties.constraints.properties.is_holder.items.required, parentSchema: schema15.properties.constraints.properties.is_holder.items, data: data22 };
                                if (vErrors === null) {
                                    vErrors = [err27];
                                }
                                else {
                                    vErrors.push(err27);
                                }
                                errors++;
                            }
                            for (const key2 in data22) {
                                if (!((key2 === "field_id") || (key2 === "directive"))) {
                                    const err28 = { instancePath: instancePath + "/constraints/is_holder/" + i4, schemaPath: "#/properties/constraints/properties/is_holder/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties", schema: false, parentSchema: schema15.properties.constraints.properties.is_holder.items, data: data22 };
                                    if (vErrors === null) {
                                        vErrors = [err28];
                                    }
                                    else {
                                        vErrors.push(err28);
                                    }
                                    errors++;
                                }
                            }
                            if (data22.field_id !== undefined) {
                                let data23 = data22.field_id;
                                if (Array.isArray(data23)) {
                                    const len5 = data23.length;
                                    for (let i5 = 0; i5 < len5; i5++) {
                                        let data24 = data23[i5];
                                        if (typeof data24 !== "string") {
                                            const err29 = { instancePath: instancePath + "/constraints/is_holder/" + i4 + "/field_id/" + i5, schemaPath: "#/properties/constraints/properties/is_holder/items/properties/field_id/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.is_holder.items.properties.field_id.items.type, parentSchema: schema15.properties.constraints.properties.is_holder.items.properties.field_id.items, data: data24 };
                                            if (vErrors === null) {
                                                vErrors = [err29];
                                            }
                                            else {
                                                vErrors.push(err29);
                                            }
                                            errors++;
                                        }
                                    }
                                }
                                else {
                                    const err30 = { instancePath: instancePath + "/constraints/is_holder/" + i4 + "/field_id", schemaPath: "#/properties/constraints/properties/is_holder/items/properties/field_id/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.constraints.properties.is_holder.items.properties.field_id.type, parentSchema: schema15.properties.constraints.properties.is_holder.items.properties.field_id, data: data23 };
                                    if (vErrors === null) {
                                        vErrors = [err30];
                                    }
                                    else {
                                        vErrors.push(err30);
                                    }
                                    errors++;
                                }
                            }
                            if (data22.directive !== undefined) {
                                let data25 = data22.directive;
                                if (typeof data25 !== "string") {
                                    const err31 = { instancePath: instancePath + "/constraints/is_holder/" + i4 + "/directive", schemaPath: "#/properties/constraints/properties/is_holder/items/properties/directive/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.is_holder.items.properties.directive.type, parentSchema: schema15.properties.constraints.properties.is_holder.items.properties.directive, data: data25 };
                                    if (vErrors === null) {
                                        vErrors = [err31];
                                    }
                                    else {
                                        vErrors.push(err31);
                                    }
                                    errors++;
                                }
                                if (!((data25 === "required") || (data25 === "preferred"))) {
                                    const err32 = { instancePath: instancePath + "/constraints/is_holder/" + i4 + "/directive", schemaPath: "#/properties/constraints/properties/is_holder/items/properties/directive/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.is_holder.items.properties.directive.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.is_holder.items.properties.directive.enum, parentSchema: schema15.properties.constraints.properties.is_holder.items.properties.directive, data: data25 };
                                    if (vErrors === null) {
                                        vErrors = [err32];
                                    }
                                    else {
                                        vErrors.push(err32);
                                    }
                                    errors++;
                                }
                            }
                        }
                        else {
                            const err33 = { instancePath: instancePath + "/constraints/is_holder/" + i4, schemaPath: "#/properties/constraints/properties/is_holder/items/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.properties.is_holder.items.type, parentSchema: schema15.properties.constraints.properties.is_holder.items, data: data22 };
                            if (vErrors === null) {
                                vErrors = [err33];
                            }
                            else {
                                vErrors.push(err33);
                            }
                            errors++;
                        }
                    }
                }
                else {
                    const err34 = { instancePath: instancePath + "/constraints/is_holder", schemaPath: "#/properties/constraints/properties/is_holder/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.constraints.properties.is_holder.type, parentSchema: schema15.properties.constraints.properties.is_holder, data: data21 };
                    if (vErrors === null) {
                        vErrors = [err34];
                    }
                    else {
                        vErrors.push(err34);
                    }
                    errors++;
                }
            }
            if (data9.same_subject !== undefined) {
                let data26 = data9.same_subject;
                if (Array.isArray(data26)) {
                    const len6 = data26.length;
                    for (let i6 = 0; i6 < len6; i6++) {
                        let data27 = data26[i6];
                        if (data27 && typeof data27 == "object" && !Array.isArray(data27)) {
                            if (data27.field_id === undefined) {
                                const err35 = { instancePath: instancePath + "/constraints/same_subject/" + i6, schemaPath: "#/properties/constraints/properties/same_subject/items/required", keyword: "required", params: { missingProperty: "field_id" }, message: "must have required property '" + "field_id" + "'", schema: schema15.properties.constraints.properties.same_subject.items.required, parentSchema: schema15.properties.constraints.properties.same_subject.items, data: data27 };
                                if (vErrors === null) {
                                    vErrors = [err35];
                                }
                                else {
                                    vErrors.push(err35);
                                }
                                errors++;
                            }
                            if (data27.directive === undefined) {
                                const err36 = { instancePath: instancePath + "/constraints/same_subject/" + i6, schemaPath: "#/properties/constraints/properties/same_subject/items/required", keyword: "required", params: { missingProperty: "directive" }, message: "must have required property '" + "directive" + "'", schema: schema15.properties.constraints.properties.same_subject.items.required, parentSchema: schema15.properties.constraints.properties.same_subject.items, data: data27 };
                                if (vErrors === null) {
                                    vErrors = [err36];
                                }
                                else {
                                    vErrors.push(err36);
                                }
                                errors++;
                            }
                            for (const key3 in data27) {
                                if (!((key3 === "field_id") || (key3 === "directive"))) {
                                    const err37 = { instancePath: instancePath + "/constraints/same_subject/" + i6, schemaPath: "#/properties/constraints/properties/same_subject/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties", schema: false, parentSchema: schema15.properties.constraints.properties.same_subject.items, data: data27 };
                                    if (vErrors === null) {
                                        vErrors = [err37];
                                    }
                                    else {
                                        vErrors.push(err37);
                                    }
                                    errors++;
                                }
                            }
                            if (data27.field_id !== undefined) {
                                let data28 = data27.field_id;
                                if (Array.isArray(data28)) {
                                    const len7 = data28.length;
                                    for (let i7 = 0; i7 < len7; i7++) {
                                        let data29 = data28[i7];
                                        if (typeof data29 !== "string") {
                                            const err38 = { instancePath: instancePath + "/constraints/same_subject/" + i6 + "/field_id/" + i7, schemaPath: "#/properties/constraints/properties/same_subject/items/properties/field_id/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.same_subject.items.properties.field_id.items.type, parentSchema: schema15.properties.constraints.properties.same_subject.items.properties.field_id.items, data: data29 };
                                            if (vErrors === null) {
                                                vErrors = [err38];
                                            }
                                            else {
                                                vErrors.push(err38);
                                            }
                                            errors++;
                                        }
                                    }
                                }
                                else {
                                    const err39 = { instancePath: instancePath + "/constraints/same_subject/" + i6 + "/field_id", schemaPath: "#/properties/constraints/properties/same_subject/items/properties/field_id/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.constraints.properties.same_subject.items.properties.field_id.type, parentSchema: schema15.properties.constraints.properties.same_subject.items.properties.field_id, data: data28 };
                                    if (vErrors === null) {
                                        vErrors = [err39];
                                    }
                                    else {
                                        vErrors.push(err39);
                                    }
                                    errors++;
                                }
                            }
                            if (data27.directive !== undefined) {
                                let data30 = data27.directive;
                                if (typeof data30 !== "string") {
                                    const err40 = { instancePath: instancePath + "/constraints/same_subject/" + i6 + "/directive", schemaPath: "#/properties/constraints/properties/same_subject/items/properties/directive/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.same_subject.items.properties.directive.type, parentSchema: schema15.properties.constraints.properties.same_subject.items.properties.directive, data: data30 };
                                    if (vErrors === null) {
                                        vErrors = [err40];
                                    }
                                    else {
                                        vErrors.push(err40);
                                    }
                                    errors++;
                                }
                                if (!((data30 === "required") || (data30 === "preferred"))) {
                                    const err41 = { instancePath: instancePath + "/constraints/same_subject/" + i6 + "/directive", schemaPath: "#/properties/constraints/properties/same_subject/items/properties/directive/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.same_subject.items.properties.directive.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.same_subject.items.properties.directive.enum, parentSchema: schema15.properties.constraints.properties.same_subject.items.properties.directive, data: data30 };
                                    if (vErrors === null) {
                                        vErrors = [err41];
                                    }
                                    else {
                                        vErrors.push(err41);
                                    }
                                    errors++;
                                }
                            }
                        }
                        else {
                            const err42 = { instancePath: instancePath + "/constraints/same_subject/" + i6, schemaPath: "#/properties/constraints/properties/same_subject/items/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.properties.same_subject.items.type, parentSchema: schema15.properties.constraints.properties.same_subject.items, data: data27 };
                            if (vErrors === null) {
                                vErrors = [err42];
                            }
                            else {
                                vErrors.push(err42);
                            }
                            errors++;
                        }
                    }
                }
                else {
                    const err43 = { instancePath: instancePath + "/constraints/same_subject", schemaPath: "#/properties/constraints/properties/same_subject/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.constraints.properties.same_subject.type, parentSchema: schema15.properties.constraints.properties.same_subject, data: data26 };
                    if (vErrors === null) {
                        vErrors = [err43];
                    }
                    else {
                        vErrors.push(err43);
                    }
                    errors++;
                }
            }
        }
        else {
            const err44 = { instancePath: instancePath + "/constraints", schemaPath: "#/properties/constraints/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.type, parentSchema: schema15.properties.constraints, data: data9 };
            if (vErrors === null) {
                vErrors = [err44];
            }
            else {
                vErrors.push(err44);
            }
            errors++;
        }
    }
}
else {
    const err45 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.type, parentSchema: schema15, data };
    if (vErrors === null) {
        vErrors = [err45];
    }
    else {
        vErrors.push(err45);
    }
    errors++;
} validate47.errors = vErrors; return errors === 0; }
function validate42(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.presentation_definition !== undefined) {
        let data0 = data.presentation_definition;
        if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
            if (data0.id === undefined) {
                const err0 = { instancePath: instancePath + "/presentation_definition", schemaPath: "#/properties/presentation_definition/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema12.properties.presentation_definition.required, parentSchema: schema12.properties.presentation_definition, data: data0 };
                if (vErrors === null) {
                    vErrors = [err0];
                }
                else {
                    vErrors.push(err0);
                }
                errors++;
            }
            if (data0.input_descriptors === undefined) {
                const err1 = { instancePath: instancePath + "/presentation_definition", schemaPath: "#/properties/presentation_definition/required", keyword: "required", params: { missingProperty: "input_descriptors" }, message: "must have required property '" + "input_descriptors" + "'", schema: schema12.properties.presentation_definition.required, parentSchema: schema12.properties.presentation_definition, data: data0 };
                if (vErrors === null) {
                    vErrors = [err1];
                }
                else {
                    vErrors.push(err1);
                }
                errors++;
            }
            for (const key0 in data0) {
                if (!((((((key0 === "id") || (key0 === "name")) || (key0 === "purpose")) || (key0 === "format")) || (key0 === "submission_requirements")) || (key0 === "input_descriptors"))) {
                    const err2 = { instancePath: instancePath + "/presentation_definition", schemaPath: "#/properties/presentation_definition/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties", schema: false, parentSchema: schema12.properties.presentation_definition, data: data0 };
                    if (vErrors === null) {
                        vErrors = [err2];
                    }
                    else {
                        vErrors.push(err2);
                    }
                    errors++;
                }
            }
            if (data0.id !== undefined) {
                let data1 = data0.id;
                if (typeof data1 !== "string") {
                    const err3 = { instancePath: instancePath + "/presentation_definition/id", schemaPath: "#/properties/presentation_definition/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema12.properties.presentation_definition.properties.id.type, parentSchema: schema12.properties.presentation_definition.properties.id, data: data1 };
                    if (vErrors === null) {
                        vErrors = [err3];
                    }
                    else {
                        vErrors.push(err3);
                    }
                    errors++;
                }
            }
            if (data0.name !== undefined) {
                let data2 = data0.name;
                if (typeof data2 !== "string") {
                    const err4 = { instancePath: instancePath + "/presentation_definition/name", schemaPath: "#/properties/presentation_definition/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema12.properties.presentation_definition.properties.name.type, parentSchema: schema12.properties.presentation_definition.properties.name, data: data2 };
                    if (vErrors === null) {
                        vErrors = [err4];
                    }
                    else {
                        vErrors.push(err4);
                    }
                    errors++;
                }
            }
            if (data0.purpose !== undefined) {
                let data3 = data0.purpose;
                if (typeof data3 !== "string") {
                    const err5 = { instancePath: instancePath + "/presentation_definition/purpose", schemaPath: "#/properties/presentation_definition/properties/purpose/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema12.properties.presentation_definition.properties.purpose.type, parentSchema: schema12.properties.presentation_definition.properties.purpose, data: data3 };
                    if (vErrors === null) {
                        vErrors = [err5];
                    }
                    else {
                        vErrors.push(err5);
                    }
                    errors++;
                }
            }
            if (data0.format !== undefined) {
                if (!(validate43(data0.format, { instancePath: instancePath + "/presentation_definition/format", parentData: data0, parentDataProperty: "format", rootData }))) {
                    vErrors = vErrors === null ? validate43.errors : vErrors.concat(validate43.errors);
                    errors = vErrors.length;
                }
            }
            if (data0.submission_requirements !== undefined) {
                let data5 = data0.submission_requirements;
                if (Array.isArray(data5)) {
                    const len0 = data5.length;
                    for (let i0 = 0; i0 < len0; i0++) {
                        if (!(validate45(data5[i0], { instancePath: instancePath + "/presentation_definition/submission_requirements/" + i0, parentData: data5, parentDataProperty: i0, rootData }))) {
                            vErrors = vErrors === null ? validate45.errors : vErrors.concat(validate45.errors);
                            errors = vErrors.length;
                        }
                    }
                }
                else {
                    const err6 = { instancePath: instancePath + "/presentation_definition/submission_requirements", schemaPath: "#/properties/presentation_definition/properties/submission_requirements/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema12.properties.presentation_definition.properties.submission_requirements.type, parentSchema: schema12.properties.presentation_definition.properties.submission_requirements, data: data5 };
                    if (vErrors === null) {
                        vErrors = [err6];
                    }
                    else {
                        vErrors.push(err6);
                    }
                    errors++;
                }
            }
            if (data0.input_descriptors !== undefined) {
                let data7 = data0.input_descriptors;
                if (Array.isArray(data7)) {
                    const len1 = data7.length;
                    for (let i1 = 0; i1 < len1; i1++) {
                        if (!(validate47(data7[i1], { instancePath: instancePath + "/presentation_definition/input_descriptors/" + i1, parentData: data7, parentDataProperty: i1, rootData }))) {
                            vErrors = vErrors === null ? validate47.errors : vErrors.concat(validate47.errors);
                            errors = vErrors.length;
                        }
                    }
                }
                else {
                    const err7 = { instancePath: instancePath + "/presentation_definition/input_descriptors", schemaPath: "#/properties/presentation_definition/properties/input_descriptors/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema12.properties.presentation_definition.properties.input_descriptors.type, parentSchema: schema12.properties.presentation_definition.properties.input_descriptors, data: data7 };
                    if (vErrors === null) {
                        vErrors = [err7];
                    }
                    else {
                        vErrors.push(err7);
                    }
                    errors++;
                }
            }
        }
        else {
            const err8 = { instancePath: instancePath + "/presentation_definition", schemaPath: "#/properties/presentation_definition/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema12.properties.presentation_definition.type, parentSchema: schema12.properties.presentation_definition, data: data0 };
            if (vErrors === null) {
                vErrors = [err8];
            }
            else {
                vErrors.push(err8);
            }
            errors++;
        }
    }
}
else {
    const err9 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema12.type, parentSchema: schema12, data };
    if (vErrors === null) {
        vErrors = [err9];
    }
    else {
        vErrors.push(err9);
    }
    errors++;
} validate42.errors = vErrors; return errors === 0; }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVQRHYxLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3ZhbGlkYXRpb24vdmFsaWRhdGVQRHYxLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0FBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0FBQUEsTUFBTSxRQUFRLEdBQUcsRUFBQyxTQUFTLEVBQUMseUNBQXlDLEVBQUMsT0FBTyxFQUFDLHlCQUF5QixFQUFDLGFBQWEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsc0JBQXNCLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxRQUFRLEVBQUMsUUFBUSxDQUFDLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxFQUFDLGtCQUFrQixFQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsUUFBUSxFQUFDLFFBQVEsQ0FBQyxFQUFDLEVBQUMsa0JBQWtCLEVBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxRQUFRLEVBQUMsUUFBUSxDQUFDLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxRQUFRLEVBQUMsUUFBUSxDQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxRQUFRLEVBQUMsUUFBUSxDQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxlQUFlLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxNQUFNLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyx5T0FBeU8sRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMseU9BQXlPLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLHFEQUFxRCxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxLQUFLLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyx5QkFBeUIsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsWUFBWSxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMsc0JBQXNCLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxhQUFhLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxZQUFZLEVBQUMsYUFBYSxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMseUJBQXlCLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsRUFBQyxhQUFhLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLHVDQUF1QyxFQUFDLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLE1BQU0sRUFBQyxhQUFhLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLElBQUksRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsc0JBQXNCLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLHdCQUF3QixFQUFDLEVBQUMsRUFBQyxhQUFhLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLGtCQUFrQixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxxQkFBcUIsRUFBQyxFQUFDLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLFVBQVUsRUFBQyxXQUFXLENBQUMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLENBQUMsVUFBVSxFQUFDLFdBQVcsQ0FBQyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxjQUFjLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLFVBQVUsRUFBQyxXQUFXLENBQUMsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsVUFBVSxFQUFDLFdBQVcsQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLElBQUksRUFBQyxRQUFRLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxzQkFBc0IsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsTUFBTSxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxJQUFJLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsV0FBVyxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyx5QkFBeUIsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLEVBQUMseUJBQXlCLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyx1Q0FBdUMsRUFBQyxFQUFDLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxpQ0FBaUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxJQUFJLEVBQUMsbUJBQW1CLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLENBQUM7QUFBQSxNQUFNLFFBQVEsR0FBRyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLHlPQUF5TyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyx5T0FBeU8sRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLG1CQUFtQixFQUFDLEVBQUMscURBQXFELEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLEtBQUssRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLHlCQUF5QixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxZQUFZLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxzQkFBc0IsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLGFBQWEsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLFlBQVksRUFBQyxhQUFhLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsQ0FBQztBQUFBLE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLHFEQUFxRCxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQUEsTUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMseUJBQXlCLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUFBLE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQUEsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxHQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxHQUFDLElBQUksRUFBQyxHQUFDLEVBQUUsSUFBRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxJQUFHLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7SUFBQSxLQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFD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QUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0FBQUEsQ0FBQztLQUFLLENBQUM7SUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO0lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7UUFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUFBLENBQUM7U0FBSyxDQUFDO1FBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUFBLENBQUM7SUFBQSxNQUFNLEVBQUUsQ0FBQztBQUFBLENBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFBLE9BQU8sTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUM7QUFBQSxNQUFNLFFBQVEsR0FBRyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLENBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxFQUFDLGFBQWEsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsdUNBQXVDLEVBQUMsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsTUFBTSxFQUFDLGFBQWEsQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQztBQUFBLE1BQU0sUUFBUSxHQUFHLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQUEsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxHQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxHQUFDLElBQUksRUFBQyxHQUFDLEVBQUUsSUFBRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxJQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO0lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7UUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7U0FBSyxDQUFDO1FBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7SUFBQSxNQUFNLEVBQUUsQ0FBQztBQUFBLENBQUMsQ0FBQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQSxJQUFHLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsb0JBQW9CLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxlQUFlLEVBQUUsTUFBTSxFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLE1BQU0sR0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7UUFBQSxNQUFNLEVBQUUsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsb0JBQW9CLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxlQUFlLEVBQUUsTUFBTSxFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLE1BQU0sR0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7UUFBQSxNQUFNLEVBQUUsQ0FBQztJQUFBLENBQUM7SUFBQSxLQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsZ0NBQWdDLEVBQUMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sRUFBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyxxQ0FBcUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUMsQ0FBQztZQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLG1DQUFtQyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQztZQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dCQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztpQkFBSyxDQUFDO2dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQUEsTUFBTSxFQUFFLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFBQSxJQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBQyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsZ0NBQWdDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7UUFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLDRDQUE0QyxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsaUNBQWlDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7UUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFBQyxDQUFDO1lBQUEsSUFBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO2dCQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLG9DQUFvQyxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO2dCQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO29CQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUFBLENBQUM7cUJBQUssQ0FBQztvQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUFBLENBQUM7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RUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7WUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7QUFBQSxDQUFDLENBQUEsSUFBSSxPQUFPLEdBQUcsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFBLElBQUcsT0FBTyxFQUFDLENBQUM7SUFBQSxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQUEsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUFBLENBQUMsQ0FBQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQSxJQUFHLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsb0JBQW9CLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxlQUFlLEVBQUUsTUFBTSxFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLE1BQU0sR0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFBLENBQUM7UUFBQSxNQUFNLEVBQUUsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsb0JBQW9CLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLGFBQWEsR0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFBLENBQUM7UUFBQSxNQUFNLEVBQUUsQ0FBQztJQUFBLENBQUM7SUFBQSxLQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsZ0NBQWdDLEVBQUMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sRUFBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyxxQ0FBcUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7WUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUMsQ0FBQztZQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLG1DQUFtQyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQztZQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dCQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUEsQ0FBQztpQkFBSyxDQUFDO2dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQUEsTUFBTSxFQUFFLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFBQSxJQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBQyxDQUFDO1lBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsZ0NBQWdDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7UUFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLDRDQUE0QyxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxNQUFNLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1lBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsaUNBQWlDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7UUFBQSxJQUFHLE9BQU8sTUFBTSxJQUFJLFFBQVEsRUFBQyxDQUFDO1lBQUEsSUFBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDO2dCQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLG9DQUFvQyxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDO2dCQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO29CQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFBLENBQUM7cUJB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QUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQUEsQ0FBQztLQUFLLENBQUM7SUFBQSxJQUFHLE9BQU8sRUFBQyxDQUFDO1FBQUEsTUFBTSxHQUFHLElBQUksQ0FBQztRQUFBLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFBQSxDQUFDO0FBQUEsQ0FBQyxDQUFBLElBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQztJQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBQyxjQUFjLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLHdDQUF3QyxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLENBQUM7SUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztRQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQUEsQ0FBQztTQUFLLENBQUM7UUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQUFBLE1BQU0sRUFBRSxDQUFDO0FBQUEsQ0FBQztLQUFLLENBQUM7SUFBQSxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7UUFBQSxJQUFHLE1BQU0sRUFBQyxDQUFDO1lBQUEsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFBQSxDQUFDO2FBQUssQ0FBQztZQUFBLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztBQUFBLENBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFBLE9BQU8sTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUM7QUFBQSxNQUFNLFFBQVEsR0FBRyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxzQkFBc0IsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsd0JBQXdCLEVBQUMsRUFBQyxFQUFDLGFBQWEsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsa0JBQWtCLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLFVBQVUsRUFBQyxXQUFXLENBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsWUFBWSxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsWUFBWSxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsWUFBWSxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLHFCQUFxQixFQUFDLEVBQUMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLENBQUMsVUFBVSxFQUFDLFdBQVcsQ0FBQyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLFVBQVUsRUFBQyxXQUFXLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLGNBQWMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLENBQUMsVUFBVSxFQUFDLFdBQVcsQ0FBQyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsSUFBSSxFQUFDLFFBQVEsQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxDQUFDO0FBQUEsTUFBTSxRQUFRLEdBQUcsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLEtBQUssRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsQ0FBQztBQUFBLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFDLFlBQVksR0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsR0FBQyxJQUFJLEVBQUMsR0FBQyxFQUFFLElBQUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUEsSUFBRyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUMsRUFBQyxPQUFPLEVBQUMsK0JBQStCLEdBQUMsS0FBSyxHQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7UUFBQSxNQUFNLEVBQUUsQ0FBQztJQUFBLENBQUM7SUFBQSxLQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUMsRUFBQyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLHdCQUF3QixFQUFDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLEVBQUMsRUFBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsRUFBQyxPQUFPLEVBQUMscUNBQXFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyx1QkFBdUIsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssU0FBUyxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyw0QkFBNEIsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0FBQUEsQ0FBQztLQUFLLENBQUM7SUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO0lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7UUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7U0FBSyxDQUFDO1FBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7SUFBQSxNQUFNLEVBQUUsQ0FBQztBQUFBLENBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFBLE9BQU8sTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUM7QUFBQSxNQUFNLFFBQVEsR0FBRyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsc0JBQXNCLEVBQUMsSUFBSSxFQUFDLENBQUM7QUFBQSxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEdBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEdBQUMsSUFBSSxFQUFDLEdBQUMsRUFBRSxJQUFFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFBLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLElBQUcsSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFBQSxJQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBQyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsNEJBQTRCLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQztZQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dCQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztpQkFBSyxDQUFDO2dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQUEsTUFBTSxFQUFFLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztBQUFBLENBQUM7S0FBSyxDQUFDO0lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsQ0FBQztJQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO1FBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQSxDQUFDO1NBQUssQ0FBQztRQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQSxDQUFDO0lBQUEsTUFBTSxFQUFFLENBQUM7QUFBQSxDQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQSxPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO0FBQUEsTUFBTSxRQUFRLEdBQUcsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxzQkFBc0IsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsTUFBTSxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxJQUFJLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsV0FBVyxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDO0FBQUEsTUFBTSxRQUFRLEdBQUcsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLEVBQUMsa0JBQWtCLEVBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxRQUFRLEVBQUMsUUFBUSxDQUFDLEVBQUMsRUFBQyxrQkFBa0IsRUFBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsUUFBUSxFQUFDLFFBQVEsQ0FBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLGVBQWUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLE1BQU0sQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxDQUFDO0FBQUEsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7QUFBQSxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEdBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEdBQUMsSUFBSSxFQUFDLEdBQUMsRUFBRSxJQUFFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFBLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLElBQUcsSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxlQUFlLEVBQUUsTUFBTSxFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLE1BQU0sR0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO1lBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQSxDQUFDO2FBQUssQ0FBQztZQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQSxDQUFDO1FBQUEsTUFBTSxFQUFFLENBQUM7SUFBQSxDQUFDO0lBQUEsS0FBSSxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUMsQ0FBQztRQUFBLElBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsd0JBQXdCLEVBQUMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sRUFBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyxxQ0FBcUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUMsQ0FBQztZQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLHdCQUF3QixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUMsQ0FBQztZQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLDBCQUEwQixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUMsQ0FBQztZQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLDJCQUEyQixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLEVBQUMsQ0FBQztZQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLDJCQUEyQixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyw2QkFBNkIsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsNkJBQTZCLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUs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QUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsRUFBQyxDQUFDO1lBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsMkJBQTJCLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQztZQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dCQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUEsQ0FBQztpQkFBSyxDQUFDO2dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQUEsTUFBTSxFQUFFLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsRUFBQyxDQUFDO1lBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMseUJBQXlCLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FB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QU0sRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0FBQUEsQ0FBQztLQUFLLENBQUM7SUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO0lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7UUFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUFBLENBQUM7U0FBSyxDQUFDO1FBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUFBLENBQUM7SUFBQSxNQUFNLEVBQUUsQ0FBQztBQUFBLENBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFBLE9BQU8sTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUM7QUFBQSxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEdBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEdBQUMsSUFBSSxFQUFDLEdBQUMsRUFBRSxJQUFFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFBLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQztJQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLENBQUM7SUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztRQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUEsQ0FBQztTQUFLLENBQUM7UUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQUFBLE1BQU0sRUFBRSxDQUFDO0FBQUEsQ0FBQyxDQUFBLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFBLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFBLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFBLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFBLElBQUcsSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxvQkFBb0IsRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUMsRUFBQyxPQUFPLEVBQUMsK0JBQStCLEdBQUMsTUFBTSxHQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUM7UUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztZQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUEsQ0FBQzthQUFLLENBQUM7WUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUEsQ0FBQztRQUFBLE1BQU0sRUFBRSxDQUFDO0lBQUEsQ0FBQztJQUFBLEtBQUksTUFBTSxJQUFJLElBQUksSUFBSSxFQUFDLENBQUM7UUFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQztZQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxFQUFDLEVBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLHFDQUFxQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFB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RUFBQyxJQUFJLEVBQUMsQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO1lBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQSxDQUFDO2FBQUssQ0FBQztZQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQSxDQUFDO1FBQUEsTUFBTSxFQUFFLENBQUM7SUFBQSxDQUFDO0lBQUEsS0FBSSxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUMsQ0FBQztRQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQztZQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxFQUFDLEVBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLHFDQUFxQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJ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TUFBTSxFQUFFLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxrQkFBa0IsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFBQSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUFBLElBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFDLENBQUM7WUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxxQ0FBcUMsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztRQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQztZQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLHFDQUFxQyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsRUFBQyxPQUFPLEVBQUMsNENBQTRDLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7QUFBQSxDQUFDLENBQUEsSUFBSSxPQUFPLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFBLElBQUcsT0FBTyxJQUFJLE1BQU0sRUFBQyxDQUFDO0lBQUEsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUFBLFFBQVEsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUFBLENBQUM7S0FBSyxDQUFDO0lBQUEsSUFBRyxPQUFPLEVBQUMsQ0FBQztRQUFBLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFBQSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQUEsQ0FBQztBQUFBLENBQUMsQ0FBQSxJQUFHLENBQUMsTUFBTSxFQUFDLENBQUM7SUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLEVBQUMsY0FBYyxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyx3Q0FBd0MsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO0lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7UUFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUFBLENBQUM7U0FBSyxDQUFDO1FBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUFBLENBQUM7SUFBQSxNQUFNLEVBQUUsQ0FBQztBQUFBLENBQUM7S0FBSyxDQUFDO0lBQUEsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxNQUFNLEVBQUMsQ0FBQztZQUFBLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQUEsQ0FBQzthQUFLLENBQUM7WUFBQSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7QUFBQSxDQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQSxPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO0FBQUEsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxHQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxHQUFDLElBQUksRUFBQyxHQUFDLEVBQUUsSUFBRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxJQUFHLElBQUks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R0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxzQkFBc0IsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyx3QkFBd0IsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQywyQkFBMkIsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUFBLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUFBLEtBQUksSUFBSSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUMsQ0FBQztnQkFBQSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQUEsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUMsQ0FBQztvQkFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsU0FBUyxHQUFHLEVBQUUsRUFBQyxVQUFVLEVBQUMsK0JBQStCLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO29CQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO3dCQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUFBLENBQUM7eUJBQUssQ0FBQzt3QkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUFBLENBQUM7b0JBQUEsTUFBTSxFQUFFLENBQUM7Z0JBQUEsQ0FBQztZQUFBLENBQUM7UUFBQSxDQUFDO2FBQUssQ0FBQztZQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLHlCQUF5QixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUFBLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUFBLEtBQUksSUFBSSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUMsQ0FBQztnQkFBQSxJQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDO29CQUFBLE9BQU8sR0FBRyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFBQSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFBQSxDQUFDO1lBQUEsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsMEJB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QkFBQSxDQUFDO29CQUFBLE1BQU0sRUFBRSxDQUFDO2dCQUFBLENBQUM7WUFBQSxDQUFDO1lBQUEsSUFBRyxLQUFLLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBQyxDQUFDO2dCQUFBLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7Z0JBQUEsSUFBRyxNQUFNLElBQUksT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDO29CQUFBLElBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUMsQ0FBQzt3QkFBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO3dCQUFBLElBQUcsTUFBTSxJQUFJLE9BQU8sTUFBTSxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQzs0QkFBQSxJQUFHLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFDLENBQUM7Z0NBQUEsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQ0FBQSxJQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBQyxDQUFDO29DQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyx3Q0FBd0MsRUFBQyxVQUFVLEVBQUMsMEZBQTBGLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQztvQ0FBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQzt3Q0FBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO3lDQUFLLENBQUM7d0NBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO29DQUFBLE1BQU0sRUFBRSxDQUFDO2dDQUFBLENBQUM7Z0NBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFlBQVksQ0FBQyxDQUFDLEVBQUMsQ0FBQztvQ0FBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsd0NBQXdDLEVBQUMsVUFBVSxFQUFDLDBGQUEwRixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyw0Q0FBNEMsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7b0NBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7d0NBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQUEsQ0FBQzt5Q0FBSyxDQUFDO3dDQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQUEsQ0FBQztvQ0FBQSxNQUFNLEVBQUUsQ0FBQztnQ0FBQSxDQUFDOzRCQUFBLENBQUM7d0JBQUEsQ0FBQzs2QkFBSyxDQUFDOzRCQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyw4QkFBOEIsRUFBQyxVQUFVLEVBQUMscUVBQXFFLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDOzRCQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dDQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUFBLENBQUM7aUNBQUssQ0FBQztnQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUFBLENBQUM7NEJBQUEsTUFBTSxFQUFFLENBQUM7d0JBQUEsQ0FBQztvQkFBQSxDQUFDO29CQUFBLElBQUcsTUFBTSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUMsQ0FBQzt3QkFBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO3dCQUFBLElBQUcsTUFBTSxJQUFJLE9BQU8sTUFBTSxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQzs0QkFBQSxJQUFHLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFDLENBQUM7Z0NBQUEsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQ0FBQSxJQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBQyxDQUFDO29DQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQywyQ0FBMkMsRUFBQyxVQUFVLEVBQUMsNkZBQTZGLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQztvQ0FBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQzt3Q0FBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO3lDQUFLLENBQUM7d0NBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO29DQUFBLE1BQU0sRUFBRSxDQUFDO2dDQUFBLENBQUM7Z0NBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFlBQVksQ0FBQyxDQUFDLEVBQUMsQ0FBQztvQ0FBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsMkNBQTJDLEVBQUMsVUFBVSxFQUFDLDZGQUE2RixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyw0Q0FBNEMsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7b0NBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7d0NBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQUEsQ0FBQzt5Q0FBSyxDQUFDO3dDQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQUEsQ0FBQztvQ0FBQSxNQUFNLEVBQUUsQ0FBQztnQ0FBQSxDQUFDOzRCQUFBLENBQUM7d0JBQUEsQ0FBQzs2QkFBSyxDQUFDOzRCQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxpQ0FBaUMsRUFBQyxVQUFVLEVBQUMsd0VBQXdFLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDOzRCQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dDQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUFBLENBQUM7aUNBQUssQ0FBQztnQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUFBLENBQUM7NEJBQUEsTUFBTSxFQUFFLENBQUM7d0JBQUEsQ0FBQztvQkFBQSxDQUFDO29CQUFBLElBQUcsTUFBTSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUMsQ0FBQzt3QkFBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO3dCQUFBLElBQUcsTUFBTSxJQUFJLE9BQU8sTUFBTSxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQzs0QkFBQSxJQUFHLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFDLENBQUM7Z0NBQUEsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQ0FBQSxJQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBQyxDQUFDO29DQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyx5Q0FBeUMsRUFBQyxVQUFVLEVBQUMsMkZBQTJGLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQztvQ0FBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQzt3Q0FBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO3lDQUFLLENBQUM7d0NBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO29DQUFBLE1BQU0sRUFBRSxDQUFDO2dDQUFBLENBQUM7Z0NBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFlBQVksQ0FBQyxDQUFDLEVBQUMsQ0FBQztvQ0FBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMseUNBQXlDLEVBQUMsVUFBVSxFQUFDLDJGQUEyRixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyw0Q0FBNEMsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7b0NBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7d0NBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQUEsQ0FBQzt5Q0FBSyxDQUFDO3dDQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQUEsQ0FBQztvQ0FBQSxNQUFNLEVBQUUsQ0FBQztnQ0FBQSxDQUFDOzRCQUFBLENBQUM7d0JBQUEsQ0FBQzs2QkFBSyxDQUFDOzRCQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQywrQkFBK0IsRUFBQyxVQUFVLEVBQUMsc0VBQXNFLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDOzRCQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dDQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUFBLENBQUM7aUNBQUssQ0FBQztnQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUFBLENBQUM7NEJBQUEsTUFBTSxFQUFFLENBQUM7d0JBQUEsQ0FBQztvQkFBQSxDQUFDO2dCQUFBLENBQUM7cUJBQUssQ0FBQztvQkFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsdUJBQXVCLEVBQUMsVUFBVSxFQUFDLG1EQUFtRCxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDO29CQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO3dCQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFBLENBQUM7eUJBQUssQ0FBQzt3QkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFBLENBQUM7b0JBQUEsTUFBTSxFQUFFLENBQUM7Z0JBQUEsQ0FBQztZQUFBLENBQUM7WUFBQSxJQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFDLENBQUM7Z0JBQUEsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFBQSxJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQztvQkFBQSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUFBLEtBQUksSUFBSSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUMsQ0FBQzt3QkFBQSxJQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxzQkFBc0IsR0FBRyxFQUFFLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7NEJBQUEsT0FBTyxHQUFHLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO3dCQUFBLENBQUM7b0JBQUEsQ0FBQztnQkFBQSxDQUFDO3FCQUFLLENBQUM7b0JBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLHFCQUFxQixFQUFDLFVBQVUsRUFBQyxpREFBaUQsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7b0JBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7d0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQUEsQ0FBQzt5QkFBSyxDQUFDO3dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQUEsQ0FBQztvQkFBQSxNQUFNLEVBQUUsQ0FBQztnQkFBQSxDQUFDO1lBQUEsQ0FBQztZQUFBLElBQUcsS0FBSyxDQUFDLGlCQUFpQixLQUFLLFNBQVMsRUFBQyxDQUFDO2dCQUFBLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztnQkFBQSxJQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBQyxDQUFDO29CQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxnQ0FBZ0MsRUFBQyxVQUFVLEVBQUMsNERBQTRELEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDO29CQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO3dCQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFBLENBQUM7eUJBQUssQ0FBQzt3QkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFBLENBQUM7b0JBQUEsTUFBTSxFQUFFLENBQUM7Z0JBQUEsQ0FBQztnQkFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxFQUFDLENBQUM7b0JBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLGdDQUFnQyxFQUFDLFVBQVUsRUFBQyw0REFBNEQsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLDRDQUE0QyxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDO29CQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO3dCQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFBLENBQUM7eUJBQUssQ0FBQzt3QkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFBLENBQUM7b0JBQUEsTUFBTSxFQUFFLENBQUM7Z0JBQUEsQ0FBQztZQUFBLENBQUM7WUFBQSxJQUFHLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFDLENBQUM7Z0JBQUEsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztnQkFBQSxJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQztvQkFBQSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUFBLEtBQUksSUFBSSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUMsQ0FBQzt3QkFBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQUEsSUFBRyxNQUFNLElBQUksT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDOzRCQUFBLElBQUcsTUFBTSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUMsQ0FBQztnQ0FBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMseUJBQXlCLEdBQUcsRUFBRSxFQUFDLFVBQVUsRUFBQyw4REFBOEQsRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUMsRUFBQyxPQUFPLEVBQUMsK0JBQStCLEdBQUMsVUFBVSxHQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7Z0NBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7b0NBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQUEsQ0FBQztxQ0FBSyxDQUFDO29DQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQUEsQ0FBQztnQ0FBQSxNQUFNLEVBQUUsQ0FBQzs0QkFBQSxDQUFDOzRCQUFBLElBQUcsTUFBTSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUMsQ0FBQztnQ0FBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMseUJBQXlCLEdBQUcsRUFBRSxFQUFDLFVBQVUsRUFBQyw4REFBOEQsRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLGVBQWUsRUFBRSxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsK0JBQStCLEdBQUMsV0FBVyxHQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7Z0NBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7b0NBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQUEsQ0FBQztxQ0FBSyxDQUFDO29DQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQUEsQ0FBQztnQ0FBQSxNQUFNLEVBQUUsQ0FBQzs0QkFBQSxDQUFDOzRCQUFBLEtBQUksTUFBTSxJQUFJLElBQUksTUFBTSxFQUFDLENBQUM7Z0NBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDO29DQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyx5QkFBeUIsR0FBRyxFQUFFLEVBQUMsVUFBVSxFQUFDLDBFQUEwRSxFQUFDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLEVBQUMsRUFBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsRUFBQyxPQUFPLEVBQUMscUNBQXFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDO29DQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO3dDQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUFBLENBQUM7eUNBQUssQ0FBQzt3Q0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUFBLENBQUM7b0NBQUEsTUFBTSxFQUFFLENBQUM7Z0NBQUEsQ0FBQzs0QkFBQSxDQUFDOzRCQUFBLElBQUcsTUFBTSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUMsQ0FBQztnQ0FBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO2dDQUFBLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDO29DQUFBLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0NBQUEsS0FBSSxJQUFJLEVBQUUsR0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBQyxDQUFDO3dDQUFBLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzt3Q0FBQSxJQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBQyxDQUFDOzRDQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyx5QkFBeUIsR0FBRyxFQUFFLEdBQUMsWUFBWSxHQUFHLEVBQUUsRUFBQyxVQUFVLEVBQUMsb0ZBQW9GLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQzs0Q0FBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnREFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0Q0FBQSxDQUFDO2lEQUFLLENBQUM7Z0RBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs0Q0FBQSxDQUFDOzRDQUFBLE1BQU0sRUFBRSxDQUFDO3dDQUFBLENBQUM7b0NBQUEsQ0FBQztnQ0FBQSxDQUFDO3FDQUFLLENBQUM7b0NBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLHlCQUF5QixHQUFHLEVBQUUsR0FBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLDhFQUE4RSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQztvQ0FBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQzt3Q0FBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO3lDQUFLLENBQUM7d0NBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO29DQUFBLE1BQU0sRUFBRSxDQUFDO2dDQUFBLENBQUM7NEJBQUEsQ0FBQzs0QkFBQSxJQUFHLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFDLENBQUM7Z0NBQUEsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQ0FBQSxJQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBQyxDQUFDO29DQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyx5QkFBeUIsR0FBRyxFQUFFLEdBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQywrRUFBK0UsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQztvQ0FBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQzt3Q0FBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO3lDQUFLLENBQUM7d0NBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO29DQUFBLE1BQU0sRUFBRSxDQUFDO2dDQUFBLENBQUM7Z0NBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDO29DQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyx5QkFBeUIsR0FBRyxFQUFFLEdBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQywrRUFBK0UsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyw0Q0FBNEMsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDO29DQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO3dDQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUFBLENBQUM7eUNBQUssQ0FBQzt3Q0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUFBLENBQUM7b0NBQUEsTUFBTSxFQUFFLENBQUM7Z0NBQUEsQ0FBQzs0QkFBQSxDQUFDO3dCQUFBLENBQUM7NkJBQUssQ0FBQzs0QkFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMseUJBQXlCLEdBQUcsRUFBRSxFQUFDLFVBQVUsRUFBQywwREFBMEQsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDOzRCQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dDQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUFBLENBQUM7aUNBQUssQ0FBQztnQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUFBLENBQUM7NEJBQUEsTUFBTSxFQUFFLENBQUM7d0JBQUEsQ0FBQztvQkFBQSxDQUFDO2dCQUFBLENBQUM7cUJBQUssQ0FBQztvQkFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsd0JBQXdCLEVBQUMsVUFBVSxFQUFDLG9EQUFvRCxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQztvQkFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQzt3QkFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFBQSxDQUFDO3lCQUFLLENBQUM7d0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFBQSxDQUFDO29CQUFBLE1BQU0sRUFBRSxDQUFDO2dCQUFBLENBQUM7WUFBQSxDQUFDO1lBQUEsSUFBRyxLQUFLLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBQyxDQUFDO2dCQUFBLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7Z0JBQUEsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUM7b0JBQUEsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFBQSxLQUFJLElBQUksRUFBRSxHQUFDLENBQUMsRUFBRSxFQUFFLEdBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFDLENBQUM7d0JBQUEsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUFBLElBQUcsTUFBTSxJQUFJLE9BQU8sTUFBTSxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQzs0QkFBQSxJQUFHLE1BQU0sQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFDLENBQUM7Z0NBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLDRCQUE0QixHQUFHLEVBQUUsRUFBQyxVQUFVLEVBQUMsaUVBQWlFLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxlQUFlLEVBQUUsVUFBVSxFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLFVBQVUsR0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDO2dDQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO29DQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUFBLENBQUM7cUNBQUssQ0FBQztvQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUFBLENBQUM7Z0NBQUEsTUFBTSxFQUFFLENBQUM7NEJBQUEsQ0FBQzs0QkFBQSxJQUFHLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFDLENBQUM7Z0NBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLDRCQUE0QixHQUFHLEVBQUUsRUFBQyxVQUFVLEVBQUMsaUVBQWlFLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxlQUFlLEVBQUUsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLFdBQVcsR0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDO2dDQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO29DQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUFBLENBQUM7cUNBQUssQ0FBQztvQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUFBLENBQUM7Z0NBQUEsTUFBTSxFQUFFLENBQUM7NEJBQUEsQ0FBQzs0QkFBQSxLQUFJLE1BQU0sSUFBSSxJQUFJLE1BQU0sRUFBQyxDQUFDO2dDQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQztvQ0FBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsNEJBQTRCLEdBQUcsRUFBRSxFQUFDLFVBQVUsRUFBQyw2RUFBNkUsRUFBQyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxFQUFDLEVBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLHFDQUFxQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQztvQ0FBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQzt3Q0FBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO3lDQUFLLENBQUM7d0NBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO29DQUFBLE1BQU0sRUFBRSxDQUFDO2dDQUFBLENBQUM7NEJBQUEsQ0FBQzs0QkFBQSxJQUFHLE1BQU0sQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFDLENBQUM7Z0NBQUEsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQ0FBQSxJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQztvQ0FBQSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO29DQUFBLEtBQUksSUFBSSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUMsQ0FBQzt3Q0FBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7d0NBQUEsSUFBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUMsQ0FBQzs0Q0FBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsNEJBQTRCLEdBQUcsRUFBRSxHQUFDLFlBQVksR0FBRyxFQUFFLEVBQUMsVUFBVSxFQUFDLHVGQUF1RixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7NENBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0RBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7NENBQUEsQ0FBQztpREFBSyxDQUFDO2dEQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7NENBQUEsQ0FBQzs0Q0FBQSxNQUFNLEVBQUUsQ0FBQzt3Q0FBQSxDQUFDO29DQUFBLENBQUM7Z0NBQUEsQ0FBQztxQ0FBSyxDQUFDO29DQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyw0QkFBNEIsR0FBRyxFQUFFLEdBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyxpRkFBaUYsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7b0NBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7d0NBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQUEsQ0FBQzt5Q0FBSyxDQUFDO3dDQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQUEsQ0FBQztvQ0FBQSxNQUFNLEVBQUUsQ0FBQztnQ0FBQSxDQUFDOzRCQUFBLENBQUM7NEJBQUEsSUFBRyxNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBQyxDQUFDO2dDQUFBLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0NBQUEsSUFBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUMsQ0FBQztvQ0FBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsNEJBQTRCLEdBQUcsRUFBRSxHQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsa0ZBQWtGLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7b0NBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7d0NBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQUEsQ0FBQzt5Q0FBSyxDQUFDO3dDQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQUEsQ0FBQztvQ0FBQSxNQUFNLEVBQUUsQ0FBQztnQ0FBQSxDQUFDO2dDQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQztvQ0FBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsNEJBQTRCLEdBQUcsRUFBRSxHQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsa0ZBQWtGLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsRUFBQyxPQUFPLEVBQUMsNENBQTRDLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQztvQ0FBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQzt3Q0FBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO3lDQUFLLENBQUM7d0NBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO29DQUFBLE1BQU0sRUFBRSxDQUFDO2dDQUFBLENBQUM7NEJBQUEsQ0FBQzt3QkFBQSxDQUFDOzZCQUFLLENBQUM7NEJBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLDRCQUE0QixHQUFHLEVBQUUsRUFBQyxVQUFVLEVBQUMsNkRBQTZELEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQzs0QkFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQ0FBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFBQSxDQUFDO2lDQUFLLENBQUM7Z0NBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFBQSxDQUFDOzRCQUFBLE1BQU0sRUFBRSxDQUFDO3dCQUFBLENBQUM7b0JBQUEsQ0FBQztnQkFBQSxDQUFDO3FCQUFLLENBQUM7b0JBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLDJCQUEyQixFQUFDLFVBQVUsRUFBQyx1REFBdUQsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7b0JBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7d0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQUEsQ0FBQzt5QkFBSyxDQUFDO3dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQUEsQ0FBQztvQkFBQSxNQUFNLEVBQUUsQ0FBQztnQkFBQSxDQUFDO1lBQUEsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLGNBQWMsRUFBQyxVQUFVLEVBQUMsK0JBQStCLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQztZQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dCQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUEsQ0FBQztpQkFBSyxDQUFDO2dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQUEsTUFBTSxFQUFFLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztBQUFBLENBQUM7S0FBSyxDQUFDO0lBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsQ0FBQztJQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO1FBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFBQSxDQUFDO1NBQUssQ0FBQztRQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFBQSxDQUFDO0lBQUEsTUFBTSxFQUFFLENBQUM7QUFBQSxDQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQSxPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO0FBQUEsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxHQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxHQUFDLElBQUksRUFBQyxHQUFDLEVBQUUsSUFBRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxJQUFHLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyx1QkFBdUIsS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUFBLElBQUcsS0FBSyxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztZQUFBLElBQUcsS0FBSyxDQUFDLEVBQUUsS0FBSyxTQUFTLEVBQUMsQ0FBQztnQkFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsMEJBQTBCLEVBQUMsVUFBVSxFQUFDLCtDQUErQyxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsZUFBZSxFQUFFLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQywrQkFBK0IsR0FBQyxJQUFJLEdBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7Z0JBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7b0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQUEsQ0FBQztxQkFBSyxDQUFDO29CQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQUEsQ0FBQztnQkFBQSxNQUFNLEVBQUUsQ0FBQztZQUFBLENBQUM7WUFBQSxJQUFHLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxTQUFTLEVBQUMsQ0FBQztnQkFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsMEJBQTBCLEVBQUMsVUFBVSxFQUFDLCtDQUErQyxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsZUFBZSxFQUFFLG1CQUFtQixFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLG1CQUFtQixHQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO2dCQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO29CQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUFBLENBQUM7cUJBQUssQ0FBQztvQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUFBLENBQUM7Z0JBQUEsTUFBTSxFQUFFLENBQUM7WUFBQSxDQUFDO1lBQUEsS0FBSSxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUMsQ0FBQztnQkFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLHlCQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUMsQ0FBQztvQkFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsMEJBQTBCLEVBQUMsVUFBVSxFQUFDLDJEQUEyRCxFQUFDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLEVBQUMsRUFBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsRUFBQyxPQUFPLEVBQUMscUNBQXFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7b0JBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7d0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUEsQ0FBQzt5QkFBSyxDQUFDO3dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUEsQ0FBQztvQkFBQSxNQUFNLEVBQUUsQ0FBQztnQkFBQSxDQUFDO1lBQUEsQ0FBQztZQUFBLElBQUcsS0FBSyxDQUFDLEVBQUUsS0FBSyxTQUFTLEVBQUMsQ0FBQztnQkFBQSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7b0JBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLDZCQUE2QixFQUFDLFVBQVUsRUFBQyx5REFBeUQsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7b0JBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7d0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUEsQ0FBQzt5QkFBSyxDQUFDO3dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUEsQ0FBQztvQkFBQSxNQUFNLEVBQUUsQ0FBQztnQkFBQSxDQUFDO1lBQUEsQ0FBQztZQUFBLElBQUcsS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUMsQ0FBQztnQkFBQSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7b0JBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLCtCQUErQixFQUFDLFVBQVUsRUFBQywyREFBMkQsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7b0JBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7d0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUEsQ0FBQzt5QkFBSyxDQUFDO3dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUEsQ0FBQztvQkFBQSxNQUFNLEVBQUUsQ0FBQztnQkFBQSxDQUFDO1lBQUEsQ0FBQztZQUFBLElBQUcsS0FBSyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUMsQ0FBQztnQkFBQSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7b0JBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLGtDQUFrQyxFQUFDLFVBQVUsRUFBQyw4REFBOEQsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7b0JBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7d0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUEsQ0FBQzt5QkFBSyxDQUFDO3dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUEsQ0FBQztvQkFBQSxNQUFNLEVBQUUsQ0FBQztnQkFBQSxDQUFDO1lBQUEsQ0FBQztZQUFBLElBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUMsQ0FBQztnQkFBQSxJQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsaUNBQWlDLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7b0JBQUEsT0FBTyxHQUFHLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUFBLENBQUM7WUFBQSxDQUFDO1lBQUEsSUFBRyxLQUFLLENBQUMsdUJBQXVCLEtBQUssU0FBUyxFQUFDLENBQUM7Z0JBQUEsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLHVCQUF1QixDQUFDO2dCQUFBLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO29CQUFBLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQUEsS0FBSSxJQUFJLEVBQUUsR0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBQyxDQUFDO3dCQUFBLElBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLG1EQUFtRCxHQUFHLEVBQUUsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQzs0QkFBQSxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7d0JBQUEsQ0FBQztvQkFBQSxDQUFDO2dCQUFBLENBQUM7cUJBQUssQ0FBQztvQkFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsa0RBQWtELEVBQUMsVUFBVSxFQUFDLDhFQUE4RSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO29CQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO3dCQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUFBLENBQUM7eUJBQUssQ0FBQzt3QkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUFBLENBQUM7b0JBQUEsTUFBTSxFQUFFLENBQUM7Z0JBQUEsQ0FBQztZQUFBLENBQUM7WUFBQSxJQUFHLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxTQUFTLEVBQUMsQ0FBQztnQkFBQSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUM7Z0JBQUEsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7b0JBQUEsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFBQSxLQUFJLElBQUksRUFBRSxHQUFDLENBQUMsRUFBRSxFQUFFLEdBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFDLENBQUM7d0JBQUEsSUFBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsNkNBQTZDLEdBQUcsRUFBRSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDOzRCQUFBLE9BQU8sR0FBRyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFBQSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQzt3QkFBQSxDQUFDO29CQUFBLENBQUM7Z0JBQUEsQ0FBQztxQkFBSyxDQUFDO29CQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyw0Q0FBNEMsRUFBQyxVQUFVLEVBQUMsd0VBQXdFLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7b0JBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7d0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUEsQ0FBQzt5QkFBSyxDQUFDO3dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUEsQ0FBQztvQkFBQSxNQUFNLEVBQUUsQ0FBQztnQkFBQSxDQUFDO1lBQUEsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLDBCQUEwQixFQUFDLFVBQVUsRUFBQywyQ0FBMkMsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLHVCQUF1QixFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQztZQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dCQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztpQkFBSyxDQUFDO2dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQUEsTUFBTSxFQUFFLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztBQUFBLENBQUM7S0FBSyxDQUFDO0lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsQ0FBQztJQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO1FBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQSxDQUFDO1NBQUssQ0FBQztRQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQSxDQUFDO0lBQUEsTUFBTSxFQUFFLENBQUM7QUFBQSxDQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQSxPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDIn0=