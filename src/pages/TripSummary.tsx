
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TripSummary: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Trip Summary</h1>
      <p className="mb-4">This page is under construction.</p>
      <Button onClick={() => navigate("/")}>Return to Trip Planner</Button>
    </div>
  );
};

export default TripSummary;
