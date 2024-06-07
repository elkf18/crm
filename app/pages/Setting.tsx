import { useNavigation, useTheme } from "@react-navigation/native";
import AppConfig from "app/config/app";
import SessionStore from "app/model/session";
import codePushOptions from "libs/config/code-push";
import { ITheme } from "libs/config/theme";
import {
  Button,
  Icon,
  Screen,
  ScrollView,
  Text,
  TopBar,
  View,
  Image,
} from "libs/ui";
import { IIcon } from "libs/ui/Icon";
import { action, runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React from "react";
import codePush from "react-native-code-push";
import DeviceInfo from "react-native-device-info";
import Update from "../ui/setting/Update";
import { ToastAndroid, TouchableOpacity } from "react-native";
import Activity from "./Activity";
import ActivityStore from "app/model/activity";
import { LinearGradient } from "expo-linear-gradient";

const PushNotification = require("../../node_modules/react-native-push-notification");

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
    ToastAndroid.show("Notif will start in 3 secs", ToastAndroid.LONG);

    console.log(new Date(Date.now() + 3 * 1000));
    PushNotification.localNotificationSchedule({
      id: 1,
      channelId: "channel-idX", // (required)
      channelName: "My channelX", // (required)
      message: "My Notification Message", // (required)
      date: new Date(Date.now() + 5 * 1000), // in millisecs
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    });
  });

  const handleRemainder = action(async () => {
    console.log("remainder");
    await ActivityStore.loadRemainder();
    ToastAndroid.show("Success", ToastAndroid.LONG);
  });

  const handleUserGuide = action(async () => {
    console.log(
      "http://docs.google.com/gview?embedded=true&url=" +
        AppConfig.serverUrl +
        "repo/userguide_crm.pdf"
    );
    nav.navigate("MediaWebView", {
      data: {
        title: "User Guide",
        source: {
          // uri: "https://docs.google.com/gview?embedded=true&url=dev.kelava.id/sfa/repo/userguide_crm.pdf",
          uri:
            "http://docs.google.com/gview?embedded=true&url=" +
            AppConfig.serverUrl +
            "repo/userguide_crm.pdf",
        },
        style: {
          padding: 15,
        },
      },
    });
  });
  const menu = [
    // {
    //   label: "Ubah Sandi",
    //   action: () => nav.navigate("changePassword"),
    //   icon: {
    //     name: "md-key",
    //   } as IIcon,
    // },
    {
      label: "Hari Kerja Analis",
      action: () => nav.navigate("AnalystDayWork"),
      icon: {
        source: "AntDesign",
        name: "calendar",
      } as IIcon,
    },
    {
      label: "Bantuan",
      action: () => nav.navigate(""),
      icon: {
        source: "MaterialIcons",
        name: "help-outline",
      } as IIcon,
    },
    {
      label: "Tentang Mitra Diagnostic",
      action: () => nav.navigate("TentangMitra"),
      icon: {
        source: "FontAwesome",
        name: "home",
      } as IIcon,
    },
    // {
    //   label: "Check new update",
    //   action: handleUpdate,
    //   icon: {
    //     name: "system-update",
    //     source: "MaterialIcons",
    //   } as IIcon,
    // },
    // {
    //   label: "Check Notif",
    //   action: handleNotif,
    //   icon: {
    //     name: "notifications",
    //     source: "MaterialIcons",
    //   } as IIcon,
    // },
    // {
    //   label: "Update Reminder",
    //   action: () => handleRemainder(),
    //   icon: {
    //     source: "MaterialIcons",
    //     name: "notifications",
    //     size: 18,
    //   } as IIcon,
    // },
    // {
    //   label: "User Guide",
    //   action: () => handleUserGuide(),
    //   icon: {
    //     source: "MaterialIcons",
    //     name: "picture-as-pdf",
    //     size: 18,
    //   } as IIcon,
    // },
    // {
    //   label: "Keluar",
    //   action: () => SessionStore.logout(),
    //   icon: {
    //     source: "AntDesign",
    //     name: "logout",
    //     size: 18,
    //   } as IIcon,
    // },
  ];

  return (
    <Screen>
      
      <TopBar
        backButton
        styles={{
          title: {
            paddingTop: 3,
          },
        }}
      >
        Profil
      </TopBar>
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
        <LinearGradient
          colors={["#3B82F6", "#67E8F9"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          locations={[0.0, 1.0]}
        >
          <View style={{ flexDirection: "row", margin: 30 }}>
            <View style={{ alignSelf: "center" }}>
              <Image
                source={require("app/assets/images/profil.png")}
                style={{
                  height: 64,
                  width: 64,
                }}
              ></Image>
            </View>
            <View
              style={{
                flexDirection: "column",
                flexGrow: 1,
                marginLeft: 20,
                alignSelf: "center",
              }}
            >
              <Text
                style={{ color: "#1E40AF", fontWeight: "bold", fontSize: 16 }}
              >
                James Harry
              </Text>
              <Text style={{ fontSize: 14 }}>Plat Nomor : W 1919 PP</Text>
              <Text style={{ fontSize: 14 }}>+6281331777889</Text>
              <Text style={{ fontSize: 14 }}>james@gmail.com</Text>
            </View>
            <View style={{ alignSelf: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  nav.navigate("EditProfile");
                }}
              >
                <Icon
                  name="pencil-circle"
                  source="MaterialCommunityIcons"
                  size={35}
                  color="#3B82F6"
                ></Icon>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        <View
          style={{
            flex: 1,
            marginTop: 20,
          }}
        >
          {menu.map((item, key) => {
            return (
              <Button
                key={key}
                mode={"clean"}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 0,
                  justifyContent: "flex-start",
                  borderBottomWidth: 1,
                  borderColor: "#ddd",
                }}
                onPress={item.action}
              >
                <Icon
                  size={20}
                  color={Theme.colors.primary}
                  {...item.icon}
                ></Icon>
                <Text
                  style={{
                    marginLeft: 10,
                  }}
                >
                  {item.label}
                </Text>
              </Button>
            );
          })}
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 70,
            zIndex: 1,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={action(() => {
              SessionStore.logout();
            })}
          >
            <Text
              style={{
                fontSize: 16,
                backgroundColor: "#3B82F6",
                color: "white",
                paddingHorizontal: 30,
                paddingVertical: 8,
                borderRadius: 40,
                elevation: 5,
              }}
            >
              Keluar
            </Text>
          </TouchableOpacity>
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
