import { useEffect } from 'react';
import { Image, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import AssetManager, { selection } from "../app/assetmanager";

export type TileData = { id: number; color: number; shape: number; homeX: number; homeY: number; drag: boolean };

type onHoldType = { (homeX: number, homeY: number):void };
type onHoverType = { (homeX: number, homeY: number, row: number, col: number):void};
type onReleaseType = { (): void};

type TileProp = { tile: TileData; tilesize: number; assets: AssetManager; onHold: onHoldType; onHover: onHoverType; onRelease: onReleaseType};

export default function Tile({ tile, tilesize, assets, onHold, onHover, onRelease }: TileProp) {
    const offsetX = useSharedValue(tile.homeX * tilesize);
    const offsetY = useSharedValue(tile.homeY * tilesize);
    const offsetXmemory = useSharedValue(offsetX.value);
    const offsetYmemory = useSharedValue(offsetY.value);

    useEffect(() => {
        if (!tile.drag) {
            offsetX.value = withSpring(tile.homeX * tilesize);
            offsetY.value = withSpring(tile.homeY * tilesize);            
        }
    }, [tile.homeX, tile.homeY]);

    const pan = Gesture.Pan()
        .onBegin(() => {
            tile.drag = true;
            offsetXmemory.value = offsetX.value;
            offsetYmemory.value = offsetY.value;
            scheduleOnRN(onHold, tile.homeX, tile.homeY);
        })
        .onUpdate((e) => {
            offsetX.value = e.translationX + offsetXmemory.value;
            offsetY.value = e.translationY + offsetYmemory.value;

            const row = Math.round(offsetX.value / tilesize);
            const col = Math.round(offsetY.value / tilesize);
            if (row < 0 || row > 7 || col < 0 || col > 7) return;
            if(row != tile.homeX || col != tile.homeY){
                scheduleOnRN(onHover, tile.homeX, tile.homeY, row, col);
            }
            
        })
        .onFinalize(() => {
            scheduleOnRN(onRelease);
            offsetX.value = withSpring(tile.homeX * tilesize);
            offsetY.value = withSpring(tile.homeY * tilesize);
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
    }));

    return (
        <GestureDetector gesture={pan}>
            <Animated.View style={[{ position: 'absolute', width: tilesize, height: tilesize, justifyContent: 'center', alignItems: 'center', }, animatedStyle]}>
                <Image source={assets[0][1][tile.color as selection]} style={[{ width: tilesize - 5, height: tilesize - 5 }]} resizeMode="stretch" />
                <Image source={assets[0][0][tile.shape as selection]} style={[StyleSheet.absoluteFill, { width: tilesize, height: tilesize }]} resizeMode="stretch" />
            </Animated.View>
        </GestureDetector>
    );
}