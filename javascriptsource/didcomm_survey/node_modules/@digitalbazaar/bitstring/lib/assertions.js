/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
export function isNumber(value, name) {
  if(typeof value !== 'number') {
    throw new TypeError(`"${name}" must be number.`);
  }
}

export function isPositiveInteger(value, name) {
  if(!(Number.isInteger(value) && value > 0)) {
    throw new TypeError(`"${name}" must be a positive integer.`);
  }
}

export function isString(value, name) {
  if(typeof value !== 'string') {
    throw new TypeError(`"${name}" must be a string.`);
  }
}

export function isBoolean(value, name) {
  if(typeof value !== 'boolean') {
    throw new TypeError(`"${name}" must be a boolean.`);
  }
}

export function isNonNegativeInteger(value, name) {
  if(!(Number.isInteger(value) && value >= 0)) {
    throw new TypeError(`"${name}" must be a non-negative integer.`);
  }
}

export function isUint8Array(value, name) {
  if(!(value instanceof Uint8Array)) {
    throw new TypeError(`"${name}" must be a Uint8Array.`);
  }
}
