
// WARNING THIS ISN'T VERSIONED
// WARNING: path aliases & importing project code doesn't support here
import { ExpoConfig, ConfigContext } from '@expo/config';


// В этот файл переехало содержимое app.json



export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config,
        name: "Smart Sharing", // Your App Name
        slug: "smart-sharing-expo", // The friendly URL name for publishing. For example, myAppName will refer to the expo.dev/@project-owner/myAppName project.
        version: "0.1.0",
        orientation: "portrait",
        icon: "./src/assets/icons/ic-launcher-android.png",
        splash: {
            //image: "./src/assets/images/splash.png", // todo image in cicrle like in my calculator App

            // resizeMode: cover - fit by height or contain - fit by width, по другому измерению изображение центрируется
            resizeMode: "contain",
            image: "./src/assets/images/splash.png",
            backgroundColor: '#212121' // todo and make light status bar icons if can
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: [ // todo изучить
            "**/*"
        ],
        ios: {
            icon: "./src/assets/icons/ic-launcher-iphone.png",
            bundleIdentifier: "com.rrain.smartsharing",
            buildNumber: "1", // "0.1.0"
            supportsTablet: true,
        },
        android: {
            icon: "./src/assets/icons/ic-launcher-android.png",
            package: "com.rrain.smartsharing",
            versionCode: 1,
            adaptiveIcon: {
                foregroundImage: "./src/assets/icons/ic-launcher-adaptive-android.png",
                backgroundColor: "#FFFFFF"
            }
        },
        web: {
            // Фавикон (favicon) — это небольшой значок размером 16x16 пикселей, используемый в веб-браузерах для показа на вкладке.
            favicon: "./src/assets/icons/favicon.png"
        },
    }
};



// template:
/*
export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'My App',
});
*/
