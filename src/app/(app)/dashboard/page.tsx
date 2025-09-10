'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import { useSupplyChain } from '@/hooks/use-supply-chain';
import InteractiveMap from '@/components/interactive-map';
import KpiCard from '@/components/kpi-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Truck, Zap } from 'lucide-react';

export default function DashboardPage() {
  const { nodes, routes, kpis, activeScenario, scenarios, triggerScenario } = useSupplyChain();

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Live Supply Chain Map</h1>
          <p className="text-muted-foreground">Visualize your supply chain and simulate disruptions.</p>
        </div>
        <div className="w-full md:w-auto">
          <Select onValueChange={triggerScenario} value={activeScenario.id}>
            <SelectTrigger className="w-full md:w-[280px]">
              <SelectValue placeholder="Select a disruption scenario" />
            </SelectTrigger>
            <SelectContent>
              {scenarios.map(scenario => (
                <SelectItem key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard title="Cost Impact" value={`₹${kpis.costImpact} Cr`} icon={DollarSign} />
        <KpiCard title="Delay Impact" value={`${kpis.delayImpact} Days`} icon={Truck} />
        <KpiCard title="Carbon Impact" value={`${kpis.carbonImpact} kT`} icon={Zap} />
      </div>

      <Card className="flex-1 h-[500px] md:h-auto">
        <CardContent className="p-0 h-full">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <InteractiveMap nodes={nodes} routes={routes} />
          </APIProvider>
        </CardContent>
      </Card>
    </div>
  );
}
