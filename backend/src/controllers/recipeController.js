const Recipe = require("../model/RecipeModel");

const createRecipe = async (req, res) => {
  try {
    const {
      name,
      category,
      instructions,
      tags,
      ingredients,
      prepTime,
      cookTime,
      servings,
      difficulty,
      photo,
      createdBy,
    } = req.body;

    // Create a new recipe instance
    const newRecipe = new Recipe({
      name,
      category,
      instructions,
      tags,
      ingredients,
      prepTime,
      cookTime,
      servings,
      difficulty,
      photo,
      comments: [],
      createdBy,
      likedUsers: [],
    });

    // Save the recipe to the database
    await newRecipe.save();

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      data: newRecipe,
    });
  } catch (error) {
    console.error("Error creating recipe:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getAllRecipes = async (req, res) => {
  const { createdBy } = req.body;
  try {
    const recipes = await Recipe.find({ createdBy });
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getCategory = async (req, res) => {
  const { category } = req.params;
  console.log(`Fetching data for category: ${category}`);

  try {
    const recipes = await Recipe.find({ category });
    console.log(`Items found: ${recipes.length}`);
    if (recipes.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSearchedRecipe = async (req, res) => {
  const { q } = req.params;
  console.log("search working");
  try {
    let recipes = [];
    if (q) {
      recipes = await Recipe.find({ name: { $regex: q, $options: "i" } });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "No items found!" });
  }
};

const addComment = async (req, res) => {
  const { recipeID } = req.body;
  const { comment } = req.body;
  const { userId } = req.body;

  try {
    const recipe = await Recipe.findById(recipeID);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const newComment = {
      commentedBy: userId,
      comment,
    };

    recipe.comments.push(newComment);
    await recipe.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const addLike = async (req, res) => {
  const { recipeID, userId } = req.body;

  try {
    const recipe = await Recipe.findById(recipeID);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const existingUserId = recipe.likedUsers.find(
      (likedUserId) => likedUserId.toString() === userId
    );

    if (existingUserId) {
      // User already liked the recipe, remove the like
      recipe.likedUsers = recipe.likedUsers.filter(
        (likedUserId) => likedUserId.toString() !== userId
      );
      recipe.recipeLikeCount = Math.max(0, recipe.recipeLikeCount - 1); // Decrement like count
    } else {
      // User has not liked the recipe, add the like
      recipe.likedUsers.push(userId);
      recipe.recipeLikeCount += 1; // Increment like count
    }

    await recipe.save();

    return res.status(201).json({
      success: true,
      message: "Like operation handled successfully",
    });
  } catch (error) {
    console.error("Error adding/removing like:", error.message);
    res.status(500).json({
      success: false,
      message: "Like operation error",
      error: error.message,
    });
  }
};

const getRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "recipe not found" });
    }

    res.status(200).json({
      success: true,
      message: "recipe fetched successfully",
      data: recipe,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getCategory,
  getSearchedRecipe,
  addComment,
  addLike,
  getRecipe,
};
