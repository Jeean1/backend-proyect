import { status } from "../../../helpers/status.js";
import { validateExistenceUserQuery } from "../../../models/auth.js";

export async function loginController(req, res) {
  //validar existencia de usuario. - levantar estructura

  const { email = "juan@example.com" } = req.body;
  const validateExistenceUser = await validateExistenceUserQuery(email);

  if (!validateExistenceUser) {
    return res.status(status.bad).send("Error: User Email Not Found");
  }

  console.log(validateExistenceUser);
  return res.status(status.success).send(validateExistenceUser);
}
