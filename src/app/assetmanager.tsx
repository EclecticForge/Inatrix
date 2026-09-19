export enum assetMode {
    Image,
    Sound
}

export enum numberOfColors {
    NotAColor = 0,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven
}

export enum selection {
    One = 1,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven
}

export enum sound {
    Background,
    Effect1,
    Effect2,
    Effect3,
}

export default class AssetManager {

    public [assetMode.Image]: Record<numberOfColors, Record<selection, number>>
    public [assetMode.Sound]: Record<sound, number>

    constructor(){
        this[assetMode.Image] = {} as Record<numberOfColors, Record<selection, number>>;
        this[assetMode.Sound] = {} as Record<sound, number>;

        this[assetMode.Image][numberOfColors.NotAColor] = {} as Record<selection, number>;
        this[assetMode.Image][numberOfColors.NotAColor][selection.One] = require("../../assets/images/Shapes/Circle.png");
        this[assetMode.Image][numberOfColors.NotAColor][selection.Two] = require("../../assets/images/Shapes/Square.png");
        this[assetMode.Image][numberOfColors.NotAColor][selection.Three] = require("../../assets/images/Shapes/Triangle.png");
        this[assetMode.Image][numberOfColors.NotAColor][selection.Four] = require("../../assets/images/Shapes/Pentagon.png");
        this[assetMode.Image][numberOfColors.NotAColor][selection.Five] = require("../../assets/images/Shapes/Star.png");
        this[assetMode.Image][numberOfColors.NotAColor][selection.Six] = require("../../assets/images/Shapes/Sparkle.png");
        this[assetMode.Image][numberOfColors.NotAColor][selection.Seven] = require("../../assets/images/Shapes/Donut.png");
        
        this[assetMode.Image][numberOfColors.One] = {} as Record<selection, number>;
        this[assetMode.Image][numberOfColors.One][selection.One] = require("../../assets/images/Colors/Teal.png");

        this[assetMode.Image][numberOfColors.Two] = {} as Record<selection, number>;
        this[assetMode.Image][numberOfColors.Two][selection.One] = require("../../assets/images/Colors/Teal.png");
        this[assetMode.Image][numberOfColors.Two][selection.Two] = require("../../assets/images/Colors/Red.png");
        
        this[assetMode.Image][numberOfColors.Three] = {} as Record<selection, number>;
        this[assetMode.Image][numberOfColors.Three][selection.One] = require("../../assets/images/Colors/Teal.png");
        this[assetMode.Image][numberOfColors.Three][selection.Two] = require("../../assets/images/Colors/Yellow.png");
        this[assetMode.Image][numberOfColors.Three][selection.Three] = require("../../assets/images/Colors/Magenta.png");
        
        this[assetMode.Image][numberOfColors.Four] = {} as Record<selection, number>;
        this[assetMode.Image][numberOfColors.Four][selection.One] = require("../../assets/images/Colors/Teal.png");
        this[assetMode.Image][numberOfColors.Four][selection.Two] = require("../../assets/images/Colors/Yellow4.png");
        this[assetMode.Image][numberOfColors.Four][selection.Three] = require("../../assets/images/Colors/Red.png");
        this[assetMode.Image][numberOfColors.Four][selection.Four] = require("../../assets/images/Colors/Blue4.png");

        this[assetMode.Image][numberOfColors.Five] = {} as Record<selection, number>;
        this[assetMode.Image][numberOfColors.Five][selection.One] = require("../../assets/images/Colors/Teal.png");
        this[assetMode.Image][numberOfColors.Five][selection.Two] = require("../../assets/images/Colors/Yellow4.png");
        this[assetMode.Image][numberOfColors.Five][selection.Three] = require("../../assets/images/Colors/Red.png");
        this[assetMode.Image][numberOfColors.Five][selection.Four] = require("../../assets/images/Colors/Blue4.png");
        this[assetMode.Image][numberOfColors.Five][selection.Five] = require("../../assets/images/Colors/Gray.png");

        this[assetMode.Image][numberOfColors.Six] = {} as Record<selection, number>;
        this[assetMode.Image][numberOfColors.Six][selection.One] = require("../../assets/images/Colors/Teal.png");
        this[assetMode.Image][numberOfColors.Six][selection.Two] = require("../../assets/images/Colors/Green.png");
        this[assetMode.Image][numberOfColors.Six][selection.Three] = require("../../assets/images/Colors/Yellow.png");
        this[assetMode.Image][numberOfColors.Six][selection.Four] = require("../../assets/images/Colors/Red.png");
        this[assetMode.Image][numberOfColors.Six][selection.Five] = require("../../assets/images/Colors/Magenta.png");
        this[assetMode.Image][numberOfColors.Six][selection.Six] = require("../../assets/images/Colors/Blue.png");

        this[assetMode.Image][numberOfColors.Seven] = {} as Record<selection, number>;
        this[assetMode.Image][numberOfColors.Seven][selection.One] = require("../../assets/images/Colors/Teal.png");
        this[assetMode.Image][numberOfColors.Seven][selection.Two] = require("../../assets/images/Colors/Green.png");
        this[assetMode.Image][numberOfColors.Seven][selection.Three] = require("../../assets/images/Colors/Yellow.png");
        this[assetMode.Image][numberOfColors.Seven][selection.Four] = require("../../assets/images/Colors/Red.png");
        this[assetMode.Image][numberOfColors.Seven][selection.Five] = require("../../assets/images/Colors/Magenta.png");
        this[assetMode.Image][numberOfColors.Seven][selection.Six] = require("../../assets/images/Colors/Blue.png");
        this[assetMode.Image][numberOfColors.Seven][selection.Seven] = require("../../assets/images/Colors/Gray.png");

        this[assetMode.Sound][sound.Background] = require("../../assets/sounds/background.mp3");
        this[assetMode.Sound][sound.Effect1] = require("../../assets/sounds/Effect0.mp3");
        this[assetMode.Sound][sound.Effect2] = require("../../assets/sounds/Effect1.mp3");
        this[assetMode.Sound][sound.Effect3] = require("../../assets/sounds/Effect2.mp3");
    }


}