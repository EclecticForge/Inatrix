import { useEffect } from 'react';
import { Image, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import AssetManager, { assetMode, imageMode, selection } from "../app/assetmanager";



export type TileData = { id: number; color: number; shape: number; rowOwner: number; colOwner: number };



export type onHoldType = { (rowOwner: number, colOwner: number): void };
export type onHoverType = { (rowOwner: number, colOwner: number, rowTarget: number, colTarget: number): void };
export type onReleaseType = { (): void };



type TileProp = { tile: TileData; tilesize: number; assets: AssetManager; onHold: onHoldType; onHover: onHoverType; onRelease: onReleaseType };





export default function Tile({ tile, tilesize, assets, onHold, onHover, onRelease }: TileProp) {
    const row = useSharedValue(tile.rowOwner);
    const col = useSharedValue(tile.colOwner);
    const offsetRow = useSharedValue(row.value * tilesize);
    const offsetCol = useSharedValue(col.value * tilesize);
    const offsetRowCache = useSharedValue(offsetRow.value);
    const offsetColCache = useSharedValue(offsetCol.value);
    const isDragged = useSharedValue(false);



    useEffect(() => {
        row.value = tile.rowOwner;
        col.value = tile.colOwner;

        if (!isDragged.value) {
            offsetRow.value = withSpring(row.value * tilesize);
            offsetCol.value = withSpring(col.value * tilesize);
        }

    }, [tile.rowOwner, tile.colOwner]);





    const pan = Gesture.Pan()



        .onBegin(() => {
            isDragged.value = true;

            offsetRowCache.value = offsetRow.value;
            offsetColCache.value = offsetCol.value;

            scheduleOnRN(onHold, tile.rowOwner, tile.colOwner);
        })



        .onUpdate((e) => {
            offsetRow.value = e.translationX + offsetRowCache.value;
            offsetCol.value = e.translationY + offsetColCache.value;

            row.value = Math.round(offsetRow.value / tilesize);
            col.value = Math.round(offsetCol.value / tilesize);

            if (row.value < 0 || row.value> 7 || col.value < 0|| col.value > 7){
                return;
            }

            if (row.value == tile.rowOwner && col.value == tile.colOwner) {
                return;
            }

            scheduleOnRN(onHover, tile.rowOwner, tile.colOwner, row.value, col.value);
        })



        .onFinalize(() => {
            scheduleOnRN(onRelease);
            isDragged.value = false;

            row.value = tile.rowOwner;
            col.value = tile.colOwner;

            offsetRow.value = withSpring(row.value * tilesize);
            offsetCol.value = withSpring(col.value * tilesize);
        });






    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offsetRow.value }, { translateY: offsetCol.value }],
    }));





    return (
        <GestureDetector gesture={pan}>
            <Animated.View style={[{ position: 'absolute', width: tilesize, height: tilesize, justifyContent: 'center', alignItems: 'center', }, animatedStyle]}>
                <Image source={assets[assetMode.Image][imageMode.Color][tile.color as selection]} style={[{ width: tilesize - 2, height: tilesize - 2 }]} resizeMode="stretch" />
                <Image source={assets[assetMode.Image][imageMode.Shape][tile.shape as selection]} style={[StyleSheet.absoluteFill, { width: tilesize, height: tilesize }]} resizeMode="stretch" />
            </Animated.View>
        </GestureDetector>
    );
}