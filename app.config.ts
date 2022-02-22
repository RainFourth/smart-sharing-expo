
// WARNING THIS ISN'T VERSIONED
// WARNING: path aliases & importing project code doesn't support here
import { ExpoConfig, ConfigContext } from '@expo/config';


// В этот файл переехало содержимое app.json

// todo use system theme to select theme

// todo notification icons...

// todo уменьшить размер S у адаптивной иконки

export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config,
        name: "Smart Sharing", // Your App Name
        slug: "smart-sharing-expo", // The friendly URL name for publishing. For example, myAppName will refer to the expo.dev/@project-owner/myAppName project.
        version: "0.1.1",
        orientation: "portrait",
        icon: "./src/assets/icons/ic-launcher-android.png",
        splash: {
            // resizeMode: cover - fit by height or contain - fit by width, по другому измерению изображение центрируется
            resizeMode: "contain",
            image: "./src/assets/images/splash-screen.png",
            //backgroundColor: '#212121' // todo and make light status bar icons if can
            backgroundColor: '#7B61FF' // todo and make light status bar icons if can
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: [ // todo изучить
            "**/*"
        ],
        android: {
            icon: "./src/assets/icons/ic-launcher-android.png",
            package: "com.rrain.smartsharing",
            versionCode: 2,
            adaptiveIcon: {
                foregroundImage: "./src/assets/icons/ic-launcher-adaptive-foreground-android.png",
                backgroundImage: "./src/assets/icons/ic-launcher-adaptive-background-android.png",
                //backgroundColor: "#FFFFFF" // instead of background image
            },
            config: {
                googleMaps:{
                    apiKey: "AIzaSyC0cLlO_1DGkn7zcH-JuH_AAiuTvhpHUqA"
                }
            }
        },
        ios: {
            icon: "./src/assets/icons/ic-launcher-iphone.png",
            bundleIdentifier: "com.rrain.smartsharing",
            buildNumber: "0.1.1",
            supportsTablet: true,

            // todo api key for google maps
        },
        /*web: {
            // Фавикон (favicon) — это небольшой значок размером 16x16 пикселей, используемый в веб-браузерах для показа на вкладке.
            favicon: "./src/assets/icons/favicon.png"
        },*/
    }
};



// template:
/*
export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'My App',
});
*/
