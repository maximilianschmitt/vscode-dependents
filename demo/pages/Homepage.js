import React from "react";
import Button from "../components/Button";

export default function Homepage({ ...props }) {
  return (
    <div>
      <h1>Homepage</h1>

      <Button>Hello world!</Button>
    </div>
  );
}
