"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateTrigger;
const utils_1 = require("../utils");
const Trigger_1 = require("../types/Trigger");
const MINIMUM_INTERVAL = 15;
function isMinimumInterval(interval, timeUnit) {
    switch (timeUnit) {
        case Trigger_1.TimeUnit.SECONDS:
            return interval / 60 >= MINIMUM_INTERVAL;
        case Trigger_1.TimeUnit.MINUTES:
            return interval >= MINIMUM_INTERVAL;
        case Trigger_1.TimeUnit.HOURS:
            return interval >= 1;
        case Trigger_1.TimeUnit.DAYS:
            return interval >= 1;
    }
    return true;
}
function validateTrigger(trigger) {
    if (!(0, utils_1.isObject)(trigger)) {
        throw new Error("'trigger' expected an object value.");
    }
    switch (trigger.type) {
        case Trigger_1.TriggerType.TIMESTAMP:
            return validateTimestampTrigger(trigger);
        case Trigger_1.TriggerType.INTERVAL:
            return validateIntervalTrigger(trigger);
        default:
            throw new Error('Unknown trigger type');
    }
}
function validateTimestampTrigger(trigger) {
    if (!(0, utils_1.isNumber)(trigger.timestamp)) {
        throw new Error("'trigger.timestamp' expected a number value.");
    }
    const now = Date.now();
    if (trigger.timestamp <= now) {
        throw new Error("'trigger.timestamp' date must be in the future.");
    }
    const out = {
        type: trigger.type,
        timestamp: trigger.timestamp,
        repeatFrequency: -1,
    };
    if ((0, utils_1.objectHasProperty)(trigger, 'repeatFrequency') && !(0, utils_1.isUndefined)(trigger.repeatFrequency)) {
        if (!(0, utils_1.isValidEnum)(trigger.repeatFrequency, Trigger_1.RepeatFrequency)) {
            throw new Error("'trigger.repeatFrequency' expected a RepeatFrequency value.");
        }
        out.repeatFrequency = trigger.repeatFrequency;
    }
    if ((0, utils_1.objectHasProperty)(trigger, 'alarmManager') && !(0, utils_1.isUndefined)(trigger.alarmManager)) {
        if ((0, utils_1.isBoolean)(trigger.alarmManager)) {
            if (trigger.alarmManager) {
                out.alarmManager = validateTimestampAlarmManager();
            }
        }
        else {
            try {
                out.alarmManager = validateTimestampAlarmManager(trigger.alarmManager);
            }
            catch (e) {
                throw new Error(`'trigger.alarmManager' ${e.message}.`);
            }
        }
    }
    return out;
}
function validateTimestampAlarmManager(alarmManager) {
    const out = {
        type: Trigger_1.AlarmType.SET_EXACT,
    };
    if (!alarmManager) {
        return out;
    }
    if ((0, utils_1.isBoolean)(alarmManager.allowWhileIdle) && alarmManager.allowWhileIdle) {
        out.type = Trigger_1.AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE;
    }
    if ((0, utils_1.objectHasProperty)(alarmManager, 'type') && !(0, utils_1.isUndefined)(alarmManager.type)) {
        if (!(0, utils_1.isValidEnum)(alarmManager.type, Trigger_1.AlarmType)) {
            throw new Error("'alarmManager.type' expected a AlarmType value.");
        }
        out.type = alarmManager.type;
    }
    return out;
}
function validateIntervalTrigger(trigger) {
    if (!(0, utils_1.isNumber)(trigger.interval)) {
        throw new Error("'trigger.interval' expected a number value.");
    }
    const out = {
        type: trigger.type,
        interval: trigger.interval,
        timeUnit: Trigger_1.TimeUnit.SECONDS,
    };
    if ((0, utils_1.objectHasProperty)(trigger, 'timeUnit') && !(0, utils_1.isUndefined)(trigger.timeUnit)) {
        if (!(0, utils_1.isValidEnum)(trigger.timeUnit, Trigger_1.TimeUnit)) {
            throw new Error("'trigger.timeUnit' expected a TimeUnit value.");
        }
        out.timeUnit = trigger.timeUnit;
    }
    if (!isMinimumInterval(trigger.interval, out.timeUnit)) {
        throw new Error("'trigger.interval' expected to be at least 15 minutes.");
    }
    return out;
}
//# sourceMappingURL=validateTrigger.js.map