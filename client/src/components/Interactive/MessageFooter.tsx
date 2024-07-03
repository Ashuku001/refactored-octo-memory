import React from "react";
import { Header } from "./SubComponents";
type MessageFooterProps = {
  children: React.ReactNode
}
export const MessageFooter: React.FC<MessageFooterProps> = ({children}) => {
  return (
    <div className="p-1">
        <Header variant="optional" title="Footer" description="Add a short text e.g., company name for the bottom of your message" />
        <div className="mt-3">
          {children}
        </div>
    </div>
  )
};

