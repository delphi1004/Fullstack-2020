import 'dotenv/config';

export default {
  "expo": {
    "name": "Ex17",
    "slug": "Ex17",
    "extra": {
      // eslint-disable-next-line no-undef
      "uri": process.env.APOLLO_URI,
    },
    "ios": {
      "bundleIdentifier": "appstars",
      "supportsTablet": true
    },
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
};
