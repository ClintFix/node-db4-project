const db = require('../data/db-config');

async function getRecipeById(id) {
    const recipeRows = await db("recipes as r")
        .join("steps as s", "s.recipe_id", "r.recipe_id")
        .leftJoin("ingredients_for_steps as ifs", "ifs.step_id", "s.step_id")
        .leftJoin("ingredients as i", "i.ingredient_id", "ifs.ingredient_id")
        .select(
            "r.recipe_id",
            "r.recipe_name",
            "r.created_at",
            "s.step_id",
            "s.step_number",
            "s.step_instructions",
            "i.ingredient_id",
            "i.ingredient_name",
            "ifs.quantity",
            "ifs.quantity_unit"
        )
        .where("r.recipe_id", id)
        .orderBy("s.step_number", "asc")
};

module.exports = {
    getRecipeById
}