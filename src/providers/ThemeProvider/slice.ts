import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
  loadProfile,
  updatePrimaryColor,
  updatePrimaryTextColor,
  updateSecondaryColor,
  updateSecondaryTextColor,
} from '../../containers/ProfilePage/slice';

export interface State {
  config: {
    initialColorMode: string;
    useSystemColorMode: boolean;
  };
  styles: {
    global: {
      body: {
        bg: string;
      };
    };
  };
  colors: {
    brand: {
      [x: number]: string;
    };
    gray: {
      [x: number]: string;
    };
    profile: {
      primary: string;
      secondary: string;
      primaryText: string;
      secondaryText: string;
    };
    polygon: {
      [x: number]: string;
    };
    arbitrum: {
      [x: number]: string;
    };
    optimism: {
      [x: number]: string;
    };
    ethereum: {
      [x: number]: string;
    };
  };
}

const initialState: State = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
      },
    },
  },
  colors: {
    brand: {
      50: '#dcfff6',
      100: '#b5f6e9',
      200: '#8cf0da',
      300: '#60e9cb',
      400: '#36e2bc',
      500: '#1dc9a2',
      600: '#0f9c7e',
      700: '#026f5a',
      800: '#004435',
      900: '#001811',
    },
    gray: {
      700: '#262626',
      800: '#1a1a1b',
      900: '#121212',
    },
    profile: {
      primary: '#121212',
      secondary: '#1a1a1b',
      primaryText: '#FFF',
      secondaryText: '#FFF',
    },
    polygon: {
      200: '#8247e5',
    },
    arbitrum: {
      200: '#3182CE',
    },
    optimism: {
      200: '#E53E3E',
    },
    ethereum: {
      200: '#ecf0f1',
    },
  },
};

export const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.colors.profile.primary = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProfile.fulfilled, (state, { payload }) => {
      if (!payload.display_config || !payload.display_config.colors) {
        return;
      }
      state.colors.profile.primary = payload.display_config.colors.primary;
      state.colors.profile.secondary = payload.display_config.colors.secondary;
      state.colors.profile.primaryText = payload.display_config.colors.primary_text;
      state.colors.profile.secondaryText = payload.display_config.colors.secondary_text;
    });
    builder.addCase(loadProfile.pending, (state) => {
      state.colors.profile = { ...initialState.colors.profile };
    });
    builder.addCase(updatePrimaryColor, (state, { payload }) => {
      state.colors.profile.primary = payload;
    });
    builder.addCase(updateSecondaryColor, (state, { payload }) => {
      state.colors.profile.secondary = payload;
    });
    builder.addCase(updatePrimaryTextColor, (state, { payload }) => {
      state.colors.profile.primaryText = payload;
    });
    builder.addCase(updateSecondaryTextColor, (state, { payload }) => {
      state.colors.profile.secondaryText = payload;
    });
  },
});

export const { setPrimaryColor } = slice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default slice.reducer;
