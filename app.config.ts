
// WARNING THIS ISN'T VERSIONED
import { ExpoConfig, ConfigContext } from '@expo/config';


// В этот файл переехало содержимое app.json

// todo app icon and splash - изучить

export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config,
        name: "smart-sharing-expo",
        slug: "smart-sharing-expo",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./src/assets/icons/icon.png",
        splash: {
            image: "./src/assets/images/splash.png",
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
                foregroundImage: "./src/assets/icons/adaptive-icon.png",
                backgroundColor: "#FFFFFF"
            }
        },
        web: {
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
