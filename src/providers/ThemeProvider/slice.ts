import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
  loadProfile,
  updateAccentColor,
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
      accent: string;
      shadow: string;
      primaryText: string;
      secondaryText: string;
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
      accent: '#36e2bc',
      shadow: '#000000',
      primaryText: '#F7F5F2',
      secondaryText: '#F7F5F2',
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
    builder.addCase(loadProfile.pending, (state) => {
      state.colors.profile = { ...initialState.colors.profile };
    });
    builder.addCase(loadProfile.fulfilled, (state, { payload }) => {
      if (payload.error || !payload.data || !payload.data.display_config || !payload.data.display_config.colors) {
        return;
      }
      state.colors.profile.primary = payload.data.display_config.colors.primary;
      state.colors.profile.secondary = payload.data.display_config.colors.secondary;
      state.colors.profile.accent = payload.data.display_config.colors.accent;
      state.colors.profile.shadow = payload.data.display_config.colors.shadow;
      state.colors.profile.primaryText = payload.data.display_config.colors.primary_text;
      state.colors.profile.secondaryText = payload.data.display_config.colors.secondary_text;
    });
    builder.addCase(loadProfile.rejected, (state) => {
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
    builder.addCase(updateAccentColor, (state, { payload }) => {
      state.colors.profile.accent = payload;
    });
  },
});

export const { setPrimaryColor } = slice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default slice.reducer;
