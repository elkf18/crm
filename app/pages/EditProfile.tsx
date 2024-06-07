import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import colors from "app/config/colors";
import color from "app/config/colors";
import { fontFamily, fontSize } from "app/config/const";
import SessionStore from "app/model/session";
import TopBar from "app/ui/utils/TopBar";
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import {
  Button,
  Camera,
  ChoiceGroup,
  DateTime,
  Field,
  Form,
  Icon,
  Image,
  Screen,
  ScrollView,
  Spinner,
  Text,
  TextInput,
  View,
} from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Yup from "yup";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const Theme = useTheme();

  useEffect(() => {
    //@ts-ignore
    SessionStore.initForm(SessionStore.user);

    return () => {
      //@ts-ignore
      SessionStore.initForm(SessionStore.user);
    };
  }, []);

  var submit = async () => {
    SessionStore.updateProfile().then((res) => {
      if (!!res) {
        nav.goBack();
      } else {
        nav.goBack();
      }
    });
  };

  return (
    <Screen
      style={{
        backgroundColor: "white",
      }}
      statusBar={{
        barStyle: "dark-content",
        backgroundColor: "#fff",
      }}
    >
      <TopBar
        title="Ubah Profil"
        textColor={color.textDark}
        backgroundColor={"#fff"}
        rightActionColor={color.primary}
      />
      <ScrollView>
        <Form
          values={SessionStore.form}
          validationSchema={{
            name: Yup.string().required("Harus diisi"),
            no_str: Yup.string().required("Harus diisi"),
            born_date: Yup.string().required("Harus diisi"),
            gender: Yup.string().required("Harus diisi"),
          }}
          onSubmit={() => submit()}
          Submit={(submit, canSubmit) => (
            <Button
              style={{
                paddingVertical: 15,
                borderRadius: 8,
                margin: 0,
                marginHorizontal: 15,
                marginBottom: 15,
                backgroundColor: color.primary,
              }}
              disabled={!canSubmit || SessionStore.loading}
              onPress={submit}
            >
              {SessionStore.loading ? (
                <Spinner color={color.primary}></Spinner>
              ) : (
                <Text
                  style={{
                    fontFamily: Fonts.RobotoBold,
                    color: color.textField,
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
                initializeField={props}
                label="Foto"
                path="foto"
                hiddenLabel
                styles={{
                  input: {
                    width: 120,
                    height: 120,
                    borderRadius: 999,
                    overflow: "visible",
                  },
                  field: {
                    justifyContent: "center",
                    alignItems: "center",
                  },
                }}
              >
                <Camera
                  renderPreview={(props) => (
                    //@ts-ignore
                    <Preview {...props} />
                  )}
                />
              </Field>

              <Field
                initializeField={props}
                label="Nama Lengkap *"
                path="name"
                style={{ paddingHorizontal: 15 }}
                styles={{
                  label: {
                    color: color.textDark,
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.m,
                  },
                  input: {
                    borderRadius: 4,
                    backgroundColor: color.surfaceGrey,
                  },
                }}
              >
                <TextInput
                  type="text"
                  style={{
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.m,
                    color: color.textBlack,
                  }}
                />
              </Field>

              <Field
                initializeField={props}
                label="No. STR *"
                path="no_str"
                style={{ paddingHorizontal: 15 }}
                styles={{
                  label: {
                    color: color.textDark,
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.m,
                  },
                  input: {
                    borderRadius: 4,
                    backgroundColor: color.surfaceGrey,
                  },
                }}
              >
                <TextInput
                  type="number"
                  style={{
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.m,
                    color: color.textBlack,
                  }}
                />
              </Field>

              <Field
                initializeField={props}
                label="No. Telepon"
                path="phone1"
                style={{ paddingHorizontal: 15 }}
                styles={{
                  label: {
                    color: color.textDark,
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.m,
                  },
                  input: {
                    borderRadius: 4,
                    backgroundColor: color.surfaceGrey,
                  },
                }}
              >
                <TextInput
                  type="number"
                  style={{
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.m,
                    color: color.textBlack,
                  }}
                />
              </Field>

              <Field
                initializeField={props}
                label="Email"
                path="email"
                style={{ paddingHorizontal: 15 }}
                styles={{
                  label: {
                    color: color.textDark,
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.m,
                  },
                  input: {
                    borderRadius: 4,
                    backgroundColor: color.surfaceGrey,
                  },
                }}
              >
                <TextInput
                  type="text"
                  style={{
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.m,
                    color: color.textBlack,
                  }}
                />
              </Field>
              {/* <Field initializeField={props} label="PIN" path="password">
                <TextInput type="password" />
              </Field> */}
              {Platform.OS == "android" ? (
                <Field
                  initializeField={props}
                  label="Tanggal Lahir *"
                  path="born_date"
                  style={{ paddingHorizontal: 15 }}
                  styles={{
                    label: {
                      color: color.textDark,
                      fontFamily: fontFamily.medium,
                      fontSize: fontSize.m,
                    },
                    input: {
                      borderRadius: 4,
                      backgroundColor: color.surfaceGrey,
                    },
                  }}
                >
                  <DateTime
                    styles={{
                      label: {
                        fontFamily: fontFamily.medium,
                        fontSize: fontSize.m,
                        color: color.textBlack,
                      },
                    }}
                  />
                </Field>
              ) : (
                <DateTime
                  type="date"
                  //@ts-ignore
                  value={SessionStore.form.born_date}
                  onChangeValue={(value) => {
                    //@ts-ignore
                    SessionStore.form.born_date = value;
                  }}
                  iconProps={{
                    name: "md-calendar",
                  }}
                  styles={{
                    label: {},
                  }}
                  Label={({ value }: any) => {
                    return (
                      <View
                        style={{
                          flexDirection: "column",
                          flexGrow: 1,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Fonts.RobotoBold,
                            marginHorizontal: 8,
                            marginBottom: 8,
                            marginTop: -8,
                          }}
                        >
                          {" "}
                          Tanggal Lahir
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            backgroundColor: color.surfaceGreen,
                            marginHorizontal: 8,
                            paddingHorizontal: 8,
                            paddingVertical: 10,
                            borderRadius: 10,
                          }}
                        >
                          <Text
                            style={{
                              flexGrow: 1,
                            }}
                          >
                            {!!value
                              ? dateFormat(value, "dd MMMM yyyy")
                              : "dd MMMM yyyy"}
                          </Text>
                          <Icon name="md-calendar" color={Theme.colors.text} />
                        </View>
                      </View>
                    );
                  }}
                />
              )}

              <Field
                initializeField={props}
                label="Jenis Kelamin *"
                path="gender"
                style={{ paddingHorizontal: 15 }}
                styles={{
                  label: {
                    color: color.textDark,
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.m,
                  },
                }}
              >
                <ChoiceGroup
                  mode="tags"
                  items={[
                    { label: "Laki-laki", value: "LAKI-LAKI" },
                    { label: "Perempuan", value: "PEREMPUAN" },
                  ]}
                  valuePath={"value"}
                  labelPath={"label"}
                  styles={{
                    label: {
                      fontFamily: fontFamily.medium,
                      fontSize: fontSize.m,
                    },
                  }}
                  style={{
                    marginTop: 10,
                    marginHorizontal: 10,
                  }}
                />
              </Field>
              <Field
                initializeField={props}
                label="Foto KTP *"
                path="foto_ktp"
                style={{
                  paddingHorizontal: 15,
                }}
                styles={{
                  label: {
                    color: color.textDark,
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.m,
                  },
                  input: {
                    borderRadius: 4,
                    backgroundColor: color.surfaceGrey,
                    paddingVertical: 20,
                  },
                }}
              >
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      source="FontAwesome"
                      name="cloud-upload"
                      size={60}
                      color={"grey"}
                    />
                    <Text style={{ color: colors.textDark }}>Browse File</Text>
                  </TouchableOpacity>
                </View>
              </Field>

              <Field
                initializeField={props}
                label="Swafoto dengan KTP *"
                path="swafoto_ktp"
                style={{
                  paddingHorizontal: 15,
                }}
                styles={{
                  label: {
                    color: color.textDark,
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.m,
                  },
                  input: {
                    borderRadius: 4,
                    backgroundColor: color.surfaceGrey,
                    paddingVertical: 20,
                  },
                }}
              >
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      source="FontAwesome"
                      name="cloud-upload"
                      size={60}
                      color={"grey"}
                    />
                    <Text style={{ color: colors.textDark }}>Browse File</Text>
                  </TouchableOpacity>
                </View>
              </Field>

              <Field
                initializeField={props}
                label="Dokumen STR *"
                path="dokumen_str"
                style={{
                  paddingHorizontal: 15,
                }}
                styles={{
                  label: {
                    color: color.textDark,
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.m,
                  },
                  input: {
                    borderRadius: 4,
                    backgroundColor: color.surfaceGrey,
                    paddingVertical: 20,
                  },
                }}
              >
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      source="FontAwesome"
                      name="cloud-upload"
                      size={60}
                      color={"grey"}
                    />
                    <Text style={{ color: colors.textDark }}>Browse File</Text>
                  </TouchableOpacity>
                </View>
              </Field>
            </>
          )}
        </Form>
      </ScrollView>
    </Screen>
  );
});

