export enum assetMode {
    Image,
    Sound
}

export enum imageMode {
    Shape,
    Color
}

export enum selection {
    Special,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
}

export enum sound {
    Background,
    Effect1,
    Effect2,
    Effect3,
}

export default class AssetManager {

    public [assetMode.Image]: Record<imageMode, Record<selection, number>>
    public [assetMode.Sound]: Record<sound, number>

    constructor(){
        this[assetMode.Image] = {} as Record<imageMode, Record<selection, number>>;
        this[assetMode.Sound] = {} as Record<sound, number>;

        this[assetMode.Image][imageMode.Shape] = {} as Record<selection, number>;
        this[assetMode.Image][imageMode.Shape][selection.One] = require("../../assets/images/Shapes/Circle.png");
        this[assetMode.Image][imageMode.Shape][selection.Two] = require("../../assets/images/Shapes/Square.png");
        this[assetMode.Image][imageMode.Shape][selection.Three] = require("../../assets/images/Shapes/Triangle.png");
        this[assetMode.Image][imageMode.Shape][selection.Four] = require("../../assets/images/Shapes/Pentagon.png");
        this[assetMode.Image][imageMode.Shape][selection.Five] = require("../../assets/images/Shapes/Star.png");
        this[assetMode.Image][imageMode.Shape][selection.Six] = require("../../assets/images/Shapes/Sparkle.png");
        this[assetMode.Image][imageMode.Shape][selection.Seven] = require("../../assets/images/Shapes/Donut.png");
        
        this[assetMode.Image][imageMode.Color] = {} as Record<selection, number>;
        this[assetMode.Image][imageMode.Color][selection.One] = require("../../assets/images/Colors/Teal.png");
        this[assetMode.Image][imageMode.Color][selection.Two] = require("../../assets/images/Colors/Green.png");
        this[assetMode.Image][imageMode.Color][selection.Three] = require("../../assets/images/Colors/Yellow.png");
        this[assetMode.Image][imageMode.Color][selection.Four] = require("../../assets/images/Colors/Red.png");
        this[assetMode.Image][imageMode.Color][selection.Five] = require("../../assets/images/Colors/Magenta.png");
        this[assetMode.Image][imageMode.Color][selection.Six] = require("../../assets/images/Colors/Blue.png");
        this[assetMode.Image][imageMode.Color][selection.Seven] = require("../../assets/images/Colors/Gray.png");

        this[assetMode.Sound][sound.Background] = require("../../assets/sounds/background.mp3");
        this[assetMode.Sound][sound.Effect1] = require("../../assets/sounds/Effect0.mp3");
        this[assetMode.Sound][sound.Effect2] = require("../../assets/sounds/Effect1.mp3");
        this[assetMode.Sound][sound.Effect3] = require("../../assets/sounds/Effect2.mp3");
    }
}