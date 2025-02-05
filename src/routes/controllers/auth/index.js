import { authenticateHelper } from "../../../helpers/authenticateHelper.js";

export async function loginController(req, res, next) {
  const result = await authenticateHelper("loginClient")(req, res, next);
  return result;
}
