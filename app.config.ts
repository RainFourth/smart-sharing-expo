
// WARNING THIS ISN'T VERSIONED
import { ExpoConfig, ConfigContext } from '@expo/config';


// В этот файл переехало содержимое app.json


export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config,
        name: "smart-sharing-expo",
        slug: "smart-sharing-expo",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: [
            "**/*"
        ],
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#FFFFFF"
            }
        },
        web: {
            favicon: "./assets/favicon.png"
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
