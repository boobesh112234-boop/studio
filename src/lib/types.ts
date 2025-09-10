export type RiskLevel = 'Safe' | 'Warning' | 'Disrupted';

export type NodeType = 'Port' | 'Warehouse' | 'Factory';

export type Node = {
  id: string;
  name: string;
  type: NodeType;
  position: { lat: number; lng: number };
  riskLevel: RiskLevel;
  details: string;
};

export type Route = {
  id: string;
  from: string;
  to: string;
  riskLevel: RiskLevel;
};

export type Kpi = {
  costImpact: number;
  delayImpact: number;
  carbonImpact: number;
};

export type Scenario = {
  id: string;
  name: string;
  description: string;
  effects: {
    nodes?: { id: string; newRiskLevel: RiskLevel }[];
    routes?: { id: string; newRiskLevel: RiskLevel }[];
    kpis: Kpi;
  };
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};
