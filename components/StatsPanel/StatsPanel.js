import Panel from '@/components/Panel';
import Ranking from '@/components/Ranking';
// import styles from "./StatsPanel.module.scss"

const StatsPanel = () => (
  <Panel Title={() => 'Stats'}>
    <Ranking />
  </Panel>
);

export default StatsPanel;
