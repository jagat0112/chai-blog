import slugify from "slugify";

function enhancedSlugify(title, options = {}) {
  // Default options
  const { lower = true, wordLimit = 5 } = options;

  // Remove special characters
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9\s]/g, "");

  // Limit number of words
  const limitedTitle = sanitizedTitle.split(" ").slice(0, wordLimit).join(" ");

  // Create slug
  return slugify(limitedTitle, { lower });
}

export default enhancedSlugify;
