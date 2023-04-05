package fr.istic.vv;

import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.*;

public class DateTest {
    @Test
    public void testNextDateEndOfYear() {
        int NotLeapYear = 2017; // 2017 % 4 != 0
        Date date = new Date(31, 12, NotLeapYear);
        assertEquals(new Date(1, 1, NotLeapYear + 2), date.nextDate()); // ajout d'une erreur
    }


    @Test
    public void testNextDateEndOfMonth() {
        int NotLeapYear = 2017; // 2017 % 4 != 0
        Date date = new Date(31, 1, NotLeapYear);
        assertEquals(new Date(1, 2, NotLeapYear), date.nextDate());
    }

    @Test
    public void testNextDateEndOfThirtyDaysMonthWith30Day() {
        int NotLeapYear = 2017; // 2017 % 4 != 0
        int day = 30;

        ArrayList<Date> Actual = new ArrayList<>();
        Actual.add((new Date(day, 4, NotLeapYear)).nextDate());
        Actual.add((new Date(day, 6, NotLeapYear)).nextDate());
        Actual.add((new Date(day, 9, NotLeapYear)).nextDate());
        Actual.add((new Date(day, 11, NotLeapYear)).nextDate());

        ArrayList<Date> Expected = new ArrayList<>();
        Expected.add(new Date(1, 5, NotLeapYear));
        Expected.add(new Date(1, 7, NotLeapYear));
        Expected.add(new Date(1, 10, NotLeapYear));
        Expected.add(new Date(1, 12, NotLeapYear));
        assertEquals(Actual,Expected);
    }


    @Test
    public void testNextDateEndOfThirtyOneDaysMonth() {
        int NotLeapYear = 2017; // 2017 % 4 != 0
        int day = 31;
        ArrayList<Date> Actual = new ArrayList<>();
        Actual.add((new Date(day, 1, NotLeapYear)).nextDate());
        Actual.add((new Date(day, 3, NotLeapYear)).nextDate());
        Actual.add((new Date(day, 5, NotLeapYear)).nextDate());
        Actual.add((new Date(day, 7, NotLeapYear)).nextDate());
        Actual.add((new Date(day, 8, NotLeapYear)).nextDate());
        Actual.add((new Date(day, 10, NotLeapYear)).nextDate());

        ArrayList<Date> Expected = new ArrayList<>();
        Expected.add(new Date(1, 2, NotLeapYear));
        Expected.add(new Date(1, 4, NotLeapYear));
        Expected.add(new Date(1, 6, NotLeapYear));
        Expected.add(new Date(1, 8, NotLeapYear));
        Expected.add(new Date(1, 9, NotLeapYear));
        Expected.add(new Date(1, 11, NotLeapYear));

        assertEquals(Actual,Expected);

    }

    @Test
    public void testNextDateWithMonth2Day28NotLeapYear() {
        int NotLeapYear = 2017; // 2017 % 4 != 0
        Date date = new Date(28, 2, NotLeapYear);
        assertEquals(new Date(1, 3, NotLeapYear), date.nextDate());
    }

    @Test
    public void testNextDateWithMonth2Day29LeapYear() {
        int LeapYear = 2016; // 2016 % 4 = 0 and 2016 % 100 != 0 or 2016 % 400 = 0
        Date date = new Date(29, 2, LeapYear);
        assertEquals(new Date(1, 3, LeapYear), date.nextDate());
    }

    @Test
    public void testNextDate() {
        int LeapYear = 2016; // 2016 % 4 = 0 and 2016 % 100 != 0 or 2016 % 400 = 0
        Date date = new Date(15, 11, LeapYear);
        assertEquals(new Date(16, 11, LeapYear), date.nextDate());
    }

    @Test
    public void testNextDateWithInvalideDate() {
        int NotLeapYear = 2017; // 2017 % 4 != 0
        Date date = new Date(42, 11, NotLeapYear);
        assertNull(date.nextDate());
    }