const Preview = observer((props: any) => {
  const { source, styles } = props;
  const Theme = useTheme();
  const cstyle = StyleSheet.flatten([
    {
      height: 120,
      width: "100%",
    },
    styles?.thumbnail,
  ]);
  const s = source;
  if (!!s && !!s.uri && s.uri.includes("file://")) {
    s.uri = s.uri;
  } else if (!!s && !!s.uri && s.uri === SessionStore.form.foto) {
    s.uri = AppConfig.serverUrl + s.uri;
  }

  return (
    <>
      <View
        style={{
          alignItems: "center",
          width: 100,
          height: 100,
          overflow: "hidden",
          justifyContent: "center",
          borderWidth: 1,
          borderRadius: 999,
          borderColor: "#ddd",
        }}
      >
        {!!s && !!s.uri ? (
          <Image source={s} resizeMode="cover" style={cstyle} />
        ) : (
          <Icon name="person" size={60} color={"#ccc"} />
        )}
      </View>
      <View
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          backgroundColor: "#0004",
          borderWidth: 1,
          borderColor: "#eee",
          paddingTop: 38,
          borderRadius: 99,
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Icon
          source="FontAwesome"
          name="edit"
          size={24}
          color={"#fff"}
          style={{
            textAlignVertical: "center",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        />
      </View>
    </>
  );
});
