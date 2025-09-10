import type { Node, Route, Kpi, Scenario } from './types';

export const initialNodes: Node[] = [
  { id: 'shanghai', name: 'Port of Shanghai', type: 'Port', position: { lat: 31.2304, lng: 121.4737 }, riskLevel: 'Safe', details: 'Busiest container port in the world.' },
  { id: 'la', name: 'Port of Los Angeles', type: 'Port', position: { lat: 33.7292, lng: -118.2620 }, riskLevel: 'Safe', details: 'Major gateway for trade with Asia.' },
  { id: 'rotterdam', name: 'Port of Rotterdam', type: 'Port', position: { lat: 51.9225, lng: 4.47917 }, riskLevel: 'Safe', details: 'Largest port in Europe.' },
  { id: 'shenzhen', name: 'Shenzhen Factory', type: 'Factory', position: { lat: 22.5431, lng: 114.0579 }, riskLevel: 'Safe', details: 'Electronics manufacturing hub.' },
  { id: 'chicago_wh', name: 'Chicago Warehouse', type: 'Warehouse', position: { lat: 41.8781, lng: -87.6298 }, riskLevel: 'Safe', details: 'Central US distribution center.' },
  { id: 'hamburg_wh', name: 'Hamburg Warehouse', type: 'Warehouse', position: { lat: 53.5511, lng: 9.9937 }, riskLevel: 'Safe', details: 'Northern Europe logistics hub.' },
];

export const initialRoutes: Route[] = [
  { id: 'shanghai-la', from: 'shanghai', to: 'la', riskLevel: 'Safe' },
  { id: 'shenzhen-shanghai', from: 'shenzhen', to: 'shanghai', riskLevel: 'Safe' },
  { id: 'la-chicago_wh', from: 'la', to: 'chicago_wh', riskLevel: 'Safe' },
  { id: 'shanghai-rotterdam', from: 'shanghai', to: 'rotterdam', riskLevel: 'Safe' },
  { id: 'rotterdam-hamburg_wh', from: 'rotterdam', to: 'hamburg_wh', riskLevel: 'Safe' },
];

export const initialKpis: Kpi = {
  costImpact: 0,
  delayImpact: 0,
  carbonImpact: 0,
};

export const scenarios: Scenario[] = [
  {
    id: 'no-disruption',
    name: 'No Disruption',
    description: 'All systems operating normally.',
    effects: {
      kpis: { costImpact: 0, delayImpact: 0, carbonImpact: 0 },
    },
  },
  {
    id: 'port-strike-la',
    name: 'Port Strike in Los Angeles',
    description: 'A labor strike has halted operations at the Port of Los Angeles.',
    effects: {
      nodes: [{ id: 'la', newRiskLevel: 'Disrupted' }],
      routes: [{ id: 'shanghai-la', newRiskLevel: 'Warning' }, { id: 'la-chicago_wh', newRiskLevel: 'Disrupted' }],
      kpis: { costImpact: 1.2, delayImpact: 7, carbonImpact: 0.3 },
    },
  },
  {
    id: 'factory-fire-shenzhen',
    name: 'Factory Fire in Shenzhen',
    description: 'A major fire has stopped production at the Shenzhen electronics factory.',
    effects: {
      nodes: [{ id: 'shenzhen', newRiskLevel: 'Disrupted' }],
      routes: [{id: 'shenzhen-shanghai', newRiskLevel: 'Disrupted'}],
      kpis: { costImpact: 2.5, delayImpact: 14, carbonImpact: 0.1 },
    },
  },
  {
    id: 'shipping-congestion-shanghai',
    name: 'Shipping Congestion at Shanghai',
    description: 'Unprecedented container volume is causing significant delays at the Port of Shanghai.',
    effects: {
      nodes: [{ id: 'shanghai', newRiskLevel: 'Warning' }],
      routes: [{ id: 'shanghai-la', newRiskLevel: 'Warning' }, { id: 'shanghai-rotterdam', newRiskLevel: 'Warning' }],
      kpis: { costImpact: 0.8, delayImpact: 4, carbonImpact: 0.5 },
    }
  }
];
