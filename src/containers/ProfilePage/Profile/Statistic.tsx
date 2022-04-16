import { StatisticTypes } from '../../../common/constants';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectStatistic } from './../slice';
import StakeRewards from './StakeRewards';
import Swaps from './Swaps';

function Statistic({ index }: { index: number }) {
  const { type } = useAppSelector((state) => selectStatistic(state, index));

  switch (type) {
    case StatisticTypes.SWAP:
      return <Swaps index={index} />;
    case StatisticTypes.STAKE:
      return <StakeRewards index={index} />;
    default:
      return <></>;
  }
}

export default Statistic;
