import Fonts from "libs/assets/fonts";
import {
  Button,
  Field,
  Form,
  ImageBackground,
  TextInput,
  Screen,
  Spinner,
  Text,
  View,
  TopBar,
  Checkbox,
  Image,
} from "libs/ui";
import ScrollView from "libs/ui/ScrollView";
import { useNavigation } from "@react-navigation/native";
import SessionStore from "app/model/session";

import { observer, useLocalObservable } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  useWindowDimensions,
  BackHandler,
} from "react-native";
import * as Yup from "yup";
import { runInAction } from "mobx";
import colors from "app/config/colors";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const { height, width } = useWindowDimensions();

  const meta = useLocalObservable(() => ({
    visibleKeyboard: false,
    showAlert: false,
    page: 1,
  }));


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        //setKeyboardVisible(true); // or some other action
        runInAction(() => (meta.visibleKeyboard = true));
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // setKeyboardVisible(false); // or some other action
        runInAction(() => (meta.visibleKeyboard = false));
      }
    );

    const backAction = () => {
      if (meta.page <= 1) {
        Alert.alert(
          "Keluar Registrasi",
          "Apakah anda yakin ingin keluar dari laman registrasi?",
          [
            {
              text: "Batal",
              onPress: () => null,
              style: "cancel",
            },
            { text: "Ya", onPress: () => nav.goBack() },
          ]
        );
      } else {
        meta.page = 1;
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      backHandler.remove();
    };
  }, []);

  return (
    <Screen
      style={{
        backgroundColor: "#F3F4F6",
      }}
      statusBar={{
        barStyle: "dark-content",
        backgroundColor: "#00000000",
      }}
    >
      <TopBar
        style={{
          backgroundColor: "#FFFFFF",
          // borderWidth:1
          height:60
        }}
        enableShadow={true}
        backButton={true}
        actionBackButton={() => {
          if (meta.page <= 1) {
            nav.goBack();
          } else {
            meta.page = 1;
          }
        }}
        iconProps={{
          color: '#404040',
          name: "arrowleft",
          source: "AntDesign",
        }}
      />
      
      <ScrollView>
        <View
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            flexGrow: 1,
            paddingTop: 15,
            paddingBottom: 16,
            paddingHorizontal: 16,
            flexDirection: 'column',
            flex: 1,
          }}
        >
          {!meta.visibleKeyboard && (
            <>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily:Fonts.poppins,
                  textAlign: "center",
                  fontWeight:'bold',
                  marginTop: 15,
                  marginBottom: 30,
                  color: "#3B82F6",
                }}
              >
                Gagal Masuk!
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Arial",
                  color: "#374151",
                  textAlign: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlignVertical: 'center',
                  alignContent: 'center',
                  marginBottom:30,
                  paddingHorizontal:25
                  }}
                >
                  Status pendaftaran Anda telah Non-Aktif oleh Admin. Harap menghubungi Admin melalui nomor 08111222333
              </Text>
            </>
          )}
          <Image
          source={require("app/assets/images/rejected.png")}
          style={{
            height: 181,
            width: 201,
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        />
        <Button
                  style={{
                    position: 'relative',
                    backgroundColor: "#3B82F6",
                    borderRadius: 99,
                    height:40,       
                    bottom:-height/2/2/2-260
                  }}
                >
                  <Text style={{
                    color:"#FFFF",
                    fontFamily:"Arial",
                    fontSize:14,
                  }}>Cek Status Pendaftaran</Text>
                </Button>
        </View>
      </ScrollView>
    </Screen>
  );
});
