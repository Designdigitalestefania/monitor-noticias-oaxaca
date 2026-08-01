"use client";
import { Card } from '@/components/ui/Card';

interface Agent {
  name: string;
  file: string;
  status: 'active' | 'inactive';
  lastActivity?: string;
}

interface AgentStatusProps {
  agents: Agent[];
}

export function AgentStatus({ agents }: AgentStatusProps) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Agentes IA</h3>
      <div className="space-y-3">
        {agents.map((agent) => (
          <div key={agent.file} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />
              <div>
                <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                <p className="text-xs text-gray-500">{agent.file}</p>
              </div>
            </div>
            {agent.lastActivity && (
              <span className="text-xs text-gray-400">{agent.lastActivity}</span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
