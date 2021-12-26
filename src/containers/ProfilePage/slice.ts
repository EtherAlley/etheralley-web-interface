import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Contract } from '@ethersproject/contracts';
import { RootState } from '../../store';
import { ProfileConfig, ProfileMode } from '../../constants';

import EtherAlleyCoreV1ABI from '../../abi/EtherAlleyV1Core.json';
import ERC721ABI from '../../abi/ERC721.json';

export interface State {
  loading: boolean;
  error: boolean;
  profileMode: ProfileMode;
  profileConfig: ProfileConfig | undefined;
  currentNodeId: string | undefined;
}

const initialState: State = {
  loading: true,
  error: false,
  profileMode: ProfileMode.View,
  profileConfig: undefined,
  currentNodeId: undefined,
};

//TODO:
const contractAddress = '0xd50d3F16F89a3B0028Cb3069d9979d78Dc11435A';

export const loadProfile = createAsyncThunk<ProfileConfig, { library: any; address: string }, any>(
  'profile/load',
  async ({ library, address }) => {
    const nftContract = new Contract('0x699d0Efa91DB8Ba0128792B1231Ee8a478141491', ERC721ABI, library);
    const tokenURI = await nftContract.tokenURI(64);
    console.log(tokenURI);
    const response = await fetch(tokenURI, { method: 'GET' });
    const tokenInfo = await response.json();
    console.log(tokenInfo);
    return {
      elements: [
        {
          id: '1',
          type: 'NFTNode',
          data: {
            address: '0x699d0Efa91DB8Ba0128792B1231Ee8a478141491',
            type: 'ECR721',
            tokenId: 64,
            ...tokenInfo,
          },
          position: { x: 100, y: 100 },
        },
      ],
    };
    //   const etherAlleyContract = new Contract(contractAddress, EtherAlleyCoreV1ABI, library);
    //   const hash: string = await etherAlleyContract.getProfile(address);
    //   if (hash) {
    //     const response = await fetch(`https://ipfs.infura.io:5001/api/v0/cat?arg=${hash}`, {
    //       method: 'GET',
    //     });
    //     const data = await response.text();
    //     return JSON.parse(data);
    //   }
    //   return {
    //     elements: [
    //       {
    //         id: '1',
    //         type: 'NFTNode',
    //         data: {
    //           address: '0x699d0Efa91DB8Ba0128792B1231Ee8a478141491',
    //           type: 'ECR721',
    //           tokenId: 64,
    //         },
    //         position: { x: 100, y: 100 },
    //       },
    //     ],
    //   };
  }
);

export const saveProfile = createAsyncThunk<void, { library: any; account: string; profileConfig: ProfileConfig }, any>(
  'profile/save',
  async ({ library, account, profileConfig }) => {
    const contract = new Contract(contractAddress, EtherAlleyCoreV1ABI, library.getSigner(account).connectUnchecked());
    const formData = new FormData();
    formData.append('document', JSON.stringify(profileConfig));

    const response = await fetch(`https://ipfs.infura.io:5001/api/v0/add`, {
      method: 'POST',
      body: formData,
    });
    const { Hash } = await response.json();

    await contract.setProfile(Hash);
  }
);

export const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileMode: (state, action: PayloadAction<ProfileMode>) => {
      state.profileMode = action.payload;
    },
    setCurrentSelectedNode: (state, action: PayloadAction<string | undefined>) => {
      state.currentNodeId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProfile.pending, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(loadProfile.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.profileConfig = action.payload;
      })
      .addCase(saveProfile.fulfilled, (state, _) => {
        state.profileMode = ProfileMode.View;
      });
  },
});

export const { setProfileMode, setCurrentSelectedNode } = slice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default slice.reducer;
