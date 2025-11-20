import { View, Text, TouchableOpacity } from "react-native";
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather } from "@expo/vector-icons";

import {styles} from "./styles"

type IconProps = {
    color?: string;
    size?: number
}

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {

    const icons: Record<string, (props: IconProps) => JSX.Element> = {
        crismandos: (props) => <Feather name="users" size={26} color={grayColor} {...props}/>,
        grupos: (props) => <Feather name="folder" size={26} color={grayColor} {...props}/>,
        perfil: (props) => <Feather name="user" size={26} color={grayColor} {...props}/>
    }

    const primaryColor = "#E12525"
    const grayColor = '#737373'
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : typeof options.title === 'string'
              ? options.title
              : route.name;
            
 
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabbarItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >{
            icons[route.name]({
                color: isFocused ? primaryColor : grayColor
            })
          }
            <Text style={{ color: isFocused ? primaryColor : grayColor }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default MyTabBar;
