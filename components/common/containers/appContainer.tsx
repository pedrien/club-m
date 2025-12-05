"use client";
import React, { JSX } from "react";
import Navbar from "@/components/layout/navbar/navbar";
import Footer from "@/components/layout/footer/footer";

/**
 * ViewApp component that wraps its children with several context providers.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the ViewApp.
 * @returns {JSX.Element} The rendered component with context providers.
 *
 * The component includes the following providers:
 * - ClientOnly: Ensures the children are only rendered on the client side.
 * - LoadingProvider: Provides loading state management.
 * - DrawerProvider: Manages the state of a drawer component.
 * - ModalProvider: Manages the state of modal components.
 *
 * Additionally, the component includes:
 * - A main container with specific styling classes.
 * - ToastMain: A component for displaying toast notifications.
 * - OverlayWaiting: A component for displaying an overlay while waiting.
 */

const AppContainer = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="global-div min-h-screen overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default AppContainer;
