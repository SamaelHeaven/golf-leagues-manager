import { injectable } from "@backend/core/injectable";

@injectable()
export class TestService {
    public test() {
        return "It works";
    }
}
