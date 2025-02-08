import { controller, Controller } from "@backend/core/controller";
import { route } from "@backend/core/route";
import * as fs from "node:fs";

@controller()
export class NotFoundController extends Controller {
    @route("get", "*")
    public view() {
        this.response.send(fs.readFileSync("public/index.html", "utf-8"));
    }
}
