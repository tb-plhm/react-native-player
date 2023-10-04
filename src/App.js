import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function App() {
  const start = new Date();
  console.log("App starting :", start)

  const video = React.useRef(null);
  const [videoSource, setVideoSource] = React.useState(null);

  const local = {uri: 'http://192.168.0.176:3000/stream'};
  const controller = {uri: "http://192.168.0.131:3000/stream"}

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={controller} 
        shouldPlay
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onLoadStart={() => {
          console.log("Video begins to be loaded into memory ...")
        }}
        onReadyForDisplay={(event) => {   
          console.log("On ready for display");   
          const end = new Date();
          console.log("> delay", end - start, 'ms')
        }}

        onLoad={(status)=> {

          const end = new Date();
          console.log("Video start")
          // console.log(status)
          console.log("> delay", end - start, 'ms')

        }}
        
        // progressUpdateIntervalMillis={10000}
        // onPlaybackStatusUpdate={(status) => console.log(status)}

        onError={(error)=>console.log(error)}
        
      />
      <View style={styles.buttons}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
