import assets from "app/assets/images/icon/assets";
import Fonts from "libs/assets/fonts";
import { View, Text } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { observer } from "mobx-react";
import { SvgCss } from "react-native-svg";
import React from "react";
import { moneyFormat } from "libs/utils/string-format";

const RenderItem = observer((props: any) => {
    const {data} = props;
    const pallete = {
      "status": {
        "cancelled": "#E7E7E7",
        "paid": "#E5F7FF",
        "submitted": "#FFE7C2",
        "complete": "#C8FFCA" 
      }
    }

    return(
        <View style={{
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 15,
          padding: 9,
          marginBottom: 4
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5
          }}>
            <Text style={{
              color: '#374151',
              fontWeight: '700',
              fontSize: 16
            }}>
              {data.sales_order_number}
            </Text>
            <Text style={{
              color: '#52525B',
              fontWeight: '700',
              fontSize: 16
            }}>
              {dateFormat(data.sales_order_date, "dd MMM yyyy HH:mm")}
            </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            marginBottom: 5
          }}>
            <SvgCss
              xml={assets.telephone}
              color={'#EAB308'}
            />
            <Text style={{
              marginLeft: 10,
              fontSize: 14,
              fontWeight: '400',
              color: '#71717A'
            }}>
              081225678
            </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            marginBottom: 5
          }}>
          <SvgCss
              xml={assets.money}
              color={'#EAB308'}
            />
            <Text style={{
              marginLeft: 10,
              fontSize: 14,
              fontWeight: '400',
              color: '#71717A'
            }}>
              Rp {moneyFormat(data.grand_total)}
            </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <View style={{
                flexDirection: 'row'
            }}>
            <SvgCss
              xml={assets.location}
            />
            <Text style={{
              marginLeft: 10,
              fontSize: 14,
              fontWeight: '400',
              color: '#71717A'
            }}>
              Surabaya
            </Text>
            </View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: pallete['status'][data.status] ?  pallete['status'][data.status] : '#CDFFCC',
                borderRadius: 2,
                paddingHorizontal: 3
            }}>
                <Text style={{
                    fontFamily: Fonts.poppins,
                    fontWeight: '700',
                    color: '#039900',
                    fontSize: 9
                }}>
                    {data.status}
                </Text>
            </View>
          </View>
        </View>
      )
  })

  export default RenderItem;