"use strict";
module.exports = validate42;
module.exports.default = validate42;
const schema12 = { "$schema": "http://json-schema.org/draft-07/schema#", "title": "Presentation Definition", "definitions": { "issuance": { "type": "object", "properties": { "manifest": { "type": "string" } }, "additionalProperties": true }, "format": { "type": "object", "properties": { "vc+sd-jwt": { "type": "object", "properties": { "sd-jwt_alg_values": { "type": "array", "description": "A JSON array containing identifiers of cryptographic algorithms the verifier supports for protection of a SD-JWT. If present, the alg JOSE header (as defined in [RFC7515]) of the presented SD-JWT MUST match one of the array values.", "minItems": 1, "items": { "type": "string" } }, "kb-jwt_alg_values": { "type": "array", "description": "A JSON array containing identifiers of cryptographic algorithms the verifier supports for protection of a KB-JWT. If present, the alg JOSE header (as defined in [RFC7515]) of the presented KB-JWT MUST match one of the array values.", "minItems": 1, "items": { "type": "string" } } }, "required": [], "additionalProperties": false } }, "patternProperties": { "^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$|^mso_mdoc$": { "type": "object", "properties": { "alg": { "type": "array", "minItems": 1, "items": { "type": "string" } } }, "required": ["alg"], "additionalProperties": false }, "^ldp_vc$|^ldp_vp$|^ldp$": { "type": "object", "properties": { "proof_type": { "type": "array", "minItems": 1, "items": { "type": "string" } } }, "required": ["proof_type"], "additionalProperties": false }, "^di_vc$|^di_vp$|^di$": { "type": "object", "properties": { "proof_type": { "type": "array", "minItems": 1, "items": { "type": "string" } }, "cryptosuite": { "type": "array", "minItems": 1, "items": { "type": "string" } } }, "required": ["proof_type", "cryptosuite"], "additionalProperties": false }, "additionalProperties": false }, "additionalProperties": false }, "submission_requirements": { "type": "object", "oneOf": [{ "properties": { "name": { "type": "string" }, "purpose": { "type": "string" }, "rule": { "type": "string", "enum": ["all", "pick"] }, "count": { "type": "integer", "minimum": 1 }, "min": { "type": "integer", "minimum": 0 }, "max": { "type": "integer", "minimum": 0 }, "from": { "type": "string" } }, "required": ["rule", "from"], "additionalProperties": false }, { "properties": { "name": { "type": "string" }, "purpose": { "type": "string" }, "rule": { "type": "string", "enum": ["all", "pick"] }, "count": { "type": "integer", "minimum": 1 }, "min": { "type": "integer", "minimum": 0 }, "max": { "type": "integer", "minimum": 0 }, "from_nested": { "type": "array", "minItems": 1, "items": { "$ref": "#/definitions/submission_requirements" } } }, "required": ["rule", "from_nested"], "additionalProperties": false }] }, "input_descriptors": { "type": "object", "properties": { "id": { "type": "string" }, "name": { "type": "string" }, "purpose": { "type": "string" }, "issuance": { "type": "array", "items": { "$ref": "#/definitions/issuance" } }, "group": { "type": "array", "items": { "type": "string" } }, "format": { "$ref": "#/definitions/format" }, "constraints": { "type": "object", "properties": { "limit_disclosure": { "type": "string", "enum": ["required", "preferred"] }, "statuses": { "type": "object", "properties": { "active": { "type": "object", "properties": { "directive": { "type": "string", "enum": ["required", "allowed", "disallowed"] } } }, "suspended": { "type": "object", "properties": { "directive": { "type": "string", "enum": ["required", "allowed", "disallowed"] } } }, "revoked": { "type": "object", "properties": { "directive": { "type": "string", "enum": ["required", "allowed", "disallowed"] } } } } }, "fields": { "type": "array", "items": { "$ref": "#/definitions/field" } }, "subject_is_issuer": { "type": "string", "enum": ["required", "preferred"] }, "is_holder": { "type": "array", "items": { "type": "object", "properties": { "field_id": { "type": "array", "items": { "type": "string" } }, "directive": { "type": "string", "enum": ["required", "preferred"] } }, "required": ["field_id", "directive"], "additionalProperties": false } }, "same_subject": { "type": "array", "items": { "type": "object", "properties": { "field_id": { "type": "array", "items": { "type": "string" } }, "directive": { "type": "string", "enum": ["required", "preferred"] } }, "required": ["field_id", "directive"], "additionalProperties": false } } }, "additionalProperties": false } }, "required": ["id"], "additionalProperties": false }, "field": { "type": "object", "oneOf": [{ "properties": { "id": { "type": "string" }, "path": { "type": "array", "items": { "type": "string" } }, "purpose": { "type": "string" }, "intent_to_retain": { "type": "boolean" }, "filter": { "$ref": "http://json-schema.org/schema#" }, "name": { "type": "string" } }, "required": ["path"], "additionalProperties": false }, { "properties": { "id": { "type": "string" }, "path": { "type": "array", "items": { "type": "string" } }, "purpose": { "type": "string" }, "intent_to_retain": { "type": "boolean" }, "filter": { "$ref": "http://json-schema.org/schema#" }, "predicate": { "type": "string", "enum": ["required", "preferred"] }, "name": { "type": "string" } }, "required": ["path", "filter", "predicate"], "additionalProperties": false }] } }, "type": "object", "properties": { "presentation_definition": { "type": "object", "properties": { "id": { "type": "string" }, "name": { "type": "string" }, "purpose": { "type": "string" }, "format": { "$ref": "#/definitions/format" }, "frame": { "type": "object", "additionalProperties": true }, "submission_requirements": { "type": "array", "items": { "$ref": "#/definitions/submission_requirements" } }, "input_descriptors": { "type": "array", "items": { "$ref": "#/definitions/input_descriptors" } } }, "required": ["id", "input_descriptors"], "additionalProperties": false } } };
const schema13 = { "type": "object", "properties": { "vc+sd-jwt": { "type": "object", "properties": { "sd-jwt_alg_values": { "type": "array", "description": "A JSON array containing identifiers of cryptographic algorithms the verifier supports for protection of a SD-JWT. If present, the alg JOSE header (as defined in [RFC7515]) of the presented SD-JWT MUST match one of the array values.", "minItems": 1, "items": { "type": "string" } }, "kb-jwt_alg_values": { "type": "array", "description": "A JSON array containing identifiers of cryptographic algorithms the verifier supports for protection of a KB-JWT. If present, the alg JOSE header (as defined in [RFC7515]) of the presented KB-JWT MUST match one of the array values.", "minItems": 1, "items": { "type": "string" } } }, "required": [], "additionalProperties": false } }, "patternProperties": { "^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$|^mso_mdoc$": { "type": "object", "properties": { "alg": { "type": "array", "minItems": 1, "items": { "type": "string" } } }, "required": ["alg"], "additionalProperties": false }, "^ldp_vc$|^ldp_vp$|^ldp$": { "type": "object", "properties": { "proof_type": { "type": "array", "minItems": 1, "items": { "type": "string" } } }, "required": ["proof_type"], "additionalProperties": false }, "^di_vc$|^di_vp$|^di$": { "type": "object", "properties": { "proof_type": { "type": "array", "minItems": 1, "items": { "type": "string" } }, "cryptosuite": { "type": "array", "minItems": 1, "items": { "type": "string" } } }, "required": ["proof_type", "cryptosuite"], "additionalProperties": false }, "additionalProperties": false }, "additionalProperties": false };
const pattern0 = new RegExp("^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$|^mso_mdoc$", "u");
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
                    const err9 = { instancePath: instancePath + "/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/%5Ejwt%24%7C%5Ejwt_vc%24%7C%5Ejwt_vc_json%24%7C%5Ejwt_vp%24%7C%5Ejwt_vp_json%24%7C%5Emso_mdoc%24/required", keyword: "required", params: { missingProperty: "alg" }, message: "must have required property '" + "alg" + "'", schema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$|^mso_mdoc$"].required, parentSchema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$|^mso_mdoc$"], data: data5 };
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
                        const err10 = { instancePath: instancePath + "/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/%5Ejwt%24%7C%5Ejwt_vc%24%7C%5Ejwt_vc_json%24%7C%5Ejwt_vp%24%7C%5Ejwt_vp_json%24%7C%5Emso_mdoc%24/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties", schema: false, parentSchema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$|^mso_mdoc$"], data: data5 };
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
                            const err11 = { instancePath: instancePath + "/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/alg", schemaPath: "#/patternProperties/%5Ejwt%24%7C%5Ejwt_vc%24%7C%5Ejwt_vc_json%24%7C%5Ejwt_vp%24%7C%5Ejwt_vp_json%24%7C%5Emso_mdoc%24/properties/alg/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$|^mso_mdoc$"].properties.alg, data: data6 };
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
                                const err12 = { instancePath: instancePath + "/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/alg/" + i2, schemaPath: "#/patternProperties/%5Ejwt%24%7C%5Ejwt_vc%24%7C%5Ejwt_vc_json%24%7C%5Ejwt_vp%24%7C%5Ejwt_vp_json%24%7C%5Emso_mdoc%24/properties/alg/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$|^mso_mdoc$"].properties.alg.items.type, parentSchema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$|^mso_mdoc$"].properties.alg.items, data: data7 };
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
                        const err13 = { instancePath: instancePath + "/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/alg", schemaPath: "#/patternProperties/%5Ejwt%24%7C%5Ejwt_vc%24%7C%5Ejwt_vc_json%24%7C%5Ejwt_vp%24%7C%5Ejwt_vp_json%24%7C%5Emso_mdoc%24/properties/alg/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$|^mso_mdoc$"].properties.alg.type, parentSchema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$|^mso_mdoc$"].properties.alg, data: data6 };
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
                const err14 = { instancePath: instancePath + "/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/patternProperties/%5Ejwt%24%7C%5Ejwt_vc%24%7C%5Ejwt_vc_json%24%7C%5Ejwt_vp%24%7C%5Ejwt_vp_json%24%7C%5Emso_mdoc%24/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$|^mso_mdoc$"].type, parentSchema: schema13.patternProperties["^jwt$|^jwt_vc$|^jwt_vc_json$|^jwt_vp$|^jwt_vp_json$|^mso_mdoc$"], data: data5 };
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
const schema15 = { "type": "object", "properties": { "id": { "type": "string" }, "name": { "type": "string" }, "purpose": { "type": "string" }, "issuance": { "type": "array", "items": { "$ref": "#/definitions/issuance" } }, "group": { "type": "array", "items": { "type": "string" } }, "format": { "$ref": "#/definitions/format" }, "constraints": { "type": "object", "properties": { "limit_disclosure": { "type": "string", "enum": ["required", "preferred"] }, "statuses": { "type": "object", "properties": { "active": { "type": "object", "properties": { "directive": { "type": "string", "enum": ["required", "allowed", "disallowed"] } } }, "suspended": { "type": "object", "properties": { "directive": { "type": "string", "enum": ["required", "allowed", "disallowed"] } } }, "revoked": { "type": "object", "properties": { "directive": { "type": "string", "enum": ["required", "allowed", "disallowed"] } } } } }, "fields": { "type": "array", "items": { "$ref": "#/definitions/field" } }, "subject_is_issuer": { "type": "string", "enum": ["required", "preferred"] }, "is_holder": { "type": "array", "items": { "type": "object", "properties": { "field_id": { "type": "array", "items": { "type": "string" } }, "directive": { "type": "string", "enum": ["required", "preferred"] } }, "required": ["field_id", "directive"], "additionalProperties": false } }, "same_subject": { "type": "array", "items": { "type": "object", "properties": { "field_id": { "type": "array", "items": { "type": "string" } }, "directive": { "type": "string", "enum": ["required", "preferred"] } }, "required": ["field_id", "directive"], "additionalProperties": false } } }, "additionalProperties": false } }, "required": ["id"], "additionalProperties": false };
const schema16 = { "type": "object", "properties": { "manifest": { "type": "string" } }, "additionalProperties": true };
function validate48(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.manifest !== undefined) {
        let data0 = data.manifest;
        if (typeof data0 !== "string") {
            const err0 = { instancePath: instancePath + "/manifest", schemaPath: "#/properties/manifest/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema16.properties.manifest.type, parentSchema: schema16.properties.manifest, data: data0 };
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
    const err1 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema16.type, parentSchema: schema16, data };
    if (vErrors === null) {
        vErrors = [err1];
    }
    else {
        vErrors.push(err1);
    }
    errors++;
} validate48.errors = vErrors; return errors === 0; }
const schema17 = { "type": "object", "oneOf": [{ "properties": { "id": { "type": "string" }, "path": { "type": "array", "items": { "type": "string" } }, "purpose": { "type": "string" }, "intent_to_retain": { "type": "boolean" }, "filter": { "$ref": "http://json-schema.org/schema#" }, "name": { "type": "string" } }, "required": ["path"], "additionalProperties": false }, { "properties": { "id": { "type": "string" }, "path": { "type": "array", "items": { "type": "string" } }, "purpose": { "type": "string" }, "intent_to_retain": { "type": "boolean" }, "filter": { "$ref": "http://json-schema.org/schema#" }, "predicate": { "type": "string", "enum": ["required", "preferred"] }, "name": { "type": "string" } }, "required": ["path", "filter", "predicate"], "additionalProperties": false }] };
const schema6 = { "$schema": "http://json-schema.org/draft-07/schema#", "$id": "http://json-schema.org/draft-07/schema#", "title": "Core schema meta-schema", "definitions": { "schemaArray": { "type": "array", "minItems": 1, "items": { "$ref": "#" } }, "nonNegativeInteger": { "type": "integer", "minimum": 0 }, "nonNegativeIntegerDefault0": { "allOf": [{ "$ref": "#/definitions/nonNegativeInteger" }, { "default": 0 }] }, "simpleTypes": { "enum": ["array", "boolean", "integer", "null", "number", "object", "string"] }, "stringArray": { "type": "array", "items": { "type": "string" }, "uniqueItems": true, "default": [] } }, "type": ["object", "boolean"], "properties": { "$id": { "type": "string", "format": "uri-reference" }, "$schema": { "type": "string", "format": "uri" }, "$ref": { "type": "string", "format": "uri-reference" }, "$comment": { "type": "string" }, "title": { "type": "string" }, "description": { "type": "string" }, "default": true, "readOnly": { "type": "boolean", "default": false }, "examples": { "type": "array", "items": true }, "multipleOf": { "type": "number", "exclusiveMinimum": 0 }, "maximum": { "type": "number" }, "exclusiveMaximum": { "type": "number" }, "minimum": { "type": "number" }, "exclusiveMinimum": { "type": "number" }, "maxLength": { "$ref": "#/definitions/nonNegativeInteger" }, "minLength": { "$ref": "#/definitions/nonNegativeIntegerDefault0" }, "pattern": { "type": "string", "format": "regex" }, "additionalItems": { "$ref": "#" }, "items": { "anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/schemaArray" }], "default": true }, "maxItems": { "$ref": "#/definitions/nonNegativeInteger" }, "minItems": { "$ref": "#/definitions/nonNegativeIntegerDefault0" }, "uniqueItems": { "type": "boolean", "default": false }, "contains": { "$ref": "#" }, "maxProperties": { "$ref": "#/definitions/nonNegativeInteger" }, "minProperties": { "$ref": "#/definitions/nonNegativeIntegerDefault0" }, "required": { "$ref": "#/definitions/stringArray" }, "additionalProperties": { "$ref": "#" }, "definitions": { "type": "object", "additionalProperties": { "$ref": "#" }, "default": {} }, "properties": { "type": "object", "additionalProperties": { "$ref": "#" }, "default": {} }, "patternProperties": { "type": "object", "additionalProperties": { "$ref": "#" }, "propertyNames": { "format": "regex" }, "default": {} }, "dependencies": { "type": "object", "additionalProperties": { "anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/stringArray" }] } }, "propertyNames": { "$ref": "#" }, "const": true, "enum": { "type": "array", "items": true, "minItems": 1, "uniqueItems": true }, "type": { "anyOf": [{ "$ref": "#/definitions/simpleTypes" }, { "type": "array", "items": { "$ref": "#/definitions/simpleTypes" }, "minItems": 1, "uniqueItems": true }] }, "format": { "type": "string" }, "contentMediaType": { "type": "string" }, "contentEncoding": { "type": "string" }, "if": { "$ref": "#" }, "then": { "$ref": "#" }, "else": { "$ref": "#" }, "allOf": { "$ref": "#/definitions/schemaArray" }, "anyOf": { "$ref": "#/definitions/schemaArray" }, "oneOf": { "$ref": "#/definitions/schemaArray" }, "not": { "$ref": "#" } }, "default": true };
const schema7 = { "type": "integer", "minimum": 0 };
function validate22(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (!((typeof data == "number") && (!(data % 1) && !isNaN(data)))) {
    const err0 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema7.type, parentSchema: schema7, data };
    if (vErrors === null) {
        vErrors = [err0];
    }
    else {
        vErrors.push(err0);
    }
    errors++;
} if (typeof data == "number") {
    if (data < 0 || isNaN(data)) {
        const err1 = { instancePath, schemaPath: "#/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema7, data };
        if (vErrors === null) {
            vErrors = [err1];
        }
        else {
            vErrors.push(err1);
        }
        errors++;
    }
} validate22.errors = vErrors; return errors === 0; }
const schema8 = { "allOf": [{ "$ref": "#/definitions/nonNegativeInteger" }, { "default": 0 }] };
function validate24(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (!(validate22(data, { instancePath, parentData, parentDataProperty, rootData }))) {
    vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
    errors = vErrors.length;
} validate24.errors = vErrors; return errors === 0; }
const schema9 = { "type": "array", "minItems": 1, "items": { "$ref": "#" } };
const root1 = { validate: validate21 };
function validate27(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (Array.isArray(data)) {
    if (data.length < 1) {
        const err0 = { instancePath, schemaPath: "#/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema9, data };
        if (vErrors === null) {
            vErrors = [err0];
        }
        else {
            vErrors.push(err0);
        }
        errors++;
    }
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
        if (!(root1.validate(data[i0], { instancePath: instancePath + "/" + i0, parentData: data, parentDataProperty: i0, rootData }))) {
            vErrors = vErrors === null ? root1.validate.errors : vErrors.concat(root1.validate.errors);
            errors = vErrors.length;
        }
    }
}
else {
    const err1 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema9.type, parentSchema: schema9, data };
    if (vErrors === null) {
        vErrors = [err1];
    }
    else {
        vErrors.push(err1);
    }
    errors++;
} validate27.errors = vErrors; return errors === 0; }
const schema10 = { "type": "array", "items": { "type": "string" }, "uniqueItems": true, "default": [] };
function validate33(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (Array.isArray(data)) {
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
        let data0 = data[i0];
        if (typeof data0 !== "string") {
            const err0 = { instancePath: instancePath + "/" + i0, schemaPath: "#/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema10.items.type, parentSchema: schema10.items, data: data0 };
            if (vErrors === null) {
                vErrors = [err0];
            }
            else {
                vErrors.push(err0);
            }
            errors++;
        }
    }
    let i1 = data.length;
    let j0;
    if (i1 > 1) {
        const indices0 = {};
        for (; i1--;) {
            let item0 = data[i1];
            if (typeof item0 !== "string") {
                continue;
            }
            if (typeof indices0[item0] == "number") {
                j0 = indices0[item0];
                const err1 = { instancePath, schemaPath: "#/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)", schema: true, parentSchema: schema10, data };
                if (vErrors === null) {
                    vErrors = [err1];
                }
                else {
                    vErrors.push(err1);
                }
                errors++;
                break;
            }
            indices0[item0] = i1;
        }
    }
}
else {
    const err2 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema10.type, parentSchema: schema10, data };
    if (vErrors === null) {
        vErrors = [err2];
    }
    else {
        vErrors.push(err2);
    }
    errors++;
} validate33.errors = vErrors; return errors === 0; }
const schema11 = { "enum": ["array", "boolean", "integer", "null", "number", "object", "string"] };
function validate36(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (!(((((((data === "array") || (data === "boolean")) || (data === "integer")) || (data === "null")) || (data === "number")) || (data === "object")) || (data === "string"))) {
    const err0 = { instancePath, schemaPath: "#/enum", keyword: "enum", params: { allowedValues: schema11.enum }, message: "must be equal to one of the allowed values", schema: schema11.enum, parentSchema: schema11, data };
    if (vErrors === null) {
        vErrors = [err0];
    }
    else {
        vErrors.push(err0);
    }
    errors++;
} validate36.errors = vErrors; return errors === 0; }
const func0 = require("ajv/dist/runtime/equal").default;
function validate21(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="http://json-schema.org/draft-07/schema#" */ ; let vErrors = null; let errors = 0; if ((!(data && typeof data == "object" && !Array.isArray(data))) && (typeof data !== "boolean")) {
    const err0 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: schema6.type }, message: "must be object,boolean", schema: schema6.type, parentSchema: schema6, data };
    if (vErrors === null) {
        vErrors = [err0];
    }
    else {
        vErrors.push(err0);
    }
    errors++;
} if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.$id !== undefined) {
        let data0 = data.$id;
        if (!(typeof data0 === "string")) {
            const err1 = { instancePath: instancePath + "/$id", schemaPath: "#/properties/%24id/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema6.properties.$id.type, parentSchema: schema6.properties.$id, data: data0 };
            if (vErrors === null) {
                vErrors = [err1];
            }
            else {
                vErrors.push(err1);
            }
            errors++;
        }
    }
    if (data.$schema !== undefined) {
        let data1 = data.$schema;
        if (!(typeof data1 === "string")) {
            const err2 = { instancePath: instancePath + "/$schema", schemaPath: "#/properties/%24schema/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema6.properties.$schema.type, parentSchema: schema6.properties.$schema, data: data1 };
            if (vErrors === null) {
                vErrors = [err2];
            }
            else {
                vErrors.push(err2);
            }
            errors++;
        }
    }
    if (data.$ref !== undefined) {
        let data2 = data.$ref;
        if (!(typeof data2 === "string")) {
            const err3 = { instancePath: instancePath + "/$ref", schemaPath: "#/properties/%24ref/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema6.properties.$ref.type, parentSchema: schema6.properties.$ref, data: data2 };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
    }
    if (data.$comment !== undefined) {
        let data3 = data.$comment;
        if (typeof data3 !== "string") {
            const err4 = { instancePath: instancePath + "/$comment", schemaPath: "#/properties/%24comment/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema6.properties.$comment.type, parentSchema: schema6.properties.$comment, data: data3 };
            if (vErrors === null) {
                vErrors = [err4];
            }
            else {
                vErrors.push(err4);
            }
            errors++;
        }
    }
    if (data.title !== undefined) {
        let data4 = data.title;
        if (typeof data4 !== "string") {
            const err5 = { instancePath: instancePath + "/title", schemaPath: "#/properties/title/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema6.properties.title.type, parentSchema: schema6.properties.title, data: data4 };
            if (vErrors === null) {
                vErrors = [err5];
            }
            else {
                vErrors.push(err5);
            }
            errors++;
        }
    }
    if (data.description !== undefined) {
        let data5 = data.description;
        if (typeof data5 !== "string") {
            const err6 = { instancePath: instancePath + "/description", schemaPath: "#/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema6.properties.description.type, parentSchema: schema6.properties.description, data: data5 };
            if (vErrors === null) {
                vErrors = [err6];
            }
            else {
                vErrors.push(err6);
            }
            errors++;
        }
    }
    if (data.readOnly !== undefined) {
        let data6 = data.readOnly;
        if (typeof data6 !== "boolean") {
            const err7 = { instancePath: instancePath + "/readOnly", schemaPath: "#/properties/readOnly/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean", schema: schema6.properties.readOnly.type, parentSchema: schema6.properties.readOnly, data: data6 };
            if (vErrors === null) {
                vErrors = [err7];
            }
            else {
                vErrors.push(err7);
            }
            errors++;
        }
    }
    if (data.examples !== undefined) {
        let data7 = data.examples;
        if (!(Array.isArray(data7))) {
            const err8 = { instancePath: instancePath + "/examples", schemaPath: "#/properties/examples/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema6.properties.examples.type, parentSchema: schema6.properties.examples, data: data7 };
            if (vErrors === null) {
                vErrors = [err8];
            }
            else {
                vErrors.push(err8);
            }
            errors++;
        }
    }
    if (data.multipleOf !== undefined) {
        let data8 = data.multipleOf;
        if (typeof data8 == "number") {
            if (data8 <= 0 || isNaN(data8)) {
                const err9 = { instancePath: instancePath + "/multipleOf", schemaPath: "#/properties/multipleOf/exclusiveMinimum", keyword: "exclusiveMinimum", params: { comparison: ">", limit: 0 }, message: "must be > 0", schema: 0, parentSchema: schema6.properties.multipleOf, data: data8 };
                if (vErrors === null) {
                    vErrors = [err9];
                }
                else {
                    vErrors.push(err9);
                }
                errors++;
            }
        }
        else {
            const err10 = { instancePath: instancePath + "/multipleOf", schemaPath: "#/properties/multipleOf/type", keyword: "type", params: { type: "number" }, message: "must be number", schema: schema6.properties.multipleOf.type, parentSchema: schema6.properties.multipleOf, data: data8 };
            if (vErrors === null) {
                vErrors = [err10];
            }
            else {
                vErrors.push(err10);
            }
            errors++;
        }
    }
    if (data.maximum !== undefined) {
        let data9 = data.maximum;
        if (!(typeof data9 == "number")) {
            const err11 = { instancePath: instancePath + "/maximum", schemaPath: "#/properties/maximum/type", keyword: "type", params: { type: "number" }, message: "must be number", schema: schema6.properties.maximum.type, parentSchema: schema6.properties.maximum, data: data9 };
            if (vErrors === null) {
                vErrors = [err11];
            }
            else {
                vErrors.push(err11);
            }
            errors++;
        }
    }
    if (data.exclusiveMaximum !== undefined) {
        let data10 = data.exclusiveMaximum;
        if (!(typeof data10 == "number")) {
            const err12 = { instancePath: instancePath + "/exclusiveMaximum", schemaPath: "#/properties/exclusiveMaximum/type", keyword: "type", params: { type: "number" }, message: "must be number", schema: schema6.properties.exclusiveMaximum.type, parentSchema: schema6.properties.exclusiveMaximum, data: data10 };
            if (vErrors === null) {
                vErrors = [err12];
            }
            else {
                vErrors.push(err12);
            }
            errors++;
        }
    }
    if (data.minimum !== undefined) {
        let data11 = data.minimum;
        if (!(typeof data11 == "number")) {
            const err13 = { instancePath: instancePath + "/minimum", schemaPath: "#/properties/minimum/type", keyword: "type", params: { type: "number" }, message: "must be number", schema: schema6.properties.minimum.type, parentSchema: schema6.properties.minimum, data: data11 };
            if (vErrors === null) {
                vErrors = [err13];
            }
            else {
                vErrors.push(err13);
            }
            errors++;
        }
    }
    if (data.exclusiveMinimum !== undefined) {
        let data12 = data.exclusiveMinimum;
        if (!(typeof data12 == "number")) {
            const err14 = { instancePath: instancePath + "/exclusiveMinimum", schemaPath: "#/properties/exclusiveMinimum/type", keyword: "type", params: { type: "number" }, message: "must be number", schema: schema6.properties.exclusiveMinimum.type, parentSchema: schema6.properties.exclusiveMinimum, data: data12 };
            if (vErrors === null) {
                vErrors = [err14];
            }
            else {
                vErrors.push(err14);
            }
            errors++;
        }
    }
    if (data.maxLength !== undefined) {
        if (!(validate22(data.maxLength, { instancePath: instancePath + "/maxLength", parentData: data, parentDataProperty: "maxLength", rootData }))) {
            vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
            errors = vErrors.length;
        }
    }
    if (data.minLength !== undefined) {
        if (!(validate24(data.minLength, { instancePath: instancePath + "/minLength", parentData: data, parentDataProperty: "minLength", rootData }))) {
            vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
            errors = vErrors.length;
        }
    }
    if (data.pattern !== undefined) {
        let data15 = data.pattern;
        if (!(typeof data15 === "string")) {
            const err15 = { instancePath: instancePath + "/pattern", schemaPath: "#/properties/pattern/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema6.properties.pattern.type, parentSchema: schema6.properties.pattern, data: data15 };
            if (vErrors === null) {
                vErrors = [err15];
            }
            else {
                vErrors.push(err15);
            }
            errors++;
        }
    }
    if (data.additionalItems !== undefined) {
        if (!(validate21(data.additionalItems, { instancePath: instancePath + "/additionalItems", parentData: data, parentDataProperty: "additionalItems", rootData }))) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
        }
    }
    if (data.items !== undefined) {
        let data17 = data.items;
        const _errs33 = errors;
        let valid1 = false;
        const _errs34 = errors;
        if (!(validate21(data17, { instancePath: instancePath + "/items", parentData: data, parentDataProperty: "items", rootData }))) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
        }
        var _valid0 = _errs34 === errors;
        valid1 = valid1 || _valid0;
        if (!valid1) {
            const _errs35 = errors;
            if (!(validate27(data17, { instancePath: instancePath + "/items", parentData: data, parentDataProperty: "items", rootData }))) {
                vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
                errors = vErrors.length;
            }
            var _valid0 = _errs35 === errors;
            valid1 = valid1 || _valid0;
        }
        if (!valid1) {
            const err16 = { instancePath: instancePath + "/items", schemaPath: "#/properties/items/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf", schema: schema6.properties.items.anyOf, parentSchema: schema6.properties.items, data: data17 };
            if (vErrors === null) {
                vErrors = [err16];
            }
            else {
                vErrors.push(err16);
            }
            errors++;
        }
        else {
            errors = _errs33;
            if (vErrors !== null) {
                if (_errs33) {
                    vErrors.length = _errs33;
                }
                else {
                    vErrors = null;
                }
            }
        }
    }
    if (data.maxItems !== undefined) {
        if (!(validate22(data.maxItems, { instancePath: instancePath + "/maxItems", parentData: data, parentDataProperty: "maxItems", rootData }))) {
            vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
            errors = vErrors.length;
        }
    }
    if (data.minItems !== undefined) {
        if (!(validate24(data.minItems, { instancePath: instancePath + "/minItems", parentData: data, parentDataProperty: "minItems", rootData }))) {
            vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
            errors = vErrors.length;
        }
    }
    if (data.uniqueItems !== undefined) {
        let data20 = data.uniqueItems;
        if (typeof data20 !== "boolean") {
            const err17 = { instancePath: instancePath + "/uniqueItems", schemaPath: "#/properties/uniqueItems/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean", schema: schema6.properties.uniqueItems.type, parentSchema: schema6.properties.uniqueItems, data: data20 };
            if (vErrors === null) {
                vErrors = [err17];
            }
            else {
                vErrors.push(err17);
            }
            errors++;
        }
    }
    if (data.contains !== undefined) {
        if (!(validate21(data.contains, { instancePath: instancePath + "/contains", parentData: data, parentDataProperty: "contains", rootData }))) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
        }
    }
    if (data.maxProperties !== undefined) {
        if (!(validate22(data.maxProperties, { instancePath: instancePath + "/maxProperties", parentData: data, parentDataProperty: "maxProperties", rootData }))) {
            vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
            errors = vErrors.length;
        }
    }
    if (data.minProperties !== undefined) {
        if (!(validate24(data.minProperties, { instancePath: instancePath + "/minProperties", parentData: data, parentDataProperty: "minProperties", rootData }))) {
            vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
            errors = vErrors.length;
        }
    }
    if (data.required !== undefined) {
        if (!(validate33(data.required, { instancePath: instancePath + "/required", parentData: data, parentDataProperty: "required", rootData }))) {
            vErrors = vErrors === null ? validate33.errors : vErrors.concat(validate33.errors);
            errors = vErrors.length;
        }
    }
    if (data.additionalProperties !== undefined) {
        if (!(validate21(data.additionalProperties, { instancePath: instancePath + "/additionalProperties", parentData: data, parentDataProperty: "additionalProperties", rootData }))) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
        }
    }
    if (data.definitions !== undefined) {
        let data26 = data.definitions;
        if (data26 && typeof data26 == "object" && !Array.isArray(data26)) {
            for (const key0 in data26) {
                if (!(validate21(data26[key0], { instancePath: instancePath + "/definitions/" + key0.replace(/~/g, "~0").replace(/\//g, "~1"), parentData: data26, parentDataProperty: key0, rootData }))) {
                    vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
                    errors = vErrors.length;
                }
            }
        }
        else {
            const err18 = { instancePath: instancePath + "/definitions", schemaPath: "#/properties/definitions/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema6.properties.definitions.type, parentSchema: schema6.properties.definitions, data: data26 };
            if (vErrors === null) {
                vErrors = [err18];
            }
            else {
                vErrors.push(err18);
            }
            errors++;
        }
    }
    if (data.properties !== undefined) {
        let data28 = data.properties;
        if (data28 && typeof data28 == "object" && !Array.isArray(data28)) {
            for (const key1 in data28) {
                if (!(validate21(data28[key1], { instancePath: instancePath + "/properties/" + key1.replace(/~/g, "~0").replace(/\//g, "~1"), parentData: data28, parentDataProperty: key1, rootData }))) {
                    vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
                    errors = vErrors.length;
                }
            }
        }
        else {
            const err19 = { instancePath: instancePath + "/properties", schemaPath: "#/properties/properties/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema6.properties.properties.type, parentSchema: schema6.properties.properties, data: data28 };
            if (vErrors === null) {
                vErrors = [err19];
            }
            else {
                vErrors.push(err19);
            }
            errors++;
        }
    }
    if (data.patternProperties !== undefined) {
        let data30 = data.patternProperties;
        if (data30 && typeof data30 == "object" && !Array.isArray(data30)) {
            for (const key2 in data30) {
                const _errs55 = errors;
                var valid4 = _errs55 === errors;
                if (!valid4) {
                    const err20 = { instancePath: instancePath + "/patternProperties", schemaPath: "#/properties/patternProperties/propertyNames", keyword: "propertyNames", params: { propertyName: key2 }, message: "property name must be valid", schema: schema6.properties.patternProperties.propertyNames, parentSchema: schema6.properties.patternProperties, data: data30 };
                    if (vErrors === null) {
                        vErrors = [err20];
                    }
                    else {
                        vErrors.push(err20);
                    }
                    errors++;
                }
            }
            for (const key3 in data30) {
                if (!(validate21(data30[key3], { instancePath: instancePath + "/patternProperties/" + key3.replace(/~/g, "~0").replace(/\//g, "~1"), parentData: data30, parentDataProperty: key3, rootData }))) {
                    vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
                    errors = vErrors.length;
                }
            }
        }
        else {
            const err21 = { instancePath: instancePath + "/patternProperties", schemaPath: "#/properties/patternProperties/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema6.properties.patternProperties.type, parentSchema: schema6.properties.patternProperties, data: data30 };
            if (vErrors === null) {
                vErrors = [err21];
            }
            else {
                vErrors.push(err21);
            }
            errors++;
        }
    }
    if (data.dependencies !== undefined) {
        let data32 = data.dependencies;
        if (data32 && typeof data32 == "object" && !Array.isArray(data32)) {
            for (const key4 in data32) {
                let data33 = data32[key4];
                const _errs62 = errors;
                let valid7 = false;
                const _errs63 = errors;
                if (!(validate21(data33, { instancePath: instancePath + "/dependencies/" + key4.replace(/~/g, "~0").replace(/\//g, "~1"), parentData: data32, parentDataProperty: key4, rootData }))) {
                    vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
                    errors = vErrors.length;
                }
                var _valid1 = _errs63 === errors;
                valid7 = valid7 || _valid1;
                if (!valid7) {
                    const _errs64 = errors;
                    if (!(validate33(data33, { instancePath: instancePath + "/dependencies/" + key4.replace(/~/g, "~0").replace(/\//g, "~1"), parentData: data32, parentDataProperty: key4, rootData }))) {
                        vErrors = vErrors === null ? validate33.errors : vErrors.concat(validate33.errors);
                        errors = vErrors.length;
                    }
                    var _valid1 = _errs64 === errors;
                    valid7 = valid7 || _valid1;
                }
                if (!valid7) {
                    const err22 = { instancePath: instancePath + "/dependencies/" + key4.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/properties/dependencies/additionalProperties/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf", schema: schema6.properties.dependencies.additionalProperties.anyOf, parentSchema: schema6.properties.dependencies.additionalProperties, data: data33 };
                    if (vErrors === null) {
                        vErrors = [err22];
                    }
                    else {
                        vErrors.push(err22);
                    }
                    errors++;
                }
                else {
                    errors = _errs62;
                    if (vErrors !== null) {
                        if (_errs62) {
                            vErrors.length = _errs62;
                        }
                        else {
                            vErrors = null;
                        }
                    }
                }
            }
        }
        else {
            const err23 = { instancePath: instancePath + "/dependencies", schemaPath: "#/properties/dependencies/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema6.properties.dependencies.type, parentSchema: schema6.properties.dependencies, data: data32 };
            if (vErrors === null) {
                vErrors = [err23];
            }
            else {
                vErrors.push(err23);
            }
            errors++;
        }
    }
    if (data.propertyNames !== undefined) {
        if (!(validate21(data.propertyNames, { instancePath: instancePath + "/propertyNames", parentData: data, parentDataProperty: "propertyNames", rootData }))) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
        }
    }
    if (data.enum !== undefined) {
        let data35 = data.enum;
        if (Array.isArray(data35)) {
            if (data35.length < 1) {
                const err24 = { instancePath: instancePath + "/enum", schemaPath: "#/properties/enum/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema6.properties.enum, data: data35 };
                if (vErrors === null) {
                    vErrors = [err24];
                }
                else {
                    vErrors.push(err24);
                }
                errors++;
            }
            let i0 = data35.length;
            let j0;
            if (i0 > 1) {
                outer0: for (; i0--;) {
                    for (j0 = i0; j0--;) {
                        if (func0(data35[i0], data35[j0])) {
                            const err25 = { instancePath: instancePath + "/enum", schemaPath: "#/properties/enum/uniqueItems", keyword: "uniqueItems", params: { i: i0, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i0 + " are identical)", schema: true, parentSchema: schema6.properties.enum, data: data35 };
                            if (vErrors === null) {
                                vErrors = [err25];
                            }
                            else {
                                vErrors.push(err25);
                            }
                            errors++;
                            break outer0;
                        }
                    }
                }
            }
        }
        else {
            const err26 = { instancePath: instancePath + "/enum", schemaPath: "#/properties/enum/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema6.properties.enum.type, parentSchema: schema6.properties.enum, data: data35 };
            if (vErrors === null) {
                vErrors = [err26];
            }
            else {
                vErrors.push(err26);
            }
            errors++;
        }
    }
    if (data.type !== undefined) {
        let data36 = data.type;
        const _errs69 = errors;
        let valid9 = false;
        const _errs70 = errors;
        if (!(validate36(data36, { instancePath: instancePath + "/type", parentData: data, parentDataProperty: "type", rootData }))) {
            vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
            errors = vErrors.length;
        }
        var _valid2 = _errs70 === errors;
        valid9 = valid9 || _valid2;
        if (!valid9) {
            const _errs71 = errors;
            if (Array.isArray(data36)) {
                if (data36.length < 1) {
                    const err27 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/anyOf/1/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema6.properties.type.anyOf[1], data: data36 };
                    if (vErrors === null) {
                        vErrors = [err27];
                    }
                    else {
                        vErrors.push(err27);
                    }
                    errors++;
                }
                const len0 = data36.length;
                for (let i1 = 0; i1 < len0; i1++) {
                    if (!(validate36(data36[i1], { instancePath: instancePath + "/type/" + i1, parentData: data36, parentDataProperty: i1, rootData }))) {
                        vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
                        errors = vErrors.length;
                    }
                }
                let i2 = data36.length;
                let j1;
                if (i2 > 1) {
                    outer1: for (; i2--;) {
                        for (j1 = i2; j1--;) {
                            if (func0(data36[i2], data36[j1])) {
                                const err28 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/anyOf/1/uniqueItems", keyword: "uniqueItems", params: { i: i2, j: j1 }, message: "must NOT have duplicate items (items ## " + j1 + " and " + i2 + " are identical)", schema: true, parentSchema: schema6.properties.type.anyOf[1], data: data36 };
                                if (vErrors === null) {
                                    vErrors = [err28];
                                }
                                else {
                                    vErrors.push(err28);
                                }
                                errors++;
                                break outer1;
                            }
                        }
                    }
                }
            }
            else {
                const err29 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/anyOf/1/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema6.properties.type.anyOf[1].type, parentSchema: schema6.properties.type.anyOf[1], data: data36 };
                if (vErrors === null) {
                    vErrors = [err29];
                }
                else {
                    vErrors.push(err29);
                }
                errors++;
            }
            var _valid2 = _errs71 === errors;
            valid9 = valid9 || _valid2;
        }
        if (!valid9) {
            const err30 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf", schema: schema6.properties.type.anyOf, parentSchema: schema6.properties.type, data: data36 };
            if (vErrors === null) {
                vErrors = [err30];
            }
            else {
                vErrors.push(err30);
            }
            errors++;
        }
        else {
            errors = _errs69;
            if (vErrors !== null) {
                if (_errs69) {
                    vErrors.length = _errs69;
                }
                else {
                    vErrors = null;
                }
            }
        }
    }
    if (data.format !== undefined) {
        let data38 = data.format;
        if (typeof data38 !== "string") {
            const err31 = { instancePath: instancePath + "/format", schemaPath: "#/properties/format/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema6.properties.format.type, parentSchema: schema6.properties.format, data: data38 };
            if (vErrors === null) {
                vErrors = [err31];
            }
            else {
                vErrors.push(err31);
            }
            errors++;
        }
    }
    if (data.contentMediaType !== undefined) {
        let data39 = data.contentMediaType;
        if (typeof data39 !== "string") {
            const err32 = { instancePath: instancePath + "/contentMediaType", schemaPath: "#/properties/contentMediaType/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema6.properties.contentMediaType.type, parentSchema: schema6.properties.contentMediaType, data: data39 };
            if (vErrors === null) {
                vErrors = [err32];
            }
            else {
                vErrors.push(err32);
            }
            errors++;
        }
    }
    if (data.contentEncoding !== undefined) {
        let data40 = data.contentEncoding;
        if (typeof data40 !== "string") {
            const err33 = { instancePath: instancePath + "/contentEncoding", schemaPath: "#/properties/contentEncoding/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema6.properties.contentEncoding.type, parentSchema: schema6.properties.contentEncoding, data: data40 };
            if (vErrors === null) {
                vErrors = [err33];
            }
            else {
                vErrors.push(err33);
            }
            errors++;
        }
    }
    if (data.if !== undefined) {
        if (!(validate21(data.if, { instancePath: instancePath + "/if", parentData: data, parentDataProperty: "if", rootData }))) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
        }
    }
    if (data.then !== undefined) {
        if (!(validate21(data.then, { instancePath: instancePath + "/then", parentData: data, parentDataProperty: "then", rootData }))) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
        }
    }
    if (data.else !== undefined) {
        if (!(validate21(data.else, { instancePath: instancePath + "/else", parentData: data, parentDataProperty: "else", rootData }))) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
        }
    }
    if (data.allOf !== undefined) {
        if (!(validate27(data.allOf, { instancePath: instancePath + "/allOf", parentData: data, parentDataProperty: "allOf", rootData }))) {
            vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
            errors = vErrors.length;
        }
    }
    if (data.anyOf !== undefined) {
        if (!(validate27(data.anyOf, { instancePath: instancePath + "/anyOf", parentData: data, parentDataProperty: "anyOf", rootData }))) {
            vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
            errors = vErrors.length;
        }
    }
    if (data.oneOf !== undefined) {
        if (!(validate27(data.oneOf, { instancePath: instancePath + "/oneOf", parentData: data, parentDataProperty: "oneOf", rootData }))) {
            vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
            errors = vErrors.length;
        }
    }
    if (data.not !== undefined) {
        if (!(validate21(data.not, { instancePath: instancePath + "/not", parentData: data, parentDataProperty: "not", rootData }))) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
        }
    }
} validate21.errors = vErrors; return errors === 0; }
function validate51(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (!(data && typeof data == "object" && !Array.isArray(data))) {
    const err0 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema17.type, parentSchema: schema17, data };
    if (vErrors === null) {
        vErrors = [err0];
    }
    else {
        vErrors.push(err0);
    }
    errors++;
} const _errs1 = errors; let valid0 = false; let passing0 = null; const _errs2 = errors; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.path === undefined) {
        const err1 = { instancePath, schemaPath: "#/oneOf/0/required", keyword: "required", params: { missingProperty: "path" }, message: "must have required property '" + "path" + "'", schema: schema17.oneOf[0].required, parentSchema: schema17.oneOf[0], data };
        if (vErrors === null) {
            vErrors = [err1];
        }
        else {
            vErrors.push(err1);
        }
        errors++;
    }
    for (const key0 in data) {
        if (!((((((key0 === "id") || (key0 === "path")) || (key0 === "purpose")) || (key0 === "intent_to_retain")) || (key0 === "filter")) || (key0 === "name"))) {
            const err2 = { instancePath, schemaPath: "#/oneOf/0/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties", schema: false, parentSchema: schema17.oneOf[0], data };
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
            const err3 = { instancePath: instancePath + "/id", schemaPath: "#/oneOf/0/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema17.oneOf[0].properties.id.type, parentSchema: schema17.oneOf[0].properties.id, data: data0 };
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
                    const err4 = { instancePath: instancePath + "/path/" + i0, schemaPath: "#/oneOf/0/properties/path/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema17.oneOf[0].properties.path.items.type, parentSchema: schema17.oneOf[0].properties.path.items, data: data2 };
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
            const err5 = { instancePath: instancePath + "/path", schemaPath: "#/oneOf/0/properties/path/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema17.oneOf[0].properties.path.type, parentSchema: schema17.oneOf[0].properties.path, data: data1 };
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
            const err6 = { instancePath: instancePath + "/purpose", schemaPath: "#/oneOf/0/properties/purpose/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema17.oneOf[0].properties.purpose.type, parentSchema: schema17.oneOf[0].properties.purpose, data: data3 };
            if (vErrors === null) {
                vErrors = [err6];
            }
            else {
                vErrors.push(err6);
            }
            errors++;
        }
    }
    if (data.intent_to_retain !== undefined) {
        let data4 = data.intent_to_retain;
        if (typeof data4 !== "boolean") {
            const err7 = { instancePath: instancePath + "/intent_to_retain", schemaPath: "#/oneOf/0/properties/intent_to_retain/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean", schema: schema17.oneOf[0].properties.intent_to_retain.type, parentSchema: schema17.oneOf[0].properties.intent_to_retain, data: data4 };
            if (vErrors === null) {
                vErrors = [err7];
            }
            else {
                vErrors.push(err7);
            }
            errors++;
        }
    }
    if (data.filter !== undefined) {
        if (!(validate21(data.filter, { instancePath: instancePath + "/filter", parentData: data, parentDataProperty: "filter", rootData }))) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
        }
    }
    if (data.name !== undefined) {
        let data6 = data.name;
        if (typeof data6 !== "string") {
            const err8 = { instancePath: instancePath + "/name", schemaPath: "#/oneOf/0/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema17.oneOf[0].properties.name.type, parentSchema: schema17.oneOf[0].properties.name, data: data6 };
            if (vErrors === null) {
                vErrors = [err8];
            }
            else {
                vErrors.push(err8);
            }
            errors++;
        }
    }
} var _valid0 = _errs2 === errors; if (_valid0) {
    valid0 = true;
    passing0 = 0;
} const _errs17 = errors; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.path === undefined) {
        const err9 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: "path" }, message: "must have required property '" + "path" + "'", schema: schema17.oneOf[1].required, parentSchema: schema17.oneOf[1], data };
        if (vErrors === null) {
            vErrors = [err9];
        }
        else {
            vErrors.push(err9);
        }
        errors++;
    }
    if (data.filter === undefined) {
        const err10 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: "filter" }, message: "must have required property '" + "filter" + "'", schema: schema17.oneOf[1].required, parentSchema: schema17.oneOf[1], data };
        if (vErrors === null) {
            vErrors = [err10];
        }
        else {
            vErrors.push(err10);
        }
        errors++;
    }
    if (data.predicate === undefined) {
        const err11 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: "predicate" }, message: "must have required property '" + "predicate" + "'", schema: schema17.oneOf[1].required, parentSchema: schema17.oneOf[1], data };
        if (vErrors === null) {
            vErrors = [err11];
        }
        else {
            vErrors.push(err11);
        }
        errors++;
    }
    for (const key1 in data) {
        if (!(((((((key1 === "id") || (key1 === "path")) || (key1 === "purpose")) || (key1 === "intent_to_retain")) || (key1 === "filter")) || (key1 === "predicate")) || (key1 === "name"))) {
            const err12 = { instancePath, schemaPath: "#/oneOf/1/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties", schema: false, parentSchema: schema17.oneOf[1], data };
            if (vErrors === null) {
                vErrors = [err12];
            }
            else {
                vErrors.push(err12);
            }
            errors++;
        }
    }
    if (data.id !== undefined) {
        let data7 = data.id;
        if (typeof data7 !== "string") {
            const err13 = { instancePath: instancePath + "/id", schemaPath: "#/oneOf/1/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema17.oneOf[1].properties.id.type, parentSchema: schema17.oneOf[1].properties.id, data: data7 };
            if (vErrors === null) {
                vErrors = [err13];
            }
            else {
                vErrors.push(err13);
            }
            errors++;
        }
    }
    if (data.path !== undefined) {
        let data8 = data.path;
        if (Array.isArray(data8)) {
            const len1 = data8.length;
            for (let i1 = 0; i1 < len1; i1++) {
                let data9 = data8[i1];
                if (typeof data9 !== "string") {
                    const err14 = { instancePath: instancePath + "/path/" + i1, schemaPath: "#/oneOf/1/properties/path/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema17.oneOf[1].properties.path.items.type, parentSchema: schema17.oneOf[1].properties.path.items, data: data9 };
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
            const err15 = { instancePath: instancePath + "/path", schemaPath: "#/oneOf/1/properties/path/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema17.oneOf[1].properties.path.type, parentSchema: schema17.oneOf[1].properties.path, data: data8 };
            if (vErrors === null) {
                vErrors = [err15];
            }
            else {
                vErrors.push(err15);
            }
            errors++;
        }
    }
    if (data.purpose !== undefined) {
        let data10 = data.purpose;
        if (typeof data10 !== "string") {
            const err16 = { instancePath: instancePath + "/purpose", schemaPath: "#/oneOf/1/properties/purpose/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema17.oneOf[1].properties.purpose.type, parentSchema: schema17.oneOf[1].properties.purpose, data: data10 };
            if (vErrors === null) {
                vErrors = [err16];
            }
            else {
                vErrors.push(err16);
            }
            errors++;
        }
    }
    if (data.intent_to_retain !== undefined) {
        let data11 = data.intent_to_retain;
        if (typeof data11 !== "boolean") {
            const err17 = { instancePath: instancePath + "/intent_to_retain", schemaPath: "#/oneOf/1/properties/intent_to_retain/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean", schema: schema17.oneOf[1].properties.intent_to_retain.type, parentSchema: schema17.oneOf[1].properties.intent_to_retain, data: data11 };
            if (vErrors === null) {
                vErrors = [err17];
            }
            else {
                vErrors.push(err17);
            }
            errors++;
        }
    }
    if (data.filter !== undefined) {
        if (!(validate21(data.filter, { instancePath: instancePath + "/filter", parentData: data, parentDataProperty: "filter", rootData }))) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
        }
    }
    if (data.predicate !== undefined) {
        let data13 = data.predicate;
        if (typeof data13 !== "string") {
            const err18 = { instancePath: instancePath + "/predicate", schemaPath: "#/oneOf/1/properties/predicate/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema17.oneOf[1].properties.predicate.type, parentSchema: schema17.oneOf[1].properties.predicate, data: data13 };
            if (vErrors === null) {
                vErrors = [err18];
            }
            else {
                vErrors.push(err18);
            }
            errors++;
        }
        if (!((data13 === "required") || (data13 === "preferred"))) {
            const err19 = { instancePath: instancePath + "/predicate", schemaPath: "#/oneOf/1/properties/predicate/enum", keyword: "enum", params: { allowedValues: schema17.oneOf[1].properties.predicate.enum }, message: "must be equal to one of the allowed values", schema: schema17.oneOf[1].properties.predicate.enum, parentSchema: schema17.oneOf[1].properties.predicate, data: data13 };
            if (vErrors === null) {
                vErrors = [err19];
            }
            else {
                vErrors.push(err19);
            }
            errors++;
        }
    }
    if (data.name !== undefined) {
        let data14 = data.name;
        if (typeof data14 !== "string") {
            const err20 = { instancePath: instancePath + "/name", schemaPath: "#/oneOf/1/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema17.oneOf[1].properties.name.type, parentSchema: schema17.oneOf[1].properties.name, data: data14 };
            if (vErrors === null) {
                vErrors = [err20];
            }
            else {
                vErrors.push(err20);
            }
            errors++;
        }
    }
} var _valid0 = _errs17 === errors; if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
}
else {
    if (_valid0) {
        valid0 = true;
        passing0 = 1;
    }
} if (!valid0) {
    const err21 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf", schema: schema17.oneOf, parentSchema: schema17, data };
    if (vErrors === null) {
        vErrors = [err21];
    }
    else {
        vErrors.push(err21);
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
} validate51.errors = vErrors; return errors === 0; }
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
    for (const key0 in data) {
        if (!(((((((key0 === "id") || (key0 === "name")) || (key0 === "purpose")) || (key0 === "issuance")) || (key0 === "group")) || (key0 === "format")) || (key0 === "constraints"))) {
            const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties", schema: false, parentSchema: schema15, data };
            if (vErrors === null) {
                vErrors = [err1];
            }
            else {
                vErrors.push(err1);
            }
            errors++;
        }
    }
    if (data.id !== undefined) {
        let data0 = data.id;
        if (typeof data0 !== "string") {
            const err2 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.id.type, parentSchema: schema15.properties.id, data: data0 };
            if (vErrors === null) {
                vErrors = [err2];
            }
            else {
                vErrors.push(err2);
            }
            errors++;
        }
    }
    if (data.name !== undefined) {
        let data1 = data.name;
        if (typeof data1 !== "string") {
            const err3 = { instancePath: instancePath + "/name", schemaPath: "#/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.name.type, parentSchema: schema15.properties.name, data: data1 };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
    }
    if (data.purpose !== undefined) {
        let data2 = data.purpose;
        if (typeof data2 !== "string") {
            const err4 = { instancePath: instancePath + "/purpose", schemaPath: "#/properties/purpose/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.purpose.type, parentSchema: schema15.properties.purpose, data: data2 };
            if (vErrors === null) {
                vErrors = [err4];
            }
            else {
                vErrors.push(err4);
            }
            errors++;
        }
    }
    if (data.issuance !== undefined) {
        let data3 = data.issuance;
        if (Array.isArray(data3)) {
            const len0 = data3.length;
            for (let i0 = 0; i0 < len0; i0++) {
                if (!(validate48(data3[i0], { instancePath: instancePath + "/issuance/" + i0, parentData: data3, parentDataProperty: i0, rootData }))) {
                    vErrors = vErrors === null ? validate48.errors : vErrors.concat(validate48.errors);
                    errors = vErrors.length;
                }
            }
        }
        else {
            const err5 = { instancePath: instancePath + "/issuance", schemaPath: "#/properties/issuance/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.issuance.type, parentSchema: schema15.properties.issuance, data: data3 };
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
        let data5 = data.group;
        if (Array.isArray(data5)) {
            const len1 = data5.length;
            for (let i1 = 0; i1 < len1; i1++) {
                let data6 = data5[i1];
                if (typeof data6 !== "string") {
                    const err6 = { instancePath: instancePath + "/group/" + i1, schemaPath: "#/properties/group/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.group.items.type, parentSchema: schema15.properties.group.items, data: data6 };
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
            const err7 = { instancePath: instancePath + "/group", schemaPath: "#/properties/group/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.group.type, parentSchema: schema15.properties.group, data: data5 };
            if (vErrors === null) {
                vErrors = [err7];
            }
            else {
                vErrors.push(err7);
            }
            errors++;
        }
    }
    if (data.format !== undefined) {
        if (!(validate43(data.format, { instancePath: instancePath + "/format", parentData: data, parentDataProperty: "format", rootData }))) {
            vErrors = vErrors === null ? validate43.errors : vErrors.concat(validate43.errors);
            errors = vErrors.length;
        }
    }
    if (data.constraints !== undefined) {
        let data8 = data.constraints;
        if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
            for (const key1 in data8) {
                if (!((((((key1 === "limit_disclosure") || (key1 === "statuses")) || (key1 === "fields")) || (key1 === "subject_is_issuer")) || (key1 === "is_holder")) || (key1 === "same_subject"))) {
                    const err8 = { instancePath: instancePath + "/constraints", schemaPath: "#/properties/constraints/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties", schema: false, parentSchema: schema15.properties.constraints, data: data8 };
                    if (vErrors === null) {
                        vErrors = [err8];
                    }
                    else {
                        vErrors.push(err8);
                    }
                    errors++;
                }
            }
            if (data8.limit_disclosure !== undefined) {
                let data9 = data8.limit_disclosure;
                if (typeof data9 !== "string") {
                    const err9 = { instancePath: instancePath + "/constraints/limit_disclosure", schemaPath: "#/properties/constraints/properties/limit_disclosure/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.limit_disclosure.type, parentSchema: schema15.properties.constraints.properties.limit_disclosure, data: data9 };
                    if (vErrors === null) {
                        vErrors = [err9];
                    }
                    else {
                        vErrors.push(err9);
                    }
                    errors++;
                }
                if (!((data9 === "required") || (data9 === "preferred"))) {
                    const err10 = { instancePath: instancePath + "/constraints/limit_disclosure", schemaPath: "#/properties/constraints/properties/limit_disclosure/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.limit_disclosure.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.limit_disclosure.enum, parentSchema: schema15.properties.constraints.properties.limit_disclosure, data: data9 };
                    if (vErrors === null) {
                        vErrors = [err10];
                    }
                    else {
                        vErrors.push(err10);
                    }
                    errors++;
                }
            }
            if (data8.statuses !== undefined) {
                let data10 = data8.statuses;
                if (data10 && typeof data10 == "object" && !Array.isArray(data10)) {
                    if (data10.active !== undefined) {
                        let data11 = data10.active;
                        if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
                            if (data11.directive !== undefined) {
                                let data12 = data11.directive;
                                if (typeof data12 !== "string") {
                                    const err11 = { instancePath: instancePath + "/constraints/statuses/active/directive", schemaPath: "#/properties/constraints/properties/statuses/properties/active/properties/directive/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.statuses.properties.active.properties.directive.type, parentSchema: schema15.properties.constraints.properties.statuses.properties.active.properties.directive, data: data12 };
                                    if (vErrors === null) {
                                        vErrors = [err11];
                                    }
                                    else {
                                        vErrors.push(err11);
                                    }
                                    errors++;
                                }
                                if (!(((data12 === "required") || (data12 === "allowed")) || (data12 === "disallowed"))) {
                                    const err12 = { instancePath: instancePath + "/constraints/statuses/active/directive", schemaPath: "#/properties/constraints/properties/statuses/properties/active/properties/directive/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.statuses.properties.active.properties.directive.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.statuses.properties.active.properties.directive.enum, parentSchema: schema15.properties.constraints.properties.statuses.properties.active.properties.directive, data: data12 };
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
                            const err13 = { instancePath: instancePath + "/constraints/statuses/active", schemaPath: "#/properties/constraints/properties/statuses/properties/active/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.properties.statuses.properties.active.type, parentSchema: schema15.properties.constraints.properties.statuses.properties.active, data: data11 };
                            if (vErrors === null) {
                                vErrors = [err13];
                            }
                            else {
                                vErrors.push(err13);
                            }
                            errors++;
                        }
                    }
                    if (data10.suspended !== undefined) {
                        let data13 = data10.suspended;
                        if (data13 && typeof data13 == "object" && !Array.isArray(data13)) {
                            if (data13.directive !== undefined) {
                                let data14 = data13.directive;
                                if (typeof data14 !== "string") {
                                    const err14 = { instancePath: instancePath + "/constraints/statuses/suspended/directive", schemaPath: "#/properties/constraints/properties/statuses/properties/suspended/properties/directive/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.statuses.properties.suspended.properties.directive.type, parentSchema: schema15.properties.constraints.properties.statuses.properties.suspended.properties.directive, data: data14 };
                                    if (vErrors === null) {
                                        vErrors = [err14];
                                    }
                                    else {
                                        vErrors.push(err14);
                                    }
                                    errors++;
                                }
                                if (!(((data14 === "required") || (data14 === "allowed")) || (data14 === "disallowed"))) {
                                    const err15 = { instancePath: instancePath + "/constraints/statuses/suspended/directive", schemaPath: "#/properties/constraints/properties/statuses/properties/suspended/properties/directive/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.statuses.properties.suspended.properties.directive.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.statuses.properties.suspended.properties.directive.enum, parentSchema: schema15.properties.constraints.properties.statuses.properties.suspended.properties.directive, data: data14 };
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
                            const err16 = { instancePath: instancePath + "/constraints/statuses/suspended", schemaPath: "#/properties/constraints/properties/statuses/properties/suspended/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.properties.statuses.properties.suspended.type, parentSchema: schema15.properties.constraints.properties.statuses.properties.suspended, data: data13 };
                            if (vErrors === null) {
                                vErrors = [err16];
                            }
                            else {
                                vErrors.push(err16);
                            }
                            errors++;
                        }
                    }
                    if (data10.revoked !== undefined) {
                        let data15 = data10.revoked;
                        if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
                            if (data15.directive !== undefined) {
                                let data16 = data15.directive;
                                if (typeof data16 !== "string") {
                                    const err17 = { instancePath: instancePath + "/constraints/statuses/revoked/directive", schemaPath: "#/properties/constraints/properties/statuses/properties/revoked/properties/directive/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.statuses.properties.revoked.properties.directive.type, parentSchema: schema15.properties.constraints.properties.statuses.properties.revoked.properties.directive, data: data16 };
                                    if (vErrors === null) {
                                        vErrors = [err17];
                                    }
                                    else {
                                        vErrors.push(err17);
                                    }
                                    errors++;
                                }
                                if (!(((data16 === "required") || (data16 === "allowed")) || (data16 === "disallowed"))) {
                                    const err18 = { instancePath: instancePath + "/constraints/statuses/revoked/directive", schemaPath: "#/properties/constraints/properties/statuses/properties/revoked/properties/directive/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.statuses.properties.revoked.properties.directive.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.statuses.properties.revoked.properties.directive.enum, parentSchema: schema15.properties.constraints.properties.statuses.properties.revoked.properties.directive, data: data16 };
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
                            const err19 = { instancePath: instancePath + "/constraints/statuses/revoked", schemaPath: "#/properties/constraints/properties/statuses/properties/revoked/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.properties.statuses.properties.revoked.type, parentSchema: schema15.properties.constraints.properties.statuses.properties.revoked, data: data15 };
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
                    const err20 = { instancePath: instancePath + "/constraints/statuses", schemaPath: "#/properties/constraints/properties/statuses/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.properties.statuses.type, parentSchema: schema15.properties.constraints.properties.statuses, data: data10 };
                    if (vErrors === null) {
                        vErrors = [err20];
                    }
                    else {
                        vErrors.push(err20);
                    }
                    errors++;
                }
            }
            if (data8.fields !== undefined) {
                let data17 = data8.fields;
                if (Array.isArray(data17)) {
                    const len2 = data17.length;
                    for (let i2 = 0; i2 < len2; i2++) {
                        if (!(validate51(data17[i2], { instancePath: instancePath + "/constraints/fields/" + i2, parentData: data17, parentDataProperty: i2, rootData }))) {
                            vErrors = vErrors === null ? validate51.errors : vErrors.concat(validate51.errors);
                            errors = vErrors.length;
                        }
                    }
                }
                else {
                    const err21 = { instancePath: instancePath + "/constraints/fields", schemaPath: "#/properties/constraints/properties/fields/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.constraints.properties.fields.type, parentSchema: schema15.properties.constraints.properties.fields, data: data17 };
                    if (vErrors === null) {
                        vErrors = [err21];
                    }
                    else {
                        vErrors.push(err21);
                    }
                    errors++;
                }
            }
            if (data8.subject_is_issuer !== undefined) {
                let data19 = data8.subject_is_issuer;
                if (typeof data19 !== "string") {
                    const err22 = { instancePath: instancePath + "/constraints/subject_is_issuer", schemaPath: "#/properties/constraints/properties/subject_is_issuer/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.subject_is_issuer.type, parentSchema: schema15.properties.constraints.properties.subject_is_issuer, data: data19 };
                    if (vErrors === null) {
                        vErrors = [err22];
                    }
                    else {
                        vErrors.push(err22);
                    }
                    errors++;
                }
                if (!((data19 === "required") || (data19 === "preferred"))) {
                    const err23 = { instancePath: instancePath + "/constraints/subject_is_issuer", schemaPath: "#/properties/constraints/properties/subject_is_issuer/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.subject_is_issuer.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.subject_is_issuer.enum, parentSchema: schema15.properties.constraints.properties.subject_is_issuer, data: data19 };
                    if (vErrors === null) {
                        vErrors = [err23];
                    }
                    else {
                        vErrors.push(err23);
                    }
                    errors++;
                }
            }
            if (data8.is_holder !== undefined) {
                let data20 = data8.is_holder;
                if (Array.isArray(data20)) {
                    const len3 = data20.length;
                    for (let i3 = 0; i3 < len3; i3++) {
                        let data21 = data20[i3];
                        if (data21 && typeof data21 == "object" && !Array.isArray(data21)) {
                            if (data21.field_id === undefined) {
                                const err24 = { instancePath: instancePath + "/constraints/is_holder/" + i3, schemaPath: "#/properties/constraints/properties/is_holder/items/required", keyword: "required", params: { missingProperty: "field_id" }, message: "must have required property '" + "field_id" + "'", schema: schema15.properties.constraints.properties.is_holder.items.required, parentSchema: schema15.properties.constraints.properties.is_holder.items, data: data21 };
                                if (vErrors === null) {
                                    vErrors = [err24];
                                }
                                else {
                                    vErrors.push(err24);
                                }
                                errors++;
                            }
                            if (data21.directive === undefined) {
                                const err25 = { instancePath: instancePath + "/constraints/is_holder/" + i3, schemaPath: "#/properties/constraints/properties/is_holder/items/required", keyword: "required", params: { missingProperty: "directive" }, message: "must have required property '" + "directive" + "'", schema: schema15.properties.constraints.properties.is_holder.items.required, parentSchema: schema15.properties.constraints.properties.is_holder.items, data: data21 };
                                if (vErrors === null) {
                                    vErrors = [err25];
                                }
                                else {
                                    vErrors.push(err25);
                                }
                                errors++;
                            }
                            for (const key2 in data21) {
                                if (!((key2 === "field_id") || (key2 === "directive"))) {
                                    const err26 = { instancePath: instancePath + "/constraints/is_holder/" + i3, schemaPath: "#/properties/constraints/properties/is_holder/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties", schema: false, parentSchema: schema15.properties.constraints.properties.is_holder.items, data: data21 };
                                    if (vErrors === null) {
                                        vErrors = [err26];
                                    }
                                    else {
                                        vErrors.push(err26);
                                    }
                                    errors++;
                                }
                            }
                            if (data21.field_id !== undefined) {
                                let data22 = data21.field_id;
                                if (Array.isArray(data22)) {
                                    const len4 = data22.length;
                                    for (let i4 = 0; i4 < len4; i4++) {
                                        let data23 = data22[i4];
                                        if (typeof data23 !== "string") {
                                            const err27 = { instancePath: instancePath + "/constraints/is_holder/" + i3 + "/field_id/" + i4, schemaPath: "#/properties/constraints/properties/is_holder/items/properties/field_id/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.is_holder.items.properties.field_id.items.type, parentSchema: schema15.properties.constraints.properties.is_holder.items.properties.field_id.items, data: data23 };
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
                                else {
                                    const err28 = { instancePath: instancePath + "/constraints/is_holder/" + i3 + "/field_id", schemaPath: "#/properties/constraints/properties/is_holder/items/properties/field_id/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.constraints.properties.is_holder.items.properties.field_id.type, parentSchema: schema15.properties.constraints.properties.is_holder.items.properties.field_id, data: data22 };
                                    if (vErrors === null) {
                                        vErrors = [err28];
                                    }
                                    else {
                                        vErrors.push(err28);
                                    }
                                    errors++;
                                }
                            }
                            if (data21.directive !== undefined) {
                                let data24 = data21.directive;
                                if (typeof data24 !== "string") {
                                    const err29 = { instancePath: instancePath + "/constraints/is_holder/" + i3 + "/directive", schemaPath: "#/properties/constraints/properties/is_holder/items/properties/directive/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.is_holder.items.properties.directive.type, parentSchema: schema15.properties.constraints.properties.is_holder.items.properties.directive, data: data24 };
                                    if (vErrors === null) {
                                        vErrors = [err29];
                                    }
                                    else {
                                        vErrors.push(err29);
                                    }
                                    errors++;
                                }
                                if (!((data24 === "required") || (data24 === "preferred"))) {
                                    const err30 = { instancePath: instancePath + "/constraints/is_holder/" + i3 + "/directive", schemaPath: "#/properties/constraints/properties/is_holder/items/properties/directive/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.is_holder.items.properties.directive.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.is_holder.items.properties.directive.enum, parentSchema: schema15.properties.constraints.properties.is_holder.items.properties.directive, data: data24 };
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
                        else {
                            const err31 = { instancePath: instancePath + "/constraints/is_holder/" + i3, schemaPath: "#/properties/constraints/properties/is_holder/items/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.properties.is_holder.items.type, parentSchema: schema15.properties.constraints.properties.is_holder.items, data: data21 };
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
                    const err32 = { instancePath: instancePath + "/constraints/is_holder", schemaPath: "#/properties/constraints/properties/is_holder/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.constraints.properties.is_holder.type, parentSchema: schema15.properties.constraints.properties.is_holder, data: data20 };
                    if (vErrors === null) {
                        vErrors = [err32];
                    }
                    else {
                        vErrors.push(err32);
                    }
                    errors++;
                }
            }
            if (data8.same_subject !== undefined) {
                let data25 = data8.same_subject;
                if (Array.isArray(data25)) {
                    const len5 = data25.length;
                    for (let i5 = 0; i5 < len5; i5++) {
                        let data26 = data25[i5];
                        if (data26 && typeof data26 == "object" && !Array.isArray(data26)) {
                            if (data26.field_id === undefined) {
                                const err33 = { instancePath: instancePath + "/constraints/same_subject/" + i5, schemaPath: "#/properties/constraints/properties/same_subject/items/required", keyword: "required", params: { missingProperty: "field_id" }, message: "must have required property '" + "field_id" + "'", schema: schema15.properties.constraints.properties.same_subject.items.required, parentSchema: schema15.properties.constraints.properties.same_subject.items, data: data26 };
                                if (vErrors === null) {
                                    vErrors = [err33];
                                }
                                else {
                                    vErrors.push(err33);
                                }
                                errors++;
                            }
                            if (data26.directive === undefined) {
                                const err34 = { instancePath: instancePath + "/constraints/same_subject/" + i5, schemaPath: "#/properties/constraints/properties/same_subject/items/required", keyword: "required", params: { missingProperty: "directive" }, message: "must have required property '" + "directive" + "'", schema: schema15.properties.constraints.properties.same_subject.items.required, parentSchema: schema15.properties.constraints.properties.same_subject.items, data: data26 };
                                if (vErrors === null) {
                                    vErrors = [err34];
                                }
                                else {
                                    vErrors.push(err34);
                                }
                                errors++;
                            }
                            for (const key3 in data26) {
                                if (!((key3 === "field_id") || (key3 === "directive"))) {
                                    const err35 = { instancePath: instancePath + "/constraints/same_subject/" + i5, schemaPath: "#/properties/constraints/properties/same_subject/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties", schema: false, parentSchema: schema15.properties.constraints.properties.same_subject.items, data: data26 };
                                    if (vErrors === null) {
                                        vErrors = [err35];
                                    }
                                    else {
                                        vErrors.push(err35);
                                    }
                                    errors++;
                                }
                            }
                            if (data26.field_id !== undefined) {
                                let data27 = data26.field_id;
                                if (Array.isArray(data27)) {
                                    const len6 = data27.length;
                                    for (let i6 = 0; i6 < len6; i6++) {
                                        let data28 = data27[i6];
                                        if (typeof data28 !== "string") {
                                            const err36 = { instancePath: instancePath + "/constraints/same_subject/" + i5 + "/field_id/" + i6, schemaPath: "#/properties/constraints/properties/same_subject/items/properties/field_id/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.same_subject.items.properties.field_id.items.type, parentSchema: schema15.properties.constraints.properties.same_subject.items.properties.field_id.items, data: data28 };
                                            if (vErrors === null) {
                                                vErrors = [err36];
                                            }
                                            else {
                                                vErrors.push(err36);
                                            }
                                            errors++;
                                        }
                                    }
                                }
                                else {
                                    const err37 = { instancePath: instancePath + "/constraints/same_subject/" + i5 + "/field_id", schemaPath: "#/properties/constraints/properties/same_subject/items/properties/field_id/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.constraints.properties.same_subject.items.properties.field_id.type, parentSchema: schema15.properties.constraints.properties.same_subject.items.properties.field_id, data: data27 };
                                    if (vErrors === null) {
                                        vErrors = [err37];
                                    }
                                    else {
                                        vErrors.push(err37);
                                    }
                                    errors++;
                                }
                            }
                            if (data26.directive !== undefined) {
                                let data29 = data26.directive;
                                if (typeof data29 !== "string") {
                                    const err38 = { instancePath: instancePath + "/constraints/same_subject/" + i5 + "/directive", schemaPath: "#/properties/constraints/properties/same_subject/items/properties/directive/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema15.properties.constraints.properties.same_subject.items.properties.directive.type, parentSchema: schema15.properties.constraints.properties.same_subject.items.properties.directive, data: data29 };
                                    if (vErrors === null) {
                                        vErrors = [err38];
                                    }
                                    else {
                                        vErrors.push(err38);
                                    }
                                    errors++;
                                }
                                if (!((data29 === "required") || (data29 === "preferred"))) {
                                    const err39 = { instancePath: instancePath + "/constraints/same_subject/" + i5 + "/directive", schemaPath: "#/properties/constraints/properties/same_subject/items/properties/directive/enum", keyword: "enum", params: { allowedValues: schema15.properties.constraints.properties.same_subject.items.properties.directive.enum }, message: "must be equal to one of the allowed values", schema: schema15.properties.constraints.properties.same_subject.items.properties.directive.enum, parentSchema: schema15.properties.constraints.properties.same_subject.items.properties.directive, data: data29 };
                                    if (vErrors === null) {
                                        vErrors = [err39];
                                    }
                                    else {
                                        vErrors.push(err39);
                                    }
                                    errors++;
                                }
                            }
                        }
                        else {
                            const err40 = { instancePath: instancePath + "/constraints/same_subject/" + i5, schemaPath: "#/properties/constraints/properties/same_subject/items/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.properties.same_subject.items.type, parentSchema: schema15.properties.constraints.properties.same_subject.items, data: data26 };
                            if (vErrors === null) {
                                vErrors = [err40];
                            }
                            else {
                                vErrors.push(err40);
                            }
                            errors++;
                        }
                    }
                }
                else {
                    const err41 = { instancePath: instancePath + "/constraints/same_subject", schemaPath: "#/properties/constraints/properties/same_subject/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema15.properties.constraints.properties.same_subject.type, parentSchema: schema15.properties.constraints.properties.same_subject, data: data25 };
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
            const err42 = { instancePath: instancePath + "/constraints", schemaPath: "#/properties/constraints/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.properties.constraints.type, parentSchema: schema15.properties.constraints, data: data8 };
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
    const err43 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema15.type, parentSchema: schema15, data };
    if (vErrors === null) {
        vErrors = [err43];
    }
    else {
        vErrors.push(err43);
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
                if (!(((((((key0 === "id") || (key0 === "name")) || (key0 === "purpose")) || (key0 === "format")) || (key0 === "frame")) || (key0 === "submission_requirements")) || (key0 === "input_descriptors"))) {
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
            if (data0.frame !== undefined) {
                let data5 = data0.frame;
                if (data5 && typeof data5 == "object" && !Array.isArray(data5)) { }
                else {
                    const err6 = { instancePath: instancePath + "/presentation_definition/frame", schemaPath: "#/properties/presentation_definition/properties/frame/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema12.properties.presentation_definition.properties.frame.type, parentSchema: schema12.properties.presentation_definition.properties.frame, data: data5 };
                    if (vErrors === null) {
                        vErrors = [err6];
                    }
                    else {
                        vErrors.push(err6);
                    }
                    errors++;
                }
            }
            if (data0.submission_requirements !== undefined) {
                let data6 = data0.submission_requirements;
                if (Array.isArray(data6)) {
                    const len0 = data6.length;
                    for (let i0 = 0; i0 < len0; i0++) {
                        if (!(validate45(data6[i0], { instancePath: instancePath + "/presentation_definition/submission_requirements/" + i0, parentData: data6, parentDataProperty: i0, rootData }))) {
                            vErrors = vErrors === null ? validate45.errors : vErrors.concat(validate45.errors);
                            errors = vErrors.length;
                        }
                    }
                }
                else {
                    const err7 = { instancePath: instancePath + "/presentation_definition/submission_requirements", schemaPath: "#/properties/presentation_definition/properties/submission_requirements/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema12.properties.presentation_definition.properties.submission_requirements.type, parentSchema: schema12.properties.presentation_definition.properties.submission_requirements, data: data6 };
                    if (vErrors === null) {
                        vErrors = [err7];
                    }
                    else {
                        vErrors.push(err7);
                    }
                    errors++;
                }
            }
            if (data0.input_descriptors !== undefined) {
                let data8 = data0.input_descriptors;
                if (Array.isArray(data8)) {
                    const len1 = data8.length;
                    for (let i1 = 0; i1 < len1; i1++) {
                        if (!(validate47(data8[i1], { instancePath: instancePath + "/presentation_definition/input_descriptors/" + i1, parentData: data8, parentDataProperty: i1, rootData }))) {
                            vErrors = vErrors === null ? validate47.errors : vErrors.concat(validate47.errors);
                            errors = vErrors.length;
                        }
                    }
                }
                else {
                    const err8 = { instancePath: instancePath + "/presentation_definition/input_descriptors", schemaPath: "#/properties/presentation_definition/properties/input_descriptors/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema12.properties.presentation_definition.properties.input_descriptors.type, parentSchema: schema12.properties.presentation_definition.properties.input_descriptors, data: data8 };
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
            const err9 = { instancePath: instancePath + "/presentation_definition", schemaPath: "#/properties/presentation_definition/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema12.properties.presentation_definition.type, parentSchema: schema12.properties.presentation_definition, data: data0 };
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
else {
    const err10 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema12.type, parentSchema: schema12, data };
    if (vErrors === null) {
        vErrors = [err10];
    }
    else {
        vErrors.push(err10);
    }
    errors++;
} validate42.errors = vErrors; return errors === 0; }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVQRHYyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3ZhbGlkYXRpb24vdmFsaWRhdGVQRHYyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0FBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0FBQUEsTUFBTSxRQUFRLEdBQUcsRUFBQyxTQUFTLEVBQUMseUNBQXlDLEVBQUMsT0FBTyxFQUFDLHlCQUF5QixFQUFDLGFBQWEsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsc0JBQXNCLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMseU9BQXlPLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLHlPQUF5TyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxnRUFBZ0UsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMseUJBQXlCLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLHNCQUFzQixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsYUFBYSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsWUFBWSxFQUFDLGFBQWEsQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLHlCQUF5QixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLENBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEVBQUMsYUFBYSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyx1Q0FBdUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxNQUFNLEVBQUMsYUFBYSxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxJQUFJLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyx3QkFBd0IsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBQyxNQUFNLEVBQUMsc0JBQXNCLEVBQUMsRUFBQyxhQUFhLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLGtCQUFrQixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxxQkFBcUIsRUFBQyxFQUFDLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLFVBQVUsRUFBQyxXQUFXLENBQUMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLENBQUMsVUFBVSxFQUFDLFdBQVcsQ0FBQyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxjQUFjLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLFVBQVUsRUFBQyxXQUFXLENBQUMsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsVUFBVSxFQUFDLFdBQVcsQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLElBQUksQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxJQUFJLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsa0JBQWtCLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLGdDQUFnQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsTUFBTSxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxJQUFJLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsa0JBQWtCLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLGdDQUFnQyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFdBQVcsQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMseUJBQXlCLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLElBQUksRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxzQkFBc0IsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsc0JBQXNCLEVBQUMsSUFBSSxFQUFDLEVBQUMseUJBQXlCLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyx1Q0FBdUMsRUFBQyxFQUFDLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxpQ0FBaUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxJQUFJLEVBQUMsbUJBQW1CLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLENBQUM7QUFBQSxNQUFNLFFBQVEsR0FBRyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLHlPQUF5TyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyx5T0FBeU8sRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsZ0VBQWdFLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLEtBQUssRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLHlCQUF5QixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxZQUFZLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxzQkFBc0IsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLGFBQWEsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVB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LENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0FBQUEsQ0FBQztLQUFLLENBQUM7SUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO0lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7UUFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUFBLENBQUM7U0FBSyxDQUFDO1FBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUFBLENBQUM7SUFBQSxNQUFNLEVBQUUsQ0FBQztBQUFBLENBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFBLE9BQU8sTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUM7QUFBQSxNQUFNLFFBQVEsR0FBRyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLENBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxFQUFDLGFBQWEsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsdUNBQXVDLEVBQUMsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsTUFBTSxFQUFDLGFBQWEsQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQztBQUFBLE1BQU0sUUFBUSxHQUFHLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQUEsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxHQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxHQUFDLElBQUksRUFBQyxHQUFDLEVBQUUsSUFBRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxJQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO0lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7UUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7U0FBSyxDQUFDO1FBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7SUFBQSxNQUFNLEVBQUUsQ0FBQztBQUFBLENBQUMsQ0FBQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQSxJQUFHLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsb0JBQW9CLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxlQUFlLEVBQUUsTUFBTSxFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLE1BQU0sR0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7UUFBQSxNQUFNLEVBQUUsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsb0JBQW9CLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxlQUFlLEVBQUUsTUFBTSxFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLE1BQU0sR0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7UUFBQSxNQUFNLEVBQUUsQ0FBQztJQUFBLENBQUM7SUFBQSxLQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsZ0NBQWdDLEVBQUMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sRUFBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyxxQ0FBcUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUMsQ0FBQztZQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLG1DQUFtQyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQztZQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dCQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztpQkFBSyxDQUFDO2dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQUEsTUFBTSxFQUFFLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFBQSxJQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBQyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsZ0NBQWdDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7UUFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLDRDQUE0QyxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsRUFB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LENBQUMsQ0FBQztnQkFBQSxDQUFDO2dCQUFBLE1BQU0sRUFBRSxDQUFDO1lBQUEsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7WUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7QUFBQSxDQUFDLENBQUEsSUFBSSxPQUFPLEdBQUcsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFBLElBQUcsT0FBTyxFQUFDLENBQUM7SUFBQSxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQUEsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUFBLENBQUMsQ0FBQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQSxJQUFHLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsb0JBQW9CLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxlQUFlLEVBQUUsTUFBTSxFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLE1BQU0sR0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFBLENBQUM7UUFBQSxNQUFNLEVBQUUsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsb0JBQW9CLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLGFBQWEsR0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFBLENBQUM7UUFBQSxNQUFNLEVBQUUsQ0FBQztJQUFBLENBQUM7SUFBQSxLQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsZ0NBQWdDLEVBQUMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sRUFBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyxxQ0FBcUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7WUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUMsQ0FBQztZQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLG1DQUFtQyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQztZQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dCQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUEsQ0FBQztpQkFBSyxDQUFDO2dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQUEsTUFBTSxFQUFFLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFBQSxJQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBQyxDQUFDO1lBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsZ0NBQWdDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7UUFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLDRDQUE0QyxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxNQUFNLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FB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O1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztRQUFBLElBQUcsT0FBTyxNQUFNLElBQUksUUFBUSxFQUFDLENBQUM7WUFBQSxJQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUM7Z0JBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsa0NBQWtDLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7Z0JBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7b0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUEsQ0FBQztxQkFBSyxDQUFDO29CQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUEsQ0FBQztnQkFBQSxNQUFNLEVBQUUsQ0FBQztZQUFBLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztZQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxNQUFN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LE9BQU8sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUEsSUFBRyxPQUFPLElBQUksTUFBTSxFQUFDLENBQUM7SUFBQSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQUEsUUFBUSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQUEsQ0FBQztLQUFLLENBQUM7SUFBQSxJQUFHLE9BQU8sRUFBQyxDQUFDO1FBQUEsTUFBTSxHQUFHLElBQUksQ0FBQztRQUFBLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFBQSxDQUFDO0FBQUEsQ0FBQyxDQUFBLElBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQztJQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBQyxjQUFjLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLHdDQUF3QyxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLENBQUM7SUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztRQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQUEsQ0FBQztTQUFLLENBQUM7UUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQUFBLE1BQU0sRUFBRSxDQUFDO0FBQUEsQ0FBQztLQUFLLENBQUM7SUFBQSxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7UUFBQSxJQUFHLE1BQU0sRUFBQyxDQUFDO1lBQUEsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFBQSxDQUFDO2FBQUssQ0FBQztZQUFBLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztBQUFBLENBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFBLE9BQU8sTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUM7QUFBQSxNQUFNLFFBQVEsR0FBRyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsd0JBQXdCLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLEVBQUMsYUFBYSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxrQkFBa0IsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLENBQUMsVUFBVSxFQUFDLFdBQVcsQ0FBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLENBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxZQUFZLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLENBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxZQUFZLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLENBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxZQUFZLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMscUJBQXFCLEVBQUMsRUFBQyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLFVBQVUsRUFBQyxXQUFXLENBQUMsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsVUFBVSxFQUFDLFdBQVcsQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsY0FBYyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLFVBQVUsRUFBQyxXQUFXLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsQ0FBQztBQUFBLE1BQU0sUUFBUSxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxzQkFBc0IsRUFBQyxJQUFJLEVBQUMsQ0FBQztBQUFBLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFDLFlBQVksR0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsR0FBQyxJQUFJLEVBQUMsR0FBQyxFQUFFLElBQUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUEsSUFBRyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyw0QkFBNEIsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0FBQUEsQ0FBQztLQUFLLENBQUM7SUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO0lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7UUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7U0FBSyxDQUFDO1FBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7SUFBQSxNQUFNLEVBQUUsQ0FBQztBQUFBLENBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFBLE9BQU8sTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUM7QUFBQSxNQUFNLFFBQVEsR0FBRyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxJQUFJLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsa0JBQWtCLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLGdDQUFnQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsTUFBTSxDQUFDLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxJQUFJLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsa0JBQWtCLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLGdDQUFnQyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFdBQVcsQ0FBQyxFQUFDLHNCQUFzQixFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQztBQUFBLE1BQU0sT0FBTyxHQUFHLEVBQUMsU0FBUyxFQUFDLHlDQUF5QyxFQUFDLEtBQUssRUFBQyx5Q0FBeUMsRUFBQyxPQUFPLEVBQUMseUJBQXlCLEVBQUMsYUFBYSxFQUFDLEVBQUMsYUFBYSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLG9CQUFvQixFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEVBQUMsNEJBQTRCLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxrQ0FBa0MsRUFBQyxFQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxhQUFhLEVBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsRUFBQyxFQUFDLGFBQWEsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsUUFBUSxFQUFDLFNBQVMsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFDLEtBQUssRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLGVBQWUsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLGVBQWUsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsYUFBYSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxrQkFBa0IsRUFBQyxDQUFDLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsa0JBQWtCLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLGtCQUFrQixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxrQ0FBa0MsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQywwQ0FBMEMsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLGlCQUFpQixFQUFDLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLDJCQUEyQixFQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLGtDQUFrQyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLDBDQUEwQyxFQUFDLEVBQUMsYUFBYSxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxFQUFDLGVBQWUsRUFBQyxFQUFDLE1BQU0sRUFBQyxrQ0FBa0MsRUFBQyxFQUFDLGVBQWUsRUFBQyxFQUFDLE1BQU0sRUFBQywwQ0FBMEMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLE1BQU0sRUFBQywyQkFBMkIsRUFBQyxFQUFDLHNCQUFzQixFQUFDLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxFQUFDLGFBQWEsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsc0JBQXNCLEVBQUMsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsc0JBQXNCLEVBQUMsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxzQkFBc0IsRUFBQyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsRUFBQyxlQUFlLEVBQUMsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxFQUFDLGNBQWMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsc0JBQXNCLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQywyQkFBMkIsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLGVBQWUsRUFBQyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQywyQkFBMkIsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsMkJBQTJCLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLGtCQUFrQixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLGlCQUFpQixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLElBQUksRUFBQyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQywyQkFBMkIsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQywyQkFBMkIsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQywyQkFBMkIsRUFBQyxFQUFDLEtBQUssRUFBQyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsQ0FBQztBQUFBLE1BQU0sT0FBTyxHQUFHLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLENBQUM7QUFBQSxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEdBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEdBQUMsSUFBSSxFQUFDLEdBQUMsRUFBRSxJQUFFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFBLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO0lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQztJQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO1FBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQSxDQUFDO1NBQUssQ0FBQztRQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQSxDQUFDO0lBQUEsTUFBTSxFQUFFLENBQUM7QUFBQSxDQUFDLENBQUEsSUFBRyxPQUFPLElBQUksSUFBSSxRQUFRLEVBQUMsQ0FBQztJQUFBLElBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQztRQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO1lBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQSxDQUFDO2FBQUssQ0FBQztZQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQSxDQUFDO1FBQUEsTUFBTSxFQUFFLENBQUM7SUFBQSxDQUFDO0FBQUEsQ0FBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUEsT0FBTyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUEsQ0FBQztBQUFBLE1BQU0sT0FBTyxHQUFHLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsa0NBQWtDLEVBQUMsRUFBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7QUFBQSxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEdBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEdBQUMsSUFBSSxFQUFDLEdBQUMsRUFBRSxJQUFFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFBLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLGtCQUFrQixFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDO0lBQUEsT0FBTyxHQUFHLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFBQSxDQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQSxPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO0FBQUEsTUFBTSxPQUFPLEdBQUcsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxFQUFDLENBQUM7QUFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUMsQ0FBQztBQUFBLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFDLFlBQVksR0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsR0FBQyxJQUFJLEVBQUMsR0FBQyxFQUFFLElBQUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUEsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLENBQUM7UUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxrQ0FBa0MsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7UUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztZQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUEsQ0FBQzthQUFLLENBQUM7WUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUEsQ0FBQztRQUFBLE1BQU0sRUFBRSxDQUFDO0lBQUEsQ0FBQztJQUFBLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFBQSxLQUFJLElBQUksRUFBRSxHQUFDLENBQUMsRUFBRSxFQUFFLEdBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFBQSxJQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLGtCQUFrQixFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztZQUFBLE9BQU8sR0FBRyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztBQUFBLENBQUM7S0FBSyxDQUFDO0lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sRUFBQyxPQUFPLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7SUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztRQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUEsQ0FBQztTQUFLLENBQUM7UUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQUFBLE1BQU0sRUFBRSxDQUFDO0FBQUEsQ0FBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUEsT0FBTyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUEsQ0FBQztBQUFBLE1BQU0sUUFBUSxHQUFHLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsYUFBYSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFDLENBQUM7QUFBQSxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEdBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEdBQUMsSUFBSSxFQUFDLEdBQUMsRUFBRSxJQUFFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFBLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDO0lBQUEsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUFBLEtBQUksSUFBSSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUMsQ0FBQztRQUFBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsRUFBQyxVQUFVLEVBQUMsY0FBYyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUFBLElBQUksRUFBRSxDQUFDO0lBQUEsSUFBRyxFQUFFLEdBQUcsQ0FBQyxFQUFDLENBQUM7UUFBQSxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFBQSxPQUFLLEVBQUUsRUFBRSxHQUFFLENBQUM7WUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBQyxDQUFDO2dCQUFBLFNBQVM7WUFBQSxDQUFDO1lBQUEsSUFBRyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLEVBQUMsQ0FBQztnQkFBQSxFQUFFLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxlQUFlLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUMsRUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUMsRUFBQyxPQUFPLEVBQUMsMENBQTBDLEdBQUMsRUFBRSxHQUFDLE9BQU8sR0FBQyxFQUFFLEdBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO2dCQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO29CQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUFBLENBQUM7cUJBQUssQ0FBQztvQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUFBLENBQUM7Z0JBQUEsTUFBTSxFQUFFLENBQUM7Z0JBQUEsTUFBTTtZQUFBLENBQUM7WUFBQSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7QUFBQSxDQUFDO0tBQUssQ0FBQztJQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO0lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7UUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7U0FBSyxDQUFDO1FBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7SUFBQSxNQUFNLEVBQUUsQ0FBQztBQUFBLENBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFBLE9BQU8sTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUM7QUFBQSxNQUFNLFFBQVEsR0FBRyxFQUFDLE1BQU0sRUFBQyxDQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUM7QUFBQSxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEdBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEdBQUMsSUFBSSxFQUFDLEdBQUMsRUFBRSxJQUFFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFBLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDO0lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLDRDQUE0QyxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLENBQUM7SUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztRQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUEsQ0FBQztTQUFLLENBQUM7UUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQUFBLE1BQU0sRUFBRSxDQUFDO0FBQUEsQ0FBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUEsT0FBTyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUEsQ0FBQztBQUFBLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUFBLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFDLFlBQVksR0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsR0FBQyxJQUFJLEVBQUMsR0FBQyxFQUFFLElBQUUsMERBQTBELENBQUEsQ0FBQyxDQUFBLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFBLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssU0FBUyxDQUFDLEVBQUMsQ0FBQztJQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLEVBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDO0lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7UUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7U0FBSyxDQUFDO1FBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7SUFBQSxNQUFNLEVBQUUsQ0FBQztBQUFBLENBQUMsQ0FBQSxJQUFHLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLEVBQUMsQ0FBQztZQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLHlCQUF5QixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLEVBQUMsQ0FB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QUFDLGtCQUFrQixFQUFDLGlCQUFpQixFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1lBQUEsT0FBTyxHQUFHLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFBQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFBQSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFBQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFBQSxJQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxrQkFBa0IsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFBQSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUFBLENBQUM7UUFBQSxJQUFJLE9BQU8sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDO1FBQUEsTUFBTSxHQUFHLE1BQU0sSUFBSSxPQUFPLENBQUM7UUFBQSxJQUFHLENBQUMsTUFBTSxFQUFDLENBQUM7WUFBQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFBQSxJQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUMs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QU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7Z0NBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7b0NBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQUEsQ0FBQztxQ0FBSyxDQUFDO29DQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQUEsQ0FBQztnQ0FBQSxNQUFNLEVBQUUsQ0FBQztnQ0FBQSxNQUFNLE1BQU0sQ0FBQzs0QkFBQSxDQUFDO3dCQUFBLENBQUM7b0JBQUEsQ0FBQztnQkFBQSxDQUFDO1lBQUEsQ0FBQztpQkFBSyxDQUFDO2dCQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLGdDQUFnQyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7Z0JBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7b0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUEsQ0FBQztxQkFBSyxDQUFDO29CQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUEsQ0FBQztnQkFBQSxNQUFNLEVBQUUsQ0FBQztZQUFBLENBQUM7WUFBQSxJQUFJLE9BQU8sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDO1lBQUEsTUFBTSxHQUFHLE1BQU0sSUFBSSxPQUFP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QUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQUEsTUFBTSxFQUFFLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFBQSxJQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBQyxDQUFDO1lBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLGtCQUFrQixFQUFDLFVBQVUsRUFBQyxtQ0FBbUMsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLGtCQUFrQixFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztZQUFBLE9BQU8sR0FBRyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1lBQUEsT0FBTyxHQUFHLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxrQkFBa0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFBQSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLGtCQUFrQixFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztZQUFBLE9BQU8sR0FBRyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsa0JBQWtCLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1lBQUEsT0FBTyxHQUFHLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxrQkFBa0IsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFBQSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLGtCQUFrQixFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztZQUFBLE9BQU8sR0FBRyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7QUFBQSxDQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQSxPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO0FBQUEsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxHQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxHQUFDLElBQUksRUFBQyxHQUFDLEVBQUUsSUFBRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxJQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO0lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7UUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7U0FBSyxDQUFDO1FBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFBLENBQUM7SUFBQSxNQUFNLEVBQUUsQ0FBQztBQUFBLENBQUMsQ0FBQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQSxJQUFHLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsb0JBQW9CLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxlQUFlLEVBQUUsTUFBTSxFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLE1BQU0sR0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7UUFBQSxNQUFNLEVBQUUsQ0FBQztJQUFBLENBQUM7SUFBQSxLQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLGdDQUFnQyxFQUFDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLEVBQUMsRUFBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsRUFBQyxPQUFPLEVBQUMscUNBQXFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQztZQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dCQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztpQkFBSyxDQUFDO2dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQUEsTUFBTSxFQUFFLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLEVBQUUsS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFBQSxJQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBQyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsOEJBQThCLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUFBLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO1lBQUEsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUFBLEtBQUksSUFBSSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUMsQ0FBQztn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Q0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUMsQ0FBQztZQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLGdDQUFnQyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQztZQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dCQUFBLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztpQkFBSyxDQUFDO2dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQUEsTUFBTSxFQUFFLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztBQUFBLENBQUMsQ0FBQSxJQUFJLE9BQU8sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUEsSUFBRyxPQUFPLEVBQUMsQ0FBQztJQUFBLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFBQSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQUEsQ0FBQyxDQUFBLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FB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SUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLGtCQUFrQixFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztZQUFBLE9BQU8sR0FBRyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQUEsSUFBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUMsQ0FBQztZQUFBLE1BQU0sS0FBSyxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLHFDQUFxQyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQztZQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dCQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUEsQ0FBQztpQkFBSyxDQUFDO2dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQUEsTUFBTSxFQUFFLENBQUM7UUFBQSxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDO1lBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMscUNBQXFDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyw0Q0FBNEMsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQztZQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO2dCQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUEsQ0FBQztpQkFBSyxDQUFDO2dCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQUEsTUFBTSxFQUFFLENBQUM7UUFBQSxDQUFDO0lBQUEsQ0FBQztJQUFBLElBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUMsQ0FBQztRQUFBLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFBQSxJQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBQyxDQUFDO1lBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsZ0NBQWdDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDO1lBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0JBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQSxDQUFDO2lCQUFLLENBQUM7Z0JBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLENBQUM7WUFBQSxNQUFNLEVBQUUsQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0FBQUEsQ0FBQyxDQUFBLElBQUksT0FBTyxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQSxJQUFHLE9BQU8sSUFBSSxNQUFNLEVBQUMsQ0FBQztJQUFBLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFBQSxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFBQSxDQUFDO0tBQUssQ0FBQztJQUFBLElBQUcsT0FBTyxFQUFDLENBQUM7UUFBQSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQUEsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUFBLENBQUM7QUFBQSxDQUFDLENBQUEsSUFBRyxDQUFDLE1BQU0sRUFBQyxDQUFDO0lBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxFQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsd0NBQXdDLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsQ0FBQztJQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO1FBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFBQSxDQUFDO1NBQUssQ0FBQztRQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFBQSxDQUFDO0lBQUEsTUFBTSxFQUFFLENBQUM7QUFBQSxDQUFDO0tBQUssQ0FBQztJQUFBLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztRQUFBLElBQUcsTUFBTSxFQUFDLENBQUM7WUFBQSxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsT0FBTyxHQUFHLElBQUksQ0FBQztRQUFBLENBQUM7SUFBQSxDQUFDO0FBQUEsQ0FBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUEsT0FBTyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUEsQ0FBQztBQUFBLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFDLFlBQVksR0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsR0FBQyxJQUFJLEVBQUMsR0FBQyxFQUFFLElBQUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUEsSUFBRyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDO0lBQUEsSUFBRyxJQUFJLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQUEsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUMsRUFBQyxPQUFPLEVBQUMsK0JBQStCLEdBQUMsSUFBSSxHQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7WUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7YUFBSyxDQUFDO1lBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFBLENBQUM7UUFBQSxNQUFNLEVBQUUsQ0FBQztJQUFBLENBQUM7SUFBQSxLQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBQyxDQUFDO1FBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFBQSxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsd0JBQXdCLEVBQUMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sRUFBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyxxQ0FBcUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUMsQ0FBQztZQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLHNCQUFzQixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUMsQ0FBQztZQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLHdCQUF3QixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQztnQkFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFBLENBQUM7aUJBQUssQ0FBQztnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUFBLE1BQU0sRUFBRSxDQUFDO1FBQUEsQ0FBQztJQUFBLENBQUM7SUFBQSxJQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFDLENBQUM7UUFBQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQUEsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUMsQ0FBQztZQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLDJCQUEyQixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFN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QVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQztvQ0FBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUMsQ0FBQzt3Q0FBQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO3lDQUFLLENBQUM7d0NBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FBQSxDQUFDO29DQUFBLE1BQU0sRUFBRSxDQUFDO2dDQUFBLENBQUM7NEJBQUEsQ0FBQzt3QkFBQSxDQUFDOzZCQUFLLENBQUM7NEJBQUEsTUFBTSxLQUFLLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLGlDQUFpQyxFQUFDLFVBQVUsRUFBQyx3RUFBd0UsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7NEJBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDLENBQUM7Z0NBQUEsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQUEsQ0FBQztpQ0FBSyxDQUFDO2dDQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQUEsQ0FBQzs0QkFBQSxNQUFNLEVB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QWEsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyw0Q0FBNEMsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDO29DQUFBLElBQUcsT0FBTyxLQUFLLElBQUksRUFBQyxDQUFDO3dDQUFBLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUFBLENBQUM7eUNBQUssQ0FBQzt3Q0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUFBLENBQUM7b0NBQUEsTUFBTSxFQUFFLENBQUM7Z0NBQUEsQ0FBQzs0QkFBQSxDQUFDO3dCQUFBLENBQUM7NkJBQUssQ0FBQzs0QkFBQSxNQUFNLEtBQUssR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsNEJBQTRCLEdBQUcsRUFBRSxFQUFDLFVBQVUsRUFBQyw2REFBNkQsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDOzRC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