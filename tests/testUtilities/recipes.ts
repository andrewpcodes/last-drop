const getMockedRecipe = () => {
  return {
    _id: "1",
    title: "Vodka Lemonade",
    description: "A refreshing cocktail made with vodka and lemonade.",
    ingredients: [
      { name: "Vodka", amount: "50ml", unit: "ml" },
      { name: "Lemonade", amount: "150", unit: "ml" },
      { name: "Ice", amount: "1", unit: "cup" },
      { name: "Lemon slice", amount: "1", unit: "slice" }
    ],
    instructions: [
      { number: 1, instruction: "Fill a glass with ice." },
      { number: 2, instruction: "Pour vodka over the ice." },
      { number: 3, instruction: "Top up with lemonade." },
      { number: 4, instruction: "Garnish with a lemon slice." }
    ],
    categories: ["Cocktail"],
    imageUris: ["https://example.com/vodka-lemonade.jpg"]
  }
}

const getMockedRecipes = () => {
  return [getMockedRecipe()];
}

export { getMockedRecipe, getMockedRecipes };