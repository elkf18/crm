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
  Camera,
  Icon,
} from "libs/ui";
import { StyleSheet } from "react-native";
import ScrollView from "libs/ui/ScrollView";
import { useNavigation } from "@react-navigation/native";
import SessionStore from "app/model/session";
import styles from "app/config/styles";
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

  let heightx = (364 * (width / 2)) / 734;

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
            paddingHorizontal: 15, flexDirection: 'column',
            flex: 1
          }}
        >
          {!meta.visibleKeyboard && (
            <>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "Arial",
                  textAlign: "center",
                  fontWeight:'bold',
                  marginTop: 15,
                  marginBottom: 30,
                  color: "#3B82F6",
                }}
              >
                Daftar
              </Text>
            </>
          )}

          <View
            style={{
              marginHorizontal: -15,
              padding: 15,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              height:"100%",
              
          }}
          >
            <Form
              values={SessionStore.formRegist}
              onSubmit={() => {
                // onSubmitFormProfilBisnisValidation()
                nav.navigate("guest/CreatePin");
              }}
              Submit={(submit, canSubmit) => (
                <Button
                  style={{
                    position: 'relative',
                    backgroundColor: "#3B82F6",
                    borderRadius: 99,
                    height:40,       
                  }}
                  onPress={submit}
                >
                  {SessionStore.loading ? (
                    <Spinner color="#fff"></Spinner>
                  ) : (
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontFamily: "Arial",
                        fontSize: 14,
                      }}
                    >
                      Simpan
                    </Text>
                  )}
                </Button>
              )}
            >
              {(props) => (
                <>
                  <Field
                        label={"Label"}
                        path={"phone"}
                        styles={{
                          label: {
                            fontFamily: "Arial",
                            fontWeight: "400",
                            fontSize: 12,
                            color: "#A1A1AA",
                            marginLeft:0
                          },
                          input:{
                            margin:0,
                            borderRadius:0,
                            borderWidth:0,
                            borderBottomWidth:1,
                            borderColor:"#DDDDDD",
                            backgroundColor:"transparent",
                            width:"100%",
                          }
                        }}
                      >
                        <TextInput
                          placeholder="Text input"
                          type={"text"}
                          style={{
                            textAlign: "left",
                            fontSize: 14,
                            padding: 10,
                            width: 328,
                            height: 41,
                            borderRadius: 4,
                            fontFamily: "Arial",
                            color:"#52525B",
                            paddingHorizontal: -10,
                          }}
                        />
                  </Field>
                  <Field
                        label={"Label"}
                        path={"phone"}
                        styles={{
                          label: {
                            fontFamily: "Arial",
                            fontWeight: "400",
                            fontSize: 12,
                            color: "#A1A1AA",
                            marginLeft:0
                          },
                          input:{
                            margin:0,
                            borderRadius:0,
                            borderWidth:0,
                            borderBottomWidth:1,
                            borderColor:"#DDDDDD",
                            backgroundColor:"transparent",
                            width:"100%",
                          }
                        }}
                      >
                        <TextInput
                          placeholder="Text input"
                          type={"text"}
                          style={{
                            textAlign: "left",
                            fontSize: 14,
                            padding: 10,
                            width: 328,
                            height: 41,
                            borderRadius: 4,
                            fontFamily: "Arial",
                            color:"#52525B",
                            paddingHorizontal: -10,
                          }}
                        />
                  </Field>
                  <Field
                        label={"Label"}
                        path={"phone"}
                        styles={{
                          label: {
                            fontFamily: "Arial",
                            fontWeight: "400",
                            fontSize: 12,
                            color: "#A1A1AA",
                            marginLeft:0
                          },
                          input:{
                            margin:0,
                            borderRadius:0,
                            borderWidth:0,
                            borderBottomWidth:1,
                            borderColor:"#DDDDDD",
                            backgroundColor:"transparent",
                            width:"100%",
                          }
                        }}
                      >
                        <TextInput
                          placeholder="Text input"
                          type={"text"}
                          style={{
                            textAlign: "left",
                            fontSize: 14,
                            padding: 10,
                            width: 328,
                            height: 41,
                            borderRadius: 4,
                            fontFamily: "Arial",
                            color:"#52525B",
                            paddingHorizontal: -10,
                          }}
                        />
                  </Field>
                  <Field
                        label={"Label"}
                        path={"phone"}
                        styles={{
                          label: {
                            fontFamily: "Arial",
                            fontWeight: "400",
                            fontSize: 12,
                            color: "#A1A1AA",
                            marginLeft:0
                          },
                          input:{
                            margin:0,
                            borderRadius:0,
                            borderWidth:0,
                            borderBottomWidth:1,
                            borderColor:"#DDDDDD",
                            backgroundColor:"transparent",
                            width:"100%",
                          }
                        }}
                      >
                        <TextInput
                          placeholder="Text input"
                          type={"text"}
                          style={{
                            textAlign: "left",
                            fontSize: 14,
                            padding: 10,
                            width: 328,
                            height: 41,
                            borderRadius: 4,
                            fontFamily: "Arial",
                            color:"#52525B",
                            paddingHorizontal: -10,
                          }}
                        />
                  </Field>
                  <Field
                        label={"Label"}
                        path={"phone"}
                        styles={{
                          label: {
                            fontFamily: "Arial",
                            fontWeight: "400",
                            fontSize: 12,
                            color: "#A1A1AA",
                            marginLeft:0
                          },
                          input:{
                            margin:0,
                            borderRadius:0,
                            borderWidth:0,
                            borderBottomWidth:1,
                            borderColor:"#DDDDDD",
                            backgroundColor:"transparent",
                            width:"100%",
                          }
                        }}
                      >
                        <TextInput
                          placeholder="Text input"
                          type={"text"}
                          style={{
                            textAlign: "left",
                            fontSize: 14,
                            padding: 10,
                            width: 328,
                            height: 41,
                            borderRadius: 4,
                            fontFamily: "Arial",
                            color:"#52525B",
                            paddingHorizontal: -10,
                          }}
                        />
                  </Field>
                  <Field
                        label={"Label"}
                        path={"phone"}
                        styles={{
                          label: {
                            fontFamily: "Arial",
                            fontWeight: "400",
                            fontSize: 12,
                            color: "#A1A1AA",
                            marginLeft:0
                          },
                          input:{
                            margin:0,
                            borderRadius:0,
                            borderWidth:0,
                            borderBottomWidth:1,
                            borderColor:"#DDDDDD",
                            backgroundColor:"transparent",
                            width:"100%",
                          }
                        }}
                      >
                        <TextInput
                          placeholder="Text input"
                          type={"text"}
                          style={{
                            textAlign: "left",
                            fontSize: 14,
                            padding: 10,
                            width: 328,
                            height: 41,
                            borderRadius: 4,
                            fontFamily: "Arial",
                            color:"#52525B",
                            paddingHorizontal: -10,
                          }}
                        />
                  </Field>
                  <Field
                  // initializeField={props}
                  label="KTP*"
                  // path="url_pic"
                  // hiddenLabel
                  styles={{
                    input: {
                      // width: 330,
                      height: 91,
                      // borderRadius: 999,
                      // overflow: "visible",
                      backgroundColor: "#D8D6DE",
                    },
                    label: {
                      fontFamily: "Arial",
                      fontWeight: "400",
                      fontSize: 12,
                      color: "#A1A1AA",
                      marginLeft:0
                    },
                  }}
                >
                  <Camera renderPreview={(props) => <Preview {...props} />} />
                  </Field>
                  <Field
                  // initializeField={props}
                  label="Swafoto denga KTP*"
                  // path="url_pic"
                  // hiddenLabel
                  styles={{
                    input: {
                      // width: 330,
                      height: 91,
                      // borderRadius: 999,
                      // overflow: "visible",
                      backgroundColor: "#D8D6DE",
                    },
                    label: {
                      fontFamily: "Arial",
                      fontWeight: "400",
                      fontSize: 12,
                      color: "#A1A1AA",
                      marginLeft:0
                    },
                  }}
                >
                  <Camera renderPreview={(props) => <Preview {...props} />} />
                  </Field>
                  <Field
                  // initializeField={props}
                  label="Dokumen STR*"
                  // path="url_pic"
                  // hiddenLabel
                  styles={{
                    input: {
                      // width: 330,
                      height: 91,
                      backgroundColor: "#D8D6DE",
                      // borderRadius: 999,
                      // overflow: "visible",
                    },
                    label: {
                      fontFamily: "Arial",
                      fontWeight: "400",
                      fontSize: 12,
                      color: "#A1A1AA",
                      marginLeft:0
                    },
                  }}
                >
                  <Camera renderPreview={(props) => <Preview {...props} />} />
                  </Field>
                </>
              )}
            </Form>
            </View>
        </View>
      </ScrollView>
    </Screen>
  );
});

const Preview = observer((props: any) => {

  const { source, styles } = props;

  // const Theme = useTheme();
  // const cstyle = StyleSheet.flatten([
  //   {
  //     height: 120,
  //     width: "100%",
  //   },
  //   styles?.thumbnail,
  // ]);
  // let s = source;
  //console.log(JSON.stringify(source))
  // if (!!s && !!s.uri && s.uri.includes("file://")) {
  //   s.uri = s.uri;
  // } else if (!!s && !!s.uri && s.uri === ProductStore.detail.url_pic) {
  //   s.uri = AppConfig.serverUrl + s.uri;
  // }

  return (
    <>
      <View
        style={{
          alignItems: "center",
          // width: 330,
          height: 91,
          justifyContent: "center",
          borderRadius: 10,
          // backgroundColor: "#D8D6DE",
          borderColor: "#ddd",
        }}
      >
        <Icon source="SimpleLineIcons" name="cloud-upload" size={30} style={{color:"#6b7280",height:36,textAlign: 'center',textAlignVertical: 'center',}}/>
        <Text style={{fontSize:16,fontFamily:"Arial",color:"#374151"}}>Browse File</Text>       
      </View>
    </>
  );
});
