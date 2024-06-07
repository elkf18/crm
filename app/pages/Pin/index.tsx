import { useIsFocused, useNavigation } from "@react-navigation/native";
// import color from "app/config/color";
// import { fontFamily, fontSize } from "app/config/const";
import SessionStore from "app/model/session";
// import GuestHeader from "app/ui/utils/GuestHeader";
import NumPad from "app/ui/utils/NumPad";
import PinInput from "app/ui/utils/PinInput";
import Fonts from "libs/assets/fonts";
import { Button, ImageBackground, Screen, Text, View,TopBar } from "libs/ui";
import ScrollView from "libs/ui/ScrollView";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default observer(() => {
  const nav = useNavigation();
  const dim = Dimensions.get("window");
  const isFocused = useIsFocused();
  const meta = useLocalObservable(() => ({
    timer: 0,
    match: true,
  }));

  useEffect(() => {
    runInAction(() => {
      SessionStore.password = "";
    });
  }, []);

  return (
    <Screen
      style={{
        // backgroundColor: color.primary_main,
      }}
      statusBar={{
        barStyle:"light-content"
      }}
    >
      <TopBar
        style={{
          backgroundColor: "#FFFFFF",
          height:60
        }}
        enableShadow={true}
        backButton={true}
        actionBackButton={() => {
          nav.goBack();
        }}
        iconProps={{
          color: '#404040',
          name: "arrowleft",
          source: "AntDesign",
        }}
        styles={{
          title: {
            paddingTop: 3,
          },
        }}
      >
      </TopBar>
      <ScrollView>
        <View
        style={{
          height:dim.height
        }}
        >
          <View
            style={{
              flexGrow: 1,
              padding: 35,
              backgroundColor:"#F3F4F6",

            }}
          >
            <View
              style={{
                marginHorizontal: 30,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: 20,
                  color:"#3B82F6",
                  fontSize:24,
                  fontWeight:'bold',
                  fontFamily:Fonts.poppins
                }}
              >
                Account PIN
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: 70,
                  fontFamily:"Arial",
                  fontSize:16,
                  color:"#374151",
                }}
              >
                Masukkan 6 digit PIN Anda
              </Text>
            </View>
            <Pin />
            <ResendButton meta={meta} />
          </View>

          
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor:"#F3F4F6",
        }}
      >
        <ConfirmButton meta={meta}/>
        <NumPad
          value={SessionStore.password}
          setValue={(value: string) => {
            runInAction(() => (SessionStore.form.password = value.slice(0, 6)));

            // if (SessionStore.form.password.length === 6) {
            //   // SessionStore.login();
            // }
          }}
        />
      </View>
    </Screen>
  );
});

const Pin = observer(() => {
  return (
    <View
      style={{
        marginBottom:77.5
      }}
    >
      <Text>
        {SessionStore.password}
      </Text>
      <PinInput value={SessionStore.password} length={6} />
    </View>
  );
});

const ResendButton = observer((props: any) => {
  const nav = useNavigation();
  const forgot = async () => {
    let res = await SessionStore.requestOTP(true);
    if (!!res) {
      nav.navigate("guest/OTP");
    }
  };

  return (
    <TouchableOpacity
      style={{
        alignContent:"center",
        alignItems:"center",
        alignSelf:"center",
        paddingVertical: 10,
        margin: 0,
        
      }}
      onPress={forgot}
    >
      <Text
        style={{
          fontSize:14,
          color:"red",
          textDecorationLine: "underline",
          textDecorationStyle: "solid",
        }}
        
      >
        Lupa PIN?
      </Text>
    </TouchableOpacity>
  );
});

const ConfirmButton = observer((props: any) => {
  const nav = useNavigation();
  const { meta } = props;
  const confirm = async () => {
    if (!!SessionStore.form.password) {
      if (SessionStore.form.isRegister) {
        await SessionStore.login();
        console.log("berhasil")
      } else {
        await SessionStore.login();
        console.log("berhasil")
        console.log("iya")
      }
    } else {
      runInAction(() => {
        SessionStore.form.confirmPassword = "";
        meta.match = false;
      });
    }
  };

  return (
    <Button
      style={{
        borderRadius: 99,
        paddingVertical: 10,
        backgroundColor:"#3B82F6",
        flexGrow:1,
        marginHorizontal:15,
        marginBottom:15,
      }}
      onPress={confirm}
      disabled={SessionStore.loading}
    >
      <Text
        style={{
          fontSize: 14,
          color:"#FFFFFF",
          fontFamily:"Arial"
        }}
      >
        Konfirmasi
      </Text>
    </Button>
  );
});
