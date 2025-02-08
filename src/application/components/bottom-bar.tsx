import React from "react";
import { Link, useLocation } from "wouter";

export function BottomBar() {
    const [location] = useLocation();
    const tabs = [
        { href: "/tab-1", label: "Tab 1" },
        { href: "/tab-2", label: "Tab 2" },
        { href: "/tab-3", label: "Tab 3" },
        { href: "/tab-4", label: "Tab 4" }
    ];

    return (
        <nav className="h-16">
            <div className="btm-nav">
                {tabs.map(tab => (
                    <Link
                        key={tab.href}
                        to={tab.href}
                        className={`bg-neutral text-neutral-content ${location === tab.href ? "active" : ""}`}>
                        {tab.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
