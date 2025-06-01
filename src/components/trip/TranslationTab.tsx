
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { TranslationTool } from "@/components/TranslationTool";

export const TranslationTab: React.FC = () => {
  return (
    <TabsContent value="translation">
      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Translation Tool</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <TranslationTool />
        </CardContent>
      </Card>
    </TabsContent>
  );
};
