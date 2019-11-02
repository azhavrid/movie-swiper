import Reactotron from 'reactotron-react-native';
import { persistor } from '../../redux/store';
import { routeNames } from '../../routes/routeNames';
import NavigationService from '../../routes/NavigationService';

// Custom reactotron commands
Reactotron.onCustomCommand({
  command: 'Reset store',
  handler: async () => {
    await persistor.purge();
    NavigationService.navigate(routeNames.AuthStack);
  },
  description: 'Resets store and navigates to auth screen',
});
