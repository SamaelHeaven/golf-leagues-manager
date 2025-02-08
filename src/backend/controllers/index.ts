// organize-imports-ignore

import { TestController } from "@backend/controllers/test-controller";

// Not found controller must be the last imported controller

import { NotFoundController } from "@backend/controllers/not-found-controller";

export { TestController, NotFoundController };
