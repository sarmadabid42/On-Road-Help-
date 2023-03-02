import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,Alert,Modal,StyleSheet,Pressable } from 'react-native';

const StopWatch = () => {
  const [count, setCount] = useState(30);
  const [intervalId, setIntervalId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true)
    setIntervalId(
      setInterval(() => {
        setCount((count) => {
          if (count === 0) {
            setModalVisible(false)
            return () => clearInterval(intervalId);
          }
          return count - 1;
        });
      }, 3000)
    );

    
  }, []);

  return (
    <View>
      
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ padding: 20 }}
      >
        {/* <Text>Open Modal</Text> */}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, height: 200, backgroundColor: 'white' }}>
            <Text> Time to notify your family:</Text>
            <Text> Remaining Time:{count}</Text>
            

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ padding: 20 }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StopWatch;