    @Test
    public void testPreviousDateBeginOfYear() {
        int NotLeapYear = 2017; // 2017 % 4 != 0
        Date date = new Date(1, 1, NotLeapYear);
        assertEquals(new Date(31, 12, NotLeapYear - 1), date.previousDate());
    }

    @Test
    public void testPreviousDateBeginOfMonth() {
        int NotLeapYear = 2017; // 2017 % 4 != 0
        Date date = new Date(1, 2, NotLeapYear);
        assertEquals(new Date(31, 1, NotLeapYear), date.previousDate());
    }

    @Test
    public void testPreviousDateBeginOfThirtyDaysMonthWith30Day() {
        int NotLeapYear = 2017; // 2017 % 4 != 0

        ArrayList<Date> Actual = new ArrayList<>();
        Actual.add((new Date(1, 5, NotLeapYear)).previousDate());
        Actual.add((new Date(1, 7, NotLeapYear)).previousDate());
        Actual.add((new Date(1, 10, NotLeapYear)).previousDate());
        Actual.add((new Date(1, 12, NotLeapYear)).previousDate());

        ArrayList<Date> Expected = new ArrayList<>();
        Expected.add(new Date(30, 4, NotLeapYear));
        Expected.add(new Date(30, 6, NotLeapYear));
        Expected.add(new Date(30, 9, NotLeapYear));
        Expected.add(new Date(30, 11, NotLeapYear));

        assertEquals(Actual,Expected);
    }

    @Test
    public void testPreviousDateBeginOfThirtyOneDaysMonth() {
        int NotLeapYear = 2017; // 2017 % 4 != 0

        ArrayList<Date> Actual = new ArrayList<>();
        Actual.add((new Date(1, 2, NotLeapYear)).previousDate());
        Actual.add((new Date(1, 4, NotLeapYear)).previousDate());
        Actual.add((new Date(1, 6, NotLeapYear)).previousDate());
        Actual.add((new Date(1, 8, NotLeapYear)).previousDate());
        Actual.add((new Date(1, 9, NotLeapYear)).previousDate());
        Actual.add((new Date(1, 11, NotLeapYear)).previousDate());

        ArrayList<Date> Expected = new ArrayList<>();
        Expected.add(new Date(31, 1, NotLeapYear));
        Expected.add(new Date(31, 3, NotLeapYear));
        Expected.add(new Date(31, 5, NotLeapYear));
        Expected.add(new Date(31, 7, NotLeapYear));
        Expected.add(new Date(31, 8, NotLeapYear));
        Expected.add(new Date(31, 10, NotLeapYear));

        assertEquals(Actual,Expected);
    }

    @Test
    public void testPreviousDateWithMonth3Day1NotLeapYear() {
        int NotLeapYear = 2017; // 2017 % 4 != 0
        Date date = new Date(1, 3, NotLeapYear);
        assertEquals(new Date(28, 2, NotLeapYear), date.previousDate());
    }

    @Test
    public void testPreviousDateWithMonth3Day1LeapYear() {
        int LeapYear = 2016; // 2016 % 4 = 0 and 2016 % 100 != 0 or 2016 % 400 = 0
        Date date = new Date(1, 3, LeapYear);
        assertEquals(new Date(29, 2, LeapYear), date.previousDate());
    }

    @Test
    public void testPreviousDate() {
        int LeapYear = 2016; // 2016 % 4 = 0 and 2016 % 100 != 0 or 2016 % 400 = 0
        Date date = new Date(15, 11, LeapYear);
        assertEquals(new Date(14, 11, LeapYear), date.previousDate());
    }

    @Test
    public void testPreviousDateWithInvalideDate() {
        int NotLeapYear = 2017; // 2017 % 4 != 0
        Date date = new Date(42, 11, NotLeapYear);
        assertNull(date.previousDate());
    }

    @Test
    public void testCompareToWithSameDate() {
        Date date1 = new Date(1, 1, 2017);
        Date date2 = new Date(1, 1, 2017);
        assertEquals(0, date1.compareTo(date2));
    }

    @Test
    public void testCompareToWithNotSameYearsLower() {
        Date date1 = new Date(1, 1, 2017);
        Date date2 = new Date(1, 1, 2018);
        assertEquals(-1, date1.compareTo(date2));
    }

