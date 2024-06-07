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
  Image,
  LinierGradient,
  Icon
} from "libs/ui";
import ScrollView from "libs/ui/ScrollView";
import { useNavigation } from "@react-navigation/native";
import SessionStore from "app/model/session";

import { observer, useLocalObservable } from "mobx-react-lite";
import React from "react";
import { Dimensions, useWindowDimensions, StatusBar } from "react-native";
import * as Yup from "yup";
import { action } from "mobx";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();

  const requestOTP = async () => {
    dismiss();
    SessionStore.requestOTP();
    nav.navigate("guest/OTP");
  };
  const meta = useLocalObservable(() => ({
    visibleKeyboard: false,
    showAlert: false,
  }));

  const dismiss = action(() => (meta.showAlert = false));

  const onSubmit = async () => {
    // let res = await SessionStore.requestOTP();
    // if (!!res) {
    //   nav.navigate("guest/OTP");
    // }

    let exist = await SessionStore.isRegistered();
    if (exist) {
      nav.navigate("guest/Pin");
    } else {
      if(SessionStore.form.phoneOTP==SessionStore.form.phone){
        if (SessionStore.isOTPExpired()) {
          let res = await SessionStore.requestOTP();
          if (!!res) {
            nav.navigate("guest/OTP");
          }
        } else {
          nav.navigate("guest/OTP");
        }

      }else{
        let res = await SessionStore.requestOTP();
        if (!!res) {
          nav.navigate("guest/OTP");
        }

      }
    }
  };

  const { height, width } = useWindowDimensions();

  let heightx = (364 * (width / 2)) / 734;

  return (
  
  <LinierGradient
    colors={['#3B82F6',"#67E8F9"]}
    style={{flex:1}}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <StatusBar hidden />
      <TopBar
        style={{
          backgroundColor: "#ffff",
          borderBottomRightRadius: 50,
          height:76,
        }}
      >
      <Text style={{fontFamily:"Arial", marginLeft:20,marginTop:15.5,marginBottom:15.5,fontSize:30, height:45,fontWeight:"bold",color:"#3B82F6"}}>MASUK / DAFTAR</Text>
      </TopBar>
      <ScrollView>
        <View
          style={{
            backgroundColor: "#FFF0",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingTop: 15,
            paddingBottom: 15,
            paddingHorizontal: 15,
          }}
        >
          <View style={{flex: 1, flexDirection: 'row',marginBottom:80}}>
            {<Icon name="error" source="MaterialIcons" style={{flex:0,marginRight:13,color:"#F9FAFB"}}/>} 
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Arial",
                lineHeight:24,
                flex:1,
                color:"#F9FAFB"
              }}
            >
             Masukkan nomer telepon anda untuk masuk / daftar
            </Text>
          </View>

          <View style={{height:"100%"}}>
          <Form
              values={SessionStore.formRegist}
              onSubmit={onSubmit}
              validationSchema={{
                phone: Yup.string().required("Harus diisi").min(8, "Minimal 8 angka."),
              }}
              Submit={(submit, canSubmit) => (
                <Button
                  style={{
                    // padding: 10,
                    bottom:-height/2-60,
                    borderRadius: 99,
                    margin: 0,
                    height:40,
                    backgroundColor: "#3B82F6",
                  }}
                  onPress={submit}
                  disabled={!canSubmit || SessionStore.loading}
                >
                  {SessionStore.loading ? (
                    <Spinner color="#ffff"></Spinner>
                  ) : (
                    <Text
                      style={{
                        color: "#ffff",
                        fontSize: 14,
                        fontFamily:"Arial",
                      }}
                    >
                      Login / Daftar
                    </Text>
                  )}
                </Button>
              )}
            >
              {(props) => (
                <>
                  <Text style={{fontFamily:"Arial",fontSize:14,fontWeight:"bold",color:"#F9FAFB",marginBottom: 10}}>Nomer Telepon</Text>
                  <Field
                    initializeField={props}
                    label={"Nomor Telepon"}
                    path={"phone"}
                    styles={{
                      label: {
                        color: "#333",
                        textAlign: "left",
                        fontStyle: "italic",
                        fontSize: 0,
                      },
                      input:{
                        borderRadius:0,
                      }
                    }}
                  >
                    <TextInput
                      type={"number"}
                      keyboardType={"number-pad"}
                      style={{
                        textAlign: "left",
                        fontSize: 14,
                        borderWidth: 1,
                        padding: 10,
                        width: 328,
                        height: 41,
                        borderColor: "#F4F4F5",
                        fontFamily: Fonts.poppins,
                      }}
                      placeholder="Masukkan No. Telepon"
                    />
                  </Field>
                </>
              )}
            </Form>
          </View>
        </View>
      </ScrollView>
  </LinierGradient>
  );
});
