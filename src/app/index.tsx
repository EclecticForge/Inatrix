import { useAudioPlayer } from "expo-audio";
import AssetManager from "../app/assetmanager";
import '../app/styles.css';

function test(assets: AssetManager) {

  let number1: number = Math.floor(Math.random()*7+1);
  let number2: number = Math.floor(Math.random()*7+1);
  return (
  <div className="item">
    <img src={assets[0][7][number1]} className="cell"/>
    <img src={assets[0][0][number2]} className="cell"/>
  </div> 
  );
}
  

export default function Index() {

  const assets: AssetManager = new AssetManager();

  const backgroundplayer = useAudioPlayer(assets[1][0]);
  backgroundplayer.loop = true;
  backgroundplayer.volume = 0.85;
  backgroundplayer.play();

  const effectplayer = useAudioPlayer();
  effectplayer.volume = 1;


  return (
    <div className = "page">
      <div className = "grider">
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        {test(assets)}
        </div>
    </div>

  );
}
