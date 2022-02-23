import { StatisticTypes } from '../../common/constants';
import useAppSelector from '../../hooks/useAppSelector';
import { selectStatistic } from './slice';
import Swaps from './Swaps';

function Statistic({ index }: { index: number }) {
  const { type } = useAppSelector((state) => selectStatistic(state, index));
  switch (type) {
    case StatisticTypes.SWAP:
      return <Swaps index={index} />;
    default:
      return <></>;
  }
}

export default Statistic;
