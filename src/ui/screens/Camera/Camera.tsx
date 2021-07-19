import {useCamera} from 'react-native-camera-hooks';
import storage from '@react-native-firebase/storage';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import React from 'react';

function getRandomNumber(): number {
  return Math.floor(Math.random() * 100000);
}

export function CameraScreen() {
  const [{cameraRef, autoFocusPoint}, {takePicture}] = useCamera();
  const reference = storage().ref(`test${getRandomNumber()}.jpg`);
  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={async () => {
              const data = await takePicture();
              await reference.putFile(data.uri);
            }}>
            <Text style={{color: '#fff', backgroundColor: '#ff1d1d'}}>
              Prendre une photo
            </Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
