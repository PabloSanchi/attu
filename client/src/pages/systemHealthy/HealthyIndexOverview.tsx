import { makeStyles, Theme } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import {
  CHART_WIDTH,
  LINE_CHART_LARGE_HEIGHT,
  MAIN_VIEW_WIDTH,
  TOPO_HEIGHT,
} from './consts';
import HealthyIndexDetailView from './HealthyIndexDetailView';
import HealthyIndexLegend from './HealthyIndexLegend';
import HealthyIndexRow from './HealthyIndexRow';
import LineChartLarge from './LineChartLarge';
import ThresholdSetting from './ThresholdSetting';
import TimeRangeTabs from './TimeRangeTabs';
import {
  ENodeService,
  ILineChartData,
  INodeTreeStructure,
  IThreshold,
  ITimeRangeOption,
} from './Types';
// import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

// export const CHART_LABEL_WIDTH = 70;

const getStyles = makeStyles((theme: Theme) => ({
  root: {
    width: `${MAIN_VIEW_WIDTH}px`,
    height: `${TOPO_HEIGHT}px`,
    overflow: 'auto',
    padding: '16px 56px 16px 24px',
    // boxShadow: '0 0 5px #ccc',
    fontSize: '14px',
  },
  headerContent: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
  },
  titleContainer: {},
  title: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  titleMain: { fontSize: '18px', fontWeight: 500 },
  titleExt: { fontSize: '18px', fontWeight: 500, marginLeft: '8px' },
  timeRangeTabs: {
    fontSize: '12px',
  },
  legendContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  settingIcon: { marginLeft: '16px', display: 'flex', alignItems: 'flex-end' },

  chartView: { width: '100%', marginTop: '30px' },
  chartItem: {
    margin: '24px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  chartLabel: {
    width: `50px`,
    fontWeight: 500,
    color: '#444',
  },
  chart: {
    height: `${LINE_CHART_LARGE_HEIGHT}px`,
    width: `${CHART_WIDTH}px`,

    // border: '1px solid brown',
  },
}));

const HealthyIndexOverview = ({
  selectedNode,
  lineChartsData,
  threshold,
  setThreshold,
  timeRange,
  setTimeRange,
}: {
  selectedNode: INodeTreeStructure;
  lineChartsData: ILineChartData[];
  threshold: IThreshold;
  setThreshold: Dispatch<SetStateAction<IThreshold>>;
  timeRange: ITimeRangeOption;
  setTimeRange: Dispatch<SetStateAction<ITimeRangeOption>>;
}) => {
  const classes = getStyles();
  return (
    <div className={classes.root}>
      <div className={classes.headerContent}>
        <div className={classes.titleContainer}>
          <div className={classes.title}>
            <div className={classes.titleMain}>Healthy Status</div>
            {selectedNode.service !== ENodeService.milvus && (
              <div className={classes.titleExt}>
                {`> ${selectedNode.service}`}
              </div>
            )}
          </div>
          <div className={classes.timeRangeTabs}>
            <TimeRangeTabs timeRange={timeRange} setTimeRange={setTimeRange} />
          </div>
        </div>
        <div className={classes.legendContainer}>
          <HealthyIndexLegend />
          <div className={classes.settingIcon}>
            <ThresholdSetting
              threshold={threshold}
              setThreshold={setThreshold}
            />
          </div>
        </div>
      </div>
      <HealthyIndexDetailView nodeTree={selectedNode} />
      {selectedNode.service === ENodeService.milvus && (
        <div className={classes.chartView}>
          <div className={classes.title}>Search Query History</div>
          {lineChartsData.map(chartData => (
            <div className={classes.chartItem}>
              <div className={classes.chartLabel}>{chartData.label}</div>
              <div className={classes.chart}>
                <LineChartLarge
                  data={chartData.data}
                  format={chartData.format}
                  unit={chartData.unit}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthyIndexOverview;
