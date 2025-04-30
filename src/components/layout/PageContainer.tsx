
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <main className={`pt-20 min-h-screen ${className}`}>
      {children}
    </main>
  );
};

export default PageContainer;
