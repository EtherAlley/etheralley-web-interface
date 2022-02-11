import { StatisticTypes } from '../../common/constants';
import useAppSelector from '../../hooks/useAppSelector';
import { selectStatistic } from './slice';
import Swaps from './Swaps';

function Statistic({ id }: { id: number }) {
  const { type } = useAppSelector((state) => selectStatistic(state, id));
  switch (type) {
    case StatisticTypes.SWAP:
      return <Swaps id={id} />;
    default:
      return <></>;
  }
}

export default Statistic;
