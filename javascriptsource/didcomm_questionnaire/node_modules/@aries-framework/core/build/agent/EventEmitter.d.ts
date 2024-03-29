import type { BaseEvent } from './Events';
import type { AgentContext } from './context';
import { Subject } from 'rxjs';
import { AgentDependencies } from './AgentDependencies';
type EmitEvent<T extends BaseEvent> = Omit<T, 'metadata'>;
export declare class EventEmitter {
    private eventEmitter;
    private stop$;
    constructor(agentDependencies: AgentDependencies, stop$: Subject<boolean>);
    emit<T extends BaseEvent>(agentContext: AgentContext, data: EmitEvent<T>): void;
    on<T extends BaseEvent>(event: T['type'], listener: (data: T) => void | Promise<void>): void;
    off<T extends BaseEvent>(event: T['type'], listener: (data: T) => void | Promise<void>): void;
    observable<T extends BaseEvent>(event: T['type']): import("rxjs").Observable<T>;
}
export {};
