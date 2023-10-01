import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Pressable } from 'react-native';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Appbar } from 'react-native-paper';

const Detail = ({ route }) => {
  const todoRef = firebase.firestore().collection('todos');
  const [textHeading, setTextHeading] = useState(route.params.item.heading);
  const navigation = useNavigation();

  const updateTodo = () => {
    if (textHeading && textHeading.length > 0) {
      todoRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading,
        })
        .then(() => {
          navigation.goBack(); // Navigate back to the previous screen (Home)

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Bạn đã chỉnh sửa thành công!',
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Todo" />
      </Appbar.Header>
      <TextInput
        style={styles.textfield}
        onChangeText={setTextHeading}
        value={textHeading}
        placeholder="Update Todo"
      />
      <Pressable style={styles.buttonUpdate} onPress={updateTodo}>
        <Text>UPDATE TODO</Text>
      </Pressable>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  textfield: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: '#000000',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  buttonUpdate: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: '#0de065',
  },
});

export default Detail;
