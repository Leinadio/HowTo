import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const initialData = [
  {name: '1', key: 'one', bgColor: '#14b33b'},
  {name: '2', key: 'two', bgColor: '#d52727'},
  {name: '3', key: 'three', bgColor: '#5d236d'},
  {name: '4', key: 'four', bgColor: '#2ad4c6'},
  {name: '5', key: 'five', bgColor: '#d6f83b'},
  {name: '6', key: 'six', bgColor: '#fff'},
  {name: '7', key: 'seven', bgColor: '#ba987b'},
  {name: '8', key: 'eight', bgColor: '#ab1dd2'},
  {name: '9', key: 'night', bgColor: '#ca85cd'},
  {name: '0', key: 'zero', bgColor: '#ffc011'},
];

export function HomeScreen() {
  const [data] = useState(initialData);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View>
        <FlatList
          keyExtractor={i => i.name}
          showsVerticalScrollIndicator={false}
          renderItem={el => {
            const {item} = el;
            return (
              <View
                style={{
                  height: Dimensions.get('window').height,
                  backgroundColor: item.bgColor,
                }}>
                <Text>{item.name}</Text>
              </View>
            );
          }}
          data={data}
          snapToInterval={Dimensions.get('window').height}
          snapToAlignment={'start'}
          decelerationRate={'fast'}
          disableIntervalMomentum={true}
          pagingEnabled
        />
      </View>
    </SafeAreaView>
  );
}
