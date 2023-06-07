"use client";

import React from "react";
import { getActorParts } from "@/lib/api";

export default function Page() {
  const [actor, setActor] = React.useState('DE');
  const [actorParts, setActorParts] = React.useState('');

  const loadActorParts = async () => {
    try { 
      const parts = await getActorParts(actor);
      const partsString = JSON.stringify(parts, null, 2);
      setActorParts(partsString);
    } catch(error: any) {
      setActorParts(error.message);
    }
  };

  return (
    <div className="m-8">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-center m-8">Actor model</h1>
      <div className="space-x-2">
        <label htmlFor="actor-input">
          Actor ID:
        </label>
        <input
          id="actor-input"
          className="text-black py-2 px-4 rounded"
          value={actor}
          onChange={(event) => setActor(event.target.value)}
        />
        <button onClick={loadActorParts} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Load Actor Parts
        </button>
      </div>
      <pre className="h-80 overflow-y-auto my-4 bg-slate-900">
        {actorParts}
      </pre>
    </div>
  );
}

