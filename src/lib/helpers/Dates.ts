import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

export const FULL_DATE_FORMAT = "dddd, MMMM DD, YYYY";
export const TIME_FORMAT = "h:mm A";
export const PICKER_FORMAT = "YYYY-MM-DD[T]HH:mm:ss";

export const SHORT_DATE = "YYYY-MM-DD";

export const ADVANCED_DATE = "MMM Do";
export const ADVANCED_DATE_WITH_YEAR = "MMM Do, YYYY";

export const DATE_FORMAT = "MM/DD/YY";

export const BASIC_FORMAT = "YYYY-MM-DD h:mm A";

export const DATE_TIME_FORMAT = "MM/DD/YY [at] H:mm A";
export const DATE_TIME_WEEKDAY_FORMAT = "dddd [at] H:mm A";

export const getFullDateFormat = (date?: string) =>
    dayjs(date).format(FULL_DATE_FORMAT);

export const getNowJSDate = () => dayjs().toDate();

export const getNowUTCDate = () => dayjs.utc().toDate();

export const getTimeFormat = (date: string | Date) =>
    dayjs(date).format(TIME_FORMAT);

export const getDateFormat = (date: string) => {
    return dayjs(date).format(DATE_FORMAT);
};

export const isAfterCurrentTime = (date: string) =>
    dayjs(date)
        .isAfter(dayjs(), "minute");

export const isSelectedDayAfterLastCheckin = (
    selectedDay: string,
    lastCheckinDay: string,
): boolean => {
    return dayjs(selectedDay).isAfter(dayjs(lastCheckinDay), "day");
};

export const getStringWithTimezone = (date?: string | Date) =>
    dayjs(date).format(PICKER_FORMAT);

export const getShortDate = () => dayjs().format(SHORT_DATE);

export const getBasicDate = (date?: string) => dayjs(date).format(BASIC_FORMAT);

export const addDay = (date: string) =>
    dayjs(date).add(1, "day").format(SHORT_DATE);

export const addNDays = (date: string, days: number) =>
    dayjs(date).add(days, "day").format(SHORT_DATE);

export const reduceDay = (date: string) =>
    dayjs(date).subtract(1, "day").format(SHORT_DATE);

export const isCurrentMonth = (date: string) =>
    dayjs(date).isSame(dayjs(), "month");

export const isToday = (date: string) => dayjs(date).isSame(dayjs(), "day");

export const addOneMonth = (date: Date = new Date()) =>
    dayjs(date).add(1, "month").toDate();

export const subtractOneMonth = (date: Date = new Date()) =>
    dayjs(date).subtract(1, "month").toDate();

export const formatMonth = (date: Date) => dayjs(date).format("MMMM YYYY");

export const getShortDateFormat = (date?: Date | string) =>
    dayjs(date).format(SHORT_DATE);

export const getAdvancedDateFormat = (date?: Date | string) =>
    dayjs(date).format(ADVANCED_DATE);

export const getAdvancedDateWithYearFormat = (date?: Date | string) =>
    dayjs(date).format(ADVANCED_DATE_WITH_YEAR);
