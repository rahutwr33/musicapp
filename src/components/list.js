import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import api from '../config/api';
import MUSICLOGO from '../assets/images/musiclogo.png';
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const width = Dimensions.get('window').width;
export const ConcertList = (props) => {
  const renderItem = ({item}) => (
    <View
      key={`artist_00${String(item.id)}${Date.now()}`}
      style={styles.liststyle}>
      <TouchableOpacity style={styles.direction}>
        <FastImage
          style={styles.imagestyle}
          source={
            item.image
              ? {
                  uri: `${api.imageurl}${item.image}`,
                  priority: FastImage.priority.normal,
                }
              : MUSICLOGO
          }
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.contentstyle}>
          <Text style={styles.thumbnailfontstyle}>{item.artist_name}</Text>
          <Text
            adjustsFontSizeToFit={true}
            style={{
              ...styles.thumbnailfontstyle,
              ...{
                opacity: 0.5,
                paddingTop: 5,
                fontSize: 14,
                width: width - 100,
              },
            }}>
            {monthNames[new Date(item.date).getMonth()]}
            {` ${new Date(item.date).getDate()}`}
            {` ${item.location}`}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={props.item}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  footerstyle: {
    marginBottom: 10,
  },
  liststyle: {
    flexDirection: 'row',
  },
  direction: {
    flexDirection: 'row',
  },
  imagestyle: {
    width: 80,
    height: 60,
  },
  thumbnailfontstyle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '500',
  },
  contentstyle: {
    marginRight: 20,
  },
});
