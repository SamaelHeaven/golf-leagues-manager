import { BottomBar } from "@application/components/bottom-bar";
import { Router } from "@application/components/router";
import { TopBar } from "@application/components/top-bar";
import React from "react";

export function AppContent() {
    return (
        <main className="flex min-h-screen flex-col">
            <TopBar />
            <div className="flex-grow">
                <Router />
            </div>
            <BottomBar />
        </main>
    );
}
