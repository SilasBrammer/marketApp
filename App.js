import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default function App() {
const [page1, setPage1] = useState();
const [page2, setPage2] = useState();
const [money, setMoney] = useState();


const load = async () => {
  try {
    let balance = await retrieveNumber();

    if (balance !== null) {
      setMoney(balance);
    }
  } catch (err) {
    alert(err);
  }


  setPage1('block');
  setPage2('none');
}

const saveNumber = async (value) => {
  try {
    const stringValue = value.toString();
    await AsyncStorage.setItem('cash', stringValue);
    load();
  } catch (err) {
    // saving error
    alert(err);
  }
};

const retrieveNumber = async () => {
  try {
    const stringValue = await AsyncStorage.getItem('cash');
    const value = parseInt(stringValue, 10); // Use parseFloat(stringValue) for floating points
    return value;
  } catch (e) {
    // error reading value
    console.log(e);
    return 0; // Default value in case of error
  }
};

const updateNumber = async (increment) => {
  const currentNumber = await retrieveNumber();
  if(currentNumber + increment >= 0) {
    const updatedNumber = currentNumber + increment; // For subtraction, use a negative increment
    await saveNumber(updatedNumber);
  }
};

const toPage1 = async () => {
  setPage1('block');
  setPage2('none');
}

const toPage2 = async () => {
  setPage1('none');
  setPage2('block');
}

useEffect(() => {
  load();
}, []);

  return (
    <View style={styles.container}>
      
      <View style={{display: page1}}>

        <View style={styles.content}>

          <View style={styles.marginBlock}>

          </View>

          <Text style={styles.title}>
            Current Money: ${money}
          </Text>

          <TouchableHighlight onPress={() => updateNumber(1)}>

            <View style={styles.button2}>

              <Text style={styles.title}>
                Add 1
              </Text>

            </View>

          </TouchableHighlight>

          <TouchableHighlight onPress={() => updateNumber(5)}>

            <View style={styles.button2}>

              <Text style={styles.title}>
                Add 5
              </Text>

            </View>

          </TouchableHighlight>

          <TouchableHighlight onPress={() => saveNumber(0)}>

            <View style={styles.button2}>

              <Text style={styles.title}>
                Reset Money
              </Text>

            </View>

          </TouchableHighlight>

        </View>

      </View>



      <View style={{display: page2}}>

        <View style={styles.content}>
          <ScrollView>
            <TouchableHighlight onPress={() => updateNumber(-3)}>
              <View style={styles.item}>
                <Text style={styles.title}>
                  BGG and Discord time: $3
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => updateNumber(-5)}>
              <View style={styles.item}>
                <Text style={styles.title}>
                  Play Connections: $5
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => updateNumber(-10)}>
              <View style={styles.item}>
                <Text style={styles.title}>
                  Play A Solo Challenge: $10
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => updateNumber(-10)}>
              <View style={styles.item}>
                <Text style={styles.title}>
                  Start BGA Game: $10
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => updateNumber(-20)}>
              <View style={styles.item}>
                <Text style={styles.title}>
                  Borrow a book from Libby: $20
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => updateNumber(-20)}>
              <View style={styles.item}>
                <Text style={styles.title}>
                  Ten minutes of Minecraft: $20
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => updateNumber(-100)}>
              <View style={styles.item}>
                <Text style={styles.title}>
                  Buy PnP: $100
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => updateNumber(-100)}>
              <View style={styles.item}>
                <Text style={styles.title}>
                  Enter BGA Tournament: $100
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => updateNumber(-600)}>
              <View style={styles.item}>
                <Text style={styles.title}>
                  Buy Button Shy: $600
                </Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
        </View>

      </View>



      <View style={styles.navbar}>

        <TouchableHighlight onPress={() => toPage1()}>
          <View style={styles.button}>
            <Text style={styles.title}>
              Page 1
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => toPage2()}>
          <View style={styles.button}>
            <Text style={styles.title}>
              Page 2
            </Text>
          </View>
        </TouchableHighlight>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbar: {
    width: deviceWidth,
    height: deviceHeight/6,
    backgroundColor: '#CCBB11',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    width: deviceWidth,
    height: (deviceHeight/6)*5,
    backgroundColor: '#BBAAAA',
    alignItems: 'center', 
  },
  button: {
    width: deviceWidth/4,
    height: deviceHeight/7,
    backgroundColor: '#EEDD11',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#FFEE00',
    marginLeft: deviceWidth/8,
    marginRight: deviceWidth/8,
  },
  button2: {
    width: deviceWidth/3,
    height: deviceHeight/7,
    backgroundColor: '#EEDD11',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#FFEE00',
    marginTop: deviceHeight/20,
    marginBottom: deviceHeight/20,
  },
  item: {
    width: deviceWidth/2,
    height: deviceHeight/8,
    backgroundColor: '#EEDD11',
    borderWidth: 2,
    borderColor: '#FFEE00',
    marginTop: deviceHeight/20,
    marginBottom: deviceHeight/20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
  },
  text: {
    fontSize: 15,
    fontWeight: '300',
  },
  marginBlock: {
    width: deviceWidth,
    height: deviceHeight/8,
  }
});