    @Test
    public void testCompareToWithNotSameYearsUpper() {
        Date date1 = new Date(1, 1, 2018);
        Date date2 = new Date(1, 1, 2017);
        assertEquals(1, date1.compareTo(date2));
    }

    @Test
    public void testCompareToWithNotSameMonthsLower() {
        Date date1 = new Date(1, 1, 2017);
        Date date2 = new Date(1, 2, 2017);
        assertEquals(-1, date1.compareTo(date2));
    }

    @Test
    public void testCompareToWithNotSameMonthsUpper() {
        Date date1 = new Date(1, 2, 2017);
        Date date2 = new Date(1, 1, 2017);
        assertEquals(1, date1.compareTo(date2));
    }

    @Test
    public void testCompareToWithNotSameDaysLower() {
        Date date1 = new Date(1, 1, 2017);
        Date date2 = new Date(2, 1, 2017);
        assertEquals(-1, date1.compareTo(date2));
    }

    @Test
    public void testCompareToWithNotSameDaysUpper() {
        Date date1 = new Date(2, 1, 2017);
        Date date2 = new Date(1, 1, 2017);
        assertEquals(1, date1.compareTo(date2));
    }


    @Test
    public void testIsLeapYear() {
        int LeapYear = 2016; // 2016 % 4 = 0 and 2016 % 100 != 0 or 2016 % 400 = 0
        int NotLeapYear = 2017; // 2017 % 4 != 0
        assertFalse(Date.isLeapYear(NotLeapYear));
        assertTrue(Date.isLeapYear(LeapYear));
    }

    @Test
    public void testToString() {
        Date date = new Date(1, 1, 2016);
        assertEquals("01/01/2016", date.toString());
    }

    @Test
    public void testEqualsWithSameDate() {
        Date date1 = new Date(1, 1, 2016);
        Date date2 = new Date(1, 1, 2016);
        assertTrue(date1.equals(date2));
    }

    @Test
    public void testEqualsWithNotSameYear() {
        Date date1 = new Date(1, 1, 2016);
        Date date2 = new Date(1, 1, 2017);
        assertFalse(date1.equals(date2));
    }

    @Test
    public void testEqualsWithNotSameMonth() {
        Date date1 = new Date(1, 1, 2016);
        Date date2 = new Date(1, 2, 2016);
        assertFalse(date1.equals(date2));
    }

    @Test
    public void testEqualsWithNotSameDay() {
        Date date1 = new Date(1, 1, 2016);
        Date date2 = new Date(2, 1, 2016);
        assertFalse(date1.equals(date2));
    }

    @Test
    public void testEqualsWithSameObject() {
        Date date1 = new Date(1, 1, 2016);
        assertTrue(date1.equals(date1));
    }

    @Test
    public void testEqualsWithNull() {
        Date date1 = new Date(1, 1, 2016);
        Date date2 = null;
        assertFalse(date1.equals(date2));
    }

    @Test
    public void testEqualsWithDifferentClass() {
        Date date1 = new Date(1, 1, 2016);
        assertFalse(date1.equals(3));
    }

    @Test
    public void testIsValideDateWithDay0() {
        assertFalse(Date.isValidDate(0, 1, 2016));
    }

    @Test
    public void testIsValideDateWithDay32() {
        assertFalse(Date.isValidDate(32, 1, 2016));
    }

    @Test
    public void testIsValideDateWithMonth0() {
        assertFalse(Date.isValidDate(1, 0, 2016));
    }

    @Test
    public void testIsValideDateWithMonth13() {
        assertFalse(Date.isValidDate(1, 13, 2016));
    }

    @Test
    public void testIsValideDateWithYearlowerThan0() {
        assertFalse(Date.isValidDate(1, 1, -500));
    }

    @Test
    public void testIsValideDateWithMonth2Day29AndNotLeapYear() {
        int notLeapYear = 401; // 401 % 4 = 1 and 401 % 100 = 1 and 401 % 400 = 1
        assertFalse(Date.isValidDate(29, 2, notLeapYear));
    }

