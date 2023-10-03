import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import videoAsset from './assets/video.mp4';
import output from './assets/output.mp4';

export default function App() {
  const start = new Date();
  console.log("App starting :", start)
  // const videoAsset = Asset.fromModule(require('./assets/video.mp4'));
  const buckBynny = {uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"};
  const cameraUri = {uri: "rtsp://admintapo:123456@192.168.0.152:554/stream1"}
  const httpUri = {uri: "http://192.168.0.176:3000/stream"};
  const hls = {uri: "http://192.168.0.176:3000/video/video.m3u8"}
  const cloudHttp = {uri: "http://192.168.0.176:3030/"};

  return (
    <View style={styles.container}>
      <Video
        source={httpUri}
        pause={false}
        onBuffer={(buffer) => console.log(buffer)}       // Fonction à définir si nécessaire
        onError={(error) => console.log(error)}      // Fonction à définir si nécessaire
        style={styles.backgroundVideo}
        resizeMode="cover"
        rate={1.0}
        volume={1.0}
        muted={false}
        playInBackground={false}
        playWhenInactive={false}
        repeat={false}
        onLoad={(status)=> {

          const end = new Date();
          console.log("Video start")
          console.log(status)
          console.log("delay", end - start, 'ms')

        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  backgroundVideo: {
    width: 300,
    height: 200,
    borderWidth: 1,
  },
});

// import * as React from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import { Video, ResizeMode } from 'expo-av';
// import { Asset } from 'expo-asset';

// const buckBynny = {uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"};
// const cameraUri = {uri: "rtsp://admintapo:123456@192.168.0.152:554/stream1"};
// const httpUri = {uri: "http://192.168.0.176:3000/stream.ts",
// overrideFileExtensionAndroid: "ts"};

// import videoAsset from './assets/video.mp4';
// import output from './assets/output.mp4';
// import videoTS from './assets/video0.ts';

// export default function App() {
//   const video = React.useRef(null);
//   const [status, setStatus] = React.useState({});
//   return (
//     <View style={styles.container}>
//       <Video
//         style={styles.video}
//         source={httpUri}
//         rate={1.0}
//         volume={1.0}
//         isMuted={false}
//         resizeMode="cover"
//         shouldPlay
//         isLooping={false} // Important: ne mettez pas en boucle un flux en direct
//         onError={(error) => console.log(error)}
//         />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//   },
//   video: {
//     alignSelf: 'center',
//     width: 320,
//     height: 200,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

