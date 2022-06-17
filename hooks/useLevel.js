import useData from './useData';

const useLevel = () => {
  const { data } = useData();

  const temp = data?.current?.temp || 0;
  const [minTemp, maxTemp] = data?.stats?.temprange || [0, 0];

  const level = (temp - minTemp) / (maxTemp - minTemp);

  return level;
};

export default useLevel;
