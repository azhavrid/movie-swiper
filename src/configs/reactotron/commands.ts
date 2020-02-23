import Reactotron from 'reactotron-react-native';

import { persistor } from '../../redux/store';
import NavigationService from '../../routes/NavigationService';
import { routeNames } from '../../routes/routeNames';

// Custom reactotron commands
Reactotron.onCustomCommand({
  command: 'Reset store',
  handler: async () => {
    await persistor.purge();
    NavigationService.navigate(routeNames.AuthStack);
  },
  description: 'Resets store and navigates to auth screen',
});
