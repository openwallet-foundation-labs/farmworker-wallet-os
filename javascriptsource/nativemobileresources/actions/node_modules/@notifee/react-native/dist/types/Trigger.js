"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerType = exports.TimeUnit = exports.RepeatFrequency = exports.AlarmType = void 0;
/**
 * An interface representing the different alarm types which can be used with `TimestampTrigger.alarmManager.type`.
 *
 * View the [Triggers](/react-native/triggers) documentation to learn more.
 */
var AlarmType;
(function (AlarmType) {
    AlarmType[AlarmType["SET"] = 0] = "SET";
    AlarmType[AlarmType["SET_AND_ALLOW_WHILE_IDLE"] = 1] = "SET_AND_ALLOW_WHILE_IDLE";
    AlarmType[AlarmType["SET_EXACT"] = 2] = "SET_EXACT";
    AlarmType[AlarmType["SET_EXACT_AND_ALLOW_WHILE_IDLE"] = 3] = "SET_EXACT_AND_ALLOW_WHILE_IDLE";
    AlarmType[AlarmType["SET_ALARM_CLOCK"] = 4] = "SET_ALARM_CLOCK";
})(AlarmType || (exports.AlarmType = AlarmType = {}));
/**
 * An interface representing the different frequencies which can be used with `TimestampTrigger.repeatFrequency`.
 *
 * View the [Triggers](/react-native/triggers) documentation to learn more.
 */
var RepeatFrequency;
(function (RepeatFrequency) {
    RepeatFrequency[RepeatFrequency["NONE"] = -1] = "NONE";
    RepeatFrequency[RepeatFrequency["HOURLY"] = 0] = "HOURLY";
    RepeatFrequency[RepeatFrequency["DAILY"] = 1] = "DAILY";
    RepeatFrequency[RepeatFrequency["WEEKLY"] = 2] = "WEEKLY";
})(RepeatFrequency || (exports.RepeatFrequency = RepeatFrequency = {}));
/**
 * An interface representing the different units of time which can be used with `IntervalTrigger.timeUnit`.
 *
 * View the [Triggers](/react-native/triggers) documentation to learn more.
 */
var TimeUnit;
(function (TimeUnit) {
    TimeUnit["SECONDS"] = "SECONDS";
    TimeUnit["MINUTES"] = "MINUTES";
    TimeUnit["HOURS"] = "HOURS";
    TimeUnit["DAYS"] = "DAYS";
})(TimeUnit || (exports.TimeUnit = TimeUnit = {}));
/**
 * Available Trigger Types.
 *
 * View the [Triggers](/react-native/triggers) documentation to learn more with example usage.
 */
var TriggerType;
(function (TriggerType) {
    TriggerType[TriggerType["TIMESTAMP"] = 0] = "TIMESTAMP";
    TriggerType[TriggerType["INTERVAL"] = 1] = "INTERVAL";
})(TriggerType || (exports.TriggerType = TriggerType = {}));
//# sourceMappingURL=Trigger.js.map