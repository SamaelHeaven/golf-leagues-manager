import { BottomBar } from "@application/components/bottom-bar";
import { Router } from "@application/components/router";
import { TopBar } from "@application/components/top-bar";
import React from "react";

export function AppContent() {
    return (
        <main className="flex min-h-screen flex-col">
            <TopBar />
            <div className="flex-grow pl-[var(--safe-area-inset-left)] pr-[var(--safe-area-inset-right)]">
                <Router />
            </div>
            <BottomBar />
        </main>
    );
}
