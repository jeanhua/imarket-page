export class TimeConvert {
    public static Convert(dateString: string): string {
        const targetDate = new Date(dateString);
        const currentDate = new Date(); // 当前时间
        const timeDifference = currentDate.getTime() - targetDate.getTime();
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);
        if (years > 0) {
            return `${years}年前`;
        } else if (months > 0) {
            return `${months}个月前`;
        } else if (days > 0) {
            return `${days}天前`;
        } else if (hours > 0) {
            return `${hours}小时前`;
        } else {
            if (minutes < 3) {
                return "刚刚";
            }
            return `${minutes}分钟前`;
        }
    }
}
