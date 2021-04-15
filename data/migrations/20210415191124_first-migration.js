
exports.up = function(knex) {
    return knex.schema
        .createTable("recipes", tbl => {
            tbl.increments("recipe_id")
            tbl.timestamp("created_at", { precision: 6 }).defaultTo(knex.fn.now(6))
            tbl.string("recipe_name", 128).notNullable().unique()
        })
        .createTable("ingredients", tbl => {
            tbl.increments("ingredient_id")
            tbl.string("ingredient_name", 128).notNullable().unique()
        })
        .createTable("steps", tbl => {
            tbl.increments("step_id")
            tbl.string("step_instructions", 128).notNullable()
            tbl.integer("step_number").notNullable().unique()
            tbl.integer("recipe_id")
                .unsigned()
                .notNullable()
                .references("recipe_id")
                .inTable("recipes")
                .onDelete("RESTRICT")
        })
        .createTable("ingredients_for_steps", tbl => {
            tbl.increments("ingredient_step_id")
            tbl.decimal("quantity").notNullable()
            tbl.string("quantity_unit", 128).notNullable()
            tbl.integer("step_id")
                .unsigned()
                .notNullable()
                .referenceS("step_id")
                .inTable("steps")
                .onDelete("RESTRICT")
            tbl.integer("ingredient_id")
                .unsigned()
                .notNullable()
                .references("ingredient_id")
                .inTable("ingredients")
                .onDelete("RESTRICT")
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("ingredients_for_steps")
        .dropTableIfExists("steps")
        .dropTableIfExists("ingredients")
        .dropTableIfExists("recipes")
};
