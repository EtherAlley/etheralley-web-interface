import { ReactFlowState } from 'react-flow-renderer';
import { ProfileConfig } from '../../constants';

/**
 * transform to something simple we can store
 */
export function fromRFStatetoProfileConfig(reactFlowState: ReactFlowState): ProfileConfig {
  const profileConfig: ProfileConfig = {
    elements: [],
  };
  for (const node of reactFlowState.nodes) {
    profileConfig.elements.push({
      id: node.id,
      type: node.type,
      data: node.data,
      position: node.__rf.position,
    });
  }
  return profileConfig;
}

/**
 * we cannot trust what we get back here. Must be strict and validate against bad actors
 * nfts they dont own?
 * random garbage config that is malicious?
 * etc
 */
export function fromIPFSToProfileConfig(data: string): ProfileConfig {
  // return defaultConfig();
  return JSON.parse(data);
}

/**
 * likely will need to be async. would try to fetch nfts from places like opensea
 */
export function defaultConfig(): ProfileConfig {
  return {
    elements: [
      {
        id: '1',
        type: 'NFTNode',
        data: {
          label: 'CryptoPunk #4864',
          url: 'https://lh3.googleusercontent.com/uoacDiwNUOmRsgJPDW0Emc4qoJqrLKWX9zl_U_A75vRXCpplSS-K2w2aHyBhY6cvHe0I_RUVYjWEUWKg8FQOC5B9FQ=w286',
        },
        position: { x: 100, y: 100 },
      },
      {
        id: '2',
        type: 'NFTNode',
        data: {
          label: 'CloneX #1396',
          url: 'https://lh3.googleusercontent.com/2wDQFC141NSR1i2FlWdcvTYeGYxAUym478EL2CiguFS5auJUg93PLKL8xnyncwy1Vbe9-PGEHWy_881WKweJMKL8uaWlTzF3AOeiIQ=w286',
        },
        position: { x: 500, y: 500 },
      },
    ],
  };
}
