import { AppContent } from "@application/components/app-content";
import "@application/stylesheets/styles.css";
import { SafeArea, SafeAreaInsets } from "capacitor-plugin-safe-area";
import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root")!);
root.render(<AppContent />);

handleSafeArea();

function handleSafeArea() {
    const updateInsets = (area: SafeAreaInsets) => {
        for (const [key, value] of Object.entries(area.insets)) {
            document.documentElement.style.setProperty(`--safe-area-inset-${key}`, `${value}px`);
        }
    };
    SafeArea.getSafeAreaInsets()
        .then(area => updateInsets(area))
        .then(() => SafeArea.addListener("safeAreaChanged", updateInsets));
}
