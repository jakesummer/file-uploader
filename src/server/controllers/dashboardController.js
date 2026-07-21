import { getAllUserItems } from "../db/queries/itemQueries.js";

export async function dashboardGet(req, res) {
  res.render("dashboard", {
    items: await getAllUserItems(req.user.id),
  });
}
