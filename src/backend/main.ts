import "@backend/controllers";
import { Application } from "@backend/core/application";

Application.launch(() => {
    console.log(`Application listening on port ${Application.port}`);
    console.log(`https://localhost:${Application.externalPort}`);
});
