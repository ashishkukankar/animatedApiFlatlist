import { faker } from "@faker-js/faker";
import { FlatList, Image, Text, View } from "react-native";

export default function HomeScreen() {
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

  return (
    <View>
      <FlatList
        data={apiData}
        keyExtractor={(keyId, index) => index + keyId}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                alignItems: "center",
                backgroundColor: "#ffffffcc",
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                borderRadius: 10,
              }}
            >
              <Image
                source={{ uri: item.avatar }}
                style={{ width: 50, height: 50, marginRight: 20 }}
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
            </View>
          );
        }}
      />
    </View>
  );
}
