import { AppContent } from "@application/components/app-content";
import "@application/stylesheets/styles.css";
import { SafeArea } from "capacitor-plugin-safe-area";
import React from "react";
import { createRoot } from "react-dom/client";

(async () => {
    await SafeArea.addListener("safeAreaChanged", data => {
        const { insets } = data;
        for (const [key, value] of Object.entries(insets)) {
            document.documentElement.style.setProperty(`--safe-area-inset-${key}`, `${value}px`);
        }
    });

    const root = createRoot(document.getElementById("root")!);
    root.render(<AppContent />);
})();
