"use client";

import { useState, useCallback } from 'react';
import type { Node, Route, Kpi, Scenario } from '@/lib/types';
import { initialNodes, initialRoutes, initialKpis, scenarios } from '@/lib/supply-chain-data';

export function useSupplyChain() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);
  const [kpis, setKpis] = useState<Kpi>(initialKpis);
  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0]);

  const triggerScenario = useCallback((scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    setActiveScenario(scenario);

    // Reset to initial state before applying new effects
    let newNodes = [...initialNodes];
    let newRoutes = [...initialRoutes];

    if (scenario.id !== 'no-disruption') {
      // Apply node effects
      if (scenario.effects.nodes) {
        newNodes = newNodes.map(node => {
          const effect = scenario.effects.nodes?.find(e => e.id === node.id);
          return effect ? { ...node, riskLevel: effect.newRiskLevel } : node;
        });
      }

      // Apply route effects
      if (scenario.effects.routes) {
        newRoutes = newRoutes.map(route => {
          const effect = scenario.effects.routes?.find(e => e.id === route.id);
          return effect ? { ...route, riskLevel: effect.newRiskLevel } : route;
        });
      }
    }

    setNodes(newNodes);
    setRoutes(newRoutes);
    setKpis(scenario.effects.kpis);
  }, []);

  return { nodes, routes, kpis, activeScenario, scenarios, triggerScenario };
}
