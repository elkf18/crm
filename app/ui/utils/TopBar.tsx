import { useNavigation } from "@react-navigation/core";
import { fontFamily } from "app/config/const";
import Fonts from "libs/assets/fonts";
import useTheme from "libs/hooks/useTheme";
import { Button, Icon, Text, TopBar, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions, useWindowDimensions } from "react-native";

export default observer((props: any) => {
  const {
    title,
    backgroundColor,
    rightActionColor,
    onGoBack,
    hiddenBack,
    textColor,
  } = props;
  const dim = Dimensions.get("window");
  const Theme = useTheme();
  const nav = useNavigation();
  const baseTextTitleStyle = {
    fontSize: 20,
    fontWeight: '400',
    paddingRight: 10
  }
  const baseViewContainerStyle = {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: 'center',
    width: '100%'
  }
  const baseTopBarBackgroundColor = {
    backgroundColor:  '#FFFFFF',
  }


  return (
    <TopBar
      enableShadow={false}
      style={{
        backgroundColor: "#FFFFFF",
        marginBottom: 10,
        elevation: 4,
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        {hiddenBack && (
          <Button
            mode="clean"
            style={{
              borderRadius: 0,
              paddingLeft: 10,
              margin: 0,
              left: 0,
            }}
            onPress={() => {
              if (!!onGoBack) {
                onGoBack();
              } else {
                nav.goBack();
              }
            }}
          >
            <Icon name="chevron-back" color={"#3B82F6"} size={30} />
          </Button>
        )}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            paddingRight: 10,
            fontFamily: Fonts.RobotoBold,
          }}
        >
          {title || ""}
        </Text>
      </View>
    </TopBar>
  );
});
