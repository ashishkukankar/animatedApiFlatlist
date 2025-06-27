import { faker } from "@faker-js/faker";
import { useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const AVATAR_SIZE = 50;
  const apiData = [...Array(20).keys()].map((index) => {
    return {
      keyId: faker.string.uuid(),
      userName: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.personPortrait(),
      jobDesc: faker.person.jobTitle(),
      jobTitle: faker.person.jobDescriptor(),
    };
  });

  const [data,setData] = useState(apiData)
  const scrollAtTop = useRef(new Animated.Value(0)).current;
  return (
    <View style={style.container}>
      <Animated.FlatList
        data={data}
        keyExtractor={(keyId, index) => index + keyId}
        contentContainerStyle={{ margin: 5 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollAtTop } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [-1, 0, 90 * index, 90 * (index + 1)];
          const scale = scrollAtTop.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
            extrapolate: "clamp",
          });

          // const opacity = scrollAtTop.interpolate({
          //   inputRange,
          //   outputRange: [1, 1, 1, 0],
          //   extrapolate: "clamp",
          // });
          return (
            <Animated.View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#ffffffcc",
                shadowColor: "#000000",
                margin: 5,
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                borderRadius: 10,
                transform: [{ scale }],
                
              }}
            >
              <Image
                source={{ uri: item.avatar }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  marginRight: 20,
                }}
              />
              <View>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  {item.userName}
                </Text>
                <Text style={{ fontSize: 18 }}>{item.jobTitle}</Text>
                <Text style={{ fontSize: 16, color: "orange" }}>
                  {item.email}
                </Text>
                <Text>{item.jobDesc}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2600000",
  },
});
