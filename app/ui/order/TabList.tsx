import { useTheme } from "@react-navigation/native";
import colors from "app/config/colors";
import ActivityStore from "app/model/activity";
import SalesStore from "app/model/sales";
import Fonts from "libs/assets/fonts";
import { ITheme } from "libs/config/theme";
import { Button, ScrollView, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import Filter from "../utils/Filter";
import MainTopBar from "../utils/MainTopBar";

export default observer(({ state, tabs, navigation }: any) => {
  const Theme: ITheme = useTheme() as any;
  let filter = SalesStore.filter;
  // switch (tabs[state.index].name) {
  //   case "Baru":
  //     filter = ActivityStore.filterBaru;
  //     break;
  //   case "Berjalan":
  //     filter = ActivityStore.filterBerjalan;
  //     break;
  //   case "Selesai":
  //     filter = ActivityStore.filterSelesai;
  //     break;
  // }

  return (
    <>
      <MainTopBar filter={filter} />
      <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyboardAvoidingProps={{
        style: {
          flexShrink: 0,
        },
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          borderBottomWidth: 1
          
        }}
      >
        {tabs.map((item: any, key: number) => {
          const active = item.label === state.routeNames[state.index];
          return (
            <Button
              key={item.label}
              mode="clean"
              style={{
                margin: 0,
                borderRadius: 0,
                flexGrow: 1,
                minWidth: 120,
                alignItems: "center",
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderBottomColor: 'grey',
              }}
              onPress={() => {
                navigation.navigate(item.label);
              }}
            >
              <Text
                style={{
                  flexWrap: "nowrap",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize:16,
                  fontWeight: '400'
                }}
                numberOfLines={2}
                ellipsizeMode={"tail"}
              >
                {item.label}
              </Text>
              {item.totalData != null && 
                <Text
                style={{
                  flexWrap: "nowrap",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: 16,
                  fontWeight: '400',
                  marginLeft: 3,
                  marginTop: 2
                }}
                numberOfLines={2}
                ellipsizeMode={"tail"}
              >
                ({item.totalData})
              </Text>
              }
            </Button>
          );
        })}
      </View>
    </ScrollView>
      <Filter filter={SalesStore.filter} />
    </>
  );
});
