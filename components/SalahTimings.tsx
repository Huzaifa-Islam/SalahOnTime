import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {RadioButton} from 'react-native-paper';

interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}
export default function SalahTimings() {
  const [resp, setResp] = useState<PrayerTimings | null>(null);
  const [showloader, setShowLoader] = useState(true);
  const [error, setError] = useState('');
  const [city, setCity] = useState('Lucknow');

  const currentDate = new Date();
  console.log('current Date is ' + currentDate);
  const formattedDate = format(currentDate, 'dd-MM-yyyy'); // Formats to DD-MM-YYYY
  console.log('formatted current Date is ' + formattedDate);

  const displayDate = currentDate
    .toLocaleDateString('en-GB', {
      day: '2-digit', // "22"
      month: 'short', // "Feb"
      year: 'numeric', // "2025"
    })
    .replace(',', '');
  console.log('display english date is ', displayDate);
  function convertTo12Hour(time) {
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${hours}:${minutes} ${suffix}`;
  }
  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const response = await fetch(
          'https://api.aladhan.com/v1/timingsByCity/' +
            String(formattedDate) +
            '?city=' +
            city +
            '&country=IN&school=1',
        );
        const data = await response.json();
        console.log('response from api --> ', data);
        if (data.code === 200) {
          setResp(data.data);
        } else {
          setError('Failed to Fetch proper data');
        }
        // eslint-disable-next-line no-catch-shadow
      } catch (err) {
        console.log('Error Fetching data');
        setError('Error Fetching data');
      } finally {
        setShowLoader(false);
      }
    };
    fetchTimings();
  }, [city]);
  console.log('resp --> ', resp);
  if (showloader) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }
  const AsrTime = resp.timings.Asr;
  console.log('check', resp);
  return (
    <ScrollView>
      <View>
        <View style={styles.dateCalendar}>
          <Text style={styles.hijriDate}>{displayDate}</Text>
          <Text style={styles.hijriDate}>
            {resp?.date.hijri.day +
              '  ' +
              resp?.date.hijri.month.ar +
              ' ' +
              resp.date.hijri.date.slice(-4)}
          </Text>
        </View>

        <RadioButton.Group onValueChange={value => setCity(value)} value={city}>
          <View style={styles.radioContainer}>
            <View style={[styles.radioChildContainer, styles.lucknow]}>
              <RadioButton value="Lucknow" />
              <Text style={styles.cityName} onPress={() => setCity('Lucknow')}>
                لکھنؤ
              </Text>
            </View>
            <View style={styles.radioChildContainer}>
              <RadioButton value="Faizabad" />
              <Text style={styles.cityName} onPress={() => setCity('Faizabad')}>
                فیض آباد
              </Text>
            </View>
          </View>
        </RadioButton.Group>

        <View style={styles.timeParentContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {convertTo12Hour(resp?.timings.Fajr) || 'loading..'}
            </Text>
            <Text style={styles.timeLabel2}>فجر</Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {convertTo12Hour(resp?.timings?.Sunrise) || 'loading..'}
            </Text>
            <Text style={styles.timeLabel2}>طلوع آفتاب</Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {convertTo12Hour(resp?.timings?.Dhuhr) || 'loading..'}
            </Text>
            <Text style={styles.timeLabel2}>ظہر</Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {convertTo12Hour(resp?.timings?.Asr) || 'loading..'}
            </Text>
            <Text style={styles.timeLabel2}>عصر</Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {convertTo12Hour(resp?.timings?.Maghrib) || 'loading..'}
            </Text>
            <Text style={styles.timeLabel2}>مغرب</Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {convertTo12Hour(resp?.timings?.Isha) || 'loading..'}
            </Text>
            <Text style={styles.timeLabel2}>عشاء</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    margin: 8,
    backgroundColor: '#E6E6FA',
    borderRadius: 20,
  },
  timeParentContainer: {
    margin: 4,
  },
  timeContainer: {
    margin: 4,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D0E0D8',
    borderRadius: 40,
    elevation: 5,
  },
  timeText: {
    width: '45%',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    color: '#333333',
    textAlign: 'center',
  },
  timeLabel2: {
    width: '45%',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    color: '#333333',
    textAlign: 'center',
  },
  hijriDate: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    paddingVertical: 10,
    width: '50%',
  },
  dateCalendar: {
    flexDirection: 'row',
    backgroundColor: '#F5F5DC',
    margin: 8,
    padding: 1,
    borderRadius: 30,
  },
  cityName: {
    fontSize: 25,
    fontWeight: '600',
    paddingTop: 2,
  },
  radioChildContainer: {
    width: '50%',
    flexDirection: 'row',
  },
  lucknow: {
    paddingHorizontal: 20,
  },
});
