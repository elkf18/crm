import { useNavigation } from "@react-navigation/native";
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
import React from "react";

export default observer((props: any) => {
  const nav = useNavigation();
  const { onBack, meta: state } = props;
  const meta = useLocalObservable(() => ({
    match: true,
  }));

  return (
    <>
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
        >
          <View
            style={{
              flexGrow: 1,
              height:"100%",
              paddingHorizontal: 15,
              justifyContent:'space-between',
              backgroundColor:"#F3F4F6"
            }}
          >
            <View
              style={{
                marginHorizontal: 20,
              }}
            >
              <Text
                  style={{
                    textAlign: "center",
                    marginBottom: 20,
                    fontSize:24,
                    fontFamily:"Poppins",
                    fontWeight:'bold',
                    color:"#3B82F6",
                    marginTop:20
                  }}
                  >
                  Konfirmasi PIN
                </Text>
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: 70,
                 fontSize:16,
                 fontFamily:"Arial",
                }}
              >
                Masukkan ulang PIN baru Anda
              </Text>
            </View>
            <Pin />
             {!meta.match && (
              <Text
                style={{
                  textAlign: "center",
                  color: "#E6212A",
                  marginBottom: 20,
                }}
              >
                PIN tidak sama.
              </Text>
            )}
            <ConfirmButton meta={meta} />
          </View>
        </View>
      </ScrollView>
      <NumPadBoard />
    {/* </Screen> */}
    </>
  );
});
const Pin = observer(() => {
  return (
    <View
      style={{
        marginVertical: 15,
      }}
    >
      <PinInput value={SessionStore.form.confirmPassword} length={6} />
    </View>
  );
});

const NumPadBoard = observer(() => {
  return (
    <View
      style={{
        
        borderTopRightRadius:16,
        borderTopLeftRadius:16,
        paddingVertical:16,
        backgroundColor:"#F3F4F6"
      }}
    >
      <NumPad
        value={SessionStore.form.confirmPassword}
        setValue={(value: string) =>
          runInAction(
            () => (SessionStore.form.confirmPassword = value.slice(0, 6))
          )
        }
      />
    </View>
  );
});

const ConfirmButton = observer((props: any) => {
  const nav = useNavigation();
  const { meta } = props;
  const confirm = async () => {
    if (SessionStore.form.password === SessionStore.form.confirmPassword) {
      if (SessionStore.form.isRegister) {
        // await SessionStore.register();
        console.log("berhasil")
      } else {
        // await SessionStore.forgot();
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
        backgroundColor:"#3B82F6"
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
