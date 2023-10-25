import moment from 'moment';
import { ActivityInput, VersionOptions } from '../models';
import { ActivityInputContext } from '../services/activity-input-driver';
export interface Hash<TValue> {
  [key: string]: TValue;
}
export declare function formatTimestamp(timestamp?: Date, defaultText?: string): string;
export declare function formatTime(timestamp?: Date, defaultText?: string): string;
export declare function getDuration(a: Date, b: Date): moment.Duration;
export declare function getObjectOrParseJson(value: string | object): any;
export declare function parseJson(json: string): any;
export declare const getVersionOptionsString: (versionOptions?: VersionOptions) => string;
export declare const mapSyntaxToLanguage: (syntax: string) => string;
export declare const getInputPropertyName: (inputContext: ActivityInputContext) => any;
export declare const getInputPropertyValue: (inputContext: ActivityInputContext) => ActivityInput;
export declare const getPropertyValue: (inputContext: ActivityInputContext) => any;
export declare const stripActivityNameSpace: (name: string) => string;
export declare const isNullOrWhitespace: (input: any) => boolean;
export declare const serializeQueryString: (queryString: object) => string;
export declare function durationToString(duration: moment.Duration): string;
export declare function htmlToElement<TElement>(html: string): TElement;
export declare function generateIdentity(): any;
export declare function formatTextWithLineBreaks(text: any): any;
