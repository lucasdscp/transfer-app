import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from './src/screens/Home';
import SendMoney from './src/screens/SendMoney';
import History from './src/screens/History';

const App = createStackNavigator(
    {
      Home: Home,
      SendMoney: SendMoney,
      History: History
    },
    {
      initialRouteName: 'Home',
      headerMode: 'none'
    }
);


export default createAppContainer(App);