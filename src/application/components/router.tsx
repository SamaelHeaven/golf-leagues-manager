import { NotFoundScreen } from "@application/screens/not-found-screen";
import { Tab1Screen } from "@application/screens/tab-1-screen";
import { Tab2Screen } from "@application/screens/tab-2-screen";
import { Tab3Screen } from "@application/screens/tab-3-screen";
import { Tab4Screen } from "@application/screens/tab-4-screen";
import React from "react";
import { Redirect, Route, Switch } from "wouter";

export function Router() {
    return (
        <>
            <Switch>
                <Route path="/" component={() => <Redirect to="/tab-1" />} />
                <Route path="/tab-1" component={Tab1Screen} />
                <Route path="/tab-2" component={Tab2Screen} />
                <Route path="/tab-3" component={Tab3Screen} />
                <Route path="/tab-4" component={Tab4Screen} />
                <Route component={NotFoundScreen} />
            </Switch>
        </>
    );
}
