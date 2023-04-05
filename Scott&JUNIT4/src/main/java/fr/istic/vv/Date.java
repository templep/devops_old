package fr.istic.vv;

class Date implements Comparable<Date> {
    private final int m_day;
    private final int m_month;
    private final int m_year;

    public Date(int day, int month, int year) {
        this.m_day = day;
        this.m_month = month;
        this.m_year = year;
    }

    public static boolean isValidDate(int day, int month, int year) {
        if (day < 1 || day > 31 || month < 1 || month > 12 || year < 0) {
            return false;
        }
        if (month == 2) {
            if (isLeapYear(year)) {
                return day <= 29;
            } else {
                return day <= 28;
            }
        }
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            return day <= 30;
        }
        return true;
    }

    public static boolean isLeapYear(int year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    public Date nextDate() {
        if (isValidDate(m_day, m_month, m_year)) {
            if (m_day == 31 && m_month == 12) {
                return new Date(1, 1, m_year + 1);
            }
            if (m_day == 31 && (m_month == 1 || m_month == 3 || m_month == 5 || m_month == 7 || m_month == 8 || m_month == 10)) {
                return new Date(1, m_month + 1, m_year);
            }
            if (m_day == 30 && (m_month == 4 || m_month == 6 || m_month == 9 || m_month == 11)) {
                return new Date(1, m_month + 1, m_year);
            }
            if (m_day == 28 && m_month == 2 && !isLeapYear(m_year)) {
                return new Date(1, 3, m_year);
            }
            if (m_day == 29 && m_month == 2 && isLeapYear(m_year)) {
                return new Date(1, 3, m_year);
            }
            return new Date(m_day + 1, m_month, m_year);
        }
        return null;
    }

    public Date previousDate() {
        if (isValidDate(m_day, m_month, m_year)) {
            if (m_day == 1 && m_month == 1) {
                return new Date(31, 12, m_year - 1);
            }
            if (m_day == 1 && (m_month == 2 || m_month == 4 || m_month == 6 || m_month == 8 || m_month == 9 || m_month == 11)) {
                return new Date(31, m_month - 1, m_year);
            }
            if (m_day == 1 && (m_month == 5 || m_month == 7 || m_month == 10 || m_month == 12)) {
                return new Date(30, m_month - 1, m_year);
            }
            if (m_day == 1 && m_month == 3 && !isLeapYear(m_year)) {
                return new Date(28, 2, m_year);
            }
            if (m_day == 1 && m_month == 3 && isLeapYear(m_year)) {
                return new Date(29, 2, m_year);
            }
            return new Date(m_day - 1, m_month, m_year);
        }
        return null;

    }

    public int compareTo(Date other) {
        if (m_year < other.m_year) {
            return -1;
        }
        if (m_year > other.m_year) {
            return 1;
        }
        if (m_month < other.m_month) {
            return -1;
        }
        if (m_month > other.m_month) {
            return 1;
        }
        if (m_day < other.m_day) {
            return -1;
        }
        if (m_day > other.m_day) {
            return 1;
        }
        return 0;
    }

    public int getM_day() {
        return m_day;
    }

    public int getM_month() {
        return m_month;
    }

    public int getM_year() {
        return m_year;
    }

    public String toString() {
        return String.format("%02d/%02d/%04d", m_day, m_month, m_year);
    }

    public boolean equals(Object o) {
        if (o == null) {
            return false;
        }
        if (o == this) {
            return true;
        }
        if (!(o instanceof Date)) {
            return false;
        }
        Date other = (Date) o;
        return m_day == other.m_day && m_month == other.m_month && m_year == other.m_year;
    }
}

