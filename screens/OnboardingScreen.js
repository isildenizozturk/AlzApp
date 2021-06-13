import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {
    return(
<Onboarding onDone={() => navigation.navigate("Login")}
            onSkip={() => navigation.navigate("Login")}
pages={[
    {
      backgroundColor: '#fff',
      title: "AlzApp'e Hoşgeldiniz",
      subtitle: 'Bu uygulama sizi ve sevdiklerinizi korumak, sizleri mutlu etmek için tasarlanmış bir sağlık uygulamasıdır.',
    },
    {
      backgroundColor: '#fe6e58',
      subtitle: 'İçeride zihin sağlığınızı korumak için günlük antrenmanlar, hatırlatmalar ve işinize yarayacak bir sürü özellik mevcuttur.',
    },
    {
      backgroundColor: '#999',
      title: 'Giriş yapın veya Üyelik Oluşturun',
      subtitle: "Bir üyeliğiniz yoksa hemen üyelik oluşturun ve başlayalım!",
    },
  ]}
  />
    )
    
}
export default OnboardingScreen