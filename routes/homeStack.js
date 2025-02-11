import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from "../screens/home"
import login from "../screens/login"
import PlanoTreinoScreen from '../screens/PlanoTreinoScreen';
import PTScreen from '../screens/PTScreen';
import HistoricoFisicoScreen from '../screens/HistoricoFisicoScreen';
import InformacoesPessoaisScreen from '../screens/InformacoesPessoaisScreen';
import PlanoTreinoInfoScreen from '../screens/PlanoTreinoInfoScreen';
import MedidaClienteScreen from '../screens/MedidasClienteScreen';
import PasswordChange from '../screens/passwordChange';
import Compare from '../screens/Compare';

const navigator  =createStackNavigator({
  Compare:Compare,
  PasswordChange:PasswordChange,
  PlanoTreinoScreen:PlanoTreinoScreen,
  home:Home,
  login:login,
  PlanoTreinoInfoScreen:PlanoTreinoInfoScreen,
  PTScreen:PTScreen,
  HistoricoFisicoScreen:HistoricoFisicoScreen,
  InformacoesPessoaisScreen:InformacoesPessoaisScreen,
  MedidaClienteScreen:MedidaClienteScreen

  },
  {
    initialRouteName: "login",
    defaultNavigationOptions: {
      headerShown:false,
    },
  }
);

export default createAppContainer(navigator);