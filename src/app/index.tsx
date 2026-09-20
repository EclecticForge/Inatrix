import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from 'react';
import { useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AssetManager, { assetMode, sound } from "../app/assetmanager";
import Tile, { TileData } from "./tiles";

const assets = new AssetManager();
let nextId = 0;

function makeBoard(): (TileData | null)[][] {
  const tiles: TileData[][] = [];
  for (let row = 0; row < 8; row++) {
    tiles[row] = [];
    for (let col = 0; col < 8; col++) {
      tiles[row][col] =
      {
        id: nextId++,
        color: Math.floor(Math.random() * 7) + 1,
        shape: Math.floor(Math.random() * 7) + 1,
        homeX: row,
        homeY: col,
        drag: false,
      }
    }
  }
  return tiles;
}

export default function Index() {

  const backgroundplayer = useAudioPlayer(assets[assetMode.Sound][sound.Background]);
  useEffect(() => {
    backgroundplayer.loop = true;
    backgroundplayer.volume = 0.85;
    backgroundplayer.play();
  }, [backgroundplayer]);

  const effectplayer = useAudioPlayer();
  effectplayer.volume = 1;

  const { width, height } = useWindowDimensions();
  const size = Math.min(width, height) * 0.88;

  const [board, setBoard] = useState<(TileData | null)[][]>(makeBoard);

  const onHold = (homeX: number, homeY: number) => {
    setBoard((current) => {
      const next = current.map((r) => [...r]);
      while (next.length < 9) next.push([]);
      while (next[8].length < 9) next[8].push(null);

      if (next[8][8]) {
        return next;
      }
      next[8][8] = next[homeX][homeY];
      next[homeX][homeY] = null;

      return next;
    });
  };

  const onHover = (homeX: number, homeY: number, row: number, col: number) => {
    setBoard((current) => {
      const next = current.map((r) => [...r]);
      if (!next[8][8]) {
        return next;
      }

      if (next[homeX][homeY]) {
        return next;
      }

      if (!next[row][col]) {
        return next;
      }

      next[homeX][homeY] = next[row][col];
      next[row][col] = null;
      next[homeX][homeY].homeX = homeX;
      next[homeX][homeY].homeY = homeY;
      next[8][8].homeX = row;
      next[8][8].homeY = col;

      return next;
    });
  }

  const onRelease = () => {
    setBoard((current) => {
      const next = current.map((r) => [...r]);

      if (!next[8][8]) {
        return next;
      }

      next[next[8][8].homeX][next[8][8].homeY] = next[8][8];
      next[8][8] = null;

        for(let i = 0; i < 8; i++){
          for(let j = 0; j < 8; j++){
              next[i][j].drag = false;
          }
        } 
      
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
