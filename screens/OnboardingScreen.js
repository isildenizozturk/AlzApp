import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {
    return(
<Onboarding onDone={() => navigation.navigate("Login")}
            onSkip={() => navigation.navigate("Login")}
pages={[
    {
      backgroundColor: '#f2f2f2',
      title: "AlzApp'e Hoşgeldiniz",
      subtitle: 'Bu uygulama sizi ve sevdiklerinizi korumak, sizleri mutlu etmek için tasarlanmış bir sağlık uygulamasıdır.',
      image: <Image style={styles.imageContainerStyles} source={require('../assets/1.jpeg')} />,
    },
    {
      backgroundColor: '#feeafa',
      image: <Image style={styles.imageContainerStyles1} source={require('../assets/Beyin.png')} />,
      subtitle: 'İçeride zihin sağlığınızı korumak için günlük antrenmanlar, hatırlatmalar ve işinize yarayacak bir sürü özellik mevcuttur.',
    },
    {
      backgroundColor: '#dee2ff',
      image: <Image style={styles.imageContainerStyles2} source={require('../assets/Beyin.png')} />,
      title: 'Giriş yapın veya Üyelik Oluşturun',
      subtitle: "Bir üyeliğiniz yoksa hemen üyelik oluşturun ve başlayalım!",
    },
  ]}
  />
    )
    
}
export default OnboardingScreen

const styles = StyleSheet.create({
  imageContainerStyles:{

    width:400,
    height:400,
    
  },
  imageContainerStyles1:{
    
    width:400,
    height:400,
    
    
  },
  imageContainerStyles2:{

    width:400,
    height:400,
    
  }
});
