'use client';

import React, { useEffect, useState } from 'react';

/** Where the work is happening right now, and what time it is there. */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/New_York',
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="local-time">Ithaca, NY{time ? ` · ${time}` : ''}</span>
  );
}