    @Test
    public void testIsValideDateWithMonth2Day28AndNotLeapYear() {
        int notLeapYear = 401; // 401 % 4 = 1 and 401 % 100 = 1 and 401 % 400 = 1
        assertTrue(Date.isValidDate(28, 2, notLeapYear));
    }

    @Test
    public void testIsValideDateWithMonth2Day29AndLeapYear() {
        int leapYear = 400; // 400 % 4 = 0 and 400 % 100 = 0 and 400 % 400 = 0
        assertTrue(Date.isValidDate(29, 2, leapYear));
    }

    @Test
    public void testIsValideDateWithMonth2Day30AndLeapYear() {
        int leapYear = 400; // 400 % 4 = 0 and 400 % 100 = 0 and 400 % 400 = 0
        assertFalse(Date.isValidDate(30, 2, leapYear));
    }

    @Test
    public void testIsValideDateWithAllthirtyDaysMonthWith30Days() {
        ArrayList<Boolean> Actual = new ArrayList<>();
        Actual.add(Date.isValidDate(30, 4, 2016));
        Actual.add(Date.isValidDate(30, 6, 2016));
        Actual.add(Date.isValidDate(30, 9, 2016));
        Actual.add(Date.isValidDate(30, 11, 2016));

        ArrayList<Boolean> Expected = new ArrayList<>();
        Expected.add(true);
        Expected.add(true);
        Expected.add(true);
        Expected.add(true);

        assertEquals(Expected, Actual);
    }

    @Test
    public void testIsValideDateWithAllthirtyDaysMonthWith31Days() {
        ArrayList<Boolean> Actual = new ArrayList<>();
        Actual.add(Date.isValidDate(31, 4, 2016));
        Actual.add(Date.isValidDate(31, 6, 2016));
        Actual.add(Date.isValidDate(31, 9, 2016));
        Actual.add(Date.isValidDate(31, 11, 2016));

        ArrayList<Boolean> Expected = new ArrayList<>();
        Expected.add(false);
        Expected.add(false);
        Expected.add(false);
        Expected.add(false);

        assertEquals(Expected, Actual);
    }

    @Test
    public void testIsValideDateWithAllthirtyOneDaysMonthWith31Days() {
        ArrayList<Boolean> Actual = new ArrayList<>();
        Actual.add(Date.isValidDate(31, 1, 2016));
        Actual.add(Date.isValidDate(31, 3, 2016));
        Actual.add(Date.isValidDate(31, 5, 2016));
        Actual.add(Date.isValidDate(31, 7, 2016));
        Actual.add(Date.isValidDate(31, 8, 2016));
        Actual.add(Date.isValidDate(31, 10, 2016));
        Actual.add(Date.isValidDate(31, 12, 2016));

        ArrayList<Boolean> Expected = new ArrayList<>();
        Expected.add(true);
        Expected.add(true);
        Expected.add(true);
        Expected.add(true);
        Expected.add(true);
        Expected.add(true);
        Expected.add(true);

        assertEquals(Expected, Actual);
    }

    @Test
    public void testIsValideDateWithAllthirtyOneDaysMonthWith32Days() {
        ArrayList<Boolean> Actual = new ArrayList<>();
        Actual.add(Date.isValidDate(32, 1, 2016));
        Actual.add(Date.isValidDate(32, 3, 2016));
        Actual.add(Date.isValidDate(32, 5, 2016));
        Actual.add(Date.isValidDate(32, 7, 2016));
        Actual.add(Date.isValidDate(32, 8, 2016));
        Actual.add(Date.isValidDate(32, 10, 2016));
        Actual.add(Date.isValidDate(32, 12, 2016));

        ArrayList<Boolean> Expected = new ArrayList<>();
        Expected.add(false);
        Expected.add(false);
        Expected.add(false);
        Expected.add(false);
        Expected.add(false);
        Expected.add(false);
        Expected.add(false);

        assertEquals(Expected, Actual);
    }
}
