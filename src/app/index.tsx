import { useAudioPlayer } from "expo-audio";
import { StyleSheet, Text, View } from "react-native";
import AssetManager from "../app/assetmanager";

function test(assets:AssetManager) {

}

export default function Index() {

  const assets: AssetManager = new AssetManager();
  
  const backgroundplayer = useAudioPlayer(assets[1][0]);
  backgroundplayer.loop = true;
  backgroundplayer.volume = 0.85;
  backgroundplayer.play();

  const effectplayer = useAudioPlayer(assets[1][1]);
  effectplayer.loop = true;
  effectplayer.volume = 1;
  effectplayer.play();

  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
