export type TemperatureUnit = "celsius" | "fahrenheit";
export type Calendar = "gregorian" | "buddhist" | "coptic" | "ethiopic" | "ethiopic-amete-alem" | "hebrew" | "indian" | "islamic" | "islamic-umm-al-qura" | "islamic-civil" | "islamic-tabular" | "iso8601" | "japanese" | "persian";
export type Locale = Readonly<{
    languageCode: string;
    scriptCode?: string;
    countryCode: string;
    languageTag: string;
    isRTL: boolean;
}>;
export type NumberFormatSettings = Readonly<{
    decimalSeparator: string;
    groupingSeparator: string;
}>;
//# sourceMappingURL=types.d.ts.map