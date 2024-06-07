import Fonts from "libs/assets/fonts";
import { Button, ImageBackground, Text, View,TopBar } from "libs/ui";
import ScrollView from "libs/ui/ScrollView";
import SessionStore from "app/model/session";
import NumPad from "app/ui/utils/NumPad";
import PinInput from "app/ui/utils/PinInput";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { color } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default observer((props: any) => {
  const nav = useNavigation();
  const { onBack, meta } = props;

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
      <ScrollView
      style={{
        // backgroundColor:color.primary_main
      }}>
          <View
            style={{
              flexGrow: 1,
              paddingVertical: 35,
              paddingHorizontal: 15,
              // height:"100%",
              justifyContent:'space-between',
              backgroundColor:"#F3F4F6"
            }}
          >
            <View
              style={{
                marginHorizontal: 20,
                // marginBottom: 30,
                
              }}
            >
              {SessionStore.form.isRegister ? (
                <>
                  <Text
                    style={{
                      textAlign: "center",
                      marginBottom: 30,
                      fontSize:24,
                      fontWeight:'bold',
                      fontFamily:Fonts.poppins,
                      color:"#3B82F6"
                    }}
                  >
                    Buat PIN
                  </Text>
                   <Text
                    style={{
                      textAlign: "center",
                      marginBottom: 30,
                      fontSize:16,
                      color:"#374151"
                    }}
                  >
                    Pilih 6 digit PIN Anda
                  </Text>
                </>
              ) : (
                <>
                <Text
                  style={{
                    textAlign: "center",
                    marginBottom: 20,
                    fontSize:24,
                    fontFamily:"Poppins",
                    fontWeight:'bold',
                    color:"#3B82F6"
                  }}
                  >
                  Buat PIN
                </Text>
                <Text
                style={{
                  textAlign: "center",
                  // marginBottom: 70,
                  fontFamily:'Arial',
                  fontSize:16,
                  color:"#374151"
                }}
                >
                  Pilih 6 digit PIN Anda
                </Text>
                </>
              )}
            </View>
            <Pin />
            <Button
              style={{
                borderRadius: 99,
                height:36,
                backgroundColor:"#3B82F6",
                marginBottom:-15              
              }}
              onPress={() => runInAction(() => (meta.mode = "confirm"))}
            >
              <Text
                style={{
                  fontSize: 14,
                  color:"#FFFFFF"
                }}
              >
                Buat PIN
              </Text>
            </Button>
          </View>
      </ScrollView>
      <NumPadBoard />
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
      <PinInput value={SessionStore.form.password} length={6} />
    </View>
  );
});

const NumPadBoard = observer(() => {
  return (
    
    <View
      style={{
        borderTopRightRadius:16,
        borderTopLeftRadius:16,
        // paddingVertical:16
        backgroundColor:"#F3F4F6"
      }}
    >
      <NumPad
        value={SessionStore.form.password}
        setValue={(value: string) =>
          runInAction(() => (SessionStore.form.password = value.slice(0, 6)))
        }
      />
    </View>
  );
});
