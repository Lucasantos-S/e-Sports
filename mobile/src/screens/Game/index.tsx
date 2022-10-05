import { SafeAreaView } from "react-native-safe-area-context";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { Background } from "../../components/Background";
import logoImg from "../../assets/logo-nlw-esports.png";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { useEffect, useState } from "react";

interface RouterParms {
  id: string;
  title: string;
  bannerUrl: string;
}

export function Game() {
  const [ads, setAds] = useState<DuoCardProps[]>([]);
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as RouterParms;

  function handleGoBack() {
    navigation.goBack();
  }
  useEffect(() => {
    fetch(`http://192.168.100.19:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setAds(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image style={styles.logo} source={logoImg} />
          <View style={styles.rigth} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle={"Conecte-se e comece a jogar!"} />
        <FlatList
          data={ads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
          style={styles.containerList}
          horizontal
          contentContainerStyle={styles.contendList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={{color:THEME.COLORS.TEXT}} >Não há anúncios publicados ainda para este jogo.</Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
