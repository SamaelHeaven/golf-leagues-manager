import React from "react";

export function TopBar() {
    return (
        <section className="pl-[var(--safe-area-inset-left)] pr-[var(--safe-area-inset-right)] pt-[var(--safe-area-inset-top)]">
            <div className="p-3">
                <div className="navbar rounded-box bg-neutral text-neutral-content shadow-lg">
                    <span className="p-3 text-xl font-bold">Golf Leagues</span>
                </div>
            </div>
        </section>
    );
}
