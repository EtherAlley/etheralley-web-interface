import { Box, Image, ImageProps } from '@chakra-ui/react';
import { Blockchains, Interfaces } from '../../common/constants';
import Settings from '../../common/settings';
import tokens from '../../hooks/tokens';
import Coin from '../../icons/Coin';

// resolve the logo based on the given inputs
function Logo({
  contractAddress,
  blockchain,
  interfaceName,
  width,
  height,
}: {
  contractAddress?: string;
  blockchain?: Blockchains;
  interfaceName?: Interfaces;
  width?: string | number;
  height?: string | number;
}): JSX.Element {
  if (contractAddress && blockchain) {
    return <Token contractAddress={contractAddress} blockchain={blockchain} width={width} height={height} />;
  } else if (blockchain && !contractAddress) {
    return <Blockchain blockchain={blockchain} width={width} height={height} />;
  } else if (interfaceName) {
    return <Interface interfaceName={interfaceName} width={width} height={height} />;
  }

  return <></>;
}

function buildUrl(urlSuffix: string | undefined): string | undefined {
  if (!urlSuffix) {
    return undefined;
  }

  return `${Settings.PUBLIC_URL}/${urlSuffix}`;
}

function Token({
  contractAddress,
  blockchain,
  width = 85,
  height = 85,
}: {
  contractAddress: string;
  blockchain: Blockchains;
  width?: string | number;
  height?: string | number;
}): JSX.Element {
  const tokenContracts = tokens[blockchain];

  if (!tokenContracts || !tokenContracts.find((x) => x.id.toLowerCase() === contractAddress.toLowerCase())) {
    return (
      <Box width={width} height={height}>
        <Coin />
      </Box>
    );
  }

  return (
    <Image
      src={`https://raw.githubusercontent.com/EtherAlley/assets/master/tokens/${blockchain}/${contractAddress}.png`}
      width={width}
      height={height}
      borderRadius="50%"
    />
  );
}

function Interface({
  interfaceName,
  width = 85,
  height = 85,
}: {
  interfaceName: Interfaces;
  width?: string | number;
  height?: string | number;
}): JSX.Element {
  let styling: ImageProps = { p: 2, backgroundColor: 'gray.900' };
  let fileName: string | undefined;
  switch (interfaceName) {
    case Interfaces.SUSHISWAP_EXCHANGE:
      fileName = `sushiswap.svg`;
      break;
    case Interfaces.UNISWAP_V2_EXCHANGE:
    case Interfaces.UNISWAP_V3_EXCHANGE:
      fileName = `uniswap.svg`;
      break;
    case Interfaces.ROCKET_POOL:
      fileName = `rocketpool.png`;
      styling = {};
      break;
  }

  return (
    <Image
      src={buildUrl(`logos/${fileName}`)}
      alt={interfaceName}
      width={width}
      height={height}
      borderRadius="50%"
      {...styling}
    />
  );
}

function Blockchain({
  blockchain,
  width = 85,
  height = 85,
}: {
  blockchain: Blockchains;
  width?: string | number;
  height?: string | number;
}): JSX.Element {
  let styling: ImageProps = { p: 2, backgroundColor: 'gray.900' };
  let fileName: string | undefined;
  switch (blockchain) {
    case Blockchains.ETHEREUM:
    case Blockchains.OPTIMISM:
    case Blockchains.ARBITRUM:
      fileName = `ethereum.svg`;
      break;
    case Blockchains.POLYGON:
      fileName = `polygon.svg`;
      break;
  }

  return (
    <Image
      src={buildUrl(`logos/${fileName}`)}
      alt={blockchain}
      width={width}
      height={height}
      borderRadius="50%"
      {...styling}
    />
  );
}

export default Logo;
