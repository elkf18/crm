import { useNavigation, useTheme } from "@react-navigation/native";
import AppConfig from "app/config/app";
import SessionStore from "app/model/session";
import codePushOptions from "libs/config/code-push";
import { ITheme } from "libs/config/theme";
import { Button, Icon, Screen, ScrollView, Text, TopBar, View,Image } from "libs/ui";
import { IIcon } from "libs/ui/Icon";
import { action, runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React from "react";
import codePush from "react-native-code-push";
import DeviceInfo from "react-native-device-info";
import Update from "../ui/setting/Update";
import { ToastAndroid,TouchableOpacity } from "react-native";
import Activity from "./Activity";
import ActivityStore from "app/model/activity";
import { LinearGradient } from "expo-linear-gradient";

const PushNotification = require('../../node_modules/react-native-push-notification');

export default observer(() => {
  const Theme: ITheme = useTheme() as any;
  const nav = useNavigation();
  const meta = useLocalObservable(() => ({
    update: false,
    checkUpdate: false,
    progress: "",
  }));
  const handleUpdate = action(async () => {
    try {
      runInAction(() => (meta.checkUpdate = true));
      codePush
        .checkForUpdate(codePushOptions.deploymentKey)
        .then((update) => {
          if (!update) {
            alert("Already updated.");
            runInAction(() => (meta.checkUpdate = false));
          } else {
            runInAction(() => (meta.update = true));
            update
              .download((progress: any) => {
                if (!!progress) {
                  let dl = (progress.receivedBytes / progress.totalBytes) * 100;
                  runInAction(() => (meta.progress = `(${dl.toFixed(1)}%)`));
                  if (dl == 100) {
                    runInAction(() => (meta.checkUpdate = false));
                    meta.checkUpdate = false;
                    
                    setTimeout(() => {
                      codePush.restartApp();
                    }, 100);
                  }
                }
              })
              .catch((e) => {
                runInAction(() => (meta.checkUpdate = false));
                console.log(e);
              });
          }
        })
        .catch((e) => {
          runInAction(() => (meta.checkUpdate = false));
          console.log(e);
        });
    } catch (e) {
      runInAction(() => (meta.checkUpdate = false));
      // handle or log error
      console.log(e);
    }
  });


  const handleNotif = action(async () => {

    ToastAndroid.show("Notif will start in 3 secs",ToastAndroid.LONG);

    console.log(new Date(Date.now() + (3 * 1000)))
    PushNotification.localNotificationSchedule({
        
      id: 1,
      channelId: "channel-idX", // (required)
    channelName: "My channelX", // (required)
    message: "My Notification Message", // (required)
    date: new Date(Date.now() + (5 * 1000)), // in millisecs
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      
  });

  });

  const handleRemainder = action(async () => {

    console.log("remainder")
    await ActivityStore.loadRemainder()
    ToastAndroid.show("Success",ToastAndroid.LONG);
    

  });

  const handleUserGuide = action (async () =>{
    console.log("http://docs.google.com/gview?embedded=true&url="+AppConfig.serverUrl+"repo/userguide_crm.pdf")
    nav.navigate("MediaWebView", {
      data: {
        title: "User Guide",
        source: {
          // uri: "https://docs.google.com/gview?embedded=true&url=dev.kelava.id/sfa/repo/userguide_crm.pdf",
          uri:"http://docs.google.com/gview?embedded=true&url="+AppConfig.serverUrl+"repo/userguide_crm.pdf"
        },
        style: {
          padding: 15,
        },
      },
    });
    
  })

  return (
    <Screen
      statusBar={{
        backgroundColor: Theme.colors.primary,
        barStyle: "light-content",
      }}
    >
      <TopBar backButton styles={{
          title:{
            paddingTop:3
          }
        }}>Tentang Mitra Diagnostic</TopBar>
      <ScrollView
        style={{
          backgroundColor: "#fff",
        }}
        keyboardAvoidingProps={{
          style: {
            flexGrow: 1,
          },
        }}
      >
        <View style={{margin:20}}>
        <Text style={{ textAlign: "justify",}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. {"\n"}{"\n"}
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. {"\n"}{"\n"}
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. {"\n"}

        </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {"©"} {DeviceInfo.getApplicationName()}
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}
          >
            v{DeviceInfo.getVersion()}
            {AppConfig.mode === "production" ? "" : "-dev"}
          </Text>
        </View>
      </ScrollView>
      <Update meta={meta} />
    </Screen>
  );
});
