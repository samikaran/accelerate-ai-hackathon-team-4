import React from "react";
import AIAssistant from "./ai-assistant";

interface PageWrapperProps {
  children: React.ReactNode;
  showAIAssistant?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  showAIAssistant = true,
}) => {
  return (
    <div>
      {children}
      {showAIAssistant && <AIAssistant />}
    </div>
  );
};

export default PageWrapper;
