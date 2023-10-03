import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function App() {
  const start = new Date();
  console.log("App starting :", start)

  const video = React.useRef(null);
  console.log(video)
  // setInterval(async () => {
  //   if (video.current) {
  //     console.log("Play Async ...")
  //     // await video.current.setPositionAsync(0);
  //     await video.current.playAsync();
  //   }
  // }, 60000)

  const [key, setKey] = React.useState(Date.now());

  const handleRefreshVideo = () => {
    setKey(Date.now());
  };
  
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        key={key}
        ref={video}
        style={styles.video}
        source={{
          uri: 'http://192.168.0.176:3030/stream',
        }}
        // useNativeControls 
        shouldPlay
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onLoadStart={() => console.log("Starting to load the video ...")}

        onReadyForDisplay={(event) => {
          console.log(event);          
        }}

        onLoad={(status)=> {

          const end = new Date();
          console.log("Video start")
          console.log(status)
          console.log("delay", end - start, 'ms')

        }}
        

        // progressUpdateIntervalMillis={10000}
        // onPlaybackStatusUpdate={(status) => console.log(status)}

        onError={(error)=>console.log(error)}
        
      />
      <Button title="Refresh Stream" onPress={handleRefreshVideo} />
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
