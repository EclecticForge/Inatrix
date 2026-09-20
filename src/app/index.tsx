import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from 'react';
import { useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { configureReanimatedLogger, ReanimatedLogLevel, } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AssetManager, { assetMode, sound } from "../app/assetmanager";
import Tile, { TileData } from "./tiles";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const assets = new AssetManager();
let nextId = 0;



function makeBoard(): (TileData | null)[][] {
  const tiles: (TileData | null)[][] = [];
  for (let row = 0; row < 8; row++) {
    tiles[row] = [];
    for (let col = 0; col < 8; col++) {
      
      tiles[row][col] =
      {
        id: nextId++,
        color: Math.floor(Math.random() * 7) + 1,
        shape: Math.floor(Math.random() * 7) + 1,
        rowOwner: row,
        colOwner: col,
      }
    
    }

  }

  tiles[8] = [];
  for(let col = 0; col < 9; col++) {
    tiles[8][col] = null;
  }

  return tiles;
}





export default function Index() {



  const { width, height } = useWindowDimensions();
  const size = Math.min(width, height) * 0.88;
  const [board, setBoard] = useState<(TileData | null)[][]>(makeBoard);



  const backgroundplayer = useAudioPlayer(assets[assetMode.Sound][sound.Background]);
  useEffect(() => {
    backgroundplayer.loop = true;
    backgroundplayer.volume = 0.85;
    backgroundplayer.play();
  }, [backgroundplayer]);

  
  
  // const effectplayer = useAudioPlayer();
  // effectplayer.volume = 1;

  

  const onHold = (rowOwner: number, colOwner: number) => {
    setBoard((current) => {
      const next = current.map((r) => [...r]);
      
      if (next[8][8]) {
        return next;
      }
      if (!next[rowOwner][colOwner]) {
        return next;
      }

      const holdTile = next[rowOwner][colOwner];
      next[8][8] = holdTile;
      next[rowOwner][colOwner] = null;

      return next;
    });
  };



  const onHover = (rowOwner: number, colOwner: number, rowTarget: number, colTarget: number) => {
    setBoard((current) => {
      const next = current.map((r) => [...r]);
      
      if (!next[8][8]) {
        return next;
      }

      if (next[rowOwner][colOwner]) {
        return next;
      }

      if (!next[rowTarget][colTarget]) {
        return next;
      }

      const  holdTile = next[8][8];
      const  targetTile = next[rowTarget][colTarget];

      next[rowOwner][colOwner] = {...targetTile, rowOwner, colOwner};
      next[8][8] = {...holdTile, rowOwner: rowTarget, colOwner: colTarget}
      next[rowTarget][colTarget] = null;

      return next;
    });
  }



  const onRelease = () => {
    setBoard((current) => {
      const next = current.map((r) => [...r]);

      if (!next[8][8]) {
        return next;
      }

      const holdTile = next[8][8];
      const homeRow = holdTile.rowOwner;
      const homeCol = holdTile.colOwner;

      if (next[homeRow][homeCol]) {
        return next;
      }

      next[homeRow][homeCol] = holdTile;
      next[8][8] = null;

      return next;
    });
  }



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ width: size, height: size }}>
            {board.flatMap((rowTiles) =>
              rowTiles.map((t) => (
                t && <Tile key={t.id} tile={t} tilesize={size / 8} assets={assets} onHold={onHold} onHover={onHover} onRelease={onRelease} />
              ))
            )}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
