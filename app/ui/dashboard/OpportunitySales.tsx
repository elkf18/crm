import React from "react";
import { observer } from "mobx-react";
import { View } from "react-native";
import { Text } from "libs/ui";
import Fonts from "libs/assets/fonts";
import { moneyFormat } from "libs/utils/string-format";

export default observer(({ meta }: any) => {
  return (
    <View
      style={{
        padding: 15,
        paddingVertical: 5,
      }}
    >
      <View
        style={{
          padding: 15,
          backgroundColor: "#fafafa",
          borderBottomWidth: 1,
          borderColor: "#dfdfdf",
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.NunitoBold,
            fontSize: 18,
          }}
        >
          10 Peluang Teratas Penjual
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
        }}
      >
        {meta.opSales.map((item: any, index: number) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                padding: 15,
                borderBottomWidth: 1,
                borderColor: "#f4f3f3",
              }}
            >
              <Text
                style={{
                  paddingRight: 10,
                  fontFamily: Fonts.NunitoBold,
                }}
              >
                {index + 1}
              </Text>
              <View
                style={{
                  flex: 1,
                }}
              >
                <View>
                  <Text>{item.fullname}</Text>
                </View>
                <Text
                  style={{
                    fontFamily: Fonts.NunitoBold,
                    fontSize: 16,
                    textAlign: "right",
                  }}
                >
                  {moneyFormat(item.amount, "Rp. ")}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
});