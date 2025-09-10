import type { Node, Route, Kpi, Scenario } from './types';

export const initialNodes: Node[] = [
  { id: 'mumbai_port', name: 'Port of Mumbai', type: 'Port', position: { lat: 18.9647, lng: 72.8258 }, riskLevel: 'Safe', details: 'One of the largest ports in India.' },
  { id: 'chennai_port', name: 'Port of Chennai', type: 'Port', position: { lat: 13.0827, lng: 80.2707 }, riskLevel: 'Safe', details: 'Major gateway port for southern India.' },
  { id: 'mundra_port', name: 'Port of Mundra', type: 'Port', position: { lat: 22.8465, lng: 69.7251 }, riskLevel: 'Safe', details: 'India\'s largest private port.' },
  { id: 'bengaluru_factory', name: 'Bengaluru Factory', type: 'Factory', position: { lat: 12.9716, lng: 77.5946 }, riskLevel: 'Safe', details: 'Technology and manufacturing hub.' },
  { id: 'delhi_wh', name: 'Delhi Warehouse', type: 'Warehouse', position: { lat: 28.7041, lng: 77.1025 }, riskLevel: 'Safe', details: 'Key distribution center for Northern India.' },
  { id: 'kolkata_wh', name: 'Kolkata Warehouse', type: 'Warehouse', position: { lat: 22.5726, lng: 88.3639 }, riskLevel: 'Safe', details: 'Logistics hub for Eastern India.' },
];

export const initialRoutes: Route[] = [
  { id: 'bengaluru-chennai', from: 'bengaluru_factory', to: 'chennai_port', riskLevel: 'Safe' },
  { id: 'chennai-mumbai', from: 'chennai_port', to: 'mumbai_port', riskLevel: 'Safe' },
  { id: 'mumbai-delhi', from: 'mumbai_port', to: 'delhi_wh', riskLevel: 'Safe' },
  { id: 'chennai-kolkata', from: 'chennai_port', to: 'kolkata_wh', riskLevel: 'Safe' },
  { id: 'mumbai-mundra', from: 'mumbai_port', to: 'mundra_port', riskLevel: 'Safe' },
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
    id: 'port-strike-mumbai',
    name: 'Port Strike in Mumbai',
    description: 'A labor strike has halted operations at the Port of Mumbai.',
    effects: {
      nodes: [{ id: 'mumbai_port', newRiskLevel: 'Disrupted' }],
      routes: [{ id: 'chennai-mumbai', newRiskLevel: 'Warning' }, { id: 'mumbai-delhi', newRiskLevel: 'Disrupted' }],
      kpis: { costImpact: 9, delayImpact: 7, carbonImpact: 0.3 },
    },
  },
  {
    id: 'factory-fire-bengaluru',
    name: 'Factory Fire in Bengaluru',
    description: 'A major fire has stopped production at the Bengaluru factory.',
    effects: {
      nodes: [{ id: 'bengaluru_factory', newRiskLevel: 'Disrupted' }],
      routes: [{id: 'bengaluru-chennai', newRiskLevel: 'Disrupted'}],
      kpis: { costImpact: 18, delayImpact: 14, carbonImpact: 0.1 },
    },
  },
  {
    id: 'shipping-congestion-chennai',
    name: 'Shipping Congestion at Chennai',
    description: 'Monsoon season is causing significant delays at the Port of Chennai.',
    effects: {
      nodes: [{ id: 'chennai_port', newRiskLevel: 'Warning' }],
      routes: [{ id: 'bengaluru-chennai', newRiskLevel: 'Warning' }, { id: 'chennai-mumbai', newRiskLevel: 'Warning' }],
      kpis: { costImpact: 6, delayImpact: 4, carbonImpact: 0.5 },
    }
  }
];
