'use client';

import React, { createContext, useContext, useState, SetStateAction, JSX } from 'react';
import { IPublicEvent } from '../models/event';

interface IEventContext {
  publicEvents: IPublicEvent[];
  setPublicEvents: React.Dispatch<SetStateAction<IPublicEvent[]>>;
}

const EventContext = createContext<IEventContext>({} as IEventContext);

export function EventProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [publicEvents, setPublicEvents] = useState<IPublicEvent[]>([]);

  return (
    <EventContext.Provider value={{ publicEvents, setPublicEvents }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent(): IEventContext {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }

  return context;
}
