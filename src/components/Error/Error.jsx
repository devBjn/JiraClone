import React from "react";

export default function Error({ error }) {
  return (
    <div className="p-2 text-center border border-red-600 rounded-lg">
      <h1 className="text-red-600 font-semibold">{error}</h1>
    </div>
  );
}
