import * as React from "react";

export default function({ children }) {
  return (
    <div>
      <h1>Page Header</h1>
      {children}
    </div>
  );
}
