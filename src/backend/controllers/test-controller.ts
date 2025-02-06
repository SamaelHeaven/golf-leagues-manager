import { controller, Controller } from "@backend/core/controller";
import { route } from "@backend/core/route";
import { TestService } from "@backend/services/test-service";

@controller("/test")
export class TestController extends Controller {
    constructor(private _testService: TestService) {
        super();
    }

    @route("get")
    public test() {
        this.response.send(this._testService.test());
    }
}
