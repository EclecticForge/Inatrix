import { useAudioPlayer } from "expo-audio";
import { useWindowDimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AssetManager from "../app/assetmanager";
import { styles } from "./styles";

function test(assets: AssetManager) {

  let number1: number = Math.floor(Math.random()*7+1);
  let number2: number = Math.floor(Math.random()*7+1);
  return
 // <View className="item">
 //   <Image source={assets[0][7][number1]}/>
 //   <Image source={assets[0][0][number2]}/>
 // </View> 
}
  

export default function Index() {

  const assets: AssetManager = new AssetManager();

  const backgroundplayer = useAudioPlayer(assets[1][0]);
  backgroundplayer.loop = true;
  backgroundplayer.volume = 0.85;
  backgroundplayer.play();

  const effectplayer = useAudioPlayer();
  effectplayer.volume = 1;

  const {width, height} = useWindowDimensions();
  const size = Math.min(width,height)*0.91;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.page}>
        <SafeAreaView style={{ width: size, height: size }}>
          
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
