
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export const TranslationTab: React.FC = () => {
  return (
    <TabsContent value="translation">
      <Card>
        <CardHeader>
          <CardTitle>Translation Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Translation features coming soon...</p>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
