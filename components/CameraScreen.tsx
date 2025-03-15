import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {
  Camera,
  useCameraDevices,
  CameraPermissionStatus,
} from 'react-native-vision-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back; // Use the back camera

  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();
      const isPermissionGranted =
        cameraPermission === CameraPermissionStatus.AUTHORIZED &&
        microphonePermission === CameraPermissionStatus.AUTHORIZED;
      setHasPermission(isPermissionGranted);
    };
    getPermission();
  }, []);

  useEffect(() => {
    if (device != null) {
      setIsCameraReady(true);
    }
  }, [device]);

  if (!hasPermission) {
    return (
      <View>
        <Text>No permission for camera or microphone</Text>
      </View>
    );
  }

  if (!isCameraReady) {
    return (
      <View>
        <Text>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Camera
        style={{flex: 1}}
        device={device}
        isActive={true}
        onInitialized={() => setIsCameraReady(true)}
      />
      <Button
        title="Capture Photo"
        onPress={() => {
          /* Add capture photo logic here */
        }}
      />
    </View>
  );
};

export default CameraScreen;
