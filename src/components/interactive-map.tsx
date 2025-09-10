'use client';

import React, { useState } from 'react';
import { Map, AdvancedMarker, InfoWindow, Polyline } from '@vis.gl/react-google-maps';
import type { Node, Route } from '@/lib/types';
import { cn } from '@/lib/utils';

type InteractiveMapProps = {
  nodes: Node[];
  routes: Route[];
};

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

const riskColorMap = {
  Safe: 'hsl(var(--primary))',
  Warning: '#facc15', // yellow-400
  Disrupted: '#f87171', // red-400
};

export default function InteractiveMap({ nodes, routes }: InteractiveMapProps) {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const routePaths = routes.map(route => {
    const fromNode = nodes.find(n => n.id === route.from);
    const toNode = nodes.find(n => n.id === route.to);
    if (!fromNode || !toNode) return null;
    return {
      path: [fromNode.position, toNode.position],
      riskLevel: route.riskLevel,
    };
  }).filter(Boolean);

  return (
    <Map
      defaultCenter={{ lat: 30, lng: 50 }}
      defaultZoom={2}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      mapId="resilient-chain-map"
      styles={mapStyles}
    >
      {nodes.map(node => (
        <AdvancedMarker
          key={node.id}
          position={node.position}
          onClick={() => setSelectedNode(node)}
        >
          <div className="relative">
            <div className={cn(
                "w-4 h-4 rounded-full border-2 border-background",
                {
                  'bg-primary': node.riskLevel === 'Safe',
                  'bg-yellow-400': node.riskLevel === 'Warning',
                  'bg-red-400': node.riskLevel === 'Disrupted'
                }
            )} />
            {node.riskLevel !== 'Safe' && (
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full animate-ping",
                    {
                      'bg-yellow-400/50': node.riskLevel === 'Warning',
                      'bg-red-400/50': node.riskLevel === 'Disrupted'
                    }
                )} />
            )}
          </div>
        </AdvancedMarker>
      ))}

      {selectedNode && (
        <InfoWindow
          position={selectedNode.position}
          onCloseClick={() => setSelectedNode(null)}
        >
          <div className="p-2 text-foreground bg-background/80 rounded-lg">
            <h3 className="font-bold">{selectedNode.name}</h3>
            <p>Type: {selectedNode.type}</p>
            <p>Risk: <span className={cn({
              'text-primary': selectedNode.riskLevel === 'Safe',
              'text-yellow-400': selectedNode.riskLevel === 'Warning',
              'text-red-400': selectedNode.riskLevel === 'Disrupted',
            })}>{selectedNode.riskLevel}</span></p>
            <p className="text-sm text-muted-foreground">{selectedNode.details}</p>
          </div>
        </InfoWindow>
      )}

      {routePaths.map((route, index) => route && (
        <Polyline
          key={index}
          path={route.path}
          strokeColor={riskColorMap[route.riskLevel]}
          strokeOpacity={route.riskLevel === 'Safe' ? 0.5 : 1}
          strokeWeight={route.riskLevel === 'Safe' ? 2 : 3}
        />
      ))}
    </Map>
  );
}
